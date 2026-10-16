export interface ProfileLink {
  label: string;
  href: string;
}

export const PROFILE = {
  headline: 'Software engineer and accessibility specialist',
  location: 'Hertfordshire, UK',
  interests: [
    'I’ve played brass for over 20 years, and used to play in several brass bands and a ska band.',
    'I love learning languages, from French and Dutch to Go and CoffeeScript.',
    'I’m interested in environmental technology, electric vehicles and renewable energy.',
    'I’m a big fan of theme parks, roller coasters and single-seater motor racing, and I love escape rooms.',
    'I have two rescue cats, called Crouton and Katsu.',
  ],
};

export const PROFILE_LINKS: ProfileLink[] = [
  { label: 'GitHub', href: 'https://github.com/Abibubble' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/abi-harrison-nye' },
];

/**
 * My work in plain words, at the top of the Work and CV pages, for anyone who finds the detail hard
 * going (WCAG 3.1.5). Short sentences and everyday words, aiming for a reading age of 9
 */
export const PLAIN_SUMMARY = [
  'I’m a software engineer at giffgaff.',
  'I build the parts of the website where people choose and buy phones.',
  'I make sure they work well for everyone, including disabled people.',
  'I also started a staff network at giffgaff for accessibility and neurodiversity, and I lead it.',
  'I’ve helped apprentices become engineers too.',
  'Before tech, I taught people to drive and worked in pubs.',
].join(' ');
