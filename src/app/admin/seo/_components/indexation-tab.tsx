import { CheckCircle2, AlertCircle, Clock, Smartphone, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { priorityUrlFull } from "@/lib/seo-dashboard/priority-urls";
import type { DashboardSnapshot } from "@/lib/seo-dashboard/load";
import type { GscInspectResult } from "@/lib/seo-dashboard/gsc";

interface Props {
  snapshot: DashboardSnapshot;
}

/**
 * Indexation Coverage tab — per-URL state from GSC URL Inspection API.
 * Shows coverageState, lastCrawlTime, googleCanonical match, mobile
 * usability verdict, and rich-results detection at a glance.
 *
 * Click-to-expand for full URL inspection JSON would be the natural
 * v2.1 add — for now the table surfaces the high-leverage fields.
 */
export function IndexationTab({ snapshot }: Props) {
  const grouped = groupByCategory(snapshot);
  const summary = summarise(snapshot);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <SummaryTile label="Indexed" value={summary.indexed} total={summary.total} tone="good" />
        <SummaryTile label="Discovered" value={summary.discovered} total={summary.total} tone="warn" />
        <SummaryTile label="Other" value={summary.other} total={summary.total} tone="neutral" />
        <SummaryTile label="Errors" value={summary.errors} total={summary.total} tone="bad" />
      </div>

      <Card className="bg-blue-50/40 border-blue-200">
        <CardContent className="pt-4 pb-4 text-sm">
          <strong>How to read this:</strong> &ldquo;Indexed&rdquo; = live in
          Google. &ldquo;Discovered&rdquo; = Google knows about the URL but
          hasn&apos;t crawled / indexed yet (typical 24-72h after Indexing
          API submit). &ldquo;Other&rdquo; covers redirects, soft 404s,
          and noindex pages. URL Inspection has a 24h cache; click
          Refresh in the header to force fresh fetches.
        </CardContent>
      </Card>

      {Object.entries(grouped).map(([group, rows]) => (
        <div key={group}>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            {group} ({rows.length})
          </h3>
          <div className="overflow-x-auto rounded-lg border bg-background">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 border-b">
                <tr>
                  <th className="text-left p-3 font-semibold w-72">URL</th>
                  <th className="text-left p-3 font-semibold w-48">Coverage</th>
                  <th className="text-left p-3 font-semibold w-40">Last crawl</th>
                  <th className="text-center p-3 font-semibold w-24">Mobile</th>
                  <th className="text-center p-3 font-semibold w-24">Schema</th>
                  <th className="text-center p-3 font-semibold w-24">Canonical</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <Row key={r.fullUrl} {...r} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}

interface RowData {
  label: string;
  path: string;
  fullUrl: string;
  result: GscInspectResult | null;
  error: string | null;
}

function Row({ label, path, result, error }: RowData) {
  const idx = result?.inspectionResult?.indexStatusResult;
  const mobile = result?.inspectionResult?.mobileUsabilityResult;
  const rich = result?.inspectionResult?.richResultsResult;

  const coverage = idx?.coverageState ?? (error ? "Error" : "Unknown");
  const lastCrawl = idx?.lastCrawlTime
    ? new Date(idx.lastCrawlTime).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : idx?.lastCrawlTime === undefined
      ? "—"
      : "—";
  const canonicalOk =
    idx?.googleCanonical && idx?.userCanonical
      ? idx.googleCanonical === idx.userCanonical
      : null;

  return (
    <tr className="border-b last:border-b-0 hover:bg-muted/30">
      <td className="p-3">
        <div className="font-medium leading-tight">{label}</div>
        <div className="font-mono text-xs text-muted-foreground truncate max-w-md mt-0.5" title={path}>
          {path}
        </div>
      </td>
      <td className="p-3">
        <CoverageBadge state={coverage} error={!!error} />
        {error && (
          <div className="text-xs text-rose-700 mt-1 truncate max-w-xs" title={error}>
            {error.slice(0, 80)}
          </div>
        )}
      </td>
      <td className="p-3 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <Clock className="h-3 w-3" aria-hidden="true" />
          {lastCrawl}
        </span>
        {idx?.crawledAs && (
          <div className="text-[10px] mt-0.5">as {idx.crawledAs}</div>
        )}
      </td>
      <td className="p-3 text-center">
        <VerdictBadge verdict={mobile?.verdict} icon={Smartphone} />
      </td>
      <td className="p-3 text-center">
        <SchemaBadge rich={rich} />
      </td>
      <td className="p-3 text-center">
        <CanonicalBadge ok={canonicalOk} />
      </td>
    </tr>
  );
}

function CoverageBadge({ state, error }: { state: string; error: boolean }) {
  const palette =
    error || state === "Error"
      ? "bg-rose-100 text-rose-800"
      : state.includes("Indexed")
        ? "bg-emerald-100 text-emerald-800"
        : state.includes("Discovered")
          ? "bg-amber-100 text-amber-800"
          : state.includes("Excluded") || state.includes("redirect")
            ? "bg-slate-100 text-slate-800"
            : state.includes("Crawled")
              ? "bg-blue-100 text-blue-800"
              : "bg-muted text-muted-foreground";
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${palette}`}>
      {state}
    </span>
  );
}

function VerdictBadge({
  verdict,
  icon: Icon,
}: {
  verdict?: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  if (!verdict) return <span className="text-xs text-muted-foreground">—</span>;
  if (verdict === "PASS" || verdict === "MOBILE_FRIENDLY") {
    return (
      <span title="Mobile-friendly">
        <CheckCircle2 className="h-4 w-4 text-emerald-600 inline" aria-hidden="true" />
      </span>
    );
  }
  if (verdict === "FAIL") {
    return (
      <span title="Mobile usability issue">
        <AlertCircle className="h-4 w-4 text-rose-600 inline" aria-hidden="true" />
      </span>
    );
  }
  return (
    <span title={verdict}>
      <Icon className="h-4 w-4 text-muted-foreground inline" aria-hidden="true" />
    </span>
  );
}

function SchemaBadge({
  rich,
}: {
  rich?: GscInspectResult["inspectionResult"] extends infer T
    ? T extends { richResultsResult?: infer R }
      ? R
      : undefined
    : undefined;
}) {
  if (!rich) return <span className="text-xs text-muted-foreground">—</span>;
  // GSC returns 0..N detected items
  const r = rich as { verdict?: string; detectedItems?: { richResultType?: string }[] };
  const types = r.detectedItems?.map((d) => d.richResultType).filter(Boolean) ?? [];
  if (r.verdict === "PASS" && types.length > 0) {
    return (
      <span
        className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-emerald-100 text-emerald-800"
        title={types.join(", ")}
      >
        <Eye className="h-3 w-3" aria-hidden="true" />
        {types.length}
      </span>
    );
  }
  if (r.verdict === "PARTIAL") {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800">
        Partial
      </span>
    );
  }
  return <span className="text-xs text-muted-foreground">—</span>;
}

function CanonicalBadge({ ok }: { ok: boolean | null }) {
  if (ok === null) return <span className="text-xs text-muted-foreground">—</span>;
  if (ok) {
    return (
      <span title="userCanonical matches googleCanonical">
        <CheckCircle2 className="h-4 w-4 text-emerald-600 inline" aria-hidden="true" />
      </span>
    );
  }
  return (
    <span title="userCanonical and googleCanonical differ — cannibalisation risk">
      <AlertCircle className="h-4 w-4 text-amber-600 inline" aria-hidden="true" />
    </span>
  );
}

function SummaryTile({
  label,
  value,
  total,
  tone,
}: {
  label: string;
  value: number;
  total: number;
  tone: "good" | "warn" | "bad" | "neutral";
}) {
  const palette = {
    good: "text-emerald-700",
    warn: "text-amber-700",
    bad: "text-rose-700",
    neutral: "text-muted-foreground",
  }[tone];
  const pct = total > 0 ? Math.round((value / total) * 100) : 0;
  return (
    <Card>
      <CardContent className="pt-6">
        <div className={`text-2xl font-bold ${palette}`}>
          {value}
          <span className="text-sm font-normal text-muted-foreground ml-2">
            / {total} ({pct}%)
          </span>
        </div>
        <div className="text-xs text-muted-foreground mt-1">{label}</div>
      </CardContent>
    </Card>
  );
}

function summarise(snapshot: DashboardSnapshot) {
  let indexed = 0,
    discovered = 0,
    errors = 0,
    other = 0;
  for (const p of snapshot.priorityUrls) {
    const url = priorityUrlFull(p);
    const entry = snapshot.urlInspectByUrl.get(url);
    if (entry?.error) errors += 1;
    else {
      const state =
        entry?.result?.inspectionResult?.indexStatusResult?.coverageState ?? "";
      if (state.includes("Indexed")) indexed += 1;
      else if (state.includes("Discovered")) discovered += 1;
      else other += 1;
    }
  }
  return { total: snapshot.priorityUrls.length, indexed, discovered, errors, other };
}

function groupByCategory(snapshot: DashboardSnapshot): Record<string, RowData[]> {
  const out: Record<string, RowData[]> = {};
  for (const p of snapshot.priorityUrls) {
    const fullUrl = priorityUrlFull(p);
    const entry = snapshot.urlInspectByUrl.get(fullUrl) ?? {
      result: null,
      error: null,
    };
    const row: RowData = {
      label: p.label,
      path: p.path,
      fullUrl,
      result: entry.result,
      error: entry.error,
    };
    (out[p.group] ??= []).push(row);
  }
  return out;
}
