import { Link } from '../components/Link';
import { PageHeading } from '../components/PageHeading';
import { pageTitle } from '../content/site';
import type { Route } from './+types/not-found';

export function meta(): Route.MetaDescriptors {
  return [{ title: pageTitle('Page not found') }, { name: 'robots', content: 'noindex' }];
}

export default function NotFound() {
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
