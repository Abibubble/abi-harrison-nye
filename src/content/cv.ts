/** Content only on the CV page. Work, talks and recognition come from their own content files. */

export interface SkillGroup {
  category: string;
  skills: string[];
}

export interface Qualification {
  title: string;
  provider: string;
  /** YYYY or YYYY-MM */
  from: string;
  /** YYYY or YYYY-MM. Left out for a single date. */
  to?: string;
  detail?: string;
}

export interface SpeakingEngagement {
  title: string;
  event: string;
  location: string;
  /** YYYY-MM-DD or YYYY-MM */
  date: string;
}

/** The profile at the top of the CV. Abbreviations are written out in full the first time. */
export const CV_PROFILE = [
  'Software engineer and accessibility specialist at giffgaff since 2021, building customer-facing React and TypeScript micro frontends, creating the company’s original design system, and mentoring apprentices into engineering roles.',
  'A trained accessibility auditor who champions accessibility across the business, bringing an inclusive, test-driven approach that helps teams ship products meeting the Web Content Accessibility Guidelines (WCAG).',
  'Founder and Chair of Home of Accessibility and NeuroDiversity (HAND), giffgaff’s nationally recognised accessibility and neurodiversity employee network group, and a LeadDev LDX3 speaker on building an accessibility-first culture.',
];

export const SKILLS: SkillGroup[] = [
  {
    category: 'Languages and frameworks',
    skills: [
      'JavaScript',
      'TypeScript',
      'React',
      'Node.js',
      'HTML',
      'CSS',
      'Sass',
      'React Native',
      'Python',
      'SQL',
    ],
  },
  {
    category: 'Engineering practices',
    skills: [
      'Test driven development (TDD)',
      'pair programming',
      'clean code and refactoring',
      'micro frontends',
      'event-driven architecture',
      'continuous integration and continuous delivery (CI/CD)',
      'observability and alerting',
      'feature flags',
      'system design',
    ],
  },
  {
    category: 'Accessibility',
    skills: [
      'WCAG 2.2',
      'accessibility auditing',
      'screen reader testing',
      'semantic HTML',
      'Accessible Rich Internet Applications (ARIA)',
      'automated accessibility testing (pa11y)',
      'inclusive design',
      'neuroinclusion',
      'colour contrast and motion safety',
    ],
  },
  {
    category: 'Tools',
    skills: [
      'Git',
      'GitHub',
      'Storybook',
      'Figma',
      'Jira',
      'Confluence',
      'Claude Code',
      'Snyk',
      'Copilot',
      'Google Tag Manager',
    ],
  },
];

/** Newest first. */
export const QUALIFICATIONS: Qualification[] = [
  { title: 'Accessibility Auditor Training', provider: 'Hassell Inclusion', from: '2025-10' },
  {
    title: 'Diploma in Full Stack Software Development',
    provider: 'Code Institute',
    from: '2020',
    to: '2021',
    detail: 'Merit. Accredited by Edinburgh Napier University.',
  },
  { title: 'BA Music', provider: 'Brunel University', from: '2011', to: '2016' },
  {
    title: 'BTEC Level 3 Diploma in Music Performance',
    provider: 'Gloucestershire College',
    from: '2010',
    to: '2011',
    detail: 'Distinction Star, Distinction Star, Distinction.',
  },
];

export const SHORT_COURSES =
  'freeCodeCamp Responsive Web Design, and Mimo courses in HTML, CSS and JavaScript, Python, SQL, React, Git, and APIs.';

/**
 * Talks that don't have their own page yet, because their transcript isn't ready. The CV lists them
 * as plain text. Once a talk is added to talks.ts, remove it from here and the CV links to its page.
 */
export const SPEAKING_WITHOUT_PAGES: SpeakingEngagement[] = [
  {
    title: 'Moving accessibility from debt to done at giffgaff',
    event: 'LeadDev LDX3',
    location: 'London',
    date: '2026-06',
  },
];
