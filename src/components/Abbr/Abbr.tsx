import { ABBREVIATIONS, type Abbreviation } from '../../content/abbreviations';

interface AbbrProps {
  /** The abbreviation, which must be listed in content/abbreviations.ts. */
  name: Abbreviation;
  /**
   * Write the full form out in the text, followed by the abbreviation, as in "Web Content
   * Accessibility Guidelines (WCAG)". Use this the first time an abbreviation appears on a page.
   */
  expand?: boolean;
}

/**
 * An abbreviation. The title attribute only appears on hover, so it doesn't help keyboard, touch or
 * most screen reader users. The first use on each page should therefore set `expand`, which puts the
 * full form in the text itself (WCAG 3.1.4).
 */
export function Abbr({ name, expand = false }: AbbrProps) {
  const fullForm = ABBREVIATIONS[name];
  const abbr = <abbr title={fullForm}>{name}</abbr>;

  if (!expand) return abbr;

  return (
    <>
      {fullForm} ({abbr})
    </>
  );
}
