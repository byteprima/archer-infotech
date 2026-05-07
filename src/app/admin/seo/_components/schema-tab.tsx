import { CheckCircle2, AlertCircle, AlertTriangle, FileJson } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { priorityUrlFull } from "@/lib/seo-dashboard/priority-urls";
import type { DashboardSnapshot } from "@/lib/seo-dashboard/load";

interface Props {
  snapshot: DashboardSnapshot;
}

interface DetectedSchemaItem {
  richResultType?: string;
  items?: { name?: string; issues?: { issueMessage?: string; severity?: string }[] }[];
}

interface RichResultsResult {
  verdict?: string;
  detectedItems?: DetectedSchemaItem[];
}

/**
 * Schema & Rich Results tab — surfaces what schema types Google
 * actually detected per priority URL via URL Inspection. Validates
 * against today's intent (FAQPage on home/category, BlogPosting on
 * /blog/*, HowTo on tutorial posts, Course on course pages, Person
 * on /trainers/*).
 *
 * v2.1 will diff declared (in-source) schema against detected — for
 * now we surface what Google sees and let you compare against the
 * source-of-truth list below.
 */
export function SchemaTab({ snapshot }: Props) {
  const summary = aggregate(snapshot);

  return (
    <div className="space-y-6">
      <Card className="bg-blue-50/40 border-blue-200">
        <CardContent className="pt-4 pb-4 text-sm">
          <strong>What this shows:</strong> Schema types Google
          successfully parsed from each priority URL via URL Inspection.
          A &ldquo;PASS&rdquo; verdict + detected items means the schema is
          valid and rich-result eligible. URL Inspection has a 24h
          cache; click Refresh to force a fresh fetch.
        </CardContent>
      </Card>

      {/* Schema-type heatmap — which URLs have which schema */}
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
          Detected schema across {snapshot.priorityUrls.length} priority URLs
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Array.from(summary.byType.entries())
            .sort((a, b) => b[1].count - a[1].count)
            .map(([type, info]) => (
              <Card key={type}>
                <CardContent className="pt-5">
                  <div className="flex items-center gap-2 mb-1">
                    <FileJson className="h-4 w-4 text-primary" aria-hidden="true" />
                    <span className="text-sm font-semibold">{type}</span>
                  </div>
                  <div className="text-xl font-bold">
                    {info.count}
                    <span className="text-xs text-muted-foreground font-normal ml-1">
                      / {snapshot.priorityUrls.length}
                    </span>
                  </div>
                  {info.partial > 0 && (
                    <div className="text-xs text-amber-700 mt-1">
                      {info.partial} partial
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          {summary.byType.size === 0 && (
            <Card className="md:col-span-4">
              <CardContent className="pt-6 pb-6 text-center text-sm text-muted-foreground">
                No schema detected yet. Either GSC inspection hasn&apos;t
                populated (force refresh), or rich-result eligibility
                hasn&apos;t propagated since today&apos;s deploy. Re-run in 24-72h.
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Per-URL detail table */}
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
          Per-URL detection
        </h3>
        <div className="overflow-x-auto rounded-lg border bg-background">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 border-b">
              <tr>
                <th className="text-left p-3 font-semibold w-72">URL</th>
                <th className="text-left p-3 font-semibold w-32">Verdict</th>
                <th className="text-left p-3 font-semibold">Detected types</th>
                <th className="text-left p-3 font-semibold w-48">Issues</th>
              </tr>
            </thead>
            <tbody>
              {snapshot.priorityUrls.map((p) => {
                const fullUrl = priorityUrlFull(p);
                const result = snapshot.urlInspectByUrl.get(fullUrl)?.result;
                const rich = (result?.inspectionResult?.richResultsResult ??
                  null) as RichResultsResult | null;

                const types = rich?.detectedItems
                  ?.map((d) => d.richResultType)
                  .filter(Boolean) as string[] | undefined;

                const issues = rich?.detectedItems
                  ?.flatMap((d) => d.items?.flatMap((i) => i.issues ?? []) ?? [])
                  .filter(Boolean) ?? [];

                return (
                  <tr key={fullUrl} className="border-b last:border-b-0 hover:bg-muted/30">
                    <td className="p-3">
                      <div className="font-medium leading-tight">{p.label}</div>
                      <div className="font-mono text-xs text-muted-foreground truncate max-w-md mt-0.5" title={p.path}>
                        {p.path}
                      </div>
                    </td>
                    <td className="p-3">
                      <VerdictPill verdict={rich?.verdict} />
                    </td>
                    <td className="p-3">
                      {types && types.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {types.map((t) => (
                            <span
                              key={t}
                              className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-primary/10 text-primary border border-primary/20"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground">none</span>
                      )}
                    </td>
                    <td className="p-3">
                      {issues.length > 0 ? (
                        <div className="text-xs text-rose-700 space-y-1">
                          {issues.slice(0, 3).map((issue, i) => (
                            <div key={i} className="truncate" title={issue.issueMessage}>
                              {issue.issueMessage?.slice(0, 80)}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span className="text-xs text-emerald-700 inline-flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
                          none
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* What we declare — source-of-truth checklist */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-sm font-semibold mb-3">
            Schema declared in source (what we expect Google to detect)
          </h3>
          <ul className="grid md:grid-cols-2 gap-x-6 gap-y-2 text-xs text-muted-foreground">
            <li>
              <code>EducationalOrganization + LocalBusiness</code> — sitewide via{" "}
              <code>OrganizationJsonLd</code>
            </li>
            <li>
              <code>BreadcrumbList</code> — every detail page via{" "}
              <code>BreadcrumbJsonLd</code>
            </li>
            <li>
              <code>FAQPage</code> — Home, About, Placements, Courses,
              Bootcamps, Contact, Trainers, Internships, Corporate
              Training, Batch Schedule, all 9 category pages, all course
              detail pages
            </li>
            <li>
              <code>Course + CourseInstance</code> — every course detail
              page (with <code>dateModified</code> from P3-18)
            </li>
            <li>
              <code>BlogPosting</code> + <code>Person</code> author — every
              blog post (P5-12)
            </li>
            <li>
              <code>HowTo</code> — auto-emitted on tutorial / roadmap blog
              posts (P8-13, ~10 posts)
            </li>
            <li>
              <code>Person</code> — /trainers/[slug] and /about (founder
              Yogesh Patil from P4-08)
            </li>
            <li>
              <code>CollectionPage + ItemList</code> — all 9 category
              landing pages (P4-11)
            </li>
            <li>
              <code>Review</code> + <code>AggregateRating</code> — home page
              testimonials (P3-13)
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

function VerdictPill({ verdict }: { verdict?: string }) {
  if (!verdict) return <span className="text-xs text-muted-foreground">—</span>;
  if (verdict === "PASS") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-emerald-100 text-emerald-800">
        <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
        Pass
      </span>
    );
  }
  if (verdict === "PARTIAL") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800">
        <AlertTriangle className="h-3 w-3" aria-hidden="true" />
        Partial
      </span>
    );
  }
  if (verdict === "FAIL") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-rose-100 text-rose-800">
        <AlertCircle className="h-3 w-3" aria-hidden="true" />
        Fail
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-muted text-muted-foreground">
      {verdict}
    </span>
  );
}

function aggregate(snapshot: DashboardSnapshot) {
  const byType = new Map<string, { count: number; partial: number }>();
  for (const p of snapshot.priorityUrls) {
    const fullUrl = priorityUrlFull(p);
    const rich = (snapshot.urlInspectByUrl.get(fullUrl)?.result?.inspectionResult
      ?.richResultsResult ?? null) as RichResultsResult | null;
    if (!rich?.detectedItems) continue;
    const isPartial = rich.verdict === "PARTIAL";
    for (const item of rich.detectedItems) {
      const t = item.richResultType;
      if (!t) continue;
      const cur = byType.get(t) ?? { count: 0, partial: 0 };
      cur.count += 1;
      if (isPartial) cur.partial += 1;
      byType.set(t, cur);
    }
  }
  return { byType };
}
