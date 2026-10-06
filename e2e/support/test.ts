import { test as base, expect } from '@playwright/test';

export * from '@playwright/test';

const EMAILJS = /^https?:\/\/api\.emailjs\.com\//;

/** A stand in for EmailJS, so the end to end tests never send anything or use up any credits. */
interface FakeEmailJs {
  /** Answers the next requests to EmailJS with these statuses, in order. */
  answerWith: (...statuses: number[]) => void;
  /** The body of every request that reached the stand in. */
  requests: unknown[];
}

/**
 * Playwright's test, with EmailJS blocked in every test. A test that sends a message has to plan
 * the answer with `emailJs.answerWith()`. Any request without one is blocked, and fails the test, so
 * a forgotten answer can never reach the real EmailJS, even with real settings in the build.
 */
export const test = base.extend<{ emailJs: FakeEmailJs }>({
  emailJs: [
    async ({ context }, use) => {
      const statuses: number[] = [];
      const requests: unknown[] = [];
      const unplanned: string[] = [];

      await context.route(EMAILJS, async (route) => {
        const request = route.request();
        requests.push(request.postDataJSON());
        const status = statuses.shift();
        if (status === undefined) {
          unplanned.push(request.url());
          await route.abort('blockedbyclient');
          return;
        }
        await route.fulfill({ status, body: status === 200 ? 'OK' : 'Error' });
      });

      await use({
        answerWith: (...next) => {
          statuses.push(...next);
        },
        requests,
      });

      expect(
        unplanned,
        'Something tried to reach EmailJS without an answer planned with emailJs.answerWith()',
      ).toEqual([]);
    },
    { auto: true },
  ],
});
