import { describe, expect, it } from 'vitest';

import { absolutePageUrl, pageMeta } from './pageMeta';
import { SHARE_IMAGE } from './shareImage';

// The tests build with no SITE_URL, so addresses use the local preview address
const SITE = 'http://localhost:4173';

describe('absolutePageUrl', () => {
  it('puts the site’s address in front of a page, ending in a slash', () => {
    expect(absolutePageUrl('/work')).toBe(`${SITE}/work/`);
    expect(absolutePageUrl('/')).toBe(`${SITE}/`);
  });
});

describe('pageMeta', () => {
  const meta = pageMeta({ title: 'Work, Abi', description: 'What I do.', path: '/work' });

  it('has the title and description', () => {
    expect(meta).toContainEqual({ title: 'Work, Abi' });
    expect(meta).toContainEqual({ name: 'description', content: 'What I do.' });
  });

  it('has the canonical address, so search engines know the one true address of the page', () => {
    expect(meta).toContainEqual({ tagName: 'link', rel: 'canonical', href: `${SITE}/work/` });
  });

  it('has Open Graph tags for share previews, matching the title and description', () => {
    expect(meta).toEqual(
      expect.arrayContaining([
        { property: 'og:url', content: `${SITE}/work/` },
        { property: 'og:title', content: 'Work, Abi' },
        { property: 'og:description', content: 'What I do.' },
        { property: 'og:site_name', content: 'Abi Harrison-Nye' },
        { property: 'og:locale', content: 'en_GB' },
      ]),
    );
  });

  it('has the share image, with its size and a description for people who can’t see it', () => {
    expect(meta).toEqual(
      expect.arrayContaining([
        { property: 'og:image', content: `${SITE}/share.png` },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: SHARE_IMAGE.alt },
        { name: 'twitter:card', content: 'summary_large_image' },
      ]),
    );
  });
});
