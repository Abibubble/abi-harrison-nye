import {
  type LoaderFunctionArgs,
  type MetaArgs,
  type MetaDescriptor,
  useLoaderData,
} from 'react-router';

import { TalkSlides } from '../components/TalkSlides';
import { pageTitle } from '../content/site';
import { loadSlidesPage } from '../content/talkPage';
import { slidesPath } from '../content/talkPath';
import { pageMeta } from '../seo/pageMeta';
import { slugFrom } from './talk';

/** /talks/debt-to-done/slides gives debt-to-done */
export function slidesSlugFrom(url: string): string {
  return slugFrom(url).replace(/\/slides$/, '');
}

/** Runs when the site is built, so the slides' Markdown never reaches visitors */
export function loader({ request }: LoaderFunctionArgs) {
  return loadSlidesPage(slidesSlugFrom(request.url));
}

export function meta({ loaderData }: MetaArgs<typeof loader>): MetaDescriptor[] {
  if (!loaderData) return [];

  const { talk } = loaderData;
  return pageMeta({
    title: pageTitle(`Slides: ${talk.title}`),
    description: `Every slide from my talk “${talk.title}”, at ${talk.event}, with a description of each one.`,
    path: slidesPath(talk.slug),
  });
}

export default function TalkSlidesPage() {
  return <TalkSlides {...useLoaderData<typeof loader>()} />;
}
