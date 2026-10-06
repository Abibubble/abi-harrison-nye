import { describe, expect, it } from 'vitest';

import { PROFILE_LINKS } from '../content/profile';
import { personSchema } from './person';

describe('personSchema', () => {
  const schema = personSchema();

  it('describes me as a person, with the site’s address', () => {
    expect(schema).toMatchObject({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Abi Harrison-Nye',
      url: 'http://localhost:4173/',
      jobTitle: 'Software Engineer',
    });
  });

  it('names where I work now', () => {
    expect(schema.worksFor).toEqual({ '@type': 'Organization', name: 'giffgaff' });
  });

  it('links to my profiles on other sites', () => {
    expect(schema.sameAs).toEqual(PROFILE_LINKS.map((link) => link.href));
  });

  it('never includes an email address or phone number, as the form is the only way to get in touch', () => {
    const text = JSON.stringify(schema);

    // Something like name@example.com, which "@type" and "@context" aren't.
    expect(text).not.toMatch(/[\w.+-]+@[\w-]+\.\w+/);
    expect(text).not.toMatch(/email|telephone/i);
    expect(text).not.toMatch(/\d{5,}/);
  });
});
