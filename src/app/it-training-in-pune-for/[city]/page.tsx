import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import {
  Monitor,
  Building2,
  Bus,
  Home,
  CheckCircle,
  Phone,
  ArrowRight,
  GraduationCap,
  MapPin,
  CalendarDays,
  Award,
  Laptop,
  Users,
  Briefcase,
} from "lucide-react";
import { PageEvent } from "@/components/analytics/page-event";
import { TrackedAnchor } from "@/components/analytics/tracked-anchor";
import { AnimatedCounter } from "@/components/common/animated-counter";
import {
  BreadcrumbJsonLd,
  BranchLocalBusinessJsonLd,
} from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { FaqSection } from "@/components/seo/faq-section";
import { DefinitiveAnswer } from "@/components/seo/definitive-answer";
import { LastUpdated } from "@/components/seo/last-updated";
import { studentCities, getStudentCity } from "@/data/student-cities";
import { getCourse } from "@/data/courses";
import { siteConfig } from "@/data/site-config";
import { buildPageMetadata } from "@/lib/seo";
import { LOCATIONS_LAST_REVIEWED } from "@/lib/seo/content-dates";
import { cn } from "@/lib/utils";
import { SourceCitations } from "@/components/seo/source-citations";
import { sourcesForTopics } from "@/data/authoritative-sources";

interface CityPageProps {
  params: Promise<{ city: string }>;
}

export function generateStaticParams() {
  return studentCities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({
  params,
}: CityPageProps): Promise<Metadata> {
  const { city } = await params;
  const data = getStudentCity(city);
  if (!data) return { title: "Page Not Found" };

  return buildPageMetadata({
    title: data.metaTitle,
    description: data.metaDescription,
    path: `/it-training-in-pune-for/${city}`,
    lastModified: LOCATIONS_LAST_REVIEWED,
  });
}

const HL_ICONS = {
  Award,
  Laptop,
  Briefcase,
  Users,
  CalendarDays,
  MapPin,
} as const;

const HL_BLOCK: Record<string, string> = {
  amber: "border-amber-200 bg-amber-50",
  sky: "border-sky-200 bg-sky-50",
  emerald: "border-emerald-200 bg-emerald-50",
  violet: "border-violet-200 bg-violet-50",
};

const HL_CHIP: Record<string, string> = {
  amber: "bg-amber-100 text-amber-600",
  sky: "bg-sky-100 text-sky-600",
  emerald: "bg-emerald-100 text-emerald-600",
  violet: "bg-violet-100 text-violet-600",
};

/** Render a heading string with the given phrases wrapped in the accent colour. */
function accentHeading(text: string, phrases?: string[]) {
  if (!phrases || phrases.length === 0) return text;
  const escaped = phrases.map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const parts = text.split(new RegExp(`(${escaped.join("|")})`, "g"));
  return parts.map((part, i) =>
    phrases.includes(part) ? (
      <span key={i} className="text-secondary-bright">
        {part}
      </span>
    ) : (
      part
    )
  );
}

// Decorative dotted pattern used on the home page hero/CTA bands.
const HERO_PATTERN =
  "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")";

