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

/** The page where visitors can change the theme, text size, spacing, font and motion */
export const DISPLAY_SETTINGS_PATH = '/display-settings';

/** The page explaining technical words used on the site, in plain words (WCAG 3.1.3) */
export const GLOSSARY_PATH = '/glossary';

export const FOOTER_NAV: NavItem[] = [
  { label: 'Accessibility', to: '/accessibility' },
  { label: 'Display settings', to: DISPLAY_SETTINGS_PATH },
  { label: 'Glossary', to: GLOSSARY_PATH },
  { label: 'Privacy', to: '/privacy' },
];
