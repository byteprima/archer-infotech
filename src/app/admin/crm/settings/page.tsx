import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { requireAdminPage } from "@/lib/admin";
import {
  previewNextAssignee,
  readCrmSettings,
} from "@/lib/actions/crm-settings";
import { getCurrentRole } from "@/lib/auth";
import { canManageContent } from "@/lib/leads/roles";
import { CrmSettingsForm } from "./_components/settings-form";

export const metadata = { title: "CRM automation" };

export default async function CrmSettingsPage() {
  await requireAdminPage("/admin/crm/settings");

  const [settings, nextName, role] = await Promise.all([
    readCrmSettings(),
    previewNextAssignee(),
    getCurrentRole(),
  ]);

  return (
    <div className="min-h-screen">
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-4">
          <div className="mb-2 flex items-center gap-4">
            <Link
              href="/admin/crm"
              className="flex items-center text-sm text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to CRM
            </Link>
          </div>
          <h1 className="text-xl font-bold">Automation</h1>
          <p className="text-sm text-muted-foreground">
            What happens to a website enquiry the moment it arrives.
          </p>
        </div>
      </header>

      <main className="container mx-auto max-w-2xl px-4 py-8">
        <CrmSettingsForm
          settings={settings}
          nextAssignee={nextName}
          canEdit={canManageContent(role)}
        />
      </main>
    </div>
  );
}
