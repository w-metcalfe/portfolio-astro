// Layout health check for the local build: looks for sideways scrolling, clipped or overflowing content and
// off-centre blocks on every page at every viewport.
// Usage: node scripts/check-layout.mjs [baseUrl]
import { chromium } from 'playwright';
import { PAGES, VIEWPORTS } from './pages.mjs';

const base = (process.argv[2] || 'http://localhost:4321').replace(/\/$/, '');
const browser = await chromium.launch({ channel: 'chrome' });
let problems = 0;
for (const [vpName, viewport] of Object.entries(VIEWPORTS)) {
  const context = await browser.newContext({ viewport, deviceScaleFactor: 1 });
  // Never send test visits to the real analytics properties (production builds include GA + Clarity)
  await context.route(/googletagmanager\.com|google-analytics\.com|clarity\.ms/, (route) => route.abort());
  for (const [name, route] of Object.entries(PAGES)) {
    const page = await context.newPage();
    await page.goto(base + route, { waitUntil: 'load' });
    await page.waitForTimeout(400);
    const issues = await page.evaluate(() => {
      const out = [];
      const doc = document.documentElement;
      if (doc.scrollWidth > doc.clientWidth) out.push(`page scrolls sideways by ${doc.scrollWidth - doc.clientWidth}px`);
      const main = document.querySelector('main').getBoundingClientRect();
      // Text that runs past the right edge of the content area
      for (const el of document.querySelectorAll('main p, main h1, main h2, main h3, main li')) {
        if (el.closest('.album, [aria-hidden="true"], footer')) continue;
        const r = el.getBoundingClientRect();
        if (r.width && r.right > main.right + 0.5)
          out.push(`text past the right edge: "${el.textContent.trim().slice(0, 40)}" (+${Math.round(r.right - main.right)}px)`);
      }
      // Cards whose content is taller than the card
      for (const card of document.querySelectorAll('.bookmark')) {
        const c = card.getBoundingClientRect();
        const row = card.firstElementChild.getBoundingClientRect();
        if (row.top < c.top - 0.5 || row.bottom > c.bottom + 0.5) out.push(`bookmark content overflows its card: "${card.textContent.trim().slice(0, 30)}"`);
      }
      // Newsletter / message block centred in the content area
      const panel = document.querySelector('.panel');
      if (panel) {
        const r = panel.getBoundingClientRect();
        const off = Math.abs(r.left - main.left - (main.right - r.right));
        if (off > 0.5) out.push(`message panel off-centre by ${(off / 2).toFixed(1)}px`);
      }
      if ([...document.querySelectorAll('.readers p')].some((p) => p.textContent.trim() === 'Avatar')) out.push('stray "Avatar" label');
      return out;
    });
    await page.close();
    problems += issues.length;
    if (issues.length) console.log(`${vpName} ${name}:\n  - ${issues.join('\n  - ')}`);
  }
  await context.close();
}
console.log(problems ? `${problems} problem(s) found` : 'No layout problems found on any page at any viewport');
await browser.close();
if (problems) process.exitCode = 1;
