import type { Bookmark } from './bookmarks';

export interface ToolGroup {
  title: string;
  items: Bookmark[];
}

/** Tools listed on /stack */
export const toolGroups: ToolGroup[] = [
  {
    title: 'My daily drivers',
    items: [
      { title: 'Figma', category: 'UX Design', href: 'https://www.figma.com/', image: '6XuSCK09eLRql95mSTtpK6t9q4.png' },
      { title: 'Framer', category: 'Web Design', href: 'https://www.framer.com/', image: 'ZmOuFXkoGoEpOrAIJdOqFqdcs0.png' },
      { title: 'Claude', category: 'Strategy & Reasoning', href: 'https://claude.com/product/overview', image: '2s4UP5Kg28sU2QunNorK8oH6ak.jpg' },
      { title: 'Codex', category: 'Engineering', href: 'https://openai.com/codex/', image: 'cPQfChtpPIKRpc9ouHpNrQT6jA.webp' },
      { title: 'Miro', category: 'Strategy', href: 'https://miro.com', image: 'bmlmukimIaYjkOwu5uQPYXj24zI.png' },
      { title: 'Mobbin', category: 'Inspiration', href: 'https://mobbin.com', image: 'Z3c5X9MTR9x9I9quBGqINRir4w.png' },
      {
        title: 'Google Analytics',
        category: 'User Research',
        href: 'https://marketingplatform.google.com/about/analytics/',
        image: 'LYIz4kEi2hjHi37Bd3SXouqEnZw.png',
      },
      { title: 'Microsoft Clarity', category: 'User Research', href: 'https://clarity.microsoft.com', image: 'IloGHEtzQlvSVREI8NOXfnWXc.png' },
      { title: 'Ahrefs', category: 'SEO / GEO / AEO', href: 'https://ahrefs.com', image: 'KevAAmCmXsl6TCf2suKIZrIGjc.png' },
      { title: 'Slack', category: 'Communication', href: 'https://slack.com', image: 'P4j9yhp0l1HyMyN17ALEKA9GWg.png' },
    ],
  },
  {
    title: 'Other tools I use',
    items: [
      {
        title: 'Adobe Photoshop',
        category: 'Photo Editing',
        href: 'https://www.adobe.com/ca/products/photoshop.html',
        image: 'iDBBsIGms7v4vkBAa7EBeh9PGuM.png',
      },
      { title: 'Adobe Illustrator', category: 'Logo Design', href: 'https://www.adobe.com/products/illustrator.html', image: '5BzcNSKQkHzmezIrXLBFkz3aw.png' },
      { title: 'Adobe Premiere Pro', category: 'Video Editing', href: 'https://www.adobe.com/products/premiere.html', image: '52RRhm32Xm9k0auGDL1Uu5gbQ.png' },
      {
        title: 'Adobe After Effects',
        category: 'Motion Design',
        href: 'https://www.adobe.com/products/aftereffects.html',
        image: 'NNQGmaj3ZIC78sIAPo2iLipwQ.png',
      },
      {
        title: 'Adobe Lightroom',
        category: 'Photo Editing',
        href: 'https://www.adobe.com/products/photoshop-lightroom.html',
        image: 'IwNRwUki8qIShEVJtDvb75AlIk.png',
      },
      { title: 'Adobe InDesign', category: 'Desktop Publishing', href: 'https://www.adobe.com/products/indesign.html', image: 'pTZxLQdgrDiNzLdLXbs5Y2W30.png' },
      { title: 'Canva', category: 'Social Media', href: 'https://www.canva.com', image: '5HrZFpVmZkINQJrBeP9zWoVu38.png' },
      { title: 'Cursor', category: 'Development', href: 'https://cursor.com', image: 'vvLhMVjzhvu2UZjYsSxFTAfLfI.jpg' },
    ],
  },
];
