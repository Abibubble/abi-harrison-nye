export interface HighlightGroup {
  heading: string;
  highlights: string[];
}

export interface Role {
  title: string;
  /** YYYY-MM */
  from: string;
  /** YYYY-MM. Left out for a current role. */
  to?: string;
  location?: string;
  /** A sentence or two of context, such as the teams I've worked in. */
  summary?: string;
  highlightGroups: HighlightGroup[];
}

export interface SiteWorkedOn {
  name: string;
  href: string;
  description: string;
}

export interface Company {
  name: string;
  roles: Role[];
  sitesWorkedOn?: SiteWorkedOn[];
  /** Roles before I moved into tech. Shown in full on the CV, and summarised on the Work page. */
  earlierCareer?: boolean;
}

/** Newest first. Shared by the Work page and the CV page. */
export const WORK: Company[] = [
  {
    name: 'giffgaff',
    roles: [
      {
        title: 'Software Engineer',
        from: '2021-08',
        location: 'Uxbridge (hybrid)',
        summary:
          'I’ve worked in the Devices (current), Recommendations Experience, Future Capabilities, Frontend Core Services, Design System and Leanness teams. I joined from a work experience placement, from March to July 2021.',
        highlightGroups: [
          {
            heading: 'Software engineering',
            highlights: [
              'Took the lead on building new phone components and pages in React and TypeScript, including adding airtime plans to the product details page.',
              'Built and maintained giffgaff’s original React design system as one of its two lead contributors: 97 reusable components used by every team working on the frontend. Later led my team’s contributions to the current library.',
              'Mentored two apprentices into junior engineer roles. Both have since been promoted to mid-level.',
              'Developed micro frontends across the phones journey, including range pages, checkout and landing pages, using pair programming and test driven development (TDD) in cross-functional teams.',
              'Delivered core features of the internal product catalogue that manages giffgaff’s entire phone range, including device search and filtering, homepage featured slots, range ordering with publish and discard workflows, and admin controls for stock and finance.',
              'Created the refurbished phone and pay monthly journeys, including a condition grade selector and payment options.',
              'Led frontend architecture spikes that shaped the Devices team’s technical direction.',
              'Owned services in production with a “you build it, you run it” approach, running a feature-flagged traffic migration, moving alerts to team-owned monitoring, and resolving high-severity security vulnerabilities.',
              'Designed analytics events with the data team and migrated ecommerce events to a new format for event-driven reporting.',
              'Adopted Claude Code for AI-assisted planning, development, code review and accessibility checks, sharing weekly learnings with the wider team.',
            ],
          },
          {
            heading: 'Accessibility specialist and employee network group lead',
            highlights: [
              'Became giffgaff’s in-house accessibility auditor after training with Hassell Inclusion, auditing 15 key pages and their shared components against the Web Content Accessibility Guidelines (WCAG) and driving fixes for hundreds of issues.',
              'Advised designers, the brand team and an external agency throughout a company-wide brand refresh, using research to make the case on colour contrast, motion, photosensitivity and pattern glare.',
              'Engineered a Claude skill for accessibility audits that catches up to 50% of issues automatically, up from around 30% with previous tools.',
              'Integrated pa11y automated accessibility testing into continuous integration pipelines.',
              'Ran a two-month Global Accessibility Awareness Day (GAAD) campaign, “Oh My GAAD: Bug Bash”, that uncovered 72 issues and fixed around 32 before it closed.',
              'Designed, built and launched the giffgaff Inclusion Toolkit, a public library of accessibility and neurodiversity resources, including infographics and meeting templates, free for any organisation to use.',
              'Founded Home of Accessibility and NeuroDiversity (HAND), giffgaff’s accessibility and neurodiversity employee network group, and led its steering committee of three to deliver workshops, awareness campaigns and support programmes.',
              'Worked with senior leaders to make sure no employee was forced into mandatory office days that would harm their wellbeing, and created a meeting invite template giving neurodivergent colleagues full context and accessibility information.',
              'Wrote a new highlight every week on an accessibility or neurodiversity topic, from colour blindness to accessibility debt, and organised an Accessibility Culture Day for the whole business.',
            ],
          },
        ],
      },
    ],
    sitesWorkedOn: [
      {
        name: 'giffgaff.com',
        href: 'https://www.giffgaff.com',
        description:
          'The phones journey, including range pages, product pages, checkout and landing pages.',
      },
    ],
  },
  {
    name: 'Bill Plant Driving School',
    earlierCareer: true,
    roles: [
      {
        title: 'Approved Driving Instructor',
        from: '2019-06',
        to: '2021-07',
        highlightGroups: [
          {
            heading: 'Highlights',
            highlights: [
              'Taught 57 pupils of all ages over 18 months with a client-centred approach, while running my own bookings and accounts.',
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'The Old Orchard (Brunning and Price)',
    earlierCareer: true,
    roles: [
      {
        title: 'Assistant Manager',
        from: '2017-04',
        to: '2020-02',
        highlightGroups: [
          {
            heading: 'Highlights',
            highlights: [
              'Achieved record sales and a 40% profit increase by running events from start to finish, including budgets, risk assessments and contractors.',
              'Led training sessions to roll out company changes and keep the team compliant.',
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'J D Wetherspoon',
    earlierCareer: true,
    roles: [{ title: 'Shift Leader', from: '2012-02', to: '2017-04', highlightGroups: [] }],
  },
];

/** A short summary of the roles before tech, for the Work page. The CV has them in full. */
export const BEFORE_TECH_SUMMARY =
  'Before moving into software engineering in 2021, I spent eight years in hospitality, as a shift leader and then an assistant manager, and worked as a driving instructor.';
