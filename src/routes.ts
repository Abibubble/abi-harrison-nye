import { type RouteConfig, index, route } from '@react-router/dev/routes';

import { TALKS } from './content/talks';

const talkPages = TALKS.map((talk) =>
  route(`talks/${talk.slug}`, 'routes/talk.tsx', { id: `talk-${talk.slug}` }),
);

export default [
  index('routes/home.tsx'),
  route('work', 'routes/work.tsx'),
  route('projects', 'routes/projects.tsx'),
  route('talks', 'routes/talks.tsx'),
  ...talkPages,
  route('articles', 'routes/articles.tsx'),
  route('cv', 'routes/cv.tsx'),
  route('contact', 'routes/contact.tsx'),
  route('accessibility', 'routes/accessibility.tsx'),
  route('privacy', 'routes/privacy.tsx'),
  route('*', 'routes/not-found.tsx'),
] satisfies RouteConfig;
