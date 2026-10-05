import { PageHeading } from '../PageHeading';

interface ComingSoonProps {
  title: string;
}

/** A temporary page for sections that haven't been built yet. */
export function ComingSoon({ title }: ComingSoonProps) {
  return (
    <>
      <PageHeading>{title}</PageHeading>
      <p>This page is coming soon.</p>
    </>
  );
}
