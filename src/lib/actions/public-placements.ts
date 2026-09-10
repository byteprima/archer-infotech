import { unstable_cache } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { placements as placementsTable } from "@/db/schema";
import { courses } from "@/data/courses";
import { matchesCourse } from "@/lib/courses/course-match";

/**
 * Cached, read-only placement fetcher for the public placement record.
 *
 * Why this exists separately from `lib/actions/placements.ts`: that module is
 * the admin CRUD and `getAllPlacements` deliberately returns drafts alongside
 * published rows so the dashboard can show counts. Reusing it on a public page
 * would publish unpublished records. This module only ever reads
 * `isPublished = true`.
 *
 * Follows the same unstable_cache shape as public-testimonials so /placements
 * can stay ISR rather than forcing dynamic rendering for one table read.
 */

/** Shape handed to the public component. Deliberately narrower than the row. */
export interface PublicPlacement {
  id: number;
  /**
   * "First I." by default. The full name is used ONLY where the student
   * consented to it (`consentDisplayName`); otherwise the surname never
   * leaves this module.
   */
  displayName: string | null;
  company: string;
  designation: string;
  /**
   * The individual salary figure, or null where the student has not
   * consented to it being published.
   *
   * The public submission form promises "your salary figure is never
   * published either way", so this is null for every submitted placement
   * unless someone explicitly re-consents. The aggregate band shown on
   * /placements is computed separately, from all rows — a range across a
   * cohort publishes nobody's figure, which is what that promise allows.
   */
  package: string | null;
  courseTaken: string | null;
  batchYear: number | null;
  /** Institute-authored note. Only rendered on spotlight cards. */
  instituteNote: string | null;
  /** Only surfaced where the student consented to name + photo. */
  photoUrl: string | null;
  linkedinUrl: string | null;
  /** Drives the spotlight treatment above the table. */
  isHighlighted: boolean;
  /**
   * True where a human checked documentary proof against this row.
   *
   * A boolean, deliberately: the proof filename never leaves the server and
   * there is no public URL for it. Publishing the document would mean
   * publishing a named person's employer, salary and often signature. What
   * a reader — or a crawler — can check is that verification happened and
   * how it is done, which the page states in full.
   */
  verified: boolean;
}

/**
 * Reduce a stored name to first name + surname initial.
 *
 * The site owner chose this over full names: the citation value of a placement
 * record is in the aggregate being verifiable, not in identifying individuals,
 * and publishing a named person's salary next to their employer is sensitive
 * data that would need per-student written consent. Reducing here rather than
 * in the component means the full surname is never serialised into the HTML
 * payload at all, so it cannot leak through React's server-component
 * serialisation.
 */
export function toDisplayName(full: string | null | undefined): string | null {
  if (!full) return null;
  const parts = full.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return null;
  if (parts.length === 1) return parts[0];
  const surname = parts[parts.length - 1];
  return `${parts[0]} ${surname[0].toUpperCase()}.`;
}

/**
 * Minimum published rows before the public record renders at all.
 *
 * A placement table with three rows is weaker than the claim it is meant to
 * support — it invites the reader to ask where the rest are. Below this
 * threshold the component renders nothing and the page is unchanged.
 */
export const MIN_PUBLIC_PLACEMENTS = 8;

/**
 * Hard opt-in switch for the public placement record. Defaults to OFF.
 *
 * The row-count threshold alone is not a sufficient guard. At the time this
 * was written the production database held ten PUBLISHED placement rows that
 * are demo data — all inserted in a single batch on 2026-04-09, one per
 * well-known Indian IT employer, with names like "Priya Sharma" and packages
 * in a tidy 6-10 LPA ladder. Ten clears a threshold of eight, so shipping the
 * component with only a count check would have published invented people, at
 * named real employers, with invented salaries — as the site's flagship trust
 * asset. That is materially worse than having no placement record at all.
 *
 * So rendering requires someone to consciously turn it on AFTER the demo rows
 * are replaced with verified placements:
 *
 *     PLACEMENT_RECORD_ENABLED=true
 *
 * Set it in the Coolify environment for the app. Until then /placements is
 * byte-for-byte unchanged.
 */
