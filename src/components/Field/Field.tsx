import type { ReactNode } from 'react';

import { cx } from '../../utils/cx';
import styles from './Field.module.css';
import { FieldError } from './FieldError';

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
  hint?: string | undefined;
  error?: string | undefined;
  optional?: boolean | undefined;
  children: (control: FieldControlProps) => ReactNode;
}

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
