import { useId } from 'react';

import { ABBREVIATIONS, ALWAYS_SHORT, type Abbreviation } from '../../content/abbreviations';
import { useFirstUses } from './AbbreviationScope';

interface AbbrProps {
  /** The abbreviation, which must be listed in content/abbreviations.ts. */
  name: Abbreviation;
  /**
   * Write the full form out in the text, followed by the abbreviation, as in "Web Content
   * Accessibility Guidelines (WCAG)". Left out, it's written out automatically for its first use on
   * the page, unless it's one most people know, like UK. Set false where it must stay short.
   */
  expand?: boolean;
  /** The full form is already written out just before it, so it counts as the first use as it is. */
  spelledOut?: boolean;
  /** More than one, as in "APIs". */
  plural?: boolean;
}

/**
 * An abbreviation. The title attribute only appears on hover, so it doesn't help keyboard, touch or
 * most screen reader users. The first use on each page is therefore written out in full in the text
 * itself (WCAG 3.1.4), apart from the few most people know, which are listed on the Accessibility page.
 */
export function Abbr({ name, expand, spelledOut = false, plural = false }: AbbrProps) {
  const id = useId();
  const firstUses = useFirstUses();
  // Abbreviations most people know stay short, unless written out on purpose.
  const auto = ALWAYS_SHORT.includes(name) ? false : undefined;
  const isFirst = (expand ?? auto) !== false && (firstUses?.isFirst(name, id) ?? false);
  const ending = plural ? 's' : '';
  const fullForm = ABBREVIATIONS[name];
  const abbr = (
    <abbr title={fullForm}>
      {name}
      {ending}
    </abbr>
  );

  if (!(expand ?? (isFirst && !spelledOut))) return abbr;

  return (
    <>
      {fullForm}
      {ending} ({abbr})
    </>
  );
}
