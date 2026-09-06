"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { StarRating } from "@/components/ui/icon-sprite";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LinkedinIcon, GitHubIcon } from "@/components/common/social-icons";
import { captureAnalyticsEvent } from "@/lib/posthog/client";

export interface TestimonialData {
  id: number;
  name: string;
  role: string | null;
  company: string | null;
  courseTaken: string | null;
  content: string;
  rating: number;
  photoUrl: string | null;
  linkedinUrl: string | null;
  githubUrl: string | null;
}

function buildTestimonialAlt(t: TestimonialData): string {
  // Pillar 3 P3-14 alt template:
  // "[Student name], placed at [Company] after [Course] at Archer Infotech"
  // Falls back gracefully when placement company / course is unknown so we
  // never ship a bare name as alt text (was the pre-fix state).
  const placement = t.company;
  const parts = [t.name];
  if (placement && t.courseTaken) {
    parts.push(`placed at ${placement} after ${t.courseTaken}`);
  } else if (placement) {
    parts.push(`placed at ${placement}`);
  } else if (t.courseTaken) {
    parts.push(`student of ${t.courseTaken}`);
  } else {
    parts.push("Archer Infotech alumnus");
  }
  return `${parts.join(", ")} at Archer Infotech, Pune`;
}

function TestimonialCard({ testimonial }: { testimonial: TestimonialData }) {
  return (
    <Card className="h-full">
      <CardContent className="p-6 flex flex-col h-full">
        <Quote className="h-8 w-8 text-secondary mb-4" />
        <p className="text-muted-foreground flex-grow mb-6">
          &ldquo;{testimonial.content}&rdquo;
        </p>
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage
              src={testimonial.photoUrl ?? undefined}
              alt={buildTestimonialAlt(testimonial)}
            />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {testimonial.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-grow">
            <div className="font-semibold">{testimonial.name}</div>
            <div className="text-sm text-muted-foreground">
              {testimonial.role} at {testimonial.company}
            </div>
          </div>
          {/* Social Links */}
          {(testimonial.linkedinUrl || testimonial.githubUrl) && (
            <div className="flex items-center gap-2">
              {testimonial.linkedinUrl && (
                <a
                  href={testimonial.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-[#0077B5] transition-colors"
                  title="LinkedIn Profile"
                  onClick={() =>
                    captureAnalyticsEvent("testimonial_social_clicked", {
                      network: "linkedin",
                      student_name: testimonial.name,
                      location: "testimonials_section",
                    })
                  }
                >
                  <LinkedinIcon className="h-5 w-5" />
                </a>
              )}
              {testimonial.githubUrl && (
                <a
                  href={testimonial.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  title="GitHub Profile"
                  onClick={() =>
                    captureAnalyticsEvent("testimonial_social_clicked", {
                      network: "github",
                      student_name: testimonial.name,
                      location: "testimonials_section",
                    })
                  }
                >
                  <GitHubIcon className="h-5 w-5" />
                </a>
              )}
            </div>
          )}
        </div>
        <StarRating count={testimonial.rating ?? 5} />
        {testimonial.courseTaken && (
          <div className="mt-3 text-xs text-muted-foreground">
            Course: {testimonial.courseTaken}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function TestimonialsSection({ testimonials }: { testimonials: TestimonialData[] }) {
  /**
   * A real slider, replacing prev/next buttons that were wired to a
   * `currentIndex` nothing ever read — the grid rendered `slice(0, 6)`
   * regardless, so the arrows moved state and changed nothing on screen.
   *
   * Built on native scroll-snap rather than a transform track, because how
   * many cards fit is a breakpoint question (1 / 2 / 3) and CSS already knows
   * the answer — a transform would need JS to track the breakpoint to compute
   * its offset. This also gets touch swipe, trackpad scroll and keyboard
   * support for free.
   *
   * All cards render exactly once. An earlier version duplicated the DOM for
   * mobile and desktop and Googlebot saw nine testimonials in the initial
   * HTML; that constraint still holds.
   */
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(true);

  /**
   * Order shown to this visitor. Starts as the server order so the markup
   * hydrates cleanly, then shuffles once on mount.
   *
   * The shuffle has to happen on the client: this page is ISR-cached
   * (revalidate = 600) and edge-cached at Cloudflare, so a server-side
   * shuffle would bake one "random" order into the cached HTML and every
   * visitor would see the same one until it expired. Reordering equal-width
   * cards in a horizontal track shifts no layout, and the Review JSON-LD is
   * built server-side from the unshuffled list, so structured data stays
   * stable for crawlers.
   */
  const [paused, setPaused] = useState(false);

  /**
   * Randomise which testimonials lead, so repeat visitors don't always meet
   * the same faces.
   *
   * Done by assigning CSS `order` to the flex children, not by reordering the
   * array. Two reasons. React's rules forbid `Math.random()` during render
   * (impure) and flag `setState` inside an effect (extra render pass) — this
   * sidesteps both, since it is a DOM write in an effect. And the React DOM
   * order stays exactly as the server sent it, so hydration matches and a
   * crawler reading the markup sees a stable order while the visitor sees a
   * varied one.
   *
   * It must be client-side: this page is ISR-cached (revalidate = 600) and
   * edge-cached at Cloudflare, so shuffling on the server would freeze one
   * order into the cached HTML for every visitor until it expired.
   */
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const slides = Array.from(el.children) as HTMLElement[];
    const positions = slides.map((_, i) => i);
    for (let i = positions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [positions[i], positions[j]] = [positions[j], positions[i]];
    }
    slides.forEach((slide, i) => {
      slide.style.order = String(positions[i]);
    });
    el.scrollTo({ left: 0 });
  }, [testimonials.length]);

  const syncArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    // 2px slack: browsers report fractional scroll positions at the extremes.
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2);
  }, []);

  useEffect(() => {
    syncArrows();
    const el = trackRef.current;
    if (!el) return;
    const onResize = () => syncArrows();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [syncArrows, testimonials.length]);

  const scrollByCard = (direction: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    // Step by the width of one card, whatever the current breakpoint made it.
    const card = el.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + 24 : el.clientWidth;
    el.scrollBy({ left: step * direction, behavior: "smooth" });
  };

  /**
   * Auto-advance every 2s, wrapping back to the start at the end.
   *
   * Paused while the pointer is over the carousel or focus is inside it, and
   * disabled entirely under prefers-reduced-motion — an auto-moving carousel
   * with no way to stop it fails WCAG 2.2.2, and 2s is barely enough time to
   * read a testimonial, so anyone actually reading needs it to hold still.
   */
  useEffect(() => {
    if (paused || testimonials.length < 2) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const id = window.setInterval(() => {
      const el = trackRef.current;
      if (!el) return;
      const ended = el.scrollLeft + el.clientWidth >= el.scrollWidth - 2;
      if (ended) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollByCard(1);
      }
    }, 2000);
    return () => window.clearInterval(id);
  }, [paused, testimonials.length]);

  if (testimonials.length === 0) return null;

  // Gate on the count, not on measured overflow. `atStart`/`atEnd` are only
  // known after the first client measurement, so gating on them rendered no
  // buttons on the server and popped them in after hydration — a layout shift
  // on a page whose CLS is currently 0. The count is known server-side, and a
  // single testimonial is the only case with genuinely nothing to scroll.
  const canScroll = testimonials.length > 1;

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What Our <span className="text-primary">Students Say</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Hear from our successful students who have transformed their careers
              with Archer Infotech.
            </p>
          </div>
          {/* Hidden when everything already fits — arrows that cannot move are
              worse than no arrows. */}
          {canScroll && (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => scrollByCard(-1)}
                disabled={atStart}
                aria-label="Show previous testimonials"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => scrollByCard(1)}
                disabled={atEnd}
                aria-label="Show next testimonials"
              >
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          )}
        </div>

        <div
          ref={trackRef}
          onScroll={syncArrows}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          role="region"
          aria-roledescription="carousel"
          aria-label="Student testimonials"
          tabIndex={0}
          className="scrollbar-none -mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-4 pb-2"
        >
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="w-[85%] shrink-0 snap-start sm:w-[60%] md:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]"
            >
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
