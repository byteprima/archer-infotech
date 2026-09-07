export interface BootcampModuleTopic {
  title: string;
  description: string;
}

export interface BootcampModule {
  title: string;
  description: string;
  intro?: string;
  topics?: BootcampModuleTopic[];
  outcome?: string;
}

export interface BootcampTrack {
  name: string;
  subtitle: string;
  modules: BootcampModule[];
  skills: string[];
}

export interface BootcampProgram {
  name: string;
  subtitle: string;
  description: string;
  phases: { name: string; duration: string; topics: string[] }[];
  careerRoles: string[];
}

export interface BootcampFAQ {
  question: string;
  answer: string;
}

export interface BootcampCommonModule {
  title: string;
  description: string;
}

export interface BootcampDetail {
  label: string;
  value: string;
}

/**
 * A contextually relevant course page that a bootcamp learner might
 * progress to or pair with. Drives the "Related training programmes"
 * internal-link block on bootcamp detail pages — builds the topic-cluster
 * internal linking surface area Google rewards (P4-13).
 */
export interface BootcampRelatedCourse {
  title: string;
  description: string;
  href: string;
  category: string;
}

export interface BootcampComparisonRow {
  us: string;
  others: string;
}

export interface BootcampComparison {
  headline?: string;
  intro?: string;
  usLabel?: string;
  othersLabel?: string;
  rows: BootcampComparisonRow[];
  /** Closing line under the table. Mirrors the course-page comparison. */
  closing?: string;
}

export interface BootcampToolsGroup {
  label: string;
  items: string[];
}

export interface BootcampToolsAndTech {
  intro?: string;
  groups: BootcampToolsGroup[];
}

export interface BootcampCareerOutcomes {
  intro?: string;
  immediateBenefits: string[];
  longTermPaths: string[];
  /** Cited salary bands. Never publish a band without its source. */
  salaryBands?: BootcampSalaryBand[];
  hiringCompanies?: string[];
  localContext?: { headline: string; body: string };
}

/**
 * Optional learning-path diagram for a bootcamp, rendered above the
 * curriculum module list.
 *
 * A summary, never the source of truth: every word inside the image is
 * invisible to crawlers and to AI engines, so the curriculum below must
 * independently carry the same information as text.
 *
 * Dimensions are required — /images/* is served immutable for a year and
 * these pages hold CLS at 0.00. Version the filename on any update, or
 * nobody sees the new file.
 */
export interface BootcampRoadmapImage {
  /** Path under /public. Use a -vN suffix; the cache is immutable. */
  src: string;
  width: number;
  height: number;
  /** Describes what the diagram shows. Not a transcription of it. */
  alt: string;
  caption?: string;
}

/**
 * Optional gated syllabus PDF, rendered through the same
 * ReportDownloadForm lead-capture flow the course pages use.
 *
 * The PDF is served noindex via X-Robots-Tag (see next.config.ts). It
 * duplicates this page's content by design, so it must never be the
 * indexable copy — the HTML page is canonical, and the PDF is a
 * post-click convenience, not an acquisition asset.
 */
export interface BootcampSyllabusDownload {
  /** Public path under /public/downloads. Versioned filename. */
  pdfUrl: string;
  /** Shown in the form heading and recorded on the lead. */
  title: string;
  /** Feeds the lead `source` tag for admin segmentation. */
  slug: string;
  /** One or two lines of context above the form. */
  blurb: string;
  /**
   * Right-hand panels beside the form on desktop. Write complementary
   * content, not a restatement of the curriculum directly above.
   */
  asideBlocks?: { heading: string; items: string[] }[];
}

/**
 * Course-parity sections.
 *
 * The course pages (see course-content/types.ts) carry a fuller section set
 * than the bootcamp pages did: honest "not for you" filtering, capstone
 * projects, cited salary bands, fees, a structured placement process, and a
 * starting guide. A bootcamp is a bigger commitment than a course, so the
 * absence of those sections was hardest to justify exactly here. These
 * mirror the course shapes deliberately, so the two stay conceptually
 * aligned and a reader moving between the two page types is not relearning
 * a layout.
 */
export interface BootcampProject {
  title: string;
  description: string;
  technologies: string[];
}

export interface BootcampSalaryBand {
  role: string;
  band: string;
  source: { label: string; url: string };
}

export interface BootcampFees {
  note: string;
  /**
   * Omitted deliberately where no published band exists. An invented fee is
   * worse than no fee: it is the one number a reader will hold us to.
   */
  range?: string;
  sourceCitation?: { label: string; url: string };
  paymentOptions?: string[];
}

export interface BootcampPlacementSupport {
  paragraphs: string[];
  process: string[];
  partnerCompanies: string[];
}

export interface BootcampVersusAlternative {
  heading: string;
  paragraphs: string[];
}

export interface BootcampPrerequisitesAndStart {
  paragraphs: string[];
  suggestedSteps: string[];
}

export interface Bootcamp {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  subtitle: string;
  hook: string;
  description: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  targetAudience: string[];
  whyJoin: { title: string; description: string }[];
  tracks?: BootcampTrack[];
  programs?: BootcampProgram[];
  commonModules: BootcampCommonModule[];
  /** Honest filtering — who should NOT take this. Mirrors courses. */
  notForYou?: string[];
  /** Capstone / portfolio projects built on the programme. */
  projects?: BootcampProject[];
  /** Optional intro paragraph above the trainer/mentor material. */
  trainersIntro?: string;
  /** Fee note and payment options. */
  fees?: BootcampFees;
  /** Structured placement process and partner companies. */
  placementSupport?: BootcampPlacementSupport;
  /** Honest comparison against the most-asked alternative. */
  versusAlternative?: BootcampVersusAlternative;
  /** Prerequisites plus a concrete starting sequence. */
  prerequisitesAndStart?: BootcampPrerequisitesAndStart;
  /** Learning-path diagram shown above the curriculum. */
  roadmapImage?: BootcampRoadmapImage;
  /** Gated syllabus PDF shown under the curriculum. */
  syllabusDownload?: BootcampSyllabusDownload;
  comparison?: BootcampComparison;
  toolsAndTech?: BootcampToolsAndTech;
  careerOutcomes?: BootcampCareerOutcomes;
  details: BootcampDetail[];
  faqs: BootcampFAQ[];
  closingCTA: { headline: string; body: string };
  /**
   * Related Archer Infotech course pages. 4–10 contextually relevant
   * courses that bootcamp graduates can progress into, pair with, or
   * use as deeper specialisation. Rendered as a "Related Training
   * Programmes" section on the bootcamp detail page (P4-13). Optional
   * — bootcamps without curated entries simply skip the section.
   */
  relatedCourses?: BootcampRelatedCourse[];
}

