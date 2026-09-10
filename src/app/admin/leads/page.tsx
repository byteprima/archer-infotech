import Link from "next/link";
import {
  Blend,
  Briefcase,
  Building2,
  ChevronLeft,
  CircleDashed,
  Download,
  GraduationCap,
  type LucideIcon,
  Monitor,
  Plus,
  Search,
} from "lucide-react";
import { and, desc, eq, isNull, like, or } from "drizzle-orm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { requireAdminPage } from "@/lib/admin";
import { db } from "@/db";
import { leads as leadsTable } from "@/db/schema";
import {
  leadStatusLabel,
  leadPriorityLabel,
  LEAD_PRIORITIES,
  LEAD_PRIORITY_LABELS,
  LEAD_STATUSES,
  LEAD_STATUS_LABELS,
} from "@/lib/leads/lifecycle";
import { getCurrentRole, getCurrentUser } from "@/lib/auth";
import { canViewAllLeads } from "@/lib/leads/roles";
import { getAssignableStaff } from "@/lib/actions/lead-assignment";
import {
  LEAD_SOURCE_TABS,
  DEFAULT_LEAD_SOURCE_TAB,
  buildSourceCondition,
} from "@/lib/leads/source-filter";
import { DeleteLeadButton } from "@/components/admin/delete-lead-button";
import { MODE_PREFERENCE_LABELS } from "@/components/forms/mode-preference-field";

type LeadRow = typeof leadsTable.$inferSelect;

/**
 * Badge colour per lifecycle status.
 *
 * Grouped by where the lead is rather than by giving thirteen statuses
 * thirteen hues: in progress reads blue, positive signals green, the closed
 * outcomes grey, and the disqualifying ones red. A counsellor scanning the
 * list is looking for "is this alive", not for a specific stage.
 */
const priorityColors: Record<string, string> = {
  HOT: "bg-red-100 text-red-800",
  WARM: "bg-amber-100 text-amber-800",
  COLD: "bg-sky-100 text-sky-800",
};

const statusColors: Record<string, string> = {
  NEW: "bg-green-100 text-green-800",
  CONTACTED: "bg-blue-100 text-blue-800",
  COUNSELLING: "bg-blue-100 text-blue-800",
  FOLLOW_UP: "bg-blue-100 text-blue-800",
  DEMO_SCHEDULED: "bg-indigo-100 text-indigo-800",
  DEMO_ATTENDED: "bg-indigo-100 text-indigo-800",
  INTERESTED: "bg-emerald-100 text-emerald-800",
  ADMISSION_CONFIRMED: "bg-emerald-200 text-emerald-900",
  NOT_INTERESTED: "bg-gray-100 text-gray-800",
  LOST: "bg-gray-100 text-gray-800",
  NO_RESPONSE: "bg-gray-100 text-gray-800",
  INVALID: "bg-red-100 text-red-800",
  DUPLICATE: "bg-red-100 text-red-800",
};

/**
 * Delivery format and background get a column each rather than a line tucked
 * under the course. They were folded in when they were curiosities; they are
 * now the two things a counsellor sorts the day's callbacks by — a fresher
 * asking for classroom is a different call, at a different time, from a
 * working professional asking for weekend online — and a value you have to
 * read row by row is a value nobody scans.
 *
 * Rendered as icon pills, deliberately uncoloured: `status` is the only thing
 * in this table that earns colour, and a third and fourth tinted badge per row
 * would leave nothing standing out. The icon carries the scanning instead.
 */
const MODE_META: Record<string, { icon: LucideIcon; label: string; title?: string }> = {
  Online: { icon: Monitor, label: "Online" },
  // Stored as "Offline"; shown short, with the full phrasing on hover, because
  // The full label is too wide for a column in a ten-column table, so the
  // cell abbreviates and the tooltip carries it in full.
  Offline: { icon: Building2, label: "Offline", title: MODE_PREFERENCE_LABELS.Offline },
  Hybrid: { icon: Blend, label: "Hybrid" },
  "No preference": { icon: CircleDashed, label: "No preference" },
};

