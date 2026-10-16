export interface Article {
  title: string;
  /** Where it was published, such as a blog or magazine */
  publication: string;
  /** YYYY-MM-DD */
  date: string;
  summary: string;
  href: string;
}

/** Newest first, added by hand. Until there are some, the page shows a holding message */
export const ARTICLES: Article[] = [
  {
    title: 'Time to introduce myself',
    publication: 'Codú',
    date: '2023-03-16',
    summary: 'My own story, and why accessibility matters so much to me personally.',
    href: 'https://www.codu.co/abi-harrison-nye/time-to-introduce-myself-grfa_t44',
  },
  {
    title: 'Burnout: The good, the bad, and the ugly',
    publication: 'Codú',
    date: '2023-03-15',
    summary:
      'How my work habits, from restaurant shifts to software development, led to burnout, the signs to look out for, and why looking after yourself matters.',
    href: 'https://www.codu.co/abi-harrison-nye/burnout-the-good-the-bad-and-the-ugly-0qd_mvtr',
  },
  {
    title: 'An Introduction to Web Accessibility',
    publication: 'Codú',
    date: '2023-03-01',
    summary:
      'What web accessibility is, why it matters, and the basics to start with: semantic HTML, alt text and colour contrast.',
    href: 'https://www.codu.co/abi-harrison-nye/an-introduction-to-web-accessibility-te_nhvdn',
  },
  {
    title: 'Life as an inclusive developer',
    publication: 'Codú',
    date: '2023-02-14',
    summary:
      'Why inclusion goes further than accessible websites, to plain language, respectful wording and everyday behaviour, and why it’s fine to ask people what they need.',
    href: 'https://www.codu.co/abi-harrison-nye/the-value-of-inclusion-bkmfbckq',
  },
  {
    title: 'Accessibility in Code – A11y Series 1',
    publication: 'Code Institute',
    date: '2022-06-20',
    summary:
      'Why accessible code matters for people, for ethics and under UK law, the assistive technology people use, and tools for testing it.',
    href: 'https://codeinstitute.net/blog/accessibility-in-code/',
  },
  {
    title: 'Colour & Accessible Websites – A11y series 2',
    publication: 'Code Institute',
    date: '2022-06-20',
    summary:
      'How colour blindness affects people using websites, what the WCAG colour contrast levels mean, and tools for checking your colours.',
    href: 'https://codeinstitute.net/blog/colour-accessible-websites/',
  },
  {
    title: 'Alt text with Images – A11y Series 3',
    publication: 'Code Institute',
    date: '2022-06-20',
    summary:
      'What alt text is, why it matters for screen reader users and search engines, and how to write it well, including labels for icon buttons.',
    href: 'https://codeinstitute.net/blog/alt-text/',
  },
  {
    title: 'Semantic HTML: A11y Series – 4',
    publication: 'Code Institute',
    date: '2022-06-20',
    summary:
      'How using the right HTML elements helps assistive technology and search engines, with the common elements and when to use each one.',
    href: 'https://codeinstitute.net/blog/semantic-html-accessibility/',
  },
  {
    title: 'What is React.js?',
    publication: 'Code Institute',
    date: '2022-01-06',
    summary:
      'An introduction to React, how it compares to Vue.js, Next.js and Backbone.js, and why it’s worth learning.',
    href: 'https://codeinstitute.net/blog/what-is-react-js/',
  },
  {
    title: 'The Top Full Stack Developer Tools',
    publication: 'Code Institute',
    date: '2021-11-30',
    summary:
      'The tools I found most useful as a full stack developer, from code editor extensions and browser developer tools to linters and accessibility checkers.',
    href: 'https://codeinstitute.net/blog/the-top-full-stack-developer-tools/',
  },
];
