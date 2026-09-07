/**
 * Emit a course syllabus Markdown file from the page's own rich content.
 *
 * The gated syllabus PDF must never say anything the HTML page does not — the
 * page is the canonical, indexable copy and the PDF is a post-click
 * convenience (see the `syllabusDownload` note in course-content/types.ts).
 * Generating the Markdown from `courseRichContent` rather than authoring it
 * separately is what makes that guarantee hold: the two cannot drift, because
 * there is only one source.
 *
 * Output is the nested convention `build-syllabus-pdf.py` reads:
 * one `#` title, `##` sections, `###` sub-sections, `-` bullets.
 *
 * Usage
 * -----
 *     npx tsx scripts/build-syllabus-markdown.ts <course-slug> <out.md>
 */

import { writeFileSync } from "node:fs";
import { courses } from "../src/data/courses";
import { getCourseRichContent } from "../src/data/course-content/index";
import { bootcamps } from "../src/data/bootcamps";

/**
 * The PDF is drawn with the standard Helvetica faces, which carry WinAnsi
 * only. A rupee sign or an arrow silently becomes a black box there, so they
 * are folded to ASCII on the way out rather than left to fail in print.
 */
function toWinAnsi(text: string): string {
  return text
    .replace(/₹/g, "Rs. ")
    .replace(/→/g, "->")
    .replace(/←/g, "<-")
    .replace(/↔/g, "<->")
    .replace(/≥/g, ">=")
    .replace(/≤/g, "<=")
    .replace(/×/g, "x")
    .replace(/✓|✔/g, "Yes")
    .replace(/✗|✘/g, "No");
}

const out: string[] = [];
const push = (s = "") => out.push(toWinAnsi(s));
const para = (s: string) => {
  // Descriptions embed blank-line paragraph breaks; keep them as real breaks
  // so the PDF renders separate paragraphs rather than one wall of text.
  for (const part of s.split(/\n{2,}/)) {
    push(part.trim());
    push();
  }
};
const bullets = (items: string[]) => {
  for (const i of items) push(`- ${i}`);
  push();
};

