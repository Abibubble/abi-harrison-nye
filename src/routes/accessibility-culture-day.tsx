import { Abbr } from '../components/Abbr';
import { Heading } from '../components/Heading';
import { Link } from '../components/Link';
import { PageContents, PageContentsSection, type PageSection } from '../components/PageContents';
import { PageHeading } from '../components/PageHeading';
import { Stack } from '../components/Stack';
import { Time } from '../components/Time';
import { CULTURE_DAY_PATH } from '../content/navigation';
import { BAD_A11Y } from '../content/projects';
import { pageTitle } from '../content/site';
import { pageMeta } from '../seo/pageMeta';
import type { Route } from './+types/accessibility-culture-day';
import styles from './accessibility-culture-day.module.css';

export function meta(): Route.MetaDescriptors {
  return pageMeta({
    title: pageTitle('Accessibility Culture Day'),
    description:
      'A day of accessibility workshops I organised for the whole of giffgaff, in the office and online, and what changed because of it.',
    path: CULTURE_DAY_PATH,
  });
}

const SECTIONS = {
  whatIDid: { id: 'what-i-did', title: 'What I did' },
  welcome: { id: 'welcome-talk', title: 'The welcome talk' },
  workshops: { id: 'workshops', title: 'The workshops' },
  includingEveryone: { id: 'including-everyone', title: 'Including everyone' },
  whatChanged: { id: 'what-changed', title: 'What changed afterwards' },
} satisfies Record<string, PageSection>;

/** The welcome talk, which has its own page with the video and transcript */
export const WELCOME_TALK_PATH = '/talks/accessibility-culture-day-welcome';

/** The template the day's meeting invites followed, in the Inclusion Toolkit */
export const MEETING_INVITE_TEMPLATE = 'https://inclusiontoolkit.org/meeting-invite-template';

/**
 * A day I organised at giffgaff. The documents behind it name colleagues and link to internal
 * pages, so this page describes the day instead of sharing them
 */
