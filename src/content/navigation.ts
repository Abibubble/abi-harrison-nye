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
  { label: 'CV', to: '/cv' },
  { label: 'Contact', to: '/contact' },
];

/** The page where visitors can change the theme, text size, spacing, font and motion */
export const DISPLAY_SETTINGS_PATH = '/display-settings';

export const FOOTER_NAV: NavItem[] = [
  { label: 'Accessibility', to: '/accessibility' },
  { label: 'Display settings', to: DISPLAY_SETTINGS_PATH },
  { label: 'Privacy', to: '/privacy' },
];
