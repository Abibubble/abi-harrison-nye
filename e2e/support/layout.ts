import { type Page, expect } from '@playwright/test';

export async function expectNoHorizontalScroll(page: Page): Promise<void> {
  const { scrollWidth, viewportWidth } = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    viewportWidth: window.innerWidth,
  }));

  expect(scrollWidth, 'page scrolls sideways').toBeLessThanOrEqual(viewportWidth);
}

// The WCAG 1.4.12 text spacing values. Content must still work with these applied.
export const TEXT_SPACING_CSS = `
  * {
    line-height: 1.5 !important;
    letter-spacing: 0.12em !important;
    word-spacing: 0.16em !important;
  }
  p {
    margin-bottom: 2em !important;
  }
`;
