import { unstable_cache } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { placements as placementsTable } from "@/db/schema";

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
  /** Already reduced to "First I." — the full surname never leaves this module. */
  displayName: string | null;
  company: string;
  designation: string;
  package: string | null;
  courseTaken: string | null;
  batchYear: number | null;
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
        })
        .from(placementsTable)
        .where(eq(placementsTable.isPublished, true));

      return rows.map((r) => ({
        id: r.id,
        displayName: toDisplayName(r.studentName),
        company: r.company,
        designation: r.designation,
        package: r.package,
        courseTaken: r.courseTaken,
        batchYear: r.batchYear,
      }));
    } catch {
      // Same reasoning as public-testimonials: the production image is built
      // without a populated SQLite file, so a build-time prerender would crash
      // on "no such table". Empty array → the section simply does not render,
      // and ISR fills it on the first real request.
      return [];
    }
  },
  ["public-placements"],
  { tags: ["placements"], revalidate: 600 },
);

/** Aggregates derived from the rows themselves — never hardcoded. */
export interface PlacementStats {
  total: number;
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
    companies: new Set(rows.map((r) => r.company).filter(Boolean)).size,
    courses: new Set(rows.map((r) => r.courseTaken).filter(Boolean)).size,
    years: [...new Set(rows.map((r) => r.batchYear).filter((y): y is number => !!y))].sort(),
    packageLow: packages[0] ?? null,
    packageHigh: packages[packages.length - 1] ?? null,
    packageMedian: median,
  };
}
