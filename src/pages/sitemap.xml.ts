// /sitemap.xml: every indexable page (the 404 and thank-you pages are left out, as on the original site).
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { site } from '../data/site';

export const GET: APIRoute = async () => {
  const caseStudies = (await getCollection('caseStudies')).map((study) => `/projects/${study.id}`).sort();
  const paths = ['/', '/projects', '/contact', '/bookmarks', '/about', '/gallery', ...caseStudies, '/music', '/stack'];
  const urls = paths.map((path) => `<url><loc>${site.url}${path}</loc></url>`).join('\n');
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
