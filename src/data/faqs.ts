/**
 * Canonical FAQ blocks for key landing pages. These ship server-side as
 * <details>/<summary> markup AND as FAQPage JSON-LD so AI engines (ChatGPT,
 * Claude, Perplexity, Google AI Overviews) can lift the Q&A pairs verbatim.
 * P8-08.
 *
 * Editorial discipline:
 *   - Question phrasing matches actual search queries (PAA / "people also
 *     ask" / AlsoAsked-style)
 *   - Answers are 40–60 words — long enough to be substantive, short
 *     enough to be liftable as a snippet
 *   - Every numerical claim mirrors siteConfig.stats; never invent
 *   - Never claim "100% placement" — site-wide policy. Use "placement
 *     assistance" + "90% placement rate" trust signal
 *   - Brand name is always "Archer Infotech" (never "Archer Info Tech")
 */
import type { FaqItem } from "@/components/seo/faq-section";

/**
 * Home page FAQs — top funnel, broad institute-level questions.
 */
export const homeFaqs: FaqItem[] = [
  {
    question: "What is Archer Infotech?",
    answer:
      "Archer Infotech is an IT training institute in Kothrud, Pune, founded in 2009. Over 17+ years it has trained 10,000+ students and placed 5,000+ across MNCs (institute placement records since 2009), including TCS, Infosys, Wipro, Tech Mahindra and Persistent Systems. It offers 40+ courses spanning Java, Python, Full Stack, Cloud, DevOps, Data Science and AI.",
  },
  {
    question: "Where is Archer Infotech located in Pune?",
    answer:
      "Archer Infotech's training centre is at Flat No. 12, Divyadarshan Housing Society, behind Kothrud Bus Stand Road, near Natraj Gas Agency, Londhe Wada, Chaitanya Nagar, Kothrud, Pune 411038. The centre runs Monday to Saturday from 9:00 AM to 8:00 PM. The contact number is +91 9850 678451.",
  },
  {
    question: "Which courses does Archer Infotech offer?",
    answer:
      "Archer Infotech offers 40+ technology courses across Programming (Java, Python, C, C++), Full Stack Development (Java Full Stack, MERN Stack, Spring Boot), Cloud and DevOps (AWS, Azure, Kubernetes, Docker, Terraform), Data and AI (Data Science, Machine Learning, Generative AI, Power BI), Testing (Selenium, Manual Testing) and Database (MySQL, PostgreSQL, MongoDB).",
  },
  {
    question: "Does Archer Infotech provide placement assistance?",
    answer:
      "Yes. Archer Infotech offers comprehensive placement assistance — resume building, mock interviews, soft-skills training and direct referrals to 100+ corporate hiring partners (active drive history, last 12 months). It records a 90% placement rate across batches who complete training and clear at least one mock interview (institute internal records), with 5,000+ placed at TCS, Infosys, Wipro, Persistent Systems and Tech Mahindra.",
  },
  {
    question: "What is the fee structure at Archer Infotech?",
    answer:
      "Course fees at Archer Infotech range from ₹15,000 to ₹90,000 depending on duration and curriculum depth — short specialisation tracks start lower, while flagship Java Full Stack and MERN Stack programs sit at the upper end. Every course supports EMI plans. Lifetime LMS access, certification and placement assistance are included with every paid program.",
  },
  {
    question: "Are online and weekend batches available?",
    answer:
      "Yes. Archer Infotech runs weekday, weekend and online batches across every flagship course so working professionals, college students and full-time learners can pick a schedule that fits. Live online classes use the same trainers and curriculum as the offline Kothrud centre and include recorded sessions through lifetime LMS access.",
  },
  {
    question: "Who are the trainers at Archer Infotech?",
    answer:
      "Trainers at Archer Infotech are working IT professionals with 10–20+ years of MNC experience at Persistent Systems, Wipro, Tech Mahindra and Cognizant (verified via individual trainer profiles at /trainers, with current LinkedIn and active client engagements listed). The institute is led by Yogesh Patil, a senior Java and Spring Boot trainer with 15+ years in industry, and a six-person core faculty.",
  },
  {
    question: "How do I enrol for a course at Archer Infotech?",
    answer:
      "You can enrol by booking a free demo class through the Contact page, calling +91 9850 678451 or visiting the Kothrud centre Monday to Saturday, 9 AM to 8 PM. After the demo, the counsellor confirms batch availability, fees and EMI options. Most learners begin within the next available weekday or weekend batch.",
  },
];

