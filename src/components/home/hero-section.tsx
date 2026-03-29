"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/data/site-config";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden gradient-hero text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm">
              <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
              <span>New Batches Starting Soon</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Launch Your{" "}
              <span className="text-secondary">IT Career</span> with Industry-Ready Skills
            </h1>

            <p className="text-lg md:text-xl text-white/80 max-w-xl">
              Transform your career with Pune&apos;s most trusted IT training institute.
              Learn from industry experts, work on real projects, and get placement assistance.
            </p>

            {/* Key Points */}
            <div className="flex flex-wrap gap-4">
              {[
                "15+ Years Experience",
                "1000+ Batches Completed",
                "100% Placement Assistance",
              ].map((point) => (
                <div key={point} className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-secondary" />
                  <span className="text-sm">{point}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/courses"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold"
                )}
              >
                Explore Courses
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg border-2 border-white bg-transparent px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white hover:text-primary"
              >
                Request Callback
              </Link>
            </div>
          </div>

          {/* Right Content - Stats */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-2 gap-6">
              {[
                { value: siteConfig.stats.studentsPlaced, label: "Students Placed" },
                { value: siteConfig.stats.yearsExperience, label: "Years Experience" },
                { value: siteConfig.stats.corporatePartners, label: "Corporate Partners" },
                { value: siteConfig.stats.courses, label: "Courses Offered" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center"
                >
                  <div className="text-4xl font-bold text-secondary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-white/80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
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
  );
}
