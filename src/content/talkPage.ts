import { data } from 'react-router';

import { type Talk, TALKS, findTalk } from './talks';
import { TRANSCRIPTS, renderTranscript } from './transcripts';

export interface TalkPageData {
  talk: Talk;
  transcriptHtml: string;
}

/**
 * Everything a talk's page needs, found by its slug. Runs when the site is built. Throws a 404 for a
 * talk that doesn't exist, so the not found page is shown.
 */
export function loadTalkPage(
  slug: string,
  talks: readonly Talk[] = TALKS,
  transcripts: Record<string, string> = TRANSCRIPTS,
): TalkPageData {
  const talk = findTalk(slug, talks);
  const markdown = transcripts[slug];

  if (!talk || markdown === undefined) {
    // eslint-disable-next-line @typescript-eslint/only-throw-error -- React Router expects a response
    throw data(null, { status: 404 });
  }

  return { talk, transcriptHtml: renderTranscript(markdown) };
}
