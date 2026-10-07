export interface GlossaryTerm {
  term: string;
  definition: string;
}

/**
 * Technical words used on the site, explained in plain words, for the glossary on the Accessibility
 * page (WCAG 3.1.3). Abbreviations have their own list. In alphabetical order, and written without
 * abbreviations, so nothing in a definition needs explaining itself
 */
export const GLOSSARY: GlossaryTerm[] = [
  {
    term: 'Accessibility auditor',
    definition:
      'Someone trained to check websites and apps against accessibility guidelines, and to explain how to fix any problems they find.',
  },
  {
    term: 'Airtime plan',
    definition: 'A monthly plan for calls, texts and data, without a phone.',
  },
  {
    term: 'Analytics events',
    definition:
      'Records of what people do on a website, such as choosing a phone, used to understand and improve it.',
  },
  {
    term: 'Architecture spike',
    definition:
      'A short piece of research into a technical approach, to help decide whether to use it.',
  },
  {
    term: 'Audio description',
    definition:
      'A spoken description of what’s happening on screen in a video, for people who can’t see it.',
  },
  {
    term: 'Bug bash',
    definition: 'An event where people try to find as many problems as they can in a short time.',
  },
  {
    term: 'Captions',
    definition: 'Text on a video showing everything that’s said, and other important sounds.',
  },
  {
    term: 'Component',
    definition: 'A reusable piece of a website, such as a button or a card.',
  },
  {
    term: 'Continuous integration and continuous delivery',
    definition:
      'Automatically testing every change to the code, and releasing it once the tests pass.',
  },
  {
    term: 'Cross-functional team',
    definition:
      'A team with different skills in it, such as engineers, designers and product managers.',
  },
  {
    term: 'Design system',
    definition:
      'A shared set of components, styles and rules, so every part of a website looks and works the same way.',
  },
  {
    term: 'Employee network group',
    definition:
      'A group of staff who share an experience or interest, who support each other and help the company improve.',
  },
  {
    term: 'Event-driven architecture',
    definition:
      'A way of building software where each part reacts to messages about things that happen, such as an order being placed.',
  },
  {
    term: 'Feature flag',
    definition: 'A switch that turns a new feature on or off without changing the code.',
  },
  {
    term: 'Frontend',
    definition: 'The part of a website that people see and use in their browser.',
  },
  {
    term: 'Micro frontends',
    definition:
      'Splitting a large website into smaller parts, so different teams can build and release them separately.',
  },
  {
    term: 'Neurodiversity',
    definition:
      'The natural differences in how people’s brains work. Neurodivergent people include autistic people, and people with dyslexia or dyspraxia.',
  },
  {
    term: 'Observability and alerting',
    definition:
      'Being able to see how live software is behaving, and being told automatically when something goes wrong.',
  },
  {
    term: 'Pair programming',
    definition: 'Two engineers writing code together, sharing one screen.',
  },
  {
    term: 'Pattern glare',
    definition:
      'Discomfort, headaches or blurred vision that some people get from stripes and other busy patterns.',
  },
  {
    term: 'Photosensitivity',
    definition: 'When flashing or flickering light can cause discomfort or seizures.',
  },
  {
    term: 'Refactoring',
    definition: 'Improving how code is written without changing what it does.',
  },
  {
    term: 'Screen reader',
    definition:
      'Software that reads out what’s on the screen, used by many blind and partially sighted people.',
  },
  {
    term: 'Test driven development',
    definition: 'Writing a test for what code should do before writing the code itself.',
  },
  {
    term: 'Traffic migration',
    definition: 'Moving visitors from an old system to a new one, a little at a time.',
  },
  {
    term: 'Transcript',
    definition:
      'A written version of everything said in a talk, including a description of anything shown on screen.',
  },
  {
    term: 'You build it, you run it',
    definition:
      'A way of working where the team that builds a piece of software also looks after it once it’s live.',
  },
];
