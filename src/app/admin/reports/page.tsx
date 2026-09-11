import Link from "next/link";
import { ChevronLeft, Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { requireAdminPage } from "@/lib/admin";
import {
  getCampaignReport,
  getCounsellorReport,
  getCourseReport,
  getDashboardCharts,
  getDashboardMetrics,
  getEnquiryReport,
  getFollowUpReport,
  getLostLeadReport,
  getSourceReport,
} from "@/lib/actions/reports";
import { isRangePreset, type RangePreset } from "@/lib/reports/date-range";
import { formatPaise } from "@/lib/admissions/money";
import { leadStatusLabel, lossReasonLabel } from "@/lib/leads/lifecycle";
import {
  BarList,
  ChartCard,
  ConversionTrend,
  DailyLine,
} from "@/components/admin/reports/charts";
import { RangePicker } from "./_components/range-picker";

/**
 * Admin → Reports.
 *
 * Six reports over one shared date range, which lives in the query string so a
 * view can be bookmarked and sent to somebody else.
 *
 * Every table can be exported as CSV at the range currently on screen — the
 * export links carry the same query string, so what downloads is what is being
 * looked at rather than a different default.
 */

export const metadata = { title: "Reports" };

interface ReportsPageProps {
  searchParams: Promise<{ preset?: string; from?: string; to?: string }>;
}

function Section({
  title,
  description,
  exportHref,
  children,
}: {
  title: string;
  description: string;
  exportHref?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-8">
      <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        {exportHref && (
          <a href={exportHref}>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              CSV
            </Button>
          </a>
        )}
      </div>
      {children}
    </section>
  );
}

function Table({
  head,
  children,
}: {
  head: readonly string[];
  children: React.ReactNode;
}) {
  return (
    <Card>
      <CardContent className="overflow-x-auto p-0">
        <table className="w-full text-sm">
          <thead className="border-b bg-muted/50 text-left">
            <tr>
              {head.map((cell, i) => (
                <th
                  key={cell}
                  className={`px-4 py-3 font-medium ${i === 0 ? "" : "text-right"}`}
                >
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </CardContent>
    </Card>
  );
}

function Empty({ colSpan }: { colSpan: number }) {
  return (
    <tr>
      <td colSpan={colSpan} className="px-4 py-8 text-center text-sm text-muted-foreground">
        Nothing in this period.
      </td>
    </tr>
  );
}

function Metric({
  label,
  value,
  hint,
}: {
  label: string;
  value: string | number;
  hint?: string;
}) {
  return (
    <div className="rounded-lg border bg-card p-4">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-bold tabular-nums">{value}</p>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

export default async function AdminReportsPage({ searchParams }: ReportsPageProps) {
  await requireAdminPage("/admin/reports");

  const params = await searchParams;
  const rangeInput = {
    preset: params.preset ?? null,
    from: params.from ?? null,
    to: params.to ?? null,
  };

  const [
    metrics,
    charts,
    courses,
    sources,
    counsellors,
    lost,
    followUp,
    enquiries,
    campaigns,
  ] = await Promise.all([
      getDashboardMetrics(rangeInput),
      getDashboardCharts(rangeInput),
      getCourseReport(rangeInput),
      getSourceReport(rangeInput),
      getCounsellorReport(rangeInput),
      getLostLeadReport(rangeInput),
      getFollowUpReport(rangeInput),
      getEnquiryReport(rangeInput),
      getCampaignReport(rangeInput),
    ]);

  const range = metrics.range;
  const qs = new URLSearchParams();
  qs.set("preset", range.preset);
  if (params.from) qs.set("from", params.from);
  if (params.to) qs.set("to", params.to);
  const exportHref = (report: string) =>
    `/admin/reports/export?report=${report}&${qs.toString()}`;

  const preset: RangePreset = isRangePreset(params.preset) ? params.preset : "30d";

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
          <h1 className="text-xl font-bold">Reports</h1>
          <p className="text-sm text-muted-foreground">
            {range.label} · {range.from.toLocaleDateString("en-IN")} to{" "}
            {range.to.toLocaleDateString("en-IN")}
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <RangePicker preset={preset} from={params.from ?? ""} to={params.to ?? ""} />
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Metric label="Enquiries" value={metrics.rangeEnquiries} hint={range.label} />
          <Metric
            label="Admissions"
            value={metrics.rangeAdmissions}
            hint="From enquiries in this period"
          />
          <Metric
            label="Conversion rate"
            value={`${metrics.conversionRate}%`}
            hint="Admissions ÷ enquiries"
          />
          <Metric
            label="Overdue follow-ups"
            value={metrics.overdueFollowUps}
            hint="Right now, all periods"
          />
        </div>

        <div className="mb-10 grid gap-4 lg:grid-cols-2">
          <ChartCard title="Enquiries by date">
            <DailyLine series={charts.enquiriesByDate} />
          </ChartCard>
          <ChartCard
            title="Lead conversion trend"
            hint="Each day's enquiries and how many of them converted"
          >
            <ConversionTrend series={charts.conversionTrend} />
          </ChartCard>
          <ChartCard title="Enquiries by course" hint="Top 10, as stated on the enquiry">
            <BarList rows={charts.enquiriesByCourse} />
          </ChartCard>
          <ChartCard title="Enquiries by source">
            <BarList rows={charts.enquiriesBySource} />
          </ChartCard>
          <ChartCard title="Lead status distribution">
            <BarList rows={charts.statusDistribution} />
          </ChartCard>
          <ChartCard title="Admissions by course" hint="The course actually joined">
            <BarList rows={charts.admissionsByCourse} />
          </ChartCard>
        </div>

        <Section
          title="Course-wise"
          description="Enquiries, admissions and conversion rate per course."
          exportHref={exportHref("course")}
        >
          <Table head={["Course", "Enquiries", "Admissions", "Conversion", "Fees agreed"]}>
            {courses.rows.length === 0 ? (
              <Empty colSpan={5} />
            ) : (
              courses.rows.map((row) => (
                <tr key={row.key} className="border-b last:border-0">
                  <td className="px-4 py-3">{row.key}</td>
                  <td className="px-4 py-3 text-right tabular-nums">{row.enquiries}</td>
                  <td className="px-4 py-3 text-right tabular-nums">{row.admissions}</td>
                  <td className="px-4 py-3 text-right tabular-nums">{row.conversionRate}%</td>
                  <td className="px-4 py-3 text-right tabular-nums">{formatPaise(row.fees)}</td>
                </tr>
              ))
            )}
          </Table>
        </Section>

        <Section
          title="Source-wise"
          description="Where the enquiries came from, and which sources convert."
          exportHref={exportHref("source")}
        >
          <Table head={["Source", "Enquiries", "Admissions", "Conversion", "Fees agreed"]}>
            {sources.rows.length === 0 ? (
              <Empty colSpan={5} />
            ) : (
              sources.rows.map((row) => (
                <tr key={row.key} className="border-b last:border-0">
                  <td className="px-4 py-3">{row.key}</td>
                  <td className="px-4 py-3 text-right tabular-nums">{row.enquiries}</td>
                  <td className="px-4 py-3 text-right tabular-nums">{row.admissions}</td>
                  <td className="px-4 py-3 text-right tabular-nums">{row.conversionRate}%</td>
                  <td className="px-4 py-3 text-right tabular-nums">{formatPaise(row.fees)}</td>
                </tr>
              ))
            )}
          </Table>
        </Section>

        <Section
          title="Campaign attribution"
          description="Which campaign produced admissions, not just clicks. Fees are what was agreed, not collected."
          exportHref={exportHref("campaign")}
        >
          <Table
            head={["Source", "Medium", "Campaign", "Enquiries", "Admissions", "Conversion", "Fees agreed"]}
          >
            {campaigns.rows.length === 0 ? (
              <Empty colSpan={7} />
            ) : (
              campaigns.rows.map((row) => (
                <tr key={row.key} className="border-b last:border-0">
                  <td className="px-4 py-3">{row.source}</td>
                  <td className="px-4 py-3 text-right text-muted-foreground">{row.medium}</td>
                  <td className="px-4 py-3 text-right text-muted-foreground">{row.campaign}</td>
                  <td className="px-4 py-3 text-right tabular-nums">{row.enquiries}</td>
                  <td className="px-4 py-3 text-right tabular-nums">{row.admissions}</td>
                  <td className="px-4 py-3 text-right tabular-nums">{row.conversionRate}%</td>
                  <td className="px-4 py-3 text-right tabular-nums">{formatPaise(row.fees)}</td>
                </tr>
              ))
            )}
          </Table>
        </Section>

        <Section
          title="Counsellor performance"
          description="Leads assigned in this period, follow-ups logged in it, and admissions from those leads."
          exportHref={exportHref("counsellor")}
        >
          <Table head={["Counsellor", "Assigned", "Follow-ups", "Admissions", "Conversion"]}>
            {counsellors.rows.length === 0 ? (
              <Empty colSpan={5} />
            ) : (
              counsellors.rows.map((row) => (
                <tr key={row.key} className="border-b last:border-0">
                  <td className="px-4 py-3">{row.name}</td>
                  <td className="px-4 py-3 text-right tabular-nums">{row.assigned}</td>
                  <td className="px-4 py-3 text-right tabular-nums">{row.followUps}</td>
                  <td className="px-4 py-3 text-right tabular-nums">{row.admissions}</td>
                  <td className="px-4 py-3 text-right tabular-nums">{row.conversionRate}%</td>
                </tr>
              ))
            )}
          </Table>
        </Section>

        <Section
          title="Lost leads"
          description="Why leads were closed in this period. Counted by closing date, not enquiry date."
          exportHref={exportHref("lost")}
        >
          {lost.rows.length === 0 ? (
            <Table head={["Reason", "Leads", "Share"]}>
              <Empty colSpan={3} />
            </Table>
          ) : (
            <div className="grid gap-4 lg:grid-cols-2">
              <Table head={["Reason", "Leads", "Share"]}>
                {lost.rows.map((row) => (
                  <tr key={row.key} className="border-b last:border-0">
                    <td className="px-4 py-3">{row.label}</td>
                    <td className="px-4 py-3 text-right tabular-nums">{row.count}</td>
                    <td className="px-4 py-3 text-right tabular-nums">{row.percentage}%</td>
                  </tr>
                ))}
              </Table>
              <ChartCard title="Share of closures" hint={`${lost.total} closed in this period`}>
                <BarList rows={lost.rows} />
              </ChartCard>
            </div>
          )}
        </Section>

        <Section
          title="Follow-ups"
          description="Logged in this period. Overdue is a live count of leads past their next follow-up date."
          exportHref={exportHref("followup")}
        >
          <Table head={["Counsellor", "Completed", "Scheduled next", "Overdue now"]}>
            {followUp.rows.length === 0 ? (
              <Empty colSpan={4} />
            ) : (
              followUp.rows.map((row) => (
                <tr key={row.key} className="border-b last:border-0">
                  <td className="px-4 py-3">{row.name}</td>
                  <td className="px-4 py-3 text-right tabular-nums">{row.completed}</td>
                  <td className="px-4 py-3 text-right tabular-nums">{row.scheduled}</td>
                  <td className="px-4 py-3 text-right tabular-nums">{row.overdue}</td>
                </tr>
              ))
            )}
          </Table>
        </Section>

        <Section
          title="Enquiry report"
          description={`${enquiries.rows.length} enquiries in this period. The 50 most recent are shown; the CSV has all of them.`}
          exportHref={exportHref("enquiry")}
        >
          <Table
            head={["Enquiry", "Date", "Course", "Source", "Counsellor", "Status", "Priority"]}
          >
            {enquiries.rows.length === 0 ? (
              <Empty colSpan={7} />
            ) : (
              enquiries.rows.slice(0, 50).map((row) => (
                <tr key={row.id} className="border-b last:border-0">
                  <td className="px-4 py-3">
                    <Link href={`/admin/leads/${row.id}`} className="font-medium hover:underline">
                      {row.name}
                    </Link>
                    <div className="font-mono text-xs text-muted-foreground">
                      {row.enquiryNumber ?? `#${row.id}`}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    {row.createdAt ? new Date(row.createdAt).toLocaleDateString("en-IN") : "—"}
                  </td>
                  <td className="px-4 py-3 text-right">{row.courseInterest ?? "—"}</td>
                  <td className="px-4 py-3 text-right">{row.source ?? "—"}</td>
                  <td className="px-4 py-3 text-right">{row.counsellor ?? "Unassigned"}</td>
                  <td className="px-4 py-3 text-right">
                    {leadStatusLabel(row.status)}
                    {row.closureReason && (
                      <div className="text-xs text-muted-foreground">
                        {lossReasonLabel(row.closureReason)}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">{row.priority ?? "—"}</td>
                </tr>
              ))
            )}
          </Table>
        </Section>
      </main>
    </div>
  );
}
