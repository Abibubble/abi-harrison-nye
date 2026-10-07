import type { ContactMessage } from './message';

const ENDPOINT = 'https://api.emailjs.com/api/v1.0/email/send';

export interface EmailConfig {
  serviceId: string;
  templateId: string;
  publicKey: string;
}

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
