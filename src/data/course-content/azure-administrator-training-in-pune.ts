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
  ],

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
  ],

  finalCta: {
    heading: "Ready to start AZ-104 preparation in Pune?",
    paragraph:
      "We have classroom, online, and weekend batches starting every 4–6 weeks. Reach out via the enquiry form or call us — Yogesh and Vinod are happy to assess your readiness and tell you whether to start with the broader Azure course or jump into this exam-focused track.",
  },
};