const EXPERIENCE_META: Record<string, { icon: LucideIcon; label: string; title?: string }> = {
  Fresher: {
    icon: GraduationCap,
    label: "Fresher",
    title: "Fresher (student / no IT experience)",
  },
  Experienced: {
    icon: Briefcase,
    label: "Experienced",
    title: "Experienced (working professional)",
  },
};

/** Shared cell padding. The outer columns sit flush with the card edges. */
const CELL = "px-3 py-4 align-top first:pl-0 last:pr-0";
const HEAD =
  "px-3 pb-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground first:pl-0 last:pr-0";

function AttributeCell({
  value,
  meta,
}: {
  value: string | null;
  meta: Record<string, { icon: LucideIcon; label: string; title?: string }>;
}) {
  if (!value) {
    // Em dash, not a blank: an empty cell in a wide table reads as a rendering
    // fault. Leads captured before these questions existed have no answer.
    return <span className="text-sm text-muted-foreground">&mdash;</span>;
  }

  // Unrecognised values still render — a legacy spelling is information, and
  // silently dropping it would hide the drift rather than show it.
  const entry = meta[value];
  const Icon = entry?.icon;

  return (
    <span
      title={entry?.title}
      className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2 py-0.5 text-xs"
    >
      {Icon && <Icon className="h-3 w-3 shrink-0 text-muted-foreground" />}
      {entry?.label ?? value}
    </span>
  );
}

