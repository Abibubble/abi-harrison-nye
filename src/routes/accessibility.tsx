import { DisplaySettings } from '../components/DisplaySettings';
import { PageHeading } from '../components/PageHeading';
import { Stack } from '../components/Stack';
import { pageTitle } from '../content/site';
import type { Route } from './+types/accessibility';

export function meta(): Route.MetaDescriptors {
  return [
    { title: pageTitle('Accessibility') },
    {
      name: 'description',
      content: 'How this site is made accessible, and display settings to make it work for you.',
    },
  ];
}

// The accessibility statement itself comes later. The display settings are ready now.
export default function Accessibility() {
  return (
    <Stack gap={6}>
      <Stack gap={4}>
        <PageHeading>Accessibility</PageHeading>
        <p>The full accessibility statement for this site is coming soon.</p>
      </Stack>
      <DisplaySettings />
    </Stack>
  );
}
