"use client";

import { useMemo, useState } from "react";
import type { PlacementStats, PublicPlacement } from "@/lib/actions/public-placements";

/**
 * Public placement record.
 *
 * Why this exists: /placements previously asserted a 90% placement rate and
 * showed testimonials, but published no underlying records — while a full
 * admin CRUD wrote placement rows to a table nothing rendered. Recent Pune
 * discussion shows students are explicitly sceptical of placement claims and
 * advise verifying them, so an assertion without a record is worth less than
 * the space it occupies.
 *
 * Two deliberate properties:
 *
 *   1. Every aggregate above the table is COMPUTED from the rows below it.
 *      Nothing is typed in. The headline figures and the evidence therefore
 *      cannot drift apart, which is the failure mode that put a 126-review
 *      count on the site for two months.
 *
 *   2. It is a client component only so the filters work, but React renders
 *      it on the server first — so every row is present in the initial HTML.
 *      That matters more than the filtering: AI crawlers do not execute
 *      JavaScript, and a table they cannot see is a table that cannot be
 *      cited. Filtering is enhancement, not the mechanism.
 */

interface Props {
  placements: PublicPlacement[];
  stats: PlacementStats;
}

const ALL = "__all__";

export function PlacementDashboard({ placements, stats }: Props) {
  const [course, setCourse] = useState<string>(ALL);
  const [year, setYear] = useState<string>(ALL);
  const [company, setCompany] = useState<string>(ALL);

  const courses = useMemo(
    () => [...new Set(placements.map((p) => p.courseTaken).filter(Boolean))].sort() as string[],
    [placements],
  );
  const companies = useMemo(
    () => [...new Set(placements.map((p) => p.company).filter(Boolean))].sort(),
    [placements],
  );

  const rows = useMemo(
    () =>
      placements
        .filter((p) => course === ALL || p.courseTaken === course)
        .filter((p) => year === ALL || String(p.batchYear) === year)
        .filter((p) => company === ALL || p.company === company)
        .sort((a, b) => (b.batchYear ?? 0) - (a.batchYear ?? 0)),
    [placements, course, year, company],
  );

  const stat = (label: string, value: string) => (
    <div className="rounded-lg border border-border bg-card px-4 py-3">
      <div className="text-2xl font-bold tabular-nums">{value}</div>
      <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
    </div>
  );

  return (
    <section
      id="placement-record"
      aria-labelledby="placement-record-heading"
      className="py-12 md:py-16 border-t"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2
            id="placement-record-heading"
            className="text-2xl md:text-3xl font-bold mb-3"
          >
            Placement record
          </h2>
          <p className="text-muted-foreground mb-6 max-w-3xl">
            Individual placements from recent batches, with the course taken,
            the role and the package. Names are shown as first name and initial.
            Every figure below is calculated from these rows.
          </p>

          {/* Aggregates — derived, never typed in. */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {stat("Placements listed", String(stats.total))}
            {stat("Companies", String(stats.companies))}
            {stat(
              "Package range",
              stats.packageLow !== null && stats.packageHigh !== null
                ? `${stats.packageLow}–${stats.packageHigh} LPA`
                : "—",
            )}
            {stat(
              "Median package",
              stats.packageMedian !== null ? `${stats.packageMedian} LPA` : "—",
            )}
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-4">
            <label className="text-sm">
              <span className="sr-only">Filter by course</span>
              <select
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                className="rounded-md border border-border bg-background px-3 py-2 text-sm"
              >
                <option value={ALL}>All courses</option>
                {courses.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </label>
            <label className="text-sm">
              <span className="sr-only">Filter by batch year</span>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="rounded-md border border-border bg-background px-3 py-2 text-sm"
              >
                <option value={ALL}>All years</option>
                {stats.years.map((y) => (
                  <option key={y} value={String(y)}>{y}</option>
                ))}
              </select>
            </label>
            <label className="text-sm">
              <span className="sr-only">Filter by company</span>
              <select
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="rounded-md border border-border bg-background px-3 py-2 text-sm"
              >
                <option value={ALL}>All companies</option>
                {companies.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </label>
            <span className="self-center text-sm text-muted-foreground tabular-nums">
              {rows.length} of {placements.length}
            </span>
          </div>

          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th scope="col" className="text-left font-semibold px-4 py-3">Student</th>
                  <th scope="col" className="text-left font-semibold px-4 py-3">Course</th>
                  <th scope="col" className="text-left font-semibold px-4 py-3">Role</th>
                  <th scope="col" className="text-left font-semibold px-4 py-3">Company</th>
                  <th scope="col" className="text-left font-semibold px-4 py-3">Package</th>
                  <th scope="col" className="text-left font-semibold px-4 py-3">Batch</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((p) => (
                  <tr key={p.id} className="border-t border-border">
                    <td className="px-4 py-3">{p.displayName ?? "—"}</td>
                    <td className="px-4 py-3 text-muted-foreground">{p.courseTaken ?? "—"}</td>
                    <td className="px-4 py-3">{p.designation}</td>
                    <td className="px-4 py-3 font-medium">{p.company}</td>
                    <td className="px-4 py-3 tabular-nums">{p.package ?? "—"}</td>
                    <td className="px-4 py-3 tabular-nums text-muted-foreground">
                      {p.batchYear ?? "—"}
                    </td>
                  </tr>
                ))}
                {rows.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-6 text-center text-muted-foreground">
                      No placements match those filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Methodology — the part that answers "should I trust this". */}
          <div className="mt-6 rounded-lg border-l-4 border-secondary bg-muted/30 p-5">
            <h3 className="font-semibold mb-2">How this record is compiled</h3>
            <ul className="text-sm text-muted-foreground space-y-1.5 leading-relaxed">
              <li>
                Each row is a placement recorded by the Archer Infotech
                placement team from its own enrolment and outcome records.
              </li>
              <li>
                Students are shown as first name and surname initial. Full names
                and photographs are not published without written consent.
              </li>
              <li>
                Packages are as reported in the offer at the time of joining.
                Where a package was not disclosed, the row is listed without one
                rather than estimated.
              </li>
              <li>
                This is a published sample, not the complete placement history —
                it covers students who agreed to be listed.
              </li>
              <li>
                Archer Infotech does not claim a 100% placement rate. Figures
                that cannot be traced to a record are not published.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
