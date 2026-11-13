import { expect, test } from './support/test';

test.describe('Abbreviations', () => {
  test('are plain text after their first use, with nothing extra to focus or hear', async ({
    page,
  }) => {
    await page.goto('/cv');
    const abbreviations = page.getByRole('main').locator('abbr');

    expect(await abbreviations.count()).toBeGreaterThan(10);
    await expect(page.getByRole('main').locator('abbr button, button abbr')).toHaveCount(0);
    for (const abbreviation of await abbreviations.all()) {
      await expect(abbreviation).not.toHaveAttribute('tabindex');
      await expect(abbreviation).not.toHaveAttribute('aria-description');
    }
  });

  test('write HAND out in full once on the CV, though it’s used in several places', async ({
    page,
  }) => {
    await page.goto('/cv');
    const main = (await page.getByRole('main').textContent()) ?? '';

    expect(main.match(/Home of Accessibility and NeuroDiversity/g)).toHaveLength(1);
    expect(main.match(/\bHAND\b/g)?.length).toBeGreaterThan(1);
  });
});
