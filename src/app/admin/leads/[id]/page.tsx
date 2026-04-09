import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { LeadForm } from "@/components/admin/lead-form";
import { getLeadById } from "@/lib/actions/admin-leads";
import { requireAdminPage } from "@/lib/admin";

interface AdminLeadDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminLeadDetailPage({ params }: AdminLeadDetailPageProps) {
  await requireAdminPage();

  const { id } = await params;
  const leadId = parseInt(id, 10);

  if (Number.isNaN(leadId)) {
    notFound();
  }

  const lead = await getLeadById(leadId);

  if (!lead) {
    notFound();
  }

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
            <h1 className="text-xl font-bold">Lead Details</h1>
            <p className="text-sm text-muted-foreground">Manage {lead.name}'s enquiry</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <LeadForm lead={lead} />
      </main>
    </div>
  );
}
