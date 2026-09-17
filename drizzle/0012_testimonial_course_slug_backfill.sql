-- Backfill testimonials.course_slug from the free-text course_taken labels.
--
-- Why this exists: matching ran off `course_taken` compared against the course
-- TITLE in courses.ts. Titles are SEO surface and get rewritten — when "Java
-- Full Stack" became "Java Full Stack Development", eight of the ten published
-- testimonials silently stopped matching any course. Every course review
-- snippet on the site went dark, and Search Console reported 22 review-snippet
-- errors from the resulting half-emitted markup.
--
-- The mapping below is explicit rather than fuzzy. Each stored label was
-- checked against the catalogue by hand and every one resolved unambiguously:
--
--   "Java"              -> Core Java Programming     (NOT java-full-stack)
--   "Java Full Stack"   -> Java Full Stack Development
--   "Python Programming"-> Core Python Programming
--   "React.js"          -> React.js Development      (NOT react-native)
--   "MERN Stack"        -> MERN Stack Development
--   "DevOps"            -> DevOps Engineering
--   "Machine Learning"  -> Machine Learning
--   "Data Analytics"    -> Data Analytics            (NOT salesforce-data-analytics)
--   "AWS Cloud Computing"-> AWS Cloud Computing       (NOT aws-solutions-architect)
--   ".NET Full Stack"   -> .NET Full Stack Development (NOT dotnet-csharp)
--
-- A fuzzy matcher would have mapped "Java" to java-full-stack and "Data
-- Analytics" to the Salesforce variant. Both are wrong, and neither would
-- have been visible afterwards — which is the failure mode this whole change
-- exists to remove.
--
-- course_taken is deliberately left untouched: it is the student's own
-- wording and is rendered verbatim in "student of X" lines and image alt text.
--
-- Scoped to rows that have no slug yet, so re-running changes nothing.
UPDATE testimonials SET course_slug = CASE TRIM(course_taken)
  WHEN 'Java'               THEN 'java-training-in-pune'
  WHEN 'Java Full Stack'    THEN 'java-full-stack-training-in-pune'
  WHEN 'Python Programming' THEN 'python-training-in-pune'
  WHEN 'React.js'           THEN 'react-training-in-pune'
  WHEN 'MERN Stack'         THEN 'mern-stack-training-in-pune'
  WHEN 'DevOps'             THEN 'devops-training-in-pune'
  WHEN 'Machine Learning'   THEN 'machine-learning-training-in-pune'
  WHEN 'Data Analytics'     THEN 'data-analytics-training-in-pune'
  WHEN 'AWS Cloud Computing' THEN 'aws-training-in-pune'
  WHEN '.NET Full Stack'    THEN 'dotnet-full-stack-training-in-pune'
  ELSE NULL
END
WHERE course_slug IS NULL;
