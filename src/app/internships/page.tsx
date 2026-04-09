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
  Brain,
  Cloud,
  Globe,
  Cpu,
  Database,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageEvent } from "@/components/analytics/page-event";
import { TrackedLink } from "@/components/analytics/tracked-link";

export const metadata: Metadata = {
  title: "Internship Programs | 3-Month & 6-Month Tracks",
  description:
    "Gain real-world experience with Archer Infotech internship programs. Choose from 3-month or 6-month internship tracks. Work on live projects, get mentored by industry experts, and kickstart your IT career.",
};

interface InternshipProgram {
  id: string;
  title: string;
  duration: string;
  mode: string;
  skills: string[];
  description: string;
  icon: React.ElementType;
  track?: string;
}

const diplomaPrograms: InternshipProgram[] = [
  {
    id: "prog-fundamentals",
    title: "Programming Fundamentals",
    duration: "3 Months",
    mode: "Hybrid",
    skills: ["C", "C++", "Python", "DSA Basics", "Problem Solving"],
    description:
      "Build a strong foundation in programming with C, C++, and Python. Learn data structures and algorithms to solve real-world problems.",
    icon: Code,
  },
  {
    id: "php-fullstack-ai",
    title: "PHP Full Stack + AI",
    duration: "3 Months",
    mode: "Hybrid",
    skills: ["PHP", "MySQL", "Laravel", "AI Integration", "REST APIs"],
    description:
      "Develop dynamic web applications with PHP and Laravel, integrated with AI capabilities for modern solutions.",
    icon: Globe,
  },
  {
    id: "web-dev-ai",
    title: "Web Development + AI",
    duration: "3 Months",
    mode: "Hybrid",
    skills: ["HTML5", "CSS3", "JavaScript", "AI Tools", "Responsive Design"],
    description:
      "Master frontend web development and learn to integrate AI tools for enhanced user experiences and productivity.",
    icon: Laptop,
  },
  {
    id: "data-analytics-diploma",
    title: "Data Analytics",
    duration: "3 Months",
    mode: "Hybrid",
    skills: ["Python", "SQL", "Excel", "Power BI", "Data Visualization"],
    description:
      "Analyze real-world datasets, create insightful visualizations, and learn to make data-driven decisions.",
    icon: Database,
  },
  {
    id: "ai-ml-basics",
    title: "AI/ML Basics",
    duration: "3 Months",
    mode: "Hybrid",
    skills: ["Python", "Machine Learning", "Neural Networks", "AI Tools", "Projects"],
    description:
      "Get started with artificial intelligence and machine learning. Build foundational skills for the AI-driven future.",
    icon: Brain,
  },
];

const degreePrograms: InternshipProgram[] = [
  // Full Stack Tracks
  {
    id: "java-fullstack-degree",
    title: "Java Full Stack Developer",
    duration: "6 Months",
    mode: "Hybrid",
    skills: ["Spring Boot", "Microservices", "AI Integration", "Cloud", "DevOps"],
    description:
      "Become a job-ready Java Full Stack developer with expertise in Spring Boot, microservices architecture, AI integration, and cloud deployment.",
    icon: Code,
    track: "Full Stack",
  },
  {
    id: "dotnet-fullstack-degree",
    title: ".NET Full Stack Developer",
    duration: "6 Months",
    mode: "Hybrid",
    skills: ["ASP.NET Core", "Microservices", "Cloud", "AI", "SQL Server"],
    description:
      "Master the Microsoft ecosystem with ASP.NET Core, build enterprise applications with AI capabilities and cloud deployment.",
    icon: Code,
    track: "Full Stack",
  },
  {
    id: "mern-degree",
    title: "MERN Stack Developer",
    duration: "6 Months",
    mode: "Hybrid",
    skills: ["React", "Node.js", "MongoDB", "AI Integration", "DevOps"],
    description:
      "Build modern web applications with the MERN stack, integrated AI features, and DevOps practices for deployment.",
    icon: Globe,
    track: "Full Stack",
  },
  {
    id: "python-fullstack-degree",
    title: "Python Full Stack Developer",
    duration: "6 Months",
    mode: "Hybrid",
    skills: ["Django", "REST APIs", "AI/ML", "Cloud", "PostgreSQL"],
    description:
      "Develop scalable web applications with Django, integrate AI/ML capabilities, and deploy on cloud platforms.",
    icon: Code,
    track: "Full Stack",
  },
  // AI/Data Tracks
  {
    id: "ai-engineer",
    title: "AI Engineer",
    duration: "6 Months",
    mode: "Hybrid",
    skills: ["Generative AI", "LLMs", "Prompt Engineering", "LangChain", "RAG"],
    description:
      "Specialize in cutting-edge AI technologies including Generative AI, Large Language Models, and building AI-powered applications.",
    icon: Brain,
    track: "AI/Data",
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    duration: "6 Months",
    mode: "Hybrid",
    skills: ["Python", "Machine Learning", "Deep Learning", "Statistics", "Visualization"],
    description:
      "Master data science with machine learning, statistical analysis, and advanced visualization techniques for actionable insights.",
    icon: Brain,
    track: "AI/Data",
  },
  {
    id: "data-engineer",
    title: "Data Engineer",
    duration: "6 Months",
    mode: "Hybrid",
    skills: ["Apache Spark", "Kafka", "Airflow", "Data Pipelines", "Cloud"],
    description:
      "Build robust data pipelines and infrastructure using modern data engineering tools and cloud platforms.",
    icon: Database,
    track: "AI/Data",
  },
  // System Tracks
  {
    id: "cloud-devops",
    title: "Cloud & DevOps Engineer",
    duration: "6 Months",
    mode: "Hybrid",
    skills: ["AWS/Azure", "Docker", "Kubernetes", "CI/CD", "Terraform"],
    description:
      "Master cloud platforms and DevOps practices. Build, deploy, and manage applications at scale.",
    icon: Cloud,
    track: "Systems",
  },
  // Emerging Tech
  {
    id: "iot-ai",
    title: "IoT + AI Engineer",
    duration: "6 Months",
    mode: "Hybrid",
    skills: ["IoT Platforms", "Sensors", "Edge AI", "Python", "Cloud IoT"],
    description:
      "Combine IoT and AI to build intelligent connected systems. Work with sensors, edge computing, and cloud IoT platforms.",
    icon: Cpu,
    track: "Emerging Tech",
  },
  // Core Engineering
  {
    id: "software-engineer",
    title: "Software Engineer",
    duration: "6 Months",
    mode: "Hybrid",
    skills: ["DSA", "System Design", "LLD/HLD", "Problem Solving", "Coding"],
    description:
      "Build strong software engineering fundamentals with DSA, system design, and coding practices for top tech companies.",
    icon: Code,
    track: "Core Engineering",
  },
];

