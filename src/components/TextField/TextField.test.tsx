import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { expectNoAxeViolations } from '../../test/axe';
import { TextField } from './TextField';

describe('TextField', () => {
  it('has a visible label connected to the input', () => {
    render(<TextField label="Your name" />);

    expect(screen.getByRole('textbox', { name: 'Your name' })).toBeInTheDocument();
    expect(screen.getByText('Your name')).toBeVisible();
  });

  it('is required unless marked optional, and says so in the label text', () => {
    const { rerender } = render(<TextField label="Your name" />);
    expect(screen.getByRole('textbox', { name: 'Your name' })).toBeRequired();

    rerender(<TextField label="Company" optional />);
    expect(screen.getByRole('textbox', { name: 'Company (optional)' })).not.toBeRequired();
  });

  it('reads out the hint along with the input', () => {
    render(<TextField label="Your email address" hint="So I can reply to you" />);

    expect(screen.getByRole('textbox')).toHaveAccessibleDescription('So I can reply to you');
  });

  describe('with an error', () => {
    it('marks the input as invalid and reads out the error, saying it is one', () => {
      render(
        <TextField
          label="Your email address"
          hint="So I can reply to you"
          error="Enter an email address in the correct format, like name@example.com"
        />,
      );
      const input = screen.getByRole('textbox');

      expect(input).toBeInvalid();
      expect(input).toHaveAccessibleDescription(
        'So I can reply to you Error: Enter an email address in the correct format, like name@example.com',
      );
    });

    it('puts the error between the label and the input, where people look when fixing it', () => {
      render(<TextField label="Your name" error="Enter your name" />);
      const error = screen.getByText('Enter your name');
      const input = screen.getByRole('textbox');

      expect(error.compareDocumentPosition(input) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    });

    it('has no detectable accessibility issues', async () => {
      const { container } = render(<TextField label="Your name" error="Enter your name" />);

      await expectNoAxeViolations(container, { disableRules: ['region'] });
    });
  });

  it('is not announced as invalid without an error', () => {
    render(<TextField label="Your name" />);

    expect(screen.getByRole('textbox')).not.toHaveAttribute('aria-invalid');
    expect(screen.getByRole('textbox')).not.toHaveAttribute('aria-describedby');
  });

  it('uses a given id, so an error summary can link to it', () => {
    render(<TextField id="name" label="Your name" />);

    expect(screen.getByRole('textbox')).toHaveAttribute('id', 'name');
  });

  it('passes input attributes through, such as autocomplete (WCAG 1.3.5)', async () => {
    const user = userEvent.setup();
    render(<TextField label="Your email address" type="email" autoComplete="email" />);
    const input = screen.getByRole('textbox');

    await user.type(input, 'abi@example.com');

    expect(input).toHaveAttribute('type', 'email');
    expect(input).toHaveAttribute('autocomplete', 'email');
    expect(input).toHaveValue('abi@example.com');
  });

  it('has no detectable accessibility issues', async () => {
    const { container } = render(<TextField label="Your name" hint="As you'd like to be called" />);

    await expectNoAxeViolations(container, { disableRules: ['region'] });
  });
});
