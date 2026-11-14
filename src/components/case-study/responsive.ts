// Helpers for case-study props that can differ per breakpoint: either a plain value or { d, t, m }
// (desktop / tablet / mobile; a null tablet or mobile value falls back to desktop).
import type { Segment } from '../../data/types';

export type Breakpoint = 'd' | 't' | 'm';
export type ResponsiveValue<T> = T | { d: T | null; t?: T | null; m?: T | null };

export const isResponsive = (v: unknown): v is { d: any; t?: any; m?: any } => typeof v === 'object' && v !== null && !Array.isArray(v) && 'd' in v;

export const px = (v: unknown) => (typeof v === 'number' ? `${v}px` : String(v));

/** Value at one breakpoint. */
export const at = <T>(value: ResponsiveValue<T> | undefined, bp: Breakpoint): T | null | undefined => (isResponsive(value) ? value[bp] : value);

/** CSS custom properties (--name, --name-t, --name-m) for a value that may differ per breakpoint. */
export const vars = (name: string, value: unknown, format: (v: any) => string = px): string[] => {
  if (value === undefined || value === null) return [];
  if (isResponsive(value)) return [`--${name}:${format(value.d)}`, `--${name}-t:${format(value.t ?? value.d)}`, `--${name}-m:${format(value.m ?? value.d)}`];
  return [`--${name}:${format(value)}`];
};

/**
 * Inline markdown for card titles and text: **bold**, *italic*, and line breaks.
 * Turned into the text runs FeatureCard renders.
 */
export const inlineMarkdown = (source: string | undefined): Segment[] | undefined => {
  if (source === undefined) return undefined;
  const segments: Segment[] = [];
  const pattern = /\*\*([^*]+)\*\*|\*([^*]+)\*/g;
  let last = 0;
  for (const match of source.matchAll(pattern)) {
    if (match.index > last) segments.push({ text: source.slice(last, match.index) });
    segments.push(match[1] !== undefined ? { text: match[1], weight: 700 } : { text: match[2], italic: true });
    last = match.index + match[0].length;
  }
  if (last < source.length) segments.push({ text: source.slice(last) });
  return segments;
};
