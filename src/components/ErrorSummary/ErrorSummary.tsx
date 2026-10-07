import { type MouseEvent, useEffect, useRef } from 'react';

import { Notice } from '../Notice';
import styles from './ErrorSummary.module.css';

export interface FormError {
  fieldId: string;
  message: string;
}

interface ErrorSummaryProps {
  errors: readonly FormError[];
  title?: string;
}

function goToField(event: MouseEvent<HTMLAnchorElement>, fieldId: string) {
  const field = document.getElementById(fieldId);
  if (!(field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement)) return;

  event.preventDefault();
  field.labels?.[0]?.scrollIntoView();
  field.focus({ preventScroll: true });
}

export function ErrorSummary({ errors, title = 'There’s a problem' }: ErrorSummaryProps) {
  const summaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (errors.length > 0) summaryRef.current?.focus();
  }, [errors]);

  if (errors.length === 0) return null;

  return (
    <Notice ref={summaryRef} variant="error" title={title}>
      <ul role="list" className={styles.list}>
        {errors.map(({ fieldId, message }) => (
          <li key={fieldId}>
            <a
              href={`#${fieldId}`}
              className={styles.link}
              onClick={(event) => {
                goToField(event, fieldId);
              }}
            >
              {message}
            </a>
          </li>
        ))}
      </ul>
    </Notice>
  );
}
