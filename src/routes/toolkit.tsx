import {
  type LoaderFunctionArgs,
  type MetaArgs,
  type MetaDescriptor,
  useLoaderData,
} from 'react-router';

import { ToolkitPage } from '../components/Toolkit';
import { pageTitle } from '../content/site';
import { TOOLKIT_DESCRIPTION, TOOLKIT_PATH, TOOLKIT_TITLE, toolkitPath } from '../content/toolkit';
import { loadToolkitPage } from '../content/toolkitPage';
import { pageMeta } from '../seo/pageMeta';

/** /inclusion-toolkit/highlights/dark-mode gives highlights and dark-mode */
export function toolkitSlugsFrom(url: string): string[] {
  const path = new URL(url).pathname.replace(/\.data$/, '').replace(/\/$/, '');
  const index = path.indexOf(TOOLKIT_PATH);

  return path
    .slice(index + TOOLKIT_PATH.length)
    .split('/')
    .filter(Boolean);
}

/** Runs when the site is built, so the resources' Markdown never reaches visitors */
export function loader({ request }: LoaderFunctionArgs) {
  return loadToolkitPage(toolkitSlugsFrom(request.url));
}

export function meta({ loaderData }: MetaArgs<typeof loader>): MetaDescriptor[] {
  if (!loaderData) return [];

  if (loaderData.kind === 'home') {
    return pageMeta({
      title: pageTitle(TOOLKIT_TITLE),
      description: TOOLKIT_DESCRIPTION,
      path: TOOLKIT_PATH,
    });
  }

  const { title, description } = loaderData.kind === 'folder' ? loaderData.folder : loaderData.item;
  return pageMeta({
    title: pageTitle(`${title}, ${TOOLKIT_TITLE}`),
    description,
    path: toolkitPath(loaderData.slugs),
  });
}

export default function Toolkit() {
  return <ToolkitPage data={useLoaderData<typeof loader>()} />;
}
