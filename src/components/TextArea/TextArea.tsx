import { type ComponentPropsWithRef, useId } from 'react';

import { Field, type FieldProps } from '../Field';

interface TextAreaProps
  extends
    Omit<FieldProps, 'id' | 'children'>,
    Omit<
      ComponentPropsWithRef<'textarea'>,
      'id' | 'required' | 'className' | 'aria-describedby' | 'aria-invalid'
    > {
  /** Set this when an error summary needs to link to the field. */
  id?: string | undefined;
}

/** A multi line text input with its label, hint and error message. People can make it taller. */
export function TextArea({
  id,
  label,
  hint,
  error,
  optional,
  rows = 8,
  ...textareaProps
}: TextAreaProps) {
  const generatedId = useId();

  return (
    <Field id={id ?? generatedId} label={label} hint={hint} error={error} optional={optional}>
      {(control) => <textarea {...textareaProps} {...control} rows={rows} />}
    </Field>
  );
}