/**
 * About page FAQs — entity-level questions: who, when, why, who runs it.
 * Feeds the Wikidata-style "knowledge entity" we want AI engines to build.
 */
export const aboutFaqs: FaqItem[] = [
  {
    question: "When was Archer Infotech founded?",
    answer:
      "Archer Infotech was founded in 2009 in Pune by IT industry professionals with a focus on practical, placement-oriented training for freshers and working professionals. As of 2026 the institute has 17+ years of operating history, with 10,000+ students trained and 5,000+ placed at MNCs across India.",
  },
  {
    question: "Who founded Archer Infotech?",
    answer:
      "Archer Infotech is led by Yogesh Patil, a senior Java and Spring Boot trainer with 15+ years of MNC experience at Persistent Systems and Wipro. The institute is run by a leadership team of working IT professionals who combine industry consulting with classroom teaching, keeping the curriculum aligned with current production stacks.",
  },
  {
    question: "Why is Archer Infotech considered a trusted IT training institute in Pune?",
    answer:
      "Archer Infotech holds 17+ years of training history (founded 2009), a 90% placement rate (institute internal records), a 5.0-star Google rating across 126+ verified Google reviews (as of May 2026), and 100+ active corporate hiring partners. Reviews consistently cite trainer depth, project-based learning and structured placement support as the reasons for its standing among Pune IT institutes.",
  },
  {
    question: "How many students has Archer Infotech trained?",
    answer:
      "Archer Infotech has trained 10,000+ students and placed 5,000+ across IT companies in India and abroad since 2009 (institute placement-team records, updated annually). It has completed 1,000+ batches across weekday, weekend and online formats and serves freshers, college students and working professionals seeking career transitions into IT.",
  },
  {
    question: "What makes Archer Infotech different from other Pune IT institutes?",
    answer:
      "Archer Infotech combines small-batch classroom training with industry-active trainers, real-project portfolios, lifetime LMS access and direct hiring-partner referrals. The curriculum is updated each year against MNC job descriptions, and every flagship course bundles placement assistance and mock-interview practice rather than treating it as an upsell.",
  },
  {
    question: "Does Archer Infotech offer corporate training?",
    answer:
      "Yes. Archer Infotech runs corporate upskilling programs for IT teams across Java, Python, Full Stack, Cloud, DevOps and AI/ML. Programs are customised to the client's tech stack, delivered onsite or online, and include hands-on labs, project work and assessment reports. The Corporate Training page lists current capabilities and case studies.",
  },
];

/**
 * Courses index FAQs — broad "what does Archer offer / how do I choose"
 * questions that map to high-volume PAA queries on Pune IT courses.
 */
