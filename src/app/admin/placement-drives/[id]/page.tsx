import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { placementDrives } from "@/db/schema";
import { PlacementDriveForm } from "@/components/admin/placement-drive-form";
import { DeleteDriveButton } from "@/components/admin/delete-drive-button";
import { requireAdminPage } from "@/lib/admin";

export default async function EditPlacementDrivePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdminPage();
  const { id } = await params;
  const [drive] = await db
    .select()
    .from(placementDrives)
    .where(eq(placementDrives.id, Number(id)))
    .limit(1);
  if (!drive) notFound();

  return (
    <div className="min-h-screen">
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <Link
              href="/admin/placement-drives"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft className="h-4 w-4" /> Placement drives
            </Link>
            <h1 className="text-2xl font-bold mt-1">
              {drive.company} — {drive.role}
            </h1>
          </div>
          <DeleteDriveButton id={drive.id} label={`${drive.company} — ${drive.role}`} />
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <PlacementDriveForm drive={drive} />
      </main>
    </div>
  );
}
