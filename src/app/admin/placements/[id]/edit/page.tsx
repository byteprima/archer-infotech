import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { PlacementForm } from "@/components/admin/placement-form";
import { getPlacementById } from "@/lib/actions/placements";
import { requireAdminPage } from "@/lib/admin";

interface EditPlacementPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPlacementPage({ params }: EditPlacementPageProps) {
  await requireAdminPage();

  const { id } = await params;
  const placementId = Number.parseInt(id, 10);

  if (Number.isNaN(placementId)) {
    notFound();
  }

  const placement = await getPlacementById(placementId);

  if (!placement) {
    notFound();
  }

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
            <h1 className="text-xl font-bold">Edit Placement</h1>
            <p className="text-sm text-muted-foreground">
              Editing: {placement.studentName} at {placement.company}
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <PlacementForm placement={placement} />
      </main>
    </div>
  );
}
