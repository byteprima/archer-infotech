import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronLeft,
  Clock,
  Users,
  CheckCircle,
  Briefcase,
  GraduationCap,
  Phone,
  Target,
  BookOpen,
  Rocket,
  MapPin,
  Mail,
  ArrowRight,
} from "lucide-react";
import { PageEvent } from "@/components/analytics/page-event";
import { TrackedAnchor } from "@/components/analytics/tracked-anchor";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CourseJsonLd, FAQJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { bootcamps, getBootcamp } from "@/data/bootcamps";
import { siteConfig } from "@/data/site-config";

interface BootcampPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return bootcamps.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: BootcampPageProps): Promise<Metadata> {
  const { slug } = await params;
  const bootcamp = getBootcamp(slug);

  if (!bootcamp) {
    return { title: "Bootcamp Not Found" };
  }

  return {
    title: bootcamp.seo.title,
    description: bootcamp.seo.description,
    keywords: bootcamp.seo.keywords,
  };
}

export default async function BootcampPage({ params }: BootcampPageProps) {
  const { slug } = await params;
  const bootcamp = getBootcamp(slug);

  if (!bootcamp) {
    notFound();
  }

  const durationLabel =
    bootcamp.details.find((d) => d.label === "Duration")?.value ?? "";
  const modeLabel =
    bootcamp.details.find((d) => d.label === "Mode")?.value ?? "";

  return (
    <>
      <PageEvent
        event="bootcamp_page_viewed"
        properties={{
          bootcamp_slug: slug,
          bootcamp_name: bootcamp.name,
        }}
      />

      <CourseJsonLd
        name={`${bootcamp.name} Bootcamp`}
        description={bootcamp.description}
        duration={durationLabel}
        url={`/bootcamps/${slug}`}
        category="Bootcamps"
      />
      <FAQJsonLd faqs={bootcamp.faqs} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Bootcamps", url: "/bootcamps" },
          { name: bootcamp.name, url: `/bootcamps/${slug}` },
        ]}
      />

      {/* Hero Section */}
      <section className="gradient-hero text-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <Link
            href="/bootcamps"
            className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            All Bootcamps
          </Link>

          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              <Badge className="bg-white/20 text-white border-0 mb-4">
                <Rocket className="h-3 w-3 mr-1" />
                {bootcamp.name} Bootcamp
              </Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
                {bootcamp.name}: {bootcamp.tagline}
              </h1>
              <p className="text-lg text-white/80 mb-4">
                {bootcamp.subtitle}
              </p>
              <p className="text-white/70 mb-6 max-w-2xl leading-relaxed">
                {bootcamp.hook}
              </p>
              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>{durationLabel}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  <span>{modeLabel}</span>
                </div>
              </div>
            </div>

            {/* Enquiry Card */}
            <div className="bg-white rounded-xl p-6 text-foreground shadow-lg">
              <h3 className="font-semibold text-lg mb-2">
                Interested in {bootcamp.name}?
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                Get in touch to learn more about the curriculum, batch
                timings, and fees.
              </p>
              <div className="space-y-3">
                <TrackedLink
                  href="/contact"
                  className="block w-full text-center bg-secondary text-secondary-foreground py-3 rounded-lg font-medium hover:bg-secondary/90 transition-colors"
                  event="bootcamp_enquiry_clicked"
                  properties={{
                    bootcamp_slug: slug,
                    bootcamp_name: bootcamp.name,
                    location: "bootcamp_hero_card",
                  }}
                >
                  Enquire Now
                </TrackedLink>
                <TrackedAnchor
                  href={`tel:${siteConfig.contact.phone}`}
                  className="flex items-center justify-center gap-2 w-full border py-3 rounded-lg font-medium hover:bg-muted transition-colors"
                  event="contact_method_clicked"
                  properties={{
                    method: "phone",
                    location: "bootcamp_hero_card",
                    bootcamp_slug: slug,
                  }}
                >
                  <Phone className="h-4 w-4" />
                  {siteConfig.contact.phone}
                </TrackedAnchor>
              </div>
              <div className="mt-4 pt-4 border-t text-center text-sm text-muted-foreground">
                <p>Admissions open. Counselling sessions available daily.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <p className="text-lg text-muted-foreground leading-relaxed">
              {bootcamp.description}
            </p>
          </div>
        </div>
      </section>

      {/* Who Is This For */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">
            Who Is {bootcamp.name} For?
          </h2>
          <div className="grid md:grid-cols-2 gap-4 max-w-4xl">
            {bootcamp.targetAudience.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Join */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">
            Why Join {bootcamp.name}?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bootcamp.whyJoin.map((reason, i) => (
              <Card key={i} className="h-full">
                <CardHeader>
                  <CardTitle className="text-lg flex items-start gap-2">
                    <Target className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                    {reason.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {reason.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tracks (for CodeLeap and CareerCode) */}
      {bootcamp.tracks && bootcamp.tracks.length > 0 && (
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              {bootcamp.id === "codeleap"
                ? "Choose Your Track"
                : "Specialisation Tracks"}
            </h2>
            <p className="text-muted-foreground mb-8">
              {bootcamp.id === "codeleap"
                ? "Choose one track at the time of enrollment based on your interest and career direction. All tracks are beginner-friendly."
                : "Select a primary track and follow it semester by semester through your engineering program."}
            </p>

            <Tabs
              defaultValue={bootcamp.tracks[0].name}
              className="w-full"
            >
              <TabsList className="flex flex-wrap h-auto gap-2 bg-transparent mb-8">
                {bootcamp.tracks.map((track) => (
                  <TabsTrigger
                    key={track.name}
                    value={track.name}
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border px-4 py-2"
                  >
                    {track.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              {bootcamp.tracks.map((track) => (
                <TabsContent key={track.name} value={track.name}>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-secondary" />
                        {track.name}
                      </CardTitle>
                      <p className="text-muted-foreground text-sm">
                        {track.subtitle}
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Modules */}
                      <div className="space-y-4">
                        {track.modules.map((mod, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-4 p-4 rounded-lg bg-muted/50"
                          >
                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-medium shrink-0">
                              {i + 1}
                            </span>
                            <div>
                              <h4 className="font-medium text-sm">
                                {mod.title}
                              </h4>
                              <p className="text-sm text-muted-foreground mt-1">
                                {mod.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Skills / Career Roles */}
                      <div>
                        <h4 className="font-medium text-sm mb-3">
                          {bootcamp.id === "codeleap"
                            ? "Skills You Will Gain"
                            : "Career Outcomes"}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {track.skills.map((skill, i) => (
                            <Badge key={i} variant="outline">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>
      )}

      {/* Programs (for TechReady) */}
      {bootcamp.programs && bootcamp.programs.length > 0 && (
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Choose Your Specialisation
            </h2>
            <p className="text-muted-foreground mb-8">
              Each program runs for 6 to 8 months with daily intensive training
              and is fully placement-assisted.
            </p>

            <Tabs
              defaultValue={bootcamp.programs[0].name}
              className="w-full"
            >
              <TabsList className="flex flex-wrap h-auto gap-2 bg-transparent mb-8">
                {bootcamp.programs.map((program) => (
                  <TabsTrigger
                    key={program.name}
                    value={program.name}
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border px-3 py-2 text-xs sm:text-sm"
                  >
                    {program.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              {bootcamp.programs.map((program) => (
                <TabsContent key={program.name} value={program.name}>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl flex items-center gap-2">
                        <GraduationCap className="h-5 w-5 text-secondary" />
                        {program.name}
                      </CardTitle>
                      <p className="text-muted-foreground text-sm">
                        {program.subtitle}
                      </p>
                      <p className="text-muted-foreground text-sm mt-1">
                        {program.description}
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Phases */}
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-3 pr-4 font-medium">
                                Phase
                              </th>
                              <th className="text-left py-3 pr-4 font-medium">
                                Duration
                              </th>
                              <th className="text-left py-3 font-medium">
                                Topics Covered
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {program.phases.map((phase, i) => (
                              <tr key={i} className="border-b last:border-0">
                                <td className="py-3 pr-4 font-medium whitespace-nowrap">
                                  {phase.name}
                                </td>
                                <td className="py-3 pr-4 text-muted-foreground whitespace-nowrap">
                                  {phase.duration}
                                </td>
                                <td className="py-3 text-muted-foreground">
                                  {phase.topics.join(", ")}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Career Roles */}
                      <div>
                        <h4 className="font-medium text-sm mb-3">
                          Career Roles
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {program.careerRoles.map((role, i) => (
                            <Badge key={i} variant="outline">
                              {role}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>
      )}

      {/* Common Modules */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            {bootcamp.id === "techready"
              ? "Included in Every Program"
              : "Included for Every Student"}
          </h2>
          <p className="text-muted-foreground mb-8">
            Beyond technical skills, every {bootcamp.name} student receives
            these additional modules.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bootcamp.commonModules.map((mod, i) => (
              <div
                key={i}
                className="p-4 rounded-lg border bg-card hover:shadow-md transition-shadow"
              >
                <h3 className="font-medium mb-2 flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-secondary shrink-0 mt-1" />
                  {mod.title}
                </h3>
                <p className="text-sm text-muted-foreground pl-6">
                  {mod.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Details at a Glance */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">
            {bootcamp.name} at a Glance
          </h2>
          <Card className="max-w-3xl">
            <CardContent className="p-0">
              <div className="divide-y">
                {bootcamp.details.map((detail, i) => (
                  <div
                    key={i}
                    className="flex flex-col sm:flex-row py-4 px-6"
                  >
                    <span className="font-medium text-sm w-48 shrink-0 mb-1 sm:mb-0">
                      {detail.label}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {detail.value}
                    </span>
                  </div>
                ))}
                <div className="flex flex-col sm:flex-row py-4 px-6">
                  <span className="font-medium text-sm w-48 shrink-0 mb-1 sm:mb-0">
                    Phone
                  </span>
                  <span className="text-sm text-muted-foreground">
                    +91 98506 78451 / +91 98901 64072
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row py-4 px-6">
                  <span className="font-medium text-sm w-48 shrink-0 mb-1 sm:mb-0">
                    Email
                  </span>
                  <span className="text-sm text-muted-foreground">
                    info@archerinfotech.in
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl">
            <Accordion className="w-full">
              {bootcamp.faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Cross-links to other bootcamps */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">
            Explore Other Bootcamps
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bootcamps
              .filter((b) => b.slug !== slug)
              .map((b) => (
                <Link
                  key={b.slug}
                  href={`/bootcamps/${b.slug}`}
                  className="group block"
                >
                  <Card className="h-full hover:shadow-lg transition-all hover:border-primary/30">
                    <CardHeader>
                      <Badge className="w-fit mb-2" variant="secondary">
                        <Rocket className="h-3 w-3 mr-1" />
                        {b.name}
                      </Badge>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {b.tagline}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {b.subtitle}
                      </p>
                      <span className="inline-flex items-center text-sm font-medium text-primary">
                        Learn More
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {bootcamp.closingCTA.headline}
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
            {bootcamp.closingCTA.body}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <TrackedLink
              href="/contact"
              className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-medium hover:bg-secondary/90 transition-colors"
              event="bootcamp_enquiry_clicked"
              properties={{
                bootcamp_slug: slug,
                bootcamp_name: bootcamp.name,
                location: "bootcamp_bottom_cta",
              }}
            >
              Enquire Now
            </TrackedLink>
            <TrackedAnchor
              href={`tel:${siteConfig.contact.phone}`}
              className="inline-flex items-center gap-2 border border-white/30 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors"
              event="contact_method_clicked"
              properties={{
                method: "phone",
                location: "bootcamp_bottom_cta",
                bootcamp_slug: slug,
              }}
            >
              <Phone className="h-4 w-4" />
              Call Us Now
            </TrackedAnchor>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-white/70">
            <span className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              +91 98506 78451 / +91 98901 64072
            </span>
            <span className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              info@archerinfotech.in
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Kothrud, Pune
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
