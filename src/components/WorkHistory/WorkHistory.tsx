import { useId } from 'react';
import { AbbrText } from '../Abbr';

import type { Company, Role } from '../../content/work';
import { Card } from '../Card';
import { type HeadingLevel, Heading, nextLevel } from '../Heading';
import { Link } from '../Link';
import { Stack } from '../Stack';
import { DateRange } from '../Time';
import styles from './WorkHistory.module.css';

interface RoleItemProps {
  role: Role;
  headingLevel: HeadingLevel;
}

/** One role: its title, dates, location, context and highlights. */
export function RoleItem({ role, headingLevel }: RoleItemProps) {
  const groupLevel = nextLevel(headingLevel);

  return (
    <Card as="article">
      <Stack gap={4}>
        <Stack gap={1}>
          <Heading level={headingLevel}>{role.title}</Heading>
          <p className={styles.meta}>
            <DateRange from={role.from} to={role.to} />
            {role.location && (
              <>
                , <AbbrText>{role.location}</AbbrText>
              </>
            )}
          </p>
        </Stack>
        {role.summary && (
          <p>
            <AbbrText>{role.summary}</AbbrText>
          </p>
        )}
        {role.highlightGroups.map((group) => (
          <Stack key={group.heading} gap={2}>
            <Heading level={groupLevel}>{group.heading}</Heading>
            <ul className={styles.highlights}>
              {group.highlights.map((highlight) => (
                <li key={highlight}>
                  <AbbrText>{highlight}</AbbrText>
                </li>
              ))}
            </ul>
          </Stack>
        ))}
      </Stack>
    </Card>
  );
}

interface CompanySectionProps {
  company: Company;
  headingLevel: HeadingLevel;
}

function CompanySection({ company, headingLevel }: CompanySectionProps) {
  const headingId = useId();
  const roleLevel = nextLevel(headingLevel);

  return (
    <Stack as="section" gap={4} aria-labelledby={headingId}>
      <Heading level={headingLevel} id={headingId}>
        {company.name}
      </Heading>
      {company.roles.map((role) => (
        <RoleItem key={`${role.title}-${role.from}`} role={role} headingLevel={roleLevel} />
      ))}
      {company.sitesWorkedOn && (
        <Stack gap={2}>
          <Heading level={roleLevel}>Sites I’ve worked on</Heading>
          <ul className={styles.sites}>
            {company.sitesWorkedOn.map((site) => (
              <li key={site.href}>
                <Link href={site.href}>{site.name}</Link>: <AbbrText>{site.description}</AbbrText>
              </li>
            ))}
          </ul>
        </Stack>
      )}
    </Stack>
  );
}

interface WorkHistoryProps {
  companies: readonly Company[];
  /** The level of each company's heading. Roles and highlights sit under it. */
  headingLevel: HeadingLevel;
}

/** Companies I've worked for, each with its roles and the sites I worked on there. */
export function WorkHistory({ companies, headingLevel }: WorkHistoryProps) {
  return (
    <Stack gap={6}>
      {companies.map((company) => (
        <CompanySection key={company.name} company={company} headingLevel={headingLevel} />
      ))}
    </Stack>
  );
}
