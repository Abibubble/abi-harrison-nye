/**
 * Every abbreviation used on the site, with its expansion. The Abbr component only accepts
 * abbreviations listed here, and the Accessibility page's glossary is built from this list (WCAG 3.1.4)
 */
export const ABBREVIATIONS = {
  AI: 'artificial intelligence',
  API: 'application programming interface',
  ARIA: 'Accessible Rich Internet Applications',
  BA: 'Bachelor of Arts',
  BTEC: 'Business and Technology Education Council',
  'CI/CD': 'continuous integration and continuous delivery',
  CSS: 'Cascading Style Sheets',
  CV: 'curriculum vitae',
  GAAD: 'Global Accessibility Awareness Day',
  GDPR: 'General Data Protection Regulation',
  HAND: 'Home of Accessibility and NeuroDiversity',
  HTML: 'HyperText Markup Language',
  SQL: 'Structured Query Language',
  TDD: 'test driven development',
  UK: 'United Kingdom',
  WCAG: 'Web Content Accessibility Guidelines',
} as const;

export type Abbreviation = keyof typeof ABBREVIATIONS;

/**
 * Abbreviations most people know, which are never written out in the text, as that would make it
 * harder to read. They're still marked up with their full form, and listed on the Accessibility page
 */
export const ALWAYS_SHORT: readonly Abbreviation[] = ['AI', 'BA', 'CSS', 'CV', 'HTML', 'UK'];
