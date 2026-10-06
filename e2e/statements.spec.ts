import { expect, test } from './support/test';

test.describe('Accessibility and Privacy pages', () => {
  for (const path of ['/accessibility', '/privacy']) {
    test(`${path} contents move focus to each section`, async ({ page }) => {
      await page.goto(path);
      const contents = page.getByRole('navigation', { name: 'On this page' });
      const links = await contents.getByRole('link').all();
      expect(links.length).toBeGreaterThan(5);

      for (const link of links) {
        const name = (await link.textContent()) ?? '';
        await link.click();
        const heading = page.getByRole('heading', { level: 2, name, exact: true });
        await expect(heading).toBeFocused();
        await expect(heading).toBeInViewport();
        await page.keyboard.press('Shift+Tab');
      }
    });
  }

  test('the contact form’s link goes to the contact form section of the privacy notice', async ({
    page,
  }) => {
    await page.goto('/contact');
    await page.getByRole('textbox', { name: 'Your name' }).fill('Sam');
    await page.getByRole('textbox', { name: 'Your email address' }).fill('sam@example.com');
    await page.getByRole('textbox', { name: 'Your message' }).fill('Hello!');
    await page.getByRole('button', { name: 'Continue' }).click();

    await page.getByRole('link', { name: 'How your information is used' }).click();

    await expect(page).toHaveURL(/\/privacy#contact-form$/);
    await expect(
      page.getByRole('heading', { level: 2, name: 'The contact form' }),
    ).toBeInViewport();
  });

  test('the privacy notice’s link goes to the display settings', async ({ page }) => {
    await page.goto('/privacy');

    await page
      .getByRole('region', { name: 'Display settings' })
      .getByRole('link', { name: 'display settings' })
      .click();

    await expect(page).toHaveURL(/\/accessibility#display-settings$/);
    await expect(
      page.getByRole('heading', { level: 2, name: 'Display settings' }),
    ).toBeInViewport();
  });
});