export function isPlacementRecordEnabled(): boolean {
  return process.env.PLACEMENT_RECORD_ENABLED === "true";
}

export const getPublicPlacements = unstable_cache(
  async (): Promise<PublicPlacement[]> => {
    try {
      const rows = await db
        .select({
          id: placementsTable.id,
          studentName: placementsTable.studentName,
          company: placementsTable.company,
          designation: placementsTable.designation,
          package: placementsTable.package,
          courseTaken: placementsTable.courseTaken,
          batchYear: placementsTable.batchYear,
          instituteNote: placementsTable.instituteNote,
          photoUrl: placementsTable.photoUrl,
          linkedinUrl: placementsTable.linkedinUrl,
          isHighlighted: placementsTable.isHighlighted,
          consentDisplayName: placementsTable.consentDisplayName,
          consentDisplaySalary: placementsTable.consentDisplaySalary,
          // The timestamp only. `proofFilename` is deliberately not selected,
          // so it cannot reach the client payload even by accident.
          verifiedAt: placementsTable.verifiedAt,
        })
        .from(placementsTable)
        .where(eq(placementsTable.isPublished, true));

      return rows.map((r) => {
        const namedConsent = Boolean(r.consentDisplayName);
        return {
          id: r.id,
          // Full name only with consent; otherwise the surname is reduced
          // here so it is never serialised into the HTML payload.
          displayName: namedConsent
            ? r.studentName
            : toDisplayName(r.studentName),
          company: r.company,
          designation: r.designation,
          // Gated independently of the name: consenting to be shown is not
          // consenting to have your salary published.
          package: r.consentDisplaySalary ? r.package : null,
          courseTaken: r.courseTaken,
          batchYear: r.batchYear,
          instituteNote: r.instituteNote,
          // A photo is part of the same consent as the name.
          photoUrl: namedConsent ? r.photoUrl : null,
          linkedinUrl: namedConsent ? r.linkedinUrl : null,
          isHighlighted: Boolean(r.isHighlighted),
          verified: r.verifiedAt !== null,
        };
      });
    } catch {
      // Same reasoning as public-testimonials: the production image is built
      // without a populated SQLite file, so a build-time prerender would crash
      // on "no such table". Empty array → the section simply does not render,
      // and ISR fills it on the first real request.
      return [];
    }
  },
  ["public-placements-v2"],
  { tags: ["placements"], revalidate: 600 },
);

/**
 * Salary aggregates across ALL published placements.
 *
 * Deliberately separate from `getPublicPlacements`: that fetcher nulls the
 * per-row figure for students who did not consent to it being published, so
 * computing the band from its output would silently narrow the range to the
 * consenting subset. Reading here keeps every raw figure server-side — none
 * is serialised into the page payload — while still letting the page show a
 * cohort range, which publishes no individual's salary.
 */
export const getPlacementSalaryAggregates = unstable_cache(
  async (): Promise<Pick<PlacementStats, "packageLow" | "packageHigh" | "packageMedian">> => {
    try {
      const rows = await db
        .select({ package: placementsTable.package })
        .from(placementsTable)
        .where(eq(placementsTable.isPublished, true));
      const values = rows
        .map((r) => parseLpa(r.package))
        .filter((n): n is number => n !== null)
        .sort((a, b) => a - b);
      if (values.length === 0) {
        return { packageLow: null, packageHigh: null, packageMedian: null };
      }
      const mid = Math.floor(values.length / 2);
      return {
        packageLow: values[0],
        packageHigh: values[values.length - 1],
        packageMedian:
          values.length % 2 === 0 ? (values[mid - 1] + values[mid]) / 2 : values[mid],
      };
    } catch {
      return { packageLow: null, packageHigh: null, packageMedian: null };
    }
  },
  ["public-placement-salary-aggregates"],
  { tags: ["placements"], revalidate: 600 },
);

/** A placement plus how closely it relates to the page it is shown on. */
export interface RankedPlacement extends PublicPlacement {
  /** "course" — this exact course. "category" — a sibling course. "other". */
  relevance: "course" | "category" | "other";
}

