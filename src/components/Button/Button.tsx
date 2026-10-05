import type { ComponentPropsWithRef } from 'react';

import { cx } from '../../utils/cx';
import styles from './Button.module.css';

/*
 * There's no disabled option. A disabled button can't be focused, gives no reason why it can't be
 * used, and is often too faint to read. Let people press the button and explain what's needed instead.
 */
interface ButtonProps extends Omit<ComponentPropsWithRef<'button'>, 'disabled'> {
  variant?: 'primary' | 'secondary';
}

/** A button for actions. Defaults to type="button", so it never submits a form by accident. */
export function Button({ variant = 'primary', type = 'button', className, ...props }: ButtonProps) {
  return (
    <button type={type} className={cx(styles.button, styles[variant], className)} {...props} />
  );
}
