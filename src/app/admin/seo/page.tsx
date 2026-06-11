/**
 * Admin → SEO Dashboard
 *
 * The header shell renders instantly; the live GSC/PSI/CrUX data is
 * fetched inside a <Suspense> boundary so the page streams in rather
 * than blocking the whole navigation on ~50 external API calls.
 *
 * PSI (PageSpeed Insights) is the slow part — 30-60s per URL — so it
 * is only pulled when the user explicitly hits Refresh (?refresh=1).
 * A normal tab click serves cached PSI (if any) and skips the live run.
 */
import { Suspense } from "react";
import Link from "next/link";
import { LogOut, ChevronLeft, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { requireAdminPage } from "@/lib/admin";
import { loadDashboardSnapshot } from "@/lib/seo-dashboard/load";
import { getSeoApiConfig } from "@/lib/seo-dashboard/auth";
import { getDailyHistory, getKeywordHistory } from "@/lib/seo-dashboard/history";
import { geoGridStatus } from "@/lib/seo-dashboard/geo-grid";
import { OverviewTab } from "./_components/overview-tab";
import { SearchPerformanceTab } from "./_components/search-performance-tab";
import { RankingsTab } from "./_components/rankings-tab";
import { TrendsTab } from "./_components/trends-tab";
import { IndexationTab } from "./_components/indexation-tab";
import { CwvTab } from "./_components/cwv-tab";
import { SchemaTab } from "./_components/schema-tab";
import { CitationsTab } from "./_components/citations-tab";
import { SetupRequired } from "./_components/setup-required";
import { DashboardSkeleton } from "./_components/dashboard-skeleton";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "SEO Dashboard | Archer Infotech Admin",
};

interface PageProps {
  searchParams: Promise<{ refresh?: string }>;
}

export default async function SeoDashboardPage({ searchParams }: PageProps) {
  await requireAdminPage();
  const params = await searchParams;
  const force = params.refresh === "1";

  const cfg = getSeoApiConfig();
  if (!cfg.hasPsiCrux && !cfg.hasGscOauth) {
    return <SetupRequired />;
  }

  return (
    <div className="min-h-screen">
      <header className="bg-background border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back
            </Link>
            <div className="border-l h-8 mx-2" />
            <div>
              <h1 className="text-xl font-bold">SEO Dashboard</h1>
              <p className="text-sm text-muted-foreground">
                Live data from GSC + PSI + CrUX
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/admin/seo?refresh=1">
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                {force ? "Refreshing…" : "Refresh (re-run PSI)"}
              </Button>
            </Link>
            <form action="/api/admin/logout" method="POST">
              <Button variant="outline" size="sm" type="submit">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </form>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/*
          The slow data fetch lives inside <Suspense>, so the shell above
          paints immediately and the skeleton streams until the snapshot
          is ready. `force` is part of the Suspense key path via the URL,
          so a Refresh re-runs the body with live PSI.
        */}
        <Suspense fallback={<DashboardSkeleton />}>
          <DashboardBody force={force} />
        </Suspense>
      </main>
    </div>
  );
}

/**
 * Async server component that performs the actual data pull. Isolated
 * from the page shell so its latency is absorbed by the <Suspense>
 * boundary rather than blocking the whole route render.
 */
async function DashboardBody({ force }: { force: boolean }) {
  // Skip the slow PSI pulls on a normal tab click; only re-run them
  // when the user explicitly asks for a refresh.
  const snapshot = await loadDashboardSnapshot({ force, skipPsi: !force });

  // Time-series + tracker reads (cheap local DB queries; empty until the
  // daily snapshot job has run).
  const [history, keywords] = await Promise.all([
    getDailyHistory(90).catch(() => []),
    getKeywordHistory(90).catch(() => []),
  ]);
  const geo = geoGridStatus();

  return (
    <>
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-8 flex-wrap">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="rankings">Rankings</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="search">Search Performance</TabsTrigger>
          <TabsTrigger value="indexation">Indexation</TabsTrigger>
          <TabsTrigger value="cwv">Core Web Vitals</TabsTrigger>
          <TabsTrigger value="schema">Schema</TabsTrigger>
          <TabsTrigger value="citations">AI Citations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <OverviewTab snapshot={snapshot} history={history} />
        </TabsContent>

        <TabsContent value="rankings">
          <RankingsTab snapshot={snapshot} />
        </TabsContent>

        <TabsContent value="trends">
          <TrendsTab history={history} keywords={keywords} geo={geo} />
        </TabsContent>

        <TabsContent value="search">
          <SearchPerformanceTab snapshot={snapshot} />
        </TabsContent>

        <TabsContent value="indexation">
          <IndexationTab snapshot={snapshot} />
        </TabsContent>

        <TabsContent value="cwv">
          <CwvTab snapshot={snapshot} />
        </TabsContent>

        <TabsContent value="schema">
          <SchemaTab snapshot={snapshot} />
        </TabsContent>

        <TabsContent value="citations">
          <CitationsTab />
        </TabsContent>
      </Tabs>

      <footer className="mt-12 pt-6 border-t text-xs text-muted-foreground flex items-center justify-between">
        <span>
          Snapshot {snapshot.fetchedAt.toLocaleString("en-IN")} ·{" "}
          {snapshot.cacheStats.hits} cache hits / {snapshot.cacheStats.misses} fresh
        </span>
        <span>
          GSC delay 3 days · PSI on Refresh only · CrUX 28-day rolling window
        </span>
      </footer>
    </>
  );
}
