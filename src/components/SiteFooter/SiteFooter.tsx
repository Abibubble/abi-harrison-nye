import { FOOTER_NAV } from '../../content/navigation';
import { PROFILE_LINKS } from '../../content/profile';
import { SITE_NAME } from '../../content/site';
import { useCurrentYear } from '../../hooks/useCurrentYear';
import { Container } from '../Container';
import { Link } from '../Link';
import styles from './SiteFooter.module.css';

export function SiteFooter() {
  const year = useCurrentYear();

  return (
    <footer className={styles.footer} data-print="hide">
      <Container>
        <div className={styles.inner}>
          <nav aria-label="Footer">
            <ul role="list" className={styles.list}>
              {FOOTER_NAV.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className={styles.link}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <ul role="list" className={styles.list}>
            {PROFILE_LINKS.map((profile) => (
              <li key={profile.href}>
                <Link href={profile.href} className={styles.link}>
                  {profile.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className={styles.copyright}>{`© ${year} ${SITE_NAME}`}</p>
        </div>
      </Container>
    </footer>
  );
}
