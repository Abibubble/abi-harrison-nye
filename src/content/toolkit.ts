import RECORD from './toolkit.json' with { type: 'json' };

/** The toolkit's address. Folders and resources sit under it, such as /inclusion-toolkit/highlights */
export const TOOLKIT_PATH = '/inclusion-toolkit';

export const TOOLKIT_TITLE = 'Inclusion Toolkit';

export const TOOLKIT_DESCRIPTION =
  'Free resources on accessibility and neurodiversity, which I’ve created, for anyone to use.';

/** One format of a resource, such as its PDF, in public/ */
export interface ToolkitFile {
  /** Always under inclusion-toolkit/files/, such as inclusion-toolkit/files/adhd.pdf */
  path: string;
  /**
   * Such as 1.2MB, using 1000 bytes to a kilobyte, as computers show it. Worked out from the file
   * when the site is built, so it's empty until then
   */
  size: string;
}

/** A resource, with a page of its own showing everything in it as text */
export interface ToolkitItem {
  slug: string;
  title: string;
  description: string;
  /** YYYY-MM-DD */
  updated: string;
  /** Every format it comes in. The PDF, if there is one, is the one to view */
  files: ToolkitFile[];
}

export type ToolkitFileType = 'PDF' | 'Word document' | 'PowerPoint';

const FILE_TYPES: Record<string, ToolkitFileType> = {
  pdf: 'PDF',
  docx: 'Word document',
  pptx: 'PowerPoint',
};

/** What kind of file it is, from its extension, for saying so next to the link */
export function fileType(file: ToolkitFile): ToolkitFileType | undefined {
  return FILE_TYPES[file.path.split('.').pop()?.toLowerCase() ?? ''];
}

export interface ToolkitFolder {
  slug: string;
  title: string;
  description: string;
  folders: ToolkitFolder[];
  items: ToolkitItem[];
}

/**
 * A resource in toolkit.json, with what I'm tracking. The text of everything in it is in
 * src/content/toolkit/{folders}/{slug}.md, and its files are named the same way (see toolkitFilePaths)
 */
export interface ToolkitItemRecord extends Omit<ToolkitItem, 'files'> {
  /** Whether it has a slides version, which then needs its PowerPoint file too */
  slides: boolean;
  /** Checked and ready, a draft to check, or not written yet. Only checked ones are on the site */
  text: 'checked' | 'draft' | 'none';
  todo: string[];
}

export interface ToolkitFolderRecord extends Omit<ToolkitFolder, 'folders' | 'items'> {
  folders: ToolkitFolderRecord[];
  items: ToolkitItemRecord[];
}

/** Every folder and resource in toolkit.json, ready or not. Only read when the site is built */
export const TOOLKIT_RECORD: ToolkitFolderRecord = {
  slug: '',
  title: TOOLKIT_TITLE,
  description: '',
  ...(RECORD as Pick<ToolkitFolderRecord, 'folders' | 'items'>),
};

/**
 * Where a resource's files go in public/. Every resource has a PDF and a Word file, and a
 * PowerPoint file if it has slides, named after the slugs leading to it. So
 * highlights/accessibility/dark-mode has inclusion-toolkit/files/highlights/accessibility/dark-mode.pdf
 * and .docx. The PDF comes first, as it's the one to view
 */
export function toolkitFilePaths(slugs: readonly string[], slides: boolean): string[] {
  const extensions = slides ? ['pdf', 'docx', 'pptx'] : ['pdf', 'docx'];
  return extensions.map((extension) => `inclusion-toolkit/files/${slugs.join('/')}.${extension}`);
}

/**
 * Ready once its text is checked. The tests and the build then make sure it has every file it
 * needs, so nobody is left out
 */
function isReady(item: ToolkitItemRecord): boolean {
  return item.text === 'checked';
}

/**
 * Only what the site shows: ready resources, and folders with something in them.
 * It lists what to keep, rather than what to remove, so anything new added for tracking stays private
 */
export function publicToolkit(record: ToolkitFolderRecord, slugs: string[] = []): ToolkitFolder {
  const { slug, title, description } = record;

  return {
    slug,
    title,
    description,
    folders: record.folders
      .map((child) => publicToolkit(child, [...slugs, child.slug]))
      .filter(hasContent),
    items: record.items
      .filter(isReady)
      .map(({ slug: itemSlug, title, description, updated, slides }) => ({
        slug: itemSlug,
        title,
        description,
        updated,
        files: toolkitFilePaths([...slugs, itemSlug], slides).map((path) => ({ path, size: '' })),
      })),
  };
}

