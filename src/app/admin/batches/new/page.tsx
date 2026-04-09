import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { requireAdminPage } from "@/lib/admin";
import { BatchForm } from "@/components/admin/batch-form";

export default async function NewBatchPage() {
  await requireAdminPage();

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
            <h1 className="text-xl font-bold">New Batch</h1>
            <p className="text-sm text-muted-foreground">Create a new batch record</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <BatchForm />
      </main>
    </div>
  );
}
