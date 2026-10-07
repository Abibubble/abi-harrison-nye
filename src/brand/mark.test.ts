import { describe, expect, it } from 'vitest';

import { MARK, markSvg } from './mark';

describe('markSvg', () => {
  it('draws the mark with the site action colours and rounded corners', () => {
    const svg = markSvg();

    expect(svg).toMatch(/^<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg" viewBox="0 0 64 64">/);
    expect(svg).toContain('<rect width="64" height="64" rx="14" fill="var(--color-action)"/>');
    expect(svg).toContain(`d="${MARK.path}"`);
    expect(svg).toContain('stroke="var(--color-action-text)" stroke-width="5"');
  });

  it('can have square corners, for Apple’s home screen icons', () => {
    expect(markSvg({ rounded: false })).toContain(
      '<rect width="64" height="64" fill="var(--color-action)"/>',
    );
  });
});
