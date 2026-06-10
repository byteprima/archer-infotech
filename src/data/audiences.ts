/**
 * Audience-intent landing pages (P4-17).
 *
 * Searchers don't look for bootcamp brand names ("CodeLeap") — they search
 * their own situation: "coding course after 12th in Pune", "IT course with
 * placement for graduates", "programming classes for engineering students".
 * These intent queries have higher volume than the brand names.
 *
 * Each page below is a standalone, audience-specific entry point (approach
 * (b) in the pillar-4 brief) — genuinely unique copy per audience, not a
 * canonicalised duplicate — that points to the right bootcamp and a curated
 * set of courses. Courses are referenced by slug and resolved against the
 * catalogue at render time so titles/links never drift.
 *
 * Route: /courses/for/[audience] (the static `for` segment wins over the
 * dynamic `[category]` route, so these never collide with course pages).
 */

export interface AudienceLanding {
  slug: string;
  /** Audience label, e.g. "Students after 12th". */
  name: string;
  /** Short index/card tagline. */
  tagline: string;

  metaTitle: string;
  metaDescription: string;
  h1: string;

  /** Audience-specific opening — 2 paragraphs. */
  intro: string[];

  /** "This is for you if…" signals. */
  forYou: string[];

  /** The bootcamp this audience maps to. */
  programme: {
    bootcampSlug: string;
    bootcampName: string;
    pitch: string;
  };

  /** Curated course slugs to also surface (resolved via getCourse). */
  alsoConsiderCourseSlugs: string[];

  /** What this audience walks away with. */
  whatYouGain: string[];

  /** Eligibility / starting point, written for this audience. */
  eligibility: string;

  /** Why Archer specifically for this audience — 2 paragraphs. */
  whyArcher: string[];

  /** Audience-specific FAQs (objections + practical questions). */
  faqs: { question: string; answer: string }[];
}

