"use client";

import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/data/site-config";

export function CTASection() {
  return (
    <section className="py-16 md:py-24 gradient-hero text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Start Your{" "}
            <span className="text-secondary">IT Career Journey?</span>
          </h2>
          <p className="text-lg md:text-xl text-white/80 mb-8">
            Join thousands of successful students who have transformed their careers
            with Archer Infotech. Get in touch with us today to learn more about our
            courses and placement opportunities.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold"
              )}
            >
              Enquire Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <a
              href={`tel:${siteConfig.contact.phone}`}
              className="inline-flex items-center justify-center rounded-lg border-2 border-white bg-transparent px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white hover:text-primary"
            >
              <Phone className="mr-2 h-5 w-5" />
              Call Us: {siteConfig.contact.phone}
            </a>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-secondary rounded-full" />
              <span>Free Career Counseling</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-secondary rounded-full" />
              <span>Demo Classes Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-secondary rounded-full" />
              <span>Flexible Payment Options</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
