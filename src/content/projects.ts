export interface Project {
  name: string;
  summary: string;
  /** Technologies used, shown as tags */
  tech: string[];
  /** The live project, if there is one */
  href?: string;
  /** The code, if it's public */
  codeHref?: string;
}

/** Newest first. Until there are some, the page shows a holding message */
export const PROJECTS: Project[] = [
  {
    name: 'Coaster Ranker',
    summary:
      'A site for ranking roller coasters and dark rides. It shows two rides at a time, you choose the one you like more, and it builds your full ranking from your choices.',
    tech: ['React', 'TypeScript', 'React Router', 'styled-components', 'Storybook'],
    href: 'https://abibubble.github.io/coaster-ranker/',
    codeHref: 'https://github.com/Abibubble/coaster-ranker',
  },
];
