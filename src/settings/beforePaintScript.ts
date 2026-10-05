import { SETTINGS, SETTING_NAMES, STORAGE_KEY } from './displaySettings';

// [attribute, default, allowed values] for each setting, built from the same definitions as the rest
// of the site, so this script can never fall out of step with them.
const ATTRIBUTES = Object.fromEntries(
  SETTING_NAMES.map((name) => {
    const { attribute, default: defaultValue, options } = SETTINGS[name];
    return [name, [attribute, defaultValue, options.map((option) => option.value)]];
  }),
);

/**
 * Runs in <head> before the page is drawn, so saved settings apply with no flash of the wrong theme
 * or text size. It also marks that JavaScript is running, for styles that depend on it. Written as
 * plain old JavaScript, because it runs before anything else loads.
 */
export const BEFORE_PAINT_SCRIPT = `(function () {
  var root = document.documentElement;
  root.setAttribute('data-js', '');
  try {
    var saved = JSON.parse(localStorage.getItem(${JSON.stringify(STORAGE_KEY)}) || '{}');
    var settings = ${JSON.stringify(ATTRIBUTES)};
    for (var name in settings) {
      var value = saved[name];
      var setting = settings[name];
      if (value !== setting[1] && setting[2].indexOf(value) !== -1) {
        root.setAttribute(setting[0], value);
      }
    }
  } catch (error) {}
})();`;
