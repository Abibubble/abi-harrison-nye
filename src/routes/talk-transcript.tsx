import {
  type LoaderFunctionArgs,
  type MetaArgs,
  type MetaDescriptor,
  useLoaderData,
} from 'react-router';

import { TalkTranscript } from '../components/TalkTranscript';
import { pageTitle } from '../content/site';
import { loadAlsoGivenTranscriptPage, loadTranscriptPage } from '../content/talkPage';
import { alsoGivenTranscriptPath, transcriptPath } from '../content/talkPath';
import { pageMeta } from '../seo/pageMeta';
import { slugFrom } from './talk';

/**
 * /talks/debt-to-done/transcript gives debt-to-done. Another time I gave it,
 * /talks/debt-to-done/shorter-version/transcript, gives debt-to-done/shorter-version
 */
export function transcriptSlugFrom(url: string): string {
  return slugFrom(url).replace(/\/transcript$/, '');
}

/** Runs when the site is built, so the transcript's Markdown never reaches visitors */
export function loader({ request }: LoaderFunctionArgs) {
  const [slug = '', alsoGivenSlug] = transcriptSlugFrom(request.url).split('/');

  return alsoGivenSlug
    ? loadAlsoGivenTranscriptPage(slug, alsoGivenSlug)
    : loadTranscriptPage(slug);
}

export function meta({ loaderData }: MetaArgs<typeof loader>): MetaDescriptor[] {
  if (!loaderData) return [];

  const { talk, alsoGiven } = loaderData;
  if (alsoGiven?.slug) {
    return pageMeta({
      title: pageTitle(`Transcript: ${talk.title} (${alsoGiven.description})`),
      description: `The full transcript of ${alsoGiven.description} of my talk “${talk.title}”, at ${alsoGiven.event}.`,
      path: alsoGivenTranscriptPath(talk.slug, alsoGiven.slug),
    });
  }

  return pageMeta({
    title: pageTitle(`Transcript: ${talk.title}`),
    description: `The full transcript of my talk “${talk.title}”, at ${talk.event}.`,
    path: transcriptPath(talk.slug),
  });
}

export default function TalkTranscriptPage() {
  return <TalkTranscript {...useLoaderData<typeof loader>()} />;
}