function LeadsTable({ leads, showCourse = true }: { leads: LeadRow[]; showCourse?: boolean }) {
  return (
    <div className="overflow-x-auto">
      {/* Nine columns do not fit a laptop; the min-width makes the scroll
          honest rather than crushing every column to illegibility. */}
      <table className="w-full min-w-[1160px]">
        <thead>
          <tr className="border-b">
            <th className={HEAD}>Name</th>
            <th className={HEAD}>Contact</th>
            {showCourse && <th className={HEAD}>Course</th>}
            <th className={HEAD}>Mode of Learning</th>
            <th className={HEAD}>Fresher / Experienced</th>
            <th className={HEAD}>Source</th>
            <th className={HEAD}>Status</th>
            <th className={HEAD}>Priority</th>
            <th className={HEAD}>Date</th>
            <th className={HEAD}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr
              key={lead.id}
              // Tracing one row across nine columns by eye is the failure mode
              // a wide table has; the hover tint is what prevents it.
              className="border-b transition-colors last:border-0 hover:bg-muted/40"
            >
              <td className={CELL}>
                <div className="font-medium">{lead.name}</div>
              </td>
              <td className={CELL}>
                <div className="text-sm">{lead.email}</div>
                <div className="text-sm text-muted-foreground">{lead.phone}</div>
              </td>
              {showCourse && (
                <td className={CELL}>
                  <div className="text-sm">{lead.courseInterest || "-"}</div>
                </td>
              )}
              <td className={CELL}>
                <AttributeCell value={lead.modePreference} meta={MODE_META} />
              </td>
              <td className={CELL}>
                <AttributeCell value={lead.experienceLevel} meta={EXPERIENCE_META} />
              </td>
              <td className={CELL}>
                <div className="whitespace-nowrap text-sm capitalize">
                  {lead.source?.replace("_", " ") || "-"}
                </div>
              </td>
              <td className={CELL}>
                <Badge className={statusColors[lead.status] || ""}>
                  {leadStatusLabel(lead.status)}
                </Badge>
              </td>
              <td className="py-4">

                {lead.priority ? (

                  <Badge className={priorityColors[lead.priority] || ""}>

                    {leadPriorityLabel(lead.priority)}

                  </Badge>

                ) : (

                  <span className="text-sm text-muted-foreground">—</span>

                )}

              </td>
              <td className={CELL}>
                <div className="whitespace-nowrap text-sm text-muted-foreground">
                  {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : "-"}
                </div>
              </td>
              <td className={CELL}>
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
  searchParams: Promise<{
    q?: string;
    status?: string;
    source?: string;
    view?: string;
    priority?: string;
    owner?: string;
  }>;
}

export default async function AdminLeadsPage({ searchParams }: AdminLeadsPageProps) {
  await requireAdminPage("/admin/leads");

  const params = await searchParams;
  const query = params.q?.trim() || "";
  const status = params.status?.trim() || "";
  // Defaults to the first tab. The four tabs are exhaustive, so landing on
  // one of them hides nothing that another does not show.
  const source = params.source?.trim() || DEFAULT_LEAD_SOURCE_TAB;
  const priorityFilter = params.priority?.trim() || "";
  // "unassigned" is a value, not the absence of one — filtering for leads
  // nobody owns is the question a manager actually asks.
  const ownerFilter = params.owner?.trim() || "";
  const view = params.view === "course" ? "course" : "list";

  const conditions = [];

  if (query) {
    const searchTerm = `%${query}%`;
    conditions.push(
      or(
        like(leadsTable.name, searchTerm),
        like(leadsTable.email, searchTerm),
        like(leadsTable.phone, searchTerm),
        // Course was not searchable, which made the single most useful
        // question — "who asked about Java Full Stack" — impossible to answer
        // from this screen. Mode preference rides along for free: it is the
        // other thing a counsellor filters on.
        like(leadsTable.courseInterest, searchTerm),
        like(leadsTable.modePreference, searchTerm),
        like(leadsTable.experienceLevel, searchTerm)
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

  if (priorityFilter) {
    conditions.push(eq(leadsTable.priority, priorityFilter));
  }

  if (ownerFilter === "unassigned") {
    conditions.push(isNull(leadsTable.assignedToUserId));
  } else if (ownerFilter) {
    conditions.push(eq(leadsTable.assignedToUserId, ownerFilter));
  }

  /**
   * A counsellor sees only their own leads.
   *
   * Applied here rather than trusted to the UI: this is the one place the
   * list query is built, so there is no route that returns another
   * counsellor's leads by passing a different query string.
   */
  const staff = await getAssignableStaff();
  const viewerRole = await getCurrentRole();
  const viewer = await getCurrentUser();
  if (!canViewAllLeads(viewerRole)) {
    const viewerId =
      viewer && "id" in viewer && typeof viewer.id === "string" ? viewer.id : null;
    conditions.push(
      viewerId
        ? eq(leadsTable.assignedToUserId, viewerId)
        : // No user row (the legacy shared login) — show nothing rather than
          // everything, so a missing identity cannot widen access.
          isNull(leadsTable.id),
    );
  }

  // Preserve the active search + status + view when switching source tabs.
  const tabHref = (sourceKey: string) => {
    const sp = new URLSearchParams({
      ...(query ? { q: query } : {}),
      ...(status ? { status } : {}),
      ...(sourceKey ? { source: sourceKey } : {}),
      ...(priorityFilter ? { priority: priorityFilter } : {}),
      ...(ownerFilter ? { owner: ownerFilter } : {}),
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
      ...(priorityFilter ? { priority: priorityFilter } : {}),
      ...(ownerFilter ? { owner: ownerFilter } : {}),
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
                    placeholder="Search by name, email, phone, course, mode, or fresher/experienced..."
                    className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              <select
                name="status"
                defaultValue={status}
                className="px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {/* These were the old lowercase values; after the lifecycle
                    migration the filter matched nothing at all. */}
                <option value="">All Status</option>
                {LEAD_STATUSES.map((value) => (
                  <option key={value} value={value}>
                    {LEAD_STATUS_LABELS[value]}
                  </option>
                ))}
              </select>

              <select
                name="priority"
                defaultValue={priorityFilter}
                className="px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">All Priority</option>
                {LEAD_PRIORITIES.map((value) => (
                  <option key={value} value={value}>
                    {LEAD_PRIORITY_LABELS[value]}
                  </option>
                ))}
              </select>

              {/* Only offered to roles that can see other people's leads —
                  a counsellor's list is already scoped to their own. */}
              {canViewAllLeads(viewerRole) && (
                <select
                  name="owner"
                  defaultValue={ownerFilter}
                  className="px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">All counsellors</option>
                  <option value="unassigned">Unassigned</option>
                  {staff.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.name}
                    </option>
                  ))}
                </select>
              )}
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
