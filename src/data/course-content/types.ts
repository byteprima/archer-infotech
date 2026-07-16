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
