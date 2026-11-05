import { data } from 'react-router';

import {
  TOOLKIT,
  type ToolkitCrumb,
  type ToolkitFolder,
  type ToolkitItem,
  findInToolkit,
  toolkitEntries,
  toolkitPath,
  toolkitTextKey,
} from './toolkit';
import { renderTranscript } from './transcripts';

/**
 * The text of each resource, in src/content/toolkit/{folders}/{slug}.md. Only loaders use it, and
 * loaders run when the site is built, so the Markdown is never sent to visitors' browsers
 */
const TEXT_FILES = import.meta.glob<string>(['./toolkit/**/*.md', '!./toolkit/README.md'], {
  query: '?raw',
  import: 'default',
  eager: true,
});

/** Every resource's text, keyed by the slugs leading to it: ./toolkit/highlights/dark-mode.md gives highlights/dark-mode */
export const TOOLKIT_TEXT: Record<string, string> = Object.fromEntries(
  Object.entries(TEXT_FILES).map(([path, markdown]) => [
    path.replace(/^\.\/toolkit\//, '').replace(/\.md$/, ''),
    markdown,
  ]),
);

/** A folder or resource to search, with where it is */
export interface ToolkitSearchEntry {
  kind: 'folder' | 'item';
  title: string;
  description: string;
  path: string;
}

export type ToolkitPageData =
  | { kind: 'home'; toolkit: ToolkitFolder; search: ToolkitSearchEntry[] }
  | { kind: 'folder'; folder: ToolkitFolder; slugs: string[]; trail: ToolkitCrumb[] }
  | {
      kind: 'item';
      item: ToolkitItem;
      slugs: string[];
      trail: ToolkitCrumb[];
      textHtml: string;
    };

function notFound(): never {
  // eslint-disable-next-line @typescript-eslint/only-throw-error -- React Router expects a response
  throw data(null, { status: 404 });
}

/**
 * The toolkit's main page, a folder, or a resource with its text, from the slugs in its address,
 * or a 404. A resource can never show without its text, so everything in it is there as text too
 */
export function loadToolkitPage(
  slugs: readonly string[],
  toolkit: ToolkitFolder = TOOLKIT,
  texts: Record<string, string> = TOOLKIT_TEXT,
): ToolkitPageData {
  if (slugs.length === 0) {
    return {
      kind: 'home',
      toolkit,
      search: toolkitEntries(toolkit).map(({ kind, slugs: entrySlugs, title, description }) => ({
        kind,
        title,
        description,
        path: toolkitPath(entrySlugs),
      })),
    };
  }

  const location = findInToolkit(slugs, toolkit);
  if (!location) notFound();
  if (location.kind === 'folder') return location;

  const markdown = texts[toolkitTextKey(slugs)];
  if (markdown === undefined) notFound();
  return { ...location, textHtml: renderTranscript(markdown) };
}
