/**
 * Every abbreviation used on the site, with its expansion. The Abbr component only accepts
 * abbreviations listed here, and the Accessibility page's glossary is built from this list (WCAG 3.1.4).
 */
export const ABBREVIATIONS = {
  ARIA: 'Accessible Rich Internet Applications',
  'CI/CD': 'continuous integration and continuous delivery',
  CSS: 'Cascading Style Sheets',
  CV: 'curriculum vitae',
  GAAD: 'Global Accessibility Awareness Day',
  HAND: 'Home of Accessibility and NeuroDiversity',
  HTML: 'HyperText Markup Language',
  TDD: 'test driven development',
  WCAG: 'Web Content Accessibility Guidelines',
} as const;

export type Abbreviation = keyof typeof ABBREVIATIONS;
