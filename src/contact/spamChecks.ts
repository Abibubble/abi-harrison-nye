/** Nobody can read the form and fill it in faster than this, but spam bots do */
export const MIN_SECONDS_ON_PAGE = 3;

/** The shortest time between messages from the same browser */
export const SECONDS_BETWEEN_MESSAGES = 60;

const LAST_SENT_KEY = 'contact-last-sent';

/** Whether the form was ready to send too soon after the page started loading for a person */
export function tooFastForAPerson(pageAgeInMs: number): boolean {
  return pageAgeInMs < MIN_SECONDS_ON_PAGE * 1000;
}

/** How long until this browser can send another message, or 0 if it can now */
export function secondsUntilNextMessage(now: number, storage = safeStorage()): number {
  const lastSent = Number(read(storage));
  if (!lastSent) return 0;
  const waited = (now - lastSent) / 1000;
  return waited >= SECONDS_BETWEEN_MESSAGES ? 0 : Math.ceil(SECONDS_BETWEEN_MESSAGES - waited);
}

/** Notes when a message was sent, so the next one has to wait */
export function rememberSent(now: number, storage = safeStorage()): void {
  try {
    storage?.setItem(LAST_SENT_KEY, String(now));
  } catch {
    // Storage can be turned off, for example in private browsing. The form still works.
  }
}

function read(storage: Storage | undefined): string | null {
  try {
    return storage?.getItem(LAST_SENT_KEY) ?? null;
  } catch {
    return null;
  }
}

function safeStorage(): Storage | undefined {
  try {
    return window.localStorage;
  } catch {
    return undefined;
  }
}
