import { SITE_NAME } from '../../content/site';
import { Container } from '../Container';
import { Link } from '../Link';
import { ScreenReaderOnly } from '../ScreenReaderOnly';
import { SiteNav } from '../SiteNav';
import { ThemeSwitcher } from '../ThemeSwitcher';
import styles from './SiteHeader.module.css';

export function SiteHeader() {
  return (
    <header className={styles.header} data-print-compact="hide">
      <Container>
        <div className={styles.inner}>
          <Link to="/" className={styles.siteName}>
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
