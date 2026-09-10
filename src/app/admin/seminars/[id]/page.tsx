import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { seminars } from "@/db/schema";
import { SeminarForm } from "@/components/admin/seminar-form";
import { DeleteSeminarButton } from "@/components/admin/delete-seminar-button";
import { requireAdminPage } from "@/lib/admin";

export default async function EditSeminarPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdminPage("/admin/seminars/[id]");
  const { id } = await params;
  const [seminar] = await db
    .select()
    .from(seminars)
    .where(eq(seminars.id, Number(id)))
    .limit(1);
  if (!seminar) notFound();

  return (
    <div className="min-h-screen">
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <Link
              href="/admin/seminars"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft className="h-4 w-4" /> Seminars &amp; sessions
            </Link>
            <h1 className="text-2xl font-bold mt-1">
              {seminar.hostOrganisation} — {seminar.topic}
            </h1>
          </div>
          <DeleteSeminarButton
            id={seminar.id}
            label={`${seminar.hostOrganisation} — ${seminar.topic}`}
          />
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <SeminarForm seminar={seminar} />
      </main>
    </div>
  );
}
