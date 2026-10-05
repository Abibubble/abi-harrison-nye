import { formatDate } from './formatDate';

interface TimeProps {
  /** A date in the form YYYY, YYYY-MM or YYYY-MM-DD. */
  date: string;
}

/** A date written in words, with the machine readable form for browsers and search engines. */
export function Time({ date }: TimeProps) {
  return <time dateTime={date}>{formatDate(date)}</time>;
}

interface DateRangeProps {
  from: string;
  /** Leave out for something that's still going on. */
  to?: string | undefined;
}

/** A range such as "August 2021 to present". Written with "to", which reads more clearly than a dash. */
export function DateRange({ from, to }: DateRangeProps) {
  return (
    <span>
      <Time date={from} /> to {to === undefined ? 'present' : <Time date={to} />}
    </span>
  );
}
