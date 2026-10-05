import type { ContactMessage } from './message';

const ENDPOINT = 'https://api.emailjs.com/api/v1.0/email/send';

export interface EmailConfig {
  serviceId: string;
  templateId: string;
  /** EmailJS public keys are designed to be public. They can only send my template to me. */
  publicKey: string;
}

/** The EmailJS settings from environment variables, or nothing if any are missing. */
export function emailConfigFromEnv(
  env: Record<string, unknown> = import.meta.env,
): EmailConfig | undefined {
  const serviceId = env.VITE_EMAILJS_SERVICE_ID;
  const templateId = env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = env.VITE_EMAILJS_PUBLIC_KEY;

  if (
    typeof serviceId !== 'string' ||
    typeof templateId !== 'string' ||
    typeof publicKey !== 'string'
  ) {
    return undefined;
  }
  if (!serviceId || !templateId || !publicKey) return undefined;

  return { serviceId, templateId, publicKey };
}

/**
 * Sends a message to me by email, through EmailJS. The EmailJS template uses {{from_name}},
 * {{reply_to}} and {{message}}, and sets Reply To to {{reply_to}}, so I can reply straight to the
 * sender. Throws if it isn't set up or doesn't succeed.
 */
export async function sendMessage(
  message: ContactMessage,
  config: EmailConfig | undefined = emailConfigFromEnv(),
  send: typeof fetch = fetch,
): Promise<void> {
  if (!config) throw new Error('Email sending isn’t set up. Add the EmailJS settings to .env.');

  const response = await send(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      service_id: config.serviceId,
      template_id: config.templateId,
      user_id: config.publicKey,
      template_params: {
        from_name: message.name,
        reply_to: message.email,
        message: message.message,
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`EmailJS couldn’t send the message: ${response.status}`);
  }
}
