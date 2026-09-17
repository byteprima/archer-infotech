#!/usr/bin/env node
/**
 * Warn when a "last reviewed" constant has drifted behind the data file it
 * describes.
 *
 * `src/lib/seo/content-dates.ts` feeds `lastmod` in the sitemap and the
 * visible "last updated" dates. The constants are hand-bumped on purpose —
 * `new Date()` at build time would claim every page changed on every deploy,
 * which is worse than a stale date. The failure mode of hand-bumping is the
 * opposite one: real content ships and nobody touches the constant, so the
 * site quietly under-reports its own freshness.
 *
 * Every constant here was between one and three months behind reality when
 * this check was written. It compares each against the last commit touching
 * the files it governs.
 *
 * Advisory by design: exits 0 and prints. Content review is a judgement — a
 * data file can change without the content meaningfully changing — so this
 * reports drift for a human to act on rather than blocking a build.
 *
 *   node scripts/check-content-dates.mjs
 */
import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";

/** Which data files each constant is meant to describe. */
const GOVERNS = {
  COURSE_LAST_REVIEWED: ["src/data/courses.ts"],
  BOOTCAMP_LAST_REVIEWED: ["src/data/bootcamps.ts"],
  LOCATIONS_LAST_REVIEWED: ["src/data/locations.ts", "src/data/course-locations.ts"],
  NEW_ASSETS_LAST_REVIEWED: ["src/data/student-cities.ts"],
};

const src = readFileSync("src/lib/seo/content-dates.ts", "utf8");

function lastCommit(file) {
  try {
    const out = execSync(`git log -1 --format=%cs -- ${file}`, {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    return out || null;
  } catch {
    return null;
  }
}

let drifted = 0;
console.log("constant                      declared     newest content   drift");
console.log("-".repeat(72));

for (const [name, files] of Object.entries(GOVERNS)) {
  const m = new RegExp(`${name}\\s*=\\s*"(\\d{4}-\\d{2}-\\d{2})"`).exec(src);
  if (!m) {
    console.log(`${name.padEnd(30)} NOT FOUND in content-dates.ts`);
    continue;
  }
  const declared = m[1];
  const newest = files.map(lastCommit).filter(Boolean).sort().pop();
  if (!newest) {
    console.log(`${name.padEnd(30)} ${declared}   (no git history)`);
    continue;
  }
  const days = Math.round(
    (Date.parse(newest) - Date.parse(declared)) / 86_400_000,
  );
  const flag = days > 14 ? `  <-- ${days} days behind` : "";
  if (days > 14) drifted++;
  console.log(`${name.padEnd(30)} ${declared}   ${newest}       ${days > 0 ? `+${days}d` : "ok"}${flag}`);
}

console.log();
console.log(
  drifted === 0
    ? "No significant drift."
    : `${drifted} constant(s) behind their content by more than a fortnight. ` +
      "Bump them if the content genuinely changed; leave them if the edits were cosmetic.",
);
