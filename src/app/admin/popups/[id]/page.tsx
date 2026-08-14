import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";

import { PopupCampaignForm } from "@/components/admin/popup-campaign-form";
import { getPopupCampaign } from "@/lib/actions/popup-campaigns";
import { requireAdminPage } from "@/lib/admin";

export const dynamic = "force-dynamic";

export default async function EditPopupPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdminPage();
  const { id } = await params;
  const campaign = await getPopupCampaign(Number(id));
  if (!campaign) notFound();

  return (
    <div className="min-h-screen">
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/admin/popups"
            className="mb-2 flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Popups
          </Link>
          <h1 className="text-xl font-bold">Edit Popup</h1>
        </div>
      </header>
      <div className="container mx-auto max-w-3xl px-4 py-6">
        <PopupCampaignForm campaign={campaign} />
      </div>
    </div>
  );
}
