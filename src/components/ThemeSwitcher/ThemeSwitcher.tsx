import { useId } from 'react';

import { type DisplaySettings, SETTINGS } from '../../settings/displaySettings';
import { useDisplaySettings } from '../../settings/useDisplaySettings';
import { cx } from '../../utils/cx';
import { DISPLAY_SETTINGS_ID } from '../DisplaySettings';
import { Link } from '../Link';
import styles from './ThemeSwitcher.module.css';

interface ThemeSwitcherProps {
  /** Side by side for the slim bar under the header, or stacked to fill the width of the menu. */
  layout?: 'inline' | 'stacked';
}

/**
 * A quick way to change the theme from any page, with a link to the rest of the display settings.
 * Changing the theme doesn't change anything else, so it applies as soon as an option is chosen
 * (WCAG 3.2.2). It needs JavaScript, so it's hidden without it.
 */
export function ThemeSwitcher({ layout = 'inline' }: ThemeSwitcherProps) {
  const { settings, update } = useDisplaySettings();
  const id = useId();

  return (
    <div className={cx(styles.switcher, styles[layout])} data-print="hide">
      <div className={styles.field}>
        <label htmlFor={id} className={styles.label}>
          Theme
        </label>
        <select
          id={id}
          className={styles.select}
          value={settings.theme}
          onChange={(event) => {
            update({ theme: event.target.value as DisplaySettings['theme'] });
          }}
        >
          {SETTINGS.theme.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <Link to={`/accessibility#${DISPLAY_SETTINGS_ID}`} className={styles.link}>
        More display settings
      </Link>
    </div>
  );
}
