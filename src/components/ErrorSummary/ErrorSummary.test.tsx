import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { expectNoAxeViolations } from '../../test/axe';
import { TextArea } from '../TextArea';
import { TextField } from '../TextField';
import { ErrorSummary, type FormError } from './ErrorSummary';

const ERRORS: FormError[] = [
  { fieldId: 'name', message: 'Enter your name' },
  { fieldId: 'message', message: 'Enter a message' },
];

function Form({ errors }: { errors: FormError[] }) {
  return (
    <form>
      <ErrorSummary errors={errors} />
      <TextField id="name" label="Your name" error="Enter your name" />
      <TextArea id="message" label="Your message" error="Enter a message" />
    </form>
  );
}

describe('ErrorSummary', () => {
  it('shows nothing when there are no errors', () => {
    const { container } = render(<ErrorSummary errors={[]} />);

    expect(container).toBeEmptyDOMElement();
  });

  it('lists every error under a clear heading', () => {
    render(<ErrorSummary errors={ERRORS} />);

    expect(screen.getByRole('alert', { name: 'There’s a problem' })).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });

  it('moves focus to itself, so people find out about the errors straight away', () => {
    render(<Form errors={ERRORS} />);

    expect(screen.getByRole('alert').parentElement).toHaveFocus();
  });

  it('moves focus again when the form is submitted again with errors', () => {
    const { rerender } = render(<Form errors={ERRORS} />);
    screen.getByRole('textbox', { name: 'Your name' }).focus();

    rerender(<Form errors={[...ERRORS]} />);

    expect(screen.getByRole('alert').parentElement).toHaveFocus();
  });

  it('links each error to its field, moving focus there when chosen', async () => {
    const user = userEvent.setup();
    render(<Form errors={ERRORS} />);

    await user.click(screen.getByRole('link', { name: 'Enter a message' }));

    expect(screen.getByRole('textbox', { name: 'Your message' })).toHaveFocus();
  });

  it('scrolls the field’s label into view as well, so people can see what it’s for', async () => {
    const user = userEvent.setup();
    render(<Form errors={ERRORS} />);
    const label = screen.getByText('Your name', { selector: 'label' });
    const scrollIntoView = vi.spyOn(label, 'scrollIntoView');

    await user.click(screen.getByRole('link', { name: 'Enter your name' }));

    expect(scrollIntoView).toHaveBeenCalled();
  });

  it('leaves the link to work normally if the field can’t be found', async () => {
    const user = userEvent.setup();
    render(<ErrorSummary errors={[{ fieldId: 'missing', message: 'Something is wrong' }]} />);
    const link = screen.getByRole('link', { name: 'Something is wrong' });

    await user.click(link);

    expect(link).toHaveAttribute('href', '#missing');
  });

  it('can have a different title', () => {
    render(<ErrorSummary errors={ERRORS} title="Check your message" />);

    expect(screen.getByRole('alert', { name: 'Check your message' })).toBeInTheDocument();
  });

  it('has no detectable accessibility issues', async () => {
    const { container } = render(<Form errors={ERRORS} />);

    await expectNoAxeViolations(container, { disableRules: ['region'] });
  });
});
