import { TALKS } from '../../src/content/talks';
import type { DisplaySettings } from '../../src/settings/displaySettings';

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

export const ROUTES: readonly { name: string; path: string }[] = [
  ...SITE_PAGES,
  ...TALKS.map((talk) => ({ name: `Talk: ${talk.title}`, path: `/talks/${talk.slug}` })),
];

export const THEMES = [
  { name: 'light', colorScheme: 'light' },
  { name: 'dark', colorScheme: 'dark' },
  { name: 'cream', colorScheme: 'light', settings: { theme: 'cream' } },
] as const satisfies readonly {
  name: string;
  colorScheme: 'light' | 'dark';
  settings?: Partial<DisplaySettings>;
}[];
