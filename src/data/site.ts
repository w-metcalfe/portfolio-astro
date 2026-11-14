import type { IconName } from '../components/icons';

export const site = {
  name: 'William Metcalfe',
  role: 'Lead UX Designer',
  title: 'William Metcalfe | UX & Product Designer',
  description:
    'I’m William, a UX & Product Designer dedicated to shaping thoughtful, human-centered solutions for real-world needs. I specialize in translating complex problems into simple, validated solutions grounded in user research.',
  url: 'https://williammetcalfe.ca',
  location: 'London, ON',
  resumeUrl: 'https://docs.google.com/document/d/1X_W20gU_BKMuXLyPZVY_Kw-T5Ca9TCbRVYMWeVR2OdY/edit?usp=sharing',
  linkedinUrl: 'https://www.linkedin.com/in/william-metcalfe-72b714158/',
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
