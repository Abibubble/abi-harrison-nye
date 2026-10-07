import { describe, expect, it } from 'vitest';

import { loadTalkPage } from './talkPage';
import type { Talk } from './talks';

const TALKS: Talk[] = [
  {
    slug: 'example-talk',
    title: 'Example talk',
    event: 'Example conference',
    location: 'London',
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
  it('gives the talk and its transcript as HTML', () => {
    const page = loadTalkPage('example-talk', TALKS, { 'example-talk': '### Introduction' });

    expect(page.talk.title).toBe('Example talk');
    expect(page.transcriptHtml).toBe('<h3>Introduction</h3>\n');
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
