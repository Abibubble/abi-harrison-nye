import type { TalkVideo as Video } from '../../content/talks';
import { Link } from '../Link';
import { Stack } from '../Stack';

interface TalkVideoProps {
  title: string;
  video: Video;
  /** The id of the transcript heading, linked to when there are no captions. */
  transcriptId: string;
}

/**
 * A link to watch a talk on YouTube, and whether it has captions. Videos are linked rather than
 * embedded, so nothing from YouTube loads on this site. Without captions, it points to the transcript.
 */
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
