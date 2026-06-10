import type { Metadata } from "next";
import Link from "next/link";
import {
  Cloud,
  Compass,
  TrendingUp,
  Building2,
  CalendarRange,
  AlertTriangle,
  GitBranch,
  ArrowRight,
  CheckCircle2,
  BookOpen,
} from "lucide-react";
import { PageEvent } from "@/components/analytics/page-event";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { BreadcrumbJsonLd, FAQJsonLd } from "@/components/seo/json-ld";
import { DefinitiveAnswer } from "@/components/seo/definitive-answer";
import { FaqSection } from "@/components/seo/faq-section";
import { LastUpdated } from "@/components/seo/last-updated";
import { buildPageMetadata } from "@/lib/seo";
import { EVERGREEN_LAST_REVIEWED } from "@/lib/seo/content-dates";

/**
 * P5-19+ — Cluster 6: Cloud / DevOps Engineer career path (Pune, 2026).
 *
 * Sixth career-path pillar — anchors Pune's cloud + DevOps hiring market
 * (~800-1,200 monthly listings across AWS / Azure / GCP / Kubernetes /
 * Docker / SRE tracks). Last major Pune IT vertical without a dedicated
 * pillar.
 *
 * Anchors existing courses: aws-training, azure-training, google-cloud-,
 * aws-solutions-architect-, azure-administrator-, gcp-associate-cloud-eng,
 * devops-training, kubernetes-training, docker-training.
 *
 * Sibling pillars: java-developer, python-developer, full-stack-developer,
 * data-science-ai, first-it-job-pune.
 *
 * Target length ~3,500 words.
 */

export const metadata: Metadata = buildPageMetadata({
  title: "How to Become a Cloud / DevOps Engineer in Pune — 2026 Roadmap",
  description:
    "The full Cloud / DevOps career path for Pune in 2026: 12-month plan, 4 specialisation arcs (AWS / Azure / DevOps / SRE), salary trajectory ₹4-30+ LPA, certifications, hiring companies, and mistakes to avoid. Pune cloud listings run 800-1,200/month.",
  path: "/career-paths/cloud-devops-engineer",
  lastModified: EVERGREEN_LAST_REVIEWED,
});

