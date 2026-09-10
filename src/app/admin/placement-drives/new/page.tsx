import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { PlacementDriveForm } from "@/components/admin/placement-drive-form";
import { requireAdminPage } from "@/lib/admin";

export default async function NewPlacementDrivePage() {
  await requireAdminPage("/admin/placement-drives/new");
  return (
    <div className="min-h-screen">
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/admin/placement-drives"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4" /> Placement drives
          </Link>
          <h1 className="text-2xl font-bold mt-1">New drive</h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <PlacementDriveForm />
      </main>
    </div>
  );
}
