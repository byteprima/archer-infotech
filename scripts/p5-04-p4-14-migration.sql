-- archerinfotech.in blog DB migration — 2026-06-04
-- P5-04: self-host Unsplash featured images (swap remote URLs → local /images/blog/<id>.jpg)
-- P4-14: insert 2 new 'how-long-to-learn-X' blog drafts
-- Run via: sqlite3 /data/coolify/applications/i5knr4obzv3hzjhrkl58rn12/data/sqlite.db < migration.sql
-- Take a backup first: cp <db> <db>.bak-pre-p5-04-<timestamp>

BEGIN TRANSACTION;

-- ====== P5-04 : 23 UPDATEs swapping unsplash URLs to local paths ======
UPDATE blog_posts SET featured_image = '/images/blog/1451187580459-43490279c0fa.jpg', updated_at = (CAST(strftime('%s','now') AS INTEGER) * 1000) WHERE featured_image LIKE '%photo-1451187580459-43490279c0fa%';
UPDATE blog_posts SET featured_image = '/images/blog/1460925895917-afdab827c52f.jpg', updated_at = (CAST(strftime('%s','now') AS INTEGER) * 1000) WHERE featured_image LIKE '%photo-1460925895917-afdab827c52f%';
UPDATE blog_posts SET featured_image = '/images/blog/1461749280684-dccba630e2f6.jpg', updated_at = (CAST(strftime('%s','now') AS INTEGER) * 1000) WHERE featured_image LIKE '%photo-1461749280684-dccba630e2f6%';
UPDATE blog_posts SET featured_image = '/images/blog/1485827404703-89b55fcc595e.jpg', updated_at = (CAST(strftime('%s','now') AS INTEGER) * 1000) WHERE featured_image LIKE '%photo-1485827404703-89b55fcc595e%';
UPDATE blog_posts SET featured_image = '/images/blog/1515879218367-8466d910aaa4.jpg', updated_at = (CAST(strftime('%s','now') AS INTEGER) * 1000) WHERE featured_image LIKE '%photo-1515879218367-8466d910aaa4%';
UPDATE blog_posts SET featured_image = '/images/blog/1516321165247-4aa89a48be28.jpg', updated_at = (CAST(strftime('%s','now') AS INTEGER) * 1000) WHERE featured_image LIKE '%photo-1516321165247-4aa89a48be28%';
UPDATE blog_posts SET featured_image = '/images/blog/1516321318423-f06f85e504b3.jpg', updated_at = (CAST(strftime('%s','now') AS INTEGER) * 1000) WHERE featured_image LIKE '%photo-1516321318423-f06f85e504b3%';
UPDATE blog_posts SET featured_image = '/images/blog/1516321497487-e288fb19713f.jpg', updated_at = (CAST(strftime('%s','now') AS INTEGER) * 1000) WHERE featured_image LIKE '%photo-1516321497487-e288fb19713f%';
UPDATE blog_posts SET featured_image = '/images/blog/1517048676732-d65bc937f952.jpg', updated_at = (CAST(strftime('%s','now') AS INTEGER) * 1000) WHERE featured_image LIKE '%photo-1517048676732-d65bc937f952%';
UPDATE blog_posts SET featured_image = '/images/blog/1521737604893-d14cc237f11d.jpg', updated_at = (CAST(strftime('%s','now') AS INTEGER) * 1000) WHERE featured_image LIKE '%photo-1521737604893-d14cc237f11d%';
UPDATE blog_posts SET featured_image = '/images/blog/1522202176988-66273c2fd55f.jpg', updated_at = (CAST(strftime('%s','now') AS INTEGER) * 1000) WHERE featured_image LIKE '%photo-1522202176988-66273c2fd55f%';
UPDATE blog_posts SET featured_image = '/images/blog/1523240795612-9a054b0db644.jpg', updated_at = (CAST(strftime('%s','now') AS INTEGER) * 1000) WHERE featured_image LIKE '%photo-1523240795612-9a054b0db644%';
UPDATE blog_posts SET featured_image = '/images/blog/1526379095098-d400fd0bf935.jpg', updated_at = (CAST(strftime('%s','now') AS INTEGER) * 1000) WHERE featured_image LIKE '%photo-1526379095098-d400fd0bf935%';
UPDATE blog_posts SET featured_image = '/images/blog/1544383835-bda2bc66a55d.jpg', updated_at = (CAST(strftime('%s','now') AS INTEGER) * 1000) WHERE featured_image LIKE '%photo-1544383835-bda2bc66a55d%';
UPDATE blog_posts SET featured_image = '/images/blog/1551288049-bebda4e38f71.jpg', updated_at = (CAST(strftime('%s','now') AS INTEGER) * 1000) WHERE featured_image LIKE '%photo-1551288049-bebda4e38f71%';
UPDATE blog_posts SET featured_image = '/images/blog/1555949963-aa79dcee981c.jpg', updated_at = (CAST(strftime('%s','now') AS INTEGER) * 1000) WHERE featured_image LIKE '%photo-1555949963-aa79dcee981c%';
UPDATE blog_posts SET featured_image = '/images/blog/1556740749-887f6717d7e4.jpg', updated_at = (CAST(strftime('%s','now') AS INTEGER) * 1000) WHERE featured_image LIKE '%photo-1556740749-887f6717d7e4%';
UPDATE blog_posts SET featured_image = '/images/blog/1573164713988-8665fc963095.jpg', updated_at = (CAST(strftime('%s','now') AS INTEGER) * 1000) WHERE featured_image LIKE '%photo-1573164713988-8665fc963095%';
UPDATE blog_posts SET featured_image = '/images/blog/1576091160399-112ba8d25d1d.jpg', updated_at = (CAST(strftime('%s','now') AS INTEGER) * 1000) WHERE featured_image LIKE '%photo-1576091160399-112ba8d25d1d%';
UPDATE blog_posts SET featured_image = '/images/blog/1620712943543-bcc4688e7485.jpg', updated_at = (CAST(strftime('%s','now') AS INTEGER) * 1000) WHERE featured_image LIKE '%photo-1620712943543-bcc4688e7485%';
UPDATE blog_posts SET featured_image = '/images/blog/1667372393119-3d4c48d07fc9.jpg', updated_at = (CAST(strftime('%s','now') AS INTEGER) * 1000) WHERE featured_image LIKE '%photo-1667372393119-3d4c48d07fc9%';
UPDATE blog_posts SET featured_image = '/images/blog/1674027444485-cec3da58eef4.jpg', updated_at = (CAST(strftime('%s','now') AS INTEGER) * 1000) WHERE featured_image LIKE '%photo-1674027444485-cec3da58eef4%';
UPDATE blog_posts SET featured_image = '/images/blog/1677442136019-21780ecad995.jpg', updated_at = (CAST(strftime('%s','now') AS INTEGER) * 1000) WHERE featured_image LIKE '%photo-1677442136019-21780ecad995%';

