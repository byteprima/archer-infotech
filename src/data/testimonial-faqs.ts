import type { FaqItem } from "@/components/seo/faq-section";

/**
 * FAQ items for the flagship /testimonials trust page (P7-26).
 *
 * Authored to answer the high-intent credibility questions a prospective
 * learner asks before paying — "are the reviews real?", "how do I
 * verify?", "can I leave a review?", "do you cherry-pick?". These get
 * lifted into AI-engine answers when someone searches "is Archer
 * Infotech legit / authentic / good", and they show up as a FAQPage
 * block in the SERP. Tone is direct and citation-friendly: every
 * number is sourced or qualified, no marketing fluff.
 */
export const testimonialsFaqs: FaqItem[] = [
  {
    question: "Are the testimonials on this page real?",
    answer:
      "Yes. Every testimonial is from a former Archer Infotech student who completed a paid course and either gave us permission to publish their feedback or left a public review on Google, JustDial, or Sulekha that we then re-published with attribution. Names, courses and placement companies are accurate and verifiable — many include LinkedIn profile links so you can cross-check the person directly.",
  },
  {
    question: "How can I verify Archer Infotech's reviews independently?",
    answer:
      "Search 'Archer Infotech Kothrud' on Google Maps — the Business Profile shows 126+ reviews with a 5.0-star aggregate as of 2026-06-10. The Google review feed is the canonical source: we don't moderate, edit or hide anything there. JustDial and Sulekha listings carry independent rating histories going back several years. All three are linked from this page.",
  },
  {
    question: "What's Archer Infotech's overall rating across review platforms?",
    answer:
      "5.0 / 5 across 126+ verified Google reviews (Google Business Profile, Archer Infotech Kothrud, accessed 2026-06-10). Independent listings on JustDial and Sulekha show similar consistently-high ratings. We don't run review-incentive schemes, paid review campaigns, or third-party reputation buying — every review is from a real student of their own accord.",
  },
  {
    question: "Do you publish every testimonial, or only positive ones?",
    answer:
      "We publish positive feedback that students give us explicit permission to use on this page and on our placement page. We don't fabricate, edit content for promotional effect, or hide negative reviews on third-party platforms — Google, JustDial and Sulekha all show the full unfiltered review history. If you want a complete picture, Google is the most comprehensive single source.",
  },
  {
    question: "Can I leave a review of my Archer Infotech experience?",
    answer:
      "Yes — current and former students can leave a Google review at archerinfotech.in/review (one-tap link to the Google review dialog). We also accept feedback via email at info@archerinfotech.in and via JustDial / Sulekha if those platforms are easier for you. Honest reviews — including critical ones — help us improve.",
  },
  {
    question: "How long after a course can I leave a review?",
    answer:
      "Whenever you're ready. Many students review immediately after their final class or after their first job offer comes through; others wait six months or a year to share how the course is holding up in their actual day-to-day role. Both kinds of feedback are valuable — recent reviews capture the training experience, later ones capture career impact.",
  },
  {
    question:
      "Why do some testimonials mention older course names (e.g. just 'Java' instead of 'Java Full Stack')?",
    answer:
      "Course naming has evolved as the industry has shifted — what was a 'Java course' in 2018-19 is now sold as 'Java Full Stack Development' to match recruiter language. We keep the original phrasing in each testimonial so the student's voice is preserved exactly as they wrote it. The skill content matches whatever the current equivalent course covers.",
  },
  {
    question:
      "Do testimonials reflect every kind of student outcome, or only the top performers?",
    answer:
      "The testimonials surfaced on this page lean toward students who completed flagship tracks and got placed — that's a deliberate selection because trust-page real estate is most useful when it reflects the result a prospective learner is researching. The 90% placement rate disclosed on the placements page is for students who complete training and clear at least one mock interview — see /placements for full methodology and salary bands.",
  },
  {
    question: "Are placement companies and salary figures in testimonials accurate?",
    answer:
      "Yes — placement companies are taken directly from the offer letters or LinkedIn profiles students share with our placement team. Salary figures, when mentioned, are anonymised to bands (e.g. '₹4-6 LPA fresher band') unless the student explicitly opts to disclose an exact number. We don't inflate or round generously: every figure traces back to real placement-team records, last 12 months of offers.",
  },
  {
    question: "Why don't all testimonials have photos or LinkedIn profiles attached?",
    answer:
      "Some students prefer their feedback be published with name and course only — no photo, no professional link. That's a permission-based decision per testimonial, not a credibility issue. Where a student has shared their LinkedIn or GitHub, we include the link so you can verify the person and their post-Archer career trajectory independently.",
  },
];
