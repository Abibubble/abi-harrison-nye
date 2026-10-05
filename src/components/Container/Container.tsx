import type { ReactNode } from 'react';

import styles from './Container.module.css';

interface ContainerProps {
  children: ReactNode;
}

/** Centres content at the site's maximum width, with side gutters on narrow screens. */
export function Container({ children }: ContainerProps) {
  return <div className={styles.container}>{children}</div>;
}
