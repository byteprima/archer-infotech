#!/usr/bin/env node
/**
 * Seed the GBP review mirror from a hand-transcribed JSON file.
 *
 * WHY THIS EXISTS: the automated sync needs Business Profile API access,
 * which Google approves on its own schedule. This gets the real reviews
 * onto the site in the meantime. When API access lands, the nightly sync
 * upserts on `review_id` and takes over these rows in place — nothing has
 * to be deleted or migrated.
 *
 * NOTHING HERE IS GENERATED. Every field must be transcribed from the
 * live profile by a person. Inventing review text would be fabricating
 * testimonials, which is the precise thing the site tells visitors it does
 * not do — and it would be indistinguishable, to a reader, from the
 * inflated review count this whole exercise exists to correct.
 *
 * USAGE
 *   1. Open the Business Profile:
 *        https://g.page/r/CTjK3JCeX55TEBM
 *   2. Copy each review into scripts/data/google-reviews.json (see the
 *      shape below; a template is written on first run).
 *   3. node scripts/import-google-reviews.mjs
 *      Add --dry-run to validate the file without writing.
 *
 * SHAPE (array of objects):
 *   {
 *     "reviewId":   "manual-001",       // any stable unique string; keep it
 *                                       //   stable so re-runs update rather
 *                                       //   than duplicate
 *     "reviewerName": "Priya S.",
 *     "starRating": 5,                  // integer 1-5
 *     "comment":    "...",              // verbatim; null if rating-only
 *     "replyComment": null,             // our public reply, if any
 *     "createTime": "2026-04-12"        // date on the review; YYYY-MM-DD
 *   }
 *
 * Rating-only entries (no text) still belong in the file — they count
 * toward the profile total even though the wall won't render them.
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import Database from "better-sqlite3";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_FILE = join(__dirname, "data", "google-reviews.json");
const DB_PATH = process.env.DATABASE_URL || join(__dirname, "..", "sqlite.db");
const DRY_RUN = process.argv.includes("--dry-run");

const TEMPLATE = [
  {
    reviewId: "manual-001",
    reviewerName: "REPLACE — reviewer's name exactly as shown on Google",
    starRating: 5,
    comment: "REPLACE — the review text, copied verbatim. Do not paraphrase.",
    replyComment: null,
    createTime: "2026-01-01",
  },
];

function fail(msg) {
  console.error(`\n  ✗ ${msg}\n`);
  process.exit(1);
}

if (!existsSync(DATA_FILE)) {
  mkdirSync(dirname(DATA_FILE), { recursive: true });
  writeFileSync(DATA_FILE, JSON.stringify(TEMPLATE, null, 2) + "\n");
  console.log(`
  Created a template at:
    ${DATA_FILE}

  Fill it in from https://g.page/r/CTjK3JCeX55TEBM — one entry per review,
  text copied verbatim — then run this again.
`);
  process.exit(0);
}

let rows;
try {
  rows = JSON.parse(readFileSync(DATA_FILE, "utf-8"));
} catch (err) {
  fail(`${DATA_FILE} is not valid JSON: ${err.message}`);
}
if (!Array.isArray(rows)) fail("Expected the file to contain a JSON array.");
if (rows.length === 0) fail("No reviews in the file.");

// Refuse to import the template. A placeholder reaching the live site
// would be a fabricated testimonial, which is worse than an empty wall.
const placeholders = rows.filter((r) =>
  [r.reviewerName, r.comment].some(
    (v) => typeof v === "string" && v.startsWith("REPLACE"),
  ),
);
if (placeholders.length > 0) {
  fail(
    `${placeholders.length} entr${placeholders.length === 1 ? "y is" : "ies are"} still template placeholder text. Fill in the real reviews before importing.`,
  );
}

const seen = new Set();
rows.forEach((r, i) => {
  const at = `entry ${i + 1}`;
  if (!r.reviewId || typeof r.reviewId !== "string")
    fail(`${at}: reviewId is required and must be a string.`);
  if (seen.has(r.reviewId)) fail(`${at}: duplicate reviewId "${r.reviewId}".`);
  seen.add(r.reviewId);
  if (!Number.isInteger(r.starRating) || r.starRating < 1 || r.starRating > 5)
    fail(`${at}: starRating must be an integer from 1 to 5.`);
  if (r.createTime && Number.isNaN(Date.parse(r.createTime)))
    fail(`${at}: createTime "${r.createTime}" is not a parseable date.`);
});

const avg = rows.reduce((s, r) => s + r.starRating, 0) / rows.length;
console.log(`
  Parsed ${rows.length} review(s) — average ${avg.toFixed(2)}, ${rows.filter((r) => r.comment).length} with text.
  Database: ${DB_PATH}${DRY_RUN ? "\n  DRY RUN — nothing will be written." : ""}
`);
if (DRY_RUN) process.exit(0);

if (!existsSync(DB_PATH))
  fail(`No database at ${DB_PATH}. Run \`npm run db:push\` first.`);

const db = new Database(DB_PATH);

const upsert = db.prepare(`
  INSERT INTO gbp_reviews
    (review_id, reviewer_name, reviewer_photo_url, star_rating, comment,
     reply_comment, reply_updated_at, create_time, update_time, is_hidden, synced_at)
  VALUES
    (@reviewId, @reviewerName, NULL, @starRating, @comment,
     @replyComment, NULL, @createTime, @createTime, 0, @now)
  ON CONFLICT(review_id) DO UPDATE SET
    reviewer_name = excluded.reviewer_name,
    star_rating   = excluded.star_rating,
    comment       = excluded.comment,
    reply_comment = excluded.reply_comment,
    create_time   = excluded.create_time,
    synced_at     = excluded.synced_at
`);

const now = Date.now();
const tx = db.transaction((items) => {
  for (const r of items) {
    upsert.run({
      reviewId: r.reviewId,
      reviewerName: r.reviewerName ?? null,
      starRating: r.starRating,
      comment: r.comment ?? null,
      replyComment: r.replyComment ?? null,
      createTime: r.createTime ? Date.parse(r.createTime) : null,
      now,
    });
  }
});
tx(rows);

// NOTE: lastSuccessAt is deliberately left NULL.
//
// That field means "the automated sync ran and succeeded", and it drives
// the staleness guard in lib/reviews/rating.ts. A manual import is not a
// sync. Setting it here would make the resolver treat hand-entered data as
// a live feed and start its 30-day freshness clock against a mirror that
// nothing is refreshing. Until the API sync runs, the rating comes from
// the dated constant in site-config, which is exactly right: a human
// established it, and the code says so.
db.prepare(
  `INSERT INTO gbp_sync_state (id, total_review_count, average_rating, last_attempt_at, last_error, last_synced_count)
   VALUES (1, NULL, NULL, @now, 'manual import — API sync not yet connected', @n)
   ON CONFLICT(id) DO UPDATE SET
     last_attempt_at  = excluded.last_attempt_at,
     last_error       = excluded.last_error,
     last_synced_count = excluded.last_synced_count`,
).run({ now, n: rows.length });

const count = db.prepare("SELECT count(*) AS n FROM gbp_reviews").get();
console.log(`  ✓ Imported. gbp_reviews now holds ${count.n} row(s).

  The published rating still comes from site-config googleReviews — a
  manual import does not set lastSuccessAt, so nothing here is mistaken
  for a live feed.
`);
db.close();
