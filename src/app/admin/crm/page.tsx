import Link from "next/link";
import {
  CalendarClock,
  CalendarDays,
  ChevronLeft,
  Copy,
  GraduationCap,
  LineChart,
  MonitorPlay,
  Plus,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { requireAdminPage } from "@/lib/admin";
import { getCrmOverview } from "@/lib/actions/crm-overview";
import { getCurrentRole } from "@/lib/auth";
import { canAccessAdminPath } from "@/lib/leads/roles";

/**
 * Lead & Enquiry CRM — one entry point for everything the four phases built.
 *
 * The dashboard had six separate cards for this (Leads, Follow-ups, Demos,
 * Batches, Admissions, Reports) scattered among content and SEO tiles, so the
 * pipeline read as six unrelated tools rather than one thing.
 *
 * Grouped by where a person is in the pipeline, not by which phase shipped the
 * feature — the phases are our history, not the counsellor's mental model.
 *
 * Every link is filtered by the same rule that guards the page it points at, so
 * a counsellor is not offered a destination that will bounce them.
 */

export const metadata = { title: "Lead & Enquiry CRM" };

interface Facility {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  stat: string;
  /** Shown as a red pill when non-zero: something needs doing today. */
  attention?: number;
  action?: { label: string; href: string };
}

function Group({
  title,
  blurb,
  facilities,
}: {
  title: string;
  blurb: string;
  facilities: Facility[];
}) {
  if (facilities.length === 0) return null;
  return (
    <section className="mb-8">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mb-4 text-sm text-muted-foreground">{blurb}</p>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {facilities.map((facility) => (
          <Card key={facility.href} className="flex h-full flex-col">
            <CardContent className="flex flex-1 flex-col gap-3 p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <facility.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold">{facility.title}</h3>
                </div>
                {facility.attention ? (
                  <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800">
                    {facility.attention}
                  </span>
                ) : null}
              </div>
              <p className="text-sm text-muted-foreground">{facility.description}</p>
              <p className="mt-auto text-sm font-medium tabular-nums">{facility.stat}</p>
              <div className="flex flex-wrap gap-2">
                <Link href={facility.href}>
                  <Button size="sm" variant="outline">
                    Open
                  </Button>
                </Link>
                {facility.action && (
                  <Link href={facility.action.href}>
                    <Button size="sm" variant="ghost">
                      <Plus className="mr-1 h-3.5 w-3.5" />
                      {facility.action.label}
                    </Button>
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default async function AdminCrmPage() {
  await requireAdminPage("/admin/crm");

  const [stats, role] = await Promise.all([getCrmOverview(), getCurrentRole()]);
  const allowed = (f: Facility) => canAccessAdminPath(role, f.href);

  const capture: Facility[] = [
    {
      title: "Leads",
      description:
        "Every enquiry, with status, priority, owner and the four intent tabs.",
      href: "/admin/leads",
      icon: Users,
      stat: `${stats.leads.total} total · ${stats.leads.new} new · ${stats.leads.hot} hot`,
      action: { label: "Add lead", href: "/admin/leads/new" },
    },
    {
      title: "Possible duplicates",
      description:
        "Numbers with more than one enquiry. Repeat enquiries are kept, never merged automatically.",
      href: "/admin/leads/duplicates",
      icon: Copy,
      stat:
        stats.duplicates === 0
          ? "Nothing to review"
          : `${stats.duplicates} number${stats.duplicates === 1 ? "" : "s"} to review`,
      attention: stats.duplicates,
    },
  ];

  const work: Facility[] = [
    {
      title: "Follow-ups",
      description:
        "The call queue: overdue, due today and upcoming. Closed leads stay out of it.",
      href: "/admin/follow-ups",
      icon: CalendarClock,
      stat: `${stats.followUps.overdue} overdue · ${stats.followUps.today} today`,
      attention: stats.followUps.overdue,
    },
    {
      title: "Demo sessions",
      description:
        "Trial classes. A demo must exist here before a lead can be registered for it.",
      href: "/admin/demos",
      icon: MonitorPlay,
      stat: `${stats.demos.upcoming} upcoming`,
      action: { label: "Schedule", href: "/admin/demos/new" },
    },
    {
      title: "Batches",
      description: "Course batches leads express interest in and admissions join.",
      href: "/admin/batches",
      icon: CalendarDays,
      stat: `${stats.batches.upcoming} upcoming`,
      action: { label: "New batch", href: "/admin/batches/new" },
    },
  ];

  const outcome: Facility[] = [
    {
      title: "Admissions",
      description:
        "Enquiries that became students, with fees, payment status and batch.",
      href: "/admin/admissions",
      icon: GraduationCap,
      stat: `${stats.admissions.total} total · ${stats.admissions.thisMonth} this month`,
    },
    {
      title: "Reports",
      description:
        "Course, source, counsellor, lost leads and conversion — with CSV export.",
      href: "/admin/reports",
      icon: LineChart,
      stat: `${stats.conversion}% conversion this month`,
    },
  ];

  return (
    <div className="min-h-screen">
      <header className="border-b bg-background">
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
          <h1 className="text-xl font-bold">Lead &amp; Enquiry CRM</h1>
          <p className="text-sm text-muted-foreground">
            {stats.leads.today} enquir{stats.leads.today === 1 ? "y" : "ies"} today ·{" "}
            {stats.followUps.overdue} overdue follow-up
            {stats.followUps.overdue === 1 ? "" : "s"} · {stats.admissions.thisMonth}{" "}
            admission{stats.admissions.thisMonth === 1 ? "" : "s"} this month
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Group
          title="Capture"
          blurb="Enquiries arriving from the website, the phone and walk-ins."
          facilities={capture.filter(allowed)}
        />
        <Group
          title="Work the pipeline"
          blurb="What a counsellor does between an enquiry and a decision."
          facilities={work.filter(allowed)}
        />
        <Group
          title="Outcome"
          blurb="Who joined, on what terms, and what the numbers say."
          facilities={outcome.filter(allowed)}
        />
      </main>
    </div>
  );
}
