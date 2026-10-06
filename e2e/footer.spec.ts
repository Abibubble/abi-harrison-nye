import { expect, test } from './support/test';

test.describe('Footer copyright', () => {
  test('is prerendered with the year the site was built', async ({ request }) => {
    const html = await (await request.get('/')).text();

    expect(html).toContain(`© ${new Date().getFullYear()} Abi Harrison-Nye`);
  });

  test('updates to the visitor’s current year once the page loads', async ({ page }) => {
    await page.clock.setFixedTime(new Date('2031-06-01T12:00:00Z'));
    await page.goto('/');

    await expect(page.getByRole('contentinfo')).toContainText('© 2031 Abi Harrison-Nye');
  });

  test('loads without React reporting a hydration mismatch', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text());
    });
    page.on('pageerror', (error) => errors.push(error.message));

    await page.clock.setFixedTime(new Date('2031-06-01T12:00:00Z'));
    await page.goto('/');
    await expect(page.getByRole('contentinfo')).toContainText('2031');

    expect(errors).toEqual([]);
  });
});
