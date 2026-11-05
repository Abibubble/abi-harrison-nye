import { alsoGivenTranscriptPath, slidesPath, transcriptPath } from '../../src/content/talkPath';
import { OTHER_TALKS, TALKS } from '../../src/content/talks';
import { TOOLKIT, toolkitEntries, toolkitPath } from '../../src/content/toolkit';
import type { DisplaySettings } from '../../src/settings/displaySettings';

export const SITE_PAGES = [
  { name: 'Home', path: '/' },
  { name: 'Work', path: '/work' },
  { name: 'Projects', path: '/projects' },
  { name: 'Talks', path: '/talks' },
  { name: 'Articles', path: '/articles' },
  { name: 'Inclusion Toolkit', path: '/inclusion-toolkit' },
  { name: 'CV', path: '/cv' },
  { name: 'Contact', path: '/contact' },
  { name: 'Accessibility', path: '/accessibility' },
  { name: 'Display settings', path: '/display-settings' },
  { name: 'Glossary', path: '/glossary' },
  { name: 'Privacy', path: '/privacy' },
  { name: 'Page not found', path: '/this-page-does-not-exist' },
] as const;

export const ROUTES: readonly { name: string; path: string }[] = [
  ...SITE_PAGES,
  ...TALKS.flatMap((talk) => [
    { name: `Talk: ${talk.title}`, path: `/talks/${talk.slug}` },
    { name: `Transcript: ${talk.title}`, path: transcriptPath(talk.slug) },
    ...(talk.alsoGiven ?? []).flatMap((other) =>
      other.slug
        ? [
            {
              name: `Transcript: ${talk.title} (${other.description})`,
              path: alsoGivenTranscriptPath(talk.slug, other.slug),
            },
          ]
        : [],
    ),
    ...(talk.slidesPage ? [{ name: `Slides: ${talk.title}`, path: slidesPath(talk.slug) }] : []),
  ]),
  ...OTHER_TALKS.flatMap((talk) => [
    ...(talk.transcriptFromScript
      ? [{ name: `Transcript: ${talk.title}`, path: transcriptPath(talk.slug) }]
      : []),
    ...(talk.slidesPage ? [{ name: `Slides: ${talk.title}`, path: slidesPath(talk.slug) }] : []),
  ]),
  // Named by address, as two folders can each have a resource with the same title
  ...toolkitEntries(TOOLKIT).map(({ slugs }) => ({
    name: `Toolkit: ${slugs.join('/')}`,
    path: toolkitPath(slugs),
  })),
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
