import { ComingSoon } from '../components/ComingSoon';
import { pageTitle } from '../content/site';
import type { Route } from './+types/cv';

export function meta(): Route.MetaDescriptors {
  return [{ title: pageTitle('CV') }];
}

export default function Cv() {
  return <ComingSoon title="CV" />;
}
