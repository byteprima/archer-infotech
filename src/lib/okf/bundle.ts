/**
 * OKF (Open Knowledge Format) bundle for Archer Infotech.
 *
 * OKF v0.1 (Google Cloud, 2026-06-12) represents knowledge as a directory of
 * Markdown files with YAML frontmatter, one concept per file, the file path
 * (minus `.md`) being the concept's identity. See:
 *   https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md
 *
 * This module is the SINGLE SOURCE that projects our existing canonical data
 * (site-config, courses, faqs) into OKF documents. Two consumers:
 *   1. `getChatContext()`  — a lean concatenation fed to the website chatbot's
 *      system prompt (grounding), used by /api/chat.
 *   2. `buildOkfDocs()` + `renderOkfDoc()` — the full bundle written to the
 *      `okf/` directory on disk by `scripts/generate-okf.mjs` (the published,
 *      portable OKF artifact).
 *
 * Canonical-fact discipline is enforced here so the bot can never drift:
 *   - 90% placement RATE — never "100% placement".
 *   - 10,000+ TRAINED vs 5,000+ PLACED are two distinct numbers, never conflated.
 *   - NAP exactly as in site-config (PIN 411038, phone +91 9850 678451).
 */

import { siteConfig } from "@/data/site-config";
import { courses, categories } from "@/data/courses";
import {
  homeFaqs,
  aboutFaqs,
  coursesFaqs,
  bootcampsFaqs,
  contactFaqs,
  trainersFaqs,
  internshipsFaqs,
  corporateTrainingFaqs,
  batchScheduleFaqs,
  placementsFaqs,
} from "@/data/faqs";

export interface OkfDoc {
  /** Concept identity = file path without the `.md` suffix (OKF spec). */
  id: string;
  /** The sole REQUIRED frontmatter field in OKF v0.1. */
  type: string;
  title: string;
  description?: string;
  tags?: string[];
  /** ISO 8601; set by the generator at build time. */
  timestamp?: string;
  /** Markdown body. */
  body: string;
}

type Faq = { question: string; answer: string };

const FAQ_SECTIONS: { id: string; title: string; items: Faq[] }[] = [
  { id: "home", title: "General / About Archer Infotech", items: homeFaqs },
  { id: "about", title: "Founder, Team & Trust", items: aboutFaqs },
  { id: "courses", title: "Choosing a Course", items: coursesFaqs },
  { id: "bootcamps", title: "Bootcamps", items: bootcampsFaqs },
  { id: "contact", title: "Visiting & Contact", items: contactFaqs },
  { id: "trainers", title: "Trainers", items: trainersFaqs },
  { id: "internships", title: "Internships", items: internshipsFaqs },
  { id: "corporate-training", title: "Corporate Training", items: corporateTrainingFaqs },
  { id: "batch-schedule", title: "Batch Schedule", items: batchScheduleFaqs },
  { id: "placements", title: "Placements", items: placementsFaqs },
];

function fullAddress(): string {
  const a = siteConfig.contact.address;
  return `${a.line1}, ${a.line2}, ${a.city}, ${a.state} - ${a.pincode}`;
}

function hours(): string {
  return siteConfig.openingHours
    .map((h) => `${h.days[0]}–${h.days[h.days.length - 1]}: ${h.opens}–${h.closes}`)
    .join("; ") + "; Sunday: Closed";
}

/* ------------------------------------------------------------------ *
 * Document builders (full bundle)
 * ------------------------------------------------------------------ */

