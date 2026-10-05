import { ComingSoon } from '../components/ComingSoon';
import { pageTitle } from '../content/site';
import type { Route } from './+types/talks';

export function meta(): Route.MetaDescriptors {
  return [{ title: pageTitle('Talks') }];
}

export default function Talks() {
  return <ComingSoon title="Talks" />;
}
