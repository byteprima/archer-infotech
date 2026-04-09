import Link from "next/link";
import { ChevronLeft, ClipboardList } from "lucide-react";
import { desc } from "drizzle-orm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { db } from "@/db";
import { auditLogs } from "@/db/schema";
import { requireAdminPage } from "@/lib/admin";

function formatMetadata(metadata: string | null) {
  if (!metadata) {
    return null;
  }

  try {
    return JSON.stringify(JSON.parse(metadata), null, 2);
  } catch {
    return metadata;
  }
}

export default async function AdminAuditLogsPage() {
  await requireAdminPage();

  const logs = await db.select().from(auditLogs).orderBy(desc(auditLogs.createdAt)).limit(100);

  return (
    <div className="min-h-screen">
      <header className="bg-background border-b">
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
          <div>
            <h1 className="text-xl font-bold">Audit Logs</h1>
            <p className="text-sm text-muted-foreground">
              Recent administrative changes across the dashboard
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {logs.length === 0 ? (
              <div className="py-12 text-center">
                <ClipboardList className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />
                <p className="text-muted-foreground">No audit logs yet.</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Entries will appear here as admins make changes.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {logs.map((log) => (
                  <div
                    key={log.id}
                    className="rounded-xl border border-border/80 bg-card p-4 shadow-sm"
                  >
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant="outline">{log.entityType}</Badge>
                          <Badge className="bg-blue-100 text-blue-800">{log.action}</Badge>
                        </div>
                        <p className="font-medium">{log.summary}</p>
                        <p className="text-sm text-muted-foreground">
                          {log.actorLabel}
                          {log.entityId ? ` • ${log.entityType} #${log.entityId}` : ""}
                        </p>
                        {log.metadata && (
                          <pre className="overflow-x-auto rounded-lg bg-muted p-3 text-xs text-muted-foreground">
                            {formatMetadata(log.metadata)}
                          </pre>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(log.createdAt).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
