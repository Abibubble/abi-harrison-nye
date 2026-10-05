import { describe, expect, it, vi } from 'vitest';

import { emailConfigFromEnv, sendMessage } from './sendMessage';

const CONFIG = { serviceId: 'service_1', templateId: 'template_1', publicKey: 'public_1' };
const MESSAGE = { name: 'Sam', email: 'sam@example.com', message: 'Hello!' };

describe('emailConfigFromEnv', () => {
  it('reads the EmailJS settings', () => {
    expect(
      emailConfigFromEnv({
        VITE_EMAILJS_SERVICE_ID: 'service_1',
        VITE_EMAILJS_TEMPLATE_ID: 'template_1',
        VITE_EMAILJS_PUBLIC_KEY: 'public_1',
      }),
    ).toEqual(CONFIG);
  });

  it.each([
    {},
    { VITE_EMAILJS_SERVICE_ID: 'service_1', VITE_EMAILJS_TEMPLATE_ID: 'template_1' },
    {
      VITE_EMAILJS_SERVICE_ID: 'service_1',
      VITE_EMAILJS_TEMPLATE_ID: '',
      VITE_EMAILJS_PUBLIC_KEY: 'public_1',
    },
  ])('gives nothing when a setting is missing or empty: %o', (env) => {
    expect(emailConfigFromEnv(env)).toBeUndefined();
  });

  it('reads from the real environment by default', () => {
    expect(() => emailConfigFromEnv()).not.toThrow();
  });
});

describe('sendMessage', () => {
  it('sends the message to EmailJS, with the sender’s address to reply to', async () => {
    const send = vi.fn<typeof fetch>().mockResolvedValue(new Response('OK', { status: 200 }));

    await sendMessage(MESSAGE, CONFIG, send);

    expect(send).toHaveBeenCalledWith('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: 'service_1',
        template_id: 'template_1',
        user_id: 'public_1',
        template_params: { from_name: 'Sam', reply_to: 'sam@example.com', message: 'Hello!' },
      }),
    });
  });

  it('fails when EmailJS doesn’t accept the message', async () => {
    const send = vi.fn<typeof fetch>().mockResolvedValue(new Response('Bad', { status: 400 }));

    await expect(sendMessage(MESSAGE, CONFIG, send)).rejects.toThrow('400');
  });

  it('fails when it can’t reach EmailJS', async () => {
    const send = vi.fn<typeof fetch>().mockRejectedValue(new TypeError('Failed to fetch'));

    await expect(sendMessage(MESSAGE, CONFIG, send)).rejects.toThrow('Failed to fetch');
  });

  it('fails without sending anything when it isn’t set up', async () => {
    const send = vi.fn<typeof fetch>();

    await expect(sendMessage(MESSAGE, undefined, send)).rejects.toThrow('isn’t set up');
    expect(send).not.toHaveBeenCalled();
  });
});
