export type BadgeColor = 'grey' | 'gold' | 'green' | 'purple';

export interface Project {
  slug: string;
  title: string;
  /** Shorter title shown on mobile */
  titleMobile?: string;
  client: string;
  timeframe: string;
  tag: string;
  tagColor: BadgeColor;
  description: string;
  /** File name in src/assets/images */
  image: string;
  /** Alternative cover used on the /projects listing */
  listImage?: string;
}

export const projects: Project[] = [
  {
    slug: 'nuhome',
    title: 'NuHome Brand Evolution',
    client: 'NuHome Calgary',
    timeframe: '2025',
    tag: 'Shipped',
    tagColor: 'green',
    description: 'Taking NuHome Calgary to $100K sales in the first month while establishing the brand as a top contractor in the home-service industry.',
    image: 'jhEWc0S3ljgAH6tWOmcO6nWWIc.png',
  },
  {
    slug: 'green-pages',
    title: 'Green Pages',
    client: 'William & Mary University',
    timeframe: '2022-2023',
    tag: 'Pitched',
    tagColor: 'gold',
    description: 'An award-winning browser extension that enables effortless collaboration and author verification to streamline online workflow.',
    image: 'bkNZg3t2nT9wCNV30rwl38wcyNc.png',
    listImage: 'ZfKBpBtezGVADPgmgkAnTNBKLw.png',
  },
  {
    slug: 'middle-school',
    title: 'Middle School Learning Platform',
    titleMobile: 'Middle School Platform',
    client: 'Peekapak',
    timeframe: '2021-2022',
    tag: 'Shipped',
    tagColor: 'green',
    description:
      'Empowering students with critical thinking, stress regulation, and conflict resolution skills through engaging stories that inspire connection.',
    image: 'me611uYuGtlV1SNTmvu0s7gt6Nk.png',
  },
  {
    slug: 'needless',
    title: 'NeedLess',
    client: 'NeedLess',
    timeframe: '2018, 2022',
    tag: 'Pitched',
    tagColor: 'gold',
    description: 'A secure community exchange app that allows people to give and receive food and essential services within their local area.',
    image: 'zoN6xxEE8ygTxyVw4gcFRTycnA.png',
    listImage: 'cXdQTpfkr2pjpF7eyBymtHwfa8.png',
  },
];
