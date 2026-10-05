import {
  type LoaderFunctionArgs,
  type MetaArgs,
  type MetaDescriptor,
  useLoaderData,
} from 'react-router';

import { TalkDetail } from '../components/TalkDetail';
import { pageTitle } from '../content/site';
import { loadTalkPage } from '../content/talkPage';

/*
 * Each talk has its own exact route using this file (see routes.ts), so there are none until there's
 * a talk, and React Router doesn't generate types for it until then. It uses React Router's general
 * types instead.
 */

/**
 * The talk's slug, from an address like /talks/debt-to-done. When prerendering, React Router also
 * asks for the page's data at /talks/debt-to-done.data, so that ending is removed too.
 */
export function slugFrom(url: string): string {
  return new URL(url).pathname
    .replace(/^\/talks\//, '')
    .replace(/\/$/, '')
    .replace(/\.data$/, '');
}

// Runs when the site is built, so the transcript arrives as finished HTML.
export function loader({ request }: LoaderFunctionArgs) {
  return loadTalkPage(slugFrom(request.url));
}

export function meta({ loaderData }: MetaArgs<typeof loader>): MetaDescriptor[] {
  if (!loaderData) return [];

  return [
    { title: pageTitle(loaderData.talk.title) },
    { name: 'description', content: loaderData.talk.summary },
  ];
}

export default function Talk() {
  const { talk, transcriptHtml } = useLoaderData<typeof loader>();

  return <TalkDetail talk={talk} transcriptHtml={transcriptHtml} />;
}
