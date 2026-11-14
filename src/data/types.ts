/** A run of inline text with optional styling. */
export interface Segment {
  text: string;
  color?: string;
  weight?: number;
  italic?: boolean;
  href?: string;
  external?: boolean;
  underline?: boolean;
}

/** A value that can differ per breakpoint (desktop / tablet / mobile). */
export type Responsive<T> = T | { d: T | null; t: T | null; m: T | null };
