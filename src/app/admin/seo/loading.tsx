/**
 * Route-level loading UI for /admin/seo. Next.js shows this instantly
 * on navigation while the server component resolves, so clicking the
 * "SEO Dashboard" tab paints a skeleton immediately instead of leaving
 * the user on a blank/frozen page while live API data is fetched.
 */
import { DashboardSkeleton } from "./_components/dashboard-skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen">
      <header className="bg-background border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-xl font-bold">SEO Dashboard</h1>
          <p className="text-sm text-muted-foreground">Loading live data…</p>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <DashboardSkeleton />
      </main>
    </div>
  );
}
