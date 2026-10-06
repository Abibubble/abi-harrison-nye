import { PROFILE, PROFILE_LINKS } from '../content/profile';
import { SITE_NAME } from '../content/site';
import { WORK } from '../content/work';
import { absolutePageUrl } from './pageMeta';

/** Where I work now: the company with a role that hasn't ended. */
function currentEmployer(): string | undefined {
  return WORK.find((company) => company.roles.some((role) => role.to === undefined))?.name;
}

/**
 * Structured data about me for the Home page, so search engines can show who the site belongs to.
 * It has no email address or phone number, as the contact form is the only way to get in touch.
 */
export function personSchema() {
  const employer = currentEmployer();

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE_NAME,
    url: absolutePageUrl('/'),
    jobTitle: 'Software Engineer',
    description: PROFILE.headline,
    ...(employer && { worksFor: { '@type': 'Organization', name: employer } }),
    address: { '@type': 'PostalAddress', addressRegion: 'Hertfordshire', addressCountry: 'GB' },
    knowsAbout: [
      'Web accessibility',
      'Web Content Accessibility Guidelines',
      'React',
      'TypeScript',
    ],
    sameAs: PROFILE_LINKS.map((link) => link.href),
  };
}
