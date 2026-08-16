import Link from "next/link";
import {
  CheckCircle,
  XCircle,
  GraduationCap,
  Briefcase,
  TrendingUp,
  MapPin,
  Monitor,
  Calendar,
  IndianRupee,
  Trophy,
  Scale,
  Sparkles,
  Layers,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReportDownloadForm } from "@/components/reports/report-download-form";
import type { CourseRichContent } from "@/data/course-content/types";

interface RichCourseContentProps {
  rich: CourseRichContent;
  /**
   * Short course name (e.g. "Java", "AWS", "MERN Stack") used to keep the
   * keyword-bearing H3s in sync with the actual course. Without this the
   * "companies hiring …" H3 would read "Java" on every page (P4-05).
   */
  courseName: string;
}

/**
 * Above-the-fold half (sections 1–3) of the long-form course detail
 * layout — Intro, Why Learn, Who Is This For. Rendered synchronously so
 * the hero + first ~10 KB of HTML ship in the initial streaming flush.
 * Crawler-visible like the rest.
 */
export function RichCourseContentAboveFold({
  rich,
}: Pick<RichCourseContentProps, "rich">) {
  return (
    <div className="space-y-12">
      {/* Section 1 — Intro paragraph (lives directly under the H1 in the hero) */}
      <section className="prose prose-slate max-w-none">
        <p className="text-lg leading-relaxed text-foreground">{rich.intro}</p>
      </section>

      {/* Section 2 — Why learn */}
      <section className="space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
          <Sparkles className="h-7 w-7 text-secondary" />
          {rich.whyLearn.heading}
        </h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          {rich.whyLearn.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        {rich.whyLearn.keyPoints && rich.whyLearn.keyPoints.length > 0 && (
          <ul className="grid sm:grid-cols-2 gap-3 mt-4 pt-4 border-t">
            {rich.whyLearn.keyPoints.map((point, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Section 3 — Who is this for / NOT for */}
      <section className="space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold">Who This Course Is For</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-emerald-200 bg-emerald-50/40">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2 text-emerald-700">
                <CheckCircle className="h-5 w-5" />
                For You If
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm">
                {rich.whoIsThisFor.forYou.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card className="border-rose-200 bg-rose-50/40">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2 text-rose-700">
                <XCircle className="h-5 w-5" />
                Not For You If
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm">
                {rich.whoIsThisFor.notForYou.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

    </div>
  );
}

/**
 * Below-the-fold half (sections 4–13) of the course detail layout —
 * Curriculum, Capstone Projects, Career Outcomes, Modes & Duration,
 * Fees, Placement Support, Comparison, Versus Alternative, Prerequisites.
 *
 * Renders synchronously, in document order.
 *
 * This used to be `async` with a bare `await Promise.resolve()` purely to
 * force a Suspense streaming boundary, on the reasoning that it cut the
 * first response chunk from ~494 KB to ~30–40 KB and improved lab LCP.
 * That reasoning applies to dynamically server-rendered pages. These pages
 * are **SSG** (`● /courses/[category]/[slug]` in the build output) —
 * prerendered to a static HTML file at build time and served whole, so
 * there is no request-time streaming to optimise. The hero is already the
 * first bytes of that file either way, so it paints just as early without
 * the boundary.
 *
 * What the boundary did cost was document order. Measured on the built
 * Java Full Stack page: the Suspense fallback ("Loading course details…")
 * sat at 11.4% of the file, `<footer>` at 16.2%, and the actual curriculum
 * only at 20.3% — inside `<template>` chunks that require JavaScript to be
 * moved into place. Googlebot executes JS and handles that fine, but the
 * AI crawlers this site is explicitly optimising for (GPTBot, ClaudeBot,
 * PerplexityBot, CCBot) largely do not. To them the course body read as a
 * loading placeholder followed by a footer.
 *
 * If lab LCP regresses after this change, fix it by trimming the payload
 * rather than by hiding the body behind a boundary again.
 */
export function RichCourseContentBelowFold({
  rich,
  courseName,
}: RichCourseContentProps) {
  return (
    <div className="space-y-12">
      {/* Section 4 — Curriculum */}
      <section className="space-y-4 pt-8">
        <hr className="border-t border-border" />
        <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
          <GraduationCap className="h-7 w-7 text-secondary" />
          Detailed Curriculum
        </h2>

        {/* Optional visual roadmap. Lazy-loaded with explicit intrinsic
            dimensions: this sits below the fold and must never become the
            LCP element, and CLS on these pages is 0.00 in field data.
            Plain <img> with <picture> rather than next/image — the source is
            a static, already-optimised asset in /public, so the optimiser
            would add a round trip for no gain. */}
        {rich.roadmapImage && (
          <figure className="my-6">
            <picture>
              <source
                srcSet={rich.roadmapImage.src.replace(/\.webp$/, ".avif")}
                type="image/avif"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={rich.roadmapImage.src}
                alt={rich.roadmapImage.alt}
                width={rich.roadmapImage.width}
                height={rich.roadmapImage.height}
                loading="lazy"
                decoding="async"
                className="w-full h-auto rounded-xl border bg-muted/20"
              />
            </picture>
            {(rich.roadmapImage.caption || rich.roadmapImage.fullSizeHref) && (
              <figcaption className="mt-2 text-sm text-muted-foreground">
                {rich.roadmapImage.caption}
                {rich.roadmapImage.fullSizeHref && (
                  <>
                    {" "}
                    <a
                      href={rich.roadmapImage.fullSizeHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Open the full-size version
                    </a>{" "}
                    to read it comfortably on a phone.
                  </>
                )}
              </figcaption>
            )}
          </figure>
        )}

        <div className="space-y-5">
          {rich.curriculum.map((module, i) => (
            <Card
              key={i}
              className={
                module.highlight
                  ? "border-emerald-200 bg-emerald-50/40 dark:border-emerald-500/40 dark:bg-emerald-500/10"
                  : undefined
              }
            >
              <CardHeader>
                <div className="flex items-start gap-3">
                  <span
                    className={`flex items-center justify-center w-9 h-9 rounded-full text-sm font-semibold shrink-0 ${
                      module.highlight
                        ? "bg-emerald-600 text-white"
                        : "bg-primary text-primary-foreground"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <div className="flex-grow">
                    <CardTitle className="text-lg">{module.title}</CardTitle>
                    {module.weekRange && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {module.weekRange}
                      </p>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {module.description}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {module.topics.map((topic, ti) => {
                    const highlightTopic =
                      module.highlight && ti === module.topics.length - 1;
                    return (
                      <Badge
                        key={topic}
                        variant="outline"
                        className={
                          highlightTopic
                            ? "text-xs border-emerald-600 bg-emerald-600 text-white dark:bg-emerald-500 dark:border-emerald-500"
                            : "text-xs"
                        }
                      >
                        {topic}
                      </Badge>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Optional gated syllabus PDF. Reuses the report lead-capture flow
            with its own source tag so admin can segment these leads.
            The PDF is noindex (next.config.ts) — it duplicates this page by
            design, and this page is the canonical, indexable copy. */}
        {rich.syllabusDownload && (
          <div className="mt-8 rounded-xl border bg-muted/30 p-6 md:p-7">
            <h3 className="text-lg md:text-xl font-semibold mb-2">
              Download the full syllabus as a PDF
            </h3>
            <p className="text-sm text-muted-foreground mb-5 max-w-2xl">
              {rich.syllabusDownload.blurb}
            </p>
            <ReportDownloadForm
              reportSlug={rich.syllabusDownload.slug}
              pdfUrl={rich.syllabusDownload.pdfUrl}
              reportTitle={rich.syllabusDownload.title}
              nounLabel="syllabus"
            />
          </div>
        )}
      </section>

      {/* Section 5 — Capstone projects */}
      <section className="space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
          <Briefcase className="h-7 w-7 text-secondary" />
          Capstone Projects You Will Build
        </h2>
        <div className="space-y-5">
          {rich.projects.map((project, i) => (
            <Card key={i} className="bg-muted/30">
              <CardHeader>
                <CardTitle className="text-lg">
                  Project {i + 1}: {project.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Section 7 — Career outcomes & salaries */}
      <section className="space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
          <TrendingUp className="h-7 w-7 text-secondary" />
          Career Outcomes & Salaries in Pune
        </h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          {rich.careerOutcomes.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div className="overflow-x-auto pt-4">
          <table className="w-full text-sm border rounded-lg overflow-hidden">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-3 font-semibold">Role</th>
                <th className="text-left p-3 font-semibold">Salary band</th>
                <th className="text-left p-3 font-semibold">Source</th>
              </tr>
            </thead>
            <tbody>
              {rich.careerOutcomes.salaryBands.map((band, i) => (
                <tr key={i} className="border-t">
                  <td className="p-3">{band.role}</td>
                  <td className="p-3 font-medium">{band.band}</td>
                  <td className="p-3">
                    <a
                      href={band.source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {band.source.label}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid md:grid-cols-2 gap-6 pt-4">
          <div>
            <h3 className="font-semibold mb-3">
              Pune companies hiring {courseName} professionals in 2026
            </h3>
            <div className="flex flex-wrap gap-2">
              {rich.careerOutcomes.hiringCompanies.map((company) => (
                <Badge key={company} variant="outline">
                  {company}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Roles after this {courseName} course</h3>
            <div className="flex flex-wrap gap-2">
              {rich.careerOutcomes.rolesAfterCourse.map((role) => (
                <Badge key={role} variant="secondary">
                  {role}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 8 — Modes & duration */}
      <section className="space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
          <Calendar className="h-7 w-7 text-secondary" />
          Course Duration, Batches & Modes in Pune
        </h2>
        <p className="text-muted-foreground">
          <strong className="text-foreground">Duration:</strong> {rich.modesAndDuration.duration}
        </p>
        <div className="grid md:grid-cols-3 gap-5">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Classroom
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm font-medium">{rich.modesAndDuration.classroom.location}</p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {rich.modesAndDuration.classroom.timing.map((t, i) => (
                  <li key={i}>• {t}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Monitor className="h-5 w-5 text-primary" />
                Online Live
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <ul className="space-y-1 text-sm text-muted-foreground">
                {rich.modesAndDuration.online.timing.map((t, i) => (
                  <li key={i}>• {t}</li>
                ))}
              </ul>
              {rich.modesAndDuration.online.tools && (
                <div className="pt-2">
                  <p className="text-xs text-muted-foreground mb-1">Tools used:</p>
                  <div className="flex flex-wrap gap-1">
                    {rich.modesAndDuration.online.tools.map((tool) => (
                      <Badge key={tool} variant="outline" className="text-xs">
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          {rich.modesAndDuration.weekend && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Weekend
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {rich.modesAndDuration.weekend.timing.map((t, i) => (
                    <li key={i}>• {t}</li>
                  ))}
                </ul>
                {rich.modesAndDuration.weekend.durationNote && (
                  <p className="text-xs text-muted-foreground pt-2 border-t">
                    {rich.modesAndDuration.weekend.durationNote}
                  </p>
                )}
              </CardContent>
            </Card>
          )}
        </div>
        {rich.modesAndDuration.batchPolicy && (
          <p className="text-sm text-muted-foreground italic pt-2">
            {rich.modesAndDuration.batchPolicy}
          </p>
        )}
      </section>

      {/* Section 9 — Fees */}
      <section className="space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
          <IndianRupee className="h-7 w-7 text-secondary" />
          {courseName} Course Fees in Pune
        </h2>
        <Card className="bg-muted/30">
          <CardContent className="pt-6 space-y-3">
            <p className="text-muted-foreground">{rich.fees.note}</p>
            {rich.fees.range && (
              <p className="text-muted-foreground">{rich.fees.range}</p>
            )}
            {rich.fees.sourceCitation && (
              <p className="text-xs text-muted-foreground">
                Market range source:{" "}
                <a
                  href={rich.fees.sourceCitation.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {rich.fees.sourceCitation.label}
                </a>
              </p>
            )}
            {rich.fees.paymentOptions && rich.fees.paymentOptions.length > 0 && (
              <div className="pt-3 border-t">
                <p className="text-sm font-medium mb-2">Payment options:</p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {rich.fees.paymentOptions.map((opt, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                      {opt}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      {/* Section 10 — Placement support */}
      <section className="space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
          <Trophy className="h-7 w-7 text-secondary" />
          Placement Support in Pune
        </h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          {rich.placementSupport.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-6 pt-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Placement process — week by week</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-2 text-sm text-muted-foreground list-decimal pl-5">
                {rich.placementSupport.process.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Partner companies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {rich.placementSupport.partnerCompanies.map((company) => (
                  <Badge key={company} variant="outline">
                    {company}
                  </Badge>
                ))}
              </div>
              <Link
                href="/placements"
                className="inline-block mt-4 text-sm text-primary hover:underline"
              >
                See recent placement records →
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Section 11 — Comparison table */}
      <section className="space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
          <Scale className="h-7 w-7 text-secondary" />
          How Archer Infotech Compares
        </h2>
        {rich.comparison.intro && (
          <p className="text-muted-foreground">{rich.comparison.intro}</p>
        )}
        <div className="overflow-x-auto">
          <table className="w-full text-sm border rounded-lg overflow-hidden">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-3 font-semibold">Factor</th>
                <th className="text-left p-3 font-semibold text-primary">Archer Infotech</th>
                <th className="text-left p-3 font-semibold">Typical Pune institute</th>
              </tr>
            </thead>
            <tbody>
              {rich.comparison.rows.map((row, i) => (
                <tr key={i} className="border-t">
                  <td className="p-3 font-medium">{row.feature}</td>
                  <td className="p-3 text-emerald-700">{row.archer}</td>
                  <td className="p-3 text-muted-foreground">{row.typical}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {rich.comparison.closing && (
          <p className="text-sm text-muted-foreground italic">{rich.comparison.closing}</p>
        )}
      </section>

      {/* Section 12 — Versus alternative */}
      {rich.versusAlternative && (
        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
            <Layers className="h-7 w-7 text-secondary" />
            {rich.versusAlternative.heading}
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            {rich.versusAlternative.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>
      )}

      {/* Section 13 — Prerequisites & how to start */}
      <section className="space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold">Prerequisites & How to Start</h2>
        <div className="space-y-3 text-muted-foreground leading-relaxed">
          {rich.prerequisitesAndStart.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <ol className="space-y-2 list-decimal pl-6 pt-2">
          {rich.prerequisitesAndStart.suggestedSteps.map((step, i) => (
            <li key={i} className="text-sm text-muted-foreground">{step}</li>
          ))}
        </ol>
      </section>
    </div>
  );
}
