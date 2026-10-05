import { PageHeading } from '../components/PageHeading';
import { SITE_NAME } from '../content/site';
import type { Route } from './+types/home';

export function meta(): Route.MetaDescriptors {
  return [
    { title: `${SITE_NAME}, Software Engineer` },
    {
      name: 'description',
      content: 'Software engineer and accessibility specialist.',
    },
  ];
}

// Placeholder until the content pages are built.
export default function Home() {
  return (
    <>
      <PageHeading>{SITE_NAME}</PageHeading>
      <p>Software engineer and accessibility specialist. This site is being built.</p>
    </>
  );
}
