export interface ProfileLink {
  label: string;
  href: string;
}

export interface ProfilePhoto {
  src: string;
  /** Describes the photo for people who can't see it. Required, and checked by a test. */
  alt: string;
}

export const PROFILE = {
  headline: 'Software engineer and accessibility specialist',
  location: 'Hertfordshire, UK',
  /** No photo has been chosen yet, so the Home page shows a placeholder with my initials. */
  photo: undefined as ProfilePhoto | undefined,
  interests: [
    'I’ve been a brass musician for over 20 years, and play in a brass band and a ska punk band.',
    'I love learning languages, from French and Dutch to Go and CoffeeScript.',
    'I’m interested in environmental technology, electric vehicles and renewable energy, and I’m a big fan of theme parks and roller coasters.',
  ],
};

export const PROFILE_LINKS: ProfileLink[] = [
  { label: 'GitHub', href: 'https://github.com/Abibubble' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/abi-harrison-nye' },
];
