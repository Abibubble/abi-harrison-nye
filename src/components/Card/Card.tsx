import type { ReactNode } from 'react';

import { cx } from '../../utils/cx';
import styles from './Card.module.css';

interface CardProps {
  children: ReactNode;
  as?: 'div' | 'article' | 'section' | 'li';
  className?: string | undefined;
}

/**
 * A raised box for one item, such as a role or a project. It's a container only: links go on the
 * item's heading, rather than making the whole card clickable, so text can still be selected and each
 * link has a clear name. Cards are never split across two printed pages.
 */
export function Card({ children, as: Element = 'div', className }: CardProps) {
  return (
    <Element className={cx(styles.card, className)} data-print="keep-together">
      {children}
    </Element>
  );
}
