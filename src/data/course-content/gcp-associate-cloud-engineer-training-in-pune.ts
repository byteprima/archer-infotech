import type { CourseRichContent } from "./types";

export const gcpAssociateCloudEngineerTrainingInPune: CourseRichContent = {
  intro:
    "The Google Cloud Associate Cloud Engineer (ACE) certification is the entry-level GCP credential and the right starting cert for anyone targeting Pune analytics-engineering roles where GCP dominates (Tiger Analytics, Fractal Analytics, ZS Associates, MathCo, Persistent Data Engineering, Mastercard Pune Tech Hub, BMW TechWorks autonomous-driving teams). Archer Infotech's GCP Associate Cloud Engineer training in Pune is the focused exam-mastery track — distinct from our broader Google Cloud course — designed for candidates who already have working GCP experience and want concentrated certification preparation. The track covers the five exam domains in depth (Setting up cloud projects + accounts, Planning and configuring cloud solutions, Deploying and implementing solutions, Ensuring successful operation, Configuring access and security) with two full-length timed mock exams and the gcloud CLI fluency Pune GCP interviews test for. Classroom in Kothrud, online live, and weekend batches available.",

  whyLearn: {
    heading: "Why Get GCP Associate Cloud Engineer Certified in 2026",
    paragraphs: [
      "GCP ACE is the most widely-recognised entry-level GCP credential. Indeed Pune lists more than 250 active openings that explicitly list 'Google Cloud Associate Cloud Engineer' or 'ACE' as required or preferred — smaller than AWS / Azure equivalents but heavily concentrated in the Pune analytics-engineering segment where GCP dominates. The biggest employers asking for it are Tiger Analytics, Fractal Analytics, ZS Associates, MathCo, Persistent Data Engineering, Mastercard Pune Tech Hub, plus BMW TechWorks autonomous-driving data teams.",
      "What changed in 2026: the GCP ACE exam (current version, refreshed 2024) emphasises gcloud CLI fluency, IAM hierarchy understanding, and operational scenarios. The exam is 2 hours, multiple-choice and multi-select, passing score not publicly disclosed (Google uses item response theory). Voucher: USD ~125 (~₹10,500), Kryterion delivered (online or test centre). Annual recertification: every 3 years.",
      "What this means for hiring: certified ACE candidates with hands-on portfolio see roughly 1.5–2× the interview-conversion rate vs equivalent uncertified candidates on Pune GCP analytics-engineering roles. Senior GCP Architect roles in Pune typically expect ACE plus Professional Cloud Architect within 2–3 years.",
    ],
    keyPoints: [
      "250+ active Pune openings list ACE as required or preferred (May 2026)",
      "Concentrated in Pune analytics-engineering segment where GCP dominates",
      "1.5–2× interview-conversion rate vs equivalent uncertified candidates",
      "2 hours, multiple-choice + multi-select, Kryterion delivered",
      "Voucher: USD ~125 (~₹10,500)",
    ],
  },

  whoIsThisFor: {
    forYou: [
      "Working GCP engineer (6+ months hands-on) wanting concentrated ACE preparation",
      "Cloud Engineer at a Pune analytics company that requires ACE for senior roles",
      "AWS / Azure engineer wanting to add a GCP credential for multi-cloud breadth",
      "Working analytics engineer or data engineer at a GCP-heavy Pune team",
      "Career restarter targeting Pune analytics-engineering with credentialed entry",
    ],
    notForYou: [
      "If you have NO hands-on GCP experience — take our broader Google Cloud course first",
      "If you are looking for end-to-end engineering training — take our broader 2.5-month GCP course",
      "If you want a 7-day cram course — passing ACE reliably needs 2 months of structured prep",
      "If you cannot put in 8–10 hours per week of practice exams + reading",
      "If you already hold ACE — talk to us about Professional Cloud Architect or Data Engineer tracks",
    ],
  },

  curriculum: [
    {
      title: "Exam Strategy, Project Setup & Foundations Review",
      weekRange: "Week 1",
      description:
        "How the GCP ACE exam scores you (Google's item-response-theory model), the question patterns Google uses (scenario-based multiple-choice and multi-select), test-day logistics for Kryterion. Foundations review — Organisation / Folder / Project hierarchy, IAM principals, the gcloud CLI essentials. By the end of week 1 every student has done a 50-question diagnostic.",
      topics: [
        "ACE exam structure and Google's grading model",
        "Question patterns — scenario-based MCQ / multi-select",
        "Test-day logistics — Kryterion (online vs centre)",
        "Organisation / Folder / Project hierarchy",
        "IAM principals and roles",
        "gcloud CLI essentials",
        "First diagnostic exam",
      ],
    },
    {
      title: "Domain 1 — Setting Up Cloud Projects & Accounts (~17%)",
      weekRange: "Week 2",
      description:
        "Project setup at depth. Cover the resource hierarchy, billing setup (linked billing accounts, budget alerts), the gcloud CLI configuration, plus the patterns Google asks about — multi-project organisation, Shared VPC for centralised networking, organisation policies for governance.",
      topics: [
        "Resource hierarchy — Organisation / Folder / Project",
        "Billing setup and budget alerts",
        "gcloud CLI configuration",
        "Multi-project organisation",
        "Shared VPC",
        "Organisation policies",
      ],
    },
    {
      title: "Domain 2 — Planning & Configuring Cloud Solutions (~17%)",
      weekRange: "Week 3",
      description:
        "Resource planning. Compute selection — Compute Engine (custom machine types, preemptible / spot), GKE Autopilot vs Standard, Cloud Run, Cloud Functions, App Engine. Data services — Cloud SQL vs Spanner vs Firestore vs BigQuery vs Bigtable (when each fits). Network planning — VPC design, custom vs auto subnets, regional considerations. Plus cost estimation via Pricing Calculator.",
      topics: [
        "Compute selection — GCE, GKE, Cloud Run, Functions, App Engine",
        "Data service selection — SQL, Spanner, Firestore, BigQuery, Bigtable",
        "VPC design and subnet planning",
        "Network costs and egress",
        "Pricing Calculator",
      ],
    },
    {
      title: "Domain 3 — Deploying & Implementing Solutions (~25%)",
      weekRange: "Weeks 4–5",
      description:
        "The largest exam domain. Compute deployment — Compute Engine instances, instance templates, Managed Instance Groups + autoscaling, GKE deployment (Autopilot + Standard), Cloud Run deployment, Cloud Functions deployment, plus container image management via Artifact Registry. Data deployment — Cloud SQL setup, BigQuery dataset / table creation, Cloud Storage buckets and lifecycle. Plus deployment via Deployment Manager (the GCP-native IaC) and Terraform.",
      topics: [
        "Compute Engine — instances, templates, MIGs",
        "GKE Autopilot and Standard deployment",
        "Cloud Run deployment",
        "Cloud Functions deployment",
        "Artifact Registry",
        "Cloud SQL setup",
        "BigQuery dataset / table",
        "Cloud Storage and lifecycle",
        "Deployment Manager and Terraform",
      ],
    },
    {
      title: "Domain 4 — Ensuring Successful Operation (~20%)",
      weekRange: "Week 6",
      description:
        "Operations domain. Monitoring — Cloud Monitoring metrics, alert policies, dashboards. Logging — Cloud Logging, log-based metrics, log routing (sinks). Cloud Trace and Cloud Profiler. Plus the maintenance patterns — scaling, backups (Cloud SQL automated backups, Cloud Storage versioning), troubleshooting flowcharts.",
      topics: [
        "Cloud Monitoring metrics and alert policies",
        "Cloud Logging and log-based metrics",
        "Log sinks for routing",
        "Cloud Trace and Profiler",
        "Backup patterns",
        "Troubleshooting flowcharts",
      ],
    },
    {
      title: "Domain 5 — Configuring Access & Security (~21%)",
      weekRange: "Week 7",
      description:
        "Access and security. IAM — predefined vs custom roles, conditions, service accounts (the GCP differentiator from AWS / Azure — service accounts are first-class principals), Workload Identity Federation. VPC Service Controls. Plus encryption — Google-managed keys, customer-managed encryption keys (CMEK), customer-supplied encryption keys (CSEK).",
      topics: [
        "IAM predefined vs custom roles",
        "IAM conditions",
        "Service accounts as first-class principals",
        "Workload Identity Federation",
        "VPC Service Controls",
        "Encryption — Google-managed, CMEK, CSEK",
      ],
    },
    {
      title: "Mock Exams & Test-Day Prep",
      weekRange: "Week 8",
      description:
        "Two full-length mock exams under timed conditions — students who score 75–85% on the second mock typically pass first attempt. Final gap-closure on weak domains, exam-booking guidance for Kryterion (online vs test centre), test-day strategy.",
      topics: [
        "Mock exam 1 — full timed",
        "Detailed answer review",
        "Mock exam 2 — full timed",
        "Final gap-closure",
        "Kryterion booking — online vs test centre",
        "Test-day strategy",
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
      title: "GCP ACE Architecture Reference Repository",
      description:
        "A reference repository documenting 8 common GCP ACE scenarios — multi-region web app on Cloud Run, GKE Autopilot deployment, BigQuery analytics pipeline, Shared VPC setup, IAM hierarchy with custom roles, Cloud SQL HA, plus Terraform reference. Demonstrates the architectural fluency that opens senior Pune GCP interviews.",
      technologies: [
        "Architecture diagrams",
        "Terraform reference modules",
        "gcloud CLI scripts",
        "GitHub repository",
      ],
    },
  ],

  trainersIntro:
    "Your batch is led by Vinod Patil (Solutions Architect & AI Trainer, 12 years, GCP / Vertex AI specialisation) and Yogesh Patil (Founder & Director, 15+ years). Both have personally cleared the GCP ACE exam.",

  careerOutcomes: {
    paragraphs: [
      "Certified ACE candidates with hands-on portfolio see roughly 1.5–2× the interview-conversion rate on Pune GCP analytics-engineering roles. Indeed Pune lists 250+ active openings that list ACE as required or preferred, with continuous hiring at Tiger Analytics, Fractal, ZS, MathCo, Persistent Data Engineering, Mastercard Pune Tech Hub, BMW TechWorks autonomous-driving.",
      "What pulls a certified GCP engineer above the median band: the certificate alone gets you to interviews; the offer comes from BigQuery depth (the GCP differentiator), demonstrable hands-on experience, and one specialisation (Professional Cloud Architect, Professional Data Engineer, or Professional Machine Learning Engineer).",
      "Senior GCP Architect bands are reported as national figures (Pune-specific Indeed pages do not exist for these specific titles); Pune trends within ±10% of these figures.",
    ],
    salaryBands: [
      {
        role: "GCP Cloud Engineer with ACE (Pune)",
        band: "₹8,00,000 – ₹13,00,000 per year",
        source: {
          label: "Indeed Pune (GCP Cloud Engineer)",
          url: "https://in.indeed.com/career/cloud-engineer/salaries/Pune--Maharashtra",
        },
      },
      {
        role: "Mid-level GCP Engineer (Pune, 3–5 years)",
        band: "₹14,00,000 – ₹22,00,000 per year",
        source: {
          label: "Glassdoor Pune GCP Engineer",
          url: "https://www.glassdoor.co.in/Salaries/pune-gcp-engineer-salary-SRCH_IL.0,4_IM1072_KO5,17.htm",
        },
      },
      {
        role: "Senior GCP Architect (national, 6–9 years)",
        band: "₹26,00,000 – ₹45,00,000 per year",
        source: {
          label: "6figr India Senior GCP Architect (Pune ±10%)",
          url: "https://6figr.com/in/salary/senior-gcp-architect--t",
        },
      },
    ],
    hiringCompanies: [
      "Tiger Analytics",
      "Fractal Analytics",
      "ZS Associates",
      "MathCo",
      "Persistent Systems (Data Engineering)",
      "Mastercard Pune Tech Hub",
      "BMW TechWorks India",
      "Cognizant",
      "Capgemini",
      "TCS",
      "Infosys",
    ],
    rolesAfterCourse: [
      "GCP Cloud Engineer (cert-required)",
      "Cloud Data Engineer",
      "Junior Solutions Engineer",
      "DevOps Engineer (GCP-focused)",
    ],
  },

  modesAndDuration: {
    duration: "8 weeks of structured exam preparation (~2 months total)",
    classroom: {
      location: "Archer Infotech, Kothrud, Pune",
      timing: ["Morning batch — 10:00 to 13:00", "Evening batch — 18:00 to 21:00"],
    },
    online: {
      timing: ["Same hours as classroom batches", "Recordings available for review"],
      tools: ["Zoom for live sessions", "Personal GCP sandbox per student", "Mock exam platform (provided)"],
    },
    weekend: {
      timing: ["Saturday + Sunday, 09:00 to 13:00"],
      durationNote: "Stretches over ~3 months instead of 2.",
    },
    batchPolicy: "Maximum 15 students per batch.",
  },

  fees: {
    note:
      "Course fees range from ₹20,000 to ₹90,000 depending on mode and concession. The ACE exam voucher (USD ~125 / ~₹10,500) is paid directly to Google / Kryterion.",
    range: "₹20,000 – ₹90,000",
    paymentOptions: [
      "Single payment with early-bird discount",
      "EMI in 2 instalments at no extra cost",
      "Corporate sponsorship — invoiced with GST",
    ],
  },

  placementSupport: {
    paragraphs: [
      "Placement support starts after exam-pass. Most candidates targeting this cert already have a GCP-track job; the cert is the unblock for senior roles. Our support is unconditional, time-bound (six months after course completion), and includes free re-entry to a future batch's interview-prep sessions.",
    ],
    process: [
      "After exam-pass — resume + LinkedIn rewrite emphasising the credential",
      "GitHub portfolio cleanup",
      "Two rounds of mock GCP interviews",
      "HR mock interview and salary negotiation coaching",
      "Post-course — referrals via our 17-year alumni network",
      "Up to 6 months of continued support",
      "Free re-entry to future batch interview-prep sessions",
    ],
    partnerCompanies: [
      "Tiger Analytics",
      "Fractal Analytics",
      "ZS Associates",
      "MathCo",
      "Persistent Systems",
      "Mastercard Pune Tech Hub",
      "BMW TechWorks India",
      "TCS",
    ],
  },

  comparison: {
    intro:
      "We compare ourselves against typical Pune GCP ACE prep institutes on factual rows only.",
    rows: [
      { feature: "Trainers named with photos and LinkedIn", archer: "Yes — Vinod and Yogesh", typical: "No — generic branding" },
      { feature: "Exam version targeted", archer: "Current GCP ACE (2024+ refresh)", typical: "Older materials" },
      { feature: "Full-length timed mock exams", archer: "Two — under real Kryterion conditions", typical: "Question banks but no full-length timed practice" },
      { feature: "Hands-on labs alongside exam prep", archer: "Yes — personal GCP sandbox, Terraform reference repos", typical: "Slides only" },
      { feature: "Public GitHub portfolio output", archer: "Yes — architecture-pattern reference repo", typical: "Rare" },
      { feature: "Test-day prep coaching", archer: "Kryterion walkthrough + time-management", typical: "Not covered" },
      { feature: "Pass-rate transparency", archer: "Most students who score 75–85% on mock 2 pass first attempt", typical: "No data shared" },
      { feature: "Placement support after course", archer: "6 months, with free re-entry", typical: "1–3 months or vaguely 'until placed'" },
    ],
    closing: "Compare with whoever you are considering.",
  },

  versusAlternative: {
    heading: "GCP ACE Standalone or Bundled With Our Broader Google Cloud Course?",
    paragraphs: [
      "If you have NO hands-on GCP experience, take our broader Google Cloud course (2.5 months) first. If you have 6+ months of working GCP, this focused 2-month track is right.",
      "Honest recommendation: take our broader Google Cloud course first if you are new to cloud. Take this exam-focused track if you already have hands-on experience.",
    ],
  },

  prerequisitesAndStart: {
    paragraphs: [
      "Prerequisites: at least 6 months of hands-on GCP experience, basic Linux, basic Python or Bash. We do NOT teach GCP from scratch — that is our broader Google Cloud course.",
    ],
    suggestedSteps: [
      "Decide your mode — classroom, online live, or weekend",
      "Check the upcoming batch dates",
      "Book a free 30-minute counselling call",
      "Confirm enrolment and complete pre-course orientation",
      "Show up to day one ready for a 50-question diagnostic",
    ],
  },

  faqs: [
    {
      question: "How long does GCP ACE preparation take at Archer Infotech?",
      answer:
        "Approximately 2 months — 8 weeks of structured exam preparation. The weekend batch stretches over ~3 months at the same content depth.",
    },
    {
      question: "What is the GCP ACE exam fee?",
      answer:
        "The ACE exam voucher is USD ~125 (~₹10,500), paid directly to Google via Kryterion.",
    },
    {
      question: "Do I need your broader Google Cloud course first?",
      answer:
        "Yes if you have no hands-on GCP experience. If you have 6+ months working GCP, this focused track is right.",
    },
    {
      question: "What is the pass rate?",
      answer:
        "Most students who score 75–85% on the second mock exam pass the real ACE first attempt.",
    },
    {
      question: "Are weekend GCP ACE classes available in Pune?",
      answer:
        "Yes — Saturday and Sunday, 09:00–13:00, stretched over ~3 months instead of 2.",
    },
    {
      question: "What support do I get after the exam?",
      answer:
        "Six months of active placement support, referrals via our alumni network, mock interviews, salary negotiation.",
    },
    {
      question: "Are the named trainers actually teaching?",
      answer:
        "Vinod and Yogesh personally lead every session of every batch.",
    },
  ],

  finalCta: {
    heading: "Ready to start GCP Associate Cloud Engineer preparation in Pune?",
    paragraph:
      "We have classroom, online, and weekend batches starting every 4–6 weeks. Reach out via the enquiry form or call us — Vinod and Yogesh are happy to assess your readiness.",
  },
};
