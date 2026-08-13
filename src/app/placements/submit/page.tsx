import { Metadata } from "next";
import { Trophy } from "lucide-react";

import { PlacementSubmitForm } from "@/components/forms/placement-submit-form";
import { buildPageMetadata } from "@/lib/seo";

/**
 * Public placement submission.
 *
 * noindex, matching /alumni: this is a utility form, not content. Indexing
 * it would put a form with a file upload in front of search traffic that has
 * no reason to be here, and it would compete with /placements — the page
 * that actually carries the outcomes and is meant to rank.
 */
export const metadata: Metadata = buildPageMetadata({
  title: "Submit Your Placement — Archer Infotech",
  description:
    "Recently placed after training at Archer Infotech? Share your offer so we can verify it and celebrate it with you.",
  path: "/placements/submit",
  noindex: true,
});

export default function SubmitPlacementPage() {
  return (
    <>
      <section className="gradient-hero py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm font-medium">
              <Trophy className="h-4 w-4 text-secondary" />
              <span>For recently placed students</span>
            </div>
            <h1 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
              Tell us about your placement
            </h1>
            <p className="text-lg text-white/85">
              Got an offer after training with us? Share the details and attach
              your offer letter. Our placement team verifies every submission
              before anything goes on the site — and we&apos;ll get in touch
              first.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto max-w-3xl px-4">
          <PlacementSubmitForm />
        </div>
      </section>
    </>
  );
}
