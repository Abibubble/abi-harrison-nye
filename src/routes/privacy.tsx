import { ComingSoon } from '../components/ComingSoon';
import { pageTitle } from '../content/site';
import type { Route } from './+types/privacy';

export function meta(): Route.MetaDescriptors {
  return [{ title: pageTitle('Privacy') }];
}

export default function Privacy() {
  return <ComingSoon title="Privacy" />;
}
