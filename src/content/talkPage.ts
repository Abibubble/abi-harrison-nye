import { data } from 'react-router';

import { type Talk, TALKS, findTalk } from './talks';
import {
  ABOUT,
  TRANSCRIPTS,
  type TranscriptSection,
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
  transcriptHtml: string;
  sections: TranscriptSection[];
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
  talks: readonly Talk[] = TALKS,
  transcripts: Record<string, string> = TRANSCRIPTS,
): TranscriptPageData {
  const { talk, markdown } = talkWithTranscript(slug, talks, transcripts);
  const { html, sections } = renderTranscriptPage(markdown);

  return { talk, transcriptHtml: html, sections };
}