function hasContent(folder: ToolkitFolder): boolean {
  return folder.items.length > 0 || folder.folders.length > 0;
}

/** The toolkit as the site shows it */
export const TOOLKIT: ToolkitFolder = publicToolkit(TOOLKIT_RECORD);

/** The address of a folder or resource, from the slugs leading to it */
export function toolkitPath(slugs: readonly string[]): string {
  return [TOOLKIT_PATH, ...slugs].join('/');
}

/** The key for a resource's text file, src/content/toolkit/{key}.md, such as highlights/dark-mode */
export function toolkitTextKey(slugs: readonly string[]): string {
  return slugs.join('/');
}

export interface ToolkitEntry {
  kind: 'folder' | 'item';
  slugs: string[];
  title: string;
  description: string;
}

/** Every folder and resource under a folder, with the slugs leading to each, in page order */
export function toolkitEntries(folder: ToolkitFolder, slugs: string[] = []): ToolkitEntry[] {
  return [
    ...folder.folders.flatMap((child) => [
      { kind: 'folder' as const, slugs: [...slugs, child.slug], ...describe(child) },
      ...toolkitEntries(child, [...slugs, child.slug]),
    ]),
    ...folder.items.map((item) => ({
      kind: 'item' as const,
      slugs: [...slugs, item.slug],
      ...describe(item),
    })),
  ];
}

function describe({ title, description }: { title: string; description: string }) {
  return { title, description };
}

/** A step in the breadcrumbs, from the toolkit down to the current page */
export interface ToolkitCrumb {
  title: string;
  path: string;
}

export type ToolkitLocation =
  | { kind: 'folder'; folder: ToolkitFolder; slugs: string[]; trail: ToolkitCrumb[] }
  | { kind: 'item'; item: ToolkitItem; slugs: string[]; trail: ToolkitCrumb[] };

/** The folder or resource at the end of some slugs, with the folders above it, or nothing */
export function findInToolkit(
  slugs: readonly string[],
  root: ToolkitFolder = TOOLKIT,
): ToolkitLocation | undefined {
  const trail: ToolkitCrumb[] = [{ title: TOOLKIT_TITLE, path: TOOLKIT_PATH }];
  let folder = root;

  for (const [index, slug] of slugs.entries()) {
    const path = toolkitPath(slugs.slice(0, index + 1));
    const isLast = index === slugs.length - 1;
    const child = folder.folders.find((candidate) => candidate.slug === slug);

    if (child) {
      if (isLast) return { kind: 'folder', folder: child, slugs: [...slugs], trail };
      trail.push({ title: child.title, path });
      folder = child;
      continue;
    }

    const item = isLast ? folder.items.find((candidate) => candidate.slug === slug) : undefined;
    return item ? { kind: 'item', item, slugs: [...slugs], trail } : undefined;
  }

  return { kind: 'folder', folder: root, slugs: [], trail: [] };
}

/** The PDF, which browsers can show, so it's the one to view */
export function viewableFile(item: ToolkitItem): ToolkitFile | undefined {
  return item.files.find((file) => fileType(file) === 'PDF');
}

/** Every resource in toolkit.json, ready or not, with the slugs leading to it */
export function toolkitItemRecords(
  record: ToolkitFolderRecord = TOOLKIT_RECORD,
  slugs: string[] = [],
): { slugs: string[]; item: ToolkitItemRecord }[] {
  return [
    ...record.items.map((item) => ({ slugs: [...slugs, item.slug], item })),
    ...record.folders.flatMap((child) => toolkitItemRecords(child, [...slugs, child.slug])),
  ];
}

/**
 * The files in public/ of resources that aren't on the site yet. Everything in public/ is copied
 * into the built site, so the build removes these
 */
export function unpublishedToolkitFiles(record: ToolkitFolderRecord = TOOLKIT_RECORD): string[] {
  return toolkitItemRecords(record)
    .filter(({ item }) => !isReady(item))
    .flatMap(({ slugs, item }) => toolkitFilePaths(slugs, item.slides));
}
