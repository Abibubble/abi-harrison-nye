import type { ReactNode } from 'react';

import { cx } from '../../utils/cx';
import styles from './Field.module.css';
import { FieldError } from './FieldError';

/** Props the field gives its control, so the label, hint and error are all connected to it. */
export interface FieldControlProps {
  id: string;
  className: string | undefined;
  required: boolean;
  'aria-describedby': string | undefined;
  'aria-invalid': true | undefined;
}

export interface FieldProps {
  id: string;
  label: string;
  /** Help shown under the label, such as the format to use (WCAG 3.3.5). */
  hint?: string | undefined;
  /** An error message. Says what's wrong and how to fix it. */
  error?: string | undefined;
  /** Fields are required unless marked optional, which is said in the label rather than with a symbol. */
  optional?: boolean | undefined;
  children: (control: FieldControlProps) => ReactNode;
}

/**
 * The parts every form field shares: a visible label, an optional hint, an error message, and the
 * connections between them and the control, so screen readers read them out together. The error sits
 * between the label and the control, where people look when correcting it.
 */
export function Field({ id, label, hint, error, optional = false, children }: FieldProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

  return (
    <div className={cx(styles.field, error && styles.invalid)}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {optional && ' (optional)'}
      </label>
      {hint && (
        <p id={hintId} className={styles.hint}>
          {hint}
        </p>
      )}
      {error && <FieldError id={errorId}>{error}</FieldError>}
      {children({
        id,
        className: styles.control,
        required: !optional,
        'aria-describedby': describedBy,
        'aria-invalid': error ? true : undefined,
      })}
    </div>
  );
}
