import type { ReactNode } from 'react';

import { Heading } from '../Heading';
import { Stack } from '../Stack';
import type { PageSection } from './PageContents';

interface PageContentsSectionProps {
  section: PageSection;
  children: ReactNode;
}

/**
 * A section listed in PageContents. Its heading can take focus, so following a link from the
 * contents moves focus here, and screen readers start reading from the right place.
 */
export function PageContentsSection({ section, children }: PageContentsSectionProps) {
  return (
    <Stack as="section" gap={4} aria-labelledby={section.id}>
      <Heading level={2} id={section.id} tabIndex={-1}>
        {section.title}
      </Heading>
      {children}
    </Stack>
  );
}
