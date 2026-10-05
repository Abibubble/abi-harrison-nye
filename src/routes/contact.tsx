import { ComingSoon } from '../components/ComingSoon';
import { pageTitle } from '../content/site';
import type { Route } from './+types/contact';

export function meta(): Route.MetaDescriptors {
  return [{ title: pageTitle('Contact') }];
}

export default function Contact() {
  return <ComingSoon title="Contact" />;
}
