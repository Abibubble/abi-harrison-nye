import { describe, expect, it } from 'vitest';

import type { TranscriptPageData } from '../content/talkPage';
import { pageMeta } from '../seo/pageMeta';
import { loader, meta, transcriptSlugFrom } from './talk-transcript';

const PAGE: TranscriptPageData = {
  talk: {
    slug: 'example-talk',
    title: 'Example talk',
    event: 'Example conference',
    date: '2026-06-12',
    summary: 'A talk used to test this page.',
  },
  transcriptHtml: '<h2 id="introduction">Introduction</h2>\n',
  sections: [{ id: 'introduction', title: 'Introduction' }],
};

describe('Talk transcript page', () => {
  it.each([
    'http://localhost/talks/debt-to-done/transcript',
    'http://localhost/talks/debt-to-done/transcript/',
    'http://localhost/talks/debt-to-done/transcript.data',
    'https://abibubble.github.io/abi-harrison-nye/talks/debt-to-done/transcript/',
  ])('finds the talk’s slug in its address: %s', (url) => {
    expect(transcriptSlugFrom(url)).toBe('debt-to-done');
  });

  it('has its own page title and description, at its own address', () => {
    const args = { loaderData: PAGE } as Parameters<typeof meta>[0];

    expect(meta(args)).toEqual(
      pageMeta({
        title: 'Transcript: Example talk, Abi Harrison-Nye',
        description: 'The full transcript of my talk “Example talk”, at Example conference.',
        path: '/talks/example-talk/transcript',
      }),
    );
  });

  it('has no page title of its own when there’s no talk, leaving it to the not found page', () => {
    const args = { loaderData: undefined } as Parameters<typeof meta>[0];

    expect(meta(args)).toEqual([]);
  });

  it('gives a 404 for a talk that isn’t on the site', () => {
    const args = {
      request: new Request('http://localhost/talks/not-a-real-talk/transcript'),
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
