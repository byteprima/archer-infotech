import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  CheckCircle,
  Clock,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Rocket,
  Target,
  Users,
} from "lucide-react";
import { TrackedAnchor } from "@/components/analytics/tracked-anchor";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { type Bootcamp } from "@/data/bootcamps";
import { siteConfig } from "@/data/site-config";
import { cn } from "@/lib/utils";

const pillButtonBaseClass =
  "inline-flex items-center justify-center gap-1.5 rounded-full border text-sm font-semibold whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

const secondaryPillButtonClass = cn(
  pillButtonBaseClass,
  "h-11 border-transparent bg-secondary px-6 text-secondary-foreground hover:bg-secondary/80"
);

const outlinePillButtonClass = cn(
  pillButtonBaseClass,
  "h-11 border-border bg-background px-5 text-foreground hover:bg-muted"
);

const primaryPillButtonClass = cn(
  pillButtonBaseClass,
  "h-11 border-transparent bg-primary px-5 text-primary-foreground hover:bg-primary/90"
);

const bootcampThemes: Record<
  Bootcamp["id"],
  {
    eyebrow: string;
    stage: string;
    summary: string;
    statAccent: string;
    statBorder: string;
    panelTone: string;
  }
> = {
  codeleap: {
    eyebrow: "Vacation Coding Bootcamp",
    stage: "Best for students before college begins",
    summary:
      "Build confidence before semester one with beginner-friendly tracks and project-based learning.",
    statAccent: "text-accent",
    statBorder: "border-accent/20",
    panelTone: "from-accent/10 via-background to-background",
  },
  careercode: {
    eyebrow: "Semester-by-Semester Career Track",
    stage: "Best for engineering, BCA, and BSc CS students",
    summary:
      "Add practical skills, internships, and placement readiness alongside your degree, not after it.",
    statAccent: "text-secondary",
    statBorder: "border-secondary/25",
    panelTone: "from-secondary/10 via-background to-background",
  },
  techready: {
    eyebrow: "Full-Time Placement Program",
    stage: "Best for final-year students and graduates",
    summary:
      "Train like a working professional with intensive delivery, capstones, and placement support.",
    statAccent: "text-secondary",
    statBorder: "border-primary/20",
    panelTone: "from-primary/10 via-background to-background",
  },
};

function getDetail(bootcamp: Bootcamp, label: string) {
  return bootcamp.details.find((detail) => detail.label === label)?.value;
}

function getPathwaySummary(bootcamp: Bootcamp) {
  if (bootcamp.tracks?.length) {
    return {
      title:
        bootcamp.id === "codeleap"
          ? "Pick your first coding direction"
          : "Choose your long-term specialisation",
      body:
        bootcamp.id === "codeleap"
          ? "Each student chooses one beginner track and learns by building. The goal is a strong foundation and a visible first project."
          : "Each track maps to a real job path, so students can progress semester by semester with clearer direction and portfolio depth.",
      countLabel: `${bootcamp.tracks.length} guided tracks`,
      contentLabel: "Tracks",
    };
  }

  return {
    title: "Choose the program that matches your target role",
    body:
      "Every TechReady program combines stack-specific training with projects, interview prep, communication work, and placement support.",
    countLabel: `${bootcamp.programs?.length ?? 0} intensive programs`,
    contentLabel: "Programs",
  };
}

function getFeaturedStats(bootcamp: Bootcamp) {
  const structure = getPathwaySummary(bootcamp);

  return [
    { label: "Duration", value: getDetail(bootcamp, "Duration") ?? "Flexible" },
    { label: structure.contentLabel, value: structure.countLabel },
    { label: "Mode", value: getDetail(bootcamp, "Mode") ?? "Online + Offline" },
    {
      label:
        bootcamp.id === "techready"
          ? "Placement"
          : bootcamp.id === "careercode"
            ? "Pace"
            : "Eligibility",
      value:
        getDetail(
          bootcamp,
          bootcamp.id === "techready"
            ? "Placement Assistance"
            : bootcamp.id === "careercode"
              ? "Pace"
              : "Eligibility"
        ) ?? "Counselling available",
    },
  ];
}

