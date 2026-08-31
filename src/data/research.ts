export type ResearchAssessment = {
  /** URL segment — lowercase, dashes only. Becomes /research/<slug>/ */
  slug: string;
  title: string;
  /** Shown on the card and the detail header, e.g. 'Assessment 1' */
  label: string;
  date: string;
  /** Path under /public. Card images should be 1200 x 750 (16:10). */
  image: string;
  /** One or two sentences, shown under the title on the detail page. */
  summary: string;
  /** Each string is one paragraph. */
  body: string[];
  /** Optional file under /public — adds a download button to the detail page. */
  file?: string;
};

/**
 * Add an assessment by appending an object to this array. Newest first.
 * Drop its image in /public/cards/ at 1200 x 750, then point `image` at it.
 *
 * {
 *   slug: 'assessment-1',
 *   title: 'Introduction to Deep Learning',
 *   label: 'Assessment 1',
 *   date: 'September 12, 2025',
 *   image: '/cards/placeholder.svg',
 *   summary: 'A first look at how neural networks learn.',
 *   body: [
 *     'First paragraph.',
 *     'Second paragraph.',
 *   ],
 *   file: '/research/assessment-1.docx',
 * },
 */
/**
 * NOTE: this array must never be empty. The site is a static export, and
 * Next refuses to build /research/[slug] with no entries to generate. Keep at
 * least one item here — overwrite the starter below rather than deleting it.
 */
export const researchAssessments: ResearchAssessment[] = [
  {
    slug: 'getting-started',
    title: 'Getting Started',
    label: 'Template',
    date: 'August 31, 2026',
    image: '/cards/placeholder.svg',
    summary: 'A starter entry — replace this with your first assessment.',
    body: [
      'This entry is a template. Open src/data/research.ts and edit it, or add new assessments above it so the newest appears first.',
      'Every assessment needs a slug, title, label, date, image, summary, and body. Add an optional file path to show a download button. Put card images in /public/cards at 1200 x 750.',
    ],
  },
];
