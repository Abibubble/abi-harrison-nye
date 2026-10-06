import type { Page } from '@playwright/test';

import { type DisplaySettings, STORAGE_KEY } from '../../src/settings/displaySettings';

export const STRONGEST_SETTINGS: Partial<DisplaySettings> = {
  textSize: 'larger',
  textSpacing: 'increased',
  font: 'system',
};

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
