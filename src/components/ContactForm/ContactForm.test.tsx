import { screen } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router';
import userEvent, { type UserEvent } from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import type { ContactMessage } from '../../contact/message';
import { expectNoAxeViolations } from '../../test/axe';
import { renderWithRouter } from '../../test/render';
import { ContactForm } from './ContactForm';

const nameField = () => screen.getByRole('textbox', { name: 'Your name' });
const emailField = () => screen.getByRole('textbox', { name: 'Your email address' });
const messageField = () => screen.getByRole('textbox', { name: 'Your message' });
const button = (name: string) => screen.getByRole('button', { name });

function renderForm(
  send = vi.fn<(message: ContactMessage) => Promise<void>>().mockResolvedValue(),
) {
  const user = userEvent.setup();
  renderWithRouter(<ContactForm send={send} />);
  return { user, send };
}

async function fillIn(user: UserEvent) {
  await user.type(nameField(), 'Sam');
  await user.type(emailField(), 'sam@example.com');
  await user.type(messageField(), 'Hello!{Enter}Second line.');
}

describe('ContactForm', () => {
  it('can’t be sent by the browser itself before React is running, which would put it in the address', () => {
    const prerendered = renderToString(
      <MemoryRouter>
        <ContactForm />
      </MemoryRouter>,
    );

    expect(prerendered).toMatch(/<button type="button"[^>]*>Continue<\/button>/);
    expect(prerendered).not.toContain('type="submit"');
  });

  it('can be sent once React is running', () => {
    renderForm();

    expect(button('Continue')).toHaveAttribute('type', 'submit');
  });

  describe('writing', () => {
    it('has a visible, labelled field for each part of the message, with autocomplete', () => {
      renderForm();

      expect(nameField()).toHaveAttribute('autocomplete', 'name');
      expect(emailField()).toHaveAttribute('autocomplete', 'email');
      expect(emailField()).toHaveAttribute('type', 'email');
      expect(messageField()).toBeRequired();
    });

    it('explains why the email address is needed', () => {
      renderForm();

      expect(emailField()).toHaveAccessibleDescription(
        'So I can reply to you. I won’t share it with anyone.',
      );
    });

    it('doesn’t show errors while people are still typing', async () => {
      const { user } = renderForm();

      await user.type(emailField(), 'not an email');

      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
      expect(emailField()).not.toHaveAttribute('aria-invalid');
    });
  });

  describe('errors', () => {
    it('lists every problem in a summary, which takes focus, and marks each field', async () => {
      const { user, send } = renderForm();

      await user.click(button('Continue'));

      const summary = screen.getByRole('alert', { name: 'There’s a problem' });
      expect(summary).toHaveTextContent('Enter your name');
      expect(summary).toHaveTextContent('Enter your email address');
      expect(summary).toHaveTextContent('Enter your message');
      expect(summary.parentElement).toHaveFocus();
      expect(nameField()).toHaveAttribute('aria-invalid', 'true');
      expect(send).not.toHaveBeenCalled();
    });

    it('explains the format when the email address isn’t valid', async () => {
      const { user } = renderForm();
      await fillIn(user);
      await user.clear(emailField());
      await user.type(emailField(), 'sam@example');

      await user.click(button('Continue'));

      expect(emailField()).toHaveAccessibleDescription(
        /Enter an email address in the correct format/,
      );
    });

    it('stops a message that’s over the character limit, keeping all of it', async () => {
      const { user, send } = renderForm();
      await fillIn(user);
      await user.clear(messageField());
      await user.click(messageField());
      await user.paste('a'.repeat(5001));

      await user.click(button('Continue'));

      expect(screen.getByRole('alert', { name: 'There’s a problem' })).toHaveTextContent(
        'Your message must be 5,000 characters or fewer',
      );
      expect(messageField()).toHaveAccessibleDescription(
        /Your message must be 5,000 characters or fewer You have 1 character too many/,
      );
      expect(messageField()).toHaveValue('a'.repeat(5001));
      expect(send).not.toHaveBeenCalled();
    });

    it('keeps what was typed while errors are fixed', async () => {
      const { user } = renderForm();
      await user.type(nameField(), 'Sam');

      await user.click(button('Continue'));

      expect(nameField()).toHaveValue('Sam');
    });
  });

  describe('checking', () => {
    it('shows exactly what will be sent before sending, with focus on its heading (WCAG 3.3.6)', async () => {
      const { user, send } = renderForm();
      await fillIn(user);

      await user.click(button('Continue'));

      const heading = screen.getByRole('heading', { level: 2, name: 'Check your message' });
      expect(heading).toHaveFocus();
      expect(screen.getByRole('region', { name: 'Check your message' })).toHaveTextContent(
        'sam@example.com',
      );
      expect(screen.getByText(/Hello!/)).toHaveTextContent('Hello! Second line.');
      expect(send).not.toHaveBeenCalled();
    });

    it('explains where the message goes, linking to the privacy notice', async () => {
      const { user } = renderForm();
      await fillIn(user);
      await user.click(button('Continue'));

      expect(screen.getByRole('link', { name: 'How your information is used' })).toHaveAttribute(
        'href',
        '/privacy#contact-form',
      );
    });

    it('goes back to the form to change the message, keeping everything and focusing the first field', async () => {
      const { user } = renderForm();
      await fillIn(user);
      await user.click(button('Continue'));

      await user.click(button('Change your message'));

      expect(nameField()).toHaveFocus();
      expect(nameField()).toHaveValue('Sam');
      expect(messageField()).toHaveValue('Hello!\nSecond line.');
    });
  });

  describe('sending', () => {
    it('sends the message tidied up, then confirms it was sent, with focus on the confirmation', async () => {
      const { user, send } = renderForm();
      await user.type(nameField(), '  Sam ');
      await user.type(emailField(), 'sam@example.com');
      await user.type(messageField(), 'Hello!');
      await user.click(button('Continue'));

      await user.click(button('Send message'));

      expect(send).toHaveBeenCalledWith({
        name: 'Sam',
        email: 'sam@example.com',
        message: 'Hello!',
      });
      const notice = await screen.findByRole('alert', { name: 'Message sent' });
      expect(notice).toHaveTextContent('Thanks, Sam. I’ll reply to sam@example.com');
      expect(notice.parentElement).toHaveFocus();
    });

    it('says it’s sending, and only sends once however many times the button is pressed', async () => {
      let finish: () => void = () => undefined;
      const send = vi.fn<(message: ContactMessage) => Promise<void>>(
        () =>
          new Promise<void>((resolve) => {
            finish = resolve;
          }),
      );
      const { user } = renderForm(send);
      await fillIn(user);
      await user.click(button('Continue'));

      await user.click(button('Send message'));
      await user.click(button('Send message'));

      expect(screen.getByRole('status')).toHaveTextContent('Sending your message…');
      expect(send).toHaveBeenCalledTimes(1);
      finish();
      expect(await screen.findByRole('alert', { name: 'Message sent' })).toBeInTheDocument();
    });

    it('can start a new message after sending', async () => {
      const { user } = renderForm();
      await fillIn(user);
      await user.click(button('Continue'));
      await user.click(button('Send message'));

      await user.click(await screen.findByRole('button', { name: 'Send another message' }));

      expect(nameField()).toHaveValue('');
      expect(nameField()).toHaveFocus();
    });
  });

  describe('when sending fails', () => {
    it('says so, with focus on the message, and keeps everything that was written', async () => {
      const send = vi
        .fn<(message: ContactMessage) => Promise<void>>()
        .mockRejectedValue(new Error('down'));
      const { user } = renderForm(send);
      await fillIn(user);
      await user.click(button('Continue'));

      await user.click(button('Send message'));

      const notice = await screen.findByRole('alert', { name: 'Your message wasn’t sent' });
      expect(notice).toHaveTextContent('Nothing you wrote has been lost');
      expect(notice.parentElement).toHaveFocus();
      expect(screen.getByRole('region', { name: 'Check your message' })).toHaveTextContent(
        'Hello!',
      );
    });

    it('can try again', async () => {
      const send = vi
        .fn<(message: ContactMessage) => Promise<void>>()
        .mockRejectedValueOnce(new Error('down'))
        .mockResolvedValueOnce();
      const { user } = renderForm(send);
      await fillIn(user);
      await user.click(button('Continue'));
      await user.click(button('Send message'));

      await user.click(await screen.findByRole('button', { name: 'Try sending again' }));

      expect(await screen.findByRole('alert', { name: 'Message sent' })).toBeInTheDocument();
      expect(send).toHaveBeenCalledTimes(2);
    });
  });

  describe('spam', () => {
    it('hides the trap field from everyone, including screen readers and keyboards', () => {
      const { container } = renderWithRouter(<ContactForm send={vi.fn()} />);
      const trap = container.querySelector('input[name="website"]');

      expect(trap?.closest('[aria-hidden="true"]')).not.toBeNull();
      expect(trap).toHaveAttribute('tabindex', '-1');
    });

    it('pretends to send when the trap field is filled in, without sending anything', async () => {
      const { user, send } = renderForm();
      const { container } = { container: document.body };
      const trap = container.querySelector<HTMLInputElement>('input[name="website"]');
      if (trap) await user.type(trap, 'spam');

      await user.click(button('Continue'));

      expect(await screen.findByRole('alert', { name: 'Message sent' })).toBeInTheDocument();
      expect(send).not.toHaveBeenCalled();
    });
  });

  it.each([
    ['writing', () => Promise.resolve()],
    [
      'checking',
      async (user: UserEvent) => {
        await fillIn(user);
        await user.click(button('Continue'));
      },
    ],
    [
      'with errors',
      async (user: UserEvent) => {
        await user.click(button('Continue'));
      },
    ],
  ])('has no detectable accessibility issues when %s', async (_step, getThere) => {
    const user = userEvent.setup();
    const { container } = renderWithRouter(<ContactForm send={vi.fn()} />);
    await getThere(user);

    await expectNoAxeViolations(container, { disableRules: ['region'] });
  });
});
