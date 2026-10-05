import type { Page } from '@playwright/test';

import { type DisplaySettings, STORAGE_KEY } from '../../src/settings/displaySettings';

/** The settings that change the page the most, for checking layouts hold up under them. */
export const STRONGEST_SETTINGS: Partial<DisplaySettings> = {
  textSize: 'larger',
  textSpacing: 'increased',
  font: 'system',
};

/** Saves display settings before every page load in this test, as if chosen on an earlier visit. */
export async function saveDisplaySettings(
  page: Page,
  settings: Partial<DisplaySettings>,
): Promise<void> {
  await page.addInitScript(
    ([key, value]) => {
      localStorage.setItem(key, value);
    },
    [STORAGE_KEY, JSON.stringify(settings)] as const,
  );
}
