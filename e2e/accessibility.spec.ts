import { test } from '@playwright/test';

import { expectNoAxeViolations } from './support/axe';
import { ROUTES, THEMES } from './support/routes';

for (const route of ROUTES) {
  for (const theme of THEMES) {
    test(`${route.name} page has no detectable accessibility issues in the ${theme.name} theme`, async ({
      page,
    }) => {
      await page.emulateMedia({ colorScheme: theme.colorScheme });
      await page.goto(route.path);
      if ('dataTheme' in theme) {
        await page.evaluate((value) => {
          document.documentElement.dataset.theme = value;
        }, theme.dataTheme);
      }

      await expectNoAxeViolations(page);
    });
  }
}
