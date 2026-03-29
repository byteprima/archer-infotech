import { Metadata } from "next";
import Link from "next/link";
import {
  Clock,
  Users,
  Award,
  Briefcase,
  CheckCircle,
  GraduationCap,
  Code,
  Laptop,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Internship Programs",
  description:
    "Gain real-world experience with Archer Infotech internship programs. Work on live projects, get mentored by industry experts, and kickstart your IT career.",
};

const internshipPrograms = [
  {
    id: "java-intern",
    title: "Java Development Internship",
    duration: "3 Months",
    mode: "Hybrid",
    skills: ["Core Java", "Spring Boot", "MySQL", "REST APIs"],
    description:
      "Work on enterprise Java applications and learn industry-standard development practices.",
  },
  {
    id: "python-intern",
    title: "Python Development Internship",
    duration: "3 Months",
    mode: "Hybrid",
    skills: ["Python", "Django", "PostgreSQL", "Data Analysis"],
    description:
      "Build web applications and automate tasks using Python and related frameworks.",
  },
  {
    id: "fullstack-intern",
    title: "Full Stack Development Internship",
    duration: "4 Months",
    mode: "Hybrid",
    skills: ["React.js", "Node.js", "MongoDB", "Express.js"],
    description:
      "Develop complete web applications from frontend to backend with modern technologies.",
  },
  {
    id: "devops-intern",
    title: "DevOps Internship",
    duration: "3 Months",
    mode: "Remote/Hybrid",
    skills: ["Docker", "Kubernetes", "Jenkins", "AWS"],
    description:
      "Learn CI/CD pipelines, containerization, and cloud deployment practices.",
  },
  {
    id: "data-intern",
    title: "Data Analytics Internship",
    duration: "3 Months",
    mode: "Hybrid",
    skills: ["Python", "SQL", "Power BI", "Excel"],
    description:
      "Analyze real-world datasets and create insightful visualizations and reports.",
  },
];

export default function InternshipsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="gradient-hero text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <Badge className="bg-white/20 mb-4">Now Accepting Applications</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Internship Programs
            </h1>
            <p className="text-lg text-white/80">
              Gain real-world experience and kickstart your IT career with our
              industry-focused internship programs. Work on live projects under
              expert guidance.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Intern with Us?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our internship programs are designed to bridge the gap between
              academic learning and industry requirements.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Laptop,
                title: "Live Projects",
                description: "Work on real client projects and build your portfolio",
              },
              {
                icon: Users,
                title: "Expert Mentorship",
                description: "Get guidance from industry professionals",
              },
              {
                icon: Award,
                title: "Certificate",
                description: "Receive an industry-recognized internship certificate",
              },
              {
                icon: Briefcase,
                title: "Job Opportunities",
                description: "Get hired by our partner companies post-internship",
              },
            ].map((benefit) => (
              <Card key={benefit.title}>
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Available Programs</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose from our range of technology-focused internship programs
              designed to give you hands-on experience.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {internshipPrograms.map((program) => (
              <Card key={program.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">{program.mode}</Badge>
                    <Badge variant="outline">{program.duration}</Badge>
                  </div>
                  <CardTitle className="text-xl">{program.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4">
                    {program.description}
                  </p>
                  <div className="mb-4">
                    <h4 className="text-sm font-medium mb-2">Skills you'll learn:</h4>
                    <div className="flex flex-wrap gap-2">
                      {program.skills.map((skill) => (
                        <Badge key={skill} className="bg-primary/10 text-primary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Link
                    href="/contact"
                    className="inline-flex items-center text-sm font-medium text-primary hover:text-secondary"
                  >
                    Apply Now →
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Eligibility Criteria</h2>
              <ul className="space-y-4">
                {[
                  "Currently pursuing or completed B.Tech/BCA/MCA/B.Sc (IT/CS)",
                  "Basic understanding of programming concepts",
                  "Eagerness to learn and work on real projects",
                  "Good communication skills",
                  "Ability to commit 3-4 months for the internship",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-6 w-6 text-secondary" />
                  How to Apply
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-4">
                  {[
                    "Fill out the enquiry form with your details",
                    "Attend a brief technical assessment",
                    "Interview with our team leads",
                    "Start your internship journey!",
                  ].map((step, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-medium shrink-0">
                        {index + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-medium hover:bg-secondary/90 transition-colors mt-6 w-full justify-center"
                >
                  Apply for Internship
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Career?
          </h2>
          <p className="text-white/80 mb-6 max-w-2xl mx-auto">
            Apply for our internship program and get hands-on experience that
            will set you apart in the job market.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-medium hover:bg-secondary/90 transition-colors"
          >
            Apply Now
          </Link>
        </div>
      </section>
    </>
  );
}
