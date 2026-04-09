import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { PlacementForm } from "@/components/admin/placement-form";
import { requireAdminPage } from "@/lib/admin";

export default async function NewPlacementPage() {
  await requireAdminPage();

  return (
    <div className="min-h-screen">
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-4">
          <div className="mb-2 flex items-center gap-4">
            <Link
              href="/admin/placements"
              className="flex items-center text-sm text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to Placements
            </Link>
          </div>
          <div>
            <h1 className="text-xl font-bold">New Placement</h1>
            <p className="text-sm text-muted-foreground">
              Create a new placement record and choose whether it is published or highlighted.
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <PlacementForm />
      </main>
    </div>
  );
}
