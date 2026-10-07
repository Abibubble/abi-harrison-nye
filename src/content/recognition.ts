export interface Recognition {
  /** The award or category */
  award: string;
  /** The outcome, such as "Finalist" or "Highly Commended" */
  result: string;
  /** Who it recognised, when it wasn't me personally */
  recipient?: string;
  /** The awards it was part of */
  awards: string;
  year: number;
}

/** Newest first */
export const RECOGNITION: Recognition[] = [
  {
    award: 'Network Inspirational Role Model',
    result: 'Highly Commended',
    awards: 'Employee Network Awards',
    year: 2026,
  },
  {
    award: 'Outstanding Ability Network',
    result: 'Highly Commended, second in the UK',
    recipient: 'HAND',
    awards: 'Employee Network Awards',
    year: 2026,
  },
  {
    award: 'Outstanding Diversity Network Award',
    result: 'Finalist',
    recipient: 'HAND',
    awards: 'Inclusive Awards',
    year: 2026,
  },
];
