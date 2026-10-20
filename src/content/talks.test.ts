import { describe, expect, it } from 'vitest';

import { formatDate } from '../components/Time';
import {
  type Talk,
  type TalkRecord,
  TALKS,
  TALK_RECORDS,
  findTalk,
  publicTalk,
  talksNeedingAudioDescription,
  talksWithVideos,
  talksWithoutCaptions,
} from './talks';
import {
  ABOUT,
  TRANSCRIPTS,
  bySlug,
  headingId,
  renderTranscript,
  renderTranscriptPage,
} from './transcripts';

const EXAMPLE_TALKS: Talk[] = [
  {
    slug: 'captioned-talk',
    title: 'Captioned talk',
    event: 'Example conference',
    location: 'London',
    date: '2026-06',
    summary: 'A talk with captions.',
    video: {
      href: 'https://www.youtube.com/watch?v=example1',
      captions: 'accurate',
      describedAloud: true,
    },
  },
  {
    slug: 'uncaptioned-talk',
    title: 'Uncaptioned talk',
    event: 'Example meetup',
    location: 'Online',
    date: '2025-11-20',
    summary: 'A talk without captions yet.',
    video: {
      href: 'https://www.youtube.com/watch?v=example2',
      captions: 'none',
      describedAloud: false,
    },
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
    expect(talksWithoutCaptions()).toEqual(
      TALKS.filter((talk) => talk.video && talk.video.captions !== 'accurate'),
    );
  });
});

describe('talksNeedingAudioDescription', () => {
  it('lists talks whose videos show things not described aloud, but not talks without videos', () => {
    expect(talksNeedingAudioDescription(EXAMPLE_TALKS).map((talk) => talk.slug)).toEqual([
      'uncaptioned-talk',
    ]);
  });

  it('looks at the real talks by default', () => {
    expect(talksNeedingAudioDescription()).toEqual(
      TALKS.filter((talk) => talk.video?.describedAloud === false),
    );
  });
});

