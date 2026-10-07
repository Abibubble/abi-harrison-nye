import type { TalkVideo as Video } from '../../content/talks';
import { Link } from '../Link';
import { Stack } from '../Stack';

interface TalkVideoProps {
  title: string;
  video: Video;
  transcriptId: string;
}

export function TalkVideo({ title, video, transcriptId }: TalkVideoProps) {
  return (
    <Stack gap={2}>
      <p>
        <Link href={video.href}>Watch “{title}” on YouTube</Link>
      </p>
      {video.captions ? (
        <p>The video has captions.</p>
      ) : (
        <p>
          Captions aren’t available for this video yet.{' '}
          <Link to={`#${transcriptId}`}>Read the full transcript</Link>, which also describes
          everything shown on screen.
        </p>
      )}
    </Stack>
  );
}