const faqs = [
  {
    question: "Which cloud platform should I pick — AWS, Azure, or GCP?",
    answer:
      "AWS for largest Pune hiring volume (~55% of cloud listings); Azure for BFSI/Insurance/Healthcare verticals (~30%, strong at BNP Paribas IT, Allianz tech, Cognizant .NET+Azure shops); GCP for data-engineering and AI-adjacent roles (~15%, growing at Pune data startups). The pragmatic Pune answer: AWS first unless you have specific BFSI or data-engineering targeting.",
  },
  {
    question: "Do I need certifications to land a Pune Cloud / DevOps job?",
    answer:
      "For fresher / 0-2 year roles: strongly recommended but not mandatory. Pune services majors filter by AWS Solutions Architect Associate or Azure Administrator (AZ-104) at fresher level — having the cert + a deployed project beats either alone. For 3+ year tracks: certifications matter less than production-experience signal. Exam fees: AWS SAA ~$150, AZ-104 ~$165, GCP ACE ~$125.",
  },
  {
    question: "How long does it take to become a DevOps engineer in Pune?",
    answer:
      "Realistic timeline: 10-14 months for a focused career changer. DevOps requires breadth — Linux fundamentals + a cloud platform + Docker + Kubernetes + at least one CI/CD tool + scripting (Bash + Python) + monitoring basics. Self-taught learners typically take 18-24 months because the curriculum sequencing is hard to self-design. Structured programmes compress to 8-10 months.",
  },
  {
    question: "Cloud Engineer vs DevOps Engineer vs SRE — what's the difference?",
    answer:
      "Cloud Engineer = focuses on cloud platform expertise (AWS / Azure / GCP), provisioning + configuring + securing cloud infrastructure. DevOps Engineer = focuses on the dev-to-prod pipeline (CI/CD, automation, deployment, infrastructure-as-code). SRE = senior tier, focuses on reliability + observability + production-incident response with stronger software-engineering rigour. Pune fresher hiring is mostly Cloud + DevOps; SRE roles start at 3-5 years.",
  },
  {
    question: "Do I need to know Linux for Cloud / DevOps in Pune?",
    answer:
      "Yes, deeply. Every meaningful cloud + DevOps role assumes solid Linux command-line fluency: file system navigation, permissions, package management, systemd, networking (ifconfig, netstat, ss, iptables), bash scripting, log inspection. Spend 4-6 weeks on Linux fundamentals before touching AWS / Azure. Most failed Cloud / DevOps fresher interviews are Linux-failed, not cloud-failed.",
  },
  {
    question: "What does a Pune Cloud / DevOps engineer earn in 2026?",
    answer:
      "Fresher band: ₹4-7 LPA (services) / ₹6-10 LPA (product + GCC). 1-3 years: ₹6-12 LPA / ₹10-18 LPA. 3-6 years: ₹12-20 LPA / ₹18-30 LPA. Senior SRE / Cloud Architect 6+ years: ₹20-35 LPA / ₹30-50+ LPA. Specialisations: AWS Solutions Architect cert + Kubernetes + Terraform fluency = ₹2-5 LPA premium at every band. Source: Naukri + LinkedIn + AmbitionBox Pune cloud + DevOps listings, last 12 months.",
  },
  {
    question: "What portfolio projects close Pune Cloud / DevOps interviews?",
    answer:
      "Three categories that consistently close offers: (1) a complete infrastructure-as-code project on AWS or Azure using Terraform — VPC + EC2/VM + RDS + Lambda + IAM, version-controlled on GitHub; (2) a CI/CD pipeline (Jenkins or GitHub Actions) that builds + tests + deploys a sample app to a cloud environment; (3) a Kubernetes deployment of a multi-container app with proper Service + Ingress + ConfigMap + Secret usage. Two of these at depth + clean documentation beats five tutorial-clones.",
  },
  {
    question: "Is Kubernetes worth learning for fresher Cloud / DevOps roles in Pune?",
    answer:
      "Yes, increasingly so. Pune cloud + DevOps job postings reference Kubernetes in roughly 50% of listings in 2026 (up from 30% in 2024). Even fresher roles increasingly expect Kubernetes basics: pods, services, deployments, ingress, kubectl fluency, basic Helm. Adding a Kubernetes project to your portfolio bumps Pune fresher offers ₹1-3 LPA above the standard cloud band.",
  },
];

const milestones = [
  {
    timeframe: "Month 1–3",
    title: "Linux + Networking Fundamentals",
    detail:
      "Linux command-line fluency: file system, permissions, processes, systemd, package management. Networking basics: TCP/IP, DNS, HTTP/HTTPS, SSH, firewalls. Bash scripting for automation. Daily practice on a Linux VM (VirtualBox / WSL2). End-of-phase milestone: 20+ bash scripts on GitHub solving real automation problems.",
  },
  {
    timeframe: "Month 4–6",
    title: "Cloud Platform Deep Dive + First Certification",
    detail:
      "Pick AWS, Azure, or GCP. Deep dive: compute (EC2/VM), storage (S3/Blob), networking (VPC/VNet), databases (RDS/SQL), serverless (Lambda/Functions), IAM, monitoring. Hands-on projects in a free-tier account. Prepare for + take Solutions Architect Associate cert. End-of-phase milestone: cert in hand + 3 deployed cloud projects.",
  },
  {
    timeframe: "Month 7–9",
    title: "Containers + Orchestration + IaC",
    detail:
      "Docker — images, containers, networks, volumes, docker-compose for multi-container apps. Kubernetes — pods, deployments, services, ingress, kubectl, basic Helm. Infrastructure-as-Code — Terraform basics, modules, state management. End-of-phase milestone: deploy a multi-container app to Kubernetes via Terraform-provisioned infrastructure.",
  },
  {
    timeframe: "Month 10–12",
    title: "CI/CD + Monitoring + Portfolio Polish",
    detail:
      "Pick a CI/CD platform: Jenkins, GitHub Actions, GitLab CI, or Azure DevOps. Build a real pipeline: build → test → security scan → deploy → smoke test. Monitoring + observability: Prometheus + Grafana basics, structured logging, alerting. Polish GitHub portfolio + technical blog. End-of-phase milestone: first offer in hand.",
  },
];

