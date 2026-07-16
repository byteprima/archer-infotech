import type { CourseRichContent } from "./types";

export const flutterDevelopmentTrainingInPune: CourseRichContent = {
  intro:
    "Flutter is the dominant cross-platform mobile framework in Pune startup hiring — single codebase ships to iOS, Android, web, and increasingly desktop, with native-class performance via the Dart-to-AOT compilation. Pune fintech and consumer-tech companies (BharatPe Pune for some apps, Razorpay Pune for some clients, Drip Capital, plus most Pune fintech / health-tech / ed-tech early-stage startups) ship in Flutter to maximise reach with limited mobile-team headcount. Archer Infotech's Flutter Development training in Pune teaches the framework as it is actually used in 2026 — Flutter 3.x with Dart 3.x null-sound safety, Material 3 widgets, Cupertino widgets for iOS-feel, state management with Riverpod (the modern default) plus Bloc for the production / large-app case, plus Firebase integration and the production tail (signing, App Store / Play Store deployment). Classroom in Kothrud, online live, and weekend batches available.",

  whyLearn: {
    heading: "Why Learn Flutter in 2026",
    paragraphs: [
      "Flutter has eclipsed React Native as the dominant cross-platform framework in Indian startup hiring — Indeed Pune lists more than 400 active Flutter Developer openings as of May 2026, with continuous hiring at BharatPe Pune, Drip Capital, Pune-based ed-tech / health-tech startups, plus several BFSI mobile teams that have adopted Flutter for new apps. The single-codebase economics are compelling — for early-stage and mid-stage companies, one Flutter team replaces two native (Android + iOS) teams.",
      "What changed in 2026: Dart 3.x has matured (sound null safety, pattern matching, records, sealed classes, plus the new macro system). Flutter 3.x has stabilised across iOS / Android / Web / desktop. The Impeller rendering engine (replacing Skia for iOS) has shipped with strong performance. Material 3 widgets are the default; Cupertino widgets for the iOS-platform look. State management has settled — Riverpod (the modern default for new projects) for most cases, Bloc for the production / large-app case, GetX for legacy code. Firebase remains the de-facto backend for Flutter apps.",
      "What this means for hiring: 2026 Pune Flutter JDs expect Dart 3.x fluency, Flutter 3.x at depth, Riverpod or Bloc, Firebase integration, plus one published app on either Play Store or App Store. Senior roles add Custom Painter / RenderObject for advanced UI, platform channels for native integration, and CI/CD with Codemagic or Bitrise.",
    ],
    keyPoints: [
      "400+ active Flutter Developer roles on Indeed Pune (May 2026)",
      "Dominant cross-platform framework in Indian startup hiring",
      "Single codebase ships to iOS + Android + Web + Desktop",
      "Riverpod + Bloc — the modern state-management defaults",
      "Strong Pune fintech / consumer-tech / startup hiring",
    ],
  },

  whoIsThisFor: {
    forYou: [
      "Engineering, BCS, MCA, or BSc-CS student targeting cross-platform mobile roles",
      "Working web developer (any stack) wanting to switch to mobile with maximum cross-platform reach",
      "Working Android-only or iOS-only developer wanting to add the other platform via Flutter",
      "Working Java / Kotlin / Swift developer wanting to add Dart for startup hiring",
      "Founder / solopreneur shipping a mobile MVP — Flutter is the right framework for solo / small teams",
      "Career restarter targeting the Pune startup mobile-development scene",
    ],
    notForYou: [
      "If you have no programming background — at least basic Java / Kotlin / JavaScript / Python is required",
      "If your goal is platform-specific deep features (iOS Apple Watch, Android Wear, ARKit / ARCore at depth) — pick native iOS or Android",
      "If you cannot put in 8–10 hours per week of practice outside class",
      "If you only want a certificate sticker — Pune Flutter hiring screens hard on real apps and GitHub",
      "If you have 3+ years of production Flutter experience — talk to us about advanced specialisations",
    ],
  },

  curriculum: [
    {
      title: "Dart 3.x Foundations & Flutter Tooling",
      weekRange: "Weeks 1–2",
      description:
        "Dart 3.x from a programmer-aware starting point. Cover Dart essentials (variables, types, sound null safety with !, control flow, functions, classes, mixins), Dart 3 features (pattern matching, records, sealed classes, the new macro system in preview), async / await with Future and Stream. Flutter setup — Flutter SDK, Android Studio + Flutter plugin or VS Code + Flutter extension, the project structure, hot reload / hot restart, the device / emulator setup. By the end of week 2 every student has a Hello-World Flutter app running on iOS simulator + Android emulator + Chrome web.",
      topics: [
        "Dart 3 — null safety, pattern matching, records, sealed classes",
        "async / await with Future and Stream",
        "Dart macro system preview",
        "Flutter SDK + IDE setup",
        "Hot reload vs hot restart",
        "Project structure and pubspec.yaml",
      ],
    },
    {
      title: "Widgets, Layouts & Material 3",
      weekRange: "Weeks 3–4",
      description:
        "Flutter is widgets all the way down. Cover the widget tree mental model, StatelessWidget vs StatefulWidget, the build method and BuildContext, layout widgets (Column, Row, Stack, Container, Padding, Expanded, Flex, Wrap), Material 3 widgets (the default), Cupertino widgets for iOS-platform look, theming (light / dark / dynamic colour), responsive layout (LayoutBuilder, MediaQuery, OrientationBuilder), plus Custom Painter for advanced UI.",
      topics: [
        "Widget tree mental model",
        "StatelessWidget vs StatefulWidget",
        "Layout widgets — Column, Row, Stack, Container",
        "Material 3 widgets",
        "Cupertino widgets for iOS",
        "Theming and dynamic colour",
        "Responsive layout",
        "Custom Painter for advanced UI",
      ],
    },
    {
      title: "State Management — Riverpod & Bloc",
      weekRange: "Weeks 5–6",
      description:
        "State management as Pune Flutter teams actually do it. Riverpod (the modern default for new projects) — providers, ConsumerWidget, the AsyncNotifier pattern, plus the type-safe code-generation with riverpod_generator. Bloc / Cubit (the production / large-app default for many Pune teams) — events, states, BlocProvider, BlocBuilder. Plus the honest comparison — when Riverpod earns its complexity, when Bloc earns its boilerplate, when GetX appears in legacy code. We finish by building the same small app in both Riverpod and Bloc to feel the difference.",
      topics: [
        "Riverpod — providers, ConsumerWidget, AsyncNotifier",
        "riverpod_generator for code gen",
        "Bloc / Cubit — events, states",
        "BlocProvider, BlocBuilder, BlocListener",
        "GetX as legacy",
        "When each fits",
      ],
    },
    {
      title: "Networking, Persistence & Firebase",
      weekRange: "Weeks 7–8",
      description:
        "The data layer. http or Dio for REST APIs, GraphQL with graphql_flutter, JSON serialisation with json_serializable + build_runner, error handling. Local persistence — Drift (Dart ORM over SQLite, the modern choice), SharedPreferences for key-value, Isar for the NoSQL alternative. Firebase as the de-facto backend — Firebase Auth, Firestore, Cloud Messaging, Crashlytics, Analytics. Plus offline-first patterns and real-time updates via Firestore listeners or WebSocket.",
      topics: [
        "http / Dio for REST",
        "GraphQL with graphql_flutter",
        "JSON serialisation",
        "Drift ORM over SQLite",
        "SharedPreferences and Isar",
        "Firebase — Auth, Firestore, FCM, Crashlytics",
        "Offline-first patterns",
        "Real-time updates",
      ],
    },
    {
      title: "Navigation, Forms & Animations",
      weekRange: "Week 9",
      description:
        "Navigation 2.0 with go_router (the modern Pune default replacing manual Navigator), nested routes, deep linking. Forms — Form widget, validation, FormBuilder for complex forms, plus the discipline of error handling and accessibility (semantic labels, focus management). Animations — implicit (AnimatedContainer / AnimatedOpacity), explicit (AnimationController + Tween), Hero animations, plus the rive / lottie integrations for designer-driven animation.",
      topics: [
        "go_router for navigation",
        "Nested routes and deep linking",
        "Forms with validation",
        "FormBuilder for complex forms",
        "Implicit and explicit animations",
        "Hero animations",
        "rive / lottie integration",
      ],
    },
    {
      title: "Native Integration, Platform Channels & Production",
      weekRange: "Week 10",
      description:
        "Beyond pure Dart. Cover platform channels (calling iOS / Android native code from Dart), method channels and event channels, plus the FFI (Foreign Function Interface) for direct native-library calls. Then production concerns — app signing for both iOS and Android, code obfuscation, the Play Store + App Store publishing flows, plus CI/CD with Codemagic or Bitrise for automated builds across both platforms.",
      topics: [
        "Platform channels — method, event",
        "FFI for native libraries",
        "iOS code signing",
        "Android signing and ProGuard",
        "Play Store + App Store publishing",
        "CI/CD with Codemagic / Bitrise",
      ],
    },
    {
      title: "Testing, Performance & Capstone",
      weekRange: "Weeks 11–12 + 1 week placement prep",
      description:
        "Testing — unit tests with the test package, widget tests with flutter_test, integration tests with integration_test. Performance — DevTools profiling, the Impeller rendering engine, jank elimination patterns, memory profiling. Capstone (see Capstone Projects). Mock interviews calibrated for Pune Flutter hiring panels.",
      topics: [
        "Unit tests with test package",
        "Widget tests with flutter_test",
        "Integration tests",
        "DevTools profiling",
        "Impeller rendering engine",
        "Jank elimination",
        "Capstone implementation",
        "Resume + LinkedIn rewrite",
        "GitHub portfolio polish",
        "Mock interviews",
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
      title: "Production Cross-Platform App with Riverpod + Firebase",
      description:
        "A complete production-grade Flutter app shipped to both iOS and Android — pick a real domain (expense tracker, recipe finder, fitness tracker, news reader, BFSI-style finance dashboard). Material 3 + Cupertino widgets for platform-appropriate UI, Riverpod for state, Drift for offline storage, Firebase Auth + Firestore + FCM, plus widget + integration tests. Published to Play Store internal-test track + TestFlight (Apple developer fee paid by student — ~₹8,500 / year if iOS publishing is desired; Android Play fee ~₹2,500 one-time). Outcome: a public GitHub repository plus deployment URLs.",
      technologies: [
        "Flutter 3.x + Dart 3.x",
        "Material 3 + Cupertino widgets",
        "Riverpod state management",
        "Drift ORM + Firebase",
        "Widget + integration tests",
        "Codemagic CI/CD",
      ],
    },
    {
      title: "Real-Time / Streaming-Heavy App",
      description:
        "A real-time streaming app — chat, collaborative whiteboard, or live-feed app. WebSocket or Firestore for real-time, optimistic UI, offline message queue, push notifications. Demonstrates the patterns Pune fintech / consumer-app teams hire on for real-time / collaboration features.",
      technologies: [
        "Flutter + Riverpod / Bloc",
        "WebSocket or Firestore real-time",
        "FCM push notifications",
        "Offline-first patterns",
      ],
    },
    {
      title: "Cross-Platform App with Native Platform Channels",
      description:
        "A Flutter app that meaningfully integrates with native iOS / Android — biometric auth (BiometricPrompt on Android, LocalAuthentication on iOS), platform-specific notifications, sensor data (accelerometer, location), plus a native-only feature exposed via platform channels. Demonstrates the patterns senior Flutter interviews test for.",
      technologies: [
        "Flutter + platform channels",
        "Biometric auth on both platforms",
        "Platform-specific notifications",
        "Sensor APIs",
      ],
    },
  ],

  trainersIntro:
    "Your batch is led by Amol Chougule (Technical Trainer — Modern Web & Mobile, hands-on at Mindstix Software Labs, ships Flutter every day). Amol personally leads every session of every batch.",

  careerOutcomes: {
    paragraphs: [
      "Flutter Developer is the dominant cross-platform mobile role in Pune startup hiring — Indeed Pune lists 400+ active openings, with continuous hiring at BharatPe Pune, Drip Capital, plus the broader Pune fintech / health-tech / ed-tech startup scene. Compensation tracks Native Android within ±5% at every band; senior Flutter engineers at fintech often earn a small premium because the productivity multiplier (one team for both platforms) is meaningful.",
      "What pulls a Flutter developer above the median band: depth on Riverpod or Bloc, demonstrable platform-channel experience, one published app to both stores, plus testing discipline (widget + integration tests). Our capstone projects are designed exactly around these signals.",
      "Senior Flutter Developer bands at the top end are reported as national figures (Pune-specific Indeed pages do not exist for these specific titles); Pune trends within ±10% of these figures.",
    ],
    salaryBands: [
      {
        role: "Flutter Developer (Pune)",
        band: "₹6,80,000 per year average",
        source: { label: "Indeed Pune (Flutter Developer)", url: "https://in.indeed.com/career/flutter-developer/salaries/Pune--Maharashtra" },
      },
      {
        role: "Junior Flutter Developer (Pune entry, <2 years)",
        band: "₹3,50,000 – ₹6,50,000 per year",
        source: { label: "AmbitionBox Pune Flutter Developer", url: "https://www.ambitionbox.com/profile/flutter-developer-salary-in-pune" },
      },
      {
        role: "Mid-level Flutter Developer (Pune, 3–5 years)",
        band: "₹10,00,000 – ₹17,00,000 per year",
        source: { label: "Glassdoor Pune Flutter Developer", url: "https://www.glassdoor.co.in/Salaries/pune-flutter-developer-salary-SRCH_IL.0,4_IM1072_KO5,22.htm" },
      },
      {
        role: "Senior Flutter Developer (Pune, 5–8 years)",
        band: "₹16,00,000 – ₹28,00,000 per year",
        source: { label: "Glassdoor Pune Senior Flutter Developer", url: "https://www.glassdoor.co.in/Salaries/pune-senior-flutter-developer-salary-SRCH_IL.0,4_IM1072_KO5,29.htm" },
      },
      {
        role: "Lead Flutter Engineer (national, 8+ years)",
        band: "₹26,00,000 – ₹45,00,000 per year",
        source: { label: "6figr India Lead Flutter Engineer (Pune ±10%)", url: "https://6figr.com/in/salary/lead-flutter-engineer--t" },
      },
    ],
    hiringCompanies: [
      "BharatPe (Pune)",
      "Drip Capital",
      "Innovaccer (Pune)",
      "Whatfix (Pune)",
      "Razorpay (Pune)",
      "Pine Labs (Pune)",
      "Bajaj Finserv (mobile teams)",
      "Pune-based ed-tech / health-tech / fintech startups",
      "TCS",
      "Infosys",
      "Cognizant",
      "Capgemini",
      "Atos / Eviden",
    ],
    rolesAfterCourse: [
      "Flutter Developer",
      "Cross-Platform Mobile Developer",
      "Mobile App Developer",
      "Junior Mobile Engineer",
      "Mobile + Backend Engineer (with Dart server-side)",
    ],
  },

  modesAndDuration: {
    duration: "12 weeks of structured curriculum plus 1 week of capstone and interview preparation (~3.5 months total)",
    classroom: { location: "Archer Infotech, Kothrud, Pune", timing: ["Morning batch — 10:00 to 13:00", "Evening batch — 18:00 to 21:00"] },
    online: {
      timing: ["Same hours as classroom batches", "Recordings available for review"],
      tools: ["Zoom for live sessions", "GitHub for code reviews", "Flutter SDK + Android Studio / VS Code", "Slack / WhatsApp for async Q&A"],
    },
    weekend: { timing: ["Saturday + Sunday, 09:00 to 13:00"], durationNote: "Stretches over ~6 months instead of 3.5." },
    batchPolicy: "Maximum 15 students per batch.",
  },

  fees: {
    note:
      "Course fees range ₹20,000 – ₹90,000 depending on mode and concession. Play Console fee (~₹2,500 one-time) and optional Apple Developer Program fee (~₹8,500 / year, only if iOS publishing) are paid by the student.",
    range: "₹20,000 – ₹90,000",
    paymentOptions: [
      "Single payment with early-bird discount",
      "EMI in 2–3 instalments at no extra cost",
      "Corporate sponsorship — invoiced with GST",
    ],
  },

  placementSupport: {
    paragraphs: [
      "Placement support starts from week 9. By the end of the curriculum your resume highlights real published Flutter apps on both stores, your GitHub has at least two production-style repositories, and you have completed at least three mock technical interviews.",
      "We say placement support, not placement guarantee. Our support is unconditional, time-bound (six months after course completion), and includes free re-entry to a future batch's interview-prep sessions.",
    ],
    process: [
      "Week 9 — resume + LinkedIn rewrite for Flutter JDs",
      "Week 10 — GitHub portfolio cleanup, store listings",
      "Weeks 11–12 — three rounds of mock technical interviews",
      "Week 13 — HR mock and salary negotiation coaching",
      "Post-course — referrals via our 17-year alumni network at 12+ partner companies (with extra emphasis on Pune startup scene)",
      "Up to 6 months of continued support",
      "Free re-entry to future batch interview-prep sessions",
    ],
    partnerCompanies: [
      "BharatPe (Pune)",
      "Drip Capital",
      "Innovaccer (Pune)",
      "Whatfix (Pune)",
      "Razorpay (Pune)",
      "Pine Labs (Pune)",
      "TCS",
      "Infosys",
      "Cognizant",
      "Capgemini",
    ],
  },

  comparison: {
    intro: "We compare ourselves against typical Pune Flutter training institutes on factual rows only.",
    rows: [
      { feature: "Trainer named with photo and LinkedIn", archer: "Yes — Amol Chougule", typical: "No — generic branding" },
      { feature: "Flutter / Dart version covered", archer: "Flutter 3.x + Dart 3.x with sound null safety, records, sealed classes", typical: "Flutter 2.x or pre-null-safety" },
      { feature: "State management approach", archer: "Riverpod (default) + Bloc (production), honest comparison", typical: "GetX-only or Provider-only" },
      { feature: "Navigation", archer: "go_router (modern default)", typical: "Manual Navigator only" },
      { feature: "Testing in the curriculum", archer: "Unit + widget + integration tests with flutter_test", typical: "Theory only" },
      { feature: "Both stores publishing", archer: "Yes — Play Store internal-test + TestFlight", typical: "Theory only" },
      { feature: "Public GitHub portfolio output", archer: "Yes — production-grade apps on both stores", typical: "Local code on hard drive" },
      { feature: "Salary data shown", archer: "Cited from Indeed Pune + AmbitionBox + Glassdoor + 6figr", typical: "Single number with no source" },
      { feature: "Placement support", archer: "6 months, with free re-entry", typical: "1–3 months or vague" },
      { feature: "Batch size cap", archer: "15 students", typical: "25–40 students" },
    ],
    closing: "Compare with whoever you are considering. The right test is whether you can see actual student published Flutter apps on both stores before you pay.",
  },

  versusAlternative: {
    heading: "Flutter vs Native Android vs React Native — Which Should You Pick?",
    paragraphs: [
      "Flutter for cross-platform reach (single codebase to iOS + Android + Web + Desktop). Native Android for the deepest single-platform fluency and the largest Pune mobile-developer hiring pool. React Native for teams already deep in React/JS who want to leverage existing knowledge.",
      "Pune market reality: Native Android (~700 openings) > Flutter (~400) > React Native (~250). Flutter wins on startup hiring; Native Android wins on enterprise / BFSI / consumer-tech volume; React Native wins where the existing team is React-heavy.",
      "Honest recommendation: Flutter if you want cross-platform reach with single codebase, especially for startup hiring or solo / small-team mobile work. Native Android if you want the largest hiring pool and deepest mobile-engineering depth. React Native if you have React background.",
    ],
  },

  prerequisitesAndStart: {
    paragraphs: [
      "Prerequisites: at least basic programming background (Java / Kotlin / JavaScript / Python — any), basic OOP understanding, willingness to commit 8–10 hours per week of practice outside class.",
    ],
    suggestedSteps: [
      "Decide your mode — classroom, online live, or weekend",
      "Check the upcoming batch dates",
      "Book a free 30-minute counselling call",
      "Confirm enrolment and complete pre-course orientation (Flutter SDK install, Android Studio / VS Code setup)",
      "Show up to day one with a laptop running 64-bit OS, 16GB+ RAM (recommended), 50GB+ free disk; macOS preferred if iOS publishing is planned",
    ],
  },

  faqs: [
    {
      question: "How long does Flutter training in Pune take at Archer Infotech?",
      answer:
        "Approximately 3.5 months — 12 weeks of structured curriculum plus 1 week of capstone. The weekend batch stretches over ~6 months at the same content depth.",
    },
    {
      question: "What is the salary of a Flutter Developer in Pune?",
      answer:
        "Indeed Pune ₹6.80 lakh average. Junior ₹3.5–6.5 lakh per AmbitionBox. Mid-level ₹10–17 lakh per Glassdoor. Senior ₹16–28 lakh. Lead ₹26–45 lakh nationally with Pune ±10%.",
    },
    {
      question: "Flutter or Native Android / iOS?",
      answer:
        "Flutter for cross-platform reach. Native for deepest single-platform fluency and largest Pune Android hiring pool. Most of our students learn Flutter first if startup-targeted, native if BFSI / consumer-tech-targeted.",
    },
    {
      question: "Do I need a Mac for Flutter?",
      answer:
        "Mac required only if you want to publish to App Store. Android development works on Linux / macOS / Windows with WSL2. We have lab access for students who want to compile to iOS without owning a Mac.",
    },
    {
      question: "Riverpod or Bloc?",
      answer:
        "Riverpod for new projects (modern default). Bloc for large / production apps with established Bloc patterns. We teach both with honest comparison.",
    },
    {
      question: "Will I work on real projects?",
      answer:
        "Yes — three capstone projects, with one published to both Play Store and TestFlight (App Store).",
    },
    {
      question: "Are weekend Flutter classes available in Pune?",
      answer: "Yes — Saturday and Sunday, 09:00–13:00, stretched over ~6 months instead of 3.5.",
    },
    {
      question: "What is the fee?",
      answer:
        "Course fees range ₹20,000 – ₹90,000. Play Console (~₹2,500 one-time) and optional Apple Developer (~₹8,500 / year) paid by the student.",
    },
    {
      question: "What support do I get after course completion?",
      answer:
        "Six months of placement support, referrals via our alumni network (extra emphasis on Pune startup scene), resume / LinkedIn / GitHub rewrites, salary negotiation.",
    },
    {
      question: "Is the named trainer actually teaching?",
      answer: "Amol Chougule personally leads every session of every batch.",
    },
  ],

  finalCta: {
    heading: "Ready to start Flutter training in Pune?",
    paragraph:
      "We have classroom, online, and weekend batches starting every 4–6 weeks. Reach out via the enquiry form or call us — Amol Chougule is happy to spend 30 minutes telling you whether the course fits your goal.",
  },
};
