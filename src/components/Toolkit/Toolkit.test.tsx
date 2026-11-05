import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import type { ToolkitFolder, ToolkitItem } from '../../content/toolkit';
import type { ToolkitSearchEntry } from '../../content/toolkitPage';
import { expectNoAxeViolations } from '../../test/axe';
import { renderWithRouter } from '../../test/render';
import { ToolkitPage } from './ToolkitPage';
import { searchToolkit } from './ToolkitSearch';

const ITEM: ToolkitItem = {
  slug: 'dark-mode',
  title: 'Dark mode',
  description: 'A highlight about dark mode.',
  updated: '2026-06-01',
  files: [
    { path: 'inclusion-toolkit/files/highlights/dark-mode.pdf', size: '120KB' },
    { path: 'inclusion-toolkit/files/highlights/dark-mode.docx', size: '45KB' },
  ],
};

const HIGHLIGHTS: ToolkitFolder = {
  slug: 'highlights',
  title: 'Highlights',
  description: 'Posts that highlight topics.',
  folders: [],
  items: [ITEM],
};

const TOOLKIT: ToolkitFolder = {
  slug: '',
  title: 'Inclusion Toolkit',
  description: '',
  folders: [HIGHLIGHTS],
  items: [],
};

const SEARCH: ToolkitSearchEntry[] = [
  {
    kind: 'folder',
    title: 'Highlights',
    description: 'Posts that highlight topics.',
    path: '/inclusion-toolkit/highlights',
  },
  {
    kind: 'item',
    title: 'Dark mode',
    description: 'A highlight about dark mode.',
    path: '/inclusion-toolkit/highlights/dark-mode',
  },
  {
    kind: 'item',
    title: 'Head pointer',
    description: 'Using a device with your head.',
    path: '/inclusion-toolkit/highlights/head-pointer',
  },
];

const TRAIL = [
  { title: 'Inclusion Toolkit', path: '/inclusion-toolkit' },
  { title: 'Highlights', path: '/inclusion-toolkit/highlights' },
];

describe('searchToolkit', () => {
  it('finds entries with every word in their title or description, in any order', () => {
    expect(searchToolkit(SEARCH, 'MODE dark').map((entry) => entry.title)).toEqual(['Dark mode']);
    expect(searchToolkit(SEARCH, 'highlight').map((entry) => entry.title)).toEqual([
      'Highlights',
      'Dark mode',
    ]);
  });

  it('finds nothing until something is typed', () => {
    expect(searchToolkit(SEARCH, '   ')).toEqual([]);
  });
});

