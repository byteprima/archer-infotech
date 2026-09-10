import Link from "next/link";
import { ChevronLeft, Plus, Building2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getAllDrives } from "@/lib/actions/placement-drives";
import { requireAdminPage } from "@/lib/admin";

export default async function AdminPlacementDrivesPage() {
  await requireAdminPage();
  const drives = await getAllDrives();
  const published = drives.filter((d) => d.isPublished).length;

  return (
    <div className="min-h-screen">
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft className="h-4 w-4" /> Dashboard
            </Link>
            <h1 className="text-2xl font-bold mt-1">Placement drives</h1>
            <p className="text-sm text-muted-foreground">
              {drives.length} total · {published} published
            </p>
          </div>
          <Link href="/admin/placement-drives/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" /> New drive
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {drives.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              <Building2 className="mx-auto mb-3 h-8 w-8 opacity-50" />
              <p>No drives recorded yet.</p>
              <p className="mt-1 text-sm">
                Add the companies that have run drives here — completed ones
                with their outcomes are the strongest entries.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {drives.map((d) => (
              <Card key={d.id}>
                <CardContent className="flex items-center justify-between gap-4 py-4">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold">{d.company}</span>
                      <Badge variant="outline" className="text-xs">
                        {d.status}
                      </Badge>
                      {!d.isPublished && (
                        <Badge variant="secondary" className="text-xs">
                          Draft
                        </Badge>
                      )}
                      {d.allowJobPostingSchema && (
                        <Badge className="text-xs">JobPosting schema on</Badge>
                      )}
                    </div>
                    <p className="mt-0.5 truncate text-sm text-muted-foreground">
                      {d.role}
                      {d.driveDate ? ` · ${d.driveDate}` : ""}
                      {typeof d.studentsSelected === "number"
                        ? ` · ${d.studentsSelected} selected`
                        : ""}
                    </p>
                  </div>
                  <Link href={`/admin/placement-drives/${d.id}`}>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
