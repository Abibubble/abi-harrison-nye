import { existsSync, readdirSync } from 'node:fs';

import { describe, expect, it } from 'vitest';

import { formatDate } from '../components/Time';
import {
  TOOLKIT_RECORD,
  type ToolkitFolderRecord,
  type ToolkitItemRecord,
  fileType,
  findInToolkit,
  publicToolkit,
  toolkitEntries,
  toolkitFilePaths,
  toolkitItemRecords,
  toolkitPath,
  unpublishedToolkitFiles,
  viewableFile,
} from './toolkit';
import { TOOLKIT_TEXT } from './toolkitPage';

/** A top level resource's files, as the site lists them before the build adds their sizes */
const files = (slug: string, extensions = ['pdf', 'docx']) =>
  extensions.map((extension) => ({
    path: `inclusion-toolkit/files/${slug}.${extension}`,
    size: '',
  }));

const item = (slug: string, overrides: Partial<ToolkitItemRecord> = {}): ToolkitItemRecord => ({
  slug,
  title: slug,
  description: `About ${slug}.`,
  updated: '2026-06-01',
  slides: false,
  text: 'checked',
  todo: [],
  ...overrides,
});

const folder = (
  slug: string,
  items: ToolkitItemRecord[],
  folders: ToolkitFolderRecord[] = [],
): ToolkitFolderRecord => ({
  slug,
  title: slug,
  description: `The ${slug} folder.`,
  folders,
  items,
});

const EXAMPLE = folder(
  '',
  [item('checklist')],
  [
    folder(
      'highlights',
      [],
      [folder('accessibility', [item('dark-mode'), item('draft', { text: 'draft' })])],
    ),
    folder('empty', [item('not-written', { text: 'none' })]),
  ],
);

/** Every resource record in the real toolkit, with the slugs leading to it */
const realItems = () => toolkitItemRecords();

function realFolders(record: ToolkitFolderRecord = TOOLKIT_RECORD): ToolkitFolderRecord[] {
  return record.folders.flatMap((child) => [child, ...realFolders(child)]);
}

describe('publicToolkit', () => {
  const toolkit = publicToolkit(EXAMPLE);

  it('only shows resources whose text is checked, without what I’m tracking', () => {
    expect(toolkit.items).toEqual([
      {
        slug: 'checklist',
        title: 'checklist',
        description: 'About checklist.',
        updated: '2026-06-01',
        files: files('checklist'),
      },
    ]);
    expect(toolkit.folders[0]?.folders[0]?.items.map((entry) => entry.slug)).toEqual(['dark-mode']);
  });

  it('names each resource’s files after the slugs leading to it, adding PowerPoint if it has slides', () => {
    expect(toolkitFilePaths(['highlights', 'dark-mode'], false)).toEqual([
      'inclusion-toolkit/files/highlights/dark-mode.pdf',
      'inclusion-toolkit/files/highlights/dark-mode.docx',
    ]);
    expect(toolkitFilePaths(['deck'], true)).toEqual([
      'inclusion-toolkit/files/deck.pdf',
      'inclusion-toolkit/files/deck.docx',
      'inclusion-toolkit/files/deck.pptx',
    ]);
  });

  it('leaves out folders with nothing to show', () => {
    expect(toolkit.folders.map((child) => child.slug)).toEqual(['highlights']);
  });
});

describe('finding things in the toolkit', () => {
  const toolkit = publicToolkit(EXAMPLE);

  it('makes addresses from the slugs leading to a folder or resource', () => {
    expect(toolkitPath([])).toBe('/inclusion-toolkit');
    expect(toolkitPath(['highlights', 'accessibility', 'dark-mode'])).toBe(
      '/inclusion-toolkit/highlights/accessibility/dark-mode',
    );
  });

  it('lists every folder and resource, each folder followed by what’s in it', () => {
    expect(
      toolkitEntries(toolkit).map((entry) => `${entry.kind} ${entry.slugs.join('/')}`),
    ).toEqual([
      'folder highlights',
      'folder highlights/accessibility',
      'item highlights/accessibility/dark-mode',
      'item checklist',
    ]);
  });

  it('finds a folder, with the folders above it as breadcrumbs', () => {
    const found = findInToolkit(['highlights', 'accessibility'], toolkit);

    expect(found?.kind).toBe('folder');
    expect(found?.trail).toEqual([
      { title: 'Inclusion Toolkit', path: '/inclusion-toolkit' },
      { title: 'highlights', path: '/inclusion-toolkit/highlights' },
    ]);
  });

  it('finds a resource, at the top level or in a folder', () => {
    expect(findInToolkit(['checklist'], toolkit)?.kind).toBe('item');
    expect(findInToolkit(['highlights', 'accessibility', 'dark-mode'], toolkit)).toMatchObject({
      kind: 'item',
      item: { slug: 'dark-mode' },
    });
  });

  it('finds nothing for an address that isn’t in the toolkit, or a resource that isn’t ready', () => {
    expect(findInToolkit(['missing'], toolkit)).toBeUndefined();
    expect(findInToolkit(['checklist', 'more'], toolkit)).toBeUndefined();
    expect(findInToolkit(['highlights', 'accessibility', 'draft'], toolkit)).toBeUndefined();
  });
});

