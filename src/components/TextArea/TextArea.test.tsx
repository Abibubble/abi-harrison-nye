import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { expectNoAxeViolations } from '../../test/axe';
import { TextArea } from './TextArea';

describe('TextArea', () => {
  it('has a visible label connected to the text area', () => {
    render(<TextArea label="Your message" />);
    const textArea = screen.getByRole('textbox', { name: 'Your message' });

    expect(textArea.tagName).toBe('TEXTAREA');
    expect(textArea).toBeRequired();
  });

  it('is 8 rows tall by default', () => {
    render(<TextArea label="Your message" />);

    expect(screen.getByRole('textbox')).toHaveAttribute('rows', '8');
  });

  it('reads out its hint and error along with it', () => {
    render(<TextArea label="Your message" hint="Up to 500 words" error="Enter a message" />);
    const textArea = screen.getByRole('textbox');

    expect(textArea).toBeInvalid();
    expect(textArea).toHaveAccessibleDescription('Up to 500 words Error: Enter a message');
  });

  it('can be optional', () => {
    render(<TextArea label="Anything else" optional />);

    expect(screen.getByRole('textbox', { name: 'Anything else (optional)' })).not.toBeRequired();
  });

  it('has no detectable accessibility issues', async () => {
    const { container } = render(<TextArea label="Your message" error="Enter a message" />);

    await expectNoAxeViolations(container, { disableRules: ['region'] });
  });
});
