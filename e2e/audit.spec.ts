import { ABBREVIATIONS, ALWAYS_SHORT } from '../src/content/abbreviations';
import { ROUTES } from './support/routes';
import { type Page, expect, test } from './support/test';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([type="hidden"]), select, textarea, [tabindex]:not([tabindex="-1"])';

/** Every element the Tab key should reach, in page order, marked so they can be told apart. */
async function markFocusable(page: Page): Promise<string[]> {
  return page.evaluate((selector) => {
    const elements = [...document.querySelectorAll<HTMLElement>(selector)].filter((element) => {
      if (element.tabIndex < 0 || element.closest('[aria-hidden="true"], [inert]')) return false;
      // Tab stops on one radio button in each group, the chosen one. Arrow keys move between them.
      if (element instanceof HTMLInputElement && element.type === 'radio') {
        const group = [
          ...document.querySelectorAll<HTMLInputElement>(
            `input[type="radio"][name="${element.name}"]`,
          ),
        ];
        const stop = group.find((radio) => radio.checked) ?? group[0];
        if (element !== stop) return false;
      }
      const style = getComputedStyle(element);
      return style.visibility !== 'hidden' && element.getClientRects().length > 0;
    });
    return elements.map((element, index) => {
      element.dataset.audit = String(index);
      const name = element.textContent.trim() || element.id;
      return `${element.tagName.toLowerCase()} “${name.slice(0, 40)}”`;
    });
  }, FOCUSABLE);
}

interface FocusCheck {
  index: string | undefined;
  outline: number;
  inView: boolean;
  onTop: boolean;
}

/** What's focused, how thick its focus ring is, and whether it can be seen. */
async function checkFocus(page: Page): Promise<FocusCheck> {
  return page.evaluate(() => {
    const element = document.activeElement as HTMLElement;
    const style = getComputedStyle(element);
    const rect = element.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + Math.min(rect.height / 2, 10);
    const top = document.elementFromPoint(x, y);
    return {
      index: element.dataset.audit,
      outline: style.outlineStyle === 'none' ? 0 : parseFloat(style.outlineWidth),
      // Something taller than the window, like a long text box, only needs its top in view.
      inView: rect.top >= 0 && rect.top < window.innerHeight && rect.left >= 0,
      onTop: top !== null && (top === element || element.contains(top) || top.contains(element)),
    };
  });
}

