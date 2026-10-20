export interface Project {
  name: string;
  summary: string;
  /** Technologies used, shown as tags */
  tech: string[];
  /** The live project, if there is one */
  href?: string;
  /** The code, if it's public */
  codeHref?: string;
  /** Something people must know before they open it, shown in bold before the links */
  warning?: string;
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
  {
    name: 'bad-a11y',
    summary:
      'A web page I built for a workshop at giffgaff’s Accessibility Culture Day. Colleagues used it to practise finding and fixing accessibility problems, using a screen reader, a keyboard only and other assistive technology. People who don’t code wrote down the problems they found, then redesigned the page to be accessible.',
    tech: ['HTML', 'CSS'],
    href: 'https://abibubble.github.io/bad-a11y/',
    codeHref: 'https://github.com/Abibubble/bad-a11y',
    warning:
      'This page is inaccessible on purpose, for teaching. It may be hard to use with assistive technology, and its code shouldn’t be copied into a real site.',
  },
  {
    name: 'Wedding invitations',
    summary:
      'Two websites I built as our wedding invitations: one for guests invited to the ceremony, and one for guests invited to the reception only. Guests solved a series of puzzles to open their invitation, including a riddle, a pigpen cipher and a combination lock. They then found the plan for the day, travel and accommodation details, and a form to reply.',
    tech: ['React', 'React Router', 'styled-components', 'EmailJS'],
  },
  {
    name: 'Hooks learning',
    summary:
      'A site I built when I was first learning React, to make sense of its hooks. It has a page for each one, from useState and useEffect to useImperativeHandle and useDeferredValue, showing what it does.',
    tech: ['React', 'Next.js', 'JavaScript'],
    href: 'https://hooks-learning.vercel.app/',
    codeHref: 'https://github.com/Abibubble/hooks-learning',
  },
];
