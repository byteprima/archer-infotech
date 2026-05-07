import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Target, FileText, Search } from "lucide-react";
import type { DashboardSnapshot } from "@/lib/seo-dashboard/load";
import type { GscRow } from "@/lib/seo-dashboard/gsc";

interface Props {
  snapshot: DashboardSnapshot;
}

/**
 * Search Performance tab — three sub-tabs on top GSC data:
 *   - Top pages (by clicks last 28d)
 *   - Top queries (by clicks last 28d)
 *   - Almost there (position 8-15, 100+ impressions — highest ROI)
 */
export function SearchPerformanceTab({ snapshot }: Props) {
  const pages = snapshot.gscPages28d.result?.rows ?? [];
  const queries = snapshot.gscQueries28d.result?.rows ?? [];

  const almostThere = pages
    .filter((r) => r.position >= 8 && r.position <= 15 && r.impressions >= 50)
    .sort((a, b) => b.impressions - a.impressions);

  return (
    <div className="space-y-6">
      <Tabs defaultValue="pages">
        <TabsList>
          <TabsTrigger value="pages">
            <FileText className="h-4 w-4 mr-2" />
            Top Pages
          </TabsTrigger>
          <TabsTrigger value="queries">
            <Search className="h-4 w-4 mr-2" />
            Top Queries
          </TabsTrigger>
          <TabsTrigger value="almost">
            <Target className="h-4 w-4 mr-2" />
            Almost There ({almostThere.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pages" className="mt-6">
          {snapshot.gscPages28d.error ? (
            <ErrorCard error={snapshot.gscPages28d.error} />
          ) : pages.length === 0 ? (
            <EmptyState message="No page data available for the last 28 days." />
          ) : (
            <DataTable
              rows={pages}
              keyLabel="Page"
              keyFormatter={(r) => urlPath(r.keys[0])}
              keyTitle={(r) => r.keys[0]}
              maxRows={50}
            />
          )}
        </TabsContent>

        <TabsContent value="queries" className="mt-6">
          {snapshot.gscQueries28d.error ? (
            <ErrorCard error={snapshot.gscQueries28d.error} />
          ) : queries.length === 0 ? (
            <EmptyState message="No query data available for the last 28 days." />
          ) : (
            <DataTable
              rows={queries}
              keyLabel="Query"
              keyFormatter={(r) => r.keys[0]}
              keyTitle={(r) => r.keys[0]}
              maxRows={50}
            />
          )}
        </TabsContent>

        <TabsContent value="almost" className="mt-6">
          <Card className="mb-4 bg-blue-50/40 border-blue-200">
            <CardContent className="pt-4 pb-4">
              <p className="text-sm">
                <strong>Pages ranking positions 8-15 with 50+ impressions</strong> — your
                highest-leverage SEO targets. Small content / internal-link tweaks
                can push these onto page 1. Add 3-5 contextual internal links from
                related pages (P5-09 / P5-28 / P4-13 patterns).
              </p>
            </CardContent>
          </Card>
          {almostThere.length === 0 ? (
            <EmptyState message="No 'almost there' pages right now — every page is either on page 1 or below position 15." />
          ) : (
            <DataTable
              rows={almostThere}
              keyLabel="Page"
              keyFormatter={(r) => urlPath(r.keys[0])}
              keyTitle={(r) => r.keys[0]}
              maxRows={20}
              highlightPosition
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

// ---------------------------------------------------------------------
// Pieces
// ---------------------------------------------------------------------

function DataTable({
  rows,
  keyLabel,
  keyFormatter,
  keyTitle,
  maxRows,
  highlightPosition = false,
}: {
  rows: GscRow[];
  keyLabel: string;
  keyFormatter: (r: GscRow) => string;
  keyTitle: (r: GscRow) => string;
  maxRows: number;
  highlightPosition?: boolean;
}) {
  return (
    <div className="overflow-x-auto rounded-lg border bg-background">
      <table className="w-full text-sm">
        <thead className="bg-muted/50 border-b">
          <tr>
            <th className="text-left p-3 font-semibold">{keyLabel}</th>
            <th className="text-right p-3 font-semibold w-24">Clicks</th>
            <th className="text-right p-3 font-semibold w-28">Impressions</th>
            <th className="text-right p-3 font-semibold w-20">CTR</th>
            <th className="text-right p-3 font-semibold w-24">Position</th>
          </tr>
        </thead>
        <tbody>
          {rows.slice(0, maxRows).map((r, i) => {
            const positionBadge = highlightPosition
              ? r.position <= 10
                ? "bg-emerald-100 text-emerald-800"
                : "bg-amber-100 text-amber-800"
              : "";
            return (
              <tr key={i} className="border-b last:border-b-0 hover:bg-muted/30">
                <td className="p-3">
                  <div
                    className="font-mono text-xs truncate max-w-md"
                    title={keyTitle(r)}
                  >
                    {keyFormatter(r)}
                  </div>
                </td>
                <td className="p-3 text-right font-medium">
                  {r.clicks.toLocaleString("en-IN")}
                </td>
                <td className="p-3 text-right text-muted-foreground">
                  {r.impressions.toLocaleString("en-IN")}
                </td>
                <td className="p-3 text-right text-muted-foreground">
                  {(r.ctr * 100).toFixed(1)}%
                </td>
                <td className="p-3 text-right">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${
                      positionBadge || "text-muted-foreground"
                    }`}
                  >
                    {r.position.toFixed(1)}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <Card>
      <CardContent className="pt-12 pb-12 text-center">
        <p className="text-sm text-muted-foreground">{message}</p>
      </CardContent>
    </Card>
  );
}

function ErrorCard({ error }: { error: string }) {
  return (
    <Card className="border-rose-200 bg-rose-50/40">
      <CardContent className="pt-6">
        <p className="text-sm font-semibold text-rose-900 mb-1">
          Failed to fetch GSC data
        </p>
        <p className="text-xs font-mono text-rose-800">{error}</p>
      </CardContent>
    </Card>
  );
}

/**
 * Strip the origin from a GSC page URL so the table cell isn't dominated
 * by the protocol+host. Keeps full URL in the title attribute for hover.
 */
function urlPath(url: string): string {
  try {
    const u = new URL(url);
    return u.pathname + u.search;
  } catch {
    return url;
  }
}
