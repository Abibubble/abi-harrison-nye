import { type RouteConfig, index, route } from '@react-router/dev/routes';

import { alsoGivenTranscriptPath, slidesPath, transcriptPath } from './content/talkPath';
import { OTHER_TALKS, TALKS } from './content/talks';
import { TOOLKIT, toolkitEntries, toolkitPath } from './content/toolkit';

const talkPages = TALKS.flatMap((talk) => [
  route(`talks/${talk.slug}`, 'routes/talk.tsx', { id: `talk-${talk.slug}` }),
  route(transcriptPath(talk.slug).slice(1), 'routes/talk-transcript.tsx', {
    id: `transcript-${talk.slug}`,
  }),
  ...(talk.alsoGiven ?? []).flatMap((other) =>
    other.slug
      ? [
          route(
            alsoGivenTranscriptPath(talk.slug, other.slug).slice(1),
            'routes/talk-transcript.tsx',
            { id: `transcript-${talk.slug}-${other.slug}` },
          ),
        ]
      : [],
  ),
  ...(talk.slidesPage
    ? [
        route(slidesPath(talk.slug).slice(1), 'routes/talk-slides.tsx', {
          id: `slides-${talk.slug}`,
        }),
      ]
    : []),
]);

// Talks that weren't recorded have no talk page, but can have a transcript from my script, and slides
const otherTalkPages = OTHER_TALKS.flatMap((talk) => [
  ...(talk.transcriptFromScript
    ? [
        route(transcriptPath(talk.slug).slice(1), 'routes/talk-transcript.tsx', {
          id: `transcript-${talk.slug}`,
        }),
      ]
    : []),
  ...(talk.slidesPage
    ? [
        route(slidesPath(talk.slug).slice(1), 'routes/talk-slides.tsx', {
          id: `slides-${talk.slug}`,
        }),
      ]
    : []),
]);

// Every folder and resource in the Inclusion Toolkit has its own page, all from the same route file
const toolkitPages = toolkitEntries(TOOLKIT).map(({ slugs }) =>
  route(toolkitPath(slugs).slice(1), 'routes/toolkit.tsx', { id: `toolkit-${slugs.join('-')}` }),
);

export default [
  index('routes/home.tsx'),
  route('work', 'routes/work.tsx'),
  route('projects', 'routes/projects.tsx'),
  route('talks', 'routes/talks.tsx'),
  ...talkPages,
  ...otherTalkPages,
  route('articles', 'routes/articles.tsx'),
  route('inclusion-toolkit', 'routes/toolkit.tsx', { id: 'toolkit' }),
  ...toolkitPages,
  route('cv', 'routes/cv.tsx'),
  route('contact', 'routes/contact.tsx'),
  route('accessibility', 'routes/accessibility.tsx'),
  route('display-settings', 'routes/display-settings.tsx'),
  route('glossary', 'routes/glossary.tsx'),
  route('privacy', 'routes/privacy.tsx'),
  route('*', 'routes/not-found.tsx'),
] satisfies RouteConfig;