export const bootcamps: Bootcamp[] = [
  // ============================================================
  // CODELEAP
  // ============================================================
  {
    id: "codeleap",
    slug: "codeleap",
    name: "CodeLeap",
    tagline: "Pune's Career-Launching Coding Course for 12th Pass Students",
    subtitle:
      "A 2-month foundation program in Python, Web Development, AI Tools & Career Readiness — delivered offline at our Kothrud campus and online across Pune.",
    hook: "Built for students who have just cleared 12th (HSC / CBSE / ICSE) and want a meaningful head start before stepping into Engineering, BCA, BSc-IT, BCS, or any IT-related college course in Pune.",
    description:
      "Most coding bootcamps in Pune are built for working professionals or final-year engineering students. CodeLeap is different — one of the few programs in Pune designed exclusively for 12th-pass students aged 17–19 who want to enter Engineering, IT, or Computer Science with real skills already in place. In just 2 months, students at our Kothrud campus learn the same foundations that final-year engineering students struggle with: Python programming, full web development, AI tools, GitHub, and interview-ready career skills.",
    seo: {
      title:
        "CodeLeap Bootcamp Pune — Coding After 12th (Python, AI)",
      description:
        "CodeLeap is Pune's 2-month coding bootcamp built specifically for 12th-pass students. Learn Python programming, web development, AI tools, GitHub & career skills in Kothrud, Pune. Online + offline classes. Enroll now.",
      keywords: [
        "coding bootcamp Pune",
        "Python classes Pune",
        "coding course after 12th Pune",
        "AI course Pune",
        "web development course Kothrud",
        "programming classes Kothrud Pune",
        "best computer course after 12th in Pune",
        "coding classes for beginners Pune",
        "IT course after HSC Pune",
        "Python training Kothrud",
        "Archer Infotech",
      ],
    },
    targetAudience: [
      "12th Pass-Out Students (Science, Commerce, or Arts) preparing for Engineering, BCA, BSc-IT, BCS, MCA, or B.Tech.",
      "First-year college students in Pune who feel underprepared for programming subjects.",
      "Diploma students entering the second or third year and looking to strengthen practical IT skills.",
      "Students from non-IT backgrounds in Pune wanting to switch to a tech-driven career path early.",
      "Parents in Pune searching for the best computer course after 12th for their children before college begins.",
    ],
    whyJoin: [
      {
        title: "Local Pune institute with a real Kothrud campus",
        description:
          "Not a faceless online platform. Our campus in Kothrud is open for visits, demo sessions, and parent counselling — so you can meet the mentors and see student work before you enrol.",
      },
      {
        title: "Mentor-led teaching in small batches",
        description:
          "We deliberately keep batch sizes small. Every student gets attention, every question gets answered, and every mentor knows your name and your level by week one.",
      },
      {
        title: "Practical-first, project-led philosophy",
        description:
          "Every concept is taught through hands-on projects. By the end of week 2 you have written real Python; by the end of week 4 you have a deployed website; by the end of week 8 you have a GitHub portfolio recruiters will recognise.",
      },
      {
        title: "AI tools woven into every module — not bolted on",
        description:
          "We are one of the few coding classes in Pune that treats AI fluency as a baseline skill. ChatGPT, Claude, Gemini, NotebookLM, and GitHub Copilot are taught as everyday tools, not as a separate paid course.",
      },
      {
        title: "Hybrid flexibility across Pune",
        description:
          "Attend in person at our Kothrud campus or join online from Karve Nagar, Warje, Kondhwa, Hadapsar, Wakad, Aundh, Pimpri-Chinchwad, Baner, Viman Nagar, or Hinjawadi — same mentors, same curriculum.",
      },
      {
        title: "Multilingual instruction — English, Hindi & Marathi",
        description:
          "Concepts are explained in English and switched freely to Hindi or Marathi when something is hard. No Pune student is ever left behind because of a language barrier.",
      },
      {
        title: "Beyond the bootcamp — alumni guidance for years",
        description:
          "Once you finish CodeLeap you stay in the loop. Alumni get continued help with college projects, internship applications, and follow-on courses across Archer Infotech's catalogue.",
      },
    ],
    tracks: [
      {
        name: "8-Week Foundation Path",
        subtitle:
          "Five sequential modules — Python, Web Dev, AI, GitHub, Career Skills — taught back-to-back over 2 months.",
        modules: [
          {
            title: "Module 1 — Python Programming (Weeks 1–2)",
            description:
              "Programming foundations through the world's most beginner-friendly language.",
            intro:
              "Python is the world's most beginner-friendly programming language and the foundation of modern AI, web development, and data science. This module is the cornerstone of the CodeLeap curriculum and one of the most in-demand skills for Python jobs in Pune.",
            topics: [
              {
                title: "Introduction to Programming",
                description:
                  "How computers think, what programming actually is, why Python.",
              },
              {
                title: "Python Setup & Environment",
                description:
                  "Installing Python, using VS Code, running your first program.",
              },
              {
                title: "Variables & Data Types",
                description:
                  "Integers, floats, strings, booleans, type conversion.",
              },
              {
                title: "Operators & Expressions",
                description:
                  "Arithmetic, comparison, logical, assignment operators.",
              },
              {
                title: "Input & Output",
                description: "Reading user input, formatting output, f-strings.",
              },
              {
                title: "Control Flow",
                description: "if, elif, else statements, nested conditions.",
              },
              {
                title: "Loops",
                description:
                  "for loops, while loops, break, continue, pass, range().",
              },
              {
                title: "Functions",
                description:
                  "Defining functions, parameters, return values, default arguments, scope.",
              },
              {
                title: "Data Structures",
                description:
                  "Lists, tuples, sets, dictionaries — when and how to use each.",
              },
              {
                title: "String Manipulation",
                description: "Slicing, methods, formatting, working with text.",
              },
              {
                title: "File Handling",
                description: "Reading and writing .txt and .csv files.",
              },
              {
                title: "Error Handling",
                description: "try, except, finally, common Python errors.",
              },
              {
                title: "Modules & Packages",
                description:
                  "Importing modules, using built-in libraries (math, random, datetime).",
              },
              {
                title: "Mini Capstone Project",
                description:
                  "Build a working command-line application — calculator, quiz app, expense tracker, or to-do manager.",
              },
            ],
            outcome:
              "Students leave Module 1 able to read, write, and debug real Python programs from scratch — a skill most engineering students don't develop until 2nd or 3rd year.",
          },
          {
            title:
              "Module 2 — Web Development with HTML, CSS & JavaScript (Weeks 3–4)",
            description:
              "Build, style, and deploy your first responsive websites.",
            intro:
              "Build, style, and deploy real, working websites. This module gives students the same foundation that a junior frontend developer in Pune would need on day one of a tech job.",
            topics: [
              {
                title: "How the Web Works",
                description: "Browsers, servers, URLs, HTTP basics, the DOM.",
              },
              {
                title: "HTML5 Fundamentals",
                description:
                  "Tags, structure, semantic elements, headings, paragraphs, links.",
              },
              {
                title: "HTML Forms & Inputs",
                description:
                  "Text fields, dropdowns, checkboxes, validation.",
              },
              {
                title: "HTML Media",
                description: "Images, audio, video, embedded content.",
              },
              {
                title: "CSS3 Essentials",
                description:
                  "Selectors, properties, the box model, colors, typography.",
              },
              {
                title: "CSS Layouts",
                description:
                  "Flexbox, CSS Grid, positioning, modern layout techniques.",
              },
              {
                title: "Responsive Design",
                description:
                  "Media queries, mobile-first design, layouts that work on every device.",
              },
              {
                title: "CSS Animations & Transitions",
                description: "Adding life and polish to web pages.",
              },
              {
                title: "JavaScript Basics",
                description:
                  "Variables, data types, operators, conditionals, loops.",
              },
              {
                title: "JavaScript Functions & Events",
                description:
                  "Click handlers, form events, basic interactivity.",
              },
              {
                title: "DOM Manipulation",
                description: "Changing page content with JavaScript.",
              },
              {
                title: "Project: Personal Portfolio Website",
                description:
                  "Students build a fully responsive personal website from scratch.",
              },
              {
                title: "Web Hosting & Deployment",
                description:
                  "Publishing your website on free platforms — Netlify, Vercel, GitHub Pages.",
              },
            ],
            outcome:
              "Every student walks away with a deployed, live website they can share with friends, family, college counsellors, and future internship recruiters.",
          },
          {
            title:
              "Module 3 — Artificial Intelligence & Smart Tools (Weeks 5–6)",
            description:
              "AI literacy as a baseline skill — tools, prompts, and a working AI mini-app.",
            intro:
              "This is the most future-relevant module of the entire bootcamp. AI is no longer optional — it's a baseline skill for every modern student. CodeLeap is one of the few AI courses in Pune that teaches AI literacy at the foundation level, not just as a buzzword.",
            topics: [
              {
                title: "What is Artificial Intelligence?",
                description:
                  "A clear, jargon-free introduction to AI, ML, and Generative AI.",
              },
              {
                title: "History & Evolution of AI",
                description:
                  "From early computing to ChatGPT, Claude, and Gemini.",
              },
              {
                title: "How Large Language Models (LLMs) Work",
                description:
                  "Tokens, training, predictions — explained simply.",
              },
              {
                title: "AI vs Machine Learning vs Deep Learning",
                description: "Clearing the most common confusions.",
              },
              {
                title: "AI in Daily Life",
                description:
                  "How AI already powers Google, YouTube, Instagram, Netflix.",
              },
              {
                title: "AI Across Industries",
                description:
                  "Healthcare, finance, education, design, software development.",
              },
              {
                title: "Hands-On with Leading AI Tools",
                description:
                  "ChatGPT, Claude, Gemini, Perplexity, NotebookLM.",
              },
              {
                title: "AI for Students",
                description:
                  "Using AI to study, summarise textbooks, prepare for exams.",
              },
              {
                title: "Prompt Engineering — The Core Skill",
                description: "Writing prompts that produce great results.",
              },
              {
                title: "Advanced Prompting Techniques",
                description:
                  "Role prompting, chain-of-thought, few-shot examples.",
              },
              {
                title: "AI for Coders",
                description:
                  "Using GitHub Copilot, ChatGPT, and Claude as a coding partner.",
              },
              {
                title: "AI for Content Creation",
                description:
                  "Writing, design, image generation, presentations.",
              },
              {
                title: "Ethical AI Use in Education",
                description:
                  "Avoiding plagiarism, citing AI, building real understanding.",
              },
              {
                title: "AI Hallucinations & Limitations",
                description: "Knowing when not to trust AI output.",
              },
              {
                title: "Mini Project — Build Your Own AI-Powered Mini App",
                description:
                  "Combining AI APIs with the web skills from Module 2.",
              },
            ],
            outcome:
              "Students will be AI-fluent before they enter their first year of college — a 2- to 3-year head start over their peers.",
          },
          {
            title:
              "Module 4 — GitHub, Version Control & Portfolio Building (Week 7)",
            description:
              "Build a public developer identity recruiters can actually find.",
            intro:
              "A developer without GitHub is invisible to recruiters. This module gives every CodeLeap student a real, public developer identity online — something most engineering students in Pune don't have until their 3rd or 4th year.",
            topics: [
              {
                title: "What is Version Control?",
                description: "Why every modern developer uses Git.",
              },
              {
                title: "Installing & Configuring Git",
                description: "Setting up Git on Windows and macOS.",
              },
              {
                title: "Git Basics",
                description: "git init, git add, git commit, git status, git log.",
              },
              {
                title: "Working with GitHub",
                description:
                  "Creating an account, your first repository, public vs private repos.",
              },
              {
                title: "Pushing Code to GitHub",
                description: "git push, git pull, syncing local and remote.",
              },
              {
                title: "Branches & Merging",
                description:
                  "git branch, git checkout, git merge — essential team skills.",
              },
              {
                title: "README Files & Markdown",
                description:
                  "Writing project documentation that recruiters actually read.",
              },
              {
                title: "GitHub Profile Optimisation",
                description:
                  "Pinned repos, profile README, contribution graph.",
              },
              {
                title: "Open-Source Basics",
                description:
                  "Forking, pull requests, contributing to other projects.",
              },
              {
                title: "Project: Upload All Your Bootcamp Work to GitHub",
                description:
                  "Python projects, your portfolio site, the AI mini-app.",
              },
              {
                title:
                  "Final Project: Deploy a Personal Portfolio Site on GitHub Pages",
                description:
                  "A professional URL students can put on every resume.",
              },
            ],
            outcome:
              "A live, public GitHub profile with multiple real projects and a deployed personal portfolio website — the single most powerful proof-of-skill any 1st-year college student in Pune can carry into internship season.",
          },
          {
            title: "Module 5 — Career Preparation & Soft Skills (Week 8)",
            description:
              "Resume, LinkedIn, mock interviews, and a personalised 4-year roadmap.",
            intro:
              "Skills get you in the room. Communication, presentation, and interview confidence get you the offer. The final module turns the technical foundation built over 7 weeks into a complete, market-ready professional package.",
            topics: [
              {
                title: "Resume Building for Tech Roles",
                description:
                  "What recruiters actually look for; clean, results-focused formats.",
              },
              {
                title: "LinkedIn Optimisation",
                description:
                  "Headline, summary, projects, skill sections, networking basics.",
              },
              {
                title: "Aptitude Foundations",
                description:
                  "Quantitative aptitude, logical reasoning, verbal ability.",
              },
              {
                title: "Coding Interview Basics",
                description:
                  "How problem-solving rounds work, what to expect.",
              },
              {
                title: "HR Interview Preparation",
                description:
                  "Common questions, how to talk about yourself, body language.",
              },
              {
                title: "Mock Interviews",
                description: "Live one-on-one practice rounds with feedback.",
              },
              {
                title: "Communication Skills",
                description:
                  "Speaking clearly, technical English, presenting your projects.",
              },
              {
                title: "Email & Professional Writing",
                description:
                  "Writing emails to professors, recruiters, and mentors.",
              },
              {
                title: "Career Roadmap Session",
                description:
                  "Personalised 1:1 guidance on your next 4 years — engineering, internships, certifications, projects.",
              },
            ],
            outcome:
              "Every student leaves with a polished resume, an optimised LinkedIn profile, mock-interview experience, and a clear roadmap for the years ahead.",
          },
        ],
        skills: [
          "Python 3",
          "JavaScript",
          "HTML5",
          "CSS3",
          "Responsive design",
          "ChatGPT / Claude / Gemini",
          "Prompt engineering",
          "GitHub Copilot",
          "Git & GitHub",
          "Resume & LinkedIn",
          "Mock interviews",
          "Career roadmap",
        ],
      },
    ],
    comparison: {
      headline: "What Makes CodeLeap Different from Other Coding Classes in Pune",
      intro:
        "Most Pune coding bootcamps are built for working professionals or final-year engineering students. CodeLeap is built for 17–19-year-olds who have just cleared 12th — and the curriculum reflects that, end to end.",
      usLabel: "At CodeLeap",
      othersLabel: "Most Pune coding classes",
      rows: [
        {
          us: "Designed only for 12th pass students",
          others: "Designed for working professionals or final-year students",
        },
        {
          us: "2 months — focused & complete",
          others: "6–12 months — long & generic",
        },
        {
          us: "AI tools woven into every module",
          others: "AI taught only as a separate paid course",
        },
        {
          us: "Live GitHub portfolio + deployed website",
          others: "Certificate-only, no public portfolio",
        },
        {
          us: "Hybrid: online + offline at Kothrud campus",
          others: "Online-only or classroom-only",
        },
        {
          us: "Mentor-led with small Pune-area batches",
          others: "Large impersonal batches",
        },
        {
          us: "Affordable for students",
          others: "Premium pricing aimed at job-switchers",
        },
      ],
    },
    toolsAndTech: {
      intro:
        "By the end of CodeLeap, students gain hands-on experience with the same tools used by working developers across Pune's IT companies in Hinjawadi, Magarpatta, Kharadi, and Baner.",
      groups: [
        { label: "Programming", items: ["Python 3", "JavaScript"] },
        { label: "Web Stack", items: ["HTML5", "CSS3", "JavaScript", "Responsive Design"] },
        {
          label: "AI Tools",
          items: ["ChatGPT", "Claude", "Gemini", "Perplexity", "GitHub Copilot", "NotebookLM"],
        },
        {
          label: "Developer Tools",
          items: ["VS Code", "Git", "GitHub", "GitHub Pages", "Netlify / Vercel"],
        },
        { label: "Productivity", items: ["Markdown", "Basic terminal / command line"] },
      ],
    },
    careerOutcomes: {
      intro:
        "CodeLeap is a foundation program, not a placement program — but the skills you learn directly translate to real career paths in Pune's tech ecosystem and beyond.",
      immediateBenefits: [
        "Strong programming foundation before your 1st-year semester even begins.",
        "Confidence in college coding subjects — Python, C, web programming, DBMS.",
        "A live GitHub portfolio that grows with you through every college project.",
        "Eligibility for early internships — many Pune startups hire 2nd-year students with real GitHub work.",
        "Hackathon-ready skills — participate in college and city-wide hackathons in Pune from year one.",
      ],
      longTermPaths: [
        "Frontend Developer (React, Vue, Next.js)",
        "Full-Stack Developer (MERN, Django, FastAPI)",
        "Python Developer",
        "AI / ML Engineer (with further study)",
        "Data Analyst / Data Scientist",
        "Mobile App Developer (React Native, Flutter)",
        "Cloud Engineer (AWS, Azure, GCP)",
        "DevOps Engineer",
        "Tech Entrepreneur / Indie Hacker",
      ],
      localContext: {
        headline: "Why this matters in Pune specifically",
        body: "Pune is one of India's top three IT hubs — home to Infosys, TCS, Wipro, Cognizant, Persistent Systems, BMC Software, Bajaj Finserv, Citi, and Barclays, plus a thriving startup ecosystem in Baner, Aundh, Hinjawadi, and Kharadi. Engineering colleges in Pune — COEP, VIT, MIT-WPU, PCCOE, Sinhgad, PICT, Cummins, AISSMS, PCCS — produce thousands of graduates every year. The students who stand out are the ones who started early. That is exactly what CodeLeap delivers.",
      },
    },
    commonModules: [
      {
        title: "A live, deployed personal website",
        description:
          "Built in Module 2, deployed for free on Netlify, Vercel, or GitHub Pages — a public URL you can put on every resume, internship form, and college application.",
      },
      {
        title: "A public GitHub profile with real projects",
        description:
          "Python projects, your portfolio site, and an AI-powered mini-app — all uploaded and documented. The single most powerful proof-of-skill any 1st-year student in Pune can carry into internship season.",
      },
      {
        title: "An AI-powered mini-application",
        description:
          "Built in Module 3, combining AI APIs with the web skills from Module 2 — your first taste of what modern, real-world software actually looks like.",
      },
      {
        title: "A polished, recruiter-ready resume",
        description:
          "Built in Module 5 around your actual GitHub work, with the formats and language tech recruiters in Pune actually look for.",
      },
      {
        title: "An optimised LinkedIn profile",
        description:
          "Headline, summary, project section, skills, and a basic networking strategy — so you start engineering with a credible online developer identity.",
      },
      {
        title: "Archer Infotech CodeLeap Certificate",
        description:
          "An official Certificate of Completion issued by Archer Infotech — though the GitHub profile and live website you walk away with carry far more weight in any interview room.",
      },
    ],
    roadmapImage: {
      src: "/images/courses/codeleap-path-v1.webp",
      width: 1400,
      height: 654,
      alt: "Five-stage CodeLeap bootcamp learning path taught at Archer Infotech Pune: Python programming in weeks one and two covering syntax, logic and first projects; web development in weeks three and four covering HTML, CSS, JavaScript and a deployed site; artificial intelligence and smart tools in weeks five and six covering AI tools, APIs and a mini-application; GitHub and portfolio building in week seven covering version control and a public profile; and career preparation in week eight covering resume writing, LinkedIn and communication skills.",
      caption:
        "The order the eight weeks run. Each stage expands into the module detail below — nothing arrives before its prerequisite.",
    },

    syllabusDownload: {
      pdfUrl: "/downloads/codeleap-bootcamp-syllabus-v1.pdf",
      title: "CodeLeap Bootcamp Syllabus — Complete Module List",
      slug: "codeleap-bootcamp-syllabus",
      blurb:
        "The complete five-module syllabus as a PDF — Python programming, web development, AI and smart tools, GitHub and portfolio building, and career preparation, week by week across the eight weeks. Everything in it is on this page; the PDF is the portable version, and it is the one to forward to a parent.",
      asideBlocks: [
        {
          heading: "What is inside the PDF",
          items: [
            "All five modules in teaching order, mapped week by week across the eight weeks.",
            "Exactly what a student builds: a deployed personal website, a public GitHub profile, and an AI-powered mini-application.",
            "The eligibility, batch format, language and certification details in one place — the questions parents ask first.",
            "What CodeLeap does not cover, and which longer course to take next if a student wants to go further.",
          ],
        },
        {
          heading: "Who this programme is for",
          items: [
            "12th-pass students of any stream heading into Engineering, BCA, BSc-IT or BCS.",
            "First-year students who already feel behind in their programming subjects.",
            "Diploma students strengthening practical skills before second or third year.",
            "Parents comparing computer courses after 12th in Pune.",
          ],
        },
      ],
    },

    notForYou: [
      "Working professionals or final-year students looking to switch jobs — TechReady is the programme built for that, and CodeLeap will feel slow.",
      "Anyone expecting a job or placement at the end. CodeLeap is a foundation programme taken before college; it has no placement component and we do not pretend otherwise.",
      "Students who want one specific technology in depth — a single course such as Python or JavaScript will serve you better than a five-module survey.",
      "Anyone who cannot commit the eight weeks. The modules build on each other, and joining from Module 3 does not work.",
      "Students already comfortable writing programs. If you have built and deployed something yourself, start at a course rather than here.",
    ],

    projects: [
      {
        title: "A deployed personal website",
        description:
          "Built through Module 2 and deployed free on Netlify, Vercel or GitHub Pages. A public URL you can put on a resume, share with a college, or show a relative who asked what you did over the holidays. Responsive, hand-written HTML and CSS with JavaScript interactivity — not a template.",
        technologies: ["HTML5", "CSS3", "JavaScript", "Netlify / Vercel", "GitHub Pages"],
      },
      {
        title: "An AI-powered mini-application",
        description:
          "Built in Module 3, combining an AI API with the web skills from Module 2. Small but genuinely working — the point is that you have wired a model into an interface yourself and understand what happened at each step, which very few first-year students can say.",
        technologies: ["JavaScript", "AI APIs", "Prompt design", "Fetch and async"],
      },
      {
        title: "A public GitHub profile",
        description:
          "Your Python exercises, portfolio site and AI mini-app, committed properly with README files that explain what each one does. This is the artefact that compounds: every college project for the next four years lands in the same profile, so by placement season you have four years of visible history rather than four weeks.",
        technologies: ["Git", "GitHub", "Markdown READMEs", "Commit hygiene"],
      },
    ],

    trainersIntro:
      "CodeLeap is taught by mentors who work with beginners deliberately rather than by whoever is free. Teaching a 17-year-old their first loop is a different skill from teaching a working developer a new framework, and we staff it that way.",

    fees: {
      note:
        "CodeLeap is priced as a foundation programme rather than a career programme — it is the shortest and least expensive of our three bootcamps, which is deliberate given that most students take it in the gap before college with family support. We publish fees on request rather than on the page because batch format and mode change the number. Ask for the current schedule, or visit the Kothrud campus and ask in person.",
      sourceCitation: { label: "Current fee schedule — contact admissions", url: "/contact" },
      paymentOptions: [
        "One-time payment at enrolment",
        "Instalment options — ask admissions what applies to the current batch",
        "Free demo class before you pay anything",
      ],
    },

    placementSupport: {
      paragraphs: [
        "CodeLeap does not carry a placement promise, and this section exists to say that plainly rather than to bury it. Students taking this programme are 17 to 19 and heading into a degree — the outcome that matters is arriving at college already able to build, not a job offer eight weeks from now.",
        "What the programme does give you is the career infrastructure most students assemble in a panic in final year: a GitHub profile that will be four years old by the time you need it, a resume in the format tech recruiters actually read, and a LinkedIn presence. Archer Infotech alumni also keep access to our guidance as they progress — several CodeLeap students return for CareerCode during their degree.",
      ],
      process: [
        "Module 4: GitHub profile created, projects committed and documented",
        "Module 5: Resume built around your actual project work, in a tech-recruiter format",
        "Module 5: LinkedIn profile set up with headline, summary and project section",
        "After the programme: guidance on which course or track to take next during your degree",
        "Ongoing: alumni access to Archer Infotech mentors as your college years progress",
      ],
      partnerCompanies: [
        "Not applicable — CodeLeap is a foundation programme without a placement component",
      ],
    },

    versusAlternative: {
      heading: "CodeLeap or a free YouTube course — is this worth paying for?",
      paragraphs: [
        "Everything in CodeLeap exists free online, and we will say that openly. Python, HTML, CSS, JavaScript and Git are among the best-documented subjects on the internet, and a disciplined self-learner can absolutely cover this ground alone in eight weeks.",
        "What you are paying for is the part self-study reliably fails at for a 17-year-old with a free summer: a fixed schedule, someone who notices when you stop turning up, a sequence chosen for you so you are not deciding what to learn next, and a person to ask when your code will not run — which is the exact moment most self-taught beginners quit. If you have already taught yourself something end to end and enjoyed it, save your money and keep going. If you have started three online courses and finished none, that is what this programme is for.",
      ],
    },

    prerequisitesAndStart: {
      paragraphs: [
        "There are no academic prerequisites. Science, Commerce and Arts students all take CodeLeap, and no mathematics beyond school level is used. You need a laptop, an internet connection, and eight weeks in which you are not also preparing for entrance exams — students trying to do both usually do neither well.",
        "Parents ask us regularly whether their child needs to have shown an interest in computers already. They do not. About a third of each batch arrives having never written a line of code and having no strong opinion about whether they will enjoy it; finding out is a legitimate reason to take the programme.",
      ],
      suggestedSteps: [
        "Book a free demo class — attend one session before deciding anything",
        "Visit the Kothrud campus if you are local; parents are welcome and most come",
        "Check your laptop runs Chrome and can install software (that is the whole hardware requirement)",
        "Create a free GitHub account so it is ready on day one",
        "Block the eight weeks in your calendar and check they do not collide with admission formalities",
      ],
    },

    details: [
      { label: "Course Name", value: "CodeLeap Bootcamp" },
      { label: "Provider", value: "Archer Infotech, Pune" },
      { label: "Duration", value: "2 Months (8 Weeks)" },
      {
        label: "Mode",
        value: "Hybrid — Online + Offline (classroom at Kothrud, Pune)",
      },
      {
        label: "Eligibility",
        value: "12th Pass (any stream) — Science, Commerce, or Arts",
      },
      { label: "Prior Knowledge Required", value: "None — absolute beginners welcome" },
      { label: "Total Modules", value: "5 — Python, Web Dev, AI, GitHub, Career" },
      {
        label: "Class Schedule",
        value: "Flexible — weekday & weekend batches available",
      },
      {
        label: "Class Size",
        value: "Small, mentor-led batches (limited seats per batch)",
      },
      { label: "Languages of Instruction", value: "English, Hindi, Marathi" },
      { label: "Certification", value: "Archer Infotech Certificate of Completion" },
      { label: "Location", value: "Kothrud, Pune — Maharashtra" },
    ],
    faqs: [
      {
        question:
          "Is CodeLeap a good coding course for 12th pass students in Pune?",
        answer:
          "Yes — CodeLeap is specifically designed for 12th-pass students in Pune. While most coding bootcamps and Python classes in Pune target working professionals or final-year engineering students, CodeLeap is one of the few programs built around the needs, learning pace, and goals of 17–19 year-olds preparing for engineering, BCA, BSc-IT, or BCS.",
      },
      {
        question: "I have no prior programming experience. Can I still join?",
        answer:
          "Absolutely. CodeLeap assumes zero prior coding knowledge. Module 1 starts from \"what is a variable\" and \"how does a computer think.\" If you have just cleared 12th and have basic computer literacy, you are ready.",
      },
      {
        question: "Where is the Archer Infotech campus located in Pune?",
        answer:
          "Our campus is in Kothrud, Pune, easily reachable from Karve Nagar, Warje, Bavdhan, Erandwane, Deccan, Shivaji Nagar, and most parts of central and western Pune. For students from other parts of Pune (Hadapsar, Hinjawadi, Wakad, Aundh, PCMC), we also offer online live classes as part of our hybrid model.",
      },
      {
        question: "Is this an online or offline coding course?",
        answer:
          "Both. CodeLeap is a hybrid program — you can attend in-person at our Kothrud, Pune campus, join online live, or mix the two. All sessions are mentor-led and interactive.",
      },
      {
        question: "Will I get a certificate after completing the bootcamp?",
        answer:
          "Yes — every student who completes the program receives an Archer Infotech CodeLeap Bootcamp Certificate of Completion. More importantly, you'll walk away with a live GitHub profile and deployed portfolio website — which carry far more weight than any certificate.",
      },
      {
        question: "How is CodeLeap different from a regular Python class in Pune?",
        answer:
          "Most Python classes in Pune teach Python in isolation. CodeLeap teaches Python plus web development plus AI fluency plus GitHub plus career skills — the complete starter package — in the same 2 months, and at a price point built for students.",
      },
      {
        question: "What can I do after completing CodeLeap?",
        answer:
          "Students typically use CodeLeap as a launchpad before starting B.E. / B.Tech, BCA, BSc-IT, or BCS in Pune. Many continue into specialised follow-on courses at Archer Infotech (Full-Stack Web Development, Data Science, AI/ML, Mobile App Development), and use their GitHub portfolio to apply for early internships from 1st and 2nd year of college.",
      },
      {
        question: "Is CodeLeap available in Marathi or Hindi?",
        answer:
          "Yes. Our instructors teach in English and freely switch to Hindi or Marathi when explaining tougher concepts, so no Pune student is left behind because of a language barrier.",
      },
      {
        question: "How much does the CodeLeap Bootcamp cost?",
        answer:
          "Course fees are highly affordable compared to mainstream coding bootcamps in Pune — designed specifically with students and families in mind. For current pricing, batch dates, and any ongoing early-bird offers, please call or WhatsApp us, or visit our Kothrud campus.",
      },
      {
        question: "Are batch sizes small?",
        answer:
          "Yes — we deliberately keep batch sizes small to maintain mentorship quality. Seats are limited per batch and admissions are first-come, first-served.",
      },
      {
        question: "Can parents come for a counselling session before enrolling?",
        answer:
          "Of course. We strongly encourage parents to visit our Archer Infotech Kothrud campus for a free counselling session. We'll walk you through the syllabus, show you student work, and answer every question about your child's career direction.",
      },
      {
        question: "Is there a demo class or trial available?",
        answer:
          "Yes — we offer free demo sessions before every batch begins, so students can experience the teaching style and meet the mentors. Call or WhatsApp us to book a demo.",
      },
    ],
    closingCTA: {
      headline: "Ready to take the leap?",
      body: "Every year, thousands of 12th-pass students in Pune begin engineering with no real exposure to programming, no GitHub, no portfolio, and no understanding of AI. You don't have to be one of them. In just 8 focused weeks at our Kothrud campus, CodeLeap puts you 2–3 years ahead of your peers — with real Python skills, a live website, AI fluency, and a public developer identity. Limited seats per batch. Admissions for the next batch are now open.",
    },
    // CodeLeap learners often progress into deeper standalone tracks once
    // they have foundations — these are the next-step courses we point them
    // toward. P4-13.
    relatedCourses: [
      {
        title: "Python Training",
        description:
          "Go beyond the 2-week CodeLeap Python module — full-depth Python for jobs, automation and data science.",
        href: "/courses/programming/python-training-in-pune",
        category: "Programming",
      },
      {
        title: "JavaScript Training",
        description:
          "Take the web-development module further with modern JavaScript (ES6+, async, DOM, fetch APIs).",
        href: "/courses/programming/javascript-training-in-pune",
        category: "Programming",
      },
      {
        title: "ChatGPT & LLMs",
        description:
          "Deepen the AI Tools module — prompt engineering, LLM APIs and building real AI-powered apps.",
        href: "/courses/generative-ai/chatgpt-llms-training-in-pune",
        category: "Generative AI",
      },
      {
        title: "React.js Training",
        description:
          "Specialise in modern frontend development after CodeLeap's HTML/CSS/JS foundation.",
        href: "/courses/modern-web/react-training-in-pune",
        category: "Modern Web",
      },
      {
        title: "MERN Stack Training",
        description:
          "The natural full-stack progression — combine your Python/web and AI base with a complete JS stack.",
        href: "/courses/full-stack-development/mern-stack-training-in-pune",
        category: "Full Stack",
      },
      {
        title: "Java Training",
        description:
          "An alternative classic language path — Java is still the most-hired skill at Pune MNCs for freshers.",
        href: "/courses/programming/java-training-in-pune",
        category: "Programming",
      },
    ],
  },

  // ============================================================
  // CAREERCODE
  // ============================================================
  {
    id: "careercode",
    slug: "careercode",
    name: "CareerCode",
    tagline: "Build the Skills Your Engineering Degree Won't Teach You",
    subtitle:
      "Semester-by-Semester Programming and Career Training for Engineering Students — Archer Infotech, Pune",
    hook: "Your engineering degree will give you a certificate. CareerCode will give you a career. College teaches you concepts. CareerCode teaches you how to apply them.",
    description:
      "CareerCode is Archer Infotech's flagship ongoing training program for engineering, BCA, and BSc Computer Science students. It runs alongside your college education — semester by semester — adding real technical skills, internship readiness, and career tools to everything your degree provides. From your first year to your final placement drive, CareerCode is your parallel career engine.",
    seo: {
      title:
        "CareerCode | Programming Course for Engineering Students in Pune | Archer Infotech",
      description:
        "CareerCode by Archer Infotech is Pune's best semester-wise coding program for engineering, BCA, and BSc CS students. Learn full stack, AI, data science + get internship-ready. Online and offline available.",
      keywords: [
        "programming course for engineering students Pune",
        "coding course alongside engineering Pune",
        "internship preparation course Pune",
        "full stack course for BE students",
        "semester-wise programming training Pune",
        "IT skills for engineering students",
        "aptitude and communication training Pune",
        "resume building course for students",
        "Python course for engineering students",
        "web development course for college students Pune",
      ],
    },
    targetAudience: [
      "Enrolled in a BE or BTech program (Computer Engineering, IT, ENTC, Mechanical, or any branch)",
      "Pursuing BCA or BSc Computer Science",
      "In any year — first year through final year — of their undergraduate program",
      "Looking to build practical coding skills beyond what college teaches",
      "Preparing for internships, on-campus or off-campus placements",
      "Wanting to build a strong technical portfolio, LinkedIn profile, and GitHub presence",
      "Interested in specialising in a particular technology track — frontend, backend, data, AI, or full stack",
    ],
    whyJoin: [
      {
        title: "Your Degree Alone Is Not Enough",
        description:
          "A BE or BTech degree from most colleges in India no longer guarantees a software job. Companies look for students who can code, communicate, contribute to real projects, and hit the ground running on Day 1. Most colleges do not produce this. CareerCode does.",
      },
      {
        title: "Technology Moves Faster Than Curriculum",
        description:
          "Engineering syllabuses are reviewed every few years. Technology changes every few months. CareerCode is updated monthly — so you always learn what is actually in demand right now, not what was relevant five years ago.",
      },
      {
        title: "The Internship Gap Is Real",
        description:
          "Most engineering students reach third year without having done a single real internship or built a single deployable project. CareerCode starts building your internship readiness from Year 1.",
      },
      {
        title: "Placements Go to the Prepared",
        description:
          "The students who get shortlisted are those with strong coding skills, a confident interview presence, a well-structured resume, and an active professional profile. CareerCode builds all of this systematically.",
      },
      {
        title: "Soft Skills Are a Hard Requirement",
        description:
          "Every major company tests communication skills, logical reasoning, and aptitude in their hiring process. CareerCode integrates communication, aptitude, and mock interview training throughout.",
      },
    ],
    tracks: [
      {
        name: "Frontend Developer",
        subtitle: "Build the interfaces users see and interact with.",
        modules: [
          {
            title: "Sem 1-2",
            description:
              "HTML5, CSS3, JavaScript ES6+ — the complete web foundation",
          },
          {
            title: "Sem 3-4",
            description:
              "React.js — components, hooks, state management, React Router",
          },
          {
            title: "Sem 5-6",
            description:
              "TypeScript, Tailwind CSS, REST API integration, responsive UI",
          },
          {
            title: "Sem 7-8",
            description:
              "Next.js, performance optimisation, SEO for web apps, deployment",
          },
          {
            title: "Internship Prep",
            description:
              "Portfolio projects, GitHub profile, live deployment, interview prep",
          },
        ],
        skills: [
          "Frontend Developer",
          "UI Developer",
          "React Developer",
          "Web Designer-Developer",
        ],
      },
      {
        name: "Backend Developer",
        subtitle:
          "Build the logic, databases, and systems that power applications.",
        modules: [
          {
            title: "Sem 1-2",
            description:
              "Python or Java fundamentals, OOP, problem-solving patterns",
          },
          {
            title: "Sem 3-4",
            description: "REST API development with FastAPI or Spring Boot",
          },
          {
            title: "Sem 5-6",
            description:
              "Databases — MySQL, PostgreSQL, MongoDB; database design",
          },
          {
            title: "Sem 7-8",
            description:
              "Authentication, caching with Redis, Docker basics, cloud intro",
          },
          {
            title: "Internship Prep",
            description:
              "API project, Postman, system design basics, backend interview prep",
          },
        ],
        skills: [
          "Backend Developer",
          "API Developer",
          "Java Developer",
          "Python Developer",
        ],
      },
      {
        name: "Full Stack Developer",
        subtitle:
          "Master both frontend and backend — the most in-demand engineering profile.",
        modules: [
          {
            title: "Sem 1-2",
            description:
              "HTML, CSS, JavaScript + Python or Java fundamentals",
          },
          {
            title: "Sem 3-4",
            description: "React.js (frontend) + FastAPI or Node.js (backend)",
          },
          {
            title: "Sem 5-6",
            description:
              "Database design + full stack integration + API consumption",
          },
          {
            title: "Sem 7-8",
            description:
              "Cloud deployment, CI/CD pipelines, Docker, real-world project",
          },
          {
            title: "Internship Prep",
            description: "End-to-end capstone project, GitHub, mock interviews",
          },
        ],
        skills: [
          "Full Stack Developer",
          "Software Developer",
          "Application Developer",
        ],
      },
      {
        name: "Data Science and Analytics",
        subtitle:
          "Work with data to extract insights and drive business decisions.",
        modules: [
          {
            title: "Sem 1-2",
            description: "Python fundamentals, statistics, Excel for data",
          },
          {
            title: "Sem 3-4",
            description: "Pandas, NumPy, data cleaning, Matplotlib, Seaborn",
          },
          {
            title: "Sem 5-6",
            description:
              "Machine learning basics — Scikit-learn, model evaluation, regression, classification",
          },
          {
            title: "Sem 7-8",
            description:
              "SQL for analytics, Tableau, Power BI, storytelling with data",
          },
          {
            title: "Internship Prep",
            description:
              "Kaggle projects, portfolio datasets, dashboard projects",
          },
        ],
        skills: [
          "Data Analyst",
          "Data Scientist",
          "Business Analyst",
          "Analytics Engineer",
        ],
      },
      {
        name: "AI and Machine Learning Engineer",
        subtitle: "Design, build, and deploy intelligent systems.",
        modules: [
          {
            title: "Sem 1-2",
            description:
              "Python, mathematics for ML — linear algebra, probability",
          },
          {
            title: "Sem 3-4",
            description:
              "Classical ML algorithms, Scikit-learn, model training and evaluation",
          },
          {
            title: "Sem 5-6",
            description:
              "Deep Learning — neural networks, TensorFlow, Keras basics",
          },
          {
            title: "Sem 7-8",
            description:
              "NLP, computer vision, model deployment with FastAPI and Streamlit",
          },
          {
            title: "Internship Prep",
            description:
              "AI mini-projects, Hugging Face, GitHub portfolio, ML interview prep",
          },
        ],
        skills: [
          "ML Engineer",
          "AI Engineer",
          "Deep Learning Engineer",
          "NLP Engineer",
        ],
      },
      {
        name: "Database Administrator",
        subtitle:
          "Design, manage, and optimise the data systems that power enterprises.",
        modules: [
          {
            title: "Sem 1-2",
            description:
              "Relational databases, SQL fundamentals, ER diagrams",
          },
          {
            title: "Sem 3-4",
            description:
              "Advanced SQL, stored procedures, views, indexing",
          },
          {
            title: "Sem 5-6",
            description:
              "NoSQL databases — MongoDB, Redis; when to use which",
          },
          {
            title: "Sem 7-8",
            description:
              "Database administration — backups, replication, security, performance",
          },
          {
            title: "Internship Prep",
            description:
              "Design and document a real-world database schema project",
          },
        ],
        skills: [
          "Database Administrator",
          "SQL Developer",
          "Data Engineer",
          "Backend Developer",
        ],
      },
    ],
    commonModules: [
      {
        title: "Communication and Business English",
        description:
          "Speaking confidently in meetings, writing professional emails, presenting technical ideas clearly, and participating in group discussions and interviews.",
      },
      {
        title: "Aptitude Training",
        description:
          "Quantitative reasoning, logical reasoning, verbal ability, and data interpretation — the four pillars tested by every major IT company. Regular practice sessions and mock tests.",
      },
      {
        title: "Interview Preparation",
        description:
          "Company-specific interview patterns, common coding questions, HR rounds, technical rounds, and group discussion preparation. Mock interviews with detailed feedback.",
      },
      {
        title: "Resume Building",
        description:
          "Create an ATS-friendly resume that gets shortlisted. Learn what recruiters look for, what to highlight, and how to present projects and skills effectively.",
      },
      {
        title: "LinkedIn Profile Optimisation",
        description:
          "Building a complete, keyword-rich LinkedIn profile — headline, summary, skills, endorsements, recommendations, and activity strategy.",
      },
      {
        title: "Naukri.com Profile Management",
        description:
          "How to set up and maintain your Naukri profile, optimise for recruiter searches, and apply strategically for internships and jobs.",
      },
      {
        title: "GitHub Profile Management",
        description:
          "Maintaining a consistent, professional GitHub presence — pinned repositories, well-written READMEs, regular contributions, and project documentation.",
      },
      {
        title: "Internship Guidance",
        description:
          "How to find legitimate internships, apply, prepare, and perform. Students are guided towards Archer Infotech's internship network and placement connections.",
      },
    ],
    roadmapImage: {
      src: "/images/courses/careercode-path-v1.webp",
      width: 1400,
      height: 736,
      alt: "Six-stage CareerCode learning path taught at Archer Infotech Pune, running alongside an engineering degree: choosing a track from frontend, backend, full stack, data science, AI and machine learning or database administration; semesters one and two covering programming foundations and one core language; semesters three and four covering core track skills and coursework projects; semesters five and six covering advanced track topics and a reviewed project; semesters seven and eight covering the capstone, portfolio and placement readiness; and internship preparation covering aptitude, communication, interviews and referrals.",
      caption:
        "How the programme maps onto a four-year degree. Each semester block expands into the track detail below.",
    },

    syllabusDownload: {
      pdfUrl: "/downloads/careercode-bootcamp-syllabus-v1.pdf",
      title: "CareerCode Syllabus — All Six Tracks, Semester by Semester",
      slug: "careercode-bootcamp-syllabus",
      blurb:
        "The complete syllabus as a PDF — all six specialisation tracks (Frontend, Backend, Full Stack, Data Science, AI and Machine Learning, Database Administration) laid out semester by semester from first year to final year, plus the shared communication, aptitude and placement modules. Everything in it is on this page; the PDF is the portable version.",
      asideBlocks: [
        {
          heading: "What is inside the PDF",
          items: [
            "All six tracks side by side, so you can compare before committing to one.",
            "The semester-by-semester map from Sem 1-2 through Sem 7-8 and internship preparation.",
            "The shared modules every track includes: communication, aptitude, interview preparation, resume, LinkedIn, Naukri and GitHub profiles.",
            "The job roles each track leads to, so the choice is made against an outcome rather than a subject name.",
          ],
        },
        {
          heading: "Who this programme is for",
          items: [
            "Engineering, BCA and BSc CS students in any year of study.",
            "Students who want skills building across the degree rather than crammed at the end.",
            "Anyone targeting an internship in third year rather than a scramble in final year.",
            "Students whose college syllabus lags behind what Pune employers actually ask for.",
          ],
        },
      ],
    },

    comparison: {
      headline: "How CareerCode Compares With Other Options for Engineering Students",
      intro:
        "The comparison is deliberately anonymous — these are patterns we verified across Pune institutes and the national online programmes aimed at the same students, not accusations about any named provider.",
      usLabel: "At CareerCode",
      othersLabel: "Most other options",
      rows: [
        {
          us: "Starts in first year and runs semester by semester alongside your degree",
          others:
            "Typically a three-to-six-month crash course taken in final year, once placement season has already begun",
        },
        {
          us: "One or two technologies per semester, built to sit around your college timetable",
          others:
            "Full-time day batches or weekend batches that compete with college for the same hours",
        },
        {
          us: "Classroom in Kothrud, with the same trainers following you across semesters",
          others:
            "The largest programme aimed at first- and second-year students is online-only, with no classroom in Maharashtra",
        },
        {
          us: "Billed per semester block, so you commit a term at a time",
          others:
            "The national online programmes built for this audience run roughly ₹1.15–3 lakh, typically financed over 24–36 months",
        },
        {
          us: "Track chosen in a counselling session against the job it leads to",
          others:
            "Track chosen from a course list at sign-up, before anyone has asked what you want to do",
        },
      ],
      closing:
        "None of this makes a final-year intensive the wrong choice — we run TechReady for exactly that. It makes CareerCode the cheaper path if you are still early enough to take it.",
    },

    toolsAndTech: {
      intro:
        "Across the six tracks, CareerCode students work with the tools Pune's IT employers in Hinjawadi, Kharadi, Magarpatta and Baner actually run. You do not learn all of these — you learn the set your chosen track needs, one or two technologies per semester.",
      groups: [
        {
          label: "Web and Frontend",
          items: ["HTML5", "CSS3", "JavaScript ES6+", "React.js", "TypeScript", "Tailwind CSS", "Next.js"],
        },
        {
          label: "Backend and APIs",
          items: ["Python", "Java", "FastAPI", "Spring Boot", "Node.js", "REST APIs", "Redis"],
        },
        {
          label: "Databases",
          items: ["MySQL", "PostgreSQL", "MongoDB", "SQL", "ER modelling", "Indexing and tuning"],
        },
        {
          label: "Data and AI",
          items: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "Scikit-learn", "TensorFlow", "Keras", "Hugging Face"],
        },
        {
          label: "Analytics and BI",
          items: ["Excel for data", "SQL for analytics", "Tableau", "Power BI", "Streamlit"],
        },
        {
          label: "Developer Tools",
          items: ["Git", "GitHub", "Docker", "Postman", "VS Code", "Kaggle"],
        },
      ],
    },

    careerOutcomes: {
      intro:
        "CareerCode is built around a simple observation: students who start building in first year interview very differently in final year from students who start in final year. The programme spreads the work across the degree so that by the time placements begin, the portfolio already exists.",
      immediateBenefits: [
        "Coursework becomes easier — the programming, DBMS and web subjects in your syllabus are taught here first, in more depth.",
        "A GitHub profile that grows every semester rather than being assembled in a panic before placements.",
        "Eligibility for second- and third-year internships, which in Pune go to students with visible project work.",
        "Hackathon and college-project readiness from first year.",
        "A specialisation chosen deliberately, with a trainer, rather than defaulted into at the last minute.",
      ],
      longTermPaths: [
        "Frontend Developer, UI Developer or React Developer",
        "Backend Developer, API Developer, Java Developer or Python Developer",
        "Full Stack Developer, Software Developer or Application Developer",
        "Data Analyst, Data Scientist, Business Analyst or Analytics Engineer",
        "ML Engineer, AI Engineer, Deep Learning Engineer or NLP Engineer",
        "Database Administrator, SQL Developer or Data Engineer",
      ],
      salaryBands: [
        {
          role: "Junior React Developer (Pune entry, <2 years)",
          band: "₹3,50,000 – ₹6,00,000 per year",
          source: { label: "AmbitionBox Pune React Developer", url: "https://www.ambitionbox.com/profile/react-js-developer-salary-in-pune" },
        },
        {
          role: "Junior Python Full Stack Developer (Pune entry, <2 years)",
          band: "₹4,00,000 – ₹7,00,000 per year",
          source: { label: "AmbitionBox Pune Python Full Stack Developer", url: "https://www.ambitionbox.com/profile/python-full-stack-developer-salary-in-pune" },
        },
        {
          role: "Junior Data Analyst (Pune entry, <2 years)",
          band: "₹3,50,000 – ₹6,00,000 per year",
          source: { label: "AmbitionBox Pune Data Analyst", url: "https://www.ambitionbox.com/profile/data-analyst-salary-in-pune" },
        },
        {
          role: "Junior ML Engineer (Pune entry, <2 years)",
          band: "₹6,00,000 – ₹10,00,000 per year",
          source: { label: "AmbitionBox Pune ML Engineer", url: "https://www.ambitionbox.com/profile/machine-learning-engineer-salary-in-pune" },
        },
      ],
      hiringCompanies: [
        "Persistent Systems",
        "Capgemini",
        "LTIMindtree",
        "Tech Mahindra",
        "Amdocs",
        "Cybage",
        "Cognizant",
        "Wipro",
        "Accenture",
        "TCS",
      ],
      localContext: {
        headline: "Why this matters in Pune specifically",
        body:
          "Pune's campus hiring runs on a compressed timetable — most engineering colleges see the bulk of their drives inside a single term of final year. Students who begin preparing when the calendar is announced are competing against students who have been building for three years. CareerCode exists to put you in the second group without asking you to choose between your degree and your skills: one or two technologies a semester, taught alongside your coursework, at our Kothrud campus or online.",
      },
    },

    notForYou: [
      "Final-year students with placements already underway — there is no longer time for a semester-paced programme. TechReady is built for that situation.",
      "Graduates who have already finished their degree. CareerCode is structured around semesters you are actually sitting; without them it loses its shape.",
      "Anyone wanting a job in three months. This programme trades speed for depth deliberately.",
      "Students who cannot commit across terms. Taking Sem 1-2 and stopping leaves you with foundations and no specialisation.",
      "Students whose college workload is already unmanageable. One or two technologies a semester is light, but it is not nothing — talk to us before enrolling.",
    ],

    projects: [
      {
        title: "Semester coursework, done properly",
        description:
          "The projects your syllabus already requires, built to a standard that survives a GitHub reader — version-controlled, documented, and deployed where it makes sense. Most students throw these away; treating them as portfolio pieces from first year is the single cheapest advantage available to an engineering student.",
        technologies: ["Git", "GitHub", "READMEs", "Your track's stack"],
      },
      {
        title: "A track project at each level",
        description:
          "Every semester block ends in something built rather than something attended — a React interface, an API with authentication, a cleaned dataset with a dashboard, a normalised schema with stored procedures. Each one is reviewed by a mentor and revised, which is the part self-study skips.",
        technologies: ["React.js", "FastAPI or Spring Boot", "MySQL / MongoDB", "Pandas", "Power BI"],
      },
      {
        title: "Final-year capstone and internship portfolio",
        description:
          "By Sem 7-8 you assemble the earlier work into a coherent capstone and a portfolio aimed at the roles your track targets. Because the components already exist and have been reviewed, the final year is spent refining and interviewing rather than building from zero while placements run.",
        technologies: ["End-to-end project", "Cloud deployment", "CI/CD basics", "Portfolio site"],
      },
    ],

    trainersIntro:
      "CareerCode mentors work in the stacks they teach and stay with a student across semesters rather than rotating each term — so the person reviewing your final-year capstone is one who saw your first-year code.",

    fees: {
      note:
        "CareerCode is billed per semester block rather than as one upfront programme, because that is how it is taken — you commit a term at a time rather than signing for the whole degree up front. Ask admissions what applies if you need to skip a block. The per-block fee depends on the track and the technologies in that block, so we quote it against your specific track and year rather than publishing a single number that would be wrong for most students.",
      sourceCitation: { label: "Current fee schedule — contact admissions", url: "/contact" },
      paymentOptions: [
        "Per-semester-block payment rather than one upfront sum",
        "Instalment options within a block — ask admissions what applies",
        "Free demo class and a track-selection counselling session before you commit",
      ],
    },

    placementSupport: {
      paragraphs: [
        "CareerCode is not a placement programme and does not carry a placement guarantee. Your placements will run through your college. What this programme changes is what you bring to them: three or four years of reviewed project work, a chosen specialisation, and interview practice that started long before the drive calendar was announced.",
        "The internship-preparation block is where this becomes concrete. Pune internships in second and third year go overwhelmingly to students with visible project work, and that is the gap CareerCode is designed to close. Students who want full placement support after graduating move to TechReady, and CareerCode graduates enter it well ahead of the intake.",
      ],
      process: [
        "Sem 3-4: first reviewed track project committed to GitHub with documentation",
        "Sem 5-6: aptitude and communication training begins alongside the technical track",
        "Sem 5-6: internship applications supported — CV, profile and project narrative",
        "Sem 7-8: capstone assembled, mock interviews run for your track specifically",
        "Sem 7-8: Naukri and LinkedIn profiles built, college placement drives prepared for",
      ],
      partnerCompanies: [
        "Persistent Systems",
        "Capgemini",
        "LTIMindtree",
        "Tech Mahindra",
        "Amdocs",
        "Cybage",
        "Cognizant",
        "Wipro",
      ],
    },

    versusAlternative: {
      heading: "CareerCode or waiting until final year — does starting early actually matter?",
      paragraphs: [
        "The honest case for waiting: you do not yet know what you want to specialise in, technologies change across four years, and final-year intensive programmes exist precisely because they work. Plenty of students are placed well having started late, and we run TechReady for exactly that path.",
        "The case for starting early is not that the technologies stay current — some will not. It is that the habits and the artefacts do. A student who has been committing code since first year has a GitHub history, has debugged their own work hundreds of times, and has already been through choosing and abandoning a direction. In a final-year interview that student is visibly different from one who compressed the same learning into four months, and the difference shows up most in the questions that go past what was memorised. If you are in first or second year, this is the cheaper path in every sense; if you are already in final year, take TechReady instead.",
      ],
    },

    prerequisitesAndStart: {
      paragraphs: [
        "You need to be currently enrolled in an engineering, BCA or BSc CS programme — any year, any branch. No prior programming beyond whatever your semester has covered is assumed; the Sem 1-2 block starts from foundations regardless of when you join.",
        "The one decision worth taking seriously before enrolling is which of the six tracks to take. We run a counselling session for this rather than letting students pick by name, because the tracks lead to genuinely different jobs and switching after two semesters costs time. Come with a rough sense of whether you prefer building interfaces, building systems, or working with data.",
      ],
      suggestedSteps: [
        "Book the free track-selection counselling session before choosing a specialisation",
        "Check your semester timetable against the batch timings — weekday and weekend options exist",
        "Create a free GitHub account; it becomes your portfolio from the first block",
        "Bring your college syllabus so we can map what overlaps and what does not",
        "Attend one demo class in the track you are leaning towards",
      ],
    },

    details: [
      { label: "Designed For", value: "Engineering, BCA, and BSc CS students — all years" },
      { label: "Duration", value: "Ongoing — semester by semester throughout your degree" },
      { label: "Pace", value: "1 to 2 technologies per semester" },
      { label: "Tracks", value: "Frontend / Backend / Full Stack / Data Science / AI-ML / Database" },
      { label: "Mode", value: "Online + Offline (Kothrud, Pune)" },
      { label: "Batch Timings", value: "Weekday and Weekend Batches — morning, afternoon, evening" },
      { label: "Language", value: "English (Marathi and Hindi support available)" },
      { label: "Certification", value: "Track-specific certificate at each completed level" },
      { label: "Eligibility", value: "Currently enrolled in engineering, BCA, or BSc CS" },
    ],
    faqs: [
      {
        question: "What makes CareerCode different from other programming courses?",
        answer:
          "CareerCode is not a one-time course. It is structured to run alongside your entire engineering career — semester by semester — so you are never cramming years of skills into a few weeks before placement season. It combines technical training with communication, aptitude, LinkedIn, resume, and GitHub — making it the most holistic career development program available to engineering students in Pune.",
      },
      {
        question: "Can I join CareerCode from my first year of engineering?",
        answer:
          "Yes, and we highly recommend it. Students who start in the first year have the greatest advantage — they have time to build skills gradually, do projects, get internships, and arrive at placement season fully prepared.",
      },
      {
        question: "Can I join CareerCode from my third or final year?",
        answer:
          "Absolutely. CareerCode has structured entry points for students at every stage. For third and final year students, we offer accelerated tracks that prioritise internship and placement readiness.",
      },
      {
        question: "How many hours per week does CareerCode require?",
        answer:
          "CareerCode is designed to fit around your college schedule. Classes are typically held on weekends or weekday evenings. The expected time commitment is 8 to 12 hours per week, including classes, assignments, and projects.",
      },
      {
        question: "Is online training available for CareerCode?",
        answer:
          "Yes. CareerCode is available in both classroom mode at Kothrud, Pune, and online through Archer Infotech's LMS platform — with recorded sessions for students who cannot attend live classes.",
      },
      {
        question: "Will CareerCode help me get internships?",
        answer:
          "Yes. Internship preparation is a core part of CareerCode. We guide you through building the right profile, applying to the right opportunities, and preparing for internship interviews. Archer Infotech also has direct connections with 100+ companies for internship and job placements.",
      },
    ],
    closingCTA: {
      headline: "Start your CareerCode journey today.",
      body: "Four years of engineering will pass faster than you think. Every semester you wait is a semester your competition is using. The students who land the best internships and the best placements in their final year are not the ones who started preparing at the end — they are the ones who started at the beginning.",
    },
    // CareerCode runs alongside engineering with semester-wise specialisations
    // (Frontend, Backend, Full Stack, Data Science, AI/ML, DBA). Each track
    // maps to one or more dedicated standalone courses learners can pair
    // with the program for deeper interview prep. P4-13.
    relatedCourses: [
      {
        title: "Java Full Stack Training",
        description:
          "The most-hired full-stack pattern at Pune MNCs — Spring Boot + React. Pairs with the Backend / Full Stack tracks.",
        href: "/courses/full-stack-development/java-full-stack-training-in-pune",
        category: "Full Stack",
      },
      {
        title: "MERN Stack Training",
        description:
          "MongoDB + Express + React + Node — the modern JS full-stack option for product companies and startups.",
        href: "/courses/full-stack-development/mern-stack-training-in-pune",
        category: "Full Stack",
      },
      {
        title: "React.js Training",
        description:
          "Deep frontend specialisation. Pairs perfectly with the Frontend Developer track.",
        href: "/courses/modern-web/react-training-in-pune",
        category: "Modern Web",
      },
      {
        title: "Node.js Training",
        description:
          "Build production backends — pairs with the Backend Developer track and the MERN/MEAN paths.",
        href: "/courses/modern-web/nodejs-training-in-pune",
        category: "Modern Web",
      },
      {
        title: "Data Science Training",
        description:
          "End-to-end data science with Python. Pairs with the Data Science and Analytics track.",
        href: "/courses/data-ai/data-science-training-in-pune",
        category: "Data & AI",
      },
      {
        title: "Machine Learning Training",
        description:
          "Production ML pipelines, model evaluation and deployment. Pairs with the AI / ML Engineer track.",
        href: "/courses/data-ai/machine-learning-training-in-pune",
        category: "Data & AI",
      },
      {
        title: "AWS Training",
        description:
          "Cloud foundations — every CareerCode track benefits from a deployment-and-infra layer.",
        href: "/courses/cloud-devops/aws-training-in-pune",
        category: "Cloud & DevOps",
      },
      {
        title: "Generative AI Training",
        description:
          "GenAI is now a baseline skill across every engineering specialisation. Layer it onto any track.",
        href: "/courses/generative-ai/genai-training-in-pune",
        category: "Generative AI",
      },
    ],
  },

  // ============================================================
  // TECHREADY
  // ============================================================
  {
    id: "techready",
    slug: "techready",
    name: "TechReady",
    tagline: "From Graduate to Industry-Ready Software Professional",
    subtitle:
      "Full-Time, Placement-Assisted Courses in Full Stack Development, Data Science, and AI — Archer Infotech, Pune",
    hook: "You have your degree. Now you need a job. Not just any job — the right job at the right company with the right salary. The kind of role your four years of engineering were supposed to lead to.",
    description:
      "TechReady is Archer Infotech's intensive, full-time, placement-assisted training program built for one purpose: to turn engineering graduates and final-year students into professionals that IT companies across India are actively competing to hire. If you are willing to commit 6 months, 6 hours a day, and your full focus — TechReady will deliver your career.",
    seo: {
      title:
        "TechReady | Job-Ready Full Stack and Data Science Courses in Pune | Archer Infotech",
      description:
        "TechReady by Archer Infotech is Pune's best placement-assisted full-time course for graduates. Java Full Stack, Python Full Stack, MERN, Data Science, AI/ML — 6 to 8 months, 6 hours daily. Get hired.",
      keywords: [
        "placement-assisted full stack course Pune",
        "job-oriented IT course Pune for graduates",
        "Java full stack training Pune",
        "Python full stack course Pune",
        "MERN stack training Pune",
        "data science course with placement Pune",
        "full-time coding bootcamp Pune",
        "IT course after engineering Pune",
        "software developer course Pune",
        "best placement training institute Pune",
      ],
    },
    targetAudience: [
      "Final-year engineering students (BE, BTech — any branch) who want to start placement preparation before graduation",
      "Recent engineering graduates who did not get placed during campus drives",
      "BCA and BSc CS graduates who want to enter the software industry with a specialised skill set",
      "Career changers from non-IT engineering backgrounds (Mechanical, Civil, Electrical) transitioning into software",
      "Graduates who cleared campus placements but want to upskill before their joining date",
    ],
    whyJoin: [
      {
        title: "The Industry Has Changed — Your Preparation Must Too",
        description:
          "In 2025, India's IT sector is hiring specialists. Companies are looking for engineers who can contribute from Week 1 — who know their stack, can build real applications, debug production issues, and communicate solutions clearly. TechReady is built around exactly what these companies are hiring for.",
      },
      {
        title: "17+ Years of Placement Track Record",
        description:
          "Archer Infotech has been placing students at IT employers since 2009 and works with 100+ hiring partners. TechReady is placement-assisted, not placement-guaranteed: we prepare you, build your portfolio, and introduce you to those partners. Past record is no guarantee of future prospects.",
      },
      {
        title: "Trainers Who Come From the Industry You Are Entering",
        description:
          "Every TechReady trainer is a working or recently retired corporate professional with a minimum of 15 years of industry experience. They know what interviewers ask, what projects impress, and what real production code looks like.",
      },
      {
        title: "Full-Time Intensity — Because Half-Measures Don't Work",
        description:
          "TechReady requires a minimum of 6 hours per day, 5 to 6 days per week. This is intentional. Half-committed learning produces half-ready candidates. If you treat this like a full-time job — it will get you one.",
      },
      {
        title: "One Program, Complete Transformation",
        description:
          "Technical skills. Projects. DSA preparation. Mock interviews. Resume writing. LinkedIn. Communication training. Aptitude coaching. Placement drives. TechReady covers everything.",
      },
    ],
    programs: [
      {
        name: "Java Full Stack Developer",
        subtitle: "One of the most in-demand and highest-paying developer profiles in India's IT industry.",
        description:
          "Java powers banking, enterprise software, healthcare systems, and large-scale applications across every major industry.",
        phases: [
          { name: "Core Java", duration: "4 Weeks", topics: ["OOP", "Collections", "Exception handling", "Generics", "Multithreading"] },
          { name: "Advanced Java", duration: "3 Weeks", topics: ["JDBC", "Servlets", "JSP", "Build tools (Maven/Gradle)"] },
          { name: "Spring Boot", duration: "5 Weeks", topics: ["REST APIs", "Spring Security", "JPA/Hibernate", "Microservices intro"] },
          { name: "Frontend", duration: "5 Weeks", topics: ["HTML5", "CSS3", "JavaScript ES6+", "React.js — components and hooks"] },
          { name: "Database", duration: "3 Weeks", topics: ["MySQL", "PostgreSQL", "Design, optimisation, joins, transactions"] },
          { name: "DevOps Basics", duration: "2 Weeks", topics: ["Git", "Docker", "CI/CD pipelines", "AWS EC2 and S3 basics"] },
          { name: "Capstone Project", duration: "4 Weeks", topics: ["Full stack Java + React application — built, tested, and deployed"] },
          { name: "Placement Prep", duration: "Ongoing", topics: ["DSA in Java", "System design basics", "Mock technical and HR interviews"] },
        ],
        careerRoles: ["Java Developer", "Full Stack Developer", "Backend Engineer", "Spring Boot Developer", "Software Engineer"],
      },
      {
        name: "Python Full Stack Developer",
        subtitle: "Python's versatility makes Python Full Stack Developers among the most adaptable professionals.",
        description:
          "Python dominates AI, data science, and backend development. Python Full Stack Developers are sought after by startups, product companies, and MNCs.",
        phases: [
          { name: "Python Core", duration: "4 Weeks", topics: ["OOP", "File handling", "Error handling", "Modules and packages"] },
          { name: "Backend Development", duration: "5 Weeks", topics: ["Django or FastAPI", "REST APIs", "Authentication", "Middleware"] },
          { name: "Frontend", duration: "5 Weeks", topics: ["HTML5", "CSS3", "JavaScript ES6+", "React.js"] },
          { name: "Database", duration: "3 Weeks", topics: ["PostgreSQL", "MongoDB", "ORM with SQLAlchemy or Django ORM"] },
          { name: "DevOps Basics", duration: "2 Weeks", topics: ["Docker", "Git", "Deployment on AWS or VPS", "Environment management"] },
          { name: "Capstone Project", duration: "4 Weeks", topics: ["Full stack Python + React application deployed and live"] },
          { name: "Placement Prep", duration: "Ongoing", topics: ["DSA in Python", "System design", "Mock interviews", "Resume prep"] },
        ],
        careerRoles: ["Python Developer", "Full Stack Developer", "Backend Engineer", "Django Developer", "FastAPI Developer"],
      },
      {
        name: "MERN Stack Developer",
        subtitle: "The modern web developer's stack — powering thousands of startups and SaaS products.",
        description:
          "MongoDB, Express.js, React.js, and Node.js — the MERN stack is the backbone of modern JavaScript-based full stack development.",
        phases: [
          { name: "JavaScript Deep Dive", duration: "3 Weeks", topics: ["ES6+", "async/await", "Closures", "Prototypes", "Event loop"] },
          { name: "React.js", duration: "5 Weeks", topics: ["Hooks", "Redux Toolkit", "React Router", "Tailwind CSS", "Component architecture"] },
          { name: "Node.js + Express.js", duration: "4 Weeks", topics: ["REST API design", "Middleware", "Authentication (JWT)", "File uploads"] },
          { name: "MongoDB", duration: "3 Weeks", topics: ["Schema design", "Mongoose", "Aggregation pipelines", "Indexing"] },
          { name: "Full Stack Integration", duration: "4 Weeks", topics: ["Connect frontend to backend", "State management", "Error handling"] },
          { name: "DevOps and Deployment", duration: "2 Weeks", topics: ["Docker", "Vercel", "MongoDB Atlas", "GitHub Actions basics"] },
          { name: "Capstone + Placement", duration: "5 Weeks", topics: ["Full MERN application", "DSA prep", "Mock interviews"] },
        ],
        careerRoles: ["MERN Stack Developer", "Full Stack JavaScript Developer", "React Developer", "Node.js Developer"],
      },
      {
        name: "MEAN Stack Developer",
        subtitle: "Enterprise-grade JavaScript full stack — preferred by large organisations.",
        description:
          "The MEAN stack replaces React with Angular — making it the preferred choice for enterprise-grade applications.",
        phases: [
          { name: "TypeScript and Angular", duration: "6 Weeks", topics: ["Components", "Services", "Routing", "Reactive forms", "RxJS", "NgRx"] },
          { name: "Node.js + Express.js", duration: "4 Weeks", topics: ["API design", "Middleware", "Authentication", "Error handling"] },
          { name: "MongoDB", duration: "3 Weeks", topics: ["Schema design", "Mongoose", "Advanced queries"] },
          { name: "Full Stack Integration", duration: "3 Weeks", topics: ["Complete MEAN application", "Docker", "Cloud deployment"] },
          { name: "Capstone + Placement", duration: "5 Weeks", topics: ["Full project", "DSA practice", "Mock technical interviews"] },
        ],
        careerRoles: ["MEAN Stack Developer", "Angular Developer", "Full Stack Developer", "Enterprise Web Developer"],
      },
      {
        name: ".NET Full Stack Developer",
        subtitle: "Microsoft's enterprise technology stack — top choice for government, banking, and insurance.",
        description:
          ".NET is the backbone of a significant portion of India's enterprise IT landscape. Consistently in demand at Infosys, TCS, Wipro, Cognizant, and enterprise product companies.",
        phases: [
          { name: "C# Core", duration: "4 Weeks", topics: ["OOP in C#", "LINQ", "Delegates", "Async/await programming"] },
          { name: "ASP.NET Core", duration: "5 Weeks", topics: ["Web APIs", "Entity Framework Core", "Identity", "Middleware"] },
          { name: "Frontend", duration: "5 Weeks", topics: ["HTML5", "CSS3", "JavaScript", "Angular or React"] },
          { name: "SQL Server", duration: "3 Weeks", topics: ["T-SQL", "Stored procedures", "Triggers", "Performance tuning"] },
          { name: "Azure Basics", duration: "2 Weeks", topics: ["Azure App Services", "Azure DevOps", "Cloud deployment"] },
          { name: "Capstone + Placement", duration: "4 Weeks", topics: ["Full .NET application deployed on Azure", "Interview prep"] },
        ],
        careerRoles: [".NET Developer", "Full Stack Developer", "C# Developer", "ASP.NET Developer", "Azure Developer"],
      },
      {
        name: "Data Analytics",
        subtitle: "Transform raw data into decisions — one of the most in-demand skills across every industry.",
        description:
          "Every company needs professionals who can collect, clean, analyse, and communicate data clearly. Data Analysts are among the most consistently hired profiles.",
        phases: [
          { name: "Excel and SQL", duration: "4 Weeks", topics: ["Advanced Excel", "Pivot tables", "SQL queries", "Joins", "Aggregation"] },
          { name: "Python for Data", duration: "4 Weeks", topics: ["Pandas", "NumPy", "Data cleaning", "Exploratory data analysis"] },
          { name: "Data Visualisation", duration: "4 Weeks", topics: ["Tableau", "Power BI", "Matplotlib", "Dashboards and visual storytelling"] },
          { name: "Statistics for Analysis", duration: "3 Weeks", topics: ["Descriptive and inferential statistics", "Hypothesis testing basics"] },
          { name: "Business Analytics", duration: "3 Weeks", topics: ["KPIs", "Business metrics", "Dashboard design", "Presenting insights"] },
          { name: "Capstone + Placement", duration: "6 Weeks", topics: ["Real-world analytics project", "Industry case studies", "Interviews"] },
        ],
        careerRoles: ["Data Analyst", "Business Analyst", "MIS Analyst", "Reporting Analyst", "BI Developer"],
      },
      {
        name: "Data Science",
        subtitle: "Build intelligent, data-driven systems — the most future-proof technical career.",
        description:
          "Data Scientists build the models and pipelines that power recommendation engines, fraud detection, healthcare diagnostics, and every intelligent application.",
        phases: [
          { name: "Python and Statistics", duration: "4 Weeks", topics: ["Python 3", "Probability", "Descriptive and inferential statistics"] },
          { name: "Machine Learning", duration: "5 Weeks", topics: ["Regression", "Classification", "Clustering", "Scikit-learn", "Model evaluation"] },
          { name: "Feature Engineering", duration: "3 Weeks", topics: ["Data preprocessing", "Feature selection", "Pipelines", "Cross-validation"] },
          { name: "Deep Learning", duration: "4 Weeks", topics: ["Neural networks", "TensorFlow/Keras", "CNNs", "Model tuning"] },
          { name: "NLP Basics", duration: "2 Weeks", topics: ["Text preprocessing", "Tokenisation", "Sentiment analysis"] },
          { name: "Model Deployment", duration: "2 Weeks", topics: ["Deploying ML models with Flask, FastAPI, and Streamlit"] },
          { name: "Capstone + Placement", duration: "4 Weeks", topics: ["End-to-end ML project — from raw data to deployed model"] },
        ],
        careerRoles: ["Data Scientist", "ML Engineer", "AI Analyst", "Research Analyst", "Data Science Developer"],
      },
      {
        name: "Data Engineering",
        subtitle: "Build the infrastructure that makes all data science and analytics possible.",
        description:
          "Data Engineers build the pipelines, warehouses, and processing systems that move and transform data at scale. Demand is growing faster than almost any other technical role.",
        phases: [
          { name: "SQL and Python", duration: "4 Weeks", topics: ["Advanced SQL", "Python scripting for automation and ETL"] },
          { name: "Data Pipelines", duration: "4 Weeks", topics: ["Apache Airflow", "ETL design patterns", "Pipeline orchestration"] },
          { name: "Big Data Basics", duration: "4 Weeks", topics: ["Hadoop ecosystem", "Apache Spark", "PySpark for large-scale data"] },
          { name: "Cloud Data Platforms", duration: "4 Weeks", topics: ["AWS S3", "Redshift", "Google BigQuery", "Cloud data warehousing"] },
          { name: "Streaming Data", duration: "2 Weeks", topics: ["Apache Kafka basics", "Real-time data streaming concepts"] },
          { name: "Capstone + Placement", duration: "4 Weeks", topics: ["Design and build a complete data pipeline", "Interview prep"] },
        ],
        careerRoles: ["Data Engineer", "ETL Developer", "Big Data Engineer", "Cloud Data Engineer", "Pipeline Developer"],
      },
      {
        name: "Machine Learning and AI Engineer",
        subtitle: "The most cutting-edge technical career — building intelligent systems transforming every industry.",
        description:
          "ML and AI Engineers design, train, evaluate, and deploy intelligent machine learning models at scale. Among the most sought-after and highest-paid professionals globally.",
        phases: [
          { name: "Python and Mathematics", duration: "4 Weeks", topics: ["Linear algebra", "Calculus", "Probability", "Mathematical foundation of ML"] },
          { name: "Classical Machine Learning", duration: "4 Weeks", topics: ["Scikit-learn", "Supervised and unsupervised learning", "Model selection"] },
          { name: "Deep Learning", duration: "5 Weeks", topics: ["PyTorch or TensorFlow", "Neural network architectures", "CNNs", "RNNs"] },
          { name: "NLP and Large Language Models", duration: "4 Weeks", topics: ["Transformers", "Hugging Face", "Fine-tuning", "Prompt engineering basics"] },
          { name: "Computer Vision", duration: "3 Weeks", topics: ["OpenCV", "Image classification", "Object detection", "YOLO"] },
          { name: "MLOps", duration: "2 Weeks", topics: ["Model versioning", "Deployment pipelines", "Monitoring", "MLflow"] },
          { name: "Capstone + Placement", duration: "4 Weeks", topics: ["End-to-end AI project", "Research paper review", "Mock interviews"] },
        ],
        careerRoles: ["ML Engineer", "AI Engineer", "Deep Learning Engineer", "NLP Engineer", "Computer Vision Engineer"],
      },
      {
        name: "Advanced Frontend Development",
        subtitle: "React, Angular, React Native, and Flutter — build interfaces for web and mobile.",
        description:
          "Advanced Frontend Developers build complex, high-performance applications for web and mobile. Ideal for specialising in the most visible, user-facing layer of technology.",
        phases: [
          { name: "JavaScript Mastery", duration: "3 Weeks", topics: ["Deep ES6+", "TypeScript fundamentals", "Performance patterns"] },
          { name: "Advanced React.js", duration: "5 Weeks", topics: ["Redux Toolkit", "Performance optimisation", "Testing", "SSR with Next.js"] },
          { name: "React Native", duration: "4 Weeks", topics: ["Cross-platform mobile apps", "Navigation", "Device APIs", "App publishing"] },
          { name: "Angular", duration: "4 Weeks", topics: ["Enterprise Angular", "RxJS", "NgRx", "Module architecture"] },
          { name: "Flutter", duration: "4 Weeks", topics: ["Dart language basics", "Flutter UI", "State management", "iOS and Android"] },
          { name: "Capstone + Placement", duration: "4 Weeks", topics: ["Build and publish a cross-platform mobile app", "Portfolio prep"] },
        ],
        careerRoles: ["Frontend Developer", "React Native Developer", "Flutter Developer", "Mobile App Developer", "UI Engineer"],
      },
    ],
    commonModules: [
      {
        title: "DSA and Competitive Problem Solving",
        description:
          "Arrays, strings, linked lists, stacks, queues, trees, graphs, sorting, searching, dynamic programming — practiced at the company interview level. Regular coding challenges and timed problem sets.",
      },
      {
        title: "System Design Basics",
        description:
          "Scalability, load balancing, databases, caching, microservices, and real-world architecture discussions for fresher and junior interviews.",
      },
      {
        title: "Mock Interview Program",
        description:
          "Full mock interviews — technical coding rounds, system design rounds, and HR/behavioural rounds — conducted by industry professionals. Recorded, with structured feedback.",
      },
      {
        title: "Resume Writing and ATS Optimisation",
        description:
          "Professional, ATS-optimised resume that gets shortlisted. Formatting, impact-driven bullet writing, skills presentation, and role-specific tailoring.",
      },
      {
        title: "LinkedIn and Naukri Profile",
        description:
          "Recruiter-optimised profiles with keyword strategy, connection building, and activity planning that puts you in front of hiring managers.",
      },
      {
        title: "Communication and Soft Skills",
        description:
          "MNC-standard English communication — speaking confidently, presenting technical solutions, participating in group discussions, and handling behavioural interviews.",
      },
      {
        title: "Placement Drives and Company Connections",
        description:
          "Active hiring relationships with 100+ companies across Pune, Mumbai, Bengaluru, and Hyderabad. TechReady students are eligible for placement drives, direct referrals, and interview scheduling.",
      },
    ],
    roadmapImage: {
      src: "/images/courses/techready-path-v1.webp",
      width: 1400,
      height: 900,
      alt: "Eight-stage TechReady intensive learning path taught at Archer Infotech Pune, shared across all ten programmes: language core over four weeks covering Java, Python, JavaScript or C sharp; advanced language over three to four weeks covering depth, patterns and problem solving; backend and frameworks over five weeks covering Spring Boot, Django, Node or dot NET; frontend over five weeks covering React, Angular or advanced user interface work; databases over three weeks covering SQL, NoSQL, modelling and queries; DevOps and deployment over two weeks covering Git, Docker, CI/CD and cloud basics; a capstone project over four to six weeks producing a reviewed portfolio-grade build; and ongoing placement preparation covering aptitude, mock interviews, resume work and referrals.",
      caption:
        "The shape every TechReady programme follows. The specific technologies differ by programme — the full phase list for all ten is below.",
    },

    syllabusDownload: {
      pdfUrl: "/downloads/techready-bootcamp-syllabus-v1.pdf",
      title: "TechReady Syllabus — All Ten Programmes, Phase by Phase",
      slug: "techready-bootcamp-syllabus",
      blurb:
        "The complete syllabus as a PDF — all ten programmes (Java, Python and .NET Full Stack, MERN, MEAN, Data Analytics, Data Science, Data Engineering, ML and AI Engineering, Advanced Frontend) with every phase and its week count, plus the shared placement-preparation track. Everything in it is on this page; the PDF is the portable version.",
      asideBlocks: [
        {
          heading: "What is inside the PDF",
          items: [
            "All ten programmes with their phase list and week counts, so the six-to-eight-month commitment is fully costed in time before you start.",
            "The shared shape behind every programme — language core, frameworks, frontend, databases, DevOps, capstone, placement preparation.",
            "The career roles each programme targets, so you pick against a job title rather than a technology name.",
            "The placement-preparation track in full: aptitude, communication, mock interviews, resume, and how referrals actually work.",
          ],
        },
        {
          heading: "Who this programme is for",
          items: [
            "Final-year students and graduates of BE, BTech, BCA or BSc CS, from any branch.",
            "Career changers who can commit six hours a day, full time, for six to eight months.",
            "Graduates with a degree but no portfolio, who need reviewed project work.",
            "Anyone who has self-studied but cannot convert interviews.",
          ],
        },
      ],
    },

    comparison: {
      headline: "How TechReady Compares With Other Full-Time Programmes",
      intro:
        "The comparison is deliberately anonymous — these are patterns we verified across Pune institutes and the national benchmark full-time programme, not accusations about any named provider.",
      usLabel: "At TechReady",
      othersLabel: "Most other full-time programmes",
      rows: [
        {
          us: "A 90% placement rate from institute records, stated as assistance rather than a guarantee — we do not claim 100%",
          others:
            "'100% placement assistance' is the default phrase across Pune — and it is the exact construction India's advertising code names as one that should not be used",
        },
        {
          us: "No separate placement fee — placement support is bundled into the course fee",
          others:
            "At least one large Pune institute charges a one-time placement fee, payable after your offer letter is issued",
        },
        {
          us: "Open to BE, BTech, BCA and BSc CS graduates from any branch, with no entrance exam",
          others:
            "The national benchmark full-time programme requires a technical degree with a 55% minimum plus an entrance test",
        },
        {
          us: "Six hours a day across six to eight months, in a Kothrud classroom",
          others:
            "The national benchmark runs 24 weeks and about 1,200 hours, of which roughly 300 are self-study, at ₹99,000 plus GST",
        },
        {
          us: "Mock interviews run as separate technical, system-design and HR rounds, with written feedback",
          others:
            "A single combined mock interview near the end, if one is run at all",
        },
      ],
      closing:
        "The eligibility and hours rows cut both ways: the benchmark programme is selective and we are not, which is the point for a graduate whose degree branch or percentage would exclude them. Compare on what you need, not on which table looks better.",
    },

    toolsAndTech: {
      intro:
        "Ten programmes, each with its own stack. You work in one of them — the full list is here so you can see what a programme commits you to before you enrol, not after.",
      groups: [
        {
          label: "Java Stack",
          items: ["Core Java", "Advanced Java", "Spring Boot", "REST APIs", "JUnit", "Maven"],
        },
        {
          label: "Python Stack",
          items: ["Python Core", "Django", "FastAPI", "SQLAlchemy", "PyTest"],
        },
        {
          label: "JavaScript Stack",
          items: ["JavaScript ES6+", "TypeScript", "React.js", "Angular", "Node.js", "Express.js", "MongoDB"],
        },
        {
          label: "Microsoft Stack",
          items: ["C#", "ASP.NET Core", "Entity Framework", "SQL Server", "Azure basics"],
        },
        {
          label: "Data and Analytics",
          items: ["Excel", "SQL", "Pandas", "NumPy", "Power BI", "Tableau", "Statistics"],
        },
        {
          label: "Machine Learning and AI",
          items: ["Scikit-learn", "TensorFlow", "PyTorch", "NLP", "Large Language Models", "Computer Vision", "MLOps"],
        },
        {
          label: "Data Engineering",
          items: ["Data pipelines", "Big data basics", "Cloud data platforms", "Streaming data", "Airflow"],
        },
        {
          label: "Mobile and Cross-Platform",
          items: ["React Native", "Flutter"],
        },
        {
          label: "DevOps and Delivery",
          items: ["Git", "GitHub", "Docker", "CI/CD pipelines", "Cloud deployment", "Postman"],
        },
      ],
    },

    careerOutcomes: {
      intro:
        "TechReady is the placement-focused programme of the three, and the only one that asks for full-time commitment. Six hours a day for six to eight months is a real cost — the return is a reviewed portfolio, interview practice against people who hire, and introductions to our partner companies.",
      immediateBenefits: [
        "A capstone project that has been reviewed and revised, not just submitted.",
        "A GitHub portfolio and README discipline that survives a technical interviewer reading it.",
        "Mock interviews with feedback, run as separate technical, system-design and HR rounds.",
        "Aptitude and communication training, which is where most technically capable candidates are actually filtered out.",
        "Introductions into our network of 100+ active placement partners.",
      ],
      longTermPaths: [
        "Java Developer, Backend Engineer or Spring Boot Developer",
        "Python Developer, Django or FastAPI Developer",
        "Full Stack Developer — MERN, MEAN, Java or .NET",
        ".NET Developer or Enterprise Application Developer",
        "Data Analyst, Business Analyst or Analytics Engineer",
        "Data Scientist or Data Engineer",
        "Machine Learning Engineer or AI Engineer",
        "Frontend Developer or Mobile Developer (React Native, Flutter)",
      ],
      salaryBands: [
        {
          role: "Junior Java Developer (Pune)",
          band: "₹3,62,182 per year",
          source: { label: "Indeed Pune (December 2025)", url: "https://in.indeed.com/career/java-developer/salaries/Pune--Maharashtra" },
        },
        {
          role: "Junior Python Full Stack Developer (Pune entry, <2 years)",
          band: "₹4,00,000 – ₹7,00,000 per year",
          source: { label: "AmbitionBox Pune Python Full Stack Developer", url: "https://www.ambitionbox.com/profile/python-full-stack-developer-salary-in-pune" },
        },
        {
          role: "Junior Data Analyst (Pune entry, <2 years)",
          band: "₹3,50,000 – ₹6,00,000 per year",
          source: { label: "AmbitionBox Pune Data Analyst", url: "https://www.ambitionbox.com/profile/data-analyst-salary-in-pune" },
        },
        {
          role: "Junior ML Engineer (Pune entry, <2 years)",
          band: "₹6,00,000 – ₹10,00,000 per year",
          source: { label: "AmbitionBox Pune ML Engineer", url: "https://www.ambitionbox.com/profile/machine-learning-engineer-salary-in-pune" },
        },
        {
          role: "Full Stack Developer overall — Pune",
          band: "₹10,61,661 per year",
          source: { label: "Indeed Pune Full Stack (January 2026, n=35)", url: "https://in.indeed.com/career/full-stack-developer/salaries/Pune--Maharashtra" },
        },
      ],
      hiringCompanies: [
        "Persistent Systems",
        "Capgemini",
        "LTIMindtree",
        "Tech Mahindra",
        "Amdocs",
        "Cybage",
        "Cognizant",
        "Wipro",
        "Accenture",
        "Saksoft",
        "TCS",
        "IBM India",
      ],
      localContext: {
        headline: "An honest word on placement",
        body:
          "We describe TechReady as placement-assisted, and we mean assisted. Our institute-records placement rate across all tracks is 90% — not 100%, and we will not claim otherwise. What we control is preparation, portfolio quality, and introductions to the 100+ companies we work with; what you control is applying consistently through the months after you finish. The candidates who do not convert are, in our experience, far more often held back by interview communication than by what they can build.",
      },
    },

    notForYou: [
      "Anyone who cannot commit six hours a day for six to eight months. This is the whole premise of the programme; part-time attendance does not produce the outcome.",
      "Students still in second or third year — CareerCode is the programme that runs alongside a degree without competing with it.",
      "Anyone looking for a guaranteed job. We are placement-assisted, not placement-guaranteed, and our institute-records rate is 90% rather than 100%.",
      "Working professionals who cannot leave their current role. The full-time schedule is not compatible with a job.",
      "Anyone wanting a certificate for a CV rather than the skills behind it. The programme is built around reviewed project work and will be an unpleasant six months otherwise.",
    ],

    projects: [
      {
        title: "Phase projects across the programme",
        description:
          "Each phase ends in something built rather than something attended — a REST API with authentication, a React interface consuming it, a normalised schema under both, a containerised deployment. These are reviewed and revised rather than submitted and forgotten, which is what makes the capstone possible later.",
        technologies: ["Your programme's stack", "Git", "GitHub", "Postman", "Docker"],
      },
      {
        title: "The reviewed capstone",
        description:
          "Four to six weeks of full-time work on a single end-to-end system in your chosen programme's stack, with a mentor reviewing architecture decisions rather than only output. The revision cycle is the point: most candidates have never had someone senior tell them why a design choice was wrong, and it is the fastest quality jump in the programme.",
        technologies: ["Full stack of your programme", "Cloud deployment", "CI/CD", "Architecture decision records"],
      },
      {
        title: "A portfolio built to be read",
        description:
          "Repository structure, README files that explain what a project does and why, commit history that shows progression, and a deployed link where one makes sense. Interviewers spend two minutes on a GitHub profile; this session is about what those two minutes should show.",
        technologies: ["GitHub", "Markdown", "Deployment", "Documentation"],
      },
    ],

    trainersIntro:
      "TechReady is taught by trainers with 15+ years of industry experience who have themselves sat on hiring panels — which is why the mock interviews are run as separate technical, system-design and HR rounds rather than as one conversation.",

    fees: {
      note:
        "TechReady is the largest of our three programmes in both duration and cost, and the fee varies by programme — the ten tracks differ in length, from six to eight months. We quote against the specific programme rather than publishing one number that would be wrong for most of them. EMI options exist and most students use them; ask admissions for the current schedule for your chosen programme.",
      sourceCitation: { label: "Current fee schedule — contact admissions", url: "/contact" },
      paymentOptions: [
        "One-time payment at enrolment",
        "EMI plans — the option most TechReady students take",
        "Instalments aligned to programme phases",
        "Free demo class and programme-selection counselling before you commit",
      ],
    },

    placementSupport: {
      paragraphs: [
        "TechReady is the placement-focused programme of the three, and placement support is bundled rather than sold separately. It begins during the programme rather than after it: by the time you finish, your CV is written, your portfolio is reviewed, and you have sat several mock interviews with feedback.",
        "We describe the programme as placement-assisted and mean it literally. Our institute-records placement rate across all tracks is 90% — we will not claim 100%, and you should treat any Pune institute that does with caution. What we control is preparation quality and introductions to the 100+ companies we work with. What you control is applying consistently in the months after you finish. In our experience the candidates who do not convert are held back far more often by interview communication than by what they can build, which is why aptitude and communication training run throughout rather than at the end.",
      ],
      process: [
        "Throughout: aptitude and communication training running alongside the technical phases",
        "Capstone phase: CV built around your actual project work, GitHub portfolio audited",
        "Capstone phase: technical mock interview with structured written feedback",
        "Capstone phase: system-design round appropriate to your programme",
        "Final weeks: HR mock interview plus salary-negotiation guidance",
        "After completion: introductions to partner companies actively hiring your profile",
        "After completion: weekly placement-cell check-ins while you apply",
      ],
      partnerCompanies: [
        "Persistent Systems",
        "Capgemini",
        "LTIMindtree",
        "Tech Mahindra",
        "Amdocs",
        "Cybage",
        "Cognizant",
        "Wipro",
        "Accenture",
        "Saksoft",
        "TCS",
        "IBM India",
      ],
    },

    versusAlternative: {
      heading: "TechReady or applying directly after graduation — is six months worth it?",
      paragraphs: [
        "If you have a strong degree from a well-placed college, existing project work, and campus placements that are actually running, apply directly. Six to eight months full-time is a real cost in both fees and foregone earnings, and a candidate who can already convert interviews should not be paying for help converting interviews.",
        "The programme is built for the situation most graduates we meet are actually in: a degree, no portfolio, no reviewed project work, and applications that are not converting. Six months is long enough to change what you can build rather than only how you present it — and the honest framing is that this is the expensive option precisely because it is the intensive one. If your gap is small, take a single course from our catalogue instead; we will tell you so at the counselling session rather than selling you the largest programme by default.",
      ],
    },

    prerequisitesAndStart: {
      paragraphs: [
        "You need to be a final-year student or a graduate of BE, BTech, BCA or BSc CS — any branch, including Mechanical, Civil, Electrical and ENTC, which are well represented in most batches. Graduate-level fundamentals are assumed but a specific programming background is not; each programme opens with a four-week language core from the beginning.",
        "The real prerequisite is availability. Six hours a day, five days a week, for six to eight months is the commitment, and it does not survive being combined with a full-time job. The decision worth taking seriously before you enrol is which of the ten programmes to take, because switching after the language core costs weeks — we run a counselling session for that rather than letting students pick by title.",
      ],
      suggestedSteps: [
        "Book the programme-selection counselling session — the ten programmes lead to different jobs",
        "Confirm you can genuinely clear six hours a day for the full duration",
        "Attend a free demo class in the programme you are considering",
        "Visit the Kothrud campus and ask to see current students' capstone work",
        "Create a free GitHub account; your portfolio starts in the first phase",
      ],
    },

    details: [
      { label: "Designed For", value: "Final-year students and engineering/BCA/BSc CS graduates" },
      { label: "Programs", value: "Java Full Stack, Python Full Stack, MERN, MEAN, .NET Full Stack, Data Analytics, Data Science, Data Engineering, ML/AI Engineering, Advanced Frontend" },
      { label: "Duration", value: "6 to 8 Months per Program" },
      { label: "Daily Hours", value: "Minimum 6 Hours per Day" },
      { label: "Mode", value: "Full-Time — Classroom (Kothrud, Pune) with Online Option" },
      { label: "Placement Assistance", value: "Placement-Assisted" },
      { label: "Language", value: "English (Marathi and Hindi support available)" },
      { label: "Certification", value: "Archer Infotech Certificate + Project Portfolio" },
      { label: "Eligibility", value: "Final-year students or graduates — BE, BTech, BCA, BSc CS (any branch)" },
      { label: "Trainer Experience", value: "15+ Years Industry Experience" },
      { label: "Company Connections", value: "100+ Active Placement Partners" },
    ],
    faqs: [
      {
        question: "What makes TechReady different from regular coaching?",
        answer:
          "TechReady is a full-time, industry-intensive program — not a weekend course or a set of video lectures. It runs 6 hours per day, taught by professionals with 15+ years of corporate experience, and includes real projects, full placement assistance, DSA prep, communication training, and direct hiring connections with 100+ companies.",
      },
      {
        question: "Which TechReady program should I choose?",
        answer:
          "Java Full Stack and Python Full Stack are the most consistently in-demand across large companies. MERN is ideal for startup and product company roles. Data Science and ML/AI are for those targeting the analytics and AI space. We offer free counselling sessions to help you choose.",
      },
      {
        question: "Is TechReady available for non-CS engineering branches?",
        answer:
          "Yes. TechReady is regularly joined by students from Mechanical, Civil, Electrical, and ENTC engineering backgrounds who want to transition into software. Our curriculum brings these students from basics to job-readiness within the program duration.",
      },
      {
        question: "What is the placement track record?",
        answer:
          "Archer Infotech has been placing students at IT employers since 2009. We maintain active relationships with 100+ hiring partners and a dedicated placement cell. TechReady is placement-assisted, not placement-guaranteed — support does not stop on the last day of the course, and there is no separate placement fee. Past record is no guarantee of future prospects.",
      },
      {
        question: "How many hours per day is TechReady?",
        answer:
          "TechReady requires a minimum of 6 hours of training per day, 5 to 6 days per week. This is a full-time commitment — the intensity level of a job, because that is exactly what it prepares you for.",
      },
      {
        question: "Can I join TechReady before my final exams are complete?",
        answer:
          "Yes. Many students join TechReady in their final semester, running the course alongside their last semester of college. We design the schedule to accommodate this wherever possible.",
      },
      {
        question: "Does TechReady include placement for outstation students?",
        answer:
          "Yes. TechReady prepares students for opportunities across Pune, Mumbai, Bengaluru, Hyderabad, and other major IT hubs. Many of our placed students are from outside Pune. Online mode is available for students who cannot relocate.",
      },
    ],
    closingCTA: {
      headline: "Are you TechReady?",
      body: "This is the moment that defines the next 10 years of your career. Every month after graduation that passes without a structured plan takes you further from the opportunities available right now. TechReady is your 6-month transformation. From graduate to professional. From resume to offer letter. From classroom to career.",
    },
    // TechReady has 10 placement-oriented programs. Each maps directly to
    // one or more standalone Archer Infotech courses learners can deepen
    // independently or revisit via lifetime LMS access. P4-13.
    relatedCourses: [
      {
        title: "Java Full Stack Training",
        description:
          "Standalone deep-dive matching the Java Full Stack TechReady program — Spring Boot + microservices + React.",
        href: "/courses/full-stack-development/java-full-stack-training-in-pune",
        category: "Full Stack",
      },
      {
        title: ".NET Full Stack Training",
        description:
          "ASP.NET Core + C# + Angular for the Microsoft-stack track. Matches the .NET Full Stack TechReady program.",
        href: "/courses/full-stack-development/dotnet-full-stack-training-in-pune",
        category: "Full Stack",
      },
      {
        title: "MERN Stack Training",
        description:
          "Full-depth MongoDB + Express + React + Node coverage. Matches the MERN Stack TechReady program.",
        href: "/courses/full-stack-development/mern-stack-training-in-pune",
        category: "Full Stack",
      },
      {
        title: "Python Full Stack Training",
        description:
          "Django + REST + React deep-dive. Matches the Python Full Stack TechReady program.",
        href: "/courses/full-stack-development/python-full-stack-training-in-pune",
        category: "Full Stack",
      },
      {
        title: "Spring Boot & Microservices",
        description:
          "Architecture-grade Spring Boot, Spring Cloud and microservices — pairs with any Java-track placement target.",
        href: "/courses/programming/spring-boot-microservices-training-in-pune",
        category: "Programming",
      },
      {
        title: "Data Science Training",
        description:
          "End-to-end Python data science. Matches the Data Science TechReady program.",
        href: "/courses/data-ai/data-science-training-in-pune",
        category: "Data & AI",
      },
      {
        title: "Machine Learning Training",
        description:
          "Production ML — algorithms, deployment, MLOps. Pairs with Data Science and AI Engineer tracks.",
        href: "/courses/data-ai/machine-learning-training-in-pune",
        category: "Data & AI",
      },
      {
        title: "AWS Solutions Architect",
        description:
          "Pune's most in-demand cloud certification. Pairs with the Cloud / DevOps TechReady program.",
        href: "/courses/cloud-certifications/aws-solutions-architect-training-in-pune",
        category: "Cloud Certifications",
      },
      {
        title: "DevOps Training",
        description:
          "Docker, Kubernetes, Jenkins, Terraform — the operational layer for any full-stack or cloud role.",
        href: "/courses/cloud-devops/devops-training-in-pune",
        category: "Cloud & DevOps",
      },
      {
        title: "Generative AI Training",
        description:
          "LLMs, RAG, LangChain, prompt engineering — bundled with the AI Engineer track and increasingly required across full-stack roles.",
        href: "/courses/generative-ai/genai-training-in-pune",
        category: "Generative AI",
      },
    ],
  },
];

export function getBootcamp(slug: string): Bootcamp | undefined {
  return bootcamps.find((b) => b.slug === slug);
}

export function getAllBootcamps(): Bootcamp[] {
  return bootcamps;
}
