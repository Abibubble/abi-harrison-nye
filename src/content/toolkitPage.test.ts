import { describe, expect, it } from 'vitest';

import type { ToolkitFolder } from './toolkit';
import { loadToolkitPage } from './toolkitPage';

const TOOLKIT: ToolkitFolder = {
  slug: '',
  title: 'Inclusion Toolkit',
  description: '',
  folders: [
    {
      slug: 'highlights',
      title: 'Highlights',
      description: 'Highlights.',
      folders: [],
      items: [
        {
          slug: 'dark-mode',
          title: 'Dark mode',
          description: 'About dark mode.',
          updated: '2026-06-01',
          files: [{ path: 'inclusion-toolkit/files/highlights/dark-mode.pdf', size: '100KB' }],
        },
      ],
    },
  ],
  items: [],
};

const TEXTS = { 'highlights/dark-mode': '### Dark mode\n\nLight text on a dark background.' };

function thrownStatus(load: () => unknown): number | undefined {
  try {
    load();
  } catch (error) {
    return (error as { init?: { status?: number } }).init?.status;
  }
  return undefined;
}

describe('loadToolkitPage', () => {
  it('gives the main page, with every folder and resource to search', () => {
    expect(loadToolkitPage([], TOOLKIT, TEXTS)).toEqual({
      kind: 'home',
      toolkit: TOOLKIT,
      search: [
        {
          kind: 'folder',
          title: 'Highlights',
          description: 'Highlights.',
          path: '/inclusion-toolkit/highlights',
        },
        {
          kind: 'item',
          title: 'Dark mode',
          description: 'About dark mode.',
          path: '/inclusion-toolkit/highlights/dark-mode',
        },
      ],
    });
  });

  it('gives a folder, with breadcrumbs', () => {
    const page = loadToolkitPage(['highlights'], TOOLKIT, TEXTS);

    expect(page.kind).toBe('folder');
    expect(page.kind === 'folder' && page.trail).toEqual([
      { title: 'Inclusion Toolkit', path: '/inclusion-toolkit' },
    ]);
  });

  it('gives a resource, with its text as HTML', () => {
    const page = loadToolkitPage(['highlights', 'dark-mode'], TOOLKIT, TEXTS);

    expect(page.kind === 'item' && page.textHtml).toBe(
      '<h3>Dark mode</h3>\n<p>Light text on a dark background.</p>\n',
    );
  });

  it('gives a 404 for an address that isn’t in the toolkit, or a resource without its text', () => {
    expect(thrownStatus(() => loadToolkitPage(['missing'], TOOLKIT, TEXTS))).toBe(404);
    expect(thrownStatus(() => loadToolkitPage(['highlights', 'dark-mode'], TOOLKIT, {}))).toBe(404);
  });

  it('uses the real toolkit by default', () => {
    expect(loadToolkitPage([]).kind).toBe('home');
    expect(thrownStatus(() => loadToolkitPage(['not-a-real-folder']))).toBe(404);
  });
});
