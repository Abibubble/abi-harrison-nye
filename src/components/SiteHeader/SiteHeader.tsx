import { SITE_NAME } from '../../content/site';
import { Container } from '../Container';
import { Link } from '../Link';
import { ScreenReaderOnly } from '../ScreenReaderOnly';
import { SiteNav } from '../SiteNav';
import { ThemeSwitcher } from '../ThemeSwitcher';
import styles from './SiteHeader.module.css';

/**
 * The site name and navigation. Until there's room for every nav link on one line, they sit behind a
 * Menu button, along with the display settings. Once there's room, the links sit beside the name and
 * the display settings move to a slim bar underneath. "Room" is measured on the header itself, so it
 * accounts for the visitor's text size.
 *
 * Not sticky: a fixed header can cover whatever has keyboard focus (WCAG 2.4.12).
 */
export function SiteHeader() {
  return (
    // The compact print layout leaves the header out, as the CV already has my name at the top.
    <header className={styles.header} data-print-compact="hide">
      <Container>
        <div className={styles.inner}>
          <Link to="/" className={styles.siteName}>
            {/*
             * Browsers add a space around hidden text when working out a link's name, so the hidden
             * text starts after a real space rather than with punctuation.
             */}
            {SITE_NAME} <ScreenReaderOnly>home page</ScreenReaderOnly>
          </Link>
          <SiteNav />
        </div>
      </Container>
      <div className={styles.subnav} data-print="hide">
        <Container>
          <div className={styles.subnavInner}>
            <ThemeSwitcher />
          </div>
        </Container>
      </div>
    </header>
  );
}
