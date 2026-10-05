import type { FormError } from '../components/ErrorSummary';
import { countCharacters } from '../utils/countCharacters';

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

export const EMPTY_MESSAGE: ContactMessage = { name: '', email: '', message: '' };

/** The id of each field, so error messages can link to it. */
export const FIELD_IDS: Record<keyof ContactMessage, string> = {
  name: 'contact-name',
  email: 'contact-email',
  message: 'contact-message',
};

/**
 * The longest message, in characters. Plenty for a message, and well within the 50KB EmailJS accepts
 * on the free plan, so a long message is stopped here with a clear error rather than failing to send.
 */
export const MESSAGE_LIMIT = 5000;

// Deliberately simple: something, an @, something, a dot, something. Strict patterns reject real
// addresses, and the only real test of an address is whether a reply arrives.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Checks a message before it's sent. Each error says what's wrong and how to fix it, in the same
 * order as the fields (WCAG 3.3.1 and 3.3.3).
 */
export function validateMessage(message: ContactMessage): FormError[] {
  const errors: FormError[] = [];
  const email = message.email.trim();

  if (message.name.trim() === '') {
    errors.push({ fieldId: FIELD_IDS.name, message: 'Enter your name' });
  }

  if (email === '') {
    errors.push({ fieldId: FIELD_IDS.email, message: 'Enter your email address' });
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.push({
      fieldId: FIELD_IDS.email,
      message: 'Enter an email address in the correct format, like name@example.com',
    });
  }

  if (message.message.trim() === '') {
    errors.push({ fieldId: FIELD_IDS.message, message: 'Enter your message' });
  } else if (countCharacters(message.message) > MESSAGE_LIMIT) {
    errors.push({
      fieldId: FIELD_IDS.message,
      message: `Your message must be ${MESSAGE_LIMIT.toLocaleString('en-GB')} characters or fewer`,
    });
  }

  return errors;
}

/** The message with spaces trimmed from the ends of each field, ready to send. */
export function tidyMessage(message: ContactMessage): ContactMessage {
  return {
    name: message.name.trim(),
    email: message.email.trim(),
    message: message.message.trim(),
  };
}