-- ====== P4-14 : 2 new blog posts ======
INSERT OR IGNORE INTO blog_posts (
  title, slug, excerpt, content, featured_image, category, tags,
  meta_title, meta_description, author, is_published,
  published_at, created_at, updated_at
) VALUES (
  'How Long Does It Take to Learn Java in Pune? (2026 Guide)',
  'how-long-to-learn-java-in-pune',
  'For most beginners in Pune, reaching **job-ready Java** takes about **4–6 months** of consistent study — roughly 2–3 months for core Java fundamentals and another 2–3 months to add Spring Boot, databases, and a real project. If you already program in another language, you can compress this to **2–3 ',
  '## How long does it take to learn Java in Pune?

For most beginners in Pune, reaching **job-ready Java** takes about **4–6 months** of consistent study — roughly 2–3 months for core Java fundamentals and another 2–3 months to add Spring Boot, databases, and a real project. If you already program in another language, you can compress this to **2–3 months**. "Learning Java" enough to write basic programs takes only 3–4 weeks; the months are what it takes to clear interviews and ship something employers care about. The honest variable isn''t the language — it''s how many hours a week you put in and whether you build real projects.

## The realistic timeline

| Stage | What you learn | Beginner timeline |
|---|---|---|
| Core Java | Syntax, OOP, collections, exceptions, multithreading | 6–8 weeks |
| Advanced Java + DB | JDBC, SQL, build tools, Git | 3–4 weeks |
| Spring Boot + REST | Spring Boot, Spring Data JPA, REST APIs, security | 5–7 weeks |
| Project + interview prep | A deployed project, DSA basics, mock interviews | 4–6 weeks |
| **Total to job-ready** | | **~4–6 months** |

## Weekday vs weekend pace

- **Weekday batches (most students):** ~1.5–2 hrs/class + 1–2 hrs self-study → job-ready in ~4–5 months.
- **Weekend batches (working professionals):** same syllabus, ~6–8 months because there''s less weekly contact time — but it fits around a job.
- **Full-time / intensive:** a focused 6-days-a-week format (like our TechReady route) can get committed learners job-ready in ~3–4 months.

## What speeds it up

1. **Build projects from week 3**, not just watch lectures — Pune interviewers ask about what you''ve built.
2. **One language deep**, not five shallow. Java + Spring is a complete, hireable stack on its own.
3. **A mentor for doubt-clearing** — beginners lose the most time stuck on errors they can''t diagnose alone.
4. **DSA in parallel** if you''re targeting product companies.

## How Archer Infotech structures it

Our [Java training in Pune](/courses/programming/java-training-in-pune) and [Java Full Stack track](/courses/full-stack-development/java-full-stack-training-in-pune) follow exactly this arc — fundamentals → Spring Boot → a capstone project → placement preparation — in classroom (Kothrud), weekend, and live-online formats. Trainers are working MNC professionals, and the course bundles placement support with no separate placement fee. See where Java can take you on the [Pune IT Salary Calculator](/tools/pune-it-salary-calculator).

## FAQs

**Can I learn Java in 3 months?** Yes if you study full-time or already code; for a typical beginner doing a weekday batch, 4–6 months to job-ready is more realistic.

**Do I need a programming background?** No — core Java is a common first language. A non-IT degree is fine; consistency matters more than your background.

**Java or Python first?** Both are beginner-viable — see our [Java vs Python comparison](/compare/java-vs-python-for-beginners). Java has the highest fresher-hiring volume in Pune''s services sector.

**Is Java still worth learning in 2026?** Yes — it drives the largest share of fresher openings in Pune (TCS, Infosys, Persistent, Tech Mahindra, BFSI) and Spring Boot remains the default enterprise stack.',
  '/images/blog/1517048676732-d65bc937f952.jpg',
  'Career Guide',
  'java, career, duration, pune',
  'How Long Does It Take to Learn Java in Pune? (2026)',
  'How long to learn Java in Pune in 2026 — realistic timelines for beginners, the job-ready milestone, weekday vs weekend pace, and what speeds it up.',
  'Archer Infotech',
  1,
  CAST(strftime('%s','now') AS INTEGER) * 1000, CAST(strftime('%s','now') AS INTEGER) * 1000, CAST(strftime('%s','now') AS INTEGER) * 1000
);

