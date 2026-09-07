import { Metadata } from "next";
import Link from "next/link";
import {
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
  FileText,
  ClipboardList,
  Target,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageEvent } from "@/components/analytics/page-event";
import { buildPageMetadata } from "@/lib/seo";
import { DefinitiveAnswer } from "@/components/seo/definitive-answer";
import { FaqSection } from "@/components/seo/faq-section";
import { NewsletterSignupForm } from "@/components/newsletter/newsletter-signup-form";
import { internshipsFaqs } from "@/data/faqs";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { LastUpdated } from "@/components/seo/last-updated";
import { EVERGREEN_LAST_REVIEWED } from "@/lib/seo/content-dates";
import { SourceCitations } from "@/components/seo/source-citations";
import { InternshipInterestDialog } from "@/components/internships/internship-interest-dialog";

export const metadata: Metadata = buildPageMetadata({
  title: "IT Internship in Pune for BCA, BTech, MCA & Diploma Students",
  description:
    "Mentor-led IT internship and OJT programs in Pune for Diploma, BCA, BSc, BTech and MCA students. Java, Python, Full Stack, Data Analytics, AI/ML, GenAI, Testing and DevOps tracks with project work, documentation support and certification.",
  path: "/internships",
});

/**
 * The four internship paths.
 *
 * The page previously offered only "3-month" and "6-month", which are
 * products rather than goals — a BCA student who needs 120 mapped hours and a
 * logbook could not tell which one applied to them. These are named by the
 * situation the visitor is actually in.
 */
const INTERNSHIP_PATHS = [
  {
    name: "Academic Internship / OJT",
    icon: ClipboardList,
    bestFor: "Diploma, BCA / BSc, B.E. / B.Tech",
    duration: "4–16 weeks",
    outcome: "Hours + mentor + project + logbook/report + certificate",
  },
  {
    name: "3-Month Skill + Project",
    icon: Code,
    bestFor: "College students needing skills and a portfolio",
    duration: "12 weeks",
    outcome: "Job-relevant stack + capstone project",
  },
  {
    name: "MCA Final-Semester Project",
    icon: FileText,
    bestFor: "MCA students",
    duration: "3–4 months",
    outcome: "End-to-end SDLC project + report + viva",
  },
  {
    name: "6-Month Job-Ready",
    icon: Target,
    bestFor: "Final-year students and graduates",
    duration: "6 months",
    outcome: "Deep specialisation + projects + placement preparation",
  },
] as const;

/** What a student actually does, week to week. */
const WHAT_YOU_DO = [
  "Technology orientation and environment setup",
  "Git and GitHub from first commit to pull request",
  "Agile task tracking, stand-ups and sprint rhythm",
  "Coding, debugging and documentation practices",
  "A mini assignment before the main build",
  "An industry-style project, with live-project exposure where available",
  "Testing and quality checks on your own work",
  "Deployment and demo where the project allows it",
  "Responsible AI-assisted development and testing",
] as const;

/** Documentation a college typically asks for. */
const COLLEGE_DOCS = [
  "Internship offer / joining letter",
  "Program title, domain, dates and expected hours",
  "Named internship mentor or supervisor",
  "Attendance and engagement record",
  "Daily or weekly logbook",
  "Weekly progress review",
  "Project statement and objectives",
  "Project report template and guidance",
  "Mentor evaluation in your college's format where feasible",
  "Internship completion certificate",
  "Final presentation and viva support",
] as const;

/** What the student leaves with, for the job hunt rather than the college. */
const CAREER_OUTCOMES = [
  "A GitHub profile and portfolio with the project in it",
  "A resume write-up of the project that survives questioning",
  "A LinkedIn project description",
  "A mock technical interview with feedback",
  "Presentation and communication practice",
  "A performance-based letter of recommendation",
  "Placement assistance on eligible programs",
] as const;

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
        {/* Collection stays on this page. The card already knows which
            programme the visitor is looking at, so the popup opens with that
            track preselected rather than sending them to a blank /contact
            form that has forgotten the context. */}
        <InternshipInterestDialog
          triggerClassName="inline-flex items-center text-sm font-medium text-primary hover:text-secondary transition-colors"
          defaultTrack={program.title}
          analyticsEvent="internship_apply_clicked"
          analyticsProperties={{
            program_id: program.id,
            program_title: program.title,
            duration: program.duration,
            location: "program_card",
          }}
        >
          Apply Now →
        </InternshipInterestDialog>
      </CardContent>
    </Card>
  );
}

