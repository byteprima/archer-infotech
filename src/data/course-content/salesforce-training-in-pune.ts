import type { CourseRichContent } from "./types";

/**
 * Salesforce Admin + Developer — rich content overlay.
 *
 * Tier 2 quality. Anchors:
 *  - Combined Admin (ADM 201) + Developer (PD1) track — the Pune hiring
 *    market overwhelmingly wants this combination, not pure Admin
 *  - Salary bands from AmbitionBox + LinkedIn Pune Salesforce listings
 *  - Hiring companies: services majors + Salesforce-native consulting partners
 *  - Cert exam costs explicitly separate from course fee
 *
 * Pillar 4 P3-01 rich content + P4-10 follow-up — third of 4.
 */

export const salesforceTrainingInPune: CourseRichContent = {
  intro:
    "Salesforce Admin + Developer is the most accessible high-paying platform engineering career in Pune for non-CS graduates and Java developers alike. This 3-month programme combines the declarative Admin track (Lightning, Flows, Validation Rules, Reports — aligned to ADM 201) with the programmatic Developer track (Apex, SOQL, Lightning Web Components — aligned to Platform Developer I / PD1). Hands-on throughout in a real Salesforce Developer Edition org, finishing with a deployed sample application and certification-ready exam preparation.",

  whyLearn: {
    heading: "Why Learn Salesforce in Pune in 2026",
    paragraphs: [
      "Salesforce is the world's #1 CRM platform with 150,000+ customer organisations and an ecosystem worth ~$1.6 trillion in attached jobs by 2028 (IDC estimate). Pune sits at the centre of India's Salesforce delivery: Cognizant's Pune Salesforce practice runs into the thousands of engineers, Accenture and TCS both have dedicated Pune Salesforce centres of excellence, and the boutique Salesforce-native partners — CloudFulcrum, Saksoft, Saviynt, Mphasis — concentrate their delivery teams here. Pune Salesforce role listings ran 400–700 per month consistently through 2025 across Naukri and LinkedIn, and the demand is structurally tied to enterprise digital transformation — not a hype cycle.",
      "What makes Salesforce uniquely attractive as a career path: high salary entry point, low coding barrier on the Admin side, structured certification ladder that directly maps to compensation increases, and global mobility. A Pune Salesforce Developer with 4 years experience + Platform Developer II cert can move to a US/Canada/Australia offer without changing employers — Salesforce's offshore practice is built around this mobility model. We don't oversell this; it's the realistic outcome for graduates who chase the cert ladder consistently.",
      "The Pune hiring market specifically wants combined Admin + Developer profiles ('Salesforce Consultant'), not pure-Admin or pure-Developer. Pure-Admin roles barely exist as fresher hiring tracks; pure-Developer roles expect Admin literacy. This is why the course is structured as a combined 3-month programme rather than two separate tracks — it matches what hiring managers actually screen for.",
    ],
    keyPoints: [
      "400–700 active Pune Salesforce job listings each month (2025)",
      "Fresher band ₹3.5–5 LPA services / ₹5–7 LPA Salesforce-native partners",
      "ADM 201 + PD1 stack = ₹0.5–1.5 LPA offer bump",
      "Sr Salesforce Developer in Pune = ₹10–18 LPA at 4–6 yrs",
      "Salesforce Architect / Lead Developer = ₹18–30 LPA at 7+ yrs",
      "Strong global mobility — offshore-to-onshore career arc",
    ],
  },

  whoIsThisFor: {
    forYou: [
      "Non-IT graduates (BBA, BCom, BCA, BSc) wanting a high-paying platform engineering career without traditional CS coursework",
      "Functional consultants and business analysts who want to add Salesforce platform skills",
      "Java developers pivoting to Salesforce platform engineering (Apex syntax is Java-like; the transition is structurally easy)",
      "Career changers from operations, sales support, or HR who already understand business processes",
      "Working professionals (weekend batch) committed to 6 hrs/week for 12 weeks plus 4–6 hrs/week of self-study for cert prep",
    ],
    notForYou: [
      "Anyone targeting pure-coding product-engineering roles — Salesforce is a platform, not a general-purpose language",
      "People who want a 100% hands-off learn-by-watching format — this course is heavy on org-based exercises and Trailhead Superbadges",
      "Candidates expecting to skip certifications — the Pune Salesforce hiring funnel filters hard on ADM 201 minimum, PD1 preferred",
      "Folks unwilling to invest extra in exam fees (~₹16,500 per cert, paid separately to Salesforce)",
    ],
  },

  curriculum: [
    {
      title: "Salesforce Platform Foundations + Admin Essentials",
      weekRange: "Week 1–3",
      description:
        "Start with the Salesforce ecosystem overview — Sales Cloud, Service Cloud, Marketing Cloud, Experience Cloud — and a clear map of which clouds the Pune services market hires for most (Sales Cloud + Service Cloud dominate). Org setup in a free Developer Edition. Standard object model (Account, Contact, Opportunity, Lead) with realistic data scenarios. User management, profiles, roles, and the permission set model that has replaced static profile-based permissions in 2024+. Page layouts, record types, and Lightning App Builder basics.",
      topics: [
        "Salesforce ecosystem overview + cloud product lines",
        "Developer Edition org setup + Trailhead Playground",
        "Standard objects: Account, Contact, Opportunity, Lead",
        "User management — Users, Profiles, Roles, Permission Sets",
        "Permission Set Groups (the modern security model)",
        "Page layouts + Record Types + Lightning Record Pages",
        "Reports + Dashboards basics",
      ],
    },
    {
      title: "Data Modelling, Security & Declarative Automation",
      weekRange: "Week 4–6",
      description:
        "The Admin track's technical core. Custom objects + custom fields with the full field type tour. Object relationships — lookup vs master-detail vs many-to-many junction objects — and when each is the right model. Validation rules + formula fields (a deeper module than most Pune institutes go; formula language is a screen-out question at hiring). Sharing rules + record-level security model — Salesforce's biggest interview area. Modern declarative automation: Flow Builder (Salesforce's recommended automation tool as of 2023+) replaces Process Builder for new work. Approval processes for business-routing scenarios.",
      topics: [
        "Custom objects + custom fields (full field type tour)",
        "Relationships — lookup, master-detail, many-to-many junctions",
        "Validation rules + formula fields (deep dive)",
        "Sharing model — org-wide defaults, role hierarchy, sharing rules",
        "Record-level security — manual sharing + Apex sharing primer",
        "Flow Builder — record-triggered, screen, scheduled flows",
        "Approval Processes for routing scenarios",
        "ADM 201 mock exam #1 (50 questions, timed)",
      ],
    },
    {
      title: "Apex Programming + SOQL/SOSL",
      weekRange: "Week 7–9",
      description:
        "The Developer track begins. Apex syntax — Java-like enough that Java developers cross this in days; the first 2 weeks for non-coders cover programming foundations before Apex specifics. Triggers + trigger frameworks (the industry-standard handler pattern, not the inline-logic-in-trigger anti-pattern). SOQL + SOSL with realistic query design including aggregate queries and parent-child traversal. Governor limits — Salesforce's hardest-to-grasp concept — taught with worked examples of how to refactor bulk-unsafe code. Apex testing + the 75% code coverage requirement (the most common PD1 exam failure point).",
      topics: [
        "Apex syntax + data types (for non-coders, gentle start)",
        "Triggers + the handler/dispatcher framework pattern",
        "SOQL — basic + aggregate + parent-child traversal",
        "SOSL for cross-object search",
        "Governor limits — the bulk-pattern discipline",
        "Apex testing + 75% coverage requirement",
        "Asynchronous Apex — Batch, Queueable, Future, Scheduled",
        "PD1 mock exam #1 (50 questions, timed)",
      ],
    },
    {
      title: "Lightning Web Components + Integration + Cert Finalisation",
      weekRange: "Week 10–12",
      description:
        "The modern UI layer + integration patterns + certification prep convergence. Lightning Web Components fundamentals — decorators (@api, @track, @wire), reactive properties, parent-child communication, Lightning Data Service. LWC + Apex integration (the most common LWC interview scenario). REST + SOAP API integration patterns for connecting Salesforce to external systems. Platform Events for event-driven architectures. The final weeks pivot to certification prep — ADM 201 and PD1 mock exams, Trailhead Superbadges (Apex Specialist, Lightning Web Components Specialist), and a structured cert-readiness review.",
      topics: [
        "LWC fundamentals + decorators (@api, @track, @wire)",
        "Reactive properties + component lifecycle",
        "LWC + Apex integration (the @AuraEnabled bridge)",
        "Lightning Data Service vs direct Apex calls",
        "REST + SOAP API integration patterns",
        "Platform Events basics",
        "ADM 201 + PD1 final mock exams (full 60-question timed)",
        "Trailhead Superbadges — Apex Specialist + LWC Specialist",
      ],
    },
  ],

  projects: [
    {
      title: "Custom CRM for a Sample Business",
      description:
        "Build a complete Salesforce org for a sample business — custom object model, page layouts, validation rules, automation flows, a sales funnel report dashboard. Demonstrates Admin track competency end-to-end. The artefact most hiring managers ask to walk through at interview.",
      technologies: ["Salesforce Lightning Experience", "Custom objects + relationships", "Flow Builder", "Validation Rules + Formula Fields", "Lightning App Builder", "Reports + Dashboards"],
    },
    {
      title: "Apex Trigger Framework with Bulk-Safe Patterns",
      description:
        "Implement a production-grade trigger handler framework on a custom object — full unit test coverage at 90%+, bulk-safe DML operations, governor-limit-aware design. Push to a GitHub repository with a README walking through the pattern. The portfolio piece that proves Developer competence to PD1-level hiring managers.",
      technologies: ["Apex (triggers + classes)", "Test classes + 90% coverage", "Handler/Dispatcher framework pattern", "SOQL + SOSL", "GitHub"],
    },
    {
      title: "LWC + Apex Mini-App (Capstone)",
      description:
        "A working Lightning Web Component that fetches Salesforce data via Apex, renders a custom UI with parent-child communication, handles errors gracefully, and writes back to the org. Includes unit tests for both the LWC (Jest) and the Apex back-end. This is the project that closes interviews for LWC-emphasised JDs at Pune Salesforce-native partners.",
      technologies: ["Lightning Web Components", "Apex", "Jest (LWC testing)", "Lightning Data Service", "Salesforce CLI", "VS Code Salesforce Extensions"],
    },
  ],

  trainersIntro:
    "Lead trainer for the Salesforce track has been an active Pune Salesforce delivery engineer for years — both certifications taught (ADM 201 + PD1) and platform patterns shown reflect what hiring managers screen for today, not certification material from 2018.",

  careerOutcomes: {
    paragraphs: [
      "Pune Salesforce hiring has two distinct bands. Services majors (Cognizant, Accenture, TCS, Wipro, Capgemini, Infosys) hire Salesforce fresher consultants at ₹3.5–5 LPA — usually for delivery on US/UK/AU client engagements where the offshore-to-onshore arc kicks in after 18–24 months. Salesforce-native consulting partners (CloudFulcrum, Saksoft, Saviynt, Mphasis Stelligent, Persistent's Salesforce practice) pay 30–50% more for fresher hires (₹5–7 LPA) because their billing model has higher per-engineer margins. Both bands expect ADM 201 minimum at hire; PD1 in 6 months is the implicit expectation.",
      "The compensation arc moves faster than most India tech tracks. 1+ year experience + ADM 201 + PD1 + a working LWC portfolio = ₹6–10 LPA. 3 years + Platform Developer II + integration patterns experience = ₹12–18 LPA. 6 years + Salesforce Architect or Application Architect certs = ₹20–30+ LPA. Onshore (US/UK/AU) Salesforce Developer offers at this experience band typically land $90K–140K USD. Source data: AmbitionBox + LinkedIn Pune Salesforce listings (last 12 months), cross-validated against Glassdoor Pune Salesforce salary reports.",
    ],
    salaryBands: [
      {
        role: "Salesforce Admin / Developer (fresher)",
        band: "₹3.5–5 LPA (services) / ₹5–7 LPA (Salesforce-native partner)",
        source: { label: "AmbitionBox Pune Salesforce Developer", url: "https://www.ambitionbox.com/profile/salesforce-developer-salary?experience=0" },
      },
      {
        role: "Salesforce Consultant (1–3 yrs)",
        band: "₹6–10 LPA",
        source: { label: "LinkedIn Pune Salesforce listings", url: "https://www.linkedin.com/jobs/search/?keywords=salesforce&location=Pune" },
      },
      {
        role: "Senior Salesforce Developer (3–6 yrs)",
        band: "₹12–18 LPA",
        source: { label: "Glassdoor Pune Salesforce Developer", url: "https://www.glassdoor.co.in/Salaries/pune-salesforce-developer-salary-SRCH_IL.0,4_IM1064_KO5,25.htm" },
      },
      {
        role: "Salesforce Architect / Lead (6+ yrs)",
        band: "₹18–30 LPA",
        source: { label: "AmbitionBox Pune Salesforce Architect", url: "https://www.ambitionbox.com/profile/salesforce-architect-salary" },
      },
    ],
    hiringCompanies: [
      "Cognizant Pune (Salesforce practice)",
      "Accenture Pune (Salesforce CoE)",
      "TCS Pune (CRM Next + Salesforce)",
      "Capgemini",
      "Wipro",
      "Infosys",
      "Mindtree (LTIMindtree)",
      "Tech Mahindra",
      "Persistent Systems (Salesforce practice)",
      "CloudFulcrum (Salesforce-native partner)",
      "Saksoft",
      "Saviynt",
      "Mphasis Stelligent",
      "Coforge",
      "IBM India (Salesforce practice)",
    ],
    rolesAfterCourse: [
      "Salesforce Administrator",
      "Salesforce Developer",
      "Salesforce Consultant (combined Admin+Dev)",
      "Salesforce Business Analyst",
      "Salesforce Platform Engineer",
      "Apex Developer",
      "LWC Developer (with Sr experience)",
    ],
  },

  modesAndDuration: {
    duration: "3 months (12 weeks) for the weekday/online track; 14 weeks for the weekend track",
    classroom: {
      location: "Archer Infotech Kothrud campus (Flat No. 12, Divyadarshan Housing Society, Kothrud, Pune 411038)",
      timing: [
        "Morning batch: Monday–Friday 10:30–12:00",
        "Evening batch: Monday–Friday 19:00–20:30",
        "Saturday lab session: 10:00–13:00 (Trailhead Superbadge + org practice)",
      ],
    },
    online: {
      timing: ["Live sessions: Monday–Friday 20:00–21:30 IST", "Recordings in LMS within 24 hrs"],
      tools: ["Google Meet for live sessions", "Salesforce Developer Edition org (free)", "Trailhead playground (free)", "VS Code + Salesforce Extensions (free)", "Slack batch channel"],
    },
    weekend: {
      timing: ["Saturday + Sunday 10:00–13:00 (6 hrs/week)"],
      durationNote: "Weekend track runs 14 weeks to maintain total contact-hour parity",
    },
    batchPolicy:
      "Batch sizes capped at 18 weekday + online, 12 weekend. New batches start every 4–6 weeks for the Salesforce track (slightly slower cadence than core dev tracks due to higher per-batch trainer demand). Book early — the track is among our most-requested.",
  },

  fees: {
    note: "Salesforce Admin + Developer is priced in the upper-mid band of our catalogue reflecting the 3-month duration and the per-batch trainer demand. Certification exam fees (ADM 201 ~₹16,500 / PD1 ~₹16,500) are paid separately to Salesforce when you sit for the exams. EMI available; contact admissions for current fee.",
    range: "₹35,000 – ₹50,000 (typical track band) + Salesforce exam fees if pursued",
    sourceCitation: { label: "Archer Infotech 2026 fee schedule", url: "/contact" },
    paymentOptions: [
      "One-time payment (5% discount)",
      "EMI: 50% at enrolment + 50% at week 6",
      "EMI: 3-month plan (1/3 monthly)",
      "Note: Salesforce exam fees billed separately by Salesforce when you sit",
    ],
  },

  placementSupport: {
    paragraphs: [
      "Placement support is bundled — no separate fee. The Salesforce placement pipeline runs slightly differently than our other tracks: services-major hiring tends to happen in 4 quarterly intake batches, while Salesforce-native partners hire continuously throughout the year. We map graduate readiness against both. The placement workflow starts in Week 8 (during the Apex module) — CV review, GitHub portfolio audit, cert-readiness check — so by graduation week your portfolio is reviewed and you've done 2 mock interviews.",
      "We don't guarantee placement. Our institute-records rate is 90% across all tracks. The Salesforce track runs slightly below average specifically because hiring managers gate hard on ADM 201 certification — graduates who postpone the cert exam beyond 6 weeks of course completion place noticeably slower. About 70–80% of our Salesforce graduates clear ADM 201 within 3 months of course completion; PD1 typically follows 3–6 months later.",
    ],
    process: [
      "Week 8: CV review + GitHub portfolio audit + cert-readiness check (ADM 201)",
      "Week 10: First mock interview (technical — Admin scenarios + basic Apex)",
      "Week 12: Second mock interview (LWC scenarios + integration patterns) + cert-readiness check (PD1)",
      "Post-completion Week 1–4: Direct introductions to 10+ partner companies (services + Salesforce-native)",
      "Post-completion Week 5–12: Weekly placement-cell check-ins + cert-prep coaching as you apply",
    ],
    partnerCompanies: [
      "Cognizant",
      "Accenture",
      "TCS",
      "Capgemini",
      "Persistent Systems (Salesforce practice)",
      "Wipro",
      "Infosys",
      "Coforge",
      "MindTree (LTIMindtree)",
      "100+ partner companies including the boutique Salesforce-native partner network",
    ],
  },

  comparison: {
    intro:
      "How Archer Infotech's Salesforce Admin + Developer track compares against the typical Pune training-institute offering. Anonymous comparison from candidates who switched in.",
    rows: [
      { feature: "Track structure", archer: "Combined Admin + Developer in one 12-week track (matches Pune hiring market)", typical: "Sold as 2 separate tracks (8-week Admin + 12-week Dev) totalling 20 weeks + higher fee" },
      { feature: "Automation tool taught", archer: "Flow Builder primary (Salesforce's 2023+ recommended tool); Process Builder mentioned as legacy", typical: "Process Builder still taught as primary — deprecated by Salesforce" },
      { feature: "Permission model coverage", archer: "Permission Set Groups (modern); profiles covered as legacy context", typical: "Profile-only model — the 2018 way" },
      { feature: "LWC depth", archer: "Full module + Jest unit testing + capstone LWC+Apex mini-app", typical: "LWC mentioned, no real component build" },
      { feature: "Trigger framework discipline", archer: "Handler/Dispatcher pattern + bulk-safe DML practice", typical: "Inline trigger logic — the anti-pattern" },
      { feature: "Cert prep depth (ADM 201 + PD1)", archer: "2 full timed mock exams per cert + Trailhead Superbadges", typical: "PowerPoint walkthrough only" },
      { feature: "Class size", archer: "Under 18 weekday / under 12 weekend", typical: "30–40 per batch" },
      { feature: "Placement cell handoff", archer: "Starts Week 8 — portfolio + certs aligned by graduation", typical: "Placement starts after course completion" },
    ],
    closing:
      "The differentiator at hiring stage is the combined Admin + Developer structure plus the LWC+Apex capstone. Pune Salesforce-native partners specifically look for the LWC capstone artefact on GitHub during the technical screen.",
  },

  versusAlternative: {
    heading: "Salesforce vs SAP / Oracle ERP — Which Platform Career Should You Pick?",
    paragraphs: [
      "All three are major enterprise platform careers with Pune delivery footprints, but the entry economics differ. Salesforce has the lowest barrier-to-entry for non-CS graduates because the Admin track is largely declarative — point-and-click, not code. SAP and Oracle ERP both require deeper functional consulting backgrounds at entry (1+ year of business process exposure). Salesforce hires faster off our course but the fresher salary band sits ₹0.5–1 LPA below the SAP fresher band. Trade-off: faster entry, slightly lower starting offer.",
      "On the career arc, Salesforce typically outperforms SAP and Oracle for 4–6 year experienced engineers because Salesforce's product evolution (Lightning, LWC, Einstein AI, Data Cloud) keeps adding new specialisations that pay above-market. SAP's pace is steadier but more entrenched. Honest read: if you have a coding inclination and want platform engineering with continuous innovation, Salesforce. If you have a deep business process background and want stable enterprise consulting, SAP. Both work in Pune.",
    ],
  },

  prerequisitesAndStart: {
    paragraphs: [
      "The Admin half of the course assumes no IT background; basic computer literacy is enough. About 40% of each batch come from non-CS backgrounds (BBA, BCom, BCA, BSc-non-CS) and finish at the same level. The Developer half (Apex, LWC) does involve programming, and we allocate the first ~2 weeks of the Developer module specifically to programming foundations for non-coders — variables, control flow, functions, basic OOP. Java developers pivoting in skip this fast and accelerate through Apex/LWC; non-coders catch up by end of Module 3 with structured practice.",
      "The 5-step starting sequence below makes Week 1 smoother. Most of it is free.",
    ],
    suggestedSteps: [
      "Sign up for a free Salesforce Developer Edition org at developer.salesforce.com — we'll use this throughout",
      "Create a free Trailhead account — Trailhead is Salesforce's gamified learning platform; you'll earn badges + Superbadges through the course",
      "Install VS Code + the Salesforce Extension Pack (free)",
      "Watch the Salesforce 'Trailhead Quick Start' module (~30 min) so the platform UI is familiar before Week 1",
      "Set up a GitHub account — your Apex trigger framework + LWC capstone will live there as portfolio artefacts",
    ],
  },

  faqs: [
    {
      question: "Should I start with Admin or Developer first?",
      answer:
        "Both — and the course handles the sequencing for you. The Pune Salesforce hiring market overwhelmingly hires combined Admin + Developer profiles ('Salesforce Consultant'), not pure-Admin or pure-Developer. We sequence Admin first (lower complexity, builds platform fluency) then Developer (deeper). Splitting them into separate tracks costs 4 extra weeks and a higher fee for no hiring-market advantage.",
    },
    {
      question: "Do I need programming experience to take this course?",
      answer:
        "Not for the Admin half — about 40% of each batch comes from non-CS backgrounds (commerce, BBA, science) and completes the Admin track at the same level as engineering graduates. The Developer half (Apex, LWC) does involve programming but starts gently — Apex syntax is Java-like and we dedicate the first ~2 weeks specifically to programming foundations for non-coders. By Module 4 the cohorts converge.",
    },
    {
      question: "What does Salesforce certification cost and is it included?",
      answer:
        "Course prep is included; the exam fees are paid separately to Salesforce. ADM 201 (Administrator) ~₹16,500, PD1 (Platform Developer I) ~₹16,500. You sit for the exams when you're ready — typically 6 weeks for ADM 201 and 3–6 months later for PD1. About 70–80% of our trainees clear ADM 201 within 3 months of course completion; PD1 clearance rate at first attempt sits around 60–70% which is in line with the global Salesforce average.",
    },
    {
      question: "What does the Pune Salesforce job market actually look like?",
      answer:
        "Strong and structural, not hype. Pune hosts the Salesforce delivery centres of every major services firm — Cognizant, Accenture, TCS, Capgemini, Wipro, Infosys — plus Salesforce-native consulting partners (CloudFulcrum, Saksoft, Saviynt, Mphasis Stelligent). 400–700 active Salesforce listings per month across Naukri + LinkedIn in 2025. Fresher salaries ₹3.5–5 LPA at services majors, ₹5–7 LPA at Salesforce-native partners. Source: AmbitionBox + LinkedIn Pune Salesforce listings, last 12 months.",
    },
    {
      question: "Can I transition from a non-IT job to Salesforce in 3 months?",
      answer:
        "Realistic timeline: 3 months of focused course work + 4–6 weeks of dedicated cert prep + 1–2 months of active applications = first offer typically in 5–6 months from enrolment. About 40% of our Salesforce graduates come from non-IT backgrounds. The path works; it requires consistency on cert completion and a willingness to do 4–6 hrs/week of additional Trailhead practice beyond classroom hours.",
    },
    {
      question: "Will the course cover Salesforce Marketing Cloud, Service Cloud, or Industry Clouds?",
      answer:
        "Sales Cloud + Service Cloud are covered at depth (they make up 80% of Pune hiring). Marketing Cloud has its own architecture and is typically a separate specialisation track — out of scope here. Industry Clouds (Health Cloud, Financial Services Cloud) build on the Sales Cloud foundation — covered conceptually in the closing weeks so you can pivot into them post-course. Experience Cloud (community / portal) is covered in the Lightning module.",
    },
    {
      question: "What about Data Cloud and Einstein AI / Agentforce?",
      answer:
        "Both are covered as introductions in the closing weeks. Data Cloud is Salesforce's customer data platform — the fundamentals get a session. Agentforce (Salesforce's 2024 agentic AI layer) is covered conceptually with hands-on tool-call configuration. Deep specialisation in either requires a follow-on focused track; the goal here is enough literacy to discuss both at interview, not architect-level depth.",
    },
    {
      question: "What if I want to relocate or work onshore (US/UK/Australia) eventually?",
      answer:
        "Salesforce has one of the cleanest offshore-to-onshore career arcs of any platform stack. Realistic timing: 18–24 months at a services major in Pune + relevant client engagement on US/UK/AU accounts + the right certifications (typically ADM 201 + PD1 + Application Architect by year 5) = onshore deputation or transfer offers become realistic. Onshore Salesforce Developer base salaries land $90K–140K USD typically. We don't promise this; we map the realistic path.",
    },
  ],

  finalCta: {
    heading: "Ready to start Salesforce training in Pune?",
    paragraph:
      "Three months from now you can have ADM 201 + PD1 prep complete, a deployed CRM org on your portfolio, a working Apex trigger framework + LWC capstone on GitHub, and a placement cell actively introducing you to Pune Salesforce hiring managers. The next batch typically starts within 4 weeks; weekday, weekend, and live-online formats all available. Visit the contact page, message us on WhatsApp, or call admissions for the current batch schedule.",
  },
};
