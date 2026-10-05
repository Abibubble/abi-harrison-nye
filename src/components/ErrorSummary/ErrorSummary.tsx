import { type MouseEvent, useEffect, useRef } from 'react';

import { Notice } from '../Notice';
import styles from './ErrorSummary.module.css';

export interface FormError {
  /** The id of the field with the problem. */
  fieldId: string;
  /** What's wrong and how to fix it, as shown next to the field. */
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
  // Bring the label into view too, so people can see what the field is for, not just the box.
  field.labels?.[0]?.scrollIntoView();
  field.focus({ preventScroll: true });
}

/**
 * Lists every problem at the top of a form after it's submitted, each linking to its field (WCAG 3.3.1
 * and 3.3.3). Focus moves here each time the form is submitted with errors, so people find out
 * straight away rather than having to hunt for them.
 */
export function ErrorSummary({ errors, title = 'There’s a problem' }: ErrorSummaryProps) {
  const summaryRef = useRef<HTMLDivElement>(null);

  // A new list of errors means a new submission, so focus moves here again.
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
