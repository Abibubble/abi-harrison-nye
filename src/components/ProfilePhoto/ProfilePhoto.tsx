import type { ProfilePhoto as Photo } from '../../content/profile';
import styles from './ProfilePhoto.module.css';

interface ProfilePhotoProps {
  photo: Photo | undefined;
  /** Shown in place of a photo until there is one. */
  initials: string;
}

/**
 * My photo, or a placeholder with my initials until a photo is chosen. The initials are real text,
 * not an image of text, and are hidden from screen readers because my name is already in the heading.
 */
export function ProfilePhoto({ photo, initials }: ProfilePhotoProps) {
  if (photo) {
    return <img className={styles.photo} src={photo.src} alt={photo.alt} />;
  }

  return (
    <div className={styles.placeholder} aria-hidden="true">
      {initials}
    </div>
  );
}
