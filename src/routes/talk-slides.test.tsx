import { describe, expect, it } from 'vitest';

import type { SlidesPageData } from '../content/talkPage';
import { pageMeta } from '../seo/pageMeta';
import { loader, meta, slidesSlugFrom } from './talk-slides';

const PAGE: SlidesPageData = {
  talk: {
    slug: 'example-talk',
    title: 'Example talk',
    event: 'Example conference',
    date: '2026-06-12',
    summary: 'A talk used to test this page.',
    slidesPage: true,
  },
  slides: [{ number: 1, html: '<p>“Hello”</p>\n' }],
};

describe('Talk slides page', () => {
  it.each([
    'http://localhost/talks/debt-to-done/slides',
    'http://localhost/talks/debt-to-done/slides/',
    'http://localhost/talks/debt-to-done/slides.data',
    'https://abibubble.github.io/abi-harrison-nye/talks/debt-to-done/slides/',
  ])('finds the talk’s slug in its address: %s', (url) => {
    expect(slidesSlugFrom(url)).toBe('debt-to-done');
  });

  it('has its own page title and description, at its own address', () => {
    const args = { loaderData: PAGE } as Parameters<typeof meta>[0];

    expect(meta(args)).toEqual(
      pageMeta({
        title: 'Slides: Example talk, Abi Harrison-Nye',
        description:
          'Every slide from my talk “Example talk”, at Example conference, with a description of each one.',
        path: '/talks/example-talk/slides',
      }),
    );
  });

  it('has no page title of its own when there’s no talk, leaving it to the not found page', () => {
    const args = { loaderData: undefined } as Parameters<typeof meta>[0];

    expect(meta(args)).toEqual([]);
  });

  it('gives a 404 for a talk that isn’t on the site', () => {
    const args = {
      request: new Request('http://localhost/talks/not-a-real-talk/slides'),
    } as Parameters<typeof loader>[0];
    let thrown: unknown;
    try {
      loader(args);
    } catch (error) {
      thrown = error;
    }

    expect((thrown as { init?: { status?: number } }).init?.status).toBe(404);
  });
});
