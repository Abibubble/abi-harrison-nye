import type { DisplaySettings } from '../../src/settings/displaySettings';

// Every page on the site. Tests that apply to all pages loop over this list, so new pages get
// accessibility, reflow and theme coverage just by being added here. Apart from Home, each name is
// the page's heading, the start of its title, and its link text.
export const ROUTES = [
  { name: 'Home', path: '/' },
  { name: 'Work', path: '/work' },
  { name: 'Projects', path: '/projects' },
  { name: 'Talks', path: '/talks' },
  { name: 'Articles', path: '/articles' },
  { name: 'CV', path: '/cv' },
  { name: 'Contact', path: '/contact' },
  { name: 'Accessibility', path: '/accessibility' },
  { name: 'Privacy', path: '/privacy' },
  { name: 'Page not found', path: '/this-page-does-not-exist' },
] as const;

// Light and dark follow the device's colour scheme. Cream is chosen in the display settings.
export const THEMES = [
  { name: 'light', colorScheme: 'light' },
  { name: 'dark', colorScheme: 'dark' },
  { name: 'cream', colorScheme: 'light', settings: { theme: 'cream' } },
] as const satisfies readonly {
  name: string;
  colorScheme: 'light' | 'dark';
  settings?: Partial<DisplaySettings>;
}[];
