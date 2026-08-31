export type BlogPost = {
  /** URL segment — lowercase, dashes only. Becomes /blog/<slug>/ */
  slug: string;
  title: string;
  /** Shown on the card and the post header, e.g. 'April 18, 2026' */
  date: string;
  /** Path under /public. Card images should be 1200 x 750 (16:10). */
  image: string;
  /** One or two sentences, shown under the title on the detail page. */
  summary: string;
  /** Each string is one paragraph. */
  body: string[];
};

/**
 * Add a post by appending an object to this array. Newest first.
 * Drop its image in /public/cards/ at 1200 x 750, then point `image` at it.
 *
 * {
 *   slug: 'week-of-april-18',
 *   title: 'Week of April 18',
 *   date: 'April 18, 2026',
 *   image: '/cards/placeholder.svg',
 *   summary: 'What I worked on this week.',
 *   body: [
 *     'First paragraph.',
 *     'Second paragraph.',
 *   ],
 * },
 */
/**
 * NOTE: this array must never be empty. The site is a static export, and
 * Next refuses to build /blog/[slug] with no entries to generate. Keep at
 * least one post here — overwrite the starter below rather than deleting it.
 */
export const blogPosts: BlogPost[] = [
  {
    slug: 'getting-started',
    title: 'Getting Started',
    date: 'August 31, 2026',
    image: '/cards/placeholder.svg',
    summary: 'A starter entry — replace this with your first real post.',
    body: [
      'This post is a template. Open src/data/blog.ts and edit it, or add new posts above it so the newest appears first.',
      'Every post needs a slug, title, date, image, summary, and body. Put card images in /public/cards at 1200 x 750.',
    ],
  },
];