export default function InternshipsPage() {
  return (
    <>
      {/* Two-level BreadcrumbList — these are top-level pages, so the
          trail is Home > page. Added 2026-08-06; the crawl found the
          six top-level marketing/legal pages were the only public
          routes emitting no BreadcrumbList at all. */}
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Internships", url: "/internships" },
        ]}
      />

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
              IT Internship Programs in Pune for Diploma, BCA, BSc, B.E./B.Tech
              &amp; MCA Students
            </h1>
            <LastUpdated iso={EVERGREEN_LAST_REVIEWED} className="mt-3 text-xs md:text-sm text-white/70" />
            <p className="text-lg text-white/80 mb-6">
              Build practical IT skills, complete an industry-style project and
              get the documentation you need for college and career. Archer
              Infotech offers mentor-led internship and OJT programs in Full
              Stack Development, Data &amp; AI, Generative AI, Software Testing,
              Cloud &amp; DevOps and more — available in classroom, live-online
              and hybrid formats.
            </p>
            <div className="mb-6 flex flex-wrap gap-3">
              {INTERNSHIP_PATHS.map((path) => (
                <div
                  key={path.name}
                  className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2"
                >
                  <path.icon className="h-5 w-5 text-secondary" />
                  <span className="text-sm">{path.name}</span>
                </div>
              ))}
            </div>
            <InternshipInterestDialog triggerClassName="inline-flex h-12 items-center justify-center rounded-lg bg-secondary px-6 font-medium text-secondary-foreground transition-colors hover:bg-secondary/90">
              Tell us what you need
            </InternshipInterestDialog>
          </div>
        </div>
      </section>

      {/* Definitive Answer Paragraph — citation-friendly factual opening
          enumerating both internship tracks and program list. P8-07. */}
      <DefinitiveAnswer eyebrow="Internship Programs at Archer Infotech, Pune">
        Archer Infotech runs four internship paths for IT learners in Pune.
        The Academic Internship / OJT path runs 4 to 16 weeks and is mapped to
        the requirement a college shares with us. The 3-Month Skill + Project
        Internship is a 12-week portfolio-focused track. The MCA
        Final-Semester Internship / Project runs 3 to 4 months as an
        end-to-end SDLC project with report and viva support. The 6-Month
        Job-Ready Internship adds deep specialisation and interview
        preparation. Technology tracks include Java, Python, MERN and .NET
        Full Stack, Data Analytics, Data Science and Machine Learning,
        Generative AI, Software Testing and QA Automation, and Cloud and
        DevOps. All paths run in classroom, live-online or hybrid format from
        the Kothrud campus, include a mentor, an industry-style project,
        logbook and report guidance, and an Archer Infotech Internship
        Completion Certificate. Final credit acceptance is governed by your
        college or university.
      </DefinitiveAnswer>

      {/* Choose your internship goal — the page's real entry point. */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <h2 className="mb-3 text-3xl font-bold">
              Choose your internship goal
            </h2>
            <p className="text-muted-foreground">
              Four paths, named by the situation you are in rather than by how
              long they run. If none of them quite fits your college&rsquo;s
              requirement, tell us and we will map one.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border">
            <table className="w-full min-w-[720px] border-collapse text-sm">
              <caption className="sr-only">
                Archer Infotech internship paths compared by audience,
                duration and outcome
              </caption>
              <thead>
                <tr className="bg-muted/50">
                  <th scope="col" className="p-4 text-left font-semibold">Path</th>
                  <th scope="col" className="p-4 text-left font-semibold">Best for</th>
                  <th scope="col" className="p-4 text-left font-semibold">Typical duration</th>
                  <th scope="col" className="p-4 text-left font-semibold">Primary outcome</th>
                </tr>
              </thead>
              <tbody>
                {INTERNSHIP_PATHS.map((path) => (
                  <tr key={path.name} className="border-t">
                    <th scope="row" className="p-4 text-left font-medium">
                      {path.name}
                    </th>
                    <td className="p-4 text-muted-foreground">{path.bestFor}</td>
                    <td className="p-4 text-muted-foreground">{path.duration}</td>
                    <td className="p-4 text-muted-foreground">{path.outcome}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* College Internship / OJT — the section this page most needed. */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-3 text-3xl font-bold">
              Need an internship for your college curriculum?
            </h2>
            <p className="mb-6 text-muted-foreground">
              Share your college&rsquo;s internship or OJT requirement with us —
              duration, hours, domain and documentation format. We will help map
              your internship plan to the requirement and provide structured
              mentoring, project work, progress reviews and completion
              documentation.
            </p>

            <h3 className="mb-3 font-semibold">Support can include</h3>
            <ul className="mb-6 grid gap-2 sm:grid-cols-2">
              {COLLEGE_DOCS.map((doc) => (
                <li key={doc} className="flex gap-2.5 text-sm">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span className="text-muted-foreground">{doc}</span>
                </li>
              ))}
            </ul>

            {/* Stated plainly rather than buried: we do not control credit. */}
            <blockquote className="mb-6 border-l-4 border-secondary bg-background p-4 text-sm text-muted-foreground">
              Final approval and credit acceptance are governed by your college
              or university. We provide documentation support and map the plan
              to the requirement you share with us — we cannot guarantee credits
              on your college&rsquo;s behalf.
            </blockquote>

            <InternshipInterestDialog triggerClassName="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-6 font-medium text-primary-foreground transition-colors hover:bg-primary/90">
              Share your college requirement
            </InternshipInterestDialog>
          </div>
        </div>
      </section>

      {/* What you will actually do + what you leave with. */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="mb-3 text-2xl font-bold">
                What you will actually do
              </h2>
              <p className="mb-5 text-sm text-muted-foreground">
                Project-based work, not certificate-only participation.
              </p>
              <ul className="space-y-2.5">
                {WHAT_YOU_DO.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-3 text-2xl font-bold">What you leave with</h2>
              <p className="mb-5 text-sm text-muted-foreground">
                Evidence for the job hunt, not only for the college file.
              </p>
              <ul className="space-y-2.5">
                {CAREER_OUTCOMES.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm">
                    <Award className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
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
                description: "placement assistance with our corporate partners",
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
                <InternshipInterestDialog
                  triggerClassName="inline-flex items-center justify-center w-full gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors mt-6"
                  defaultPath="3-Month Skill + Project Internship"
                  analyticsEvent="internship_apply_clicked"
                  analyticsProperties={{ duration: "3-month", location: "comparison_card" }}
                >
                  Apply for 3-Month Internship
                </InternshipInterestDialog>
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
                    "placement assistance",
                    "Perfect for job seekers",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <InternshipInterestDialog
                  triggerClassName="inline-flex items-center justify-center w-full gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-medium hover:bg-secondary/90 transition-colors mt-6"
                  defaultPath="6-Month Job-Ready Internship"
                  analyticsEvent="internship_apply_clicked"
                  analyticsProperties={{ duration: "6-month", location: "comparison_card" }}
                >
                  Apply for 6-Month Internship
                </InternshipInterestDialog>
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
                <InternshipInterestDialog
                  triggerClassName="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-medium hover:bg-secondary/90 transition-colors mt-6 w-full justify-center"
                  analyticsEvent="internship_apply_clicked"
                  analyticsProperties={{ location: "how_to_apply_section" }}
                >
                  Enquire About Internship Programs
                </InternshipInterestDialog>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ block + FAQPage JSON-LD — eligibility, certificate validity,
          3 vs 6 month difference, stipend / fee, placement conversion.
          P8-08. */}
      <FaqSection
        heading="Internship FAQs"
        intro="Eligibility, certificates, the difference between 3-month and 6-month tracks, fees, and how the program connects to placement."
        items={internshipsFaqs}
      />

      {/* P5-17 — newsletter banner. */}
      <section className="py-8 bg-background border-t">
        <div className="container mx-auto px-4 max-w-3xl">
          <NewsletterSignupForm
            placement="internships"
            variant="banner"
            headline="Pune IT careers — monthly briefing"
            subhead="Hiring updates, salary movements, and an employer spotlight every month. Free."
          />
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
            will set you apart in the job market. placement assistance for
            selected 6-month internship tracks.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <InternshipInterestDialog
              triggerClassName="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-medium hover:bg-secondary/90 transition-colors"
              analyticsEvent="internship_apply_clicked"
              analyticsProperties={{ location: "final_cta" }}
            >
              Apply Now
            </InternshipInterestDialog>
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 bg-white/10 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/20 transition-colors"
            >
              Explore Courses
            </Link>
          </div>
        </div>
      </section>
      <SourceCitations
        heading="Sources"
        intro="References for the claims made on this page."
        items={[
          {
            label: "Stack Overflow Developer Survey",
            href: "https://survey.stackoverflow.co/",
            supports: "industry-wide technology adoption and pay data referenced here.",
          },
        ]}
      />

    </>
  );
}
