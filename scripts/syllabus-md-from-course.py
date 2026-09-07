#!/usr/bin/env python3
"""
Emit a syllabus Markdown file from a course page's own curriculum.

Most courses have a syllabus document in the Obsidian vault that the page was
written from, and build-syllabus-pdf.py renders that. Some do not — the cloud
certification tracks are structured around a vendor's published exam domains
rather than an internal syllabus, so the page IS the source.

For those, writing a parallel Markdown file by hand would create two documents
that drift apart the first time either is edited. This reads the `curriculum`
array out of a course-content TypeScript file and emits Markdown in the
"numbered" convention build-syllabus-pdf.py already understands, so the claim
the download block makes — "everything in it is on this page" — is enforced by
construction rather than by care.

Usage
-----
    python3 scripts/syllabus-md-from-course.py \
        --course src/data/course-content/aws-solutions-architect-training-in-pune.ts \
        --title "AWS Solutions Architect (SAA-C03) Course Syllabus" \
        --out /tmp/aws-saa-syllabus.md
"""

import argparse
import json
import re


def unescape(ts_string):
    """Turn a TypeScript double-quoted literal into plain text."""
    return json.loads(f'"{ts_string}"')


def read_curriculum(path):
    src = open(path, encoding="utf-8").read()
    start = src.index("  curriculum: [\n") + len("  curriculum: [\n")
    # The array is followed by whichever optional block comes next.
    end = min(
        i for i in (
            src.find("\n  ],\n\n  projects: ["),
            src.find("\n  ],\n\n  roadmapImage:"),
            src.find("\n  ],\n\n  posterImage:"),
            src.find("\n  ],\n\n  syllabusDownload:"),
        ) if i != -1
    )
    modules = []
    for block in re.split(r"\n(?=    \{\n)", "\n" + src[start:end]):
        if not block.strip():
            continue
        title = re.search(r'title: "((?:[^"\\]|\\.)*)"', block)
        week = re.search(r'weekRange: "((?:[^"\\]|\\.)*)"', block)
        desc = re.search(r'description:\s*\n?\s*"((?:[^"\\]|\\.)*)"', block)
        topics_at = block.find("topics: [")
        topics = []
        if topics_at != -1:
            depth, j = 0, topics_at + 8
            while j < len(block):
                if block[j] == "[":
                    depth += 1
                elif block[j] == "]":
                    depth -= 1
                    if depth == 0:
                        break
                j += 1
            topics = re.findall(r'"((?:[^"\\]|\\.)*)"', block[topics_at:j])
        modules.append({
            "title": unescape(title.group(1)) if title else "",
            "week": unescape(week.group(1)) if week else "",
            "description": unescape(desc.group(1)) if desc else "",
            "topics": [unescape(t) for t in topics],
        })
    return modules


def render(modules, course_title):
    out = [f"# {course_title}", ""]
    out += ["## Course Overview", ""]
    out += [
        "This syllabus lists every module of the course in teaching order, "
        "with the topics covered in each. It is generated from the course "
        "page, so the two cannot disagree.",
        "",
    ]
    for n, m in enumerate(modules, 1):
        out.append(f"# Module {n}: {m['title']}")
        out.append("")
        if m["week"]:
            out.append(f"**Schedule:** {m['week']}")
            out.append("")
        for para in m["description"].split("\n\n"):
            if para.strip():
                out.append(para.strip())
                out.append("")
        if m["topics"]:
            out.append("## Topics")
            out += [f"- {t}" for t in m["topics"]]
            out.append("")
        out.append("---")
        out.append("")
    return "\n".join(out)


if __name__ == "__main__":
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--course", required=True)
    ap.add_argument("--title", required=True)
    ap.add_argument("--out", required=True)
    a = ap.parse_args()
    mods = read_curriculum(a.course)
    open(a.out, "w", encoding="utf-8").write(render(mods, a.title))
    print(f"written: {a.out}  ({len(mods)} modules)")
