import type { CourseRichContent } from "./types";

export const iosSwiftTrainingInPune: CourseRichContent = {
  intro:
    "iOS development is the highest-paid mobile-development specialisation in Pune — smaller hiring pool than Android (Android is ~95% of Indian smartphones; iOS is the urban / premium-segment minority), but compensation runs noticeably higher because the talent supply is thinner and the apps generally serve premium users. Pune iOS roles cluster at the high end of consumer-tech (Razorpay Pune for premium-merchant apps, Pine Labs Pune, Amagi connected-TV, BharatPe Pune), the captive R&D centres (Mercedes-Benz R&D India, BMW TechWorks for some apps), plus the IT services majors building iOS apps for global clients. Archer Infotech's iOS Development training in Pune teaches the platform as it is actually built in 2026 — Swift 6 with strict concurrency, SwiftUI as the default UI toolkit (UIKit is 'reading legacy code' for new apps), the Observation framework for state, async / await for concurrency, SwiftData for persistence, plus the production tail (App Store Connect, TestFlight, App Store Review Guidelines, Apple Developer Program). Classroom in Kothrud, online live, and weekend batches available.",

  whyLearn: {
    heading: "Why Learn iOS in 2026",
    paragraphs: [
      "iOS development is the highest-paid mobile-development specialisation in Pune — Indeed Pune lists 280+ active iOS Developer / Mobile Developer (iOS) openings as of May 2026. Compensation runs roughly 15–25% above Native Android at equivalent experience because the talent supply is thinner. The biggest employers are Razorpay Pune (premium-merchant apps), Pine Labs Pune, Amagi (connected-TV apps), BharatPe Pune (some apps), Mercedes-Benz R&D India (CarPlay and connected-car apps), BMW TechWorks for some teams, plus the Pune-based iOS teams of major BFSI apps (HDFC, ICICI, Bajaj Finserv) and IT services majors (TCS, Infosys, Wipro, Cognizant) building iOS apps for global clients.",
      "What changed in 2026: Swift 6 (Sept 2024) shipped strict concurrency by default — the compiler enforces data-race safety at compile time, eliminating the largest class of iOS production bugs. SwiftUI has fully eclipsed UIKit for new apps; UIKit is 'reading legacy code' territory in 2026 hiring. The Observation framework (Swift 5.9+) replaced ObservableObject for state; SwiftData replaced Core Data for persistence in new apps (with Core Data still common for legacy maintenance). async / await + Actors are the universal concurrency pattern. Xcode 16+ with the Swift Assist AI features have improved developer productivity.",
      "What this means for hiring: 2026 Pune iOS JDs expect Swift 6 with strict concurrency, SwiftUI at depth, the Observation framework, async / await + Actors, SwiftData or Core Data, plus one published TestFlight / App Store app. Senior roles add UIKit interop, Combine for reactive flows where needed, plus iOS-specific patterns (StoreKit 2 for in-app purchase, App Intents for Siri / Shortcuts).",
    ],
    keyPoints: [
      "280+ active iOS Developer roles on Indeed Pune (May 2026)",
      "iOS compensation runs 15–25% above Native Android at equivalent experience",
      "Swift 6 with strict concurrency — data-race-free by default",
      "SwiftUI + Observation + async/await + SwiftData — the 2026 stack",
      "Strong Pune fintech / BFSI / consumer-tech / automotive (CarPlay) hiring",
    ],
  },

  whoIsThisFor: {
    forYou: [
      "Engineering, BCS, MCA, or BSc-CS student targeting iOS Developer roles (especially premium-pay segment)",
      "Working Android / Flutter / RN developer wanting to add iOS for cross-platform reach",
      "Working Swift developer on UIKit wanting to migrate to SwiftUI + Swift 6 strict concurrency",
      "Working developer in another language wanting to enter Apple-platform development",
      "Career restarter targeting Pune premium-segment mobile roles where iOS compensation is highest",
    ],
    notForYou: [
      "If you do not have a Mac (or access to one) — iOS development requires Xcode which runs only on macOS; we offer lab access but personal Mac is strongly recommended",
      "If you have no programming background — at least basic Java / Kotlin / Python / JavaScript / Swift is required",
      "If you cannot put in 8–10 hours per week of practice outside class",
      "If you only want a certificate sticker — Pune iOS hiring screens hard on real TestFlight / App Store apps",
      "If your goal is the largest Pune mobile hiring pool — that's Native Android",
      "If you have 4+ years of production SwiftUI experience — talk to us about advanced specialisations",
    ],
  },

  curriculum: [
    {
      title: "Swift 6 Foundations & Xcode 16",
      weekRange: "Weeks 1–2",
      description:
        "Swift 6 from a programmer-aware starting point. Cover the language essentials (variables, types, optionals with ? and !, control flow, functions, closures, structs, classes, enums, protocols), Swift 6 strict concurrency (the biggest 2024 change — actors, sendable, isolation domains, the data-race-free guarantee), generics, plus the Swift idioms (`if let`, `guard`, the trailing-closure pattern). Xcode 16+ setup, the iOS Simulator, basic iOS app project structure. By the end of week 2 every student has a Hello-World iOS app running on simulator + a personal device (if available).",
      topics: [
        "Swift 6 essentials — types, optionals, control flow",
        "Structs vs classes vs enums",
        "Protocols and protocol-oriented design",
        "Generics with constraints",
        "Swift 6 strict concurrency — actors, sendable",
        "Closures and trailing-closure syntax",
        "if let / guard / nil-coalescing",
        "Xcode 16+ setup",
      ],
    },
    {
      title: "SwiftUI Foundations",
      weekRange: "Weeks 3–4",
      description:
        "SwiftUI as the default UI toolkit for all new iOS apps. Cover View protocol and view composition, the @State / @Binding / @Environment property wrappers, layout (VStack / HStack / ZStack / Grid / Spacer), modifiers, the SwiftUI navigation API (NavigationStack, NavigationLink, programmatic navigation with NavigationPath), tab bars, sheets and full-screen covers, plus the discipline of clean SwiftUI structure (extract views early, prefer composition over conditional rendering).",
      topics: [
        "View protocol and view composition",
        "@State, @Binding, @Environment",
        "Layout — VStack / HStack / ZStack / Grid",
        "Modifiers and the modifier order",
        "NavigationStack and programmatic navigation",
        "Tab bars and sheets",
        "Lists and ForEach",
        "Forms in SwiftUI",
      ],
    },
    {
      title: "State Management — Observation Framework & Data Flow",
      weekRange: "Week 5",
      description:
        "The Observation framework (Swift 5.9+) is the modern state-management default for SwiftUI — `@Observable` macro replacing the older ObservableObject + @Published pattern. Cover @Observable, @State on observable types, the Observation flow that auto-tracks dependencies. Plus the data-flow patterns — single source of truth, lifting state up, plus the larger-app patterns (MV — Model-View — for SwiftUI, vs MVVM for cases where it earns complexity). Honest comparison with the older ObservableObject pattern that you'll still see in legacy code.",
      topics: [
        "Observation framework — @Observable macro",
        "@State with observable types",
        "ObservableObject as legacy",
        "Single source of truth",
        "MV vs MVVM in SwiftUI",
        "TCA (The Composable Architecture) overview",
      ],
    },
    {
      title: "Concurrency — async / await + Actors",
      weekRange: "Week 6",
      description:
        "Swift 6 concurrency at depth. async / await for asynchronous code, structured concurrency with Task and async let, AsyncSequence and AsyncStream, plus Actors for data-race-free shared state. The Swift 6 strict concurrency guarantees — Sendable conformance, MainActor isolation, isolation domains. Plus the discipline of bridging from older completion-handler APIs (withCheckedContinuation), and Combine for reactive flows where it still earns its place.",
      topics: [
        "async / await fundamentals",
        "Structured concurrency — Task, async let",
        "AsyncSequence and AsyncStream",
        "Actors for shared state",
        "Sendable conformance",
        "MainActor and isolation",
        "Bridging completion handlers",
        "Combine for reactive flows (when needed)",
      ],
    },
    {
      title: "Persistence, Networking & SwiftData",
      weekRange: "Weeks 7–8",
      description:
        "The data layer. Networking with URLSession + async / await, JSON parsing with Codable, error handling. Persistence — SwiftData (the modern default, ~Core Data simplified for SwiftUI) — Models, queries, relationships, migrations. Core Data covered as 'reading legacy code' for the cases where you'll inherit it. Plus UserDefaults for preferences, Keychain for secure storage (auth tokens, biometric-protected secrets), and the discipline of offline-first caching.",
      topics: [
        "URLSession + async / await",
        "Codable for JSON",
        "SwiftData — Models, queries, migrations",
        "Core Data as legacy",
        "UserDefaults for preferences",
        "Keychain for secure storage",
        "Offline-first patterns",
      ],
    },
    {
      title: "Animations, Gestures & Advanced SwiftUI",
      weekRange: "Week 9",
      description:
        "The features that make iOS apps feel polished. Animations — implicit (.animation modifier), explicit (withAnimation), keyframe animations (iOS 17+), matchedGeometryEffect for hero-like transitions. Gestures — TapGesture, DragGesture, MagnifyGesture, plus custom gesture composition. Advanced SwiftUI — Canvas for custom drawing, GeometryReader for layout-aware rendering, ScrollView with scrollTargetBehavior (iOS 17+), UIViewRepresentable for UIKit interop where needed.",
      topics: [
        "Implicit and explicit animations",
        "Keyframe animations (iOS 17+)",
        "matchedGeometryEffect",
        "Gestures — Tap / Drag / Magnify",
        "Canvas for custom drawing",
        "GeometryReader",
        "ScrollView with scrollTargetBehavior",
        "UIViewRepresentable for UIKit interop",
      ],
    },
    {
      title: "Apple Platform Features & Production Concerns",
      weekRange: "Week 10",
      description:
        "iOS-specific platform features. Push notifications via APNs and the UserNotifications framework, in-app purchases via StoreKit 2 (the modern API replacing StoreKit 1), App Intents for Siri / Shortcuts integration, Sign in with Apple, biometric auth via LocalAuthentication, Universal Links and deep linking. Plus production concerns — App Store Connect setup, TestFlight for beta distribution, App Store Review Guidelines (the topics that get apps rejected), provisioning profiles and code signing.",
      topics: [
        "Push notifications via APNs",
        "StoreKit 2 for in-app purchase",
        "App Intents for Siri / Shortcuts",
        "Sign in with Apple",
        "LocalAuthentication for biometric",
        "Universal Links",
        "App Store Connect + TestFlight",
        "Code signing and provisioning",
      ],
    },
    {
      title: "Testing, Performance & Capstone",
      weekRange: "Weeks 11–12 + 1 week placement prep",
      description:
        "Testing — Swift Testing (the new framework, replacing XCTest for new code), XCTest as legacy, UI Testing with XCUITest, the discipline of testing what users see. Performance — Instruments app for profiling, the discipline of avoiding main-thread blocking in SwiftUI, image / list optimisation. Plus the capstone (see Capstone Projects). Mock interviews calibrated for Pune iOS hiring panels.",
      topics: [
        "Swift Testing framework",
        "XCTest as legacy",
        "UI Testing with XCUITest",
        "Instruments for profiling",
        "SwiftUI performance patterns",
        "Capstone implementation",
        "Mock interviews — iOS-specific rounds",
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
      title: "Production iOS App with SwiftUI + Observation + SwiftData",
      description:
        "A complete production-grade iOS app — pick a real domain (expense tracker, recipe finder, fitness tracker, BFSI-style finance dashboard, news reader). SwiftUI 100% (no UIKit ceremony), @Observable macro for state, async / await for concurrency with strict Swift 6 conformance, SwiftData for persistence, URLSession for a real public API, push notifications via APNs, biometric auth, plus Swift Testing tests. Published to TestFlight (Apple Developer Program ~₹8,500 / year, paid by student). Outcome: a public GitHub repository plus TestFlight beta link.",
      technologies: [
        "Swift 6 + SwiftUI",
        "Observation framework",
        "SwiftData",
        "async / await + Actors",
        "URLSession + Codable",
        "APNs push notifications",
        "Swift Testing",
        "TestFlight beta",
      ],
    },
    {
      title: "Real-Time / Live-Data App",
      description:
        "A real-time iOS app — chat / collaboration / live-feed app. WebSocket via URLSessionWebSocketTask, optimistic UI, push notifications for offline message delivery. Demonstrates the patterns Pune fintech / consumer-app teams hire on for real-time iOS work.",
      technologies: [
        "Swift 6 + SwiftUI",
        "URLSessionWebSocketTask",
        "Async streams",
        "APNs notifications",
        "Offline message queue",
      ],
    },
    {
      title: "Apple-Platform-Integrated Showcase App",
      description:
        "An app that meaningfully integrates with Apple platform features — Sign in with Apple, biometric auth, Siri / Shortcuts via App Intents, in-app purchase via StoreKit 2, Universal Links, optionally Widgets / Live Activities. Demonstrates the depth Pune premium-segment iOS roles test for.",
      technologies: [
        "Swift 6 + SwiftUI",
        "Sign in with Apple",
        "App Intents (Siri / Shortcuts)",
        "StoreKit 2",
        "Universal Links",
        "Widgets / Live Activities (optional)",
      ],
    },
  ],

  trainersIntro:
    "Your batch is led by Amol Chougule (Technical Trainer — Modern Web & Mobile, hands-on at Mindstix Software Labs, ships iOS / SwiftUI). Amol personally leads every session of every batch.",

  careerOutcomes: {
    paragraphs: [
      "iOS Developer is the highest-paid mobile-development specialisation in Pune in 2026 — Indeed Pune lists 280+ active openings, with compensation roughly 15–25% above Native Android at equivalent experience because the talent supply is thinner. The biggest Pune employers are Razorpay Pune (premium-merchant apps), Pine Labs Pune, Amagi (connected-TV apps), BharatPe Pune, Mercedes-Benz R&D India (CarPlay / connected-car), plus the Pune iOS teams of major BFSI apps and IT services majors.",
      "What pulls an iOS developer above the median band: SwiftUI fluency with Swift 6 strict concurrency, demonstrable Observation framework + async / await depth, one published TestFlight or App Store app, plus testing discipline (Swift Testing + XCUITest). Apple-platform integration (Sign in with Apple, App Intents, StoreKit 2) signals senior-iOS thinking on Pune premium-segment hiring panels.",
      "Senior iOS Developer bands at the top end are reported as national figures (Pune-specific Indeed pages do not exist for these specific titles); Pune trends within ±10% of these figures.",
    ],
    salaryBands: [
      {
        role: "iOS Developer (Pune)",
        band: "₹7,75,000 per year average",
        source: { label: "Indeed Pune (iOS Developer)", url: "https://in.indeed.com/career/ios-developer/salaries/Pune--Maharashtra" },
      },
      {
        role: "Junior iOS Developer (Pune entry, <2 years)",
        band: "₹4,00,000 – ₹7,50,000 per year",
        source: { label: "AmbitionBox Pune iOS Developer", url: "https://www.ambitionbox.com/profile/ios-developer-salary-in-pune" },
      },
      {
        role: "Mid-level iOS Developer (Pune, 3–5 years)",
        band: "₹12,00,000 – ₹20,00,000 per year",
        source: { label: "Glassdoor Pune iOS Developer", url: "https://www.glassdoor.co.in/Salaries/pune-ios-developer-salary-SRCH_IL.0,4_IM1072_KO5,18.htm" },
      },
      {
        role: "Senior iOS Developer (Pune, 5–8 years)",
        band: "₹19,00,000 – ₹32,00,000 per year",
        source: { label: "Glassdoor Pune Senior iOS Developer", url: "https://www.glassdoor.co.in/Salaries/pune-senior-ios-developer-salary-SRCH_IL.0,4_IM1072_KO5,25.htm" },
      },
      {
        role: "Lead iOS Engineer (national, 8+ years)",
        band: "₹30,00,000 – ₹52,00,000 per year",
        source: { label: "6figr India Lead iOS Engineer (Pune ±10%)", url: "https://6figr.com/in/salary/lead-ios-engineer--t" },
      },
    ],
    hiringCompanies: [
      "Razorpay (Pune, premium-merchant apps)",
      "Pine Labs (Pune)",
      "Amagi (connected-TV)",
      "BharatPe (Pune)",
      "Mercedes-Benz R&D India (CarPlay / connected-car)",
      "BMW TechWorks India",
      "HDFC Bank (Pune mobile teams)",
      "ICICI Bank (Pune mobile)",
      "Bajaj Finserv",
      "Kotak Mahindra Bank",
      "TCS",
      "Infosys",
      "Wipro",
      "Cognizant",
      "Capgemini",
      "Atos / Eviden",
    ],
    rolesAfterCourse: [
      "iOS Developer",
      "Mobile Developer (iOS)",
      "Apple Platform Developer (iOS + macOS extension)",
      "Junior Mobile Engineer",
      "Software Engineer (iOS / Swift)",
    ],
  },

  modesAndDuration: {
    duration: "12 weeks of structured curriculum plus 1 week of capstone and interview preparation (~3.5 months total). The original 4-month listing reflects optional extended evening format.",
    classroom: { location: "Archer Infotech, Kothrud, Pune (lab Macs available for students without personal Mac)", timing: ["Morning batch — 10:00 to 13:00", "Evening batch — 18:00 to 21:00"] },
    online: {
      timing: ["Same hours as classroom batches", "Recordings available for review"],
      tools: ["Zoom for live sessions", "Personal Mac strongly recommended (or lab Mac access for in-person students)", "GitHub for code reviews", "Slack / WhatsApp for async Q&A"],
    },
    weekend: { timing: ["Saturday + Sunday, 09:00 to 13:00"], durationNote: "Stretches over ~6 months instead of 3.5." },
    batchPolicy: "Maximum 15 students per batch.",
  },

  fees: {
    note:
      "Course fees range ₹20,000 – ₹90,000 depending on mode and concession. Apple Developer Program fee (~₹8,500 / year — required for TestFlight / App Store publishing) is paid by the student.",
    range: "₹20,000 – ₹90,000",
    paymentOptions: [
      "Single payment with early-bird discount",
      "EMI in 2–3 instalments at no extra cost",
      "Corporate sponsorship — invoiced with GST",
    ],
  },

  placementSupport: {
    paragraphs: [
      "Placement support starts from week 9. By the end of the curriculum your resume highlights real published TestFlight / App Store iOS apps, your GitHub has at least two production-style repositories, and you have completed at least three mock technical interviews against question banks from Pune iOS hiring teams.",
      "We say placement support, not placement guarantee. Our support is unconditional, time-bound (six months after course completion), and includes free re-entry to a future batch's interview-prep sessions.",
    ],
    process: [
      "Week 9 — resume + LinkedIn rewrite for iOS JDs",
      "Week 10 — GitHub portfolio cleanup, TestFlight beta links",
      "Weeks 11–12 — three rounds of mock technical interviews",
      "Week 13 — HR mock and salary negotiation coaching",
      "Post-course — referrals via our 17-year alumni network at 12+ partner companies (with extra emphasis on Pune fintech / BFSI / consumer-tech)",
      "Up to 6 months of continued support",
      "Free re-entry to future batch interview-prep sessions",
    ],
    partnerCompanies: [
      "Razorpay (Pune)",
      "Pine Labs (Pune)",
      "Amagi",
      "BharatPe (Pune)",
      "Mercedes-Benz R&D India",
      "Bajaj Finserv",
      "Kotak Mahindra Bank",
      "TCS",
      "Infosys",
      "Cognizant",
      "Capgemini",
    ],
  },

  comparison: {
    intro: "We compare ourselves against typical Pune iOS / Swift training institutes on factual rows only.",
    rows: [
      { feature: "Trainer named with photo and LinkedIn", archer: "Yes — Amol Chougule", typical: "No — generic branding" },
      { feature: "Swift version covered", archer: "Swift 6 with strict concurrency", typical: "Swift 5 only" },
      { feature: "UI toolkit covered", archer: "SwiftUI as default (UIKit only as 'reading legacy')", typical: "UIKit-first or UIKit-only" },
      { feature: "State management", archer: "Observation framework (@Observable macro)", typical: "ObservableObject (legacy)" },
      { feature: "Concurrency", archer: "async / await + Actors + Sendable", typical: "Completion handlers + DispatchQueue" },
      { feature: "Persistence", archer: "SwiftData (Core Data only as 'reading legacy')", typical: "Core Data only" },
      { feature: "Apple platform integration", archer: "Sign in with Apple + App Intents + StoreKit 2 + Universal Links", typical: "Skipped" },
      { feature: "Testing", archer: "Swift Testing + XCUITest", typical: "Skipped" },
      { feature: "Mac access for students without personal Mac", archer: "Yes — lab Macs available", typical: "No" },
      { feature: "Public portfolio output", archer: "Yes — TestFlight beta links + GitHub repos", typical: "Local code on hard drive" },
      { feature: "Placement support", archer: "6 months, with free re-entry", typical: "1–3 months or vague" },
      { feature: "Batch size cap", archer: "15 students", typical: "25–40 students" },
    ],
    closing: "Compare with whoever you are considering. The right test is whether you can see actual student TestFlight betas before you pay.",
  },

  versusAlternative: {
    heading: "iOS (Native) vs Flutter / React Native — Which Should You Pick?",
    paragraphs: [
      "Native iOS for the deepest Apple-platform fluency, the highest-paid mobile-development specialisation in Pune, and the platform-best UX for premium-segment apps. Flutter for cross-platform reach with single codebase to both iOS and Android. React Native for teams already deep in React.",
      "Pune market reality: Native iOS has the smallest hiring pool (~280 openings) of the three but pays the highest premium per role. Flutter (~400) and React Native (~250) are larger / similar pools at lower compensation per role. Native iOS wins on premium-segment apps, fintech / BFSI / consumer-tech where UX matters, plus the captive R&D arms doing CarPlay / connected-car work.",
      "Honest recommendation: Native iOS if your career goal is the highest-paid mobile specialisation and Apple-platform depth. Flutter / React Native if you want cross-platform reach with single codebase. Many of our students learn Native iOS first for the depth and pay premium, then add Flutter / RN later for cross-platform work.",
    ],
  },

  prerequisitesAndStart: {
    paragraphs: [
      "Prerequisites: at least basic programming background (any language), basic OOP understanding, willingness to commit 8–10 hours per week of practice, plus access to a Mac (personal Mac strongly recommended; we offer lab access for in-person students who don't yet have one).",
    ],
    suggestedSteps: [
      "Decide your mode — classroom, online live, or weekend",
      "Check the upcoming batch dates",
      "Book a free 30-minute counselling call",
      "Confirm enrolment — Apple ID + Apple Developer Program signup recommended (paid before publishing)",
      "Show up to day one with a Mac (personal or lab access) running macOS 14+ with Xcode 16+ pre-installed",
    ],
  },

  faqs: [
    {
      question: "Do I need a Mac for iOS development?",
      answer:
        "Yes — Xcode runs only on macOS. Personal Mac is strongly recommended. We offer lab access for in-person students who don't yet have one, but for sustained learning a personal Mac is necessary.",
    },
    {
      question: "How long does iOS training in Pune take at Archer Infotech?",
      answer:
        "Approximately 3.5 months — 12 weeks of structured curriculum plus 1 week of capstone. Original 4-month listing is optional extended evening format. Weekend batch ~6 months.",
    },
    {
      question: "What is the salary of an iOS Developer in Pune?",
      answer:
        "Indeed Pune ₹7.75 lakh average — roughly 15–25% above Native Android at equivalent experience. Junior ₹4–7.5 lakh per AmbitionBox. Mid-level ₹12–20 lakh per Glassdoor. Senior ₹19–32 lakh. Lead ₹30–52 lakh nationally with Pune ±10%.",
    },
    {
      question: "SwiftUI or UIKit?",
      answer:
        "SwiftUI as the default for new apps. UIKit covered as 'reading legacy code' only. New Pune iOS work in 2026 is overwhelmingly SwiftUI.",
    },
    {
      question: "Will I work on real projects?",
      answer:
        "Yes — three capstone projects with at least one published to TestFlight beta (Apple Developer Program fee paid by the student).",
    },
    {
      question: "iOS, Flutter, or React Native?",
      answer:
        "Native iOS for the deepest Apple fluency and highest-paid mobile specialisation. Flutter or RN for cross-platform reach.",
    },
    {
      question: "Are weekend iOS classes available in Pune?",
      answer: "Yes — Saturday and Sunday, 09:00–13:00, stretched over ~6 months instead of 3.5.",
    },
    {
      question: "What is the fee?",
      answer:
        "Course fees range ₹20,000 – ₹90,000. Apple Developer Program fee (~₹8,500 / year) paid by the student.",
    },
    {
      question: "What support do I get after course completion?",
      answer:
        "Six months of placement support, referrals via our alumni network (with extra emphasis on Pune fintech / BFSI / consumer-tech), resume / LinkedIn / GitHub rewrites, salary negotiation.",
    },
    {
      question: "Is the named trainer actually teaching?",
      answer: "Amol Chougule personally leads every session of every batch.",
    },
  ],

  finalCta: {
    heading: "Ready to start iOS / Swift training in Pune?",
    paragraph:
      "We have classroom, online, and weekend batches starting every 4–6 weeks. Reach out via the enquiry form or call us — Amol Chougule is happy to spend 30 minutes telling you whether the course fits your goal.",
  },
};
