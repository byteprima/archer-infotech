import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronLeft,
  Clock,
  BarChart,
  Users,
  CheckCircle,
  Award,
  Briefcase,
  GraduationCap,
  Phone,
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
import { courses, categories, getCourse, getCategory } from "@/data/courses";
import { siteConfig } from "@/data/site-config";

interface CoursePageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return courses.map((course) => ({
    category: course.categorySlug,
    slug: course.slug,
  }));
}

export async function generateMetadata({
  params,
}: CoursePageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourse(slug);

  if (!course) {
    return {
      title: "Course Not Found",
    };
  }

  return {
    title: `${course.title} Training in Pune`,
    description: course.description,
    keywords: [
      `${course.title} training Pune`,
      `${course.title} course`,
      `learn ${course.title}`,
      `${course.category} training`,
      "IT training Pune",
    ],
  };
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { category: categorySlug, slug } = await params;
  const course = getCourse(slug);
  const category = getCategory(categorySlug);

  if (!course || !category) {
    notFound();
  }

  return (
    <>
      <PageEvent
        event="course_page_viewed"
        properties={{
          category_slug: categorySlug,
          course_slug: slug,
          course_title: course.title,
          course_category: course.category,
        }}
      />

      {/* Schema.org Structured Data */}
      <CourseJsonLd
        name={course.title}
        description={course.description}
        duration={course.duration}
        url={`/courses/${categorySlug}/${slug}`}
        category={course.category}
      />
      <FAQJsonLd faqs={course.faqs} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Courses", url: "/courses" },
          { name: category.name, url: `/courses/${categorySlug}` },
          { name: course.title, url: `/courses/${categorySlug}/${slug}` },
        ]}
      />

      {/* Hero Section */}
      <section className="gradient-hero text-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <Link
            href={`/courses/${categorySlug}`}
            className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to {category.name}
          </Link>
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge className="bg-white/20">{course.category}</Badge>
                {course.isPopular && (
                  <Badge className="bg-secondary text-secondary-foreground">
                    Popular
                  </Badge>
                )}
                {course.isFeatured && (
                  <Badge className="bg-white text-primary">Featured</Badge>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                {course.title}
              </h1>
              <p className="text-lg text-white/80 mb-6">{course.description}</p>
              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BarChart className="h-5 w-5" />
                  <span>{course.level}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  <span>{course.mode.join(" & ")}</span>
                </div>
              </div>
            </div>
            {/* Enquiry Card */}
            <div className="bg-white rounded-xl p-6 text-foreground shadow-lg">
              <h3 className="font-semibold text-lg mb-2">Interested in this course?</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Get in touch with us to learn more about the curriculum, batch
                timings, and fees.
              </p>
              <div className="space-y-3">
                <TrackedLink
                  href="/contact"
                  className="block w-full text-center bg-secondary text-secondary-foreground py-3 rounded-lg font-medium hover:bg-secondary/90 transition-colors"
                  event="course_enquiry_clicked"
                  properties={{
                    category_slug: categorySlug,
                    course_slug: slug,
                    course_title: course.title,
                    location: "course_hero_card",
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
                    location: "course_hero_card",
                    course_slug: slug,
                  }}
                >
                  <Phone className="h-4 w-4" />
                  {siteConfig.contact.phone}
                </TrackedAnchor>
              </div>
              <div className="mt-4 pt-4 border-t text-center text-sm text-muted-foreground">
                <p>Next batch starting soon!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Course Highlights */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-secondary" />
                    Course Highlights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="grid md:grid-cols-2 gap-3">
                    {course.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-accent shrink-0 mt-1" />
                        <span className="text-sm">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Curriculum */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-secondary" />
                    Course Curriculum
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion className="w-full">
                    {course.modules.map((module, index) => (
                      <AccordionItem key={index} value={`module-${index}`}>
                        <AccordionTrigger className="hover:no-underline">
                          <span className="flex items-center gap-3">
                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-medium">
                              {index + 1}
                            </span>
                            {module.title}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent>
                          <ul className="space-y-2 pl-11">
                            {module.topics.map((topic, topicIndex) => (
                              <li
                                key={topicIndex}
                                className="flex items-center gap-2 text-sm text-muted-foreground"
                              >
                                <span className="w-1.5 h-1.5 bg-secondary rounded-full" />
                                {topic}
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>

              {/* FAQs */}
              {course.faqs.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Frequently Asked Questions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion className="w-full">
                      {course.faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`faq-${index}`}>
                          <AccordionTrigger className="text-left hover:no-underline">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Prerequisites */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Prerequisites</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {course.prerequisites.map((prereq, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <CheckCircle className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                        {prereq}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Career Opportunities */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-secondary" />
                    Career Opportunities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {course.careerOpportunities.map((career, index) => (
                      <Badge key={index} variant="outline">
                        {career}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Certifications */}
              {course.certifications && course.certifications.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Award className="h-5 w-5 text-secondary" />
                      Certifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {course.certifications.map((cert, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <Award className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                          {cert}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Training Modes */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Training Modes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {course.mode.includes("Offline") && (
                      <div className="group flex items-start gap-3 rounded-lg bg-muted p-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center transition-colors group-hover:bg-primary">
                          <Users className="h-5 w-5 text-primary transition-colors group-hover:text-primary-foreground" />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">Classroom Training</h4>
                          <p className="text-xs text-muted-foreground">
                            In-person classes at our Pune center
                          </p>
                        </div>
                      </div>
                    )}
                    {course.mode.includes("Online") && (
                      <div className="group flex items-start gap-3 rounded-lg bg-muted p-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center transition-colors group-hover:bg-primary">
                          <BarChart className="h-5 w-5 text-primary transition-colors group-hover:text-primary-foreground" />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">Online Training</h4>
                          <p className="text-xs text-muted-foreground">
                            Live virtual classes via Zoom/Meet
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Start Your {course.shortTitle} Journey?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Enroll now and take the first step towards a successful IT career.
            Our expert trainers and 100% placement assistance will help you achieve
            your goals.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <TrackedLink
              href="/contact"
              className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-medium hover:bg-secondary/90 transition-colors"
              event="course_enquiry_clicked"
              properties={{
                course_slug: slug,
                course_title: course.title,
                location: "course_bottom_cta",
              }}
            >
              Enquire Now
            </TrackedLink>
            <TrackedLink
              href="/batch-schedule"
              className="inline-flex items-center gap-2 border px-6 py-3 rounded-lg font-medium hover:bg-muted transition-colors"
              event="view_batch_schedule_clicked"
              properties={{
                course_slug: slug,
                course_title: course.title,
                location: "course_bottom_cta",
              }}
            >
              View Batch Schedule
            </TrackedLink>
          </div>
        </div>
      </section>
    </>
  );
}