/**
 * Placements for a course page, this course's first.
 *
 * Ranked rather than filtered. Filtering to the exact course leaves the strip
 * empty on most pages — there are far more courses than placements — and an
 * empty strip on a page that claims a 90% placement rate is worse than none.
 * So siblings from the same category follow, then the rest, and the component
 * labels each group so nobody is misled into reading an AWS placement as a
 * Kubernetes one.
 *
 * Ordering inside each group puts the records that actually persuade first:
 * verified, then with a photo, then with a consented name.
 */
const getCoursePlacementsCached = unstable_cache(
  async (
    courseTitle: string,
    categorySlug: string,
    limit = 12,
  ): Promise<RankedPlacement[]> => {
    try {
      const all = await getPublicPlacements();
      if (all.length === 0) return [];

      // Titles that share this course's category, so a sibling can be
      // recognised without a second query.
      const siblingTitles = courses
        .filter((c) => c.categorySlug === categorySlug && c.title !== courseTitle)
        .map((c) => c.title);

      const ranked: RankedPlacement[] = all.map((row) => {
        if (matchesCourse(row.courseTaken, courseTitle)) {
          return { ...row, relevance: "course" as const };
        }
        if (siblingTitles.some((t) => matchesCourse(row.courseTaken, t))) {
          return { ...row, relevance: "category" as const };
        }
        return { ...row, relevance: "other" as const };
      });

      const tier = { course: 0, category: 1, other: 2 } as const;
      const weight = (r: RankedPlacement) =>
        (r.verified ? 0 : 1) + (r.photoUrl ? 0 : 1) + (r.package ? 0 : 1);

      return ranked
        .sort(
          (a, b) =>
            tier[a.relevance] - tier[b.relevance] ||
            weight(a) - weight(b) ||
            (b.batchYear ?? 0) - (a.batchYear ?? 0),
        )
        .slice(0, limit);
    } catch {
      return [];
    }
  },
  ["course-placements-v1"],
  { tags: ["placements"], revalidate: 600 },
);

/**
 * The opt-in switch is checked OUTSIDE the cache, deliberately.
 *
 * Inside, the flag's value would be baked into the cached entry: turning the
 * record off in production would keep serving placements for up to
 * `revalidate` seconds afterwards, which is exactly the wrong direction for a
 * switch whose whole purpose is to stop publication. Checked here, flipping
 * it takes effect on the next request.
 */
export async function getCoursePlacements(
  courseTitle: string,
  categorySlug: string,
  limit = 12,
): Promise<RankedPlacement[]> {
  if (!isPlacementRecordEnabled()) return [];
  return getCoursePlacementsCached(courseTitle, categorySlug, limit);
}

/** Aggregates derived from the rows themselves — never hardcoded. */
export interface PlacementStats {
  total: number;
  /** How many of `total` were checked against a document. */
  verified: number;
  companies: number;
  courses: number;
  years: number[];
  packageLow: number | null;
  packageHigh: number | null;
  packageMedian: number | null;
}

/** Parse "8 LPA" / "7.5 LPA" / "12" into a number. Returns null if unparseable. */
function parseLpa(value: string | null): number | null {
  if (!value) return null;
  const m = /(\d+(?:\.\d+)?)/.exec(value);
  return m ? Number(m[1]) : null;
}

export function computePlacementStats(rows: PublicPlacement[]): PlacementStats {
  const verified = rows.filter((r) => r.verified).length;
  const packages = rows
    .map((r) => parseLpa(r.package))
    .filter((n): n is number => n !== null)
    .sort((a, b) => a - b);

  const median =
    packages.length === 0
      ? null
      : packages.length % 2 === 1
        ? packages[(packages.length - 1) / 2]
        : (packages[packages.length / 2 - 1] + packages[packages.length / 2]) / 2;

  return {
    total: rows.length,
    verified,
    companies: new Set(rows.map((r) => r.company).filter(Boolean)).size,
    courses: new Set(rows.map((r) => r.courseTaken).filter(Boolean)).size,
    years: [...new Set(rows.map((r) => r.batchYear).filter((y): y is number => !!y))].sort(),
    packageLow: packages[0] ?? null,
    packageHigh: packages[packages.length - 1] ?? null,
    packageMedian: median,
  };
}
