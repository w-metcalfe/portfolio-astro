import type { BadgeColor } from './projects';

export interface Experience {
  company: string;
  href: string;
  logo: string;
  role: string;
  years: string;
}

export const experience: Experience[] = [
  { company: 'GIANT Creative', href: 'https://giantcreative.ca', logo: 'Y7BLQMe86WEh0x01uxnNtTQnH7U.png', role: 'Lead UX Designer', years: '2024-NOW' },
  { company: 'RBC', href: 'https://www.rbcroyalbank.com/personal.html', logo: 'dwnTKW0tc6d4yMvhZE45u80MmY8.png', role: 'UX Designer', years: '2023-2023' },
  { company: 'William & Mary', href: 'https://www.wm.edu', logo: 'VRyoGMa8WO2W1pDlK87zsDxvuk.jpg', role: 'Lead UX Designer', years: '2022-2023' },
  { company: 'Peekapak', href: 'https://peekapak.com', logo: 'jKQnbNgAlypBPxbrXLFsnKbXqBQ.png', role: 'Product Designer', years: '2021-2022' },
  { company: 'Smashing Pixels', href: 'https://smashingpixels.ca', logo: 'Pc8gUnUn90mfaO643kNzwJjx4QQ.jpg', role: 'UX Designer', years: '2020-2021' },
  {
    company: 'March of Dimes Canada',
    href: 'https://www.marchofdimes.ca/en-ca',
    logo: 'XdI2h1SeWOAUoaJWIz0RRqHPhM.png',
    role: 'UX Researcher',
    years: '2019-2019',
  },
  {
    company: 'Trillium Gift of Life Network',
    href: 'https://www.giftoflife.on.ca/en/',
    logo: 'AaVtYvRKdsFGwETCzxxXiBIW68.png',
    role: 'UX Designer',
    years: '2017-2018',
  },
  { company: 'Blackburn Media', href: 'https://blackburnmedia.ca', logo: 'kiB8cmqcUbOByNtsD2iXWA1fHPs.png', role: 'Junior Designer', years: '2015-2016' },
];

export interface Spotlight {
  tag: string;
  tagColor: BadgeColor;
  year: string;
  title: string;
  text: string;
  image: string;
  /** Sticky offset from the top of the viewport, in px */
  stickyTop: number;
}

export const spotlights: Spotlight[] = [
  {
    tag: 'Shipped',
    tagColor: 'green',
    year: '2022',
    title: 'Launched a SaaS product that grew its user base by 300K+ in its first year',
    text: 'Focused on human-centred design to ship a multitude of products including the all-new Middle School curriculum.',
    image: 'KnHZX9XCgz6kZnlUTSY2Be59Lo.jpg',
    stickyTop: 60,
  },
  {
    tag: 'Pitched',
    tagColor: 'gold',
    year: '2023',
    title: 'Spearheaded an award-winning browser extension',
    text: "Lead our team's efforts to create a solution that bridges the gap between knowledge and action.",
    image: 'a0fYBlJcYNCIXZMEW4kiUtxUOc.jpg',
    stickyTop: 70,
  },
  {
    tag: 'Shipped',
    tagColor: 'green',
    year: '2021',
    title: 'Launched an esports league garnering $15k in investments',
    text: 'Founded an all-Canadian esports league focused on fostering and developing the scene in Canada.',
    image: 'jNO53udNBppdhHCwOmlRnIZ9Mk.jpg',
    stickyTop: 80,
  },
  {
    tag: 'Award',
    tagColor: 'purple',
    year: '2022',
    title: 'Nominated for CO-OP Student of the Year 2022',
    text: 'Nominated for CO-OP Student of the Year during my time as a Product Designer at Peekapak.',
    image: 'aRqAwtnrbdjftJYQoBu2txamq8.jpg',
    stickyTop: 80,
  },
];

export interface Faq {
  question: string;
  /** Plain text; line breaks are preserved */
  answer: string;
}

export const faqs: Faq[] = [
  {
    question: 'How many years of experience do I have?',
    answer:
      'I have over 10 years of experience designing intuitive, user-centered digital products. My work focuses on turning complex problems into clear, research-informed solutions that improve usability and decision-making.',
  },
  {
    question: 'Do I have leadership experience?',
    answer:
      'Yes. I bring UX leadership experience across multiple roles, where I’ve collaborated closely with teams of designers and cross-functional partners. In my current role as Lead UX Designer at GIANT Creative, I guide design direction, support other designers through feedback and mentorship, and help align UX decisions with project goals and user needs.',
  },
  {
    question: 'What industries and sectors have I worked in?',
    answer:
      'I’ve led UX and product design work across a range of industries, including:\n\n- Agencies and marketing\n\n- Franchise and home services\n\n- Healthcare SaaS \n\n- Banking and enterprise\n\n- Education technology\n\n- Non-profits and public health',
  },
  {
    question: 'How do I demonstrate my impact beyond visual design?',
    answer:
      'I connect my design decisions to measurable business and user outcomes. This includes tracking metrics like sales, lead generation, platform adoption, and task success, and using those signals to validate and iterate on solutions.',
  },
  {
    question: 'What are some measurable outcomes from my work?',
    answer:
      '- Supported over $1.75M in franchise sales for Koala Insulation by leading a digital UX overhaul\n\n- Generated $100K+ in new business in the first month for NuHome Calgary through CRO-focused UX strategy\n\n- Doubled leads and reduced ad costs by 37% for UROSPOT by optimizing landing page usability and conversion flows\n\n- Improved social-emotional learning outcomes by 29–32% at Peekapak by redesigning tools for student stress and time management\n\n- Led an award-winning browser extension that achieved 100% task success through iterative UX testing',
  },
  {
    question: 'How do I incorporate AI into my UX workflow?',
    answer:
      'I use AI to support and extend my UX process by enhancing efficiency and insight without replacing human judgment. Specifically, I use AI to:\n\n- Deepen user research beyond initial interviews by synthesizing patterns and exploring hypotheses with custom gpts\n\n- Simulate edge cases and model scenarios for underserved or atypical user groups\n\n- Accelerate early-stage ideation and validation while maintaining research and usability',
  },
];
