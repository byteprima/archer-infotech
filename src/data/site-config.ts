export const siteConfig = {
  name: "Archer Infotech",
  tagline: "Best IT Training Institute in Pune",
  description:
    "Archer Infotech is Pune's trusted IT training institute since 2009 — Java, Python, AWS, DevOps, Full Stack, Data Science, AI/ML and Cloud courses with placement assistance. 10,000+ students trained and 5,000+ placed.",
  url: "https://archerinfotech.in",
  ogImage: "/images/og-image.jpg",
  foundingYear: 2009,

  // Contact Information
  contact: {
    email: "info@archerinfotech.in",
    phone: "+91 9850 678451",
    whatsapp: "+919850678451",
    address: {
      line1: "Flat No. 12, Divyadarshan Housing Society",
      line2: "behind Kothrud Bus Stand Road, near Natraj Gas Agency, Londhe Wada, Chaitanya Nagar",
      city: "Kothrud, Pune",
      state: "Maharashtra",
      pincode: "411038",
      country: "India",
    },
  },

  /**
   * Additional physical branches beyond the Kothrud HQ.
   *
   * The Pune centre deliberately does NOT appear in this array — it lives in
   * `contact.address` above, which every component, the visible NAP, and the
   * Organization schema already read. Duplicating it here would create a
   * second source of truth for the one address that must never drift.
   *
   * Sangli was confirmed as a genuine second Archer location (not a
   * namesake) on 2026-08-09, and its NAP confirmed by the owner on
   * 2026-08-13. Note the PIN: **416415**. Justdial has this right; the
   * Sulekha listing's 416416 is wrong and needs correcting at source.
   */
  branches: [
    {
      id: "sangli",
      name: "Archer Infotech — Vishrambag, Sangli",
      city: "Sangli",
      subLocality: "Vishrambag",
      address: {
        line1: "Vishwaleela Complex, Office No. G-3, Ground Floor",
        line2: "MSEB Road, opposite Walchand College side gate, Vishrambag",
        city: "Sangli",
        state: "Maharashtra",
        pincode: "416415",
        country: "India",
      },
      // Shares the Pune number — deliberate, and good for NAP consistency:
      // one phone across both branches means every citation reinforces the
      // same number rather than splitting the signal.
      phone: "+91 9850 678451",
      /**
       * Open all seven days, 08:00–20:00 (owner-confirmed 2026-08-13).
       * Weekday sessions run with the resident Sangli faculty member;
       * weekend batches are taught by senior trainers from the Pune centre.
       * Note this differs from Pune's 09:00 open — a real difference to
       * preserve across citations, not a typo to normalise.
       */
      openingHours: [
        {
          days: [
            "Monday", "Tuesday", "Wednesday", "Thursday",
            "Friday", "Saturday", "Sunday",
          ],
          opens: "08:00",
          closes: "20:00",
        },
      ],
      /** Canonical landing page — where this branch's citations must point. */
      path: "/it-training-in-pune-for/sangli-miraj",
      /** Taught at this branch specifically — narrower than the Pune catalogue. */
      courses: [
        "C", "C++", "Java", "Python", "Tally",
        "Java Full Stack", "Python Full Stack",
        "Data Science", "AI Engineering", "Data Analytics",
      ],
      areaServed: ["Sangli", "Miraj", "Kupwad", "Vishrambag"],
    },
  ],

  // Social Links + canonical knowledge-graph URLs (P6-06 — Wikidata 2026-06-11).
  social: {
    facebook: "https://facebook.com/archerinfotech",
    instagram: "https://instagram.com/archerinfotech",
    linkedin: "https://www.linkedin.com/in/archer-infotech-0714a5404/",
    twitter: "https://x.com/archerinfotech",
    youtube: "https://youtube.com/@archerinfotech2022",
    github: "https://github.com/archerinfotech",
    reddit: "https://www.reddit.com/user/archerinfotech/",
    // Wikidata entity — the entity is the canonical machine-readable
    // identifier Google + AI engines map back to our brand. Submitted
    // 2026-06-11 via wikidata_submit.py (P6-06).
    wikidata: "https://www.wikidata.org/wiki/Q140177819",
  },

  // Google Maps
  googleMaps: {
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.0!2d73.810452!3d18.5002215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bfe592dccbf1%3A0x539e5f9e90dcca38!2sArcher%20Infotech!5e0!3m2!1sen!2sin!4v1711712400000",
    placeId: "0x3bc2bfe592dccbf1:0x539e5f9e90dcca38",
    url: "https://www.google.com/maps/place/Archer+Infotech/@18.5002215,73.810452,17z/data=!3m1!4b1!4m6!3m5!1s0x3bc2bfe592dccbf1:0x539e5f9e90dcca38!8m2!3d18.5002215!4d73.8130269",
    // Destination for /review (P7-04). The official GBP one-tap review link
    // (from GBP → "Ask for reviews") — opens the Google review dialog (stars +
    // text box) DIRECTLY, no panel/scroll. The /review route serves this as a
    // permanent 308 (it auto-detects the g.page host). Single source of truth
    // for the review CTA used on QR cards, email signatures, and posters.
    reviewUrl: "https://g.page/r/CTjK3JCeX55TEBM/review",
  },

  // Stats — kept truthful and source-of-truth for hero counters, schema, llms.txt.
  // yearsExperience derived from foundingYear (2009) — currently 17+.
  stats: {
    studentsTrained: "10000+",
    studentsPlaced: "5000+",
    yearsExperience: "17+",
    corporatePartners: "100+",
    courses: "40+",
    batchesCompleted: "1000+",
    placementRate: "90%",
  },

  // Opening hours — used by LocalBusiness schema and contact page.
  openingHours: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "09:00", closes: "20:00" },
  ],

  // Key Highlights
  highlights: [
    "17+ Years of IT Training Experience",
    "10,000+ Students Trained, 5,000+ Placed",
    "1000+ Batches Successfully Completed",
    "Placement Assistance",
    "Industry Expert Trainers",
    "Real-time Project Training",
    "Both Online & Offline Classes",
    "Corporate Training Solutions",
  ],

  // Unique Selling Points
  usps: [
    {
      title: "Expert Trainers",
      description: "Learn from industry professionals with 10+ years of experience",
      icon: "Users",
    },
    {
      title: "Placement Assistance",
      description: "Complete placement assistance with top IT companies",
      icon: "Briefcase",
    },
    {
      title: "Real Projects",
      description: "Work on live projects and build your portfolio",
      icon: "FolderOpen",
    },
    {
      title: "Flexible Learning",
      description: "Choose from online or offline batches as per your convenience",
      icon: "Clock",
    },
    {
      title: "Updated Curriculum",
      description: "Courses aligned with current industry requirements",
      icon: "BookOpen",
    },
    {
      title: "AI Enabled Courses",
      description: "Learn with AI-powered tools and modern teaching methods",
      icon: "Sparkles",
    },
  ],

  // Navigation Links
  navigation: {
    main: [
      { name: "Home", href: "/" },
      { name: "About", href: "/about" },
      { name: "Courses", href: "/courses" },
      { name: "Placements", href: "/placements" },
      { name: "Internships", href: "/internships" },
      { name: "Corporate Training", href: "/corporate-training" },
      { name: "Batch Schedule", href: "/batch-schedule" },
      { name: "Blog", href: "/blog" },
      { name: "Contact", href: "/contact" },
    ],
    courses: [
      { name: "Java Full Stack", href: "/courses/full-stack-development/java-full-stack-training-in-pune" },
      { name: "Python", href: "/courses/programming/python-training-in-pune" },
      { name: "AWS", href: "/courses/cloud-devops/aws-training-in-pune" },
      { name: "DevOps", href: "/courses/cloud-devops/devops-training-in-pune" },
      { name: "MERN Stack", href: "/courses/full-stack-development/mern-stack-training-in-pune" },
      { name: "Machine Learning", href: "/courses/data-ai/machine-learning-training-in-pune" },
      { name: "Data Science", href: "/courses/data-ai/data-science-training-in-pune" },
      { name: "View All Courses", href: "/courses" },
    ],
  },

};

