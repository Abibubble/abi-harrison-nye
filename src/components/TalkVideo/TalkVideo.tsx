import type { TalkVideo as Video } from '../../content/talks';
import { Link } from '../Link';
import { Stack } from '../Stack';
import styles from './TalkVideo.module.css';

interface TalkVideoProps {
  title: string;
  video: Video;
  transcriptId: string;
}

export function TalkVideo({ title, video, transcriptId }: TalkVideoProps) {
  return (
    <Stack gap={2}>
      <p className={styles.standalone}>
        <Link href={video.href}>Watch “{title}” on YouTube</Link>
      </p>
      {video.captions === 'accurate' && <p>The video has captions.</p>}
      {video.captions === 'automatic' && (
        <p>
          The video only has automatic captions, which may have mistakes. The{' '}
          <Link to={`#${transcriptId}`}>full transcript</Link> has been checked.
        </p>
      )}
      {video.captions === 'none' && (
        <p>
          Captions aren’t available for this video yet.{' '}
          <Link to={`#${transcriptId}`}>Read the full transcript</Link> instead.
        </p>
      )}
    </Stack>
  );
}
