import Link from "next/link";
import { FileText, Trophy } from "lucide-react";

import { PlacementSubmissionActions } from "@/components/admin/placement-submission-actions";
import { requireAdminPage } from "@/lib/admin";
import { listPlacementSubmissions } from "@/lib/actions/admin-placement-submissions";

/**
 * Review queue for public placement submissions.
 *
 * The offer letter links to /admin/media/offer-letters/<file>, which is
 * admin-authenticated and sends no-store — the public /media route refuses
 * that collection outright. Reviewing a placement means opening a document
 * with someone's salary on it, so it should not end up in a shared cache.
 */
export default async function PlacementSubmissionsPage() {
  await requireAdminPage();
  const rows = await listPlacementSubmissions();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center gap-3">
        <Trophy className="h-6 w-6 text-secondary" />
        <div>
          <h1 className="text-2xl font-bold">Placement submissions</h1>
          <p className="text-sm text-muted-foreground">
            Submitted by students at /placements/submit. Approving copies the
            record into Placements — it is not published before that.
          </p>
        </div>
      </div>

      {rows.length === 0 ? (
        <p className="rounded-lg border bg-muted/30 p-6 text-muted-foreground">
          No submissions yet.
        </p>
      ) : (
        <div className="space-y-4">
          {rows.map((r) => (
            <div key={r.id} className="rounded-xl border bg-card p-5">
              <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-semibold">
                    {r.studentName} — {r.designation} at {r.company}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {[r.package, r.courseTaken, r.batchYear].filter(Boolean).join(" · ") || "—"}
                  </p>
                </div>
                <span className="rounded-full border px-3 py-1 text-xs font-medium">
                  {r.status}
                  {r.placementId ? ` · placement #${r.placementId}` : ""}
                </span>
              </div>

              <dl className="mb-4 grid gap-x-6 gap-y-1 text-sm sm:grid-cols-2">
                <div><dt className="inline text-muted-foreground">Email: </dt><dd className="inline">{r.email}</dd></div>
                <div><dt className="inline text-muted-foreground">Phone: </dt><dd className="inline">{r.phone}</dd></div>
                <div>
                  <dt className="inline text-muted-foreground">Public display: </dt>
                  <dd className="inline">{r.consentDisplayPublic ? "consented" : "records only"}</dd>
                </div>
                {r.linkedinUrl && (
                  <div>
                    <dt className="inline text-muted-foreground">LinkedIn: </dt>
                    <dd className="inline">
                      <a href={r.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        profile
                      </a>
                    </dd>
                  </div>
                )}
              </dl>

              {r.testimonial && (
                <blockquote className="mb-4 border-l-2 pl-3 text-sm text-muted-foreground">
                  {r.testimonial}
                </blockquote>
              )}

              <div className="flex flex-wrap items-center gap-3">
                {r.offerLetterFilename ? (
                  <Link
                    href={`/admin/media/offer-letters/${r.offerLetterFilename}`}
                    target="_blank"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                  >
                    <FileText className="h-4 w-4" />
                    View offer letter
                  </Link>
                ) : (
                  <span className="text-sm text-muted-foreground">No offer letter attached</span>
                )}
                <PlacementSubmissionActions id={r.id} alreadyPublished={Boolean(r.placementId)} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
