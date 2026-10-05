import { ComingSoon } from '../components/ComingSoon';
import { pageTitle } from '../content/site';
import type { Route } from './+types/projects';

export function meta(): Route.MetaDescriptors {
  return [{ title: pageTitle('Projects') }];
}

export default function Projects() {
  return <ComingSoon title="Projects" />;
}
