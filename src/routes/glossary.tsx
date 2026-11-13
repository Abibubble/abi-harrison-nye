import { useId, useRef, useState, useSyncExternalStore } from 'react';

import { Button } from '../components/Button';
import { PageContents, PageContentsSection, type PageSection } from '../components/PageContents';
import { PageHeading } from '../components/PageHeading';
import { Stack } from '../components/Stack';
import { ABBREVIATIONS, type Abbreviation } from '../content/abbreviations';
import { GLOSSARY } from '../content/glossary';
import { GLOSSARY_PATH } from '../content/navigation';
import { pageTitle } from '../content/site';
import { pageMeta } from '../seo/pageMeta';
import type { Route } from './+types/glossary';
import styles from './glossary.module.css';

export function meta(): Route.MetaDescriptors {
  return pageMeta({
    title: pageTitle('Glossary'),
    description:
      'Technical words used on this site, explained in plain words, and what each abbreviation stands for.',
    path: GLOSSARY_PATH,
  });
}

const SECTIONS = {
  words: { id: 'words', title: 'Technical words' },
  abbreviations: { id: 'abbreviations', title: 'Abbreviations' },
} satisfies Record<string, PageSection>;

const ABBREVIATION_NAMES = Object.keys(ABBREVIATIONS) as Abbreviation[];

/** Screens narrower than this show each list as lines that open one at a time, not a table */
export const SMALL_SCREEN = '(width < 48rem)';

function watchScreen(onChange: () => void): () => void {
  const query = window.matchMedia(SMALL_SCREEN);
  query.addEventListener('change', onChange);
  return () => {
    query.removeEventListener('change', onChange);
  };
}

/**
 * Whether the screen is small. The prerendered page, and browsers without matchMedia, get the
 * table, which works at every size
 */
function useSmallScreen(): boolean {
  return useSyncExternalStore(
    (onChange) =>
      typeof window.matchMedia === 'function' ? watchScreen(onChange) : () => undefined,
    () => typeof window.matchMedia === 'function' && window.matchMedia(SMALL_SCREEN).matches,
    () => false,
  );
}

/** Lower case, with curly apostrophes straightened, so "doesn't" finds "doesn’t" */
function normalise(text: string): string {
  return text.toLowerCase().replace(/[‘’]/g, "'").trim();
}

/** A search needs at least this many characters, as one letter matches nearly everything */
const MIN_SEARCH_LENGTH = 2;

function isSearch(query: string): boolean {
  return normalise(query).length >= MIN_SEARCH_LENGTH;
}

function matches(query: string, ...texts: string[]): boolean {
  return !isSearch(query) || texts.some((text) => normalise(text).includes(normalise(query)));
}

function count(number: number, one: string, many: string): string {
  return `${String(number)} ${number === 1 ? one : many}`;
}

function resultsMessage(query: string, words: number, abbreviations: number): string {
  if (query.trim() === '') return '';
  if (!isSearch(query)) return `Type at least ${String(MIN_SEARCH_LENGTH)} characters to search.`;
  if (words + abbreviations === 0) return `No words or abbreviations match “${query.trim()}”.`;
  return `${count(words, 'word', 'words')} and ${count(abbreviations, 'abbreviation', 'abbreviations')} match “${query.trim()}”.`;
}

interface GlossaryListProps {
  /** The column headings, such as Word and What it means */
  columns: [string, string];
  entries: readonly { term: string; meaning: string }[];
  smallScreen: boolean;
}

/**
 * On wider screens, a table with the word on the left and what it means on the right. On small
 * screens, each word is a line that opens to show what it means, so the list stays short
 */
function GlossaryList({ columns, entries, smallScreen }: GlossaryListProps) {
  if (smallScreen) {
    return (
      <ul className={styles.terms}>
        {entries.map(({ term, meaning }) => (
          <li key={term}>
            <details className={styles.term}>
              <summary>{term}</summary>
              <p>{meaning}</p>
            </details>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th scope="col">{columns[0]}</th>
          <th scope="col">{columns[1]}</th>
        </tr>
      </thead>
      <tbody>
        {entries.map(({ term, meaning }) => (
          <tr key={term}>
            <th scope="row">{term}</th>
            <td>{meaning}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/** Technical words (WCAG 3.1.3) and abbreviations (WCAG 3.1.4) used on the site, explained */
export default function Glossary() {
  const smallScreen = useSmallScreen();
  const searchId = useId();
  const input = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');

  const words = GLOSSARY.filter(({ term, definition }) => matches(query, term, definition));
  const abbreviations = ABBREVIATION_NAMES.filter((name) =>
    matches(query, name, ABBREVIATIONS[name]),
  );

  return (
    <Stack gap={6}>
      <Stack gap={4}>
        <PageHeading>Glossary</PageHeading>
        <p>
          These are the technical words and abbreviations used on this site, explained in plain
          words.
        </p>

        {/* Search needs JavaScript, so without it the search box is hidden and everything shows */}
        <div role="search" className={styles.search}>
          <label htmlFor={searchId} className={styles.label}>
            Search the glossary
          </label>
          <div className={styles.searchRow}>
            <input
              ref={input}
              id={searchId}
              type="search"
              className={styles.input}
              value={query}
              autoComplete="off"
              onChange={(event) => {
                setQuery(event.target.value);
              }}
            />
            {query !== '' && (
              <Button
                variant="secondary"
                onClick={() => {
                  setQuery('');
                  input.current?.focus();
                }}
              >
                Clear search
              </Button>
            )}
          </div>
          <p role="status" className={styles.status}>
            {resultsMessage(query, words.length, abbreviations.length)}
          </p>
        </div>

        <PageContents sections={Object.values(SECTIONS)} />
      </Stack>

      <PageContentsSection section={SECTIONS.words}>
        {words.length === 0 ? (
          <p>No words match your search.</p>
        ) : (
          <GlossaryList
            columns={['Word', 'What it means']}
            entries={words.map(({ term, definition }) => ({ term, meaning: definition }))}
            smallScreen={smallScreen}
          />
        )}
      </PageContentsSection>

      <PageContentsSection section={SECTIONS.abbreviations}>
        <p>These are the abbreviations used on this site, and what they stand for.</p>
        {abbreviations.length === 0 ? (
          <p>No abbreviations match your search.</p>
        ) : (
          <GlossaryList
            columns={['Abbreviation', 'What it stands for']}
            entries={abbreviations.map((name) => ({ term: name, meaning: ABBREVIATIONS[name] }))}
            smallScreen={smallScreen}
          />
        )}
      </PageContentsSection>
    </Stack>
  );
}
