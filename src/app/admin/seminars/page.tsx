import Link from "next/link";
import { ChevronLeft, Plus, Presentation } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getAllSeminars } from "@/lib/actions/seminars";
import { requireAdminPage } from "@/lib/admin";

export default async function AdminSeminarsPage() {
  await requireAdminPage();
  const sessions = await getAllSeminars();
  const published = sessions.filter((s) => s.isPublished).length;

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
            <h1 className="text-2xl font-bold mt-1">Seminars &amp; sessions</h1>
            <p className="text-sm text-muted-foreground">
              {sessions.length} total · {published} published
            </p>
          </div>
          <Link href="/admin/seminars/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Record session
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {sessions.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              <Presentation className="mx-auto mb-3 h-8 w-8 opacity-50" />
              <p>No sessions recorded yet.</p>
              <p className="mt-1 text-sm">
                Add past corporate training and college seminars — host, month,
                topic and rough headcount is enough to start.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {sessions.map((s) => (
              <Card key={s.id}>
                <CardContent className="flex items-center justify-between gap-4 py-4">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold">{s.hostOrganisation}</span>
                      <Badge variant="outline" className="text-xs">
                        {s.hostType}
                      </Badge>
                      {!s.isPublished && (
                        <Badge variant="secondary" className="text-xs">
                          Draft
                        </Badge>
                      )}
                    </div>
                    <p className="mt-0.5 truncate text-sm text-muted-foreground">
                      {s.topic}
                      {s.heldOn ? ` · ${s.heldOn}` : ""}
                      {typeof s.attendees === "number" ? ` · ~${s.attendees} attendees` : ""}
                    </p>
                  </div>
                  <Link href={`/admin/seminars/${s.id}`}>
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
