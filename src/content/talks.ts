import RECORDS from './talks.json' with { type: 'json' };

export interface TalkVideo {
  /** The video on YouTube. Talks I've uploaded myself are unlisted */
  href: string;
  /**
   * The video's captions: accurate ones checked by a person, YouTube's automatic ones, which often
   * have mistakes, or none. Anything but accurate is listed as a known issue
   */
  captions: 'accurate' | 'automatic' | 'none';
  /**
   * Whether everything shown on screen, such as slides and demos, is also described aloud, so the
   * video needs no audio description. Videos that aren't are listed as known issues
   */
  describedAloud: boolean;
}

export interface Talk {
  /** The talk's address: /talks/{slug}. Its transcript is src/content/talks/{slug}.md */
  slug: string;
  title: string;
  event: string;
  location: string;
  /** YYYY-MM-DD, or YYYY-MM if the day isn't known */
  date: string;
  summary: string;
  video?: TalkVideo;
  /** The slides on another site */
  slidesHref?: string;
  /** The slides as a file in public/, such as talks/example-slides.pdf, with its size, such as 5.6MB */
  slidesFile?: { path: string; size: string };
}

/** What I have for a talk, to keep track of what's still missing */
export interface TalkHas {
  /** On the site as a file or link, sent but not on the site, still being searched for, or none */
  slides: 'file' | 'link' | 'have' | 'searching' | 'none';
  /** Whether there's a script of what I planned to say */
  script: boolean;
  /**
   * Checked and ready, a draft in src/content/talks/ to check, a transcript that isn't written up for
   * the site yet, or none
   */
  transcript: 'checked' | 'draft' | 'raw' | 'none';
  recording: 'youtube' | 'uploading' | 'not recorded' | 'unknown';
}

/**
 * A talk in talks.json: its details, plus what I have for it and what's still to do. Only talks
 * marked ready appear on the site, and tests check a talk has everything it needs before it can be
 */
export interface TalkRecord extends Talk {
  ready: boolean;
  has: TalkHas;
  /** Whether anyone else in the talk, or giffgaff, needs to agree before it's public */
  permission: 'not needed' | 'needed' | 'agreed';
  todo: string[];
}

/**
 * Every talk, ready or not, from talks.json. This file is only read when the site is built, by
 * loaders and the route config, so talks that aren't ready never reach visitors. A test checks the
 * built site for them
 */
export const TALK_RECORDS = RECORDS as TalkRecord[];

/**
 * Only the details the site shows. It lists what to keep, rather than what to remove, so anything
 * new added for tracking stays private
 */
export function publicTalk(record: TalkRecord): Talk {
  const { slug, title, event, location, date, summary, video, slidesHref, slidesFile } = record;

  return {
    slug,
    title,
    event,
    location,
    date,
    summary,
    ...(video && { video }),
    ...(slidesHref && { slidesHref }),
    ...(slidesFile && { slidesFile }),
  };
}

/**
 * The talks on the site: the ready ones, newest first. Transcripts describe anything shown on screen,
 * such as slides and demos, as well as what's said, where the slides still exist (WCAG 1.2.8)
 */
export const TALKS: Talk[] = TALK_RECORDS.filter((record) => record.ready)
  .map(publicTalk)
  .sort((a, b) => b.date.localeCompare(a.date));

export function findTalk(slug: string, talks: readonly Talk[] = TALKS): Talk | undefined {
  return talks.find((talk) => talk.slug === slug);
}

/** Talks whose videos don't have accurate captions, for the known issues on the Accessibility page */
export function talksWithoutCaptions(talks: readonly Talk[] = TALKS): Talk[] {
  return talks.filter((talk) => talk.video && talk.video.captions !== 'accurate');
}

/** Talks with videos that show things not described aloud, for the Accessibility page's known issues */
export function talksNeedingAudioDescription(talks: readonly Talk[] = TALKS): Talk[] {
  return talks.filter((talk) => talk.video && !talk.video.describedAloud);
}

/** Talks with videos, which don't have sign language interpretation, as the Accessibility page says */
export function talksWithVideos(talks: readonly Talk[] = TALKS): Talk[] {
  return talks.filter((talk) => talk.video);
}

export interface KnownIssueTalks {
  withoutCaptions: Talk[];
  needingDescription: Talk[];
  withVideos: Talk[];
}

/** The talks the Accessibility page lists as known issues, worked out when the site is built */
export function knownIssueTalks(talks: readonly Talk[] = TALKS): KnownIssueTalks {
  return {
    withoutCaptions: talksWithoutCaptions(talks),
    needingDescription: talksNeedingAudioDescription(talks),
    withVideos: talksWithVideos(talks),
  };
}
