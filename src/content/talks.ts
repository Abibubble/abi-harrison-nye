export interface TalkVideo {
  /** The video on YouTube. Talks I've uploaded myself are unlisted */
  href: string;
  /**
   * The video's captions: accurate ones checked by a person, YouTube's automatic ones, which often
   * have mistakes, or none. Anything but accurate is listed as a known issue
   */
  captions: 'accurate' | 'automatic' | 'none';
  /**
   * Whether everything shown on screen, such as slides and demos, is also described aloud, so the
   * video needs no audio description. Videos that aren't are listed as known issues
   */
  describedAloud: boolean;
}

export interface Talk {
  /** The talk's address: /talks/{slug}. Its transcript is src/content/talks/{slug}.md */
  slug: string;
  title: string;
  event: string;
  location: string;
  /** YYYY-MM-DD, or YYYY-MM if the day isn't known */
  date: string;
  summary: string;
  /** A longer description, in Markdown, shown in a "More about this talk" section people can open */
  about?: string;
  video?: TalkVideo;
  /** The slides on another site */
  slidesHref?: string;
  /** The slides as a file in public/, such as talks/example-slides.pdf, with its size, such as 5.6MB */
  slidesFile?: { path: string; size: string };
}

/**
 * Newest first. A talk can only be added once its transcript exists, which a test checks. Transcripts
 * describe anything shown on screen, such as slides and demos, as well as what's said, where the
 * slides still exist (WCAG 1.2.8)
 */
export const TALKS: Talk[] = [
  {
    slug: 'moving-accessibility-from-debt-to-done',
    title: 'Moving accessibility from debt to done at giffgaff',
    event: 'LeadDev LDX3',
    location: 'London',
    date: '2026-06-02',
    summary:
      'How accessibility became part of everyday engineering, improving inclusion and business impact without slowing delivery.',
    about: `Accessibility is often treated as a compliance checkbox or a final cleanup phase. It becomes a form of exclusionary tech debt that teams fear. With the ‘Purple Pound’ (the spending power of disabled households) worth an estimated £446 billion in the UK alone, the business case is clear. Yet at giffgaff, we faced a hard reality with our legacy monolith. We had a daunting backlog, and it was feared that fixing it would destroy productivity and derail our roadmap.

In this talk, I’ll share how we turned this challenge into an opportunity to build a high-performing, inclusive engineering culture. We moved beyond reactive bug fixes to prove a controversial truth. Writing accessible code doesn’t have to take extra time.

I will demonstrate how we built an accessibility-first mindset by:

- Modernising the monolith and securing leadership buy-in by coupling accessibility standards with our technical migration to a modern tech stack.
- Scaling knowledge through documentation and training to empower developers, rather than relying on experts.
- Building culture by establishing an Employee Resource Group and hosting an ‘Accessibility Culture Day’ to shift our perspective from obligation to opportunity.
- Moving from a fix-it-later approach to an accessibility-first mindset, proven by a drop from 43 accessibility issues to zero in our new phones journey, without delaying release.

This talk is for leaders looking to move accessibility from the backlog to the definition of done, proving that quality, inclusion, and speed are not trade-offs.

**Key takeaways**

- Learn how to pay down accessibility debt by aligning it with technical modernisation.
- Discover how to quantify the impact of inclusion to secure leadership buy-in.
- Understand how to scale accessibility knowledge via documentation and tooling.
- Gain strategies to build a culture of empathy that shifts the mindset from compliance to opportunity.`,
    video: {
      href: 'https://www.youtube.com/watch?v=2t4JqgbbU9Q',
      captions: 'automatic',
      describedAloud: true,
    },
    slidesFile: { path: 'talks/moving-accessibility-from-debt-to-done-slides.pdf', size: '5.8MB' },
  },
  {
    slug: 'accessibility-and-meta-tags',
    title: 'Accessibility and Meta Tags',
    event: 'Code Institute',
    location: 'Online',
    date: '2021-12-09',
    summary:
      'The meta tags every website needs, from descriptions to social media previews, and the basics of building an accessible website, from semantic HTML and alt text to colour contrast.',
    video: {
      href: 'https://www.youtube.com/watch?v=t-4qqmikIqk',
      captions: 'automatic',
      describedAloud: false,
    },
  },
];

export function findTalk(slug: string, talks: readonly Talk[] = TALKS): Talk | undefined {
  return talks.find((talk) => talk.slug === slug);
}

/** Talks whose videos don't have accurate captions, for the known issues on the Accessibility page */
export function talksWithoutCaptions(talks: readonly Talk[] = TALKS): Talk[] {
  return talks.filter((talk) => talk.video && talk.video.captions !== 'accurate');
}

/** Talks with videos that show things not described aloud, for the Accessibility page's known issues */
export function talksNeedingAudioDescription(talks: readonly Talk[] = TALKS): Talk[] {
  return talks.filter((talk) => talk.video && !talk.video.describedAloud);
}

/** Talks with videos, which don't have sign language interpretation, as the Accessibility page says */
export function talksWithVideos(talks: readonly Talk[] = TALKS): Talk[] {
  return talks.filter((talk) => talk.video);
}
