import Link from "next/link";
import {
  ChevronLeft,
  Plus,
  Calendar,
  Users,
  MapPin,
  Monitor,
  Clock3,
  Layers3,
  GraduationCap,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { requireAdminPage } from "@/lib/admin";
import { getAdminBatches } from "@/lib/actions/batches";
import { DeleteBatchButton } from "@/components/admin/batch-actions";
import { BATCH_MODE, BATCH_STATUS, type BatchMode, type BatchStatus } from "@/db/schema";

interface AdminBatchesPageProps {
  searchParams: Promise<{ status?: string; mode?: string }>;
}

const statusClasses: Record<string, string> = {
  upcoming: "bg-green-100 text-green-800",
  ongoing: "bg-blue-100 text-blue-800",
  completed: "bg-slate-100 text-slate-800",
  cancelled: "bg-red-100 text-red-800",
};

function buildFilterHref(params: { status?: string; mode?: string }) {
  const searchParams = new URLSearchParams();

  if (params.status) {
    searchParams.set("status", params.status);
  }

  if (params.mode) {
    searchParams.set("mode", params.mode);
  }

  const query = searchParams.toString();
  return query ? `/admin/batches?${query}` : "/admin/batches";
}

export default async function AdminBatchesPage({ searchParams }: AdminBatchesPageProps) {
  await requireAdminPage();

  const params = await searchParams;
  const status = BATCH_STATUS.includes(params.status as BatchStatus)
    ? (params.status as BatchStatus)
    : "all";
  const mode = BATCH_MODE.includes(params.mode as BatchMode)
    ? (params.mode as BatchMode)
    : "all";

  const { batches, stats } = await getAdminBatches({
    status,
    mode,
  });

  const statusFilters = [
    { label: "All", value: "all" },
    { label: "Upcoming", value: "upcoming" },
    { label: "Ongoing", value: "ongoing" },
    { label: "Completed", value: "completed" },
    { label: "Cancelled", value: "cancelled" },
  ];

  const modeFilters = [
    { label: "All Modes", value: "all" },
    { label: "Offline", value: "offline" },
    { label: "Online", value: "online" },
  ];

  const hasFilters = status !== "all" || mode !== "all";

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
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold">Batch Management</h1>
              <p className="text-sm text-muted-foreground">
                {stats.filteredCount} showing{hasFilters ? ` of ${stats.totalCount} total` : ""} batches
              </p>
            </div>
            <Link href="/admin/batches/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add New Batch
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Layers3 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.totalCount}</p>
                  <p className="text-sm text-muted-foreground">Total batches</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                  <Calendar className="h-5 w-5 text-green-700" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.statusCounts.upcoming}</p>
                  <p className="text-sm text-muted-foreground">Upcoming</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                  <Clock3 className="h-5 w-5 text-blue-700" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.statusCounts.ongoing}</p>
                  <p className="text-sm text-muted-foreground">Ongoing</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/20">
                  <GraduationCap className="h-5 w-5 text-secondary-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.modeCounts.online}</p>
                  <p className="text-sm text-muted-foreground">Online batches</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Filters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="mb-2 text-sm font-medium text-muted-foreground">Status</p>
              <div className="flex flex-wrap gap-2">
                {statusFilters.map((filter) => {
                  const active = status === filter.value;
                  return (
                    <Link
                      key={filter.value}
                      href={buildFilterHref({
                        status: filter.value === "all" ? undefined : filter.value,
                        mode: mode === "all" ? undefined : mode,
                      })}
                    >
                      <Button variant={active ? "default" : "outline"} size="sm">
                        {filter.label}
                      </Button>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="mb-2 text-sm font-medium text-muted-foreground">Mode</p>
              <div className="flex flex-wrap gap-2">
                {modeFilters.map((filter) => {
                  const active = mode === filter.value;
                  return (
                    <Link
                      key={filter.value}
                      href={buildFilterHref({
                        status: status === "all" ? undefined : status,
                        mode: filter.value === "all" ? undefined : filter.value,
                      })}
                    >
                      <Button variant={active ? "default" : "outline"} size="sm">
                        {filter.label}
                      </Button>
                    </Link>
                  );
                })}
              </div>
            </div>

            {hasFilters && (
              <Link href="/admin/batches">
                <Button variant="ghost" size="sm">
                  Reset filters
                </Button>
              </Link>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Batch Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            {batches.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-muted-foreground">
                  {hasFilters ? "No batches match the selected filters" : "No batches found"}
                </p>
                <Link href="/admin/batches/new" className="mt-4 inline-block">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create First Batch
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {batches.map((batch) => (
                  <Card key={batch.id} className="transition-shadow hover:shadow-lg">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <CardTitle className="text-lg">{batch.courseName}</CardTitle>
                          <p className="text-sm text-muted-foreground">/{batch.courseSlug}</p>
                        </div>
                        <Badge className={statusClasses[batch.status] || ""}>{batch.status}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span>Starts: {new Date(batch.startDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock3 className="h-4 w-4 text-primary" />
                        <span>{batch.timing}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        {batch.mode === "offline" ? (
                          <MapPin className="h-4 w-4 text-primary" />
                        ) : (
                          <Monitor className="h-4 w-4 text-primary" />
                        )}
                        <span className="capitalize">{batch.mode}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4 text-primary" />
                        <span>
                          {batch.seatsAvailable} / {batch.totalSeats} seats available
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">{batch.duration}</Badge>
                        {batch.instructor && <Badge variant="outline">{batch.instructor}</Badge>}
                      </div>
                      {batch.location && batch.mode === "offline" && (
                        <p className="text-sm text-muted-foreground">{batch.location}</p>
                      )}
                      {batch.meetingLink && batch.mode === "online" && (
                        <a
                          href={batch.meetingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline"
                        >
                          Open meeting link
                        </a>
                      )}
                      <div className="flex gap-2 pt-2">
                        <Link href={`/admin/batches/${batch.id}/edit`} className="flex-1">
                          <Button variant="outline" size="sm" className="w-full">
                            Edit
                          </Button>
                        </Link>
                        <DeleteBatchButton id={batch.id} label={batch.courseName} compact />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {!process.env.DATABASE_URL && (
          <div className="mt-8 rounded-lg border border-blue-200 bg-blue-50 p-4">
            <p className="text-sm text-blue-700">
              <strong>Note:</strong> Database is not configured. Batch records will not be persisted until
              the database connection is available.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
