import { Metadata } from "next";
import { GraduationCap } from "lucide-react";
import { AlumniForm } from "@/components/forms/alumni-form";
import { buildPageMetadata } from "@/lib/seo";

// noindex: this is a private outreach link we share directly with alumni,
// not a page we want surfaced in search results.
export const metadata: Metadata = buildPageMetadata({
  title: "Alumni Update — Archer Infotech",
  description:
    "Archer Infotech alumni: share your current role, company, and a testimonial. Help us connect well-trained students with hiring companies.",
  path: "/alumni",
  noindex: true,
});

export default function AlumniPage() {
  return (
    <>
      {/* Hero */}
      <section className="gradient-hero text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="mb-4 flex items-center gap-3">
              <GraduationCap className="h-8 w-8" />
              <span className="text-sm font-medium uppercase tracking-wide text-white/80">
                Archer Infotech Alumni
              </span>
            </div>
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">
              Where are you now? Share your journey.
            </h1>
            <p className="text-lg text-white/80">
              You trained with us — now let&apos;s grow together. Tell us about
              your current role and company, and optionally leave a testimonial.
              Several of our recruiters are actively looking for experienced
              professionals, so sharing your profile could open new
              opportunities for you too. You can also let us know if you&apos;re
              able to refer or hire fellow Archerites. It takes about 3 minutes.
            </p>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <p className="mb-8 rounded-lg border bg-muted/40 p-4 text-sm text-muted-foreground">
              <strong className="text-foreground">Your privacy:</strong> your
              contact details, location, package, and hiring/referral answers
              are kept private for our placement team. Only your testimonial,
              name, role, company, and photo may appear publicly — and only
              after you tick the consent box and our team approves it.
            </p>
            <AlumniForm />
          </div>
        </div>
      </section>
    </>
  );
}
