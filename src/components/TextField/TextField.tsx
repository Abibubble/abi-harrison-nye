import { type ComponentPropsWithRef, useId } from 'react';

import { Field, type FieldProps } from '../Field';

interface TextFieldProps
  extends
    Omit<FieldProps, 'id' | 'children'>,
    Omit<
      ComponentPropsWithRef<'input'>,
      'id' | 'type' | 'required' | 'className' | 'aria-describedby' | 'aria-invalid'
    > {
  /** Set this when an error summary needs to link to the field. */
  id?: string | undefined;
  type?: 'text' | 'email' | 'tel' | 'url';
}

/** A single line text input with its label, hint and error message. */
export function TextField({
  id,
  label,
  hint,
  error,
  optional,
  type = 'text',
  ...inputProps
}: TextFieldProps) {
  const generatedId = useId();

  return (
    <Field id={id ?? generatedId} label={label} hint={hint} error={error} optional={optional}>
      {(control) => <input {...inputProps} {...control} type={type} />}
    </Field>
  );
}
