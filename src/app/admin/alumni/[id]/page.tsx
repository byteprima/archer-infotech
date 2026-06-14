import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronLeft,
  Star,
  ExternalLink,
  Briefcase,
  IndianRupee,
  GraduationCap,
  Clock,
  User,
  Phone,
  Handshake,
  Quote,
  Settings,
  StickyNote,
} from "lucide-react";
import { LinkedinIcon, GitHubIcon } from "@/components/common/social-icons";
import { getAlumnusById } from "@/lib/actions/alumni";
import { requireAdminPage } from "@/lib/admin";
import { alumniPhotoUrl } from "@/lib/storage/alumni-photos";
import { AlumniAdminActions } from "@/components/admin/alumni-admin-actions";
import {
  InfoBox,
  BoxCard,
  ContentHeader,
  StatusPill,
} from "@/components/admin/admin-lte";
import { Badge } from "@/components/ui/badge";
import type { AlumniStatus } from "@/lib/alumni/constants";

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="grid grid-cols-3 gap-3 py-2.5">
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className="col-span-2 text-sm font-medium break-words">{value || "—"}</dd>
    </div>
  );
}

export default async function AdminAlumnusDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdminPage();
  const { id } = await params;
  const numId = Number(id);
  if (!Number.isInteger(numId)) notFound();

  const a = await getAlumnusById(numId);
  if (!a) notFound();

  const photoUrl = a.photoFilename ? alumniPhotoUrl(a.photoFilename) : null;
  const link = (
    url: string | null,
    Icon: React.ComponentType<{ className?: string }>
  ) =>
    url ? (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-primary hover:underline"
      >
        <Icon className="h-3.5 w-3.5" />
        <span className="break-all">{url}</span>
        <ExternalLink className="h-3 w-3 shrink-0" />
      </a>
    ) : (
      "—"
    );

  return (
    <div className="min-h-screen bg-muted/20">
      <ContentHeader
        title={a.name}
        subtitle={`${a.currentRole || "Alumnus"}${a.currentCompany ? ` · ${a.currentCompany}` : ""}`}
        breadcrumb={
          <Link
            href="/admin/alumni"
            className="flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Alumni
          </Link>
        }
        action={<StatusPill status={a.status} />}
      />

      <main className="container mx-auto px-4 py-6">
        {/* Info-box strip */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <InfoBox label="Package band" value={a.packageBand || "—"} icon={IndianRupee} color="green" />
          <InfoBox label="Experience" value={a.yearsExperience ? `${a.yearsExperience} yrs` : "—"} icon={Clock} color="blue" />
          <InfoBox label="Course" value={a.courseTaken || "—"} icon={GraduationCap} color="purple" />
          <InfoBox label="Rating" value={`${a.rating ?? 5} / 5`} icon={Star} color="yellow" />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <BoxCard title="Contact & location (private)" icon={User} color="slate">
              <dl className="divide-y">
                <Row label="Email" value={<a className="text-primary hover:underline" href={`mailto:${a.email}`}>{a.email}</a>} />
                <Row label="Phone / WhatsApp" value={<a className="inline-flex items-center gap-1.5 text-primary hover:underline" href={`tel:${a.phone}`}><Phone className="h-3.5 w-3.5" />{a.phone}</a>} />
                <Row label="City / location" value={a.city} />
                <Row label="LinkedIn" value={link(a.linkedinUrl, LinkedinIcon)} />
                <Row label="GitHub" value={link(a.githubUrl, GitHubIcon)} />
              </dl>
            </BoxCard>

            <BoxCard title="Career & package" icon={Briefcase} color="blue">
              <dl className="divide-y">
                <Row label="Course taken" value={a.courseTaken} />
                <Row label="Completed" value={a.completionYear} />
                <Row label="Current company" value={a.currentCompany} />
                <Row label="Current role" value={a.currentRole} />
                <Row label="Package band" value={a.packageBand ? <Badge className="bg-emerald-100 text-emerald-700">{a.packageBand}</Badge> : "—"} />
                <Row label="Experience" value={a.yearsExperience} />
              </dl>
            </BoxCard>

            <BoxCard title="Placement help offered" icon={Handshake} color="purple">
              <dl className="divide-y">
                <Row label="Looking for job change" value={a.lookingForJobChange ? <Badge className="bg-amber-100 text-amber-700">Yes — open to offers</Badge> : "No"} />
                <Row label="Open to referrals" value={a.openToReferrals ? <Badge className="bg-emerald-100 text-emerald-700">Yes</Badge> : "No"} />
                <Row label="Company hiring" value={a.companyHiring ? <Badge className="bg-emerald-100 text-emerald-700">Yes</Badge> : "No"} />
                <Row label="Roles / skills" value={a.hiringRoles} />
                <Row
                  label="HR contacts shared"
                  value={
                    a.hrContacts ? (
                      <span className="whitespace-pre-line">{a.hrContacts}</span>
                    ) : (
                      "—"
                    )
                  }
                />
                <Row label="Share with partners" value={a.consentSharePartners ? <Badge className="bg-emerald-100 text-emerald-700">Consented</Badge> : "No"} />
              </dl>
            </BoxCard>

            <BoxCard
              title="Testimonial"
              icon={Quote}
              color={a.consentDisplayPublic ? "green" : "slate"}
              action={
                a.consentDisplayPublic ? (
                  <Badge className="bg-emerald-100 text-emerald-700">Public display consented</Badge>
                ) : (
                  <Badge variant="outline">No public consent</Badge>
                )
              }
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                {photoUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={photoUrl}
                    alt={`${a.name} photo`}
                    className="h-24 w-24 shrink-0 rounded-full border object-cover"
                    width={96}
                    height={96}
                  />
                )}
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < (a.rating ?? 5) ? "fill-amber-400 text-amber-400" : "text-muted-foreground/40"}`}
                      />
                    ))}
                  </div>
                  <blockquote className="border-l-4 border-primary/40 bg-muted/40 p-4 text-sm italic">
                    {a.testimonialContent || "(No testimonial text provided)"}
                  </blockquote>
                </div>
              </div>
            </BoxCard>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <BoxCard title="Review actions" icon={Settings} color="red">
              <AlumniAdminActions
                id={a.id}
                status={a.status as AlumniStatus}
                consentDisplayPublic={Boolean(a.consentDisplayPublic)}
                hasTestimonialText={Boolean(
                  a.testimonialContent && a.testimonialContent.trim().length > 0
                )}
                alreadyPublished={Boolean(a.testimonialId)}
              />
              {a.testimonialId && (
                <Link
                  href={`/admin/testimonials/${a.testimonialId}/edit`}
                  className="mt-4 inline-flex items-center gap-1 text-sm text-primary hover:underline"
                >
                  Edit linked testimonial #{a.testimonialId}
                  <ExternalLink className="h-3 w-3" />
                </Link>
              )}
            </BoxCard>

            {a.adminNotes && (
              <BoxCard title="Admin notes" icon={StickyNote} color="yellow">
                <p className="text-sm text-muted-foreground">{a.adminNotes}</p>
              </BoxCard>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
