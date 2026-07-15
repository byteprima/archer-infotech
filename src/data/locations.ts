/**
 * Neighbourhood landing pages (P4-15).
 *
 * Pune IT-training search is heavily segmented by neighbourhood — Sulekha and
 * UrbanPro literally categorise every course by micro-area ("Java training in
 * Kothrud", "IT classes in Hinjewadi"). Archer's centre is in Kothrud, but
 * students commute from across west/central Pune and the PCMC belt.
 *
 * Each entry below carries GENUINELY UNIQUE, geographically-accurate content
 * (real landmarks, real distances, real commute reasoning per area). This is
 * the opposite of thin doorway pages — Google's helpful-content system
 * penalises template-with-one-word-changed location pages, so every field
 * here is written for that specific neighbourhood.
 *
 * Popular courses are referenced by slug and resolved against `courses` at
 * render time so titles/links can never drift from the catalogue.
 */

export interface NeighbourhoodLocation {
  /** URL slug under /locations/ — e.g. "it-training-in-kothrud". */
  slug: string;
  /** Display name — e.g. "Kothrud". */
  name: string;
  /** Postal area name as used in addresses/schema — e.g. "Kothrud, Pune". */
  fullName: string;
  /** Representative PIN code for the area (Place schema). */
  pincode: string;
  /** 1 = highest (home turf). Drives ordering on the index hub. */
  priority: number;
  /** Short one-liner for the index-hub card + meta description seed. */
  tagline: string;

  metaTitle: string;
  metaDescription: string;

  /** Localised opening — 2 paragraphs, ~180–220 words, area-specific. */
  intro: string[];

  commute: {
    /** Headline distance/time label, e.g. "~7 km · 20–30 min by two-wheeler". */
    distanceLabel: string;
    paragraphs: string[];
    modes: { mode: string; detail: string }[];
  };

  /** Real colleges, IT parks, and landmarks students from here recognise. */
  landmarks: string[];

  /** Why Archer's Kothrud centre works for students from THIS area. */
  whyConvenient: string[];

  /** Course slugs popular with students from this area (resolved at render). */
  popularCourseSlugs: string[];

  /** 3–4 genuinely area-specific FAQs (commute, batch timing, online). */
  localFaqs: { question: string; answer: string }[];
}

/**
 * P4-21 — geographically-nearby neighbourhood map for cross-internal-
 * linking. Maintained as an external map (vs per-entry field) to keep
 * the 12 detailed entries clean. Each neighbourhood points to 3 closest
 * neighbours — designed around real Pune geography (west / central / PCMC
 * belts). Strengthens the location-cluster internal-link graph.
 *
 * Each cross-link contributes ~3 inbound + 3 outbound internal links
 * per neighbourhood page = 36 new internal cross-links across the 12 pages.
 */
const NEARBY_NEIGHBOURHOODS_MAP: Record<string, string[]> = {
  // West / central Pune belt
  "it-training-in-kothrud": [
    "it-training-in-karve-nagar",
    "it-training-in-erandwane",
    "it-training-in-karve-road",
  ],
  "it-training-in-karve-nagar": [
    "it-training-in-kothrud",
    "it-training-in-erandwane",
    "it-training-in-warje",
  ],
  "it-training-in-erandwane": [
    "it-training-in-kothrud",
    "it-training-in-karve-nagar",
    "it-training-in-deccan",
  ],
  "it-training-in-warje": [
    "it-training-in-karve-nagar",
    "it-training-in-kothrud",
    "it-training-in-bavdhan",
  ],
  "it-training-in-bavdhan": [
    "it-training-in-warje",
    "it-training-in-baner",
    "it-training-in-kothrud",
  ],
  "it-training-in-deccan": [
    "it-training-in-erandwane",
    "it-training-in-karve-road",
    "it-training-in-kothrud",
  ],
  "it-training-in-karve-road": [
    "it-training-in-kothrud",
    "it-training-in-erandwane",
    "it-training-in-deccan",
  ],
  // North-west / Aundh-Baner-Hinjewadi belt
  "it-training-in-aundh": [
    "it-training-in-baner",
    "it-training-in-wakad",
    "it-training-in-karve-road",
  ],
  "it-training-in-baner": [
    "it-training-in-aundh",
    "it-training-in-bavdhan",
    "it-training-in-wakad",
  ],
  "it-training-in-hinjewadi": [
    "it-training-in-wakad",
    "it-training-in-baner",
    "it-training-in-pimpri-chinchwad",
  ],
  "it-training-in-wakad": [
    "it-training-in-hinjewadi",
    "it-training-in-baner",
    "it-training-in-aundh",
  ],
  "it-training-in-pimpri-chinchwad": [
    "it-training-in-wakad",
    "it-training-in-hinjewadi",
    "it-training-in-aundh",
  ],
  // East Pune belt (Kharadi / Viman Nagar / Hadapsar-Magarpatta triad)
  "it-training-in-kharadi": [
    "it-training-in-viman-nagar",
    "it-training-in-hadapsar-magarpatta",
    "it-training-in-hinjewadi",
  ],
  "it-training-in-viman-nagar": [
    "it-training-in-kharadi",
    "it-training-in-hadapsar-magarpatta",
    "it-training-in-aundh",
  ],
  "it-training-in-hadapsar-magarpatta": [
    "it-training-in-kharadi",
    "it-training-in-viman-nagar",
    "it-training-in-pimpri-chinchwad",
  ],
};

// Destination is the verified Kothrud centre; origin varies per page so the
// Google Maps directions link is unique to each neighbourhood.
export const CENTRE_DESTINATION = "Archer Infotech, Kothrud, Pune 411038";

