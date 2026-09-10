import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { requireAdminPage } from "@/lib/admin";
import { DemoSessionForm } from "@/components/admin/demo-session-form";
import {
  getBatchOptionsForDemo,
  getDemoSessionById,
  getAdminDemoSessions,
} from "@/lib/actions/demo-sessions";
import { courses } from "@/data/courses";

export default async function EditDemoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdminPage("/admin/demos/[id]/edit");

  const { id } = await params;
  const demoId = Number(id);
  if (!Number.isSafeInteger(demoId) || demoId <= 0) notFound();

  const [demo, batches, all] = await Promise.all([
    getDemoSessionById(demoId),
    getBatchOptionsForDemo(),
    getAdminDemoSessions({ when: "all" }),
  ]);
  if (!demo) notFound();

  const registered = all.find((row) => row.id === demoId)?.registered ?? 0;

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
          <h1 className="text-xl font-bold">{demo.courseName} demo</h1>
          <p className="text-sm text-muted-foreground">
            {registered} registered
          </p>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <DemoSessionForm
          demo={demo}
          courses={courses.map((c) => ({ slug: c.slug, title: c.title }))}
          batches={batches}
          registeredCount={Number(registered)}
        />
      </main>
    </div>
  );
}
