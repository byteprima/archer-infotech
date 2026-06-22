import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { LeadForm } from "@/components/admin/lead-form";
import { requireAdminPage } from "@/lib/admin";

export default async function AdminLeadNewPage() {
  await requireAdminPage();

  return (
    <div className="min-h-screen">
      <header className="bg-background border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="mb-2 flex items-center gap-4">
            <Link
              href="/admin/leads"
              className="flex items-center text-sm text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to Leads
            </Link>
          </div>
          <div>
            <h1 className="text-xl font-bold">Add Lead</h1>
            <p className="text-sm text-muted-foreground">
              Manually record an enquiry (e.g. a WhatsApp or phone enquiry)
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <LeadForm />
      </main>
    </div>
  );
}
