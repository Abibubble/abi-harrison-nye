import {
  type LoaderFunctionArgs,
  type MetaArgs,
  type MetaDescriptor,
  useLoaderData,
} from 'react-router';

import { TalkTranscript } from '../components/TalkTranscript';
import { pageTitle } from '../content/site';
import { loadTranscriptPage } from '../content/talkPage';
import { transcriptPath } from '../content/talkPath';
import { pageMeta } from '../seo/pageMeta';
import { slugFrom } from './talk';

/** /talks/debt-to-done/transcript gives debt-to-done */
export function transcriptSlugFrom(url: string): string {
  return slugFrom(url).replace(/\/transcript$/, '');
}

/** Runs when the site is built, so the transcript's Markdown never reaches visitors */
export function loader({ request }: LoaderFunctionArgs) {
  return loadTranscriptPage(transcriptSlugFrom(request.url));
}

export function meta({ loaderData }: MetaArgs<typeof loader>): MetaDescriptor[] {
  if (!loaderData) return [];

  const { talk } = loaderData;
  return pageMeta({
    title: pageTitle(`Transcript: ${talk.title}`),
    description: `The full transcript of my talk “${talk.title}”, at ${talk.event}.`,
    path: transcriptPath(talk.slug),
  });
}

export default function TalkTranscriptPage() {
  return <TalkTranscript {...useLoaderData<typeof loader>()} />;
}
