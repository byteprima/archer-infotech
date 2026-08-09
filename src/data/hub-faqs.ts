import type { FaqItem } from "@/components/seo/faq-section";

/**
 * FAQ sets for the hub / index pages.
 *
 * The 2026-08-09 build showed ~11 hub pages failing three checks at once:
 * no FAQPage schema, no question-shaped headings, and fewer than two lists.
 * They are the pages a person lands on when browsing rather than searching a
 * specific course, and they answered none of the questions that actually stop
 * someone enrolling.
 *
 * Two rules held throughout:
 *
 *   1. Every answer is specific to THAT hub. A single shared FAQ block copied
 *      across eleven pages would be near-duplicate content, which is worse
 *      than having none — so each set answers questions that only make sense
 *      on its own page.
 *
 *   2. Only facts already established elsewhere in the codebase: one centre in
 *      Kothrud (locations are commute catchment, NOT branches — see the header
 *      of locations.ts), founded 2009, weekday/weekend/live-online batches,
 *      free demo, placement assistance included at no separate fee, fees
 *      ₹15,000–₹90,000 with EMI, Mon–Sat 9 AM–8 PM, +91 9850 678451.
 *
 * The "are these branches" question appears on the two location hubs
 * deliberately. It is the single most likely misreading of those pages, and
 * leaving it unanswered risks someone travelling to an address that does not
 * exist.
 */

export const compareHubFaqs: FaqItem[] = [
  {
    question: "How does Archer Infotech decide which option wins a comparison?",
    answer:
      "Each comparison sets out a factor-by-factor table — learning curve, job volume in Pune, salary band, and how quickly you can be productive — then states which option suits which starting point. There is no single winner, because the right answer depends on your background and target role.",
  },
  {
    question: "Do these comparisons favour the courses Archer Infotech sells?",
    answer:
      "Both sides of every technology comparison cite the official documentation for that technology, not ours. Several comparisons recommend the option Archer does not teach as a primary track, because recommending a poor fit produces a student who drops out.",
  },
  {
    question: "Which comparison should I read first if I am a complete beginner?",
    answer:
      "Start with Java vs Python for beginners, then MERN vs Java Full Stack once you have picked a language. If you are weighing study formats rather than technologies, read online vs offline IT training and coding bootcamp vs self-study instead.",
  },
];

export const guidesHubFaqs: FaqItem[] = [
  {
    question: "Are these guides free to read?",
    answer:
      "Yes. Every guide is free, needs no sign-up, and is readable in full on the page. There is no gated download and no email wall.",
  },
  {
    question: "Who writes the guides and how current are they?",
    answer:
      "They are written by Archer Infotech's working trainers — practitioners with 10 to 20+ years of MNC experience — and carry a visible last-reviewed date. Salary figures and hiring references are refreshed when the underlying data changes rather than on a fixed schedule.",
  },
  {
    question: "Do I need to enrol in a course to use these guides?",
    answer:
      "No. The project lists, interview question sets and library round-ups are written to be usable on their own. Each guide links to the Archer course covering that skill if you decide you want structured training, but nothing is held back.",
  },
];

export const locationsHubFaqs: FaqItem[] = [
  {
    question: "Does Archer Infotech have a branch in each of these Pune areas?",
    answer:
      "No. Archer Infotech runs a single training centre, in Kothrud, Pune 411038. Each area page covers commute routes, travel time and the employers hiring nearby for students living in that neighbourhood — it is not a separate branch address.",
  },
  {
    question: "I live far from Kothrud. Can I still train with Archer Infotech?",
    answer:
      "Yes. Every course runs as a live online batch using the same trainers and curriculum as the classroom sessions, with recorded sessions available through lifetime LMS access. Many students from PCMC, Hinjewadi and east Pune choose online for weekdays and attend the centre for project sessions.",
  },
  {
    question: "Which areas do most Archer Infotech students commute from?",
    answer:
      "Kothrud itself, plus Warje, Karve Nagar, Deccan and Erandwane within a short commute, and Hinjewadi, Baner, Wakad and Aundh along the west Pune IT corridor. Each area page sets out the realistic travel time from that neighbourhood to the Kothrud centre.",
  },
];

export const studentCitiesHubFaqs: FaqItem[] = [
  {
    question: "Can I join Archer Infotech from a city outside Pune?",
    answer:
      "Yes. Live online batches are open to students anywhere and use the same trainers, curriculum and projects as the Kothrud classroom. Students from Satara, Kolhapur, Nashik, Solapur, Sangli-Miraj and Chhatrapati Sambhajinagar train this way.",
  },
  {
    question: "Is there an Archer Infotech centre in my city?",
    answer:
      "No. There is one centre, in Kothrud, Pune. Each city page exists to set out the two realistic options from that city — live online from home, or classroom training in Pune — along with travel time and the Pune employers hiring from that region.",
  },
  {
    question: "Is the online batch the same quality as the classroom batch?",
    answer:
      "Same trainers, same curriculum, same projects and the same placement assistance. Online sessions are live rather than pre-recorded, so you can ask questions during class, and every session is recorded for later review through lifetime LMS access.",
  },
];