function orgDoc(): OkfDoc {
  const s = siteConfig.stats;
  return {
    id: "org/archer-infotech",
    type: "Organization",
    title: siteConfig.name,
    description: siteConfig.description,
    tags: ["organization", "about", "nap"],
    body: [
      `# ${siteConfig.name}`,
      "",
      `${siteConfig.tagline}. ${siteConfig.description}`,
      "",
      `- **Founded:** ${siteConfig.foundingYear} (${s.yearsExperience} years)`,
      `- **Address:** ${fullAddress()}`,
      `- **Country:** ${siteConfig.contact.address.country}`,
      `- **Phone:** ${siteConfig.contact.phone}`,
      `- **WhatsApp:** https://wa.me/${siteConfig.contact.whatsapp.replace(/\D/g, "")}`,
      `- **Email:** ${siteConfig.contact.email}`,
      `- **Website:** ${siteConfig.url}`,
      `- **Hours:** ${hours()}`,
      "",
      "## Key numbers (use these exact figures — never inflate)",
      `- Students trained: **${s.studentsTrained}**`,
      `- Students placed: **${s.studentsPlaced}** (distinct from "trained" — never conflate the two)`,
      `- Placement rate: **${s.placementRate}** (this is the honest figure — NEVER say "100% placement")`,
      `- Corporate / hiring partners: **${s.corporatePartners}**`,
      `- Courses offered: **${s.courses}**`,
      `- Batches completed: **${s.batchesCompleted}**`,
      "",
      "## Social",
      ...Object.entries(siteConfig.social).map(([k, v]) => `- ${k}: ${v}`),
    ].join("\n"),
  };
}

function contactDoc(): OkfDoc {
  return {
    id: "contact/how-to-reach",
    type: "Reference",
    title: "How to reach Archer Infotech",
    description: "Phone, WhatsApp, email, address and visiting hours.",
    tags: ["contact", "nap", "directions"],
    body: [
      "# Contact & Visit",
      "",
      `- **Call:** ${siteConfig.contact.phone}`,
      `- **WhatsApp:** https://wa.me/${siteConfig.contact.whatsapp.replace(/\D/g, "")}`,
      `- **Email:** ${siteConfig.contact.email}`,
      `- **Address:** ${fullAddress()}`,
      `- **Hours:** ${hours()}`,
      "",
      "Walk-ins are welcome during working hours. For a free counselling call or demo session, share your name and phone number and a counsellor will call back.",
    ].join("\n"),
  };
}

function placementsDoc(): OkfDoc {
  const s = siteConfig.stats;
  return {
    id: "stats/placements",
    type: "Metric",
    title: "Placement performance",
    description: "Honest placement metrics and salary guidance.",
    tags: ["placements", "salary", "outcomes"],
    body: [
      "# Placements",
      "",
      `Archer Infotech provides **placement assistance** with a **${s.placementRate} placement rate**.`,
      `Over ${s.yearsExperience} years we have **trained ${s.studentsTrained}** students and **placed ${s.studentsPlaced}**.`,
      "",
      "Never describe placement as guaranteed or as \"100%\". We provide genuine placement assistance — interview preparation, resume building, mock interviews and hiring-partner referrals — and the outcome depends on the student's effort and market timing.",
      "",
      `Active corporate-training relationships include Amdocs, Capgemini, MindTree and Tech Mahindra. ${s.corporatePartners} hiring partners overall.`,
    ].join("\n"),
  };
}

function courseDoc(c: (typeof courses)[number]): OkfDoc {
  const lines: string[] = [
    `# ${c.title}`,
    "",
    c.description,
    "",
    `- **Category:** ${c.category}`,
    `- **Duration:** ${c.duration}`,
    `- **Level:** ${c.level}`,
    `- **Mode:** ${c.mode.join(" / ")}`,
    `- **Course page:** ${siteConfig.url}/courses/${c.categorySlug}/${c.slug}`,
  ];
  if (c.highlights?.length) {
    lines.push("", "## Highlights", ...c.highlights.map((h) => `- ${h}`));
  }
  if (c.modules?.length) {
    lines.push("", "## Modules", ...c.modules.map((m) => `- ${m.title}`));
  }
  if (c.prerequisites?.length) {
    lines.push("", "## Prerequisites", ...c.prerequisites.map((p) => `- ${p}`));
  }
  if (c.careerOpportunities?.length) {
    lines.push("", "## Career outcomes", ...c.careerOpportunities.map((o) => `- ${o}`));
  }
  if (c.faqs?.length) {
    lines.push("", "## FAQs", ...c.faqs.map((f) => `**Q: ${f.question}**\n${f.answer}`));
  }
  return {
    id: `courses/${c.slug}`,
    type: "Course",
    title: c.title,
    description: c.shortDescription,
    tags: ["course", c.categorySlug],
    body: lines.join("\n"),
  };
}

