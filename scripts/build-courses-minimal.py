#!/usr/bin/env python3
"""Regenerate src/data/courses-minimal.ts from src/data/courses.ts.

Run this whenever you add/remove/rename a course OR a category in courses.ts:
    python3 scripts/build-courses-minimal.py

Why this file exists:
  courses.ts has rich syllabus / FAQ / module / prerequisite data ~79 KB
  minified — and Turbopack will ship the whole file into the shared chunk
  whenever a client component imports ANY export from it. That puts the
  full catalogue on the home page, /contact, /about, every blog post, etc.
  courses-minimal.ts contains only the ~12 light fields (slug, title,
  level, duration, mode, image, isFeatured) needed for cards / filters /
  nav menus — ~10 KB. Client components import from this file instead.
  P-12 chunk-audit outcome 2026-06-04.
"""
import re, pathlib

src = pathlib.Path("src/data/courses.ts").read_text()
cat_iface = re.search(r"export interface Category \{[^}]+\}", src, re.DOTALL).group(0)
m = re.search(r"export const categories: Category\[\] = \[", src)
start = m.end()
depth = 1; i = start
while i < len(src) and depth > 0:
    c = src[i]
    if c == "[": depth += 1
    elif c == "]": depth -= 1
    i += 1
categories_body = src[start:i-1]
categories_block = f"export const categories: Category[] = [{categories_body}];"

m = re.search(r"export const courses: Course\[\] = \[", src)
start = m.end(); depth = 1; i = start
while i < len(src) and depth > 0:
    c = src[i]
    if c == "[": depth += 1
    elif c == "]": depth -= 1
    i += 1
courses_body = src[start:i-1]

chunks = []; buf = []; depth = 0
for ch in courses_body:
    if ch == "{":
        if depth == 0: buf = ["{"]
        else: buf.append("{")
        depth += 1
    elif ch == "}":
        depth -= 1; buf.append("}")
        if depth == 0:
            chunks.append("".join(buf)); buf = []
    elif depth > 0:
        buf.append(ch)

LIGHT = ["id","slug","title","shortTitle","category","categorySlug",
         "shortDescription","duration","level","mode","image",
         "isFeatured","isPopular"]
minimal = []
for chunk in chunks:
    obj = {}
    for f in LIGHT:
        m = re.search(rf"^\s+{f}:\s+(.+?),?\s*$", chunk, re.MULTILINE)
        if m: obj[f] = m.group(1).rstrip(",").strip()
    if "slug" in obj: minimal.append(obj)

HEADER = '''/* AUTO-GENERATED from courses.ts — do NOT edit by hand.
 * To regenerate after editing courses.ts:
 *   python3 scripts/build-courses-minimal.py
 *
 * Purpose: this file ships only the LIGHT fields (~12 KB) so client
 * components that just need {slug,title,category,…} to render a card or
 * a filter chip don't pull in the 79 KB full course catalogue with
 * its 5-section modules, FAQs, syllabus, prerequisites, etc.
 *
 * P-12 — chunk audit 2026-06-04. Eliminates the ~70 KB shared-chunk
 * leakage of full course rich content into every public route.
 */

'''
out = [HEADER, cat_iface, "", categories_block, "",
    'export function getCategory(slug: string): Category | undefined {',
    '  return categories.find((c) => c.slug === slug);',
    '}', '',
    'export interface CourseSummary {',
    '  id: string;', '  slug: string;', '  title: string;', '  shortTitle: string;',
    '  category: string;', '  categorySlug: string;', '  shortDescription: string;',
    '  duration: string;',
    '  level: "Beginner" | "Intermediate" | "Advanced" | "All Levels";',
    '  mode: ("Online" | "Offline")[];', '  image: string;',
    '  isFeatured?: boolean;', '  isPopular?: boolean;', '}', '',
    'export const coursesSummary: CourseSummary[] = [',
]
for c in minimal:
    out.append("  {")
    for f in LIGHT:
        if f in c: out.append(f"    {f}: {c[f]},")
    out.append("  },")
out += ["];", "",
    "export function getFeaturedCoursesSummary(): CourseSummary[] {",
    "  return coursesSummary.filter((c) => c.isFeatured);",
    "}", "",
    "export function getPopularCoursesSummary(): CourseSummary[] {",
    "  return coursesSummary.filter((c) => c.isPopular);",
    "}", "",
    "export function getCoursesByCategorySummary(categorySlug: string): CourseSummary[] {",
    "  return coursesSummary.filter((c) => c.categorySlug === categorySlug);",
    "}", "",
]
pathlib.Path("src/data/courses-minimal.ts").write_text("\n".join(out) + "\n")
print(f"wrote {len(minimal)} courses + categories → src/data/courses-minimal.ts")