export const coursesFaqs: FaqItem[] = [
  {
    question: "Which IT courses does Archer Infotech offer in Pune?",
    answer:
      "Archer Infotech offers 40+ IT training courses across Programming (Java, Python, C, C++), Full Stack Development (Java Full Stack, MERN Stack, Spring Boot, .NET Full Stack), Cloud and DevOps (AWS, Azure, Kubernetes, Docker, Terraform, Jenkins), Data and AI (Data Science, Machine Learning, Generative AI, Power BI), Testing (Selenium, Manual Testing) and Database (MySQL, PostgreSQL, MongoDB).",
  },
  {
    question: "Which IT course is best for a fresher in Pune?",
    answer:
      "For freshers with no prior coding background, Archer Infotech recommends Java Full Stack, Python, or MERN Stack — all three have the largest active hiring demand in Pune MNCs and are designed to start from fundamentals. Career-switchers from non-IT backgrounds typically choose Java Full Stack; CS students often pick MERN Stack or Data Science based on interest.",
  },
  {
    question: "How long does an IT training course at Archer Infotech take?",
    answer:
      "Most flagship courses run 4–6 months in standard batches and 2–3 months in fast-track / weekday-intensive batches. Specialisation tracks (single tech like Spring Boot, Selenium or AWS) finish in 6–10 weeks. Bootcamps like CodeLeap run 8 weeks; TechReady runs 6–8 months. Course detail pages list exact duration and batch options.",
  },
  {
    question: "What is the fee range for IT courses at Archer Infotech?",
    answer:
      "Course fees at Archer Infotech range from ₹15,000 to ₹90,000 depending on duration and curriculum depth — short specialisation tracks start lower, while flagship Java Full Stack and MERN Stack programs sit at the upper end. Every course supports EMI plans, and lifetime LMS access plus placement assistance are included with no separate charge.",
  },
  {
    question: "Are online courses available, or only classroom training?",
    answer:
      "Both. Every flagship course at Archer Infotech runs as live online (Zoom / Google Meet) and offline classroom batches at the Kothrud centre, with the same trainer, syllabus, projects and placement support. Online learners get session recordings through lifetime LMS access — useful for revision and for catching up on missed weekday sessions.",
  },
  {
    question: "Do all courses include placement assistance?",
    answer:
      "Yes. Every paid course at Archer Infotech includes placement assistance — resume building, mock interviews, soft-skills training, ATS optimisation and direct referrals to 100+ corporate partners. There is no separate placement fee. Bootcamp and degree-track programs (Java Full Stack, MERN, Data Science, AI Engineer, Cloud / DevOps) get the most active drives.",
  },
  {
    question: "Will I get a certificate after completing a course?",
    answer:
      "Yes. Every Archer Infotech course awards an industry-recognised completion certificate that lists the curriculum, project work and trainer name. Several flagship tracks also include preparation for external certifications — AWS Solutions Architect, Microsoft Azure Fundamentals, Oracle Java SE, RHCSA — at no extra cost beyond the official exam fee.",
  },
  {
    question: "Can I take more than one course at the same time?",
    answer:
      "Yes, but Archer Infotech recommends sequencing rather than parallel enrolment for freshers. A common path is: foundation course (Python or Java) → full-stack specialisation → cloud / AI add-on. The counsellor team builds custom learning roadmaps during the free demo class so timing, fees and batch availability align without overload.",
  },
];

/**
 * Bootcamps index FAQs — career-stage matching, comparison, and "is this
 * for me" questions across CodeLeap / CareerCode / TechReady.
 */
export const bootcampsFaqs: FaqItem[] = [
  {
    question: "What are the bootcamps offered by Archer Infotech?",
    answer:
      "Archer Infotech runs three bootcamps for three career stages — CodeLeap (8-week vacation program for 12th passouts; Python, Web Dev, AI, GitHub, Career), CareerCode (semester-by-semester tracks for engineering students; runs alongside college), and TechReady (6–8 month intensive for graduates with placement assistance and 100+ company connections).",
  },
  {
    question: "Which bootcamp is right for me?",
    answer:
      "CodeLeap suits 12th passouts with no prior coding experience who want to start before engineering begins. CareerCode suits engineering students wanting structured upskilling alongside their degree, semester by semester. TechReady suits graduates targeting placement within 6–8 months — full-time intensive with project work and active recruiter referrals.",
  },
  {
    question: "Do I need prior coding experience for CodeLeap?",
    answer:
      "No. CodeLeap is explicitly designed for 12th passouts with zero coding background. The 8-week curriculum starts with Python fundamentals, then progresses through web development, AI basics, GitHub portfolio building, and career skills. By the end you have a deployed website, a public GitHub profile and a working understanding of three core technology areas.",
  },
  {
    question: "Are bootcamps online or offline?",
    answer:
      "All three bootcamps run in hybrid mode — Kothrud campus sessions plus live online classes — so learners outside Pune can join too. Project reviews, mentor 1:1s and placement-prep sessions happen in both modes. Recording access is included for revision through Archer Infotech's lifetime LMS.",
  },
  {
    question: "Does TechReady guarantee a job?",
    answer:
      "TechReady includes placement assistance — resume building, mock interviews, ATS optimisation and direct referrals to 100+ hiring partners — but Archer Infotech does not promise guaranteed placement. The institute records a 90% placement rate across batches; the remaining ~10% are typically learners who pause their search or accept opportunities outside the active drives queue.",
  },
  {
    question: "Can I take CodeLeap and then CareerCode and then TechReady?",
    answer:
      "Yes — that is the recommended career-stage progression. CodeLeap builds programming foundations during the post-12th vacation, CareerCode deepens specialisation alongside engineering, and TechReady finishes with intensive placement-ready training after graduation. Each program is independently useful, but together they form a 5-year structured path from school to first job.",
  },
];

