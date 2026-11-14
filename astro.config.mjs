import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://williammetcalfe.ca',
  // URLs have no trailing slash (as on the original site): /about is built as about.html, which Netlify serves at /about
  // without a redirect, so the served URL always matches the canonical tag.
  trailingSlash: 'never',
  build: { format: 'file' },
  // Fetch internal pages as soon as a link is hovered or focused, so navigation feels instant
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  devToolbar: { enabled: false },
  integrations: [mdx()],
  // Case-study MDX: keep text exactly as written (no smart quotes, no auto-linked URLs or other GitHub extensions)
  markdown: { smartypants: false, gfm: false },
});