test.describe('Audit', () => {
  for (const { name, path } of ROUTES) {
    test(`${name}: Tab reaches everything in order, with a visible, unobscured focus ring`, async ({
      page,
      browserName,
    }) => {
      await page.goto(path);
      const expected = await markFocusable(page);
      // Safari's Tab key only moves between form controls by default. Option and Tab reaches links.
      const tab = browserName === 'webkit' ? 'Alt+Tab' : 'Tab';

      const problems: string[] = [];
      for (const [position, label] of expected.entries()) {
        await page.keyboard.press(tab);
        const focus = await checkFocus(page);
        if (focus.index !== String(position)) {
          problems.push(
            `Tab ${String(position + 1)} reached ${focus.index ?? 'something else'}, not ${label}`,
          );
          break;
        }
        if (focus.outline < 4)
          problems.push(`${label} has a ${String(focus.outline)}px focus ring`);
        if (!focus.inView) problems.push(`${label} is focused off screen`);
        if (!focus.onTop) problems.push(`${label} is hidden behind something when focused`);
      }

      expect(problems).toEqual([]);
    });

    test(`${name}: every target is at least 44 by 44 pixels, apart from links in text (WCAG 2.5.5)`, async ({
      page,
    }) => {
      await page.goto(path);

      const small = await page.evaluate((selector) => {
        const BLOCKS = 'p, li, dd, dt, td, th, figcaption, h1, h2, h3, h4, h5, h6, blockquote';
        return [...document.querySelectorAll<HTMLElement>(selector)]
          .filter((element) => element.tabIndex >= 0 && element.getClientRects().length > 0)
          .filter((element) => !element.closest('[aria-hidden="true"]'))
          .flatMap((element) => {
            // A link in a sentence or block of text is allowed to be smaller.
            const block = element.closest(BLOCKS);
            if (
              element.tagName === 'A' &&
              block &&
              block.textContent.trim() !== element.textContent.trim()
            ) {
              return [];
            }
            // Measured while focused, as the skip link only appears then.
            element.focus();
            // A radio button or checkbox can also be chosen by its label.
            const target =
              element instanceof HTMLInputElement && ['radio', 'checkbox'].includes(element.type)
                ? (element.closest('label') ?? element.labels?.[0] ?? element)
                : element;
            const { width, height } = target.getBoundingClientRect();
            return width < 44 || height < 44
              ? [
                  `${element.tagName.toLowerCase()} “${element.textContent.trim().slice(0, 40)}”: ${String(Math.round(width))} by ${String(Math.round(height))}`,
                ]
              : [];
          });
      }, FOCUSABLE);

      expect(small).toEqual([]);
    });
  }

  for (const { name, path } of ROUTES) {
    test(`${name}: writes out each abbreviation in full the first time it’s used, apart from ones most people know (WCAG 3.1.4)`, async ({
      page,
    }) => {
      await page.goto(path);

      const notWrittenOut = await page.evaluate(
        (abbreviations) => {
          const main = document.querySelector('main')?.cloneNode(true) as HTMLElement;
          // Page names are shown as they are in the navigation: the page heading, and headings that
          // link to another page. The lists explain every abbreviation.
          const pageNames = [...document.querySelectorAll('nav[aria-label="Main"] a')].map((link) =>
            link.textContent.trim(),
          );
          main.querySelector('h1')?.remove();
          for (const heading of main.querySelectorAll('h2, h3, h4, h5, h6')) {
            if (pageNames.includes(heading.textContent.trim())) heading.remove();
          }
          for (const id of ['abbreviations', 'glossary']) {
            main.querySelector(`[aria-labelledby="${id}"]`)?.remove();
          }
          // Each block on its own, so text from neighbouring blocks never runs together.
          const text = [...main.querySelectorAll('p, li, dt, dd, h2, h3, h4, h5, h6, td, th')]
            .filter((block) => !block.querySelector('p, li, dt, dd'))
            .map((block) => block.textContent.replace(/\s+/g, ' '))
            .join(' | ');

          return Object.entries(abbreviations).flatMap(([abbreviation, fullForm]) => {
            const pattern = new RegExp(
              `(?<![A-Za-z])${abbreviation.replace('/', '\\/')}s?(?![A-Za-z])`,
            );
            const match = pattern.exec(text);
            if (!match) return [];
            const before = text.slice(0, match.index).toLowerCase();
            return before.endsWith(`${fullForm.toLowerCase()} (`) ||
              before.endsWith(`${fullForm.toLowerCase()}s (`)
              ? []
              : [
                  `${abbreviation}: …${text.slice(Math.max(0, match.index - 40), match.index + 20)}…`,
                ];
          });
        },
        Object.fromEntries(
          Object.entries(ABBREVIATIONS).filter(
            ([name]) => !(ALWAYS_SHORT as string[]).includes(name),
          ),
        ),
      );

      expect(notWrittenOut).toEqual([]);
    });
  }

  test.describe('in Windows high contrast mode', () => {
    test.use({ forcedColors: 'active' });

    for (const { name, path } of ROUTES) {
      test(`${name}: controls keep a visible edge, and focus stays visible`, async ({ page }) => {
        await page.goto(path);

        const invisible = await page.evaluate(() =>
          [
            ...document.querySelectorAll<HTMLElement>(
              'button, input:not([type="hidden"]), select, textarea',
            ),
          ]
            .filter((element) => element.getClientRects().length > 0 && element.tabIndex >= 0)
            .filter((element) => {
              const style = getComputedStyle(element);
              return style.borderStyle === 'none' || parseFloat(style.borderWidth) === 0;
            })
            .filter((element) => !(element instanceof HTMLInputElement && element.type === 'radio'))
            .map((element) => `${element.tagName.toLowerCase()} “${element.textContent.trim()}”`),
        );
        expect(invisible).toEqual([]);

        await page.keyboard.press('Tab');
        const outline = await page.evaluate(() =>
          document.activeElement ? getComputedStyle(document.activeElement).outlineStyle : 'none',
        );
        expect(outline).not.toBe('none');
      });
    }
  });
});
