import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Clock,
  Users,
  Rocket,
  CheckCircle,
  GraduationCap,
  Briefcase,
  Phone,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageEvent } from "@/components/analytics/page-event";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { TrackedAnchor } from "@/components/analytics/tracked-anchor";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { bootcamps } from "@/data/bootcamps";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: "Bootcamps | Intensive Career-Focused Programs | Archer Info Tech",
  description:
    "Explore CodeLeap, CareerCode, and TechReady bootcamps by Archer Info Tech, Pune. Coding bootcamp for 12th passouts, semester-wise training for engineering students, and placement-assisted programs for graduates.",
  keywords: [
    "coding bootcamp Pune",
    "IT bootcamp for students",
    "placement-assisted coding course Pune",
    "summer coding bootcamp",
    "engineering student programming course",
    "full stack bootcamp Pune",
  ],
};

const bootcampHighlights = [
  {
    slug: "codeleap",
    icon: Rocket,
    color: "from-blue-600 to-blue-500",
    audience: "12th Passouts",
    duration: "3 to 3.5 Months",
    highlights: [
      "3 tracks: Web Dev, Python, AI/Data Science",
      "No prior coding experience required",
      "Classroom + Online available",
      "Certificate on completion",
    ],
  },
  {
    slug: "careercode",
    icon: GraduationCap,
    color: "from-purple-600 to-purple-500",
    audience: "Engineering Students",
    duration: "Semester by Semester",
    highlights: [
      "6 specialisation tracks",
      "Runs alongside your college education",
      "Internship & placement preparation",
      "Communication, aptitude, and interview training",
    ],
  },
  {
    slug: "techready",
    icon: Briefcase,
    color: "from-green-600 to-green-500",
    audience: "Graduates",
    duration: "6 to 8 Months",
    highlights: [
      "10 specialised programs",
      "6 hours daily, full-time intensive",
      "100% placement assistance",
      "100+ company connections",
    ],
  },
];

export default function BootcampsPage() {
  return (
    <>
      <PageEvent
        event="bootcamps_listing_viewed"
        properties={{ location: "bootcamps_page" }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Bootcamps", url: "/bootcamps" },
        ]}
      />

      {/* Hero */}
      <section className="gradient-hero text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <Badge className="bg-white/20 text-white border-0 mb-4">
            <Rocket className="h-3 w-3 mr-1" />
            Career Launchpad
          </Badge>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Intensive Bootcamp Programs
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Three programs designed for three stages of your career — from 12th
            passout to engineering student to job-ready graduate. Hands-on
            training, real projects, and expert mentorship by Archer Info Tech,
            Pune.
          </p>
        </div>
      </section>

      {/* Bootcamp Cards */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bootcamps.map((bootcamp, index) => {
              const meta = bootcampHighlights[index];
              const Icon = meta.icon;
              return (
                <Card
                  key={bootcamp.slug}
                  className="group overflow-hidden hover:shadow-xl transition-all hover:border-primary/30 h-full flex flex-col border-2"
                >
                  <div
                    className={`bg-gradient-to-r ${meta.color} p-6`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <Badge className="bg-white/20 text-white border-0">
                        {meta.audience}
                      </Badge>
                      <Icon className="h-6 w-6 text-white/80" />
                    </div>
                    <h2 className="font-bold text-2xl text-white">
                      {bootcamp.name}
                    </h2>
                    <p className="text-white/80 text-sm mt-1">
                      {bootcamp.tagline}
                    </p>
                  </div>

                  <CardContent className="p-6 flex-grow flex flex-col">
                    <p className="text-sm text-muted-foreground mb-4">
                      {bootcamp.subtitle}
                    </p>
                    <ul className="space-y-2 mb-6">
                      {meta.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                          <span className="text-muted-foreground">{h}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-auto pt-4 border-t">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {meta.duration}
                      </div>
                    </div>
                  </CardContent>

                  <div className="px-6 pb-6">
                    <Link
                      href={`/bootcamps/${bootcamp.slug}`}
                      className="w-full inline-flex items-center justify-center h-11 px-4 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                    >
                      Explore {bootcamp.name}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Your Complete Career Journey
          </h2>
          <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">
            Our bootcamp programs are designed to support you at every stage — from your first line of code to your first job offer.
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Rocket className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-bold mb-2">Step 1: CodeLeap</h3>
              <p className="text-sm text-muted-foreground">
                Start with CodeLeap after 12th — learn programming basics during
                your vacation before engineering begins.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-bold mb-2">Step 2: CareerCode</h3>
              <p className="text-sm text-muted-foreground">
                Continue with CareerCode during engineering — build skills
                semester by semester alongside your degree.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-bold mb-2">Step 3: TechReady</h3>
              <p className="text-sm text-muted-foreground">
                Get placed with TechReady — intensive full-time training with
                100% placement assistance after graduation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get in touch with us for a free counselling session. We will help
            you choose the right bootcamp based on your current stage and career
            goals.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <TrackedLink
              href="/contact"
              className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-medium hover:bg-secondary/90 transition-colors"
              event="bootcamp_enquiry_clicked"
              properties={{
                location: "bootcamps_listing_cta",
              }}
            >
              Enquire Now
            </TrackedLink>
            <TrackedAnchor
              href={`tel:${siteConfig.contact.phone}`}
              className="inline-flex items-center gap-2 border px-6 py-3 rounded-lg font-medium hover:bg-muted transition-colors"
              event="contact_method_clicked"
              properties={{
                method: "phone",
                location: "bootcamps_listing_cta",
              }}
            >
              <Phone className="h-4 w-4" />
              {siteConfig.contact.phone}
            </TrackedAnchor>
          </div>
        </div>
      </section>
    </>
  );
}
