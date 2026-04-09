"use client";

import Link from "next/link";
import { ArrowRight, Clock, Users, Rocket, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getCoursesByCategory, type Course } from "@/data/courses";
import { captureAnalyticsEvent } from "@/lib/posthog/client";

function BootcampCard({ course }: { course: Course }) {
  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all hover:border-primary/30 h-full flex flex-col border-2">
      <div className="bg-gradient-to-r from-primary to-primary/80 p-4">
        <div className="flex items-center justify-between">
          <Badge className="bg-white/20 text-white border-0 hover:bg-white/30">
            {course.duration}
          </Badge>
          <Rocket className="h-5 w-5 text-white/80" />
        </div>
        <h3 className="font-bold text-xl text-white mt-3">
          {course.title}
        </h3>
        <p className="text-white/80 text-sm mt-1">
          {course.shortDescription}
        </p>
      </div>
      <CardContent className="p-6 flex-grow flex flex-col">
        <ul className="space-y-2 mb-4">
          {course.highlights.slice(0, 4).map((highlight) => (
            <li key={highlight} className="flex items-start gap-2 text-sm">
              <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <span className="text-muted-foreground">{highlight}</span>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-auto pt-4 border-t">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {course.duration}
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            {course.mode.join(" & ")}
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-6 pb-6 pt-0 flex-shrink-0 bg-transparent border-t-0">
        <Link
          href={`/bootcamps/${course.slug.replace("-bootcamp", "")}`}
          className="w-full inline-flex items-center justify-center h-10 px-4 py-2 rounded-md border border-input bg-background text-sm font-medium hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
          onClick={() =>
            captureAnalyticsEvent("bootcamp_card_clicked", {
              course_slug: course.slug,
              course_title: course.title,
              location: "homepage_bootcamps",
            })
          }
        >
          View Details
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </CardFooter>
    </Card>
  );
}

export function BootcampsSection() {
  const bootcamps = getCoursesByCategory("bootcamps");

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <Badge variant="secondary" className="mb-3">
              <Rocket className="h-3 w-3 mr-1" />
              Career Launchpad
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Intensive <span className="text-primary">Bootcamps</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Fast-track your tech career with our intensive bootcamp programs.
              Hands-on training, real projects, and placement support included.
            </p>
          </div>
          <Link
            href="/bootcamps"
            className={cn(buttonVariants({ variant: "outline" }))}
            onClick={() =>
              captureAnalyticsEvent("view_all_bootcamps_clicked", {
                location: "homepage_bootcamps_section",
              })
            }
          >
            View All Bootcamps
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bootcamps.map((bootcamp) => (
            <BootcampCard key={bootcamp.id} course={bootcamp} />
          ))}
        </div>
      </div>
    </section>
  );
}
