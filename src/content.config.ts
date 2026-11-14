// Content collections. Case studies are MDX files in src/content/case-studies; the file name is the URL slug
// (/projects/<file name>). Components usable inside them: src/components/case-study/index.ts.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const caseStudies = defineCollection({
  loader: glob({ pattern: '*.mdx', base: './src/content/case-studies' }),
  schema: z.object({
    /** Browser tab / SEO title */
    title: z.string(),
    /** Meta description */
    description: z.string(),
  }),
});

export const collections = { caseStudies };
