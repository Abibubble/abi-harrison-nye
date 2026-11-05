import { type Page, expect, test } from './support/test';

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

    test('keeps the compact layout on two pages when a browser extension adds to the page', async ({
      page,
    }) => {
      await page.goto('/cv');
      await page.evaluate(() => document.fonts.ready);
      await page.getByRole('radio', { name: 'Compact' }).check();
      // Extensions often add an element outside the body, which used to start a blank third page
      await page.evaluate(() => {
        document.documentElement.append(document.createElement('div'));
      });

      expect(await printedPages(page)).toBeLessThanOrEqual(2);
    });
  });

  test('leaves out talks, sites, interests and earlier career details in the compact layout only', async ({
    page,
  }) => {
    await page.goto('/cv');
    await page.emulateMedia({ media: 'print' });
    const speaking = page.getByRole('heading', { name: 'Speaking', exact: true });
    const sites = page.getByRole('heading', { name: 'Sites I’ve worked on' });
    const interests = page.getByRole('heading', { name: 'Interests' });
    const earlierHighlight = page.getByText('Taught 57 pupils', { exact: false });
    const earlierRole = page.getByRole('heading', { name: 'Approved Driving Instructor' });

    for (const part of [speaking, sites, interests, earlierHighlight, earlierRole]) {
      await expect(part).toBeVisible();
    }
    await expect(
      page.getByRole('heading', { level: 2, name: 'Speaking and recognition' }),
    ).toBeVisible();

    await page.emulateMedia({ media: 'screen' });
    await page.getByRole('radio', { name: 'Compact' }).check();
    await page.emulateMedia({ media: 'print' });

    for (const part of [speaking, sites, interests, earlierHighlight]) {
      await expect(part).toBeHidden();
    }
    await expect(earlierRole).toBeVisible();
    await expect(page.getByRole('heading', { level: 2, name: 'Recognition' })).toBeVisible();
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
