import { Abbr } from '../components/Abbr';
import { DISPLAY_SETTINGS_ID } from '../components/DisplaySettings';
import { PageContents, PageContentsSection, type PageSection } from '../components/PageContents';
import { Link } from '../components/Link';
import { PageHeading } from '../components/PageHeading';
import { Stack } from '../components/Stack';
import { Time } from '../components/Time';
import { pageTitle } from '../content/site';
import { MESSAGE_RETENTION, PRIVACY_CONTACT_FORM_ID, PRIVACY_UPDATED } from '../content/statements';
import styles from './privacy.module.css';
import { pageMeta } from '../seo/pageMeta';
import type { Route } from './+types/privacy';

export function meta(): Route.MetaDescriptors {
  return pageMeta({
    title: pageTitle('Privacy'),
    description:
      'What information this site collects, why, and what happens to it. There’s no tracking, analytics or advertising.',
    path: '/privacy',
  });
}

const SECTIONS = {
  whoIsResponsible: { id: 'who-is-responsible', title: 'Who’s responsible for your information' },
  contactForm: { id: PRIVACY_CONTACT_FORM_ID, title: 'The contact form' },
  yourRights: { id: 'your-rights', title: 'Your rights' },
  displaySettings: { id: 'display-settings-storage', title: 'What the display settings save' },
  noTracking: { id: 'no-tracking', title: 'No tracking' },
  otherSites: { id: 'other-sites', title: 'Other sites' },
  hosting: { id: 'hosting', title: 'Hosting' },
  changes: { id: 'changes', title: 'Changes to this notice' },
} satisfies Record<string, PageSection>;

export default function Privacy() {
  return (
    <Stack gap={6}>
      <Stack gap={5}>
        <PageHeading>Privacy</PageHeading>
        <p>
          This notice explains what information this site collects, why, and what happens to it.
        </p>
        <p>
          In short, the only personal information it collects is what you choose to send me through
          the contact form. There’s no tracking, analytics or advertising, and no cookies.
        </p>
        <PageContents sections={Object.values(SECTIONS)} />
      </Stack>

      <PageContentsSection section={SECTIONS.whoIsResponsible}>
        <p>
          I’m Abi Harrison-Nye, and I’m responsible for how your information is used on this site.
          Under <Abbr name="UK" /> data protection law, that makes me the data controller.
        </p>
        <p>
          You can ask me anything about your information using the{' '}
          <Link to="/contact">contact form</Link>.
        </p>
      </PageContentsSection>

      <PageContentsSection section={SECTIONS.contactForm}>
        <p>When you send me a message, the form collects:</p>
        <ul className={styles.list}>
          <li>your name</li>
          <li>your email address</li>
          <li>your message</li>
        </ul>
        <p>
          I use them to read your message and reply to it. I won’t use them for anything else, add
          you to a mailing list, or share them with anyone, unless the law requires me to.
        </p>
        <p>
          The <Abbr name="UK" /> <Abbr name="GDPR" expand /> calls my reason for using them
          “legitimate interests”. You’ve asked to get in touch, and I need your details to reply.
        </p>
        <p>
          Your message is delivered to my email inbox by EmailJS, an email sending service. EmailJS
          may keep a copy for a short time, as explained in{' '}
          <Link href="https://www.emailjs.com/legal/privacy-policy/">EmailJS’s privacy policy</Link>
          .
        </p>
        <p>
          I keep messages for up to {MESSAGE_RETENTION} after my last reply, in case you get in
          touch again about the same thing. Then I delete them.
        </p>
      </PageContentsSection>

      <PageContentsSection section={SECTIONS.yourRights}>
        <p>You can ask me to:</p>
        <ul className={styles.list}>
          <li>tell you what information I have about you, and give you a copy</li>
          <li>correct it if it’s wrong</li>
          <li>delete it</li>
          <li>stop using it</li>
        </ul>
        <p>
          To ask, use the <Link to="/contact">contact form</Link>. I’ll reply within one month, as
          the law requires.
        </p>
        <p>
          If you’re unhappy with how I’ve used your information, you can{' '}
          <Link href="https://ico.org.uk/make-a-complaint/">
            complain to the Information Commissioner’s Office
          </Link>
          , which looks after data protection in the <Abbr name="UK" />.
        </p>
      </PageContentsSection>

      <PageContentsSection section={SECTIONS.displaySettings}>
        <p>
          If you change the{' '}
          <Link to={`/accessibility#${DISPLAY_SETTINGS_ID}`}>display settings</Link>, your choices
          are saved in your browser’s local storage, so they’re remembered next time. They’re only
          your preferences, such as the theme and text size, and nothing personal.
        </p>
        <p>
          They stay in your browser and are never sent to me or anyone else. Local storage isn’t a
          cookie, and nothing else on the site uses it. To remove them, choose “Reset to defaults”
          in the display settings, or clear this site’s data in your browser.
        </p>
      </PageContentsSection>

      <PageContentsSection section={SECTIONS.noTracking}>
        <p>
          This site doesn’t use cookies, analytics or advertising. It doesn’t record which pages you
          visit, and doesn’t track you across other sites.
        </p>
      </PageContentsSection>

      <PageContentsSection section={SECTIONS.otherSites}>
        <p>
          Links to other sites, such as GitHub and LinkedIn, are marked with an arrow icon. Those
          sites have their own privacy policies.
        </p>
        <p>
          Talk videos are linked to on YouTube rather than played on this site. Nothing from YouTube
          loads here, so YouTube only knows you’ve visited if you choose to watch a video.
        </p>
      </PageContentsSection>

      <PageContentsSection section={SECTIONS.hosting}>
        <p>
          This site is hosted by GitHub Pages. When you visit, GitHub logs your internet address and
          stores it for security purposes. I don’t have access to these logs, and don’t use them to
          identify anyone. You can read{' '}
          <Link href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">
            GitHub’s privacy statement
          </Link>
          .
        </p>
      </PageContentsSection>

      <PageContentsSection section={SECTIONS.changes}>
        <p>
          If anything changes, I’ll update this page. It was last updated on{' '}
          <Time date={PRIVACY_UPDATED} />.
        </p>
      </PageContentsSection>
    </Stack>
  );
}
