export interface HighlightGroup {
  heading: string;
  highlights: string[];
}

export interface Role {
  title: string;
  /** YYYY-MM */
  from: string;
  /** YYYY-MM. Left out for a current role */
  to?: string;
  location?: string;
  /** A sentence or two of context, such as the teams I've worked in */
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
  /** Roles before I moved into tech. Shown in full on the CV, and summarised on the Work page */
  earlierCareer?: boolean;
}

/** Newest first. Shared by the Work page and the CV page */
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
              'Led work on new phone components and pages in React and TypeScript, such as adding airtime plans to the product details page.',
              'Built and looked after giffgaff’s first React design system, as one of its two main contributors. It had 97 reusable components, used by every frontend team. Later led my team’s work on the current library.',
              'Mentored two apprentices into junior engineer roles. Both have since been promoted to mid-level.',
              'Built micro frontends for the phones journey, including range pages, checkout and landing pages. Used pair programming and TDD, in cross-functional teams.',
              'Built core features of the Product Catalogue, the internal tool that manages every phone giffgaff sells. These included searching and filtering phones, and choosing which phones the homepage features. They also included changing the order of the range, as drafts to publish or discard, and controls for stock and finance.',
              'Built the journeys for buying refurbished phones and paying monthly, including choosing a phone’s condition and how to pay.',
              'Led short investigations into frontend architecture, which helped set the Devices team’s technical direction.',
              'Ran the team’s services in production, as well as building them. This included moving traffic to a new service step by step using feature flags, moving alerts into the team’s own monitoring, and fixing high-severity security problems.',
              'Designed analytics events with the data team, and moved the ecommerce events to a new format, so reports could be built from them.',
              'Started using Claude Code, an AI tool, for planning, coding, code reviews and accessibility checks. Shared what I learned with the wider team every week.',
            ],
          },
          {
            heading: 'Accessibility specialist and employee network group lead',
            highlights: [
              'Trained with Hassell Inclusion to become giffgaff’s in-house accessibility auditor. Checked 25 key pages and their shared components against the WCAG, and led the work to fix hundreds of issues.',
              'Advised designers, the brand team and an outside agency during a company-wide rebrand. Used research to show what the new brand needed for colour contrast, motion, flashing images (photosensitivity) and busy striped patterns (pattern glare).',
              'Built a Claude skill (a set of instructions for the AI) for accessibility audits. It finds up to 50% of issues automatically, up from about 30% with the tools we used before.',
              'Added pa11y, an automated accessibility checker, to the build pipelines, so code changes are checked automatically.',
              'Ran a two-month campaign for Global Accessibility Awareness Day (GAAD), called “Oh My GAAD: Bug Bash”. It found 72 issues, and about 32 were fixed before it ended.',
              'Designed, built and launched the giffgaff Inclusion Toolkit. It has free accessibility and neurodiversity resources, such as infographics and meeting templates, that any organisation can use.',
              'Founded HAND, giffgaff’s employee network for accessibility and neurodiversity. Led its committee of three, running workshops, awareness campaigns and support programmes.',
              'Worked with senior leaders so that no one had to come into the office on days that would harm their wellbeing. Created a meeting invite template that gives neurodivergent colleagues the full context and accessibility details of each meeting.',
              'Wrote a weekly highlight, a short post on an accessibility or neurodiversity topic, from colour blindness to accessibility debt. Organised an Accessibility Culture Day for the whole company.',
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
      {
        name: 'giffgaff Inclusion Toolkit',
        href: 'https://www.giffgaff.com/inclusion-toolkit',
        description:
          'A free library of accessibility and neurodiversity resources. I built and deployed it, set up its events and logging, monitor it for security issues, and keep it up to date.',
      },
      {
        name: 'giffgaff.design',
        href: 'https://giffgaff.design',
        description:
          'giffgaff’s design system site, with the components, design guidelines and writing standards used across the website, app and emails.',
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
              'Taught 57 pupils of all ages over 18 months, fitting lessons to each person, while running my own bookings and accounts.',
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
              'Ran events from start to finish, including budgets, risk assessments and contractors. They brought record sales and a 40% rise in profit.',
              'Led training sessions to bring in company changes, and to make sure the team followed the rules.',
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

/** Sites I've helped with as a volunteer, outside work */
export const VOLUNTEERING: SiteWorkedOn[] = [
  {
    name: 'attractionsource.com',
    href: 'https://attractionsource.com',
    description:
      'One of the largest online communities for fans of theme parks and attractions in the UK.',
  },
  {
    name: 'towerstimes.co.uk',
    href: 'https://towerstimes.co.uk',
    description:
      'An unofficial community site for Alton Towers Resort, with news, guides and history.',
  },
];

/** What I do as a volunteer. It's the same on every site, so it's said once after the list */
export const VOLUNTEERING_ROLE =
  'On both sites, I keep the site and its server running, improve its accessibility, and help writers who aren’t technical add pages in WordPress.';

/** A short summary of the roles before tech, for the Work page. The CV has them in full */
export const BEFORE_TECH_SUMMARY =
  'Before moving into software engineering in 2021, I spent eight years in hospitality, as a shift leader and then an assistant manager, and worked as a driving instructor.';