describe('ToolkitPage', () => {
  it('shows the main page with search, folders, and a link into each folder', () => {
    renderWithRouter(<ToolkitPage data={{ kind: 'home', toolkit: TOOLKIT, search: SEARCH }} />);

    expect(
      screen.getByRole('heading', { level: 1, name: 'Inclusion Toolkit' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('searchbox', { name: 'Search resources' })).toBeInTheDocument();
    const folders = within(screen.getByRole('region', { name: 'Folders' }));
    expect(folders.getByRole('heading', { level: 3, name: 'Highlights' })).toBeInTheDocument();
    expect(folders.getByRole('link', { name: 'Open the Highlights folder' })).toHaveAttribute(
      'href',
      '/inclusion-toolkit/highlights',
    );
  });

  it('says resources are coming when there are none yet', () => {
    renderWithRouter(
      <ToolkitPage data={{ kind: 'home', toolkit: { ...TOOLKIT, folders: [] }, search: [] }} />,
    );

    expect(screen.getByText('I’m adding the resources here soon.')).toBeInTheDocument();
  });

  it('shows results as you type, says how many there are, and can be cleared', async () => {
    const user = userEvent.setup();
    renderWithRouter(<ToolkitPage data={{ kind: 'home', toolkit: TOOLKIT, search: SEARCH }} />);
    const searchbox = screen.getByRole('searchbox', { name: 'Search resources' });

    await user.type(searchbox, 'head');
    const results = within(screen.getByRole('list', { name: 'Search results' }));
    expect(results.getByRole('link', { name: 'Head pointer' })).toHaveAttribute(
      'href',
      '/inclusion-toolkit/highlights/head-pointer',
    );
    expect(screen.getByRole('status')).toHaveTextContent('1 result found.');

    await user.type(searchbox, 'zzz');
    expect(screen.getByRole('status')).toHaveTextContent('No results found for “headzzz”.');
    expect(screen.queryByRole('list', { name: 'Search results' })).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Clear search' }));
    expect(searchbox).toHaveValue('');
    expect(searchbox).toHaveFocus();
    expect(screen.getByRole('status')).toHaveTextContent('');
  });

  it('marks folders in the results, so they can be told apart from resources', async () => {
    const user = userEvent.setup();
    renderWithRouter(<ToolkitPage data={{ kind: 'home', toolkit: TOOLKIT, search: SEARCH }} />);

    await user.type(screen.getByRole('searchbox'), 'highlights');

    expect(screen.getByRole('link', { name: 'Highlights (folder)' })).toBeInTheDocument();
  });

  it('shows a folder with breadcrumbs, and each resource’s links saying what they are', () => {
    renderWithRouter(
      <ToolkitPage
        data={{
          kind: 'folder',
          folder: HIGHLIGHTS,
          slugs: ['highlights'],
          trail: TRAIL.slice(0, 1),
        }}
      />,
    );

    const breadcrumbs = within(screen.getByRole('navigation', { name: 'Breadcrumbs' }));
    expect(breadcrumbs.getByRole('link', { name: 'Inclusion Toolkit' })).toHaveAttribute(
      'href',
      '/inclusion-toolkit',
    );
    expect(breadcrumbs.getByText('Highlights')).toHaveAttribute('aria-current', 'page');

    const files = within(screen.getByRole('region', { name: 'Files' }));
    expect(files.getByRole('link', { name: 'Dark mode' })).toHaveAttribute(
      'href',
      '/inclusion-toolkit/highlights/dark-mode',
    );
    expect(files.getByText(/Last updated/)).toHaveTextContent('Last updated 1 June 2026');
    const view = files.getByRole('link', { name: 'View in a new tab: Dark mode, PDF' });
    expect(view).toHaveAttribute('href', '/inclusion-toolkit/files/highlights/dark-mode.pdf');
    expect(view).toHaveAttribute('target', '_blank');
    expect(
      files.getByRole('link', { name: 'Download: Dark mode, Word document, 45KB' }),
    ).toHaveAttribute('download');
  });

  it('shows a resource with everything in it as text', () => {
    renderWithRouter(
      <ToolkitPage
        data={{
          kind: 'item',
          item: ITEM,
          slugs: ['highlights', 'dark-mode'],
          trail: TRAIL,
          textHtml: '<h3>Contrast</h3><p>Light text on a dark background.</p>',
        }}
      />,
    );

    expect(screen.getByRole('heading', { level: 1, name: 'Dark mode' })).toBeInTheDocument();
    expect(
      within(screen.getByRole('navigation', { name: 'Breadcrumbs' }))
        .getAllByRole('link')
        .map((link) => link.textContent),
    ).toEqual(['Inclusion Toolkit', 'Highlights']);
    expect(
      screen.getByRole('link', { name: 'Download: Dark mode, PDF, 120KB' }),
    ).toBeInTheDocument();
    const text = within(screen.getByRole('region', { name: 'What’s in it' }));
    expect(text.getByRole('heading', { level: 3, name: 'Contrast' })).toBeInTheDocument();
  });

  it('has no detectable accessibility issues on any kind of page', async () => {
    const pages = [
      renderWithRouter(<ToolkitPage data={{ kind: 'home', toolkit: TOOLKIT, search: SEARCH }} />),
      renderWithRouter(
        <ToolkitPage
          data={{ kind: 'folder', folder: HIGHLIGHTS, slugs: ['highlights'], trail: TRAIL }}
        />,
      ),
      renderWithRouter(
        <ToolkitPage
          data={{
            kind: 'item',
            item: ITEM,
            slugs: ['highlights', 'dark-mode'],
            trail: TRAIL,
            textHtml: '<p>Text.</p>',
          }}
        />,
      ),
    ];

    for (const { container } of pages) await expectNoAxeViolations(container);
  });
});
