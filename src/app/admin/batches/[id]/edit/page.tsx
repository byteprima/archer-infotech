import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { requireAdminPage } from "@/lib/admin";
import { getBatchById } from "@/lib/actions/batches";
import { BatchForm } from "@/components/admin/batch-form";

interface EditBatchPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditBatchPage({ params }: EditBatchPageProps) {
  await requireAdminPage();

  const { id } = await params;
  const batchId = parseInt(id, 10);

  if (Number.isNaN(batchId)) {
    notFound();
  }

  const batch = await getBatchById(batchId);

  if (!batch) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-4">
          <div className="mb-2 flex items-center gap-4">
            <Link
              href="/admin/batches"
              className="flex items-center text-sm text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to Batches
            </Link>
          </div>
          <div>
            <h1 className="text-xl font-bold">Edit Batch</h1>
            <p className="text-sm text-muted-foreground">{batch.courseName}</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <BatchForm batch={batch} />
      </main>
    </div>
  );
}
