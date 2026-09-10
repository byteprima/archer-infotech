import { NextRequest, NextResponse } from "next/server";
import { and, desc, eq, like, or } from "drizzle-orm";
import { db } from "@/db";
import { leads } from "@/db/schema";
import { isAdmin } from "@/lib/auth";
import { buildSourceCondition } from "@/lib/leads/source-filter";
import { csvDateTime, csvResponse, toCsv } from "@/lib/reports/csv";

export async function GET(request: NextRequest) {
  const admin = await isAdmin();

  if (!admin) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim();
  const status = searchParams.get("status")?.trim();
  const source = searchParams.get("source")?.trim();

  const conditions = [];

  if (query) {
    const searchTerm = `%${query}%`;
    conditions.push(
      or(like(leads.name, searchTerm), like(leads.email, searchTerm), like(leads.phone, searchTerm))
    );
  }

  if (status) {
    conditions.push(eq(leads.status, status));
  }

  const sourceCondition = buildSourceCondition(source || "");
  if (sourceCondition) {
    conditions.push(sourceCondition);
  }

  const rows = await db
    .select()
    .from(leads)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(desc(leads.createdAt));

  const csv = toCsv(
    [
      "ID",
      "Name",
      "Email",
      "Phone",
      "Course",
      "Mode of Learning",
      "Experience",
      "Source",
      "Status",
      "Assigned To",
      "Follow Up Date",
      "Created At",
    ],
    rows.map((lead) => [
      lead.id,
      lead.name,
      lead.email,
      lead.phone,
      lead.courseInterest,
      lead.modePreference,
      lead.experienceLevel,
      lead.source,
      lead.status,
      lead.assignedTo,
      csvDateTime(lead.followUpDate),
      csvDateTime(lead.createdAt),
    ]),
  );

  return csvResponse("leads-export.csv", csv);
}
