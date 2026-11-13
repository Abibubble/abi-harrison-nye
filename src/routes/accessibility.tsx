import type { ReactNode } from 'react';
import { useLoaderData } from 'react-router';

import { Abbr } from '../components/Abbr';
import { Link } from '../components/Link';
import { PageContents, PageContentsSection, type PageSection } from '../components/PageContents';
import { PageHeading } from '../components/PageHeading';
import { Stack } from '../components/Stack';
import { Time } from '../components/Time';
import { DISPLAY_SETTINGS_PATH, GLOSSARY_PATH } from '../content/navigation';
import { pageTitle } from '../content/site';
import { ACCESSIBILITY_REVIEWED, MANUAL_TESTING } from '../content/statements';
import { type KnownIssueTalks, type Talk, knownIssueTalks } from '../content/talks';
import styles from './accessibility.module.css';
import { pageMeta } from '../seo/pageMeta';
import type { Route } from './+types/accessibility';

export function meta(): Route.MetaDescriptors {
  return pageMeta({
    title: pageTitle('Accessibility statement'),
    description:
      'How accessible this site is, what doesn’t work yet, how to report a problem, and display settings to make it work for you.',
    path: '/accessibility',
  });
}

const SECTIONS = {
  displaySettings: { id: 'display-settings', title: 'Changing how the site looks' },
  howAccessible: { id: 'how-accessible', title: 'How accessible this site is' },
  whatIveDone: { id: 'what-ive-done', title: 'What I’ve done to make it accessible' },
  knownIssues: { id: 'known-issues', title: 'Known issues' },
  otherSites: { id: 'other-sites', title: 'Content on other sites' },
  testing: { id: 'testing', title: 'How I test this site' },
  reportAProblem: { id: 'report-a-problem', title: 'Report a problem' },
} satisfies Record<string, PageSection>;

interface KnownIssueProps {
  title: string;
  /** The success criteria it fails, such as "1.2.2 Captions (Prerecorded), Level A" */
  criteria: string[];
  affects: string;
  workaround: ReactNode;
  plan: string;
  /** The talks it affects. Left out when it affects every talk with a video */
  talks?: Talk[] | undefined;
}

/**
 * One known issue, closed to start with, so the list of issues is short to read through. Its title
 * is the summary, rather than a heading, as a heading inside a summary isn't announced as one
 */
function KnownIssue({ title, criteria, affects, workaround, plan, talks }: KnownIssueProps) {
  return (
    <details className={styles.issue}>
      <summary className={styles.summary}>{title}</summary>
      <dl className={styles.details}>
        <div>
          <dt>{criteria.length === 1 ? 'Success criterion' : 'Success criteria'}</dt>
          {criteria.map((criterion) => (
            <dd key={criterion}>{criterion}</dd>
          ))}
        </div>
        <div>
          <dt>Who it affects</dt>
          <dd>{affects}</dd>
        </div>
        <div>
          <dt>How to get around it</dt>
          <dd>{workaround}</dd>
        </div>
        <div>
          <dt>What I’m doing about it</dt>
          <dd>{plan}</dd>
        </div>
        <div>
          <dt>{talks?.length === 1 ? 'Talk affected' : 'Talks affected'}</dt>
          <dd>
            {talks ? (
              <ul>
                {talks.map((talk) => (
                  <li key={talk.slug}>
                    <Link to={`/talks/${talk.slug}`}>{talk.title}</Link>
                  </li>
                ))}
              </ul>
            ) : (
              'Every talk with a video, including any I add later.'
            )}
          </dd>
        </div>
      </dl>
    </details>
  );
}

