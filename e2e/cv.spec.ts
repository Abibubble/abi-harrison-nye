import { type Page, expect, test } from './support/test';

/** Prints the page to an A4 PDF, as "Save as PDF" would, and counts its pages. */
async function printedPages(page: Page): Promise<number> {
  const pdf = await page.pdf({ format: 'A4' });
  return pdf.toString('latin1').match(/\/Type\s*\/Page[^s]/g)?.length ?? 0;
}

test.describe('CV', () => {
  test('prints without the navigation, display settings or print button', async ({ page }) => {
    await page.goto('/cv');
    await page.emulateMedia({ media: 'print' });

    await expect(page.getByRole('navigation', { name: 'Main' })).toBeHidden();
    await expect(page.getByRole('combobox', { name: 'Theme' })).toBeHidden();
    await expect(page.getByRole('button', { name: 'Print or save as PDF' })).toBeHidden();
    await expect(page.getByRole('heading', { level: 2, name: 'Experience' })).toBeVisible();
  });

  test('prints the web address after links to other sites, as they can’t be clicked on paper', async ({
    page,
  }) => {
    await page.goto('/cv');
    await page.emulateMedia({ media: 'print' });
    const github = page.getByRole('link', { name: 'GitHub (external site)' });

    expect(await github.evaluate((link) => getComputedStyle(link, '::after').content)).toContain(
      'https://github.com/Abibubble',
    );
  });

  test('uses the full width of the page when printed', async ({ page }) => {
    await page.goto('/cv');
    await page.emulateMedia({ media: 'print' });

    const { content, viewport } = await page.evaluate(() => ({
      content: document.querySelector('main')?.getBoundingClientRect().width ?? 0,
      viewport: window.innerWidth,
    }));

    expect(content / viewport).toBeGreaterThan(0.9);
  });

  test.describe('print layouts', () => {
    test.skip(
      ({ browserName }) => browserName !== 'chromium',
      'Only Chromium can save PDFs in tests',
    );

    test('fits the compact layout on two A4 pages, with fewer pages than the clear layout', async ({
      page,
    }) => {
      await page.goto('/cv');
      await page.evaluate(() => document.fonts.ready);
      const clear = await printedPages(page);

      await page.getByRole('radio', { name: 'Compact' }).check();
      const compact = await printedPages(page);

      expect(compact, 'the compact CV no longer fits on two pages').toBeLessThanOrEqual(2);
      expect(clear).toBeGreaterThan(compact);
    });
  });

  test('leaves out the repeated site header in the compact layout only', async ({ page }) => {
    await page.goto('/cv');
    await page.emulateMedia({ media: 'print' });
    await expect(page.getByRole('banner')).toBeVisible();

    await page.emulateMedia({ media: 'screen' });
    await page.getByRole('radio', { name: 'Compact' }).check();
    await page.emulateMedia({ media: 'print' });

    await expect(page.getByRole('banner')).toBeHidden();
    await expect(
      page.getByText('Software engineer and accessibility specialist, Hertfordshire'),
    ).toBeVisible();
  });

  test('hides the print button without JavaScript, as it couldn’t work', async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto('/cv');

    await expect(page.getByRole('button', { name: 'Print or save as PDF' })).toBeHidden();
    await expect(page.getByRole('radio', { name: 'Compact' })).toBeHidden();
    await context.close();
  });
});
