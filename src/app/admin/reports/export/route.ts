import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import {
  getCounsellorReport,
  getCourseReport,
  getEnquiryReport,
  getFollowUpReport,
  getLostLeadReport,
  getSourceReport,
} from "@/lib/actions/reports";
import { csvDate, csvResponse, toCsv } from "@/lib/reports/csv";
import { formatPaise } from "@/lib/admissions/money";
import { leadStatusLabel, lossReasonLabel } from "@/lib/leads/lifecycle";

/**
 * CSV for any of the six reports, at the range currently on screen.
 *
 * The page's export links carry the same query string as the page, so what
 * downloads is what was being looked at. Cells go through escapeCsvCell, which
 * also neutralises spreadsheet formula injection — names and notes here came
 * from public web forms.
 *
 * Deliberately not exported: internal notes, UTM parameters and landing pages.
 * The enquiry report is a working list for the office, and the spec asks not
 * to export internal fields unnecessarily. The full lead export at
 * /admin/leads/export remains the place for everything.
 */

const REPORTS = [
  "enquiry",
  "course",
  "source",
  "counsellor",
  "lost",
  "followup",
] as const;

type ReportName = (typeof REPORTS)[number];

function isReportName(value: string | null): value is ReportName {
  return value !== null && (REPORTS as readonly string[]).includes(value);
}

export async function GET(request: NextRequest) {
  if (!(await isAdmin())) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const report = searchParams.get("report");
  if (!isReportName(report)) {
    return new NextResponse("Unknown report", { status: 400 });
  }

  const range = {
    preset: searchParams.get("preset"),
    from: searchParams.get("from"),
    to: searchParams.get("to"),
  };

  switch (report) {
    case "enquiry": {
      const { rows, range: resolved } = await getEnquiryReport(range);
      const csv = toCsv(
        ["Enquiry No", "Date", "Name", "Phone", "Email", "Course", "Source", "Counsellor", "Status", "Priority", "Closure reason"],
        rows.map((r) => [
          r.enquiryNumber ?? `#${r.id}`,
          csvDate(r.createdAt),
          r.name,
          r.phone,
          r.email,
          r.courseInterest,
          r.source,
          r.counsellor ?? "Unassigned",
          leadStatusLabel(r.status),
          r.priority,
          r.closureReason ? lossReasonLabel(r.closureReason) : "",
        ]),
      );
      return csvResponse(filename("enquiries", resolved.label), csv);
    }

    case "course":
    case "source": {
      const { rows, range: resolved } =
        report === "course" ? await getCourseReport(range) : await getSourceReport(range);
      const csv = toCsv(
        [report === "course" ? "Course" : "Source", "Enquiries", "Admissions", "Conversion %", "Fees agreed"],
        rows.map((r) => [r.key, r.enquiries, r.admissions, r.conversionRate, formatPaise(r.fees)]),
      );
      return csvResponse(filename(`${report}-wise`, resolved.label), csv);
    }

    case "counsellor": {
      const { rows, range: resolved } = await getCounsellorReport(range);
      const csv = toCsv(
        ["Counsellor", "Assigned leads", "Follow-ups", "Admissions", "Conversion %"],
        rows.map((r) => [r.name, r.assigned, r.followUps, r.admissions, r.conversionRate]),
      );
      return csvResponse(filename("counsellor-performance", resolved.label), csv);
    }

    case "lost": {
      const { rows, range: resolved } = await getLostLeadReport(range);
      const csv = toCsv(
        ["Reason", "Leads", "Share %"],
        rows.map((r) => [r.label, r.count, r.percentage]),
      );
      return csvResponse(filename("lost-leads", resolved.label), csv);
    }

    case "followup": {
      const { rows, range: resolved } = await getFollowUpReport(range);
      const csv = toCsv(
        ["Counsellor", "Completed", "Scheduled next", "Overdue now"],
        rows.map((r) => [r.name, r.completed, r.scheduled, r.overdue]),
      );
      return csvResponse(filename("follow-ups", resolved.label), csv);
    }
  }
}

/** archer-enquiries-last-30-days-2026-09-11.csv */
function filename(report: string, rangeLabel: string): string {
  const slug = rangeLabel.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return `archer-${report}-${slug}-${csvDate(new Date())}.csv`;
}
