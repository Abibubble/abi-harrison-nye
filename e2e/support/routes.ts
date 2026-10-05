import { TALKS } from '../../src/content/talks';
import type { DisplaySettings } from '../../src/settings/displaySettings';

// The site's own pages. Apart from Home, each name is the page's heading, the start of its title,
// and its link text.
export const SITE_PAGES = [
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

// Every page on the site, including each talk's page. Tests that apply to all pages loop over this
// list, so new pages, including new talks, get accessibility, reflow and theme coverage automatically.
export const ROUTES: readonly { name: string; path: string }[] = [
  ...SITE_PAGES,
  ...TALKS.map((talk) => ({ name: `Talk: ${talk.title}`, path: `/talks/${talk.slug}` })),
];

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