describe('talksWithVideos', () => {
  it('lists only talks with videos', () => {
    expect(talksWithVideos(EXAMPLE_TALKS).map((talk) => talk.slug)).toEqual([
      'captioned-talk',
      'uncaptioned-talk',
    ]);
  });

  it('looks at the real talks by default', () => {
    expect(talksWithVideos()).toEqual(TALKS.filter((talk) => talk.video));
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

describe('renderTranscriptPage', () => {
  it('moves headings up a level, and lists the sections for the contents', () => {
    const { html, sections } = renderTranscriptPage(
      '### The Purple Pound\n\nText.\n\n#### A detail\n\n### Questions',
    );

    expect(html).toBe(
      '<h2 id="the-purple-pound">The Purple Pound</h2>\n<p>Text.</p>\n<h3>A detail</h3>\n<h2 id="questions">Questions</h2>\n',
    );
    expect(sections).toEqual([
      { id: 'the-purple-pound', title: 'The Purple Pound' },
      { id: 'questions', title: 'Questions' },
    ]);
  });

  it('gives sections with the same name different ids', () => {
    const { sections } = renderTranscriptPage('### Demo\n\n### Demo\n\n### Demo detail');

    expect(sections.map((section) => section.id)).toEqual(['demo', 'demo-2', 'demo-detail']);
  });

  it('makes ids from heading text', () => {
    expect(headingId('Demo: the giffgaff app’s login')).toBe('demo-the-giffgaff-apps-login');
  });

  it('gives every real transcript at least one section', () => {
    for (const [slug, markdown] of Object.entries(TRANSCRIPTS)) {
      expect(renderTranscriptPage(markdown).sections.length, slug).toBeGreaterThan(0);
    }
  });
});

describe('the real talks', () => {
  it('each have a transcript, so none goes live without one', () => {
    for (const talk of TALKS) {
      expect(Object.keys(TRANSCRIPTS), `${talk.slug} has no transcript`).toContain(talk.slug);
    }
  });

  it('have no transcripts without a talk in talks.json', () => {
    for (const slug of Object.keys(TRANSCRIPTS)) {
      expect(findTalk(slug, TALK_RECORDS), `${slug}.md has no talk`).toBeDefined();
    }
  });

  it('have no longer descriptions without a talk in talks.json', () => {
    for (const slug of Object.keys(ABOUT)) {
      expect(findTalk(slug, TALK_RECORDS), `about/${slug}.md has no talk`).toBeDefined();
    }
  });

  it('have transcripts that start their headings at level 3, under the page’s own', () => {
    for (const [slug, markdown] of Object.entries(TRANSCRIPTS)) {
      expect(markdown, slug).not.toMatch(/^#{1,2}\s/m);
    }
  });

  it('have addresses made of lowercase words and hyphens, used once each', () => {
    for (const talk of TALK_RECORDS) {
      expect(talk.slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    }
    const slugs = TALK_RECORDS.map((talk) => talk.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
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

describe('talks.json', () => {
  const ready = TALK_RECORDS.filter((talk) => talk.ready);

  it('only puts ready talks on the site, without what I’m tracking', () => {
    expect(TALKS.map((talk) => talk.slug).sort()).toEqual(ready.map((talk) => talk.slug).sort());
    for (const talk of TALKS) {
      expect(Object.keys(talk)).not.toEqual(
        expect.arrayContaining([expect.stringMatching(/^(ready|has|permission|todo)$/)]),
      );
    }
  });

  it('removes what I’m tracking from a talk', () => {
    const talk: Talk = {
      slug: 'example',
      title: 'Example',
      event: 'Example meetup',
      location: 'Online',
      date: '2025-01',
      summary: 'An example.',
    };
    const record: TalkRecord = {
      ...talk,
      ready: false,
      has: { slides: 'none', script: false, transcript: 'none', recording: 'youtube' },
      permission: 'needed',
      todo: ['Something to do'],
    };

    expect(publicTalk(record)).toEqual(talk);
  });

  it('uses only the listed values for what each talk has', () => {
    for (const { slug, has, permission } of TALK_RECORDS) {
      expect(['file', 'link', 'have', 'searching', 'none'], slug).toContain(has.slides);
      expect(['checked', 'draft', 'raw', 'none'], slug).toContain(has.transcript);
      expect(['youtube', 'uploading', 'not recorded', 'unknown'], slug).toContain(has.recording);
      expect(['not needed', 'needed', 'agreed'], slug).toContain(permission);
    }
  });

  it('has a transcript file for every talk whose transcript is written up, and no others', () => {
    for (const { slug, has } of TALK_RECORDS) {
      const written = has.transcript === 'checked' || has.transcript === 'draft';
      expect(slug in TRANSCRIPTS, `${slug}: transcript is "${has.transcript}"`).toBe(written);
    }
  });

  it('matches the slides and recording to what each talk links to', () => {
    for (const { slug, has, slidesFile, slidesHref, video } of TALK_RECORDS) {
      expect(slidesFile !== undefined, `${slug}: slides file`).toBe(has.slides === 'file');
      expect(slidesHref !== undefined, `${slug}: slides link`).toBe(has.slides === 'link');
      expect(video !== undefined, `${slug}: video`).toBe(has.recording === 'youtube');
    }
  });

  it('only marks a talk ready once it has everything it needs', () => {
    for (const talk of ready) {
      const { slug } = talk;
      expect(talk.has.transcript, `${slug}: transcript`).toBe('checked');
      expect(talk.permission, `${slug}: permission`).not.toBe('needed');
      expect(TRANSCRIPTS[slug], `${slug}: transcript`).not.toContain('[check:');
      for (const field of ['title', 'event', 'location', 'date', 'summary'] as const) {
        expect(talk[field], `${slug}: ${field}`).not.toBe('');
      }
    }
  });
});
