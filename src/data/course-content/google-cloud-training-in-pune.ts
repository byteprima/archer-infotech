import type { CourseRichContent } from "./types";

export const googleCloudTrainingInPune: CourseRichContent = {
  intro:
    "Google Cloud Platform (GCP) is the third major cloud in Pune — significantly smaller than AWS and Azure but distinguished by leadership in data analytics (BigQuery), Kubernetes (GKE — Google invented Kubernetes), and AI / ML (Vertex AI plus Gemini exclusivity). Pune teams at Tiger Analytics, Fractal Analytics, ZS Associates, MathCo, plus the data-heavy product engineering arms (Persistent Data Engineering practice, Mastercard Pune Tech Hub for some workloads, BMW TechWorks for ADAS data pipelines) run substantial GCP workloads. Archer Infotech's Google Cloud training in Pune teaches the platform as it is actually used in 2026 — Compute Engine, GKE (with Autopilot mode), Cloud Run for serverless containers, BigQuery for data analytics, Cloud Functions, Vertex AI for ML / GenAI, plus IaC via Terraform and the gcloud CLI. Classroom in Kothrud, online live, and weekend batches available.",

  whyLearn: {
    heading: "Why Learn Google Cloud in 2026",
    paragraphs: [
      "GCP holds roughly 11% of the global cloud infrastructure market (Synergy Research, Q1 2026) — third behind AWS (31%) and Azure (25%) — but its share is concentrated in data / ML / AI workloads where it leads. In Pune specifically, GCP is the dominant cloud at most analytics-heavy companies (Tiger Analytics, Fractal Analytics, ZS Associates, MathCo) and an increasing presence at AI-platform startups, plus several BMW TechWorks autonomous-driving data pipelines. Indeed Pune lists more than 500 active GCP-related roles as of May 2026, smaller than AWS / Azure but with stronger compensation per role because the talent supply is thinner.",
      "What changed in 2026: GKE Autopilot mode has matured into the default for new Kubernetes workloads (managed control + node autoscaling, lower operational overhead). Cloud Run has expanded beyond stateless HTTP to support background jobs and longer execution times. Vertex AI has consolidated Google's ML / GenAI offering — model garden, model registry, plus exclusive Gemini access (the Anthropic / OpenAI alternative for enterprise teams that want to ship Google's frontier model). BigQuery's BigLake pattern (querying lake-house data without ingestion) has become the default for analytics-heavy teams. Terraform 1.7+ with the google provider remains dominant for IaC.",
      "What this means for hiring: 2026 Pune GCP JDs expect Compute / GKE / Cloud Run fluency, BigQuery for analytics teams, IAM / VPC fundamentals, IaC via Terraform, plus at least one observability story (Cloud Operations Suite — Logging, Monitoring, Trace). Senior roles add Vertex AI, BigQuery optimisation, and multi-cluster / multi-region patterns. Archer Infotech's curriculum is rebuilt around exactly these expectations — modern GCP, IaC by default, data + AI aware.",
    ],
    keyPoints: [
      "500+ active GCP roles on Indeed Pune as of May 2026 — thinner supply, stronger compensation per role",
      "Pune analytics ecosystem — Tiger / Fractal / ZS / MathCo all run substantial GCP",
      "GCP leads on data (BigQuery), Kubernetes (GKE — Google invented K8s), and AI (Vertex AI + Gemini)",
      "GKE Autopilot + Cloud Run + BigQuery + Vertex AI — the modern GCP stack",
      "Certification path — Associate Cloud Engineer (covered in our follow-on track)",
    ],
  },

  whoIsThisFor: {
    forYou: [
      "Working developer or data engineer at a Pune analytics company (Tiger / Fractal / ZS / MathCo) where GCP is the institutional default",
      "AWS or Azure cloud engineer wanting to add GCP for multi-cloud reach",
      "Engineering / BCS / MCA student targeting analytics-engineering roles in Pune where GCP is dominant",
      "Working data engineer wanting BigQuery + Vertex AI depth for senior analytics roles",
      "Working ML engineer targeting Pune AI-platform startups that run on GCP",
      "Career restarter targeting cloud engineering at analytics-heavy companies",
    ],
    notForYou: [
      "If you have no programming or scripting background — at least basic Python is required",
      "If your goal is Pune captives / .NET / Microsoft ecosystem — Azure is the right choice; GCP adoption is minimal there",
      "If your goal is Pune product engineering / SaaS / fintech without analytics emphasis — AWS is wider",
      "If you cannot put in 8–10 hours per week of lab work outside class — cloud is learned by clicking, breaking, rebuilding",
      "If you only want a single certificate sticker — talk to us about the focused GCP Associate Cloud Engineer track",
    ],
  },

  curriculum: [
    {
      title: "GCP Foundations & Account Setup",
      weekRange: "Week 1",
      description:
        "Cloud computing concepts, the GCP global infrastructure (Regions, Zones, Network Edge Locations), the management hierarchy (Organisation → Folders → Projects → Resources), project / billing setup, plus the gcloud CLI essentials. Set up a personal sandbox project with billing alarms set at ₹1,000, an IAM principal with appropriate roles, and the Cloud SDK locally. We deliberately spend a full session on cost — every horror story you have heard about a runaway GCP bill starts with what we cover this week.",
      topics: [
        "Cloud computing models — IaaS / PaaS / SaaS",
        "GCP global infrastructure — Regions, Zones, Edge",
        "Organisation, Folders, Projects, Resources",
        "Project setup, billing, free trial credits",
        "Budget alerts and cost controls",
        "gcloud CLI and Cloud Console",
        "Cloud Shell for browser-based admin",
      ],
    },
    {
      title: "IAM, VPC & Networking",
      weekRange: "Week 2",
      description:
        "Identity is the foundation of cloud security. Cover IAM principals (users, service accounts, groups), roles (basic, predefined, custom), the resource-hierarchy IAM inheritance model (different from AWS / Azure — important to internalise), Workload Identity Federation for non-GCP CI/CD pipelines. Then networking — VPC (default vs custom mode), subnets across regions, firewall rules, Cloud NAT, Cloud Load Balancing (the global vs regional distinction), VPC Peering and Shared VPC, plus Cloud DNS.",
      topics: [
        "IAM principals and roles",
        "Resource-hierarchy IAM inheritance",
        "Service Accounts and Workload Identity Federation",
        "VPC — auto vs custom mode subnets",
        "Firewall rules and network tags",
        "Cloud NAT and Cloud Router",
        "Cloud Load Balancing — global vs regional",
        "VPC Peering, Shared VPC",
        "Cloud DNS and private DNS",
      ],
    },
    {
      title: "Compute — Compute Engine, GKE, Cloud Run, Functions",
      weekRange: "Weeks 3–4",
      description:
        "The compute landscape on GCP in 2026. Compute Engine (VMs) — instance families, custom machine types (a GCP differentiator), preemptible / spot instances, Managed Instance Groups + Autoscaling. Then containers — GKE with Autopilot mode (the 2026 default for new clusters), Standard mode for advanced control, plus Cloud Run for serverless containers (the right choice for many web services). Then Cloud Functions for event-driven compute, Cloud Run Jobs for batch work, plus the App Engine option (legacy but still used).",
      topics: [
        "Compute Engine — families, custom machine types",
        "Preemptible / spot instances",
        "Managed Instance Groups and Autoscaling",
        "GKE Autopilot — the 2026 default",
        "GKE Standard mode for advanced control",
        "Cloud Run for serverless containers",
        "Cloud Run Jobs for batch workloads",
        "Cloud Functions",
        "Container Registry / Artifact Registry",
      ],
    },
    {
      title: "Storage, Databases & BigQuery",
      weekRange: "Weeks 5–6",
      description:
        "Storage and data services where GCP differentiates most. Cloud Storage (object storage with classes — Standard, Nearline, Coldline, Archive), Filestore for shared filesystems, Persistent Disks for VMs. Databases — Cloud SQL (managed PostgreSQL / MySQL / SQL Server), Cloud Spanner for globally distributed strong consistency (the unique GCP offering), Firestore for document NoSQL, Memorystore for Redis. Then the GCP differentiator — BigQuery — the serverless petabyte-scale analytics warehouse that is the reason most Pune analytics teams are on GCP. BigLake for federated queries over Cloud Storage data, BigQuery ML for in-database machine learning, plus query optimisation patterns.",
      topics: [
        "Cloud Storage — Standard, Nearline, Coldline, Archive",
        "Filestore and Persistent Disks",
        "Cloud SQL — PostgreSQL, MySQL, SQL Server",
        "Cloud Spanner basics",
        "Firestore for document NoSQL",
        "Memorystore for Redis",
        "BigQuery — partitions, clustering, query optimisation",
        "BigLake for federated queries",
        "BigQuery ML basics",
      ],
    },
    {
      title: "DevOps on GCP — Terraform, Cloud Build, Observability",
      weekRange: "Weeks 7–8",
      description:
        "Modern GCP is code, not clicks. Cover Terraform 1.7+ with the google provider — providers, state management (state in GCS with state locking), modules, plus the Cloud Foundation Toolkit (Google's published Terraform modules). Then CI/CD — Cloud Build (the GCP-native option) and GitHub Actions with Workload Identity Federation (no static keys). Cover the Cloud Operations Suite — Cloud Logging, Cloud Monitoring with PromQL-compatible queries, Cloud Trace, plus the GKE-native option of running Prometheus + Grafana via Google Cloud Managed Service for Prometheus.",
      topics: [
        "Terraform 1.7+ with google provider",
        "State in GCS with locking",
        "Cloud Foundation Toolkit modules",
        "Cloud Build — triggers, builds, deployments",
        "GitHub Actions with Workload Identity Federation",
        "Cloud Logging and log-based metrics",
        "Cloud Monitoring with PromQL",
        "Cloud Trace and OpenTelemetry",
        "Managed Service for Prometheus",
      ],
    },
    {
      title: "Vertex AI & GenAI on GCP",
      weekRange: "Week 9",
      description:
        "GCP's AI / ML platform consolidated. Cover Vertex AI workbench (managed Jupyter for data scientists), Vertex AI Pipelines for ML workflow orchestration, the model registry, plus the Model Garden for pre-trained models (Gemini, Claude on GCP marketplace, open-source models). Vertex AI Search for managed RAG, Vertex AI Agent Builder for tool-using assistants, plus Gemini 2.5 Pro on Vertex AI for the frontier-model layer. Build a small RAG service against a real corpus that demos in 5 minutes.",
      topics: [
        "Vertex AI Workbench (managed Jupyter)",
        "Vertex AI Pipelines",
        "Model Registry and serving",
        "Model Garden — Gemini, open-source models",
        "Vertex AI Search for managed RAG",
        "Vertex AI Agent Builder",
        "Gemini 2.5 Pro on Vertex AI",
      ],
    },
    {
      title: "Capstone Project & Interview Preparation",
      weekRange: "Week 10",
      description:
        "Two weeks of full-time capstone work plus structured interview preparation. Pick one of three capstone projects (see Capstone Projects). Mock interviews calibrated for Pune GCP hiring panels — Tiger Analytics, Fractal, ZS, MathCo, Persistent Data Engineering. Includes a BigQuery query-optimisation mock round, an architecture / scenario round, and a behavioural round.",
      topics: [
        "Capstone implementation, deployment, README",
        "BigQuery query-optimisation mock round",
        "GCP architecture / scenario mock round",
        "Resume + LinkedIn rewrite",
        "GitHub portfolio polish",
        "HR mock interview and salary negotiation",
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
      title: "Three-Tier Architecture with Terraform on GCP",
      description:
        "A complete production-style three-tier architecture provisioned by Terraform — VPC with public / private subnets, Cloud Load Balancer, GKE Autopilot or Compute Engine Managed Instance Group, Cloud SQL PostgreSQL with HA, Memorystore for caching, Cloud Storage + Cloud CDN for static assets. Outcome: a public GitHub repository plus an architecture diagram you can talk through in any cloud interview.",
      technologies: [
        "Terraform 1.7+",
        "GKE Autopilot or Compute Engine MIG",
        "Cloud SQL PostgreSQL HA",
        "Memorystore (Redis)",
        "Cloud Load Balancing + Cloud CDN",
        "Cloud Operations Suite",
        "GitHub Actions with Workload Identity Federation",
      ],
    },
    {
      title: "Data Analytics Pipeline with BigQuery + Cloud Composer",
      description:
        "An end-to-end analytics pipeline — ingest data from multiple sources to Cloud Storage, schedule processing with Cloud Composer (managed Airflow), transform with dbt or Dataform, load into BigQuery with proper partitioning and clustering, build a Looker Studio dashboard. Demonstrates the patterns Pune analytics teams (Tiger / Fractal / ZS / MathCo) test for.",
      technologies: [
        "Cloud Storage + BigQuery",
        "Cloud Composer (Airflow) or Dataform",
        "dbt for transformations",
        "Looker Studio dashboard",
        "Terraform IaC",
      ],
    },
    {
      title: "Vertex AI RAG Service with Gemini",
      description:
        "A 2026-relevant AI capstone — Cloud Storage PDFs ingested, embeddings stored in Vertex AI Vector Search, Vertex AI Agent Builder powering a domain assistant via Gemini 2.5 Pro, served via Cloud Run with streaming responses. Includes evaluation via Vertex AI Evaluation Service.",
      technologies: [
        "Vertex AI Workbench + Vector Search",
        "Vertex AI Agent Builder",
        "Gemini 2.5 Pro on Vertex AI",
        "Cloud Run for serving",
        "Cloud Storage + Cloud SQL",
      ],
    },
  ],

  trainersIntro:
    "Your batch is led by Vinod Patil (Solutions Architect & AI Trainer, 12 years, deep AWS / Azure / GCP plus Gemini / Vertex AI specialisation) and Yogesh Patil (Founder & Director, 15+ years, hands-on AWS / Azure / GCP architect). Both personally take sessions in every batch.",

  careerOutcomes: {
    paragraphs: [
      "GCP Cloud Engineer is among the most-niche-but-well-paid cloud roles in Pune in 2026 — Indeed Pune lists 500+ active openings, smaller than AWS / Azure but with stronger compensation per role because the talent supply is thinner. The biggest Pune employers are Tiger Analytics, Fractal Analytics, ZS Associates, MathCo, Persistent Data Engineering, Mastercard Pune Tech Hub (for some workloads), plus BMW TechWorks autonomous-driving data pipelines.",
      "What pulls a GCP cloud engineer above the median band: a public GitHub portfolio with at least one Terraform-deployed three-tier architecture on GCP, demonstrable BigQuery optimisation experience (the GCP differentiator), one Vertex AI / Gemini integration project, and the Associate Cloud Engineer or Professional Cloud Architect certificate. Most students take the focused GCP Associate Cloud Engineer track after this course as the certification specialisation.",
      "Senior Cloud Architect bands at the top end are reported as national figures (Pune-specific Indeed pages do not exist for these specific titles); Pune trends within ±10% of these figures based on AmbitionBox and 6figr.",
    ],
    salaryBands: [
      {
        role: "GCP Cloud Engineer (Pune)",
        band: "₹7,80,000 per year average",
        source: {
          label: "Indeed Pune (GCP Cloud Engineer)",
          url: "https://in.indeed.com/career/cloud-engineer/salaries/Pune--Maharashtra",
        },
      },
      {
        role: "Cloud Engineer entry-level (<3 years, Pune)",
        band: "₹5,00,000 – ₹8,00,000 per year",
        source: {
          label: "AmbitionBox Pune Cloud Engineer",
          url: "https://www.ambitionbox.com/profile/cloud-engineer-salary-in-pune",
        },
      },
      {
        role: "GCP Solutions Architect (Pune mid-level, 3–6 years)",
        band: "₹14,00,000 – ₹22,00,000 per year",
        source: {
          label: "Glassdoor Pune GCP Architect",
          url: "https://www.glassdoor.co.in/Salaries/pune-gcp-cloud-architect-salary-SRCH_IL.0,4_IM1072_KO5,24.htm",
        },
      },
      {
        role: "Senior GCP Architect / Data Engineer (national, 7+ years)",
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
      "Atos / Eviden",
    ],
    rolesAfterCourse: [
      "GCP Cloud Engineer",
      "Cloud Data Engineer",
      "DevOps Engineer (GCP-focused)",
      "Junior Solutions Architect",
      "Analytics Engineer (with BigQuery depth)",
      "ML Engineer (with Vertex AI)",
    ],
  },

  modesAndDuration: {
    duration:
      "10 weeks of structured curriculum plus 2 weeks of capstone project and interview preparation (~2.5 months total)",
    classroom: {
      location: "Archer Infotech, Kothrud, Pune",
      timing: [
        "Morning batch — 10:00 to 13:00",
        "Evening batch — 18:00 to 21:00",
        "Lab access available outside class hours",
      ],
    },
    online: {
      timing: [
        "Same hours as classroom batches",
        "Recordings available for review",
        "Same lab reviews as in-person batches",
      ],
      tools: [
        "Zoom for live sessions",
        "Personal GCP sandbox per student (free trial credits)",
        "GitHub for code and Terraform reviews",
        "Slack / WhatsApp for async Q&A",
      ],
    },
    weekend: {
      timing: ["Saturday + Sunday, 09:00 to 13:00"],
      durationNote: "Stretches over ~4 months instead of 2.5 to accommodate working professionals.",
    },
    batchPolicy:
      "Maximum 15 students per batch. Classroom batches start every 4 weeks; weekend batches every 6 weeks.",
  },

  fees: {
    note:
      "Course fees range from ₹20,000 to ₹90,000 depending on mode and concession. GCP Free Tier + the $300 free trial credit cover the lab work for most students.",
    range: "₹20,000 – ₹90,000",
    paymentOptions: [
      "Single payment with early-bird discount",
      "EMI in 2–3 instalments at no extra cost",
      "Corporate sponsorship — invoiced to your employer with GST",
    ],
  },

  placementSupport: {
    paragraphs: [
      "Placement support starts from week 8 of the course. By the time you finish the curriculum, your resume highlights real Terraform on GCP work, your GitHub has a deployable three-tier reference architecture, and you have completed at least three mock technical interviews against question banks from Pune GCP hiring teams.",
      "We say placement support, not placement guarantee. Our support is unconditional, time-bound (six months after course completion), and includes free re-entry to a future batch's interview-prep sessions if your first round of interviews does not land.",
    ],
    process: [
      "Week 8 — resume and LinkedIn rewrite for GCP cloud-engineer JDs",
      "Week 9 — GitHub portfolio cleanup, Terraform README polish",
      "Weeks 10–11 — three rounds of mock technical interviews",
      "Week 11 — HR mock interview and salary negotiation coaching",
      "Post-course — referrals via our 17-year alumni network at 12+ partner companies (with extra emphasis on Pune analytics scene)",
      "Up to 6 months of continued support after course end",
      "Free re-entry to future batch interview-prep sessions if first round does not land",
    ],
    partnerCompanies: [
      "Tiger Analytics",
      "Fractal Analytics",
      "ZS Associates",
      "MathCo",
      "Persistent Systems",
      "Mastercard Pune Tech Hub",
      "BMW TechWorks India",
      "Cognizant",
      "Capgemini",
      "TCS",
      "Infosys",
    ],
  },

  comparison: {
    intro:
      "We compare ourselves against typical Pune GCP training institutes on factual rows only — no logos, no opinions.",
    rows: [
      {
        feature: "Trainers named on course page with photos and LinkedIn",
        archer: "Yes — Vinod Patil and Yogesh Patil",
        typical: "No — generic 'expert trainers' branding",
      },
      {
        feature: "Personal GCP sandbox per student",
        archer: "Yes — provisioned in week 1, used through capstone",
        typical: "Shared institute account or screen-share only",
      },
      {
        feature: "BigQuery depth",
        archer: "Partitions, clustering, optimisation, BigLake federated queries — full week",
        typical: "Slides only or basic SELECT",
      },
      {
        feature: "GKE coverage",
        archer: "GKE Autopilot AND Standard mode hands-on",
        typical: "Theory only",
      },
      {
        feature: "Vertex AI / Gemini",
        archer: "Full week — Workbench, Pipelines, Vector Search, Gemini 2.5 Pro",
        typical: "Not covered or marketing-only mention",
      },
      {
        feature: "IaC",
        archer: "Terraform 1.7+ with google provider, full week",
        typical: "Console click-through only",
      },
      {
        feature: "Public GitHub portfolio output",
        archer: "Yes — Terraform repos and BigQuery + Vertex AI projects",
        typical: "Rare",
      },
      {
        feature: "Salary data shown",
        archer: "Cited from Indeed Pune + AmbitionBox + Glassdoor + 6figr with source URLs",
        typical: "Single number with no source",
      },
      {
        feature: "Placement support duration after course",
        archer: "6 months, with free re-entry to interview prep",
        typical: "1–3 months or vaguely 'until placed'",
      },
      {
        feature: "Batch size cap",
        archer: "15 students",
        typical: "25–40 students",
      },
    ],
    closing:
      "Compare with whoever you are considering. The right test is whether you can see actual student Terraform repos before you pay.",
  },

  versusAlternative: {
    heading: "Google Cloud vs AWS / Azure — Which to Pick in Pune?",
    paragraphs: [
      "GCP vs AWS vs Azure depends on which Pune companies you want to work for. AWS dominates Pune product engineering broadly. Azure dominates Pune captives and BFSI. GCP dominates Pune analytics specifically — Tiger Analytics, Fractal, ZS, MathCo, plus the data-engineering arms of Persistent and BMW TechWorks autonomous-driving teams.",
      "Choose GCP if your goal is Pune analytics-engineering roles, data-platform startups, or you specifically want BigQuery + Vertex AI depth. Choose AWS if your goal is product engineering / startups / breadth. Choose Azure if your goal is captives / .NET / Microsoft ecosystem.",
      "Honest recommendation: GCP is a smaller market in Pune than AWS / Azure but pays well per role and has thinner competition. Pick GCP if you have a specific analytics target. Most senior cloud engineers eventually know all three at a working level.",
    ],
  },

  prerequisitesAndStart: {
    paragraphs: [
      "Prerequisites: basic Linux command line, basic Python or Bash scripting, comfort with at least one programming language at a junior level. You do NOT need prior cloud experience — we start from creating a GCP account in week 1.",
    ],
    suggestedSteps: [
      "Decide your mode — classroom in Kothrud, online live, or weekend",
      "Check the upcoming batch dates",
      "Book a free 30-minute counselling call",
      "Confirm enrolment and complete pre-course orientation (gcloud install, GCP free trial)",
      "Show up to day one with a laptop running 64-bit OS and a credit card for GCP free-trial signup",
    ],
  },

  faqs: [
    {
      question: "How long does GCP training in Pune take at Archer Infotech?",
      answer:
        "Approximately 2.5 months — 10 weeks of structured curriculum plus 2 weeks of capstone and interview preparation. The weekend batch stretches over ~4 months at the same content depth.",
    },
    {
      question: "What is the salary of a GCP Cloud Engineer in Pune?",
      answer:
        "Indeed Pune reports an average of ₹7.80 lakh per year for GCP Cloud Engineer (May 2026). Mid-level GCP Solutions Architects (3–6 years) earn ₹14–22 lakh per Glassdoor. Senior GCP Architects / Data Engineers earn ₹26–45 lakh nationally with Pune trending within ±10%.",
    },
    {
      question: "GCP or AWS or Azure?",
      answer:
        "GCP for Pune analytics (Tiger / Fractal / ZS / MathCo). AWS for Pune product engineering / SaaS / fintech (Persistent, BMC, startups). Azure for Pune captives / .NET / Microsoft ecosystem. The right answer depends on which Pune companies you want to work for.",
    },
    {
      question: "Will I work on real projects?",
      answer:
        "Yes — three capstone projects: (1) three-tier architecture with Terraform, (2) data analytics pipeline with BigQuery + Cloud Composer, (3) Vertex AI RAG service with Gemini.",
    },
    {
      question: "Is BigQuery covered in depth?",
      answer:
        "Yes — weeks 5–6 include a full module on BigQuery (partitions, clustering, query optimisation, BigLake federated queries, BigQuery ML). BigQuery is the GCP differentiator and the reason most Pune analytics teams are on GCP.",
    },
    {
      question: "Is Vertex AI / Gemini covered?",
      answer:
        "Yes — week 9 is dedicated to Vertex AI Workbench, Pipelines, Model Garden, Vector Search, Agent Builder, and Gemini 2.5 Pro on Vertex AI. Capstone Project #3 is a Vertex AI RAG service.",
    },
    {
      question: "Are weekend GCP classes available in Pune?",
      answer:
        "Yes — Saturday and Sunday, 09:00–13:00, stretched over ~4 months instead of 2.5.",
    },
    {
      question: "What is the fee for the GCP course in Pune?",
      answer:
        "Course fees range from ₹20,000 to ₹90,000 depending on mode and concession. GCP free-trial credits ($300) cover lab work for most students.",
    },
    {
      question: "How is this different from your GCP Associate Cloud Engineer course?",
      answer:
        "This GCP Training programme is the foundation cloud-engineer course — 2.5 months of hands-on GCP engineering with broad service coverage. The GCP Associate Cloud Engineer course is a separate exam-focused track for candidates who already have GCP experience and want concentrated certification prep.",
    },
    {
      question: "What support do I get after course completion?",
      answer:
        "Six months of active placement support, referrals via our alumni network, mock interviews, and salary negotiation coaching.",
    },
  ],

  finalCta: {
    heading: "Ready to start GCP training in Pune?",
    paragraph:
      "We have classroom, online, and weekend batches starting every 4–6 weeks. Reach out via the enquiry form or call us — Vinod and Yogesh are happy to spend 30 minutes telling you whether the course fits your goal.",
  },
};
