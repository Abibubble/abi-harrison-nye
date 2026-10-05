import type { ReactNode } from 'react';

export type HeadingLevel = 2 | 3 | 4 | 5 | 6;

interface HeadingProps {
  /** Pages have one <h1>, from PageHeading, so this starts at 2. */
  level: HeadingLevel;
  children: ReactNode;
  id?: string | undefined;
  className?: string | undefined;
}

/**
 * A heading whose level is set by where it's used, so a component can sit at the right level on
 * different pages. For example, work history starts at level 2 on the Work page and level 3 on the CV.
 */
export function Heading({ level, children, id, className }: HeadingProps) {
  const Element = `h${level}` as const;

  return (
    <Element id={id} className={className}>
      {children}
    </Element>
  );
}

/** The level below another, never going past 6. */
export function nextLevel(level: HeadingLevel): HeadingLevel {
  return Math.min(level + 1, 6) as HeadingLevel;
}
