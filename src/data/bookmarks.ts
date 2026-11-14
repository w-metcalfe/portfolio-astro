export interface Bookmark {
  title: string;
  category: string;
  href: string;
  image: string;
}

/** Bookmarks featured on the home page */
export const featuredBookmarks: Bookmark[] = [
  {
    title: 'Laws of UX: A collection of best practices in UX design.',
    category: 'UX Design',
    href: 'https://lawsofux.com',
    image: 'wcdyuVgZmpRv1Ky9psekJnwZC8.jpg',
  },
  { title: 'Nielsen Norman Group: UX Training & Research.', category: 'UX Design', href: 'https://www.nngroup.com', image: 'jzoG7N3OQea2jdC15oc3aRVgTWg.png' },
  {
    title: 'The Design of Everyday Things: Revised and Expanded Edition.',
    category: 'Book',
    href: 'https://www.nngroup.com/books/design-everyday-things-revised/',
    image: '5DUYgEanPIytJyzkEJv0WSllMC4.jpg',
  },
  {
    title: 'Don’t Make Me Think, Revisited: Web & Mobile Usability.',
    category: 'Book',
    href: 'https://sensible.com/dont-make-me-think/',
    image: 'nVbAKd7MTm1uYpdxm22TfqEc.jpg',
  },
];

/** Full list shown on /bookmarks (double spaces are in the original copy) */
export const bookmarks: Bookmark[] = [
  {
    title: 'Laws of UX: A collection of best practices that designers consider when building user interfaces.',
    category: 'UX Design',
    href: 'https://lawsofux.com',
    image: 'wcdyuVgZmpRv1Ky9psekJnwZC8.jpg',
  },
  {
    title: 'The Design of Everyday Things: Revised and Expanded Edition.',
    category: 'Book',
    href: 'https://www.nngroup.com/books/design-everyday-things-revised/',
    image: '5DUYgEanPIytJyzkEJv0WSllMC4.jpg',
  },
  {
    title: 'Nielsen Norman Group: UX Training, Consulting, & Research.',
    category: 'UX Design',
    href: 'https://www.nngroup.com',
    image: 'jzoG7N3OQea2jdC15oc3aRVgTWg.png',
  },
  {
    title: 'Don’t Make Me Think, Revisited: A Common Sense Approach to Web (and Mobile) Usability.',
    category: 'Book',
    href: 'https://sensible.com/dont-make-me-think/',
    image: 'nVbAKd7MTm1uYpdxm22TfqEc.jpg',
  },
  {
    title: 'How To Design Better UI: One ebook to teach you  how to design better.',
    category: 'UI Design',
    href: 'https://www.howtodesignbetter.com/ebook',
    image: 'Px4seKPfmmJLATFIuzvItTGZKY.jpg',
  },
  {
    title: 'Interaction Design Foundation:  Literature in UX, HCI, interaction design and usability.',
    category: 'Web Design',
    href: 'https://www.interaction-design.org',
    image: 'QO15kmDrpWuS5nn5EtledksC3s.png',
  },
];
