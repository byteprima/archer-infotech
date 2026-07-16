import type { CourseRichContent } from "./types";

export const reactNativeTrainingInPune: CourseRichContent = {
  intro:
    "React Native is the dominant cross-platform mobile framework for teams already deep in React / JavaScript — Pune SaaS / fintech / consumer-tech companies that ship in React (Razorpay, BharatPe, Pine Labs, Amagi, plus most Pune product startups) often pick React Native for mobile so the same engineering team can work across web and mobile. Archer Infotech's React Native training in Pune teaches the framework as it is actually used in 2026 — React Native 0.76+ with the New Architecture (Fabric renderer + TurboModules + Bridgeless mode) finally stable and default, Expo SDK 51+ as the recommended development path for most apps, modern hooks (useState / useEffect / useTransition / useOptimistic via React 19), TanStack Query for server state, plus the production tail (Expo Application Services, Codepush alternatives, EAS Build, EAS Submit). Classroom in Kothrud, online live, and weekend batches available.",

  whyLearn: {
    heading: "Why Learn React Native in 2026",
    paragraphs: [
      "React Native is the right cross-platform choice for teams with React fluency — Indeed Pune lists 250+ active React Native Developer openings as of May 2026, with continuous hiring at Razorpay Pune, BharatPe Pune, Pine Labs Pune, Amagi, Pune-based fintech / consumer-tech / e-commerce startups, plus the Pune React Native teams of major BFSI apps. Compensation tracks Native Android within ±5% at every band, with the productivity multiplier of single-codebase development making senior React Native engineers attractive at startups.",
      "What changed in 2026: the React Native New Architecture (Fabric + TurboModules + Bridgeless mode) is finally stable and default in 0.76+, eliminating the old performance-vs-Flutter gap. Expo SDK 51+ has matured into the recommended development path for most apps (replacing the old 'bare workflow' as the default). React 19 features (useTransition, useOptimistic, useFormStatus, the React Compiler) are available. Reanimated 3 + Gesture Handler 2 have stabilised the animation / gesture story. The ecosystem has consolidated — TanStack Query for server state, Zustand / Jotai for client state, React Navigation 7 for navigation, NativeWind for Tailwind-style styling.",
      "What this means for hiring: 2026 Pune React Native JDs expect React + TypeScript fluency, the New Architecture, Expo SDK 51+, React Navigation 7, TanStack Query, plus one published app to either or both stores. Senior roles add platform-specific native modules, performance optimisation, and CI/CD with EAS.",
    ],
    keyPoints: [
      "250+ active React Native Developer roles on Indeed Pune (May 2026)",
      "New Architecture (Fabric + TurboModules + Bridgeless) finally stable in 0.76+",
      "Expo SDK 51+ — recommended development path for most apps",
      "Right framework for teams with React fluency",
      "Strong Pune fintech / consumer-tech / startup hiring",
    ],
  },

  whoIsThisFor: {
    forYou: [
      "Working React or Next.js developer wanting to ship mobile apps with same React fluency",
      "Engineering, BCS, MCA student with React background targeting cross-platform mobile",
      "Working JavaScript / TypeScript developer wanting to add mobile to your toolkit",
      "Cross-platform mobile developer wanting to add React Native to existing Flutter / native skills",
      "Career restarter targeting Pune startup mobile-development with web background",
    ],
    notForYou: [
      "If you have no React experience — take our React course first; this is React + a mobile platform",
      "If you have no JavaScript / TypeScript at the ES2020+ level",
      "If your goal is platform-specific deep features (iOS Apple Watch, Android Wear, ARKit / ARCore at depth)",
      "If you cannot put in 8–10 hours per week of practice outside class",
      "If you have 3+ years of production React Native experience with the New Architecture",
    ],
  },

  curriculum: [
    {
      title: "React Native Foundations & Expo",
      weekRange: "Weeks 1–2",
      description:
        "React Native from a React-aware starting point. Cover the React mental-model differences (no DOM — primitive components like View / Text / ScrollView; StyleSheet vs CSS), the New Architecture (Fabric renderer, TurboModules, Bridgeless mode — default in 0.76+), Expo SDK 51+ (the recommended path for most apps), Expo Router (the file-based navigation), the development setup (Expo Go, custom dev clients, simulator / emulator). By the end of week 2 every student has a multi-screen Expo Router app running on iOS simulator + Android emulator + Expo Go.",
      topics: [
        "React Native primitives — View, Text, ScrollView, FlatList",
        "StyleSheet vs CSS",
        "New Architecture — Fabric, TurboModules, Bridgeless",
        "Expo SDK 51+ vs bare workflow",
        "Expo Router — file-based navigation",
        "Expo Go vs custom dev client",
      ],
    },
    {
      title: "Layout, Styling & React 19 Hooks",
      weekRange: "Weeks 3–4",
      description:
        "Layout and styling. Flexbox in React Native (slightly different from web), absolute positioning, SafeAreaView for notch / home-indicator handling, plus styling approaches (StyleSheet API, NativeWind for Tailwind-style, styled-components). Modern React 19 hooks in mobile context — useState / useEffect / useTransition / useOptimistic / useFormStatus. Plus the React Compiler (auto-memoisation) which is available in React Native 0.76+.",
      topics: [
        "Flexbox in React Native",
        "SafeAreaView and Insets",
        "StyleSheet API",
        "NativeWind for Tailwind-style",
        "styled-components alternative",
        "React 19 hooks — useTransition, useOptimistic, useFormStatus",
        "React Compiler in React Native",
      ],
    },
    {
      title: "Navigation, Forms & TanStack Query",
      weekRange: "Weeks 5–6",
      description:
        "Navigation with React Navigation 7 (the de-facto choice — Expo Router is built on it), nested stacks, tabs, modals, deep linking. Forms — React Hook Form + Zod (the modern stack, same as web — direct skill transfer for React developers). Server state with TanStack Query — queries, mutations, invalidation, optimistic updates. The discipline of offline-first, network-state awareness with @tanstack/react-query persistent cache plus NetInfo.",
      topics: [
        "React Navigation 7 — stacks, tabs, modals",
        "Deep linking",
        "React Hook Form + Zod",
        "TanStack Query — queries, mutations",
        "Optimistic updates",
        "Offline-first with persistent cache",
        "NetInfo for network awareness",
      ],
    },
    {
      title: "Animations, Gestures & Real Native Features",
      weekRange: "Weeks 7–8",
      description:
        "Reanimated 3 for high-performance animations on the UI thread (no JS-to-native bridge cost), Gesture Handler 2 for native-feeling gestures (swipe, pinch, pan), plus the patterns for Hero-like shared-element transitions. Then the real-native features that distinguish 'mobile app' from 'web in a webview' — camera (expo-camera), location (expo-location), push notifications (expo-notifications), local storage (AsyncStorage / SecureStore), biometric auth (expo-local-authentication), plus the device APIs (sensors, haptics).",
      topics: [
        "Reanimated 3 — UI-thread animations",
        "Gesture Handler 2 — native gestures",
        "Shared-element transitions",
        "expo-camera for camera",
        "expo-location for GPS",
        "expo-notifications for push",
        "AsyncStorage / SecureStore",
        "expo-local-authentication for biometric",
        "Device sensors and haptics",
      ],
    },
    {
      title: "Native Modules, Platform Channels & Build Tooling",
      weekRange: "Week 9",
      description:
        "Beyond pure React Native. Cover native modules (when you need iOS / Android native code that isn't in Expo SDK or community packages), TurboModules in the New Architecture, Expo Modules API (the modern way to write native modules — TypeScript on the React side, Swift / Kotlin on the native side). Plus EAS Build for cloud builds, EAS Submit for store submission, Expo Application Services for the production toolchain replacing the old eject + manual-signing pattern.",
      topics: [
        "Native modules — when you need them",
        "TurboModules in the New Architecture",
        "Expo Modules API",
        "EAS Build for cloud builds",
        "EAS Submit for store submission",
        "Code signing",
      ],
    },
    {
      title: "Testing, Performance & Capstone",
      weekRange: "Weeks 10–11 + 1 week placement prep",
      description:
        "Testing — Jest for unit tests, React Native Testing Library for component tests, Detox or Maestro for end-to-end. Performance — Hermes JavaScript engine (default in 0.76+), Flipper / React Native DevTools for profiling, the discipline of avoiding bridge crossings (less of an issue now in Bridgeless mode), FlatList virtualisation. Capstone (see Capstone Projects). Mock interviews calibrated for Pune React Native hiring panels.",
      topics: [
        "Jest for unit tests",
        "React Native Testing Library",
        "Detox or Maestro for end-to-end",
        "Hermes engine",
        "Flipper / React Native DevTools",
        "FlatList virtualisation",
        "Capstone implementation",
        "Mock interviews — RN-specific rounds",
        "Resume + LinkedIn rewrite",
        "GitHub portfolio polish",
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
      title: "Production Cross-Platform App with Expo + React Navigation + TanStack Query",
      description:
        "A complete production-grade React Native app — pick a real domain (expense tracker, food-ordering app, fitness tracker, BFSI-style mobile dashboard). Expo SDK 51+ with the New Architecture, Expo Router for navigation, TanStack Query + Zustand for state, NativeWind for styling, real APIs (public or your own backend), camera + location + push notifications, SecureStore for tokens, biometric auth. EAS Build for cloud builds, EAS Submit to both Play Store internal-test and TestFlight (Play fee ~₹2,500; Apple Developer ~₹8,500 / year if iOS publishing).",
      technologies: [
        "Expo SDK 51+ + New Architecture",
        "Expo Router + React Navigation 7",
        "TanStack Query + Zustand",
        "NativeWind",
        "expo-camera / expo-location / expo-notifications",
        "EAS Build + EAS Submit",
      ],
    },
    {
      title: "Animation-Heavy / Gesture-Rich App",
      description:
        "A polished, animation-heavy React Native app — Reanimated 3 for UI-thread animations, Gesture Handler 2 for swipe / pinch / pan, Hero-like shared-element transitions between screens. Pick a domain that benefits from rich UX (photo viewer, music player, story-style content browser).",
      technologies: [
        "Reanimated 3",
        "Gesture Handler 2",
        "Shared-element transitions",
        "FlatList / FlashList for lists",
      ],
    },
    {
      title: "App with Custom Native Module via Expo Modules API",
      description:
        "A React Native app that includes a custom native module written via the Expo Modules API — pick a feature that isn't in Expo SDK or community packages (custom Bluetooth scanning, vendor-SDK integration, advanced biometric flow). Demonstrates the patterns senior React Native interviews test for at companies that need native depth.",
      technologies: [
        "Expo Modules API",
        "Swift (iOS native) + Kotlin (Android native)",
        "TypeScript bridge",
        "EAS Build with custom native code",
      ],
    },
  ],

  trainersIntro:
    "Your batch is led by Amol Chougule (Technical Trainer — Modern Web & Mobile, hands-on at Mindstix Software Labs) and Amol Patil (Senior Corporate Trainer, 10+ years, lead for the React / MERN tracks). Both personally take sessions in every batch.",

  careerOutcomes: {
    paragraphs: [
      "React Native Developer is a high-paying mid-volume role in Pune in 2026 — Indeed Pune lists 250+ active openings, with continuous hiring at Razorpay Pune, BharatPe Pune, Pine Labs Pune, Amagi, plus the Pune-based React Native teams of major BFSI apps. Compensation tracks Native Android within ±5% at every band; the talent supply is thinner than Native Android, which often favours React Native engineers at offer time.",
      "What pulls a React Native developer above the median band: React + TypeScript fluency, depth on the New Architecture (Fabric / TurboModules / Bridgeless mode), one published app to both stores via EAS, plus testing discipline (Jest + RN Testing Library + Detox).",
      "Senior React Native Developer bands at the top end are reported as national figures (Pune-specific Indeed pages do not exist for these specific titles); Pune trends within ±10% of these figures.",
    ],
    salaryBands: [
      {
        role: "React Native Developer (Pune)",
        band: "₹6,80,000 per year average",
        source: { label: "Indeed Pune (React Native Developer)", url: "https://in.indeed.com/career/react-native-developer/salaries/Pune--Maharashtra" },
      },
      {
        role: "Junior React Native Developer (Pune entry, <2 years)",
        band: "₹3,80,000 – ₹7,00,000 per year",
        source: { label: "AmbitionBox Pune React Native Developer", url: "https://www.ambitionbox.com/profile/react-native-developer-salary-in-pune" },
      },
      {
        role: "Mid-level React Native Developer (Pune, 3–5 years)",
        band: "₹11,00,000 – ₹18,00,000 per year",
        source: { label: "Glassdoor Pune React Native Developer", url: "https://www.glassdoor.co.in/Salaries/pune-react-native-developer-salary-SRCH_IL.0,4_IM1072_KO5,27.htm" },
      },
      {
        role: "Senior React Native Developer (Pune, 5–8 years)",
        band: "₹18,00,000 – ₹30,00,000 per year",
        source: { label: "Glassdoor Pune Senior React Native Developer", url: "https://www.glassdoor.co.in/Salaries/pune-senior-react-native-developer-salary-SRCH_IL.0,4_IM1072_KO5,34.htm" },
      },
      {
        role: "Lead React Native Engineer (national, 8+ years)",
        band: "₹28,00,000 – ₹48,00,000 per year",
        source: { label: "6figr India Lead RN Engineer (Pune ±10%)", url: "https://6figr.com/in/salary/lead-react-native-engineer--t" },
      },
    ],
    hiringCompanies: [
      "Razorpay (Pune)",
      "BharatPe (Pune)",
      "Pine Labs (Pune)",
      "Amagi",
      "Drip Capital",
      "Innovaccer (Pune)",
      "Whatfix (Pune)",
      "Bajaj Finserv (mobile teams)",
      "Pune-based fintech / consumer-tech startups",
      "TCS",
      "Infosys",
      "Cognizant",
      "Capgemini",
    ],
    rolesAfterCourse: [
      "React Native Developer",
      "Cross-Platform Mobile Developer",
      "Mobile + Web Engineer (React + RN)",
      "Junior Mobile Engineer",
      "Senior Frontend Engineer with mobile (with experience)",
    ],
  },

  modesAndDuration: {
    duration: "11 weeks of structured curriculum plus 1 week of capstone and interview preparation (~3 months total)",
    classroom: { location: "Archer Infotech, Kothrud, Pune", timing: ["Morning batch — 10:00 to 13:00", "Evening batch — 18:00 to 21:00"] },
    online: {
      timing: ["Same hours as classroom batches", "Recordings available for review"],
      tools: ["Zoom for live sessions", "GitHub for code reviews", "Expo Go on personal device + simulator", "Slack / WhatsApp for async Q&A"],
    },
    weekend: { timing: ["Saturday + Sunday, 09:00 to 13:00"], durationNote: "Stretches over ~5 months instead of 3." },
    batchPolicy: "Maximum 15 students per batch.",
  },

  fees: {
    note:
      "Course fees range ₹20,000 – ₹90,000 depending on mode and concession. EAS Build free tier covers most lab work. Play Console (~₹2,500 one-time) and optional Apple Developer Program (~₹8,500 / year) paid by the student.",
    range: "₹20,000 – ₹90,000",
    paymentOptions: [
      "Single payment with early-bird discount",
      "EMI in 2–3 instalments at no extra cost",
      "Corporate sponsorship — invoiced with GST",
    ],
  },

  placementSupport: {
    paragraphs: [
      "Placement support starts from week 9. By the end of the curriculum your resume highlights real published React Native apps, your GitHub has at least two production-style repositories, and you have completed at least three mock technical interviews.",
      "We say placement support, not placement guarantee. Our support is unconditional, time-bound (six months after course completion), and includes free re-entry to a future batch's interview-prep sessions.",
    ],
    process: [
      "Week 9 — resume + LinkedIn rewrite for React Native JDs",
      "Week 10 — GitHub portfolio cleanup, store listings",
      "Weeks 11–12 — three rounds of mock technical interviews",
      "Week 12 — HR mock and salary negotiation coaching",
      "Post-course — referrals via our 17-year alumni network at 12+ partner companies",
      "Up to 6 months of continued support",
      "Free re-entry to future batch interview-prep sessions",
    ],
    partnerCompanies: [
      "Razorpay (Pune)",
      "BharatPe (Pune)",
      "Pine Labs (Pune)",
      "Amagi",
      "Drip Capital",
      "Innovaccer (Pune)",
      "Whatfix (Pune)",
      "TCS",
      "Infosys",
      "Cognizant",
      "Capgemini",
    ],
  },

  comparison: {
    intro: "We compare ourselves against typical Pune React Native training institutes on factual rows only.",
    rows: [
      { feature: "Trainers named with photos and LinkedIn", archer: "Yes — Amol Chougule and Amol Patil", typical: "No — generic branding" },
      { feature: "React Native version covered", archer: "0.76+ with the New Architecture (Fabric / TurboModules / Bridgeless)", typical: "Older versions, old architecture" },
      { feature: "Expo coverage", archer: "Expo SDK 51+ as the recommended path", typical: "Bare workflow only" },
      { feature: "Navigation", archer: "Expo Router + React Navigation 7", typical: "Older patterns" },
      { feature: "Animations + gestures", archer: "Reanimated 3 + Gesture Handler 2 hands-on", typical: "Skipped or basic only" },
      { feature: "Native module authoring", archer: "Expo Modules API hands-on", typical: "Theory only" },
      { feature: "Build / submit tooling", archer: "EAS Build + EAS Submit hands-on", typical: "Manual eject + Xcode signing" },
      { feature: "Testing in the curriculum", archer: "Jest + RN Testing Library + Detox or Maestro", typical: "Skipped" },
      { feature: "Public GitHub portfolio output", archer: "Yes — apps published to both stores", typical: "Local code on hard drive" },
      { feature: "Placement support", archer: "6 months, with free re-entry", typical: "1–3 months or vague" },
      { feature: "Batch size cap", archer: "15 students", typical: "25–40 students" },
    ],
    closing: "Compare with whoever you are considering.",
  },

  versusAlternative: {
    heading: "React Native vs Flutter vs Native Android — Which Should You Pick?",
    paragraphs: [
      "React Native for teams already deep in React / JavaScript who want to leverage that knowledge for mobile. Flutter for teams without React background who want the most polished cross-platform experience and largest cross-platform hiring pool. Native Android for the deepest single-platform fluency and the largest Pune mobile hiring pool overall.",
      "Pune market reality: Native Android (~700 openings) > Flutter (~400) > React Native (~250). React Native wins where the existing team is React-heavy and JS-fluency translates directly. Many of our students learn React first, then add React Native as the natural mobile extension.",
      "Honest recommendation: React Native if you already know React or are targeting React-heavy mobile teams. Flutter if you want the broader cross-platform path with polished UX. Native Android if you want the largest Pune mobile hiring pool.",
    ],
  },

  prerequisitesAndStart: {
    paragraphs: [
      "Prerequisites: React fluency at the level of basic hooks / components / props / state, JavaScript ES2020+ at a working level, willingness to commit 8–10 hours per week of practice. If you have done our React course or equivalent self-study, you are ready. Pure JavaScript beginners should do our React course first.",
    ],
    suggestedSteps: [
      "Decide your mode — classroom, online live, or weekend",
      "Check the upcoming batch dates",
      "Book a free 30-minute counselling call",
      "Confirm enrolment and complete pre-course orientation (Node 22, Expo CLI install)",
      "Show up to day one with a laptop running 64-bit OS (macOS preferred for iOS publishing) and a smartphone for Expo Go testing",
    ],
  },

  faqs: [
    {
      question: "How long does React Native training in Pune take at Archer Infotech?",
      answer:
        "Approximately 3 months — 11 weeks of structured curriculum plus 1 week of capstone. Weekend batch ~5 months.",
    },
    {
      question: "What is the salary of a React Native Developer in Pune?",
      answer:
        "Indeed Pune ₹6.80 lakh average. Junior ₹3.8–7 lakh per AmbitionBox. Mid-level ₹11–18 lakh per Glassdoor. Senior ₹18–30 lakh. Lead ₹28–48 lakh nationally with Pune ±10%.",
    },
    {
      question: "Do I need React experience?",
      answer:
        "Yes — React fluency is required from day 1. If you are new to React, take our React course first.",
    },
    {
      question: "Expo or bare React Native?",
      answer:
        "Expo SDK 51+ as the recommended path — covers ~95% of app needs without ejecting. Bare workflow covered briefly for the cases where it's needed.",
    },
    {
      question: "Will I work on real projects?",
      answer:
        "Yes — three capstone projects with at least one published to both Play Store and TestFlight.",
    },
    {
      question: "React Native, Flutter, or Native Android?",
      answer:
        "RN if you have React background. Flutter if cross-platform without React. Native Android for largest Pune hiring pool.",
    },
    {
      question: "Are weekend React Native classes available in Pune?",
      answer: "Yes — Saturday and Sunday, 09:00–13:00, stretched over ~5 months instead of 3.",
    },
    {
      question: "What is the fee?",
      answer:
        "Course fees range ₹20,000 – ₹90,000. Play Console (~₹2,500) and optional Apple Developer (~₹8,500 / year) paid by the student.",
    },
    {
      question: "What support do I get after course completion?",
      answer:
        "Six months of placement support, referrals via our alumni network, mock interviews, salary negotiation.",
    },
    {
      question: "Are the named trainers actually teaching?",
      answer:
        "Amol Chougule and Amol Patil personally lead every session of every batch.",
    },
  ],

  finalCta: {
    heading: "Ready to start React Native training in Pune?",
    paragraph:
      "We have classroom, online, and weekend batches starting every 4–6 weeks. Reach out via the enquiry form or call us — Amol Chougule and Amol Patil are happy to spend 30 minutes telling you whether the course fits your goal.",
  },
};
