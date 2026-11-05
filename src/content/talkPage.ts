import { data } from 'react-router';

import {
  type AlsoGiven,
  type Talk,
  TALKS,
  TALKS_WITH_SLIDES,
  TALKS_WITH_TRANSCRIPTS,
  findTalk,
} from './talks';
import {
  ABOUT,
  ALSO_TRANSCRIPTS,
  SLIDE_TEXT,
  type Slide,
  TRANSCRIPTS,
  type TranscriptSection,
  alsoGivenKey,
  renderSlides,
  renderTranscript,
  renderTranscriptPage,
} from './transcripts';

export interface TalkPageData {
  talk: Talk;
  /** The longer description, as HTML, if the talk has one */
  aboutHtml?: string;
}

export interface TranscriptPageData {
  talk: Talk;
  /** Another time I gave the talk, when the transcript is of that one */
  alsoGiven?: AlsoGiven;
  transcriptHtml: string;
  sections: TranscriptSection[];
}

export interface SlidesPageData {
  talk: Talk;
  slides: Slide[];
}

function notFound(): never {
  // eslint-disable-next-line @typescript-eslint/only-throw-error -- React Router expects a response
  throw data(null, { status: 404 });
}

/** A talk and its transcript, or a 404, so a talk can never show without one */
function talkWithTranscript(
  slug: string,
  talks: readonly Talk[],
  transcripts: Record<string, string>,
): { talk: Talk; markdown: string } {
  const talk = findTalk(slug, talks);
  const markdown = transcripts[slug];

  if (!talk || markdown === undefined) notFound();
  return { talk, markdown };
}

export function loadTalkPage(
  slug: string,
  talks: readonly Talk[] = TALKS,
  transcripts: Record<string, string> = TRANSCRIPTS,
  about: Record<string, string> = ABOUT,
): TalkPageData {
  const { talk } = talkWithTranscript(slug, talks, transcripts);
  const aboutMarkdown = about[slug];

  return {
    talk,
    ...(aboutMarkdown !== undefined && { aboutHtml: renderTranscript(aboutMarkdown) }),
  };
}

export function loadTranscriptPage(
  slug: string,
  talks: readonly Talk[] = TALKS_WITH_TRANSCRIPTS,
  transcripts: Record<string, string> = TRANSCRIPTS,
): TranscriptPageData {
  const { talk, markdown } = talkWithTranscript(slug, talks, transcripts);
  const { html, sections } = renderTranscriptPage(markdown);

  return { talk, transcriptHtml: html, sections };
}

/**
 * The transcript of another time I gave a talk, or a 404 if that has no transcript page. Its page
 * address comes from alsoGiven's slug, which is only there once the transcript is checked
 */
export function loadAlsoGivenTranscriptPage(
  slug: string,
  alsoGivenSlug: string,
  talks: readonly Talk[] = TALKS,
  transcripts: Record<string, string> = ALSO_TRANSCRIPTS,
): TranscriptPageData {
  const talk = findTalk(slug, talks);
  const alsoGiven = talk?.alsoGiven?.find((other) => other.slug === alsoGivenSlug);
  const markdown = alsoGiven && transcripts[alsoGivenKey(slug, alsoGiven.date)];

  if (!talk || !alsoGiven || markdown === undefined) notFound();
  const { html, sections } = renderTranscriptPage(markdown);

  return { talk, alsoGiven, transcriptHtml: html, sections };
}

/** A talk's slides, or a 404 for a talk without a Slides page */
export function loadSlidesPage(
  slug: string,
  talks: readonly Talk[] = TALKS_WITH_SLIDES,
  slideText: Record<string, string> = SLIDE_TEXT,
): SlidesPageData {
  const talk = findTalk(slug, talks);
  const markdown = slideText[slug];

  if (!talk?.slidesPage || markdown === undefined) notFound();
  return { talk, slides: renderSlides(markdown) };
}
