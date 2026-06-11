/**
 * Loading placeholder for the SEO Dashboard data area. Rendered both
 * as the route-level loading.tsx (during navigation) and as the
 * <Suspense> fallback while loadDashboardSnapshot() streams in. Keeps
 * the tab shell visible so the click feels instant instead of hanging.
 */
export function DashboardSkeleton() {
  return (
    <div className="animate-pulse" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading live SEO data…</span>

      {/* KPI cards row */}
      <div className="grid grid-cols-2 gap-4 mb-8 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-lg border p-4">
            <div className="h-3 w-20 rounded bg-muted" />
            <div className="mt-3 h-7 w-24 rounded bg-muted" />
            <div className="mt-2 h-3 w-16 rounded bg-muted" />
          </div>
        ))}
      </div>

      {/* Content block */}
      <div className="space-y-3">
        <div className="h-4 w-40 rounded bg-muted" />
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-10 w-full rounded bg-muted/70" />
        ))}
      </div>
    </div>
  );
}
