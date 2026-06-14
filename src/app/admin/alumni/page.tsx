import Link from "next/link";
import {
  ChevronLeft,
  GraduationCap,
  Users,
  Sparkles,
  Handshake,
  Eye,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getAllAlumni } from "@/lib/actions/alumni";
import { requireAdminPage } from "@/lib/admin";
import {
  SmallBox,
  BoxCard,
  ContentHeader,
  StatusPill,
} from "@/components/admin/admin-lte";

function fmtDate(d: Date | null) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function initials(name: string) {
  return name
    .replace(/[^a-zA-Z ]/g, "")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() || "")
    .join("");
}

export default async function AdminAlumniPage() {
  await requireAdminPage();
  const { rows, totalCount, newCount, publishedCount } = await getAllAlumni();
  const referralCount = rows.filter(
    (r) => r.openToReferrals || r.companyHiring
  ).length;

  return (
    <div className="min-h-screen bg-muted/20">
      <ContentHeader
        title="Alumni Submissions"
        subtitle="Review alumni from the shared /alumni link · approve to publish testimonials · private data stays here"
        breadcrumb={
          <Link
            href="/admin"
            className="flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Dashboard
          </Link>
        }
      />

      <main className="container mx-auto px-4 py-6">
        {/* KPI small-boxes */}
        <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <SmallBox value={totalCount} label="Total alumni" icon={Users} color="blue" />
          <SmallBox value={newCount} label="New / unreviewed" icon={Sparkles} color="yellow" />
          <SmallBox value={publishedCount} label="Published" icon={GraduationCap} color="green" />
          <SmallBox value={referralCount} label="Referral / hiring offers" icon={Handshake} color="purple" />
        </div>

        <BoxCard title="All submissions" icon={Users} color="blue" className="p-0">
          {rows.length === 0 ? (
            <div className="py-16 text-center text-muted-foreground">
              <GraduationCap className="mx-auto mb-3 h-10 w-10 opacity-40" />
              No alumni submissions yet. Share the{" "}
              <code className="rounded bg-muted px-1">/alumni</code> link to
              start collecting.
            </div>
          ) : (
            <div className="-m-5 overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/60 text-left text-xs uppercase tracking-wide text-muted-foreground">
                  <tr>
                    <th className="px-5 py-3 font-medium">Alumnus</th>
                    <th className="px-5 py-3 font-medium">Company / Role</th>
                    <th className="px-5 py-3 font-medium">Package</th>
                    <th className="px-5 py-3 font-medium">Offers</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                    <th className="px-5 py-3 font-medium">Submitted</th>
                    <th className="px-5 py-3 text-right font-medium">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {rows.map((a) => (
                    <tr key={a.id} className="transition-colors hover:bg-muted/40">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                            {initials(a.name)}
                          </span>
                          <div className="min-w-0">
                            <div className="truncate font-medium">{a.name}</div>
                            <div className="truncate text-xs text-muted-foreground">
                              {a.city || a.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <div>{a.currentCompany || "—"}</div>
                        <div className="text-xs text-muted-foreground">
                          {a.currentRole || ""}
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        {a.packageBand ? (
                          <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                            {a.packageBand}
                          </span>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex flex-wrap gap-1">
                          {a.lookingForJobChange && (
                            <Badge className="bg-amber-100 text-amber-700 text-xs">Job change</Badge>
                          )}
                          {a.openToReferrals && (
                            <Badge variant="secondary" className="text-xs">Refers</Badge>
                          )}
                          {a.companyHiring && (
                            <Badge variant="secondary" className="text-xs">Hiring</Badge>
                          )}
                          {a.consentDisplayPublic && (
                            <Badge variant="outline" className="text-xs">Public OK</Badge>
                          )}
                          {!a.lookingForJobChange && !a.openToReferrals && !a.companyHiring && !a.consentDisplayPublic && (
                            <span className="text-xs text-muted-foreground">—</span>
                          )}
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <StatusPill status={a.status} />
                      </td>
                      <td className="px-5 py-3 text-muted-foreground">
                        {fmtDate(a.createdAt)}
                      </td>
                      <td className="px-5 py-3 text-right">
                        <Link
                          href={`/admin/alumni/${a.id}`}
                          className="inline-flex items-center gap-1 rounded-md border px-3 py-1.5 text-xs font-medium hover:bg-muted"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          Review
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </BoxCard>
      </main>
    </div>
  );
}
