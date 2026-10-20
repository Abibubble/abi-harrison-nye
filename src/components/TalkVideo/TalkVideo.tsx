import type { TalkVideo as Video } from '../../content/talks';
import { Link } from '../Link';
import { Stack } from '../Stack';
import styles from './TalkVideo.module.css';

interface TalkVideoProps {
  title: string;
  video: Video;
  /** The talk's transcript page */
  transcriptHref: string;
}

export function TalkVideo({ title, video, transcriptHref }: TalkVideoProps) {
  return (
    <Stack gap={2}>
      <p className={styles.standalone}>
        <Link href={video.href}>Watch “{title}” on YouTube</Link>
      </p>
      {video.captions === 'accurate' && <p>The video has captions.</p>}
      {video.captions === 'automatic' && (
        <p>
          The video only has automatic captions, which may have mistakes. The{' '}
          <Link to={transcriptHref}>full transcript</Link> has been checked.
        </p>
      )}
      {video.captions === 'none' && (
        <p>
          Captions aren’t available for this video yet.{' '}
          <Link to={transcriptHref}>Read the full transcript</Link> instead.
        </p>
      )}
    </Stack>
  );
}
