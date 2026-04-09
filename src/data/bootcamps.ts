export interface BootcampTrack {
  name: string;
  subtitle: string;
  modules: { title: string; description: string }[];
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
  details: BootcampDetail[];
  faqs: BootcampFAQ[];
  closingCTA: { headline: string; body: string };
}

export const bootcamps: Bootcamp[] = [
  // ============================================================
  // CODELEAP
  // ============================================================
  {
    id: "codeleap",
    slug: "codeleap",
    name: "CodeLeap",
    tagline: "Your First Step into the World of Programming",
    subtitle:
      "A Vacation Coding Bootcamp for 12th Passouts — by Archer Info Tech, Pune",
    hook: "You have just cleared your 12th board exams. CET is done. JEE is behind you. And now you have 3 to 3.5 months before engineering college begins. Most students spend this time doing nothing. You don't have to.",
    description:
      "CodeLeap is Archer Info Tech's specially designed coding bootcamp for 12th passout students across Pune and Maharashtra. In this short but powerful course, you get hands-on exposure to real programming — whether it is web development, Python, or the basics of Artificial Intelligence and Data Science — so that you walk into your first semester of engineering already ahead of the curve. This is not a coaching class. This is your head start.",
    seo: {
      title:
        "CodeLeap | Coding Course for 12th Passouts in Pune | Archer Info Tech",
      description:
        "Join CodeLeap by Archer Info Tech — Pune's best vacation coding bootcamp for 12th passouts. Learn Python, Web Development, or AI/ML basics in your 3-month gap after boards.",
      keywords: [
        "coding course for 12th passouts in Pune",
        "vacation coding course after 12th Pune",
        "summer coding bootcamp HSC students",
        "programming course after boards Maharashtra",
        "what to do after 12th before engineering",
        "IT course after HSC Pune",
        "Python course for beginners Pune",
        "web development course for students",
        "coding classes for 12th pass students",
        "short term coding course Pune",
      ],
    },
    targetAudience: [
      "Just appeared for 12th Science (PCM) board exams in Maharashtra or any other state",
      "Completed CET, MHT-CET, JEE Main, or JEE Advanced",
      "Waiting for admission to BE, BTech, BCA, or BSc Computer Science programs",
      "Little or no prior coding experience — want to learn from scratch",
      "Want to use the 3-month gap productively rather than sitting idle",
      "Looking for a short-term, affordable, and practical IT course in Pune",
    ],
    whyJoin: [
      {
        title: "Turn Your Gap Into a Launchpad",
        description:
          "The 3-month window between your 12th results and your first college lecture is one of the most underutilised periods in a student's life. CodeLeap helps you convert that free time into practical skills, real projects, and a genuine engineering mindset — before your peers even open a textbook.",
      },
      {
        title: "Build a Strong Foundation Before Engineering Begins",
        description:
          "Most engineering students struggle in their first year because they enter without any programming foundation. CodeLeap gives you that foundation 3 months early, so your first year of engineering feels like revision rather than shock.",
      },
      {
        title: "Align Your Thinking with Engineering Logic",
        description:
          "Programming is not just about writing code. It is about learning to think — logically, systematically, and creatively. CodeLeap is specifically designed to shift your mindset from a 12th-grade student to an engineering-ready problem solver.",
      },
      {
        title: "Get Comfortable with English Technical Communication",
        description:
          "Engineering education in India is delivered in English. Many students from regional-medium schools feel uncomfortable at first. CodeLeap includes English communication modules so that by the time college begins, you are reading technical content and asking questions confidently.",
      },
      {
        title: "Learn from Industry Experts with 15+ Years of Experience",
        description:
          "You are not trained by fresh graduates. You learn from working professionals and industry veterans with more than 15 years of real-world corporate experience. Every session is practical, example-driven, and aligned with what the industry actually uses.",
      },
      {
        title: "Earn a Recognised Certificate",
        description:
          "On completing CodeLeap, you receive an Archer Info Tech certificate — recognised by engineering colleges and companies across India — that you can add to your resume and LinkedIn profile from Day 1.",
      },
    ],
    tracks: [
      {
        name: "Web Development Fundamentals",
        subtitle:
          "Best for students interested in building websites, apps, and digital products.",
        modules: [
          {
            title: "How the Internet and Computers Work (Week 1-2)",
            description:
              "Understanding how the internet works, what websites are made of, how browsers render pages, and the basics of computer logic. Setting up your development environment.",
          },
          {
            title: "HTML5: Structure of the Web (Week 3-5)",
            description:
              "Writing your first HTML page. Tags, elements, attributes, forms, tables, semantic HTML5, and full page structure. Building static web pages from scratch.",
          },
          {
            title: "CSS3: Designing the Web (Week 6-8)",
            description:
              "Styling, colours, fonts, Flexbox layouts, responsive design, and mobile-first design principles. Your pages will look sharp on every device.",
          },
          {
            title: "JavaScript Basics: Making the Web Interactive (Week 9-11)",
            description:
              "Variables, data types, loops, functions, conditions, and DOM manipulation. Your pages come alive and respond to user actions in real time.",
          },
          {
            title: "Mini Project: Build Your Portfolio Website (Week 12-14)",
            description:
              "Build a multi-page personal portfolio website — with your photo, bio, skills, and projects — that you can share with college seniors, recruiters, and on LinkedIn.",
          },
        ],
        skills: [
          "HTML5",
          "CSS3",
          "JavaScript basics",
          "Responsive web design",
          "Git and GitHub",
          "Project deployment",
          "Problem-solving",
        ],
      },
      {
        name: "Python Programming Fundamentals",
        subtitle:
          "Best for students interested in software development, automation, or planning to pursue AI/ML later.",
        modules: [
          {
            title: "What Is Programming? (Week 1-2)",
            description:
              "Understanding how computers think. Algorithms, logic, problem-solving exercises and puzzles. Setting up Python and your development environment.",
          },
          {
            title: "Python Basics (Week 3-5)",
            description:
              "Variables, data types, strings, numbers, input/output, conditionals, loops, and operators. Writing your first working Python programs.",
          },
          {
            title: "Functions, Lists, and Dictionaries (Week 6-8)",
            description:
              "Organising your code with functions. Working with lists, tuples, sets, and dictionaries. File handling — reading and writing data.",
          },
          {
            title: "Object-Oriented Programming Basics (Week 9-11)",
            description:
              "Classes, objects, inheritance, and encapsulation. Understanding why real-world software is built this way. Writing cleaner, reusable code.",
          },
          {
            title: "Mini Project: Build a Python Application (Week 12-14)",
            description:
              "Build a real working Python application — quiz app, to-do list manager, calculator, or contact book — document it and publish to GitHub.",
          },
        ],
        skills: [
          "Python 3",
          "OOP concepts",
          "Problem-solving",
          "Algorithmic thinking",
          "File handling",
          "Git and GitHub",
          "Project documentation",
        ],
      },
      {
        name: "Introduction to AI, Data Science, and Machine Learning",
        subtitle:
          "Best for students curious about the technology shaping the future — artificial intelligence, data, and intelligent systems.",
        modules: [
          {
            title:
              "The Big Picture: AI, ML, and Data Science Demystified (Week 1-2)",
            description:
              "What is AI? What is Machine Learning? What is Data Science? How are they different? What do professionals in these fields do? What careers are available?",
          },
          {
            title: "Python Foundations for Data (Week 3-5)",
            description:
              "Python basics with a data-first focus. Variables, loops, functions, and core libraries. The same foundation required for every AI and data science course in the world.",
          },
          {
            title: "Working with Data (Week 6-8)",
            description:
              "Introduction to Pandas and NumPy. Reading datasets, cleaning messy data, exploring patterns. Working with Excel and CSV files. Basic statistics — mean, median, variance.",
          },
          {
            title:
              "Visualising Data and Telling Stories with Numbers (Week 9-11)",
            description:
              "Turning raw numbers into clear visual stories using Matplotlib and Seaborn. Bar charts, line graphs, scatter plots, and histograms.",
          },
          {
            title: "Mini Project: Analyse a Real-World Dataset (Week 12-14)",
            description:
              "Pick a real public dataset — cricket scores, weather data, e-commerce sales — analyse it using Python tools, visualise your findings, and present a short data story.",
          },
        ],
        skills: [
          "Python for data",
          "Pandas",
          "NumPy",
          "Matplotlib",
          "Seaborn",
          "Basic statistics",
          "Data analysis thinking",
          "Git and GitHub",
        ],
      },
    ],
    commonModules: [
      {
        title: "English for Tech Communication",
        description:
          "Reading technical documentation, understanding error messages, and communicating questions clearly — all in English. Practical and designed for engineering students from regional-medium school backgrounds.",
      },
      {
        title: "Git and GitHub Fundamentals",
        description:
          "Version control, saving your code history across time, and publishing projects on GitHub — the platform every recruiter and college senior checks.",
      },
      {
        title: "Career Orientation Session",
        description:
          "What do software engineers actually do? What are the different branches of IT — frontend, backend, data, AI, DevOps? An honest session by industry professionals.",
      },
      {
        title: "Problem-Solving and Logical Reasoning",
        description:
          "Regular exercises in logical thinking, pattern recognition, and structured problem-solving that prepare you for engineering study and placement tests.",
      },
      {
        title: "Soft Skills Foundation",
        description:
          "Time management, how to learn effectively, how to ask good questions, and how to build study habits for four years of engineering.",
      },
    ],
    details: [
      { label: "Designed For", value: "12th Passouts, HSC Students, Pre-Engineering Students" },
      { label: "Duration", value: "3 to 3.5 Months" },
      { label: "Tracks", value: "Web Development / Python Programming / AI & Data Science" },
      { label: "Batch Timings", value: "Morning, Afternoon, and Evening Batches Available" },
      { label: "Mode", value: "Classroom (Kothrud, Pune) + Online Available" },
      { label: "Language", value: "English (Marathi and Hindi support available)" },
      { label: "Certification", value: "Archer Info Tech Certificate on Completion" },
      { label: "Eligibility", value: "12th Pass — No prior coding required" },
    ],
    faqs: [
      {
        question: "What is CodeLeap?",
        answer:
          "CodeLeap is a 3 to 3.5 month vacation coding bootcamp by Archer Info Tech, Pune, designed for students who have just completed their 12th board exams and are waiting to join engineering college. It covers programming fundamentals across three tracks — Web Development, Python, and AI/Data Science. No prior coding experience required.",
      },
      {
        question: "Who should join CodeLeap?",
        answer:
          "Any student who has completed 12th Science (HSC) and is heading into BE, BTech, BCA, or BSc CS. Students from any board — Maharashtra State Board, CBSE, or ICSE — are welcome. The course is also open to 12th students from other streams who are genuinely interested in coding.",
      },
      {
        question: "Do I need prior coding experience?",
        answer:
          "No. CodeLeap is built for absolute beginners. It starts from the very basics — what is a computer, what is code, what is the internet — and builds steadily upward.",
      },
      {
        question: "Will I get a certificate?",
        answer:
          "Yes. Archer Info Tech issues a completion certificate upon successfully finishing CodeLeap. This certificate is recognised across engineering colleges and IT companies in India.",
      },
      {
        question: "Is online mode available?",
        answer:
          "Yes. CodeLeap is offered in both classroom mode at Kothrud, Pune, and online through Archer Info Tech's LMS platform — so students from across Maharashtra can join without relocating.",
      },
      {
        question: "What happens after CodeLeap?",
        answer:
          "After CodeLeap, you are encouraged to continue with Archer Info Tech's CareerCode program — which runs alongside your engineering degree, semester by semester, and prepares you for internships and final placements.",
      },
    ],
    closingCTA: {
      headline: "Your engineering journey starts now — not in June.",
      body: "Three months is enough time to learn a skill that will serve you for the rest of your career. While others are waiting, you could be writing your first lines of code, building your first website, analysing your first dataset, and walking into engineering college already knowing what most students won't learn until their third semester. CodeLeap is not just a course. It is a mindset shift.",
    },
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
      "Semester-by-Semester Programming and Career Training for Engineering Students — Archer Info Tech, Pune",
    hook: "Your engineering degree will give you a certificate. CareerCode will give you a career. College teaches you concepts. CareerCode teaches you how to apply them.",
    description:
      "CareerCode is Archer Info Tech's flagship ongoing training program for engineering, BCA, and BSc Computer Science students. It runs alongside your college education — semester by semester — adding real technical skills, internship readiness, and career tools to everything your degree provides. From your first year to your final placement drive, CareerCode is your parallel career engine.",
    seo: {
      title:
        "CareerCode | Programming Course for Engineering Students in Pune | Archer Info Tech",
      description:
        "CareerCode by Archer Info Tech is Pune's best semester-wise coding program for engineering, BCA, and BSc CS students. Learn full stack, AI, data science + get internship-ready. Online and offline available.",
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
          "How to find legitimate internships, apply, prepare, and perform. Students are guided towards Archer Info Tech's internship network and placement connections.",
      },
    ],
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
          "Yes. CareerCode is available in both classroom mode at Kothrud, Pune, and online through Archer Info Tech's LMS platform — with recorded sessions for students who cannot attend live classes.",
      },
      {
        question: "Will CareerCode help me get internships?",
        answer:
          "Yes. Internship preparation is a core part of CareerCode. We guide you through building the right profile, applying to the right opportunities, and preparing for internship interviews. Archer Info Tech also has direct connections with 100+ companies for internship and job placements.",
      },
    ],
    closingCTA: {
      headline: "Start your CareerCode journey today.",
      body: "Four years of engineering will pass faster than you think. Every semester you wait is a semester your competition is using. The students who land the best internships and the best placements in their final year are not the ones who started preparing at the end — they are the ones who started at the beginning.",
    },
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
      "Full-Time, Placement-Assisted Courses in Full Stack Development, Data Science, and AI — Archer Info Tech, Pune",
    hook: "You have your degree. Now you need a job. Not just any job — the right job at the right company with the right salary. The kind of role your four years of engineering were supposed to lead to.",
    description:
      "TechReady is Archer Info Tech's intensive, full-time, placement-assisted training program built for one purpose: to turn engineering graduates and final-year students into professionals that IT companies across India are actively competing to hire. If you are willing to commit 6 months, 6 hours a day, and your full focus — TechReady will deliver your career.",
    seo: {
      title:
        "TechReady | Job-Ready Full Stack and Data Science Courses in Pune | Archer Info Tech",
      description:
        "TechReady by Archer Info Tech is Pune's best placement-assisted full-time course for graduates. Java Full Stack, Python Full Stack, MERN, Data Science, AI/ML — 6 to 8 months, 6 hours daily. Get hired.",
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
        title: "20 Years of Placement Track Record",
        description:
          "Archer Info Tech has been successfully placing students in top MNCs and tech companies since 2005. We have direct placement relationships with 100+ companies. Our placement assistance is 100% genuine.",
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
    details: [
      { label: "Designed For", value: "Final-year students and engineering/BCA/BSc CS graduates" },
      { label: "Programs", value: "Java Full Stack, Python Full Stack, MERN, MEAN, .NET Full Stack, Data Analytics, Data Science, Data Engineering, ML/AI Engineering, Advanced Frontend" },
      { label: "Duration", value: "6 to 8 Months per Program" },
      { label: "Daily Hours", value: "Minimum 6 Hours per Day" },
      { label: "Mode", value: "Full-Time — Classroom (Kothrud, Pune) with Online Option" },
      { label: "Placement Assistance", value: "100% Placement-Assisted" },
      { label: "Language", value: "English (Marathi and Hindi support available)" },
      { label: "Certification", value: "Archer Info Tech Certificate + Project Portfolio" },
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
          "Archer Info Tech has been successfully placing students in top MNCs and technology companies since 2005. We have active relationships with 100+ companies and a dedicated placement cell. Placement assistance is 100% genuine and continues until you are placed.",
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
  },
];

export function getBootcamp(slug: string): Bootcamp | undefined {
  return bootcamps.find((b) => b.slug === slug);
}

export function getAllBootcamps(): Bootcamp[] {
  return bootcamps;
}