const tracks = [
  {
    name: "AWS Cloud Engineer / Solutions Architect",
    summary:
      "AWS is the Pune cloud hiring volume leader (~55% of cloud listings). Strong at services majors + product cos building cloud-native applications.",
    coreSkills: [
      "AWS core: EC2, S3, VPC, RDS, IAM, Lambda, CloudWatch",
      "AWS Solutions Architect Associate certification (table stakes)",
      "Terraform or AWS CloudFormation for IaC",
      "Basic Kubernetes on EKS + Docker",
      "Linux + bash + at least one scripting language (Python)",
    ],
    huntFor: "All Pune services majors + Persistent product + Druva + BFSI tech teams + Pune SaaS startups",
    salaryBand: "₹4–7 LPA fresher → ₹12–20 LPA at 3–5 yrs",
    coursePath: "/courses/cloud-certifications/aws-solutions-architect-training-in-pune",
    courseName: "AWS Solutions Architect Training in Pune",
  },
  {
    name: "Azure Cloud Engineer",
    summary:
      "Azure is the BFSI / Insurance / Healthcare default in Pune. Strong at Microsoft-partner shops and enterprise contexts with existing .NET investment.",
    coreSkills: [
      "Azure core: VMs, Blob Storage, VNet, SQL Database, Azure AD, Functions",
      "Azure Administrator (AZ-104) cert + AZ-204 for development-leaning roles",
      "Azure DevOps + ARM/Bicep templates or Terraform",
      "Active Directory + identity-management depth",
      "PowerShell + bash + basic .NET familiarity (helpful for BFSI shops)",
    ],
    huntFor: "Cognizant Azure practice, Mphasis, BNP Paribas IT, Allianz tech, Atos Syntel, Saksoft",
    salaryBand: "₹4–7 LPA fresher → ₹12–20 LPA at 3–5 yrs",
    coursePath: "/courses/cloud-certifications/azure-administrator-training-in-pune",
    courseName: "Azure Administrator Training in Pune",
  },
  {
    name: "DevOps Engineer",
    summary:
      "Cross-cloud + CI/CD + Kubernetes + IaC focused. The most-versatile cloud-adjacent role; strong at product companies + modern services engagements.",
    coreSkills: [
      "Linux + bash + Python scripting at production-grade quality",
      "Docker + Kubernetes (often EKS / AKS / GKE managed)",
      "CI/CD: Jenkins, GitHub Actions, GitLab CI — pick one, learn another later",
      "Terraform + Ansible for infrastructure + configuration management",
      "Monitoring: Prometheus + Grafana + ELK / Loki",
    ],
    huntFor: "Pune product companies (Druva, Helpshift, BrowserStack), Cybage, Persistent product, BFSI tech teams modernising legacy",
    salaryBand: "₹5–8 LPA fresher → ₹14–22 LPA at 3–5 yrs",
    coursePath: "/courses/cloud-devops/devops-training-in-pune",
    courseName: "DevOps Training in Pune",
  },
  {
    name: "Site Reliability Engineer (SRE)",
    summary:
      "Senior-tier specialisation focused on production reliability, incident response, SLO/SLI design, error budgets, observability. Higher software-engineering bar than pure DevOps.",
    coreSkills: [
      "Strong DevOps foundation (above) +",
      "Production system design + scaling patterns",
      "Distributed tracing (Jaeger / Honeycomb / OpenTelemetry)",
      "Chaos engineering basics + incident management",
      "Programming depth in Go or Python (real software engineering, not just scripting)",
    ],
    huntFor: "Pune product companies with mature engineering orgs: BrowserStack, Druva, Persistent product, Helpshift, growing AI startups",
    salaryBand: "Typically 3+ yrs entry; ₹14-24 LPA → ₹30-50+ LPA at staff/principal",
    coursePath: "/courses/cloud-devops/kubernetes-training-in-pune",
    courseName: "Kubernetes Training in Pune",
  },
];

