import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('work', 'routes/work.tsx'),
  route('projects', 'routes/projects.tsx'),
  route('talks', 'routes/talks.tsx'),
  route('articles', 'routes/articles.tsx'),
  route('cv', 'routes/cv.tsx'),
  route('contact', 'routes/contact.tsx'),
  route('accessibility', 'routes/accessibility.tsx'),
  route('privacy', 'routes/privacy.tsx'),
  route('*', 'routes/not-found.tsx'),
] satisfies RouteConfig;
