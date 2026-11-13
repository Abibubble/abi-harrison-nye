import { SLIDE_PICTURE, slidePicturePath } from '../../content/talkPath';
import type { Talk } from '../../content/talks';
import type { Slide } from '../../content/transcripts';
import { Heading } from '../Heading';
import { Link } from '../Link';
import { PageHeading } from '../PageHeading';
import { Stack } from '../Stack';
import { Time } from '../Time';
import { Transcript } from '../Transcript';
import styles from './TalkSlides.module.css';

interface TalkSlidesProps {
  talk: Talk;
  slides: readonly Slide[];
}

const { BASE_URL } = import.meta.env;

/**
 * A talk's slides as a web page, rather than a PDF, which is hard to make fully accessible. Each slide's picture is followed
 * by everything on it as real text, so the picture has an empty alt: describing it again would only
 * repeat the text for screen reader users
 */
export function TalkSlides({ talk, slides }: TalkSlidesProps) {
  const backToTalk = (
    <p className={styles.standalone}>
      {talk.notRecorded ? (
        <Link to="/talks#other-talks">Back to other talks</Link>
      ) : (
        <Link to={`/talks/${talk.slug}`}>Back to “{talk.title}”</Link>
      )}
    </p>
  );

  return (
    <Stack gap={6}>
      <Stack gap={4}>
        <Stack gap={2}>
          <PageHeading>Slides: {talk.title}</PageHeading>
          <p className={styles.meta}>
            {talk.event}, <Time date={talk.date} />
          </p>
        </Stack>
        <p>
          There are {slides.length} slides. Each one has a picture of the slide, followed by its
          text and a description of what it shows.
        </p>
        {backToTalk}
      </Stack>

      {slides.map((slide) => (
        <Stack key={slide.number} gap={3} className={styles.slide}>
          <Heading level={2} id={`slide-${String(slide.number)}`}>
            Slide {slide.number}
          </Heading>
          <img
            className={styles.picture}
            src={`${BASE_URL}${slidePicturePath(talk.slug, slide.number, true)}`}
            srcSet={`${BASE_URL}${slidePicturePath(talk.slug, slide.number, true)} ${String(SLIDE_PICTURE.smallWidth)}w, ${BASE_URL}${slidePicturePath(talk.slug, slide.number)} ${String(SLIDE_PICTURE.width)}w`}
            sizes="(min-width: 72rem) 72rem, 100vw"
            width={SLIDE_PICTURE.width}
            height={SLIDE_PICTURE.height}
            alt=""
            // The first slide is usually the biggest thing on screen as the page opens, so it loads
            // first and shows straight away. The rest load as they're scrolled near
            loading={slide.number === 1 ? 'eager' : 'lazy'}
            fetchPriority={slide.number === 1 ? 'high' : 'auto'}
            decoding={slide.number === 1 ? 'sync' : 'async'}
          />
          <Transcript html={slide.html} />
        </Stack>
      ))}

      {backToTalk}
    </Stack>
  );
}
