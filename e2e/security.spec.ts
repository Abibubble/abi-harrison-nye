import { ROUTES } from './support/routes';
import { type Page, expect, test } from './support/test';

async function recordViolations(page: Page): Promise<() => Promise<string[]>> {
  await page.addInitScript(() => {
    const blocked: string[] = [];
    Object.assign(window, { blockedByPolicy: blocked });
    document.addEventListener('securitypolicyviolation', (event) => {
      blocked.push(`${event.violatedDirective}: ${event.blockedURI || 'inline'}`);
    });
  });
  return () =>
    page.evaluate(() => (window as unknown as { blockedByPolicy: string[] }).blockedByPolicy);
}

test.describe('Content Security Policy', () => {
  for (const { name, path } of ROUTES) {
    test(`${name} runs everything it needs, with nothing blocked`, async ({ page }) => {
      const violations = await recordViolations(page);
      await page.goto(path);

      await expect(page.locator('html')).toHaveAttribute('data-js', '');
      await expect(page.getByRole('combobox', { name: 'Theme' })).toBeEnabled();
      expect(await violations()).toEqual([]);
    });
  }

  test('allows moving between pages, and sending a message to EmailJS', async ({
    page,
    emailJs,
  }) => {
    emailJs.answerWith(200);
    const violations = await recordViolations(page);
    await page.goto('/');

    await page
      .getByRole('navigation', { name: 'Main' })
      .getByRole('link', { name: 'Contact' })
      .click();
    await page.getByRole('textbox', { name: 'Your name' }).fill('Sam');
    await page.getByRole('textbox', { name: 'Your email address' }).fill('sam@example.com');
    await page.getByRole('textbox', { name: 'Your message' }).fill('Hello!');
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByRole('button', { name: 'Send message' }).click();

    await expect(page.getByRole('alert', { name: 'Message sent' })).toBeVisible();
    expect(emailJs.requests).toHaveLength(1);
    expect(await violations()).toEqual([]);
  });

  test('blocks a script the policy doesn’t know about', async ({ page }) => {
    const violations = await recordViolations(page);
    await page.goto('/');

    await page.evaluate(() => {
      const script = document.createElement('script');
      script.textContent = 'window.injected = true;';
      document.body.append(script);
    });

    expect(await page.evaluate(() => 'injected' in window)).toBe(false);
    expect(await violations()).toEqual(['script-src-elem: inline']);
  });
});
