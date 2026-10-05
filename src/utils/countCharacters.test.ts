import { describe, expect, it } from 'vitest';

import { countCharacters } from './countCharacters';

describe('countCharacters', () => {
  it('counts letters, spaces and line breaks', () => {
    expect(countCharacters('Hi there.\nBye.')).toBe(14);
  });

  it('counts an emoji as one character', () => {
    expect(countCharacters('Thanks 👍')).toBe(8);
  });

  it('counts nothing as zero', () => {
    expect(countCharacters('')).toBe(0);
  });
});
