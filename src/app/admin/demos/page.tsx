import Link from "next/link";
import { CalendarPlus, ChevronLeft, MonitorPlay, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { requireAdminPage } from "@/lib/admin";
import { getAdminDemoSessions } from "@/lib/actions/demo-sessions";
import { DEMO_SESSION_STATUS } from "@/db/schema";

/**
 * Demo sessions.
 *
 * A demo has to exist here before anyone can be registered onto it from a
 * lead — the lead page offers scheduled, future sessions and nothing else.
 */

export const metadata = { title: "Demo sessions" };

const STATUS_COLORS: Record<string, string> = {
  scheduled: "bg-blue-100 text-blue-800",
  completed: "bg-emerald-100 text-emerald-800",
  cancelled: "bg-gray-100 text-gray-700",
};

const STATUS_LABELS: Record<string, string> = {
  scheduled: "Scheduled",
  completed: "Completed",
  cancelled: "Cancelled",
};

const MODE_LABELS: Record<string, string> = {
  offline: "Offline (Classroom)",
  online: "Online",
  hybrid: "Hybrid",
};

const TABS = [
  { key: "upcoming", label: "Upcoming" },
  { key: "past", label: "Past" },
  { key: "all", label: "All" },
] as const;

function formatWhen(value: Date | null): string {
  if (!value) return "—";
  return new Date(value).toLocaleString("en-IN", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function AdminDemosPage({
  searchParams,
}: {
  searchParams: Promise<{ when?: string; status?: string }>;
}) {
  await requireAdminPage("/admin/demos");

  const params = await searchParams;
  const when = (TABS.find((t) => t.key === params.when)?.key ??
    "upcoming") as "upcoming" | "past" | "all";
  const status = (DEMO_SESSION_STATUS as readonly string[]).includes(
    params.status ?? "",
  )
    ? params.status
    : undefined;

  const rows = await getAdminDemoSessions({ when, status });

  return (
    <div className="min-h-screen">
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-4">
          <div className="mb-2 flex items-center gap-4">
            <Link
              href="/admin"
              className="flex items-center text-sm text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to Dashboard
            </Link>
          </div>
          <div className="flex items-center justify-between gap-3">
            <div>
              <h1 className="text-xl font-bold">Demo Sessions</h1>
              <p className="text-sm text-muted-foreground">
                {rows.length} {when === "upcoming" ? "upcoming" : when === "past" ? "past" : "total"}
              </p>
            </div>
            <Link href="/admin/demos/new">
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Schedule Demo
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6 flex flex-wrap gap-2">
          {TABS.map((tab) => (
            <Link key={tab.key} href={`/admin/demos?when=${tab.key}`}>
              <Button variant={when === tab.key ? "default" : "outline"} size="sm">
                {tab.label}
              </Button>
            </Link>
          ))}
        </div>

        {rows.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <MonitorPlay className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                No demo sessions {when === "past" ? "in the past" : "scheduled"}.
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Leads can only be registered for a demo that exists here.
              </p>
              <Link href="/admin/demos/new">
                <Button size="sm" className="mt-4">
                  <CalendarPlus className="mr-2 h-4 w-4" />
                  Schedule the first one
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="overflow-x-auto p-0">
              <table className="w-full text-sm">
                <thead className="border-b bg-muted/50 text-left">
                  <tr>
                    <th className="px-4 py-3 font-medium">When</th>
                    <th className="px-4 py-3 font-medium">Course</th>
                    <th className="px-4 py-3 font-medium">Mode</th>
                    <th className="px-4 py-3 font-medium">Trainer</th>
                    <th className="px-4 py-3 text-right font-medium">Registered</th>
                    <th className="px-4 py-3 text-right font-medium">Attended</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => {
                    const full =
                      row.capacity !== null && Number(row.registered) >= row.capacity;
                    return (
                      <tr key={row.id} className="border-b last:border-0">
                        <td className="whitespace-nowrap px-4 py-3">
                          {formatWhen(row.scheduledAt)}
                        </td>
                        <td className="px-4 py-3">
                          {row.courseName}
                          {row.batchName && (
                            <div className="text-xs text-muted-foreground">
                              {row.batchName}
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">
                          {MODE_LABELS[row.mode] ?? row.mode}
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">
                          {row.trainer ?? "—"}
                        </td>
                        <td className="px-4 py-3 text-right tabular-nums">
                          {row.registered}
                          {row.capacity !== null && (
                            <span className="text-muted-foreground"> / {row.capacity}</span>
                          )}
                          {full && (
                            <Badge className="ml-2 bg-amber-100 text-amber-800">Full</Badge>
                          )}
                        </td>
                        <td className="px-4 py-3 text-right tabular-nums">{row.attended}</td>
                        <td className="px-4 py-3">
                          <Badge className={STATUS_COLORS[row.status] ?? ""}>
                            {STATUS_LABELS[row.status] ?? row.status}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <Link href={`/admin/demos/${row.id}/edit`}>
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
