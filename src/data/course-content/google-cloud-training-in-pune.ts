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
        "Cloud computing models, Google Cloud's global infrastructure (Regions, Zones, Edge points of presence and the private backbone), and the resource hierarchy — Organisation, Folders, Projects, Resources — which is the structure that IAM, billing and policy all inherit from.\n\nEvery student finishes week 1 with a project, billing configured against free-trial credit, budget alerts wired up, and both the `gcloud` CLI and Cloud Shell working. Cost gets a dedicated session up front, because an idle GKE cluster will consume trial credit faster than anything else in this course.",
      topics: [
        "Cloud computing models — IaaS / PaaS / SaaS",
        "GCP global infrastructure — Regions, Zones, Edge",
        "Organisation, Folders, Projects, Resources",
        "Project setup, billing accounts and free-trial credits",
        "Budget alerts, quotas and cost controls",
        "gcloud CLI, configurations and named profiles",
        "Cloud Shell and the Cloud Console",
        "APIs and service enablement",
      ],
    },
    {
      title: "IAM, Service Accounts & Resource Hierarchy",
      weekRange: "Week 2",
      description:
        "Google Cloud IAM is structurally different from AWS and Azure, and the difference is where most cross-cloud engineers make mistakes. Principals, roles (basic, predefined, custom) and the allow-policy model; how policies inherit down the resource hierarchy and why a grant at folder level is rarely what someone intended.\n\nService accounts get extended treatment — impersonation, key-free authentication, and Workload Identity Federation for CI/CD and for GKE pods. Organisation policy constraints and the principle of least privilege close the module.",
      topics: [
        "IAM principals and role types — basic, predefined, custom",
        "Allow policies and inheritance down the hierarchy",
        "Service accounts and impersonation",
        "Workload Identity Federation for CI/CD",
        "Avoiding service-account keys entirely",
        "Organisation policy constraints",
        "IAM Recommender and least-privilege tightening",
        "Audit logging — admin, data access, system events",
      ],
    },
    {
      title: "VPC Networking & Cloud Load Balancing",
      weekRange: "Week 3",
      description:
        "Google Cloud's VPC is global rather than regional, which changes network design in ways worth understanding explicitly. Auto-mode versus custom-mode VPCs, subnets and secondary ranges for GKE, firewall rules with network tags and service accounts as targets, and Cloud NAT with Cloud Router for private egress.\n\nCloud Load Balancing is taught by tier and protocol — global external HTTP(S) with Cloud CDN, regional internal, and the proxy versus passthrough distinction. Shared VPC, VPC Peering, Private Service Connect and Cloud DNS complete the module.",
      topics: [
        "Auto-mode vs custom-mode VPC and global design",
        "Subnets, secondary ranges and IP planning for GKE",
        "Firewall rules, network tags and service-account targets",
        "Cloud NAT and Cloud Router",
        "Global external HTTP(S) load balancing and Cloud CDN",
        "Internal and passthrough load balancers",
        "Shared VPC and VPC Peering",
        "Private Service Connect and Private Google Access",
        "Cloud DNS — public and private zones",
      ],
    },
    {
      title: "Compute Engine & Managed Instance Groups",
      weekRange: "Week 4",
      description:
        "The VM layer. Machine families and custom machine types (a genuine Google Cloud advantage worth knowing how to price), persistent disk types, images and snapshots, startup scripts and metadata, plus OS Login for SSH access governed by IAM rather than by keys scattered across a team.\n\nSpot and preemptible instances follow, then Managed Instance Groups — instance templates, autohealing with health checks, regional distribution, rolling updates and autoscaling — ending with a service that survives deliberate instance deletion.",
      topics: [
        "Machine families, custom machine types and sizing",
        "Persistent disk types and performance scaling",
        "Images, snapshots and machine images",
        "Startup scripts, metadata and OS Login",
        "Spot and preemptible instances",
        "Instance templates and Managed Instance Groups",
        "Autohealing, health checks and regional MIGs",
        "Rolling updates and canary instance groups",
        "Committed use discounts and sustained use",
      ],
    },
    {
      title: "GKE — Autopilot & Standard Mode",
      weekRange: "Week 5",
      description:
        "Google Kubernetes Engine, taught with Autopilot as the 2026 default and Standard mode as the escape hatch when you need node-level control. Cluster creation, VPC-native networking with the secondary ranges planned in week 3, node pools, and cluster autoscaling.\n\nThe GKE-specific material is the point of the module: Workload Identity for pod-level IAM without keys, Ingress and Gateway API with Google Cloud load balancers, Config Connector, and the operational differences that make an Autopilot cluster cheaper to run but harder to customise.",
      topics: [
        "GKE Autopilot vs Standard — cost and control trade-offs",
        "VPC-native clusters and secondary IP ranges",
        "Node pools, spot node pools and autoscaling",
        "Workload Identity for pod-level IAM",
        "Ingress, Gateway API and GCP load-balancer integration",
        "Artifact Registry integration and image pulls",
        "Cluster upgrades, release channels and maintenance windows",
        "Binary Authorization for deploy-time policy",
      ],
    },
    {
      title: "Cloud Run, Cloud Functions & Serverless",
      weekRange: "Week 6",
      description:
        "Serverless on Google Cloud, which is the platform's strongest differentiator for small teams. Cloud Run for containers — concurrency (which is genuinely different from Lambda's model), scale-to-zero, minimum instances for latency, revisions and traffic splitting for canary releases, and VPC connectors for private backend access.\n\nCloud Run Jobs handle batch work, Cloud Functions covers event-driven glue, and Eventarc plus Pub/Sub provide the event backbone. The lab compares the same workload deployed to Cloud Run and to GKE on cost and latency.",
      topics: [
        "Cloud Run — the concurrency model and why it matters",
        "Scale-to-zero, minimum instances and cold starts",
        "Revisions, traffic splitting and canary releases",
        "VPC connectors and private egress",
        "Cloud Run Jobs for batch workloads",
        "Cloud Functions — triggers and runtimes",
        "Eventarc and Pub/Sub as the event backbone",
        "Comparing Cloud Run against GKE on cost and latency",
      ],
    },
    {
      title: "Cloud Storage, Filestore & Data Lifecycle",
      weekRange: "Week 6",
      description:
        "Cloud Storage in depth — buckets, the four storage classes and the retrieval and early-deletion charges that make Archive cheap only under the right access pattern, lifecycle rules, object versioning, retention policies and Bucket Lock.\n\nAccess control gets a full session because it is the most common source of accidental public exposure: uniform bucket-level access versus fine-grained ACLs, signed URLs, and public-access prevention. Customer-managed encryption keys, Filestore and Persistent Disk round out the module.",
      topics: [
        "Buckets, locations and storage classes",
        "Retrieval and early-deletion cost trade-offs",
        "Lifecycle rules and Autoclass",
        "Object versioning, retention policies and Bucket Lock",
        "Uniform bucket-level access vs fine-grained ACLs",
        "Signed URLs and public-access prevention",
        "Customer-managed and customer-supplied encryption keys",
        "Storage Transfer Service and gsutil / gcloud storage",
        "Filestore for shared POSIX filesystems",
      ],
    },
    {
      title: "Databases — Cloud SQL, Spanner, Firestore & Memorystore",
      weekRange: "Week 7",
      description:
        "The managed database estate. Cloud SQL for PostgreSQL, MySQL and SQL Server — high availability, read replicas, automated backups and point-in-time recovery, private IP and the Cloud SQL Auth Proxy.\n\nCloud Spanner is taught for what makes it distinctive — horizontal scale with strong consistency, and the interleaving and primary-key design that avoid hotspots. Firestore covers document modelling and its query constraints, and Memorystore provides managed Redis for the caching patterns used earlier in the course.",
      topics: [
        "Cloud SQL — PostgreSQL, MySQL, SQL Server",
        "High availability, read replicas and failover",
        "Backups, point-in-time recovery and maintenance windows",
        "Private IP and the Cloud SQL Auth Proxy",
        "Cloud Spanner — horizontal scale with strong consistency",
        "Spanner primary-key design and hotspot avoidance",
        "Firestore document modelling and query constraints",
        "Memorystore for Redis",
        "Choosing between the four under a stated workload",
      ],
    },
    {
      title: "BigQuery — Modelling, Partitioning & Optimisation",
      weekRange: "Week 8",
      description:
        "BigQuery is the service that most often decides whether a Pune GCP candidate stands out, so it gets a full module rather than a passing mention. The separation of storage and compute, on-demand versus capacity pricing, and why an unoptimised query is a billing event rather than merely a slow one.\n\nPartitioning and clustering, table design, nested and repeated fields, materialised views, scheduled queries, and reading the query execution plan to find the expensive stage. External and BigLake tables, and BigQuery ML for in-warehouse models, close the module.",
      topics: [
        "Storage and compute separation, slots and reservations",
        "On-demand vs capacity pricing and cost control",
        "Partitioning and clustering strategy",
        "Nested and repeated fields in table design",
        "Reading the query execution plan",
        "Query optimisation and avoiding full scans",
        "Materialised views and scheduled queries",
        "External tables and BigLake federated queries",
        "BigQuery ML basics",
      ],
    },
    {
      title: "Infrastructure as Code — Terraform on Google Cloud",
      weekRange: "Week 9",
      description:
        "Provisioning everything built so far from code. Terraform 1.7+ with the `google` and `google-beta` providers, remote state in a GCS bucket with locking, modules, and workspaces for environment separation.\n\nGoogle-specific practice follows: the Cloud Foundation Toolkit modules, project-factory patterns for organisations that create projects continuously, and importing resources created through the console. `terraform plan` is treated as a review artefact, and drift detection is run against a deliberately hand-modified resource.",
      topics: [
        "google and google-beta providers",
        "Remote state in GCS with locking",
        "Modules, workspaces and environment separation",
        "Cloud Foundation Toolkit modules",
        "Project-factory patterns for organisations",
        "Importing console-created resources",
        "terraform plan as a code-review artefact",
        "Drift detection and remediation",
      ],
    },
    {
      title: "CI/CD — Cloud Build, Artifact Registry & Deployment",
      weekRange: "Week 9",
      description:
        "Delivery pipelines on Google Cloud. Cloud Build triggers, build configuration, substitutions, private pools and build-time secrets from Secret Manager; Artifact Registry for container images and language packages, with vulnerability scanning enabled.\n\nGitHub Actions using Workload Identity Federation covers the keyless external pattern. Cloud Deploy handles progressive delivery through dev, staging and production targets, and the module ends with rollout, approval and rollback wired into the Cloud Run and GKE services built earlier.",
      topics: [
        "Cloud Build triggers, steps and substitutions",
        "Private pools and VPC-connected builds",
        "Secret Manager in build and runtime",
        "Artifact Registry and vulnerability scanning",
        "GitHub Actions with Workload Identity Federation",
        "Cloud Deploy delivery pipelines and targets",
        "Progressive rollouts, approvals and rollback",
        "Binary Authorization gates in the pipeline",
      ],
    },
    {
      title: "Observability — Cloud Logging, Monitoring & Trace",
      weekRange: "Week 10",
      description:
        "Google Cloud's operations suite. Cloud Logging with log buckets, sinks and exclusion filters (the lever that controls logging cost), the Logs Explorer query language, and log-based metrics that turn a log pattern into an alertable signal.\n\nCloud Monitoring covers metrics, uptime checks, dashboards, alerting policies and notification channels, plus SLO monitoring with error budgets. Cloud Trace, Cloud Profiler, OpenTelemetry instrumentation and Managed Service for Prometheus complete the module.",
      topics: [
        "Cloud Logging — buckets, sinks, exclusion filters",
        "Logs Explorer queries and log-based metrics",
        "Controlling logging cost at scale",
        "Cloud Monitoring metrics and uptime checks",
        "Alerting policies and notification channels",
        "SLO monitoring and error budgets",
        "Cloud Trace and Cloud Profiler",
        "OpenTelemetry instrumentation",
        "Managed Service for Prometheus",
      ],
    },
    {
      title: "Security, Cost Control & Architecture Review",
      weekRange: "Week 10",
      description:
        "Security consolidated across the whole estate. Cloud KMS with key rings, rotation and CMEK applied to storage and databases; Secret Manager versioning and access; Cloud Armor for WAF and DDoS; VPC Service Controls for data-exfiltration perimeters; and Security Command Centre findings.\n\nThe cost half covers billing export to BigQuery, label-based cost allocation, committed use discounts, and the standard waste list. Each student then reviews their capstone against the Google Cloud Architecture Framework pillars.",
      topics: [
        "Cloud KMS, key rings, rotation and CMEK",
        "Secret Manager versioning and access control",
        "Cloud Armor — WAF rules and DDoS protection",
        "VPC Service Controls and data-exfiltration perimeters",
        "Security Command Centre findings and posture",
        "Billing export to BigQuery and cost analysis",
        "Labels, cost allocation and committed use discounts",
        "Google Cloud Architecture Framework pillars",
      ],
    },
    {
      title: "Vertex AI & Generative AI on Google Cloud",
      weekRange: "Week 11",
      description:
        "Google Cloud's AI platform, which is a frequent differentiator in Pune GCP interviews. Vertex AI Workbench for managed notebooks, Model Registry and endpoints for serving, and Vertex AI Pipelines for repeatable training workflows.\n\nThe generative half covers Model Garden including Gemini and open-weight models, grounding and Vertex AI Search for managed retrieval-augmented generation, Agent Builder for tool-using assistants, and embeddings with vector search. The lab ships a small grounded RAG service end to end.",
      topics: [
        "Vertex AI Workbench for managed notebooks",
        "Model Registry, endpoints and online prediction",
        "Vertex AI Pipelines for repeatable training",
        "Model Garden — Gemini and open-weight models",
        "Vertex AI Search for managed RAG",
        "Grounding, citations and safety settings",
        "Embeddings and vector search",
        "Vertex AI Agent Builder",
        "Cost and latency trade-offs across models",
      ],
    },
    {
      title: "Capstone Project & Interview Preparation",
      weekRange: "Weeks 11–12 + placement prep",
      description:
        "Full-time capstone work followed by structured interview preparation. You build a complete Google Cloud system — Terraform-provisioned infrastructure, a Cloud Run or GKE workload, a Cloud Build pipeline, BigQuery analytics, and monitoring with an alerting policy — documented well enough that a reviewer can deploy it themselves.\n\nInterview preparation is run as three rounds matching Pune GCP hiring: a BigQuery query-optimisation round, an architecture and scenario round, and a troubleshooting round. Resume, LinkedIn and GitHub polish included.",
      topics: [
        "Capstone implementation, deployment and README",
        "Architecture review against the Architecture Framework",
        "BigQuery query-optimisation mock round",
        "GCP architecture and scenario mock round",
        "Troubleshooting round — IAM, networking, deployment failures",
        "Associate Cloud Engineer exam-alignment overview",
        "Resume and LinkedIn rewrite",
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

  roadmapImage: {
    src: "/images/courses/google-cloud-path-v1.webp",
    width: 1400,
    height: 1064,
    alt: "Ten-stage Google Cloud Platform learning path taught at Archer Infotech Pune: GCP foundations covering the organisation, folder and project hierarchy plus billing; IAM covering roles, service accounts and Workload Identity Federation; networking covering global VPC, firewall rules, Cloud NAT and load balancing; Compute Engine covering machine types and managed instance groups; GKE covering Autopilot, Standard mode and Workload Identity; serverless covering Cloud Run, Cloud Run Jobs and Cloud Functions; storage and databases covering Cloud Storage, Cloud SQL, Spanner and Firestore; BigQuery covering partitioning, clustering and query optimisation; Terraform, Cloud Build and observability covering Cloud Logging, Monitoring and Trace; and Vertex AI covering Gemini, managed RAG and the capstone project.",
    caption:
      "The order this course is taught in. Each stage expands into the modules below — nothing arrives before its prerequisite.",
  },

  syllabusDownload: {
    pdfUrl: "/downloads/google-cloud-platform-syllabus-v1.pdf",
    title: "Google Cloud Platform Course Syllabus — Complete Module List",
    slug: "google-cloud-platform-syllabus",
    blurb:
      "The complete sixteen-module syllabus as a PDF — GCP foundations and the resource hierarchy, IAM and Workload Identity Federation, global VPC networking, Compute Engine, GKE Autopilot and Standard, Cloud Run and serverless, Cloud Storage, managed databases, BigQuery optimisation, Terraform, Cloud Build and Cloud Deploy, the operations suite, security and cost control, Vertex AI and generative AI, and the capstone. Everything in it is on this page; the PDF is the portable version.",
    asideBlocks: [
      {
        heading: "What is inside the PDF",
        items: [
          "All sixteen modules in teaching order, week by week across the two-and-a-half-month programme.",
          "BigQuery given a full module — partitioning, clustering, execution plans and the cost control that on-demand pricing demands.",
          "The keyless authentication path end to end: service-account impersonation, Workload Identity Federation for CI/CD, and Workload Identity for GKE pods.",
          "The Vertex AI track including Model Garden, grounding, managed RAG and Agent Builder.",
        ],
      },
      {
        heading: "Roles this syllabus prepares you for",
        items: [
          "Google Cloud Engineer — provisioning, automating and operating GCP workloads.",
          "Associate Cloud Engineer — the certification this syllabus aligns to.",
          "Data-leaning Cloud Engineer — BigQuery, Dataflow and analytics platforms.",
          "DevOps Engineer (GCP) — pairing this stack with GKE and Cloud Build.",
        ],
      },
    ],
  },

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
