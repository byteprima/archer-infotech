import type { CourseRichContent } from "./types";

export const androidDevelopmentTrainingInPune: CourseRichContent = {
  intro:
    "Android is the dominant mobile platform in India by a wide margin — roughly 95%+ of Indian smartphones run Android, and Pune product engineering teams (Razorpay Pune, BharatPe Pune, Pine Labs Pune, Amagi for connected-TV, Whatfix, Drip Capital, plus the Pune-based Android teams of every major BFSI app) hire Android engineers continuously. Archer Infotech's Android Development training in Pune teaches the platform as it is actually built in 2026 — Kotlin (Google's preferred language since 2019, now fully default), Jetpack Compose for UI (the modern declarative replacement for XML layouts), Coroutines + Flow for async, MVVM with Hilt dependency injection, Room for local persistence, Retrofit for networking, plus the production tail (Firebase integration, ProGuard, Play Console publishing). Classroom in Kothrud, online live, and weekend batches available.",

  whyLearn: {
    heading: "Why Learn Android in 2026",
    paragraphs: [
      "Android is the largest mobile-development hiring pool in Pune — Indeed Pune lists more than 700 active Android Developer / Mobile Developer (Android) openings as of May 2026. The biggest employers are Razorpay Pune, BharatPe Pune, Pine Labs Pune, Amagi (connected-TV Android apps), Whatfix Pune, Drip Capital, plus the Pune-based teams of major BFSI apps (HDFC, ICICI, Bajaj Finserv mobile, Kotak), e-commerce (Flipkart Pune teams), travel (MakeMyTrip Pune), plus the IT services majors with mobile-app practices (TCS, Infosys, Wipro, Cognizant, Capgemini).",
      "What changed in 2026: Kotlin is the default; Java is legacy for new code (Google last updated their Java tutorials years ago). Jetpack Compose is now the default for new UI; XML layouts are 'reading legacy code' territory. Coroutines + Flow have replaced RxJava as the async pattern. The Single-Activity + Navigation Compose pattern has eclipsed multi-Activity / Fragment architectures. Hilt has eclipsed Dagger 2 for dependency injection (it's a Hilt-on-top-of-Dagger productivity wrapper). Room is the universal local-database choice. Modern targetSdk 34+ and the Edge-to-Edge Insets-aware UI patterns are baseline.",
      "What this means for hiring: 2026 Pune Android JDs expect Kotlin fluency, Jetpack Compose at depth, Coroutines + Flow, MVVM with Hilt, Retrofit + Room, plus one published Play Store app (or a polished GitHub portfolio). Archer Infotech's curriculum is rebuilt around exactly these expectations — modern Android, Kotlin-first, Compose-first.",
    ],
    keyPoints: [
      "700+ active Android Developer roles on Indeed Pune (May 2026)",
      "Android = ~95% of Indian smartphones — by-far the largest mobile hiring pool",
      "Kotlin + Jetpack Compose + Coroutines + Hilt + Room — the 2026 stack",
      "Single-Activity + Navigation Compose — the modern architecture pattern",
      "Strong Pune fintech / consumer-tech / e-commerce hiring",
    ],
  },

  whoIsThisFor: {
    forYou: [
      "Engineering, BCS, MCA, or BSc-CS student targeting Android Developer roles",
      "Working web developer (any stack) wanting to switch to mobile",
      "Working Java developer wanting to add modern Android (Kotlin + Compose)",
      "Working AndroidJava developer wanting to migrate to Kotlin + Jetpack Compose",
      "Working iOS / Flutter developer wanting to add Android for cross-platform reach",
      "Career restarter targeting mobile-development as a high-demand re-entry path",
    ],
    notForYou: [
      "If you have no programming background — at least basic Java / Python / JavaScript / Kotlin is required",
      "If you cannot put in 8–10 hours per week of practice outside class",
      "If you only want a certificate sticker — Pune Android hiring screens hard on real Play Store apps or GitHub repos",
      "If your goal is iOS — pick our iOS / Swift course (or both for cross-platform reach)",
      "If you have 4+ years of production Android Compose experience — you'll be under-stretched",
    ],
  },

  curriculum: [
    {
      title: "Kotlin & Android Studio Foundations",
      weekRange: "Weeks 1–2",
      description:
        "Kotlin from a programmer-aware starting point. Cover the Kotlin essentials (variables, types, null safety with ?. and !!, control flow, functions, lambdas, data classes, sealed classes), Kotlin idioms (let / run / apply / also, scope functions), then Android Studio Hedgehog / Iguana setup, Gradle 8+ with Kotlin DSL, the Android project structure, the Activity / Application lifecycle. By the end of week 2 every student has a Hello-World app deployed to a physical device or emulator.",
      topics: [
        "Kotlin essentials — null safety, data classes, sealed classes",
        "Scope functions — let / run / apply / also",
        "Coroutines basics — suspend, launch, async",
        "Android Studio + Gradle 8+ with Kotlin DSL",
        "Project structure and resources",
        "Activity and Application lifecycle",
        "Emulator and physical device setup",
      ],
    },
    {
      title: "Jetpack Compose UI",
      weekRange: "Weeks 3–4",
      description:
        "The modern Android UI toolkit. Cover Composable functions, state hoisting (the React-like mental model), recomposition rules, Modifier system, layouts (Column, Row, Box, ConstraintLayout for Compose), Material 3 components, theming (light / dark / dynamic colour), animations (animateAsState, Crossfade, AnimatedVisibility), plus Compose Navigation. By the end of week 4 every student has built a multi-screen app with proper state management.",
      topics: [
        "Composable functions and recomposition",
        "State hoisting and remember",
        "Modifier system",
        "Layouts — Column, Row, Box, ConstraintLayout",
        "Material 3 components",
        "Theming — light / dark / dynamic colour",
        "Animations and motion",
        "Compose Navigation",
      ],
    },
    {
      title: "Architecture — MVVM, Hilt, Coroutines & Flow",
      weekRange: "Weeks 5–6",
      description:
        "Production architecture. MVVM with ViewModels (the AndroidX pattern), StateFlow and SharedFlow for reactive state, Hilt for dependency injection (the Hilt-on-Dagger productivity wrapper), Coroutines for structured concurrency (CoroutineScope, supervisorScope, exception handling), Flow operators (map / filter / combine / debounce / stateIn). Plus the discipline of layered architecture (UI / domain / data) — what most courses skip and what Pune hiring panels test for.",
      topics: [
        "MVVM with ViewModel",
        "StateFlow vs SharedFlow",
        "Hilt — modules, scopes, ViewModel injection",
        "Coroutines — structured concurrency",
        "Flow operators — map, filter, combine, debounce",
        "Layered architecture — UI / domain / data",
      ],
    },
    {
      title: "Networking, Persistence & Background Work",
      weekRange: "Weeks 7–8",
      description:
        "The data layer. Retrofit + OkHttp for REST APIs, Moshi or kotlinx.serialization for JSON, error handling, authentication with interceptors. Room for local SQLite — entities, DAOs, queries, migrations, type converters, plus the discipline of using Room as the source of truth (offline-first patterns). DataStore for key-value preferences (replacing SharedPreferences). WorkManager for deferrable background work, plus Foreground Services for long-running tasks. We finish with a complete app that works offline-first and syncs in the background.",
      topics: [
        "Retrofit + OkHttp + interceptors",
        "Moshi / kotlinx.serialization",
        "Room — entities, DAOs, queries, migrations",
        "DataStore for preferences",
        "WorkManager for deferred work",
        "Foreground Services",
        "Offline-first patterns",
      ],
    },
    {
      title: "Firebase, Push Notifications & Production Concerns",
      weekRange: "Week 9",
      description:
        "Firebase as the de-facto mobile-backend toolkit for Pune fintech / consumer apps. Cover Firebase Auth (email / Google / phone), Firestore for real-time data, Cloud Messaging (FCM) for push notifications, Crashlytics for crash reporting, Analytics, Remote Config. Plus production concerns — ProGuard / R8 minification, app-bundle vs APK, the Play Console publishing flow (signing keys, release tracks, staged rollouts), plus the Play App Signing pattern. Mention App Bundles, dynamic delivery, and the latest Play Store policies.",
      topics: [
        "Firebase Auth, Firestore, FCM, Crashlytics",
        "Remote Config and Analytics",
        "ProGuard / R8 minification",
        "App Bundle vs APK",
        "Play Console publishing flow",
        "Play App Signing",
        "Release tracks and staged rollouts",
      ],
    },
    {
      title: "Testing, Performance & Capstone",
      weekRange: "Weeks 10–11 + 1 week placement prep",
      description:
        "Testing — JUnit 5, MockK, Compose UI testing, Espresso for end-to-end. Performance — Macrobenchmark for startup / scrolling, Baseline Profiles, the discipline of measuring before optimising, Compose performance pitfalls (recomposition stability, derivedStateOf). Plus the capstone (see Capstone Projects). Mock interviews calibrated for Pune Android hiring panels — Razorpay / BharatPe / Pine Labs / Amagi / Whatfix / BFSI app teams.",
      topics: [
        "JUnit 5 + MockK",
        "Compose UI testing",
        "Espresso for end-to-end",
        "Macrobenchmark and Baseline Profiles",
        "Compose performance",
        "Capstone implementation",
        "Mock interviews — Android-specific rounds",
        "Resume + LinkedIn rewrite",
        "GitHub portfolio polish, Play Store publishing prep",
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
      title: "Production Android App with Compose + MVVM + Room + Retrofit",
      description:
        "A complete production-grade Android app — pick a real domain (expense tracker, recipe finder, fitness tracker, news reader, or BFSI-style finance dashboard). Jetpack Compose UI with Material 3, MVVM with Hilt, Coroutines + Flow, Retrofit for a real public API, Room for offline-first storage, Firebase Auth + FCM, plus full Compose UI tests + Macrobenchmark. Published to Play Store as an internal-test track (publishing fee covered by student — ~₹2,500). Outcome: a public GitHub repository plus a Play Store listing — exactly what Pune Android hiring panels look at first.",
      technologies: [
        "Kotlin + Jetpack Compose",
        "MVVM + Hilt + Coroutines + Flow",
        "Retrofit + Moshi",
        "Room + DataStore",
        "Firebase Auth + FCM",
        "Compose UI testing + Macrobenchmark",
        "Play Store internal-test track",
      ],
    },
    {
      title: "Real-Time Collaboration / Chat App",
      description:
        "A real-time application — Firebase Firestore or WebSocket-backed chat, presence, optimistic UI, offline message queue, push notifications via FCM, plus a small admin panel. Demonstrates the patterns Pune fintech / consumer-app teams hire on.",
      technologies: [
        "Kotlin + Compose",
        "Firebase Firestore + FCM",
        "MVVM + Hilt",
        "Compose Navigation",
        "Image / file uploads",
      ],
    },
    {
      title: "Offline-First BFSI / Fintech-Style App",
      description:
        "An offline-first finance / payments-style app — local Room database as source of truth, sync queue for network operations, secure storage for tokens (EncryptedSharedPreferences / SQLCipher), biometric auth (BiometricPrompt), strict data-handling for PII / financial data. Demonstrates the patterns Pune BFSI mobile teams (HDFC / ICICI / Razorpay / BharatPe) test for at interview.",
      technologies: [
        "Kotlin + Compose",
        "Room + SQLCipher for encrypted storage",
        "EncryptedSharedPreferences",
        "BiometricPrompt",
        "Sync queue patterns",
        "Network state handling",
      ],
    },
  ],

  trainersIntro:
    "Your batch is led by Amol Chougule (Technical Trainer — Modern Web & Mobile, hands-on at Mindstix Software Labs, ships Android Compose every day) and Ankita Hartale (Java Full Stack & Database Trainer, currently at Wipro). Both personally take sessions in every batch.",

  careerOutcomes: {
    paragraphs: [
      "Android Developer is the largest mobile-development hiring pool in Pune in 2026 — Indeed Pune lists 700+ active openings, with continuous hiring at Razorpay Pune, BharatPe Pune, Pine Labs Pune, Amagi, Whatfix, plus the Pune-based teams of major BFSI apps (HDFC, ICICI, Bajaj Finserv, Kotak), e-commerce (Flipkart Pune), travel (MakeMyTrip Pune), plus the IT services majors. Compensation tracks Java / backend developers within ±10% at every band; senior Android engineers in BFSI / fintech often earn a small premium because demand outstrips supply.",
      "What pulls an Android developer above the median band: Jetpack Compose fluency (the 2026 differentiator — many courses still teach XML), MVVM + Hilt + Coroutines architecture, one published Play Store app, plus testing discipline (Compose UI tests + Macrobenchmark). Our capstone projects are designed exactly around these signals.",
      "Senior Android Engineer bands at the top end are reported as national figures (Pune-specific Indeed pages do not exist for these specific titles); Pune trends within ±10% of these figures.",
    ],
    salaryBands: [
      {
        role: "Android Developer (Pune)",
        band: "₹6,28,000 per year average",
        source: { label: "Indeed Pune (Android Developer)", url: "https://in.indeed.com/career/android-developer/salaries/Pune--Maharashtra" },
      },
      {
        role: "Junior Android Developer (Pune entry, <2 years)",
        band: "₹3,50,000 – ₹6,50,000 per year",
        source: { label: "AmbitionBox Pune Android Developer", url: "https://www.ambitionbox.com/profile/android-developer-salary-in-pune" },
      },
      {
        role: "Mid-level Android Developer (Pune, 3–5 years)",
        band: "₹10,00,000 – ₹17,00,000 per year",
        source: { label: "Glassdoor Pune Android Developer", url: "https://www.glassdoor.co.in/Salaries/pune-android-developer-salary-SRCH_IL.0,4_IM1072_KO5,22.htm" },
      },
      {
        role: "Senior Android Developer (Pune, 5–8 years)",
        band: "₹16,00,000 – ₹28,00,000 per year",
        source: { label: "Glassdoor Pune Senior Android Developer", url: "https://www.glassdoor.co.in/Salaries/pune-senior-android-developer-salary-SRCH_IL.0,4_IM1072_KO5,29.htm" },
      },
      {
        role: "Lead Android Engineer (national, 8+ years)",
        band: "₹26,00,000 – ₹45,00,000 per year",
        source: { label: "6figr India Lead Android Engineer (Pune ±10%)", url: "https://6figr.com/in/salary/lead-android-engineer--t" },
      },
    ],
    hiringCompanies: [
      "Razorpay (Pune)",
      "BharatPe (Pune)",
      "Pine Labs (Pune)",
      "Amagi",
      "Whatfix (Pune)",
      "Drip Capital",
      "HDFC Bank (Pune mobile teams)",
      "ICICI Bank (Pune mobile)",
      "Bajaj Finserv",
      "Kotak Mahindra Bank",
      "MakeMyTrip (Pune)",
      "Flipkart (Pune)",
      "TCS",
      "Infosys",
      "Cognizant",
      "Capgemini",
    ],
    rolesAfterCourse: [
      "Android Developer",
      "Mobile Developer (Android)",
      "Junior Mobile Engineer",
      "Software Engineer (Mobile)",
      "Cross-platform Mobile Developer (with Flutter / RN extension)",
    ],
  },

  modesAndDuration: {
    duration: "11 weeks of structured curriculum plus 1 week of capstone and interview preparation (~3 months total). The original 4-month listing reflects optional extended evening format.",
    classroom: { location: "Archer Infotech, Kothrud, Pune", timing: ["Morning batch — 10:00 to 13:00", "Evening batch — 18:00 to 21:00", "Lab access available outside class hours"] },
    online: {
      timing: ["Same hours as classroom batches", "Recordings available for review"],
      tools: ["Zoom for live sessions", "GitHub for code reviews", "Android Studio + emulator", "Slack / WhatsApp for async Q&A"],
    },
    weekend: { timing: ["Saturday + Sunday, 09:00 to 13:00"], durationNote: "Stretches over ~5 months instead of 3." },
    batchPolicy: "Maximum 15 students per batch.",
  },

  fees: {
    note:
      "Course fees range ₹20,000 – ₹90,000 depending on mode and concession. Play Console developer fee (~₹2,500 one-time) is paid by the student.",
    range: "₹20,000 – ₹90,000",
    paymentOptions: [
      "Single payment with early-bird discount",
      "EMI in 2–3 instalments at no extra cost",
      "Corporate sponsorship — invoiced with GST",
    ],
  },

  placementSupport: {
    paragraphs: [
      "Placement support starts from week 9. By the end of the curriculum your resume highlights real published Android apps, your GitHub has at least two production-style repositories, and you have completed at least three mock technical interviews against question banks from Pune Android hiring teams.",
      "We say placement support, not placement guarantee. Our support is unconditional, time-bound (six months after course completion), and includes free re-entry to a future batch's interview-prep sessions.",
    ],
    process: [
      "Week 9 — resume + LinkedIn rewrite for Android JDs",
      "Week 10 — GitHub portfolio cleanup, Play Store listings",
      "Weeks 11–12 — three rounds of mock technical interviews",
      "Week 12 — HR mock and salary negotiation coaching",
      "Post-course — referrals via our 17-year alumni network at 12+ partner companies (extra emphasis on Pune fintech / BFSI mobile)",
      "Up to 6 months of continued support",
      "Free re-entry to future batch interview-prep sessions",
    ],
    partnerCompanies: [
      "Razorpay (Pune)",
      "BharatPe (Pune)",
      "Pine Labs (Pune)",
      "Amagi",
      "Whatfix (Pune)",
      "Bajaj Finserv",
      "TCS",
      "Infosys",
      "Cognizant",
      "Capgemini",
    ],
  },

  comparison: {
    intro: "We compare ourselves against typical Pune Android training institutes on factual rows only.",
    rows: [
      { feature: "Trainers named with photos and LinkedIn", archer: "Yes — Amol Chougule and Ankita Hartale", typical: "No — generic branding" },
      { feature: "Language taught as default", archer: "Kotlin (Java only as 'reading legacy')", typical: "Java-first or Java-only" },
      { feature: "UI toolkit covered", archer: "Jetpack Compose (XML only as 'reading legacy')", typical: "XML layouts as primary" },
      { feature: "Architecture", archer: "MVVM + Hilt + Coroutines + Flow", typical: "MVC or MVP, no DI framework" },
      { feature: "Async pattern", archer: "Coroutines + Flow", typical: "RxJava (legacy)" },
      { feature: "Testing in the curriculum", archer: "JUnit + MockK + Compose UI tests + Macrobenchmark", typical: "Theory only or skipped" },
      { feature: "Play Store publishing", archer: "Yes — every student publishes to internal-test track", typical: "Theory only" },
      { feature: "Public GitHub portfolio output", archer: "Yes — 3 capstone apps with CI badges", typical: "Local code on hard drive" },
      { feature: "Salary data shown", archer: "Cited from Indeed Pune + AmbitionBox + Glassdoor + 6figr", typical: "Single number with no source" },
      { feature: "Placement support", archer: "6 months, with free re-entry", typical: "1–3 months or vague" },
      { feature: "Batch size cap", archer: "15 students", typical: "25–40 students" },
    ],
    closing: "Compare with whoever you are considering. The right test is whether you can see actual student Compose-based Play Store apps before you pay.",
  },

  versusAlternative: {
    heading: "Android (Native) vs Flutter vs React Native — Which Should You Pick?",
    paragraphs: [
      "Native Android (this course) for the deepest Android fluency, the largest Pune mobile-developer hiring pool, and the platform-best UX for Indian users. Flutter for cross-platform reach (single codebase, iOS + Android), increasingly popular at Pune startups. React Native for teams already deep in React/JS, with the React Native New Architecture making it competitive on performance.",
      "Pune market reality: Native Android has the largest hiring pool (~700 openings), Flutter is growing fast (~400+ openings, especially at startups), React Native is smaller but well-paid (~250 openings, often at fintech). Many of our students learn native Android first for the depth, then add Flutter or React Native for cross-platform reach.",
      "Honest recommendation: Native Android if you want the deepest mobile-engineering depth and largest Pune hiring pool. Flutter if you want to ship to both iOS and Android with a single codebase. React Native if you have React background already and want to leverage it.",
    ],
  },

  prerequisitesAndStart: {
    paragraphs: [
      "Prerequisites: at least basic programming background (Java / Kotlin / Python / JavaScript / C# — any), basic OOP understanding, willingness to commit 8–10 hours per week of practice outside class. We expect basic programming fluency on day 1; we do not start from 'what is a variable'.",
    ],
    suggestedSteps: [
      "Decide your mode — classroom, online live, or weekend",
      "Check the upcoming batch dates",
      "Book a free 30-minute counselling call",
      "Confirm enrolment and complete pre-course orientation (Android Studio install, emulator setup, Play Console signup guide)",
      "Show up to day one with a laptop running 64-bit OS, 16GB+ RAM (recommended for emulator), 50GB+ free disk",
    ],
  },

  faqs: [
    {
      question: "How long does Android training in Pune take at Archer Infotech?",
      answer:
        "Approximately 3 months — 11 weeks of structured curriculum plus 1 week of capstone. Original 4-month listing is optional extended evening format. Weekend batch ~5 months.",
    },
    {
      question: "What is the salary of an Android Developer in Pune?",
      answer:
        "Indeed Pune ₹6.28 lakh average (May 2026). Junior ₹3.5–6.5 lakh per AmbitionBox. Mid-level ₹10–17 lakh per Glassdoor. Senior ₹16–28 lakh. Lead ₹26–45 lakh nationally with Pune ±10%.",
    },
    {
      question: "Should I learn Java or Kotlin?",
      answer:
        "Kotlin — Google's preferred language since 2019, the default for new Android code. We cover Java as 'reading legacy code' only.",
    },
    {
      question: "Jetpack Compose or XML layouts?",
      answer:
        "Jetpack Compose as default. XML covered as 'reading legacy code'. New Pune Android work in 2026 is overwhelmingly Compose.",
    },
    {
      question: "Will I work on real projects?",
      answer:
        "Yes — three capstone projects with one published to Play Store internal-test track.",
    },
    {
      question: "Native Android or Flutter / React Native?",
      answer:
        "Native Android for deepest fluency and largest Pune hiring pool. Flutter / RN for cross-platform reach.",
    },
    {
      question: "Are weekend Android classes available in Pune?",
      answer: "Yes — Saturday and Sunday, 09:00–13:00, stretched over ~5 months instead of 3.",
    },
    {
      question: "What is the fee?",
      answer: "Course fees range ₹20,000 – ₹90,000. Play Console fee (~₹2,500) paid by the student.",
    },
    {
      question: "What support do I get after course completion?",
      answer:
        "Six months of placement support, referrals via our alumni network at 12+ partner companies (extra emphasis on Pune fintech / BFSI mobile), resume / LinkedIn / GitHub rewrites.",
    },
    {
      question: "Are the named trainers actually teaching?",
      answer:
        "Amol Chougule and Ankita Hartale personally lead every session of every batch.",
    },
  ],

  finalCta: {
    heading: "Ready to start Android training in Pune?",
    paragraph:
      "We have classroom, online, and weekend batches starting every 4–6 weeks. Reach out via the enquiry form or call us — Amol Chougule and Ankita are happy to spend 30 minutes telling you whether the course fits your goal.",
  },
};
