import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { LeadForm } from "@/components/admin/lead-form";
import { getLeadById } from "@/lib/actions/admin-leads";
import { getFollowUpsForLead } from "@/lib/actions/follow-ups";
import { FollowUpPanel } from "@/components/admin/follow-up-panel";
import { LeadControls } from "@/components/admin/lead-controls";
import { LeadBatchDemoPanel } from "@/components/admin/lead-batch-demo-panel";
import {
  getOfferableBatches,
  getUpcomingDemoSessions,
  getLeadBatchInterests,
  getLeadDemoRegistrations,
} from "@/lib/actions/lead-batch-demo";
import { getAssignableStaff } from "@/lib/actions/lead-assignment";
import { AdmissionPanel } from "@/components/admin/admission-panel";
import { getAdmissionForLead } from "@/lib/actions/admissions";
import { findLeadsByPhone } from "@/lib/actions/lead-duplicates";
import { MessageComposer } from "@/components/admin/message-composer";
import { LeadInsightPanel } from "@/components/admin/lead-insight-panel";
import { scoreOneLead } from "@/lib/actions/lead-scoring";
import { isAiEnabled } from "@/lib/actions/lead-insights";
import {
  getAvailableMessages,
  getLeadMessages,
} from "@/lib/actions/lead-messages";
import { OtherEnquiriesPanel } from "@/components/admin/other-enquiries-panel";
import { courses, getCourse } from "@/data/courses";
import { resolveCourseSlugs } from "@/lib/courses/course-match";
import { getCurrentRole } from "@/lib/auth";
import { canAssignLeads } from "@/lib/leads/roles";
import { requireAdminPage } from "@/lib/admin";

interface AdminLeadDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminLeadDetailPage({ params }: AdminLeadDetailPageProps) {
  await requireAdminPage("/admin/leads/[id]");

  const { id } = await params;
  const leadId = parseInt(id, 10);

  if (Number.isNaN(leadId)) {
    notFound();
  }

  const lead = await getLeadById(leadId);
  const followUps = lead ? await getFollowUpsForLead(leadId) : [];
  const [
    staff,
    role,
    offerableBatches,
    upcomingDemos,
    interests,
    registrations,
    admission,
  ] = await Promise.all([
    getAssignableStaff(),
    getCurrentRole(),
    getOfferableBatches(),
    getUpcomingDemoSessions(),
    getLeadBatchInterests(leadId),
    getLeadDemoRegistrations(leadId),
    getAdmissionForLead(leadId),
  ]);

  // Live, not a stored flag: it disappears the moment the other lead is closed
  // as Duplicate or its number corrected.
  const otherEnquiries = lead ? await findLeadsByPhone(lead.phone, leadId) : [];
  const [prepared, messageHistory, scored, aiGate] = await Promise.all([
    getAvailableMessages(leadId),
    getLeadMessages(leadId),
    scoreOneLead(leadId),
    isAiEnabled(),
  ]);

  if (!lead) {
    notFound();
  }

  // Pre-select the course the enquiry was about. `courseInterest` is free text
  // typed by whoever filled the form, so it is resolved through the same
  // matcher the public pages use rather than compared directly — see
  // lib/courses/course-match.ts.
  const suggestedCourseSlug =
    resolveCourseSlugs(lead.courseInterest)[0] ??
    getCourse(lead.courseInterest ?? "")?.slug ??
    null;

  const courseOptions = courses.map((course) => ({
    slug: course.slug,
    title: course.title,
  }));

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
            <p className="text-sm text-muted-foreground">
              {lead.enquiryNumber ? (
                <span className="font-mono">{lead.enquiryNumber}</span>
              ) : (
                <span className="font-mono">#{lead.id}</span>
              )}{" "}
              · Manage {lead.name}&apos;s enquiry
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)]">
          <LeadForm lead={lead} />
          {/* Follow-ups sit beside the record rather than below it: logging a
              call is the most frequent action here, and burying it under a
              long form is what makes people stop logging. */}
          <div className="space-y-6">
            {scored && (
              <LeadInsightPanel
                leadId={lead.id}
                score={scored.score}
                suggestion={scored.suggestion}
                priority={lead.priority}
                aiEnabled={aiGate.enabled}
                aiReason={aiGate.reason}
              />
            )}
            <LeadControls
              leadId={lead.id}
              status={lead.status}
              priority={lead.priority}
              assignedToUserId={lead.assignedToUserId}
              closureReason={lead.closureReason}
              closureNote={lead.closureNote}
              staff={staff}
              canAssign={canAssignLeads(role)}
            />
            <OtherEnquiriesPanel matches={otherEnquiries} phone={lead.phone} />
            <AdmissionPanel
              leadId={lead.id}
              leadName={lead.name}
              leadPhone={lead.phone}
              leadEmail={lead.email}
              suggestedCourseSlug={suggestedCourseSlug}
              courses={courseOptions}
              batches={offerableBatches}
              admission={admission}
            />
            <LeadBatchDemoPanel
              leadId={lead.id}
              batches={offerableBatches}
              demos={upcomingDemos}
              interests={interests}
              registrations={registrations}
            />
            <MessageComposer
              leadId={lead.id}
              waLink={prepared.waLink}
              messages={prepared.messages}
              history={messageHistory}
            />
            <FollowUpPanel
              leadId={lead.id}
              currentStatus={lead.status}
              followUps={followUps}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