function emitBootcamp(
  b: (typeof bootcamps)[number],
  outPath: string,
): void {
  push(`# ${b.name} — ${b.tagline}`);
  push();
  push("Institute: Archer Infotech, Kothrud, Pune - IT training since 2009");
  push("Website: https://archerinfotech.in");
  push("Contact: +91 9850 678451 | info@archerinfotech.in");
  push(`Programme page: https://archerinfotech.in/bootcamps/${b.slug}`);
  push();

  push("## Programme Overview");
  push();
  para(b.subtitle);
  para(b.hook);
  para(b.description);

  push("## Programme Details");
  push();
  bullets(b.details.map((d) => `${d.label}: ${d.value}`));

  push("## Who This Is For");
  push();
  bullets(b.targetAudience);

  if (b.notForYou?.length) {
    push("## When This Programme Is The Wrong Choice");
    push();
    bullets(b.notForYou);
  }

  push("## Why Join");
  push();
  b.whyJoin.forEach((w) => {
    push(`### ${w.title}`);
    push();
    para(w.description);
  });

  if (b.tracks?.length) {
    push("## Curriculum");
    push();
    b.tracks.forEach((t) => {
      push(`### ${t.name}`);
      push();
      para(t.subtitle);
      t.modules.forEach((m) => {
        push(`#### ${m.title}`);
        push();
        para(m.description);
        if (m.intro) para(m.intro);
        if (m.topics?.length) {
          bullets(m.topics.map((x) => `${x.title} - ${x.description}`));
        }
        if (m.outcome) para(`Outcome: ${m.outcome}`);
      });
      if (t.skills?.length) {
        push("Roles this track leads to:");
        push();
        bullets(t.skills);
      }
    });
  }

  if (b.programs?.length) {
    push("## Programmes");
    push();
    b.programs.forEach((pr) => {
      push(`### ${pr.name}`);
      push();
      para(pr.subtitle);
      para(pr.description);
      bullets(
        pr.phases.map((ph) => `${ph.name} (${ph.duration}): ${ph.topics.join(", ")}`),
      );
      push("Career roles:");
      push();
      bullets(pr.careerRoles);
    });
  }

  if (b.projects?.length) {
    push("## Projects You Finish With");
    push();
    b.projects.forEach((pr) => {
      push(`### ${pr.title}`);
      push();
      para(pr.description);
      bullets(pr.technologies.map((t) => `Technology: ${t}`));
    });
  }

  push("## Included With Every Track");
  push();
  bullets(b.commonModules.map((m) => `${m.title} - ${m.description}`));

  if (b.toolsAndTech?.groups?.length) {
    push("## Tools and Technologies");
    push();
    if (b.toolsAndTech.intro) para(b.toolsAndTech.intro);
    b.toolsAndTech.groups.forEach((g) => {
      push(`### ${g.label}`);
      push();
      bullets(g.items);
    });
  }

  if (b.careerOutcomes) {
    push("## Career Outcomes");
    push();
    if (b.careerOutcomes.intro) para(b.careerOutcomes.intro);
    push("### Immediate benefits");
    push();
    bullets(b.careerOutcomes.immediateBenefits);
    push("### Longer-term paths");
    push();
    bullets(b.careerOutcomes.longTermPaths);
    if (b.careerOutcomes.localContext) {
      push(`### ${b.careerOutcomes.localContext.headline}`);
      push();
      para(b.careerOutcomes.localContext.body);
    }
  }

  if (b.careerOutcomes?.salaryBands?.length) {
    push("### Indicative Pune salary bands");
    push();
    bullets(
      b.careerOutcomes.salaryBands.map(
        (sb) => `${sb.role} - ${sb.band} (source: ${sb.source.label})`,
      ),
    );
  }
  if (b.careerOutcomes?.hiringCompanies?.length) {
    push("### Companies hiring for these skills in Pune");
    push();
    bullets(b.careerOutcomes.hiringCompanies);
  }

  if (b.fees) {
    push("## Fees");
    push();
    para(b.fees.note);
    if (b.fees.range) {
      push(b.fees.range);
      push();
    }
    if (b.fees.paymentOptions?.length) bullets(b.fees.paymentOptions);
  }

  if (b.placementSupport) {
    push("## Placement Support");
    push();
    b.placementSupport.paragraphs.forEach(para);
    push("### The process");
    push();
    bullets(b.placementSupport.process);
    push("### Partner companies");
    push();
    bullets(b.placementSupport.partnerCompanies);
  }

  if (b.versusAlternative) {
    push(`## ${b.versusAlternative.heading}`);
    push();
    b.versusAlternative.paragraphs.forEach(para);
  }

  if (b.prerequisitesAndStart) {
    push("## Prerequisites and How to Begin");
    push();
    b.prerequisitesAndStart.paragraphs.forEach(para);
    push("### Suggested first steps");
    push();
    bullets(b.prerequisitesAndStart.suggestedSteps);
  }

  if (b.comparison?.rows?.length) {
    push("## How We Compare");
    push();
    if (b.comparison.intro) para(b.comparison.intro);
    bullets(
      b.comparison.rows.map(
        (r) =>
          `${b.comparison?.usLabel ?? "Archer Infotech"}: ${r.us} | ${b.comparison?.othersLabel ?? "Typical institute"}: ${r.others}`,
      ),
    );
  }

  push("## Frequently Asked Questions");
  push();
  b.faqs.forEach((f) => {
    push(`### ${f.question}`);
    push();
    para(f.answer);
  });

  push("## Next Step");
  push();
  push(b.closingCTA.headline);
  push();
  para(b.closingCTA.body);

  writeFileSync(outPath, out.join("\n").replace(/\n{3,}/g, "\n\n") + "\n");
  const words = out.join(" ").split(/\s+/).filter(Boolean).length;
  console.log(`${outPath}  bootcamp, ~${words} words`);
}

