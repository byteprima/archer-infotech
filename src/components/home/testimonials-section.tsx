"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
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
  placedAt: string | null;
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
            <AvatarImage src={testimonial.photoUrl ?? undefined} alt={testimonial.name} />
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
        <div className="flex items-center gap-1 mt-4">
          {Array.from({ length: testimonial.rating ?? 5 }).map((_, i) => (
            <Star
              key={i}
              className="h-4 w-4 fill-secondary text-secondary"
            />
          ))}
        </div>
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
  const [currentIndex, setCurrentIndex] = useState(0);

  const visibleTestimonials = 3;
  const maxIndex = Math.max(0, testimonials.length - visibleTestimonials);

  const next = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

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
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={prev}
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={next}
              disabled={currentIndex >= maxIndex}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(0, 6).map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden space-y-4">
          {testimonials.slice(0, 3).map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
