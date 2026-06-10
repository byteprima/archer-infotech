/**
 * P5-24 — PAA / Q&A hub data.
 *
 * Targets People-Also-Ask (PAA) style search queries about Archer
 * Infotech + Pune IT careers. Distinct from /interview-questions/...
 * (which targets interview-prep queries asked BY interviewers).
 *
 * This file targets questions users actually search for on Google +
 * AI engines about institute selection, courses, fees, placements,
 * admissions, bootcamps, batch formats.
 *
 * Each category gets its own URL: /questions/[slug].
 * Hub at /questions lists all categories.
 *
 * FAQPage schema emitted per category for AI Overview eligibility.
 */

export interface QuestionEntry {
  /** Anchor slug for direct linking + schema @id */
  id: string;
  question: string;
  /** 60-150 words; AI-extraction friendly */
  answer: string;
  /** Optional internal link surfaced under the answer */
  relatedHref?: string;
  relatedLabel?: string;
}

export interface QuestionCategory {
  slug: string;
  label: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  /** 2-3 sentence framing of what this category covers */
  intro: string;
  questions: QuestionEntry[];
}

export const questionCategories: QuestionCategory[] = [
  // ─── About Archer Infotech ──────────────────────────────────────────
  {
    slug: "about-archer-infotech",
    label: "About Archer Infotech",
    metaTitle: "About Archer Infotech — FAQs About Pune's 17-Year-Old IT Training Institute",
    metaDescription:
      "The most-asked questions about Archer Infotech — founded 2009, Pune Kothrud campus, 10,000+ engineers trained, 5,000+ placed, 90% placement rate. Honest answers + verified facts.",
    h1: "About Archer Infotech — Frequently Asked Questions",
    intro:
      "Direct answers to the questions prospective students + parents most often ask about Archer Infotech. All facts come from institute records; we don't claim 100% placement and don't fabricate stats.",
    questions: [
      {
        id: "is-archer-infotech-good",
        question: "Is Archer Infotech a good IT training institute in Pune?",
        answer:
          "Archer Infotech has been training IT professionals in Pune since 2009 — 17+ years of operations. Institute records: 10,000+ engineers trained, 5,000+ placed, 90% placement rate across tracks. 100+ active corporate partners including Amdocs, Capgemini, MindTree, Tech Mahindra. 126+ Google reviews averaging 5.0 stars. Quality is best evaluated via free demo class + speaking with recent alumni — we encourage prospective students to do both before enrolling.",
        relatedHref: "/about/facts",
        relatedLabel: "Full institute fact sheet",
      },
      {
        id: "when-was-archer-infotech-founded",
        question: "When was Archer Infotech founded?",
        answer:
          "Archer Infotech was founded in 2009 by Yogesh Patil in Pune, India. The institute has been operating continuously for 17+ years from its Kothrud campus, originally focused on Java and Python training and expanding to cover the modern IT stack: full stack, data science, cloud / DevOps, generative + agentic AI, Salesforce, software testing, and more — 40+ courses total.",
      },
      {
        id: "who-founded-archer-infotech",
        question: "Who is the founder of Archer Infotech?",
        answer:
          "Archer Infotech was founded by Yogesh Patil in 2009. He continues to actively lead the institute as Founder & Lead Trainer; he personally teaches the Java / Spring Boot tracks alongside the 6-person faculty (combined 54+ years of industry experience). Bio + LinkedIn available on the trainer profile page.",
        relatedHref: "/trainers/yogesh-patil",
        relatedLabel: "Yogesh Patil — Founder profile",
      },
      {
        id: "where-is-archer-infotech-located",
        question: "Where is Archer Infotech located?",
        answer:
          "Archer Infotech's main campus is at Flat No. 12, Divyadarshan Housing Society, Kothrud, Pune 411038. We serve Pune learners across 12 neighbourhoods including Kothrud, Karve Nagar, Erandwane, Warje, Bavdhan, Aundh, Baner, Hinjewadi, Wakad, Pimpri-Chinchwad, Deccan, and Karve Road via classroom + online tracks. Live online tracks accept learners from anywhere in India.",
        relatedHref: "/locations",
        relatedLabel: "Service locations in Pune",
      },
      {
        id: "how-many-students-trained",
        question: "How many students has Archer Infotech trained?",
        answer:
          "Per institute placement records over 17 years (2009-2026): 10,000+ engineers trained across all tracks; 5,000+ placed at IT services majors + product companies + GCC + BFSI tech teams. This is cumulative across all batches; current annual intake is approximately 600-1,000 learners across weekday + weekend + online formats.",
      },
      {
        id: "placement-rate",
        question: "What's the placement rate at Archer Infotech?",
        answer:
          "Institute placement rate is 90% across all tracks (placement records, last 12 months of offers). We do not claim 100% placement — that's a misleading metric most credible institutes don't promise. Some tracks (Java Full Stack, Software Testing) run above 90%; some specialised tracks (Agentic AI, Salesforce PD1) closer to 80-85%. Placement support is structured + bundled with every placement-eligible course.",
        relatedHref: "/placements",
        relatedLabel: "Placement outcomes + track record",
      },
      {
        id: "google-reviews",
        question: "Does Archer Infotech have Google reviews?",
        answer:
          "Yes — 126+ Google reviews averaging 5.0 stars as of 2026-06. Reviews are from genuine alumni + current students; we don't buy reviews or fabricate testimonials. You can read all reviews on our Google Business Profile + leave one after attending a demo class or completing a course.",
      },
      {
        id: "corporate-clients",
        question: "Which companies hire Archer Infotech students?",
        answer:
          "Active corporate placement partners include: Amdocs, Capgemini, MindTree (LTIMindtree), Tech Mahindra, Persistent Systems, Cognizant, Wipro, Infosys, TCS, Accenture, Atos, Cybage, BrowserStack, Druva, Helpshift, GUVI, ZS Associates, BNP Paribas IT, Allianz tech, and 80+ more across Pune services majors + product companies + BFSI tech. Full hiring partner list visible on the placements page.",
        relatedHref: "/placements",
        relatedLabel: "Full hiring partner list",
      },
      {
        id: "what-makes-archer-different",
        question: "What makes Archer Infotech different from other Pune IT institutes?",
        answer:
          "Three structural differences: (1) 17 years of continuous operation under same founder leadership — many Pune institutes are 3-5 years old. (2) Trainers are working Pune IT engineers, not full-time-only educators — content stays current with hiring stack reality. (3) Placement cell works in parallel with course delivery (CV review starts week 5-6, not after completion) — graduates exit with portfolio + active applications.",
      },
      {
        id: "is-archer-government-accredited",
        question: "Is Archer Infotech government-accredited?",
        answer:
          "Archer Infotech is a private IT training institute — not government-accredited as a degree-granting institution (those require UGC / AICTE recognition which is reserved for universities + engineering colleges). We provide industry-aligned training + certificates of completion; certifications students pursue from Oracle (Java), AWS, Microsoft (Azure), Salesforce, ISTQB are vendor-issued + globally recognised. Many alumni pair our training with their Bachelor's degree from accredited colleges.",
      },
    ],
  },

  // ─── Pune IT Careers 2026 ─────────────────────────────────────────
  {
    slug: "pune-it-careers-2026",
    label: "Pune IT Careers in 2026",
    metaTitle: "Pune IT Careers FAQ 2026 — Salaries, Jobs, Best Courses, Growth Tracks",
    metaDescription:
      "PAA-style answers to the most-asked questions about IT careers in Pune in 2026 — salary bands, best stacks to learn, hiring outlook, course choice, services vs product.",
    h1: "Pune IT Careers in 2026 — Frequently Asked Questions",
    intro:
      "Honest answers to common questions about IT careers in Pune in 2026 — salary realities, hiring outlook, which stacks are hireable, services vs product trade-offs. Sourced from Naukri + LinkedIn + AmbitionBox Pune listings (last 12 months) + our 17-year placement-cell data.",
    questions: [
      {
        id: "fresher-it-salary-pune",
        question: "What's the fresher IT salary in Pune in 2026?",
        answer:
          "Realistic Pune fresher IT salary bands in 2026: services majors ₹3.5-6 LPA, mid-tier consulting + GCC ₹4-7 LPA, product companies + AI startups ₹5-12 LPA. Higher specialisations (Agentic AI engineering) can clear ₹15 LPA at fresher level due to supply gap. Variance is real — your stack, target tier, and portfolio depth drive where you land. Use our salary calculator to explore role × experience × employer-type bands.",
        relatedHref: "/tools/pune-it-salary-calculator",
        relatedLabel: "Pune IT Salary Calculator",
      },
      {
        id: "best-it-course-pune-freshers",
        question: "Which IT course is best for Pune freshers in 2026?",
        answer:
          "There's no universally-best course — depends on your background + target. Three realistic defaults: (1) Java Full Stack for maximum Pune services-major fresher hiring volume (~95% of Spring Boot postings). (2) Python + Data Science / AI for the fastest-growing specialisations (highest fresher salary band). (3) Software Testing & QA for the most accessible non-CS entry point. See our career path pages for the 12-month plan per track.",
        relatedHref: "/career-paths",
        relatedLabel: "All career paths",
      },
      {
        id: "java-vs-python-pune",
        question: "Java or Python — which to learn first for a Pune IT job?",
        answer:
          "For maximum Pune services-major fresher hiring volume: Java (~2,000-2,800 monthly listings). For fastest growth into data + AI specialisations: Python (highest fresher salary band ₹8-15 LPA in agentic AI). Both are first-class hireable; depends on whether you optimise for hiring volume (Java) or career growth ceiling (Python). Most Pune developers eventually know both.",
        relatedHref: "/compare/java-vs-python-for-beginners",
        relatedLabel: "Java vs Python — full comparison",
      },
      {
        id: "how-long-to-get-it-job",
        question: "How long does it take to get an IT job in Pune as a fresher?",
        answer:
          "Realistic timeline from start of training to first offer: 8-14 months total. Breakdown: 4-8 months focused course work + portfolio building → 2-4 months active job search + applications + interviews → offer in hand. Bootcamp + structured pathway compresses to 6-9 months including placement support. Pure self-study typically stretches to 18-24 months because the curriculum sequencing + interview prep is harder to self-design.",
        relatedHref: "/career-paths/first-it-job-pune",
        relatedLabel: "First IT job in Pune — full roadmap",
      },
      {
        id: "services-vs-product-pune",
        question: "Should I join a services company or product company as my first IT job in Pune?",
        answer:
          "For most fresher candidates: services majors are the higher-probability first offer (~80% of Pune fresher hiring volume; first offer typically 60-90 days). Pivot to product after 18-24 months of services-sector experience. Product-first works for top 20% candidates with strong portfolios + DSA + system design prep — typically extends search to 90-180 days but ₹2-6 LPA higher offer. Both are valid; stack them strategically.",
        relatedHref: "/compare/services-vs-product-company-first-it-job-pune",
        relatedLabel: "Services vs Product — full comparison",
      },
      {
        id: "non-cs-background-it-job",
        question: "Can I get a Pune IT job without a Computer Science degree?",
        answer:
          "Yes. About 40% of Pune IT placements at services majors + product companies go to candidates without a CS degree — engineering (mechanical, electrical, civil), BCA, BSc, BCom, BBA. What matters is portfolio depth + interview performance + clear narrative explaining the switch. Some services-major campus drives filter for engineering degrees; off-campus + product company hiring is degree-tier-agnostic when your portfolio + DSA prep is solid.",
        relatedHref: "/compare/bachelors-degree-vs-bootcamp-for-pune-it-careers-2026",
        relatedLabel: "Bachelor's vs bootcamp — full comparison",
      },
      {
        id: "pune-it-hiring-outlook",
        question: "What's the Pune IT hiring outlook for 2026?",
        answer:
          "Pune IT hiring volume in 2026 remained structurally strong: 6,000+ monthly Pune IT fresher listings across services majors + GCCs + product companies + AI startups. AI engineering + cloud / DevOps are the fastest-growing specialisations. Services-major hiring continues at large scale despite AI productivity narratives — they still need engineers for client engagements. Realistic read: hiring is not declining; the bar (especially DSA + portfolio) is rising.",
      },
      {
        id: "ai-replacing-it-jobs",
        question: "Will AI replace IT jobs in Pune?",
        answer:
          "Not in the foreseeable future at the engineer level. AI tools (GitHub Copilot, Cursor, Claude Code, AI-powered IDEs) materially boost engineer productivity; they don't eliminate the engineer. What changes: junior tier purely-repetitive work shrinks; engineering work that's creative + judgment-driven + AI-augmented grows. Both fresher + senior engineers need continual AI tool fluency — but the role is being reshaped, not eliminated.",
      },
      {
        id: "remote-vs-onsite-pune-it",
        question: "Are Pune IT jobs remote or office-based in 2026?",
        answer:
          "Hybrid is the dominant pattern in 2026 — most Pune services majors require 2-3 days/week office (Hinjewadi, Kothrud, Aundh, Wakad campuses). Pune product companies vary: some are office-first, some are fully-flexible. Pure-remote roles exist (~15% of Pune listings) but require strong portfolio + senior signal even at fresher level. Plan around hybrid as default; pure-remote as a specific upside.",
      },
      {
        id: "switching-careers-to-it-pune",
        question: "Can I switch careers to IT in my late 20s or 30s in Pune?",
        answer:
          "Yes — about 25% of our learners are career changers in their late 20s and 30s. Realistic considerations: 12-18 month commitment to skill-building, lower starting salary than your current role (until you re-establish at IT-tier compensation in year 2-3), portfolio depth is critical (degree pedigree matters less for career changers). Target product companies + Pune startups where portfolio-first hiring dominates over campus-degree filters.",
        relatedHref: "/courses/for/career-changers",
        relatedLabel: "Career changer pathway",
      },
    ],
  },

  // ─── Courses & Fees ──────────────────────────────────────────────
  {
    slug: "courses-and-fees-2026",
    label: "Courses & Fees",
    metaTitle: "Archer Infotech Courses & Fees FAQ 2026 — Java, Python, Full Stack, AI, Cloud",
    metaDescription:
      "Common questions about Archer Infotech courses + fees — Java, Python, Full Stack, Data Science, Cloud / DevOps, AI engineering tracks. Duration, cost ranges, EMI options, what's included.",
    h1: "Courses & Fees at Archer Infotech — Frequently Asked Questions",
    intro:
      "Practical answers about course catalogues, fees, what's included, and EMI options. Detailed fee structure is shared on the contact page; this section covers the common comparative questions.",
    questions: [
      {
        id: "how-many-courses-archer",
        question: "How many courses does Archer Infotech offer?",
        answer:
          "Archer Infotech offers 40+ technical courses across 11 categories: Programming (Java, Python, C/C++, JavaScript, TypeScript), Full Stack Development (Java FS, MERN, .NET FS, Python FS), Cloud + DevOps (AWS, Azure, GCP, Kubernetes, Docker), Cloud Certifications (SAA, AZ-104, GCP ACE), Data + AI (Data Science, ML, Analytics, Data Engineering), Generative AI (Agentic AI, Prompt Engineering, ChatGPT/LLMs), Testing & QA (Selenium, Software Testing), Salesforce (Admin + Developer), Mobile (Android, Flutter, React Native, iOS), Database (MySQL, PostgreSQL, MongoDB, Oracle, Firebase), Modern Web (Next.js, etc.).",
        relatedHref: "/courses",
        relatedLabel: "Full course catalogue",
      },
      {
        id: "java-course-fees-pune",
        question: "What's the fee for the Java course at Archer Infotech?",
        answer:
          "Java + Spring Boot fees are typically in the ₹20,000-30,000 band (specifics vary with track depth + batch format). Java Full Stack track is in the upper-mid band (~₹30,000-45,000) reflecting longer duration + frontend addition. Specialised microservices track adds ~₹10,000 on top. EMI available (50%/50%, or 3-month plans). Exact current fees: see contact page or speak with admissions.",
        relatedHref: "/contact",
        relatedLabel: "Contact for current fees",
      },
      {
        id: "python-course-fees",
        question: "How much does the Python course cost at Archer Infotech?",
        answer:
          "Python core training is in the ₹18,000-28,000 band. Python Full Stack (Django + React + database) is upper-mid band ₹35,000-50,000. Python + Data Science combined is ₹50,000-70,000 (longer + ML library coverage). Agentic AI (the highest-paid specialisation) is in the ₹40,000-60,000 band including LLM API credits we provide for course duration. EMI + payment plans available.",
        relatedHref: "/contact",
        relatedLabel: "Contact for current fees",
      },
      {
        id: "full-stack-cost-pune",
        question: "What's the cost of a Full Stack course in Pune at Archer Infotech?",
        answer:
          "Full Stack track fees by stack: Java Full Stack ₹30,000-45,000, MERN ₹30,000-45,000, .NET Full Stack ₹30,000-45,000, Python Full Stack ₹35,000-50,000. All include backend + frontend + database + deployment + capstone project + placement support. EMI options available — typically 50% at enrolment + 50% at week 4-6, or 3-month plans. No hidden fees; the published fee includes placement support.",
      },
      {
        id: "course-duration",
        question: "How long do Archer Infotech courses run?",
        answer:
          "Course duration by track: single-tech courses (Java, Python, AWS, Selenium) 2-3 months. Specialised tracks (Software Testing, Data Analytics) 2-3 months. Full Stack tracks 3-4 months. Combined tracks (Python + Data Science) 4-5 months. Bootcamps (CodeLeap / CareerCode / TechReady) 2-3 months condensed. Weekend batches run ~25% longer than weekday tracks to maintain total contact-hour parity. All durations include placement cell engagement starting week 5-6.",
      },
      {
        id: "emi-payment-options",
        question: "Are EMI or payment plans available for Archer Infotech courses?",
        answer:
          "Yes, two main EMI options for all courses: (1) 50% at enrolment + 50% at week 4-6 (zero-interest, no third-party financing). (2) 3-month equal monthly instalments (also zero-interest). Some longer tracks have 6-month plan options. One-time full payment receives a 5% discount. No external loan partners — payment plans are direct with the institute.",
      },
      {
        id: "course-certificate",
        question: "Will I get a certificate after completing the course?",
        answer:
          "Yes — Archer Infotech issues a course completion certificate to all learners who finish the course + submit the capstone project. Additionally, we prepare students for industry-standard vendor certifications: Oracle Java (OCA, OCP), AWS (SAA-C03), Azure (AZ-104, AZ-204), Salesforce (ADM 201, PD1), ISTQB Foundation. Vendor exam fees are separate (typically $150-200 per exam); the course preparation is included.",
      },
      {
        id: "fees-cover-placement",
        question: "Do the fees cover placement support?",
        answer:
          "Yes — placement support is bundled in every placement-eligible course fee. No separate placement charges, no contingent fees. What's included: CV review (week 5-6), GitHub portfolio polish, 2-3 mock interviews (technical + HR), direct introductions to 10-20+ Pune partner companies actively hiring, weekly post-completion check-ins for 8-12 weeks. We don't guarantee placement (90% institute rate, not 100%) but we structure the support comprehensively.",
        relatedHref: "/placements",
        relatedLabel: "Placement process details",
      },
      {
        id: "compared-other-institutes",
        question: "How do Archer Infotech fees compare to other Pune IT training institutes?",
        answer:
          "Our fees sit in the mid-range for Pune IT training — neither the cheapest nor the most expensive. Cheaper alternatives (₹8,000-15,000) typically cut placement support, mock interviews, or capstone project depth. Premium-priced alternatives (₹80,000+) typically add only marketing — not materially more course content. Our value proposition: 17-year track record + 90% placement rate + bundled placement support at mid-range fees.",
      },
      {
        id: "refund-policy",
        question: "What's Archer Infotech's refund policy?",
        answer:
          "We offer a refund window for the first 5 days of training if you decide the course isn't right for you (after attending demo + 2-3 actual classes). After that, fees are non-refundable but transferable to another course or future batch if your situation changes. The 5-day window exists specifically so students can confirm fit; we encourage attending a demo class before paying any fees.",
        relatedHref: "/contact",
        relatedLabel: "Book a free demo class",
      },
    ],
  },

  // ─── Placements & Outcomes ───────────────────────────────────────
  {
    slug: "placements-and-outcomes",
    label: "Placements & Outcomes",
    metaTitle: "Archer Infotech Placement FAQ 2026 — Rate, Companies, Process, Salaries",
    metaDescription:
      "Common questions about placement support at Archer Infotech — 90% institute rate, 100+ corporate partners, process timeline, salary outcomes, what's bundled vs not.",
    h1: "Placements & Outcomes — Frequently Asked Questions",
    intro:
      "Honest answers about Archer Infotech's placement process, rates, partner companies, and outcomes. We don't claim 100% placement; we don't guarantee specific salaries. Numbers come from institute placement-cell records.",
    questions: [
      {
        id: "is-placement-guaranteed",
        question: "Does Archer Infotech guarantee 100% placement?",
        answer:
          "No — we don't guarantee 100% placement and any institute that does is making a misleading claim. Our institute placement rate is 90% across all tracks (placement-cell records, last 12 months of offers). The 10% who don't land first-job within our 6-month engagement window are typically dealing with location constraints, salary expectations significantly above market, or extended health / personal situations — not training quality issues.",
        relatedHref: "/placements",
        relatedLabel: "Placement track record",
      },
      {
        id: "placement-process-timeline",
        question: "When does Archer Infotech's placement cell start working with me?",
        answer:
          "Placement cell engagement starts in week 5-6 of your course (parallel to course delivery, not after completion). Timeline: Week 5-6 CV review + GitHub portfolio audit. Week 7 first mock interview (technical). Week 8 second mock interview (HR + communication). Final weeks: direct introductions to 10-20+ partner companies. Post-completion: weekly check-ins for 8-12 weeks of active job search. The 6-month total window covers ~85% of all placements.",
      },
      {
        id: "fresher-salary-archer",
        question: "What salary can I expect after completing an Archer Infotech course?",
        answer:
          "Realistic Pune fresher offer bands by track: Software Testing ₹2.5-4 LPA services / ₹3.5-5 LPA product. Java + Spring Boot ₹3.5-6 LPA services / ₹5-9 LPA product. Java Full Stack ₹3.5-6 LPA / ₹5-9 LPA. Python + Data Science ₹4-7 LPA / ₹6-10 LPA. Cloud / DevOps ₹4-7 LPA / ₹6-10 LPA. Agentic AI (highest band) ₹8-15 LPA at product companies. Bands are wide because portfolio + interview performance drive where you land.",
        relatedHref: "/tools/pune-it-salary-calculator",
        relatedLabel: "Pune IT Salary Calculator",
      },
      {
        id: "which-companies-hire",
        question: "Which companies recruit from Archer Infotech?",
        answer:
          "100+ active corporate partners: Persistent Systems, Capgemini, MindTree (LTIMindtree), Tech Mahindra, Cognizant, Wipro, Infosys, TCS, Accenture, Amdocs, Atos, Cybage, Saksoft. Product companies: BrowserStack, Druva, Helpshift, GUVI, Persistent product teams, ZS Associates, Tiger Analytics, Mu Sigma. BFSI tech: BNP Paribas IT, Allianz tech, BMC Software, BNY Mellon tech. Plus growing AI startup partners.",
        relatedHref: "/placements",
        relatedLabel: "Full partner list",
      },
      {
        id: "placement-after-bench",
        question: "What happens during the bench period after I join a services major?",
        answer:
          "Services majors (Persistent, Capgemini, TCS, Cognizant, etc.) typically run a 3-6 month paid bench period after joining — structured training in company-specific stacks + processes. Your starting CTC begins from day one of bench. Bench performance shapes first-project allocation, which shapes the next 18 months. We encourage active engagement during bench: certifications, side projects, internal hackathons — these compound over your career.",
        relatedHref: "/guides/year-one-mistakes-pune-it-freshers-make-2026",
        relatedLabel: "Year-one mistakes to avoid",
      },
      {
        id: "placement-without-good-academics",
        question: "Can I get placed even with low academic percentage?",
        answer:
          "Yes — academic percentage matters at some services-major campus drives (typically 60-65% cutoffs) but is largely irrelevant for off-campus + product company hiring. Of our 5,000+ placed engineers, ~30% had below 60% academic percentage. Strong portfolio + DSA prep + interview communication consistently overrides academic filters. Product companies + AI startups care almost entirely about what you can build.",
      },
      {
        id: "placement-non-it-graduates",
        question: "Do non-IT graduates get placed via Archer Infotech?",
        answer:
          "Yes — about 40% of our placed engineers come from non-CS backgrounds: BCom, BBA, BSc-non-CS, mechanical / electrical / civil engineering, BCA. Placement outcomes are similar to CS-grad outcomes at the product company tier (where portfolio + interview matter most). At services-major campus drives, CS / engineering degree filtering exists but off-campus drives are typically degree-tier-agnostic for non-IT-degree candidates with strong portfolios.",
      },
      {
        id: "first-job-to-second-job",
        question: "How long until I can switch to a better job after my first placement?",
        answer:
          "Realistic timeline: 18-30 months at your first role is the sweet spot for a strong second move. Below 12 months signals impatience; above 36 months without role evolution signals stagnation. The second move is typically the largest salary jump of your career — often ₹4-8 LPA increment for a fresher → 1.5-2 yr engineer transition. Plan your skill-building + portfolio updates during the first job to set up this move.",
        relatedHref: "/guides/year-one-mistakes-pune-it-freshers-make-2026",
        relatedLabel: "Year-one mistakes guide",
      },
      {
        id: "placement-help-after-completion",
        question: "Do I get placement help if I don't get placed within the course window?",
        answer:
          "Yes — placement cell continues working with you for 8-12 weeks after course completion at no additional cost. After that, alumni continue to receive periodic placement updates via our network. We don't abandon graduates who take longer than typical to place; the institute model assumes that ~15% need extended support and we structure for it.",
      },
      {
        id: "salary-negotiation-help",
        question: "Does Archer Infotech help with salary negotiation?",
        answer:
          "Yes — salary negotiation prep is part of the final placement cell session. We share Pune market band data, help structure offer-negotiation language, and recommend negotiation timing (after offer letter, before acceptance). Pune fresher offers typically have ₹0.3-2 LPA negotiation room with competing offer; we coach learners to leverage this without burning relationships.",
        relatedHref: "/guides/salary-negotiation-tips-pune-it-freshers-2026",
        relatedLabel: "Salary negotiation tips",
      },
    ],
  },

  // ─── Admissions & Eligibility ──────────────────────────────────
  {
    slug: "admissions-and-eligibility",
    label: "Admissions & Eligibility",
    metaTitle: "Archer Infotech Admissions FAQ 2026 — Eligibility, Prerequisites, How to Enrol",
    metaDescription:
      "Common questions about admissions at Archer Infotech — eligibility criteria, prerequisites, demo class, batch starts, age limits, mid-degree enrolment.",
    h1: "Admissions & Eligibility — Frequently Asked Questions",
    intro:
      "Practical answers about who can enrol, what's expected, and how the admission process works. No entrance exam, no academic tier filtering — fit matters more than credentials.",
    questions: [
      {
        id: "admission-eligibility",
        question: "Who is eligible to join Archer Infotech courses?",
        answer:
          "Most courses are open to: 12th passouts (for foundation tracks), engineering / BCA / BSc students (current or graduated), commerce / BBA / non-IT graduates wanting to switch to IT, working professionals seeking re-skilling. Some advanced tracks (Agentic AI, Microservices) assume prior programming experience. No formal entrance exam; demo class + admission counsellor conversation are how we confirm fit.",
      },
      {
        id: "prerequisites-courses",
        question: "What are the prerequisites for Archer Infotech courses?",
        answer:
          "By track: Foundation programming (Java, Python, C) — no prerequisites, anyone can join. Web frameworks (Spring Boot, Django, React) — basic programming + HTML/CSS familiarity helpful. Data Science / ML — Python + basic math comfort. Agentic AI — Python comfort + ideally completed Generative AI foundation. Software Testing — no programming prerequisites. Specific prerequisites visible on each course page.",
        relatedHref: "/courses",
        relatedLabel: "Course catalogue",
      },
      {
        id: "free-demo-class",
        question: "Can I attend a demo class before enrolling at Archer Infotech?",
        answer:
          "Yes — we strongly encourage attending a free demo class before paying any fees. Demo classes cover: course outline + structure walk-through, trainer interaction, batch culture sample, your questions about pace + content. Demo is free + no-obligation; book via contact page or WhatsApp. We'd rather you decide based on a real session than marketing promises.",
        relatedHref: "/contact",
        relatedLabel: "Book a free demo",
      },
      {
        id: "when-do-batches-start",
        question: "When do new Archer Infotech batches start?",
        answer:
          "New batches typically start every 3-4 weeks across weekday + weekend + online formats. Popular tracks (Java Full Stack, Python, Software Testing) have 2-3 active batches running simultaneously. Specialised tracks (Agentic AI, Salesforce PD1) run 1 batch per cycle. Specific upcoming batch dates visible on the batch schedule page; admissions counsellors can route you to the soonest fit.",
        relatedHref: "/batch-schedule",
        relatedLabel: "Live batch schedule",
      },
      {
        id: "age-limit",
        question: "Is there an age limit for joining Archer Infotech?",
        answer:
          "No formal age limit. Our learner range spans 17 (12th passouts) to mid-40s (career changers + working professionals re-skilling). About 60% of learners are in the 19-25 fresher range; 25% are 26-35 working professionals; 15% are 35+ career changers or skill upgraders. Age is not a placement barrier for fresher offers as long as your portfolio + interview performance are strong.",
      },
      {
        id: "join-during-degree",
        question: "Can I join Archer Infotech while still pursuing my degree?",
        answer:
          "Yes — about 50% of our learners enrol during their 3rd-4th year of engineering / BCA. This is one of the highest-ROI timings: complete the IT training before final-year placements + significantly improve your campus drive performance. Weekend + evening batches are designed for this overlap. Many degree-students complete 2 specialisation tracks during college and graduate already employable.",
      },
      {
        id: "transfer-batches",
        question: "Can I transfer to a different batch if I miss classes?",
        answer:
          "Yes — batch transfers are accommodated with reasonable notice. You can transfer to a later batch of the same track if work / health / family situations require it, switch to a different format (weekday ↔ weekend ↔ online), or pause + resume in the next batch cycle. We've structured for life's interruptions; just discuss with the admissions team early.",
      },
      {
        id: "online-learners-from-outside-pune",
        question: "Can I join Archer Infotech online from outside Pune?",
        answer:
          "Yes — live online format is available for all courses and accepts learners from anywhere in India. Online sessions run Monday-Friday 7:00-8:30 PM IST or 7:30-9:00 PM IST (varies by batch). Same trainer + same curriculum as classroom batches. Recordings available in LMS within 24 hrs. Placement support works for any location — we've placed online learners across Mumbai, Bangalore, Hyderabad, Delhi NCR, and abroad.",
        relatedHref: "/courses/for/working-professionals",
        relatedLabel: "Online + working professional pathway",
      },
      {
        id: "admission-documents",
        question: "What documents do I need for admission to Archer Infotech?",
        answer:
          "Minimal documentation: government photo ID (Aadhaar / PAN / passport), educational credentials (latest mark sheet or degree certificate), 2 passport-size photos for ID card. Working professionals: employment proof helpful but not mandatory. No academic transcript verification, no entrance exam, no formal application form — just demo + fee + start. Designed to be friction-free.",
      },
      {
        id: "scholarship-discount",
        question: "Are there any scholarships or discounts at Archer Infotech?",
        answer:
          "Three discount options available: (1) 5% discount on one-time full payment. (2) Group / referral discount of ₹2,000-5,000 per person when 3+ candidates enrol together. (3) Need-based partial discounts for genuinely-deserving candidates from financially-constrained backgrounds (case-by-case, after counsellor conversation). No formal scholarship application form — discuss directly with admissions during the counsellor conversation.",
      },
    ],
  },

  // ─── Bootcamps Explained ────────────────────────────────────────
  {
    slug: "bootcamps-explained",
    label: "Bootcamps Explained",
    metaTitle: "Archer Infotech Bootcamps FAQ — CodeLeap, CareerCode, TechReady (2026)",
    metaDescription:
      "Common questions about the 3 Archer Infotech bootcamps — CodeLeap (12th passouts), CareerCode (engineering students), TechReady (graduates). Duration, structure, outcomes.",
    h1: "Bootcamps Explained — Frequently Asked Questions",
    intro:
      "Specific answers about the 3 cohort-based bootcamps designed for distinct audiences. Bootcamps are condensed structured pathways with placement support — different from individual courses which let you specialise gradually.",
    questions: [
      {
        id: "what-is-bootcamp",
        question: "What's a bootcamp at Archer Infotech and how is it different from a course?",
        answer:
          "Bootcamps are intensive cohort-based pathways covering multiple courses in a structured 2-3 month timeline with cohort mentoring + heavier project work + integrated placement support. Individual courses cover one tech stack at a time; bootcamps cover a full career-ready combination (e.g., Java + Spring Boot + databases + frontend + deployment + DSA + interview prep). Bootcamps fit candidates who want one comprehensive program; individual courses fit candidates who want gradual specialisation.",
        relatedHref: "/bootcamps",
        relatedLabel: "All bootcamps",
      },
      {
        id: "codeleap-bootcamp",
        question: "Who is CodeLeap bootcamp designed for?",
        answer:
          "CodeLeap is a 2-month hybrid vacation programme specifically for 12th passouts (zero coding background) who want to start their IT journey before college begins. Covers: Web Development OR Python OR AI track foundation + first portfolio project + soft skills + career roadmap. Lets you enter your engineering degree already coding + with a portfolio piece. Runs during May-July school break.",
        relatedHref: "/bootcamps/codeleap",
        relatedLabel: "CodeLeap details",
      },
      {
        id: "careercode-bootcamp",
        question: "What is the CareerCode bootcamp for engineering students?",
        answer:
          "CareerCode is a structured Full Stack Developer bootcamp for engineering students currently in their 2nd-4th year. Covers: Java OR MERN full-stack from foundation to deployed capstone + DSA prep + soft skills + interview preparation + placement support. The intent: complete this during your degree so you graduate already employable for ₹4-8 LPA fresher offers. Most learners join in their 3rd year.",
        relatedHref: "/bootcamps/careercode",
        relatedLabel: "CareerCode details",
      },
      {
        id: "techready-bootcamp",
        question: "What is the TechReady bootcamp for graduates?",
        answer:
          "TechReady is a 3-month accelerated career-launch bootcamp for graduates (with or without CS background) who want to be IT-job-ready in the shortest realistic timeline. Covers: stack choice (Java FS / MERN / Python+Data) + foundation projects + capstone + DSA prep + 2-3 mock interviews + active job search with placement cell. Designed for candidates ready to commit full-time for 3 months.",
        relatedHref: "/bootcamps/techready",
        relatedLabel: "TechReady details",
      },
      {
        id: "bootcamp-vs-course-cost",
        question: "Are bootcamps more expensive than individual courses?",
        answer:
          "Bootcamps are typically ₹10,000-20,000 more than equivalent single-course fees because they bundle multiple tech stacks + heavier project work + integrated placement support. However, comparing bootcamp fee to the sum of equivalent individual courses, bootcamps save 15-25% on total cost. Bootcamp value: structured cohort + accelerated timeline; individual course value: flexible pace + optional add-ons.",
      },
      {
        id: "bootcamp-placement-rate",
        question: "What's the placement rate for Archer Infotech bootcamps?",
        answer:
          "Bootcamp placement rates run at or slightly above the institute average of 90%. CodeLeap (2-month bootcamp for 12th passouts) doesn't lead to direct placement — outcomes here are 'IT-ready before college begins'. CareerCode + TechReady bootcamps result in first placements typically within 60-120 days of completion, comparable to individual-course placement timelines.",
      },
      {
        id: "bootcamp-batch-size",
        question: "How large are Archer Infotech bootcamp batches?",
        answer:
          "Bootcamps run smaller batches than individual courses — typically 12-18 learners per cohort (vs 20-25 for standard courses). The intent: cohort dynamics + tighter feedback + personal accountability. Each cohort has 1 lead mentor + 1 placement-cell contact + access to all subject-matter trainers. Smaller batch = harder to hide; some find this motivating, some find it intense — confirm fit via demo.",
      },
      {
        id: "bootcamp-vs-self-study",
        question: "Should I do a bootcamp or self-study to learn coding?",
        answer:
          "Bootcamp fits if you value structured pace + cohort accountability + integrated placement support + faster timeline (~3 months). Self-study fits if you have strong self-discipline + patience for an 18-24 month timeline + can independently design curriculum sequencing. Most successful self-study journeys eventually convert into either a bootcamp or single-course for the interview prep + placement-cell phase. There's no single right answer — depends on personality + timeline + goals.",
        relatedHref: "/compare/coding-bootcamp-vs-self-study",
        relatedLabel: "Bootcamp vs self-study — full compare",
      },
      {
        id: "bootcamp-prerequisites",
        question: "What are the prerequisites for Archer Infotech bootcamps?",
        answer:
          "CodeLeap: no prerequisites (designed for 12th passouts with zero coding background). CareerCode: basic programming awareness helpful but not mandatory — most engineering students have some via their academic coursework. TechReady: basic programming logic understanding (variables, loops, functions) at conceptual level helpful but the program covers foundation thoroughly. None require advanced math, prior portfolio, or specific software setup before joining.",
      },
      {
        id: "bootcamp-job-guarantee",
        question: "Do bootcamps guarantee a job?",
        answer:
          "No — Archer Infotech bootcamps do not guarantee jobs, and we don't recommend any institute that makes guarantee claims. What we do guarantee: structured course delivery, working placement-cell process, direct introductions to 15+ partner companies, 8-12 weeks post-completion placement support, transparent 90% institute placement rate. The job itself depends on your portfolio + interview performance + market conditions — all of which we structure to support, but cannot promise.",
      },
    ],
  },

  // ─── Online vs Offline Batches ─────────────────────────────────
  {
    slug: "online-vs-offline-batches",
    label: "Online vs Offline Batches",
    metaTitle: "Online vs Offline Batches FAQ at Archer Infotech (2026) — Formats Explained",
    metaDescription:
      "Common questions about Archer Infotech batch formats — live online vs classroom, weekday vs weekend, recordings, batch sizes, attendance flexibility.",
    h1: "Online vs Offline Batches at Archer Infotech — Frequently Asked Questions",
    intro:
      "Practical answers about choosing the right batch format — classroom, live online, weekend, evening, working professional tracks. All formats use the same trainer pool + curriculum.",
    questions: [
      {
        id: "online-vs-classroom-quality",
        question: "Are Archer Infotech online batches the same quality as classroom batches?",
        answer:
          "Yes — same trainers, same curriculum, same project assignments, same placement support. The trainer joins from our campus + delivers via Google Meet; you join from home. Recordings posted in LMS within 24 hours so missed class is recoverable. Online learners use the same WhatsApp + Slack channels as classroom learners for doubts. The only differences: no physical lab time + slightly higher self-discipline requirement.",
      },
      {
        id: "weekend-batches",
        question: "Are weekend batches available for working professionals at Archer Infotech?",
        answer:
          "Yes — weekend batches run Saturday + Sunday, typically 10:00-13:00 (3 hours per day = 6 hours/week). Weekend tracks take ~25% longer than weekday tracks (10 weeks vs 8 weeks for a 2-month course) to maintain total contact-hour parity. Same trainers + curriculum + projects. ~30% of our learners are working professionals on weekend tracks. Compatible with full-time employment.",
        relatedHref: "/courses/for/working-professionals",
        relatedLabel: "Working professional tracks",
      },
      {
        id: "morning-vs-evening-batches",
        question: "What's the difference between morning and evening batches?",
        answer:
          "Morning batches: Monday-Friday 9:00-10:30 or 10:30-12:00 — most popular with college students + career changers between roles. Evening batches: Monday-Friday 18:30-20:00 or 19:00-20:30 — popular with working professionals. Saturday lab session common across both for hands-on practice + capstone work. Choose based on your daily schedule + energy patterns; trainer + curriculum are identical.",
      },
      {
        id: "miss-class-makeup",
        question: "What if I miss a class at Archer Infotech?",
        answer:
          "Two options for missed classes: (1) For online learners: session recordings posted in LMS within 24 hours — watch the recording + attend next class. (2) For classroom learners: same-day recordings shared via Slack + optional makeup attendance in a different batch's same-topic session (cross-batch attendance allowed for tracks running multiple batches). Either way, no class is lost; the system handles real-life interruptions.",
      },
      {
        id: "attendance-requirement",
        question: "Is regular attendance required at Archer Infotech?",
        answer:
          "Yes — we expect 80%+ attendance for placement-cell engagement. Below 80% attendance, the placement cell may delay engagement until you catch up via recordings + assignments + 1:1 mentor sessions. This isn't bureaucratic; it's because skipped sessions accumulate gaps that hurt interview readiness. Working professionals with genuine constraints can pre-discuss attendance flexibility with admissions.",
      },
      {
        id: "online-laptop-requirements",
        question: "What laptop / system do I need for online classes at Archer Infotech?",
        answer:
          "Minimum: Windows 10+/Mac OS Big Sur+ with 8GB RAM + decent broadband (5 Mbps+). Recommended: 16GB RAM laptop for stacks involving Selenium / Docker / multiple browser tabs + IDE. For specific tracks: Data Science benefits from more RAM (16GB+); Agentic AI works on standard 8GB but cloud GPU credits we provide handle heavier workloads. Smartphone-only attendance is not supported; laptop or desktop required.",
      },
      {
        id: "batch-size-online",
        question: "How many students per online batch at Archer Infotech?",
        answer:
          "Online batches typically run 18-22 learners — slightly larger than classroom (15-18) because online format scales better. Cohort dynamics are similar; trainer addresses all questions live; smaller breakout groups for project work. Some specialised tracks (Agentic AI) run smaller batches (10-12) because per-learner trainer attention is higher.",
      },
      {
        id: "online-doubts-resolution",
        question: "How do I get doubts resolved in online classes at Archer Infotech?",
        answer:
          "Three doubt-resolution channels: (1) Live during class — trainer answers in session. (2) Slack batch channel — for typed code/output sharing + peer help (typically resolved within 1-2 hours). (3) Office hours — dedicated weekly 1-hour session with senior mentor for unresolved doubts. Plus 1:1 mentor sessions available on request for stuck-on-capstone situations.",
      },
      {
        id: "switch-online-to-classroom",
        question: "Can I switch from online to classroom batch (or vice versa) at Archer Infotech?",
        answer:
          "Yes — format switches are accommodated within the same track. Common patterns: starting classroom → switching to online when work / location changes; starting online → switching to classroom when learner wants more in-person engagement. Discuss with admissions team; typically takes 1-2 days to coordinate the switch. Same fees + same content; just a format change.",
      },
      {
        id: "international-students",
        question: "Can international students join Archer Infotech online tracks?",
        answer:
          "Yes — our live online tracks accept learners from anywhere globally. Common: NRIs in US/UK/Australia/Singapore joining for career switch or upskilling, Indian engineers based abroad. Time zone consideration: classes run 7:00-8:30 PM or 7:30-9:00 PM IST — manageable for US Pacific (morning), UK (afternoon), Singapore (evening), Australia (late evening). International payments via wire transfer or international card.",
        relatedHref: "/contact",
        relatedLabel: "International admissions",
      },
    ],
  },
];

export function getQuestionCategory(slug: string): QuestionCategory | undefined {
  return questionCategories.find((c) => c.slug === slug);
}

export function totalQuestionsAcrossCategories(): number {
  return questionCategories.reduce((sum, c) => sum + c.questions.length, 0);
}
