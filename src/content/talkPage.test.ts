import { describe, expect, it } from 'vitest';

import { loadSlidesPage, loadTalkPage, loadTranscriptPage } from './talkPage';
import type { Talk } from './talks';

const TALKS: Talk[] = [
  {
    slug: 'example-talk',
    title: 'Example talk',
    event: 'Example conference',
    date: '2026-06',
    summary: 'A talk used to test loading.',
  },
];

function thrownStatus(load: () => unknown): number | undefined {
  try {
    load();
  } catch (error) {
    return (error as { init?: { status?: number } }).init?.status;
  }
  return undefined;
}

describe('loadTalkPage', () => {
  it('gives the talk, and its longer description as HTML if it has one', () => {
    const transcripts = { 'example-talk': '### Introduction' };

    expect(loadTalkPage('example-talk', TALKS, transcripts, {})).toEqual({ talk: TALKS[0] });
    expect(
      loadTalkPage('example-talk', TALKS, transcripts, { 'example-talk': 'All **about** it' })
        .aboutHtml,
    ).toBe('<p>All <strong>about</strong> it</p>\n');
  });

  it('gives a 404 for a talk that doesn’t exist, so the not found page shows', () => {
    expect(thrownStatus(() => loadTalkPage('missing', TALKS, {}))).toBe(404);
  });

  it('gives a 404 for a talk without a transcript, so it can never show without one', () => {
    expect(thrownStatus(() => loadTalkPage('example-talk', TALKS, {}))).toBe(404);
  });

  it('uses the real talks and transcripts by default', () => {
    expect(thrownStatus(() => loadTalkPage('not-a-real-talk'))).toBe(404);
  });
});

describe('loadTranscriptPage', () => {
  it('gives the talk, its transcript as HTML, and its sections for the contents', () => {
    const page = loadTranscriptPage('example-talk', TALKS, {
      'example-talk': '### Introduction\n\nHello.',
    });

    expect(page.talk.title).toBe('Example talk');
    expect(page.transcriptHtml).toBe('<h2 id="introduction">Introduction</h2>\n<p>Hello.</p>\n');
    expect(page.sections).toEqual([{ id: 'introduction', title: 'Introduction' }]);
  });

  it('gives a 404 for a talk that doesn’t exist, or has no transcript', () => {
    expect(thrownStatus(() => loadTranscriptPage('missing', TALKS, {}))).toBe(404);
    expect(thrownStatus(() => loadTranscriptPage('example-talk', TALKS, {}))).toBe(404);
  });
});

describe('loadSlidesPage', () => {
  const withSlides: Talk[] = TALKS.map((talk) => ({ ...talk, slidesPage: true }));
  const slideText = { 'example-talk': '### Slide 1\n\n“Hello”\n\n### Slide 2\n\n“Bye”' };

  it('gives the talk and each of its slides as HTML', () => {
    expect(loadSlidesPage('example-talk', withSlides, slideText)).toEqual({
      talk: withSlides[0],
      slides: [
        { number: 1, html: '<p>“Hello”</p>\n' },
        { number: 2, html: '<p>“Bye”</p>\n' },
      ],
    });
  });

  it('gives a 404 for a talk without a Slides page, even if its slides are written', () => {
    expect(thrownStatus(() => loadSlidesPage('example-talk', TALKS, slideText))).toBe(404);
  });

  it('gives a 404 for a talk that doesn’t exist, or has no slide descriptions', () => {
    expect(thrownStatus(() => loadSlidesPage('missing', withSlides, slideText))).toBe(404);
    expect(thrownStatus(() => loadSlidesPage('example-talk', withSlides, {}))).toBe(404);
  });

  it('uses the real talks and slides by default', () => {
    expect(thrownStatus(() => loadSlidesPage('not-a-real-talk'))).toBe(404);
  });
});
