import { Metadata } from "next";
import Link from "next/link";
import {
  MapPin,
  Rocket,
  GraduationCap,
  Briefcase,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { PageEvent } from "@/components/analytics/page-event";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { DefinitiveAnswer } from "@/components/seo/definitive-answer";
import { FaqSection } from "@/components/seo/faq-section";
import { careerPaths } from "@/data/career-roadmap";
import { getCourse } from "@/data/courses";
import { getSalaryRole, formatRange, formatLpa } from "@/data/salary-data";
import { buildPageMetadata } from "@/lib/seo";
import { EVERGREEN_LAST_REVIEWED } from "@/lib/seo/content-dates";

const PAGE_PATH = "/tools/pune-it-career-roadmap";

export const metadata: Metadata = buildPageMetadata({
  title: "Pune IT Career Roadmap 2026",
  description:
    "A step-by-step IT career roadmap for Pune — whether you're after 12th, an engineering student, a graduate or a working professional. See the programme, courses, target roles and salary trajectory for your path.",
  path: PAGE_PATH,
  lastModified: EVERGREEN_LAST_REVIEWED,
});

const roadmapFaqs = [
  {
    question: "How do I start an IT career in Pune after 12th?",
    answer:
      "Start with a foundations programme like CodeLeap during the gap after 12th, then add a job-ready specialisation (full-stack, Python or data) alongside your degree, and use placement support in your final year. No prior coding background is needed.",
  },
  {
    question: "What is the fastest path to an IT job for a graduate in Pune?",
    answer:
      "For graduates, a full-time intensive programme like TechReady (6–8 months, real projects + placement support) is the fastest credible path. It's open to any degree and includes direct hiring connections with 100+ companies.",
  },
  {
    question: "Can a working professional switch into IT in Pune?",
    answer:
      "Yes. Upskill on weekends or online while employed — typically into cloud, DevOps, data or AI, which command the highest Pune salary bands — then transition with placement support, or commit to the intensive TechReady programme for a full switch.",
  },
  {
    question: "Which IT career path pays the most in Pune?",
    answer:
      "AI/GenAI, machine learning and cloud tracks reach the highest senior bands in Pune (often ₹25–50 LPA+). Full-stack and data-science paths also scale strongly. See the Pune IT Salary Calculator for role-by-role ranges.",
  },
];

const stepIcons = [MapPin, Rocket, GraduationCap, Briefcase, TrendingUp];

export default function CareerRoadmapPage() {
  return (
    <>
      <PageEvent event="career_roadmap_viewed" properties={{ page_path: PAGE_PATH }} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Tools", url: PAGE_PATH },
          { name: "Pune IT Career Roadmap", url: PAGE_PATH },
        ]}
      />

      {/* Hero */}
      <header className="gradient-hero text-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <Breadcrumbs variant="light" items={[{ name: "Pune IT Career Roadmap" }]} />
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 max-w-4xl">
            Pune IT Career Roadmap 2026
          </h1>
          <p className="text-lg text-white/85 max-w-3xl">
            Whatever stage you&apos;re at, here&apos;s the step-by-step path into a
            Pune IT career — the right programme, the courses, the roles you can
            target, and the salary you can expect along the way.
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 md:py-16 space-y-14 max-w-4xl">
        {/* Definitive answer */}
        <DefinitiveAnswer eyebrow="Your Pune IT career path in one line">
          The fastest route into a Pune IT career depends on where you start:
          12th passouts begin with foundations (CodeLeap) then specialise during
          their degree; engineering students build a stack across semesters
          (CareerCode); graduates take an intensive placement-assisted programme
          (TechReady); and working professionals upskill on weekends into cloud,
          data or AI. Every path leads through real projects, placement support
          and Pune fresher salaries of ₹3.5–7 LPA, rising to ₹15–35 LPA+ with
          experience. Pick your starting point below.
        </DefinitiveAnswer>

        {/* Path nav */}
        <nav aria-label="Choose your starting point" className="flex flex-wrap gap-2">
          {careerPaths.map((p) => (
            <a
              key={p.id}
              href={`#${p.id}`}
              className="inline-flex items-center gap-1 rounded-full border bg-background px-4 py-2 text-sm font-medium hover:border-primary hover:text-primary transition-colors"
            >
              {p.navLabel}
            </a>
          ))}
        </nav>

        {/* Paths */}
        {careerPaths.map((path) => {
          const courses = path.courseSlugs
            .map((s) => getCourse(s))
            .filter((c): c is NonNullable<typeof c> => Boolean(c));
          const roles = path.targetRoleIds
            .map((id) => getSalaryRole(id))
            .filter((r): r is NonNullable<typeof r> => Boolean(r));
          const trajectory = getSalaryRole(path.trajectoryRoleId);

          return (
            <section
              key={path.id}
              id={path.id}
              className="scroll-mt-24 space-y-6 border-t pt-12"
            >
              <div>
                <span className="inline-block text-xs font-semibold uppercase tracking-wide text-secondary mb-1">
                  Starting point
                </span>
                <h2 className="text-2xl md:text-3xl font-bold">{path.startingPoint}</h2>
                <p className="text-muted-foreground mt-2 leading-relaxed">{path.intro}</p>
                <Link
                  href={`/courses/for/${path.audienceSlug}`}
                  className="inline-flex items-center gap-1 text-sm text-primary font-medium hover:underline mt-2"
                >
                  More for {path.navLabel.toLowerCase()} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {/* Stepped journey */}
              <ol className="space-y-4">
                {/* Step: programme */}
                <li className="flex gap-4">
                  <StepDot index={1} />
                  <div className="flex-grow rounded-lg border p-4 bg-muted/20">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">
                      Recommended programme
                    </p>
                    <Link
                      href={`/bootcamps/${path.bootcamp.slug}`}
                      className="font-semibold text-primary hover:underline"
                    >
                      {path.bootcamp.name} →
                    </Link>
                    <p className="text-sm text-muted-foreground mt-1">{path.bootcamp.why}</p>
                  </div>
                </li>

                {/* Step: courses */}
                {courses.length > 0 && (
                  <li className="flex gap-4">
                    <StepDot index={2} />
                    <div className="flex-grow rounded-lg border p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                        Core courses
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {courses.map((c) => (
                          <Link
                            key={c.id}
                            href={`/courses/${c.categorySlug}/${c.slug}`}
                            className="inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-sm hover:border-primary hover:text-primary transition-colors"
                          >
                            {c.shortTitle} →
                          </Link>
                        ))}
                      </div>
                    </div>
                  </li>
                )}

                {/* Step: roles */}
                {roles.length > 0 && (
                  <li className="flex gap-4">
                    <StepDot index={3} />
                    <div className="flex-grow rounded-lg border p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                        Roles you can target
                      </p>
                      <ul className="space-y-1.5">
                        {roles.map((r) => (
                          <li key={r.id} className="flex items-center justify-between gap-3 text-sm">
                            <span>{r.title}</span>
                            <span className="text-muted-foreground shrink-0">
                              avg {formatLpa(r.puneAverage)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                )}

                {/* Step: salary trajectory */}
                {trajectory && (
                  <li className="flex gap-4">
                    <StepDot index={4} />
                    <div className="flex-grow rounded-lg border p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                        Salary trajectory — {trajectory.title} (Pune)
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {trajectory.tiers.map((t) => (
                          <div key={t.level} className="rounded-md bg-muted/40 p-3 text-center">
                            <p className="text-xs text-muted-foreground">{t.label}</p>
                            <p className="text-sm font-semibold text-primary mt-1">
                              {formatRange(t.min, t.max)}
                            </p>
                            <p className="text-[11px] text-muted-foreground">{t.years}</p>
                          </div>
                        ))}
                      </div>
                      <Link
                        href="/tools/pune-it-salary-calculator"
                        className="inline-flex items-center gap-1 text-sm text-primary font-medium hover:underline mt-3"
                      >
                        Explore all roles in the salary calculator <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </li>
                )}
              </ol>

              {/* Qualitative stages */}
              <div className="grid sm:grid-cols-3 gap-4">
                {path.stages.map((s, i) => (
                  <div key={i} className="rounded-lg border p-4">
                    <p className="text-xs font-semibold text-secondary">{s.timeframe}</p>
                    <p className="font-medium text-sm mt-1">{s.title}</p>
                    <p className="text-sm text-muted-foreground mt-1">{s.detail}</p>
                  </div>
                ))}
              </div>
            </section>
          );
        })}

        {/* FAQ */}
        <FaqSection
          heading="Pune IT career roadmap — FAQs"
          intro="How to start, the fastest paths, switching careers, and which paths pay the most."
          items={roadmapFaqs}
        />

        {/* CTA */}
        <section className="rounded-xl border bg-muted/30 p-6 md:p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">Not sure which path is yours?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Book a free counselling session — we&apos;ll map a roadmap to your
            goals, current stage and schedule.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <TrackedLink
              href="/contact"
              className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-medium hover:bg-secondary/90 transition-colors"
              event="course_enquiry_clicked"
              properties={{ location: "career_roadmap_cta" }}
            >
              Book Free Counselling
            </TrackedLink>
            <Link
              href="/bootcamps"
              className="inline-flex items-center gap-2 border px-6 py-3 rounded-lg font-medium hover:bg-muted transition-colors"
            >
              Compare bootcamps
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

function StepDot({ index }: { index: number }) {
  const Icon = stepIcons[index] ?? MapPin;
  return (
    <div className="shrink-0 flex flex-col items-center">
      <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground">
        <Icon className="h-5 w-5" />
      </span>
    </div>
  );
}
