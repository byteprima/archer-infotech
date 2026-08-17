/**
 * Long-form, SEO-optimised content shape for course pages.
 *
 * When a course has a `CourseRichContent` entry registered in
 * `course-content/index.ts`, the course detail page renders the rich
 * 15-section layout instead of the short default. Sections are required
 * for the courses we have rich content for; optional sections lower
 * the bar for the next 40 courses to roll out incrementally.
 */
export interface CourseRichContent {
  /** Single 60–90 word paragraph rendered immediately under the H1. */
  intro: string;

  /** "Why learn X in 2026" — 2–3 paragraphs, ~220 words. */
  whyLearn: {
    heading: string;
    paragraphs: string[];
    keyPoints?: string[];
  };

  /** "Who this is for / NOT for" — honest filtering. ~180 words. */
  whoIsThisFor: {
    forYou: string[];
    notForYou: string[];
  };

  /**
   * Detailed curriculum modules with descriptive prose per module
   * (80–150 words each). Replaces the short `course.modules` rendering.
   */
  curriculum: Array<{
    title: string;
    weekRange?: string;
    description: string;
    topics: string[];
    /** When true, the module card is visually highlighted with a distinct background. */
    highlight?: boolean;
  }>;

  /**
   * Optional visual roadmap for the curriculum, shown above the module list.
   *
   * A summary, never the source of truth: every word inside the image is
   * invisible to crawlers and to AI engines, so the `curriculum` array above
   * must independently carry the same information as text. If you find
   * yourself adding a topic to the image only, add it to the curriculum too.
   *
   * Dimensions are required — /images/* is served immutable for a year and
   * these pages hold CLS at 0.00. Version the filename on any update, or
   * nobody sees the new file.
   */
  roadmapImage?: {
    /** Path under /public. Use a -vN suffix; the cache is immutable. */
    src: string;
    width: number;
    height: number;
    /** Describes what the diagram shows. Not a transcription of it. */
    alt: string;
    /** Visible caption under the image. */
    caption?: string;
    /** Optional full-size original — the image is too tall to read on mobile. */
    fullSizeHref?: string;
  };

  /**
   * Optional gated syllabus PDF, rendered through the existing
   * ReportDownloadForm lead-capture flow.
   *
   * The PDF is served noindex via X-Robots-Tag (see next.config.ts). It
   * duplicates this page's content by design, so it must never be the
   * indexable copy — the HTML page is canonical, and the PDF is a
   * post-click convenience, not an acquisition asset.
   */
  syllabusDownload?: {
    /** Public path under /public/downloads. Versioned filename. */
    pdfUrl: string;
    /** Shown in the form heading and recorded on the lead. */
    title: string;
    /** Feeds the lead `source` tag for admin segmentation. */
    slug: string;
    /** One or two lines of context above the form. */
    blurb: string;
    /**
     * Right-hand panels beside the form on desktop, stacked below it on
     * mobile. Two jobs at once: they tell a reader what they are about to
     * hand over an email address for, and they put extractable, keyword-
     * bearing text in what was otherwise dead space.
     *
     * Write complementary content, not a restatement of the curriculum
     * directly above — describe the document, the outcomes, the stack.
     * Repeating the module list here would be thin and would read as
     * padding to both a person and a crawler.
     */
    asideBlocks?: Array<{ heading: string; items: string[] }>;
  };

  /** Capstone projects with technologies + brief architecture. */
  projects: Array<{
    title: string;
    description: string;
    technologies: string[];
  }>;

  /** Optional intro paragraph above the existing trainer cards. */
  trainersIntro?: string;

  /** Career outcomes + cited salary bands + named hiring companies. */
  careerOutcomes: {
    paragraphs: string[];
    salaryBands: Array<{
      role: string;
      band: string;
      source: { label: string; url: string };
    }>;
    hiringCompanies: string[];
    rolesAfterCourse: string[];
  };

  /** Modes & duration. */
  modesAndDuration: {
    duration: string;
    classroom: { location: string; timing: string[] };
    online: { timing: string[]; tools?: string[] };
    weekend?: { timing: string[]; durationNote?: string };
    batchPolicy?: string;
  };

  /** Fees — honest range, not a fake number. */
  fees: {
    note: string;
    range?: string;
    sourceCitation?: { label: string; url: string };
    paymentOptions?: string[];
  };

  /** Placement support process and partner companies. */
  placementSupport: {
    paragraphs: string[];
    process: string[];
    partnerCompanies: string[];
  };

  /** Comparison table — Archer vs anonymous "leading Pune institutes". */
  comparison: {
    intro?: string;
    rows: Array<{ feature: string; archer: string; typical: string }>;
    closing?: string;
  };

  /** Optional honest comparison vs the second-most-asked alternative. */
  versusAlternative?: {
    heading: string;
    paragraphs: string[];
  };

  /** Prerequisites + 5 step starting guide. */
  prerequisitesAndStart: {
    paragraphs: string[];
    suggestedSteps: string[];
  };

  /**
   * Long-form FAQ — replaces the short `course.faqs` for FAQPage schema
   * AND visible rendering. 30–60 words per answer is the AI-citation
   * sweet spot.
   */
  faqs: Array<{
    question: string;
    answer: string;
  }>;

  /** Final CTA copy override. */
  finalCta?: {
    heading?: string;
    paragraph?: string;
  };
}
