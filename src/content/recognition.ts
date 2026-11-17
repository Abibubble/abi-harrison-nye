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
  /** How the winner was chosen, when the awards' name doesn't make it clear */
  chosenBy?: string;
}

/** giffgaff's own awards, where every employee could nominate and vote */
const VOTED_BY_GIFFGAFF = 'nominated and voted for by everyone at giffgaff';

/** Newest first */
export const RECOGNITION: Recognition[] = [
  {
    award: 'Diversity and Belonging Team of the Year',
    result: 'Winner',
    recipient: 'giffgaff’s Affinity Groups, including HAND',
    awards: 'Great British Workplace Wellbeing Awards',
    year: 2026,
  },
  {
    award: 'Network Inspirational Role Model',
    result: 'Highly Commended',
    awards: 'Employee Network Awards',
    year: 2026,
  },
  {
    award: 'Outstanding Ability Network',
    result: 'Highly Commended',
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
  {
    award: 'Most Up To Good giffgaffer',
    result: 'Winner',
    awards: 'giffgaff’s Grit & Glory Awards',
    year: 2025,
    chosenBy: VOTED_BY_GIFFGAFF,
  },
  {
    award: 'Most Positive Team',
    result: 'Winner',
    recipient: 'the Future Capabilities Team',
    awards: 'giffgaff’s Grit & Glory Awards',
    year: 2025,
    chosenBy: VOTED_BY_GIFFGAFF,
  },
];
