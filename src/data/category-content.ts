/**
 * Long-form content for each course category landing page.
 * Pillar 4 P4-11.
 *
 * Spec asks for category URLs to be proper landing pages with:
 *   - Unique H1
 *   - 800-1,200 word overview
 *   - Course list (already rendered)
 *   - Career outcomes summary
 *   - 5+ FAQs covering category-level questions
 *   - CollectionPage + ItemList schema
 *
 * This file holds the per-category rich content (overview paragraphs,
 * career outcomes, FAQs). The page template at
 * `src/app/courses/[category]/page.tsx` reads this and renders the
 * full landing-page surface; categories without an entry fall back to
 * the existing minimal layout.
 *
 * Editorial discipline:
 *   - Every numerical claim mirrors siteConfig.stats; never invent.
 *   - Salary bands attributed inline ("placement-team data, last 12
 *     months") to match the P8-09 pattern.
 *   - Never claim "100% placement" — site-wide policy.
 *   - Every category mentions the four head-keyword variants (training,
 *     course, classes, institute) at least once across its overview
 *     paragraphs (P4-06 discipline).
 */

import type { FaqItem } from "@/components/seo/faq-section";

export interface CategoryCareerRole {
  role: string;
  description: string;
  /** Optional fresher salary band, attributed to placement-team data. */
  band?: string;
}

export interface CategoryContent {
  /** Matches Category.slug in src/data/courses.ts */
  slug: string;
  /** Page <h1>. Override of the default `${name} Training in Pune`. */
  h1: string;
  /**
   * Optional SEO `<title>` override — kept shorter than h1 to fit
   * Google's ~60-char mobile snippet budget. When absent, the page
   * falls back to h1 (legacy behaviour). H1 stays the visible heading
   * with full keyword-stuffed phrasing; metaTitle is the SERP optimal
   * cut. P3-22 title compaction.
   */
  metaTitle?: string;
  /** ~25-35 word subhead that doubles as meta description prefix. */
  subhead: string;
  /**
   * 4-6 paragraphs of body copy. Aim for ~700-900 words total to clear
   * the 800-word spec floor while staying readable.
   */
  paragraphs: string[];
  /** "What you'll do as a..." career role cards. */
  careerOutcomes: CategoryCareerRole[];
  /** Category-level FAQs (5+ required by spec). */
  faqs: FaqItem[];
}