export const audienceHubFaqs: FaqItem[] = [
  {
    question: "How do I know which course fits my background?",
    answer:
      "Each background page recommends a starting track, explains why it fits that qualification, and sets out the realistic first-job outcome. If you are still unsure, free counselling will match a track to your education and target role before you pay anything.",
  },
  {
    question: "Do I need a computer science degree to start?",
    answer:
      "No. Most tracks — Java, Python and Full Stack among them — begin from fundamentals and are built for freshers, non-IT graduates and career changers. A few advanced specialisations assume some basics, which counselling will flag before you enrol.",
  },
  {
    question: "Can I train while studying or working full time?",
    answer:
      "Yes. Weekday, weekend and live-online batches run in parallel for every flagship course, so engineering students can train alongside their degree and working professionals can train at weekends without taking leave.",
  },
];

export const courseLocationsHubFaqs: FaqItem[] = [
  {
    question: "Is the syllabus different depending on which area I pick?",
    answer:
      "No. The curriculum, trainers, projects and certification are identical across every area. These pages differ only in commute detail and the local employers hiring for that skill, because the course itself is taught at the Kothrud centre or live online.",
  },
  {
    question: "Why does Archer Infotech publish a page per course and area?",
    answer:
      "Because Pune IT-training search is segmented by micro-area — people search for a course near their neighbourhood, not just the course name. Each page answers the commute and local-hiring questions that a general course page cannot.",
  },
  {
    question: "How do I find the right combination for me?",
    answer:
      "Pick the course you want first, then the area you commute from. If your area is not listed, the live online batch covers it — the same trainers and schedule, joined from home.",
  },
];

export const careerPathsHubFaqs: FaqItem[] = [
  {
    question: "How long does it take to become job-ready on one of these paths?",
    answer:
      "Most job-focused tracks run a few months, with the exact length depending on the path and whether you take weekday, weekend or intensive batches. Each career path page sets out the stage-by-stage sequence rather than promising a single figure.",
  },
  {
    question: "Do these paths assume I already have a technical background?",
    answer:
      "No. Every path starts from fundamentals and names its prerequisites explicitly. The first-IT-job path in particular is written for people with no professional coding experience.",
  },
  {
    question: "Does Archer Infotech help with placement at the end of a path?",
    answer:
      "Yes, and at no separate fee. Placement assistance covers resume building, mock interviews, soft-skills training and direct referrals to 100+ corporate hiring partners.",
  },
];

export const reportsHubFaqs: FaqItem[] = [
  {
    question: "Are Archer Infotech's reports free?",
    answer:
      "Yes. The reports are free and require only an email address for the download, which is used to send you the file and the monthly briefing. There is no charge and no sales call attached.",
  },
  {
    question: "Where does the data in these reports come from?",
    answer:
      "Primary listings data from Naukri and LinkedIn, official college placement reports, and Archer Infotech's own batch-placement records since 2009. Every figure is dated and sourced; where direct data is unavailable an honest estimate range is published with the assumption stated.",
  },
  {
    question: "Can I cite these reports in my own work?",
    answer:
      "Yes, with attribution to Archer Infotech and a link to the report page. Journalists and researchers can reach the team on +91 9850 678451, Monday to Saturday, 9 AM to 8 PM.",
  },
];

export const glossaryHubFaqs: FaqItem[] = [
  {
    question: "Who is this IT glossary written for?",
    answer:
      "Beginners, career changers and students who keep meeting unfamiliar terms in job descriptions and course syllabi. Definitions are written in plain English first, with the technical detail second.",
  },
  {
    question: "Do I need to know these terms before starting a course?",
    answer:
      "No. Every Archer Infotech course begins from fundamentals and introduces terminology as it becomes relevant. The glossary exists so a job advert or syllabus does not put you off before you start.",
  },
];

export const pressHubFaqs: FaqItem[] = [
  {
    question: "How can journalists contact Archer Infotech?",
    answer:
      "Call +91 9850 678451, Monday to Saturday between 9 AM and 8 PM, or use the contact page. The centre is at Kothrud, Pune 411038.",
  },
  {
    question: "Can I use Archer Infotech's name and figures in an article?",
    answer:
      "Yes, with attribution. The facts page carries the canonical founding year, student and placement numbers, and course counts so that quoted figures match what the institute actually publishes.",
  },
];

export const questionsHubFaqs: FaqItem[] = [
  {
    question: "How are these answers verified?",
    answer:
      "Each answer is written against institute records — enrolment, batch and placement data — rather than estimated. Where a figure cannot be verified it is not published; the site does not claim a 100% placement rate or any number that cannot be traced to a record.",
  },
  {
    question: "My question is not answered here. What should I do?",
    answer:
      "Call +91 9850 678451 between 9 AM and 8 PM, Monday to Saturday, or book a free counselling session through the contact page. Counselling is free and does not require you to enrol.",
  },
];