/**
 * Contact page FAQs — practical "how do I reach you / book a demo / visit"
 * questions that match local intent and Google Business Profile queries.
 */
export const contactFaqs: FaqItem[] = [
  {
    question: "What is Archer Infotech's address in Pune?",
    answer:
      "Archer Infotech is at Flat No. 12, Divyadarshan Housing Society, behind Kothrud Bus Stand Road, near Natraj Gas Agency, Londhe Wada, Chaitanya Nagar, Kothrud, Pune 411038. The centre is a 5-minute walk from Kothrud Bus Stand and is accessible via PMPML buses and on-demand cabs across Pune.",
  },
  {
    question: "What are Archer Infotech's working hours?",
    answer:
      "Archer Infotech's Kothrud training centre is open Monday to Saturday from 9:00 AM to 8:00 PM. The centre is closed on Sundays and on Indian public holidays. For visit-based counselling, walk-ins are welcome during working hours; for confirmed slots, book a free demo class in advance via the contact form or by calling +91 9850 678451.",
  },
  {
    question: "How do I book a free demo class?",
    answer:
      "Submit the Contact form with your course of interest, call +91 9850 678451, or send a WhatsApp message to the same number. The counselling team confirms a slot within working hours, usually for the same week. The free demo class is held in the trainer's actual batch — online or at the Kothrud centre — with no payment or commitment.",
  },
  {
    question: "Can I get details over WhatsApp or phone instead of visiting?",
    answer:
      "Yes. The fastest channels are WhatsApp at +91 9850 678451 and email at info@archerinfotech.in. The team responds with course brochures, fee structures, EMI options, current batch dates and trainer profiles within working hours. A visit is recommended only if you want to see the centre or sit in a live demo class.",
  },
  {
    question: "Is there parking available at the Kothrud centre?",
    answer:
      "Yes. Two-wheeler parking is available directly outside the Divyadarshan Housing Society building, and four-wheeler parking is available on the adjoining Kothrud Bus Stand Road. The centre is also a short walk from the bus stand, which makes public transport convenient for learners coming from across Pune.",
  },
  {
    question: "Can I visit the centre without an appointment?",
    answer:
      "Walk-ins are welcome at Archer Infotech's Kothrud centre Monday to Saturday between 9 AM and 8 PM. However, for guaranteed counsellor availability and a customised course recommendation, booking ahead through the Contact form or +91 9850 678451 is recommended — especially during peak admission weeks for new batches.",
  },
];

/**
 * Trainers index FAQs — entity / E-E-A-T questions that build the
 * "experienced people" trust signal AI engines weight heavily.
 */
export const trainersFaqs: FaqItem[] = [
  {
    question: "Who teaches at Archer Infotech?",
    answer:
      "Trainers at Archer Infotech are working IT professionals with a combined 54+ years of MNC engineering experience (verified via individual trainer profiles at /trainers, with current LinkedIn URLs and active client engagements). The six-person core faculty teaches Java, Python, Full Stack, .NET, Modern Web (React/Angular/Next.js), Mobile, Data, AI/ML, Generative AI and Cloud — every trainer continues active production or corporate-training engagements alongside classroom teaching.",
  },
  {
    question: "Are the trainers full-time at Archer Infotech?",
    answer:
      "Yes. All six core trainers are full-time faculty at Archer Infotech. Two of them — Amol Patil and Yogesh Patil — also run on-site corporate-training engagements at Amdocs, Capgemini, MindTree and Tech Mahindra, which keeps the curriculum aligned with what these MNCs hire for. The other four hold active production-engineering roles.",
  },
  {
    question: "Who is the founder of Archer Infotech?",
    answer:
      "Archer Infotech was founded in 2009 and is led by Yogesh Patil, a senior Java and Spring Boot trainer with 15+ years of MNC experience at Persistent Systems and Wipro. He runs founder-led classes on entrepreneurship, career strategy and architecture-level code reviews, and steps in for advanced sessions across Java Full Stack and corporate batches.",
  },
  {
    question: "How does Archer Infotech ensure trainer quality?",
    answer:
      "Every trainer is hired against four criteria — still active in industry, proven shipping of production code, demonstrated teaching ability via live demo, and committed mentoring outside class. All trainers attend a quarterly internal upskilling review and ship a side-project, article or certification refresh every six months — added to their public profile for transparency.",
  },
  {
    question: "Can I choose my trainer for a specific course?",
    answer:
      "Each course at Archer Infotech is matched to the trainer with the deepest current industry exposure for that stack — for example, Ankita Hartale leads Java Full Stack, Suraj Kudache owns .NET Full Stack, Vinod Patil leads AI / Generative AI, Amol Chougule handles Modern Web. Trainer name and LinkedIn profile are confirmed before the first class.",
  },
  {
    question: "How can I evaluate a trainer before paying for the course?",
    answer:
      "The fastest way is to book a free demo class — no payment, no commitment — and sit in the trainer's actual batch (online or at the Kothrud centre) within seven days. Each trainer's profile page also lists their LinkedIn, ongoing client engagements and shipped projects so you can verify experience independently before enrolling.",
  },
];

