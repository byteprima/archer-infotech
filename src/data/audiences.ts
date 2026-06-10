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
];

/** Look up an audience landing page by slug. */
export function getAudience(slug: string): AudienceLanding | undefined {
  return audiences.find((a) => a.slug === slug);
}
