/**
 * "X vs Y" comparison pages (P8-10 + P8-11).
 *
 * AI engines disproportionately cite comparison pages — users constantly ask
 * "which is better, X or Y?". Each page follows the AEO pattern the pillar-8
 * brief prescribes: one-paragraph definitive verdict → comparison table (the
 * most-extracted element) → when-X / when-Y nuance → FAQ → self-selection
 * guidance. Content is factual and balanced (real technology/path trade-offs);
 * salary figures stay consistent with src/data/salary-data.ts.
 *
 * Route: /compare/[slug] (server-rendered → fully crawlable/citable).
 */

export interface ComparisonRow {
  factor: string;
  a: string;
  b: string;
}

export interface Comparison {
  slug: string;
  /** Short label for the index card + nav. */
  shortLabel: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  optionA: string;
  optionB: string;
  /** Definitive answer / TL;DR — first 100 words, AEO snippet zone. */
  verdict: string;
  table: ComparisonRow[];
  whenA: { heading: string; paragraphs: string[] };
  whenB: { heading: string; paragraphs: string[] };
  bottomLine: string;
  /** Course slugs to surface (resolved via getCourse). */
  relatedCourseSlugs: string[];
  faqs: { question: string; answer: string }[];
}

export const comparisons: Comparison[] = [
  // 1 ─ Java vs Python ───────────────────────────────────────────────────────
  {
    slug: "java-vs-python-for-beginners",
    shortLabel: "Java vs Python",
    metaTitle: "Java vs Python for Beginners (2026) — Which to Learn First in Pune",
    metaDescription:
      "Java vs Python for beginners in 2026: an honest comparison of difficulty, Pune job demand, salaries and career paths — and how to choose your first language for placements.",
    h1: "Java vs Python for Beginners (2026)",
    optionA: "Python",
    optionB: "Java",
    verdict:
      "For Indian beginners targeting placements at Pune-area companies in 2026, Python is usually the more practical first language: simpler syntax produces early wins, and the data, AI/ML and automation job markets specifically favour it — useful for freshers without an engineering degree. Java remains stronger for traditional enterprise roles (banking, insurance, large product companies) and for anyone aiming at Spring Boot / microservices specialisation, where Pune has very high services-sector hiring volume. The right choice depends on the job market you're targeting; both are beginner-viable and both are taught with placement support at Archer Infotech.",
    table: [
      { factor: "Beginner-friendliness", a: "9/10 — minimal syntax", b: "6/10 — more boilerplate" },
      { factor: "Pune fresher job demand (2026)", a: "High (Data, AI/ML, automation, web)", b: "Very high (enterprise, services, banking)" },
      { factor: "Average Pune fresher salary", a: "₹3.5–6 LPA", b: "₹3.5–6 LPA" },
      { factor: "Time to first working project", a: "~2 weeks", b: "~4 weeks" },
      { factor: "Best for", a: "Data Science, AI, automation, scripting, web", b: "Enterprise apps, Android, microservices" },
      { factor: "Typical course length at Archer", a: "~4 months", b: "~6 months" },
      { factor: "Path to highest pay", a: "Data Scientist / ML / AI Engineer", b: "Java Full Stack / Spring Boot architect" },
    ],
    whenA: {
      heading: "When Python is the better first language",
      paragraphs: [
        "If you're from a non-engineering background or new to coding entirely, Python's readable syntax gets you to a working program faster, which keeps motivation high in the crucial first weeks.",
        "If you're aiming at the fastest-growing Pune job markets — data science, analytics, machine learning, generative AI and automation — Python is the lingua franca of those fields, so your first language doubles as your career language.",
        "Python also pairs naturally with progression: a Python foundation ladders cleanly into data science, ML and AI-engineering tracks, which sit at the top of Pune's salary bands.",
      ],
    },
    whenB: {
      heading: "When Java is the better first language",
      paragraphs: [
        "Java drives the single largest volume of fresher hiring in Pune through the IT-services sector (TCS, Infosys, Persistent, Tech Mahindra and the GCC captives), so for sheer number of entry-level openings it's hard to beat.",
        "If you want enterprise, banking/insurance, Android or microservices roles, Java (with Spring Boot) is the expected stack, and its strictness teaches strong fundamentals — types, OOP and structure — that transfer well to other languages.",
        "Java Full Stack is one of the most reliable placement tracks in Pune, with a clear ladder from fresher developer to senior and architect roles.",
      ],
    },
    bottomLine:
      "Pick Python if you want the gentlest start and a route into data/AI; pick Java if you're optimising for the largest pool of Pune services-sector fresher jobs and enterprise specialisation. Neither is a wrong choice — both are placement-viable, and many developers eventually learn both.",
    relatedCourseSlugs: ["python-training-in-pune", "java-training-in-pune", "java-full-stack-training-in-pune"],
    faqs: [
      {
        question: "Should a complete beginner in Pune learn Java or Python first in 2026?",
        answer:
          "For most complete beginners, Python is the easier first language and opens data/AI roles. Choose Java if you're specifically targeting the high-volume IT-services and enterprise fresher hiring in Pune.",
      },
      {
        question: "Which pays more in Pune — Java or Python developers?",
        answer:
          "Fresher salaries are similar (₹3.5–6 LPA). Long term, Python can lead to higher-paid data-science and AI roles, while Java leads to well-paid full-stack and architect roles. Career growth matters more than the language alone.",
      },
      {
        question: "Can I switch from Python to Java later (or vice versa)?",
        answer:
          "Yes. Once you understand programming fundamentals in one language, picking up the other takes weeks, not months. Many Pune developers work across both.",
      },
      {
        question: "Which has more job openings in Pune?",
        answer:
          "Java has the highest raw volume of fresher openings via the services sector; Python has fast-growing demand in data, AI and automation. Both have strong markets.",
      },
    ],
  },

  // 2 ─ MERN vs Java Full Stack ───────────────────────────────────────────────
  {
    slug: "mern-vs-java-full-stack",
    shortLabel: "MERN vs Java Full Stack",
    metaTitle: "MERN Stack vs Java Full Stack (2026) — Which to Choose in Pune",
    metaDescription:
      "MERN vs Java Full Stack in 2026: a clear comparison of learning curve, Pune job demand, salaries and best-fit roles to help you pick the right full-stack path.",
    h1: "MERN Stack vs Java Full Stack (2026)",
    optionA: "MERN Stack",
    optionB: "Java Full Stack",
    verdict:
      "Both are strong full-stack paths in Pune. MERN (MongoDB, Express, React, Node) is JavaScript end-to-end — faster to start, favoured by product startups, SaaS and fintech teams, and ideal if you want one language across the whole stack. Java Full Stack (Java/Spring backend + modern frontend) has the larger volume of Pune services-sector and enterprise openings and tends to offer the most predictable fresher placement pipeline. Choose MERN for product/startup speed and JavaScript focus; choose Java Full Stack for the broadest enterprise hiring and a clear enterprise career ladder. Both are taught with placement support at Archer Infotech.",
    table: [
      { factor: "Languages", a: "JavaScript / TypeScript only", b: "Java (backend) + JS (frontend)" },
      { factor: "Learning curve", a: "Gentler — one language", b: "Steeper — two ecosystems" },
      { factor: "Pune hiring profile", a: "Product startups, SaaS, fintech", b: "Services sector, enterprise, GCC captives" },
      { factor: "Fresher openings volume", a: "Moderate–high", b: "Very high" },
      { factor: "Average Pune fresher salary", a: "₹3.2–5.8 LPA", b: "₹4–7 LPA" },
      { factor: "Best for", a: "Fast product iteration, JS-first devs", b: "Enterprise apps, large-scale systems" },
      { factor: "Senior ceiling (Pune)", a: "₹14–24 LPA", b: "₹16–26 LPA" },
    ],
    whenA: {
      heading: "When MERN Stack is the better choice",
      paragraphs: [
        "If you want to learn the whole stack in a single language, MERN keeps you in JavaScript/TypeScript from database queries to UI — less context-switching and a faster path to building complete apps.",
        "Pune's product startups, SaaS companies and fintech teams hire MERN developers heavily, and the stack is excellent for fast iteration and modern, interactive front-ends with React.",
        "If you eventually want to move toward front-end specialisation, React (the R in MERN) is the most in-demand UI skill in the market.",
      ],
    },
    whenB: {
      heading: "When Java Full Stack is the better choice",
      paragraphs: [
        "Java Full Stack has the largest fresher hiring volume in Pune because the services sector and enterprise captives run on Java/Spring — that translates into more entry-level interviews and a more predictable placement pipeline.",
        "For banking, insurance and large product systems where reliability and scale matter, Java/Spring Boot is the default, and the role ladder to senior and architect is well established.",
        "Learning two ecosystems is more work up front, but it makes you versatile and is well-rewarded across Pune's biggest employers.",
      ],
    },
    bottomLine:
      "Go MERN if you value a single-language, product-startup-friendly path with strong React skills; go Java Full Stack for the widest enterprise hiring and the most reliable fresher placement volume in Pune.",
    relatedCourseSlugs: ["mern-stack-training-in-pune", "java-full-stack-training-in-pune", "react-training-in-pune"],
    faqs: [
      {
        question: "Is MERN or Java Full Stack easier to learn?",
        answer:
          "MERN is generally easier to start because it's all JavaScript. Java Full Stack involves two ecosystems (Java/Spring + a JS frontend), so it's a steeper but very rewarding curve.",
      },
      {
        question: "Which has more jobs in Pune?",
        answer:
          "Java Full Stack has the higher raw volume of fresher openings through the services and enterprise sector. MERN has strong demand in product startups, SaaS and fintech.",
      },
      {
        question: "Which pays more?",
        answer:
          "Java Full Stack fresher and senior bands are slightly higher on average in Pune, but top MERN developers at strong product companies are paid very competitively. Skill and company tier matter more than the stack.",
      },
    ],
  },

  // 3 ─ Online vs Offline IT Training ─────────────────────────────────────────
  {
    slug: "online-vs-offline-it-training",
    shortLabel: "Online vs Offline training",
    metaTitle: "Online vs Offline IT Training in Pune (2026) — Which Is Better?",
    metaDescription:
      "Online vs offline (classroom) IT training in Pune: compare learning outcomes, doubt-clearing, discipline, cost and placement support to choose the right format for you.",
    h1: "Online vs Offline IT Training in Pune (2026)",
    optionA: "Classroom (Offline)",
    optionB: "Live Online",
    verdict:
      "Both formats can deliver the same outcome when the teaching is live and mentor-led. Classroom (offline) training suits learners who benefit from in-person discipline, face-to-face doubt-clearing and a study-group environment — ideal if you live near the centre and can attend regularly. Live online training suits working professionals and those with long commutes, delivering the same trainer, curriculum and projects from home. At Archer Infotech both formats share the same live classes and placement support, so the deciding factors are your commute, schedule and how you learn best — not the quality of teaching.",
    table: [
      { factor: "Teaching", a: "Live, in-person", b: "Live, instructor-led (Zoom/Meet)" },
      { factor: "Doubt-clearing", a: "Immediate, face-to-face", b: "Live in-session + recordings" },
      { factor: "Best for", a: "Nearby learners, students, discipline-seekers", b: "Working pros, long commutes, flexibility" },
      { factor: "Discipline / accountability", a: "Higher (fixed place & time)", b: "Self-driven (with live schedule)" },
      { factor: "Networking with peers", a: "Strong, in-person", b: "Moderate, online" },
      { factor: "Commute", a: "Required", b: "None" },
      { factor: "Curriculum & placement support", a: "Identical", b: "Identical" },
    ],
    whenA: {
      heading: "When classroom (offline) training is better",
      paragraphs: [
        "If you live within a reasonable commute of the Kothrud centre and thrive on routine, classroom training gives you fixed accountability, instant face-to-face doubt-clearing, and a peer group you can form study circles with.",
        "Students and fresh graduates in particular often benefit from the structure and the in-person mock-interview and project sessions.",
      ],
    },
    whenB: {
      heading: "When live online training is better",
      paragraphs: [
        "If you're a working professional, live in a far suburb (Hinjewadi, Wakad, PCMC), or have an unpredictable schedule, live online training removes the commute while keeping you in the same live class as the classroom batch.",
        "Recorded sessions let you revisit difficult topics, and you can switch between formats as your schedule changes — the curriculum, trainer and placement support are identical.",
      ],
    },
    bottomLine:
      "Choose classroom if you're nearby and want maximum structure and in-person interaction; choose live online for flexibility and zero commute. At Archer Infotech the teaching quality and placement support are the same either way.",
    relatedCourseSlugs: ["java-full-stack-training-in-pune", "python-training-in-pune", "data-science-training-in-pune"],
    faqs: [
      {
        question: "Is online IT training as effective as classroom in Pune?",
        answer:
          "When it's live and mentor-led (not pre-recorded videos), yes. At Archer Infotech online batches join the same live class with the same trainer, curriculum, projects and placement support as the classroom.",
      },
      {
        question: "Which format has better placement support?",
        answer:
          "Identical. Resume help, mock interviews and hiring-partner drives are offered to both online and offline students the same way.",
      },
      {
        question: "Can I switch from online to classroom (or back) mid-course?",
        answer:
          "Generally yes, subject to batch availability — many learners switch formats as their schedule changes since the curriculum is the same.",
      },
    ],
  },

  // 4 ─ Python Developer vs Data Scientist ────────────────────────────────────
  {
    slug: "python-developer-vs-data-scientist",
    shortLabel: "Python Dev vs Data Scientist",
    metaTitle: "Python Developer vs Data Scientist (2026) — Career & Salary in Pune",
    metaDescription:
      "Python Developer vs Data Scientist in Pune 2026: compare day-to-day work, skills, salary, entry difficulty and career growth to choose the right role.",
    h1: "Python Developer vs Data Scientist (2026)",
    optionA: "Python Developer",
    optionB: "Data Scientist",
    verdict:
      "Both build on Python, but the roles differ. A Python Developer builds and maintains software — backends, APIs, automation — and is an easier, faster entry point with broad Pune demand. A Data Scientist extracts insight and builds models from data, needs stronger statistics and ML, and commands higher pay but expects more background. If you want the quickest route into a coding job, start as a Python Developer; if you're drawn to data, maths and ML and can invest more upfront, Data Scientist has a higher ceiling. Many people start as Python Developers and move into data science later.",
    table: [
      { factor: "Core work", a: "Software, backends, APIs, automation", b: "Data analysis, statistics, ML models" },
      { factor: "Key skills", a: "Python, Django/FastAPI, databases, Git", b: "Python, statistics, pandas, scikit-learn, ML" },
      { factor: "Entry difficulty", a: "Lower — faster to first job", b: "Higher — needs maths/stats foundation" },
      { factor: "Average Pune fresher salary", a: "₹3.5–6 LPA", b: "₹4.5–7.5 LPA" },
      { factor: "Pune market average", a: "~₹7.6 LPA", b: "~₹10.8 LPA" },
      { factor: "Senior ceiling (Pune)", a: "₹15–25 LPA", b: "₹15–26 LPA (₹26–45 LPA at lead)" },
      { factor: "Best for", a: "Builders who like shipping software", b: "Analytical minds who like maths & data" },
    ],
    whenA: {
      heading: "When Python Developer is the better fit",
      paragraphs: [
        "If you want the fastest, most accessible route into a paid coding role, Python Developer is it — the skill bar is lower than data science and Pune has broad demand across product and services companies.",
        "It's also a great foundation: once you're employed and comfortable, you can specialise into data engineering, ML or AI engineering with experience behind you.",
      ],
    },
    whenB: {
      heading: "When Data Scientist is the better fit",
      paragraphs: [
        "If you enjoy statistics, experimentation and extracting meaning from data — and you're willing to invest more upfront in maths and ML — Data Scientist offers a higher average and ceiling in Pune.",
        "It rewards a stronger analytical background, so it's a natural target for those from engineering, statistics, mathematics or economics backgrounds, or developers who upskill into it.",
      ],
    },
    bottomLine:
      "Choose Python Developer for the quickest, broadest entry into tech; choose Data Scientist for higher pay and analytical depth if you can invest in the maths and ML. Starting as a developer and transitioning to data science later is a common, low-risk path.",
    relatedCourseSlugs: ["python-training-in-pune", "data-science-training-in-pune", "machine-learning-training-in-pune"],
    faqs: [
      {
        question: "Does a Data Scientist earn more than a Python Developer in Pune?",
        answer:
          "On average yes — Data Scientist roles carry a higher Pune market average (~₹10.8 LPA vs ~₹7.6 LPA) and a higher ceiling, reflecting the stronger statistics and ML requirements.",
      },
      {
        question: "Which is easier to get into as a fresher?",
        answer:
          "Python Developer. The skill bar is lower and demand is broad, so it's typically a faster first job. Data Science expects more maths/ML preparation.",
      },
      {
        question: "Can I become a Data Scientist after starting as a Python Developer?",
        answer:
          "Yes — it's one of the most common paths. A developer foundation plus a data-science upskill (statistics, ML, projects) makes for a strong, credible transition.",
      },
    ],
  },

  // 5 ─ Bootcamp vs Self-Study ────────────────────────────────────────────────
  {
    slug: "coding-bootcamp-vs-self-study",
    shortLabel: "Bootcamp vs Self-Study",
    metaTitle: "Coding Bootcamp vs Self-Study (2026) — Which Works for Pune Jobs?",
    metaDescription:
      "Coding bootcamp vs self-study in 2026: compare structure, speed, cost, discipline and placement outcomes to decide the best way to break into IT in Pune.",
    h1: "Coding Bootcamp vs Self-Study (2026)",
    optionA: "Coding Bootcamp",
    optionB: "Self-Study",
    verdict:
      "Self-study is free and flexible but demands strong discipline, and it gives you no structured feedback, mentorship or placement pipeline — which is why most self-learners stall before getting hired. A bootcamp costs money but provides structure, live mentorship, real projects, interview preparation and direct hiring connections, which is what actually converts learning into a job. If you're highly self-motivated and only need to fill specific gaps, self-study can work; if you want a reliable, time-bound path to a first IT job with placement support, a bootcamp is the safer bet. Many people combine both — self-study to explore, then a bootcamp to get hired.",
    table: [
      { factor: "Cost", a: "Course fee (with EMI options)", b: "Free–low" },
      { factor: "Structure", a: "Defined curriculum & pace", b: "You design it (easy to stall)" },
      { factor: "Mentorship / doubt-clearing", a: "Live trainers", b: "Forums / self-serve" },
      { factor: "Discipline required", a: "Moderate (fixed schedule)", b: "Very high (all on you)" },
      { factor: "Placement support", a: "Yes — resume, mocks, hiring drives", b: "None" },
      { factor: "Typical time to job-ready", a: "Predictable (months)", b: "Highly variable" },
      { factor: "Completion / success rate", a: "Higher (accountability)", b: "Lower (most stall)" },
    ],
    whenA: {
      heading: "When a bootcamp is the better choice",
      paragraphs: [
        "If your goal is a job in a defined timeframe, a bootcamp's structure, mentorship and placement support dramatically raise your odds — you're not just learning, you're being prepared for interviews and introduced to hiring partners.",
        "Career changers, graduates and anyone who has struggled to stay consistent with self-study benefit most, because accountability and feedback are built in.",
        "At Archer Infotech the bootcamps (CodeLeap, CareerCode, TechReady) are matched to your stage and include real projects and placement assistance.",
      ],
    },
    whenB: {
      heading: "When self-study is the better choice",
      paragraphs: [
        "If you're highly disciplined, already employed in tech, or only need to fill specific knowledge gaps, self-study via free resources is efficient and costs nothing.",
        "It's also a smart first step to explore whether you enjoy coding before committing to a paid programme — then switch to structured training when you're serious about getting hired.",
      ],
    },
    bottomLine:
      "Self-study suits the highly disciplined and those filling gaps; a bootcamp suits anyone who wants a reliable, time-bound path to a first IT job with mentorship and placement support. Combining both — explore via self-study, then a bootcamp to get hired — is often the smartest route.",
    relatedCourseSlugs: ["python-training-in-pune", "java-full-stack-training-in-pune", "data-science-training-in-pune"],
    faqs: [
      {
        question: "Can I get an IT job in Pune through self-study alone?",
        answer:
          "It's possible but uncommon — most self-learners stall without structure or placement support. A bootcamp's mentorship, projects and hiring connections make getting hired far more reliable.",
      },
      {
        question: "Are coding bootcamps worth the money?",
        answer:
          "For most people aiming at a first IT job in a defined timeframe, yes — the structure, interview prep and placement pipeline are what convert learning into an offer, which free resources don't provide.",
      },
      {
        question: "Can I combine self-study and a bootcamp?",
        answer:
          "Absolutely. A common approach is to explore the basics via free resources, then join a bootcamp for structured depth, projects and placement support when you're ready to get hired.",
      },
    ],
  },
];

export function getComparison(slug: string): Comparison | undefined {
  return comparisons.find((c) => c.slug === slug);
}
