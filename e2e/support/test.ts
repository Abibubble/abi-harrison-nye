import { test as base, expect } from '@playwright/test';

export * from '@playwright/test';

const EMAILJS = /^https?:\/\/api\.emailjs\.com\//;

// A stand in for EmailJS, so the tests don't send anything or use up any credits
interface FakeEmailJs {
  answerWith: (...statuses: number[]) => void;
  requests: unknown[];
}

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
