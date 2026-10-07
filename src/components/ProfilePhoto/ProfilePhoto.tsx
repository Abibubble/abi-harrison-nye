import { MARK } from '../../brand/mark';
import type { ProfilePhoto as Photo } from '../../content/profile';
import styles from './ProfilePhoto.module.css';

interface ProfilePhotoProps {
  photo: Photo | undefined;
}

export function ProfilePhoto({ photo }: ProfilePhotoProps) {
  if (photo) {
    return <img className={styles.photo} src={photo.src} alt={photo.alt} />;
  }

  return (
    <div className={styles.placeholder} aria-hidden="true">
      <svg className={styles.mark} viewBox={MARK.viewBox} focusable="false">
        <path
          d={MARK.path}
          fill="none"
          stroke="currentColor"
          strokeWidth={MARK.strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
