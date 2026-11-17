import type { Signpost } from '../components/SignpostList';

export const HOME_SIGNPOSTS: Signpost[] = [
  {
    title: 'Work',
    to: '/work',
    description: 'What I do at giffgaff, and the sites I’ve worked on.',
  },
  {
    title: 'Projects',
    to: '/projects',
    description: 'Things I’ve built and organised, including the Inclusion Toolkit.',
  },
  { title: 'Talks', to: '/talks', description: 'Talks I’ve given, with videos and transcripts.' },
  { title: 'Articles', to: '/articles', description: 'Articles I was asked to write.' },
  { title: 'Contact', to: '/contact', description: 'Send me a message.' },
];
