import type { ReactNode } from 'react';

import { ScreenReaderOnly } from '../ScreenReaderOnly';
import styles from './Field.module.css';

interface FieldErrorProps {
  id?: string | undefined;
  children: ReactNode;
}

export function FieldError({ id, children }: FieldErrorProps) {
  return (
    <p id={id} className={styles.error}>
      <svg
        className={styles.errorIcon}
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 7v6M12 17h.01" />
      </svg>
      <ScreenReaderOnly>Error:</ScreenReaderOnly> {children}
    </p>
  );
}
