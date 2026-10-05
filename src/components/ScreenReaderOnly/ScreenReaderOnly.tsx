import type { ReactNode } from 'react';

import styles from './ScreenReaderOnly.module.css';

interface ScreenReaderOnlyProps {
  children: ReactNode;
}

/** Text for screen readers and other assistive technology, without showing it on screen. */
export function ScreenReaderOnly({ children }: ScreenReaderOnlyProps) {
  return <span className={styles.screenReaderOnly}>{children}</span>;
}
