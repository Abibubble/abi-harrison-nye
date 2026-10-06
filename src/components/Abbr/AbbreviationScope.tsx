import { type ReactNode, createContext, use, useState } from 'react';

import type { Abbreviation } from '../../content/abbreviations';

interface FirstUses {
  /**
   * Whether the abbreviation with this id is the first use of its name on the page. The first to
   * ask keeps the claim, so the answer stays the same however often each one re-renders.
   */
  isFirst: (name: Abbreviation, id: string) => boolean;
}

const FirstUsesContext = createContext<FirstUses | null>(null);

/**
 * Keeps track of which abbreviations a page has used, so each is written out in full the first time
 * only (WCAG 3.1.4). Wrap each page in one, keyed by its address, so every page starts afresh.
 * Prerendering and the browser render in the same order, so they always agree on the first use.
 */
export function AbbreviationScope({ children }: { children: ReactNode }) {
  const [firstUses] = useState<FirstUses>(() => {
    const owners = new Map<Abbreviation, string>();
    return {
      isFirst(name, id) {
        const owner = owners.get(name);
        if (owner === undefined) owners.set(name, id);
        return (owner ?? id) === id;
      },
    };
  });

  return <FirstUsesContext value={firstUses}>{children}</FirstUsesContext>;
}

/** The page's first uses, or nothing outside a scope, such as in Storybook or a component test. */
export function useFirstUses(): FirstUses | null {
  return use(FirstUsesContext);
}