/**
 * Internships page FAQs — eligibility, certificate validity, structure,
 * stipend / fee discipline and conversion-to-job path.
 */
export const internshipsFaqs: FaqItem[] = [
  {
    question: "What internship programs does Archer Infotech offer?",
    answer:
      "Archer Infotech runs 3-month foundation internships (Programming Fundamentals, PHP Full Stack + AI, Web Dev + AI, Data Analytics, AI/ML Basics) and 6-month job-ready internships (Java Full Stack, .NET Full Stack, MERN, Python Full Stack, AI Engineer, Data Scientist, Data Engineer, Cloud / DevOps, IoT + AI, Software Engineer). All run in hybrid mode with live projects.",
  },
  {
    question: "Who is eligible to apply for an internship at Archer Infotech?",
    answer:
      "Internships are open to learners currently pursuing or completed B.Tech, BCA, MCA, B.Sc (IT/CS) or Diploma. Applicants need basic programming awareness, willingness to commit full-time for the program duration, and reasonable communication skills. Selection is via a brief technical assessment and an interview with the team lead. Career switchers from non-CS backgrounds are also welcome.",
  },
  {
    question: "Do I receive a certificate after the internship?",
    answer:
      "Yes. Every learner receives an industry-recognised internship completion certificate from Archer Infotech listing the program, project work and mentor name. The certificate is widely accepted on LinkedIn and resumes for IT freshers across Pune, Bangalore, Hyderabad and Mumbai recruitment cycles, and is verifiable via the institute on request.",
  },
  {
    question: "What is the difference between the 3-month and 6-month internship?",
    answer:
      "The 3-month track focuses on foundation skills, industry exposure, one live project and a basic placement-support layer — suited for college students. The 6-month track adds deep specialisation, AI / Cloud integration, multi-project portfolio, resume and interview prep, and active placement assistance — suited for graduates targeting a job offer at completion.",
  },
  {
    question: "Is the internship paid or unpaid?",
    answer:
      "Archer Infotech's internship programs are training-led and structured as paid programs (the learner pays a program fee that covers mentorship, projects, certification and the placement support layer). Stipend-paying internships are arranged separately on a case-by-case basis through the institute's hiring-partner network for top-performing 6-month-track learners.",
  },
  {
    question: "Does the 6-month internship help with placement?",
    answer:
      "Yes. The 6-month job-ready internship includes resume building, ATS optimisation, mock interviews, soft-skills training and direct referrals to 100+ corporate hiring partners. Several 6-month interns have converted into full-time roles at Pune MNCs and product startups within 60 days of program completion via the placement-assistance pipeline.",
  },
];

/**
 * Corporate training FAQs — sales-qualifying questions for L&D buyers.
 * Different audience from learner FAQs — heavier on customisation,
 * delivery format, billing and outcome measurement.
 */
