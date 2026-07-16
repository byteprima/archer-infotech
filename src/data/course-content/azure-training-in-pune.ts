import type { CourseRichContent } from "./types";

export const azureTrainingInPune: CourseRichContent = {
  intro:
    "Azure is the dominant cloud platform in Pune captive R&D, BFSI, and Microsoft-ecosystem product engineering — Mercedes-Benz R&D India, Cummins, John Deere ETC, Honeywell, BMW TechWorks (significant Azure footprint alongside AWS), Cognizant Pune Capital Markets, Bajaj Finserv, plus Microsoft's own Pune R&D centre run their primary workloads on it. Archer Infotech's Azure training in Pune teaches the platform as it is actually used in 2026 — Microsoft Entra ID for identity (the renamed Azure AD), VNet networking with private subnets and NAT, Azure Kubernetes Service (AKS) with Azure CNI, Azure Container Apps for serverless containers, Azure Functions for event-driven compute, Cosmos DB and Azure SQL for data, IaC via Bicep and Terraform, plus Azure OpenAI Service for the GenAI layer. The course doubles as preparation for the Azure Administrator Associate (AZ-104) certification. Classroom in Kothrud, online live, and weekend batches available.",

  whyLearn: {
    heading: "Why Learn Azure in 2026",
    paragraphs: [
      "Azure holds roughly 25% of the global cloud infrastructure market (Synergy Research, Q1 2026), second only to AWS at 31% — and significantly larger in Indian enterprise / captive segments. In Pune specifically, Azure dominates the captive R&D centres (Mercedes-Benz, Cummins, John Deere ETC, Honeywell, plus large parts of BMW TechWorks), Cognizant Pune Capital Markets, the .NET ecosystem broadly, and Microsoft's own Pune R&D. Indeed Pune lists more than 1,100 active Azure-related roles as of May 2026 across Cloud Engineer, Cloud Administrator, DevOps Engineer, Solutions Architect, and Cloud Developer titles. Azure compensation tracks AWS within ±10% at every band; the talent supply is thinner in Pune for Azure specifically, which often favours Azure-fluent candidates at offer time.",
      "What changed in 2026: Azure AD has been renamed to Microsoft Entra ID (the broader identity platform), Bicep has eclipsed ARM templates as the IaC choice for new Azure-native projects (Terraform remains dominant for multi-cloud), AKS has matured significantly with Azure CNI as default networking and the new AKS Automatic mode for managed clusters, Azure Container Apps has become the default serverless-container choice replacing the older Azure Container Instances, and Azure OpenAI Service has become a standard part of new Azure architectures (with Microsoft's exclusive frontier-model relationship still a meaningful differentiator). The AZ-104 (Azure Administrator Associate) exam was refreshed to weight Entra ID, AKS, and observability questions more heavily.",
      "What this means for hiring: 2026 Pune Azure JDs expect Bicep or Terraform on top of portal basics, container experience (AKS or Container Apps), one observability stack (Azure Monitor + Application Insights, or Prometheus + Grafana), Entra ID fluency, and at least one production deployment story. Senior roles add multi-region design, FinOps (Azure Cost Management), and Azure OpenAI integration. Archer Infotech's curriculum is rebuilt around exactly these expectations — modern Azure, IaC by default, certification-ready.",
    ],
    keyPoints: [
      "Azure = 25% global cloud share — strongest in Pune captive / BFSI / .NET",
      "1,100+ active Azure roles on Indeed Pune as of May 2026",
      "Bicep + AKS + Container Apps + Functions — the modern Azure stack",
      "Microsoft Entra ID (renamed Azure AD) for identity",
      "Azure OpenAI Service — the GenAI layer Microsoft uniquely owns",
      "Certification path — AZ-104 (Administrator Associate) included in curriculum",
    ],
  },

  whoIsThisFor: {
    forYou: [
      "Engineering, BCS, MCA, or BSc-CS student looking to enter cloud roles in Pune captive / BFSI / .NET ecosystem",
      "Working .NET or Microsoft-stack developer wanting to add cloud architecture to your skill stack",
      "System or network administrator transitioning into cloud engineering",
      "Java or Python backend developer at a Pune captive (Mercedes-Benz, Cummins, John Deere) where Azure is the institutional default",
      "Working Azure portal / click-ops developer wanting to graduate to Bicep / Terraform IaC",
      "Career restarter targeting cloud engineering as a high-demand re-entry path",
    ],
    notForYou: [
      "If you have no programming or scripting background — at least basic Python or PowerShell is required to follow the IaC and Functions modules",
      "If you want a 30-day cert-only crash course — we run a separate exam-prep track; this 3-month programme is hands-on engineering, not exam tricks",
      "If you cannot put in 8–10 hours per week of lab work outside class — Azure is learned by clicking, breaking, and rebuilding",
      "If your only goal is a single certificate sticker with no project work — Pune cloud hiring screens on hands-on portfolio, not just badges",
      "If you specifically target Pune SaaS / fintech startups — those skew AWS far more than Azure; pick our AWS course",
      "If you already hold AZ-305 (Solutions Architect Expert) or have 4+ years of production Azure — talk to us about advanced specialisations",
    ],
  },

  curriculum: [
    {
      title: "Cloud Foundations & Azure Subscription Setup",
      weekRange: "Week 1",
      description:
        "Cloud computing concepts (IaaS / PaaS / SaaS, on-prem vs cloud trade-offs, shared responsibility model), the Azure global infrastructure (Regions, Region Pairs, Availability Zones, Edge Zones), management hierarchy (Tenant → Management Groups → Subscriptions → Resource Groups), subscription creation, billing alarms, the Azure Free Tier, and Microsoft Entra ID basics. By the end of week 1 every student has a personal Azure sandbox subscription, MFA enabled, a budget alarm at ₹1,000, and an Entra ID user with role assignments set. We deliberately spend a full session on cost — every horror story you have heard about a runaway Azure bill starts with what we cover this week.",
      topics: [
        "Cloud computing models — IaaS / PaaS / SaaS",
        "Azure global infrastructure — Regions, AZs, Edge",
        "Management Groups, Subscriptions, Resource Groups",
        "Subscription setup and MFA",
        "Cost Management, Budgets, Cost Alerts",
        "Azure Free Tier — what's free and for how long",
        "Azure CLI and Azure PowerShell setup",
        "Azure Portal vs CLI — when each fits",
      ],
    },
    {
      title: "Microsoft Entra ID, RBAC & Security Baseline",
      weekRange: "Week 2",
      description:
        "Identity is the foundation of cloud security. Cover Microsoft Entra ID (the renamed Azure AD), users / groups / dynamic groups, application registrations and service principals, managed identities (system-assigned and user-assigned — the recommended pattern for modern apps), RBAC roles (built-in and custom), Conditional Access policies for MFA / location / device checks, plus Privileged Identity Management for just-in-time elevation. We finish by hardening the sandbox subscription using Microsoft Defender for Cloud baseline and the CIS Benchmark for Azure.",
      topics: [
        "Entra ID users, groups, dynamic groups",
        "App registrations and service principals",
        "Managed identities — system-assigned and user-assigned",
        "RBAC — built-in roles, custom roles, scope hierarchy",
        "Conditional Access policies",
        "Privileged Identity Management (PIM)",
        "Microsoft Defender for Cloud baseline",
        "Azure Policy and CIS Benchmark for Azure",
      ],
    },
    {
      title: "Networking — VNet, Subnets, NSG, Connectivity",
      weekRange: "Week 3",
      description:
        "Cloud networking is where most certification candidates lose marks and most engineers lose production weekends. Build a VNet from scratch — public and private subnets, an Application Gateway, an Azure Firewall (for the path that goes via Firewall) or NAT Gateway (for the path that doesn't), Network Security Groups, route tables, plus DNS via Azure DNS / Private DNS Zones. Then VNet Peering, ExpressRoute basics, VPN Gateway, Azure Front Door, and Private Endpoints / Private Link for the modern private-traffic-to-PaaS pattern. By the end you can draw any small-to-medium Azure VNet on a whiteboard and defend every routing decision.",
      topics: [
        "VNet, subnets, address-space planning",
        "Application Gateway and Azure Load Balancer",
        "Azure Firewall vs NAT Gateway",
        "Network Security Groups and route tables",
        "Azure DNS and Private DNS Zones",
        "VNet Peering, VPN Gateway, ExpressRoute",
        "Private Endpoints and Private Link",
        "Azure Front Door for global routing",
      ],
    },
    {
      title: "Compute — VMs, App Service, Functions, Containers",
      weekRange: "Weeks 4–5",
      description:
        "The compute landscape on Azure in 2026 is broader than 'launch a VM'. Cover VM families and pricing (pay-as-you-go, reserved instances, savings plans, spot), VM Scale Sets + Application Gateway for resilient apps, image lifecycle and Azure Image Builder. Then PaaS — Azure App Service for traditional web apps (still huge in Pune .NET shops), Azure Functions for event-driven compute, Logic Apps for low-code workflows. Then containers — Azure Container Apps for serverless containers (the 2026 default for new microservices), and Azure Kubernetes Service (AKS) for full orchestration including the new AKS Automatic mode.",
      topics: [
        "VM families, sizes, pricing models",
        "VM Scale Sets and Application Gateway",
        "Azure Image Builder and shared image gallery",
        "Azure App Service — plans, slots, deployment",
        "Azure Functions — triggers, bindings, premium plan",
        "Logic Apps for workflow automation",
        "Azure Container Apps — the modern serverless container",
        "Azure Kubernetes Service basics — AKS Automatic, Azure CNI",
        "Container Registry (ACR) integration",
      ],
    },
    {
      title: "Storage & Databases",
      weekRange: "Week 6",
      description:
        "Storage and database services where Azure fees grow most quickly — and where bad decisions cause the most outages. Cover Storage Accounts in depth (Blob, File, Queue, Table — when each fits), Blob storage tiers (Hot / Cool / Cold / Archive), lifecycle management, soft delete, immutable storage, plus the Azure Data Lake Gen2 layer. Disks for VMs (Premium SSD v2, Ultra Disk). Then databases — Azure SQL Database (single, elastic pool, hyperscale, the default for .NET shops), Azure SQL Managed Instance for lift-and-shift from on-prem, Azure Database for PostgreSQL Flexible Server (the modern Postgres choice), Cosmos DB (NoSQL with multi-API support — SQL, Mongo, Cassandra), Azure Cache for Redis, Azure Search.",
      topics: [
        "Storage Accounts — Blob, File, Queue, Table",
        "Blob storage tiers and lifecycle",
        "Azure Data Lake Gen2",
        "Disk types — Premium SSD v2, Ultra Disk",
        "Azure SQL — single, elastic pool, hyperscale",
        "Azure SQL Managed Instance",
        "Azure Database for PostgreSQL Flexible Server",
        "Cosmos DB — partition design, RU/s, multi-API",
        "Azure Cache for Redis",
        "Azure AI Search basics",
      ],
    },
    {
      title: "DevOps on Azure — Bicep, Terraform, CI/CD, Observability",
      weekRange: "Weeks 7–8",
      description:
        "Modern Azure is code, not clicks. Build infrastructure with Bicep (the Azure-native IaC, the default for new Azure-only projects) — modules, parameters, outputs, deployment scopes, the dependency tree. Then Terraform 1.7+ with the AzureRM provider for multi-cloud teams. Wire CI/CD — Azure DevOps Pipelines (the dominant choice in Pune captives) and GitHub Actions deploying via OIDC federation (no static keys). Cover observability — Azure Monitor, Log Analytics, Application Insights (the Pune .NET shop default), KQL queries, metric and log alerts, plus a small Grafana + Prometheus stack on AKS for the cloud-native pattern.",
      topics: [
        "Bicep — modules, parameters, outputs, scopes",
        "Terraform 1.7+ with AzureRM provider",
        "ARM templates basics (legacy reading)",
        "Azure DevOps Pipelines — YAML, agents, environments",
        "GitHub Actions with OIDC federation",
        "Deployment slots and blue-green",
        "Azure Monitor and Log Analytics",
        "Application Insights instrumentation",
        "KQL queries — Kusto Query Language",
        "Alerts — metric, log, action groups",
      ],
    },
    {
      title: "Security, Encryption & Well-Architected Review",
      weekRange: "Week 9",
      description:
        "Security weighs heavily on the AZ-104 exam and on Pune Azure hiring panels. Cover Azure Key Vault (keys, secrets, certificates, integration with managed identities), Azure encryption — encryption at rest (Storage Service Encryption, customer-managed keys), encryption in transit (TLS, Azure Front Door / App Gateway termination), Azure WAF, Azure DDoS Protection, plus Microsoft Defender for Cloud across Defender for Servers / SQL / Storage / Containers / DevOps. The Microsoft Cloud Adoption Framework and Well-Architected Framework's five pillars (Reliability, Security, Cost Optimisation, Operational Excellence, Performance Efficiency). We finish by reviewing each student's capstone architecture against the Well-Architected lens.",
      topics: [
        "Azure Key Vault — keys, secrets, certificates",
        "Encryption at rest — Storage Service Encryption, CMK",
        "Encryption in transit — TLS, Front Door / App Gateway",
        "Azure WAF and DDoS Protection",
        "Microsoft Defender for Cloud",
        "Defender for Servers / SQL / Containers / DevOps",
        "Microsoft Cloud Adoption Framework",
        "Well-Architected Framework — five pillars",
      ],
    },
    {
      title: "Generative AI on Azure — Azure OpenAI Service",
      weekRange: "Week 10",
      description:
        "Pune cloud architects in 2026 are expected to design AI features — and Microsoft's exclusive frontier-model relationship makes Azure OpenAI Service uniquely powerful for enterprise teams. Cover Azure OpenAI Service (GPT-5, GPT-4.1, embeddings, Whisper, Sora — the Microsoft-exclusive model catalog), content filtering and Responsible AI, deployment models (standard, provisioned), Azure AI Search for managed RAG, and Microsoft's prompt-flow / Azure AI Studio for building AI applications. Plus Azure AI Foundry for the broader AI-application platform. Build a small RAG service — Blob Storage PDFs → Azure AI Search → Azure OpenAI Service → API endpoint — that demos in 5 minutes.",
      topics: [
        "Azure OpenAI Service — model catalog, deployment models",
        "Content filtering and Responsible AI",
        "Azure AI Search for managed RAG",
        "Azure AI Studio / AI Foundry overview",
        "Prompt flow for AI application orchestration",
        "Vector storage in Azure SQL / Cosmos / AI Search",
        "Cost and latency trade-offs across models",
      ],
    },
    {
      title: "Capstone Project & AZ-104 Exam Preparation",
      weekRange: "Weeks 11–12 + 2 weeks placement prep",
      description:
        "Two weeks of full-time capstone work plus structured Azure Administrator Associate (AZ-104) preparation. Pick one of three capstone architectures (see Capstone Projects). For exam prep we run question-bank drills, scenario walkthroughs, and two full-length mock exams under timed conditions — students typically score 75–85% on the second mock if they have done the lab work seriously. Mock interviews target Pune Azure hiring panels (Mercedes-Benz R&D, Cummins, John Deere, Honeywell, Cognizant Pune Capital Markets, Bajaj Finserv). Resume / LinkedIn / GitHub polish included.",
      topics: [
        "Capstone implementation, deployment, README",
        "Architecture review against Well-Architected pillars",
        "AZ-104 question-bank drills — 5 domains",
        "Two full-length timed mock exams",
        "Cloud-engineer interview prep — scenario design questions",
        "Resume + LinkedIn / GitHub polish",
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
      title: "Three-Tier Production Architecture with Bicep",
      description:
        "A complete production-style three-tier architecture provisioned by Bicep — VNet across two AZs, public Application Gateway with WAF, private VM Scale Set or Azure App Service application tier, Azure SQL Database with geo-replication, Azure Cache for Redis, Azure Front Door in front of static assets in Blob Storage with Azure CDN, Key Vault-managed certificates, plus Azure Monitor alerts feeding an action group. The full stack stands up in under 15 minutes from `az deployment group create` and tears down clean. Outcome: a public GitHub repository plus an architecture diagram you can talk through in any cloud interview.",
      technologies: [
        "Bicep + Azure CLI",
        "Azure VNet + Application Gateway + WAF",
        "Azure SQL Database with geo-replication",
        "Azure Cache for Redis",
        "Azure Front Door + Blob Storage + CDN",
        "Key Vault + Application Insights",
        "Azure DevOps Pipelines or GitHub Actions",
      ],
    },
    {
      title: "Serverless Event-Driven Application on Functions + Logic Apps",
      description:
        "Azure Functions (HTTP, Queue, Service Bus triggered) → Cosmos DB or Azure SQL, Service Bus topics for fan-out, Logic Apps orchestrating a multi-step workflow, Event Grid for event routing, plus Application Insights for distributed tracing. Microsoft Entra ID for user auth via App Registrations, and a small SPA frontend (Static Web Apps) consuming the Function endpoints. Includes a one-page architecture review against the Well-Architected serverless lens.",
      technologies: [
        "Azure Functions (Premium plan)",
        "Cosmos DB or Azure SQL",
        "Service Bus + Event Grid + Logic Apps",
        "Microsoft Entra ID auth",
        "Application Insights",
        "Azure Static Web Apps frontend",
        "Bicep deployment",
      ],
    },
    {
      title: "Containerised Microservices on AKS with Azure OpenAI RAG",
      description:
        "An AKS cluster (Azure CNI, AKS Automatic mode) running three microservices (frontend, API, worker) deployed via Helm, Application Gateway Ingress Controller, Azure AD Workload Identity for pod-level RBAC to Azure resources, plus Azure SQL with vector storage and Azure OpenAI Service powering a retrieval-augmented chat endpoint. Includes Prometheus + Grafana via Azure Managed Prometheus, distributed tracing via OpenTelemetry to Application Insights, and a GitHub Actions pipeline deploying via OIDC. Outcome: a 2026-relevant cloud-native + AI architecture that demos in 5 minutes.",
      technologies: [
        "Azure Kubernetes Service (AKS)",
        "Application Gateway Ingress Controller",
        "Helm charts",
        "Azure AD Workload Identity",
        "Azure SQL + vector storage",
        "Azure OpenAI Service + Azure AI Search",
        "Azure Managed Prometheus + Grafana",
        "GitHub Actions with OIDC",
      ],
    },
  ],

  trainersIntro:
    "Your batch is led by Yogesh Patil (Founder & Director, 15+ years, hands-on AWS / Azure architect) and Vinod Patil (Solutions Architect & AI Trainer, 12 years, AWS / Azure / GCP plus Azure OpenAI specialisation). Both personally take sessions — the names you see on this page are the names you meet on day one.",

  careerOutcomes: {
    paragraphs: [
      "Cloud Engineer and Azure Solutions Architect are among the highest-demand roles in Pune captive R&D and BFSI segments as of 2026 — Indeed Pune lists more than 1,100 active Azure-related openings, with Cloud Engineer salary tracking AWS within ±10%. The biggest Pune employers are Mercedes-Benz R&D India, Cummins, John Deere ETC, Honeywell, BMW TechWorks (substantial Azure footprint), Cognizant Pune Capital Markets, Bajaj Finserv, plus Microsoft's Pune R&D and the IT services majors with Azure practices (TCS, Infosys, Wipro, Cognizant, Capgemini).",
      "What pulls a cloud engineer above the median band in Azure: a public GitHub portfolio with at least one Bicep-deployed three-tier architecture, demonstrable container experience (AKS or Container Apps), one observability stack you can defend, the AZ-104 certificate, and ideally one Azure OpenAI integration project. Our capstone projects and certification track are designed exactly around these signals.",
      "Senior Cloud Architect bands are reported as national figures (Pune-specific Indeed pages do not exist for those roles); Pune trends within ±10% of these figures based on AmbitionBox and 6figr aggregations.",
    ],
    salaryBands: [
      {
        role: "Azure Cloud Engineer (Pune)",
        band: "₹6,90,000 per year average",
        source: {
          label: "Indeed Pune (Azure Cloud Engineer)",
          url: "https://in.indeed.com/career/cloud-engineer/salaries/Pune--Maharashtra",
        },
      },
      {
        role: "Cloud Engineer entry-level (<3 years, Pune)",
        band: "₹4,50,000 – ₹6,50,000 per year",
        source: {
          label: "AmbitionBox Pune Cloud Engineer",
          url: "https://www.ambitionbox.com/profile/cloud-engineer-salary-in-pune",
        },
      },
      {
        role: "Azure Solutions Architect (Pune mid-level, 3–6 years)",
        band: "₹12,00,000 – ₹19,00,000 per year",
        source: {
          label: "Glassdoor Pune Azure Solutions Architect",
          url: "https://www.glassdoor.co.in/Salaries/pune-azure-solutions-architect-salary-SRCH_IL.0,4_IM1072_KO5,30.htm",
        },
      },
      {
        role: "Senior Cloud Architect (national, 7–10 years)",
        band: "₹22,00,000 – ₹40,00,000 per year",
        source: {
          label: "6figr India Cloud Architect (national, Pune ±10%)",
          url: "https://6figr.com/in/salary/cloud-architect--t",
        },
      },
      {
        role: "Lead / Principal Cloud Engineer (national)",
        band: "₹35,00,000 – ₹60,00,000 per year",
        source: {
          label: "Industry aggregation 2026 (Pune ±10%)",
          url: "https://www.payscale.com/research/IN/Job=Cloud_Architect/Salary",
        },
      },
    ],
    hiringCompanies: [
      "Mercedes-Benz R&D India",
      "Cummins India",
      "John Deere ETC",
      "Honeywell",
      "BMW TechWorks India",
      "Cognizant Pune Capital Markets",
      "Bajaj Finserv",
      "Microsoft (Pune R&D)",
      "Synechron",
      "Mphasis",
      "Capgemini",
      "TCS",
      "Infosys",
      "Wipro",
      "Atos / Eviden",
      "Persistent Systems",
    ],
    rolesAfterCourse: [
      "Azure Cloud Engineer",
      "Azure Cloud Administrator",
      "Cloud Developer (Azure)",
      "DevOps Engineer (Azure-focused)",
      "Site Reliability Engineer",
      "Junior Solutions Architect",
      "Cloud Support Engineer",
    ],
  },

  modesAndDuration: {
    duration:
      "3 months of structured curriculum (12 weeks) plus 2 weeks of capstone project work and AZ-104 / interview preparation",
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
        "Same hours as classroom batches — morning or evening",
        "Recordings available for review",
        "Same lab reviews and project feedback as in-person batches",
      ],
      tools: [
        "Zoom for live sessions",
        "Personal Azure sandbox subscription per student",
        "GitHub for code and Bicep / Terraform reviews",
        "Slack / WhatsApp for asynchronous Q&A",
      ],
    },
    weekend: {
      timing: ["Saturday + Sunday, 09:00 to 13:00"],
      durationNote:
        "Stretches over 5 months instead of 3 to accommodate working professionals. Same content, lower weekly load.",
    },
    batchPolicy:
      "Maximum 15 students per batch — small enough that the trainer reviews every student's Bicep code and architecture diagrams personally. Classroom batches start every 4 weeks; weekend batches every 6 weeks.",
  },

  fees: {
    note:
      "Course fees range from ₹20,000 to ₹90,000 depending on mode (classroom / online / weekend), batch type, and any applicable concession. Kindly reach us for the current 2026 quote — we calibrate by early-bird timing, group enrolment, and returning-alumni concessions. The AZ-104 exam voucher (USD ~165 / ~₹14,000) is paid directly to Microsoft by the student and is not part of our fee.",
    range:
      "₹20,000 – ₹90,000 — the higher end covers placement-track classroom batches with full AZ-104 mock-exam track, Azure OpenAI module, and extended interview prep; the lower end covers concession-eligible online or weekend formats.",
    paymentOptions: [
      "Single payment with early-bird discount",
      "EMI in 2–3 instalments at no extra cost",
      "Corporate sponsorship — invoiced to your employer with GST",
    ],
  },

  placementSupport: {
    paragraphs: [
      "Placement support starts from week 8 of the course, not at the end. By the time you finish the curriculum, your resume highlights real Bicep and AKS work, your GitHub has a deployable three-tier reference architecture, and you have completed at least three mock technical interviews against question banks from Pune cloud-hiring teams.",
      "We say placement support, not placement guarantee — for two honest reasons. First, no institute can guarantee a hire when the final decision is the company's. Second, the institutes that do guarantee tend to bury the conditions in fine print. Our support is unconditional, time-bound (six months after course completion), and includes free re-entry to a future batch's interview-prep sessions if your first round of interviews does not land.",
    ],
    process: [
      "Week 8 — resume and LinkedIn rewrite, calibrated for Azure cloud-engineer JDs",
      "Week 9 — GitHub portfolio cleanup, Bicep README polish, architecture diagrams",
      "Weeks 10–11 — AZ-104 mock exams + scenario-design interview drills",
      "Weeks 11–12 — three rounds of mock technical interviews",
      "Week 12 — HR mock interview and salary negotiation coaching",
      "Post-course — referrals via our 17-year alumni network at 12+ partner companies, with extra emphasis on Pune captives and BFSI",
      "Up to 6 months of continued support after course end",
      "Free re-entry to future batch interview-prep sessions if first round does not land",
    ],
    partnerCompanies: [
      "Mercedes-Benz R&D India",
      "Cummins",
      "John Deere ETC",
      "Honeywell",
      "BMW TechWorks India",
      "Cognizant Pune Capital Markets",
      "Bajaj Finserv",
      "Synechron",
      "Capgemini",
      "TCS",
      "Infosys",
      "Atos / Eviden",
    ],
  },

  comparison: {
    intro:
      "We compare ourselves against typical Pune Azure training institutes on factual rows only — no logos, no opinions. Use this as a checklist when evaluating any institute.",
    rows: [
      {
        feature: "Trainers named on course page with photos and LinkedIn",
        archer: "Yes — Yogesh Patil and Vinod Patil",
        typical: "No — generic 'expert trainers' branding",
      },
      {
        feature: "Personal Azure sandbox subscription per student",
        archer: "Yes — provisioned in week 1, used through capstone",
        typical: "Shared institute account or screen-share only",
      },
      {
        feature: "Infrastructure as Code coverage",
        archer: "Bicep AND Terraform 1.7+ — both, hands-on",
        typical: "Portal click-through only, or ARM templates",
      },
      {
        feature: "Container coverage on Azure",
        archer: "Container Apps AND AKS hands-on (with AKS Automatic)",
        typical: "Theoretical container slides only",
      },
      {
        feature: "Generative AI on Azure",
        archer: "Azure OpenAI Service + AI Search RAG project",
        typical: "Not covered, or marketing-only mention",
      },
      {
        feature: "AZ-104 certification preparation",
        archer: "Two full-length timed mock exams + scenario drills",
        typical: "Topic list with no timed practice",
      },
      {
        feature: "Identity coverage",
        archer: "Microsoft Entra ID, managed identities, Conditional Access, PIM",
        typical: "Old Azure AD basics only",
      },
      {
        feature: "Public GitHub portfolio output",
        archer: "Yes — Bicep repos, architecture diagrams, READMEs",
        typical: "Rare",
      },
      {
        feature: "Salary data shown",
        archer: "Cited from Indeed Pune + AmbitionBox + Glassdoor + 6figr with source URLs",
        typical: "Single number with no source",
      },
      {
        feature: "Course fee transparency",
        archer: "₹20,000 – ₹90,000 published range with mode breakdown",
        typical: "Hidden behind enquiry form",
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
      "Compare with whoever you are considering — we welcome the comparison. The right test is whether you can see actual student Bicep repos and named trainers before you pay.",
  },

  versusAlternative: {
    heading: "Azure vs AWS — Which Should You Learn First in Pune?",
    paragraphs: [
      "Azure vs AWS is the most-asked question in Pune cloud counselling. The honest answer: it depends on which Pune companies you want to work for. AWS dominates Pune product engineering (Persistent, BMC, Synechron, BMW TechWorks for some teams, Mastercard Pune Tech Hub, most fintechs and SaaS companies). Azure dominates Pune captive R&D (Mercedes-Benz, Cummins, John Deere ETC, Honeywell, BMW TechWorks for other teams), Cognizant Pune Capital Markets, the .NET ecosystem broadly, and Microsoft's own Pune R&D.",
      "On raw market share AWS leads at roughly 31% globally vs Azure 25% (Synergy Q1 2026); in India the gap is wider in startups and product, narrower or even reversed in enterprise. On Indeed Pune the AWS listing count is around 1.4× Azure's. Both certifications carry similar weight on Pune resumes — AZ-104 (Administrator Associate) on Azure, SAA-C03 (Solutions Architect Associate) on AWS.",
      "Honest recommendation: pick Azure first if your goal is Pune captive R&D, BFSI, .NET ecosystem, Microsoft Pune, or Cognizant Capital Markets. Pick AWS first if your goal is product engineering, fintech / SaaS startups, or cloud-native development. Pune cloud engineers we have placed often add the second cloud as a side skill once placed — multi-cloud is increasingly expected at the senior level.",
    ],
  },

  prerequisitesAndStart: {
    paragraphs: [
      "Prerequisites: basic Linux command line OR PowerShell, basic Python or Bash scripting, and comfort with at least one programming language at a junior level. You do NOT need prior cloud experience — we start from creating an Azure subscription in week 1. If you have done our Java, Python, or .NET training (or equivalent), you are ready. Working professionals from on-prem sysadmin or .NET / Java backgrounds typically slot in well; pure non-developers should consider Azure Fundamentals (AZ-900) self-study before joining.",
    ],
    suggestedSteps: [
      "Decide your mode — classroom in Kothrud, online live, or weekend",
      "Check the upcoming batch dates on our batch schedule page",
      "Book a free 30-minute counselling call — we will honestly tell you whether the course fits your goal (we say no to roughly 10% of enquirers)",
      "Confirm enrolment and complete pre-course orientation (Azure CLI, PowerShell setup checklist)",
      "Show up to day one with a laptop running 64-bit OS, a personal credit card or UPI mandate (for Azure subscription verification — billing alarms keep usage in Free Tier)",
    ],
  },

  faqs: [
    {
      question: "Which is the best Azure training institute in Pune?",
      answer:
        "We can't honestly answer 'best' for ourselves. The test that works: ask any institute you are considering to (1) name the trainer who will teach your batch and show their LinkedIn, (2) show real student Bicep / Terraform GitHub repositories with deployable READMEs, and (3) name companies that hired their last 5 batches. Compare on those three.",
    },
    {
      question: "How long does Azure training in Pune take at Archer Infotech?",
      answer:
        "Three months (12 weeks) for the regular classroom and online programmes, plus 2 weeks of capstone project and AZ-104 / interview preparation. The weekend batch stretches over 5 months at the same content depth, designed for working professionals.",
    },
    {
      question: "What is the salary of an Azure Cloud Engineer in Pune?",
      answer:
        "Indeed Pune reports an average of ₹6.90 lakh per year for Cloud Engineer (Azure). Mid-level Azure Solutions Architects in Pune (3–6 years) earn ₹12–19 lakh per year per Glassdoor. Senior Cloud Architects (7–10 years) earn ₹22–40 lakh nationally with Pune trending within ±10% of those figures.",
    },
    {
      question: "What is the fee for the Azure course in Pune?",
      answer:
        "Course fees range from ₹20,000 to ₹90,000 depending on mode (classroom / online / weekend), batch type, and applicable concession. The higher end covers placement-track classroom batches with full AZ-104 mock-exam track, Azure OpenAI module, and extended interview prep; the lower end covers concession-eligible online or weekend formats. The AZ-104 exam voucher (USD ~165) is paid directly to Microsoft and is not part of our fee.",
    },
    {
      question: "Does the course prepare me for the Azure Administrator Associate (AZ-104) certification?",
      answer:
        "Yes — AZ-104 preparation is woven through the curriculum and concentrated in weeks 11–12. Two full-length timed mock exams plus scenario drills are part of the course. Most students who complete the lab work seriously score 75–85% on the second mock and pass the live exam on first attempt.",
    },
    {
      question: "Do I need programming experience to learn Azure?",
      answer:
        "Yes — at least basic Python or PowerShell is required to follow the IaC, Functions, and serverless modules. If you have done our Java, Python, or .NET training (or equivalent), you are ready. Pure non-developers should consider Azure Fundamentals (AZ-900) self-study first.",
    },
    {
      question: "Azure or AWS — which should I learn first in Pune?",
      answer:
        "Azure first if your goal is Pune captive R&D (Mercedes-Benz / Cummins / John Deere / Honeywell), BFSI, .NET ecosystem, or Microsoft Pune. AWS first if your goal is product engineering, fintech / SaaS startups, or cloud-native development. AWS has roughly 1.4× more Pune Indeed listings; both certificates carry similar resume weight.",
    },
    {
      question: "Will I work on real projects?",
      answer:
        "Yes — three capstone projects: (1) three-tier production architecture provisioned by Bicep, (2) serverless event-driven application on Functions + Logic Apps + Service Bus, (3) containerised microservices on AKS with Azure OpenAI Service RAG endpoint. All three become public GitHub repositories you reference in interviews.",
    },
    {
      question: "Do I get my own Azure subscription during the course?",
      answer:
        "Yes — every student creates their own personal Azure sandbox subscription in week 1 with a Cost Management budget alarm at ₹1,000. We use Azure Free Tier wherever possible; the lab work for the full course typically costs each student under ₹500–₹1,500 in actual Azure charges across 14 weeks.",
    },
    {
      question: "Is Azure OpenAI Service / GenAI covered?",
      answer:
        "Yes — week 10 is a full module on Azure OpenAI Service, Azure AI Search (managed RAG), Azure AI Studio / AI Foundry, and Microsoft prompt-flow. Capstone Project #3 includes an Azure OpenAI-powered chat endpoint backed by Azure AI Search. This module is what separates 2026 Pune Azure hiring from 2022 Pune Azure hiring — most JDs now mention Azure OpenAI or AI features.",
    },
    {
      question: "What about cost? Will I get a runaway Azure bill?",
      answer:
        "No — week 1 covers Cost Management, Budgets, and Cost Alerts before any chargeable resource is launched. Every lab uses the smallest Free-Tier-eligible SKU. Students who follow the runbooks finish the course having spent ₹500–₹1,500 in actual Azure charges; those who forget to delete resources occasionally see ₹2,000–₹3,000 bills, which alarms catch within 24 hours.",
    },
    {
      question: "Are weekend Azure classes available in Pune?",
      answer:
        "Yes — Saturday and Sunday, 09:00–13:00, stretched over 5 months instead of 3. Same content, same trainers, same labs and capstone. Designed for working professionals who cannot attend weekday batches.",
    },
    {
      question: "What support do I get after course completion?",
      answer:
        "Six months of active placement support — mock interviews calibrated for cloud roles, referrals via our alumni network at 12+ partner companies (with extra emphasis on Pune captives and BFSI), resume / LinkedIn / GitHub rewrites, and salary negotiation coaching. If your first round of interviews does not land, you can sit in on a future batch's interview-prep sessions free of charge.",
    },
    {
      question: "How is this different from your Azure Administrator Associate course?",
      answer:
        "This Azure Training in Pune programme is the foundation cloud-engineer course — 3 months of hands-on Azure engineering with AZ-104 prep included. The Azure Administrator Associate course is a separate exam-focused track for candidates who already have Azure experience and want concentrated certification prep. Most freshers should start here.",
    },
    {
      question: "Are the named trainers actually teaching, or are they just on the brochure?",
      answer:
        "Yogesh Patil (Founder & Director, 15+ years) personally leads the architecture, networking, and Well-Architected sessions. Vinod Patil (Solutions Architect & AI Trainer, 12 years) leads the IaC, serverless, and Azure OpenAI weeks. The same names you see on this page show up in your batch on day one.",
    },
  ],

  finalCta: {
    heading: "Ready to start Azure training in Pune?",
    paragraph:
      "We have classroom, online, and weekend batches starting every 4–6 weeks. Reach out via the enquiry form or call us — Yogesh and Vinod are happy to spend 30 minutes telling you whether the course is right for you. Visit our Kothrud, Pune campus, see the lab setup, meet a current batch, and decide with full information.",
  },
};