export const categoryContent: CategoryContent[] = [
  // ============================================================
  // PROGRAMMING
  // ============================================================
  {
    slug: "programming",
    h1: "Programming Courses in Pune — Java, Python, C, C++ and .NET",
    subhead:
      "Master the foundation languages every Indian IT MNC hires for — taught by working trainers at Archer Infotech, Kothrud Pune, with placement assistance and lifetime LMS access.",
    paragraphs: [
      "Programming is the entry point to every IT career path in India. Whether the goal is a developer role at TCS, Infosys, Wipro and the other Pune services majors, a product-engineering job at a Hinjewadi or Baner startup, or a switch from a non-IT background into software, the journey starts with one of the foundation languages — Java, Python, C, C++ or C#/.NET. Archer Infotech's programming courses in Pune are built around that reality: small classroom batches at the Kothrud institute, working industry trainers, project-led delivery, and a placement-assistance pipeline tied to 100+ corporate hiring partners.",
      "The hiring landscape across Pune in 2026 still rewards strong fundamentals more than trend-chasing. Java continues to be the highest-demand language at MNCs and GCC captives — every TCS, Infosys, Persistent Systems and Tech Mahindra fresher batch hires Java developers in volume. Python now leads in data, automation, and AI/ML pipelines, with strong demand from product startups across Hinjewadi, Wakad, Baner and Magarpatta. C and C++ remain critical for systems engineering, embedded, and finance/HFT roles. .NET / C# is the gateway to ASP.NET full-stack and Microsoft-stack engagements at GCC captives and product companies. Knowing two of these languages well — typically Java + Python, or C++ + Python — opens the broadest set of doors.",
      "Every Archer Infotech programming course is taught by a working IT professional, not a retired academic. The Java track is led by Yogesh Patil (15+ years at Persistent Systems and Wipro) with Ankita Hartale leading Java Full Stack delivery; .NET is owned by Suraj Kudache (7+ years C# / ASP.NET at Pune product companies); the Python tracks run with corporate-trainer Amol Patil who teaches the same content to active enterprise clients including Amdocs, Capgemini, MindTree and Tech Mahindra. What you learn in the classroom is informed by what those MNCs are actively hiring for that quarter — not what was hot five years ago. The institute deliberately keeps batch sizes small so every learner gets project review and 1:1 doubt-clearing.",
      "Programming classes at Archer Infotech run weekday, weekend and live online formats so working professionals, college students and full-time learners can pick a schedule that fits. Every course includes hands-on projects you can put on a public GitHub portfolio, mock-interview practice with the placement team, soft-skills training, and direct referrals to the institute's 100+ active hiring partners. The 90% placement rate (institute internal records, across cohorts who complete training and clear at least one mock-interview round) has stayed consistent across 17 years of programming batches since 2009.",
      "If you're starting from zero, the recommended path is: pick one language depth-first (Java for MNC services hiring, Python for data/AI roles, C++ for systems/competitive programming), build 2–3 portfolio projects under trainer review, then layer in the matching specialisation track (Spring Boot for Java, Django + ML for Python, Linux/embedded for C++) before sitting for hiring drives. The free demo class is the fastest way to evaluate trainer style and curriculum depth — bookable through the contact form, by phone at +91 9850 678451, or by walking into the Kothrud centre Monday to Saturday, 9 AM to 8 PM.",
    ],
    careerOutcomes: [
      {
        role: "Java Developer",
        description:
          "Backend services and enterprise apps at Pune MNCs — TCS, Infosys, Persistent Systems, Tech Mahindra. Entry-level path for the largest fresher hiring volume in Pune.",
        band: "₹3.5–6 LPA",
      },
      {
        role: "Python Developer",
        description:
          "Backend, automation, and data-pipeline roles at product startups and GCC captives. Pairs naturally with data science / ML and AI engineering progression.",
        band: "₹3.5–6 LPA",
      },
      {
        role: ".NET / C# Developer",
        description:
          "ASP.NET Core full-stack and Microsoft-stack engagements at GCC captives and product engineering firms across Pune.",
        band: "₹3.5–5.5 LPA",
      },
      {
        role: "C++ Engineer",
        description:
          "Systems, embedded, finance and high-performance roles. Strong demand at Tata Motors / Bosch / KPIT and Pune-based finance product companies.",
        band: "₹4–6 LPA",
      },
      {
        role: "Software Engineer (general)",
        description:
          "DSA + system design + one strong language. Path into product companies, GCC captives, and competitive-programming roles at top tech firms.",
        band: "₹5–8 LPA",
      },
    ],
    faqs: [
      {
        question: "Which programming language should I learn first in 2026?",
        answer:
          "For Pune fresher hiring volume, Java is still the safest first language — every services major hires Java developers in batch volume. For data, automation and AI roles, Python is the better starting point. C++ is the right choice for systems / competitive programming. The Archer Infotech counsellor team builds a custom roadmap during the free demo class based on your background and target role.",
      },
      {
        question: "How long does a programming course at Archer Infotech take?",
        answer:
          "Single-language depth courses (Java, Python, C, C++, .NET) run 3–4 months at standard pace, or 6–8 weeks in fast-track / weekday-intensive batches. Adding a specialisation layer like Spring Boot, Django or DevOps adds another 2–3 months. Course detail pages list exact duration and batch options.",
      },
      {
        question: "Are these programming courses suitable for non-IT graduates?",
        answer:
          "Yes. The majority of Archer Infotech's programming-course intake is engineering students, BCA / MCA / B.Sc-IT learners, and career-switchers from non-IT backgrounds. Curriculum starts from fundamentals — variables, loops, functions — and progresses through OOP, data structures, and project work. No prior coding experience required for foundation tracks.",
      },
      {
        question: "Will I get a job after a programming course?",
        answer:
          "Archer Infotech offers placement assistance — resume building, mock interviews, soft-skills training, and direct referrals to 100+ corporate hiring partners — bundled into every flagship programming course at no separate fee. The 90% placement rate is calculated across learners who complete training and clear at least one mock-interview round (institute internal records).",
      },
      {
        question: "Are the programming classes online or offline?",
        answer:
          "Both. Every flagship programming course runs as live online (Zoom / Google Meet) and offline classroom batches at the Kothrud Pune centre, with the same trainer, syllabus, projects, and placement support. Online learners get session recordings through lifetime LMS access for revision.",
      },
      {
        question: "What is the fee range for programming courses?",
        answer:
          "Single-language programming courses range from ₹15,000 to ₹35,000 depending on duration and batch type. Spring Boot, microservices and architectural specialisation tracks sit at the upper end. Every course supports EMI plans and bundles lifetime LMS access, certification and placement assistance.",
      },
    ],
  },

  // ============================================================
  // FULL STACK DEVELOPMENT
  // ============================================================
  {
    slug: "full-stack-development",
    metaTitle: "Full Stack Courses in Pune — Java, MERN, Python, .NET",
    h1: "Full Stack Development Courses in Pune — Java, MERN, Python and .NET Stacks",
    subhead:
      "Build complete production web applications end-to-end at Pune's most-trusted full-stack institute — Java Full Stack, MERN, Python Full Stack and .NET Full Stack tracks with placement assistance.",
    paragraphs: [
      "Full Stack Development is now the most-hired engineering pattern at Pune MNCs and product startups. The shift has been steady since 2018: companies prefer engineers who can ship a feature end-to-end — backend service, data layer, frontend, and deployment — rather than handing off between specialised teams. Archer Infotech's Full Stack courses in Pune are built around the four production-grade stacks Pune actually hires for: Java Full Stack (Spring Boot + database + React/Angular), MERN Stack (MongoDB + Express + React + Node.js), Python Full Stack (Django + REST + React), and .NET Full Stack (ASP.NET Core + C# + Angular).",
      "The hiring picture in Pune is concrete. Java Full Stack is the highest-volume hiring pattern across services majors and GCC captives — TCS, Infosys, Persistent Systems, Tech Mahindra and Capgemini all run dedicated Java Full Stack fresher pipelines through Pune. MERN is the dominant pattern at product startups and modern engineering firms across Hinjewadi, Wakad, Baner and Kharadi. Python Full Stack picks up roles at product companies and AI-adjacent firms where Django backends pair with ML pipelines. .NET Full Stack opens GCC captive engagements with Microsoft-aligned enterprises. Knowing one stack deeply and being able to read the others is the realistic 2026 graduate target.",
      "Every full-stack course at Archer Infotech is taught by a working trainer who still ships production code. Yogesh Patil (founder, 15+ years at Persistent Systems and Wipro) leads Java Full Stack architecture sessions; Ankita Hartale runs the day-to-day Java FS delivery with 5+ years of Java + database production experience; Amol Chougule owns the MERN / React / Angular tracks (5+ years front-end and mobile); Suraj Kudache leads .NET Full Stack with 7+ years of C# / ASP.NET at Pune product companies. The full-stack curriculum is refreshed every six months against the framework versions, hiring patterns and interview questions you'll actually face — last reviewed 2026-05-06 with the Pillar 1 long-form rewrite.",
      "Full-stack classes at Archer Infotech's Kothrud institute run 5–6 months at standard pace covering the complete stack: language fundamentals, framework deep-dive, database design, REST APIs, frontend integration, authentication, deployment, and testing. Every course closes with a capstone project — a deployed full-stack app you'll demo in placement interviews — built and reviewed under the trainer team. Weekday, weekend and live online batches run the same curriculum; lifetime LMS access keeps recordings and project rubrics available for revision long after the course ends.",
      "The full-stack track ladders cleanly into the institute's TechReady bootcamp for graduates wanting an intensive placement-assisted 6–8 month programme, or into the CareerCode semester-by-semester model for engineering students who want to build skills alongside their degree. Placement support — resume rewrite, ATS optimisation, mock interviews, direct referrals to 100+ hiring partners — is bundled into every fee with no separate placement charge. Average fresher packages across full-stack tracks run ₹4–6 LPA (placement-team data, last 12 months); top performers in Java Full Stack and MERN have crossed ₹10 LPA.",
    ],
    careerOutcomes: [
      {
        role: "Java Full Stack Developer",
        description:
          "Spring Boot + microservices + React/Angular at MNCs and GCC captives. Highest-volume full-stack hiring pattern in Pune.",
        band: "₹4–6 LPA",
      },
      {
        role: "MERN Stack Developer",
        description:
          "MongoDB + Express + React + Node at product startups and modern engineering firms across Hinjewadi / Baner / Kharadi.",
        band: "₹4–6 LPA",
      },
      {
        role: "Python Full Stack Developer",
        description:
          "Django + REST + React at product companies and AI-adjacent firms; pairs with ML pipelines for hybrid backend + data roles.",
        band: "₹3.5–6 LPA",
      },
      {
        role: ".NET Full Stack Developer",
        description:
          "ASP.NET Core + C# + Angular at GCC captives and Microsoft-stack enterprises across Pune.",
        band: "₹3.5–5.5 LPA",
      },
      {
        role: "Frontend / Backend Engineer",
        description:
          "Specialise into React/Angular front-end or Spring/Node back-end roles with full-stack context — covers product startups and SaaS firms.",
        band: "₹4–7 LPA",
      },
    ],
    faqs: [
      {
        question: "Which full-stack should I pick — Java, MERN, Python or .NET?",
        answer:
          "Java Full Stack has the highest fresher hiring volume across Pune MNCs and is the safest bet for services-major roles. MERN suits product-startup and SaaS targets. Python Full Stack opens roles where backend work pairs with data / ML pipelines. .NET is the right pick if you specifically target Microsoft-stack GCC captives. The Archer Infotech counsellor team helps shortlist based on background + target role during the free demo.",
      },
      {
        question: "How long does a full-stack course take at Archer Infotech?",
        answer:
          "Standard full-stack courses (Java FS, MERN, Python FS, .NET FS) run 5–6 months covering language → framework → database → frontend → deployment with a capstone project. Fast-track 4-month and weekday-intensive variants are available for learners with prior programming experience. Course detail pages list exact module-by-module timelines.",
      },
      {
        question: "Do I need prior coding experience for a full-stack course?",
        answer:
          "Foundation knowledge of one programming language is recommended. Pure beginners are guided into a 6–8 week single-language course (Java, Python or JavaScript) first, then bridge into the matching full-stack track. Graduates with college-level coding background can join a flagship full-stack course directly.",
      },
      {
        question: "Will I build a real project I can show recruiters?",
        answer:
          "Yes. Every full-stack course at Archer Infotech closes with a capstone — a deployed production-grade application built across 4 weeks under trainer review and added to your public GitHub portfolio. Past capstones have included e-commerce platforms, booking systems, dashboards and SaaS prototypes. Recruiters in Pune routinely ask for the GitHub URL during interviews.",
      },
      {
        question: "Is placement assistance included in the full-stack course fee?",
        answer:
          "Yes. Resume building, ATS optimisation, mock interviews, soft-skills training, and direct referrals to 100+ corporate hiring partners are bundled into every full-stack course fee — no separate placement charge. The 90% placement rate (institute internal records) covers learners who complete training and clear at least one mock-interview round.",
      },
      {
        question: "What is the fee range for full-stack courses?",
        answer:
          "Flagship full-stack courses at Archer Infotech range from ₹35,000 to ₹90,000 depending on stack, duration and batch type. Java Full Stack and MERN sit at the upper end of the range; specialised single-track variants start lower. Every course supports EMI plans and bundles lifetime LMS access, certification, and placement assistance.",
      },
    ],
  },

  // ============================================================
  // MODERN WEB
  // ============================================================
  {
    slug: "modern-web",
    metaTitle: "Modern Web Courses in Pune — React, Angular, Node.js",
    h1: "Modern Web Development Courses in Pune — React, Angular, Next.js and Node.js",
    subhead:
      "Specialise in the modern web stack — React, Angular, Next.js, Node.js — at Archer Infotech's Kothrud Pune classes, with project-led training and placement assistance.",
    paragraphs: [
      "Modern Web is the specialist track that sits between full-stack and frontend — for learners who want to go deep on one or two of React, Angular, Next.js or Node.js rather than touching everything in a full-stack curriculum. Archer Infotech's Modern Web courses in Pune are built for that focused profile: developers who want to be the React or Angular specialist on a team, or who already know a backend language and want to add a strong frontend layer (or vice versa). The institute teaches each framework as a deep, multi-week deep-dive rather than a chapter inside a wider course.",
      "Pune's hiring landscape in 2026 has bifurcated cleanly along this axis. Services majors and GCC captives largely hire full-stack profiles. Product startups and modern engineering firms across Hinjewadi, Baner, Wakad, Magarpatta and Kharadi increasingly hire framework-specialists — a senior React engineer, an Angular tech lead, a Next.js performance specialist. The frontend / Node.js specialist roles often pay better than equivalent full-stack roles because the depth is harder to find. Modern Web courses at Archer Infotech are tuned for that specialist track.",
      "The Modern Web tracks are owned by Amol Chougule — 5+ years of front-end and mobile production experience across Pune startups. The React track covers Hooks, Redux Toolkit, React Router, server components and the modern testing toolchain; Angular covers components, services, RxJS, NgRx, and the migration patterns from older AngularJS code; Next.js covers the App Router, server components, ISR, edge functions and SEO patterns; Node.js covers Express, REST API design, authentication, database integration, real-time WebSockets and deployment to AWS / Render / Vercel. Every course is project-led — by week 3 you'll have a deployed application; by course end a portfolio of 2–3 production-grade apps.",
      "Modern Web classes at the Kothrud institute run weekday, weekend and live online formats. Each framework runs as a 2–3 month focused course rather than a quick survey. The curriculum refresh cadence is six months — last review 2026-05-06 — so the framework versions you learn (React 19+, Angular 20+, Next 16+, Node 22+) match what Pune product companies actively ship in production. Lifetime LMS access keeps the recordings and project rubrics available for revision through your career.",
      "If you're already comfortable with one framework and want to deepen a complementary stack, Modern Web is the right entry point. If you're starting from a programming foundation, the recommended path is: complete a JavaScript course → React or Angular focused track → add Node.js + Next.js for full-stack capability. Placement support is bundled into every fee — resume rewrite, ATS optimisation, mock interviews, and direct referrals to the 100+ hiring partner network. Specialised front-end / Node freshers regularly draw ₹4–7 LPA at Pune product companies (placement-team data, last 12 months) with top performers crossing ₹10 LPA.",
    ],
    careerOutcomes: [
      {
        role: "React Developer",
        description:
          "Frontend specialist roles at product startups and SaaS companies across Pune. Highest demand specialisation in modern web.",
        band: "₹4–7 LPA",
      },
      {
        role: "Angular Developer",
        description:
          "Angular tech-lead and enterprise frontend roles at GCC captives and large engineering firms.",
        band: "₹4–6.5 LPA",
      },
      {
        role: "Next.js / SSR Engineer",
        description:
          "Performance-sensitive full-stack roles at SEO-driven product companies and SaaS firms.",
        band: "₹5–8 LPA",
      },
      {
        role: "Node.js Backend Engineer",
        description:
          "API + microservices engineer roles at product startups, fintech firms and SaaS companies.",
        band: "₹4–7 LPA",
      },
      {
        role: "Full Stack JS Developer",
        description:
          "MERN-stack engineer roles bridging React frontend + Node backend, common at modern product companies.",
        band: "₹4–6 LPA",
      },
    ],
    faqs: [
      {
        question: "Should I pick React or Angular?",
        answer:
          "React has more roles open in Pune product startups (Hinjewadi / Baner / Kharadi) and pays slightly better at the senior end. Angular has more roles at GCC captives and large enterprises that standardised on it 2018-2020. For freshers, React is the marginally better default choice; pick Angular only if you specifically target Microsoft / Adobe / large-enterprise hiring.",
      },
      {
        question: "Do I need to know JavaScript before joining a React or Angular course?",
        answer:
          "Yes — modern web frameworks assume working JavaScript fluency including ES6+, async/await, modules, and the DOM. Archer Infotech runs a 6–8 week JavaScript foundation track as a prerequisite; learners with prior coding experience in another language typically clear it in 4–5 weeks of fast-track delivery.",
      },
      {
        question: "Are Next.js and Node.js included in the React track?",
        answer:
          "The React focused track covers React itself plus integration with REST APIs and lightweight Node backends. Next.js (App Router, server components, ISR, edge functions) and full Node.js (Express, microservices, real-time, deployment) are taught as separate deep-dive tracks. Most learners do React → then layer Next.js + Node for the complete modern web stack.",
      },
      {
        question: "Are the courses taught online or at the Kothrud centre?",
        answer:
          "Both. Every Modern Web course runs as live online (Zoom / Google Meet) and offline classroom batches at the Kothrud Pune institute, with the same trainer, syllabus and project rubrics. Online learners get full session recordings through lifetime LMS access.",
      },
      {
        question: "Will I have a portfolio at the end of the course?",
        answer:
          "Yes. Every Modern Web track is project-led — by week 3 of any course you'll have a deployed application live on Vercel / Render / AWS; by course-end a portfolio of 2–3 production-grade apps with public GitHub repos that recruiters ask for during interviews.",
      },
    ],
  },

  // ============================================================
  // CLOUD & DEVOPS
  // ============================================================
  {
    slug: "cloud-devops",
    metaTitle: "Cloud + DevOps Courses in Pune — AWS, Azure, K8s",
    h1: "Cloud and DevOps Courses in Pune — AWS, Azure, Kubernetes, Docker and Terraform",
    subhead:
      "Build the operational layer of modern software at Pune's trusted Cloud and DevOps institute — AWS, Azure, Google Cloud, Docker, Kubernetes, Jenkins, Terraform with placement assistance.",
    paragraphs: [
      "Cloud and DevOps is the operational backbone every IT company now runs on. Across Indian IT services and Pune product startups alike, the move off-prem and onto AWS, Azure and GCP — combined with the standardisation of Docker / Kubernetes for deployment and Terraform / Jenkins for automation — has created a sustained, decade-long hiring boom for Cloud and DevOps engineers. Archer Infotech's Cloud & DevOps courses in Pune are built for that demand: classroom training at the Kothrud institute, hands-on labs against real AWS / Azure consoles, and a placement-assistance pipeline that connects learners directly with the 100+ corporate hiring partners actively recruiting Cloud / DevOps profiles.",
      "The Pune hiring picture in 2026 is concrete. Every services major — TCS, Infosys, Wipro, Tech Mahindra, Persistent — runs a dedicated Cloud / DevOps fresher pipeline. GCC captives at Capgemini, MindTree, Amdocs and the Pune-based product companies (Bajaj Finserv, BNY, Mastercard, Bharti Airtel labs) hire Kubernetes operators, Terraform specialists and CI/CD engineers in volume. The institute's own active corporate-training engagements — Amdocs, Capgemini, MindTree and Tech Mahindra — keep the curriculum aligned to what those clients hire for that quarter. Cloud certifications (AWS Solutions Architect, Azure Administrator) are increasingly a hard filter at GCC captives, which is why the related Cloud Certifications track exists as a sibling specialisation.",
      "The Cloud & DevOps tracks are anchored on Yogesh Patil (founder, 15+ years at Persistent Systems and Wipro with deep AWS / Azure architecture experience) with Vinod Patil — 12 years across solution-architect and AI-platform roles — leading cloud + AI integration sessions. The AWS course covers EC2, S3, VPC, IAM, RDS, Lambda and the core architecture patterns used by every Pune AWS-based product company; Azure covers App Services, Azure DevOps, AKS and the Microsoft cloud stack used by GCC captives; Docker + Kubernetes covers containerisation through to multi-cluster orchestration; Terraform + Jenkins covers Infrastructure as Code and CI/CD pipeline construction. Every track is hands-on lab driven — you'll spin up real cloud resources, deploy real applications, and break and fix real environments under trainer review.",
      "Cloud and DevOps classes at Archer Infotech's Kothrud centre run weekday, weekend and live online formats so working professionals can upskill without quitting their day jobs. The intermediate-to-advanced student profile is a working developer with 1–3 years of experience moving into cloud-native roles — but freshers and engineering students join too, often pairing a Cloud / DevOps track with a Java or Python foundation course. Course duration ranges from 6–8 weeks for single-tool tracks (Docker, Terraform, Jenkins) to 4–6 months for the full Cloud + DevOps stack. Curriculum was last reviewed 2026-05-06 against current console UIs and pricing models.",
      "Career outcomes for Cloud / DevOps roles consistently land in the upper salary band — average fresher packages run ₹4–6.5 LPA (placement-team data, last 12 months) and top performers in DevOps and AWS architecture have crossed ₹11 LPA. Working professionals upskilling into senior Cloud / DevOps roles regularly draw ₹12–18 LPA after 2–3 years of experience. Placement support is bundled into every flagship Cloud / DevOps fee — resume rewrite, ATS optimisation, mock interviews, certification preparation, and direct recruiter referrals.",
    ],
    careerOutcomes: [
      {
        role: "Cloud Engineer (AWS / Azure / GCP)",
        description:
          "Cloud architecture, deployment and migration roles at services majors, GCC captives and product companies.",
        band: "₹4–6.5 LPA",
      },
      {
        role: "DevOps Engineer",
        description:
          "Docker, Kubernetes, Jenkins, Terraform pipeline owner — every modern engineering team in Pune hires this profile.",
        band: "₹4–6 LPA",
      },
      {
        role: "Site Reliability Engineer (SRE)",
        description:
          "Production reliability + observability + on-call rotation roles at product startups and SaaS firms.",
        band: "₹5–8 LPA",
      },
      {
        role: "Kubernetes / Container Specialist",
        description:
          "Multi-cluster orchestration, service mesh, and platform-engineering roles at large product companies.",
        band: "₹6–10 LPA",
      },
      {
        role: "Cloud Solutions Architect (after 3+ yrs)",
        description:
          "Architecture-level role leading cloud migration and design — strong demand at GCC captives and Indian services majors.",
        band: "₹12–18 LPA (mid-career)",
      },
    ],
    faqs: [
      {
        question: "Should I pick AWS, Azure or Google Cloud first?",
        answer:
          "AWS has the largest install base in Pune product startups and SaaS firms — it's the safest first choice. Azure dominates at GCC captives and Microsoft-aligned enterprises (Capgemini, large Indian services majors). GCP picks up data-platform roles at niche product companies. For freshers, AWS is the marginally better default; learn one deeply, then layer the others.",
      },
      {
        question: "Do I need a programming background for Cloud / DevOps courses?",
        answer:
          "Some scripting comfort helps — bash, Python, or JavaScript at a basic level. Pure beginners are guided into a Python or Linux foundation course first; learners with developer backgrounds (Java, Python, .NET) can join Cloud / DevOps tracks directly. Hands-on lab work doesn't require prior cloud experience.",
      },
      {
        question: "Will I get hands-on practice on real AWS / Azure consoles?",
        answer:
          "Yes. Every Archer Infotech Cloud / DevOps course is lab-driven — you'll spin up real EC2 instances, S3 buckets, VPCs, EKS clusters, Azure App Services and Terraform-managed infrastructure under trainer guidance. Free-tier accounts cover most labs; the institute provides paid-tier credits for advanced labs that require them.",
      },
      {
        question: "Are AWS / Azure certifications included in the course?",
        answer:
          "Certification preparation is included — practice tests, exam-day strategy, and mock-question runs for AWS Solutions Architect Associate, Azure Administrator AZ-104 and Kubernetes CKA / CKAD are bundled into the relevant tracks. The official exam fee is paid separately by the learner. The Cloud Certifications category is the sibling track for learners specifically targeting certification.",
      },
      {
        question: "Is placement assistance included for Cloud / DevOps roles?",
        answer:
          "Yes. Resume rewrite, mock interviews, soft-skills training, and direct referrals to 100+ corporate hiring partners are bundled into every Cloud / DevOps course fee with no separate charge. The placement team has dedicated tracking of cloud-engineer / DevOps openings across the active partner network.",
      },
      {
        question: "Can working professionals do the Cloud / DevOps course alongside a job?",
        answer:
          "Yes — the majority of Cloud / DevOps cohorts at Archer Infotech are working professionals upskilling alongside full-time jobs. Weekend and evening batches run 4 hours per session; lifetime LMS access covers session recordings and lab walkthroughs for revision around work commitments.",
      },
    ],
  },

  // ============================================================
  // CLOUD CERTIFICATIONS
  // ============================================================
  {
    slug: "cloud-certifications",
    h1: "Cloud Certification Courses in Pune — AWS, Azure and Google Cloud",
    subhead:
      "Prepare for AWS Solutions Architect, Azure Administrator and Google Cloud certifications at Archer Infotech, Kothrud Pune — exam-day strategy, mock tests and hands-on labs.",
    paragraphs: [
      "Cloud certifications have moved from \"nice to have\" to a hard filter at GCC captives and several Indian services majors. AWS Solutions Architect Associate, Microsoft Azure Administrator (AZ-104), Google Cloud Associate Cloud Engineer and the equivalent professional-tier certifications are routinely listed as required qualifications on cloud engineer / SRE / DevOps job descriptions across Pune. Archer Infotech's Cloud Certification courses are built specifically for that exam-pass-and-job-ready outcome — focused, time-boxed, with mock tests calibrated against the actual exam's question patterns.",
      "Pune's hiring landscape rewards certifications differently than the Cloud / DevOps generalist track. A certified AWS Solutions Architect can clear the GCC captive resume filter in a way an uncertified senior engineer can't, even with identical hands-on experience. Azure Administrator certification opens Microsoft-stack engagements at Capgemini, large services majors and Microsoft partner firms. Google Cloud certifications are still emerging in the Pune market but pick up specialist roles at data-platform-heavy product companies. The certification track is the right pick when the job requirement explicitly names a credential.",
      "Archer Infotech's Cloud Certification courses run as compact, exam-focused programmes — typically 6–8 weeks per certification depending on tier. Each course covers the full exam blueprint, hands-on labs against the real cloud console, mock tests under exam conditions, and a final exam-day strategy session. The AWS and Azure tracks are anchored on Yogesh Patil and Vinod Patil — both with deep architecture backgrounds and active certification credentials — so the trainer team has personally cleared the same exam you're sitting for. The institute also runs corporate certification cohorts for Amdocs, Capgemini, MindTree and Tech Mahindra teams, which keeps the question patterns and exam updates in the trainer team's working knowledge.",
      "Certification classes run weekday, weekend and live online formats; weekend cohorts are the most popular because the certification track is overwhelmingly working professionals upskilling alongside a job. The institute provides free-tier cloud accounts for most labs and paid-tier credits for the advanced architectural patterns. Lifetime LMS access keeps the practice tests and lab walkthroughs available for refreshers — useful given that AWS, Azure and GCP all require recertification every 2–3 years.",
      "Outcomes for the certification track split by exam tier. Associate-level certifications (AWS SAA, Azure AZ-104) routinely move learners from ₹6–8 LPA roles to ₹9–12 LPA roles within 6 months of the certification appearing on the resume. Professional-tier certifications (AWS Solutions Architect Professional, Azure Solutions Architect Expert) regularly land learners in the ₹15–22 LPA band at GCC captives. The certification fee is paid separately by the learner directly to AWS / Microsoft / Google; the Archer Infotech course fee covers the training, labs, mock tests and exam-day support.",
    ],
    careerOutcomes: [
      {
        role: "AWS Certified Engineer",
        description:
          "Cloud engineer / DevOps roles at GCC captives, services majors and product companies that require AWS credential.",
        band: "₹6–10 LPA",
      },
      {
        role: "Azure Administrator (AZ-104)",
        description:
          "Microsoft-stack roles at Capgemini, Microsoft partner firms and large services majors.",
        band: "₹6–9 LPA",
      },
      {
        role: "Google Cloud Engineer",
        description:
          "Data-platform and analytics roles at GCP-aligned product companies.",
        band: "₹6–10 LPA",
      },
      {
        role: "AWS Solutions Architect Professional",
        description:
          "Senior architecture roles at GCC captives and large product companies — requires 2-3+ years of AWS experience.",
        band: "₹15–22 LPA (mid-career)",
      },
      {
        role: "Cloud Migration Specialist",
        description:
          "On-prem to cloud migration roles — strong demand at services majors handling enterprise clients.",
        band: "₹8–14 LPA (mid-career)",
      },
    ],
    faqs: [
      {
        question: "Is the certification fee included in the Archer Infotech course fee?",
        answer:
          "No — the official exam fee is paid by the learner directly to AWS / Microsoft / Google when booking the exam (typically ₹12,000–₹25,000 depending on certification and tier). Archer Infotech's course fee covers training, labs, mock tests and exam-day strategy — not the certification fee itself.",
      },
      {
        question: "Which AWS certification should I start with?",
        answer:
          "AWS Cloud Practitioner is the easiest entry point but rarely required by Pune employers. AWS Solutions Architect Associate (SAA-C03) is the highest-value first certification — every Pune employer that asks for an AWS credential accepts it as the floor. Pursue Solutions Architect Professional (SAP-C02) only after 2–3 years of working AWS experience.",
      },
      {
        question: "How long does certification preparation take?",
        answer:
          "Associate-tier certifications (AWS SAA, Azure AZ-104, GCP ACE) run 6–8 weeks at standard pace including mock tests and exam-day prep. Professional-tier (SAP, Azure Solutions Architect Expert) run 10–12 weeks because the exam blueprint is broader. Working professionals on weekend cohorts complete the same content over a slightly longer calendar window.",
      },
      {
        question: "Will I do hands-on labs on real cloud accounts?",
        answer:
          "Yes. Every Archer Infotech certification course is lab-driven against real AWS / Azure / GCP consoles. Free-tier accounts cover the majority of labs; the institute provides paid-tier credits for advanced architectural labs. The hands-on practice is critical — the certification exams test architectural decisions, not memorisation.",
      },
      {
        question: "What pass rate do Archer Infotech learners have on AWS / Azure exams?",
        answer:
          "First-attempt pass rates across associate-tier certifications consistently sit in the 80–90% range across cohorts who complete the mock-test gate (institute internal records). Learners who skip the mock-test phase have notably lower pass rates — the gate exists for that reason. Retake support is included if needed.",
      },
    ],
  },

  // ============================================================
  // DATA & AI
  // ============================================================
  {
    slug: "data-ai",
    h1: "Data Science, Machine Learning and AI Courses in Pune",
    subhead:
      "Learn Data Science, Machine Learning, Data Analytics, Data Engineering and AI/ML at Archer Infotech, Kothrud Pune — Python, statistics, real datasets and placement assistance.",
    paragraphs: [
      "Data, Machine Learning and AI is now the most-discussed career track in Indian IT — and the most misunderstood. Archer Infotech's Data & AI category covers the four real practitioner roles Pune actually hires for: Data Analyst, Data Scientist, Data Engineer, and Machine Learning Engineer. The curriculum maps cleanly onto those roles rather than chasing the buzzword cycle. Foundation courses cover Python for data, statistics, SQL, and visualisation; specialisation tracks go deep on ML algorithms, model deployment, and the data-pipeline tooling each role actually uses on the job.",
      "The Pune hiring picture in 2026 is more nuanced than the typical \"data scientist starts at ₹15 LPA\" headline suggests. Realistic fresher data analyst roles at services majors and GCC captives sit in the ₹3.5–5 LPA band; data engineer roles run ₹4–6 LPA fresher; data scientist roles for fresh graduates with strong math + ML projects run ₹5–8 LPA at product companies. The headline ₹15 LPA+ packages are overwhelmingly experienced specialists with 3+ years and proven ML model-deployment track records — a target to plan for, not a fresher expectation. Realistic positioning is what gets hired; ambitious mispositioning gets filtered out.",
      "The Data & AI tracks at Archer Infotech are taught by working trainers who have shipped data systems in production. Amol Patil — corporate trainer with 10+ years of senior-trainer experience and active enterprise engagements at Amdocs, Capgemini, MindTree and Tech Mahindra — leads the corporate Python and Data Analytics tracks. Vinod Patil (12 years across solution-architect and AI-platform roles) leads ML, Deep Learning and AI architecture sessions. The curriculum is refreshed every six months — last reviewed 2026-05-06 — against the libraries and patterns Pune product companies actively use (Pandas, NumPy, scikit-learn, PyTorch, TensorFlow, Apache Spark, Airflow, Power BI, Tableau).",
      "Data Science classes at the Kothrud institute run as deep, project-led courses — 5–6 months for the flagship Data Science track including statistics, ML algorithms, deep learning fundamentals, deployment, and a capstone project on a real dataset. Data Analytics is a tighter 3-month course focused on SQL + Python + Power BI for analyst roles; Data Engineering covers Spark, Airflow, and pipeline construction; Machine Learning is a specialist track for learners who already have a Python + statistics base. Every course is taught against real datasets — Kaggle competitions, public datasets, or institute-curated business problems — not toy classroom examples.",
      "Career outcomes for Data & AI roles split sharply by role: Data Analyst freshers run ₹3.5–5 LPA (placement-team data, last 12 months) at services majors and GCC captives; Data Scientist freshers with strong projects run ₹5–7 LPA; Machine Learning Engineer roles for graduates with ML deployment experience run ₹6–10 LPA. Working professionals with 2-3 years' experience switching into senior data roles regularly draw ₹12–18 LPA. Placement support is bundled into every course fee — resume rewrite focused on highlighting model-deployment evidence, GitHub portfolio review, mock interviews specifically calibrated to the data-role interview format, and direct referrals to 100+ hiring partners.",
    ],
    careerOutcomes: [
      {
        role: "Data Analyst",
        description:
          "SQL + Python + visualisation roles at services majors and GCC captives. Highest-volume fresher entry point into data careers.",
        band: "₹3.5–5 LPA",
      },
      {
        role: "Data Scientist",
        description:
          "ML modelling + analysis at product companies. Requires strong statistics + Python + portfolio of deployed models.",
        band: "₹5–8 LPA",
      },
      {
        role: "Data Engineer",
        description:
          "Spark, Kafka, Airflow data-pipeline roles at product companies and modern data-platform-driven firms.",
        band: "₹4–6 LPA",
      },
      {
        role: "Machine Learning Engineer",
        description:
          "Production ML deployment, MLOps, model monitoring at AI-driven product companies.",
        band: "₹6–10 LPA",
      },
      {
        role: "Senior Data Scientist (after 3+ yrs)",
        description:
          "Lead ML model design + business-impact accountability. Strong demand at Pune product companies and GCC captives.",
        band: "₹15–22 LPA (mid-career)",
      },
    ],
    faqs: [
      {
        question: "Should I pick Data Analyst, Data Scientist or Data Engineer?",
        answer:
          "Data Analyst is the highest-volume fresher entry — SQL + Python + visualisation; pure beginner-friendly. Data Scientist requires stronger math + ML and is selective at fresher level. Data Engineer rewards solid programming background — Pune hiring is strong for this role. Counsellors at Archer Infotech help shortlist the right track during the free demo class based on background and target role.",
      },
      {
        question: "Do I need a math / statistics background for Data Science?",
        answer:
          "Foundational comfort with statistics (mean / variance / probability / hypothesis testing) and linear algebra basics is needed for the Data Scientist track. The Data Science course covers the maths from scratch but moves quickly — engineers / CS graduates clear it comfortably; non-quantitative-degree graduates often need an extra few weeks of math review which the institute can guide. Data Analyst has lighter math expectations.",
      },
      {
        question: "How long does the Data Science course take?",
        answer:
          "The flagship Data Science track at Archer Infotech runs 5–6 months — Python for data → statistics → SQL → ML algorithms → deep learning fundamentals → deployment → capstone project. Data Analytics runs 3 months focused on SQL + Python + Power BI / Tableau. Machine Learning is a 3-month specialist track for learners with prior Python + statistics base.",
      },
      {
        question: "Will I work on real datasets and build a portfolio?",
        answer:
          "Yes. Every Data & AI course at Archer Infotech is project-led against real datasets — Kaggle competitions, public datasets and institute-curated business problems. By course-end you'll have a public GitHub portfolio with 3–5 deployed models or analyses that recruiters routinely ask for during interviews.",
      },
      {
        question: "What are the realistic fresher salaries in Data Science?",
        answer:
          "Realistic fresher Data Analyst packages run ₹3.5–5 LPA; fresher Data Scientist roles with strong portfolio projects run ₹5–7 LPA; ML Engineer freshers with deployment experience run ₹6–10 LPA. The ₹15 LPA+ headlines are overwhelmingly experienced specialists with 2–3+ years of model deployment evidence — a target to plan for, not a fresher expectation. Source: Archer Infotech placement-team data, last 12 months of offers.",
      },
      {
        question: "Is placement assistance included for data roles?",
        answer:
          "Yes. Data-role-specific placement support — resume positioning emphasising deployed projects, GitHub portfolio review, mock interviews calibrated to data-interview format (case rounds + technical rounds), and direct referrals to 100+ hiring partners — is bundled into every Data & AI course fee with no separate placement charge.",
      },
    ],
  },

  // ============================================================
  // GENERATIVE AI
  // ============================================================
  {
    slug: "generative-ai",
    metaTitle: "Generative AI Courses in Pune — LLMs, RAG, LangChain",
    h1: "Generative AI Courses in Pune — ChatGPT, LLMs, RAG, LangChain and Prompt Engineering",
    subhead:
      "Build production AI applications with LLMs, RAG and modern AI tooling at Archer Infotech's Pune institute — Generative AI, ChatGPT/Claude integration, Prompt Engineering, AI Engineer roadmap.",
    paragraphs: [
      "Generative AI has moved from research buzz to actual production hiring in roughly 18 months. By 2026 every Pune product company of meaningful scale is shipping at least one LLM-backed feature, and several services majors have built dedicated GenAI practices to staff client engagements. Archer Infotech's Generative AI courses in Pune are built for that production-hiring reality: foundations of how LLMs work, hands-on integration with the major model APIs (OpenAI, Anthropic, Gemini), retrieval-augmented generation (RAG) with vector databases, agent frameworks like LangChain, and prompt-engineering patterns that hold up under real production constraints.",
      "The Pune hiring landscape for GenAI roles in 2026 splits cleanly into three tracks. AI Engineer roles — building LLM-backed product features — sit in the ₹5–10 LPA fresher band at product startups and the ₹8–14 LPA range at GCC captives. Prompt Engineer roles are a real but smaller slice of the market, mostly absorbed into AI Engineer and product-facing engineering roles rather than standalone titles. AI / ML solution-architect roles for senior engineers run ₹18–30 LPA at product companies. The trap to avoid is positioning as a \"prompt engineer\" with no programming foundation; the high-paying GenAI roles all require working code in Python, JavaScript or both.",
      "Archer Infotech's GenAI tracks are anchored on Vinod Patil — 12 years across solution-architect and AI-platform roles — who teaches the AI / Generative AI / Solution Architecture courses end-to-end. The Generative AI flagship covers LLM internals (transformers, attention, tokenisation), API integration (OpenAI, Anthropic, Gemini), prompt-engineering patterns, RAG with vector databases (Pinecone, Chroma, Weaviate), agent frameworks (LangChain, LlamaIndex), evaluation and guardrails. ChatGPT & LLMs is a tighter introductory track. Prompt Engineering is a 6-week focused course for product managers, content teams and developers who need to build prompt libraries without going deep on the rest of the stack. AI Tools is a 3-month survey for non-engineering roles wanting fluency across the modern AI tooling.",
      "GenAI classes at the Kothrud institute run weekday, weekend and live online formats — weekend is by far the most popular because the GenAI student profile is overwhelmingly working developers upskilling. Every track is project-led: by week 4 you'll have a deployed LLM-backed application running against real model APIs; by course-end a portfolio of 2–3 production-grade GenAI apps with public GitHub repos. The curriculum was last reviewed 2026-05-06 against the current model versions (GPT-5, Claude Opus 4.6, Gemini 2.x), pricing tiers, and the framework versions Pune product companies actually deploy. Lifetime LMS access keeps recordings and lab walkthroughs available — important given how fast the GenAI tooling layer evolves.",
      "Career outcomes for GenAI roles consistently sit in the upper salary bands. AI Engineer freshers with strong portfolios regularly draw ₹5–8 LPA at product startups (placement-team data, last 12 months); top performers with deployed LLM applications and benchmark experience have crossed ₹14 LPA. Working developers (2–3 years' experience) switching into AI Engineer roles routinely move from ₹8–10 LPA into the ₹15–22 LPA band. Placement support is bundled into every GenAI course fee — resume rewrite emphasising deployed AI applications, portfolio review, mock interviews calibrated to AI-engineer interview format (system design + LLM-specific evaluation rounds), and direct referrals to the 100+ hiring partners with active AI / GenAI hiring.",
    ],
    careerOutcomes: [
      {
        role: "AI Engineer",
        description:
          "Build LLM-backed product features — RAG, agents, prompt pipelines. Highest-demand GenAI role at Pune product startups.",
        band: "₹5–10 LPA",
      },
      {
        role: "Prompt Engineer",
        description:
          "Specialised role at AI-first product companies. Mostly absorbed into broader AI Engineer titles in 2026.",
        band: "₹6–12 LPA",
      },
      {
        role: "ML Engineer with GenAI focus",
        description:
          "Production ML deployment + LLM integration. Requires both ML pipeline experience and GenAI tooling fluency.",
        band: "₹6–12 LPA",
      },
      {
        role: "AI Solutions Architect",
        description:
          "Senior role designing LLM-backed systems for clients. Requires 3+ years of production AI experience.",
        band: "₹18–30 LPA (mid-career)",
      },
      {
        role: "AI Product / Tooling Engineer",
        description:
          "Non-LLM-core role at AI-adjacent product companies — observability, evaluation harnesses, tooling.",
        band: "₹6–10 LPA",
      },
    ],
    faqs: [
      {
        question: "Do I need a Machine Learning background for the Generative AI course?",
        answer:
          "No — the flagship GenAI track is designed for working developers, not ML researchers. You need solid Python (or JavaScript) and comfort with REST APIs; the course covers everything from there. Learners with ML background pick up the model-internals modules faster but the practical AI Engineer pattern doesn't require deep ML theory.",
      },
      {
        question: "Which AI / GenAI course should I pick?",
        answer:
          "AI Engineer (6 months) is the right pick if you target AI Engineer roles — it covers LLMs, RAG, agents, deployment end-to-end. Generative AI (4 months) is the broader survey including ChatGPT/Claude, LangChain and prompt engineering. Prompt Engineering (6 weeks) is for non-engineering roles building prompt libraries. ChatGPT & LLMs (8 weeks) is a focused introduction. Counsellors help match background + target role during the free demo.",
      },
      {
        question: "Will I build real AI applications during the course?",
        answer:
          "Yes — every Archer Infotech GenAI track is project-led against real model APIs (OpenAI, Anthropic, Gemini). By week 4 of any flagship course you'll have a deployed LLM-backed application; by course-end a portfolio of 2–3 production-grade GenAI apps with public GitHub repos that recruiters ask for during interviews.",
      },
      {
        question: "Are the API costs included in the course fee?",
        answer:
          "Free-tier and trial credits cover most labs. The institute provides paid API credits for advanced labs that exceed free-tier limits — typical learner spend on personal API usage during the course is under ₹1,000. Specific spend depends on which models you experiment with for capstone projects.",
      },
      {
        question: "How realistic are the ₹15+ LPA fresher salaries you see online?",
        answer:
          "Realistic AI Engineer fresher packages with strong portfolios run ₹5–10 LPA at Pune product startups. ₹15+ LPA fresher offers exist but are concentrated at top-tier product companies and require deployed LLM applications + benchmark experience — a small slice of the fresher market, not the median. Working developers (2–3 years' experience) switching into AI Engineer roles routinely cross ₹15 LPA. Source: placement-team data, last 12 months.",
      },
      {
        question: "Is placement assistance included for GenAI / AI Engineer roles?",
        answer:
          "Yes. AI-role-specific placement support — resume positioning emphasising deployed AI applications, portfolio review, and mock interviews calibrated to AI Engineer interview format (system design rounds + LLM-specific evaluation rounds + product-thinking questions) — is bundled into every GenAI course fee. Direct referrals to the 100+ hiring partners with active AI / GenAI roles.",
      },
    ],
  },

  // ============================================================
  // MOBILE APP DEVELOPMENT
  // ============================================================
  {
    slug: "mobile-app-development",
    metaTitle: "Mobile App Courses in Pune — Android, iOS, React Native",
    h1: "Mobile App Development Courses in Pune — Android, iOS, React Native and Flutter",
    subhead:
      "Build native and cross-platform mobile apps at Archer Infotech, Kothrud Pune — Android (Kotlin), iOS (Swift), React Native, Flutter classes with project-led delivery and placement assistance.",
    paragraphs: [
      "Mobile App Development sits in a smaller but consistently-hiring slice of the Pune IT market. The hiring footprint splits across two profiles: native mobile engineers at product startups and consumer-app companies (Android with Kotlin / Java, iOS with Swift) and cross-platform mobile engineers at services majors and GCC captives that ship apps to multiple platforms (React Native, Flutter). Archer Infotech's Mobile App Development courses in Pune cover both paths — the institute teaches the Android, iOS, React Native and Flutter tracks as separate focused courses rather than bundling everything into one survey.",
      "The Pune hiring picture for mobile in 2026 is concrete though smaller than full-stack or cloud. Consumer product companies — Bharti Airtel digital, BookMyShow, Zomato Pune, plus the smaller Pune-native consumer startups — hire Android / Kotlin specialists in batch volume. Services majors handle multi-client app builds and prefer cross-platform engineers (Flutter dominates the Indian-services-major mobile pipeline, with React Native a close second). iOS / Swift roles are smaller in volume but pay better — Pune iOS engineer fresher offers regularly clear ₹5–7 LPA (placement-team data, last 12 months) versus ₹4–5.5 LPA for equivalent Android. Flutter and React Native both command middle of that range.",
      "The Mobile App Development tracks at Archer Infotech are owned by Amol Chougule — 5+ years of front-end and mobile production experience, including production React Native and Flutter apps for Pune startups. The Android track covers Kotlin language, Android SDK fundamentals, Jetpack Compose, RoomDB persistence, networking, MVVM architecture, and Play Store deployment. iOS Swift covers Swift language, UIKit and SwiftUI, Core Data, networking, and App Store deployment. React Native covers the React core fundamentals (a prerequisite — most learners do React first) plus the React Native bridge, native module integration, navigation, and platform-specific publishing. Flutter covers Dart language, widget composition, state management (Riverpod / Bloc), platform-specific integration, and publishing to both stores.",
      "Mobile classes at the Kothrud institute run weekday, weekend and live online formats. Each track is 3–4 months of focused course time including a capstone project — by course-end you'll have a published Android / iOS / cross-platform app live on the relevant store, plus the public GitHub repo recruiters ask for. The institute provides Android emulator access for all learners; iOS development requires Mac hardware (the institute lab has a few Macs available for booking, but learners committed to iOS development typically own or rent one). Lifetime LMS access keeps the recordings and platform-specific gotcha walkthroughs available for reference long after the course ends.",
      "Career outcomes for mobile roles run a touch behind the full-stack and cloud tracks but with strong specialisation upside. Android freshers run ₹4–5.5 LPA, iOS freshers run ₹5–7 LPA, React Native and Flutter freshers run ₹4–6 LPA. Working professionals with 2–3 years of mobile experience moving into senior roles regularly cross ₹12–16 LPA, especially in iOS where supply is thinner. Placement support is bundled into every mobile course fee — resume rewrite emphasising published apps, portfolio review, mock interviews calibrated to mobile-interview format (UI rounds + system-design rounds + platform-specific deep-dive), and direct referrals to the 100+ hiring partner network including the Pune consumer-app companies actively hiring mobile engineers.",
    ],
    careerOutcomes: [
      {
        role: "Android Developer (Kotlin)",
        description:
          "Native Android engineer roles at consumer product companies and digital-arm teams of services majors.",
        band: "₹4–5.5 LPA",
      },
      {
        role: "iOS Developer (Swift)",
        description:
          "Native iOS engineer roles at consumer product companies — pays a premium because supply is thinner.",
        band: "₹5–7 LPA",
      },
      {
        role: "React Native Developer",
        description:
          "Cross-platform engineer roles at services majors and product companies shipping to both stores.",
        band: "₹4–6 LPA",
      },
      {
        role: "Flutter Developer",
        description:
          "Cross-platform Dart-stack engineer roles. Dominant cross-platform pattern at Indian services majors.",
        band: "₹4–6 LPA",
      },
      {
        role: "Senior Mobile Engineer (after 3+ yrs)",
        description:
          "Architecture and lead roles at consumer product companies — especially strong for iOS specialists.",
        band: "₹12–16 LPA (mid-career)",
      },
    ],
    faqs: [
      {
        question: "Should I pick native (Android / iOS) or cross-platform (React Native / Flutter)?",
        answer:
          "Native pays better and gives deeper specialisation — pick Android Kotlin or iOS Swift if you target consumer product companies and want to be the platform expert. Cross-platform (Flutter or React Native) opens services-major and broader product roles and hires in larger volume in Pune. For freshers wanting the broadest first-job pool, Flutter is the safest cross-platform choice in 2026.",
      },
      {
        question: "Do I need a Mac to learn iOS development?",
        answer:
          "Yes — iOS development requires macOS for Xcode, the App Store deployment toolchain. The Archer Infotech lab has a few Macs available for booking during the course, but learners committed to iOS as a career path typically own or rent one (a used MacBook Air or Mac Mini is the cheapest viable option). Android, React Native and Flutter run on any Windows / Linux / Mac development machine.",
      },
      {
        question: "Should I learn React before React Native?",
        answer:
          "Yes — React Native uses React's component model, hooks, JSX and state management patterns. The Archer Infotech React Native track assumes working React fluency; pure beginners are guided through a JavaScript → React foundation track first (typically 2–3 months) before joining React Native.",
      },
      {
        question: "Will I publish a real app at the end of the course?",
        answer:
          "Yes. Every Archer Infotech Mobile App Development course closes with a capstone project — a published app live on the Play Store and/or App Store, with the public GitHub repo recruiters ask for. Past capstones have included consumer apps, productivity tools, and small-business management apps. The publishing step is part of the curriculum because recruiters specifically ask for the live store URL.",
      },
      {
        question: "How long does a mobile course take?",
        answer:
          "Each track (Android, iOS, React Native, Flutter) runs 3–4 months at standard pace including the capstone project. Fast-track variants run 6–8 weeks for learners with prior programming experience. Course detail pages list the module-by-module timelines.",
      },
      {
        question: "Is placement assistance included for mobile roles?",
        answer:
          "Yes. Mobile-role-specific placement support — resume positioning emphasising published apps, portfolio review, mock interviews calibrated to mobile-interview format, and direct referrals to the 100+ hiring partner network including Pune consumer-app companies — is bundled into every Mobile App Development course fee.",
      },
    ],
  },

  // ============================================================
  // DATABASE TECHNOLOGIES
  // ============================================================
  {
    slug: "database-technologies",
    h1: "Database Courses in Pune — MySQL, PostgreSQL, MongoDB and Oracle",
    subhead:
      "Master SQL and NoSQL database systems at Archer Infotech, Kothrud Pune — MySQL, PostgreSQL, MongoDB, Oracle Database training and classes with hands-on labs and placement assistance.",
    paragraphs: [
      "Database Technologies is the foundation layer every backend, full-stack, data and DevOps engineer needs and every IT recruiter screens for in interviews. Archer Infotech's Database courses in Pune cover the four database systems that dominate Indian IT hiring: MySQL (the universal default at services majors and most product startups), PostgreSQL (the modern open-source enterprise database increasingly chosen by product companies), MongoDB (the dominant NoSQL document database, paired with MERN-stack roles), and Oracle Database (still the system of record at large enterprises, BFSI and several GCC captives).",
      "The Pune database hiring picture in 2026 has two distinct profiles. Generalist database competency — strong SQL, schema design, query optimisation, indexing — is a hard filter at every full-stack and backend interview round; you cannot clear a Java / Python / .NET fresher interview at TCS, Infosys, Persistent or Capgemini without solid SQL on a whiteboard. Specialist Database Administrator (DBA) roles are a smaller but distinct hiring pool — Oracle DBAs at large BFSI and GCC captives, PostgreSQL specialists at modern product companies, MongoDB engineers at MERN-stack-heavy startups. Database fluency is a multiplier on every other career track; database specialisation is a viable career on its own.",
      "Database courses at Archer Infotech are taught against real database systems with real production-like datasets. The MySQL course covers schema design, indexing, query optimisation, transactions, replication, backup / restore, and the MySQL-specific tooling MNCs use. PostgreSQL covers everything in MySQL plus PostgreSQL-specific features (JSONB, window functions, CTEs, partitioning) — the growing edge in Pune product hiring. MongoDB covers document modelling, aggregation pipelines, indexing, replica sets, and MERN-stack integration. Oracle Database covers SQL, PL/SQL, performance tuning and the DBA toolchain used at BFSI and large enterprises. The trainer team has database production experience including Ankita Hartale (5+ years Java + database at Pune product companies) and the broader faculty's MNC backgrounds at Persistent Systems, Wipro and Tech Mahindra.",
      "Database classes at the Kothrud institute run weekday, weekend and live online formats. Each track is 6–10 weeks of focused course time — shorter than full-stack or cloud because the depth-per-week is naturally higher. Every course is hands-on lab driven against installed databases (no SaaS-only learning that hides the operational layer); learners install MySQL, PostgreSQL or MongoDB locally, work through real schemas, write production-grade queries, and tune for performance under trainer review. Most database courses pair naturally with another track — MySQL pairs with Java / Python full-stack; MongoDB pairs with MERN; Oracle pairs with Java enterprise / BFSI roles.",
      "Career outcomes for database tracks split by depth. Generalist database competency is implicit in every backend / full-stack / data role, where database skills are a hard interview filter rather than a separate hiring track — Pune full-stack freshers with strong SQL routinely outrank candidates with weaker database depth. Specialist DBA roles for freshers run ₹4–6 LPA (placement-team data, last 12 months) at services majors and BFSI; experienced Oracle DBAs at large enterprises regularly draw ₹12–18 LPA. PostgreSQL specialists at modern product companies and MongoDB engineers at MERN-stack startups run ₹5–8 LPA fresher and ₹14–20 LPA mid-career. Placement support is bundled into every database course fee — resume rewrite, mock interviews calibrated to database-interview format (whiteboard SQL + schema design + optimisation rounds), and direct referrals to the 100+ hiring partner network.",
    ],
    careerOutcomes: [
      {
        role: "Database Engineer / Backend with SQL focus",
        description:
          "Backend roles with strong database depth — every full-stack and Java / Python backend role in Pune.",
        band: "Implicit (drives full-stack offers)",
      },
      {
        role: "MongoDB Developer (MERN-stack focused)",
        description:
          "NoSQL database engineer at MERN-stack product companies and startups across Pune.",
        band: "₹4–6 LPA",
      },
      {
        role: "PostgreSQL Specialist",
        description:
          "Modern open-source database engineer roles at product companies — strong demand at Pune SaaS firms.",
        band: "₹5–7 LPA",
      },
      {
        role: "Oracle DBA",
        description:
          "Database administration at BFSI, large enterprises and Oracle-stack GCC captives.",
        band: "₹4–6 LPA",
      },
      {
        role: "Senior Database / Performance Engineer (after 3+ yrs)",
        description:
          "Performance tuning, replication, large-scale query optimisation roles at Pune product and BFSI firms.",
        band: "₹12–18 LPA (mid-career)",
      },
    ],
    faqs: [
      {
        question: "Should I pick MySQL, PostgreSQL, MongoDB or Oracle?",
        answer:
          "MySQL is the universal default — every services-major Pune interview asks SQL on it. PostgreSQL is the rising standard at modern product companies and pairs better with Python / Django stacks. MongoDB is the right pick alongside MERN-stack roles. Oracle is the specialist track for BFSI and large-enterprise targets. For freshers, MySQL is the safest first database; specialise into one of the others as your stack focus narrows.",
      },
      {
        question: "Do I need to learn database technologies separately if I'm doing full-stack?",
        answer:
          "Database skills come embedded in every full-stack track — Java FS uses MySQL / PostgreSQL, MERN uses MongoDB, .NET FS uses SQL Server. The standalone Database course is the right pick when you want to go deep on database design, optimisation, and DBA-level skills beyond what fits inside a full-stack curriculum, or when targeting specialist DBA roles.",
      },
      {
        question: "Are these courses hands-on with real databases?",
        answer:
          "Yes — every Archer Infotech database course is lab-driven against installed local databases (MySQL, PostgreSQL, MongoDB, Oracle XE for the Oracle track). Learners write production-grade queries, design schemas, work with real-world datasets, and tune for performance under trainer review. SaaS-only databases that hide operational details are deliberately not the primary teaching surface.",
      },
      {
        question: "How long does a database course take?",
        answer:
          "MySQL and MongoDB tracks run 6–8 weeks at standard pace. PostgreSQL runs 8 weeks because the feature surface is broader. Oracle Database runs 10 weeks including PL/SQL and performance-tuning modules. Course detail pages list the module-by-module timelines.",
      },
      {
        question: "Will I learn how to clear database interview rounds?",
        answer:
          "Yes. Every Archer Infotech database course includes the interview-format whiteboard SQL questions, schema-design exercises, and optimisation patterns Pune services majors and product companies actually use in interview rounds. Mock-interview rounds with database focus are part of the placement-assistance pipeline.",
      },
    ],
  },
];

/** Lookup helper used by the category landing page render. */
export function getCategoryContent(slug: string): CategoryContent | undefined {
  return categoryContent.find((c) => c.slug === slug);
}
