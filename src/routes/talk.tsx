import {
  type LoaderFunctionArgs,
  type MetaArgs,
  type MetaDescriptor,
  useLoaderData,
} from 'react-router';

import { TalkDetail } from '../components/TalkDetail';
import { pageTitle } from '../content/site';
import { loadTalkPage } from '../content/talkPage';
import { pageMeta } from '../seo/pageMeta';

export function slugFrom(url: string): string {
  return new URL(url).pathname
    .replace(/^.*\/talks\//, '')
    .replace(/\/$/, '')
    .replace(/\.data$/, '');
}

export function loader({ request }: LoaderFunctionArgs) {
  return loadTalkPage(slugFrom(request.url));
}

export function meta({ loaderData }: MetaArgs<typeof loader>): MetaDescriptor[] {
  if (!loaderData) return [];

  return pageMeta({
    title: pageTitle(loaderData.talk.title),
    description: loaderData.talk.summary,
    path: `/talks/${loaderData.talk.slug}`,
  });
}

export default function Talk() {
  const { talk, transcriptHtml } = useLoaderData<typeof loader>();

  return <TalkDetail talk={talk} transcriptHtml={transcriptHtml} />;
}
