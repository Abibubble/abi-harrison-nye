import { describe, expect, it } from 'vitest';

import { formatDate } from '../components/Time';
import { type Talk, TALKS, findTalk, talksWithoutCaptions } from './talks';
import { TRANSCRIPTS, bySlug, renderTranscript } from './transcripts';

const EXAMPLE_TALKS: Talk[] = [
  {
    slug: 'captioned-talk',
    title: 'Captioned talk',
    event: 'Example conference',
    location: 'London',
    date: '2026-06',
    summary: 'A talk with captions.',
    video: { href: 'https://www.youtube.com/watch?v=example1', captions: true },
  },
  {
    slug: 'uncaptioned-talk',
    title: 'Uncaptioned talk',
    event: 'Example meetup',
    location: 'Online',
    date: '2025-11-20',
    summary: 'A talk without captions yet.',
    video: { href: 'https://www.youtube.com/watch?v=example2', captions: false },
  },
  {
    slug: 'talk-without-video',
    title: 'Talk without a video',
    event: 'Example meetup',
    location: 'Manchester',
    date: '2025-03',
    summary: 'A talk that wasn’t recorded.',
  },
];

describe('findTalk', () => {
  it('finds a talk by its slug', () => {
    expect(findTalk('uncaptioned-talk', EXAMPLE_TALKS)?.title).toBe('Uncaptioned talk');
  });

  it('gives nothing for a slug that isn’t a talk', () => {
    expect(findTalk('missing', EXAMPLE_TALKS)).toBeUndefined();
  });

  it('looks in the real talks by default', () => {
    expect(findTalk('missing')).toBeUndefined();
  });
});

describe('talksWithoutCaptions', () => {
  it('lists talks whose videos have no captions, but not talks without videos', () => {
    expect(talksWithoutCaptions(EXAMPLE_TALKS).map((talk) => talk.slug)).toEqual([
      'uncaptioned-talk',
    ]);
  });

  it('looks at the real talks by default', () => {
    expect(talksWithoutCaptions()).toEqual(TALKS.filter((talk) => talk.video?.captions === false));
  });
});

describe('bySlug', () => {
  it('keys transcript files by their talk’s slug', () => {
    expect(bySlug({ './talks/debt-to-done.md': '### Hello' })).toEqual({
      'debt-to-done': '### Hello',
    });
  });
});

describe('renderTranscript', () => {
  it('turns Markdown into HTML', () => {
    expect(renderTranscript('### Introduction\n\nHello, I’m **Abi**.')).toBe(
      '<h3>Introduction</h3>\n<p>Hello, I’m <strong>Abi</strong>.</p>\n',
    );
  });
});

describe('the real talks', () => {
  it('each have a transcript, so none goes live without one', () => {
    for (const talk of TALKS) {
      expect(Object.keys(TRANSCRIPTS), `${talk.slug} has no transcript`).toContain(talk.slug);
    }
  });

  it('have no transcripts without a talk', () => {
    for (const slug of Object.keys(TRANSCRIPTS)) {
      expect(findTalk(slug), `${slug}.md has no talk`).toBeDefined();
    }
  });

  it('have transcripts that start their headings at level 3, under the page’s own', () => {
    for (const [slug, markdown] of Object.entries(TRANSCRIPTS)) {
      expect(markdown, slug).not.toMatch(/^#{1,2}\s/m);
    }
  });

  it('have addresses made of lowercase words and hyphens', () => {
    for (const talk of TALKS) {
      expect(talk.slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    }
  });

  it('have real dates, newest first', () => {
    for (const talk of TALKS) {
      expect(() => formatDate(talk.date), talk.slug).not.toThrow();
    }
    const dates = TALKS.map((talk) => talk.date);
    expect(dates).toEqual([...dates].sort().reverse());
  });

  it('link to videos on YouTube', () => {
    for (const talk of TALKS) {
      if (talk.video) {
        expect(talk.video.href, talk.slug).toMatch(/^https:\/\/(www\.)?(youtube\.com|youtu\.be)\//);
      }
    }
  });
});
