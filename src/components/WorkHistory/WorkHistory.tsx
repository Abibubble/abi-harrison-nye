import type { Company, Role, SiteWorkedOn } from '../../content/work';
import { AbbrText } from '../Abbr';
import { Card } from '../Card';
import { type HeadingLevel, Heading, nextLevel } from '../Heading';
import { Link } from '../Link';
import { Stack } from '../Stack';
import { DateRange } from '../Time';
import styles from './WorkHistory.module.css';

interface RoleItemProps {
  role: Role;
  headingLevel: HeadingLevel;
  /** Prints only the role and dates in the compact CV layout */
  briefWhenCompact?: boolean | undefined;
}

export function RoleItem({ role, headingLevel, briefWhenCompact }: RoleItemProps) {
  const groupLevel = nextLevel(headingLevel);
  const detail = briefWhenCompact ? 'hide' : undefined;

  return (
    <Card as="article">
      <Stack gap={4}>
        <Stack gap={1}>
          <Heading level={headingLevel}>{role.title}</Heading>
          <p className={styles.meta}>
            <DateRange from={role.from} to={role.to} />
            {role.location && (
              <span data-print-compact={detail}>
                , <AbbrText>{role.location}</AbbrText>
              </span>
            )}
          </p>
        </Stack>
        {role.summary && (
          <p data-print-compact={detail}>
            <AbbrText>{role.summary}</AbbrText>
          </p>
        )}
        {role.highlightGroups.map((group) => (
          <Stack key={group.heading} gap={2} data-print-compact={detail}>
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

function addressOf(href: string): string {
  return new URL(href).hostname.replace(/^www\./, '');
}

export function SiteList({ sites }: { sites: readonly SiteWorkedOn[] }) {
  return (
    <ul className={styles.sites}>
      {sites.map((site) => (
        <li key={site.href}>
          <Link href={site.href} showsAddress={site.name === addressOf(site.href)}>
            {site.name}
          </Link>
          : <AbbrText>{site.description}</AbbrText>
        </li>
      ))}
    </ul>
  );
}

interface CompanySectionProps {
  company: Company;
  headingLevel: HeadingLevel;
  briefWhenCompact?: boolean | undefined;
}

function CompanySection({ company, headingLevel, briefWhenCompact }: CompanySectionProps) {
  const roleLevel = nextLevel(headingLevel);

  return (
    <Stack as="section" gap={4}>
      <Heading level={headingLevel}>{company.name}</Heading>
      {company.roles.map((role) => (
        <RoleItem
          key={`${role.title}-${role.from}`}
          role={role}
          headingLevel={roleLevel}
          briefWhenCompact={briefWhenCompact}
        />
      ))}
      {company.sitesWorkedOn && (
        // The compact CV leaves these out to fit on two pages. The full CV and Work page have them
        <Stack gap={2} data-print-compact="hide">
          <Heading level={roleLevel}>Sites I’ve worked on</Heading>
          <SiteList sites={company.sitesWorkedOn} />
        </Stack>
      )}
    </Stack>
  );
}

interface WorkHistoryProps {
  companies: readonly Company[];
  headingLevel: HeadingLevel;
  /** Prints only each company, role and dates in the compact CV layout */
  briefWhenCompact?: boolean | undefined;
}

export function WorkHistory({ companies, headingLevel, briefWhenCompact }: WorkHistoryProps) {
  return (
    <Stack gap={6}>
      {companies.map((company) => (
        <CompanySection
          key={company.name}
          company={company}
          headingLevel={headingLevel}
          briefWhenCompact={briefWhenCompact}
        />
      ))}
    </Stack>
  );
}
