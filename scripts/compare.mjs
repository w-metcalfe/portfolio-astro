// Screenshots the local site and pixel-diffs it against a baseline.
// Usage: node scripts/compare.mjs [pages|all] [viewports] [localBase]
//   (npm run test:visual / npm run test:visual:update)
// Baseline: tests/visual/baseline/<viewport>/<page>.png, a snapshot of the approved Astro build.
//   --update (or UPDATE=1)         re-capture the baseline instead of diffing (after an intended visual change)
//   REF=<dir>                      diff against another set of screenshots (same <viewport>/<page>.png layout)
//   MAX_DIFF=1.5                   fail (exit code 1) when a page differs by more than this % or changes size
// Output: compare/<viewport>/<page>.{local,diff}.png and a summary table.
import { chromium } from 'playwright';
import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import { PAGES, VIEWPORTS } from './pages.mjs';

const args = process.argv.slice(2).filter((arg) => !arg.startsWith('--'));
const onlyPages = args[0] && args[0] !== 'all' ? args[0].split(',') : null;
const onlyViewports = args[1] ? args[1].split(',') : null;
const base = (args[2] || 'http://localhost:4321').replace(/\/$/, '');
const refDir = process.env.REF || 'tests/visual/baseline';
const outDir = 'compare';
const update = process.env.UPDATE === '1' || process.argv.includes('--update');
const maxDiff = Number(process.env.MAX_DIFF || 1.5);

async function settle(page) {
  await page.evaluate(async () => {
    const step = Math.round(window.innerHeight * 0.6);
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 180));
    }
    window.scrollTo(0, document.documentElement.scrollHeight);
    await new Promise((r) => setTimeout(r, 600));
    window.scrollTo(0, 0);
  });
  // Lazy images can still be transforming on the dev server: wait until every image has decoded.
  await page.waitForFunction(() => [...document.images].every((img) => img.complete && img.naturalWidth > 0), null, { timeout: 30000 }).catch(() => {});
  await page.waitForTimeout(Number(process.env.SETTLE || 1200));
}

const rows = [];
const browser = await chromium.launch({ channel: 'chrome' });
for (const [vpName, viewport] of Object.entries(VIEWPORTS)) {
  if (onlyViewports && !onlyViewports.includes(vpName)) continue;
  const context = await browser.newContext({ viewport, deviceScaleFactor: 1 });
  // Never send test visits to the real analytics properties (production builds include GA + Clarity)
  await context.route(/googletagmanager\.com|google-analytics\.com|clarity\.ms/, (route) => route.abort());
  await mkdir(path.join(outDir, vpName), { recursive: true });
  for (const [name, route] of Object.entries(PAGES)) {
    if (onlyPages && !onlyPages.includes(name)) continue;
    const page = await context.newPage();
    await page.goto(base + route, { waitUntil: 'load', timeout: 60000 }).catch(() => {});
    await page.waitForLoadState('networkidle', { timeout: 4000 }).catch(() => {});
    await page.waitForTimeout(1500);
    await settle(page);
    // Full-page capture repaints everything at once; async-decoded images can come out blank, so decode synchronously.
    await page.evaluate(() => document.querySelectorAll('img').forEach((img) => (img.decoding = 'sync')));
    const localPath = path.join(outDir, vpName, `${name}.local.png`);
    await page.screenshot({ path: localPath, fullPage: true });
    await page.close();

    if (update) {
      await mkdir(path.join(refDir, vpName), { recursive: true });
      await copyFile(localPath, path.join(refDir, vpName, `${name}.png`));
      console.log(`baseline updated: ${vpName} ${name}`);
      continue;
    }
    const ref = PNG.sync.read(await readFile(path.join(refDir, vpName, `${name}.png`)));
    const loc = PNG.sync.read(await readFile(localPath));
    const width = Math.min(ref.width, loc.width);
    const height = Math.min(ref.height, loc.height);
    const crop = (img) => {
      if (img.width === width && img.height === height) return img.data;
      const out = Buffer.alloc(width * height * 4);
      for (let y = 0; y < height; y++) img.data.copy(out, y * width * 4, y * img.width * 4, y * img.width * 4 + width * 4);
      return out;
    };
    const diff = new PNG({ width, height });
    const mismatched = pixelmatch(crop(ref), crop(loc), diff.data, width, height, { threshold: 0.12, alpha: 0.4 });
    await writeFile(path.join(outDir, vpName, `${name}.diff.png`), PNG.sync.write(diff));
    // Find the first row where the two images diverge noticeably (helps locate layout drift).
    let firstRow = -1;
    const rowCounts = new Array(height).fill(0);
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const i = (y * width + x) * 4;
        if (diff.data[i] > 200 && diff.data[i + 1] < 100) rowCounts[y]++;
      }
      if (firstRow < 0 && rowCounts[y] > 8) firstRow = y;
    }
    // Summarise diff density per 200px band.
    const bands = [];
    for (let y = 0; y < height; y += 200) {
      const sum = rowCounts.slice(y, y + 200).reduce((a, b) => a + b, 0);
      bands.push(Math.min(9, Math.round((sum / (width * Math.min(200, height - y))) * 60)));
    }
    const percent = (mismatched / (width * height)) * 100;
    const failed = percent > maxDiff || ref.width !== loc.width || ref.height !== loc.height;
    rows.push({
      vp: vpName,
      page: name,
      ref: `${ref.width}x${ref.height}`,
      local: `${loc.width}x${loc.height}`,
      diff: percent.toFixed(2) + '%',
      firstRow,
      bands: bands.join(''),
      failed,
    });
  }
  await context.close();
}
await browser.close();
for (const r of rows)
  console.log(
    `${r.failed ? 'FAIL' : 'ok  '} ${r.vp.padEnd(8)} ${r.page.padEnd(24)} ref ${r.ref.padEnd(11)} local ${r.local.padEnd(11)} diff ${r.diff.padStart(7)} first@${String(r.firstRow).padEnd(6)} bands(200px) ${r.bands}`,
  );
const failures = rows.filter((r) => r.failed).length;
if (rows.length)
  console.log(
    failures
      ? `
${failures} of ${rows.length} captures differ by more than ${maxDiff}% or changed size (see compare/*/*.diff.png)`
      : `
All ${rows.length} captures match the baseline`,
  );
if (failures) process.exitCode = 1;