INSERT OR IGNORE INTO blog_posts (
  title, slug, excerpt, content, featured_image, category, tags,
  meta_title, meta_description, author, is_published,
  published_at, created_at, updated_at
) VALUES (
  'How Long Does It Take to Become a Full-Stack Developer? (Pune, 2026)',
  'how-long-to-become-full-stack-developer',
  'For a beginner in Pune, becoming a **job-ready full-stack developer** typically takes **6–9 months** of consistent study — you''re learning a frontend, a backend, a database, and how to tie them together into a deployed app. If you already know one side (say, frontend or a backend language), expect *',
  '## How long does it take to become a full-stack developer?

For a beginner in Pune, becoming a **job-ready full-stack developer** typically takes **6–9 months** of consistent study — you''re learning a frontend, a backend, a database, and how to tie them together into a deployed app. If you already know one side (say, frontend or a backend language), expect **3–5 months**. The phrase "full-stack" sounds huge, but you don''t learn everything — you learn *one* coherent stack (MERN or Java Full Stack) end-to-end, build 2–3 real projects, and practise interviews. That last part — projects + interview prep — is what turns "I finished a course" into "I got hired."

## Realistic timeline (beginner, one stack)

| Stage | What you learn | Timeline |
|---|---|---|
| Frontend foundations | HTML, CSS, JavaScript, one framework (React/Angular) | 8–10 weeks |
| Backend + database | Node/Express or Java/Spring, SQL/MongoDB, REST APIs, auth | 8–10 weeks |
| Full-stack integration | Connect FE+BE, state, deployment, Git workflow | 4–6 weeks |
| Projects + interview prep | 2–3 deployed projects, DSA basics, mock interviews | 6–8 weeks |
| **Total to job-ready** | | **~6–9 months** |

## MERN vs Java Full Stack (it affects your path, not the timeline much)

- **MERN** (JavaScript end-to-end) is slightly faster to start because it''s one language. Favoured by Pune product startups, SaaS, fintech.
- **Java Full Stack** has two ecosystems (steeper) but the **largest fresher-hiring volume** in Pune''s services sector.
- Same rough timeline either way. Pick based on the jobs you want — see our [MERN vs Java Full Stack comparison](/compare/mern-vs-java-full-stack).

## What "job-ready" actually means

Recruiters in Pune look for: a **deployed** project (a live URL), comfort with **Git/GitHub**, ability to explain your code, and basic **DSA** for product-company interviews. A certificate alone doesn''t get hired — a portfolio does. Build in public from month two.

## Faster vs steadier routes

- **Engineering/BCA/BSc students:** spread it across semesters (our [CareerCode](/bootcamps/careercode) model) so you arrive at placements ready.
- **Graduates wanting speed:** a full-time intensive ([TechReady](/bootcamps/techready)) compresses it to ~6–8 months with placement support.
- **Working professionals:** weekend/online batches, ~8–9 months around the job.

## How Archer Infotech structures it

Our [Java Full Stack](/courses/full-stack-development/java-full-stack-training-in-pune) and [MERN Stack](/courses/full-stack-development/mern-stack-training-in-pune) tracks follow this exact arc — frontend → backend → integration → capstone → placement prep — in classroom, weekend, and online formats. Map the whole journey on the [Pune IT Career Roadmap](/tools/pune-it-career-roadmap), and see expected pay on the [Salary Calculator](/tools/pune-it-salary-calculator).

## FAQs

**Can I become a full-stack developer in 3 months?** Only if you already know one side of the stack or study full-time. For a complete beginner, 6–9 months to job-ready is realistic.

**Do I need a degree?** No — Pune hires full-stack developers on demonstrable skill. A strong portfolio matters more than the degree.

**Which stack should I learn first?** MERN if you want a single-language start and product/startup roles; Java Full Stack for the broadest services-sector hiring. Either is a complete career path.

**Is it too late to start in 2026?** No — full-stack remains one of the highest-volume hiring categories in Pune, and AI tools make beginners productive faster, not less needed.',
  '/images/blog/1555949963-aa79dcee981c.jpg',
  'Career Guide',
  'full-stack, career, duration, pune',
  'How Long to Become a Full-Stack Developer in Pune? (2026)',
  'Realistic timeline to become a full-stack developer in Pune in 2026 — beginner vs experienced, MERN vs Java FS, and what job-ready actually means.',
  'Archer Infotech',
  1,
  CAST(strftime('%s','now') AS INTEGER) * 1000, CAST(strftime('%s','now') AS INTEGER) * 1000, CAST(strftime('%s','now') AS INTEGER) * 1000
);

-- ====== verification queries (run after COMMIT) ======
-- SELECT COUNT(*) FROM blog_posts WHERE featured_image LIKE '%unsplash%';  -- expect 0
-- SELECT COUNT(*) FROM blog_posts WHERE featured_image LIKE '/images/blog/%';  -- expect ~55+2
-- SELECT slug FROM blog_posts WHERE slug IN ('how-long-to-learn-java-in-pune','how-long-to-become-full-stack-developer');

COMMIT;