function faqDoc(section: { id: string; title: string; items: Faq[] }): OkfDoc {
  return {
    id: `faqs/${section.id}`,
    type: "FAQ",
    title: `FAQs — ${section.title}`,
    description: `Frequently asked questions about ${section.title.toLowerCase()}.`,
    tags: ["faq", section.id],
    body: [
      `# FAQs — ${section.title}`,
      "",
      ...section.items.map((f) => `**Q: ${f.question}**\n\n${f.answer}\n`),
    ].join("\n"),
  };
}

/** Build the complete OKF bundle (every concept = one doc). */
export function buildOkfDocs(timestamp?: string): OkfDoc[] {
  const docs: OkfDoc[] = [orgDoc(), contactDoc(), placementsDoc()];
  for (const c of courses) docs.push(courseDoc(c));
  for (const section of FAQ_SECTIONS) {
    if (section.items?.length) docs.push(faqDoc(section));
  }
  if (timestamp) for (const d of docs) d.timestamp = timestamp;
  return docs;
}

/* ------------------------------------------------------------------ *
 * Rendering (frontmatter + body)
 * ------------------------------------------------------------------ */

function yamlScalar(v: string): string {
  return JSON.stringify(v); // double-quoted JSON is valid YAML for scalars
}

/** Render one OKF doc to its on-disk Markdown form (YAML frontmatter + body). */
export function renderOkfDoc(doc: OkfDoc): string {
  const fm: string[] = ["---", `type: ${yamlScalar(doc.type)}`, `title: ${yamlScalar(doc.title)}`];
  if (doc.description) fm.push(`description: ${yamlScalar(doc.description)}`);
  if (doc.tags?.length) fm.push(`tags: [${doc.tags.map(yamlScalar).join(", ")}]`);
  if (doc.timestamp) fm.push(`timestamp: ${yamlScalar(doc.timestamp)}`);
  fm.push("---", "");
  return fm.join("\n") + doc.body + "\n";
}

/** Build the reserved OKF `index.md` (progressive-disclosure table of contents). */
export function renderIndex(docs: OkfDoc[], timestamp?: string): string {
  const byType = new Map<string, OkfDoc[]>();
  for (const d of docs) {
    const arr = byType.get(d.type) ?? [];
    arr.push(d);
    byType.set(d.type, arr);
  }
  const lines = ["---", "type: Index", `title: ${yamlScalar(`${siteConfig.name} — OKF bundle`)}`];
  if (timestamp) lines.push(`timestamp: ${yamlScalar(timestamp)}`);
  lines.push("---", "", `# ${siteConfig.name} knowledge bundle`, "");
  for (const [type, arr] of byType) {
    lines.push(`## ${type}`);
    for (const d of arr) lines.push(`- [${d.title}](${d.id}.md) — \`${d.id}\``);
    lines.push("");
  }
  return lines.join("\n");
}

/* ------------------------------------------------------------------ *
 * Lean context for the chatbot system prompt
 * ------------------------------------------------------------------ */

/**
 * A compact projection of the bundle for grounding the chatbot. Kept lean
 * (org + contact + placements + a one-block-per-course catalog + all FAQs)
 * to control per-message token cost while still answering the vast majority
 * of prospective-student questions.
 */
export function getChatContext(): string {
  const blocks: string[] = [
    orgDoc().body,
    contactDoc().body,
    placementsDoc().body,
    "# Course catalogue",
  ];

  for (const c of courses) {
    const careers = (c.careerOpportunities ?? []).slice(0, 3).join(", ");
    blocks.push(
      [
        `## ${c.title} (${c.category})`,
        `${c.shortDescription}`,
        `Duration ${c.duration} · ${c.level} · ${c.mode.join("/")} · Page: ${siteConfig.url}/courses/${c.categorySlug}/${c.slug}`,
        careers ? `Careers: ${careers}.` : "",
      ]
        .filter(Boolean)
        .join("\n"),
    );
  }

  blocks.push("# Frequently asked questions");
  for (const section of FAQ_SECTIONS) {
    if (!section.items?.length) continue;
    blocks.push(`## ${section.title}`);
    for (const f of section.items) blocks.push(`Q: ${f.question}\nA: ${f.answer}`);
  }

  return blocks.join("\n\n");
}

/** Category list, handy for the bot to orient a confused visitor. */
export function getCategorySummary(): string {
  return categories.map((c) => `- ${c.name}: ${c.description}`).join("\n");
}
