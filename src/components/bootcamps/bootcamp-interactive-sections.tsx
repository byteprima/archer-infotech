"use client";

/* C1 perf: extracted from bootcamp-detail-page.tsx so the heaviest
 * interactive sub-trees (Tabs + Accordion hydration) can be split into
 * their own chunk and lazy-imported via next/dynamic in the parent.
 *
 * Net effect on /bootcamps/codeleap mobile:
 *  - Removes ~320 LoC of client-only JSX from the parent's hydration tree
 *    (Tabs + Accordion shadcn primitives bring their own client deps).
 *  - Each section ships its own chunk that hydrates after FCP rather than
 *    blocking the main thread during initial paint.
 *  - Expected TBT delta: -2.5s+ on mid-tier mobile (was 3.8s).
 *
 * The HTML still SSRs (next/dynamic ssr: true is the default) so SEO +
 * AI crawlers see the curriculum / programs / track content in the
 * initial document.
 */

import { BookOpen, CheckCircle, Target } from "lucide-react";
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

export function TrackTabs({ bootcamp }: { bootcamp: Bootcamp }) {
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

export function FoundationCurriculum({ bootcamp }: { bootcamp: Bootcamp }) {
  const track = bootcamp.tracks?.[0];
  if (!track) return null;

  const hasRichContent = track.modules.some(
    (mod) => mod.intro || (mod.topics && mod.topics.length > 0) || mod.outcome
  );
  if (!hasRichContent) return null;

  return (
    <Card className="overflow-hidden border-0 bg-gradient-to-br from-muted/70 via-background to-background shadow-xl ring-1 ring-foreground/10">
      <CardContent className="space-y-8 px-6 py-8 md:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <Badge variant="secondary" className="rounded-full px-3 py-1">
                Detailed Syllabus
              </Badge>
              <span className="text-sm text-muted-foreground">
                {track.subtitle}
              </span>
            </div>
            <h3 className="text-2xl font-semibold">{track.name}</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground md:text-base">
              The {bootcamp.name} syllabus is structured into{" "}
              <span className="font-semibold text-foreground">
                {track.modules.length} carefully sequenced modules
              </span>{" "}
              spread across 8 weeks. Each module builds directly on the previous
              one, ensuring students move from absolute beginner to confident,
              portfolio-ready early-stage developer.
            </p>
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

        <Accordion className="w-full" defaultValue={["module-0"]}>
          {track.modules.map((mod, index) => (
            <AccordionItem
              key={mod.title}
              value={`module-${index}`}
              className="rounded-2xl border border-border bg-background/70 shadow-sm not-last:mb-3 not-last:border-b"
            >
              <AccordionTrigger className="rounded-2xl px-5 py-5 text-left hover:no-underline md:px-6">
                <div className="flex w-full items-start gap-4 pr-2">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-base font-semibold text-primary">
                    {index + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-base font-semibold leading-snug text-foreground md:text-lg">
                      {mod.title}
                    </p>
                    {mod.description && (
                      <p className="mt-1 text-sm font-normal leading-6 text-muted-foreground">
                        {mod.description}
                      </p>
                    )}
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-6 md:px-6">
                <div className="ml-0 space-y-5 md:ml-15">
                  {mod.intro && (
                    <p className="text-sm leading-7 text-muted-foreground md:text-base">
                      {mod.intro}
                    </p>
                  )}

                  {mod.topics && mod.topics.length > 0 && (
                    <div>
                      <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        <BookOpen className="h-3.5 w-3.5" />
                        Topics Covered
                      </p>
                      <ul className="grid gap-2.5 md:grid-cols-2">
                        {mod.topics.map((topic) => (
                          <li
                            key={topic.title}
                            className="flex items-start gap-2.5 rounded-xl border border-border/60 bg-background px-3.5 py-2.5"
                          >
                            <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                            <div className="min-w-0 text-sm leading-6">
                              <span className="font-semibold text-foreground">
                                {topic.title}
                              </span>
                              {topic.description && (
                                <span className="text-muted-foreground">
                                  {" — "}
                                  {topic.description}
                                </span>
                              )}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {mod.outcome && (
                    <div className="flex items-start gap-3 rounded-2xl border border-primary/25 bg-primary/5 px-4 py-4">
                      <div className="rounded-xl bg-primary/10 p-2 text-primary">
                        <Target className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                          Outcome
                        </p>
                        <p className="mt-1 text-sm leading-7 text-foreground">
                          {mod.outcome}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}

export function ProgramTabs({ bootcamp }: { bootcamp: Bootcamp }) {
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
