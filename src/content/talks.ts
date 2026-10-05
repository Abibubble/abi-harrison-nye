export interface TalkVideo {
  /** The video on YouTube. Talks I've uploaded myself are unlisted. */
  href: string;
  /** Whether the video has accurate captions. Uncaptioned videos are listed as known issues. */
  captions: boolean;
}

export interface Talk {
  /** The talk's address: /talks/{slug}. Its transcript is src/content/talks/{slug}.md. */
  slug: string;
  title: string;
  event: string;
  location: string;
  /** YYYY-MM-DD, or YYYY-MM if the day isn't known. */
  date: string;
  summary: string;
  video?: TalkVideo;
  slidesHref?: string;
}

/**
 * Newest first. A talk can only be added once its transcript exists, which a test checks. Transcripts
 * describe anything shown on screen, such as slides and demos, as well as what's said (WCAG 1.2.8).
 */
export const TALKS: Talk[] = [];

export function findTalk(slug: string, talks: readonly Talk[] = TALKS): Talk | undefined {
  return talks.find((talk) => talk.slug === slug);
}

/** Talks whose videos don't have captions yet, for the known issues on the Accessibility page. */
export function talksWithoutCaptions(talks: readonly Talk[] = TALKS): Talk[] {
  return talks.filter((talk) => talk.video && !talk.video.captions);
}
