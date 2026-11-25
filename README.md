# williammetcalfe.ca

Portfolio site for William Metcalfe, built with [Astro](https://astro.build) as a static site and hosted on Netlify. It was migrated 1:1 from Framer in November 2026; context and gotchas from the migration are kept locally in `docs/gotchas.md` (not tracked in git).

## Commands

Run from the project root. Node ≥ 22.23 is required (Netlify builds with Node 24).

| Command                                   | What it does                                                                                                     |
| ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `npm install`                             | Install dependencies                                                                                             |
| `npm run dev`                             | Dev server at http://localhost:4321                                                                              |
| `npm run check`                           | Type-check `.astro` and `.ts` files (`astro check`)                                                              |
| `npm run build`                           | Type-check, then build the static site into `dist/`                                                              |
| `npm run preview`                         | Serve the built `dist/` locally                                                                                  |
| `npm run format` / `npm run format:check` | Format the code with Prettier / check formatting (config in `.prettierrc.json`)                                  |
| `npm run test:layout`                     | Check every page at desktop/tablet/mobile for sideways scroll, overflowing text and cards, and off-centre panels |
| `npm run test:visual`                     | Screenshot every page at 3 viewports and pixel-diff against `tests/visual/baseline/` (fails above 1.5%)\*        |
| `npm run test:visual:update`              | Re-capture the baseline after an intended visual change                                                          |

The two test scripts need the dev server running (`npm run dev`) and Google Chrome installed, because Playwright launches with `channel: 'chrome'`. Diff images are written to `compare/` (git-ignored). Pass a page list and viewports to narrow a run, e.g. `node scripts/compare.mjs music,home desktop`.

\* The baseline is currently empty, so `test:visual` fails until you run `npm run test:visual:update` to capture a new one. The original Framer-matching set is archived at `E:\Claude\archive\portfolio-baseline`.

## Deploying (Netlify)

`netlify.toml` sets the build command (`npm run build`), the publish directory (`dist`), the Node version, cache headers and security headers.

- **URLs:** `build.format: 'file'` builds `/about` as `about.html`, so Netlify serves `/about` with no trailing-slash redirect, and it matches the canonical tag.
- **404:** Netlify serves `dist/404.html` for unknown routes automatically.
- **Contact form:** handled by Netlify Forms (form name `contact`, set in `src/data/site.ts`). In the Netlify dashboard, turn on form detection and add a notification email. The form only works on the deployed site; locally it shows "Something went wrong".
- **Newsletter:** posts to Mailchimp (settings in `src/components/NewsletterForm.astro`).
- **Analytics:** Google Analytics 4 and Microsoft Clarity. The IDs live in `site.analytics` in `src/data/site.ts`; clear an ID to turn that service off. The tags are only added to production builds, so `npm run dev` visits aren't counted (`npm run preview` serves a production build, so its visits are).

## Project map

```
src/
  layouts/Base.astro     <head>, sidebar, footer, page shell
  pages/                 one file per route; projects/[slug].astro renders the case studies
  content/case-studies/  one MDX file per case study (file name = URL slug)
  components/            UI components (Sidebar, Section, ProjectCard, AlbumCover, ContactForm, …)
  components/case-study/ the components case-study MDX can use (index.ts lists them)
  data/                  page content: site.ts (name, links, nav), projects.ts, home.ts, about.ts,
                         stack.ts, bookmarks.ts, music.ts, gallery.ts,
                         image-alts.json (alt text), image-focus.json (focal points)
  scripts/               client-side behaviour (sidebar, motion, lightbox, gallery canvas, forms, spotlights)
  styles/                global.css (fonts, tokens, reset), motion.css, springs.css, article.css, lightbox.css
  assets/images/         all images; rendered through components/Img.astro (responsive WebP)
public/                  fonts, textures, favicons, og-image.jpg, robots.txt
scripts/                 dev tooling: visual tests, layout checks, and the generators below
tests/visual/baseline/   reference screenshots for npm run test:visual (currently empty)
```

## Editing content

- **Text and links:** edit the matching file in `src/data/`. The site name, email, LinkedIn and résumé links live in `site.ts`.
- **Page titles and meta descriptions:** `pageMeta` in `src/data/site.ts` holds them for every fixed page (case studies keep theirs in their frontmatter). Keep titles under about 60 characters (`Topic | William Metcalfe`) and descriptions between 140 and 155, unique per page, or search results cut them off.
- **Images:** add the file to `src/assets/images/` and reference it by file name: `<Img src="file.jpg" />`. Add alt text in `data/image-alts.json` (keyed by file name without extension). Leave it empty only when the image is decorative or sits next to a visible label saying the same thing (logos, album covers, tool icons): screens and mockups that show something need a description.
- **Case studies:** see [Writing a case study](#writing-a-case-study) below.
- **Icons:** `src/components/icons.ts` (Phosphor duotone icons; add new ones by hand, see the note at the top of the file). **Spring easings:** `src/styles/springs.css` (generated by `scripts/gen-springs.mjs`).

## Writing a case study

Each case study is an MDX file in `src/content/case-studies/`. The file name becomes the URL (`needless.mdx` → `/projects/needless`), and its card on the home and projects pages comes from `src/data/projects.ts`. Copy an existing file as a starting point.

```mdx
---
title: 'NeedLess Case Study | William Metcalfe' # under ~60 characters
description: 'One or two sentences for search results and link previews.' # ~140–155 characters
---

<Stack gap={20} align="start">

<Eyebrow>INTRODUCTION</Eyebrow>

Plain paragraphs are body text. **Bold** and _italic_ work as usual.

## <Dim>A heading can start dim</Dim> and finish bright.

- Bullet lists work too
- one item per line, no blank lines between items

</Stack>

<Image src="cover.png" ratio="1.45455/1" static priority />
```

The case study's share image (`og:image`), structured data (`CreativeWork` + breadcrumbs) and the share image's alt text come automatically from its card in `src/data/projects.ts`.

**Markdown:**

- `# Title`: the page title; use it once, in the header.
- `## Heading` and `### Sub-heading`: section headings. They render bright; wrap words in `<Dim>…</Dim>` to dim them.
- Paragraphs, `**bold**`, `*italic*` and `- lists`.

Leave a blank line between blocks, and after an opening `<Stack>` / before its closing tag, or the Markdown inside won't be formatted.

**Components** (no imports needed):

| Component                                                                                      | Use                                                                                                                                                                      |
| ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `<Stack gap={20} align="start\|center" justify="center">`                                      | Groups blocks in a column with a gap. `dir={{ d: 'row', t: 'row', m: 'column' }}` puts them side by side and stacks them on mobile. `grow` makes a child share a row.    |
| `<Image src="file.jpg" ratio="3/2" />`                                                         | Rounded image with click-to-zoom. Size it with `ratio`, `height={315}` or `grow`. `static` skips the scroll fade-in; add `priority` too on the cover only (loads first). |
| `<Card image="file.jpg" badge="Research" badgeColor="grey" title="…" text="…" height={400} />` | Image card with a badge. `title` and `text` accept `**bold**` and `*italic*`; for a line break write `\n` inside braces: `title={"First line\nSecond line"}`.            |
| `<Eyebrow>LABEL</Eyebrow>`                                                                     | Small mono caps label; wrap a highlighted part in `<Soft>…</Soft>`.                                                                                                      |
| `<Label>ROLE</Label>`                                                                          | Small project-detail label.                                                                                                                                              |
| `<Chips team="Client" time="2025" />`                                                          | Team + year row under the title.                                                                                                                                         |
| `<Link href="/projects" label="Back" back />`                                                  | Arrow link; `external` opens in a new tab.                                                                                                                               |
| `<Text width={564}>…</Text>`, `<H2 maxWidth={480}>…</H2>`                                      | Paragraph or heading with a fixed width (wraps on small screens).                                                                                                        |
| `<Dim>`, `<Bright>`, `<Soft>`                                                                  | Inline colour changes.                                                                                                                                                   |

Any value can differ per breakpoint with `{{ d: …, t: …, m: … }}` (desktop / tablet / mobile), e.g. `height={{ d: 315, t: 315, m: 202 }}`. Images go in `src/assets/images/`, with alt text in `src/data/image-alts.json`. After writing a new case study, add its URL to `scripts/pages.mjs` and run `npm run test:visual:update` so the visual test covers it.

## Conventions

- **Breakpoints:** desktop ≥ 1000px (fixed 260px sidebar), tablet 810–999.98px, mobile ≤ 809.98px.
- **Borders** are drawn on a `::after` overlay (class `.bordered`, configured with `--bw` / `--bs` / `--bc`) so they never affect layout, mirroring Framer.
- **Sections:** `Section.astro` is the full-width band with the dashed column rules; its props cover per-section spacing differences.
- **Scoped classes:** child components spread `...rest`, so a parent's scoped class reaches their root element.
- **Animations:** `[data-appear]` plays on load and `[data-appear="in-view"]` plays on scroll into view (`styles/motion.css` + `scripts/motion.ts`). Both respect `prefers-reduced-motion`.
- **Page transitions:** native cross-document view transitions (`global.css`) plus hover prefetch (`astro.config.mjs`).
- **Keyboard focus:** a global `:focus-visible` ring (2px `#09f`). Components with their own focus style override it.