/** Build a no-API-key Google Maps directions URL from an area to the centre. */
export function directionsUrlFrom(areaName: string): string {
  const origin = encodeURIComponent(`${areaName}, Pune`);
  const destination = encodeURIComponent(CENTRE_DESTINATION);
  return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`;
}

export const neighbourhoods: NeighbourhoodLocation[] = [
  // ─── 1. Kothrud (home turf) ──────────────────────────────────────────────
  {
    slug: "it-training-in-kothrud",
    name: "Kothrud",
    fullName: "Kothrud, Pune",
    pincode: "411038",
    priority: 1,
    tagline: "Our home — walk-in classroom training in the heart of Kothrud.",
    metaTitle: "IT Training in Kothrud, Pune — Archer Infotech",
    metaDescription:
      "Archer Infotech's training centre is in Kothrud, Pune — Java, Python, full-stack, data science, AWS and DevOps courses with placement, a short walk from Kothrud Bus Stand. Classroom, weekend and online batches.",
    intro: [
      "Archer Infotech's training centre sits right in Kothrud — behind the Kothrud Bus Stand Road, near Natraj Gas Agency in Chaitanya Nagar (411038). If you live or study in Kothrud, this is your local IT-training institute: no commute across the city, no traffic on the old Pune–Mumbai stretch, just a short walk or two-wheeler ride to a classroom that has been running since 2009.",
      "Kothrud is one of the most densely populated and education-focused suburbs in Pune, home to MIT-WPU and thousands of engineering, BCA, BSc-IT and MCA students. We built our flagship classroom here precisely because so much of Pune's fresh technical talent already lives within a few kilometres. Whether you're a final-year student from a Kothrud college or a working professional in a nearby society, you get the full classroom experience — live trainers, lab machines, and an in-person doubt-clearing culture — without leaving your own neighbourhood.",
    ],
    commute: {
      distanceLabel: "You're already here · 0 km",
      paragraphs: [
        "The centre is a few minutes from the Kothrud Bus Stand (Kothrud Depot), one of Pune's busiest PMPML hubs, so buses from almost anywhere in the city terminate within walking distance. Most Kothrud residents reach us on foot or by two-wheeler in under ten minutes.",
        "Because this is our home location, Kothrud students get the easiest access to classroom batches, weekday evening sessions after college, and in-person mentoring — plus the option to walk in for a free demo class before enrolling.",
      ],
      modes: [
        { mode: "On foot", detail: "Most Chaitanya Nagar, Mahatma Society and Dahanukar Colony addresses are a 5–15 minute walk." },
        { mode: "Two-wheeler", detail: "Under 10 minutes from anywhere in Kothrud, with parking near the centre." },
        { mode: "PMPML bus", detail: "Alight at Kothrud Bus Stand / Depot — the centre is a short walk from there." },
      ],
    },
    landmarks: [
      "MIT World Peace University (MIT-WPU)",
      "Kothrud Bus Depot / Stand",
      "Mahatma Society & Dahanukar Colony",
      "City Pride Kothrud",
      "Paud Road & Mrutyunjay Mandir",
      "Dahanukar Colony market",
    ],
    whyConvenient: [
      "For Kothrud students this is simply the most practical choice — your training institute is in your own pin code. You can attend classroom batches without a long commute, drop in for in-person doubt sessions, and still switch to an online session on days you can't travel.",
      "Final-year and recently-graduated students from MIT-WPU and the surrounding colleges form a large part of our weekday batches, which means your classmates are often people you'll recognise from the neighbourhood — useful when you're forming study groups or referring each other to interviews.",
    ],
    popularCourseSlugs: [
      "java-full-stack-training-in-pune",
      "python-training-in-pune",
      "data-science-training-in-pune",
      "mern-stack-training-in-pune",
      "aws-training-in-pune",
    ],
    localFaqs: [
      {
        question: "Where exactly is the Archer Infotech centre in Kothrud?",
        answer:
          "We're behind Kothrud Bus Stand Road, near Natraj Gas Agency in Londhe Wada, Chaitanya Nagar, Kothrud, Pune 411038 — a short walk from the Kothrud Bus Depot. Call us and we'll share a live location pin.",
      },
      {
        question: "Can I attend classroom training if I live in Kothrud?",
        answer:
          "Yes — Kothrud is our home location, so classroom batches (weekday and weekend) run right here. Most Kothrud residents walk or ride in within 10 minutes.",
      },
      {
        question: "Do you offer a free demo class for Kothrud students?",
        answer:
          "Yes. Since you're local, the easiest way to decide is to walk in for a free demo class, meet the trainer, and see the classroom before you enrol.",
      },
    ],
  },

  // ─── 2. Karve Nagar ──────────────────────────────────────────────────────
  {
    slug: "it-training-in-karve-nagar",
    name: "Karve Nagar",
    fullName: "Karve Nagar, Pune",
    pincode: "411052",
    priority: 2,
    tagline: "Walking distance from Kothrud — ideal for Cummins College students.",
    metaTitle: "IT Training in Karve Nagar, Pune — Archer Infotech",
    metaDescription:
      "Java, Python, full-stack and data science training for Karve Nagar students at Archer Infotech's Kothrud centre — a short ride away. Classroom, weekend and online batches with placement support.",
    intro: [
      "Karve Nagar sits immediately next to Kothrud, which makes Archer Infotech one of the closest established IT-training institutes to the area. Students from Cummins College of Engineering for Women and the surrounding Hingne and Suncity societies can reach our classroom in just a few minutes — close enough to attend regular weekday classroom batches without it eating into the day.",
      "We see a steady stream of Karve Nagar learners on both our placement-focused tracks and our certification courses. The short distance means you genuinely get the classroom experience — live trainers, lab practice, in-person mock interviews — rather than defaulting to online because the commute is too long.",
    ],
    commute: {
      distanceLabel: "~2–3 km · 5–10 min by two-wheeler",
      paragraphs: [
        "Karve Nagar and Kothrud share a border, so the ride to our centre is short and avoids the city's worst traffic corridors. From the Cummins College / Karve Nagar side, you're looking at well under ten minutes on a two-wheeler.",
        "Frequent PMPML buses connect Karve Nagar to the Kothrud Depot, from where the centre is a short walk — convenient if you don't ride.",
      ],
      modes: [
        { mode: "Two-wheeler", detail: "5–10 minutes from most Karve Nagar addresses." },
        { mode: "PMPML bus", detail: "Karve Nagar → Kothrud Depot, then a short walk." },
        { mode: "On foot", detail: "Doable from the Karve Nagar–Kothrud border societies." },
      ],
    },
    landmarks: [
      "Cummins College of Engineering for Women",
      "Hingne Khurd & Karve Nagar market",
      "Suncity",
      "Karve Statue / Karve Road junction",
      "Rajaram Bridge (towards the river)",
    ],
    whyConvenient: [
      "Because Karve Nagar is adjacent to Kothrud, you get all the benefits of classroom training with none of the cross-city travel. That's a real advantage for the practical, lab-heavy parts of full-stack and data-science courses, where being in the room with the trainer matters.",
      "Cummins College students in particular use our weekend and post-college evening batches to add job-ready skills — full-stack development, Python, and data science — on top of their degree, then tap our placement support during campus season.",
    ],
    popularCourseSlugs: [
      "java-full-stack-training-in-pune",
      "python-training-in-pune",
      "data-science-training-in-pune",
      "react-training-in-pune",
      "aws-training-in-pune",
    ],
    localFaqs: [
      {
        question: "How far is Archer Infotech from Karve Nagar?",
        answer:
          "About 2–3 km — a 5–10 minute ride. Karve Nagar borders Kothrud, so our centre is one of the closest established IT-training institutes to the area.",
      },
      {
        question: "Is this a good option for Cummins College students?",
        answer:
          "Yes. Many Cummins College of Engineering students join our weekend and evening batches in full-stack, Python and data science, then use our placement support during their job search.",
      },
      {
        question: "Can I do classroom training, or only online, from Karve Nagar?",
        answer:
          "Classroom is very practical from Karve Nagar given how close it is. We also offer online and weekend batches if your schedule needs them.",
      },
    ],
  },

  // ─── 3. Erandwane ──────────────────────────────────────────────────────
  {
    slug: "it-training-in-erandwane",
    name: "Erandwane",
    fullName: "Erandwane, Pune",
    pincode: "411004",
    priority: 3,
    tagline: "Minutes from Law College Road and Nal Stop, via Karve Road.",
    metaTitle: "IT Training in Erandwane, Pune — Archer Infotech",
    metaDescription:
      "Erandwane students reach Archer Infotech's Kothrud centre in minutes via Karve Road. Java, Python, full-stack, data science and AWS courses with placement — classroom, weekend and online batches.",
    intro: [
      "Erandwane is one of Pune's denser, more central residential pockets, running from Law College Road and Mehendale Garage across to Nal Stop and Karve Road. It's a short, straight ride down Karve Road to our Kothrud centre, which makes Archer Infotech a convenient local institute for Erandwane's large student and young-professional population.",
      "The area's proximity to Deccan's college belt means many of our Erandwane learners are students at or near ILS Law College, Fergusson and the BMCC/Garware cluster, looking to add a job-ready technical skill — full-stack development, Python, or data science — to a non-IT or general degree before they enter the job market.",
    ],
    commute: {
      distanceLabel: "~3 km · 10–15 min via Karve Road",
      paragraphs: [
        "Karve Road links Erandwane directly to Kothrud, so the journey is short and predictable outside peak hours. From the Nal Stop / Mehendale Garage side it's a 10–15 minute ride.",
        "PMPML buses along Karve Road run frequently between Erandwane, Nal Stop and the Kothrud Depot, making the trip easy without a vehicle.",
      ],
      modes: [
        { mode: "Two-wheeler / car", detail: "10–15 minutes down Karve Road to Kothrud." },
        { mode: "PMPML bus", detail: "Karve Road buses → Kothrud Depot, then a short walk." },
        { mode: "Metro + bus", detail: "Use the Vanaz / Garware College metro corridor, then a short hop to the centre." },
      ],
    },
    landmarks: [
      "Law College Road",
      "Nal Stop",
      "Mehendale Garage",
      "ILS Law College",
      "Karve Road shopping stretch",
      "Mhatre Bridge",
    ],
    whyConvenient: [
      "Erandwane's central location means students can fit a classroom batch around college on Karve Road and reach us in minutes. The short commute keeps in-person attendance realistic, which is exactly what the hands-on parts of our courses are built for.",
      "For Erandwane's many non-engineering graduates, our Python and data-science tracks are a common bridge into IT — and being close to the centre makes it easy to attend the project and interview-prep sessions in person.",
    ],
    popularCourseSlugs: [
      "python-training-in-pune",
      "data-science-training-in-pune",
      "java-full-stack-training-in-pune",
      "data-analytics-training-in-pune",
      "genai-training-in-pune",
    ],
    localFaqs: [
      {
        question: "How long does it take to reach Kothrud from Erandwane?",
        answer:
          "About 10–15 minutes via Karve Road outside peak hours. Erandwane connects straight to Kothrud, so the commute is short and predictable.",
      },
      {
        question: "I'm a non-IT graduate from the Law College Road area — where do I start?",
        answer:
          "Most non-IT graduates from Erandwane start with our Python or data-science track. Both are designed for beginners and lead to placement-eligible roles.",
      },
      {
        question: "Are there weekend batches for working people in Erandwane?",
        answer:
          "Yes — we run weekend batches alongside weekday ones, which suits Erandwane professionals who can't attend on working days.",
      },
    ],
  },

  // ─── 4. Warje ──────────────────────────────────────────────────────────
  {
    slug: "it-training-in-warje",
    name: "Warje",
    fullName: "Warje, Pune",
    pincode: "411058",
    priority: 4,
    tagline: "A short hop from Kothrud along Paud Road / the highway.",
    metaTitle: "IT Training in Warje, Pune — Archer Infotech",
    metaDescription:
      "Warje and Warje-Malwadi students reach Archer Infotech's Kothrud centre in 15–20 minutes. Java, Python, full-stack, AWS and DevOps courses with placement — classroom, weekend and online batches.",
    intro: [
      "Warje and Warje-Malwadi sit just south-west of Kothrud, along the Mumbai–Bangalore highway (NH-48) and the Paud Road corridor. The area has grown quickly into a residential belt for young families and working professionals, and Archer Infotech's Kothrud centre is a short, direct ride away — usually 15–20 minutes.",
      "Because Warje is well-connected to both Kothrud and the highway, students here have an easy classroom option as well as the flexibility of our online and weekend batches. We see a healthy mix of fresh graduates and early-career professionals from Warje on our full-stack, cloud and DevOps tracks.",
    ],
    commute: {
      distanceLabel: "~5–6 km · 15–20 min",
      paragraphs: [
        "From Warje you can take Paud Road or the highway service road towards Kothrud; both are short hops to the centre. Traffic is lighter than the cross-city routes, so timings are fairly consistent.",
        "PMPML buses connect Warje and Warje-Malwadi to Kothrud Depot, and the area's highway access also makes weekend travel simple.",
      ],
      modes: [
        { mode: "Two-wheeler / car", detail: "15–20 minutes via Paud Road or the NH-48 service road." },
        { mode: "PMPML bus", detail: "Warje / Warje-Malwadi → Kothrud Depot." },
      ],
    },
    landmarks: [
      "Warje-Malwadi",
      "Warje flyover (NH-48)",
      "Warje Jakat Naka",
      "Mumbai–Bangalore Highway access",
      "Pune–Bangalore highway IT offices nearby",
    ],
    whyConvenient: [
      "Warje's short, low-traffic route into Kothrud makes classroom training realistic even on weekdays. For courses with a lot of lab work — full-stack, cloud, DevOps — being able to attend in person without a long commute is a real advantage.",
      "Working professionals in Warje often pick our weekend or evening batches so they can upskill in AWS, DevOps or full-stack development around their jobs, then lean on our placement and interview-prep support when they're ready to switch roles.",
    ],
    popularCourseSlugs: [
      "java-full-stack-training-in-pune",
      "aws-training-in-pune",
      "devops-training-in-pune",
      "python-training-in-pune",
      "mern-stack-training-in-pune",
    ],
    localFaqs: [
      {
        question: "How far is Archer Infotech from Warje?",
        answer:
          "Around 5–6 km, a 15–20 minute ride via Paud Road or the NH-48 service road. Traffic on this stretch is lighter than the cross-city routes.",
      },
      {
        question: "I work near the highway — can I do an evening or weekend batch?",
        answer:
          "Yes. Warje professionals commonly take our weekend and evening batches in AWS, DevOps and full-stack development so training fits around work.",
      },
      {
        question: "Is online training a good option from Warje?",
        answer:
          "It's a solid backup. Many Warje students attend classroom batches but switch to our live online sessions on busy days — the curriculum and trainers are the same.",
      },
    ],
  },

  // ─── 5. Bavdhan ──────────────────────────────────────────────────────────
  {
    slug: "it-training-in-bavdhan",
    name: "Bavdhan",
    fullName: "Bavdhan, Pune",
    pincode: "411021",
    priority: 5,
    tagline: "IT-employee residential belt near Chandni Chowk — easy reach to Kothrud.",
    metaTitle: "IT Training in Bavdhan, Pune — Archer Infotech",
    metaDescription:
      "Bavdhan IT professionals upskill at Archer Infotech's Kothrud centre — AWS, DevOps, full-stack and data science with placement. 15–20 minutes via Chandni Chowk. Weekend and online batches available.",
    intro: [
      "Bavdhan has become one of west Pune's preferred residential areas for IT professionals, thanks to its gated societies and quick access to both the city and the expressway via Chandni Chowk. Archer Infotech's Kothrud centre is a 15–20 minute ride away, which makes it a convenient upskilling option for the many software engineers and recent graduates who live in the area.",
      "We see a strong demand from Bavdhan for cloud, DevOps and data-related tracks — the kind of skills its working-professional population needs for promotions and role switches. Our weekend and online batches are built exactly for this audience, while classroom batches remain easily reachable for those who prefer in-person learning.",
    ],
    commute: {
      distanceLabel: "~6–7 km · 15–20 min via Chandni Chowk",
      paragraphs: [
        "The Chandni Chowk junction (now a flyover) connects Bavdhan smoothly towards Kothrud and Paud Road, so the route to our centre is direct. Outside peak office hours it's a comfortable 15–20 minute ride.",
        "For days when travel isn't practical, Bavdhan's strong residential broadband makes our live online batches a reliable alternative — same trainers, same curriculum.",
      ],
      modes: [
        { mode: "Car / two-wheeler", detail: "15–20 minutes via Chandni Chowk and Paud Road." },
        { mode: "Online live", detail: "A popular choice for Bavdhan professionals on busy work weeks." },
      ],
    },
    landmarks: [
      "Chandni Chowk flyover",
      "Bavdhan gated societies",
      "Pune–Bangalore Expressway access",
      "NDA Road / Pashan link",
      "Mai Mangeshkar Hospital area",
    ],
    whyConvenient: [
      "Bavdhan's large population of working IT professionals makes it a natural fit for our upskilling tracks — AWS, DevOps, data science and full-stack. The short ride to Kothrud means classroom attendance is realistic, and our weekend batches catch those who can only train on days off.",
      "Because so many Bavdhan residents already work in tech, our cohorts from the area tend to be career-switchers and promotion-seekers — and our placement and interview-prep support is geared toward exactly those mid-career moves.",
    ],
    popularCourseSlugs: [
      "aws-training-in-pune",
      "devops-training-in-pune",
      "data-science-training-in-pune",
      "java-full-stack-training-in-pune",
      "genai-training-in-pune",
    ],
    localFaqs: [
      {
        question: "How do I get to Kothrud from Bavdhan?",
        answer:
          "Via the Chandni Chowk junction and Paud Road — a direct 15–20 minute ride of about 6–7 km outside peak hours.",
      },
      {
        question: "I'm a working software engineer in Bavdhan — which courses suit me?",
        answer:
          "Cloud (AWS), DevOps, data science and full-stack are our most popular tracks with Bavdhan professionals looking to upskill or switch roles. Weekend and online batches keep it manageable.",
      },
      {
        question: "Can I train fully online from Bavdhan?",
        answer:
          "Yes. Our live online batches use the same trainers and curriculum as the classroom, which works well for Bavdhan's IT-employee schedules.",
      },
    ],
  },

  // ─── 6. Aundh ──────────────────────────────────────────────────────────
  {
    slug: "it-training-in-aundh",
    name: "Aundh",
    fullName: "Aundh, Pune",
    pincode: "411007",
    priority: 6,
    tagline: "Established IT-residential hub — weekend & online batches that fit.",
    metaTitle: "IT Training in Aundh, Pune — Archer Infotech",
    metaDescription:
      "Aundh students and IT professionals train with Archer Infotech via weekend and online batches — AWS, DevOps, data science, full-stack and generative AI with placement support. Classroom in Kothrud.",
    intro: [
      "Aundh is one of Pune's established upscale residential areas, popular with IT professionals and home to a busy commercial stretch along DP Road and Bremen Chowk. It sits across the Mula river, north of Kothrud, so while it's not adjacent, it's well-connected — and a large share of Aundh's tech workforce chooses our weekend and online batches to upskill around their jobs.",
      "Aundh's proximity to Savitribai Phule Pune University also means a steady flow of students looking to add job-ready skills to their degrees. For them, our Python, data-science and full-stack tracks are the most common starting points, with classroom batches in Kothrud for those happy to travel and online batches for those who'd rather not.",
    ],
    commute: {
      distanceLabel: "~9–10 km · 30–40 min depending on traffic",
      paragraphs: [
        "Aundh connects to Kothrud via the riverside roads and the University Circle corridor. Travel time varies with traffic — typically 30–40 minutes — so many Aundh learners prefer weekend classroom batches or fully online sessions on weekdays.",
        "If you do travel in, weekend mornings are the easiest window from Aundh; if you'd rather not, our live online batches deliver the same trainers and curriculum from home.",
      ],
      modes: [
        { mode: "Car / two-wheeler", detail: "30–40 minutes via University Circle / riverside roads." },
        { mode: "Online live", detail: "The most popular choice for Aundh's weekday learners." },
        { mode: "Weekend classroom", detail: "Easiest in-person window from Aundh." },
      ],
    },
    landmarks: [
      "DP Road & Bremen Chowk",
      "Parihar Chowk",
      "Westend Mall",
      "Savitribai Phule Pune University (nearby)",
      "Aundh–Baner link road",
    ],
    whyConvenient: [
      "Aundh's IT-heavy population gets the most value from our flexible formats: weekend classroom batches for those who want the in-person experience, and live online batches for those who'd rather skip the weekday cross-river commute entirely.",
      "For Aundh's university and college students, our beginner-friendly Python and data-science tracks pair well with placement support — giving them a job-ready edge that their degree alone may not.",
    ],
    popularCourseSlugs: [
      "data-science-training-in-pune",
      "aws-training-in-pune",
      "python-training-in-pune",
      "java-full-stack-training-in-pune",
      "genai-training-in-pune",
    ],
    localFaqs: [
      {
        question: "Is Aundh too far for classroom training in Kothrud?",
        answer:
          "It's about 9–10 km (30–40 min with traffic). Many Aundh students take weekend classroom batches or train online on weekdays to avoid the cross-river commute.",
      },
      {
        question: "Which batch format do most Aundh students choose?",
        answer:
          "A mix — weekend classroom for those who want in-person learning, and live online for weekday convenience. Both use the same trainers and curriculum.",
      },
      {
        question: "I study near Pune University — can training help my placements?",
        answer:
          "Yes. Our Python, data-science and full-stack tracks include resume prep, mock interviews and placement support designed to complement a university degree.",
      },
    ],
  },

  // ─── 7. Baner ──────────────────────────────────────────────────────────
  {
    slug: "it-training-in-baner",
    name: "Baner",
    fullName: "Baner, Pune",
    pincode: "411045",
    priority: 7,
    tagline: "Major IT corridor — built for our online & weekend batches.",
    metaTitle: "IT Training in Baner, Pune — Archer Infotech",
    metaDescription:
      "Baner IT professionals and startup teams upskill with Archer Infotech — AWS, DevOps, full-stack, data science and generative AI with placement. Live online and weekend batches; classroom in Kothrud.",
    intro: [
      "Baner is one of Pune's biggest IT-residential and startup corridors, stretching along Baner Road towards Balewadi and connecting onward to Hinjewadi via the Baner–Sus link. Its population skews heavily towards software engineers, product teams and startup employees — exactly the audience our cloud, DevOps and full-stack upskilling tracks are designed for.",
      "While Baner isn't next door to Kothrud, our weekend and live online batches make distance a non-issue. Baner professionals typically train online on weekdays and reserve in-person sessions — like mock interviews or project reviews — for weekends, when the run to our Kothrud centre is quick.",
    ],
    commute: {
      distanceLabel: "~11 km · 30–45 min depending on traffic",
      paragraphs: [
        "Baner connects to Kothrud through Pashan / Baner Road and the riverside corridor. Peak-hour traffic on this belt is heavy, so most Baner learners default to our online batches for weekdays and travel only for weekend sessions.",
        "Baner's excellent home and co-working connectivity makes our live online format genuinely equivalent to the classroom — you join the same live batch with the same trainer.",
      ],
      modes: [
        { mode: "Online live", detail: "The default for Baner's weekday batches — same live class as the classroom." },
        { mode: "Weekend classroom", detail: "Quick run to Kothrud on weekends for in-person sessions." },
        { mode: "Car", detail: "30–45 minutes via Baner Road / Pashan, traffic-dependent." },
      ],
    },
    landmarks: [
      "Baner Road",
      "Balewadi High Street & Sports Complex",
      "Baner–Sus link to Hinjewadi",
      "Pashan link road",
      "Baner IT & startup offices",
    ],
    whyConvenient: [
      "Baner's dense IT and startup workforce gets the most from our flexible delivery: live online batches that fit a weekday work schedule, plus weekend classroom sessions for the hands-on parts. The curriculum is identical across formats.",
      "Because many Baner learners are working engineers aiming for promotions or role switches into cloud, DevOps or AI, our cohorts here lean senior — and our placement and interview-prep support is geared to those mid-career moves rather than only fresher hiring.",
    ],
    popularCourseSlugs: [
      "aws-training-in-pune",
      "devops-training-in-pune",
      "java-full-stack-training-in-pune",
      "data-science-training-in-pune",
      "genai-training-in-pune",
    ],
    localFaqs: [
      {
        question: "Baner to Kothrud is a long drive — how do most students manage it?",
        answer:
          "Most Baner professionals train online on weekdays (it's the same live batch and trainer) and travel to Kothrud only for weekend in-person sessions like mock interviews.",
      },
      {
        question: "Which courses are most popular with Baner IT professionals?",
        answer:
          "AWS, DevOps, full-stack development, data science and generative AI — the upskilling and role-switch tracks that suit Baner's engineering and startup workforce.",
      },
      {
        question: "Is online training as good as classroom from Baner?",
        answer:
          "For Baner's commute, yes — our live online batches use the same trainers, curriculum and projects. You get classroom-equivalent learning without the Baner–Kothrud traffic.",
      },
    ],
  },

  // ─── 8. Hinjewadi ──────────────────────────────────────────────────────
  {
    slug: "it-training-in-hinjewadi",
    name: "Hinjewadi",
    fullName: "Hinjewadi, Pune",
    pincode: "411057",
    priority: 8,
    tagline: "Pune's IT-park epicentre — evening & online batches for working pros.",
    metaTitle: "IT Training in Hinjewadi, Pune — Archer Infotech",
    metaDescription:
      "Hinjewadi IT-park professionals upskill with Archer Infotech via live online and weekend batches — AWS, DevOps, full-stack, data science and generative AI with placement support. Built around your work schedule.",
    intro: [
      "Hinjewadi is the epicentre of Pune's IT industry — the Rajiv Gandhi Infotech Park (Phases 1, 2 and 3) is home to Infosys, Wipro, TCS, Cognizant, Accenture, Tech Mahindra and hundreds of other firms. Tens of thousands of software professionals work here, and a large share of them are looking to upskill into cloud, DevOps, data and AI roles to keep pace with their careers.",
      "Hinjewadi is also Pune's most traffic-bound corridor, so we don't pretend a daily commute to Kothrud is realistic. Instead, our Hinjewadi students train through live online batches on weekdays and reserve the occasional weekend classroom session for in-person mock interviews and project reviews. The model is built around the working IT professional's schedule, not against it.",
    ],
    commute: {
      distanceLabel: "~18–20 km · 45–75 min (traffic-dependent)",
      paragraphs: [
        "The Hinjewadi–Kothrud route via the Bangalore highway or Baner can take well over an hour at peak times — which is exactly why our Hinjewadi cohorts lean on live online batches. You join the same class as the Kothrud classroom, just from home or office.",
        "When you do want in-person time, our 6 PM and weekend batches are timed for the Hinjewadi return commute, so you're not fighting peak traffic in both directions.",
      ],
      modes: [
        { mode: "Online live", detail: "The primary format for Hinjewadi professionals — same live batch and trainer." },
        { mode: "Weekend classroom", detail: "Reserved for in-person mock interviews and project reviews." },
        { mode: "Evening (6 PM) batch", detail: "Timed for the Hinjewadi return route when you do travel in." },
      ],
    },
    landmarks: [
      "Rajiv Gandhi Infotech Park (Phase 1/2/3)",
      "Infosys, Wipro, TCS, Cognizant campuses",
      "Accenture & Tech Mahindra offices",
      "Hinjewadi–Wakad road",
      "Maan / Marunji IT belt",
    ],
    whyConvenient: [
      "For Hinjewadi's IT workforce, the value isn't proximity — it's a delivery model designed around your job. Live online batches let you upskill in AWS, DevOps, data science or generative AI without losing two hours a day to traffic, while weekend sessions cover the hands-on, interview-prep parts in person.",
      "Because our trainers are working professionals from MNCs like the ones in Hinjewadi, the content maps directly to the tools and interview patterns you'll face when you go for that next role — and our placement support is tuned to mid-career switches, not just fresher hiring.",
    ],
    popularCourseSlugs: [
      "aws-training-in-pune",
      "devops-training-in-pune",
      "data-science-training-in-pune",
      "genai-training-in-pune",
      "java-full-stack-training-in-pune",
    ],
    localFaqs: [
      {
        question: "Is it practical to commute from Hinjewadi to Kothrud for classes?",
        answer:
          "Not daily — the route can take 45–75 minutes at peak times. Hinjewadi professionals train through our live online batches on weekdays and travel to Kothrud only for occasional weekend sessions.",
      },
      {
        question: "Do you have batch timings that suit Hinjewadi IT employees?",
        answer:
          "Yes. Our live online batches and 6 PM / weekend timings are built around the Hinjewadi work and return-commute schedule so training doesn't clash with office hours.",
      },
      {
        question: "Which courses help Hinjewadi professionals switch roles?",
        answer:
          "AWS, DevOps, data science, generative AI and full-stack are the most common upskilling and role-switch tracks. Trainers are working MNC professionals, so the content matches real interview expectations.",
      },
    ],
  },

  // ─── 9. Wakad ──────────────────────────────────────────────────────────
  {
    slug: "it-training-in-wakad",
    name: "Wakad",
    fullName: "Wakad, Pune",
    pincode: "411057",
    priority: 9,
    tagline: "Hinjewadi's residential neighbour — online & weekend batches.",
    metaTitle: "IT Training in Wakad, Pune — Archer Infotech",
    metaDescription:
      "Wakad IT professionals upskill with Archer Infotech via live online and weekend batches — AWS, DevOps, full-stack, data science and generative AI with placement. Designed for Hinjewadi-corridor schedules.",
    intro: [
      "Wakad is the dense residential neighbour of Hinjewadi, packed with apartments and gated societies that house much of the IT park's workforce. For Wakad's software professionals, Archer Infotech offers a way to upskill into cloud, DevOps, data and AI roles without adding a long commute to an already traffic-heavy daily routine.",
      "Like Hinjewadi, the smart play from Wakad is live online batches on weekdays with optional weekend classroom sessions in Kothrud. You get the same trainers and curriculum as the in-person batch, and our timings are set with the Wakad–Hinjewadi schedule in mind.",
    ],
    commute: {
      distanceLabel: "~16 km · 40–60 min (traffic-dependent)",
      paragraphs: [
        "The Wakad–Kothrud route shares the same congested Hinjewadi-corridor traffic, so daily travel isn't practical for most. Our Wakad students therefore default to live online batches and treat the Kothrud classroom as a weekend option.",
        "Wakad's strong residential connectivity makes the online format reliable — you're in the same live session as everyone else, just from home.",
      ],
      modes: [
        { mode: "Online live", detail: "Primary format for Wakad — same live batch and trainer." },
        { mode: "Weekend classroom", detail: "Optional in-person sessions in Kothrud on days off." },
        { mode: "Car", detail: "40–60 minutes to Kothrud, traffic-dependent." },
      ],
    },
    landmarks: [
      "Datta Mandir Chowk",
      "Wakad–Hinjewadi road",
      "Kaspate Wasti",
      "Wakad bridge (Mula river)",
      "Hinjewadi IT park (adjacent)",
    ],
    whyConvenient: [
      "Wakad's value mirrors Hinjewadi's: a delivery model that respects the IT-corridor commute. Live online batches let you upskill around work, while weekend classroom sessions handle the hands-on and interview-prep parts in person.",
      "With most Wakad learners being working engineers, our cohorts here focus on promotions and role switches into cloud, DevOps and AI — backed by placement and interview support tuned to experienced candidates.",
    ],
    popularCourseSlugs: [
      "aws-training-in-pune",
      "devops-training-in-pune",
      "java-full-stack-training-in-pune",
      "data-science-training-in-pune",
      "genai-training-in-pune",
    ],
    localFaqs: [
      {
        question: "How far is Kothrud from Wakad?",
        answer:
          "About 16 km, or 40–60 minutes with the Hinjewadi-corridor traffic. Most Wakad students train online on weekdays and visit Kothrud only on weekends.",
      },
      {
        question: "Can I upskill from Wakad without commuting daily?",
        answer:
          "Yes — our live online batches are the same class as the Kothrud classroom. Wakad professionals use them on weekdays and keep weekends for optional in-person sessions.",
      },
      {
        question: "Which courses are popular with Wakad IT employees?",
        answer:
          "AWS, DevOps, full-stack, data science and generative AI — the upskilling tracks that match the Hinjewadi-corridor workforce.",
      },
    ],
  },

  // ─── 10. Pimpri-Chinchwad ────────────────────────────────────────────────
  {
    slug: "it-training-in-pimpri-chinchwad",
    name: "Pimpri-Chinchwad",
    fullName: "Pimpri-Chinchwad, Pune",
    pincode: "411017",
    priority: 10,
    tagline: "PCMC's large catchment — online-first, weekend-friendly.",
    metaTitle: "IT Training in Pimpri-Chinchwad (PCMC), Pune — Archer Infotech",
    metaDescription:
      "Pimpri-Chinchwad students and professionals train with Archer Infotech via live online and weekend batches — Java, Python, full-stack, AWS, DevOps and data science with placement support.",
    intro: [
      "Pimpri-Chinchwad (PCMC) is a large twin-city catchment north-west of Pune, blending a major industrial base — Bajaj Auto, Tata Motors, Force Motors — with a growing IT and engineering workforce. Its sheer size and the distance to central Pune make Archer Infotech's online-first model the practical choice for PCMC learners.",
      "We see strong demand from PCMC's engineering students and early-career professionals across full-stack, cloud and data tracks. Live online batches let students from Pimpri, Chinchwad, Akurdi and Nigdi join the same classes as our Kothrud cohort, with weekend classroom sessions available for those willing to travel for the hands-on parts.",
    ],
    commute: {
      distanceLabel: "~18–22 km · 45–70 min depending on origin & traffic",
      paragraphs: [
        "Distances within PCMC vary a lot — Pimpri, Akurdi and Nigdi are all 18–22 km from Kothrud, generally 45–70 minutes by road. Daily travel isn't practical, so our PCMC students train primarily online.",
        "For those who want in-person time, weekend classroom batches in Kothrud are the realistic window. The online batches otherwise deliver the full curriculum with the same trainers.",
      ],
      modes: [
        { mode: "Online live", detail: "Primary format for PCMC — join the same live batch from home." },
        { mode: "Weekend classroom", detail: "For PCMC students who want occasional in-person sessions." },
      ],
    },
    landmarks: [
      "Pimpri & Chinchwad station areas",
      "Akurdi & Nigdi",
      "Bajaj Auto / Tata Motors / Force Motors",
      "D-Mart & Chinchwad MIDC",
      "Akurdi engineering colleges",
    ],
    whyConvenient: [
      "For PCMC's large student and professional base, our online-first delivery removes the distance barrier entirely — you get the same trainers, curriculum and placement support as students sitting in our Kothrud classroom, without a 90-minute round trip.",
      "PCMC's engineering colleges feed a steady stream of fresh graduates into our full-stack, Python and cloud tracks, where our placement and interview-prep support helps them compete for Pune's product and services roles.",
    ],
    popularCourseSlugs: [
      "java-full-stack-training-in-pune",
      "python-training-in-pune",
      "aws-training-in-pune",
      "devops-training-in-pune",
      "data-science-training-in-pune",
    ],
    localFaqs: [
      {
        question: "Is Kothrud reachable daily from Pimpri-Chinchwad?",
        answer:
          "Not realistically — it's 18–22 km (45–70 min). PCMC students train mainly through our live online batches and attend weekend classroom sessions when they want in-person time.",
      },
      {
        question: "I'm a fresh engineering graduate in Akurdi/Nigdi — can you help with placement?",
        answer:
          "Yes. Our full-stack, Python and cloud tracks include resume building, mock interviews and placement support aimed at fresh graduates entering Pune's job market.",
      },
      {
        question: "Do PCMC students get the same training as Kothrud students?",
        answer:
          "Exactly the same — our live online batches share the trainer, curriculum, projects and placement support with the classroom cohort.",
      },
    ],
  },

  // ─── 11. Deccan / Shivaji Nagar ──────────────────────────────────────────
  {
    slug: "it-training-in-deccan",
    name: "Deccan & Shivaji Nagar",
    fullName: "Deccan Gymkhana, Pune",
    pincode: "411004",
    priority: 11,
    tagline: "Pune's college belt — a short ride down Karve Road.",
    metaTitle: "IT Training in Deccan & Shivaji Nagar, Pune — Archer Infotech",
    metaDescription:
      "Deccan and Shivaji Nagar students reach Archer Infotech's Kothrud centre in 15–20 minutes via Karve Road. Python, full-stack, data science and Java courses with placement — classroom, weekend and online.",
    intro: [
      "Deccan Gymkhana and Shivaji Nagar form the historic heart of Pune's education scene — Fergusson College, BMCC, Garware College and the College of Engineering Pune (COEP) are all within or near this belt, alongside the busy FC Road and JM Road stretches. It's one of the densest student catchments in the city, and a short, direct ride down Karve Road to our Kothrud centre.",
      "For Deccan's enormous student population — including many from non-IT and general degree streams — our beginner-friendly Python, data-science and full-stack tracks are the most common entry into a tech career. The proximity means classroom attendance is genuinely easy, so students get the in-person, project-based experience our courses are built around.",
    ],
    commute: {
      distanceLabel: "~4–5 km · 15–20 min via Karve Road",
      paragraphs: [
        "Karve Road runs straight from the Deccan / Nal Stop area to Kothrud, so the journey is short and predictable. From FC Road or Deccan Gymkhana you're looking at a 15–20 minute ride.",
        "The area is also served by the Pune Metro (Garware College / Deccan corridor) and frequent buses, making the trip to Kothrud easy without a vehicle.",
      ],
      modes: [
        { mode: "Two-wheeler / car", detail: "15–20 minutes via Karve Road." },
        { mode: "Pune Metro", detail: "Use the Garware College / Deccan corridor, then a short hop." },
        { mode: "PMPML bus", detail: "Frequent buses from Deccan / Shivaji Nagar to Kothrud Depot." },
      ],
    },
    landmarks: [
      "Fergusson College (FC Road)",
      "BMCC & Garware College",
      "College of Engineering Pune (COEP, nearby)",
      "Deccan Gymkhana & JM Road",
      "Symbiosis (Senapati Bapat Road)",
    ],
    whyConvenient: [
      "Deccan's college belt is one of our biggest student feeders precisely because Kothrud is so close. Students can attend classroom batches around their lectures, drop in for project and doubt-clearing sessions, and still use online sessions when they're busy with exams.",
      "For the area's many arts, commerce and science graduates, our Python and data-science tracks are a proven bridge into IT — and being a short ride away makes it easy to attend the hands-on sessions and placement-prep workshops in person.",
    ],
    popularCourseSlugs: [
      "python-training-in-pune",
      "data-science-training-in-pune",
      "java-full-stack-training-in-pune",
      "data-analytics-training-in-pune",
      "mern-stack-training-in-pune",
    ],
    localFaqs: [
      {
        question: "How far is Kothrud from Deccan / Shivaji Nagar?",
        answer:
          "About 4–5 km, a 15–20 minute ride down Karve Road. It's also reachable by Pune Metro and frequent buses.",
      },
      {
        question: "I'm a Fergusson / BMCC student from a non-IT stream — can I learn to code here?",
        answer:
          "Absolutely. Many Deccan-belt students from arts, commerce and science backgrounds start with our beginner-friendly Python or data-science track and move into tech roles with our placement support.",
      },
      {
        question: "Can I fit classroom batches around my college timetable?",
        answer:
          "Yes — Kothrud is close enough that Deccan students regularly attend weekday evening or weekend classroom batches around their lectures.",
      },
    ],
  },

  // ─── 12. Karve Road ──────────────────────────────────────────────────────
  {
    slug: "it-training-in-karve-road",
    name: "Karve Road",
    fullName: "Karve Road, Pune",
    pincode: "411004",
    priority: 12,
    tagline: "The arterial road to our door — Nal Stop to Kothrud in minutes.",
    metaTitle: "IT Training on Karve Road, Pune — Archer Infotech",
    metaDescription:
      "Karve Road students reach Archer Infotech's Kothrud centre in minutes along the same arterial road. Python, full-stack, data science and Java courses with placement — classroom, weekend and online batches.",
    intro: [
      "Karve Road is the arterial spine of west-central Pune — it runs from the Deccan / Nal Stop end, through Erandwane, all the way to Kothrud, where our centre sits just off it. For anyone living or studying along Karve Road, from SP College and Nal Stop to the Garware Bridge stretch, Archer Infotech is effectively on your daily route.",
      "Because the road leads straight to us, Karve Road students get the simplest possible commute to classroom training — often just a few minutes by two-wheeler, bus or metro. That makes the in-person, project-based parts of our Python, full-stack and data-science courses easy to attend without rearranging your day.",
    ],
    commute: {
      distanceLabel: "~2–4 km · 5–15 min along Karve Road",
      paragraphs: [
        "Karve Road connects directly to Kothrud, so the journey to our centre is one of the shortest of any Pune neighbourhood — typically 5–15 minutes depending on where along the road you start.",
        "The Pune Metro's Garware College and Vanaz corridor parallels Karve Road, and PMPML buses run frequently, so reaching Kothrud without a vehicle is easy.",
      ],
      modes: [
        { mode: "Two-wheeler", detail: "5–15 minutes straight along Karve Road." },
        { mode: "Pune Metro", detail: "Garware College / Vanaz corridor runs parallel to Karve Road." },
        { mode: "PMPML bus", detail: "Frequent Karve Road buses terminate near Kothrud Depot." },
      ],
    },
    landmarks: [
      "Nal Stop",
      "SP College area",
      "Garware Bridge / Garware College",
      "Karve Statue junction",
      "Mhatre Bridge",
    ],
    whyConvenient: [
      "Karve Road students have arguably the easiest access of any Pune neighbourhood — the road runs to our door. That short, predictable commute makes classroom batches the natural choice, so you get full in-person time with trainers for the hands-on, lab-based parts of every course.",
      "With colleges and student housing dotted all along Karve Road, our weekday evening and weekend classroom batches fit easily around lectures and jobs — and our placement support is right there when you're ready to interview.",
    ],
    popularCourseSlugs: [
      "python-training-in-pune",
      "java-full-stack-training-in-pune",
      "data-science-training-in-pune",
      "react-training-in-pune",
      "mern-stack-training-in-pune",
    ],
    localFaqs: [
      {
        question: "How close is Archer Infotech to Karve Road?",
        answer:
          "Very close — our centre sits just off Karve Road in Kothrud, typically 5–15 minutes from anywhere along the road. It's one of the shortest commutes of any Pune area.",
      },
      {
        question: "Can I reach the centre by Pune Metro from Karve Road?",
        answer:
          "Yes — the Garware College / Vanaz metro corridor runs parallel to Karve Road, and the centre is a short hop from there. Frequent buses also serve the route.",
      },
      {
        question: "Is classroom training the best option from Karve Road?",
        answer:
          "Given how short the commute is, yes — most Karve Road students attend classroom batches and get full in-person time with trainers. Online and weekend batches are also available.",
      },
    ],
  },

  // ─── 13. Kharadi ─────────────────────────────────────────────────────────
  {
    slug: "it-training-in-kharadi",
    name: "Kharadi",
    fullName: "Kharadi, Pune",
    pincode: "411014",
    priority: 13,
    tagline: "East Pune's biggest IT hub — EON, WTC and the GCC belt.",
    metaTitle: "IT Training in Kharadi, Pune — Archer Infotech",
    metaDescription:
      "Kharadi IT professionals and students train with Archer Infotech via live-online and weekend batches — Java full stack, Python full stack, data science, AWS and DevOps with placement support. Classroom in Kothrud.",
    intro: [
      "Kharadi is East Pune's largest IT destination — home to EON Free Zone (EON IT Park), the World Trade Center (WTC) Pune, Zensar Technologies' campus and Gera Commerze, with employers like Barclays, Credit Suisse (UBS), Honeywell, Vodafone, Allstate, eClerx, WNS and Synechron running large delivery and GCC captive teams here. That concentration of hiring makes Kharadi one of the strongest areas in Pune for job-ready upskilling.",
      "Kharadi sits on the eastern edge of the city, so it's not adjacent to our Kothrud centre — which is exactly why most Kharadi learners choose our live-online batches to upskill around demanding IT jobs, with weekend classroom as an option for those who want occasional in-person time. Java full stack, Python full stack and data science are the most-requested tracks from Kharadi's workforce, with cloud (AWS) and DevOps close behind.",
    ],
    commute: {
      distanceLabel: "~18–20 km · 45–60 min cross-city",
      paragraphs: [
        "Kharadi is on the opposite side of the city from Kothrud — roughly 18–20 km via the Airport Road / Koregaon Park corridor or the river route, typically 45–60 minutes depending on traffic. Because of that distance, live-online is by far the most popular format for Kharadi's IT professionals.",
        "For those who want in-person time on the harder modules, weekend classroom batches in Kothrud are the easiest window; the rest of the week runs online with the same trainers and curriculum.",
      ],
      modes: [
        { mode: "Online live", detail: "The default for Kharadi's weekday IT workforce — no cross-city commute." },
        { mode: "Weekend classroom", detail: "Easiest in-person option; Saturday batches in Kothrud." },
        { mode: "Car / cab", detail: "45–60 min via Airport Road / Koregaon Park corridor." },
      ],
    },
    landmarks: [
      "EON Free Zone / EON IT Park",
      "World Trade Center (WTC) Pune",
      "Zensar Technologies campus",
      "Gera Commerze / Reliable Plaza",
      "Kharadi Bypass & Chandan Nagar",
    ],
    whyConvenient: [
      "Kharadi's dense GCC and IT-services hiring — Barclays, Credit Suisse, Honeywell, Zensar and others — is exactly the placement path our Java full stack, Python full stack and data-science tracks target, so the skills you build map directly to employers a few minutes from your desk.",
      "Live-online batches let Kharadi professionals upskill without the long cross-city commute, while weekend classroom in Kothrud is there when you want hands-on lab time — same trainers, same projects, same placement support either way.",
    ],
    popularCourseSlugs: [
      "java-full-stack-training-in-pune",
      "python-full-stack-training-in-pune",
      "data-science-training-in-pune",
      "aws-training-in-pune",
      "devops-training-in-pune",
    ],
    localFaqs: [
      {
        question: "Is Kharadi too far for training in Kothrud?",
        answer:
          "It's about 18–20 km cross-city (45–60 min with traffic), so most Kharadi students train via live-online batches and use weekend classroom in Kothrud only when they want in-person lab time. Both use the same trainers and curriculum.",
      },
      {
        question: "Which Kharadi companies hire from these courses?",
        answer:
          "EON IT Park and WTC employers — Barclays, Credit Suisse (UBS), Honeywell, Zensar, Vodafone, Allstate, eClerx, WNS, Synechron and other GCC captives — regularly hire Java full stack, Python full stack, data-science, cloud and DevOps talent.",
      },
      {
        question: "Can I do the course while working in a Kharadi IT job?",
        answer:
          "Yes — that's the common case. Live-online evening and weekend batches are built for working professionals, with the same projects, mock interviews and placement support as classroom.",
      },
    ],
  },

  // ─── 14. Viman Nagar ─────────────────────────────────────────────────────
  {
    slug: "it-training-in-viman-nagar",
    name: "Viman Nagar",
    fullName: "Viman Nagar, Pune",
    pincode: "411014",
    priority: 14,
    tagline: "Airport-belt IT & campus hub — Symbiosis, WeWork, Weikfield.",
    metaTitle: "IT Training in Viman Nagar, Pune — Archer Infotech",
    metaDescription:
      "Viman Nagar students and professionals train with Archer Infotech via live-online and weekend batches — Java full stack, Python full stack, data science, MERN stack and Python with placement support. Classroom in Kothrud.",
    intro: [
      "Viman Nagar is one of East Pune's busiest cosmopolitan hubs, next to Pune Airport and anchored by Weikfield IT Park, WeWork Futura, Phoenix Marketcity and the cluster of Symbiosis International University institutes. Between the Symbiosis student population and the startups, GCC teams and co-working tenants in the area, there's strong, steady demand for job-ready IT skills right here.",
      "Viman Nagar sits on the eastern side of the city, so most learners here train through our live-online batches, with weekend classroom in Kothrud as an option. Symbiosis and other college students most often start with Python, MERN stack or data science, while working professionals lean toward Java full stack and Python full stack — all with the same placement support.",
    ],
    commute: {
      distanceLabel: "~15–17 km · 40–55 min via Airport Road",
      paragraphs: [
        "Viman Nagar is roughly 15–17 km from our Kothrud centre via the Airport Road corridor, typically 40–55 minutes with traffic. Given the distance, live-online is the format most Viman Nagar learners choose.",
        "Students who want occasional in-person time take weekend classroom batches in Kothrud; the rest of the week runs online with identical trainers, projects and Q&A.",
      ],
      modes: [
        { mode: "Online live", detail: "Most popular for Viman Nagar's weekday learners and professionals." },
        { mode: "Weekend classroom", detail: "Saturday in-person batches in Kothrud." },
        { mode: "Car / two-wheeler", detail: "40–55 min via Airport Road / Nagar Road." },
      ],
    },
    landmarks: [
      "Symbiosis International University campuses",
      "Weikfield IT Park",
      "WeWork Futura",
      "Phoenix Marketcity",
      "Pune Airport & Nagar Road",
    ],
    whyConvenient: [
      "Viman Nagar's mix of Symbiosis students and airport-belt startups/GCC teams makes it a natural fit for our beginner-friendly Python, MERN and data-science tracks alongside the professional Java full stack and Python full stack paths — all with placement support attached.",
      "Live-online delivery removes the airport-corridor commute, while weekend classroom in Kothrud gives hands-on lab time when you want it — same trainers and curriculum in both formats.",
    ],
    popularCourseSlugs: [
      "java-full-stack-training-in-pune",
      "python-full-stack-training-in-pune",
      "data-science-training-in-pune",
      "mern-stack-training-in-pune",
      "python-training-in-pune",
    ],
    localFaqs: [
      {
        question: "I study at Symbiosis in Viman Nagar — can training help my placements?",
        answer:
          "Yes. Our Python, MERN, data-science and full-stack tracks include resume prep, mock interviews and placement support designed to add job-ready skills on top of a Symbiosis degree.",
      },
      {
        question: "Is Viman Nagar too far for classroom batches?",
        answer:
          "It's about 15–17 km via Airport Road (40–55 min with traffic), so most Viman Nagar students train live-online and use weekend classroom in Kothrud when they want in-person time. Both formats are identical in content.",
      },
      {
        question: "Which batch format do most Viman Nagar learners choose?",
        answer:
          "Live-online for weekday convenience, with weekend classroom as an option. The trainers, projects and placement support are the same in either format.",
      },
    ],
  },

  // ─── 15. Hadapsar & Magarpatta ───────────────────────────────────────────
  {
    slug: "it-training-in-hadapsar-magarpatta",
    name: "Hadapsar & Magarpatta",
    fullName: "Hadapsar & Magarpatta City, Pune",
    pincode: "411028",
    priority: 15,
    tagline: "Magarpatta Cyber City & SP Infocity — Amdocs, Accenture, John Deere.",
    metaTitle: "IT Training in Hadapsar & Magarpatta, Pune — Archer Infotech",
    metaDescription:
      "Hadapsar and Magarpatta IT professionals and students train with Archer Infotech via live-online and weekend batches — Java full stack, Python full stack, data science, DevOps and software testing with placement support. Classroom in Kothrud.",
    intro: [
      "Hadapsar and the adjacent Magarpatta City form one of East Pune's most concentrated IT zones — Magarpatta Cyber City and SP Infocity host Amdocs, Accenture, Mphasis, John Deere, Fujitsu and Zensar, among others. With that many delivery centres and GCC captives in a small radius, Hadapsar–Magarpatta is a prime area for placement-focused upskilling.",
      "The zone is on the eastern side of Pune, well away from our Kothrud centre, so most Hadapsar–Magarpatta learners train through live-online batches around their work schedules, with weekend classroom as an option. Java full stack, Python full stack and data science are the most-requested tracks here, with DevOps and software testing strong given the large services and QA teams in Magarpatta.",
    ],
    commute: {
      distanceLabel: "~14–16 km · 40–55 min via Solapur Road",
      paragraphs: [
        "Hadapsar–Magarpatta is about 14–16 km from Kothrud via the Solapur Road / Ghorpadi corridor, typically 40–55 minutes with traffic. Because of the distance and East-Pune congestion, live-online is the format most learners here choose.",
        "For in-person time on harder modules, weekend classroom batches in Kothrud are the easiest window, with the rest of the week online — same trainers, labs and projects throughout.",
      ],
      modes: [
        { mode: "Online live", detail: "Default for Magarpatta Cyber City's weekday IT workforce." },
        { mode: "Weekend classroom", detail: "Saturday in-person batches in Kothrud." },
        { mode: "Car / cab", detail: "40–55 min via Solapur Road / Ghorpadi." },
      ],
    },
    landmarks: [
      "Magarpatta City Cyber City",
      "SP Infocity",
      "Amanora Mall / Seasons Mall",
      "Hadapsar Gadital",
      "Solapur Road corridor",
    ],
    whyConvenient: [
      "Magarpatta and SP Infocity employers — Amdocs, Accenture, Mphasis, John Deere, Fujitsu, Zensar — hire heavily for Java full stack, Python full stack, data science, DevOps and QA/testing, which is precisely what our tracks build and place for.",
      "Live-online delivery means Hadapsar–Magarpatta professionals can upskill without the East-Pune commute, while weekend classroom in Kothrud provides hands-on lab time — identical trainers, curriculum and placement support in both.",
    ],
    popularCourseSlugs: [
      "java-full-stack-training-in-pune",
      "python-full-stack-training-in-pune",
      "data-science-training-in-pune",
      "devops-training-in-pune",
      "software-testing-training-in-pune",
    ],
    localFaqs: [
      {
        question: "Which Magarpatta / Hadapsar companies hire from these courses?",
        answer:
          "Magarpatta Cyber City and SP Infocity employers — Amdocs, Accenture, Mphasis, John Deere, Fujitsu and Zensar — regularly hire Java full stack, Python full stack, data-science, DevOps and software-testing talent.",
      },
      {
        question: "Is Hadapsar too far for classroom training in Kothrud?",
        answer:
          "It's about 14–16 km via Solapur Road (40–55 min with traffic), so most Hadapsar–Magarpatta students train live-online and use weekend classroom in Kothrud when they want in-person time. Both formats are identical in content.",
      },
      {
        question: "Can I train while working in a Magarpatta IT job?",
        answer:
          "Yes — live-online evening and weekend batches are designed for working professionals, with the same projects, mock interviews and placement support as classroom.",
      },
    ],
  },
];

/** Look up a neighbourhood by its slug. */
export function getNeighbourhood(slug: string): NeighbourhoodLocation | undefined {
  return neighbourhoods.find((n) => n.slug === slug);
}

/** All neighbourhoods ordered by priority (home turf first). */
export function getNeighbourhoodsByPriority(): NeighbourhoodLocation[] {
  return [...neighbourhoods].sort((a, b) => a.priority - b.priority);
}

/**
 * P4-21 — resolve the 3 nearby neighbourhood slugs for a given area
 * into full NeighbourhoodLocation objects, filtering out any that
 * don't resolve (defensive: if a slug is removed from the catalogue,
 * the page still renders cleanly).
 */
export function getNearbyNeighbourhoods(
  slug: string
): NeighbourhoodLocation[] {
  const nearbySlugs = NEARBY_NEIGHBOURHOODS_MAP[slug] ?? [];
  return nearbySlugs
    .map((s) => getNeighbourhood(s))
    .filter((n): n is NeighbourhoodLocation => Boolean(n));
}
