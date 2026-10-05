import { describe, expect, it } from 'vitest';

import { EMPTY_MESSAGE, FIELD_IDS, MESSAGE_LIMIT, tidyMessage, validateMessage } from './message';

const VALID = { name: 'Sam', email: 'sam@example.com', message: 'Hello!' };

describe('validateMessage', () => {
  it('accepts a complete message', () => {
    expect(validateMessage(VALID)).toEqual([]);
  });

  it('asks for every field when nothing is filled in, in the order of the fields', () => {
    expect(validateMessage(EMPTY_MESSAGE)).toEqual([
      { fieldId: FIELD_IDS.name, message: 'Enter your name' },
      { fieldId: FIELD_IDS.email, message: 'Enter your email address' },
      { fieldId: FIELD_IDS.message, message: 'Enter your message' },
    ]);
  });

  it('treats fields with only spaces as empty', () => {
    expect(validateMessage({ name: '  ', email: ' ', message: '\n ' })).toHaveLength(3);
  });

  it.each(['sam', 'sam@example', 'sam example@example.com', '@example.com'])(
    'explains the format when the email address is %s',
    (email) => {
      expect(validateMessage({ ...VALID, email })).toEqual([
        {
          fieldId: FIELD_IDS.email,
          message: 'Enter an email address in the correct format, like name@example.com',
        },
      ]);
    },
  );

  it.each(['sam@example.com', 'sam.smith+site@mail.example.co.uk', '  sam@example.com  '])(
    'accepts the email address %s',
    (email) => {
      expect(validateMessage({ ...VALID, email })).toEqual([]);
    },
  );

  it('accepts a message right up to the limit', () => {
    expect(validateMessage({ ...VALID, message: 'a'.repeat(MESSAGE_LIMIT) })).toEqual([]);
  });

  it('says what the limit is when the message is over it', () => {
    expect(validateMessage({ ...VALID, message: 'a'.repeat(MESSAGE_LIMIT + 1) })).toEqual([
      { fieldId: FIELD_IDS.message, message: 'Your message must be 5,000 characters or fewer' },
    ]);
  });
});

describe('tidyMessage', () => {
  it('trims spaces from the ends of each field, keeping those inside', () => {
    expect(
      tidyMessage({ name: ' Sam ', email: ' sam@example.com ', message: ' Hi there. \n' }),
    ).toEqual({
      name: 'Sam',
      email: 'sam@example.com',
      message: 'Hi there.',
    });
  });
});
