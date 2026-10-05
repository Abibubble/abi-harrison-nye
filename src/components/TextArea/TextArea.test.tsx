import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { expectNoAxeViolations } from '../../test/axe';
import { ANNOUNCE_DELAY, characterCountText } from './CharacterCount';
import { TextArea } from './TextArea';

function LimitedTextArea({ limit = 100 }: { limit?: number }) {
  const [value, setValue] = useState('');
  return (
    <TextArea
      label="Your message"
      hint="Tell me anything"
      characterLimit={limit}
      value={value}
      onChange={(event) => {
        setValue(event.target.value);
      }}
    />
  );
}

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

  describe('with a character limit', () => {
    function setup(limit?: number) {
      const user = userEvent.setup();
      render(<LimitedTextArea limit={limit} />);
      return { user, textArea: screen.getByRole('textbox') };
    }

    it('shows the limit before anything is typed, as part of its description', () => {
      const { textArea } = setup(5000);

      expect(screen.getByText('You have 5,000 characters remaining')).toBeVisible();
      expect(textArea).toHaveAccessibleDescription(
        'Tell me anything You have 5,000 characters remaining',
      );
    });

    it('counts down as people type', async () => {
      const { user, textArea } = setup();

      await user.type(textArea, 'Hello');

      expect(textArea).toHaveAccessibleDescription(/You have 95 characters remaining/);
    });

    it('keeps everything typed past the limit, and says how many too many', async () => {
      const { user, textArea } = setup(10);

      await user.click(textArea);
      await user.paste('Twelve chars');

      expect(textArea).toHaveValue('Twelve chars');
      expect(textArea).not.toHaveAttribute('maxlength');
      expect(screen.getByText('You have 2 characters too many')).toBeVisible();
    });

    it('has no detectable accessibility issues', async () => {
      const { container } = render(<LimitedTextArea />);

      await expectNoAxeViolations(container, { disableRules: ['region'] });
    });

    describe('for screen readers', () => {
      beforeEach(() => {
        vi.useFakeTimers();
      });

      afterEach(() => {
        vi.useRealTimers();
      });

      function typeIn(textArea: HTMLElement, value: string) {
        fireEvent.change(textArea, { target: { value } });
      }

      function waitForPause() {
        act(() => {
          vi.advanceTimersByTime(ANNOUNCE_DELAY);
        });
      }

      it('waits for typing to pause, and only says the count near the limit', () => {
        render(<LimitedTextArea />);
        const textArea = screen.getByRole('textbox');
        const status = screen.getByRole('status');

        typeIn(textArea, 'a'.repeat(50));
        waitForPause();
        expect(status).toHaveTextContent('');

        typeIn(textArea, 'a'.repeat(95));
        expect(status).toHaveTextContent('');
        waitForPause();
        expect(status).toHaveTextContent('You have 5 characters remaining');
      });

      it('stops once the text is back away from the limit', () => {
        render(<LimitedTextArea />);
        const textArea = screen.getByRole('textbox');
        typeIn(textArea, 'a'.repeat(95));
        waitForPause();

        typeIn(textArea, '');
        waitForPause();

        expect(screen.getByRole('status')).toHaveTextContent('');
      });
    });
  });
});

describe('characterCountText', () => {
  it.each([
    [5000, 'You have 5,000 characters remaining'],
    [1, 'You have 1 character remaining'],
    [0, 'You have 0 characters remaining'],
    [-1, 'You have 1 character too many'],
    [-1200, 'You have 1,200 characters too many'],
  ])('describes %i characters left as "%s"', (remaining, text) => {
    expect(characterCountText(remaining)).toBe(text);
  });
});
