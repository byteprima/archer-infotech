import { Metadata } from "next";
import Link from "next/link";
import {
  Building,
  Users,
  Award,
  Calendar,
  CheckCircle,
  Target,
  Laptop,
  Clock,
  Phone,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: "Corporate Training",
  description:
    "Upskill your workforce with Archer Infotech corporate training programs. Customized IT training solutions for enterprises with flexible scheduling.",
};

const trainingAreas = [
  {
    title: "Cloud Technologies",
    courses: ["AWS", "Azure", "Google Cloud", "Cloud Architecture"],
  },
  {
    title: "Programming",
    courses: ["Java", "Python", ".NET", "JavaScript/TypeScript"],
  },
  {
    title: "DevOps & Automation",
    courses: ["Docker", "Kubernetes", "Jenkins", "CI/CD", "Terraform"],
  },
  {
    title: "Data & AI",
    courses: ["Data Science", "Machine Learning", "Generative AI", "Data Engineering"],
  },
  {
    title: "Full Stack Development",
    courses: ["MERN Stack", "Java Full Stack", "Python Full Stack"],
  },
  {
    title: "Agile & Project Management",
    courses: ["Scrum", "Kanban", "Project Management", "Business Analysis"],
  },
];

const benefits = [
  {
    icon: Target,
    title: "Customized Curriculum",
    description:
      "Training programs tailored to your organization's specific technology stack and goals.",
  },
  {
    icon: Calendar,
    title: "Flexible Scheduling",
    description:
      "Choose from weekday, weekend, or intensive boot camp formats to suit your team's availability.",
  },
  {
    icon: Users,
    title: "Expert Trainers",
    description:
      "Industry professionals with 10+ years of experience deliver hands-on training.",
  },
  {
    icon: Award,
    title: "Certification Support",
    description:
      "Prepare your team for industry certifications like AWS, Azure, and more.",
  },
  {
    icon: Laptop,
    title: "On-site or Remote",
    description:
      "Training delivered at your premises or through live virtual sessions.",
  },
  {
    icon: Clock,
    title: "Post-Training Support",
    description:
      "Continued access to resources and support even after training completion.",
  },
];

export default function CorporateTrainingPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="gradient-hero text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Corporate Training Solutions
            </h1>
            <p className="text-lg text-white/80 mb-8">
              Archer Infotech offers comprehensive corporate training programs to
              help your organization stay ahead in the rapidly evolving technology
              landscape. Our customized training solutions are designed to upskill
              your workforce effectively.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-medium hover:bg-secondary/90 transition-colors"
              >
                Request a Proposal
              </Link>
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="inline-flex items-center gap-2 border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-primary transition-colors"
              >
                <Phone className="h-4 w-4" />
                Talk to Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Us?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Partner with Archer Infotech for result-oriented corporate training
              that delivers measurable outcomes.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit) => (
              <Card key={benefit.title} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                      <benefit.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">{benefit.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Training Areas */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Training Areas</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We offer training across a wide range of technologies to meet your
              organization&apos;s diverse needs.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trainingAreas.map((area) => (
              <Card key={area.title}>
                <CardHeader>
                  <CardTitle className="text-lg">{area.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {area.courses.map((course) => (
                      <li
                        key={course}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <CheckCircle className="h-4 w-4 text-secondary shrink-0" />
                        {course}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Process</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A structured approach to ensure successful training outcomes for your
              organization.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: 1,
                title: "Requirement Analysis",
                description:
                  "We understand your business goals, technology stack, and skill gaps.",
              },
              {
                step: 2,
                title: "Custom Curriculum",
                description:
                  "Design a tailored training program aligned with your objectives.",
              },
              {
                step: 3,
                title: "Training Delivery",
                description:
                  "Expert-led sessions with hands-on projects and assessments.",
              },
              {
                step: 4,
                title: "Evaluation & Support",
                description:
                  "Measure outcomes and provide ongoing support post-training.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  {item.step}
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Trusted by Enterprises</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We have successfully delivered corporate training programs for
              organizations across various industries.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              "Tech Companies",
              "Banks & Finance",
              "Healthcare",
              "Manufacturing",
              "Retail",
              "Startups",
            ].map((industry) => (
              <Card key={industry}>
                <CardContent className="pt-6 text-center">
                  <Building className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="text-sm font-medium">{industry}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 gradient-hero text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Upskill Your Team?
            </h2>
            <p className="text-white/80 mb-8">
              Let&apos;s discuss your corporate training requirements. Our team will
              create a customized proposal that fits your budget and timeline.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-medium hover:bg-secondary/90 transition-colors"
              >
                Get a Free Proposal
              </Link>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="inline-flex items-center gap-2 border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-primary transition-colors"
              >
                Email Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
