import { Metadata } from "next";
import Image from "next/image";
import { CheckCircle, Award, Target, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/data/site-config";
import { getTeamMembers } from "@/data/team";
import { AnimatedCounter } from "@/components/common/animated-counter";
import { LinkedinIcon } from "@/components/common/social-icons";
import { TrackedAnchor } from "@/components/analytics/tracked-anchor";
import { TrackedLink } from "@/components/analytics/tracked-link";

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
                      <AnimatedCounter value={stat.value} />
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
          <div className="space-y-8">
            {/* Vision Card */}
            <Card className="group border-l-4 border-l-primary transition-shadow hover:shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center transition-colors group-hover:bg-primary">
                    <Eye className="h-6 w-6 text-primary transition-colors group-hover:text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold">Our Vision</h3>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Founded by <strong className="text-foreground">Yogesh Patil</strong> with over 15 years of hands-on IT industry experience, Archer Infotech was built on a single, unwavering belief — that every student in Pune deserves access to training that actually gets them hired.
                  </p>
                  <p>
                    Our vision is to be <strong className="text-foreground">Pune&apos;s most recognised IT training institute in Kothrud</strong> — a centre of excellence where freshers, graduates, and working professionals come to master in-demand technologies like Java, Python, Full Stack Development, AWS Cloud, DevOps, Data Science, and Generative AI — and leave with a job offer in hand.
                  </p>
                  <p className="font-semibold text-primary">
                    We don&apos;t just teach technology. We build careers.
                  </p>
                  <p>
                    With <strong className="text-foreground">5,000+ students placed</strong> at top IT companies including TCS, Infosys, Wipro, Tech Mahindra, and Persistent Systems, and <strong className="text-foreground">1,000+ batches</strong> successfully completed from our institute near Kothrud Bus Stand, Pune — our vision is backed by a 15-year track record that speaks louder than any promise.
                  </p>
                  <p>
                    As the IT industry evolves rapidly — from Cloud and DevOps to ChatGPT, LLMs, and Generative AI — our vision is to stay permanently ahead of that curve, so our students are always the most job-ready candidates walking into any interview room in Pune, Mumbai, or anywhere in India.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Mission Card */}
            <Card className="group border-l-4 border-l-secondary transition-shadow hover:shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center transition-colors group-hover:bg-secondary">
                    <Target className="h-6 w-6 text-secondary transition-colors group-hover:text-secondary-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold">Our Mission</h3>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Our mission is to make <strong className="text-foreground">high-quality IT education accessible</strong> to every student in Pune — whether you are a fresher starting your career or an experienced professional looking to upskill.
                  </p>
                  <p className="font-medium text-foreground">
                    At our institute in Kothrud, Pune, we are committed to:
                  </p>
                  <ul className="space-y-3 ml-4">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                      <span>Delivering industry-aligned IT courses taught by <strong className="text-foreground">certified trainers with 10+ years</strong> of real-world experience</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                      <span>Providing <strong className="text-foreground">100% placement assistance</strong> with 100+ corporate partners including TCS, Infosys, Wipro, Tech Mahindra, and Persistent Systems</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                      <span>Training students through <strong className="text-foreground">hands-on projects, live assignments, and mock interviews</strong> that prepare them for the competitive IT job market</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                      <span>Continuously updating our curriculum to reflect the <strong className="text-foreground">latest technologies</strong> — from AWS and Kubernetes to ChatGPT, LLMs, and Prompt Engineering</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                      <span>Creating <strong className="text-foreground">globally competitive IT professionals</strong> who are job-ready from day one</span>
                    </li>
                  </ul>
                  <p className="italic text-center pt-4 border-t">
                    &ldquo;To reach every corner of the country and help students realise their full potential — creating world-class IT professionals, one batch at a time.&rdquo;
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Meet Our <span className="text-primary">Expert Trainers</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our team of industry professionals brings real-world experience from top IT companies
              like TCS, Wipro, Capgemini, and more. Learn from trainers who have been where you want to go.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member) => (
              <Card key={member.id} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  {member.image ? (
                    <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden relative">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-24 h-24 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-3xl font-bold text-primary">
                        {member.name.split(" ").map((n) => n[0]).join("")}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <h3 className="text-lg font-semibold">{member.name}</h3>
                    {member.linkedin && (
                      <TrackedAnchor
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-[#0077B5] transition-colors"
                        title={`${member.name} on LinkedIn`}
                        event="team_linkedin_clicked"
                        properties={{ member_name: member.name, location: "about_page" }}
                      >
                        <LinkedinIcon className="h-4 w-4" />
                      </TrackedAnchor>
                    )}
                  </div>
                  <p className="text-secondary font-medium text-sm mb-2">{member.role}</p>
                  <p className="text-xs text-muted-foreground mb-1">{member.experience} Experience</p>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{member.bio}</p>
                  <div className="flex flex-wrap justify-center gap-1.5">
                    {member.expertise.slice(0, 4).map((skill, index) => (
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
            <TrackedLink
              href="/contact"
              className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-medium hover:bg-secondary/90 transition-colors"
              event="cta_clicked"
              properties={{ cta: "contact_us", location: "about_page_bottom" }}
            >
              Contact Us
            </TrackedLink>
            <TrackedLink
              href="/courses"
              className="inline-flex items-center gap-2 border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-primary transition-colors"
              event="cta_clicked"
              properties={{ cta: "explore_courses", location: "about_page_bottom" }}
            >
              Explore Courses
            </TrackedLink>
          </div>
        </div>
      </section>
    </>
  );
}
