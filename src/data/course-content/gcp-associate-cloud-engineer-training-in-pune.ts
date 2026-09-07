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
      title: "GCP Fundamentals Refresher — Console, gcloud & Cloud Shell",
      weekRange: "Week 1",
      description:
        "The Associate Cloud Engineer exam is unusually command-line heavy for an associate certification: a large share of its questions show you a `gcloud` invocation and ask what it does, or describe a task and ask which command performs it. Fluency in the CLI is therefore not optional, and this week builds it.\n\nYou work through the console, Cloud Shell and the SDK, configurations and named profiles, and the `gcloud` command grammar — group, subgroup, verb, flags — which is regular enough that you can often reconstruct a command you have never used. The resource hierarchy of organisation, folders and projects is covered here because everything in the rest of the course inherits down it.",
      topics: [
        "Regions, zones and multi-region resources",
        "Organisation, folders, projects and the hierarchy",
        "The Cloud Console and Cloud Shell",
        "Installing and initialising the gcloud SDK",
        "gcloud configurations and named profiles",
        "The gcloud command grammar",
        "gsutil, bq and the specialised tools",
        "Cloud APIs and enabling services",
        "Labels, and how they differ from tags",
        "Reading Google Cloud documentation efficiently",
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
      title: "Compute Options — GCE, GKE, Cloud Run, App Engine & Functions",
      weekRange: "Week 3",
      description:
        "The selection question that runs through the whole exam: given this workload, which compute product is correct. Compute Engine covers machine families, custom machine types, preemptible and spot instances, instance templates, managed instance groups and autoscaling.\n\nGKE covers clusters, node pools, Autopilot against Standard, and the `kubectl` basics the exam expects. Cloud Run covers container-based serverless, App Engine covers standard and flexible environments, and Cloud Functions covers event-driven code. The module closes on the decision itself — stated as a set of criteria rather than a preference, because that is how the exam frames it.",
      topics: [
        "Machine families, custom types and right-sizing",
        "Preemptible and spot VMs",
        "Instance templates and managed instance groups",
        "Autoscaling and autohealing",
        "GKE clusters, node pools, Autopilot and Standard",
        "kubectl basics the exam expects",
        "Cloud Run and container-based serverless",
        "App Engine standard versus flexible",
        "Cloud Functions and event triggers",
        "Choosing a compute product from stated constraints",
      ],
    },
    {
      title: "Storage & Databases — Cloud Storage, SQL, Firestore & BigQuery",
      weekRange: "Week 4",
      description:
        "The data half of the exam, and another selection problem. Cloud Storage covers buckets, storage classes and their retrieval costs, lifecycle rules, object versioning, retention policies and signed URLs — plus uniform against fine-grained access control, which the exam asks about directly.\n\nDatabases cover Cloud SQL with high availability and read replicas, Cloud Spanner and what its horizontal scale is for, Firestore for document data, Bigtable for wide-column time-series work, Memorystore for caching, and BigQuery for analytics. Persistent disks and Filestore complete the block and file picture. The recurring exam shape is a workload description that maps to exactly one of these, and the module trains recognising it.",
      topics: [
        "Cloud Storage buckets and storage classes",
        "Lifecycle rules, versioning and retention",
        "Uniform versus fine-grained access control",
        "Signed URLs and signed policy documents",
        "Persistent disks, local SSD and Filestore",
        "Cloud SQL, high availability and read replicas",
        "Cloud Spanner and horizontal relational scale",
        "Firestore and Bigtable — different shapes of data",
        "Memorystore for caching",
        "BigQuery for analytics, and its pricing model",
      ],
    },
    {
      title: "Networking — VPC, Firewall Rules, Load Balancing & DNS",
      weekRange: "Week 4",
      description:
        "Google Cloud's networking model differs from its competitors in ways the exam tests deliberately: VPCs are global, subnets are regional, and firewall rules are stateful with priorities and target tags. Candidates carrying assumptions from AWS or Azure lose marks here, so the differences are made explicit.\n\nYou build VPCs and subnets, write firewall rules with priorities and service accounts as targets, and configure Cloud NAT for private instances. Load balancing covers the global and regional options and the layer each operates at, then Cloud DNS, Cloud CDN, VPC peering, Shared VPC and the hybrid connectivity options at the level the exam expects.",
      topics: [
        "Global VPCs and regional subnets",
        "Auto mode versus custom mode networks",
        "Firewall rules, priorities, tags and service accounts",
        "Cloud NAT and private instances",
        "Private Google Access",
        "Global and regional load balancing options",
        "Cloud DNS and private zones",
        "Cloud CDN and caching at the edge",
        "VPC peering and Shared VPC",
        "Cloud VPN and Interconnect at exam level",
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
      title: "Operations — Cloud Monitoring, Logging & Error Reporting",
      weekRange: "Week 6",
      description:
        "Domain 4 rests on the operations suite, and the exam asks practical questions: which tool shows you this, and how would you alert on it. Cloud Monitoring covers metrics, dashboards, uptime checks, alerting policies and notification channels, plus the Ops Agent that has to be installed before VM memory and disk metrics exist at all — a detail that appears in questions.\n\nCloud Logging covers the log explorer, query syntax, log sinks and exports to Cloud Storage or BigQuery, retention and log-based metrics. Error Reporting, Cloud Trace and Cloud Profiler close the module, along with the diagnostic habit the exam rewards: identifying which signal answers the question before reaching for a tool.",
      topics: [
        "Cloud Monitoring metrics and dashboards",
        "Uptime checks and alerting policies",
        "Notification channels and escalation",
        "The Ops Agent and VM-level metrics",
        "Cloud Logging and the log explorer",
        "Log query syntax and filters",
        "Log sinks, exports and retention",
        "Log-based metrics",
        "Error Reporting, Cloud Trace and Profiler",
        "Choosing the signal before choosing the tool",
      ],
    },
    {
      title: "Billing, Quotas & Cost Management",
      weekRange: "Week 6",
      description:
        "A small domain by weight and an easy one to secure, provided you have actually looked at a billing console rather than read about one. Billing accounts and their relationship to projects, budgets and alerts, billing export to BigQuery, and the reports that answer where the money went.\n\nQuotas get their own treatment because they are a frequent exam subject and a frequent real obstacle: the difference between rate and allocation quotas, how to see current usage, and how an increase is requested. Committed use and sustained use discounts close the module, along with preemptible instances as a cost strategy and the pricing calculator.",
      topics: [
        "Billing accounts and project association",
        "Budgets, thresholds and alerting",
        "Billing export to BigQuery",
        "Cost breakdown and reports",
        "Rate quotas versus allocation quotas",
        "Viewing usage and requesting increases",
        "Committed use discounts",
        "Sustained use discounts",
        "Preemptible instances as a cost strategy",
        "The Google Cloud pricing calculator",
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
      title: "IAM in Depth — Roles, Service Accounts & Org Policy",
      weekRange: "Week 7",
      description:
        "The largest identity component of the exam, and the one with the most Google-specific behaviour. The three role types — basic, predefined and custom — with the standing guidance that basic roles are almost never the correct exam answer. Policy inheritance down the resource hierarchy, and the union behaviour that means a permission granted higher up cannot be removed lower down by an allow policy.\n\nService accounts get extended treatment: default against user-managed, impersonation, key management and the strong preference for avoiding downloaded keys, and Workload Identity for GKE. Organisation policy constraints, IAM Conditions and the audit questions the exam asks close the module.",
      topics: [
        "Basic, predefined and custom roles",
        "Why basic roles are rarely the right answer",
        "Policy inheritance and the union rule",
        "Members, bindings and allow policies",
        "Service accounts — default and user-managed",
        "Service account impersonation",
        "Key management, and avoiding downloaded keys",
        "Workload Identity for GKE",
        "Organisation policy constraints",
        "IAM Conditions and audit logging",
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

  roadmapImage: {
    src: "/images/courses/gcp-ace-path-v1.webp",
    width: 1400,
    height: 900,
    alt: "Eight-stage Google Cloud Associate Cloud Engineer learning path taught at Archer Infotech Pune: foundations covering the console, gcloud, Cloud Shell and the resource hierarchy; setting up cloud projects as domain one at about 17 percent covering projects, billing and accounts; planning and configuring as domain two at about 17 percent covering compute, storage and network choices; deploying and implementing as domain three at about 25 percent covering Compute Engine, Google Kubernetes Engine, Cloud Run and functions; ensuring successful operation as domain four at about 20 percent covering Cloud Monitoring, Cloud Logging and quotas; configuring access and security as domain five at about 21 percent covering identity and access management, service accounts and organisation policy; mock exams with timed papers, gcloud command drills and gap closure; and exam day covering booking, proctoring, pacing and result.",
    caption:
      "The Associate Cloud Engineer exam domains with their weightings, in the order this course teaches them. Each stage expands into the modules below.",
  },

  syllabusDownload: {
    pdfUrl: "/downloads/gcp-associate-cloud-engineer-syllabus-v1.pdf",
    title: "Google Cloud Associate Cloud Engineer Syllabus — Complete Module List",
    slug: "gcp-associate-cloud-engineer-syllabus",
    blurb:
      "All fifteen modules as a 6-page PDF — the gcloud and Cloud Shell refresher, every ACE domain with its weighting, and the depth modules on compute product selection, storage and database fit, Google Cloud's global VPC and firewall model, the operations suite, billing and quotas, and IAM with service accounts. Generated from this page, so the two cannot disagree.",
    asideBlocks: [
      {
        heading: "What is inside the 6-page PDF",
        items: [
          "All fifteen modules in teaching order, each with its schedule, description and full topic list.",
          "The five ACE domains with their published weightings, so you can plan study time against what is actually scored.",
          "Heavy gcloud coverage, because the exam is unusually command-line focused for an associate certification and shows you invocations to interpret.",
          "The Google-specific behaviour that trips candidates carrying AWS or Azure assumptions: global VPCs with regional subnets, IAM policy inheritance and the union rule, and why basic roles are rarely the right answer.",
        ],
      },
      {
        heading: "Roles this syllabus prepares you for",
        items: [
          "Cloud Engineer on Google Cloud — the role the certification is written for.",
          "Cloud Administrator at Pune firms running GCP workloads.",
          "Data-adjacent engineers, since GCP concentrates in analytics and ML teams.",
          "The foundation for Professional Cloud Architect and Data Engineer.",
        ],
      },
    ],
  },

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
    {
      question: "Is the certification exam fee included in the course fee?",
      answer:
        "No, and no honest institute includes it. The exam is booked and paid directly with Google Cloud through their own portal, at their published price, and the voucher is issued in your name. Our fee covers the training, labs, mock exams and the guidance to book — separating the two is the only arrangement that lets you sit the exam whenever you are ready rather than whenever a batch ends.",
    },
    {
      question: "What happens if I fail the exam?",
      answer:
        "Google Cloud sets the retake policy — there is a waiting period before a resit and the full fee applies again, so it is worth sitting only when your mock scores are consistently clear of the pass mark. From our side, you keep access to the mock papers and can rejoin a later batch's revision sessions at no cost. We would rather you delay a booking by three weeks than pay twice.",
    },
    {
      question: "How long does the certification stay valid?",
      answer:
        "Google Cloud certifications are valid for three years for Associate level, renewed by retaking the current exam. Plan for that from the start: the recertification is considerably easier than the first attempt if you have been using the platform, and considerably harder if the certificate has been sitting on a CV while you worked on something else.",
    },
    {
      question: "Will I get hands-on practice, or only theory and practice questions?",
      answer:
        "Hands-on throughout, in your own Google Cloud project, using the free trial credit. Every module has lab work, and the course builds a reference architecture you deploy yourself rather than watch. That matters beyond the exam: a certification with no deployed work behind it does not survive the first practical interview question, and Pune hiring panels ask them.",
    },
    {
      question: "Do I need experience before taking this course?",
      answer:
        "Google recommends six months of hands-on Google Cloud experience. This course assumes basic cloud familiarity and, in particular, comfort at a command line — the ACE exam is unusually gcloud-heavy and week one builds that fluency. If you are entirely new to cloud, the Cloud & DevOps category covers the ground concepts first — a certification syllabus tests breadth across a platform rather than teaching what a virtual network or an identity policy is, and starting here without that background turns the course into memorisation.",
    },
    {
      question: "Is a certification enough to get hired in Pune?",
      answer:
        "It gets your CV read, which is a real and narrow benefit. Many Pune employers and staffing partners filter on it, and consulting partners often need certified staff contractually. What converts it into an offer is being able to answer the follow-up about something you actually built — so treat the certificate and the deployed project as one deliverable, not two.",
    },
  ],

  finalCta: {
    heading: "Ready to start GCP Associate Cloud Engineer preparation in Pune?",
    paragraph:
      "We have classroom, online, and weekend batches starting every 4–6 weeks. Reach out via the enquiry form or call us — Vinod and Yogesh are happy to assess your readiness.",
  },
};
