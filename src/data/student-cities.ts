/**
 * City "feeder" landing pages — /it-training-in-pune-for/<city>.
 *
 * DISTINCT from /locations (which are Pune *neighbourhoods* on a physical
 * commute). These target students in other Maharashtra cities and present
 * TWO honest, real options:
 *   1. Join Archer's LIVE instructor-led ONLINE batches from their home city.
 *   2. Relocate to Pune (hostels/PG near the Kothrud centre) for classroom.
 *
 * Pune is the IT-training & hiring hub of Western Maharashtra, and students
 * from Satara, Kolhapur, Sangli, Solapur, Ahmednagar genuinely either train
 * online with Pune institutes or move to Pune — so these pages serve a real
 * intent. Every field is written per-city (real distances, transport, why
 * Pune) to stay well clear of thin/doorway-page territory, exactly like the
 * /locations cluster.
 *
 * NOTE: distances/travel times are approximate and should be verified before
 * scaling beyond the pilot.
 */
export interface StudentCity {
  /** URL slug under /it-training-in-pune-for/ — e.g. "satara". */
  slug: string;
  /** Display name — e.g. "Satara". */
  city: string;
  /** Region label for grouping/breadcrumbs. */
  region: string;
  /** Approx road distance to the Kothrud, Pune centre (km). */
  distanceKm: number;
  /** Approx road travel time label. */
  travelTimeLabel: string;
  /** 1 = highest priority feeder. Drives ordering. */
  priority: number;

  metaTitle: string;
  metaDescription: string;
  tagline: string;

  /**
   * Optional override for the H1 / hero heading. Defaults to
   * "IT Training in Pune for <city> Students". Set this when the city has a
   * local office so the page doesn't read as Pune-only.
   */
  heroHeading?: string;

  /**
   * Substrings within `heroHeading` to render in the accent colour
   * (e.g. the city name / locality) — mirrors how the default heading
   * accents the city name on the other city pages.
   */
  heroHeadingHighlights?: string[];

  /**
   * Optional colourful highlight blocks (icon + title + keyword-rich text)
   * shown near the top of the page. Adds visual colour + scannable signals.
   */
  highlights?: {
    icon: "Award" | "Laptop" | "Briefcase" | "Users" | "CalendarDays" | "MapPin";
    color: "amber" | "sky" | "emerald" | "violet";
    title: string;
    text: string;
  }[];

  /** Keyword pills — popular tracks taught, for SEO + quick scanning. */
  trackKeywords?: string[];

  /** 4–5 line intro paragraphs shown under the respective section headings. */
  optionsIntro?: string;
  whyIntro?: string;
  coursesIntro?: string;

  /**
   * Optional — a REAL local Archer presence in this city (e.g. weekend
   * batches at a local office). When set, the page leads with this as the
   * primary option (genuine local classroom), with online + Pune as the
   * other two. Only set this where an office actually exists.
   */
  localOffice?: {
    /** Area + city, e.g. "Vishrambag, Sangli". */
    area: string;
    /** Short schedule label, e.g. "Weekend batches · Sat & Sun". */
    scheduleLabel: string;
    /** 2 paragraphs about the local weekend batches — city-specific. */
    paragraphs: string[];
    /** Address/contact note shown to students (confirm exact address before publish). */
    note: string;
  };

  /** 2 paragraphs, ~180–220 words, city-specific opening. */
  intro: string[];

  /** Angle A — live online batches. */
  online: string[];

  /** Angle B — relocating to Pune. */
  relocation: {
    travelParagraphs: string[];
    travelModes: { mode: string; detail: string }[];
    stayParagraphs: string[];
  };

  /** Why choose Archer (Pune) over staying with local-only options. */
  whyArcher: string[];

  /** Course slugs popular with students from this city (resolved at render). */
  popularCourseSlugs: string[];

  /** 4 genuinely city-specific FAQs. */
  localFaqs: { question: string; answer: string }[];
}