const mistakes = [
  {
    title: "Skipping Linux fundamentals",
    detail:
      "The most common Cloud / DevOps learner mistake. Jumping into AWS Console UI tutorials without solid Linux command-line fluency creates a fundamentals gap that fails interview rounds. 4-6 weeks of focused Linux practice before touching cloud platforms pays back for years.",
  },
  {
    title: "Cert-only learning without hands-on projects",
    detail:
      "AWS SAA + AZ-104 are great signals but recruiters explicitly probe whether you've actually built things. Multiple certs without 2-3 deployed projects on GitHub underperforms vs 1 cert + 3 projects. Build first, certify second.",
  },
  {
    title: "No infrastructure-as-code discipline",
    detail:
      "Click-ops (provisioning everything via Console UI) is fine for learning but invisible in interviews. Terraform or CloudFormation / Bicep code on GitHub is the differentiator that signals production-engineering thinking. Even one Terraform-provisioned project beats five Console-only deployments.",
  },
  {
    title: "Underrating networking depth",
    detail:
      "VPC + subnets + routing + security groups + NACLs + VPN + Transit Gateway concepts are heavily screened at Pune cloud interviews. Most learners gloss over networking; deep depth here is the senior-fresher signal that bumps offers ₹1-3 LPA above standard band.",
  },
  {
    title: "Skipping scripting in favour of Console clicking",
    detail:
      "Real DevOps work is 60% scripting (Bash + Python). If your portfolio doesn't have substantial scripting alongside cloud projects, you're signalling 'I followed tutorials' rather than 'I solve problems'. Spend 2-3 weeks specifically on Python automation projects.",
  },
  {
    title: "Tutorial purgatory on YouTube",
    detail:
      "Free Cloud / DevOps content is abundant + excellent but trains tutorial-followers, not problem-solvers. Every learning block must end with you applying it to your own infrastructure project. By month 9 you should have 5+ projects on GitHub.",
  },
];

