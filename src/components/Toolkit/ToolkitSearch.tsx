import { useId, useRef, useState } from 'react';

import type { ToolkitSearchEntry } from '../../content/toolkitPage';
import { Button } from '../Button';
import { Link } from '../Link';
import styles from './Toolkit.module.css';

/** The folders and resources whose title or description has every word searched for, in any order */
export function searchToolkit(
  entries: readonly ToolkitSearchEntry[],
  query: string,
): ToolkitSearchEntry[] {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (words.length === 0) return [];

  return entries.filter((entry) => {
    const text = `${entry.title} ${entry.description}`.toLowerCase();
    return words.every((word) => text.includes(word));
  });
}

function resultsMessage(query: string, count: number): string {
  if (query.trim() === '') return '';
  if (count === 0) return `No results found for “${query.trim()}”.`;
  return count === 1 ? '1 result found.' : `${String(count)} results found.`;
}

/**
 * Finds folders and resources as you type. The results are ordinary links in a list, so they work
 * with Tab, screen readers and voice control, and the number found is announced. Without
 * JavaScript, it's hidden, and the folders below lead to everything instead
 */
export function ToolkitSearch({ entries }: { entries: readonly ToolkitSearchEntry[] }) {
  const id = useId();
  const input = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const results = searchToolkit(entries, query);

  return (
    <div role="search" className={styles.search}>
      <label htmlFor={id} className={styles.label}>
        Search resources
      </label>
      <div className={styles.searchRow}>
        <input
          ref={input}
          id={id}
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
        {resultsMessage(query, results.length)}
      </p>
      {results.length > 0 && (
        <ul className={styles.results} aria-label="Search results">
          {results.map((result) => (
            <li key={result.path}>
              <Link to={result.path}>
                {result.title}
                {result.kind === 'folder' && ' (folder)'}
              </Link>
              <p>{result.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
