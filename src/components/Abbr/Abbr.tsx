import { useId } from 'react';

import { ABBREVIATIONS, ALWAYS_SHORT, type Abbreviation } from '../../content/abbreviations';
import { useFirstUses } from './AbbreviationScope';

interface AbbrProps {
  name: Abbreviation;
  expand?: boolean;
  spelledOut?: boolean;
  plural?: boolean;
}

/**
 * An abbreviation, written out in full the first time it's used on a page (WCAG 3.1.4), and plain
 * after that. It's never a button or a tooltip, so screen readers hear the full form once, and
 * keyboard users don't have extra stops. Every abbreviation is also listed on the Glossary page,
 * including the few most people know, such as UK, which are never written out
 */
export function Abbr({ name, expand, spelledOut = false, plural = false }: AbbrProps) {
  const id = useId();
  const firstUses = useFirstUses();
  const auto = ALWAYS_SHORT.includes(name) ? false : undefined;
  const isFirst = (expand ?? auto) !== false && (firstUses?.isFirst(name, id) ?? false);
  const ending = plural ? 's' : '';
  const abbr = (
    <abbr>
      {name}
      {ending}
    </abbr>
  );

  if (!(expand ?? (isFirst && !spelledOut))) return abbr;

  return (
    <>
      {ABBREVIATIONS[name]}
      {ending} ({abbr})
    </>
  );
}