export const corporateTrainingFaqs: FaqItem[] = [
  {
    question: "What corporate training does Archer Infotech offer?",
    answer:
      "Archer Infotech runs customised corporate training across Cloud (AWS, Azure, GCP), Programming (Java, Python, .NET, JavaScript / TypeScript), DevOps and Automation (Docker, Kubernetes, Jenkins, Terraform), Data and AI (Data Science, ML, Generative AI), Full Stack (MERN, Java, Python) and Agile / Project Management (Scrum, Kanban). Programs are tailored to the client's stack and team level.",
  },
  {
    question: "Can the curriculum be customised to our tech stack?",
    answer:
      "Yes. Every corporate engagement begins with a requirement-analysis call to map the client's business goals, current tech stack and skill gaps. The curriculum, project work and assessment criteria are then designed around those inputs — Archer Infotech does not deliver off-the-shelf decks. Active corporate customers (as of May 2026) include Amdocs, Capgemini, MindTree and Tech Mahindra — engagements run by senior trainers Amol Patil and Yogesh Patil.",
  },
  {
    question: "Do you deliver on-site or online corporate training?",
    answer:
      "Both. Archer Infotech delivers corporate training on-site at the client's office in Pune or any India location, virtually via live instructor-led sessions over Zoom / Google Meet, or in a hybrid format combining on-site kickoff with virtual continuation. The format is chosen during proposal sign-off based on team size, location spread and budget.",
  },
  {
    question: "How long does a typical corporate training engagement run?",
    answer:
      "Engagements range from 2-day intensives for focused upskilling to 8–12 week structured programs for full-stack reskilling cohorts. Most enterprise clients pick a 4–6 week schedule with weekday or weekend sessions of 3–4 hours, plus hands-on labs and project work between classes. Custom timelines are quoted on request.",
  },
  {
    question: "Do you provide certification preparation for corporate teams?",
    answer:
      "Yes. Archer Infotech prepares corporate teams for industry certifications including AWS Solutions Architect, Microsoft Azure Fundamentals / Associate / Expert tracks, Google Cloud Professional, Oracle Java SE, Kubernetes (CKA / CKAD) and PMI / PMP. Mock exams, practice labs and exam-day strategy are bundled into the engagement at no extra charge beyond the official exam fee.",
  },
  {
    question: "How is success measured after corporate training?",
    answer:
      "Every engagement closes with an evaluation phase — pre/post skill assessments, capstone project review, individual learner reports and a leadership summary. Archer Infotech also provides a 30-day post-training support window where learners can raise queries with the trainer. Outcomes have included faster onboarding, reduced time-to-production and higher certification pass rates.",
  },
  {
    question: "How do I request a proposal for corporate training?",
    answer:
      "Submit the Contact form with your team size, target tech stack and timeline, email info@archerinfotech.in, or call +91 9850 678451. The corporate-training lead responds with a customised proposal within 2 working days, including curriculum outline, trainer profiles, timeline, delivery mode and fee structure. NDA-backed evaluation calls are available on request.",
  },
];

/**
 * Batch schedule FAQs — practical "when does the next batch start /
 * what timings / can I switch" questions that map to high-intent local
 * search queries.
 */
export const batchScheduleFaqs: FaqItem[] = [
  {
    question: "When do new batches start at Archer Infotech?",
    answer:
      "Archer Infotech starts new batches every 1–2 weeks across flagship courses, with separate weekday and weekend cohorts so learners can choose by schedule. Online live batches start on the same dates as offline Kothrud batches. The Batch Schedule page lists the next available start dates per course; the counsellor confirms exact slots and seat availability on enquiry.",
  },
  {
    question: "What are the typical batch timings?",
    answer:
      "Weekday batches typically run 7:30–9:30 AM, 10:00 AM–12:00 PM, 4:00–6:00 PM or 6:30–8:30 PM Monday–Friday. Weekend batches run 9:00 AM–1:00 PM or 2:00–6:00 PM on Saturday and Sunday. Fast-track and intensive cohorts use 6-hour daily windows. Custom timings can be arranged on request when the centre has trainer availability.",
  },
  {
    question: "What is the difference between offline and online batches?",
    answer:
      "Offline batches run as classroom training at the Kothrud centre with the trainer physically present. Online batches run as live instructor-led sessions over Zoom / Google Meet with screen sharing, hands-on labs and Q&A. Both modes follow the same curriculum, projects, mentor support and placement assistance — only the delivery medium differs.",
  },
  {
    question: "Can I switch between an offline and online batch mid-course?",
    answer:
      "Yes, in most cases. Mid-course switches between offline and online cohorts of the same course are supported when the new batch has seats available and the syllabus checkpoint matches. Approval is granted by the trainer and counsellor team. Switching does not change the fee paid, and lifetime LMS access continues to cover both modes.",
  },
  {
    question: "What happens if I miss a class?",
    answer:
      "Recordings of every class are uploaded to Archer Infotech's lifetime LMS, so missed sessions can be reviewed at any time. For online batches, recordings are typically available within 24 hours of the live class. For deeper catch-up support, learners can attend the same topic in a parallel batch or request a 1:1 doubt-clearing slot with the trainer.",
  },
  {
    question: "Are weekend-only batches available for working professionals?",
    answer:
      "Yes. Every flagship course at Archer Infotech runs a dedicated weekend cohort — Saturday and Sunday only — designed for working professionals upskilling alongside a full-time job. Sessions run 4 hours per day on each weekend, total 8 hours per week. Project work, mentor 1:1s and placement-assistance support continue mid-week through the LMS and email.",
  },
];

