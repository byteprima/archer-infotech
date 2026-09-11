import Link from "next/link";
import { ChevronLeft, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { requireAdminPage } from "@/lib/admin";
import { getHottestLeads } from "@/lib/actions/lead-scoring";
import { leadStatusLabel, leadPriorityLabel } from "@/lib/leads/lifecycle";
import { formatPhone } from "@/lib/leads/phone";
import { SCORE_BAND_LABELS } from "@/lib/crm/lead-score";

/**
 * Who to call first.
 *
 * Scores are computed on read, so this list is never stale. It is bounded to
 * the open leads rather than the whole table — a ranking of everybody ever is
 * not a working list.
 */

export const metadata = { title: "Priority leads" };

const BAND_COLORS: Record<string, string> = {
  HOT: "bg-red-100 text-red-800",
  WARM: "bg-amber-100 text-amber-800",
  COLD: "bg-sky-100 text-sky-800",
};

export default async function HotLeadsPage() {
  await requireAdminPage("/admin/crm/hot");
  const rows = await getHottestLeads(25);

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
          <h1 className="text-xl font-bold">Priority Leads</h1>
          <p className="text-sm text-muted-foreground">
            Ranked by what each person actually did — demos attended, batches
            asked about, conversations had. Worked out fresh on every load.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {rows.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <TrendingUp className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">No open leads to rank.</p>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="overflow-x-auto p-0">
              <table className="w-full text-sm">
                <thead className="border-b bg-muted/50 text-left">
                  <tr>
                    <th className="px-4 py-3 font-medium">Score</th>
                    <th className="px-4 py-3 font-medium">Lead</th>
                    <th className="px-4 py-3 font-medium">Course</th>
                    <th className="px-4 py-3 font-medium">Why</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Your priority</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.leadId} className="border-b last:border-0">
                      <td className="whitespace-nowrap px-4 py-3">
                        <span className="mr-2 text-lg font-bold tabular-nums">
                          {row.score.score}
                        </span>
                        <Badge className={BAND_COLORS[row.score.band] ?? ""}>
                          {SCORE_BAND_LABELS[row.score.band]}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <Link
                          href={`/admin/leads/${row.leadId}`}
                          className="font-medium hover:underline"
                        >
                          {row.name}
                        </Link>
                        <div className="text-xs text-muted-foreground">
                          {formatPhone(row.phone)}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {row.courseInterest || "—"}
                      </td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">
                        {row.score.reasons
                          .slice(0, 2)
                          .map((r) => r.label)
                          .join(" · ") || "—"}
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant="outline">{leadStatusLabel(row.status)}</Badge>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {leadPriorityLabel(row.priority)}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Link href={`/admin/leads/${row.leadId}`}>
                          <Button variant="outline" size="sm">
                            Open
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
