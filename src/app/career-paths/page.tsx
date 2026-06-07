import type { Metadata } from "next";
import Link from "next/link";
import { Compass, ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { DefinitiveAnswer } from "@/components/seo/definitive-answer";
import { buildPageMetadata } from "@/lib/seo";
import { EVERGREEN_LAST_REVIEWED } from "@/lib/seo/content-dates";

/**
 * P5-18 — Career Paths hub.
 *
 * Index for the 4 planned career-path pillar pages (Python = live, Full
 * Stack / Data Science / First IT Job = next sessions). Each pillar
 * anchors a topic cluster of supporting comparisons, guides, and listicles.
 */

export const metadata: Metadata = buildPageMetadata({
  title: "Pune IT Career Paths — Structured Roadmaps for 2026",
  description:
    "Deep-dive career roadmaps for Pune IT learners — Python Developer, Full Stack Developer, Data Science / AI / ML, First IT Job. Each path includes a 12-month plan, salary trajectory, hiring companies, and mistakes to avoid.",
  path: "/career-paths",
  lastModified: EVERGREEN_LAST_REVIEWED,
});

interface PillarCard {
  slug: string;
  title: string;
  blurb: string;
  status: "live" | "coming-soon";
}

const pillars: PillarCard[] = [
  {
    slug: "python-developer",
    title: "Become a Python Developer",
    blurb:
      "Python is the highest-volume non-Java language in Pune hiring — 1,400–1,800 listings/month across backend, data science, ML, and the rapidly-growing agentic AI segment. Full roadmap with 12-month plan, 4 specialisation tracks, salary bands, and 8 common mistakes.",
    status: "live",
  },
  {
    slug: "full-stack-developer",
    title: "Become a Full Stack Developer",
    blurb:
      "Pune's most-hired role title — 1,800+ monthly listings. Full roadmap covering MERN vs Java FS vs .NET FS vs Python FS, the 12-month plan, salary trajectory, and 8 common mistakes.",
    status: "live",
  },
  {
    slug: "data-science-ai",
    title: "Data Science / AI / ML Career",
    blurb:
      "Four hireable tracks (Analyst, Data Scientist, ML Engineer, Agentic AI) — Pune ZS Associates, Mu Sigma, Tiger Analytics, Persistent ML hiring map. ₹3-15 LPA fresher band depending on specialisation. 14-month plan with statistics + ML + portfolio depth.",
    status: "live",
  },
  {
    slug: "first-it-job-pune",
    title: "Land Your First IT Job in Pune",
    blurb:
      "Path-agnostic playbook (works for any tech stack): the 4 pillars of fresher hireability, the 90-day search plan, services-vs-product trade-off matrix, 8 patterns that derail freshers. Built from 17 years of placement data — 5,000+ freshers placed.",
    status: "live",
  },
];

export default function CareerPathsHub() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Career Paths", url: "/career-paths" },
        ]}
      />

      <article aria-labelledby="hub-title">
        <header className="gradient-hero text-white py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <Breadcrumbs
              variant="light"
              items={[{ name: "Career Paths" }]}
            />
            <p className="uppercase text-xs tracking-wider opacity-80 mb-3 mt-2">
              Pune IT · Career Roadmaps · 2026
            </p>
            <h1
              id="hub-title"
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 max-w-4xl"
            >
              Pune IT Career Paths
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl">
              Deep-dive roadmaps for the four most common Pune IT career
              tracks — each pillar covers the 12-month plan, specialisations,
              salary bands, hiring companies, and mistakes to avoid.
            </p>
          </div>
        </header>

        <div className="container mx-auto px-4 py-12 md:py-16 space-y-10 max-w-4xl">
          <DefinitiveAnswer eyebrow="What this section is">
            Career Paths are long-form pillar pages — each one a complete
            roadmap from beginner to first Pune offer for a specific track.
            They link out to focused comparison posts, project guides, and
            tools we&apos;ve published. Use them as a single anchor for
            planning your next 6–12 months of skill investment.
          </DefinitiveAnswer>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pillars.map((p) => {
              const isLive = p.status === "live";
              const cardClasses = isLive
                ? "rounded-lg border p-5 bg-card hover:border-secondary transition-colors flex flex-col"
                : "rounded-lg border p-5 bg-muted/30 flex flex-col opacity-75";
              const cardContent = (
                <>
                  <div className="flex items-baseline justify-between gap-2 mb-2">
                    <h2 className="font-semibold text-lg">{p.title}</h2>
                    {!isLive && (
                      <span className="text-xs uppercase tracking-wider text-muted-foreground">
                        Coming soon
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-grow">
                    {p.blurb}
                  </p>
                  {isLive && (
                    <span className="inline-flex items-center gap-1 text-sm text-primary font-medium mt-3">
                      Read the roadmap
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  )}
                </>
              );
              return isLive ? (
                <Link
                  key={p.slug}
                  href={`/career-paths/${p.slug}`}
                  className={cardClasses}
                >
                  {cardContent}
                </Link>
              ) : (
                <div key={p.slug} className={cardClasses}>
                  {cardContent}
                </div>
              );
            })}
          </section>

          <section className="rounded-lg border-l-4 border-secondary bg-muted/30 p-5">
            <h2 className="text-lg font-bold mb-2 flex items-center gap-2">
              <Compass className="h-5 w-5 text-secondary" />
              Looking for the interactive version?
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Our{" "}
              <Link
                href="/tools/pune-it-career-roadmap"
                className="text-primary hover:underline font-medium"
              >
                Pune IT Career Roadmap tool
              </Link>{" "}
              maps four common starting points (after 12th, engineering
              student, graduate, working professional) to bootcamp / course
              recommendations and a salary trajectory. Career Paths above are
              the deeper read; the tool is the quick navigator.
            </p>
          </section>
        </div>
      </article>
    </>
  );
}
