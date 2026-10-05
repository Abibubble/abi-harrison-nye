import { Link } from '../Link';
import { PageHeading } from '../PageHeading';

/**
 * Shown for any address that isn't a page, whether it's typed in or reached from a link within the
 * site, such as a talk that doesn't exist.
 */
export function NotFoundPage() {
  return (
    <>
      <PageHeading>Page not found</PageHeading>
      <p>If you typed the web address, check it’s correct.</p>
      <p>If you pasted the web address, check you copied the whole address.</p>
      <p>
        You can <Link to="/">go to the home page</Link>, or use the links at the top of the page to
        find what you’re looking for.
      </p>
    </>
  );
}
