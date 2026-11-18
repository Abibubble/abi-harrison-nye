export interface NavItem {
  label: string;
  to: string;
}

export const MAIN_NAV: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Work', to: '/work' },
  { label: 'Projects', to: '/projects' },
  { label: 'Talks', to: '/talks' },
  { label: 'Articles', to: '/articles' },
  { label: 'Contact', to: '/contact' },
];

/** The page about the Accessibility Culture Day I organised, linked from the Projects page */
export const CULTURE_DAY_PATH = '/projects/accessibility-culture-day';

/** Talks with no recording to share, which are all about neurodiversity, linked from the Talks page */
export const NEURODIVERSITY_TALKS_PATH = '/talks/neurodiversity';

/** The page where visitors can change the theme, text size, spacing and font */
export const DISPLAY_SETTINGS_PATH = '/display-settings';

/** The page explaining technical words used on the site, in plain words (WCAG 3.1.3) */
export const GLOSSARY_PATH = '/glossary';

/** Every page on the site, so there's more than one way to find each one (WCAG 2.4.5) */
export const SITE_MAP_PATH = '/site-map';

export const FOOTER_NAV: NavItem[] = [
  { label: 'Accessibility statement', to: '/accessibility' },
  { label: 'Site map', to: SITE_MAP_PATH },
  { label: 'Display settings', to: DISPLAY_SETTINGS_PATH },
  { label: 'Glossary', to: GLOSSARY_PATH },
  { label: 'Privacy', to: '/privacy' },
];
