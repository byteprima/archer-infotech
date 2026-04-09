import { NextRequest, NextResponse } from "next/server";
import { and, desc, eq, like, or } from "drizzle-orm";
import { db } from "@/db";
import { leads } from "@/db/schema";
import { isAdmin } from "@/lib/auth";

function escapeCsv(value: string | null | undefined) {
  if (!value) {
    return "";
  }

  const normalized = value.replaceAll('"', '""');
  return `"${normalized}"`;
}

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

  if (source) {
    conditions.push(eq(leads.source, source));
  }

  const rows = await db
    .select()
    .from(leads)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(desc(leads.createdAt));

  const header = [
    "ID",
    "Name",
    "Email",
    "Phone",
    "Course",
    "Source",
    "Status",
    "Assigned To",
    "Follow Up Date",
    "Created At",
  ].join(",");

  const lines = rows.map((lead) =>
    [
      lead.id,
      escapeCsv(lead.name),
      escapeCsv(lead.email),
      escapeCsv(lead.phone),
      escapeCsv(lead.courseInterest),
      escapeCsv(lead.source),
      escapeCsv(lead.status),
      escapeCsv(lead.assignedTo),
      escapeCsv(lead.followUpDate ? new Date(lead.followUpDate).toISOString() : ""),
      escapeCsv(lead.createdAt ? new Date(lead.createdAt).toISOString() : ""),
    ].join(",")
  );

  return new NextResponse([header, ...lines].join("\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="leads-export.csv"',
    },
  });
}
