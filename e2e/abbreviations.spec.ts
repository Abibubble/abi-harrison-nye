import { type Page, expect, test } from './support/test';

const tooltip = (page: Page, text: string) =>
  page.locator('[aria-hidden="true"]').getByText(text, { exact: true });

test.describe('Abbreviations', () => {
  test('show their full form on hover, which stays while the pointer moves onto it', async ({
    page,
  }) => {
    await page.goto('/');
    const hand = page.getByRole('button', { name: 'HAND' }).first();

    await hand.hover();
    await expect(tooltip(page, 'Home of Accessibility and NeuroDiversity')).toBeVisible();

    await tooltip(page, 'Home of Accessibility and NeuroDiversity').hover();
    await expect(tooltip(page, 'Home of Accessibility and NeuroDiversity')).toBeVisible();

    await page.mouse.move(0, 0);
    await expect(tooltip(page, 'Home of Accessibility and NeuroDiversity')).toBeHidden();
  });

  test('show their full form on focus, and hide it with Escape (WCAG 1.4.13)', async ({ page }) => {
    await page.goto('/');
    const hand = page.getByRole('button', { name: 'HAND' }).first();

    await hand.focus();
    await expect(tooltip(page, 'Home of Accessibility and NeuroDiversity')).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(tooltip(page, 'Home of Accessibility and NeuroDiversity')).toBeHidden();
    await expect(hand).toBeFocused();
  });

  test('keep their full form on screen at 320px, without the page scrolling sideways', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 320, height: 640 });
    await page.goto('/cv');
    const abbreviations = page.locator('button[data-abbr]');

    for (const abbreviation of await abbreviations.all()) {
      await abbreviation.focus();
      const sideways = await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
      );
      expect(sideways, (await abbreviation.textContent()) ?? '').toBe(false);
    }
  });
});