export type SiteConfig = typeof siteConfig;

/**
 * Google Business Profile rating, as last VERIFIED by a human looking at the
 * profile — not a number anyone typed from memory.
 *
 * Why this is a constant with a date attached rather than a literal buried in
 * json-ld.tsx: it was hardcoded as `ratingCount: 126` with the source noted
 * only in a comment, and by 2026-08-09 that observation was two months old
 * with no way to tell from the code that it had gone stale. A third-party
 * assessment then reported the live profile showing a very different number,
 * and nothing in the repo could confirm or refute it.
 *
 * HOW TO RE-VERIFY (30 seconds, and it must be a human — the Places API is
 * not enabled on this project and Google blocks the scraper in
 * review_velocity.py):
 *   1. Open siteConfig.googleMaps.url in a normal browser window
 *   2. Read the rating and the review count next to it
 *   3. Update both fields below AND `verifiedOn`
 *   4. Record it in the tracker so velocity keeps working:
 *        python3 ~/.config/claude-seo/review_velocity.py --update 'google:<count>,<rating>'
 *
 * 2026-08-09 — CORRECTED. Read directly off the live profile via its CID
 * (maps.google.com/?cid=6025358486108162616): 4.9 stars, 24 reviews. The
 * published figures were 5.0 / 126 — a rating count 5.25x the real one,
 * emitted site-wide in Organization schema for roughly two months. The 126
 * appears to have been a manual entry that was never checked against the
 * profile.
 *
 * Note the name-search trap: the plain Maps place URL in siteConfig
 * redirects to a bare coordinate with no business attached. Always audit
 * against the CID.
 *
 * NEVER raise these numbers without looking. An AggregateRating that
 * overstates the real count is a structured-data policy violation, and the
 * downside is a manual action against the whole domain rather than the loss
 * of one snippet.
 */
export const googleReviews = {
  ratingValue: 4.9,
  ratingCount: 24,
  /** Date a human last read these off the live profile. */
  verifiedOn: "2026-08-09",
} as const;

/**
 * Minimum number of course-matched testimonials required before a Course
 * schema may carry its own aggregateRating.
 *
 * At the previous threshold of 1, six course pages were emitting a flawless
 * `ratingValue: 5, ratingCount: 1`. That is not a rating, it is a single
 * opinion wearing a rating's clothes, and it is the shape Google's
 * review-snippet guidance treats as manufactured. Withholding the rating
 * until there is a real distribution behind it costs one rich-result
 * decoration and removes a domain-level risk.
 */
export const MIN_COURSE_RATINGS_FOR_SCHEMA = 5;
