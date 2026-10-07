import { test as base, expect } from '@playwright/test';

export * from '@playwright/test';

const EMAILJS = /^https?:\/\/api\.emailjs\.com\//;

// A stand in for EmailJS, so the tests don't send anything or use up any credits
interface FakeEmailJs {
  answerWith: (...statuses: number[]) => void;
  requests: unknown[];
}

interface Options {
  /** Wait for React to start after each page load. Turn off to test what happens before it does. */
  waitForReact: boolean;
}

export const test = base.extend<{ emailJs: FakeEmailJs } & Options>({
  waitForReact: [true, { option: true }],
  // Pages are prerendered, so they appear before React starts. Using them sooner, as a slow test
  // runner can, means clicks and choices aren't handled yet. So each page load waits for React.
  page: async ({ page, waitForReact, javaScriptEnabled }, provide) => {
    // Without JavaScript, React never starts, so there's nothing to wait for.
    if (waitForReact && javaScriptEnabled) {
      const goto = page.goto.bind(page);
      page.goto = async (...args) => {
        const response = await goto(...args);
        await page.locator('html[data-hydrated]').waitFor({ state: 'attached' });
        return response;
      };
    }
    await provide(page);
  },
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