export const audiences: AudienceLanding[] = [
  // ─── 1. After 12th → CodeLeap ────────────────────────────────────────────
  {
    slug: "students-after-12th",
    name: "Students after 12th",
    tagline: "Get a coding head start in the gap after your 12th boards.",
    metaTitle: "Coding Courses After 12th in Pune — Archer Infotech",
    metaDescription:
      "Just finished 12th? Start coding before college with Archer Infotech's CodeLeap programme in Pune — no prior experience needed. Web development, Python and AI tracks, hybrid in Kothrud.",
    h1: "Coding Courses After 12th in Pune",
    intro: [
      "The months right after your 12th boards are the single best window to learn coding — you have time before college fully kicks in, your study habits are still sharp, and a head start now compounds for years. You don't need a science or computer background to begin; you need a structured first programme and a mentor who starts from absolute zero.",
      "Archer Infotech's CodeLeap is built exactly for 12th passouts in Pune. It assumes no prior coding experience, runs in a hybrid format from our Kothrud centre, and lets you pick the direction that excites you — web development, Python programming, or AI and data science — so you walk into your degree already able to build real things.",
    ],
    forYou: [
      "You've just completed 12th (any stream — science, commerce or arts)",
      "You have a few free months before college and want to use them well",
      "You're curious about coding but have never written a line of code",
      "You want a head start before a BE / BCA / BSc-CS / BTech degree",
      "You learn better with a mentor and classmates than alone on YouTube",
    ],
    programme: {
      bootcampSlug: "codeleap",
      bootcampName: "CodeLeap",
      pitch:
        "CodeLeap is our 2-month hybrid vacation programme designed for 12th passouts with zero coding background. Choose one of three tracks — Web Development, Python Programming, or AI / Data Science — and finish able to build and explain a real project.",
    },
    alsoConsiderCourseSlugs: [
      "python-training-in-pune",
      "javascript-training-in-pune",
      "java-training-in-pune",
    ],
    whatYouGain: [
      "Your first real programs and a project you can show",
      "A clear sense of which direction (web, Python, AI) fits you",
      "Confidence that carries into your first year of college",
      "AI tools woven into how you learn from day one",
    ],
    eligibility:
      "Open to anyone who has completed (or just appeared for) the 12th standard, from any stream. No maths, science or computer background required — we start from the absolute basics.",
    whyArcher: [
      "Archer Infotech has trained Pune students since 2009, and CodeLeap was created specifically for the after-12th moment — small mentor-led batches, a practical project-first approach, and multilingual instruction in English, Hindi and Marathi so nobody gets left behind.",
      "Because we're a local Kothrud institute, you can walk in for a free demo, meet the trainer, and decide in person — and the alumni guidance continues well beyond the two months, right through your college years.",
    ],
    faqs: [
      {
        question: "I'm from a commerce / arts background — can I still learn coding after 12th?",
        answer:
          "Yes. CodeLeap assumes zero coding experience and starts from the basics, so your 12th stream doesn't matter. Many of our strongest students came from non-science backgrounds.",
      },
      {
        question: "Isn't it too early to learn coding right after 12th?",
        answer:
          "It's the ideal time. The gap before college is free, your learning habits are fresh, and a head start means you enter your degree already comfortable with programming.",
      },
      {
        question: "Do I have to pick web, Python or AI before joining?",
        answer:
          "We help you choose during your free demo and the early sessions. The programme is built so beginners can find the direction that fits before committing.",
      },
      {
        question: "Is CodeLeap classroom or online?",
        answer:
          "It's hybrid, run from our Kothrud centre in Pune — you get in-person mentoring plus the flexibility of online sessions when you need them.",
      },
    ],
  },

  // ─── 2. Engineering students → CareerCode ─────────────────────────────────
  {
    slug: "engineering-students",
    name: "Engineering students",
    tagline: "Industry-ready coding skills alongside your engineering degree.",
    metaTitle: "Coding Classes for Engineering Students in Pune — Archer Infotech",
    metaDescription:
      "Engineering students in Pune: build the job-ready coding skills your syllabus skips. Archer Infotech's CareerCode runs semester-by-semester with internship and placement prep. Java, full-stack, Python and more.",
    h1: "Coding Classes for Engineering Students in Pune",
    intro: [
      "An engineering degree gives you fundamentals, but Pune's product and IT-services companies hire on job-ready skills — building real applications, working with Git, understanding a modern stack, and clearing technical interviews. That gap between syllabus and what gets you hired is exactly where most engineering students lose out during placements.",
      "Archer Infotech's CareerCode is designed to run alongside your degree, semester by semester, so you build practical skills steadily instead of cramming everything in final year. By the time campus placements arrive, you already have projects, a stack you know deeply, and interview practice behind you.",
    ],
    forYou: [
      "You're in 1st to 4th year of a BE / BTech (any branch — CS, IT, ENTC, Mech, Civil)",
      "Your college syllabus feels theoretical and behind industry",
      "You want projects and skills that stand out at campus placements",
      "You'd rather build skills steadily than cram in final year",
      "You want internship and interview preparation, not just lectures",
    ],
    programme: {
      bootcampSlug: "careercode",
      bootcampName: "CareerCode",
      pitch:
        "CareerCode is our semester-by-semester programming track built for engineering students. Six specialisation paths, real projects, and internship + placement preparation that line up with your academic calendar.",
    },
    alsoConsiderCourseSlugs: [
      "java-full-stack-training-in-pune",
      "mern-stack-training-in-pune",
      "python-training-in-pune",
      "data-science-training-in-pune",
    ],
    whatYouGain: [
      "A job-ready stack (full-stack, Java, Python or data) you actually know",
      "A portfolio of real projects to show recruiters",
      "Internship and placement interview preparation",
      "Skills built steadily across semesters, not crammed in final year",
    ],
    eligibility:
      "Open to engineering students in any year and any branch. Earlier you start, the more you compound — but we tailor the entry point to your current year and skill level.",
    whyArcher: [
      "Our trainers are working professionals from MNCs, so what you learn maps directly to what Pune's hiring panels actually test. CareerCode's semester rhythm means you're never choosing between your degree and your skills — they reinforce each other.",
      "With 100+ hiring partners and a placement team that runs mock interviews and drives, engineering students use Archer to convert their degree into an actual offer rather than hoping the campus does it for them.",
    ],
    faqs: [
      {
        question: "Which year of engineering should I start in?",
        answer:
          "The earlier the better — starting in 1st or 2nd year lets skills compound. But CareerCode tailors the entry point to your current year, and even 3rd/4th-year students benefit from the placement-focused tracks.",
      },
      {
        question: "I'm not from a CS/IT branch — is this still useful?",
        answer:
          "Very. Many of Pune's software hires come from Mechanical, Civil and ENTC branches. CareerCode starts from fundamentals, so your branch isn't a barrier to a software role.",
      },
      {
        question: "Can I manage this alongside my college workload?",
        answer:
          "Yes — that's the point of the semester-by-semester design. Batches and pacing are built to run in parallel with your academic calendar.",
      },
      {
        question: "Does it include placement help?",
        answer:
          "Yes. CareerCode includes internship guidance, mock interviews and access to our 100+ hiring partners through the placement team.",
      },
    ],
  },

  // ─── 3. BCA students → CareerCode ─────────────────────────────────────────
  {
    slug: "bca-students",
    name: "BCA students",
    tagline: "Turn a BCA into a strong developer offer with real project skills.",
    metaTitle: "Programming Courses for BCA Students in Pune — Archer Infotech",
    metaDescription:
      "BCA students in Pune: stand out for developer roles with job-ready Java, full-stack and Python skills. Archer Infotech's CareerCode adds real projects and placement prep to your BCA degree.",
    h1: "Programming Courses for BCA Students in Pune",
    intro: [
      "A BCA gives you a solid computing foundation, but in Pune's job market you're often competing with BE/BTech graduates for the same developer roles. What closes that gap isn't more theory — it's demonstrable skill: a real full-stack or Java project, a stack you can talk about confidently, and interview readiness.",
      "Archer Infotech's CareerCode helps BCA students convert their degree into a competitive developer profile. You pick a specialisation, build production-style projects, and go through the same interview preparation that gets our students hired at product and services companies across Pune.",
    ],
    forYou: [
      "You're pursuing or have completed a BCA",
      "You want a developer role but worry about competing with BE/BTech grads",
      "Your course gave you theory but few deployable projects",
      "You want a clear specialisation (Java, full-stack, Python or data)",
      "You need interview and placement preparation, not just certificates",
    ],
    programme: {
      bootcampSlug: "careercode",
      bootcampName: "CareerCode",
      pitch:
        "CareerCode gives BCA students a focused specialisation track with real projects and placement preparation — the practical depth that makes a BCA stand out against engineering graduates.",
    },
    alsoConsiderCourseSlugs: [
      "java-full-stack-training-in-pune",
      "python-full-stack-training-in-pune",
      "mern-stack-training-in-pune",
      "data-analytics-training-in-pune",
    ],
    whatYouGain: [
      "A specialisation that makes your BCA competitive for dev roles",
      "Production-style projects to show in interviews",
      "Confidence with a modern stack end to end",
      "Mock interviews and access to hiring partners",
    ],
    eligibility:
      "Open to current and recently-graduated BCA students. We meet you at your current skill level and build from there toward a placement-ready profile.",
    whyArcher: [
      "Pune hires plenty of BCA graduates as developers — the ones who get the offers are those who can build and explain real software. CareerCode is structured around exactly that: projects, a deep stack, and interview practice.",
      "Our placement team and 100+ hiring partners give BCA students the same access engineering graduates get, and our trainers' MNC experience means your projects look like industry work, not college assignments.",
    ],
    faqs: [
      {
        question: "Can a BCA graduate get a developer job in Pune?",
        answer:
          "Yes — many Pune companies hire BCA graduates as developers. The deciding factor is demonstrable skill, which is what CareerCode's projects and specialisation tracks build.",
      },
      {
        question: "Which specialisation is best for a BCA student?",
        answer:
          "Java full-stack, MERN full-stack and Python are the most common high-demand choices. We help you pick based on your interest and the current Pune job market during onboarding.",
      },
      {
        question: "Do I need strong maths for these courses?",
        answer:
          "For most development tracks, no — logical thinking matters more than advanced maths. Data-focused tracks use some statistics, which we teach from the basics.",
      },
    ],
  },

  // ─── 4. BSc CS students → CareerCode ──────────────────────────────────────
  {
    slug: "bsc-cs-students",
    name: "BSc Computer Science students",
    tagline: "Convert a BSc-CS into a job-ready developer profile.",
    metaTitle: "IT Training for BSc CS Students in Pune (2026)",
    metaDescription:
      "BSc Computer Science students in Pune: add job-ready full-stack, Java or data skills and placement prep to your degree with Archer Infotech's CareerCode. Real projects, mentor-led, Kothrud.",
    h1: "IT Training for BSc Computer Science Students in Pune",
    intro: [
      "A BSc in Computer Science gives you strong fundamentals — but employers in Pune hire on what you can build, not just what you've studied. The students who land developer or data roles after a BSc-CS are the ones who pair their degree with a practical stack, a portfolio, and interview preparation.",
      "Archer Infotech's CareerCode is built to add exactly that layer. You take your BSc-CS foundation and turn it into a focused, hireable profile through real projects, a chosen specialisation, and the same placement support that gets our students into product and services companies.",
    ],
    forYou: [
      "You're pursuing or have completed a BSc in Computer Science / IT",
      "You have good fundamentals but few real, deployable projects",
      "You want to stand out for developer or data roles",
      "You're deciding between further study and entering the job market",
      "You want structured placement and interview preparation",
    ],
    programme: {
      bootcampSlug: "careercode",
      bootcampName: "CareerCode",
      pitch:
        "CareerCode turns a BSc-CS foundation into a hireable profile — a specialisation track, production-style projects, and placement preparation aligned to Pune's job market.",
    },
    alsoConsiderCourseSlugs: [
      "java-full-stack-training-in-pune",
      "python-training-in-pune",
      "data-science-training-in-pune",
      "mern-stack-training-in-pune",
    ],
    whatYouGain: [
      "A practical stack on top of your CS fundamentals",
      "A portfolio that proves you can build, not just study",
      "A clear path into developer or data roles",
      "Interview practice and hiring-partner access",
    ],
    eligibility:
      "Open to current and recently-graduated BSc Computer Science / IT students. Your fundamentals are an advantage — we build the practical, job-ready layer on top.",
    whyArcher: [
      "Your BSc-CS already gives you the theory most bootcamp students lack. CareerCode focuses your effort where it pays off — building real software, choosing a specialisation, and preparing for the specific interviews Pune companies run.",
      "With MNC-experienced trainers and 100+ hiring partners, Archer helps BSc-CS students compete head-to-head with engineering graduates for the same roles.",
    ],
    faqs: [
      {
        question: "Should I do an MCA or take a job after BSc-CS?",
        answer:
          "Both are valid. If you want to enter the workforce sooner, a focused programme like CareerCode plus placement support can get you a developer role without the extra years — many BSc-CS students choose this path.",
      },
      {
        question: "What specialisation suits a BSc-CS student best?",
        answer:
          "Full-stack (Java or MERN), Python, and data science are the strongest options given your fundamentals. We help you choose based on interest and current demand.",
      },
      {
        question: "Will my BSc-CS background let me move faster?",
        answer:
          "Often yes — your fundamentals mean we can spend more time on real projects and advanced topics rather than basics.",
      },
    ],
  },

  // ─── 5. Graduates → TechReady ─────────────────────────────────────────────
  {
    slug: "graduates",
    name: "Graduates seeking placement",
    tagline: "An intensive, placement-focused path into IT after graduation.",
    metaTitle: "IT Courses with Placement for Graduates in Pune — Archer Infotech",
    metaDescription:
      "Graduates in Pune looking for an IT job: Archer Infotech's TechReady is a full-time, placement-assisted programme with real projects and direct hiring connections to 100+ companies. Any-degree welcome.",
    h1: "IT Courses with Placement for Graduates in Pune",
    intro: [
      "If you've graduated and want a real IT job — not just another certificate — what you need is an intensive, placement-focused programme that takes you from where you are to interview-ready in a few months. Pune has the jobs; the missing piece is usually job-ready skills plus an actual pipeline to hiring companies.",
      "Archer Infotech's TechReady is a full-time, placement-assisted programme built for graduates. Over six to eight months you build production projects for six hours a day, then go through structured placement support with direct hiring connections to 100+ companies. Your degree stream doesn't matter — your commitment does.",
    ],
    forYou: [
      "You've completed graduation (any degree — BA, BCom, BSc, BE, BCA…)",
      "You want an IT job and need placement support, not just a course",
      "You can commit to a full-time, intensive programme",
      "You may have an employment gap and want a clear restart",
      "You learn best by building real projects daily",
    ],
    programme: {
      bootcampSlug: "techready",
      bootcampName: "TechReady",
      pitch:
        "TechReady is our full-time, placement-assisted intensive — six hours daily over 6–8 months, real projects, and direct hiring connections with 100+ companies. Built to take graduates from any degree to a first IT job.",
    },
    alsoConsiderCourseSlugs: [
      "java-full-stack-training-in-pune",
      "python-training-in-pune",
      "data-science-training-in-pune",
      "mern-stack-training-in-pune",
    ],
    whatYouGain: [
      "A job-ready specialisation built over months, not weeks",
      "A portfolio of production-style projects",
      "Structured placement support — resume, mock interviews, drives",
      "Direct introductions to 100+ hiring partners",
    ],
    eligibility:
      "Open to graduates from any degree and any stream, including those with an employment gap. No prior IT background required — TechReady starts from fundamentals and goes deep.",
    whyArcher: [
      "Archer has placed 5,000+ students with a 90% placement rate across our placement-track programmes (institute records). TechReady exists specifically to convert graduates — including non-IT and career-gap candidates — into hired professionals.",
      "The full-time, six-hours-a-day format is deliberate: it builds the depth and habits that part-time courses can't, and the placement team works your candidacy directly with hiring partners rather than leaving you to job-hunt alone.",
    ],
    faqs: [
      {
        question: "I have a non-IT degree — can I still get an IT job?",
        answer:
          "Yes. TechReady is built for graduates from any stream and starts from fundamentals. A large share of our placed students came from non-IT degrees.",
      },
      {
        question: "I have an employment gap — does that disqualify me?",
        answer:
          "No. The intensive format and placement support are designed to give career-gap candidates a clear, credible restart. Your projects and skills speak louder than the gap.",
      },
      {
        question: "What kind of placement support is included?",
        answer:
          "Resume building, mock interviews, aptitude prep, and direct introductions to our 100+ hiring partners through scheduled drives — not just a list of openings.",
      },
      {
        question: "How long until I'm job-ready?",
        answer:
          "TechReady runs 6–8 months full-time. That depth is what makes graduates genuinely interview-ready rather than just certified.",
      },
    ],
  },

  // ─── 6. MCA students → TechReady ──────────────────────────────────────────
  {
    slug: "mca-students",
    name: "MCA students",
    tagline: "Convert an MCA into a strong, well-paid developer role.",
    metaTitle: "IT Training for MCA Students in Pune — Archer Infotech",
    metaDescription:
      "MCA students and freshers in Pune: turn your master's into a strong developer offer with job-ready full-stack, Java or data skills and placement prep from Archer Infotech. Real projects, MNC-experienced trainers.",
    h1: "IT Training for MCA Students in Pune",
    intro: [
      "An MCA is a strong qualification, but it's heavy on theory and light on the production experience Pune's companies expect — modern frameworks, real projects, deployment, and interview depth. MCA graduates who command the best offers are the ones who pair the degree with demonstrable, current engineering skill.",
      "Archer Infotech helps MCA students and freshers do exactly that: take a solid academic base and convert it into a hireable, well-paid developer profile through real projects, a focused specialisation, and rigorous interview preparation aligned to what Pune actually hires for.",
    ],
    forYou: [
      "You're pursuing or have completed an MCA",
      "Your course was theory-heavy and short on real projects",
      "You want a strong developer or data role, not an entry-level patch",
      "You want current frameworks and deployment experience",
      "You want serious interview and placement preparation",
    ],
    programme: {
      bootcampSlug: "techready",
      bootcampName: "TechReady",
      pitch:
        "TechReady gives MCA graduates the intensive, project-driven depth their degree often lacks — full-time real-project work plus placement support and direct hiring connections to 100+ companies.",
    },
    alsoConsiderCourseSlugs: [
      "java-full-stack-training-in-pune",
      "spring-boot-microservices-training-in-pune",
      "data-science-training-in-pune",
      "mern-stack-training-in-pune",
    ],
    whatYouGain: [
      "Current frameworks and real deployment experience",
      "A portfolio that reflects industry work, not coursework",
      "A specialisation that lifts you above entry-level offers",
      "Placement support and hiring-partner access",
    ],
    eligibility:
      "Open to current and recently-graduated MCA students. Your academic base is an advantage — we focus on the practical, current-stack layer that converts it into strong offers.",
    whyArcher: [
      "Our trainers carry 10–15+ years of MNC experience, so MCA students get exposure to how software is really built and reviewed — closing the theory-to-practice gap that holds many MCA freshers back in interviews.",
      "With a 90% placement rate across our placement-track programmes (institute records) and 100+ hiring partners, Archer helps MCA graduates target the stronger roles their qualification deserves.",
    ],
    faqs: [
      {
        question: "Why do MCA freshers struggle in interviews despite the degree?",
        answer:
          "Usually because the syllabus is theory-heavy and light on current frameworks and real projects. TechReady closes that gap with full-time, project-driven practice and mock interviews.",
      },
      {
        question: "Which specialisation gives MCA graduates the best offers?",
        answer:
          "Java full-stack with Spring Boot, MERN full-stack, and data science are strong, well-paid directions. We help you choose based on your interest and demand.",
      },
      {
        question: "Can I do this in my final MCA semester?",
        answer:
          "Yes — many students align it with their final semester or start right after, so they enter placements already interview-ready.",
      },
    ],
  },

  // ─── 7. Working professionals → courses (online/weekend) ──────────────────
  {
    slug: "working-professionals",
    name: "Working professionals",
    tagline: "Upskill or switch roles with weekend & live online batches.",
    metaTitle: "IT Courses for Working Professionals in Pune — Archer Infotech",
    metaDescription:
      "Working in Pune and want to upskill or switch roles? Archer Infotech runs weekend and live online IT courses — AWS, DevOps, data science, full-stack and generative AI — built around your job, with placement support.",
    h1: "IT Courses for Working Professionals in Pune",
    intro: [
      "When you're already working, the barrier to upskilling isn't ability — it's time and relevance. You need courses that fit around a full-time job and that map directly to the promotion or role switch you're aiming for, taught by people who've actually done the work.",
      "Archer Infotech runs weekend and live online batches built for Pune's working professionals. Whether you want to move into cloud, DevOps, data science, full-stack or generative AI, you learn from MNC-experienced trainers on a schedule that respects your job — same curriculum and projects as the weekday classroom.",
    ],
    forYou: [
      "You're employed and want to upskill or switch into a new tech role",
      "You can only train on weekends or evenings",
      "You want skills tied to a promotion or a role change, not generic theory",
      "You may be in a non-tech role and want to move into IT",
      "You value live, mentor-led teaching over passive video courses",
    ],
    programme: {
      bootcampSlug: "techready",
      bootcampName: "TechReady",
      pitch:
        "If you're ready for a full career switch into IT, TechReady's intensive placement-assisted format is the deepest option — and for targeted upskilling, our individual courses below run in weekend and live online batches.",
    },
    alsoConsiderCourseSlugs: [
      "aws-training-in-pune",
      "devops-training-in-pune",
      "data-science-training-in-pune",
      "genai-training-in-pune",
      "java-full-stack-training-in-pune",
    ],
    whatYouGain: [
      "A new skill set tied to a promotion or role switch",
      "A schedule (weekend / online live) that fits a full-time job",
      "Hands-on projects, not passive video lectures",
      "Guidance from trainers who do the work in industry",
    ],
    eligibility:
      "Open to working professionals at any stage — from those wanting to deepen current skills to those switching from a non-tech role into IT. We tailor the starting point to your background.",
    whyArcher: [
      "Our weekend and live online batches use the same trainers, curriculum and projects as the classroom, so a busy schedule never means a watered-down course. Trainers are working MNC professionals, so the content tracks what's actually used and interviewed for in 2026.",
      "For professionals targeting a full switch, our placement support and 100+ hiring partners help you make the move credibly — not just collect another certificate.",
    ],
    faqs: [
      {
        question: "Can I learn while working full-time?",
        answer:
          "Yes — our weekend and live online batches are designed for exactly that. You get the same curriculum and projects as the weekday classroom on a schedule that fits your job.",
      },
      {
        question: "Which courses help most with a promotion or role switch?",
        answer:
          "AWS, DevOps, data science, generative AI and full-stack are the most common upskilling and switch tracks for Pune professionals. We help you pick based on your target role.",
      },
      {
        question: "I'm in a non-tech job — can I switch into IT?",
        answer:
          "Yes. Many professionals switch into IT with us; for a full career change, the intensive TechReady format plus placement support is the strongest path.",
      },
      {
        question: "Is online as good as classroom for working professionals?",
        answer:
          "For most professionals, yes — the live online batch is the same class with the same trainer, minus the commute. You can switch between formats as your schedule needs.",
      },
    ],
  },

  // ─── 8. Career changers → Python / TechReady ──────────────────────────────
  {
    slug: "career-changers",
    name: "Career changers",
    tagline: "Switch into IT from a non-tech background — structured and supported.",
    metaTitle: "Career Change to IT in Pune — Courses & Placement | Archer Infotech",
    metaDescription:
      "Want to change careers into IT in Pune? Archer Infotech helps non-tech professionals switch with beginner-friendly tracks (Python, data, full-stack), weekend/online options and placement support. No coding background needed.",
    h1: "Career Change to IT in Pune",
    intro: [
      "Changing careers into IT from a non-technical background is one of the most common — and most achievable — moves we support, but it's daunting from the outside. The fears are always the same: \"Am I too old?\", \"I've never coded\", \"Am I starting from zero?\" The honest answer is that a structured path and real placement support matter far more than your starting point.",
      "Archer Infotech helps career changers in Pune make the switch deliberately: a beginner-friendly entry (often Python or data), a schedule that can fit your current job, and — when you're ready to go all-in — an intensive placement-assisted programme that connects you directly to hiring companies.",
    ],
    forYou: [
      "You're working in a non-tech field and want to move into IT",
      "You have little or no coding background and need to start from basics",
      "You worry it's \"too late\" — it usually isn't",
      "You want a clear, structured path rather than scattered online courses",
      "You'll need placement support to make the switch credible",
    ],
    programme: {
      bootcampSlug: "techready",
      bootcampName: "TechReady",
      pitch:
        "For a committed full switch, TechReady is the deepest path — full-time, intensive, placement-assisted, and open to any background. If you need to keep your current job while you start, begin with a beginner-friendly course below in a weekend or online batch.",
    },
    alsoConsiderCourseSlugs: [
      "python-training-in-pune",
      "data-analytics-training-in-pune",
      "data-science-training-in-pune",
      "java-full-stack-training-in-pune",
    ],
    whatYouGain: [
      "A realistic, structured route from non-tech to a first IT role",
      "Beginner-friendly foundations that assume zero coding",
      "Flexible (weekend / online) or intensive (full-time) options",
      "Placement support to make the switch land",
    ],
    eligibility:
      "Open to anyone changing careers into IT, from any background and at any age. No prior coding experience required — we start from the basics and build a path that fits your situation.",
    whyArcher: [
      "We've helped career changers move into IT since 2009, so we know the real obstacles aren't technical — they're confidence, structure, and a credible bridge to employers. Our beginner tracks assume zero background, and our placement team works your switch directly.",
      "You can start part-time around your current job and step up to the intensive TechReady programme when you're ready — and our trainers, who switched into and grew within tech themselves, mentor you through the parts that feel hardest.",
    ],
    faqs: [
      {
        question: "Am I too old to switch careers into IT?",
        answer:
          "Almost certainly not. We've helped career changers across a wide range of ages move into IT. What matters is a structured path and consistent effort, not your age.",
      },
      {
        question: "I've never coded — where do I even start?",
        answer:
          "Most career changers start with Python or data analytics — beginner-friendly and in high demand. We assume zero coding background and build from the basics.",
      },
      {
        question: "Can I switch careers without quitting my current job first?",
        answer:
          "Yes — start with a weekend or live online course while employed, then move to the intensive TechReady programme when you're ready to commit fully.",
      },
      {
        question: "Will I actually get placement support as a career changer?",
        answer:
          "Yes. Our placement team supports career changers the same way as any other student — resume, mock interviews, and direct introductions to 100+ hiring partners.",
      },
    ],
  },

  // ─── 9. COEP students → CareerCode ─────────────────────────────────────────
  // P4-18 first college-specific page. COEP (College of Engineering Pune) is
  // Pune's top-tier engineering college — narrow keyword target with
  // higher conversion intent than the generic "engineering students"
  // page. Footer + courses-for-you index pick this up automatically via
  // the existing AudienceLanding plumbing.
  {
    slug: "coep-students",
    name: "COEP students",
    tagline:
      "Practical industry skills + placement prep alongside your COEP degree.",
    metaTitle: "Coding Classes for COEP Students in Pune (2026)",
    metaDescription:
      "COEP students: build the placement-ready coding and project skills your syllabus doesn't fully cover. Archer Infotech — Kothrud — Java, Full Stack, Python, Data, Cloud. Semester-by-semester pacing.",
    h1: "Coding Classes for COEP Students in Pune",
    intro: [
      "COEP (College of Engineering Pune) is one of India's top-tier engineering colleges, and its placement cell consistently delivers strong campus drives. But the gap that matters at the offer stage isn't your degree — it's whether you've built real applications, contributed to GitHub, mastered a modern stack, and rehearsed the interview patterns Pune's product companies actually test. That practical layer is exactly what Archer Infotech adds.",
      "We're a short rickshaw or PMPML ride from COEP's Shivajinagar campus to our Kothrud centre — close enough to fit batches around your academic calendar without sacrificing core study time. Many COEP students join us in 2nd or 3rd year to compound skills before campus placements arrive in 4th year. Earlier you start, the more your final-year interviews feel like a recap, not a scramble.",
    ],
    forYou: [
      "You're a COEP undergrad (BE / BTech) in any branch — CS, IT, ENTC, Mech, Civil, Instrumentation",
      "Your COEP placement record is strong, but you want practical depth your syllabus doesn't fully cover",
      "You're aiming at top product companies (Walmart, Microsoft, Atlassian, NetApp) or fast-growing GCCs",
      "You want internship + interview preparation that fits around COEP's heavy academic load",
      "You want to compound skills semester-by-semester rather than cram in final year",
    ],
    programme: {
      bootcampSlug: "careercode",
      bootcampName: "CareerCode",
      pitch:
        "CareerCode is our semester-by-semester programming track designed for engineering students. COEP students typically join in 2nd or 3rd year — six specialisation paths, real projects, GitHub workflow, and mock-interview reps that line up with COEP's academic calendar.",
    },
    alsoConsiderCourseSlugs: [
      "java-full-stack-training-in-pune",
      "mern-stack-training-in-pune",
      "python-training-in-pune",
      "data-science-training-in-pune",
      "aws-solutions-architect-training-in-pune",
    ],
    whatYouGain: [
      "A production-grade portfolio of real projects to show campus and off-campus recruiters",
      "Deep familiarity with one stack (Java Full Stack, MERN, Python, Data or Cloud) — not a shallow cross-section",
      "Mock interview reps against the question patterns Pune's top employers actually use",
      "An internship referral pipeline through our 100+ hiring partner network",
      "Skills built steadily across COEP's semesters so final-year placement season feels prepared, not panicked",
    ],
    eligibility:
      "Open to COEP undergrads in any year and any branch. We tailor the starting point — fundamentals if you're 1st-year, project-focused tracks if you're 3rd/4th-year. No pre-requisite stack required.",
    whyArcher: [
      "Our 6-person faculty has 54+ combined years of industry experience at Pune MNCs (Capgemini, Tech Mahindra, MindTree, Amdocs) — so what we teach is calibrated to what hiring panels at companies COEP students target actually expect. Founder Yogesh Patil personally leads the flagship Java and Cloud tracks.",
      "We're at Kothrud (10-12 min from COEP via Karve Road or Senapati Bapat Marg). 17+ years training Pune engineering students, 10,000+ trained, 5,000+ placed at MNCs including TCS, Infosys, Wipro, Persistent Systems and 100+ other Pune employers. COEP students consistently rank among our highest-completion-rate cohorts.",
    ],
    faqs: [
      {
        question: "How far is the Archer Kothrud centre from COEP?",
        answer:
          "10-12 minutes by rickshaw or two-wheeler via Karve Road or Senapati Bapat Marg. The PMPML 109 / 110 bus routes also connect Shivajinagar to Kothrud directly. Most COEP students attend evening or weekend batches alongside college.",
      },
      {
        question: "I'm a COEP fresher (1st year) — should I really start now?",
        answer:
          "Yes — and that's our highest-ROI entry point. 1st-year COEP students who start CareerCode finish 3rd year with deep stack expertise and a portfolio. By the time TPO drives start in 4th year, your interview prep is already done. Earlier the better.",
      },
      {
        question:
          "Will joining Archer conflict with my COEP academic workload?",
        answer:
          "No — CareerCode is built semester-by-semester precisely so it doesn't conflict. Most COEP students attend 2-3 evenings a week plus Saturday batches. Pacing is tailored to your semester schedule, and we provide LMS lifetime access so you can catch up during exam weeks.",
      },
      {
        question: "Do you help with off-campus placements at top companies?",
        answer:
          "Yes. Beyond COEP's campus drives, our placement team runs off-campus referrals to 100+ hiring partners — TCS, Infosys, Wipro, Tech Mahindra, Persistent, Capgemini, Cognizant, plus product startups. Mock interviews and resume review are included in every flagship course fee.",
      },
      {
        question: "Which track should a COEP CS student pick — Java FS or MERN?",
        answer:
          "Both are strong. Java Full Stack opens more Pune MNC roles (TCS, Infosys, Persistent's enterprise teams). MERN opens more product-startup and GCC roles (Walmart Labs, Atlassian, NetApp). Pick based on the company tier you're targeting — and we're happy to map this out in a free demo.",
      },
      {
        question: "Is there a discount for COEP students?",
        answer:
          "We don't run college-specific discounts because we keep base fees transparent and competitive. We do run EMI options on every flagship course and seasonal fee offers — ask the admissions team during your free demo for current offers.",
      },
    ],
  },

  // ─── 10. PICT students → CareerCode ────────────────────────────────────────
  // P4-18 second college page. PICT (Pune Institute of Computer Technology)
  // is a top private engineering college with strong placements in software
  // product companies and GCC captives.
  {
    slug: "pict-students",
    name: "PICT students",
    tagline:
      "Build deep stack skills + interview prep alongside your PICT degree.",
    metaTitle: "Coding Classes for PICT Students in Pune (2026)",
    metaDescription:
      "PICT students: deepen your stack expertise and interview prep beyond the syllabus. Archer Infotech — Kothrud — Java FS, MERN, Python, Data, Cloud with mock interviews and 100+ hiring partners.",
    h1: "Coding Classes for PICT Students in Pune",
    intro: [
      "PICT (Pune Institute of Computer Technology) consistently ships students into top product companies — Walmart Labs, Microsoft, Atlassian, NetApp — and into the GCC captives of Pune's MNCs. The PICT placement cell is strong, but the difference between an offer and a top-tier offer almost always comes down to how deeply you know one stack, how clean your GitHub looks, and how rehearsed your interview answers are. That depth layer is exactly what Archer Infotech adds on top of your PICT coursework.",
      "We're a 15-minute drive from PICT's Dhankawadi campus to our Kothrud centre — easy on a Saturday morning batch or two weekday evenings. PICT students typically join us in 2nd or 3rd year to build stack expertise before campus placements, with full LMS access so prep doesn't stop during exam weeks.",
    ],
    forYou: [
      "You're a PICT undergrad (BE / BTech) in CS, IT, or ENTC",
      "Your placement record is strong but you want top-tier product company offers",
      "You'd rather go deep on one stack than survey-level on many",
      "You want mock interview reps before TPO drives start in 4th year",
      "You want a portfolio that holds up under technical scrutiny",
    ],
    programme: {
      bootcampSlug: "careercode",
      bootcampName: "CareerCode",
      pitch:
        "CareerCode runs semester-by-semester so PICT students can layer real stack depth (Java FS, MERN, Python or Data) on top of their CS syllabus without dropping academic load. Includes GitHub workflow, project portfolio, and the interview-question patterns Pune product companies actually use.",
    },
    alsoConsiderCourseSlugs: [
      "java-full-stack-training-in-pune",
      "mern-stack-training-in-pune",
      "python-training-in-pune",
      "data-science-training-in-pune",
      "machine-learning-training-in-pune",
    ],
    whatYouGain: [
      "Deep proficiency in one stack instead of shallow coverage of many",
      "A portfolio of production-quality projects with clean GitHub history",
      "Mock interview reps against real Pune product company question patterns",
      "Internship referral pipeline through 100+ hiring partners",
      "Steady skill compounding across PICT's semesters",
    ],
    eligibility:
      "Open to PICT undergrads in any year. CS/IT branch students start at the project-focused tracks; we tailor pacing for 1st/2nd-year students who want to compound earlier.",
    whyArcher: [
      "Our 6-person faculty has 54+ combined years of industry experience at Pune MNCs (Capgemini, Tech Mahindra, MindTree, Amdocs). For PICT CS students aiming at product roles, we calibrate the stack work and interview prep to the question patterns those companies actually test — DSA, system design fundamentals, framework internals.",
      "Kothrud centre is 15 min from PICT Dhankawadi. 17+ years of training Pune engineering students, 10,000+ trained, 5,000+ placed at MNCs + product companies. Many of our top placed alumni came in as 2nd/3rd-year PICT students, finished with deep stack expertise, and converted both campus and off-campus offers.",
    ],
    faqs: [
      {
        question: "How far is the Archer Kothrud centre from PICT Dhankawadi?",
        answer:
          "Roughly 15 minutes by two-wheeler via Sinhgad Road and Karve Road. PMPML connections also link Dhankawadi to Kothrud directly. Most PICT students attend evening batches plus Saturday sessions.",
      },
      {
        question: "PICT placements are already strong — why add Archer?",
        answer:
          "The PICT placement cell delivers solid offers, but top-tier product company packages (Walmart Labs, Atlassian, NetApp) usually go to students with deep stack expertise and rehearsed system-design answers. Archer's CareerCode adds that depth layer on top of your CS coursework so you're not relying on the placement cell alone.",
      },
      {
        question: "Which stack should a PICT CS student pick?",
        answer:
          "If you're targeting Pune MNC enterprise teams (TCS, Infosys, Persistent), Java Full Stack opens the widest pipeline. If you're targeting product startups or GCCs (Walmart Labs, Atlassian), MERN + a strong DSA layer is more aligned. We map your target list to a specific stack during your free demo.",
      },
      {
        question: "Can I manage Archer batches alongside PICT's heavy CS load?",
        answer:
          "Yes — CareerCode is built precisely for semester-pacing. Most PICT students attend 2 evenings + Saturday batches with lifetime LMS access for exam weeks. We tune the schedule to your academic calendar.",
      },
      {
        question: "Do you help PICT students with product company off-campus drives?",
        answer:
          "Yes. Beyond PICT's campus drives, our placement team runs targeted off-campus referrals to 100+ partners including product startups and GCCs. Mock interviews and resume review are included in every flagship course fee.",
      },
      {
        question: "Is there a fast-track for PICT 3rd/4th-year students?",
        answer:
          "Yes — our flagship courses (Java Full Stack, MERN, Python, DS) are 3-6 month tracks designed to ship interview-ready before campus placements. Best if you start at the start of 3rd year; still very doable in early 4th year.",
      },
    ],
  },

  // ─── 11. VIT Pune students → CareerCode ────────────────────────────────────
  // P4-18 third college page. VIT (Vishwakarma Institute of Technology),
  // Bibwewadi is a top private autonomous engineering college with strong
  // industry connections.
  {
    slug: "vit-pune-students",
    name: "VIT Pune students",
    tagline: "Production-grade stack + project portfolio alongside your VIT degree.",
    metaTitle: "Coding Classes for VIT Pune Students (2026)",
    metaDescription:
      "VIT Pune students: build the production-grade stack + portfolio that converts campus drives into top offers. Archer Infotech — Kothrud — Java FS, MERN, Python, Data, Cloud with placement assistance.",
    h1: "Coding Classes for VIT Pune Students",
    intro: [
      "VIT Pune (Vishwakarma Institute of Technology) in Bibwewadi runs a strong autonomous BE programme with solid placement connections — TCS, Infosys, Wipro, Cognizant, Capgemini and growing product company access. The standard VIT placement pipeline opens at 3rd year; what gets you the upper-band offers is whether you've already built production-grade projects, mastered a stack, and rehearsed system-design questions before drives start.",
      "We're a 15-20 minute drive from VIT Bibwewadi to our Kothrud centre via Sinhgad Road. VIT students typically join CareerCode in 2nd or 3rd year so the stack work compounds across semesters and the portfolio is ready when campus drives arrive.",
    ],
    forYou: [
      "You're a VIT Pune undergrad in CS, IT, ENTC or AI/DS branch",
      "VIT's placement record is good but you want top-band offers, not median ones",
      "You want depth in one stack (Java FS, MERN, Python, Data) over breadth",
      "You want a real GitHub portfolio + DSA rehearsal before TPO drives",
      "You're comfortable splitting time between VIT coursework and after-college batches",
    ],
    programme: {
      bootcampSlug: "careercode",
      bootcampName: "CareerCode",
      pitch:
        "CareerCode pairs VIT's autonomous BE syllabus with production-stack depth — Java FS, MERN, Python or Data + project portfolio + interview prep. Pacing fits VIT's academic calendar; LMS access covers exam-week catchup.",
    },
    alsoConsiderCourseSlugs: [
      "java-full-stack-training-in-pune",
      "mern-stack-training-in-pune",
      "python-training-in-pune",
      "data-science-training-in-pune",
      "aws-solutions-architect-training-in-pune",
    ],
    whatYouGain: [
      "Production-stack expertise that matches Pune product company hiring bars",
      "A portfolio of real projects with proper Git workflow and documentation",
      "Mock interview reps for DSA + system-design + behavioural rounds",
      "Internship + placement referrals through 100+ hiring partners",
      "A steady skill ramp that doesn't conflict with VIT's academic load",
    ],
    eligibility:
      "Open to VIT Pune undergrads (BE) in any year and any branch. CS/IT/AI students start at project tracks; mechanical / civil / ENTC students start at fundamentals — no prior coding experience required.",
    whyArcher: [
      "Our trainers are working professionals from Pune MNCs (Capgemini, Tech Mahindra, MindTree, Amdocs) plus product-startup leaders. For VIT students aiming at Pune's growing product ecosystem, we calibrate the curriculum to what those hiring panels actually test — not generic syllabus content.",
      "Kothrud centre is 15-20 min from VIT Bibwewadi via Sinhgad Road. 17+ years in Pune training, 10,000+ trained, 5,000+ placed at MNCs and product companies, 100+ active hiring partners. Many of our top placed alumni are former VIT students who joined CareerCode in 2nd/3rd year.",
    ],
    faqs: [
      {
        question: "How far is Archer Kothrud from VIT Bibwewadi?",
        answer:
          "Roughly 15-20 minutes by two-wheeler or rickshaw via Sinhgad Road and Karve Road. PMPML routes connect Bibwewadi to Kothrud. Most VIT students attend evening + weekend batches.",
      },
      {
        question: "I'm a VIT 2nd-year student — should I start now?",
        answer:
          "Yes — that's our highest-ROI entry point. Starting in 2nd year lets you finish 3rd year with deep stack expertise. By the time VIT's TPO drives open in 3rd/4th year, your portfolio + interview prep is already done. Earlier the better.",
      },
      {
        question: "VIT is autonomous and has a rigorous BE syllabus — will Archer add too much load?",
        answer:
          "CareerCode's semester pacing is built specifically to coexist with rigorous autonomous syllabi. 2 evenings + Saturday batches is the typical load; LMS lifetime access lets you catch up during exam weeks without losing the cohort.",
      },
      {
        question: "Which stack should a VIT CS student pick?",
        answer:
          "Java Full Stack opens the widest Pune MNC pipeline. MERN + DSA layer is sharper for GCC captives and product startups. Data Science is the right pick if you've enjoyed VIT's stats / data courses. We map your interest + target companies to a specific stack during your free demo.",
      },
      {
        question: "Do you help with off-campus drives at top product companies?",
        answer:
          "Yes. Beyond VIT's TPO drives, our placement team runs off-campus referrals to product startups (Atlassian, Walmart Labs, NetApp area) plus 100+ MNC and GCC partners. Mock interviews and resume review are included.",
      },
      {
        question: "What's the typical Archer outcome for a VIT student?",
        answer:
          "A 3-6 month flagship track + sustained CareerCode pacing typically produces a ₹4-6 LPA fresher band offer (₹10+ LPA for top performers in Java FS / MERN / DS / DevOps). Offer quality depends on stack depth, interview prep consistency, and target company list.",
      },
    ],
  },

  // ─── 12. MIT-WPU students → CareerCode ─────────────────────────────────────
  // P4-18 fourth college page. MIT-WPU (MIT World Peace University) is a
  // large multi-discipline private university with growing CS/IT
  // enrollment.
  {
    slug: "mit-wpu-students",
    name: "MIT-WPU students",
    tagline: "Build job-ready coding + projects alongside your MIT-WPU degree.",
    metaTitle: "Coding Classes for MIT-WPU Students in Pune (2026)",
    metaDescription:
      "MIT-WPU students: layer industry-ready coding skills + a real portfolio on top of your degree. Archer Infotech — Kothrud — Java FS, MERN, Python, Data, Cloud with mock interviews + placement support.",
    h1: "Coding Classes for MIT-WPU Students in Pune",
    intro: [
      "MIT-WPU (MIT World Peace University) runs Pune's largest private CS + IT engineering programmes by intake, spanning BTech, BCA, MCA and multiple electives. The breadth of MIT-WPU's syllabus means most students leave with a solid theoretical base — but the offers that move you from median to top-band are won on stack depth, portfolio quality and interview rehearsal. That's where Archer Infotech's CareerCode fits on top of your academic load.",
      "We're a 15-20 minute drive from MIT-WPU's Kothrud campus to our centre — same neighbourhood, so commute time barely affects your academic schedule. MIT-WPU students typically join in 2nd or 3rd year to compound stack expertise before TPO drives.",
    ],
    forYou: [
      "You're a MIT-WPU undergrad (BTech / BCA) in CS, IT, AI/DS or related branch",
      "Your degree gives you breadth; you want depth on one stack + interview prep",
      "You want a job-ready portfolio before campus drives, not just a transcript",
      "You're targeting Pune MNCs, GCCs or product startups",
      "You prefer steady skill ramp over final-year cramming",
    ],
    programme: {
      bootcampSlug: "careercode",
      bootcampName: "CareerCode",
      pitch:
        "CareerCode is a semester-by-semester programming track built for engineering and CS students. MIT-WPU students typically pick Java Full Stack, MERN, Python or Data Science as their primary stack, then layer in placement-focused project work and interview prep.",
    },
    alsoConsiderCourseSlugs: [
      "java-full-stack-training-in-pune",
      "mern-stack-training-in-pune",
      "python-training-in-pune",
      "data-science-training-in-pune",
      "devops-training-in-pune",
    ],
    whatYouGain: [
      "Deep stack proficiency (one of Java FS, MERN, Python, Data, Cloud / DevOps)",
      "A production-quality project portfolio with clean GitHub history",
      "Mock interview reps for DSA, framework internals, and HR rounds",
      "Internship referrals through our 100+ Pune hiring partner network",
      "Pacing that fits MIT-WPU's semester calendar without disrupting academics",
    ],
    eligibility:
      "Open to MIT-WPU students across BTech, BCA, MCA and related programmes. CS / IT students can dive into project-focused tracks; non-CS branches start at fundamentals — no prior coding experience required.",
    whyArcher: [
      "Our 6-person faculty has 54+ combined years of Pune MNC experience (Capgemini, Tech Mahindra, MindTree, Amdocs). For MIT-WPU students, that means the stack work and interview prep mirror exactly what hiring panels at Pune MNCs and GCCs test on placement day — not academic-theory rephrased.",
      "Our Kothrud centre is the same neighbourhood as MIT-WPU's campus (15-20 min drive). 17+ years training Pune engineering students, 10,000+ trained, 5,000+ placed at TCS, Infosys, Persistent, Tech Mahindra, Wipro, Capgemini and 100+ other employers.",
    ],
    faqs: [
      {
        question: "How far is Archer Kothrud from MIT-WPU's campus?",
        answer:
          "15-20 minutes by two-wheeler — same neighbourhood. Many MIT-WPU students cycle or use rickshaws. Evening batches fit easily after college lectures end.",
      },
      {
        question: "I'm in MIT-WPU's BCA programme — is CareerCode the right fit?",
        answer:
          "Yes. BCA students benefit massively from CareerCode because the programme adds the production-stack depth that gets you treated like a CS/IT candidate at placement panels. Java Full Stack and MERN are the most common picks for BCA students.",
      },
      {
        question: "Will Archer batches conflict with MIT-WPU's academic load?",
        answer:
          "No — semester pacing is designed for this. 2 evenings + Saturday is typical; LMS lifetime access covers exam-week catchup so you don't lose the cohort.",
      },
      {
        question: "What's the typical placement outcome for MIT-WPU students who join Archer?",
        answer:
          "Most flagship-course graduates land ₹4-6 LPA fresher offers, with top performers in Java FS / MERN / DS / DevOps crossing ₹10 LPA. Outcomes scale with stack depth + interview prep consistency, not just the certificate.",
      },
      {
        question: "Do you cover AI / ML for MIT-WPU AI&DS students?",
        answer:
          "Yes — Data Science and Machine Learning tracks pair well with MIT-WPU's AI&DS curriculum. Generative AI track is also strong if you're interested in LLMs, RAG, LangChain and the modern AI stack.",
      },
      {
        question: "Is there a separate batch for MIT-WPU students?",
        answer:
          "No — you join the regular CareerCode cohort. That's actually a feature: mixed-college batches expose you to students from COEP, PICT, VIT, BVUC and other colleges, which is closer to the real workplace mix.",
      },
    ],
  },

  // ─── 13. PCCOE students → CareerCode ───────────────────────────────────────
  // P4-18 fifth college page. PCCOE (Pimpri Chinchwad College of Engineering)
  // sits in the Akurdi/Nigdi belt — adjacent to Hinjewadi IT corridor, which
  // is its biggest placement advantage.
  {
    slug: "pccoe-students",
    name: "PCCOE students",
    tagline:
      "Stack depth + interview prep alongside your PCCOE degree, with the Hinjewadi pipeline in mind.",
    metaTitle: "Coding Classes for PCCOE Students in Pune (2026)",
    metaDescription:
      "PCCOE students: build the production-stack depth + interview prep to convert Hinjewadi IT proximity into top offers. Archer Infotech — Kothrud + online — Java FS, MERN, Python, Data, Cloud.",
    h1: "Coding Classes for PCCOE Students in Pune",
    intro: [
      "PCCOE (Pimpri Chinchwad College of Engineering) sits in the Akurdi-Nigdi belt — right next to the Hinjewadi IT corridor, home to Infosys, TCS, Wipro, Cognizant and dozens of GCC captives. That proximity is PCCOE's biggest hiring advantage: campus drives reach you early and recruiters know the college. What separates the median PCCOE offer from a top-band one is the same lever as everywhere else — stack depth, portfolio quality, and rehearsed interview answers.",
      "PCCOE is about 30 km from our Kothrud centre, so most PCCOE students join us in online (live instructor-led) batches that cover the same curriculum as classroom cohorts. For students who prefer in-person, Saturday classroom + weekday online is a common pattern. CareerCode pacing is built to layer on top of PCCOE's academic load.",
    ],
    forYou: [
      "You're a PCCOE undergrad (BE / BTech) in CS, IT, ENTC, AI&DS or related branch",
      "You want to convert Hinjewadi-proximity placement drives into top-band offers",
      "You'd rather go deep on one stack than survey across many",
      "You want mock interview reps + portfolio polish before campus drives",
      "Online + occasional in-person batches fit your schedule better than daily commute",
    ],
    programme: {
      bootcampSlug: "careercode",
      bootcampName: "CareerCode",
      pitch:
        "CareerCode runs in both classroom and live-online formats so PCCOE students can pick the schedule that fits their commute. The curriculum, projects, interview prep and placement support are identical across formats.",
    },
    alsoConsiderCourseSlugs: [
      "java-full-stack-training-in-pune",
      "mern-stack-training-in-pune",
      "python-training-in-pune",
      "aws-solutions-architect-training-in-pune",
      "devops-training-in-pune",
    ],
    whatYouGain: [
      "Production stack expertise calibrated to Hinjewadi-belt hiring patterns (Java FS, MERN, Cloud, DevOps)",
      "A project portfolio recruiters at Infosys / TCS / Wipro / Cognizant actually look for",
      "Mock interview reps for DSA + framework internals + behavioural rounds",
      "Resume + LinkedIn polish that surfaces in recruiter searches",
      "100+ Pune hiring partner network for off-campus referrals",
    ],
    eligibility:
      "Open to PCCOE students across all years and branches. CS / IT / AI&DS students start at project tracks; other branches start at fundamentals — no prior coding required.",
    whyArcher: [
      "Our 6-person faculty has 54+ combined years at Pune MNCs (Capgemini, Tech Mahindra, MindTree, Amdocs) — exactly the hiring panels PCCOE students face most often. Online batches are live instructor-led, not recorded, so PCCOE students get the same Q&A access as classroom students.",
      "17+ years training Pune engineering students; 10,000+ trained; 5,000+ placed at TCS, Infosys, Wipro, Tech Mahindra, Persistent and 100+ other Pune-belt employers. Our Hinjewadi-corridor placement record is among our strongest.",
    ],
    faqs: [
      {
        question: "PCCOE is in Akurdi — that's far from Kothrud. How does this work?",
        answer:
          "Most PCCOE students join our live online (live instructor-led) batches — same curriculum, projects, Q&A access and placement support as classroom cohorts. For students who want some in-person time, Saturday classroom + weekday online is a popular pattern.",
      },
      {
        question: "Will Archer help me with Hinjewadi-belt campus drives?",
        answer:
          "Yes — Hinjewadi MNC drives (Infosys, TCS, Wipro, Cognizant, Capgemini) are the natural hiring path for PCCOE students. Our trainers are working professionals from these companies, so the interview prep and stack work map directly to their question patterns.",
      },
      {
        question: "Which stack converts best for a PCCOE CS student?",
        answer:
          "Java Full Stack opens the widest pipeline at Hinjewadi MNCs. MERN is sharper for GCC captives and product startups. DevOps + Cloud (AWS) is rising fast in the Hinjewadi belt — and pays well at fresher level if you build a real portfolio.",
      },
      {
        question: "Will online batches give the same outcomes as classroom?",
        answer:
          "Yes. Curriculum, project work, mock interviews and placement referrals are identical. The only difference is the format. We have years of placement data confirming online cohorts deliver the same outcomes when students engage consistently.",
      },
      {
        question: "Do you cover the AI&DS branch curriculum?",
        answer:
          "Yes — our Data Science, Machine Learning, and Generative AI tracks pair very well with PCCOE's AI&DS syllabus. Students typically pick DS / ML as primary and add GenAI as a second specialisation.",
      },
      {
        question: "Are there EMI options for PCCOE students?",
        answer:
          "Yes — every flagship course supports EMI. Ask the admissions team during your free demo for current EMI partners and seasonal offers.",
      },
    ],
  },

  // ─── 14. AISSMS COE students → CareerCode ──────────────────────────────────
  // P4-18 sixth college page. AISSMS COE in Shivajinagar — central Pune,
  // legacy engineering college with broad branch coverage.
  {
    slug: "aissms-coe-students",
    name: "AISSMS COE students",
    tagline: "Industry-ready stack + portfolio alongside your AISSMS COE degree.",
    metaTitle: "Coding Classes for AISSMS COE Students Pune (2026)",
    metaDescription:
      "AISSMS COE students: build the production-grade coding skills + interview prep that convert campus drives into top offers. Archer Infotech — Kothrud — Java FS, MERN, Python, Data, Cloud with 100+ partners.",
    h1: "Coding Classes for AISSMS COE Students in Pune",
    intro: [
      "AISSMS COE (All India Shri Shivaji Memorial Society's College of Engineering) is a long-running Pune engineering college in Shivajinagar with broad branch coverage — CS, IT, ENTC, Mech, Civil, Production. The placement cell delivers a steady pipeline to Pune MNCs, but the difference between a median offer and a top-band one is the same lever every Pune engineering student faces: how deeply you know one stack, how clean your GitHub is, and how rehearsed your interview answers are.",
      "AISSMS COE is about 10 km from our Kothrud centre via JM Road and Karve Road — typically 20-25 min by two-wheeler or rickshaw. Most AISSMS COE students attend evening or weekend classroom batches, with live-online available for students who prefer schedule flexibility.",
    ],
    forYou: [
      "You're an AISSMS COE undergrad (BE) in any branch",
      "You want to convert AISSMS COE's placement record into top-band offers",
      "You'd rather go deep on one stack than skim across many",
      "You want mock interview reps + GitHub-quality projects before campus drives",
      "Evening + weekend batches fit your AISSMS COE class schedule",
    ],
    programme: {
      bootcampSlug: "careercode",
      bootcampName: "CareerCode",
      pitch:
        "CareerCode pairs AISSMS COE's BE syllabus with production-stack depth. Pacing is built for semester rhythm so your degree work and stack work compound instead of competing for time.",
    },
    alsoConsiderCourseSlugs: [
      "java-full-stack-training-in-pune",
      "mern-stack-training-in-pune",
      "python-training-in-pune",
      "data-science-training-in-pune",
      "aws-solutions-architect-training-in-pune",
    ],
    whatYouGain: [
      "Deep stack expertise in one track (Java FS, MERN, Python, Data, Cloud)",
      "A production-quality project portfolio with clean Git history",
      "Mock interview reps that map to Pune MNC question patterns",
      "Internship + placement referrals via our 100+ hiring partner network",
      "Semester-paced ramp that fits AISSMS COE's academic load",
    ],
    eligibility:
      "Open to AISSMS COE undergrads (BE) in any year and branch. CS / IT students start at project tracks; other branches start at fundamentals — no prior coding experience required.",
    whyArcher: [
      "Our 6-person faculty has 54+ combined years at Pune MNCs (Capgemini, Tech Mahindra, MindTree, Amdocs). For AISSMS COE students aiming at services MNCs and growing GCC captives, the stack work and interview prep map directly to their hiring panels.",
      "Kothrud centre is 20-25 min from AISSMS COE via JM Road. 17+ years training Pune engineering students, 10,000+ trained, 5,000+ placed at TCS, Infosys, Wipro, Tech Mahindra, Persistent and 100+ other partners.",
    ],
    faqs: [
      {
        question: "How far is Archer Kothrud from AISSMS COE Shivajinagar?",
        answer:
          "Roughly 20-25 minutes by two-wheeler or rickshaw via JM Road and Karve Road. PMPML routes connect Shivajinagar to Kothrud directly. Most AISSMS COE students attend evening or weekend batches.",
      },
      {
        question: "I'm in AISSMS COE Mechanical / Civil / Production — is this useful?",
        answer:
          "Very. Many of Pune's software hires come from non-CS engineering branches. CareerCode starts from fundamentals, so your branch doesn't limit which software track you can pick. Java Full Stack and Python are the most common entry points.",
      },
      {
        question: "Can I manage Archer alongside AISSMS COE's academic load?",
        answer:
          "Yes — CareerCode semester pacing is built for it. 2 evenings + Saturday batches is typical; LMS lifetime access lets you catch up during exam weeks.",
      },
      {
        question: "What's the typical placement outcome?",
        answer:
          "Flagship-track graduates typically land ₹4-6 LPA fresher band offers, with top performers in Java FS / MERN / DS / DevOps crossing ₹10 LPA. Outcomes scale with stack depth and interview prep consistency, not the certificate alone.",
      },
      {
        question: "Do you help with off-campus drives?",
        answer:
          "Yes. Beyond AISSMS COE's TPO drives, our placement team runs off-campus referrals to 100+ partners — services MNCs, GCC captives, product startups. Mock interviews and resume review are included in every flagship course.",
      },
      {
        question: "Are evening + Saturday batches consistent week-to-week?",
        answer:
          "Yes — batches run on a fixed weekly schedule. Holidays during AISSMS COE's exam weeks are factored in. LMS access lets you watch any missed session.",
      },
    ],
  },

  // ─── 15. Cummins COE for Women students → CareerCode ───────────────────────
  // P4-18 seventh college page. Cummins College of Engineering for Women,
  // Karvenagar — women-only college, very close to Kothrud, strong
  // placement record.
  {
    slug: "cummins-coe-women-students",
    name: "Cummins College of Engineering for Women students",
    tagline: "Industry-ready coding + interview prep alongside your Cummins COE degree.",
    metaTitle: "Coding Classes for Cummins COE Women Students (2026)",
    metaDescription:
      "Cummins College of Engineering for Women students: build job-ready stack depth + portfolio + interview prep. Archer Infotech — Kothrud (10 min from Karvenagar) — Java FS, MERN, Python, Data, Cloud.",
    h1: "Coding Classes for Cummins COE for Women Students",
    intro: [
      "Cummins College of Engineering for Women in Karvenagar is one of Pune's longest-running women's engineering colleges, with a strong placement record across MNCs and product companies. The placement cell delivers solid offers — what unlocks the top-band ones (and the product company / GCC roles) is the same as for every engineering college: stack depth, portfolio quality, and rehearsed technical interviews. Archer Infotech sits 10 minutes from Karvenagar, so commute is barely a constraint.",
      "Many Cummins COE students join CareerCode in 2nd or 3rd year so the stack work compounds across semesters and the portfolio is ready when campus drives begin. We also see a strong contingent of working-professional alumni (Cummins COE batchmates) attending evening and weekend batches together — peer continuity that matters.",
    ],
    forYou: [
      "You're a Cummins COE for Women undergrad (BE) in CS, IT, ENTC, Mech or related branch",
      "You want to convert Cummins COE's strong placement record into top-band offers",
      "You'd rather build one stack deeply than skim broadly",
      "You want a mixed-college peer environment to mirror real workplace teams",
      "Evening / weekend batches fit your academic load and any home obligations",
    ],
    programme: {
      bootcampSlug: "careercode",
      bootcampName: "CareerCode",
      pitch:
        "CareerCode runs semester-by-semester so Cummins COE students can layer stack expertise on top of their degree. The Karvenagar↔Kothrud commute is 10 minutes — easy on a Saturday morning or after college.",
    },
    alsoConsiderCourseSlugs: [
      "java-full-stack-training-in-pune",
      "mern-stack-training-in-pune",
      "python-training-in-pune",
      "data-science-training-in-pune",
      "machine-learning-training-in-pune",
    ],
    whatYouGain: [
      "Production-stack depth in one track (Java FS, MERN, Python, Data, Cloud)",
      "A real portfolio of projects with clean Git history",
      "Mock interview reps for DSA + system design + behavioural rounds",
      "Internship + placement referrals via our 100+ hiring partner network",
      "A peer cohort of women in engineering compounding skills together",
    ],
    eligibility:
      "Open to all Cummins COE for Women undergrads (BE) in any year and branch. Tailored starting point — fundamentals if you're 1st-year, project-focused if you're 3rd/4th-year.",
    whyArcher: [
      "Our 6-person faculty has 54+ combined years of industry experience at Pune MNCs (Capgemini, Tech Mahindra, MindTree, Amdocs) — exactly the hiring panels Cummins COE students target. We've trained women engineers from Cummins COE across batches with consistent placement outcomes.",
      "Our Kothrud centre is 10 minutes from Cummins COE Karvenagar. 17+ years training Pune engineering students, 10,000+ trained, 5,000+ placed at TCS, Infosys, Wipro, Tech Mahindra, Persistent, Capgemini and 100+ other partners.",
    ],
    faqs: [
      {
        question: "How far is Archer Kothrud from Cummins COE Karvenagar?",
        answer:
          "About 10 minutes by two-wheeler, rickshaw or PMPML — same neighbourhood. Most Cummins COE students attend evening + Saturday batches without significant commute time.",
      },
      {
        question: "Are there women-only batches?",
        answer:
          "No — you join the regular CareerCode cohort, which intentionally mixes students from COEP, PICT, VIT, Cummins COE, MIT-WPU and other colleges. That mix mirrors real Pune workplaces and is an asset, not a downside.",
      },
      {
        question: "Which stack converts best for a Cummins COE CS student?",
        answer:
          "Java Full Stack opens the widest Pune MNC pipeline. MERN is sharper for product startups and GCC captives. Data Science / ML is the right pick if you've enjoyed Cummins COE's data / analytics courses. We map your interest + target list to a stack in your free demo.",
      },
      {
        question: "Will Archer help with companies that have women-focused hiring drives?",
        answer:
          "Yes. Many Pune MNCs (TCS, Infosys, Wipro) and GCC captives run women-only or women-priority hiring drives. Our placement team flags these and supports interview prep against their specific question patterns.",
      },
      {
        question: "Can I take CareerCode while balancing home obligations?",
        answer:
          "Yes — evening + Saturday is the most common pattern, and live-online is an option for students who can't commit to fixed in-person time. LMS access covers any missed session.",
      },
      {
        question: "What's the typical outcome for a Cummins COE student?",
        answer:
          "Flagship-track graduates typically land ₹4-6 LPA fresher band offers, with top performers in Java FS / MERN / DS / DevOps crossing ₹10 LPA. Outcomes depend on stack depth + interview prep consistency, not gender or college.",
      },
    ],
  },

  // ─── 16. VIIT students → CareerCode ────────────────────────────────────────
  // P4-18 eighth college page. VIIT (Vishwakarma Institute of Information
  // Technology) in Kondhwa Budruk — sister college to VIT Pune, focused
  // more on IT/CS placements.
  {
    slug: "viit-students",
    name: "VIIT students",
    tagline: "Build deep IT stack + project portfolio alongside your VIIT degree.",
    metaTitle: "Coding Classes for VIIT Pune Students (2026)",
    metaDescription:
      "VIIT (Vishwakarma Institute of Information Technology) students: build production-stack depth + portfolio + interview prep. Archer Infotech — Kothrud + online — Java FS, MERN, Python, Data, Cloud.",
    h1: "Coding Classes for VIIT Pune Students",
    intro: [
      "VIIT (Vishwakarma Institute of Information Technology), the Bansilal Ramnath Agarwal Charitable Trust college in Kondhwa Budruk, runs a strong IT-focused engineering programme with consistent placement outcomes. The placement record is solid; the gap between the median offer and a top-band one is the same lever every Pune engineering college faces: stack depth, production-quality projects, and interview readiness.",
      "VIIT is roughly 15-20 km from our Kothrud centre, so most VIIT students opt for our live-online batches (same curriculum, instructors, mock interviews and placement support as classroom). For students who want occasional in-person time, Saturday classroom + weekday online is a common pattern.",
    ],
    forYou: [
      "You're a VIIT undergrad (BE / BTech) in CS, IT, ENTC, AI/DS or related branch",
      "You want VIIT's IT-focused syllabus to translate into top-band Pune offers",
      "You'd rather build deep on one stack than skim across many",
      "You want production-quality projects + mock interview reps before TPO drives",
      "Online + occasional in-person batches fit your schedule better than daily commute",
    ],
    programme: {
      bootcampSlug: "careercode",
      bootcampName: "CareerCode",
      pitch:
        "CareerCode runs in both classroom and live-online so VIIT students can pick the format that fits their commute. Curriculum, projects, interview prep and placement referrals are identical across formats.",
    },
    alsoConsiderCourseSlugs: [
      "java-full-stack-training-in-pune",
      "mern-stack-training-in-pune",
      "python-training-in-pune",
      "data-science-training-in-pune",
      "aws-solutions-architect-training-in-pune",
    ],
    whatYouGain: [
      "Production-stack depth in one track (Java FS, MERN, Python, Data, Cloud)",
      "A real GitHub portfolio + interview-ready DSA layer",
      "Mock interview reps for Pune MNC + product company question patterns",
      "Internship + placement referrals via our 100+ hiring partner network",
      "Semester pacing that fits VIIT's IT syllabus load",
    ],
    eligibility:
      "Open to VIIT undergrads in any year and any branch. CS / IT / AI&DS students start at project tracks; other branches start at fundamentals — no prior coding required.",
    whyArcher: [
      "Our 6-person faculty has 54+ combined years at Pune MNCs (Capgemini, Tech Mahindra, MindTree, Amdocs) plus product-startup leadership. For VIIT students, the curriculum and interview prep map directly to the Pune services + product companies most likely to recruit you.",
      "17+ years training Pune engineering students; 10,000+ trained; 5,000+ placed at TCS, Infosys, Wipro, Persistent, Tech Mahindra, Capgemini and 100+ other partners. Live-online format means VIIT's Kondhwa-Kothrud distance is a non-issue.",
    ],
    faqs: [
      {
        question: "VIIT is in Kondhwa — how do I attend Archer Kothrud regularly?",
        answer:
          "Most VIIT students join our live-online batches — same instructors, projects, Q&A access and placement support as classroom. For students who want some classroom time, Saturday in-person + weekday online is the common pattern.",
      },
      {
        question: "How is VIIT different from VIT Pune for Archer's purposes?",
        answer:
          "VIIT and VIT Pune are sister institutions but run as independent colleges with different placement cells and academic calendars. We have dedicated pages for both; the curriculum and outcomes are identical, only the positioning copy differs.",
      },
      {
        question: "Which stack works best for VIIT CS / IT students?",
        answer:
          "Java Full Stack opens the widest Pune MNC pipeline (TCS, Infosys, Persistent). MERN is sharper for GCC captives and product startups. Cloud + DevOps is rising fast and pays well at fresher level if you build a real portfolio.",
      },
      {
        question: "Do online batches really deliver the same outcomes as classroom?",
        answer:
          "Yes — multi-year placement data confirms it. The deciding variables are engagement consistency and project completion, not the format. Most VIIT students prefer online for the commute savings.",
      },
      {
        question: "Will Archer help with VIIT's TPO drives?",
        answer:
          "Yes. Beyond VIIT's TPO drives, our placement team runs off-campus referrals to 100+ partners. Resume polish, mock interviews and recruiter introductions are included in every flagship course.",
      },
      {
        question: "Is there EMI for VIIT students?",
        answer:
          "Yes — every flagship course supports EMI. Ask the admissions team during your free demo for current EMI partners and seasonal offers.",
      },
    ],
  },

  // ─── 17. JSPM RSCOE students → CareerCode ──────────────────────────────────
  // P4-18 ninth college page. JSPM's Rajarshi Shahu College of Engineering
  // in Tathawade — adjacent to Hinjewadi IT corridor.
  {
    slug: "jspm-rscoe-students",
    name: "JSPM RSCOE students",
    tagline: "Hinjewadi-corridor placement-ready stack alongside your RSCOE degree.",
    metaTitle: "Coding Classes for JSPM RSCOE Students Pune (2026)",
    metaDescription:
      "JSPM RSCOE students: build the production-stack depth + interview prep to convert Hinjewadi proximity into top offers. Archer Infotech — Kothrud + live-online — Java FS, MERN, Python, Cloud.",
    h1: "Coding Classes for JSPM RSCOE Students in Pune",
    intro: [
      "JSPM's Rajarshi Shahu College of Engineering (RSCOE) in Tathawade is one of the larger Pune engineering colleges by intake, sitting right next to the Hinjewadi IT corridor. Hinjewadi MNCs — Infosys, TCS, Wipro, Cognizant, Capgemini, plus dozens of GCC captives — are the natural hiring pipeline for RSCOE students, and the campus drives reach you reliably. What converts the median offer into a top-band one is the same lever every engineering college faces: stack depth, GitHub portfolio, and rehearsed interview answers.",
      "RSCOE is about 25 km from our Kothrud centre, so most RSCOE students join our live-online (live instructor-led) batches. Curriculum, projects, mock interviews and placement support are identical to classroom. For occasional in-person time, Saturday classroom + weekday online is a common pattern.",
    ],
    forYou: [
      "You're a JSPM RSCOE undergrad (BE / BTech) in CS, IT, ENTC, AI&DS or related branch",
      "You want Hinjewadi-corridor drives to convert into top-band offers, not median ones",
      "You'd rather build deep on one stack than survey across many",
      "You want production-quality projects + DSA rehearsal before campus drives",
      "Online + occasional in-person fits your schedule better than daily commute to Kothrud",
    ],
    programme: {
      bootcampSlug: "careercode",
      bootcampName: "CareerCode",
      pitch:
        "CareerCode runs in both classroom and live-online formats so RSCOE students can pick whichever fits their commute. Same curriculum, same placement support across formats.",
    },
    alsoConsiderCourseSlugs: [
      "java-full-stack-training-in-pune",
      "mern-stack-training-in-pune",
      "python-training-in-pune",
      "aws-solutions-architect-training-in-pune",
      "devops-training-in-pune",
    ],
    whatYouGain: [
      "Stack depth calibrated to Hinjewadi-belt MNC hiring patterns",
      "A production-quality GitHub portfolio recruiters at TCS / Infosys / Wipro look for",
      "Mock interview reps for DSA + framework internals + behavioural rounds",
      "Internship + placement referrals through 100+ Pune hiring partners",
      "Live-online flexibility so the 25 km RSCOE-Kothrud commute isn't a blocker",
    ],
    eligibility:
      "Open to RSCOE undergrads in any year and any branch. CS / IT / AI&DS start at project tracks; other branches start at fundamentals.",
    whyArcher: [
      "Our 6-person faculty has 54+ combined years at Pune MNCs (Capgemini, Tech Mahindra, MindTree, Amdocs). For RSCOE students aiming at the Hinjewadi belt, our interview prep maps directly to their hiring panels' question patterns.",
      "Live-online format eliminates the RSCOE-Kothrud commute as a barrier. 17+ years training Pune engineering students; 10,000+ trained; 5,000+ placed at TCS, Infosys, Wipro, Tech Mahindra, Persistent and 100+ other partners — many of them via Hinjewadi-belt drives that RSCOE students see directly.",
    ],
    faqs: [
      {
        question: "RSCOE is in Tathawade — how do I attend Archer Kothrud regularly?",
        answer:
          "Most RSCOE students join our live-online batches — same instructors, projects, Q&A access and placement support as classroom. For occasional in-person time, Saturday classroom + weekday online is a common pattern.",
      },
      {
        question: "Hinjewadi drives are already strong for RSCOE — what does Archer add?",
        answer:
          "Hinjewadi drives reach RSCOE reliably, but offer quality maps to stack depth, project portfolio, and interview prep. CareerCode adds those exact layers on top of your BE coursework so you convert into top-band offers, not median ones.",
      },
      {
        question: "Which stack converts best for RSCOE CS / IT students?",
        answer:
          "Java Full Stack opens the widest Hinjewadi MNC pipeline. MERN is sharper for GCC captives and product startups. Cloud + DevOps pays well at fresher level and is rising fast in the Hinjewadi belt.",
      },
      {
        question: "Do online batches deliver the same outcomes as classroom?",
        answer:
          "Yes — multi-year placement data confirms identical outcomes when students engage consistently. Curriculum, project work, mock interviews and referrals are the same. The deciding variable is your engagement, not the format.",
      },
      {
        question: "Will Archer help with off-campus drives?",
        answer:
          "Yes. Beyond RSCOE's TPO drives, our placement team runs off-campus referrals to 100+ partners. Mock interviews and resume polish are included in every flagship course.",
      },
      {
        question: "Is EMI available for RSCOE students?",
        answer:
          "Yes — every flagship course supports EMI. Ask the admissions team during your free demo for current EMI partners and seasonal offers.",
      },
    ],
  },

  // ─── 18. Sinhgad COE students → CareerCode ─────────────────────────────────
  // P4-18 tenth college page. Sinhgad College of Engineering in Vadgaon
  // Budruk — Sinhgad Road belt, broad branch coverage.
  {
    slug: "sinhgad-coe-students",
    name: "Sinhgad COE students",
    tagline: "Industry-ready coding skills alongside your Sinhgad COE degree.",
    metaTitle: "Coding Classes for Sinhgad COE Students Pune (2026)",
    metaDescription:
      "Sinhgad COE students: layer production-grade stack depth + interview prep on top of your engineering degree. Archer Infotech — Kothrud — Java FS, MERN, Python, Cloud, DevOps with placement support.",
    h1: "Coding Classes for Sinhgad COE Students in Pune",
    intro: [
      "Sinhgad College of Engineering in Vadgaon Budruk is part of one of Pune's largest engineering networks (Sinhgad Technical Education Society), with broad branch coverage and steady placement pipelines into Pune MNCs and Hinjewadi-belt employers. The placement record is solid; converting it into top-band offers comes down to the same lever every Pune engineering student faces — stack depth, portfolio quality, rehearsed interview answers.",
      "Sinhgad COE is about 15 km from our Kothrud centre via Sinhgad Road, so most Sinhgad COE students attend evening or weekend classroom batches with live-online as a flexible fallback. CareerCode pacing fits the BE academic calendar.",
    ],
    forYou: [
      "You're a Sinhgad COE undergrad (BE) in CS, IT, ENTC, Mech, Civil or related branch",
      "You want Sinhgad COE's placement record to convert into top-band offers",
      "You'd rather build deep stack expertise than skim breadth",
      "You want mock interviews + project portfolio before campus drives",
      "Evening / weekend batches plus live-online flexibility fit your schedule",
    ],
    programme: {
      bootcampSlug: "careercode",
      bootcampName: "CareerCode",
      pitch:
        "CareerCode runs in both classroom (Kothrud) and live-online formats. Sinhgad COE students pick whichever fits their commute. Curriculum and placement support are identical.",
    },
    alsoConsiderCourseSlugs: [
      "java-full-stack-training-in-pune",
      "mern-stack-training-in-pune",
      "python-training-in-pune",
      "data-science-training-in-pune",
      "devops-training-in-pune",
    ],
    whatYouGain: [
      "Stack depth in one track (Java FS, MERN, Python, Data, Cloud / DevOps)",
      "A production-quality project portfolio with clean Git history",
      "Mock interview reps that map to Pune MNC question patterns",
      "Internship + placement referrals via our 100+ hiring partners",
      "Pacing that fits Sinhgad COE's BE academic calendar",
    ],
    eligibility:
      "Open to Sinhgad COE undergrads in any year and branch. CS / IT students start at project tracks; non-CS branches start at fundamentals — no prior coding required.",
    whyArcher: [
      "Our 6-person faculty has 54+ combined years at Pune MNCs (Capgemini, Tech Mahindra, MindTree, Amdocs). The curriculum and interview prep are calibrated to the hiring panels Sinhgad COE students face most often — Pune services MNCs, Hinjewadi-belt GCCs, growing product companies.",
      "Kothrud centre is 15 min from Sinhgad COE via Sinhgad Road. 17+ years training Pune engineering students, 10,000+ trained, 5,000+ placed at MNCs and product companies including 100+ active hiring partners.",
    ],
    faqs: [
      {
        question: "How far is Archer Kothrud from Sinhgad COE Vadgaon Budruk?",
        answer:
          "Roughly 15 minutes by two-wheeler via Sinhgad Road. PMPML connections also link Vadgaon Budruk to Kothrud. Most Sinhgad COE students attend evening or Saturday classroom batches.",
      },
      {
        question: "Sinhgad has a large student base — do batches still feel personalised?",
        answer:
          "Yes — CareerCode cohorts cap at sizes that keep instructor Q&A access intact. Mixed-college batches expose you to peers from COEP, PICT, VIT, Cummins COE, AISSMS, RSCOE etc — closer to real workplace mix.",
      },
      {
        question: "Which stack works best for a Sinhgad COE CS student?",
        answer:
          "Java Full Stack opens the widest Pune MNC pipeline. MERN is sharper for product startups. DevOps + Cloud (AWS) is rising fast and pays well at fresher level if you build real portfolio work.",
      },
      {
        question: "Will Archer help with TPO drives + off-campus?",
        answer:
          "Yes. Beyond Sinhgad's TPO drives, our placement team runs off-campus referrals to 100+ partners. Mock interviews and resume polish are included in every flagship course fee.",
      },
      {
        question: "Can I balance Archer alongside Sinhgad COE's academic load?",
        answer:
          "Yes — CareerCode is semester-paced for exactly this reason. 2 evenings + Saturday is the typical load; LMS lifetime access covers exam-week catchup.",
      },
      {
        question: "What's the typical placement outcome?",
        answer:
          "Flagship-track graduates typically land ₹4-6 LPA fresher band offers, with top performers in Java FS / MERN / DS / DevOps crossing ₹10 LPA. Outcome depends on stack depth + interview prep consistency.",
      },
    ],
  },

  // ─── 19. MIT-AOE students → CareerCode ─────────────────────────────────────
  // P4-18 eleventh college page. MIT Academy of Engineering (MIT-AOE) in
  // Alandi — distinct from MIT-WPU; engineering-focused autonomous college.
  {
    slug: "mit-aoe-students",
    name: "MIT-AOE students",
    tagline: "Stack depth + portfolio + interview prep alongside your MIT-AOE degree.",
    metaTitle: "Coding Classes for MIT-AOE Students Pune (2026)",
    metaDescription:
      "MIT-AOE (Alandi) students: build production-stack depth, GitHub portfolio and interview prep beyond the syllabus. Archer Infotech — Kothrud + live-online — Java FS, MERN, Python, Cloud.",
    h1: "Coding Classes for MIT-AOE Students in Pune",
    intro: [
      "MIT Academy of Engineering (MIT-AOE) in Alandi is an autonomous engineering college distinct from MIT-WPU's Kothrud campus — its own academic calendar, placement cell and curriculum. The placement pipeline delivers steady Pune MNC and GCC offers; converting median offers into top-band ones is the same lever every Pune engineering college faces — stack depth, GitHub portfolio, rehearsed interview answers.",
      "MIT-AOE Alandi is roughly 25 km from our Kothrud centre, so most MIT-AOE students join our live-online batches (same curriculum, instructors, mock interviews and placement support as classroom). Saturday classroom + weekday online is also a common pattern.",
    ],
    forYou: [
      "You're an MIT-AOE undergrad in CS, IT, ENTC, AI&DS, Mech or related branch",
      "You want autonomous-curriculum strength to convert into top-band placement offers",
      "You'd rather build deep on one stack than skim across many",
      "You want production-quality projects + DSA prep before TPO drives start",
      "Live-online + Saturday classroom fits your Alandi-Kothrud commute pattern",
    ],
    programme: {
      bootcampSlug: "careercode",
      bootcampName: "CareerCode",
      pitch:
        "CareerCode runs in both classroom and live-online formats — pick whichever fits your commute. Same curriculum, same placement support across formats.",
    },
    alsoConsiderCourseSlugs: [
      "java-full-stack-training-in-pune",
      "mern-stack-training-in-pune",
      "python-training-in-pune",
      "data-science-training-in-pune",
      "aws-solutions-architect-training-in-pune",
    ],
    whatYouGain: [
      "Stack depth in one production track (Java FS, MERN, Python, Data, Cloud)",
      "A GitHub portfolio + DSA rehearsal recruiters at Pune MNCs and product companies look for",
      "Mock interview reps for technical + behavioural rounds",
      "Internship + placement referrals via 100+ hiring partners",
      "Live-online flexibility so MIT-AOE's Alandi distance isn't a blocker",
    ],
    eligibility:
      "Open to MIT-AOE undergrads in any year and any branch. CS / IT / AI&DS start at project tracks; other branches start at fundamentals — no prior coding required.",
    whyArcher: [
      "Our 6-person faculty has 54+ combined years at Pune MNCs (Capgemini, Tech Mahindra, MindTree, Amdocs). For MIT-AOE students targeting services MNCs, GCC captives, and growing product companies, the stack work and interview prep match those hiring panels directly.",
      "Live-online format means MIT-AOE Alandi's distance from Kothrud is a non-issue. 17+ years training Pune engineering students; 10,000+ trained; 5,000+ placed at TCS, Infosys, Wipro, Tech Mahindra, Persistent, Capgemini and 100+ other partners.",
    ],
    faqs: [
      {
        question: "How is MIT-AOE different from MIT-WPU for Archer's purposes?",
        answer:
          "MIT-AOE (Alandi) and MIT-WPU (Kothrud) are sister institutions under the MAEER umbrella but run independently — different academic calendars, placement cells, and locations. We have dedicated pages for both because the commute math and college positioning differ meaningfully.",
      },
      {
        question: "MIT-AOE is in Alandi — how do I attend Archer Kothrud regularly?",
        answer:
          "Most MIT-AOE students join our live-online batches — same instructors, projects, Q&A access and placement support as classroom. For occasional in-person time, Saturday classroom + weekday online is a common pattern.",
      },
      {
        question: "Which stack converts best for MIT-AOE CS / IT students?",
        answer:
          "Java Full Stack opens the widest Pune MNC pipeline. MERN is sharper for GCC captives and product startups. AI&DS branch students often pair Data Science with their AI coursework for stronger product company applications.",
      },
      {
        question: "Do online batches really deliver the same outcomes?",
        answer:
          "Yes — multi-year placement data confirms identical outcomes when students engage consistently. The deciding variables are project completion and interview prep frequency, not format.",
      },
      {
        question: "Will Archer help with off-campus drives?",
        answer:
          "Yes. Beyond MIT-AOE's TPO drives, our placement team runs targeted off-campus referrals to 100+ Pune hiring partners. Mock interviews and resume review are included in every flagship course fee.",
      },
      {
        question: "What outcome should I expect?",
        answer:
          "Flagship-track graduates typically land ₹4-6 LPA fresher band offers, with top performers in Java FS / MERN / DS / DevOps crossing ₹10 LPA. Outcomes scale with stack depth + interview prep consistency.",
      },
    ],
  },

  // ─── 20. DYP COE students → CareerCode ─────────────────────────────────────
  // P4-18 twelfth (final) college page. D. Y. Patil College of Engineering in
  // Akurdi — sits in the same Pimpri Chinchwad belt as PCCOE; near Hinjewadi.
  {
    slug: "dypcoe-students",
    name: "D. Y. Patil COE students",
    tagline: "Hinjewadi-corridor stack depth alongside your D. Y. Patil COE degree.",
    metaTitle: "Coding Classes for D. Y. Patil COE Students Pune (2026)",
    metaDescription:
      "D. Y. Patil COE Akurdi students: convert Hinjewadi-corridor proximity into top-band placement offers. Archer Infotech — Kothrud + live-online — Java FS, MERN, Python, Cloud, DevOps with 100+ partners.",
    h1: "Coding Classes for D. Y. Patil COE Students in Pune",
    intro: [
      "D. Y. Patil College of Engineering (DYPCOE) in Akurdi is part of the broader DY Patil education group and sits in the Pimpri Chinchwad belt next to the Hinjewadi IT corridor. That proximity to Infosys, TCS, Wipro, Cognizant, Capgemini and the Hinjewadi GCC captives is DYPCOE's biggest placement advantage. Converting it into top-band offers depends on the same lever as everywhere else: stack depth, portfolio quality, and rehearsed interview answers.",
      "DYPCOE Akurdi is about 30 km from our Kothrud centre, so most DYPCOE students join our live-online batches. Curriculum, projects, mock interviews and placement support are identical to classroom. Saturday classroom + weekday online is a common pattern for students who want occasional in-person time.",
    ],
    forYou: [
      "You're a DYPCOE Akurdi undergrad (BE / BTech) in CS, IT, ENTC, AI&DS or related branch",
      "You want Hinjewadi-corridor drives to convert into top-band offers",
      "You'd rather build deep on one stack than skim across many",
      "You want mock interview reps + project portfolio before campus drives",
      "Live-online + Saturday classroom fits your Akurdi-Kothrud commute",
    ],
    programme: {
      bootcampSlug: "careercode",
      bootcampName: "CareerCode",
      pitch:
        "CareerCode runs in both classroom and live-online formats — DYPCOE students pick whichever fits their commute. Same curriculum, same placement support across formats.",
    },
    alsoConsiderCourseSlugs: [
      "java-full-stack-training-in-pune",
      "mern-stack-training-in-pune",
      "python-training-in-pune",
      "aws-solutions-architect-training-in-pune",
      "devops-training-in-pune",
    ],
    whatYouGain: [
      "Stack depth calibrated to Hinjewadi-belt MNC hiring patterns",
      "A production-quality GitHub portfolio recruiters at TCS / Infosys / Wipro look for",
      "Mock interview reps for DSA + framework internals + behavioural rounds",
      "Internship + placement referrals via our 100+ hiring partner network",
      "Live-online flexibility so the 30 km Akurdi-Kothrud commute isn't a barrier",
    ],
    eligibility:
      "Open to DYPCOE undergrads in any year and any branch. CS / IT / AI&DS start at project tracks; non-CS branches start at fundamentals — no prior coding required.",
    whyArcher: [
      "Our 6-person faculty has 54+ combined years at Pune MNCs (Capgemini, Tech Mahindra, MindTree, Amdocs) — exactly the hiring panels DYPCOE students face most often through Hinjewadi-belt drives. Interview prep maps directly to their question patterns.",
      "Live-online format eliminates the DYPCOE-Kothrud commute as a barrier. 17+ years training Pune engineering students; 10,000+ trained; 5,000+ placed at TCS, Infosys, Wipro, Tech Mahindra, Persistent and 100+ other partners.",
    ],
    faqs: [
      {
        question: "DYPCOE Akurdi is far from Kothrud — how does this work?",
        answer:
          "Most DYPCOE students join our live-online batches — same instructors, projects, Q&A access and placement support as classroom. For occasional in-person time, Saturday classroom + weekday online is the common pattern.",
      },
      {
        question: "How is DYPCOE different from PCCOE for Archer's purposes?",
        answer:
          "Both DYPCOE Akurdi and PCCOE sit in the Pimpri Chinchwad belt with similar Hinjewadi proximity, but they run as separate colleges with their own placement cells and academic calendars. We have dedicated pages for both because the positioning copy differs even when the commute math is similar.",
      },
      {
        question: "Which stack converts best for DYPCOE CS / IT students?",
        answer:
          "Java Full Stack opens the widest Hinjewadi MNC pipeline. MERN is sharper for GCC captives and product startups. Cloud + DevOps (AWS) pays well at fresher level and is rising fast in the Hinjewadi belt.",
      },
      {
        question: "Do online batches deliver the same outcomes as classroom?",
        answer:
          "Yes — multi-year placement data confirms identical outcomes when students engage consistently. The deciding variable is your engagement and project completion, not the batch format.",
      },
      {
        question: "Will Archer help with off-campus drives?",
        answer:
          "Yes. Beyond DYPCOE's TPO drives, our placement team runs off-campus referrals to 100+ partners. Mock interviews, resume polish and recruiter introductions are included.",
      },
      {
        question: "Is EMI available?",
        answer:
          "Yes — every flagship course supports EMI. Ask the admissions team during your free demo for current EMI partners and seasonal offers.",
      },
    ],
  },
];

/** Look up an audience landing page by slug. */
export function getAudience(slug: string): AudienceLanding | undefined {
  return audiences.find((a) => a.slug === slug);
}
