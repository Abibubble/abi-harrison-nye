import type { FormError } from '../components/ErrorSummary';
import { countCharacters } from '../utils/countCharacters';

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

export const EMPTY_MESSAGE: ContactMessage = { name: '', email: '', message: '' };

export const FIELD_IDS: Record<keyof ContactMessage, string> = {
  name: 'contact-name',
  email: 'contact-email',
  message: 'contact-message',
};

export const MESSAGE_LIMIT = 5000;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

export function tidyMessage(message: ContactMessage): ContactMessage {
  return {
    name: message.name.trim(),
    email: message.email.trim(),
    message: message.message.trim(),
  };
}