export default function CloudDevOpsCareerPath() {
  return (
    <>
      <PageEvent
        event="career_path_viewed"
        properties={{ slug: "cloud-devops-engineer" }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Career Paths", url: "/career-paths" },
          { name: "Cloud / DevOps Engineer", url: "/career-paths/cloud-devops-engineer" },
        ]}
      />
      <FAQJsonLd faqs={faqs} />

      <article aria-labelledby="pillar-title">
        <header className="gradient-hero text-white py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <Breadcrumbs
              variant="light"
              items={[
                { name: "Career Paths", href: "/career-paths" },
                { name: "Cloud / DevOps Engineer" },
              ]}
            />
            <p className="uppercase text-xs tracking-wider opacity-80 mb-3 mt-2">
              Career Path · Pune · 2026
            </p>
            <h1
              id="pillar-title"
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 max-w-4xl"
            >
              How to Become a Cloud / DevOps Engineer in Pune — 2026 Roadmap
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl">
              Pune cloud + DevOps listings run 800-1,200/month across AWS,
              Azure, Kubernetes, and SRE tracks. The full roadmap from Linux
              fundamentals to a deployed multi-cloud portfolio + first Pune
              offer — including which platform to pick, certifications,
              salary trajectory, and mistakes to avoid.
            </p>
            <div className="mt-4">
              <LastUpdated
                iso={EVERGREEN_LAST_REVIEWED}
                className="text-xs md:text-sm text-white/70"
              />
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-12 md:py-16 space-y-14 max-w-4xl">
          {/* TL;DR */}
          <DefinitiveAnswer eyebrow="The short version">
            Becoming a Cloud / DevOps engineer in Pune in 2026 takes 10-14 months: 3 months Linux + networking + bash, 3 months one cloud platform (AWS recommended) + Solutions Architect cert, 3 months Docker + Kubernetes + Terraform, 2-3 months CI/CD + monitoring + portfolio. Pune fresher bands: ₹4-7 LPA (services) / ₹6-10 LPA (product + GCC). Mid-career (3-5 yrs): ₹12-20 LPA / ₹18-30 LPA. AWS leads Pune hiring volume (~55% of cloud listings); Azure follows for BFSI verticals (~30%); GCP for data + AI tracks (~15%). Sources: Naukri + LinkedIn + AmbitionBox Pune cloud + DevOps listings, last 90 days.
          </DefinitiveAnswer>

          {/* Why Cloud / DevOps */}
          <section aria-labelledby="why-cloud">
            <h2
              id="why-cloud"
              className="text-2xl md:text-3xl font-bold flex items-center gap-3 mb-4"
            >
              <Cloud className="h-7 w-7 text-secondary" />
              Why Cloud / DevOps in Pune in 2026
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Pune cloud + DevOps listings ran 800-1,200 per month
                consistently through 2025. The hiring is structurally
                distributed across services majors (Persistent, Capgemini,
                Cognizant, Mindtree, TCS, Infosys, Wipro — all running large
                cloud + modernisation engagements), product companies
                (Druva, Helpshift, BrowserStack, Persistent product), BFSI
                Azure shops (BNP Paribas IT, Allianz tech, Cognizant Azure
                practice), and GCCs running cloud-native modernisation
                programmes.
              </p>
              <p>
                The career economics are favourable. Pune Cloud / DevOps
                fresher offers: ₹4-7 LPA at services, ₹6-10 LPA at product
                + GCC. 1-3 years experience: ₹6-12 LPA / ₹10-18 LPA. 3-6
                years: ₹12-20 LPA / ₹18-30 LPA. Senior SRE + Cloud Architect
                tracks at 6+ years: ₹20-35 LPA / ₹30-50+ LPA. The ladder is
                particularly steep at the senior end because experienced
                cloud + DevOps engineers are supply-constrained — Pune
                product companies actively poach from services majors at 3-5
                year experience.
              </p>
              <p>
                What changed in 2024-2026: Kubernetes shifted from
                &ldquo;senior specialisation&rdquo; to &ldquo;fresher
                expectation.&rdquo; Pune cloud + DevOps fresher postings
                reference Kubernetes in roughly 50% of listings (up from 30%
                in 2024). Same shift on Terraform — infrastructure-as-code
                fluency is now table stakes at fresher level, not a
                differentiator. The bar is rising, but so are salaries.
              </p>
            </div>
          </section>

          {/* 12-month plan */}
          <section aria-labelledby="twelve-month-plan">
            <h2
              id="twelve-month-plan"
              className="text-2xl md:text-3xl font-bold flex items-center gap-3 mb-4"
            >
              <CalendarRange className="h-7 w-7 text-secondary" />
              The 12-Month Plan
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Realistic for a focused career changer. Cloud / DevOps takes
              ~2 months longer than backend dev tracks because of the
              breadth requirement (Linux + cloud + containers + IaC + CI/CD
              + monitoring). Structured programmes compress this to 8-10
              months.
            </p>
            <ol className="space-y-4">
              {milestones.map((m, i) => (
                <li
                  key={i}
                  className="flex gap-4 rounded-lg border p-5 bg-card"
                >
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground text-sm font-semibold shrink-0">
                    {i + 1}
                  </span>
                  <div className="flex-grow">
                    <div className="flex flex-wrap items-baseline gap-3 mb-1">
                      <h3 className="font-semibold text-lg">{m.title}</h3>
                      <span className="text-sm text-secondary font-medium">
                        {m.timeframe}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {m.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="text-sm text-muted-foreground mt-6">
              Structured pathway:{" "}
              <Link
                href="/courses/cloud-devops/aws-training-in-pune"
                className="text-primary hover:underline font-medium"
              >
                AWS Training in Pune
              </Link>{" "}
              +{" "}
              <Link
                href="/courses/cloud-devops/devops-training-in-pune"
                className="text-primary hover:underline font-medium"
              >
                DevOps Training in Pune
              </Link>{" "}
              +{" "}
              <Link
                href="/courses/cloud-devops/kubernetes-training-in-pune"
                className="text-primary hover:underline font-medium"
              >
                Kubernetes Training in Pune
              </Link>{" "}
              cover the foundation → certification → orchestration arc with
              placement support.
            </p>
          </section>

          {/* Four Tracks */}
          <section aria-labelledby="four-tracks">
            <h2
              id="four-tracks"
              className="text-2xl md:text-3xl font-bold flex items-center gap-3 mb-4"
            >
              <GitBranch className="h-7 w-7 text-secondary" />
              Four Cloud / DevOps Career Tracks
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              The discipline branches into four hireable specialisations.
              Each shares the Linux + cloud foundation (Months 1-6) and then
              diverges. SRE is a 3+ year tier; the other three are
              fresher-hireable directly.
            </p>
            <div className="space-y-4">
              {tracks.map((t, i) => (
                <div
                  key={i}
                  className="rounded-lg border p-5 bg-card hover:border-secondary transition-colors"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-3 mb-2">
                    <h3 className="font-semibold text-lg">{t.name}</h3>
                    <span className="text-sm font-medium text-secondary">
                      {t.salaryBand}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                    {t.summary}
                  </p>
                  <p className="text-sm font-medium mb-2">Core skills:</p>
                  <ul className="space-y-1 mb-3">
                    {t.coreSkills.map((skill, j) => (
                      <li
                        key={j}
                        className="text-sm text-muted-foreground flex items-start gap-2"
                      >
                        <CheckCircle2 className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                        {skill}
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm text-muted-foreground mb-3">
                    <span className="font-medium text-foreground">
                      Pune hiring:
                    </span>{" "}
                    {t.huntFor}
                  </p>
                  <Link
                    href={t.coursePath}
                    className="inline-flex items-center gap-1 text-sm text-primary font-medium hover:underline"
                  >
                    {t.courseName}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              ))}
            </div>
          </section>

          {/* Salary Trajectory */}
          <section aria-labelledby="salary-trajectory">
            <h2
              id="salary-trajectory"
              className="text-2xl md:text-3xl font-bold flex items-center gap-3 mb-4"
            >
              <TrendingUp className="h-7 w-7 text-secondary" />
              Pune Cloud / DevOps Salary Trajectory
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Bands sourced from AmbitionBox + Indeed + LinkedIn + Naukri
              Pune cloud + DevOps listings (last 12 months). Table covers
              Cloud Engineer median band; DevOps + Azure tracks land within
              ±10% of this range; SRE is materially above (3+ yr entry).
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border rounded-lg overflow-hidden">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-3 font-semibold">Experience</th>
                    <th className="text-left p-3 font-semibold">
                      Pune Services Majors
                    </th>
                    <th className="text-left p-3 font-semibold">
                      Pune Product / GCC Cos
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="p-3">Fresher (0–1 yr)</td>
                    <td className="p-3 text-muted-foreground">₹4–7 LPA</td>
                    <td className="p-3 text-muted-foreground">₹6–10 LPA</td>
                  </tr>
                  <tr>
                    <td className="p-3">Junior (1–3 yrs)</td>
                    <td className="p-3 text-muted-foreground">₹6–12 LPA</td>
                    <td className="p-3 text-muted-foreground">₹10–18 LPA</td>
                  </tr>
                  <tr>
                    <td className="p-3">Mid (3–6 yrs)</td>
                    <td className="p-3 text-muted-foreground">₹12–20 LPA</td>
                    <td className="p-3 text-muted-foreground">₹18–30 LPA</td>
                  </tr>
                  <tr>
                    <td className="p-3">Senior (6+ yrs)</td>
                    <td className="p-3 text-muted-foreground">₹20–32 LPA</td>
                    <td className="p-3 text-muted-foreground">₹30–45 LPA</td>
                  </tr>
                  <tr>
                    <td className="p-3">Cloud Architect / Staff SRE</td>
                    <td className="p-3 text-muted-foreground">₹28–40 LPA</td>
                    <td className="p-3 text-muted-foreground">₹40–60+ LPA</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Interactive band exploration:{" "}
              <Link
                href="/tools/pune-it-salary-calculator"
                className="text-primary hover:underline font-medium"
              >
                Pune IT Salary Calculator
              </Link>
              .
            </p>
          </section>

          {/* Hiring Companies */}
          <section aria-labelledby="hiring-companies">
            <h2
              id="hiring-companies"
              className="text-2xl md:text-3xl font-bold flex items-center gap-3 mb-4"
            >
              <Building2 className="h-7 w-7 text-secondary" />
              Top Pune Companies Hiring Cloud / DevOps Talent
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Sampled from Naukri + LinkedIn + AmbitionBox Pune cloud +
              DevOps listings over the last 90 days. Pune has 200+ companies
              actively hiring across the 4 tracks.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-lg border p-4 bg-card">
                <h3 className="font-semibold mb-2">Services + Cloud practices</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>Persistent Systems · Capgemini</li>
                  <li>Cognizant · Mindtree (LTIMindtree)</li>
                  <li>Tech Mahindra · Wipro · Infosys · TCS</li>
                  <li>Accenture Cloud · IBM India Cloud</li>
                  <li>Atos · DXC · Coforge · Mphasis</li>
                  <li>Cybage Cloud · Saksoft · Amdocs</li>
                </ul>
              </div>
              <div className="rounded-lg border p-4 bg-card">
                <h3 className="font-semibold mb-2">Product + GCC + BFSI tech</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>Druva · Helpshift · BrowserStack</li>
                  <li>Persistent product teams</li>
                  <li>BNP Paribas IT (BFSI Azure)</li>
                  <li>Allianz Pune tech (BFSI)</li>
                  <li>BMC Software · BNY Mellon tech</li>
                  <li>Pune SaaS startups + AI infra startups</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Mistakes */}
          <section aria-labelledby="mistakes">
            <h2
              id="mistakes"
              className="text-2xl md:text-3xl font-bold flex items-center gap-3 mb-4"
            >
              <AlertTriangle className="h-7 w-7 text-secondary" />
              6 Mistakes That Stall Cloud / DevOps Careers in Pune
            </h2>
            <ol className="space-y-4">
              {mistakes.map((m, i) => (
                <li
                  key={i}
                  className="rounded-lg border-l-4 border-amber-500 bg-amber-50/30 dark:bg-amber-950/10 p-4"
                >
                  <h3 className="font-semibold mb-1 flex items-start gap-2">
                    <span className="text-amber-700 dark:text-amber-400">
                      {i + 1}.
                    </span>
                    {m.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {m.detail}
                  </p>
                </li>
              ))}
            </ol>
          </section>

          {/* Related Reading */}
          <section
            aria-labelledby="related-reading"
            className="rounded-lg border bg-muted/30 p-6"
          >
            <h2
              id="related-reading"
              className="text-xl md:text-2xl font-bold flex items-center gap-3 mb-4"
            >
              <BookOpen className="h-6 w-6 text-secondary" />
              Go Deeper — Related Reading
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <li>
                <Link
                  href="/guides/best-aws-projects-for-pune-resume-2026"
                  className="block rounded border p-3 bg-card hover:border-secondary transition-colors"
                >
                  <span className="font-medium block text-sm">
                    10 Best AWS Projects for Pune Resume
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Guide · portfolio projects foundation → AI integration
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/courses/cloud-devops/kubernetes-training-in-pune"
                  className="block rounded border p-3 bg-card hover:border-secondary transition-colors"
                >
                  <span className="font-medium block text-sm">
                    Kubernetes Training in Pune
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Course · Container orchestration depth
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/compare/sre-vs-devops-engineer-career-pune-2026"
                  className="block rounded border p-3 bg-card hover:border-secondary transition-colors"
                >
                  <span className="font-medium block text-sm">
                    SRE vs DevOps Engineer Career
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Comparison · fresher target + ladder path
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/pune-it-salary-calculator"
                  className="block rounded border p-3 bg-card hover:border-secondary transition-colors"
                >
                  <span className="font-medium block text-sm">
                    Pune IT Salary Calculator
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Tool · 13 roles × 4 experience tiers
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/compare/aws-vs-azure-for-pune-cloud-careers-2026"
                  className="block rounded border p-3 bg-card hover:border-secondary transition-colors"
                >
                  <span className="font-medium block text-sm">
                    AWS vs Azure for Pune Cloud Careers
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Comparison · Pune platform pick framework
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/career-paths/first-it-job-pune"
                  className="block rounded border p-3 bg-card hover:border-secondary transition-colors"
                >
                  <span className="font-medium block text-sm">
                    First IT Job in Pune (path-agnostic)
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Sibling pillar · search + interview playbook
                  </span>
                </Link>
              </li>
            </ul>
          </section>

          {/* FAQ */}
          <FaqSection
            heading="Frequently asked questions"
            intro="Common questions from prospective Cloud / DevOps engineers we've trained over the last 17 years."
            items={faqs}
          />
        </div>
      </article>

      {/* CTA */}
      <section className="py-12 bg-muted/30 border-t">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <Compass className="h-10 w-10 text-secondary mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to start your Cloud / DevOps career?
          </h2>
          <p className="text-muted-foreground mb-6">
            We&apos;ve trained 10,000+ engineers since 2009 — Cloud + DevOps
            is one of our fastest-growing placement tracks. Book a free demo
            and we&apos;ll map a personalised version of this roadmap to
            your background.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <TrackedLink
              href="/contact"
              className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-medium hover:bg-secondary/90 transition-colors"
              event="course_enquiry_clicked"
              properties={{
                location: "career_path_cta",
                career_path: "cloud-devops-engineer",
              }}
            >
              Book a Free Demo
            </TrackedLink>
            <Link
              href="/courses/cloud-devops"
              className="inline-flex items-center gap-2 border px-6 py-3 rounded-lg font-medium hover:bg-muted transition-colors"
            >
              See Cloud / DevOps courses
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
