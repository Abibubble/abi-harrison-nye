import { describe, expect, it } from 'vitest';

import { LOCAL_SITE_URL, siteUrlFromEnv } from './siteUrl';

describe('siteUrlFromEnv', () => {
  it('uses SITE_URL, without a trailing slash', () => {
    expect(siteUrlFromEnv({ SITE_URL: 'https://example.com/' })).toBe('https://example.com');
  });

  it('uses the local preview address for builds that aren’t on Vercel', () => {
    expect(siteUrlFromEnv({})).toBe(LOCAL_SITE_URL);
    expect(siteUrlFromEnv({ SITE_URL: '  ' })).toBe(LOCAL_SITE_URL);
  });

  it('stops a Vercel build without SITE_URL, so the live site never points at localhost', () => {
    expect(() => siteUrlFromEnv({ VERCEL: '1' })).toThrow('Set SITE_URL');
  });

  it.each(['example.com', 'not a url'])('rejects %s, which isn’t a full address', (value) => {
    expect(() => siteUrlFromEnv({ SITE_URL: value })).toThrow('must be a full address');
  });

  it.each(['https://example.com/blog', 'https://example.com/?a=1', 'https://example.com/#top'])(
    'rejects %s, which has something after the address',
    (value) => {
      expect(() => siteUrlFromEnv({ SITE_URL: value })).toThrow('nothing after it');
    },
  );
});
