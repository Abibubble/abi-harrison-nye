import { useState } from 'react';

import { SETTINGS, SETTING_NAMES } from '../../settings/displaySettings';
import { useDisplaySettings } from '../../settings/useDisplaySettings';
import { Button } from '../Button';
import { RadioGroup } from '../RadioGroup';
import styles from './DisplaySettings.module.css';

export const DISPLAY_SETTINGS_ID = 'display-settings';

export function DisplaySettings() {
  const { settings, update, reset } = useDisplaySettings();
  const [announcement, setAnnouncement] = useState('');

  return (
    <section aria-labelledby={DISPLAY_SETTINGS_ID} className={styles.section}>
      <h2 id={DISPLAY_SETTINGS_ID} tabIndex={-1}>
        Display settings
      </h2>
      <p className={styles.withoutJavaScript}>
        Display settings need JavaScript, which isn’t running in your browser. You can still make
        text bigger or smaller using your browser’s zoom.
      </p>
      <div className={styles.controls}>
        <p>
          Changes apply straight away. They’re saved in this browser only, and never sent to me.
        </p>
        {SETTING_NAMES.map((name) => (
          <RadioGroup<string>
            key={name}
            legend={SETTINGS[name].legend}
            name={name}
            options={SETTINGS[name].options}
            value={settings[name]}
            onChange={(value) => {
              update({ [name]: value });
              setAnnouncement('');
            }}
          />
        ))}
        <div className={styles.reset}>
          <Button
            variant="secondary"
            onClick={() => {
              reset();
              setAnnouncement('Display settings are back to their defaults.');
            }}
          >
            Reset to defaults
          </Button>
          <p role="status">{announcement}</p>
        </div>
      </div>
    </section>
  );
}