export const studentCities: StudentCity[] = [
  {
    slug: "satara",
    city: "Satara",
    region: "Western Maharashtra",
    distanceKm: 110,
    travelTimeLabel: "~2.5 hours by road",
    priority: 1,
    metaTitle:
      "IT Training for Satara Students — Live Online + Classroom in Pune | Archer Infotech",
    metaDescription:
      "Satara students: learn Java, Python, Full Stack, Data & DevOps with Archer Infotech via live online batches from Satara, or relocate to our Kothrud, Pune centre. 90% placement support, est. 2009.",
    tagline:
      "Two ways to train with Pune's established IT institute — without leaving your career to chance.",
    highlights: [
      {
        icon: "Laptop",
        color: "sky",
        title: "Live online from Satara",
        text: "Real-time Java, Python & Full Stack classes you join from home — no relocation needed.",
      },
      {
        icon: "MapPin",
        color: "emerald",
        title: "Classroom in Pune",
        text: "Relocate to our Kothrud centre — just ~110 km up NH-48 from Satara.",
      },
      {
        icon: "Briefcase",
        color: "amber",
        title: "90% placement support",
        text: "Resume prep, mock interviews & 100+ hiring partners across Pune.",
      },
      {
        icon: "Users",
        color: "violet",
        title: "Industry-expert trainers",
        text: "Learn from working professionals — Pune's trusted IT institute since 2009.",
      },
    ],
    trackKeywords: [
      "Java",
      "Python",
      "Full Stack Development",
      "MERN Stack",
      "Data Science",
      "Data Analytics",
      "AWS & DevOps",
      "Software Testing",
    ],
    optionsIntro:
      "Whether you'd rather study from home or experience Pune's IT ecosystem first-hand, Archer Infotech gives Satara students a clear path into a tech career. Join our live online batches without leaving Satara, or relocate to our Kothrud, Pune centre for full-time classroom training. Both modes run the same job-focused curriculum, the same expert trainers, and the same 90% placement support — so you pick what fits your schedule and goals, never a watered-down version.",
    whyIntro:
      "Satara has plenty of local coaching, but few options give a direct line into Pune's IT job market. Archer Infotech has trained software professionals in Pune since 2009 — 10,000+ trained and 5,000+ placed. From industry-experienced trainers to a 100+ company hiring-partner network, here's what makes training with Archer — online or in person — worth it for Satara learners.",
    coursesIntro:
      "From core programming to full stack, data, and cloud, Archer's catalogue covers the skills Pune and Maharashtra employers actually hire for. These are the tracks Satara students choose most — each available as a live online batch you can join from Satara or as classroom training in Pune. Not sure which fits? Free career counselling helps you choose based on your background and target role.",
    intro: [
      "If you're a student or working professional in Satara aiming for an IT career, Pune is the natural next step — it's the closest major IT-training and hiring hub, just ~110 km up the Pune–Bengaluru highway. Archer Infotech has trained software aspirants in Pune since 2009, and Satara learners now have two genuine ways to join: our live instructor-led online batches, or our classroom programme at the Kothrud centre.",
      "You don't have to choose between staying in Satara and getting Pune-quality training. The same trainers, curriculum, and placement team back both modes. Below we lay out exactly how each option works for someone coming from Satara — the online route, the relocation route, travel, and where students stay near our centre.",
    ],
    online: [
      "Our live online batches are real, instructor-led classes — not pre-recorded videos. You join the same sessions as our Pune classroom students over video, ask questions in real time, and get every session recording for revision. For a Satara student, that means you can complete a full Java Full Stack, Python, Data Analytics, or DevOps track from home without spending on relocation or hostels.",
      "Online learners get the same placement support — resume building, mock interviews, and access to our 100+ hiring-partner network. Working professionals in Satara often pick the online mode with weekend or evening batch timings so they can upskill without leaving their current job.",
    ],
    relocation: {
      travelParagraphs: [
        "Many Satara students prefer the classroom experience and relocate to Pune for the duration of their course. The good news: Satara is one of the easiest Western-Maharashtra cities to commute from. It sits directly on NH-48 (the Pune–Bengaluru expressway corridor), so buses run almost round the clock.",
        "Even weekend commuting is realistic for some — a Friday-evening trip home and Monday-morning return is common among Satara students studying in Pune.",
      ],
      travelModes: [
        {
          mode: "MSRTC & private buses",
          detail:
            "Frequent ST and private buses on the Satara–Pune (Swargate/Shivajinagar) route; ~2.5 hours via NH-48.",
        },
        {
          mode: "Train",
          detail:
            "Satara railway station is on the Pune–Miraj line, with daily passenger and express services to Pune.",
        },
        {
          mode: "Own vehicle / cab",
          detail:
            "~110 km on a near-continuous expressway-grade highway — among the smoother drives into Pune.",
        },
      ],
      stayParagraphs: [
        "Our centre is in Kothrud, west Pune — one of the city's most student-friendly belts. Affordable PGs and hostels are plentiful in Kothrud itself and the adjoining Karve Nagar, Warje, and Erandwane areas, many within walking or short-bus distance of the centre.",
        "Kothrud is well connected by PMPML buses and is considered one of Pune's safer, quieter residential zones — a comfortable landing spot for outstation students settling in from Satara.",
      ],
    },
    whyArcher: [
      "Established 2009 — 17+ years training Pune's IT workforce, with 10,000+ students trained and 5,000+ placed.",
      "90% placement support with a 100+ company hiring-partner network (active recruiters include Amdocs, Capgemini, MindTree, and Tech Mahindra).",
      "Same trainers and curriculum whether you choose live online or classroom.",
      "40+ job-focused courses across programming, full stack, data, AI, and cloud/DevOps.",
    ],
    popularCourseSlugs: [
      "java-full-stack-training-in-pune",
      "python-training-in-pune",
      "data-analytics-training-in-pune",
      "aws-solutions-architect-training-in-pune",
    ],
    localFaqs: [
      {
        question: "Can I do IT training from Satara without moving to Pune?",
        answer:
          "Yes, absolutely. Archer Infotech runs live, instructor-led online batches you can join from anywhere in Satara. These are the same real-time classes our Pune classroom students attend — with live doubt-solving, recordings of every session for revision, hands-on assignments, and the full placement-support package. So you can complete an entire Java, Python, Full Stack, Data, or DevOps programme from home in Satara, without spending on travel, hostels, or relocation.",
      },
      {
        question: "How far is Archer Infotech from Satara?",
        answer:
          "Our centre is in Kothrud, west Pune — about 110 km from Satara, or roughly 2.5 hours by road along NH-48, the Pune–Bengaluru expressway corridor. Frequent MSRTC and private buses run the Satara–Pune route almost round the clock, and Satara also sits on the Pune–Miraj railway line with daily passenger and express trains. The smooth highway makes Satara one of the easiest Western-Maharashtra cities to reach Pune from.",
      },
      {
        question: "Are there hostels or PGs near the centre for Satara students?",
        answer:
          "Yes. Our Kothrud centre is in one of Pune's most student-friendly belts. Affordable PGs and hostels are plentiful in Kothrud itself and the adjoining Karve Nagar, Warje, Erandwane, and Deccan areas — many within walking distance or a short bus ride of the centre. Kothrud is a safer, quieter residential zone with messes, transport, and colleges nearby, so Satara students settle in easily. Our team can share verified accommodation options when you enrol.",
      },
      {
        question: "Will online students from Satara get the same placement help?",
        answer:
          "Yes — placement support is identical no matter how you study. Online and classroom learners both get resume preparation, mock interviews, aptitude and technical interview practice, and access to our 100+ company hiring-partner network. Archer has placed 5,000+ students with 90% placement support since 2009, and that assistance applies fully to Satara students learning online — your batch mode never reduces the help you receive.",
      },
      {
        question: "Which IT courses can Satara students take?",
        answer:
          "All of Archer's job-focused tracks are open to Satara students — Java, Python, Full Stack Development, MERN Stack, Data Science, Data Analytics, AWS & DevOps, and Software Testing — in both live online and Pune classroom modes. Every course is built around real projects and the skills Pune and Maharashtra employers actually hire for, not just theory. If you're unsure which suits your background or target role, our free counselling will help you choose.",
      },
      {
        question: "Which companies do Archer Infotech students get placed in?",
        answer:
          "Archer has built a 100+ company hiring-partner network over 17+ years. Active recruiters include Amdocs, Capgemini, MindTree, and Tech Mahindra, alongside many product companies and startups across Pune and Maharashtra. We've trained 10,000+ students and placed 5,000+, maintaining a 90% placement-support track record since 2009. Satara students get the same access to these openings, plus interview preparation and referrals through our placement cell.",
      },
      {
        question: "Are the online classes live or recorded?",
        answer:
          "They're live. Online batches are real-time, instructor-led sessions you attend over video — exactly the same classes as our Pune classroom — with live doubt-solving and interaction, not pre-recorded videos. On top of that, you receive a recording of every session, so if you miss a class or want to revise a tough topic you can replay it anytime. That gives Satara students the discipline of a live batch with the flexibility of recordings.",
      },
      {
        question: "What are the batch timings for online students from Satara?",
        answer:
          "We run both weekday and weekend online batches, including dedicated evening slots for working professionals and students who can't attend during the day. New batches start regularly across courses. Tell us your preferred days and timings and we'll match you to a suitable batch — contact us for the current online schedule and the next start dates for your chosen course.",
      },
      {
        question: "Can working professionals in Satara join while working?",
        answer:
          "Yes, very much so. A large share of our online learners are working professionals, and many Satara professionals choose live online evening or weekend batches specifically so they can upskill without leaving their current job. The flexible timings, session recordings, and weekend options are designed around busy schedules — so you can move into IT or level up your skills while you keep earning.",
      },
      {
        question: "Do I need a programming background to start?",
        answer:
          "No prior background is needed for most tracks. Courses like Java, Python, and Full Stack begin from the fundamentals and are designed for freshers, non-IT graduates, and career-changers, gradually building up to job-ready skills. A few advanced or specialisation tracks assume some basics, which we'll flag during counselling. Share your education and goals with us and we'll recommend the right starting course for you.",
      },
      {
        question: "Do you offer EMI or installment payment options?",
        answer:
          "Yes. Flexible installment and EMI options are available so the fees are easier to manage. The exact fee depends on the course and mode you choose, and we keep pricing transparent with no hidden charges. Contact us for the current fee structure and the installment plans available to Satara students — our counsellors will walk you through every option before you enrol.",
      },
      {
        question: "Will I get a certificate after completing the course?",
        answer:
          "Yes. On completing your course you receive a course completion certificate from Archer Infotech. More importantly, you finish with a portfolio of real projects, hands-on practical experience, and interview preparation you can showcase to employers — which is what actually moves the needle in IT hiring. The certificate plus demonstrable skills together strengthen your profile during placements.",
      },
      {
        question: "Can I get a free demo class or career counselling first?",
        answer:
          "Yes. Archer offers free career counselling and demo classes so you can decide with confidence before paying. In a counselling session we understand your background and goals, recommend the right course, and explain the batch modes (online or Pune classroom), fees, and the placement process. A demo class lets you experience the teaching style first-hand. Call us to book a free counselling session or demo.",
      },
      {
        question: "How do I enrol from Satara if I'm out of town?",
        answer:
          "It's simple and fully manageable from Satara. Just call us or fill the enquiry form and our team handles everything over phone or online — course selection, batch booking, fee and EMI setup, and, if you're relocating, pointers to PGs and hostels near our Kothrud centre. You don't need to travel to Pune to get started; we guide you through each step remotely.",
      },
      {
        question: "How long do the courses take to complete?",
        answer:
          "Most job-focused tracks run over a few months, with the exact length depending on the course and the batch pace you choose — weekday, weekend, and online schedules are all available, and intensive options can be quicker. Rather than quote a one-size-fits-all figure, we'll give you the precise duration and weekly time commitment for your specific course when you contact us or attend counselling.",
      },
    ],
  },
  {
    slug: "kolhapur",
    city: "Kolhapur",
    region: "Western Maharashtra",
    distanceKm: 230,
    travelTimeLabel: "~4–4.5 hours by road",
    priority: 1,
    metaTitle:
      "IT Training for Kolhapur Students — Live Online + Classroom in Pune | Archer Infotech",
    metaDescription:
      "Kolhapur students: train in Java, Python, Full Stack, Data & DevOps with Archer Infotech — join live online batches from Kolhapur or relocate to our Kothrud, Pune centre. 90% placement support, est. 2009.",
    tagline:
      "Pune-quality IT training for Kolhapur's tech aspirants — online from home, or on-campus in Kothrud.",
    highlights: [
      {
        icon: "Laptop",
        color: "sky",
        title: "Live online from Kolhapur",
        text: "Real-time Java, Python & Full Stack classes — train from home, no relocation.",
      },
      {
        icon: "MapPin",
        color: "emerald",
        title: "Classroom in Pune",
        text: "Relocate to our Kothrud centre — ~230 km from Kolhapur via NH-48.",
      },
      {
        icon: "Briefcase",
        color: "amber",
        title: "90% placement support",
        text: "Resume prep, mock interviews & 100+ hiring partners across Pune & Maharashtra.",
      },
      {
        icon: "Users",
        color: "violet",
        title: "Industry-expert trainers",
        text: "Learn from working professionals — Pune's trusted IT institute since 2009.",
      },
    ],
    trackKeywords: [
      "Java",
      "Python",
      "Full Stack Development",
      "MERN Stack",
      "Data Science",
      "Data Analytics",
      "AWS & DevOps",
      "Software Testing",
    ],
    optionsIntro:
      "Kolhapur has long sent students to Pune for IT careers — Archer Infotech makes that journey flexible. Join our live online batches from Kolhapur, or relocate to our Kothrud, Pune campus for an immersive classroom experience. Both modes share the same curriculum, the same trainers, and the same 90% placement support, so a Kolhapur student gets full Pune-grade training whichever path suits their situation best.",
    whyIntro:
      "Choosing where to train is a big decision for Kolhapur students. Archer Infotech brings 17+ years of Pune IT-training experience, 10,000+ students trained, and a 100+ company hiring network — including active recruiters like Amdocs, Capgemini, MindTree, and Tech Mahindra. Here's why Kolhapur learners trust Archer to turn their skills into a placed IT career.",
    coursesIntro:
      "Kolhapur students can train in any of Archer's job-focused tracks — programming, full stack, data science, analytics, cloud, and DevOps. These are the most popular choices, each delivered live online for Kolhapur learners or in the Pune classroom. Free career counselling helps you pick the right starting course and the batch mode that fits your week.",
    intro: [
      "Kolhapur sends a steady stream of students to Pune every year for higher education and IT careers — and for good reason: Pune is Maharashtra's largest tech-training and hiring centre. Archer Infotech, training software aspirants in Pune since 2009, makes that path straightforward for Kolhapur learners with two real options: live online batches you can join from Kolhapur, or classroom training at our Kothrud centre.",
      "Whether you want to keep studying or working in Kolhapur while you upskill, or you're ready to relocate to Pune for an immersive classroom experience, the curriculum, trainers, and placement support are the same. Here's exactly how each route works for a Kolhapur student.",
    ],
    online: [
      "Archer's live online batches are genuine instructor-led classes delivered over video — you attend in real time alongside Pune students, get your questions answered live, and receive recordings of every session. For Kolhapur learners, this removes the biggest barrier: you can finish a complete Full Stack, Python, Data, or DevOps programme without relocating or paying for accommodation in Pune.",
      "Online students receive the full placement package — mock interviews, resume help, and introductions to our 100+ hiring partners. Many working professionals in Kolhapur choose online evening/weekend batches to train without pausing their current job.",
    ],
    relocation: {
      travelParagraphs: [
        "Plenty of Kolhapur students still choose to move to Pune for the classroom experience and the city's wider internship and job exposure. Kolhapur–Pune is one of Maharashtra's busiest travel corridors, so getting back and forth is easy and affordable.",
        "At ~230 km, monthly or term-based stays in Pune are the norm for Kolhapur students (rather than daily commuting), with trips home on longer weekends.",
      ],
      travelModes: [
        {
          mode: "MSRTC & private buses",
          detail:
            "Very frequent buses (including overnight sleepers) on the Kolhapur–Pune route via NH-48; ~4–4.5 hours.",
        },
        {
          mode: "Train",
          detail:
            "Kolhapur (CSMT Kolhapur) has daily express trains to Pune, including convenient overnight options.",
        },
        {
          mode: "Air",
          detail:
            "Kolhapur airport has limited flights; most students use the bus or train, which are cheaper and frequent.",
        },
      ],
      stayParagraphs: [
        "Our centre is in Kothrud, one of west Pune's most established and student-friendly neighbourhoods. Affordable hostels and PGs are widely available in Kothrud and the adjacent Karve Nagar, Warje, and Erandwane areas — many a short walk or bus ride from the centre.",
        "Kothrud's mix of colleges, messes, and good public transport makes it an easy place for Kolhapur students to settle in for the duration of a course.",
      ],
    },
    whyArcher: [
      "Established 2009 — 17+ years in Pune, 10,000+ students trained and 5,000+ placed.",
      "90% placement support and a 100+ company hiring-partner network (active recruiters include Amdocs, Capgemini, MindTree, and Tech Mahindra).",
      "Identical curriculum and trainers across live online and classroom modes.",
      "40+ career-focused courses — full stack, programming, data & AI, cloud and DevOps.",
    ],
    popularCourseSlugs: [
      "java-full-stack-training-in-pune",
      "mern-stack-training-in-pune",
      "python-training-in-pune",
      "data-analytics-training-in-pune",
    ],
    localFaqs: [
      {
        question: "Can Kolhapur students train with Archer without relocating to Pune?",
        answer:
          "Yes. Archer Infotech offers live, instructor-led online batches that Kolhapur students can join from home — real-time classes identical to our Pune classroom, with live doubt-solving, recordings of every session, practical assignments, and the full placement-support package. It removes the single biggest barrier for Kolhapur learners: you can finish a complete Full Stack, Python, Data, or DevOps programme without paying for relocation or accommodation in Pune.",
      },
      {
        question: "How far is Pune from Kolhapur, and how do students travel?",
        answer:
          "Our Kothrud centre is about 230 km from Kolhapur — roughly 4–4.5 hours by road via the NH-48 corridor through Karad and Satara. The Kolhapur–Pune route is one of Maharashtra's busiest, with very frequent buses (including overnight sleepers) and daily express trains from CSMT Kolhapur. Because of the distance, most Kolhapur students opt for term-based stays in Pune rather than daily commuting, travelling home on longer weekends.",
      },
      {
        question: "Where do outstation students from Kolhapur stay in Pune?",
        answer:
          "Most Kolhapur students stay in PGs or hostels in Kothrud or the adjoining Karve Nagar, Warje, and Erandwane areas — many within a short walk or bus ride of our centre. Kothrud is an established, student-friendly part of west Pune with messes, transport, and a large student community, which makes settling in for a course term straightforward. We're happy to share verified accommodation options when you enrol.",
      },
      {
        question: "Is the online batch as good as classroom for placements?",
        answer:
          "Yes. Placement support is identical for both modes — resume preparation, mock interviews, aptitude and technical practice, and access to our 100+ company hiring-partner network. Your batch mode never changes the assistance you receive. With 5,000+ students placed and 90% placement support since 2009, Kolhapur students learning online get exactly the same placement pipeline as those on the Pune campus.",
      },
      {
        question: "Which IT courses can Kolhapur students take?",
        answer:
          "All of Archer's job-focused tracks are open to Kolhapur students — Java, Python, Full Stack Development, MERN Stack, Data Science, Data Analytics, AWS & DevOps, and Software Testing — in both live online and Pune classroom modes. Each is built around real projects and current industry tools, mapped to the roles Pune and Maharashtra employers hire for. Free counselling helps you pick the right track for your background and goals.",
      },
      {
        question: "Which companies do Archer Infotech students get placed in?",
        answer:
          "Archer has built a 100+ company hiring-partner network over 17+ years. Active recruiters include Amdocs, Capgemini, MindTree, and Tech Mahindra, plus many product companies and startups across Pune and Maharashtra. We've trained 10,000+ students and placed 5,000+, with a 90% placement-support track record since 2009. Kolhapur students get the same access to these openings, along with interview prep and referrals from our placement cell.",
      },
      {
        question: "Are the online classes live or recorded?",
        answer:
          "They're live. Online batches are real-time, instructor-led sessions over video — the same classes as our Pune classroom — with live questions and interaction, not pre-recorded lectures. You also get a recording of every session, so Kolhapur students can revise difficult topics or catch up on a missed class anytime. It combines the accountability of a live batch with the flexibility recordings give.",
      },
      {
        question: "What are the online batch timings for Kolhapur students?",
        answer:
          "We run both weekday and weekend online batches, including evening slots designed for working professionals and college students. New batches start regularly across courses. Tell us the days and times that suit you and we'll match you to the right batch — contact us for the current online schedule and the next start dates for your chosen course.",
      },
      {
        question: "Can working professionals in Kolhapur join while working?",
        answer:
          "Yes. Many of our online learners are working professionals, and Kolhapur professionals frequently pick live online evening or weekend batches so they can upskill without quitting their job. The flexible timings, recordings, and weekend options are built around working schedules, making it realistic to switch into IT or grow your skills while you keep earning.",
      },
      {
        question: "Do I need a programming background to start?",
        answer:
          "No prior background is needed for most tracks. Java, Python, Full Stack and similar courses start from the fundamentals and are designed for freshers, non-IT graduates, and career-changers, building gradually to job-ready skills. A few advanced or specialisation tracks assume some basics, which we'll flag during counselling. Tell us your education and goals and we'll recommend the right starting point.",
      },
      {
        question: "Do you offer EMI or installment payment options?",
        answer:
          "Yes. Flexible installment and EMI options are available so the fees are manageable. The exact amount depends on the course and mode you choose, and pricing is transparent with no hidden charges. Contact us for the current fee structure and the installment plans available to Kolhapur students — our counsellors will explain every option before you commit.",
      },
      {
        question: "Will I get a certificate after completing the course?",
        answer:
          "Yes. You receive a course completion certificate from Archer Infotech on finishing your course. Just as important, you graduate with a portfolio of real projects, hands-on practical experience, and structured interview preparation to show employers — the things that genuinely matter in IT hiring. Together, the certificate and demonstrable skills strengthen your profile during placements.",
      },
      {
        question: "Can I get a free demo class or career counselling first?",
        answer:
          "Yes. Archer offers free career counselling and demo classes so you can decide with confidence before paying. In counselling we map your background and goals to the right course and explain the batch modes (online or Pune classroom), fees, and placement process; a demo class lets you experience the teaching first-hand. Call us to book a free counselling session or demo.",
      },
      {
        question: "How do I enrol from Kolhapur if I'm out of town?",
        answer:
          "It's simple and handled entirely from Kolhapur. Call us or fill the enquiry form and our team takes care of course selection, batch booking, fee and EMI setup, and — if you're relocating — pointers to PGs and hostels near our Kothrud centre, all over phone or online. There's no need to travel to Pune just to enrol.",
      },
      {
        question: "How long do the courses take to complete?",
        answer:
          "Most job-focused tracks run over a few months, with the exact length depending on the course and the batch pace you pick — weekday, weekend, and online schedules are available, and intensive options can be faster. Instead of a one-size-fits-all number, we'll give you the precise duration and weekly time commitment for your specific course when you contact us or attend counselling.",
      },
    ],
  },
  {
    slug: "sangli-miraj",
    city: "Sangli-Miraj",
    region: "Western Maharashtra",
    distanceKm: 230,
    travelTimeLabel: "~5 hours by road",
    priority: 1,
    metaTitle:
      "IT Training in Sangli-Miraj — Weekend Batches at Vishrambag + Live Online | Archer Infotech",
    metaDescription:
      "Archer Infotech now runs weekend IT training batches at our Vishrambag, Sangli office — plus live online batches and our Pune campus. Java, Python, Full Stack, Data & DevOps with 90% placement support. Est. 2009.",
    tagline:
      "Now in Sangli — weekend classroom batches at Vishrambag, live online classes, and our Pune campus. Three ways to build an IT career without putting it on hold.",
    heroHeading: "IT Training in Sangli-Miraj — Weekend Batches at Vishrambag",
    heroHeadingHighlights: ["Sangli-Miraj", "Vishrambag"],
    highlights: [
      {
        icon: "CalendarDays",
        color: "amber",
        title: "Weekend classes in Vishrambag",
        text: "In-person IT training in Sangli every Saturday & Sunday — no weekday clash.",
      },
      {
        icon: "Laptop",
        color: "sky",
        title: "Live online for Sangli-Miraj",
        text: "Real-time Java, Python & Full Stack classes you join from home.",
      },
      {
        icon: "Briefcase",
        color: "emerald",
        title: "90% placement support",
        text: "Resume prep, mock interviews & 100+ hiring partners across Pune & Maharashtra.",
      },
      {
        icon: "Users",
        color: "violet",
        title: "Industry-expert trainers",
        text: "Learn from working professionals — Sangli's bridge to Pune's IT industry since 2009.",
      },
    ],
    trackKeywords: [
      "Java",
      "Python",
      "Full Stack Development",
      "MERN Stack",
      "Data Science",
      "Data Analytics",
      "AWS & DevOps",
      "Software Testing",
    ],
    optionsIntro:
      "Sangli-Miraj students now have three genuine ways to train with Archer Infotech, not just one. Attend in-person weekend batches at our Vishrambag, Sangli office; join live online classes from anywhere in Sangli or Miraj; or move to our Kothrud, Pune campus for the full experience. Each option carries the same job-focused curriculum, the same trainers, and the same 90% placement support — so you choose by convenience, not compromise.",
    whyIntro:
      "With a new Vishrambag office plus online and Pune options, Archer Infotech is now the most accessible serious IT-training choice for Sangli-Miraj. Backed by 17+ years in Pune, 10,000+ students trained, and a 100+ company hiring network, here's what Sangli-Miraj students gain — local convenience without giving up Pune-grade training and placements.",
    coursesIntro:
      "Sangli-Miraj students can learn Java, Python, Full Stack, Data Science, AWS, DevOps, and more — through the Vishrambag weekend batches, live online, or the Pune campus. These are the tracks students choose most for placement-ready skills. Book free counselling and we'll recommend the right course and the batch mode that fits your week.",
    localOffice: {
      area: "Vishrambag, Sangli",
      scheduleLabel: "Weekend batches · Saturday & Sunday",
      paragraphs: [
        "You no longer have to leave Sangli to train with a Pune institute. Archer Infotech runs weekend IT batches at our Vishrambag, Sangli office — so students in college and working professionals can learn in a real classroom on Saturdays and Sundays while keeping the rest of their week free. Vishrambag is Sangli's education and coaching hub, easy to reach from across Sangli, Miraj, and Kupwad.",
        "The weekend batches follow the same job-focused curriculum and standards as our Pune programmes, with the same placement support behind them. It's the most convenient option if you want in-person teaching without relocating or commuting to Pune.",
      ],
      note: "Vishrambag, Sangli. Call us for the exact address, current weekend batch schedule, and seat availability.",
    },
    intro: [
      "Sangli and Miraj have a strong, ambitious student base — but until now, serious IT training often meant a long trip to Pune. Archer Infotech has changed that: alongside our established Pune campus (training software aspirants since 2009) and live online batches, we now run weekend classroom batches right here in Sangli, at our Vishrambag office.",
      "That gives Sangli-Miraj learners three real choices: weekend classes in Vishrambag, live online classes from home on any schedule, or the full immersive experience at our Kothrud, Pune centre. Whichever you pick, the curriculum, trainers, and 90% placement support are the same. Here's how each option works.",
    ],
    online: [
      "Prefer to learn from home on your own schedule? Our live online batches are real-time, instructor-led classes — you join over video, ask questions live, and get recordings of every session. For Sangli and Miraj students, this is ideal if weekday or weekend timings at the Vishrambag office don't fit, or if you want the widest choice of batch slots.",
      "Online learners get the same placement support as classroom students — mock interviews, resume help, and access to our 100+ hiring-partner network. Working professionals across Sangli-Miraj often combine online evening sessions with the weekend Vishrambag batches.",
    ],
    relocation: {
      travelParagraphs: [
        "For some students, the immersive Pune campus experience — daily classes, peer groups, and direct exposure to Pune's internship and job market — is worth relocating for. Sangli-Miraj connects to Pune easily, so moving for a course term is straightforward.",
        "Miraj is a major railway junction, which gives Sangli-Miraj students more train options to Pune than most Western-Maharashtra cities.",
      ],
      travelModes: [
        {
          mode: "MSRTC & private buses",
          detail:
            "Frequent buses (including overnight services) on the Sangli–Pune route; ~5 hours by road.",
        },
        {
          mode: "Train",
          detail:
            "Miraj Junction is a major rail hub with regular express trains to Pune; Sangli station is on the same line.",
        },
        {
          mode: "Own vehicle / cab",
          detail: "~230 km to Pune via Karad and the NH-48 corridor.",
        },
      ],
      stayParagraphs: [
        "If you choose the Pune campus, our centre is in Kothrud, west Pune. Affordable PGs and hostels are widely available in Kothrud and the neighbouring Karve Nagar, Warje, and Erandwane areas, many close to the centre.",
        "Kothrud is a well-connected, student-friendly part of Pune — a comfortable base for Sangli-Miraj students staying for the duration of a course.",
      ],
    },
    whyArcher: [
      "Now local — weekend classroom batches at our Vishrambag, Sangli office, plus live online and the Pune campus.",
      "Established 2009 — 17+ years, 10,000+ students trained and 5,000+ placed.",
      "90% placement support with a 100+ company hiring-partner network (active recruiters include Amdocs, Capgemini, MindTree, and Tech Mahindra).",
      "Same job-focused curriculum and trainers across weekend, online, and Pune classroom batches.",
    ],
    popularCourseSlugs: [
      "java-full-stack-training-in-pune",
      "python-training-in-pune",
      "mern-stack-training-in-pune",
      "data-analytics-training-in-pune",
    ],
    localFaqs: [
      {
        question: "Does Archer Infotech have an office in Sangli?",
        answer:
          "Yes. Archer Infotech runs weekend IT training batches at our Vishrambag, Sangli office — convenient for students and working professionals across Sangli, Miraj, and Kupwad. It brings Pune-grade IT training right to Sangli, so you no longer have to travel to Pune for serious, placement-focused courses. Call us for the exact address and the current weekend batch schedule.",
      },
      {
        question: "When are the Sangli (Vishrambag) batches held?",
        answer:
          "The Vishrambag batches run on weekends — Saturday and Sunday — so you can train without disturbing college or your weekday job. It's the ideal format for students and working professionals in Sangli-Miraj who want in-person, hands-on classroom teaching but can't commit to weekday sessions. Get in touch for the latest timings, course-wise schedule, and seat availability.",
      },
      {
        question: "Can I study online instead of attending the Vishrambag office?",
        answer:
          "Yes. Alongside the Vishrambag weekend batches, we offer live, instructor-led online batches you can join from anywhere in Sangli-Miraj, with session recordings and the same placement support. Online is ideal if the weekend timings don't fit or you prefer learning from home. Many students even mix the two — online sessions during the week plus the in-person weekend batch.",
      },
      {
        question: "Is the Sangli training the same quality as the Pune campus?",
        answer:
          "Yes — completely. The weekend Vishrambag batches, the live online batches, and the Pune classroom all follow the same job-focused curriculum, the same standards, and the same expert trainers, backed by the same placement support and 100+ company hiring-partner network. Choosing Sangli weekend classes is about convenience, not a compromise on training quality or placement outcomes.",
      },
      {
        question: "Where is the Vishrambag office and how do I reach it?",
        answer:
          "Our weekend batches run at our Vishrambag, Sangli office. Vishrambag is Sangli's main education and coaching hub, well connected and easy to reach from across Sangli, Miraj, and Kupwad by local transport. Call us for the exact address, directions, and landmark details — our team will help you find us and confirm the weekend batch you want to attend.",
      },
      {
        question: "Which IT courses can I take in Sangli-Miraj?",
        answer:
          "All of Archer's job-focused tracks are available to Sangli-Miraj students — Java, Python, Full Stack Development, MERN Stack, Data Science, Data Analytics, AWS & DevOps, and Software Testing — through the Vishrambag weekend batches, live online, or the Pune campus. Each course is built around real projects and the skills Pune and Maharashtra employers hire for. Free counselling helps you pick the right track for your background and goals.",
      },
      {
        question: "Which companies do Archer Infotech students get placed in?",
        answer:
          "Archer has built a 100+ company hiring-partner network over 17+ years. Active recruiters include Amdocs, Capgemini, MindTree, and Tech Mahindra, plus many product companies and startups across Pune and Maharashtra. We've trained 10,000+ students and placed 5,000+, with a 90% placement-support track record since 2009 — and Sangli-Miraj students get the same access to these openings, interview prep, and referrals.",
      },
      {
        question: "Can I mix online classes with the Vishrambag weekend batches?",
        answer:
          "Yes, and many Sangli-Miraj students do exactly that. You can attend live online sessions during the week and the in-person classroom batch at Vishrambag on weekends, giving you both flexibility and face-to-face teaching. Talk to us and we'll set up a combined schedule that fits your college or work commitments.",
      },
      {
        question: "Are the online classes live or recorded?",
        answer:
          "The online classes are live — real-time, instructor-led sessions with live doubt-solving, not pre-recorded videos — and you also get a recording of every session for revision. The Vishrambag batches are in-person classroom sessions. So whichever mode you choose, you get genuine interaction plus the safety net of recordings to revisit tough topics.",
      },
      {
        question: "Can working professionals in Sangli-Miraj join?",
        answer:
          "Yes. The weekend Vishrambag batches and the live online evening slots are designed specifically so working professionals across Sangli-Miraj can upskill without disturbing their current job. You can keep earning while you build new IT skills, then lean on our placement support when you're ready to switch or grow your role.",
      },
      {
        question: "Do I need a programming background to start?",
        answer:
          "No prior background is needed for most tracks. Courses like Java, Python, and Full Stack start from the fundamentals and are designed for freshers, non-IT graduates, and career-changers, building gradually to job-ready skills. A few advanced tracks assume some basics, which we'll flag during counselling. Share your education and goals and we'll recommend the right starting course.",
      },
      {
        question: "Are EMI or installment payment options available?",
        answer:
          "Yes. Flexible installment and EMI options are available so the fees are easier to manage. The exact fee depends on the course and the mode you pick, and pricing is transparent with no hidden charges. Contact us for the current fee structure for the Vishrambag weekend, online, and Pune batches — our counsellors will walk you through the payment plans.",
      },
      {
        question: "Will I get a certificate after completing the course?",
        answer:
          "Yes. You receive a course completion certificate from Archer Infotech on finishing your course. Equally important, you graduate with a portfolio of real projects, hands-on practical experience, and interview preparation to show employers — the things that genuinely count in IT hiring. The certificate and demonstrable skills together strengthen your profile during placements.",
      },
      {
        question: "Can I get a free demo class or career counselling first?",
        answer:
          "Yes. Archer offers free career counselling and demo classes so Sangli-Miraj students can decide with confidence before paying. In counselling we map your background and goals to the right course and explain the batch modes (Vishrambag weekend, online, or Pune), fees, and placement process; a demo lets you experience the teaching first-hand. Call us to book a free session.",
      },
      {
        question: "How do I enrol for the Sangli weekend batch?",
        answer:
          "Just call us or fill the enquiry form, and we'll confirm the current weekend batch schedule at Vishrambag, seat availability, your course choice, and the fee and EMI options, then guide you through enrolment step by step. You can reserve your seat over phone or online — no lengthy paperwork needed to get started.",
      },
    ],
  },
];

export function getStudentCity(slug: string): StudentCity | undefined {
  return studentCities.find((c) => c.slug === slug);
}