function getAnchorSections(bootcamp: Bootcamp) {
  const structure = getPathwaySummary(bootcamp);

  return [
    { href: "#overview", label: "Overview" },
    { href: "#why-join", label: "Why Join" },
    { href: "#curriculum", label: structure.contentLabel },
    { href: "#included", label: "Included" },
    { href: "#faqs", label: "FAQs" },
  ];
}

function getAddressLines() {
  const { address } = siteConfig.contact;

  return [
    address.line1,
    address.line2,
    `${address.city}, ${address.state} ${address.pincode}`,
  ];
}

function TrackTabs({ bootcamp }: { bootcamp: Bootcamp }) {
  if (!bootcamp.tracks?.length) {
    return null;
  }

  return (
    <Tabs defaultValue={bootcamp.tracks[0].name} className="gap-6">
      <div className="overflow-x-auto pb-2">
        <TabsList
          size="lg"
          className="flex w-max min-w-full flex-wrap justify-start gap-2 rounded-[1.5rem] bg-transparent p-0"
        >
          {bootcamp.tracks.map((track) => (
            <TabsTrigger
              key={track.name}
              value={track.name}
              className="min-h-0 flex-none rounded-full border border-border bg-background px-4 py-3 text-sm font-semibold text-muted-foreground data-active:border-primary/30 data-active:bg-primary data-active:text-primary-foreground sm:text-base"
            >
              {track.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {bootcamp.tracks.map((track) => (
        <TabsContent key={track.name} value={track.name}>
          <Card className="overflow-hidden border-0 bg-gradient-to-br from-muted/70 via-background to-background shadow-xl ring-1 ring-foreground/10">
            <CardContent className="space-y-8 px-6 py-8 md:px-8">
              <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                <div>
                  <div className="mb-3 flex items-center gap-2">
                    <Badge variant="secondary" className="rounded-full px-3 py-1">
                      Track Focus
                    </Badge>
                    <span className="text-sm text-muted-foreground">{track.subtitle}</span>
                  </div>
                  <h3 className="text-2xl font-semibold">{track.name}</h3>
                </div>
                <div className="rounded-3xl border border-border bg-background/80 p-5">
                  <p className="mb-4 text-sm font-semibold text-foreground">
                    Skills you will build
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {track.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="outline"
                        className="rounded-full px-3 py-1"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {track.modules.map((module, index) => (
                  <div
                    key={`${track.name}-${module.title}`}
                    className="rounded-3xl border border-border bg-background/90 p-5 shadow-sm"
                  >
                    <div className="mb-4 flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                        {index + 1}
                      </span>
                      <h4 className="font-semibold">{module.title}</h4>
                    </div>
                    <p className="text-sm leading-6 text-muted-foreground">
                      {module.description}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  );
}

function ProgramTabs({ bootcamp }: { bootcamp: Bootcamp }) {
  if (!bootcamp.programs?.length) {
    return null;
  }

  return (
    <Tabs defaultValue={bootcamp.programs[0].name} className="gap-6">
      <div className="overflow-x-auto pb-2">
        <TabsList
          size="lg"
          className="flex w-max min-w-full flex-wrap justify-start gap-2 rounded-[1.5rem] bg-transparent p-0"
        >
          {bootcamp.programs.map((program) => (
            <TabsTrigger
              key={program.name}
              value={program.name}
              className="min-h-0 flex-none rounded-full border border-border bg-background px-4 py-3 text-sm font-semibold text-muted-foreground data-active:border-primary/30 data-active:bg-primary data-active:text-primary-foreground sm:text-base"
            >
              {program.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {bootcamp.programs.map((program) => (
        <TabsContent key={program.name} value={program.name}>
          <Card className="overflow-hidden border-0 bg-gradient-to-br from-muted/70 via-background to-background shadow-xl ring-1 ring-foreground/10">
            <CardContent className="space-y-8 px-6 py-8 md:px-8">
              <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                <div>
                  <div className="mb-3 flex items-center gap-2">
                    <Badge variant="secondary" className="rounded-full px-3 py-1">
                      Placement-Aligned Program
                    </Badge>
                    <span className="text-sm text-muted-foreground">{program.subtitle}</span>
                  </div>
                  <h3 className="text-2xl font-semibold">{program.name}</h3>
                  <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground md:text-base">
                    {program.description}
                  </p>
                </div>
                <div className="rounded-3xl border border-border bg-background/80 p-5">
                  <p className="mb-4 text-sm font-semibold text-foreground">
                    Career roles
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {program.careerRoles.map((role) => (
                      <Badge
                        key={role}
                        variant="outline"
                        className="rounded-full px-3 py-1"
                      >
                        {role}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {program.phases.map((phase, index) => (
                  <div
                    key={`${program.name}-${phase.name}`}
                    className="rounded-3xl border border-border bg-background/90 p-5 shadow-sm"
                  >
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                          {index + 1}
                        </span>
                        <div>
                          <h4 className="font-semibold">{phase.name}</h4>
                          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                            {phase.duration}
                          </p>
                        </div>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {phase.topics.map((topic) => (
                        <li
                          key={`${phase.name}-${topic}`}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  );
}

export function BootcampDetailPage({
  bootcamp,
  slug,
}: {
  bootcamp: Bootcamp;
  slug: string;
}) {
  const theme = bootcampThemes[bootcamp.id];
  const featuredStats = getFeaturedStats(bootcamp);
  const pathway = getPathwaySummary(bootcamp);
  const anchorSections = getAnchorSections(bootcamp);
  const addressLines = getAddressLines();
  const phoneHref = `tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`;
  const emailHref = `mailto:${siteConfig.contact.email}`;

  return (
    <>
      <section className="relative overflow-hidden gradient-hero pb-14 pt-10 text-white md:pb-20 md:pt-14">
        <div className="absolute inset-0">
          <div className="absolute left-[-8rem] top-10 h-64 w-64 rounded-full bg-secondary/20 blur-3xl" />
          <div className="absolute right-[-4rem] top-0 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
          <div className="absolute bottom-[-8rem] left-1/3 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        </div>

        <div className="container relative mx-auto px-4">
          <Link
            href="/bootcamps"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-white/80 transition-colors hover:text-white"
          >
            <ArrowRight className="h-4 w-4 rotate-180" />
            Back to all bootcamps
          </Link>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_380px] lg:items-start">
            <div>
              <div className="mb-5 flex flex-wrap items-center gap-3">
                <Badge className="rounded-full border-0 bg-white/15 px-3 py-1 text-white backdrop-blur">
                  <Rocket className="mr-1 h-3.5 w-3.5" />
                  {theme.eyebrow}
                </Badge>
                <span className="text-sm font-medium text-white/70">{theme.stage}</span>
              </div>

              <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-balance md:text-5xl lg:text-6xl">
                {bootcamp.name}
                <span className="block text-white/80">{bootcamp.tagline}</span>
              </h1>

              <p className="mt-5 max-w-3xl text-lg leading-8 text-white/80 md:text-xl">
                {bootcamp.subtitle}
              </p>

              <p className="mt-5 max-w-3xl text-base leading-7 text-white/70 md:text-lg">
                {bootcamp.hook}
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                <TrackedLink
                  href="/contact"
                  className={cn(
                    secondaryPillButtonClass,
                    "px-6"
                  )}
                  event="bootcamp_enquiry_clicked"
                  properties={{
                    bootcamp_slug: slug,
                    bootcamp_name: bootcamp.name,
                    location: "bootcamp_hero_primary_cta",
                  }}
                >
                  Book Free Counselling
                  <ArrowRight className="h-4 w-4" />
                </TrackedLink>
                <TrackedAnchor
                  href={phoneHref}
                  className={cn(
                    pillButtonBaseClass,
                    "h-11 border-white/20 bg-white/10 px-6 text-white hover:bg-white/15 hover:text-white"
                  )}
                  event="contact_method_clicked"
                  properties={{
                    method: "phone",
                    location: "bootcamp_hero_secondary_cta",
                    bootcamp_slug: slug,
                  }}
                >
                  <Phone className="h-4 w-4" />
                  Call Admissions
                </TrackedAnchor>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {featuredStats.map((stat) => (
                  <div
                    key={stat.label}
                    className={cn(
                      "rounded-3xl border bg-white/10 p-5 backdrop-blur",
                      theme.statBorder
                    )}
                  >
                    <p className="text-sm uppercase tracking-[0.18em] text-white/60">
                      {stat.label}
                    </p>
                    <p className={cn("mt-3 text-base font-semibold text-white", theme.statAccent)}>
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <aside className="lg:sticky lg:top-24">
              <div className="rounded-[2rem] border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/60">
                  Admissions Support
                </p>
                <h2 className="mt-3 text-2xl font-semibold">
                  Talk to Archer before you decide
                </h2>
                <p className="mt-3 text-sm leading-6 text-white/75">
                  We will help you choose the right track, understand batch timing, and map this program to your current stage.
                </p>

                <div className="mt-6 space-y-3 rounded-3xl border border-white/10 bg-white/10 p-5">
                  <div className="flex items-start gap-3">
                    <Clock className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                    <div>
                      <p className="font-medium">Quick response on batches</p>
                      <p className="text-sm text-white/70">
                        Ask about schedules, fees, or the best entry point.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                    <div>
                      <p className="font-medium">Mentor-led counselling</p>
                      <p className="text-sm text-white/70">
                        Get guidance based on your year, confidence level, and goals.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Briefcase className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                    <div>
                      <p className="font-medium">Career-path clarity</p>
                      <p className="text-sm text-white/70">
                        Understand where this bootcamp fits in your long-term journey.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <TrackedAnchor
                    href={phoneHref}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-medium text-white/90 transition-colors hover:bg-white/15"
                    event="contact_method_clicked"
                    properties={{
                      method: "phone",
                      location: "bootcamp_sidebar_contact",
                      bootcamp_slug: slug,
                    }}
                  >
                    <Phone className="h-4 w-4 text-secondary" />
                    {siteConfig.contact.phone}
                  </TrackedAnchor>
                  <TrackedAnchor
                    href={emailHref}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-medium text-white/90 transition-colors hover:bg-white/15"
                    event="contact_method_clicked"
                    properties={{
                      method: "email",
                      location: "bootcamp_sidebar_contact",
                      bootcamp_slug: slug,
                    }}
                  >
                    <Mail className="h-4 w-4 text-secondary" />
                    {siteConfig.contact.email}
                  </TrackedAnchor>
                  <TrackedAnchor
                    href={siteConfig.googleMaps.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-medium text-white/90 transition-colors hover:bg-white/15"
                    event="contact_method_clicked"
                    properties={{
                      method: "maps",
                      location: "bootcamp_sidebar_contact",
                      bootcamp_slug: slug,
                    }}
                  >
                    <MapPin className="h-4 w-4 text-secondary" />
                    Kothrud, Pune
                  </TrackedAnchor>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="border-b bg-background/80">
        <div className="container mx-auto flex gap-3 overflow-x-auto px-4 py-4">
          {anchorSections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
            >
              {section.label}
            </Link>
          ))}
        </div>
      </section>

      <section id="overview" className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
            <div className="rounded-[2rem] border border-border bg-card p-8 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                  <Target className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Program Overview
                  </p>
                  <h2 className="text-2xl font-semibold">Why this path works</h2>
                </div>
              </div>
              <p className="text-base leading-8 text-muted-foreground">
                {bootcamp.description}
              </p>

              <div
                className={cn(
                  "mt-8 rounded-[1.75rem] border bg-gradient-to-br p-6",
                  theme.statBorder,
                  theme.panelTone
                )}
              >
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Archer view
                </p>
                <p className="mt-3 text-lg font-semibold text-foreground">
                  {theme.summary}
                </p>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {pathway.body}
                </p>
              </div>
            </div>

            <div className="rounded-[2rem] border border-border bg-muted/30 p-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-2xl bg-secondary/15 p-3 text-secondary">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Best Fit
                  </p>
                  <h2 className="text-2xl font-semibold">Who should join {bootcamp.name}</h2>
                </div>
              </div>

              <div className="space-y-4">
                {bootcamp.targetAudience.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-border bg-background/80 px-4 py-4"
                  >
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <p className="text-sm leading-6 text-muted-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="why-join" className="bg-muted/30 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Why Students Choose It
            </p>
            <h2 className="mt-3 text-3xl font-bold text-balance md:text-4xl">
              Stronger reasons than a generic coding class
            </h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground md:text-lg">
              {pathway.title}. {bootcamp.name} is designed to feel guided, practical, and career-aware from the first module onward.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {bootcamp.whyJoin.map((reason, index) => (
              <Card
                key={reason.title}
                className="h-full rounded-[2rem] border-0 bg-background shadow-md ring-1 ring-foreground/10"
              >
                <CardContent className="flex h-full flex-col px-6 py-7">
                  <div className="mb-5 flex items-center gap-4">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-sm font-semibold text-primary">
                      {index + 1}
                    </span>
                    <h3 className="text-lg font-semibold">{reason.title}</h3>
                  </div>
                  <p className="text-sm leading-7 text-muted-foreground">
                    {reason.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="curriculum" className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Curriculum Architecture
              </p>
              <h2 className="mt-3 text-3xl font-bold text-balance md:text-4xl">
                {pathway.title}
              </h2>
              <p className="mt-4 text-base leading-7 text-muted-foreground md:text-lg">
                {pathway.body}
              </p>
            </div>
            <div className="rounded-full border border-border bg-muted/40 px-5 py-3 text-sm font-semibold text-foreground">
              {pathway.countLabel}
            </div>
          </div>

          <div className="space-y-6">
            <TrackTabs bootcamp={bootcamp} />
            <ProgramTabs bootcamp={bootcamp} />
          </div>
        </div>
      </section>

      <section id="included" className="bg-muted/30 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Included Beyond Core Training
            </p>
            <h2 className="mt-3 text-3xl font-bold text-balance md:text-4xl">
              Every {bootcamp.name} student gets more than just technical modules
            </h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground md:text-lg">
              These support layers reflect the real student journey: communication, projects, profile-building, and guidance around the next step.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {bootcamp.commonModules.map((module) => (
              <div
                key={module.title}
                className="rounded-[2rem] border border-border bg-background p-6 shadow-sm"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary/15 text-secondary">
                  <BookOpen className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold">{module.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {module.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
            <Card className="rounded-[2rem] border-0 shadow-md ring-1 ring-foreground/10">
              <CardContent className="px-0 py-0">
                <div className="border-b px-8 py-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    At A Glance
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold">{bootcamp.name} details</h2>
                </div>
                <div className="divide-y">
                  {bootcamp.details.map((detail) => (
                    <div
                      key={detail.label}
                      className="grid gap-2 px-8 py-5 md:grid-cols-[220px_minmax(0,1fr)]"
                    >
                      <span className="text-sm font-semibold text-foreground">
                        {detail.label}
                      </span>
                      <span className="text-sm leading-6 text-muted-foreground">
                        {detail.value}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="rounded-[2rem] border-0 shadow-md ring-1 ring-foreground/10">
                <CardContent className="space-y-5 px-6 py-7">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      Visit Or Contact
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold">Talk to the team</h2>
                  </div>

                  <div className="space-y-4">
                    <TrackedAnchor
                      href={phoneHref}
                      className="flex items-start gap-3 rounded-2xl border border-border px-4 py-4 transition-colors hover:bg-muted/50"
                      event="contact_method_clicked"
                      properties={{
                        method: "phone",
                        location: "bootcamp_contact_panel",
                        bootcamp_slug: slug,
                      }}
                    >
                      <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <div>
                        <p className="font-medium">Phone</p>
                        <p className="text-sm text-muted-foreground">{siteConfig.contact.phone}</p>
                      </div>
                    </TrackedAnchor>

                    <TrackedAnchor
                      href={emailHref}
                      className="flex items-start gap-3 rounded-2xl border border-border px-4 py-4 transition-colors hover:bg-muted/50"
                      event="contact_method_clicked"
                      properties={{
                        method: "email",
                        location: "bootcamp_contact_panel",
                        bootcamp_slug: slug,
                      }}
                    >
                      <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-sm text-muted-foreground">{siteConfig.contact.email}</p>
                      </div>
                    </TrackedAnchor>

                    <TrackedAnchor
                      href={siteConfig.googleMaps.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-start gap-3 rounded-2xl border border-border px-4 py-4 transition-colors hover:bg-muted/50"
                      event="contact_method_clicked"
                      properties={{
                        method: "maps",
                        location: "bootcamp_contact_panel",
                        bootcamp_slug: slug,
                      }}
                    >
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <div>
                        <p className="font-medium">Location</p>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          {addressLines.map((line) => (
                            <p key={line}>{line}</p>
                          ))}
                        </div>
                      </div>
                    </TrackedAnchor>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-[2rem] border-0 bg-primary text-primary-foreground shadow-lg">
                <CardContent className="px-6 py-7">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary-foreground/70">
                    Final Nudge
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold">{bootcamp.closingCTA.headline}</h2>
                  <p className="mt-4 text-sm leading-7 text-primary-foreground/80">
                    {bootcamp.closingCTA.body}
                  </p>
                  <TrackedLink
                    href="/contact"
                    className={cn(
                      secondaryPillButtonClass,
                      "mt-6 px-6"
                    )}
                    event="bootcamp_enquiry_clicked"
                    properties={{
                      bootcamp_slug: slug,
                      bootcamp_name: bootcamp.name,
                      location: "bootcamp_final_cta",
                    }}
                  >
                    Enquire About {bootcamp.name}
                    <ArrowRight className="h-4 w-4" />
                  </TrackedLink>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section id="faqs" className="border-t bg-muted/20 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              FAQs
            </p>
            <h2 className="mt-3 text-3xl font-bold text-balance md:text-4xl">
              Questions students usually ask before enrolling
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
            <Card className="rounded-[2rem] border-0 bg-background shadow-md ring-1 ring-foreground/10">
              <CardContent className="px-6 py-4 md:px-8 md:py-6">
                <Accordion className="w-full">
                  {bootcamp.faqs.map((faq, index) => (
                    <AccordionItem key={faq.question} value={`faq-${index}`}>
                      <AccordionTrigger className="py-5 text-left text-base font-semibold hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="pb-5 text-sm leading-7 text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>

            <div className="rounded-[2rem] border border-border bg-background p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Need A Human Answer?
              </p>
              <h3 className="mt-3 text-2xl font-semibold">Reach Archer directly</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                If you are comparing tracks, unsure about your starting level, or want help choosing between programs, we can guide you quickly.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <TrackedAnchor
                  href={phoneHref}
                  className={cn(
                    primaryPillButtonClass
                  )}
                  event="contact_method_clicked"
                  properties={{
                    method: "phone",
                    location: "bootcamp_faq_sidebar",
                    bootcamp_slug: slug,
                  }}
                >
                  <Phone className="h-4 w-4" />
                  Call Now
                </TrackedAnchor>
                <TrackedLink
                  href="/contact"
                  className={cn(
                    outlinePillButtonClass
                  )}
                  event="bootcamp_enquiry_clicked"
                  properties={{
                    bootcamp_slug: slug,
                    bootcamp_name: bootcamp.name,
                    location: "bootcamp_faq_sidebar",
                  }}
                >
                  Send Enquiry
                </TrackedLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