function ProgramCard({ program }: { program: InternshipProgram }) {
  const IconComponent = program.icon;
  return (
    <Card className="group hover:shadow-lg transition-shadow h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <Badge variant="outline">{program.mode}</Badge>
          <Badge variant="outline">{program.duration}</Badge>
          {program.track && (
            <Badge className="bg-primary/10 text-primary">{program.track}</Badge>
          )}
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0 transition-colors group-hover:bg-primary">
            <IconComponent className="h-5 w-5 text-primary transition-colors group-hover:text-primary-foreground" />
          </div>
          <CardTitle className="text-lg">{program.title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col">
        <p className="text-muted-foreground text-sm mb-4">
          {program.description}
        </p>
        <div className="mb-4 mt-auto">
          <h4 className="text-sm font-medium mb-2">Skills you&apos;ll learn:</h4>
          <div className="flex flex-wrap gap-1.5">
            {program.skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
        <TrackedLink
          href="/contact"
          className="inline-flex items-center text-sm font-medium text-primary hover:text-secondary transition-colors"
          event="internship_apply_clicked"
          properties={{
            program_id: program.id,
            program_title: program.title,
            duration: program.duration,
            location: "program_card",
          }}
        >
          Apply Now →
        </TrackedLink>
      </CardContent>
    </Card>
  );
}

export default function InternshipsPage() {
  return (
    <>
      <PageEvent
        event="internships_page_viewed"
        properties={{ page_type: "internships", page_path: "/internships" }}
      />

      {/* Hero Section */}
      <section className="gradient-hero text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <Badge className="mb-4 inline-flex items-center gap-2 bg-white/20">
              <span className="h-2.5 w-2.5 rounded-full bg-secondary animate-pulse" />
              <span>Now Accepting Applications</span>
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Internship Programs
            </h1>
            <p className="text-lg text-white/80 mb-6">
              Gain real-world experience and kickstart your IT career with our
              industry-focused internship programs. Choose between our 3-month
              internship track or 6-month job-ready internship track based on
              your career goals.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2">
                <GraduationCap className="h-5 w-5 text-secondary" />
                <span className="text-sm">3-Month Internship</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2">
                <Award className="h-5 w-5 text-secondary" />
                <span className="text-sm">6-Month Job-Ready Internship</span>
              </div>
            </div>
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
                description: "Get guidance from industry professionals with 10+ years experience",
              },
              {
                icon: Award,
                title: "Certificate",
                description: "Receive an industry-recognized internship certificate",
              },
              {
                icon: Briefcase,
                title: "Job Opportunities",
                description: "100% placement assistance with our corporate partners",
              },
            ].map((benefit) => (
              <Card key={benefit.title} className="group transition-shadow hover:shadow-lg">
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 transition-colors group-hover:bg-primary">
                    <benefit.icon className="h-6 w-6 text-primary transition-colors group-hover:text-primary-foreground" />
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

      {/* Programs Section with Tabs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Available Programs</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose from our range of technology-focused internship programs
              designed to give you hands-on experience.
            </p>
          </div>

          <Tabs defaultValue="diploma" className="w-full">
            <TabsList
              size="lg"
              className="mx-auto mb-8 grid max-w-3xl grid-cols-1 gap-2 border border-primary/10 bg-primary/5 shadow-sm sm:grid-cols-2"
            >
              <TabsTrigger
                value="diploma"
                className="gap-2 border border-transparent bg-transparent text-foreground/70 hover:bg-background/70 hover:text-foreground data-active:border-primary/15 data-active:bg-background data-active:text-primary data-active:shadow-sm"
              >
                <GraduationCap className="h-5 w-5 shrink-0" />
                <span>3-Month Internship</span>
              </TabsTrigger>
              <TabsTrigger
                value="degree"
                className="gap-2 border border-transparent bg-transparent text-foreground/70 hover:bg-background/70 hover:text-foreground data-active:border-primary/15 data-active:bg-background data-active:text-primary data-active:shadow-sm"
              >
                <Award className="h-5 w-5 shrink-0" />
                <span>6-Month Internship</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="diploma">
              <div className="mb-6 text-center">
                <Badge className="bg-secondary/10 text-secondary mb-2">Foundation + Exposure</Badge>
                <p className="text-muted-foreground">
                  Perfect for students looking to gain foundational skills and industry exposure
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {diplomaPrograms.map((program) => (
                  <ProgramCard key={program.id} program={program} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="degree">
              <div className="mb-6 text-center">
                <Badge className="bg-secondary/10 text-secondary mb-2">Specialization + Industry + Placement</Badge>
                <p className="text-muted-foreground">
                  Comprehensive programs designed to make you job-ready with specialized skills
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {degreePrograms.map((program) => (
                  <ProgramCard key={program.id} program={program} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Choose Your Path</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Compare our programs to find the best fit for your career goals
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* 3-Month Internship Card */}
            <Card className="border-2 border-primary/20">
              <CardHeader className="text-center bg-primary/5">
                <GraduationCap className="h-12 w-12 text-primary mx-auto mb-2" />
                <CardTitle className="text-2xl">3-Month Internship</CardTitle>
                <p className="text-muted-foreground">Foundation internship track</p>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  {[
                    "Foundation skills building",
                    "Industry exposure",
                    "Live project experience",
                    "Certificate on completion",
                    "Basic placement support",
                    "Perfect for students",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <TrackedLink
                  href="/contact"
                  className="inline-flex items-center justify-center w-full gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors mt-6"
                  event="internship_apply_clicked"
                  properties={{ duration: "3-month", location: "comparison_card" }}
                >
                  Apply for 3-Month Internship
                </TrackedLink>
              </CardContent>
            </Card>

            {/* 6-Month Internship Card */}
            <Card className="border-2 border-secondary">
              <CardHeader className="text-center bg-secondary/10">
                <div className="absolute top-2 right-2">
                  <Badge className="bg-secondary text-secondary-foreground">Recommended</Badge>
                </div>
                <Award className="h-12 w-12 text-secondary mx-auto mb-2" />
                <CardTitle className="text-2xl">6-Month Internship</CardTitle>
                <p className="text-muted-foreground">Advanced job-ready internship track</p>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  {[
                    "Deep specialization tracks",
                    "Industry-level projects",
                    "AI/Cloud integration skills",
                    "Resume & interview prep",
                    "100% placement assistance",
                    "Perfect for job seekers",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <TrackedLink
                  href="/contact"
                  className="inline-flex items-center justify-center w-full gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-medium hover:bg-secondary/90 transition-colors mt-6"
                  event="internship_apply_clicked"
                  properties={{ duration: "6-month", location: "comparison_card" }}
                >
                  Apply for 6-Month Internship
                </TrackedLink>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Eligibility Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Eligibility Criteria</h2>
              <ul className="space-y-4">
                {[
                  "Currently pursuing or completed B.Tech/BCA/MCA/B.Sc (IT/CS) or Diploma",
                  "Basic understanding of programming concepts",
                  "Eagerness to learn and work on real projects",
                  "Good communication skills",
                  "Ability to commit full-time for the program duration",
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
                    "Choose your preferred internship track (3-month/6-month)",
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
                <TrackedLink
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-medium hover:bg-secondary/90 transition-colors mt-6 w-full justify-center"
                  event="internship_apply_clicked"
                  properties={{ location: "how_to_apply_section" }}
                >
                  Enquire About Internship Programs
                </TrackedLink>
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
            will set you apart in the job market. 100% placement assistance for
            selected 6-month internship tracks.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-medium hover:bg-secondary/90 transition-colors"
            >
              Apply Now
            </Link>
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 bg-white/10 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/20 transition-colors"
            >
              Explore Courses
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
