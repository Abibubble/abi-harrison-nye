import { describe, expect, it } from 'vitest';

import { MARK, markSvg } from './mark';

describe('markSvg', () => {
  it('draws the mark in white on the site’s purple, with rounded corners', () => {
    const svg = markSvg();

    expect(svg).toMatch(/^<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg" viewBox="0 0 64 64">/);
    expect(svg).toContain('<rect width="64" height="64" rx="14" fill="#5b2a99"/>');
    expect(svg).toContain(`d="${MARK.path}"`);
    expect(svg).toContain('stroke="#fff" stroke-width="5"');
  });

  it('can have square corners, for Apple’s home screen icons', () => {
    expect(markSvg({ rounded: false })).toContain('<rect width="64" height="64" fill="#5b2a99"/>');
  });
});
