import { ComingSoon } from '../components/ComingSoon';
import { pageTitle } from '../content/site';
import type { Route } from './+types/articles';

export function meta(): Route.MetaDescriptors {
  return [{ title: pageTitle('Articles') }];
}

export default function Articles() {
  return <ComingSoon title="Articles" />;
}
