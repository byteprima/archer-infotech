import Link from "next/link";
import { AlertTriangle, Bell, CalendarClock, ChevronLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { requireAdminPage } from "@/lib/admin";
import {
  getDueReminders,
  getMyNotifications,
} from "@/lib/actions/notifications";
import { leadStatusLabel } from "@/lib/leads/lifecycle";
import { formatPhone } from "@/lib/leads/phone";
import { MarkAllReadButton } from "@/components/admin/mark-all-read-button";

/**
 * Notifications, of two kinds.
 *
 * Reminders are derived live from follow-up dates; events are stored rows that
 * stay until read. The page shows reminders first — an overdue call is more
 * urgent than being told about an assignment you have already acted on.
 */

export const metadata = { title: "Notifications" };

function when(value: Date | null): string {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function ago(value: Date | null): string {
  if (!value) return "";
  const hours = (Date.now() - new Date(value).getTime()) / 36e5;
  if (hours < 1) return "just now";
  if (hours < 24) return `${Math.floor(hours)}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export default async function AdminNotificationsPage() {
  await requireAdminPage("/admin/notifications");

  const [stored, due] = await Promise.all([getMyNotifications(), getDueReminders()]);
  const unread = stored.filter((n) => !n.readAt).length;

  return (
    <div className="min-h-screen">
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-4">
          <div className="mb-2 flex items-center gap-4">
            <Link
              href="/admin/crm"
              className="flex items-center text-sm text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to CRM
            </Link>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h1 className="text-xl font-bold">Notifications</h1>
              <p className="text-sm text-muted-foreground">
                {due.overdue.length} overdue · {due.today.length} due today ·{" "}
                {unread} unread
              </p>
            </div>
            {unread > 0 && <MarkAllReadButton />}
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-4xl px-4 py-8">
        <section className="mb-8">
          <h2 className="mb-1 flex items-center gap-2 text-lg font-semibold">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            Overdue follow-ups
          </h2>
          <p className="mb-3 text-sm text-muted-foreground">
            Past their date and still open. Worked out live — nothing to dismiss.
          </p>
          {due.overdue.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-sm text-muted-foreground">
                Nothing overdue.
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-0">
                {due.overdue.map((row) => (
                  <Link
                    key={row.leadId}
                    href={`/admin/leads/${row.leadId}`}
                    className="flex flex-wrap items-center justify-between gap-2 border-b px-4 py-3 last:border-0 hover:bg-muted/50"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-medium">
                        {row.name}
                        <span className="ml-2 font-mono text-xs text-muted-foreground">
                          {row.enquiryNumber ?? `#${row.leadId}`}
                        </span>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatPhone(row.phone)} ·{" "}
                        {row.courseInterest || "No course stated"} · due{" "}
                        {when(row.followUpDate)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{leadStatusLabel(row.status)}</Badge>
                      {row.assignedTo && (
                        <span className="text-xs text-muted-foreground">
                          {row.assignedTo}
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>
          )}
        </section>

        <section className="mb-8">
          <h2 className="mb-1 flex items-center gap-2 text-lg font-semibold">
            <CalendarClock className="h-4 w-4" />
            Due today
          </h2>
          {due.today.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-sm text-muted-foreground">
                Nothing due today.
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-0">
                {due.today.map((row) => (
                  <Link
                    key={row.leadId}
                    href={`/admin/leads/${row.leadId}`}
                    className="flex flex-wrap items-center justify-between gap-2 border-b px-4 py-3 last:border-0 hover:bg-muted/50"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-medium">{row.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatPhone(row.phone)} ·{" "}
                        {row.courseInterest || "No course stated"}
                      </p>
                    </div>
                    <Badge variant="outline">{leadStatusLabel(row.status)}</Badge>
                  </Link>
                ))}
              </CardContent>
            </Card>
          )}
        </section>

        <section>
          <h2 className="mb-1 flex items-center gap-2 text-lg font-semibold">
            <Bell className="h-4 w-4" />
            Activity
          </h2>
          <p className="mb-3 text-sm text-muted-foreground">
            Leads assigned to you and demos booked for them.
          </p>
          {stored.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-sm text-muted-foreground">
                Nothing yet.
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-0">
                {stored.map((row) => (
                  <Link
                    key={row.id}
                    href={row.href ?? "/admin/leads"}
                    className={`flex flex-wrap items-start justify-between gap-2 border-b px-4 py-3 last:border-0 hover:bg-muted/50 ${
                      row.readAt ? "" : "bg-primary/5"
                    }`}
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">
                        {!row.readAt && (
                          <span className="mr-2 inline-block h-2 w-2 rounded-full bg-primary align-middle" />
                        )}
                        {row.title}
                      </p>
                      {row.body && (
                        <p className="text-xs text-muted-foreground">{row.body}</p>
                      )}
                    </div>
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {ago(row.createdAt)}
                    </span>
                  </Link>
                ))}
              </CardContent>
            </Card>
          )}
        </section>
      </main>
    </div>
  );
}
