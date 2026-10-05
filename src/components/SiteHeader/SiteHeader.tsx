import { SITE_NAME } from '../../content/site';
import { Container } from '../Container';
import { Link } from '../Link';
import { ScreenReaderOnly } from '../ScreenReaderOnly';
import { SiteNav } from '../SiteNav';
import styles from './SiteHeader.module.css';

// Not sticky: a fixed header can cover whatever has keyboard focus (WCAG 2.4.12).
export function SiteHeader() {
  return (
    <header className={styles.header}>
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
    </header>
  );
}
