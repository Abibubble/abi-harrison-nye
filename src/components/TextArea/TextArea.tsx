import { type ComponentPropsWithRef, useId } from 'react';

import { Field, type FieldProps } from '../Field';
import { CharacterCount } from './CharacterCount';

interface TextAreaProps
  extends
    Omit<FieldProps, 'id' | 'children'>,
    Omit<
      ComponentPropsWithRef<'textarea'>,
      'id' | 'required' | 'className' | 'aria-describedby' | 'aria-invalid'
    > {
  /** Set this when an error summary needs to link to the field. */
  id?: string | undefined;
  /**
   * Shows how many characters are left. It needs `value`, so the count can follow what's typed.
   * Nothing is cut off past the limit, as that loses pasted text without warning. Validation should
   * catch it instead.
   */
  characterLimit?: number | undefined;
}

/** A multi line text input with its label, hint and error message. People can make it taller. */
export function TextArea({
  id,
  label,
  hint,
  error,
  optional,
  characterLimit,
  rows = 8,
  value,
  ...textareaProps
}: TextAreaProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const countId = characterLimit === undefined ? undefined : `${fieldId}-count`;

  return (
    <Field id={fieldId} label={label} hint={hint} error={error} optional={optional}>
      {(control) => (
        <>
          <textarea
            {...textareaProps}
            {...control}
            aria-describedby={
              [control['aria-describedby'], countId].filter(Boolean).join(' ') || undefined
            }
            value={value}
            rows={rows}
          />
          {characterLimit !== undefined && countId && (
            <CharacterCount
              id={countId}
              value={typeof value === 'string' ? value : ''}
              limit={characterLimit}
            />
          )}
        </>
      )}
    </Field>
  );
}