export default async function CityFeederPage({ params }: CityPageProps) {
  const { city } = await params;
  const data = getStudentCity(city);
  if (!data) notFound();

  const popularCourses = data.popularCourseSlugs
    .map((slug) => getCourse(slug))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  const phone = siteConfig.contact.phone;
  const phoneHref = `tel:${phone}`;
  const optionCount = data.localOffice ? "Three" : "Two";

  return (
    <>
      <PageEvent
        event="city_feeder_page_viewed"
        properties={{ city_slug: data.slug, city_name: data.city }}
      />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Courses", url: "/courses" },
          {
            name: `IT Training for ${data.city} Students`,
            url: `/it-training-in-pune-for/${data.slug}`,
          },
        ]}
      />

      {/* Per-branch LocalBusiness node — only for cities with a real,
          address-confirmed Archer office. Without this, a physical branch is
          invisible as a *place* to Google: the page reads as Pune content
          that merely mentions the city, which is exactly how Sangli was
          being resolved before 2026-08-13. */}
      {data.localOffice?.branchId && (
        <BranchLocalBusinessJsonLd branchId={data.localOffice.branchId} />
      )}

      {/* ── Hero (home-page two-column layout) ───────────────── */}
      <section className="relative overflow-hidden gradient-hero text-white">
        <div className="pointer-events-none absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: HERO_PATTERN }} />
        </div>
        <div className="container relative z-10 mx-auto px-4 pt-10 pb-16 md:pt-14 md:pb-20 lg:pt-12 lg:pb-20 xl:pt-16 xl:pb-24">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
            {/* Left — content */}
            <div className="max-w-[36rem] space-y-5 lg:space-y-4 xl:space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-white/10 px-4 py-1.5 text-sm backdrop-blur-sm">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-secondary" />
                </span>
                <span className="font-medium">
                  {data.localOffice ? `Now in ${data.localOffice.area}` : data.region}
                </span>
              </div>

              <h1 className="text-4xl font-bold leading-[1.08] md:text-[2.9rem] lg:text-[2.85rem] xl:text-[3.35rem]">
                {data.heroHeading ? (
                  accentHeading(data.heroHeading, data.heroHeadingHighlights)
                ) : (
                  <>
                    IT Training in Pune for{" "}
                    <span className="text-secondary-bright">{data.city}</span> Students
                  </>
                )}
              </h1>
              <p className="text-lg leading-relaxed text-white/80">
                {data.tagline}
              </p>

              <div className="flex flex-wrap gap-x-6 gap-y-2.5">
                {[
                  `${siteConfig.stats.yearsExperience} Years Experience`,
                  "90% Placement Support",
                  `Since ${siteConfig.foundingYear}`,
                ].map((point) => (
                  <div key={point} className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-secondary" />
                    <span className="text-sm text-white/90">{point}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex h-12 items-center justify-center whitespace-nowrap rounded-lg bg-secondary px-6 text-sm font-semibold text-secondary-foreground transition-all hover:bg-secondary/90"
                >
                  Enquire about batches <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <TrackedAnchor
                  href={phoneHref}
                  event="city_feeder_call_click"
                  properties={{ city_slug: data.slug }}
                  className="inline-flex h-12 items-center justify-center whitespace-nowrap rounded-lg border-2 border-white bg-transparent px-6 text-sm font-semibold text-white transition-all hover:bg-white hover:text-primary"
                >
                  <Phone className="mr-2 h-5 w-5 shrink-0" /> {phone}
                </TrackedAnchor>
              </div>
            </div>

            {/* Right — 2×2 stat cards (same as home) */}
            <div className="hidden lg:block">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { value: siteConfig.stats.studentsTrained, label: "Students Trained" },
                  { value: siteConfig.stats.studentsPlaced, label: "Students Placed" },
                  { value: siteConfig.stats.yearsExperience, label: "Years Experience" },
                  { value: siteConfig.stats.corporatePartners, label: "Corporate Partners" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl bg-white/10 p-6 text-center backdrop-blur-sm"
                  >
                    <div className="mb-2 text-4xl font-bold text-secondary-bright">
                      <AnimatedCounter value={stat.value} />
                    </div>
                    <div className="text-white/80">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Wave divider (same as home) */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-auto w-full"
          >
            <path
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="white"
              fillOpacity="0.1"
            />
            <path
              d="M0 120L60 115C120 110 240 100 360 95C480 90 600 90 720 92.5C840 95 960 100 1080 100C1200 100 1320 95 1380 92.5L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              className="fill-background"
            />
          </svg>
        </div>
      </section>

      {/* ── Definitive answer (intro) — matches home DAP band ── */}
      {/* Joined into one paragraph because DefinitiveAnswer renders a <p> and
          nesting <p> inside <p> is invalid. No content is lost — data.intro is
          rendered nowhere else — and the joined text runs ~110 words, which is
          the length this block is meant to be anyway. */}
      <DefinitiveAnswer eyebrow={`IT training for ${data.city} students`}>
        {data.intro.join(" ")}
      </DefinitiveAnswer>

      {/* ── Colourful highlight blocks ───────────────────────── */}
      {data.highlights && data.highlights.length > 0 && (
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {data.highlights.map((h) => {
                const Icon = HL_ICONS[h.icon] ?? Award;
                return (
                  <div
                    key={h.title}
                    className={cn("rounded-xl border p-5 shadow-sm", HL_BLOCK[h.color])}
                  >
                    <div
                      className={cn(
                        "mb-4 flex h-11 w-11 items-center justify-center rounded-lg",
                        HL_CHIP[h.color]
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold text-foreground">{h.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {h.text}
                    </p>
                  </div>
                );
              })}
            </div>

            {data.trackKeywords && data.trackKeywords.length > 0 && (
              <div className="mx-auto mt-10 max-w-5xl text-center">
                <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-secondary">
                  Courses you can learn in {data.city}
                </p>
                <div className="flex flex-wrap justify-center gap-2.5">
                  {data.trackKeywords.map((k) => (
                    <span
                      key={k}
                      className="inline-flex items-center gap-1.5 rounded-full border bg-card px-3.5 py-1.5 text-sm font-medium shadow-sm"
                    >
                      <GraduationCap className="h-3.5 w-3.5 text-primary" />
                      {k}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── Options ──────────────────────────────────────────── */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <Breadcrumbs
            items={[
              { name: "Courses", href: "/courses" },
              { name: `${data.city} Students`, href: `/it-training-in-pune-for/${data.slug}` },
            ]}
            className="mb-10 flex justify-center"
          />
          <SectionHeading
            eyebrow="Your options"
            title={
              <>
                {optionCount} ways to train with{" "}
                <span className="text-primary">Archer Infotech</span>
              </>
            }
            subtitle={
              data.optionsIntro ??
              "Same curriculum, trainers, and 90% placement support — pick the format that fits where you are and how you study."
            }
          />
          <div
            className={cn(
              "mx-auto mt-12 grid max-w-5xl gap-6",
              data.localOffice ? "md:grid-cols-3" : "md:grid-cols-2"
            )}
          >
            {data.localOffice && (
              <OptionCard
                accent="amber"
                icon={CalendarDays}
                eyebrow="Option 1 · Local"
                title={`Classroom batches in ${data.localOffice.area}`}
                body={`Real classroom, ${data.localOffice.scheduleLabel.toLowerCase()}. No travel to Pune.`}
              />
            )}
            <OptionCard
              accent="sky"
              icon={Monitor}
              eyebrow={`Option ${data.localOffice ? 2 : 1} · Online`}
              title={`Live online from ${data.city}`}
              body="Real-time, instructor-led batches you join from home. No relocation needed."
            />
            <OptionCard
              accent="emerald"
              icon={Building2}
              eyebrow={`Option ${data.localOffice ? 3 : 2} · Pune`}
              title="Classroom in Pune"
              body={`Relocate to our Kothrud centre — ${data.distanceKm} km · ${data.travelTimeLabel}.`}
            />
          </div>
        </div>
      </section>

      {/* ── Local branch office ──────────────────────────────── */}
      {data.localOffice && (
        <section className="bg-muted/30 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <SectionHeading
                align="left"
                eyebrow={data.localOffice.scheduleLabel}
                title={
                  <>
                    {data.localOffice.headingLabel ?? "Weekend batches"} at our{" "}
                    <span className="text-primary">{data.localOffice.area}</span> office
                  </>
                }
              />
              <div className="mt-6 space-y-4">
                {data.localOffice.paragraphs.map((p, i) => (
                  <p key={i} className="text-lg leading-relaxed text-muted-foreground">
                    {p}
                  </p>
                ))}
              </div>
              <p className="mt-6 flex items-start gap-3 rounded-xl border bg-card p-4 text-sm shadow-sm">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
                <span>{data.localOffice.note}</span>
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ── Online ───────────────────────────────────────────── */}
      <section className={cn("py-16 md:py-24", !data.localOffice && "bg-muted/30")}>
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <SectionHeading
              align="left"
              icon={Monitor}
              eyebrow="Live online"
              title={
                <>
                  Learn online from <span className="text-primary">{data.city}</span>
                </>
              }
            />
            <div className="mt-6 space-y-4">
              {data.online.map((p, i) => (
                <p key={i} className="text-lg leading-relaxed text-muted-foreground">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Relocation ───────────────────────────────────────── */}
      <section className={cn("py-16 md:py-24", data.localOffice && "bg-muted/30")}>
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <SectionHeading
              align="left"
              icon={Bus}
              eyebrow="Relocate to Pune"
              title={
                <>
                  Coming to Pune from <span className="text-primary">{data.city}</span>
                </>
              }
            />
            <div className="mt-6 space-y-4">
              {data.relocation.travelParagraphs.map((p, i) => (
                <p key={i} className="text-lg leading-relaxed text-muted-foreground">
                  {p}
                </p>
              ))}
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {data.relocation.travelModes.map((m) => (
                <div key={m.mode} className="rounded-xl border bg-card p-5 shadow-sm">
                  <p className="font-semibold">{m.mode}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {m.detail}
                  </p>
                </div>
              ))}
            </div>
            <h3 className="mt-12 flex items-center gap-2.5 text-xl font-bold">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                <Home className="h-5 w-5 text-primary" />
              </span>
              Where {data.city} students stay near the centre
            </h3>
            <div className="mt-4 space-y-4">
              {data.relocation.stayParagraphs.map((p, i) => (
                <p key={i} className="leading-relaxed text-muted-foreground">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Archer + stats ───────────────────────────────── */}
      <section className={cn("py-16 md:py-24", !data.localOffice && "bg-muted/30")}>
        <div className="container mx-auto px-4">
          <SectionHeading
            eyebrow="Why Archer"
            title={
              <>
                Why {data.city} students choose{" "}
                <span className="text-primary">Archer Infotech</span>
              </>
            }
            subtitle={
              data.whyIntro ??
              "Pune's established IT-training institute — trusted by thousands of students and a deep hiring-partner network."
            }
          />

          <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
            {data.whyArcher.map((point, i) => (
              <div
                key={i}
                className="group flex items-start gap-4 rounded-xl border bg-card p-6 shadow-sm transition-all hover:border-primary/20 hover:shadow-lg"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary">
                  <CheckCircle className="h-5 w-5 text-primary group-hover:text-primary-foreground" />
                </div>
                <p className="leading-relaxed text-muted-foreground">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Popular courses ──────────────────────────────────── */}
      {popularCourses.length > 0 && (
        <section className={cn("py-16 md:py-24", data.localOffice && "bg-muted/30")}>
          <div className="container mx-auto px-4">
            <SectionHeading
              eyebrow="Courses"
              title={
                <>
                  Popular <span className="text-primary">courses</span>
                </>
              }
              subtitle={
                data.coursesIntro ??
                `Job-focused tracks our ${data.city} students choose most.`
              }
            />
            <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2">
              {popularCourses.map((course) => (
                <Link
                  key={course.slug}
                  href={`/courses/${course.categorySlug}/${course.slug}`}
                  className="group flex items-center justify-between gap-4 rounded-xl border bg-card p-6 shadow-sm transition-all hover:border-primary/20 hover:shadow-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary">
                      <GraduationCap className="h-6 w-6 text-primary group-hover:text-primary-foreground" />
                    </div>
                    <span className="font-semibold group-hover:text-primary">
                      {course.title}
                    </span>
                  </div>
                  <ArrowRight className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FAQ (shared home component, emits FAQPage schema) ── */}
      <FaqSection
        heading={`${data.city} students — frequently asked`}
        items={data.localFaqs}
        anchorId="city-faqs"
      />

      {/* Outbound citations resolved from the page's OWN popularCourseSlugs
          rather than a hardcoded track list, so the references stay correct
          if a city's featured courses change. The page's claim is "these
          tracks are taught here", which is exactly what the vendor
          documentation backs. Audit 2026-08-06. */}
      <SourceCitations
        heading="Curriculum references"
        intro={`Official documentation for the tracks ${data.city} students train on.`}
        items={sourcesForTopics(data.popularCourseSlugs)}
        anchorId="city-sources"
      />

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden gradient-hero py-16 text-white md:py-24">
        <div className="pointer-events-none absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: HERO_PATTERN }} />
        </div>
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl lg:text-5xl">
              Ready to start, <span className="text-secondary">{data.city}?</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-white/80">
              Talk to our team about online and classroom batch dates, fees, and
              placement support.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex h-12 items-center justify-center whitespace-nowrap rounded-lg bg-secondary px-6 text-sm font-semibold text-secondary-foreground transition-all hover:bg-secondary/90"
              >
                Enquire Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <TrackedAnchor
                href={phoneHref}
                event="city_feeder_call_click"
                properties={{ city_slug: data.slug, position: "footer" }}
                className="inline-flex h-12 items-center justify-center whitespace-nowrap rounded-lg border-2 border-white bg-transparent px-6 text-sm font-semibold text-white transition-all hover:bg-white hover:text-primary"
              >
                <Phone className="mr-2 h-5 w-5 shrink-0" /> Call {phone}
              </TrackedAnchor>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm">
              {["Free Career Counseling", "Demo Classes Available", "Flexible Payment Options"].map(
                (point) => (
                  <div key={point} className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-secondary" />
                    <span>{point}</span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Cross-links + last updated ───────────────────────── */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            {studentCities.length > 1 && (
              <>
                <p className="mb-3 text-sm font-medium text-muted-foreground">
                  IT training in Pune for students from other cities:
                </p>
                <div className="flex flex-wrap gap-2">
                  {studentCities
                    .filter((c) => c.slug !== data.slug)
                    .map((c) => (
                      <Link
                        key={c.slug}
                        href={`/it-training-in-pune-for/${c.slug}`}
                        className="rounded-full border px-4 py-1.5 text-sm transition-colors hover:bg-muted"
                      >
                        {c.city}
                      </Link>
                    ))}
                </div>
              </>
            )}
            <div className="mt-6">
              <LastUpdated iso={LOCATIONS_LAST_REVIEWED} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ── Local presentational helpers ──────────────────────────── */

function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  icon: Icon,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  align?: "center" | "left";
  icon?: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      {Icon && (
        <div
          className={cn(
            "mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10",
            align === "center" && "mx-auto"
          )}
        >
          <Icon className="h-6 w-6 text-primary" />
        </div>
      )}
      {eyebrow && (
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-secondary md:text-sm">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-lg leading-relaxed text-muted-foreground",
            align === "center" && "mx-auto max-w-2xl"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

function OptionCard({
  accent,
  icon: Icon,
  eyebrow,
  title,
  body,
}: {
  accent: "amber" | "sky" | "emerald";
  icon: React.ComponentType<{ className?: string }>;
  eyebrow: string;
  title: string;
  body: string;
}) {
  const chip: Record<typeof accent, string> = {
    amber: "bg-amber-100 text-amber-600",
    sky: "bg-sky-100 text-sky-600",
    emerald: "bg-emerald-100 text-emerald-600",
  };
  return (
    <div className="group flex flex-col rounded-xl border bg-card p-6 shadow-sm transition-all hover:border-primary/20 hover:shadow-lg">
      <div
        className={cn(
          "mb-5 flex h-12 w-12 items-center justify-center rounded-lg",
          chip[accent]
        )}
      >
        <Icon className="h-6 w-6" />
      </div>
      <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {eyebrow}
      </p>
      <h3 className="text-lg font-semibold leading-snug">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}