describe('toolkit files', () => {
  it('says what kind of file each one is, from its extension', () => {
    expect(fileType({ path: 'a/b.pdf', size: '1KB' })).toBe('PDF');
    expect(fileType({ path: 'a/b.DOCX', size: '1KB' })).toBe('Word document');
    expect(fileType({ path: 'a/b.pptx', size: '1KB' })).toBe('PowerPoint');
  });

  it('views the PDF, if there is one', () => {
    const pdf = { path: 'a/b.pdf', size: '1KB' };
    const word = { path: 'a/b.docx', size: '1KB' };

    const resource = { slug: 'a', title: 'a', description: 'A.', updated: '2026-06-01' };

    expect(viewableFile({ ...resource, files: [word, pdf] })).toBe(pdf);
    expect(viewableFile({ ...resource, files: [word] })).toBeUndefined();
  });

  it('lists the files of resources that aren’t ready, for the build to remove', () => {
    expect(unpublishedToolkitFiles(EXAMPLE)).toEqual([
      'inclusion-toolkit/files/highlights/accessibility/draft.pdf',
      'inclusion-toolkit/files/highlights/accessibility/draft.docx',
      'inclusion-toolkit/files/empty/not-written.pdf',
      'inclusion-toolkit/files/empty/not-written.docx',
    ]);
  });
});

describe('toolkit.json', () => {
  it('uses addresses made of lowercase words and hyphens, used once in each folder', () => {
    for (const record of [TOOLKIT_RECORD, ...realFolders()]) {
      const slugs = [...record.folders, ...record.items].map((entry) => entry.slug);

      expect(new Set(slugs).size, record.title).toBe(slugs.length);
      for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    }
  });

  it('gives every folder and resource a title and description', () => {
    for (const entry of [...realFolders(), ...realItems().map(({ item: record }) => record)]) {
      expect(entry.title, entry.slug).not.toBe('');
      expect(entry.description, entry.slug).toMatch(/\.$/);
    }
  });

  it('has a real date for when each resource was last updated', () => {
    for (const { item: record } of realItems()) {
      expect(record.updated, record.slug).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(() => formatDate(record.updated), record.slug).not.toThrow();
    }
  });

  it('has every file each ready resource needs, so it can’t go live without them', () => {
    for (const { slugs, item: record } of realItems()) {
      if (record.text !== 'checked') continue;
      for (const path of toolkitFilePaths(slugs, record.slides)) {
        expect(existsSync(`public/${path}`), path).toBe(true);
      }
    }
  });

  it('has no files in public/inclusion-toolkit/ that don’t belong to a resource, as they’d go live', () => {
    const expected = new Set(
      realItems().flatMap(({ slugs, item: record }) => toolkitFilePaths(slugs, record.slides)),
    );
    const folder = 'public/inclusion-toolkit';
    const onDisk = existsSync(folder)
      ? readdirSync(folder, { recursive: true, withFileTypes: true })
          .filter((entry) => entry.isFile() && entry.name !== '.DS_Store')
          .map((entry) => `${entry.parentPath.replace(/^public\//, '')}/${entry.name}`)
      : [];

    expect(onDisk.filter((path) => !expected.has(path))).toEqual([]);
  });

  it('has a text file for every resource whose text is written, and no others', () => {
    const written = realItems()
      .filter(({ item: record }) => record.text !== 'none')
      .map(({ slugs }) => slugs.join('/'));

    expect(Object.keys(TOOLKIT_TEXT).toSorted()).toEqual(written.toSorted());
  });

  it('only marks text checked once nothing in it is left to check, starting headings at level 3', () => {
    for (const { slugs, item: record } of realItems()) {
      if (record.text !== 'checked') continue;
      const markdown = TOOLKIT_TEXT[slugs.join('/')] ?? '';

      expect(markdown, record.slug).not.toContain('[check:');
      for (const heading of markdown.match(/^#+ /gm) ?? []) {
        expect(heading.length, record.slug).toBeGreaterThanOrEqual(4);
      }
    }
  });
});
