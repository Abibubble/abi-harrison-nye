import { useSyncExternalStore } from 'react';

import { type DisplaySettings, displaySettingsStore } from './displaySettings';

/**
 * The current display settings, and ways to change them. Prerendered HTML uses the defaults, and the
 * saved settings take over once React loads, without a hydration mismatch. The page itself already
 * looks right before then, because the before paint script has applied the saved settings
 */
export function useDisplaySettings(store = displaySettingsStore): {
  settings: DisplaySettings;
  update: (changes: Partial<DisplaySettings>) => void;
  reset: () => void;
} {
  const settings = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot,
  );

  return { settings, update: store.update, reset: store.reset };
}
