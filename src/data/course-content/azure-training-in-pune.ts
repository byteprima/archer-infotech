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
        "Cloud computing models, the Azure global footprint (Regions, Availability Zones, region pairs, Edge sites), and the resource hierarchy that everything else in Azure inherits from — Management Groups, Subscriptions, Resource Groups. Getting that hierarchy right on day one is what makes governance and cost allocation possible later.\n\nEvery student finishes week 1 with their own subscription, MFA enforced, a budget alert configured, and both the Azure CLI and Azure PowerShell working locally. We spend a full session on cost, because an unattended VM is the single most common way a student's free credit disappears.",
      topics: [
        "Cloud computing models — IaaS / PaaS / SaaS",
        "Azure global infrastructure — Regions, AZs, region pairs, Edge",
        "Management Groups, Subscriptions, Resource Groups",
        "Resource providers, locks and tags",
        "Subscription setup and MFA",
        "Cost Management, Budgets and Cost Alerts",
        "Azure Free Tier — what's free and for how long",
        "Azure CLI and Azure PowerShell setup",
        "Azure Portal vs CLI — when each fits",
      ],
    },
    {
      title: "Microsoft Entra ID, RBAC & Security Baseline",
      weekRange: "Week 2",
      description:
        "Identity is the control plane in Azure, so it comes before anything is deployed. Entra ID users, groups and dynamic groups; app registrations and service principals; and managed identities — system-assigned versus user-assigned — which are the answer to almost every 'where do I put this credential' question.\n\nRBAC follows: built-in roles, custom role definitions, and the scope hierarchy that decides what an assignment actually grants. The week closes with Conditional Access, Privileged Identity Management, Azure Policy and a Defender for Cloud baseline applied to the subscription.",
      topics: [
        "Entra ID users, groups, dynamic groups",
        "App registrations and service principals",
        "Managed identities — system-assigned and user-assigned",
        "RBAC — built-in roles, custom roles, scope hierarchy",
        "Role assignment troubleshooting",
        "Conditional Access policies",
        "Privileged Identity Management (PIM)",
        "Azure Policy, initiatives and remediation tasks",
        "Microsoft Defender for Cloud baseline and secure score",
      ],
    },
    {
      title: "Networking — VNet, Subnets, NSG & Traffic Control",
      weekRange: "Week 3",
      description:
        "Building an Azure network from the address space up. VNet and subnet design with address planning that leaves room to grow, Network Security Groups and Application Security Groups, user-defined routes and forced tunnelling, and service endpoints.\n\nLoad balancing is taught by layer rather than by product name, so the choice between Azure Load Balancer (L4) and Application Gateway (L7 with WAF) is a reasoned one. Azure Firewall versus NAT Gateway closes the week, along with Azure DNS and Private DNS Zones.",
      topics: [
        "VNet, subnets and address-space planning",
        "Network Security Groups and Application Security Groups",
        "User-defined routes and forced tunnelling",
        "Azure Load Balancer — public and internal",
        "Application Gateway and WAF",
        "Azure Firewall vs NAT Gateway",
        "Service endpoints and their limits",
        "Azure DNS and Private DNS Zones",
        "Network Watcher for connectivity troubleshooting",
      ],
    },
    {
      title: "Hybrid Connectivity, Private Link & Global Routing",
      weekRange: "Week 4",
      description:
        "Connecting the network to everything outside it. VNet Peering including the gateway-transit and non-transitive behaviour that surprises people, hub-and-spoke topology and Azure Virtual WAN, then hybrid links — Site-to-Site VPN, Point-to-Site VPN, and ExpressRoute with its circuit and peering model.\n\nPrivate Endpoints and Private Link get a full session, because keeping PaaS traffic off the public internet is now a default requirement in Indian BFSI and healthcare work. Azure Front Door and Traffic Manager complete the global routing picture.",
      topics: [
        "VNet Peering, gateway transit and transitivity limits",
        "Hub-and-spoke topology and Azure Virtual WAN",
        "Site-to-Site and Point-to-Site VPN Gateway",
        "ExpressRoute circuits and peering types",
        "Private Endpoints and Private Link",
        "Private DNS integration for private endpoints",
        "Azure Front Door for global HTTP routing",
        "Traffic Manager and DNS-based failover",
      ],
    },
    {
      title: "Compute — Virtual Machines & Scale Sets",
      weekRange: "Week 5",
      description:
        "The IaaS layer. VM families and sizing, the pricing models (pay-as-you-go, reserved instances, savings plans, spot) and how to combine them, managed disks and their performance tiers, availability sets versus availability zones, and the images pipeline with Azure Image Builder and the Shared Image Gallery.\n\nVM Scale Sets add elasticity — autoscale rules, upgrade policies, and health probes — and the lab ends with an application that stays up while instances are deliberately destroyed.",
      topics: [
        "VM families, sizes and generation differences",
        "Pricing models — pay-as-you-go, reserved, savings plans, spot",
        "Managed disks and performance tiers",
        "Availability sets vs availability zones",
        "Azure Image Builder and Shared Image Gallery",
        "Custom script extensions and cloud-init",
        "VM Scale Sets, autoscale rules and upgrade policies",
        "Backup and Azure Site Recovery overview",
      ],
    },
    {
      title: "App Service, Functions & Logic Apps",
      weekRange: "Week 6",
      description:
        "Azure's PaaS compute, which is where a large share of Pune Azure work actually happens. App Service plans and the tier decisions that govern scaling and cost, deployment slots with slot swapping for zero-downtime releases, custom domains and managed certificates, and VNet integration.\n\nAzure Functions covers triggers and bindings, the Consumption versus Premium plan trade-off, cold starts and Durable Functions for stateful orchestration. Logic Apps closes the week as the low-code integration option, taught with an honest account of when it is and is not the right tool.",
      topics: [
        "App Service plans, tiers and scaling behaviour",
        "Deployment slots and zero-downtime slot swaps",
        "Custom domains, managed certificates and TLS",
        "App Service VNet integration and private access",
        "Azure Functions — triggers and bindings",
        "Consumption vs Premium plan, cold starts",
        "Durable Functions for stateful orchestration",
        "Logic Apps for workflow automation and integration",
      ],
    },
    {
      title: "Containers — ACR, Container Apps & AKS",
      weekRange: "Week 7",
      description:
        "Containers on Azure across the three options a team realistically chooses between. Azure Container Registry with geo-replication, image scanning and tasks; Azure Container Apps as the managed serverless container platform with KEDA-based scale-to-zero and Dapr integration; and Azure Kubernetes Service for teams that need the full Kubernetes surface.\n\nAKS covers cluster provisioning, AKS Automatic, Azure CNI versus kubenet, node pools, workload identity for pod-level access to Azure resources, and the AKS-specific ingress options.",
      topics: [
        "Azure Container Registry — geo-replication, scanning, tasks",
        "Azure Container Apps — environments and revisions",
        "KEDA scaling and scale-to-zero",
        "Dapr building blocks overview",
        "AKS cluster provisioning and AKS Automatic",
        "Azure CNI vs kubenet networking",
        "Node pools, spot node pools and autoscaling",
        "Workload identity for pod-level Azure access",
        "Choosing between Container Apps and AKS",
      ],
    },
    {
      title: "Storage — Blob, Files, Queues & Disks",
      weekRange: "Week 8",
      description:
        "Storage accounts and the four services inside them — Blob, File, Queue and Table — plus the redundancy options (LRS, ZRS, GRS, RA-GRS) that decide both durability and bill. Blob access tiers, lifecycle management, immutability policies and soft delete.\n\nSecurity is covered properly: shared access signatures and their scoping, stored access policies, private endpoints, and customer-managed keys. Azure Files with SMB and Azure Data Lake Storage Gen2 close the module, along with disk types for the VM workloads from week 5.",
      topics: [
        "Storage accounts — Blob, File, Queue, Table",
        "Redundancy — LRS, ZRS, GRS, RA-GRS",
        "Blob access tiers and lifecycle management",
        "Versioning, soft delete and immutability policies",
        "Shared access signatures and stored access policies",
        "Customer-managed keys and encryption scopes",
        "Azure Files, SMB and Azure File Sync",
        "Azure Data Lake Storage Gen2",
        "Disk types — Premium SSD v2, Ultra Disk",
      ],
    },
    {
      title: "Databases — Azure SQL, PostgreSQL & Cosmos DB",
      weekRange: "Week 9",
      description:
        "Managed data services and the modelling decisions behind them. Azure SQL Database across single database, elastic pool and Hyperscale, plus Managed Instance for lift-and-shift; backup, point-in-time restore, failover groups and active geo-replication.\n\nAzure Database for PostgreSQL Flexible Server covers the open-source path most new Pune projects take. Cosmos DB is taught as a distributed-systems subject — partition key design, request units, consistency levels and the multi-API surface — because that is where its cost and performance are decided.",
      topics: [
        "Azure SQL — single, elastic pool, Hyperscale",
        "Azure SQL Managed Instance for migration",
        "Backups, point-in-time restore and failover groups",
        "Active geo-replication and read scale-out",
        "Azure Database for PostgreSQL Flexible Server",
        "Cosmos DB partition key design and hot partitions",
        "Request units, throughput modes and autoscale",
        "Consistency levels and their trade-offs",
        "Azure Cache for Redis and Azure AI Search basics",
      ],
    },
    {
      title: "Infrastructure as Code — Bicep & Terraform",
      weekRange: "Week 10",
      description:
        "Azure defined as code. Bicep first, as the Azure-native language — modules, parameters, outputs, deployment scopes, what-if previews and the ARM template it compiles to (covered at the level needed to read legacy templates you will inherit).\n\nTerraform with the AzureRM provider follows, including remote state in a storage account with locking, modules, and the import workflow for adopting portal-created resources. We teach both because Pune Azure teams are genuinely split, and being fluent in one only is a hiring limitation.",
      topics: [
        "Bicep — modules, parameters, outputs, scopes",
        "what-if deployments and validation",
        "ARM template structure for reading legacy code",
        "Terraform with the AzureRM provider",
        "Remote state in a storage account with locking",
        "Terraform modules and environment separation",
        "Importing portal-created resources",
        "Choosing Bicep vs Terraform on a real team",
      ],
    },
    {
      title: "CI/CD — Azure DevOps Pipelines & GitHub Actions",
      weekRange: "Week 11",
      description:
        "Both pipeline platforms, because Pune Azure shops use both and often at once. Azure DevOps YAML pipelines — stages, jobs, templates, variable groups, agent pools, environments and approval gates, plus Azure Artifacts and Azure Repos.\n\nGitHub Actions with OIDC federation to Entra ID covers the modern keyless pattern. Deployment strategy closes the module: slot swaps for App Service, rolling and blue-green for VM Scale Sets, and canary for Container Apps — each paired with its rollback path.",
      topics: [
        "Azure DevOps YAML pipelines — stages, jobs, templates",
        "Variable groups, secure files and service connections",
        "Agent pools, self-hosted agents and environments",
        "Approval gates and deployment environments",
        "GitHub Actions with OIDC federation to Entra ID",
        "Deployment slots and blue-green releases",
        "Rolling and canary strategies with rollback",
        "Azure Artifacts and package management",
      ],
    },
    {
      title: "Observability — Azure Monitor, Log Analytics & KQL",
      weekRange: "Week 11",
      description:
        "Azure Monitor as the single pipeline behind metrics, logs and alerts. Data collection rules, Log Analytics workspaces and workspace design, and the retention and cost model that a badly configured workspace will make expensive very quickly.\n\nKQL is taught as a language rather than a set of copied snippets — filtering, summarising, joins, time-series operators and rendering — because it is the skill that separates someone who can read Azure telemetry from someone who cannot. Application Insights, distributed tracing, workbooks and alert action groups complete the module.",
      topics: [
        "Azure Monitor architecture and data collection rules",
        "Log Analytics workspace design and retention cost",
        "KQL — filtering, summarising, joins, time-series",
        "Application Insights instrumentation and sampling",
        "Distributed tracing and end-to-end transaction views",
        "Metric, log and activity-log alerts",
        "Action groups, alert processing rules and noise control",
        "Workbooks and dashboards for on-call use",
      ],
    },
    {
      title: "Security, Key Vault & Well-Architected Review",
      weekRange: "Week 12",
      description:
        "Security consolidated across everything already built. Azure Key Vault for keys, secrets and certificates, access policies versus RBAC, soft delete and purge protection, and rotation. Encryption at rest with Storage Service Encryption and customer-managed keys, and encryption in transit at Front Door and Application Gateway.\n\nDefender for Cloud plans, Azure WAF and DDoS Protection, and the Cloud Adoption Framework follow. Each student then writes a Well-Architected review of their capstone against the five pillars.",
      topics: [
        "Key Vault — keys, secrets, certificates, rotation",
        "Access policies vs RBAC, soft delete, purge protection",
        "Encryption at rest and customer-managed keys",
        "TLS termination at Front Door / Application Gateway",
        "Azure WAF and DDoS Protection",
        "Defender for Servers / SQL / Containers / DevOps",
        "Microsoft Cloud Adoption Framework",
        "Well-Architected Framework — five pillars",
        "Writing a Well-Architected review document",
      ],
    },
    {
      title: "Cost Management & FinOps on Azure",
      weekRange: "Week 12",
      description:
        "Reading and reducing an Azure bill, which is a named responsibility in a growing share of Pune cloud job descriptions. Cost Management analysis, exports to storage, tagging strategy and cost allocation, budgets with automated actions, and Azure Advisor recommendations read critically rather than applied blindly.\n\nThe savings levers follow: reservations and savings plans, Azure Hybrid Benefit, spot capacity, autoscale and shutdown schedules for non-production, and the standard waste list — unattached disks, idle gateways, orphaned public IPs, over-provisioned App Service plans.",
      topics: [
        "Cost Management analysis, views and exports",
        "Tagging strategy and cost allocation",
        "Budgets with automated actions",
        "Azure Advisor cost recommendations",
        "Reservations, savings plans and Azure Hybrid Benefit",
        "Spot VMs and non-production shutdown schedules",
        "Right-sizing from Azure Monitor data",
        "Finding waste — unattached disks, idle gateways, orphaned IPs",
      ],
    },
    {
      title: "Generative AI on Azure — Azure OpenAI Service",
      weekRange: "Week 13",
      description:
        "Pune Azure architects in 2026 are expected to design AI features, not just classic three-tier apps. Cover Azure OpenAI Service (model catalog, deployment types, quota and TPM management), content filtering and the Responsible AI tooling, and Azure AI Search as the managed retrieval layer.\n\nThe lab builds a retrieval-augmented generation service end to end — documents in Blob Storage, indexed by Azure AI Search, answered by an Azure OpenAI deployment behind an App Service or Container Apps front end — that you can demo in an interview.",
      topics: [
        "Azure OpenAI Service — model catalog and deployment types",
        "Quota, tokens-per-minute limits and throttling",
        "Content filtering and Responsible AI controls",
        "Azure AI Search for managed RAG",
        "Vector storage in Azure SQL, Cosmos DB and AI Search",
        "Azure AI Foundry and prompt flow orchestration",
        "Grounding, citations and hallucination controls",
        "Cost and latency trade-offs across models",
      ],
    },
    {
      title: "Capstone Project & AZ-104 Exam Preparation",
      weekRange: "Weeks 13–14 + 2 weeks placement prep",
      description:
        "Two weeks of full-time capstone work plus structured AZ-104 (Azure Administrator Associate) preparation. Pick one of the capstone architectures and build it with Bicep or Terraform, a CI/CD pipeline, monitoring and alerting, and a documented cost estimate.\n\nExam preparation runs question-bank drills across the five AZ-104 domains, scenario walkthroughs and two full-length timed mock exams. Mock interviews target Pune Azure hiring panels, and resume, LinkedIn and GitHub polish is included.",
      topics: [
        "Capstone implementation, deployment and README",
        "Architecture review against Well-Architected pillars",
        "AZ-104 question-bank drills — five domains",
        "Two full-length timed mock exams",
        "Cloud-engineer interview prep — scenario design questions",
        "Resume, LinkedIn and GitHub portfolio polish",
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
    src: "/images/courses/azure-cloud-path-v1.webp",
    width: 1400,
    height: 1064,
    alt: "Ten-stage Microsoft Azure learning path taught at Archer Infotech Pune: Azure foundations covering management groups, subscriptions, resource groups and cost management; Entra ID and RBAC covering users, managed identities, roles and Conditional Access; networking covering VNet, NSG, load balancing and Private Link; compute covering virtual machines, scale sets, App Service and Functions; containers covering Container Registry, Container Apps and AKS; storage and databases covering Blob, Files, Azure SQL and Cosmos DB; infrastructure as code covering Bicep and Terraform; CI/CD and monitoring covering Azure DevOps Pipelines, GitHub Actions, Azure Monitor and KQL; security and cost covering Key Vault, Defender for Cloud and FinOps; and Azure OpenAI with the capstone and AZ-104 exam preparation.",
    caption:
      "The order this course is taught in. Each stage expands into the modules below — nothing arrives before its prerequisite.",
  },

  syllabusDownload: {
    pdfUrl: "/downloads/microsoft-azure-syllabus-v1.pdf",
    title: "Microsoft Azure Course Syllabus — Complete Module List",
    slug: "microsoft-azure-syllabus",
    blurb:
      "The complete seventeen-module syllabus as a PDF — Azure foundations and the resource hierarchy, Entra ID and RBAC, VNet networking and hybrid connectivity, virtual machines, App Service and Functions, containers and AKS, storage, managed databases, Bicep and Terraform, Azure DevOps and GitHub Actions, Azure Monitor and KQL, Key Vault and security, FinOps, Azure OpenAI, and the capstone with AZ-104 exam preparation. Everything in it is on this page; the PDF is the portable version.",
    asideBlocks: [
      {
        heading: "What is inside the PDF",
        items: [
          "All seventeen modules in teaching order, week by week, from the first subscription through to the AZ-104 mock exams.",
          "Both infrastructure-as-code paths in full — Bicep with deployment scopes and what-if, and Terraform with the AzureRM provider and remote state.",
          "KQL and Azure Monitor treated as a language and a pipeline rather than a list of portal screenshots.",
          "The capstone brief and the cost estimate every student produces alongside their architecture.",
        ],
      },
      {
        heading: "Roles this syllabus prepares you for",
        items: [
          "Azure Cloud Engineer — provisioning, automating and operating Azure workloads.",
          "Azure Administrator (AZ-104) — the certification this course maps to.",
          "Cloud Support Engineer — the most common entry route in Pune.",
          "Azure DevOps Engineer — pairing this stack with pipelines and AKS.",
        ],
      },
    ],
  },

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
