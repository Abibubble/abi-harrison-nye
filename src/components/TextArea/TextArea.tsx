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
  id?: string | undefined;
  characterLimit?: number | undefined;
}

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
