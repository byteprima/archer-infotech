# Course schema standard

The rules for `Course` structured data on archerinfotech.in, and for the
review and rating data that feeds it.

Written after Search Console reported 22 review-snippet errors
("Multiple reviews without aggregateRating object") and the investigation
found three separate problems underneath: a gating asymmetry, an identifier
keyed on a value that moves, and several properties carrying the wrong kind
of value. Each rule below exists because something broke.

Emitter: `src/components/seo/json-ld.tsx` (`CourseJsonLd`).
Call site: `src/app/courses/[category]/[slug]/page.tsx`.

---

## 1. The identifier rule

> **Anything that points at a course stores the SLUG, never the title.**

Titles are SEO surface. They get rewritten — and when "Java Full Stack"
became "Java Full Stack Development", eight of ten testimonials stopped
matching any course, every course review snippet on the site went dark, and
nobody noticed for weeks because nothing errored.

| Purpose | Field | Example |
|---|---|---|
| Machine identifier | `courseSlug` | `java-full-stack-training-in-pune` |
| Human label | `courseTaken` | `Java Full Stack` |

`courseTaken` stays exactly as the student wrote it — it is rendered verbatim
in "student of X" lines and image alt text, so it must read naturally.
`courseSlug` is derived at write time with `resolveCourseSlugs()` and is the
only thing matching ever looks at.

This already applies to leads, batches, demo sessions and admissions. It now
applies to testimonials too.

## 2. The review invariant

> **A Course emits `review` and `aggregateRating` together, or neither.**

| Matched testimonials | Emits |
|---|---|
| 0 | nothing |
| 1–4 | **nothing** |
| 5+ (`MIN_COURSE_RATINGS_FOR_SCHEMA`) | `aggregateRating` + up to 5 `review` |

Google errors when two or more `Review` objects appear with no aggregate. The
old code gated the rating at five but emitted reviews unconditionally, so any
course with 2–4 testimonials produced exactly that. Tying both to one gate
removes the error class rather than the symptom.

A single review with no aggregate is technically valid. We still emit nothing,
for two reasons: Google rarely renders stars without an aggregate, so there is
no prize to win; and under the JSON-LD hydration duplication documented at
`json-ld.tsx:182`, one review can present as two — which is the error again.

**Below the threshold the testimonials are still SHOWN.** Only the markup is
withheld. Readers lose nothing.

### Why five

`site-config.ts` calls a `ratingValue: 5, ratingCount: 1` *"a single opinion
wearing a rating's clothes"*. That judgement stands. It is stricter than
Google requires and it is the right call for a site that also publishes
placement statistics — credibility is the asset.

> **Current reality:** ten published testimonials spread across ten different
> courses, so every course sits at one and **no course emits review markup at
> all**. The plumbing is correct and the errors are gone, but course-level
> star ratings stay dark until roughly five testimonials exist per course.
> That is a content-collection problem, not a code problem. Do not "fix" it by
> lowering the threshold.

## 3. Where ratings are allowed at all

| Entity | Own reviews / rating |
|---|---|
| `Course` | **Yes** — not an Organization subtype |
| `Organization`, `LocalBusiness` | **No** — self-serving, ineligible |
| `Product`, `Event`, `Recipe`, `Book` | Yes |

The Organization rating was removed on 2026-08-13 for exactly this reason and
must not come back. The 4.9★/24-review figure lives in **prose** on `/`,
`/about`, `/about/facts` and as `Review` objects on `/testimonials`.

Never let the organisation rating stand in for a course rating. They measure
different things.

## 4. Property-by-property

### Required

| Property | Rule |
|---|---|
| `name` | The course title. |
| `description` | Real prose, not keywords. |
| `provider` | `{ "@id": ORG_ID }` — a reference, never a re-declared partial Organization. Re-declaring it was the dominant validator error across 54 pages. |

### Duration — both must be ISO 8601

| Property | Rule |
|---|---|
| `timeRequired` | `durationToISO8601(duration)`. **Not** the catalogue string. This emitted `"4 Months"` until 2026-09-17; `timeRequired` is a `Duration` and free text is invalid. |
| `hasCourseInstance.courseWorkload` | Same helper, same reason. |

### Identity and subject

| Property | Rule |
|---|---|
| `about` | The category ("Data & AI"). |
| `courseCode` | **Only** a real provider-issued code ("CS101"). Do not put the category here — that was the previous behaviour and it is a different claim. Omit when none exists. |
| `url`, `inLanguage` | Canonical URL; `"en"`. |

### Offers

| Property | Rule |
|---|---|
| `offers.category` | `"Paid"`. |
| `offers.availability` | `https://schema.org/InStock`. |
| `offers.price` / `priceCurrency` | **Both or neither.** No course publishes a price (0 of 65), so both are omitted. A `priceCurrency` with no `price` tells a parser a figure exists and withholds it. |

If prices are ever published, emit both together and make them visible.

### Instance

`hasCourseInstance` carries `courseMode`, `courseWorkload`, `instructor`,
`location`, and `startDate` when a real batch is scheduled. Never invent a
`startDate`.

### Recommended, emitted when the data exists

`teaches` (visible highlights) · `educationalLevel` · `coursePrerequisites`
(visible prerequisites) · `syllabusSections` (the visible curriculum) ·
`educationalCredentialAwarded` (from `course.certifications`, 9 of 65) ·
`citation` (the same sources shown by `SourceCitations`) · `reviewedBy` ·
`dateModified`.

**Every one of these mirrors something visibly on the page.** A page that
shows a reader one thing and a crawler another is worse than one that shows
neither.

### Never

- A rating, review, credential or start date the page cannot evidence.
- An empty array to mean "none" — omit the property. `educationalCredentialAwarded: []` asserts *no credential*, which differs from *not recorded*.
- `dateModified` from `new Date()` at build time. Use `content-dates.ts`, and run `npm run check:content-dates` — those constants drift.

---

## 5. Changing a course title

Because of rule 1, this is now safe. But check:

1. `npm run check:content-dates` — bump the reviewed date if content changed.
2. Nothing in the codebase matches courses by title. `getCourseTestimonials`
   still takes a title as a transitional fallback for rows predating
   migration 0012; once `courseSlug` is enforced on every write, delete it.

## 6. Verifying a change

```bash
npx tsc --noEmit && npm test && npm run build
curl -s https://archerinfotech.in/courses/<cat>/<slug> \
  | python3 -c "import sys,json,re; [print(json.dumps(json.loads(m.group(1)),indent=2)) \
    for m in re.finditer(r'<script type=\"application/ld\+json\">(.*?)</script>', sys.stdin.read(), re.S) \
    if '\"Course\"' in m.group(1)]"
```

Then URL Inspection in Search Console — and read the **last crawl date**. The
22 errors that prompted this document described a crawl from two weeks
earlier; the markup causing them no longer existed. Always check whether you
are looking at the present.