/**
 * Placements page FAQs — proof, transparency, hiring partner depth, salary.
 */
export const placementsFaqs: FaqItem[] = [
  {
    question: "How many students has Archer Infotech placed?",
    answer:
      "Archer Infotech has placed 5,000+ students at IT companies since 2009 (institute placement-team records, updated annually). Hiring partners include TCS, Infosys, Wipro, Tech Mahindra, Persistent Systems, Cognizant, Capgemini and 100+ other MNCs and product startups across Pune, Bangalore, Hyderabad and Mumbai. The placement rate is 90% across batches.",
  },
  {
    question: "What is the placement rate at Archer Infotech?",
    answer:
      "Archer Infotech maintains a 90% placement rate (institute internal records) across its flagship courses — Java Full Stack, MERN Stack, Python, Data Science, AWS, DevOps and AI/ML. The rate is calculated across students who complete the program, attend placement training, and clear at least one mock-interview round before sitting for hiring drives — the methodology is consistent across cohorts.",
  },
  {
    question: "Which companies hire from Archer Infotech?",
    answer:
      "Archer Infotech's 100+ hiring partners include TCS, Infosys, Wipro, Tech Mahindra, Persistent Systems, Cognizant, Capgemini, HCL Technologies, L&T Infotech, Mphasis and several Pune-based product startups. Drives include service-based MNCs, GCC captives and product engineering firms — across Java, Full Stack, Cloud, DevOps and Data roles.",
  },
  {
    question: "What is the average salary offered to Archer Infotech students?",
    answer:
      "Average packages for Archer Infotech freshers range from ₹3.5–6 LPA at entry level (placement-team data, last 12 months of offers), with experienced learners and full stack / cloud specialists drawing 8+ LPA. Top performers in Java Full Stack, MERN and DevOps have crossed ₹10 LPA. Actual offers depend on role, company tier and prior experience.",
  },
  {
    question: "How does the placement process work at Archer Infotech?",
    answer:
      "After course completion, every student goes through resume building, ATS optimisation, mock interviews, group discussions and soft-skills training. Profiles are then matched against current openings from 100+ corporate partners and learners are referred directly. Drives run continuously through the year — most students sit for 3–8 interviews before securing an offer.",
  },
  {
    question: "Does Archer Infotech place freshers without prior IT experience?",
    answer:
      "Yes. The majority of placements at Archer Infotech are college freshers and career switchers with no prior IT background. Programs like Java Full Stack, MERN Stack and Python are explicitly designed for beginners — starting with fundamentals and ending with portfolio projects, mock interviews and direct referrals to entry-level openings at MNCs.",
  },
  {
    question: "Is placement assistance included in the course fee?",
    answer:
      "Yes. Placement assistance is included in every flagship course fee at Archer Infotech — there is no separate placement charge. The package covers resume building, mock interviews, soft-skills training, recruiter referrals to 100+ hiring partners, and continued support until the learner secures an offer or exhausts the active drives queue.",
  },
  {
    question: "Can working professionals get placement support too?",
    answer:
      "Yes. Archer Infotech runs dedicated placement support for working professionals upskilling into Cloud, DevOps, Data Science, Full Stack and AI/ML roles. Resume reviews, lateral interview practice and partner-company referrals are included. Several alumni have used the program to switch from non-IT or service roles into product engineering or GCC captives.",
  },
];
