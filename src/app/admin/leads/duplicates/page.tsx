import Link from "next/link";
import { ChevronLeft, Copy } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { requireAdminPage } from "@/lib/admin";
import { getDuplicateGroups, findLeadsByPhone } from "@/lib/actions/lead-duplicates";
import { leadStatusLabel } from "@/lib/leads/lifecycle";
import { formatPhone } from "@/lib/leads/phone";

/**
 * Numbers with more than one enquiry against them.
 *
 * Derived on every load rather than stored, so a group vanishes as soon as the
 * extras are closed as Duplicate. Nothing here merges or deletes: which course
 * interest, counsellor and follow-up history survives a merge is a judgement
 * made by reading both, and closing one as Duplicate already records why.
 */

export const metadata = { title: "Possible duplicates" };

function when(value: Date | null): string {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default async function DuplicateLeadsPage() {
  await requireAdminPage("/admin/leads/duplicates");

  const groups = await getDuplicateGroups();
  const detailed = await Promise.all(
    groups.slice(0, 50).map(async (group) => ({
      group,
      leads: await findLeadsByPhone(group.phoneNormalised),
    })),
  );

  return (
    <div className="min-h-screen">
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-4">
          <div className="mb-2 flex items-center gap-4">
            <Link
              href="/admin/leads"
              className="flex items-center text-sm text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to Leads
            </Link>
          </div>
          <h1 className="text-xl font-bold">Possible Duplicates</h1>
          <p className="text-sm text-muted-foreground">
            {groups.length === 0
              ? "No number has more than one enquiry against it."
              : `${groups.length} number${groups.length === 1 ? "" : "s"} with more than one enquiry`}
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {groups.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Copy className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Nothing to review.</p>
            </CardContent>
          </Card>
        ) : (
          <>
            <p className="mb-6 max-w-2xl rounded-md border bg-muted/40 p-3 text-sm text-muted-foreground">
              Repeat enquiries are normal and are not automatically wrong — the
              same person asking again months later is a warmer lead than a
              stranger. Close one as <strong>Duplicate</strong> from its Pipeline
              panel only when it is genuinely the same enquiry twice.
            </p>
            <div className="space-y-6">
              {detailed.map(({ group, leads }) => (
                <Card key={group.phoneNormalised}>
                  <CardContent className="p-0">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b bg-muted/50 px-4 py-3">
                      <p className="font-medium">
                        {formatPhone(group.phoneNormalised)}
                        <span className="ml-2 font-mono text-xs text-muted-foreground">
                          {group.phoneNormalised}
                        </span>
                      </p>
                      <Badge variant="outline">{group.count} enquiries</Badge>
                    </div>
                    <table className="w-full text-sm">
                      <tbody>
                        {leads.map((lead) => (
                          <tr key={lead.id} className="border-b last:border-0">
                            <td className="px-4 py-3">
                              <Link
                                href={`/admin/leads/${lead.id}`}
                                className="font-medium hover:underline"
                              >
                                {lead.name}
                              </Link>
                              <div className="font-mono text-xs text-muted-foreground">
                                {lead.enquiryNumber ?? `#${lead.id}`}
                              </div>
                            </td>
                            <td className="px-4 py-3 text-muted-foreground">
                              {lead.courseInterest || "No course stated"}
                            </td>
                            <td className="px-4 py-3 text-muted-foreground">
                              {when(lead.createdAt)}
                            </td>
                            <td className="px-4 py-3">
                              <Badge variant="outline">
                                {leadStatusLabel(lead.status)}
                              </Badge>
                            </td>
                            <td className="px-4 py-3 text-right">
                              <Link href={`/admin/leads/${lead.id}`}>
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
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
