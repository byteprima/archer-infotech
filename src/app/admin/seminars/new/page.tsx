import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { SeminarForm } from "@/components/admin/seminar-form";
import { requireAdminPage } from "@/lib/admin";

export default async function NewSeminarPage() {
  await requireAdminPage("/admin/seminars/new");
  return (
    <div className="min-h-screen">
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/admin/seminars"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4" /> Seminars &amp; sessions
          </Link>
          <h1 className="text-2xl font-bold mt-1">Record a session</h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <SeminarForm />
      </main>
    </div>
  );
}
