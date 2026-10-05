import type { Signpost } from '../components/SignpostList';

/** The cards on the Home page pointing to each section. */
export const HOME_SIGNPOSTS: Signpost[] = [
  {
    title: 'Work',
    to: '/work',
    description: 'What I do at giffgaff, and the sites I’ve worked on.',
  },
  { title: 'Projects', to: '/projects', description: 'Things I’ve built outside work.' },
  { title: 'Talks', to: '/talks', description: 'Talks I’ve given, with videos and transcripts.' },
  { title: 'Articles', to: '/articles', description: 'Things I’ve written.' },
  { title: 'CV', to: '/cv', description: 'My full work history, ready to print.' },
  { title: 'Contact', to: '/contact', description: 'Send me a message.' },
];
