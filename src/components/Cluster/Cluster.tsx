import type { ReactNode } from 'react';

import { type SpaceStep, gapClass } from '../../styles/gap';
import { cx } from '../../utils/cx';
import styles from './Cluster.module.css';

interface ClusterProps {
  children: ReactNode;
  /** Space between items, as a step on the spacing scale. Defaults to 8px. */
  gap?: SpaceStep;
  align?: 'start' | 'center' | 'baseline';
  justify?: 'start' | 'end' | 'spaceBetween';
  as?: 'div' | 'ul' | 'ol';
  className?: string | undefined;
  /** Names a list for screen reader users, where a visible heading would be too much. */
  'aria-label'?: string | undefined;
}

/** Items side by side, wrapping onto new lines when there isn't room, so nothing scrolls sideways. */
export function Cluster({
  children,
  gap = 2,
  align = 'center',
  justify = 'start',
  as: Element = 'div',
  className,
  'aria-label': ariaLabel,
}: ClusterProps) {
  const isList = Element === 'ul' || Element === 'ol';

  return (
    // Lists keep their role, which Safari drops once list bullets are removed.
    <Element
      role={isList ? 'list' : undefined}
      aria-label={ariaLabel}
      className={cx(
        styles.cluster,
        gapClass(gap),
        styles[`align-${align}`],
        styles[`justify-${justify}`],
        className,
      )}
    >
      {children}
    </Element>
  );
}