export default function AccessibilityCultureDay() {
  return (
    <Stack gap={6}>
      <Stack gap={4}>
        <Stack gap={2}>
          <PageHeading>Accessibility Culture Day</PageHeading>
          <p className={styles.meta}>
            giffgaff, <Time date="2025-05-22" />
          </p>
        </Stack>
        <p>
          A day I organised for everyone at giffgaff, where people learned about accessibility by
          trying it for themselves.
        </p>
        <ul className={styles.list}>
          <li>The whole company took part, apart from people who were off sick or on holiday.</li>
          <li>
            About 200 people took an active part, and about 50 more joined when their meetings
            allowed.
          </li>
          <li>People took part in the office and from home.</li>
        </ul>
        <PageContents sections={Object.values(SECTIONS)} />
      </Stack>

      <PageContentsSection section={SECTIONS.whatIDid}>
        <p>I planned the whole day. I:</p>
        <ul className={styles.list}>
          <li>chose and designed the 3 workshops</li>
          <li>gave the welcome talk</li>
          <li>
            wrote a guide for each workshop’s hosts, with what to say and do, and how long each part
            should take
          </li>
          <li>wrote the meeting invites, so everyone knew what would happen before they came</li>
          <li>
            built <Link href={BAD_A11Y.href}>bad-a11y</Link>, the web page for the “Spot the
            accessibility issues” workshop, which is inaccessible on purpose
          </li>
          <li>moved between the workshops on the day, helping and answering questions</li>
        </ul>
        <p>9 colleagues volunteered to host the workshops.</p>
      </PageContentsSection>

      <PageContentsSection section={SECTIONS.welcome}>
        <p>
          The day started with a talk for everyone. It covered the types of disability, who benefits
          from accessibility, the Purple Pound, and the Equality Act 2010. It also explained the
          plan for the day.
        </p>
        <p className={styles.standalone}>
          <Link to={WELCOME_TALK_PATH}>Watch the welcome talk</Link>
        </p>
      </PageContentsSection>

      <PageContentsSection section={SECTIONS.workshops}>
        <p>
          In the afternoon, there were 3 hands-on workshops, each 45 minutes long. Each one ran 3
          times, and everyone was put into a group, so everyone could go to all 3. Everyone brought
          a laptop and headphones.
        </p>

        <Stack as="section" gap={3}>
          <Heading level={3}>People and personas</Heading>
          <p>
            People did everyday tasks in a different way, to get a sense of some of the barriers
            disabled people face. In the office, there were stations with:
          </p>
          <ul className={styles.list}>
            <li>
              glasses that show what it’s like to have different visual impairments, for writing in
              a Word document and reading the giffgaff Community
            </li>
            <li>wheelchairs and crutches, for getting snacks from the kitchen</li>
            <li>a soft toy to hold like a pet, for sending a message with only one hand free</li>
            <li>
              personas, which are descriptions of people with different access needs, for doing
              tasks as each person would
            </li>
          </ul>
          <p>
            People at home used the personas, and a browser extension that shows the giffgaff
            website as people with different disabilities might experience it. With it, they did
            tasks such as finding the monthly price of a phone.
          </p>
        </Stack>

        <Stack as="section" gap={3}>
          <Heading level={3}>Spot the accessibility issues</Heading>
          <p>
            A game to find as many accessibility problems as possible on{' '}
            <Link href={BAD_A11Y.href}>bad-a11y</Link>, the web page I built to be inaccessible on
            purpose.
          </p>
          <p>
            <strong>Please note: {BAD_A11Y.warning}</strong>
          </p>
          <ul className={styles.list}>
            <li>The hosts showed everyone how to use a keyboard only, and a screen reader.</li>
            <li>
              Everyone checked the page by looking at it, with a keyboard only, and with a screen
              reader, and wrote down the problems they found.
            </li>
            <li>
              People who work in technology then looked through the page’s code for more problems,
              and tried to fix them.
            </li>
            <li>
              Everyone else redesigned the page to be accessible, even if only as a drawing on
              paper.
            </li>
            <li>
              At the end, people called out the problems they’d found, and won sweets for each
              correct one. The hosts explained any that nobody found.
            </li>
          </ul>
          <p className={styles.standalone}>
            <Link href={BAD_A11Y.codeHref}>Read the code for bad-a11y</Link>
          </p>
        </Stack>

        <Stack as="section" gap={3}>
          <Heading level={3}>Using assistive technology</Heading>
          <p>People learned to use 3 kinds of assistive technology:</p>
          <ul className={styles.list}>
            <li>a keyboard only, with no mouse</li>
            <li>a screen reader, which is built into computers, phones and tablets</li>
            <li>
              a head pointer, which moves the pointer as you move your head, and is built into Macs
            </li>
          </ul>
          <p>
            They used each one to do real tasks on the giffgaff website, such as checking network
            coverage, and ordering a <Abbr name="SIM" /> on a test version of the site. Then they
            talked about what was hard.
          </p>
        </Stack>
      </PageContentsSection>

      <PageContentsSection section={SECTIONS.includingEveryone}>
        <ul className={styles.list}>
          <li>
            Each workshop had a host at home as well as in the office. People at home went into
            their own breakout room, so they could talk and ask for help without talking to a room
            full of people.
          </li>
          <li>
            Cameras were optional. Hosts at home turned theirs on and off during the sessions, so
            either felt normal.
          </li>
          <li>
            Hosts introduced themselves with their name, their pronouns, and a short description of
            how they look, for anyone who couldn’t see them.
          </li>
          <li>
            Hosts followed a neuroinclusive meeting guide, and set timers so sessions didn’t run
            over.
          </li>
          <li>
            Every meeting invite said what would happen, what to bring, whether cameras were needed,
            whether it would be recorded, and how much people would need to take part. They used the
            same layout as the{' '}
            <Link href={MEETING_INVITE_TEMPLATE}>
              meeting invite template in my Inclusion Toolkit
            </Link>
            .
          </li>
          <li>
            The welcome talk set a ground rule: we’re all learning. If someone used the wrong word,
            people responded with curiosity, not blame.
          </li>
        </ul>
      </PageContentsSection>

      <PageContentsSection section={SECTIONS.whatChanged}>
        <ul className={styles.list}>
          <li>
            More teams started testing with screen readers, including people who don’t work in
            technology, such as designers and product managers.
          </li>
          <li>
            People thought about accessibility more, and earlier in their work, rather than fixing
            problems at the end.
          </li>
        </ul>
      </PageContentsSection>

      <p className={styles.standalone}>
        <Link to="/projects">See all my projects</Link>
      </p>
    </Stack>
  );
}
