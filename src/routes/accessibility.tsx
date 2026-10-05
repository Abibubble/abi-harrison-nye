import { ComingSoon } from '../components/ComingSoon';
import { pageTitle } from '../content/site';
import type { Route } from './+types/accessibility';

export function meta(): Route.MetaDescriptors {
  return [{ title: pageTitle('Accessibility') }];
}

export default function Accessibility() {
  return <ComingSoon title="Accessibility" />;
}
