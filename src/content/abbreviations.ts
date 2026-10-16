/**
 * Every abbreviation used on the site, with its expansion. The Abbr component only accepts
 * abbreviations listed here, and the Accessibility page's glossary is built from this list (WCAG 3.1.4)
 */
export const ABBREVIATIONS = {
  ADHD: 'attention deficit hyperactivity disorder',
  AI: 'artificial intelligence',
  API: 'application programming interface',
  ARIA: 'Accessible Rich Internet Applications',
  BA: 'Bachelor of Arts',
  BTEC: 'Business and Technology Education Council',
  'CI/CD': 'continuous integration and continuous delivery',
  CSS: 'Cascading Style Sheets',
  CTO: 'Chief Technology Officer',
  CV: 'curriculum vitae',
  DOM: 'Document Object Model',
  GAAD: 'Global Accessibility Awareness Day',
  GDPR: 'General Data Protection Regulation',
  HAND: 'Home of Accessibility and NeuroDiversity',
  HTML: 'HyperText Markup Language',
  MFE: 'micro frontend',
  PDF: 'Portable Document Format',
  PR: 'pull request',
  QR: 'Quick Response',
  SEO: 'search engine optimisation',
  SIM: 'subscriber identity module',
  SQL: 'Structured Query Language',
  TDD: 'test driven development',
  UK: 'United Kingdom',
  URL: 'uniform resource locator',
  W3C: 'World Wide Web Consortium',
  WCAG: 'Web Content Accessibility Guidelines',
} as const;

export type Abbreviation = keyof typeof ABBREVIATIONS;

/**
 * Abbreviations most people know, which are never written out in the text, as that would make it
 * harder to read. They're still marked up with their full form, and listed on the Accessibility page
 */
export const ALWAYS_SHORT: readonly Abbreviation[] = ['AI', 'BA', 'CSS', 'CV', 'HTML', 'PDF', 'UK'];
