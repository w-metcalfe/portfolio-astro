// /sitemap.xml: every indexable page (the 404 and thank-you pages are left out, as on the original site).
// <lastmod> is the date of the last git commit that touched the page's source file; it's left out when git history
// isn't available (e.g. a build from a downloaded copy), rather than guessed.
import { execFileSync } from 'node:child_process';
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { site } from '../data/site';

const lastModified = (file: string): string | undefined => {
  try {
    const date = execFileSync('git', ['log', '-1', '--format=%cs', '--', file], { encoding: 'utf8' }).trim();
    return date || undefined;
  } catch {
    return undefined;
  }
};

export const GET: APIRoute = async () => {
  const caseStudies = (await getCollection('caseStudies'))
    .map((study) => ({ path: `/projects/${study.id}`, file: `src/content/case-studies/${study.id}.mdx` }))
    .sort((a, b) => a.path.localeCompare(b.path));
  const pages = [
    { path: '/', file: 'src/pages/index.astro' },
    { path: '/projects', file: 'src/pages/projects/index.astro' },
    { path: '/contact', file: 'src/pages/contact.astro' },
    { path: '/bookmarks', file: 'src/pages/bookmarks.astro' },
    { path: '/about', file: 'src/pages/about.astro' },
    { path: '/gallery', file: 'src/pages/gallery.astro' },
    ...caseStudies,
    { path: '/music', file: 'src/pages/music.astro' },
    { path: '/stack', file: 'src/pages/stack.astro' },
  ];
  const urls = pages
    .map(({ path, file }) => {
      const lastmod = lastModified(file);
      return `<url><loc>${site.url}${path}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}</url>`;
    })
    .join('\n');
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
