/**
 * Admin → SEO Dashboard
 *
 * Two tabs in v1: Overview + Search Performance. CWV / Schema / AI
 * tabs deferred to v2 once the v1 surface has been used in anger.
 */
import Link from "next/link";
import { LogOut, ChevronLeft, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { requireAdminPage } from "@/lib/admin";
import { loadDashboardSnapshot } from "@/lib/seo-dashboard/load";
import { getSeoApiConfig } from "@/lib/seo-dashboard/auth";
import { OverviewTab } from "./_components/overview-tab";
import { SearchPerformanceTab } from "./_components/search-performance-tab";
import { IndexationTab } from "./_components/indexation-tab";
import { CwvTab } from "./_components/cwv-tab";
import { SchemaTab } from "./_components/schema-tab";
import { CitationsTab } from "./_components/citations-tab";
import { SetupRequired } from "./_components/setup-required";

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

  const snapshot = await loadDashboardSnapshot({ force });

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
                Refresh
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
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-8 flex-wrap">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="search">Search Performance</TabsTrigger>
            <TabsTrigger value="indexation">Indexation</TabsTrigger>
            <TabsTrigger value="cwv">Core Web Vitals</TabsTrigger>
            <TabsTrigger value="schema">Schema</TabsTrigger>
            <TabsTrigger value="citations">AI Citations</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <OverviewTab snapshot={snapshot} />
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
            GSC delay 3 days · PSI 24h cache · CrUX 28-day rolling window
          </span>
        </footer>
      </main>
    </div>
  );
}
