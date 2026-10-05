import { ComingSoon } from '../components/ComingSoon';
import { pageTitle } from '../content/site';
import type { Route } from './+types/work';

export function meta(): Route.MetaDescriptors {
  return [{ title: pageTitle('Work') }];
}

export default function Work() {
  return <ComingSoon title="Work" />;
}