export function AccessibilityPage({
  withoutCaptions,
  needingDescription,
  withVideos,
}: KnownIssueTalks) {
  const hasKnownIssues = withVideos.length > 0;

  return (
    <Stack gap={6}>
      <Stack gap={5}>
        <PageHeading>Accessibility statement</PageHeading>
        <p>
          I want everyone to be able to use this site. This page explains how accessible it is, what
          doesn’t work yet, and how to tell me about a problem. You can also change how the site
          looks, to make it easier for you to use.
        </p>
        <PageContents sections={Object.values(SECTIONS)} />
      </Stack>

      <PageContentsSection section={SECTIONS.displaySettings}>
        <p>
          You can change the theme, text size, spacing and font, to make the site easier for you to
          use. Your choices are saved in this browser only.
        </p>
        <p className={styles.standalone}>
          <Link to={DISPLAY_SETTINGS_PATH}>Change the display settings</Link>
        </p>
      </PageContentsSection>

      <PageContentsSection section={SECTIONS.howAccessible}>
        <p>
          This site aims to meet the <Abbr name="WCAG" expand /> version 2.2 at Level AAA. That’s
          the highest level, and goes further than the Level AA most sites aim for.
        </p>
        {hasKnownIssues ? (
          <p>
            It doesn’t fully meet Level AAA yet, because of the talk videos. The{' '}
            <a href={`#${SECTIONS.knownIssues.id}`}>known issues</a> list everything I know of that
            falls short, and how to get around it.
          </p>
        ) : (
          <p>
            I don’t know of anything on the site that falls short of it. If you find something,
            please <a href={`#${SECTIONS.reportAProblem.id}`}>tell me about it</a>.
          </p>
        )}
      </PageContentsSection>

      <PageContentsSection section={SECTIONS.whatIveDone}>
        <ul className={styles.list}>
          <li>
            Text has a contrast ratio of at least 7 to 1 against its background, in every theme.
          </li>
          <li>
            You can change the theme, text size, spacing and font on the{' '}
            <Link to={DISPLAY_SETTINGS_PATH}>Display settings page</Link>.
          </li>
          <li>The font is Atkinson Hyperlegible, which is designed to be easy to read.</li>
          <li>
            Everything works with a keyboard alone, and shows a clear outline around what’s focused.
          </li>
          <li>
            Pages fit screens as narrow as 320 pixels without scrolling sideways, so you can zoom in
            up to 400%.
          </li>
          <li>Nothing flashes, moves on its own or has a time limit.</li>
          <li>
            Abbreviations in the text of each page are written out in full the first time they’re
            used, apart from a few most people know, such as <Abbr name="UK" />. Every abbreviation
            is in the <Link to={`${GLOSSARY_PATH}#abbreviations`}>list of abbreviations</Link> on
            the Glossary page.
          </li>
          <li>
            Technical words are explained in the <Link to={GLOSSARY_PATH}>glossary</Link>. The Work
            page and the longest talk transcripts start with a short summary in plain words.
          </li>
          <li>
            Every talk has a full, checked transcript. Where I still have the slides, it describes
            them too.
          </li>
          <li>
            The contact form lets you check your message before you send it, and keeps everything
            you wrote if something goes wrong.
          </li>
        </ul>
      </PageContentsSection>

      <PageContentsSection section={SECTIONS.knownIssues}>
        {hasKnownIssues ? (
          <>
            <p>
              These are the parts of the site I know don’t meet Level AAA yet. Open each one to read
              who it affects, how to get around it, and what I’m doing about it.
            </p>
            {withoutCaptions.length > 0 && (
              <KnownIssue
                title="Some talk videos don’t have accurate captions"
                criteria={['1.2.2 Captions (Prerecorded), Level A']}
                affects="People who are deaf or hard of hearing, and anyone watching without sound."
                workaround="Each talk’s page has a full transcript of everything that’s said, which I’ve checked."
                plan="These videos only have YouTube’s automatic captions, or none. I add accurate captions to videos I upload myself, but I can’t change them on other people’s channels."
                talks={withoutCaptions}
              />
            )}
            {needingDescription.length > 0 && (
              <KnownIssue
                title="Some talk videos show things that aren’t described aloud"
                criteria={[
                  '1.2.5 Audio Description (Prerecorded), Level AA',
                  '1.2.7 Extended Audio Description (Prerecorded), Level AAA',
                ]}
                affects="People who are blind or have low vision."
                workaround="Where I still have the slides, the talk’s transcript describes them."
                plan="I describe everything important on screen aloud in new talks. Older videos won’t change."
                talks={needingDescription}
              />
            )}
            <KnownIssue
              title="Talk videos don’t have sign language interpretation"
              criteria={['1.2.6 Sign Language (Prerecorded), Level AAA']}
              affects="People whose first language is a sign language, such as British Sign Language."
              workaround="Each talk’s page has a full transcript, and captions where the video has them."
              plan="I don’t plan to add British Sign Language interpretation. It costs more than I can pay for a personal site. Instead, every talk has a full transcript, and I add captions to the videos I upload myself. If you need a talk in British Sign Language, contact me and I’ll see what I can do."
            />
          </>
        ) : (
          <p>There are no known issues at the moment.</p>
        )}
      </PageContentsSection>

      <PageContentsSection section={SECTIONS.otherSites}>
        <p>
          Some links go to other sites, such as GitHub and LinkedIn
          {withVideos.length > 0 && ', and YouTube for talk videos'}. They’re marked with an arrow
          icon, and screen readers hear “external site”. I can’t control how accessible other sites
          are.
        </p>
        {withVideos.length > 0 && (
          <p>
            Talk videos are linked rather than played on this site, so nothing from YouTube loads
            here. Every talk has a transcript on this site instead.
          </p>
        )}
      </PageContentsSection>

      <PageContentsSection section={SECTIONS.testing}>
        <p>
          Every page and component is checked automatically with axe, an accessibility testing tool,
          each time the site changes. Pages are checked in the browser engines behind Chrome,
          Firefox and Safari, on wide and narrow screens, and with the largest text and widest
          spacing in the display settings.
        </p>
        {MANUAL_TESTING.length > 0 ? (
          <>
            <p>Automated tools only find some problems, so I also test the site by hand, using:</p>
            <ul className={styles.list}>
              {MANUAL_TESTING.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </>
        ) : (
          <p>
            Automated tools only find some problems, so I’m also testing the site by hand with
            screen readers and other assistive technology. I’ll list what I’ve used here.
          </p>
        )}
        <p>
          This statement was last checked on <Time date={ACCESSIBILITY_REVIEWED} />.
        </p>
      </PageContentsSection>

      <PageContentsSection section={SECTIONS.reportAProblem}>
        <p>
          If something on this site doesn’t work for you, or you need something in a different
          format, please <Link to="/contact">tell me using the contact form</Link>. I’ll reply by
          email.
        </p>
        <p>
          It helps to know which page you were on and what you were trying to do. If you’re happy to
          share it, it also helps to know what you were using, such as your browser or screen
          reader.
        </p>
      </PageContentsSection>
    </Stack>
  );
}

/** Runs when the site is built, so talks that aren't ready never reach visitors */
export function loader() {
  return knownIssueTalks();
}

export default function Accessibility() {
  return <AccessibilityPage {...useLoaderData<typeof loader>()} />;
}