function main() {
  const [slug, outPath] = process.argv.slice(2);
  if (!slug || !outPath) {
    throw new Error("usage: build-syllabus-markdown.ts <course-slug> <out.md>");
  }

  // Bootcamps carry their own shape (tracks, programs, phases) rather than
  // CourseRichContent, so they take a separate branch. Same output contract:
  // the PDF may only ever say what the page already says.
  const bootcamp = bootcamps.find((b) => b.slug === slug);
  if (bootcamp) return emitBootcamp(bootcamp, outPath);

  const course = courses.find((c) => c.slug === slug);
  if (!course) throw new Error(`no course with slug ${slug}`);
  const rich = getCourseRichContent(slug);
  if (!rich) throw new Error(`no rich content for ${slug}`);

  push(`# ${course.title} Syllabus`);
  push();
  push(`Institute: Archer Infotech, Kothrud, Pune - IT training since 2009`);
  push(`Website: https://archerinfotech.in`);
  push(`Contact: +91 9850 678451 | info@archerinfotech.in`);
  push(`Mode: Classroom at Kothrud, Pune and live-online batches`);
  push(`Duration: ${course.duration}`);
  if (course.level) push(`Level: ${course.level}`);
  push(
    `Course page: https://archerinfotech.in/courses/${course.categorySlug}/${course.slug}`,
  );
  push();

  push("## Course Overview");
  push();
  para(rich.intro);

  push(`## ${rich.whyLearn.heading}`);
  push();
  rich.whyLearn.paragraphs.forEach(para);
  if (rich.whyLearn.keyPoints?.length) bullets(rich.whyLearn.keyPoints);

  push("## Who This Course Is For");
  push();
  push("### This course fits you if");
  push();
  bullets(rich.whoIsThisFor.forYou);
  push("### This course is not the right fit if");
  push();
  bullets(rich.whoIsThisFor.notForYou);

  push("## Detailed Curriculum");
  push();
  rich.curriculum.forEach((m, i) => {
    const week = m.weekRange ? ` (${m.weekRange})` : "";
    push(`### Module ${i + 1}: ${m.title}${week}`);
    push();
    para(m.description);
    bullets(m.topics);
  });

  push("## Capstone Projects");
  push();
  rich.projects.forEach((p) => {
    push(`### ${p.title}`);
    push();
    para(p.description);
    bullets(p.technologies.map((t) => `Technology: ${t}`));
  });

  push("## Career Outcomes");
  push();
  rich.careerOutcomes.paragraphs.forEach(para);
  push("### Roles after this course");
  push();
  bullets(rich.careerOutcomes.rolesAfterCourse);
  push("### Indicative salary bands");
  push();
  bullets(
    rich.careerOutcomes.salaryBands.map(
      (b) => `${b.role} - ${b.band} (source: ${b.source.label})`,
    ),
  );
  push("### Companies hiring for these skills");
  push();
  bullets(rich.careerOutcomes.hiringCompanies);

  push("## Batch Modes and Duration");
  push();
  push(`Duration: ${rich.modesAndDuration.duration}`);
  push();
  push("### Classroom");
  push();
  bullets([
    `Location: ${rich.modesAndDuration.classroom.location}`,
    ...rich.modesAndDuration.classroom.timing,
  ]);
  push("### Live online");
  push();
  bullets([
    ...rich.modesAndDuration.online.timing,
    ...(rich.modesAndDuration.online.tools ?? []),
  ]);
  if (rich.modesAndDuration.weekend) {
    push("### Weekend");
    push();
    bullets([
      ...rich.modesAndDuration.weekend.timing,
      ...(rich.modesAndDuration.weekend.durationNote
        ? [rich.modesAndDuration.weekend.durationNote]
        : []),
    ]);
  }
  if (rich.modesAndDuration.batchPolicy) para(rich.modesAndDuration.batchPolicy);

  push("## Fees");
  push();
  para(rich.fees.note);
  if (rich.fees.range) {
    push(`Indicative range: ${rich.fees.range}`);
    push();
  }
  if (rich.fees.paymentOptions?.length) bullets(rich.fees.paymentOptions);

  push("## Placement Support");
  push();
  rich.placementSupport.paragraphs.forEach(para);
  push("### The placement process");
  push();
  bullets(rich.placementSupport.process);
  push("### Partner companies");
  push();
  bullets(rich.placementSupport.partnerCompanies);

  push("## Prerequisites and How to Start");
  push();
  rich.prerequisitesAndStart.paragraphs.forEach(para);
  push("### Suggested first steps");
  push();
  bullets(rich.prerequisitesAndStart.suggestedSteps);

  push("## Frequently Asked Questions");
  push();
  rich.faqs.forEach((f) => {
    push(`### ${f.question}`);
    push();
    para(f.answer);
  });

  writeFileSync(outPath, out.join("\n").replace(/\n{3,}/g, "\n\n") + "\n");
  const words = out.join(" ").split(/\s+/).filter(Boolean).length;
  console.log(`${outPath}  ${rich.curriculum.length} modules, ~${words} words`);
}

main();
