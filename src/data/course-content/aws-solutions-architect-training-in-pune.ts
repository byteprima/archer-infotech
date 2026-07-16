import type { CourseRichContent } from "./types";

export const awsSolutionsArchitectTrainingInPune: CourseRichContent = {
  intro:
    "The AWS Solutions Architect Associate (SAA-C03) certification is the most widely-respected entry-level cloud architecture credential — Pune product engineering teams (Persistent Systems, BMC Software, Bajaj Finserv, Synechron, Mastercard Pune Tech Hub, BMW TechWorks) routinely list it as a hard requirement for senior Cloud Engineer / Solutions Architect roles. Archer Infotech's AWS Solutions Architect training in Pune is the focused exam-mastery track — distinct from our broader AWS course — designed for candidates who already have working AWS experience and want concentrated certification preparation. The track covers the four SAA-C03 exam domains in depth (Design Resilient Architectures, Design High-Performing Architectures, Design Secure Applications, Design Cost-Optimised Architectures), with two full-length timed mock exams, scenario-based question drills, plus the architecture-pattern fluency Pune Solutions Architect interviews test for. Classroom in Kothrud, online live, and weekend batches available.",

  whyLearn: {
    heading: "Why Get AWS Solutions Architect Associate Certified in 2026",
    paragraphs: [
      "The SAA-C03 certificate is the cleanest signal a Pune cloud-hiring panel reads — it tells them you understand AWS architecture broadly, can reason about resilience / performance / security / cost trade-offs, and have invested in your craft. Indeed Pune lists more than 800 active openings that explicitly list 'AWS Solutions Architect Associate' or 'SAA-C03' as required or preferred. The biggest employers asking for it are Persistent Systems, BMC Software, Bajaj Finserv, Synechron, Mastercard Pune Tech Hub, BMW TechWorks India, plus the IT services majors with cloud-architect practices (TCS, Infosys, Wipro, Cognizant, Capgemini).",
      "What changed in 2026: the SAA-C03 exam (current code, updated August 2022 with smaller refreshes since) emphasises real-world architecture scenarios over pure service knowledge — questions are mostly 'given this requirement, choose the right combination of services'. The 2024 minor refresh weighted serverless (Lambda + Step Functions + EventBridge), container (ECS Fargate + EKS), and observability (CloudWatch + X-Ray) questions more heavily. The exam remains 65 questions in 130 minutes, with a passing score around 720 / 1000. The voucher is USD ~150 (~₹13,000), exam delivered via Pearson VUE online or test centre.",
      "What this means for hiring: certified SAA-C03 candidates with hands-on portfolio see roughly 1.5–2× the interview-conversion rate of equivalent uncertified candidates on Pune Solutions Architect roles. Senior Solutions Architect roles in Pune typically expect SAA-C03 plus one specialty (Networking, Security, or Database) and at least one Professional-level credential within 2–3 years.",
    ],
    keyPoints: [
      "800+ active Pune openings list SAA-C03 as required or preferred (May 2026)",
      "Cleanest hiring signal Pune cloud panels read",
      "1.5–2× interview-conversion rate vs equivalent uncertified candidates",
      "65 questions, 130 minutes, ~720 / 1000 passing score",
      "Voucher: USD ~150 (~₹13,000), Pearson VUE online or centre",
    ],
  },

  whoIsThisFor: {
    forYou: [
      "Working AWS engineer (6+ months hands-on) wanting concentrated SAA-C03 preparation",
      "Cloud Engineer / DevOps Engineer targeting Solutions Architect career progression",
      "Software developer at a Pune product / SaaS company that requires SAA-C03 for senior roles",
      "Working professional preparing for a Pune Solutions Architect interview where SAA-C03 is on the JD",
      "Career restarter targeting cloud architecture as a credentialed re-entry path",
    ],
    notForYou: [
      "If you have NO hands-on AWS experience — take our broader AWS course first; this is exam-prep, not introductory",
      "If you are looking for end-to-end engineering training across deployment / IaC / observability — take our broader 3-month AWS course",
      "If you want a 7-day cram course — passing SAA-C03 reliably needs 2.5 months of structured prep, not crash-course",
      "If you cannot put in 8–10 hours per week of practice exams + reading — exam mastery requires repeated exposure",
      "If you already hold SAA-C03 — talk to us about the Solutions Architect Professional or specialty tracks",
    ],
  },

  curriculum: [
    {
      title: "Exam Strategy, Account Setup & Foundations Review",
      weekRange: "Week 1",
      description:
        "How the SAA-C03 exam actually scores you (the four domains and their weightings), the question-writing patterns AWS uses (best vs least-bad answers, scenario keywords that signal which service is expected), test-day logistics. Then a foundations review — IAM principals / policies / roles, AWS Organizations + SCPs, Control Tower for multi-account, plus the shared responsibility model. By the end of week 1 every student has done their first 50-question diagnostic exam to establish baseline.",
      topics: [
        "SAA-C03 exam structure and domain weighting",
        "Question patterns — best, least-bad, scenario keywords",
        "Test-day logistics — Pearson VUE",
        "IAM principals, policies, roles in depth",
        "AWS Organizations and SCPs",
        "AWS Control Tower",
        "First diagnostic exam",
      ],
    },
    {
      title: "Domain 1 — Design Resilient Architectures (~26%)",
      weekRange: "Weeks 2–3",
      description:
        "Resilience is the largest exam domain. Cover Multi-AZ vs Multi-Region patterns, Auto Scaling with target tracking and step scaling, Application Load Balancer + Network Load Balancer use cases, Route 53 routing policies (simple, weighted, latency, failover, geolocation, multi-value), RDS Multi-AZ vs read replicas vs Aurora Global, S3 replication (CRR, SRR, RTC), DynamoDB Global Tables, plus the disaster-recovery patterns (backup-restore, pilot light, warm standby, multi-site active-active). Domain-specific question drills throughout.",
      topics: [
        "Multi-AZ vs Multi-Region",
        "Auto Scaling — target tracking, step, scheduled",
        "ALB vs NLB vs Gateway Load Balancer",
        "Route 53 routing policies",
        "RDS Multi-AZ vs read replicas",
        "Aurora Global Database",
        "S3 replication — CRR, SRR, RTC",
        "DynamoDB Global Tables",
        "Disaster recovery patterns",
      ],
    },
    {
      title: "Domain 2 — Design High-Performing Architectures (~24%)",
      weekRange: "Weeks 3–4",
      description:
        "Performance domain. Cover compute selection (EC2 instance families and when each fits, Lambda performance tuning, ECS / EKS / Fargate trade-offs), storage selection (EBS volume types — gp3 / io2 / st1 / sc1, S3 storage classes and Intelligent-Tiering, EFS performance modes, FSx options), database performance (RDS instance scaling vs read replicas vs caching, DynamoDB capacity modes and DAX, ElastiCache Redis vs Memcached), plus content delivery and caching (CloudFront, Global Accelerator, ElastiCache). Domain-specific question drills throughout.",
      topics: [
        "EC2 instance families and selection",
        "Lambda performance tuning",
        "ECS / EKS / Fargate trade-offs",
        "EBS volume types",
        "S3 storage classes and Intelligent-Tiering",
        "RDS performance and read replicas",
        "DynamoDB capacity, DAX",
        "ElastiCache Redis vs Memcached",
        "CloudFront and Global Accelerator",
      ],
    },
    {
      title: "Domain 3 — Design Secure Applications (~30%)",
      weekRange: "Weeks 5–6",
      description:
        "The largest exam domain. IAM in depth — policy evaluation logic, permission boundaries, conditions, IAM Access Analyzer. Network security — Security Groups, NACLs, VPC endpoints (Gateway and Interface), PrivateLink, Direct Connect, VPN. Data security — KMS (CMKs, key rotation, envelope encryption), Secrets Manager vs Parameter Store, ACM, S3 encryption options, RDS encryption. Plus AWS WAF, Shield Standard / Advanced, GuardDuty, Macie, Inspector, Security Hub, plus the compliance baselines (PCI DSS, HIPAA, SOC 2). Domain-specific question drills throughout.",
      topics: [
        "IAM policy evaluation, permission boundaries, conditions",
        "Security Groups and NACLs in depth",
        "VPC endpoints — Gateway and Interface",
        "PrivateLink, Direct Connect, VPN",
        "KMS — CMKs, rotation, envelope encryption",
        "Secrets Manager vs Parameter Store",
        "ACM and TLS termination",
        "WAF, Shield Standard / Advanced",
        "GuardDuty, Macie, Inspector, Security Hub",
        "Compliance baselines",
      ],
    },
    {
      title: "Domain 4 — Design Cost-Optimised Architectures (~20%)",
      weekRange: "Week 7",
      description:
        "Cost optimisation. Compute pricing (on-demand, spot, savings plans, reserved instances), storage tiering (S3 Intelligent-Tiering, lifecycle rules, Glacier classes), data-transfer costs (the often-forgotten exam topic), plus cost-optimisation tooling (Cost Explorer, Trusted Advisor, AWS Budgets, Cost Anomaly Detection). Domain-specific question drills throughout. Plus the discipline of reading exam questions for cost-optimisation keywords ('most cost-effective', 'minimise cost').",
      topics: [
        "EC2 pricing — on-demand, spot, savings, reserved",
        "Spot strategies — Fleet, mixed instances",
        "S3 Intelligent-Tiering and lifecycle",
        "Glacier classes — Instant, Flexible, Deep Archive",
        "Data-transfer cost optimisation",
        "Cost Explorer and Cost Anomaly Detection",
        "AWS Budgets and Trusted Advisor",
      ],
    },
    {
      title: "Mock Exam 1, Architecture Walkthroughs & Gap Closure",
      weekRange: "Week 8",
      description:
        "First full-length timed mock exam (65 questions, 130 minutes) under real exam conditions — including the Pearson VUE-style interface. Detailed answer review for every question, focusing on why the wrong options are wrong (the SAA-C03 grading model rewards understanding-of-trade-offs more than memorisation). Plus 5 architecture walkthroughs of common scenarios — three-tier web app, serverless event-driven app, BFSI compliance-aware setup, multi-region active-active, hybrid cloud — at whiteboard depth.",
      topics: [
        "Mock exam 1 — full 65 questions, 130 minutes timed",
        "Detailed answer review",
        "Architecture walkthroughs — 5 common scenarios",
        "Whiteboard scenario practice",
        "Gap-closure plan based on mock exam scores",
      ],
    },
    {
      title: "Mock Exam 2, Booking & Test-Day Prep",
      weekRange: "Week 9 + 1 week buffer",
      description:
        "Second full-length mock exam under real exam conditions — students who score 75–85% on this mock typically pass the real exam first attempt. Final gap-closure on weak domains, exam-booking guidance (Pearson VUE registration, ID requirements, online vs centre considerations), test-day mental-prep, plus a 30-minute strategy session on time management during the exam. Includes 'what to do if you don't pass on first attempt' coaching.",
      topics: [
        "Mock exam 2 — full 65 questions, 130 minutes timed",
        "Final gap-closure",
        "Pearson VUE booking — online vs test centre",
        "Test-day logistics and ID requirements",
        "Time-management strategy during the exam",
        "Retake strategy if first attempt fails",
      ],
    },
    {
      title: "AI-Assisted Development Workflow",
      weekRange: "Final Week",
      highlight: true,
      description:
        "The skill every 2026 hiring panel now probes for — building real work with AI in the loop, responsibly. Learn to drive AI assistants (GitHub Copilot, Claude, Cursor, and IDE-native AI) to scaffold and accelerate the tools and stack this course covers, generate tests, explain and refactor unfamiliar code, and cut the boilerplate — while keeping you firmly in control of every decision. Heavy focus on guardrails: reviewing each AI suggestion, spotting hallucinated APIs or wrong answers, and handling licensing and data-privacy concerns. Close with a mini-project that takes a deliverable end-to-end using an AI-assisted workflow, then fold the same tooling into version control and everyday team practice.",
      topics: [
        "AI assistants — GitHub Copilot, Claude, Cursor, IDE-native AI",
        "Effective prompting for this course's stack — scaffolding, boilerplate, config",
        "AI-assisted test generation and coverage",
        "Explaining, refactoring, and modernising unfamiliar code with AI",
        "AI-driven review, error detection, and quality checks",
        "Generating and maintaining documentation with AI",
        "AI debugging — interpreting errors, logs, and failing output",
        "Guardrails — reviewing output, avoiding hallucinations, licensing & data privacy",
        "Team workflow — AI in the editor, in reviews, and in delivery pipelines",
        "Mini-project — a deliverable built end-to-end with an AI-assisted workflow",
      ],
    },
  ],

  projects: [
    {
      title: "SAA-C03 Architecture Reference Repo",
      description:
        "A reference repository documenting 10 common SAA-C03 architecture patterns — three-tier web app, serverless event-driven, hybrid cloud (DX + VPN), BFSI compliance-aware (PCI DSS / RBI guidelines), multi-region active-active, multi-region active-passive, ML inference at scale, IoT data ingestion, real-time analytics, plus a static website with CDN. Each pattern includes an architecture diagram (drawn in draw.io / Excalidraw), a one-page description, and Terraform that stands it up where applicable. Demonstrates the architectural fluency that opens senior Pune Solutions Architect interviews.",
      technologies: [
        "Architecture diagrams via draw.io / Excalidraw",
        "Terraform reference modules",
        "AWS CLI scripts",
        "GitHub repository with README",
      ],
    },
    {
      title: "Cost-Optimisation Audit of a Sample Workload",
      description:
        "A written cost-optimisation audit of a hypothetical 50-server / 10TB-storage / 5-database workload. Students identify spot-instance opportunities, S3 storage-class transitions, RI / Savings Plans recommendations, data-transfer reductions, and the resulting saved cost (typically 30–50% of the original bill). Demonstrates the FinOps thinking that Pune Solutions Architect panels test for.",
      technologies: [
        "AWS Pricing Calculator",
        "Cost Explorer analysis",
        "Spot Fleet design",
        "Reserved Instance / Savings Plans modelling",
      ],
    },
  ],

  trainersIntro:
    "Your batch is led by Yogesh Patil (Founder & Director, 15+ years, hands-on AWS / Azure architect with multiple cloud certifications) and Vinod Patil (Solutions Architect & AI Trainer, 12 years). Both have personally cleared the SAA-C03 exam and lead every batch.",

  careerOutcomes: {
    paragraphs: [
      "Certified SAA-C03 candidates with hands-on portfolio see roughly 1.5–2× the interview-conversion rate vs equivalent uncertified candidates on Pune Solutions Architect roles. Indeed Pune lists 800+ active openings that list SAA-C03 as required or preferred, with continuous hiring at Persistent Systems, BMC Software, Bajaj Finserv, Synechron, Mastercard Pune Tech Hub, BMW TechWorks India, plus the IT services majors with cloud-architect practices.",
      "What pulls a certified Solutions Architect above the median band: the certificate alone gets you to interviews; the offer comes from depth on at least one architecture pattern (multi-region, serverless event-driven, or BFSI compliance), one IaC fluency (Terraform), and demonstrable hands-on AWS experience (the SAA-C03 + zero-portfolio combination is widely seen as a red flag in Pune product engineering hiring).",
      "Senior Solutions Architect bands at the top end are reported as national figures (Pune-specific Indeed pages do not exist for these specific titles); Pune trends within ±10% of these figures based on AmbitionBox and 6figr.",
    ],
    salaryBands: [
      {
        role: "AWS Cloud Engineer with SAA-C03 (Pune)",
        band: "₹8,00,000 – ₹12,00,000 per year",
        source: {
          label: "Indeed Pune (AWS Solutions Architect)",
          url: "https://in.indeed.com/career/aws-solutions-architect/salaries/Pune--Maharashtra",
        },
      },
      {
        role: "Mid-level Solutions Architect (Pune, 3–6 years)",
        band: "₹14,00,000 – ₹22,00,000 per year",
        source: {
          label: "Glassdoor Pune AWS Solutions Architect",
          url: "https://www.glassdoor.co.in/Salaries/pune-aws-solutions-architect-salary-SRCH_IL.0,4_IM1072_KO5,28.htm",
        },
      },
      {
        role: "Senior Solutions Architect (Pune, 6–9 years)",
        band: "₹20,00,000 – ₹35,00,000 per year",
        source: {
          label: "Glassdoor Pune Senior SA",
          url: "https://www.glassdoor.co.in/Salaries/pune-senior-solutions-architect-salary-SRCH_IL.0,4_IM1072_KO5,31.htm",
        },
      },
      {
        role: "Principal / Lead Solutions Architect (national, 9+ years)",
        band: "₹35,00,000 – ₹65,00,000 per year",
        source: {
          label: "6figr India Lead SA (Pune ±10%)",
          url: "https://6figr.com/in/salary/lead-solutions-architect--t",
        },
      },
    ],
    hiringCompanies: [
      "Persistent Systems",
      "BMC Software",
      "Bajaj Finserv",
      "Synechron",
      "Mastercard Pune Tech Hub",
      "BMW TechWorks India",
      "Mercedes-Benz R&D India",
      "TCS",
      "Infosys",
      "Wipro",
      "Cognizant",
      "Capgemini",
    ],
    rolesAfterCourse: [
      "AWS Solutions Architect — Associate",
      "Senior Cloud Engineer (cert-required)",
      "Cloud Solutions Engineer",
      "Pre-sales Solutions Architect (with sales aptitude)",
      "DevOps Architect (with K8s experience)",
    ],
  },

  modesAndDuration: {
    duration:
      "9 weeks of structured exam preparation plus 1 week buffer for booking and final review (~2.5 months total)",
    classroom: {
      location: "Archer Infotech, Kothrud, Pune",
      timing: [
        "Morning batch — 10:00 to 13:00",
        "Evening batch — 18:00 to 21:00",
      ],
    },
    online: {
      timing: [
        "Same hours as classroom batches",
        "Recordings available for review",
      ],
      tools: [
        "Zoom for live sessions",
        "Personal AWS sandbox per student",
        "Mock exam platform (provided)",
        "Slack / WhatsApp for async Q&A",
      ],
    },
    weekend: {
      timing: ["Saturday + Sunday, 09:00 to 13:00"],
      durationNote: "Stretches over ~4 months instead of 2.5.",
    },
    batchPolicy:
      "Maximum 15 students per batch. Classroom batches start every 4 weeks; weekend batches every 6 weeks.",
  },

  fees: {
    note:
      "Course fees range from ₹20,000 to ₹90,000 depending on mode and concession. The SAA-C03 exam voucher (USD ~150 / ~₹13,000) is paid directly to AWS / Pearson VUE by the student.",
    range: "₹20,000 – ₹90,000",
    paymentOptions: [
      "Single payment with early-bird discount",
      "EMI in 2 instalments at no extra cost",
      "Corporate sponsorship — invoiced to your employer with GST",
    ],
  },

  placementSupport: {
    paragraphs: [
      "Placement support starts after exam-pass (~week 10). Most candidates targeting this cert already have an AWS-track job or are mid-track at one; the cert is the unblock for senior roles. Our support is unconditional, time-bound (six months after course completion), and includes free re-entry to a future batch's interview-prep sessions if your first round of post-cert interviews does not land.",
    ],
    process: [
      "After exam-pass — resume + LinkedIn rewrite emphasising the new credential",
      "GitHub portfolio cleanup",
      "Two rounds of mock Solutions Architect interviews",
      "HR mock interview and salary negotiation coaching",
      "Post-course — referrals via our 17-year alumni network at 12+ partner companies",
      "Up to 6 months of continued support after course end",
      "Free re-entry to future batch interview-prep sessions if first round does not land",
    ],
    partnerCompanies: [
      "Persistent Systems",
      "BMC Software",
      "Bajaj Finserv",
      "Synechron",
      "Mastercard Pune Tech Hub",
      "BMW TechWorks India",
      "TCS",
      "Infosys",
      "Cognizant",
      "Capgemini",
    ],
  },

  comparison: {
    intro:
      "We compare ourselves against typical Pune SAA-C03 prep institutes on factual rows only — no logos, no opinions.",
    rows: [
      {
        feature: "Trainers named on course page with photos and LinkedIn",
        archer: "Yes — Yogesh Patil and Vinod Patil",
        typical: "No — generic 'expert trainers' branding",
      },
      {
        feature: "Exam version targeted",
        archer: "SAA-C03 (current as of 2026)",
        typical: "Often outdated (SAA-C02) materials",
      },
      {
        feature: "Full-length timed mock exams",
        archer: "Two — under real Pearson-VUE-style conditions",
        typical: "Question banks but no full-length timed practice",
      },
      {
        feature: "Domain-by-domain coverage",
        archer: "Aligned to the four official domains with weightings",
        typical: "Topic-by-topic, no exam-domain mapping",
      },
      {
        feature: "Hands-on labs alongside exam prep",
        archer: "Yes — personal AWS sandbox, Terraform reference repos",
        typical: "Slides only",
      },
      {
        feature: "Architecture walkthroughs",
        archer: "5 common scenarios at whiteboard depth",
        typical: "Not covered",
      },
      {
        feature: "Public GitHub portfolio output",
        archer: "Yes — architecture-pattern reference repo + cost-audit document",
        typical: "Rare",
      },
      {
        feature: "Test-day prep coaching",
        archer: "Pearson VUE walkthrough + time-management strategy",
        typical: "Not covered",
      },
      {
        feature: "Pass-rate transparency",
        archer: "Most students who score 75–85% on mock 2 pass first attempt",
        typical: "No data shared",
      },
      {
        feature: "Placement support duration after course",
        archer: "6 months, with free re-entry to interview prep",
        typical: "1–3 months or vaguely 'until placed'",
      },
    ],
    closing:
      "Compare with whoever you are considering. The right test is whether the institute will run a real timed mock for you before you pay.",
  },

  versusAlternative: {
    heading: "SAA-C03 Standalone or Bundled With Our Broader AWS Course?",
    paragraphs: [
      "If you have NO hands-on AWS experience, take our broader AWS course (3 months) first — it includes SAA-C03 prep concentrated in the last 2 weeks and is the right path for cloud-engineering breadth. If you have 6+ months of working AWS experience and need concentrated certification preparation, this focused 2.5-month track is right — it skips the broad engineering teaching and concentrates on exam mastery + architecture patterns.",
      "Honest recommendation: take our broader AWS course first if you are new to cloud. Take this exam-focused track if you already have AWS hands-on experience and want the SAA-C03 unblock. Combined enrolment (broader AWS + SAA-C03 prep) is available with bundled discount — talk to us if you want both.",
    ],
  },

  prerequisitesAndStart: {
    paragraphs: [
      "Prerequisites: at least 6 months of hands-on AWS experience (created VPCs, deployed EC2 / Lambda / ECS, configured IAM, used the AWS Console / CLI), basic Linux, basic Python or Bash. We do NOT teach AWS from scratch in this course — that is our broader 3-month AWS course. If you have no AWS experience, take that course first.",
    ],
    suggestedSteps: [
      "Decide your mode — classroom, online live, or weekend",
      "Check the upcoming batch dates",
      "Book a free 30-minute counselling call — we will honestly tell you whether you are exam-ready or whether you should take the broader AWS course first",
      "Confirm enrolment and complete pre-course orientation (sandbox setup, mock exam platform access)",
      "Show up to day one ready to take a 50-question diagnostic",
    ],
  },

  faqs: [
    {
      question: "How long does SAA-C03 preparation take at Archer Infotech?",
      answer:
        "Approximately 2.5 months — 9 weeks of structured exam preparation plus 1 week buffer for booking and final review. The weekend batch stretches over ~4 months at the same content depth.",
    },
    {
      question: "What is the SAA-C03 exam fee?",
      answer:
        "The SAA-C03 exam voucher is USD ~150 (~₹13,000), paid directly to AWS via Pearson VUE. Our course fee is separate and ranges ₹20,000 – ₹90,000.",
    },
    {
      question: "Do I need to take your broader AWS course first?",
      answer:
        "Yes if you have no hands-on AWS experience. If you have 6+ months of working AWS, this focused track is right. We honestly assess your level in the counselling call.",
    },
    {
      question: "What is the pass rate?",
      answer:
        "Most students who score 75–85% on the second mock exam pass the real SAA-C03 first attempt. Mock-exam scores are the best leading indicator; we will tell you honestly when you are exam-ready.",
    },
    {
      question: "What if I fail the first attempt?",
      answer:
        "Free re-entry to our interview-prep sessions for 6 months. We help you analyse the score report, identify weak domains, and plan a focused 4-week prep before retaking. AWS allows retakes after 14 days.",
    },
    {
      question: "Will I work on real projects?",
      answer:
        "Yes — two capstone artefacts: (1) architecture-pattern reference repository covering 10 common SAA-C03 scenarios, (2) cost-optimisation audit of a sample workload. Both become public GitHub repositories.",
    },
    {
      question: "Are weekend SAA-C03 classes available in Pune?",
      answer:
        "Yes — Saturday and Sunday, 09:00–13:00, stretched over ~4 months instead of 2.5.",
    },
    {
      question: "What support do I get after the exam?",
      answer:
        "Six months of active placement support after course completion — mock Solutions Architect interviews, referrals via our alumni network, resume / LinkedIn / GitHub rewrites highlighting the new credential, and salary negotiation coaching.",
    },
    {
      question: "Are the named trainers actually teaching, or are they just on the brochure?",
      answer:
        "Yogesh Patil and Vinod Patil personally lead every session of every batch, both have cleared SAA-C03.",
    },
  ],

  finalCta: {
    heading: "Ready to start AWS Solutions Architect (SAA-C03) preparation in Pune?",
    paragraph:
      "We have classroom, online, and weekend batches starting every 4–6 weeks. Reach out via the enquiry form or call us — Yogesh and Vinod are happy to assess your readiness and tell you whether to start with the broader AWS course or jump into this exam-focused track.",
  },
};
