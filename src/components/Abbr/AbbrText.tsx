import { Fragment, type ReactNode } from 'react';

import { ABBREVIATIONS, type Abbreviation } from '../../content/abbreviations';
import { Abbr } from './Abbr';

const NAMES = (Object.keys(ABBREVIATIONS) as Abbreviation[]).sort((a, b) => b.length - a.length);

// Each abbreviation as a whole word, with an optional plural "s", as in "APIs".
const PATTERN = new RegExp(
  `(?<![A-Za-z])(${NAMES.map((name) => name.replace('/', '\\/')).join('|')})(s?)(?![A-Za-z])`,
  'g',
);

/** Whether the text before an abbreviation ends with its full form and an opening bracket. */
function spelledOutBefore(before: string, name: Abbreviation, plural: boolean): boolean {
  const fullForm = `${ABBREVIATIONS[name]}${plural ? 's' : ''} (`.toLowerCase();
  return before.toLowerCase().endsWith(fullForm);
}

/**
 * A piece of written content, with every abbreviation in it marked up, and written out in full the
 * first time it's used on the page. Content that already spells one out, as in "test driven
 * development (TDD)", is left as it is.
 */
export function AbbrText({ children }: { children: string }) {
  const parts: ReactNode[] = [];
  let last = 0;

  for (const match of children.matchAll(PATTERN)) {
    const name = match[1] as Abbreviation;
    const plural = match[2] === 's';
    parts.push(children.slice(last, match.index));
    parts.push(
      <Abbr
        name={name}
        plural={plural}
        spelledOut={spelledOutBefore(children.slice(0, match.index), name, plural)}
      />,
    );
    last = match.index + match[0].length;
  }
  parts.push(children.slice(last));

  return (
    <>
      {parts.map((part, index) => (
        // The parts never move, so their position is a stable key.
        <Fragment key={index}>{part}</Fragment>
      ))}
    </>
  );
}
