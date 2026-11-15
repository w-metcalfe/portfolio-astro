import type { IconName } from '../components/icons';

export const site = {
  name: 'William Metcalfe',
  role: 'Lead UX Designer',
  title: 'William Metcalfe | UX & Product Designer',
  description:
    'I’m William, a UX & Product Designer dedicated to shaping thoughtful, human-centered solutions for real-world needs. I specialize in translating complex problems into simple, validated solutions grounded in user research.',
  /** Job title used in structured data (schema.org Person) */
  jobTitle: 'UX & Product Designer',
  url: 'https://williammetcalfe.ca',
  location: 'London, ON',
  resumeUrl: 'https://docs.google.com/document/d/1X_W20gU_BKMuXLyPZVY_Kw-T5Ca9TCbRVYMWeVR2OdY/edit?usp=sharing',
  linkedinUrl: 'https://www.linkedin.com/in/william-metcalfe-72b714158',
  email: 'design@williammetcalfe.ca',
  /**
   * Name of the contact form in Netlify Forms (Netlify dashboard → Forms). Submissions are handled by Netlify,
   * which detects the form in the built HTML at deploy time. Form detection must be enabled for the site.
   */
  contactFormName: 'contact',
  /**
   * Analytics, loaded on production builds only (so `astro dev` visits aren't counted). Same properties as the
   * Framer site, so reporting carries on. Leave an ID empty to turn that service off.
   */
  analytics: {
    googleAnalyticsId: 'G-EF7XXEFH48',
    clarityProjectId: 'v7rjclkszd',
  },
};

/**
 * Browser-tab / search titles and meta descriptions for the fixed pages (case studies keep theirs in their MDX
 * frontmatter). Keep titles under ~60 characters and descriptions between 140 and 155 so search results don't truncate them.
 */
export const pageMeta = {
  home: {
    title: site.title,
    description:
      'William Metcalfe is a UX & Product Designer who turns complex problems into simple, validated solutions grounded in user research. See his case studies.',
  },
  projects: {
    title: 'UX & Product Design Case Studies | William Metcalfe',
    description:
      'UX and product design case studies by William Metcalfe: a browser extension, a learning platform, a community exchange app and a brand evolution.',
  },
  gallery: {
    title: 'Design Gallery | William Metcalfe',
    description:
      'A gallery of visual explorations and shipped product designs by William Metcalfe, showing the craft, clarity and iteration behind each piece of work.',
  },
  about: {
    title: 'About William Metcalfe | UX & Product Designer',
    description:
      'The journey of William Metcalfe, UX & Product Designer: the roles, projects and decisions that shaped his human-centered, research-led approach.',
  },
  contact: {
    title: 'Contact William Metcalfe | UX & Product Designer',
    description:
      'Get in touch with William Metcalfe, UX & Product Designer. Send a message about a project, a role or a collaboration and he will get back to you soon.',
  },
  bookmarks: {
    title: 'Design Resources & Bookmarks | William Metcalfe',
    description:
      'The design resources William Metcalfe leans on: a curated list of sites and references for UX and product designers looking for direction or a spark.',
  },
  stack: {
    title: 'Design Tools & Stack | William Metcalfe',
    description:
      'The design tools and technologies William Metcalfe uses for research, interface design, prototyping and handoff, at every step of the design process.',
  },
  music: {
    title: 'Music | William Metcalfe',
    description:
      'The songs and albums in William Metcalfe’s current rotation: a personal playlist of favourite tracks from a UX & Product Designer, updated over time.',
  },
} as const;

export type NavKey = 'home' | 'projects' | 'gallery' | 'about' | 'contact' | 'bookmarks' | 'stack' | 'music';

export interface NavItem {
  key?: NavKey;
  label: string;
  href: string;
  icon: IconName;
  external?: boolean;
}

export const primaryNav: NavItem[] = [
  { key: 'home', label: 'Home', href: '/', icon: 'home' },
  { key: 'projects', label: 'Projects', href: '/projects', icon: 'projects' },
  { key: 'gallery', label: 'Gallery', href: '/gallery', icon: 'gallery' },
  { key: 'about', label: 'About', href: '/about', icon: 'about' },
  { key: 'contact', label: 'Contact', href: '/contact', icon: 'contact' },
];

export const resourcesNav: NavItem[] = [
  { key: 'bookmarks', label: 'Bookmarks', href: '/bookmarks', icon: 'bookmarks' },
  { key: 'stack', label: 'Stack', href: '/stack', icon: 'stack' },
  { key: 'music', label: 'Music', href: '/music', icon: 'music' },
  { label: 'LinkedIn', href: site.linkedinUrl, icon: 'link', external: true },
];
