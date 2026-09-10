import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { requireAdminPage } from "@/lib/admin";
import { DemoSessionForm } from "@/components/admin/demo-session-form";
import { getBatchOptionsForDemo } from "@/lib/actions/demo-sessions";
import { courses } from "@/data/courses";

export default async function NewDemoPage() {
  await requireAdminPage("/admin/demos/new");
  const batches = await getBatchOptionsForDemo();

  return (
    <div className="min-h-screen">
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-4">
          <div className="mb-2 flex items-center gap-4">
            <Link
              href="/admin/demos"
              className="flex items-center text-sm text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to Demos
            </Link>
          </div>
          <h1 className="text-xl font-bold">Schedule a Demo</h1>
          <p className="text-sm text-muted-foreground">
            Once scheduled, it can be offered to any lead from their detail page.
          </p>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <DemoSessionForm
          courses={courses.map((c) => ({ slug: c.slug, title: c.title }))}
          batches={batches}
        />
      </main>
    </div>
  );
}
