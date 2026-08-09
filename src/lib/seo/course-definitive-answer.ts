/**
 * Definitive-answer paragraph for course detail pages.
 *
 * WHY THIS EXISTS: `DefinitiveAnswer` (P8-07 / P-05) was rolled out to 39
 * routes — homepage, /about, /placements, /testimonials, /contact,
 * /bootcamps, the tools pages — and the course detail template was missed.
 * The 49 pages with the highest commercial value were the only major
 * template on the site opening with marketing copy instead of a quotable
 * factual summary. A third-party AEO/GEO audit on 2026-08-09 flagged it
 * four separate ways ("top summary answer", "direct answer signals", "key
 * takeaway", "clear summary for AI extraction") before it was noticed here.
 *
 * Composed from real course fields only — duration, level, mode, module
 * count, career outcomes — plus the canonical site stats. Nothing is
 * invented, and no fee figure is stated because none exists in the repo
 * (see course-seo-description.ts for the same constraint).
 *
 * Written as plain sentences that each stand alone, because AI engines lift
 * this block verbatim and a sentence that depends on the previous one reads
 * as a fragment when quoted in isolation.
 */
import type { Course } from "@/data/courses";
import { siteConfig } from "@/data/site-config";

function modeSentence(mode: Course["mode"]): string {
  const online = mode.includes("Online");
  const offline = mode.includes("Offline");
  if (online && offline)
    return "It runs as classroom batches at the Kothrud centre and as live online batches";
  if (online) return "It runs as live online batches";
  return "It runs as classroom batches at the Kothrud centre";
}

/**
 * Turn a stored duration into an attributive adjective: "6 Months" reads as
 * "a 6 months programme" when dropped in raw, which is wrong. Produces
 * "6-month" / "3.5-month" / "6-week" instead. Falls back to the original
 * string unchanged if it doesn't match the expected shape, so an unusual
 * value degrades to slightly clumsy rather than mangled.
 */
function durationAdjective(duration: string): string | null {
  const m = duration.trim().match(/^([\d.]+)\s*(month|week|day|hour)s?$/i);
  if (!m) return null;
  return `${m[1]}-${m[2].toLowerCase()}`;
}

/** Join a list into readable prose: "a, b and c". */
function prose(items: string[]): string {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

export function buildCourseDefinitiveAnswer(course: Course): string {
  const sentences: string[] = [];

  const level = course.level === "All Levels" ? "all levels" : course.level.toLowerCase();
  // Irregular durations ("6 to 8 Months", "8 weeks / 2 months", "Ongoing
  // (Semester-wise)") can't be used attributively, so the sentence is
  // rephrased to put the duration after the noun instead of forcing a
  // hyphenated adjective that would read as nonsense.
  const durAdj = durationAdjective(course.duration);
  // Article agrees with whichever word actually follows it — the duration
  // adjective in the normal case, the level in the fallback. Hardcoding
  // "a"/"an" produced "an beginner programme".
  const article = (word: string) => (/^[aeiou]/i.test(word) ? "an" : "a");
  sentences.push(
    durAdj
      ? `${course.title} training at Archer Infotech is ${article(durAdj)} ${durAdj} ${level} programme in Pune.`
      : `${course.title} training at Archer Infotech is ${article(level)} ${level} programme in Pune running over ${course.duration.toLowerCase()}.`,
  );

  sentences.push(`${modeSentence(course.mode)}, using the same curriculum and trainers.`);

  if (course.modules?.length) {
    sentences.push(
      `The syllabus covers ${course.modules.length} modules and includes hands-on project work.`,
    );
  }

  const roles = course.careerOpportunities?.slice(0, 3) ?? [];
  if (roles.length) {
    sentences.push(`It prepares learners for roles such as ${prose(roles)}.`);
  }

  // Placement framing is deliberately the honest one. Site-wide policy is
  // never to write "100% placement"; the 90% figure is qualified at source.
  sentences.push(
    `Archer Infotech has trained IT professionals in Pune since ${siteConfig.foundingYear} and reports a ${siteConfig.stats.placementRate} placement rate across learners who complete training.`,
  );

  sentences.push(
    "Fees, batch dates and EMI options are shared on request; a free demo class is available before enrolling.",
  );

  return sentences.join(" ");
}

/**
 * The eyebrow doubles as an `<h2>` in the rendered block, so it is phrased
 * as the question a searcher actually types rather than a label. Matches
 * the "<course> course in Pune" query shape seen in Search Console.
 */
export function buildCourseDefinitiveAnswerEyebrow(course: Course): string {
  return `What is the ${course.title} course in Pune?`;
}
