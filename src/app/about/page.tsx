import { Metadata } from "next";
import Image from "next/image";
import { CheckCircle, Award, Target, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/data/site-config";
import { getTeamMembers } from "@/data/team";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Archer Infotech, Pune's leading IT training institute with 15+ years of experience. Our mission, vision, and team of expert trainers.",
};

export default function AboutPage() {
  const teamMembers = getTeamMembers();

  return (
    <>
      {/* Hero Section */}
      <section className="gradient-hero text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About Archer Infotech
            </h1>
            <p className="text-lg text-white/80">
              Archer Infotech is a leading IT and Language training centre providing
              full-suite of training and placement services for freshers seeking a
              new career and professionals looking for career advancement.
            </p>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Welcome to <span className="text-primary">Archer Infotech</span>
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Archer Infotech is mastered and administrated by highly skilled
                  industry experts with more than 15 years of IT experience. Our
                  institute has trained thousands of students who are now working
                  at top IT companies across India and abroad.
                </p>
                <p>
                  We have a team of highly skilled professional trainers delivering
                  proficient IT training in an affable environment, focusing on the
                  individual&apos;s needs to enable them to excel in the challenging
                  professional environment.
                </p>
                <p>
                  Our team never leaves any page unturned in the book of career and
                  success. We are committed to providing industry-relevant training
                  with 100% placement assistance.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { value: siteConfig.stats.studentsPlaced, label: "Students Placed" },
                { value: siteConfig.stats.yearsExperience, label: "Years Experience" },
                { value: siteConfig.stats.batchesCompleted, label: "Batches Completed" },
                { value: siteConfig.stats.placementRate, label: "Placement Rate" },
              ].map((stat) => (
                <Card key={stat.label} className="text-center">
                  <CardContent className="pt-6">
                    <div className="text-4xl font-bold text-primary mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Archer Infotech?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We are committed to providing the best IT training experience with
              focus on practical learning and career success.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {siteConfig.highlights.map((highlight, index) => (
              <div
                key={index}
                className="flex items-start gap-3 bg-background p-4 rounded-lg"
              >
                <CheckCircle className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-l-4 border-l-primary">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Eye className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold">Our Vision</h3>
                </div>
                <p className="text-muted-foreground">
                  &ldquo;It has been our endeavor at Archer Infotech to be abreast
                  with the latest and the best of technologies and offer a range of
                  courses in Information Technologies.&rdquo;
                </p>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-secondary">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <Target className="h-6 w-6 text-secondary" />
                  </div>
                  <h3 className="text-2xl font-bold">Our Mission</h3>
                </div>
                <p className="text-muted-foreground">
                  &ldquo;To reach out to the corner and nook of the country and help
                  the students realize their full potential, thus creating globally
                  competitive IT professionals out of them.&rdquo;
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Meet the dedicated professionals behind Archer Infotech who are
              committed to your success.
            </p>
          </div>
          <div className="max-w-md mx-auto">
            {teamMembers.map((member) => (
              <Card key={member.id} className="text-center">
                <CardContent className="pt-6">
                  {member.image ? (
                    <div className="w-32 h-32 rounded-full mx-auto mb-4 overflow-hidden relative">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        sizes="128px"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-32 h-32 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-4xl font-bold text-primary">
                        {member.name.split(" ").map((n) => n[0]).join("")}
                      </span>
                    </div>
                  )}
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-secondary font-medium mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground mb-4">{member.bio}</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {member.expertise.map((skill, index) => (
                      <span
                        key={index}
                        className="text-xs bg-muted px-2 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your IT Career?
          </h2>
          <p className="text-white/80 mb-6 max-w-2xl mx-auto">
            Join Archer Infotech and transform your career with our industry-relevant
            training programs and 100% placement assistance.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-medium hover:bg-secondary/90 transition-colors"
            >
              Contact Us
            </a>
            <a
              href="/courses"
              className="inline-flex items-center gap-2 border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-primary transition-colors"
            >
              Explore Courses
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
