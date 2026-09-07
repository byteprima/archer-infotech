import type { CourseRichContent } from "./types";

export const azureAdministratorTrainingInPune: CourseRichContent = {
  intro:
    "The Azure Administrator Associate (AZ-104) certification is the most-asked Azure credential on Pune captive R&D / BFSI / Microsoft-ecosystem job descriptions — Mercedes-Benz R&D India, Cummins, John Deere ETC, Honeywell, Cognizant Pune Capital Markets, Bajaj Finserv, Microsoft Pune R&D routinely list it as a hard requirement for Azure Cloud Engineer and Administrator roles. Archer Infotech's Azure Administrator training in Pune is the focused exam-mastery track — distinct from our broader Azure course — designed for candidates who already have working Azure experience and want concentrated certification preparation. The track covers the four AZ-104 exam domains in depth (Manage Azure identities and governance, Implement and manage storage, Deploy and manage compute resources, Implement and manage virtual networking, Monitor and maintain Azure resources), with two full-length timed mock exams, scenario drills, plus the operational fluency Pune Azure interviews test for. Classroom in Kothrud, online live, and weekend batches available.",

  whyLearn: {
    heading: "Why Get Azure Administrator Associate (AZ-104) Certified in 2026",
    paragraphs: [
      "AZ-104 is the cleanest credential signal Pune Azure-hiring panels read. Indeed Pune lists more than 600 active openings that explicitly list 'Azure Administrator Associate' or 'AZ-104' as required or preferred. The biggest employers asking for it are Mercedes-Benz R&D India, Cummins, John Deere ETC, Honeywell, Cognizant Pune Capital Markets, Bajaj Finserv, Microsoft (Pune R&D), Synechron, Mphasis, Capgemini, plus the IT services majors with Azure practices. Compensation tracks AWS Solutions Architect within ±5% at every band; Azure Administrator certified candidates often have stronger conversion in Pune captive / BFSI segments because the Azure talent supply is thinner.",
      "What changed in 2026: the AZ-104 exam (current version, refreshed 2024 with the Microsoft Entra ID terminology update — Azure AD has been formally renamed Entra ID) emphasises identity, networking, and observability questions more heavily. The exam remains 40–60 questions in 100 minutes (with case studies), passing score 700 / 1000. Voucher: USD ~165 (~₹14,000), Pearson VUE delivered. Microsoft's annual exam-update cadence means the content has been refreshed to cover Microsoft Entra ID (renamed from Azure AD), AKS Automatic mode, Azure Container Apps, plus the modern Bicep IaC pattern.",
      "What this means for hiring: certified AZ-104 candidates with hands-on portfolio see roughly 1.5–2× the interview-conversion rate of equivalent uncertified candidates on Pune Azure roles. Senior Azure Architect roles in Pune typically expect AZ-104 plus AZ-305 (Solutions Architect Expert) and at least one specialty within 2–3 years.",
    ],
    keyPoints: [
      "600+ active Pune openings list AZ-104 as required or preferred (May 2026)",
      "Cleanest signal Pune Azure-hiring panels read",
      "1.5–2× interview-conversion rate vs equivalent uncertified candidates",
      "40–60 questions, 100 minutes, 700 / 1000 passing score",
      "Voucher: USD ~165 (~₹14,000), Pearson VUE delivered",
    ],
  },

  whoIsThisFor: {
    forYou: [
      "Working Azure engineer (6+ months hands-on) wanting concentrated AZ-104 preparation",
      "Cloud Administrator targeting Azure Engineer / Administrator career progression",
      "Software developer at a Pune captive / BFSI shop that requires AZ-104 for senior roles",
      "Working AWS administrator wanting to add Azure for multi-cloud breadth",
      "Working professional preparing for a Pune Azure interview where AZ-104 is on the JD",
    ],
    notForYou: [
      "If you have NO hands-on Azure experience — take our broader Azure course first; this is exam-prep, not introductory",
      "If you are looking for end-to-end engineering training across deployment / IaC / observability — take our broader 3-month Azure course",
      "If you want a 7-day cram course — passing AZ-104 reliably needs 2.5 months of structured prep",
      "If you cannot put in 8–10 hours per week of practice exams + reading — exam mastery requires repeated exposure",
      "If you already hold AZ-104 — talk to us about AZ-305 or specialty tracks",
    ],
  },

  curriculum: [
    {
      title: "Exam Strategy, Subscription Setup & Foundations Review",
      weekRange: "Week 1",
      description:
        "How the AZ-104 exam scores you, the question patterns Microsoft uses (case studies, drag-and-drop, multiple-choice, multiple-response), test-day logistics. Then a foundations review — Azure subscription / management group hierarchy, Microsoft Entra ID basics, RBAC scope and inheritance. By the end of week 1 every student has a personal Azure sandbox subscription and has done a 50-question diagnostic exam.",
      topics: [
        "AZ-104 exam structure and domain weighting",
        "Microsoft question patterns — case studies, drag-and-drop",
        "Test-day logistics — Pearson VUE",
        "Azure subscription hierarchy",
        "Microsoft Entra ID (renamed Azure AD)",
        "RBAC scope and inheritance",
        "First diagnostic exam",
      ],
    },
    {
      title: "Azure Fundamentals Refresher — Portal, CLI, PowerShell & Bicep",
      weekRange: "Week 1",
      description:
        "AZ-104 is an administrator exam, and it assumes fluency in the tools before it tests judgement about them. This week gets you comfortable in all four surfaces you will be examined on: the portal, Azure CLI, Azure PowerShell, and ARM templates with Bicep.\n\nThat breadth matters practically — the exam and the job both mix them, and a candidate who only knows the portal stalls the moment a question shows a command. You cover the resource hierarchy, resource groups and what they actually scope, tags, locks and the deployment model underneath everything, then deploy the same resource four ways so the equivalences are concrete.",
      topics: [
        "Azure regions, availability zones and paired regions",
        "Management groups, subscriptions and resource groups",
        "The Azure Resource Manager deployment model",
        "The portal, Cloud Shell and where each is faster",
        "Azure CLI syntax and common commands",
        "Azure PowerShell and the Az module",
        "ARM templates and Bicep",
        "Tags, resource locks and naming standards",
        "Deploying the same resource four ways",
        "Reading Microsoft Learn documentation efficiently",
      ],
    },
    {
      title: "Microsoft Entra ID in Depth — Users, Groups, RBAC & Conditional Access",
      weekRange: "Week 2",
      description:
        "The identity foundation the largest scored domain rests on. Users, groups and administrative units; dynamic group membership with the rule syntax the exam shows you; guest accounts and external collaboration; and self-service password reset.\n\nRBAC gets the most time because scope is where candidates lose marks: assignments inherit down the hierarchy, deny assignments behave differently from Azure Policy, and a role assigned at the wrong scope is the single most common wrong answer in this domain. Conditional Access, MFA and Identity Protection close the module, along with the built-in roles you are expected to recognise by what they permit rather than by name alone.",
      topics: [
        "Users, groups and administrative units",
        "Dynamic group membership rules",
        "Guest users and external collaboration",
        "Self-service password reset and writeback",
        "RBAC roles, scope and inheritance",
        "Built-in roles and what each actually permits",
        "Custom role definitions",
        "Deny assignments versus Azure Policy",
        "Conditional Access policies and MFA",
        "Entra ID Protection and risk-based policies",
      ],
    },
    {
      title: "Domain 1 — Manage Azure Identities and Governance (~20–25%)",
      weekRange: "Weeks 2–3",
      description:
        "Identity is the largest exam domain. Cover Microsoft Entra ID in depth — users, groups, dynamic groups, external identities (B2B / B2C basics), MFA, Conditional Access, Privileged Identity Management. RBAC — built-in and custom roles, scope, ABAC. Subscriptions — moving resources, transferring billing. Azure Policy — definitions, initiatives, exemptions, compliance. Plus Cost Management — budgets, alerts, recommendations.",
      topics: [
        "Microsoft Entra ID users, groups, dynamic groups",
        "External identities (B2B / B2C)",
        "MFA and Conditional Access",
        "Privileged Identity Management",
        "RBAC — built-in, custom, scope",
        "Subscriptions and resource moves",
        "Azure Policy and Initiatives",
        "Cost Management — budgets, alerts",
      ],
    },
    {
      title: "Governance — Policy, Cost Management & Resource Organisation",
      weekRange: "Week 3",
      description:
        "The other half of Domain 1, and the part that separates an administrator from someone who can click through the portal. Azure Policy — definitions, initiatives, effects such as deny, audit and deployIfNotExists, and remediation tasks for resources already out of compliance.\n\nCost Management covers budgets, alerts, cost analysis and the exports finance teams actually ask for; the pricing and TCO calculators; and reservations and Azure Hybrid Benefit. Resource organisation closes it — management group hierarchy, subscription strategy, tagging enforced by policy rather than by hope, and the move and lock operations the exam tests with specific constraints on what can move where.",
      topics: [
        "Azure Policy definitions and initiatives",
        "Policy effects — deny, audit, append, deployIfNotExists",
        "Remediation tasks for existing resources",
        "Policy versus RBAC — different questions",
        "Budgets, alerts and cost analysis",
        "Reservations and Azure Hybrid Benefit",
        "Pricing and TCO calculators",
        "Management group hierarchy and subscription strategy",
        "Tag inheritance and enforcement through policy",
        "Moving resources between groups and subscriptions",
      ],
    },
    {
      title: "Domain 2 — Implement and Manage Storage (~15–20%)",
      weekRange: "Week 4",
      description:
        "Storage domain. Cover Storage Accounts — kinds (general-purpose v2, BlockBlobStorage, FileStorage), access tiers, redundancy options (LRS / ZRS / GRS / GZRS), authorisation methods (Shared Key, SAS, Entra ID), plus the modern container-by-container access controls. Blob storage — tiers (Hot / Cool / Cold / Archive), lifecycle management, soft delete, immutable storage. File shares — SMB / NFS, AD authentication. Plus Azure File Sync, Storage Explorer, AzCopy.",
      topics: [
        "Storage Account kinds and selection",
        "Access tiers — Hot / Cool / Cold / Archive",
        "Redundancy — LRS / ZRS / GRS / GZRS",
        "SAS, Entra ID, Shared Key authorisation",
        "Blob lifecycle and soft delete",
        "Azure Files — SMB / NFS",
        "Azure File Sync, AzCopy",
      ],
    },
    {
      title: "Storage Security, Replication & Azure Files",
      weekRange: "Week 4",
      description:
        "The depth behind Domain 2, where the exam's questions are almost always about choosing a redundancy option or an access mechanism. The replication tiers — LRS, ZRS, GRS, GZRS and their read-access variants — with the durability and failover behaviour of each, because the correct answer is decided by a stated requirement rather than by preference.\n\nAccess control covers shared keys, shared access signatures with stored access policies, and Entra-based authorisation, which is the recommended and frequently correct choice. Azure Files with Active Directory authentication, Azure File Sync, blob lifecycle management and immutable storage close the module, along with the tools — AzCopy, Storage Explorer, Import/Export — the exam expects you to distinguish.",
      topics: [
        "Storage account types and performance tiers",
        "LRS, ZRS, GRS, GZRS and read-access variants",
        "Blob access tiers and lifecycle management",
        "Immutable storage and legal holds",
        "Shared keys, SAS tokens and stored access policies",
        "Entra ID authorisation for blob and queue",
        "Azure Files and AD authentication",
        "Azure File Sync and cloud tiering",
        "AzCopy, Storage Explorer and Import/Export",
        "Firewalls, private endpoints and network rules",
      ],
    },
    {
      title: "VM Availability, Scale Sets & Backup",
      weekRange: "Week 5",
      description:
        "The resilience half of the compute domain. Availability sets with fault and update domains, availability zones, and the SLA each arrangement actually carries — the exam asks for the configuration that meets a stated SLA, and the numbers matter.\n\nVirtual Machine Scale Sets cover autoscaling rules, scaling profiles and upgrade policies. Azure Backup covers Recovery Services vaults, policies, retention and restore options; Azure Site Recovery covers replication and failover for disaster recovery. Disk management, encryption and resizing close the module, alongside the maintenance and reboot behaviours that scenario questions turn on.",
      topics: [
        "Availability sets, fault and update domains",
        "Availability zones and zone-redundant deployment",
        "SLA by configuration — the numbers the exam uses",
        "Virtual Machine Scale Sets and autoscale rules",
        "Scaling profiles and upgrade policies",
        "Managed disk types, resizing and encryption",
        "Recovery Services vault and backup policies",
        "Restore options and retention",
        "Azure Site Recovery and failover",
        "Maintenance, reboots and planned events",
      ],
    },
    {
      title: "Domain 3 — Deploy and Manage Compute Resources (~20–25%)",
      weekRange: "Weeks 5–6",
      description:
        "Compute domain. VMs — sizing, availability sets vs zones vs scale sets, custom images via Azure Image Builder, Azure Bastion, plus VM extensions and Update Manager. App Service — plans, slots, deployment, scaling. Container services — Azure Container Instances, Azure Container Apps, AKS basics (Automatic mode covered as the 2026 default). Plus Backup and Site Recovery for compute.",
      topics: [
        "VM sizing and pricing models",
        "Availability sets, zones, scale sets",
        "Azure Image Builder and shared image gallery",
        "Azure Bastion for secure RDP / SSH",
        "App Service — plans, slots, scaling",
        "Azure Container Instances and Container Apps",
        "AKS basics (Automatic mode)",
        "Azure Backup and Site Recovery",
      ],
    },
    {
      title: "App Service, Containers & Serverless Compute",
      weekRange: "Week 6",
      description:
        "The rest of Domain 3, covering the compute options that are not virtual machines. App Service plans and tiers, deployment slots and slot swapping — which appears constantly in scenario questions about zero-downtime release — scaling, custom domains and TLS binding.\n\nContainers cover Azure Container Instances for short-lived workloads, Container Apps, and the level of AKS the exam actually expects, which is provisioning and scaling rather than deep Kubernetes operations. Azure Functions and consumption plans close the module, along with the selection question the exam keeps asking: given this workload and this constraint, which compute service is correct.",
      topics: [
        "App Service plans, tiers and scaling",
        "Deployment slots and slot swapping",
        "Custom domains, TLS binding and certificates",
        "App Service networking and access restrictions",
        "Azure Container Instances and Container Apps",
        "Azure Container Registry",
        "AKS at the level AZ-104 tests",
        "Azure Functions and hosting plans",
        "Choosing a compute service from a constraint",
        "Migrating a VM workload to a managed service",
      ],
    },
    {
      title: "Domain 4 — Implement and Manage Virtual Networking (~20–25%)",
      weekRange: "Weeks 6–7",
      description:
        "Networking domain. VNet design — subnets, NSGs, ASGs, route tables, service endpoints vs Private Endpoints (the modern default). Cross-VNet — peering, VPN Gateway, ExpressRoute, Virtual WAN. Load balancing — Azure Load Balancer (basic + standard), Application Gateway with WAF, Azure Front Door, Traffic Manager — and the discipline of choosing the right one for the scenario. Plus Azure DNS / Private DNS Zones.",
      topics: [
        "VNet, subnets, NSGs, ASGs",
        "Route tables and UDR",
        "Service Endpoints vs Private Endpoints",
        "VNet Peering",
        "VPN Gateway and ExpressRoute",
        "Azure Virtual WAN",
        "Load Balancer (basic / standard)",
        "Application Gateway with WAF",
        "Front Door vs Traffic Manager",
        "Azure DNS / Private DNS Zones",
      ],
    },
    {
      title: "Network Security, Load Balancing & Private Connectivity",
      weekRange: "Week 7",
      description:
        "The depth behind the networking domain, and the area candidates most often underestimate. Network security groups and application security groups, effective security rules, and reading why traffic is actually being blocked — which the portal will tell you if you know where to look.\n\nLoad balancing covers the four services the exam expects you to distinguish: Azure Load Balancer, Application Gateway with WAF, Traffic Manager and Front Door, each with the layer it works at and the scenario it fits. Private connectivity covers service endpoints against private endpoints, Private Link, VNet peering and its transitivity limits, VPN Gateway and ExpressRoute, plus Azure DNS and private zones.",
      topics: [
        "NSGs, ASGs and effective security rules",
        "Diagnosing blocked traffic",
        "Azure Load Balancer — basic and standard",
        "Application Gateway and WAF",
        "Traffic Manager and Front Door",
        "Choosing between the four load-balancing services",
        "Service endpoints versus private endpoints",
        "Private Link and private DNS integration",
        "VNet peering and transitivity limits",
        "VPN Gateway, ExpressRoute and hybrid connectivity",
      ],
    },
    {
      title: "Domain 5 — Monitor and Maintain Azure Resources (~10–15%)",
      weekRange: "Week 8",
      description:
        "Observability and maintenance. Azure Monitor — metrics, logs, KQL queries, Log Analytics workspaces, action groups, alert rules. Application Insights for application-level telemetry. Backup — Recovery Services Vault, backup policies, cross-region restore. Plus Azure Resource Health, Service Health, Service Manager.",
      topics: [
        "Azure Monitor — metrics, logs, alerts",
        "Log Analytics and KQL",
        "Application Insights",
        "Recovery Services Vault and Backup policies",
        "Site Recovery for DR",
        "Resource Health and Service Health",
        "Azure Resource Manager templates",
      ],
    },
    {
      title: "Mock Exam 1, Scenario Walkthroughs & Gap Closure",
      weekRange: "Week 9",
      description:
        "First full-length timed mock exam (60 questions, 100 minutes) under real exam conditions, including the Pearson VUE-style case-study format. Detailed answer review focusing on why wrong options are wrong. Plus scenario walkthroughs of common AZ-104 architectures — multi-region web app, hybrid identity, BFSI compliance setup.",
      topics: [
        "Mock exam 1 — full timed",
        "Detailed answer review",
        "Scenario walkthroughs",
        "Gap-closure plan based on mock score",
      ],
    },
    {
      title: "Mock Exam 2, Booking & Test-Day Prep",
      weekRange: "Week 10",
      description:
        "Second full-length mock exam under real exam conditions — students who score 75–85% typically pass the real exam first attempt. Final gap-closure on weak domains, exam-booking guidance, test-day mental-prep, plus retake strategy if first attempt fails.",
      topics: [
        "Mock exam 2 — full timed",
        "Final gap-closure",
        "Pearson VUE booking",
        "Test-day strategy",
        "Retake strategy",
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
    src: "/images/courses/azure-az104-path-v1.webp",
    width: 1400,
    height: 900,
    alt: "Eight-stage Azure Administrator AZ-104 learning path taught at Archer Infotech Pune: foundations covering the portal, Azure CLI, PowerShell, Bicep and the resource hierarchy; identity and governance as domain one at about 20 to 25 percent covering Microsoft Entra ID, role-based access control and Azure Policy; storage as domain two at about 15 to 20 percent covering accounts, replication and Azure Files; compute as domain three at about 20 to 25 percent covering virtual machines, scale sets and App Service; virtual networking as domain four at about 20 to 25 percent covering virtual networks, network security groups and load balancing; monitor and maintain as domain five at about 10 to 15 percent covering Azure Monitor, Backup and Site Recovery; mock exams with timed papers, scenario walkthroughs and gap closure; and exam day covering booking, proctoring, pacing and result.",
    caption:
      "The AZ-104 exam domains with their weightings, in the order this course teaches them. Each stage expands into the modules below.",
  },

  syllabusDownload: {
    pdfUrl: "/downloads/azure-administrator-syllabus-v1.pdf",
    title: "Azure Administrator (AZ-104) Syllabus — Complete Module List",
    slug: "azure-administrator-syllabus",
    blurb:
      "All sixteen modules as a 7-page PDF — the tooling refresher across portal, CLI, PowerShell and Bicep, every AZ-104 domain with its weighting, and the depth modules on Entra ID and RBAC scope, Azure Policy and cost management, storage replication and access control, VM availability and backup, App Service and containers, and network security and load balancing. Generated from this page, so the two cannot disagree.",
    asideBlocks: [
      {
        heading: "What is inside the 7-page PDF",
        items: [
          "All sixteen modules in teaching order, each with its schedule, description and full topic list.",
          "The five AZ-104 domains with their published weightings, so you can plan study time against what is actually scored.",
          "The four tool surfaces the exam mixes — portal, Azure CLI, Azure PowerShell and Bicep — taught together rather than the portal alone.",
          "The depth modules candidates most often underestimate: RBAC scope and inheritance, storage replication tiers by requirement, availability SLAs by configuration, and choosing between the four load-balancing services.",
        ],
      },
      {
        heading: "Roles this syllabus prepares you for",
        items: [
          "Azure Administrator — the role the certification is written for.",
          "Cloud Engineer at Pune GCC captives and Microsoft-stack enterprises.",
          "Systems or infrastructure administrator moving from on-premise to Azure.",
          "The prerequisite credential for AZ-305 Solutions Architect.",
        ],
      },
    ],
  },

  projects: [
    {
      title: "AZ-104 Architecture Reference Repository",
      description:
        "A reference repository documenting 10 common AZ-104 administration scenarios — multi-region active-active web app, hybrid identity (Entra Connect), private endpoint baseline, BFSI compliance setup, AKS Automatic cluster, multi-tenant Storage Account, Site Recovery DR, Backup policy across resource types, Cost Management with tagging strategy, plus a small Bicep deployment. Demonstrates the architectural fluency that opens senior Pune Azure Administrator interviews.",
      technologies: [
        "Architecture diagrams via draw.io / Excalidraw",
        "Bicep reference modules",
        "Azure CLI / Azure PowerShell scripts",
        "GitHub repository with README",
      ],
    },
    {
      title: "Cost-Optimisation Audit of an Azure Workload",
      description:
        "A written cost-optimisation audit of a hypothetical Azure workload — Reserved Instance / Savings Plans recommendations, Storage tier transitions, VM rightsizing, redundancy downgrades where appropriate. Demonstrates the FinOps thinking Pune Azure interviews test for.",
      technologies: [
        "Azure Pricing Calculator",
        "Cost Management analysis",
        "Reserved Instance modelling",
      ],
    },
  ],

  trainersIntro:
    "Your batch is led by Yogesh Patil (Founder & Director, 15+ years, AWS / Azure architect with multiple cloud certifications) and Vinod Patil (Solutions Architect & AI Trainer, 12 years). Both have personally cleared the AZ-104 exam.",

  careerOutcomes: {
    paragraphs: [
      "Certified AZ-104 candidates with hands-on portfolio see roughly 1.5–2× the interview-conversion rate vs equivalent uncertified candidates on Pune Azure Administrator / Cloud Engineer roles. Indeed Pune lists 600+ active openings that list AZ-104 as required or preferred, with continuous hiring at Mercedes-Benz R&D India, Cummins, John Deere ETC, Honeywell, Cognizant Pune Capital Markets, Bajaj Finserv, Microsoft Pune R&D, Synechron, Mphasis, Capgemini, plus the IT services majors with Azure practices.",
      "What pulls a certified Azure Administrator above the median band: the certificate alone gets you to interviews; the offer comes from depth on Bicep / ARM templates, demonstrable hands-on Azure experience (the AZ-104 + zero-portfolio combination is widely seen as a red flag), and one specialisation (security via SC-100, networking via AZ-700, or solutions architect via AZ-305).",
      "Senior Azure Administrator / Architect bands at the top end are reported as national figures (Pune-specific Indeed pages do not exist for these specific titles); Pune trends within ±10% of these figures.",
    ],
    salaryBands: [
      {
        role: "Azure Cloud Engineer with AZ-104 (Pune)",
        band: "₹8,00,000 – ₹12,00,000 per year",
        source: {
          label: "Indeed Pune (Azure Administrator)",
          url: "https://in.indeed.com/career/azure-administrator/salaries/Pune--Maharashtra",
        },
      },
      {
        role: "Mid-level Azure Administrator (Pune, 3–6 years)",
        band: "₹13,00,000 – ₹20,00,000 per year",
        source: {
          label: "Glassdoor Pune Azure Administrator",
          url: "https://www.glassdoor.co.in/Salaries/pune-azure-administrator-salary-SRCH_IL.0,4_IM1072_KO5,24.htm",
        },
      },
      {
        role: "Senior Azure Architect (Pune, 6–9 years)",
        band: "₹20,00,000 – ₹35,00,000 per year",
        source: {
          label: "Glassdoor Pune Senior Azure Architect",
          url: "https://www.glassdoor.co.in/Salaries/pune-senior-azure-architect-salary-SRCH_IL.0,4_IM1072_KO5,27.htm",
        },
      },
      {
        role: "Lead Azure Architect (national, 9+ years)",
        band: "₹32,00,000 – ₹60,00,000 per year",
        source: {
          label: "6figr India Lead Azure Architect (Pune ±10%)",
          url: "https://6figr.com/in/salary/lead-azure-architect--t",
        },
      },
    ],
    hiringCompanies: [
      "Mercedes-Benz R&D India",
      "Cummins India",
      "John Deere ETC",
      "Honeywell",
      "Cognizant Pune Capital Markets",
      "Bajaj Finserv",
      "Microsoft (Pune R&D)",
      "Synechron",
      "Mphasis",
      "Capgemini",
      "TCS",
      "Infosys",
      "Atos / Eviden",
      "Wipro",
    ],
    rolesAfterCourse: [
      "Azure Administrator Associate",
      "Senior Cloud Engineer (cert-required)",
      "Cloud Solutions Engineer",
      "Pre-sales Azure Solutions Engineer",
      "DevOps Engineer (Azure-focused)",
    ],
  },

  modesAndDuration: {
    duration:
      "10 weeks of structured exam preparation (~2.5 months total)",
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
        "Personal Azure sandbox per student",
        "Mock exam platform (provided)",
        "Slack / WhatsApp for async Q&A",
      ],
    },
    weekend: {
      timing: ["Saturday + Sunday, 09:00 to 13:00"],
      durationNote: "Stretches over ~4 months instead of 2.5.",
    },
    batchPolicy: "Maximum 15 students per batch.",
  },

  fees: {
    note:
      "Course fees range from ₹20,000 to ₹90,000 depending on mode and concession. The AZ-104 exam voucher (USD ~165 / ~₹14,000) is paid directly to Microsoft / Pearson VUE.",
    range: "₹20,000 – ₹90,000",
    paymentOptions: [
      "Single payment with early-bird discount",
      "EMI in 2 instalments at no extra cost",
      "Corporate sponsorship — invoiced to your employer with GST",
    ],
  },

  placementSupport: {
    paragraphs: [
      "Placement support starts after exam-pass. Most candidates targeting this cert already have an Azure-track job or are mid-track at one; the cert is the unblock for senior roles. Our support is unconditional, time-bound (six months after course completion), and includes free re-entry to a future batch's interview-prep sessions.",
    ],
    process: [
      "After exam-pass — resume + LinkedIn rewrite emphasising the new credential",
      "GitHub portfolio cleanup",
      "Two rounds of mock Azure Administrator interviews",
      "HR mock interview and salary negotiation coaching",
      "Post-course — referrals via our 17-year alumni network",
      "Up to 6 months of continued support",
      "Free re-entry to future batch interview-prep sessions",
    ],
    partnerCompanies: [
      "Mercedes-Benz R&D India",
      "Cummins",
      "John Deere ETC",
      "Honeywell",
      "Cognizant Pune Capital Markets",
      "Bajaj Finserv",
      "Synechron",
      "Capgemini",
      "TCS",
      "Infosys",
    ],
  },

  comparison: {
    intro:
      "We compare ourselves against typical Pune AZ-104 prep institutes on factual rows only.",
    rows: [
      { feature: "Trainers named with photos and LinkedIn", archer: "Yes — Yogesh and Vinod", typical: "No — generic branding" },
      { feature: "Exam version targeted", archer: "AZ-104 with Microsoft Entra ID terminology (current 2026)", typical: "Older with 'Azure AD' terminology" },
      { feature: "Full-length timed mock exams", archer: "Two — under real Pearson-VUE conditions", typical: "Question banks but no full-length timed practice" },
      { feature: "Domain-by-domain coverage", archer: "Aligned to the five official domains", typical: "Topic-by-topic, no exam-domain mapping" },
      { feature: "Hands-on labs alongside exam prep", archer: "Yes — personal Azure sandbox, Bicep reference repos", typical: "Slides only" },
      { feature: "Public GitHub portfolio output", archer: "Yes — architecture repo + cost-audit document", typical: "Rare" },
      { feature: "Test-day prep coaching", archer: "Pearson VUE walkthrough + time-management strategy", typical: "Not covered" },
      { feature: "Pass-rate transparency", archer: "Most students who score 75–85% on mock 2 pass first attempt", typical: "No data shared" },
      { feature: "Placement support after course", archer: "6 months, with free re-entry", typical: "1–3 months or vaguely 'until placed'" },
    ],
    closing: "Compare with whoever you are considering. The right test is whether the institute will run a real timed mock for you before you pay.",
  },

  versusAlternative: {
    heading: "AZ-104 Standalone or Bundled With Our Broader Azure Course?",
    paragraphs: [
      "If you have NO hands-on Azure experience, take our broader Azure course (3 months) first — it includes AZ-104 prep concentrated in the last 2 weeks. If you have 6+ months of working Azure experience and need concentrated certification preparation, this focused 2.5-month track is right.",
      "Honest recommendation: take our broader Azure course first if you are new to cloud. Take this exam-focused track if you already have Azure hands-on experience. Combined enrolment is available with bundled discount.",
    ],
  },

  prerequisitesAndStart: {
    paragraphs: [
      "Prerequisites: at least 6 months of hands-on Azure experience, basic Linux or PowerShell, basic Python or Bash. We do NOT teach Azure from scratch in this course — that is our broader 3-month Azure course. If you have no Azure experience, take that course first.",
    ],
    suggestedSteps: [
      "Decide your mode — classroom, online live, or weekend",
      "Check the upcoming batch dates",
      "Book a free 30-minute counselling call — we will honestly tell you whether you are exam-ready",
      "Confirm enrolment and complete pre-course orientation",
      "Show up to day one ready for a 50-question diagnostic",
    ],
  },

  faqs: [
    {
      question: "How long does AZ-104 preparation take at Archer Infotech?",
      answer:
        "Approximately 2.5 months — 10 weeks of structured exam preparation. The weekend batch stretches over ~4 months at the same content depth.",
    },
    {
      question: "What is the AZ-104 exam fee?",
      answer:
        "The AZ-104 exam voucher is USD ~165 (~₹14,000), paid directly to Microsoft via Pearson VUE. Our course fee is separate and ranges ₹20,000 – ₹90,000.",
    },
    {
      question: "Do I need your broader Azure course first?",
      answer:
        "Yes if you have no hands-on Azure experience. If you have 6+ months of working Azure, this focused track is right.",
    },
    {
      question: "What is the pass rate?",
      answer:
        "Most students who score 75–85% on the second mock exam pass the real AZ-104 first attempt.",
    },
    {
      question: "What if I fail the first attempt?",
      answer:
        "Free re-entry to our interview-prep sessions for 6 months. We help you analyse the score report and plan a focused 4-week prep before retaking.",
    },
    {
      question: "Are weekend AZ-104 classes available in Pune?",
      answer:
        "Yes — Saturday and Sunday, 09:00–13:00, stretched over ~4 months instead of 2.5.",
    },
    {
      question: "What support do I get after the exam?",
      answer:
        "Six months of active placement support after course completion — mock Azure interviews, referrals via our alumni network, resume / LinkedIn / GitHub rewrites highlighting the new credential.",
    },
    {
      question: "Are the named trainers actually teaching?",
      answer:
        "Yogesh Patil and Vinod Patil personally lead every session of every batch.",
    },
    {
      question: "Is the certification exam fee included in the course fee?",
      answer:
        "No, and no honest institute includes it. The exam is booked and paid directly with Microsoft through their own portal, at their published price, and the voucher is issued in your name. Our fee covers the training, labs, mock exams and the guidance to book — separating the two is the only arrangement that lets you sit the exam whenever you are ready rather than whenever a batch ends.",
    },
    {
      question: "What happens if I fail the exam?",
      answer:
        "Microsoft sets the retake policy — there is a waiting period before a resit and the full fee applies again, so it is worth sitting only when your mock scores are consistently clear of the pass mark. From our side, you keep access to the mock papers and can rejoin a later batch's revision sessions at no cost. We would rather you delay a booking by three weeks than pay twice.",
    },
    {
      question: "How long does the certification stay valid?",
      answer:
        "Microsoft role-based certifications expire after one year and are renewed through a free online assessment on Microsoft Learn — shorter than the exam, but it does have to be done. Plan for that from the start: the recertification is considerably easier than the first attempt if you have been using the platform, and considerably harder if the certificate has been sitting on a CV while you worked on something else.",
    },
    {
      question: "Will I get hands-on practice, or only theory and practice questions?",
      answer:
        "Hands-on throughout, in your own Azure subscription, using the free credit where it covers the work. Every module has lab work, and the course builds a reference architecture you deploy yourself rather than watch. That matters beyond the exam: a certification with no deployed work behind it does not survive the first practical interview question, and Pune hiring panels ask them.",
    },
    {
      question: "Do I need experience before taking this course?",
      answer:
        "Microsoft recommends six months of hands-on Azure administration, and the exam is written as though you have it. This course assumes you are comfortable with the resource hierarchy and basic administration; week one levels the tooling floor across portal, CLI, PowerShell and Bicep. If you are entirely new to cloud, the Cloud & DevOps category covers the ground concepts first — a certification syllabus tests breadth across a platform rather than teaching what a virtual network or an identity policy is, and starting here without that background turns the course into memorisation.",
    },
    {
      question: "Is a certification enough to get hired in Pune?",
      answer:
        "It gets your CV read, which is a real and narrow benefit. Many Pune employers and staffing partners filter on it, and consulting partners often need certified staff contractually. What converts it into an offer is being able to answer the follow-up about something you actually built — so treat the certificate and the deployed project as one deliverable, not two.",
    },
  ],

  finalCta: {
    heading: "Ready to start AZ-104 preparation in Pune?",
    paragraph:
      "We have classroom, online, and weekend batches starting every 4–6 weeks. Reach out via the enquiry form or call us — Yogesh and Vinod are happy to assess your readiness and tell you whether to start with the broader Azure course or jump into this exam-focused track.",
  },
};
