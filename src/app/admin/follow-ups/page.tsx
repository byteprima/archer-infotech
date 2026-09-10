import Link from "next/link";
import { AlertTriangle, CalendarClock, CalendarDays } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { requireAdminPage } from "@/lib/admin";
import { getFollowUpQueues } from "@/lib/actions/follow-ups";
import { leadStatusLabel, leadPriorityLabel } from "@/lib/leads/lifecycle";

export const metadata = { title: "Follow-ups" };

/**
 * The counsellor's working screen: what is late, what is due today, what is
 * coming.
 *
 * Ordered overdue-first rather than chronologically overall. A queue exists
 * to answer "who have I let slip", and putting today's calls above last
 * week's misses buries exactly the thing that needs attention.
 *
 * Closed leads never appear here — see getFollowUpQueues.
 */

type Row = Awaited<ReturnType<typeof getFollowUpQueues>>["today"][number];

function formatWhen(value: Date | null): string {
  if (!value) return "—";
  return new Date(value).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const priorityColors: Record<string, string> = {
  HOT: "bg-red-100 text-red-800",
  WARM: "bg-amber-100 text-amber-800",
  COLD: "bg-sky-100 text-sky-800",
};

function Queue({
  title,
  hint,
  icon: Icon,
  rows,
  tone,
}: {
  title: string;
  hint: string;
  icon: typeof CalendarDays;
  rows: Row[];
  tone: string;
}) {
  return (
    <section className="mb-10">
      <div className="mb-3 flex items-center gap-2">
        <Icon className={`h-4 w-4 ${tone}`} />
        <h2 className="font-semibold">
          {title}{" "}
          <span className="text-muted-foreground">({rows.length})</span>
        </h2>
      </div>
      <p className="mb-3 text-sm text-muted-foreground">{hint}</p>

      {rows.length === 0 ? (
        <p className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
          Nothing here.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full min-w-[720px] text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th scope="col" className="p-3 text-left font-semibold">Due</th>
                <th scope="col" className="p-3 text-left font-semibold">Lead</th>
                <th scope="col" className="p-3 text-left font-semibold">Course</th>
                <th scope="col" className="p-3 text-left font-semibold">Status</th>
                <th scope="col" className="p-3 text-left font-semibold">Priority</th>
                <th scope="col" className="p-3 text-left font-semibold">Owner</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-t">
                  <td className="p-3 whitespace-nowrap tabular-nums">
                    {formatWhen(row.followUpDate)}
                  </td>
                  <td className="p-3">
                    <Link
                      href={`/admin/leads/${row.id}`}
                      className="font-medium text-primary hover:underline"
                    >
                      {row.name}
                    </Link>
                    <div className="text-xs text-muted-foreground">
                      {row.enquiryNumber ? `${row.enquiryNumber} · ` : ""}
                      {row.phone}
                    </div>
                  </td>
                  <td className="p-3 text-muted-foreground">
                    {row.courseInterest || "—"}
                  </td>
                  <td className="p-3">{leadStatusLabel(row.status)}</td>
                  <td className="p-3">
                    {row.priority ? (
                      <Badge className={priorityColors[row.priority] || ""}>
                        {leadPriorityLabel(row.priority)}
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="p-3 text-muted-foreground">
                    {row.assignedTo || "Unassigned"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default async function FollowUpsPage() {
  await requireAdminPage("/admin/follow-ups");
  const { overdue, today, upcoming } = await getFollowUpQueues();

  return (
    <div className="min-h-screen bg-muted/20">
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-xl font-bold">Follow-ups</h1>
          <p className="text-sm text-muted-foreground">
            Everything with a scheduled contact, closed leads excluded.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Queue
          title="Overdue"
          hint="Past their scheduled date. These come first for a reason."
          icon={AlertTriangle}
          rows={overdue}
          tone="text-red-600"
        />
        <Queue
          title="Today"
          hint="Due before midnight."
          icon={CalendarDays}
          rows={today}
          tone="text-primary"
        />
        <Queue
          title="Upcoming"
          hint="Scheduled from tomorrow onwards."
          icon={CalendarClock}
          rows={upcoming}
          tone="text-muted-foreground"
        />
      </main>
    </div>
  );
}
