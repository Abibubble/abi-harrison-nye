import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { ABBREVIATIONS } from '../content/abbreviations';
import { GLOSSARY } from '../content/glossary';
import { pageMeta } from '../seo/pageMeta';
import { expectNoAxeViolations } from '../test/axe';
import { renderWithRouter, sectionNamed } from '../test/render';
import Glossary, { SMALL_SCREEN, meta } from './glossary';

const region = (name: string) => within(sectionNamed(name));

/** The first column of a section's table: each word or abbreviation */
const rowNames = (section: ReturnType<typeof region>) =>
  section.getAllByRole('rowheader').map((cell) => cell.textContent);

/** The second column: what each one means */
const meanings = (section: ReturnType<typeof region>) =>
  section.getAllByRole('cell').map((cell) => cell.textContent);

/** Makes the screen small, as matchMedia sees it */
function smallScreen() {
  vi.stubGlobal('matchMedia', (query: string) => ({
    matches: query === SMALL_SCREEN,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
  }));
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('Glossary page', () => {
  it('has the page heading, and lists its sections at the top', () => {
    renderWithRouter(<Glossary />);

    expect(screen.getByRole('heading', { level: 1, name: 'Glossary' })).toBeInTheDocument();
    expect(
      within(screen.getByRole('navigation', { name: 'On this page' }))
        .getAllByRole('link')
        .map((link) => link.getAttribute('href')),
    ).toEqual(['#words', '#abbreviations']);
  });

  it('explains every technical word (WCAG 3.1.3)', () => {
    renderWithRouter(<Glossary />);
    const words = region('Technical words');

    expect(rowNames(words)).toEqual(GLOSSARY.map((entry) => entry.term));
    expect(meanings(words)).toEqual(GLOSSARY.map((entry) => entry.definition));
    expect(words.getAllByRole('columnheader').map((cell) => cell.textContent)).toEqual([
      'Word',
      'What it means',
    ]);
  });

  it('lists every abbreviation used on the site, with what it stands for (WCAG 3.1.4)', () => {
    renderWithRouter(<Glossary />);
    const abbreviations = region('Abbreviations');

    expect(rowNames(abbreviations)).toEqual(Object.keys(ABBREVIATIONS));
    expect(meanings(abbreviations)).toEqual(Object.values(ABBREVIATIONS));
  });

  it('shows each word as a line that opens, rather than a table, on small screens', () => {
    smallScreen();
    renderWithRouter(<Glossary />);
    const words = region('Technical words');

    expect(words.queryByRole('table')).not.toBeInTheDocument();
    const first = GLOSSARY[0];
    const summary = words.getByText(first?.term ?? '', { selector: 'summary' });
    expect(summary.closest('details')).not.toHaveAttribute('open');
    expect(summary.closest('details')).toHaveTextContent(first?.definition ?? '');
  });

  it('has no detectable accessibility issues on small screens', async () => {
    smallScreen();
    const { container } = renderWithRouter(<Glossary />);

    await expectNoAxeViolations(container);
  });

  it('searches the words and abbreviations, and says how many match', async () => {
    const user = userEvent.setup();
    renderWithRouter(<Glossary />);

    await user.type(screen.getByRole('searchbox', { name: 'Search the glossary' }), 'screen');

    expect(rowNames(region('Technical words'))).toEqual(
      GLOSSARY.filter(({ term, definition }) =>
        `${term} ${definition}`.toLowerCase().includes('screen'),
      ).map(({ term }) => term),
    );
    expect(screen.getByRole('status').textContent).toMatch(
      /^\d+ words? and \d+ abbreviations? match “screen”\.$/,
    );
  });

  it('waits for at least 2 characters before searching', async () => {
    const user = userEvent.setup();
    renderWithRouter(<Glossary />);

    await user.type(screen.getByRole('searchbox', { name: 'Search the glossary' }), 'z');

    expect(screen.getByRole('status')).toHaveTextContent('Type at least 2 characters to search.');
    expect(rowNames(region('Technical words'))).toHaveLength(GLOSSARY.length);
  });

  it('says when nothing matches, and can be cleared', async () => {
    const user = userEvent.setup();
    renderWithRouter(<Glossary />);
    const search = screen.getByRole('searchbox', { name: 'Search the glossary' });

    await user.type(search, 'zzzz');

    expect(screen.getByRole('status')).toHaveTextContent('No words or abbreviations match “zzzz”.');
    expect(screen.getByText('No words match your search.')).toBeInTheDocument();
    expect(screen.getByText('No abbreviations match your search.')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Clear search' }));

    expect(search).toHaveValue('');
    expect(search).toHaveFocus();
    expect(rowNames(region('Technical words'))).toHaveLength(GLOSSARY.length);
  });

  it('has its own page title and description, at its own address', () => {
    expect(meta()).toEqual(
      pageMeta({
        title: 'Glossary, Abi Harrison-Nye',
        description:
          'Technical words used on this site, explained in plain words, and what each abbreviation stands for.',
        path: '/glossary',
      }),
    );
  });

  it('has no detectable accessibility issues', async () => {
    const { container } = renderWithRouter(<Glossary />);

    await expectNoAxeViolations(container);
  });
});
