// Components available in case-study MDX files (src/content/case-studies/*.mdx), without importing them.
// Markdown elements map onto the case-study styles: "#" → page title, "##"/"###" → headings,
// paragraphs → body text, "- item" → bulleted list.
import Stack from './Stack.astro';
import Image from './Image.astro';
import Card from './Card.astro';
import Link from './Link.astro';
import Chips from './Chips.astro';
import Eyebrow from './Eyebrow.astro';
import Label from './Label.astro';
import Text from './Text.astro';
import H1 from './H1.astro';
import H2 from './H2.astro';
import H3 from './H3.astro';
import List from './List.astro';
import Dim from './Dim.astro';
import Bright from './Bright.astro';
import Soft from './Soft.astro';

export const caseStudyComponents = {
  Stack,
  Image,
  Card,
  Link,
  Chips,
  Eyebrow,
  Label,
  Text,
  H1,
  H2,
  Dim,
  Bright,
  Soft,
  p: Text,
  h1: H1,
  h2: H2,
  h3: H3,
  ul: List,
};
