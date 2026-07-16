import Link from "next/link";
import { ChevronLeft, Download, Plus, Search } from "lucide-react";
import { and, desc, eq, like, or } from "drizzle-orm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { requireAdminPage } from "@/lib/admin";
import { db } from "@/db";
import { leads as leadsTable } from "@/db/schema";
import { LEAD_SOURCE_TABS, buildSourceCondition } from "@/lib/leads/source-filter";
import { DeleteLeadButton } from "@/components/admin/delete-lead-button";

type LeadRow = typeof leadsTable.$inferSelect;

const statusColors: Record<string, string> = {
  new: "bg-green-100 text-green-800",
  contacted: "bg-blue-100 text-blue-800",
  qualified: "bg-purple-100 text-purple-800",
  converted: "bg-yellow-100 text-yellow-800",
  closed: "bg-gray-100 text-gray-800",
};

function LeadsTable({ leads, showCourse = true }: { leads: LeadRow[]; showCourse?: boolean }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b text-left">
            <th className="pb-3 font-medium">Name</th>
            <th className="pb-3 font-medium">Contact</th>
            {showCourse && <th className="pb-3 font-medium">Course</th>}
            <th className="pb-3 font-medium">Source</th>
            <th className="pb-3 font-medium">Status</th>
            <th className="pb-3 font-medium">Date</th>
            <th className="pb-3 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id} className="border-b last:border-0">
              <td className="py-4">
                <div className="font-medium">{lead.name}</div>
              </td>
              <td className="py-4">
                <div className="text-sm">{lead.email}</div>
                <div className="text-sm text-muted-foreground">{lead.phone}</div>
              </td>
              {showCourse && (
                <td className="py-4">
                  <div className="text-sm">{lead.courseInterest || "-"}</div>
                </td>
              )}
              <td className="py-4">
                <div className="text-sm capitalize">
                  {lead.source?.replace("_", " ") || "-"}
                </div>
              </td>
              <td className="py-4">
                <Badge className={statusColors[lead.status] || ""}>{lead.status}</Badge>
              </td>
              <td className="py-4">
                <div className="text-sm text-muted-foreground">
                  {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : "-"}
                </div>
              </td>
              <td className="py-4">
                <div className="flex items-center gap-2">
                  <Link href={`/admin/leads/${lead.id}`}>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </Link>
                  <DeleteLeadButton
                    id={lead.id}
                    name={lead.name}
                    courseInterest={lead.courseInterest}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface AdminLeadsPageProps {
  searchParams: Promise<{ q?: string; status?: string; source?: string; view?: string }>;
}

export default async function AdminLeadsPage({ searchParams }: AdminLeadsPageProps) {
  await requireAdminPage();

  const params = await searchParams;
  const query = params.q?.trim() || "";
  const status = params.status?.trim() || "";
  const source = params.source?.trim() || "";
  const view = params.view === "course" ? "course" : "list";

  const conditions = [];

  if (query) {
    const searchTerm = `%${query}%`;
    conditions.push(
      or(
        like(leadsTable.name, searchTerm),
        like(leadsTable.email, searchTerm),
        like(leadsTable.phone, searchTerm)
      )
    );
  }

  if (status) {
    conditions.push(eq(leadsTable.status, status));
  }

  const sourceCondition = buildSourceCondition(source);
  if (sourceCondition) {
    conditions.push(sourceCondition);
  }

  // Preserve the active search + status + view when switching source tabs.
  const tabHref = (sourceKey: string) => {
    const sp = new URLSearchParams({
      ...(query ? { q: query } : {}),
      ...(status ? { status } : {}),
      ...(sourceKey ? { source: sourceKey } : {}),
      ...(view === "course" ? { view } : {}),
    }).toString();
    return sp ? `/admin/leads?${sp}` : "/admin/leads";
  };

  // Preserve all active filters when switching between list / by-course view.
  const viewHref = (viewKey: "list" | "course") => {
    const sp = new URLSearchParams({
      ...(query ? { q: query } : {}),
      ...(status ? { status } : {}),
      ...(source ? { source } : {}),
      ...(viewKey === "course" ? { view: "course" } : {}),
    }).toString();
    return sp ? `/admin/leads?${sp}` : "/admin/leads";
  };

  const leads = await db
    .select()
    .from(leadsTable)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(desc(leadsTable.createdAt));

  // Group enquiries by course for the "By Course" view. Uncategorised
  // enquiries fall under a shared "Not specified" bucket, and groups are
  // ordered by volume (largest first) so busy courses — and any duplicate
  // clusters within them — surface at the top.
  const courseGroups = (() => {
    const map = new Map<string, LeadRow[]>();
    for (const lead of leads) {
      const key = lead.courseInterest?.trim() || "Not specified";
      const bucket = map.get(key);
      if (bucket) bucket.push(lead);
      else map.set(key, [lead]);
    }
    return Array.from(map.entries()).sort((a, b) => b[1].length - a[1].length);
  })();

  const exportQuery = new URLSearchParams({
    ...(query ? { q: query } : {}),
    ...(status ? { status } : {}),
    ...(source ? { source } : {}),
  }).toString();
  const exportHref = exportQuery ? `/admin/leads/export?${exportQuery}` : "/admin/leads/export";

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-background border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4 mb-2">
            <Link
              href="/admin"
              className="flex items-center text-sm text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Dashboard
            </Link>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">Leads Management</h1>
              <p className="text-sm text-muted-foreground">
                {leads.length} total leads
              </p>
            </div>
            <div className="flex items-center gap-2">
              <a href={exportHref}>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
              </a>
              <Link href="/admin/leads/new">
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Lead
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* View toggle — flat list vs grouped by course */}
        <div className="mb-4 inline-flex rounded-lg border p-1">
          <Link
            href={viewHref("list")}
            className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
              view === "list"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            All Leads
          </Link>
          <Link
            href={viewHref("course")}
            className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
              view === "course"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            By Course
          </Link>
        </div>

        {/* Source tabs */}
        <div className="mb-6 flex flex-wrap gap-2 border-b">
          {LEAD_SOURCE_TABS.map((tab) => {
            const isActive = source === tab.key;
            return (
              <Link
                key={tab.key || "all"}
                href={tabHref(tab.key)}
                className={`-mb-px border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <form className="flex flex-wrap gap-4">
              {/* Keep the active source tab when filtering by search/status. */}
              {source && <input type="hidden" name="source" value={source} />}
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    name="q"
                    type="text"
                    defaultValue={query}
                    placeholder="Search by name, email, or phone..."
                    className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              <select
                name="status"
                defaultValue={status}
                className="px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">All Status</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="qualified">Qualified</option>
                <option value="converted">Converted</option>
                <option value="closed">Closed</option>
              </select>
              <Button type="submit" variant="outline">
                Apply
              </Button>
              {(query || status || source) && (
                <Link href="/admin/leads">
                  <Button type="button" variant="ghost">
                    Clear
                  </Button>
                </Link>
              )}
            </form>
          </CardContent>
        </Card>

        {/* Leads — flat list or grouped by course */}
        {leads.length === 0 ? (
          <Card>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-muted-foreground">No leads found</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Leads will appear here when visitors submit the contact form
                </p>
              </div>
            </CardContent>
          </Card>
        ) : view === "course" ? (
          <div className="space-y-6">
            {courseGroups.map(([course, groupLeads]) => (
              <Card key={course}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{course}</span>
                    <Badge variant="secondary">
                      {groupLeads.length}{" "}
                      {groupLeads.length === 1 ? "enquiry" : "enquiries"}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <LeadsTable leads={groupLeads} showCourse={false} />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Recent Leads</CardTitle>
            </CardHeader>
            <CardContent>
              <LeadsTable leads={leads} />
            </CardContent>
          </Card>
        )}

      </main>
    </div>
  );
}
