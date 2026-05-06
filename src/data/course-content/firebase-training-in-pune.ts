import type { CourseRichContent } from "./types";

export const firebaseTrainingInPune: CourseRichContent = {
  intro:
    "Firebase is the de-facto Backend-as-a-Service (BaaS) for mobile-first applications in Pune startups — single-team mobile / web teams, solopreneurs, and early-stage fintech / consumer-tech companies use Firebase to ship full-stack mobile apps without building or operating a backend. Archer Infotech's Firebase Development training in Pune teaches the platform as it is actually used in 2026 — the modern Firebase stack on Google Cloud (post the 2024 'Firebase is now part of Google Cloud' branding rollup), Firestore for real-time document database, Firebase Authentication, Cloud Functions (now powered by Cloud Run under the hood), Firebase Hosting, Firebase Cloud Messaging, plus the newer additions (Firebase Genkit for GenAI, Firebase Data Connect for SQL-relational integration, Firebase App Hosting). The course is the right complement to our Android / Flutter / React Native / React courses for students who want to build full-stack mobile apps with one team. Classroom in Kothrud, online live, and weekend batches available.",

  whyLearn: {
    heading: "Why Learn Firebase in 2026",
    paragraphs: [
      "Firebase is the most-deployed mobile-app backend in Pune startup hiring — Indeed Pune doesn't list 'Firebase Developer' as a standalone job title (it's not), but Firebase fluency is listed as required or preferred on 800+ Pune mobile / full-stack JDs as of May 2026. The biggest employers using Firebase as production backend are Pune-based fintech / consumer-tech / health-tech / ed-tech startups, plus several Pune captives and BFSI mobile teams that use Firebase for specific apps. The economics are compelling — for early-stage and mid-stage companies, Firebase replaces a backend team with a managed service.",
      "What changed in 2026: Firebase has fully integrated into Google Cloud (the 2024 rollup). Cloud Functions for Firebase is now Cloud Run-backed under the hood. Firebase Genkit (released 2024) is the GenAI toolkit for building AI-powered features on Firebase. Firebase Data Connect (released 2024) brings managed Postgres into the Firebase ecosystem for the use cases where Firestore's document model isn't right. Firebase App Hosting (preview / GA in 2024–2025) is the modern deployment path for Next.js / Angular / Vue web apps with SSR support. Firestore has gotten Realtime Database-equivalent latency, plus better aggregations and indexing.",
      "What this means for hiring: 2026 Pune Firebase JDs (or rather, mobile / full-stack JDs that list Firebase) expect Firestore data-modelling at depth (the security-rules-driven access model is unique), Firebase Auth flows, Cloud Functions for serverless logic, FCM for push notifications, plus the newer additions where they earn their place (Genkit for GenAI, Data Connect for SQL).",
    ],
    keyPoints: [
      "Listed as required / preferred on 800+ Pune mobile / full-stack JDs (May 2026)",
      "De-facto BaaS for Pune startup mobile apps",
      "Firebase fully integrated into Google Cloud (2024 rollup)",
      "Firestore + Firebase Auth + Cloud Functions + FCM — the core 2026 stack",
      "Genkit for GenAI + Data Connect for SQL — 2024+ additions",
    ],
  },

  whoIsThisFor: {
    forYou: [
      "Working Android / iOS / Flutter / React Native developer wanting to add Firebase for full-stack mobile",
      "Working React / Next.js developer wanting Firebase for serverless backend",
      "Engineering / BCS / MCA student preparing for our mobile tracks (Firebase is a natural complement)",
      "Founder / solopreneur shipping a mobile MVP — Firebase is the right backend for solo / small teams",
      "Working backend developer wanting to add a managed BaaS to your toolkit",
      "Career restarter targeting Pune startup mobile-development",
    ],
    notForYou: [
      "If your goal is heavy-OLTP transactional workloads (financial-ledger style) — Firestore isn't the right tool",
      "If your goal is enterprise / BFSI backend — Firebase isn't the right institutional fit",
      "If you want SQL / relational depth — pick our Postgres or Oracle course",
      "If you cannot put in 5–6 hours per week of practice outside class",
      "If you have 2+ years of production Firebase experience — talk to us about advanced specialisations",
    ],
  },

  curriculum: [
    {
      title: "Firebase Foundations & Project Setup",
      weekRange: "Week 1",
      description:
        "What Firebase is in 2026 — a Google Cloud-integrated managed BaaS for mobile and web. Cover the project / app setup (Firebase Console, multiple environments via separate projects, the Firebase CLI for IaC-style deployments), the Firebase products map (Authentication, Firestore, Cloud Functions, Cloud Storage, Hosting, FCM, Crashlytics, Analytics, Remote Config, Test Lab — what each does and when each fits), plus the Firebase emulator suite (the local-dev environment that should be every Firebase developer's daily driver).",
      topics: [
        "Firebase Console + project setup",
        "Firebase CLI for deployments",
        "Firebase products map",
        "Firebase emulator suite for local dev",
        "Multi-environment patterns (dev / staging / prod)",
        "Pricing model awareness (Spark / Blaze plans)",
      ],
    },
    {
      title: "Firebase Authentication",
      weekRange: "Week 2",
      description:
        "Authentication at depth. Cover Firebase Auth providers (email / password, phone / OTP, Google / Apple / GitHub / Microsoft / Yahoo / Facebook / Twitter, anonymous auth, custom tokens for your own auth backend), the auth flow on each (mobile and web), the User object, custom claims for role-based access, the security implications (token expiry, refresh, Firebase Auth in security rules), plus the FirebaseUI library for fast prototyping. Plus the discipline of integrating Firebase Auth with backend services (verifying tokens server-side via the Admin SDK).",
      topics: [
        "Firebase Auth providers",
        "Email / password + OTP flows",
        "OAuth providers — Google / Apple / GitHub / Microsoft",
        "Anonymous auth and custom tokens",
        "Custom claims for RBAC",
        "FirebaseUI",
        "Admin SDK token verification",
      ],
    },
    {
      title: "Firestore — Document Modelling & Security Rules",
      weekRange: "Weeks 3–4",
      description:
        "Firestore is the heart of most Firebase apps. Cover the document / collection / subcollection model, document size limits (1MB), CRUD via the SDK (mobile + web + Admin), real-time listeners (the Firestore differentiator), batched writes and transactions, queries with where / orderBy / limit, plus the indexing model (auto-created single-field indexes; composite indexes you must declare). Then the unique-to-Firestore part — security rules — declarative access control written in a Rules Language, with the discipline of writing rules that genuinely secure your data (the topic where most Firebase production breaches happen).",
      topics: [
        "Document / collection / subcollection model",
        "CRUD via SDK and Admin SDK",
        "Real-time listeners",
        "Batched writes and transactions",
        "Queries — where / orderBy / limit",
        "Composite indexes",
        "Security rules in depth",
        "Rules-driven access control patterns",
      ],
    },
    {
      title: "Cloud Functions, Cloud Storage & FCM",
      weekRange: "Week 5",
      description:
        "Serverless Firebase. Cloud Functions for Firebase (Node.js / Python / Go / Java / .NET runtimes; v2 generation built on Cloud Run, with HTTP, Callable, scheduled, and Firestore-triggered patterns). Cloud Storage (file uploads, security rules-driven access, signed URLs). Firebase Cloud Messaging (FCM) — push notifications to iOS / Android / Web, topic / device-token / condition targeting, plus the discipline of crafting notifications that don't annoy users. Plus Firebase Hosting for static + SSR via App Hosting.",
      topics: [
        "Cloud Functions v2 (Cloud Run-backed)",
        "HTTP, Callable, scheduled, triggered functions",
        "Cloud Storage with security rules",
        "FCM — topics / tokens / conditions",
        "Notification patterns and frequency",
        "Firebase Hosting + App Hosting",
      ],
    },
    {
      title: "Firebase Genkit, Data Connect & Capstone",
      weekRange: "Week 6 + 1 week capstone",
      description:
        "The 2024+ Firebase additions. Firebase Genkit — the AI toolkit for building GenAI features on Firebase, with Gemini integration, plus the prompts-as-code pattern. Firebase Data Connect — managed Postgres for the use cases where Firestore's document model isn't right, with auto-generated typed SDKs from the schema. Plus a capstone project — a complete mobile app backed entirely by Firebase, with one Genkit AI feature.",
      topics: [
        "Firebase Genkit for GenAI",
        "Gemini integration via Genkit",
        "Firebase Data Connect (managed Postgres)",
        "Auto-generated typed SDKs",
        "Capstone implementation",
        "Resume + LinkedIn rewrite",
        "GitHub portfolio polish",
      ],
    },
  ],

  projects: [
    {
      title: "Full-Stack Mobile App on Firebase",
      description:
        "A complete mobile app with Firebase as the entire backend — pick a real domain (chat, expense tracker, recipe finder, fitness tracker). Firebase Auth (email / Google / Apple), Firestore for data with proper security rules, Cloud Functions for server-side logic (order processing, scheduled cleanups), Cloud Storage for file uploads, FCM for push notifications, plus Crashlytics and Analytics. Frontend can be Android / iOS / Flutter / React / React Native — whichever you've trained on. Outcome: a deployed mobile app + GitHub repo demonstrating the Firebase patterns that Pune startup mobile teams hire on.",
      technologies: [
        "Firebase Auth + Firestore + Cloud Functions",
        "Cloud Storage + FCM",
        "Crashlytics + Analytics",
        "Frontend: Android / iOS / Flutter / React / RN",
      ],
    },
    {
      title: "Genkit-Powered AI Feature on Firebase",
      description:
        "A 2026-relevant capstone — add a Gemini-powered AI feature to a Firebase app via Firebase Genkit (chat assistant, document Q&A, content recommendation, image-description). Demonstrates the modern Firebase + AI integration pattern.",
      technologies: [
        "Firebase Genkit",
        "Gemini via Vertex AI",
        "Firestore for conversation persistence",
        "Cloud Functions for the orchestration",
      ],
    },
  ],

  trainersIntro:
    "Your batch is led by Amol Patil (Senior Corporate Trainer, 10+ years, lead for the MERN / Mobile / Backend tracks at Archer Infotech) and Amol Chougule (Technical Trainer — Modern Web & Mobile, hands-on at Mindstix Software Labs). Both personally take sessions in every batch.",

  careerOutcomes: {
    paragraphs: [
      "Firebase fluency is increasingly expected on Pune mobile-developer / full-stack JDs — Indeed Pune doesn't list 'Firebase Developer' as a standalone title (it's not), but Firebase appears as required or preferred on 800+ Pune mobile / full-stack JDs. The biggest employers using Firebase are Pune-based fintech / consumer-tech / health-tech / ed-tech startups, plus several captives and BFSI mobile teams.",
      "Firebase is most valuable as a force-multiplier on existing mobile / full-stack roles — adding Firebase to your Android / iOS / Flutter / React profile makes you immediately useful at a startup or solo-developer setting. Compensation is similar to your underlying mobile / full-stack role; Firebase fluency doesn't itself create a separate salary band.",
      "The course doubles as an excellent foundation for our follow-on AI Engineer / Generative AI tracks — many AI-powered Pune mobile features are built on Firebase + Gemini.",
    ],
    salaryBands: [
      {
        role: "Mobile Developer with Firebase fluency (Pune entry, <2 years)",
        band: "₹4,00,000 – ₹7,00,000 per year",
        source: { label: "AmbitionBox Pune Mobile Developer", url: "https://www.ambitionbox.com/profile/mobile-application-developer-salary-in-pune" },
      },
      {
        role: "Mid-level Full Stack with Firebase (Pune, 3–5 years)",
        band: "₹10,00,000 – ₹17,00,000 per year",
        source: { label: "Glassdoor Pune Full Stack Developer", url: "https://www.glassdoor.co.in/Salaries/pune-full-stack-developer-salary-SRCH_IL.0,4_IM1072_KO5,25.htm" },
      },
      {
        role: "Senior Mobile / Full Stack with Firebase (Pune, 5–8 years)",
        band: "₹16,00,000 – ₹26,00,000 per year",
        source: { label: "Glassdoor Pune Senior Full Stack", url: "https://www.glassdoor.co.in/Salaries/pune-senior-full-stack-developer-salary-SRCH_IL.0,4_IM1072_KO5,32.htm" },
      },
    ],
    hiringCompanies: [
      "Pune-based fintech / consumer-tech / health-tech / ed-tech startups",
      "Pune solo-developer / freelance ecosystem",
      "BharatPe (Pune)",
      "Razorpay (Pune)",
      "Pine Labs (Pune)",
      "Drip Capital",
      "Innovaccer (Pune)",
      "Whatfix (Pune)",
      "BFSI mobile teams (specific apps)",
    ],
    rolesAfterCourse: [
      "Mobile Developer with Firebase fluency",
      "Full Stack Developer (Firebase backend)",
      "Junior Solutions Engineer at startups",
      "Solopreneur / freelancer shipping mobile apps",
      "Junior AI Engineer (with Genkit)",
    ],
  },

  modesAndDuration: {
    duration: "6 weeks of structured curriculum plus 1 week of capstone (~1.5 months total)",
    classroom: { location: "Archer Infotech, Kothrud, Pune", timing: ["Morning batch — 10:00 to 13:00", "Evening batch — 18:00 to 21:00"] },
    online: {
      timing: ["Same hours as classroom batches", "Recordings available for review"],
      tools: ["Zoom for live sessions", "Firebase Console + emulator suite", "Firebase CLI", "GitHub for capstone", "Slack / WhatsApp for async Q&A"],
    },
    weekend: { timing: ["Saturday + Sunday, 09:00 to 13:00"], durationNote: "Stretches over ~2.5 months instead of 1.5." },
    batchPolicy: "Maximum 15 students per batch.",
  },

  fees: {
    note:
      "Course fees range ₹20,000 – ₹90,000 depending on mode and concession — Firebase as a 1.5-month course typically lands at the lower end. Firebase Spark (free tier) covers all lab work; Blaze (pay-as-you-go) is needed only for Cloud Functions usage above the free quota.",
    range: "₹20,000 – ₹90,000",
    paymentOptions: [
      "Single payment with early-bird discount",
      "EMI in 2 instalments at no extra cost",
      "Corporate sponsorship — invoiced with GST",
    ],
  },

  placementSupport: {
    paragraphs: [
      "Placement focus for Firebase students is calibrated for Mobile / Full Stack roles where Firebase is a complement skill (not a standalone hireable specialisation). Our support is unconditional, time-bound (six months after course completion), and includes free re-entry to a future batch's interview-prep sessions.",
    ],
    process: [
      "Resume + LinkedIn rewrite emphasising Firebase fluency on top of mobile / full-stack background",
      "GitHub portfolio cleanup",
      "Mock interview rounds for Mobile / Full Stack roles",
      "Post-course referrals via our 17-year alumni network (with extra emphasis on Pune startups)",
      "Up to 6 months of continued support",
      "Free re-entry to future batch interview-prep sessions",
    ],
    partnerCompanies: [
      "Pune-based fintech / consumer-tech / health-tech / ed-tech startups",
      "BharatPe (Pune)",
      "Razorpay (Pune)",
      "Pine Labs (Pune)",
      "Drip Capital",
      "Innovaccer (Pune)",
      "Whatfix (Pune)",
    ],
  },

  comparison: {
    intro: "We compare ourselves against typical Pune Firebase training institutes on factual rows only.",
    rows: [
      { feature: "Trainers named with photos and LinkedIn", archer: "Yes — Amol Patil and Amol Chougule", typical: "No — generic branding" },
      { feature: "Firebase generation covered", archer: "Modern Firebase post Google Cloud rollup, Cloud Functions v2", typical: "Old Firebase (pre-2024 architecture)" },
      { feature: "Firestore depth", archer: "Document modelling + security rules + composite indexes — 2 weeks", typical: "Basic CRUD only" },
      { feature: "Security rules", archer: "Yes — full coverage with rules-driven access patterns", typical: "Mentioned only" },
      { feature: "Cloud Functions v2", archer: "Yes — Cloud Run-backed, all trigger types", typical: "v1 (legacy)" },
      { feature: "Firebase Genkit (GenAI)", archer: "Yes — capstone-eligible", typical: "Not covered" },
      { feature: "Firebase Data Connect (managed Postgres)", archer: "Yes — covered", typical: "Not covered" },
      { feature: "Public GitHub portfolio output", archer: "Yes — full-stack mobile app + Genkit AI feature", typical: "Local code on hard drive" },
      { feature: "Placement support", archer: "6 months, with free re-entry", typical: "1–3 months or vague" },
      { feature: "Batch size cap", archer: "15 students", typical: "25–40 students" },
    ],
    closing: "Compare with whoever you are considering.",
  },

  versusAlternative: {
    heading: "Firebase Standalone or Bundled With Mobile / Web Track?",
    paragraphs: [
      "Firebase as a standalone 1.5-month course is the right fit if you (1) already have mobile / web / full-stack background and want to add Firebase for startup hiring, (2) are a solopreneur / founder shipping a mobile app, or (3) want to add the modern Firebase + AI (Genkit) layer to your toolkit.",
      "Bundling Firebase with our Android / Flutter / React Native / React courses is the right fit if you are starting from zero — Firebase pairs cleanly with all four. Combined enrolment offers significant bundle savings.",
      "Honest recommendation: take Firebase standalone if you have a mobile / web / full-stack base. Take it bundled with one of the mobile or web tracks if you are starting from zero.",
    ],
  },

  prerequisitesAndStart: {
    paragraphs: [
      "Prerequisites: at least basic JavaScript or another programming language, basic familiarity with mobile or web development (you should have done at least one frontend track — Android, iOS, Flutter, React, RN, or web JS — before this course). Willingness to commit 5–6 hours per week of practice.",
    ],
    suggestedSteps: [
      "Decide your mode — classroom, online live, or weekend",
      "Check the upcoming batch dates",
      "Book a free 30-minute counselling call",
      "Confirm enrolment and complete pre-course orientation (Firebase account creation, Firebase CLI install)",
      "Show up to day one with a laptop running 64-bit OS",
    ],
  },

  faqs: [
    {
      question: "How long does Firebase training in Pune take at Archer Infotech?",
      answer: "Approximately 1.5 months — 6 weeks plus 1 week of capstone. Weekend batch ~2.5 months.",
    },
    {
      question: "Is Firebase free?",
      answer:
        "Firebase Spark is the free tier (generous quotas for development and small apps). Blaze is pay-as-you-go for production. The course lab work runs entirely on Spark for most students.",
    },
    {
      question: "What is the salary impact?",
      answer:
        "Firebase fluency adds value to existing Mobile / Full Stack roles rather than creating a separate salary band. Junior mobile developers with Firebase ₹4–7 lakh; mid-level full stack with Firebase ₹10–17 lakh; senior ₹16–26 lakh.",
    },
    {
      question: "Do I need a mobile or web background?",
      answer:
        "Yes — Firebase is a backend complement to a frontend stack. You should have done at least one frontend track (Android, iOS, Flutter, React, RN, or web JS) before this course.",
    },
    {
      question: "Will I work on real projects?",
      answer:
        "Yes — two capstone projects: (1) full-stack mobile app entirely on Firebase, (2) Genkit-powered AI feature on Firebase using Gemini.",
    },
    {
      question: "Is Genkit / GenAI covered?",
      answer:
        "Yes — week 6 covers Firebase Genkit and Gemini integration. Capstone Project #2 is a complete Genkit-powered feature.",
    },
    {
      question: "Are weekend Firebase classes available in Pune?",
      answer: "Yes — Saturday and Sunday, 09:00–13:00, stretched over ~2.5 months instead of 1.5.",
    },
    {
      question: "What is the fee?",
      answer: "Course fees range ₹20,000 – ₹90,000 depending on mode and concession.",
    },
    {
      question: "What support do I get after course completion?",
      answer:
        "Six months of placement support, referrals via our alumni network (extra emphasis on Pune startup scene), mock interviews.",
    },
    {
      question: "Are the named trainers actually teaching?",
      answer: "Amol Patil and Amol Chougule personally lead every session.",
    },
  ],

  finalCta: {
    heading: "Ready to start Firebase training in Pune?",
    paragraph:
      "We have classroom, online, and weekend batches starting every 3–4 weeks. Reach out via the enquiry form or call us — Amol Patil and Amol Chougule are happy to spend 30 minutes telling you whether the course fits your goal.",
  },
};
