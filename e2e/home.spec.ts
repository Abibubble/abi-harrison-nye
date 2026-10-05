import { expect, test } from '@playwright/test';

test.describe('Home page', () => {
  test('is served as prerendered HTML', async ({ request }) => {
    const response = await request.get('/');
    const html = await response.text();

    expect(response.ok()).toBe(true);
    expect(html).toMatch(/<h1[^>]*>Abi Harrison-Nye<\/h1>/);
  });

  test('sets the page language and title', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('html')).toHaveAttribute('lang', 'en-GB');
    await expect(page).toHaveTitle('Abi Harrison-Nye, Software Engineer');
  });
});
