import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { describe, expect, it } from 'vitest';

import { MARK, markSvg } from './mark';

describe('markSvg', () => {
  it('draws the mark with rounded corners', () => {
    const svg = markSvg();

    expect(svg).toMatch(/^<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg" viewBox="0 0 64 64">/);
    expect(svg).toContain('<rect width="64" height="64" rx="14" fill="#5B2A86"/>');
    expect(svg.match(/<rect /g)).toHaveLength(MARK.bars.length + 1);
  });

  it('can have square corners, for Apple’s home screen icons', () => {
    expect(markSvg({ rounded: false })).toContain('<rect width="64" height="64" fill="#5B2A86"/>');
  });

  it('matches the logo files, so the icons and logo stay the same', () => {
    const logo = readFileSync(
      join(import.meta.dirname, '../../brand/logo/svg/ahn-mark.svg'),
      'utf8',
    );
    // Each rectangle's position, size, corners and colour, with a missing x or y counting as 0
    const shapes = (svg: string): Record<string, string | number>[] =>
      [...svg.matchAll(/<rect ([^>]*)\/>/g)].map(([, attributes]) => {
        const shape: Record<string, string | number> = { x: 0, y: 0 };
        for (const [, name, value] of (attributes ?? '').matchAll(/(\w+)="([^"]+)"/g)) {
          if (name && value) {
            shape[name] = Number.isNaN(Number(value)) ? value.toUpperCase() : Number(value);
          }
        }
        return shape;
      });

    expect(shapes(markSvg())).toEqual(shapes(logo));
  });
});
