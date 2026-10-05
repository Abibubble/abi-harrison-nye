import type { ReactNode } from 'react';

import { type SpaceStep, gapClass } from '../../styles/gap';
import { cx } from '../../utils/cx';
import styles from './Stack.module.css';

interface StackProps {
  children: ReactNode;
  /** Space between items, as a step on the spacing scale. Defaults to 16px. */
  gap?: SpaceStep;
  as?: 'div' | 'section' | 'article' | 'ul' | 'ol';
  className?: string | undefined;
  /** Names a section by its heading, so it's listed as a region by screen readers. */
  'aria-labelledby'?: string | undefined;
}

/**
 * Items one above the other with even space between them. The gap replaces the items' own margins, so
 * spacing comes only from the scale.
 */
export function Stack({
  children,
  gap = 3,
  as: Element = 'div',
  className,
  'aria-labelledby': labelledBy,
}: StackProps) {
  const isList = Element === 'ul' || Element === 'ol';

  return (
    // Lists keep their role, which Safari drops once list bullets are removed.
    <Element
      role={isList ? 'list' : undefined}
      aria-labelledby={labelledBy}
      className={cx(styles.stack, gapClass(gap), className)}
    >
      {children}
    </Element>
  );
}
