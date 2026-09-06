#!/usr/bin/env python3
"""
Render a course syllabus Markdown file to a branded Archer Infotech PDF.

Used for the gated syllabus downloads on the Data & AI course pages. The
source of truth is the Markdown in the Obsidian vault
(`data-analytics-engineering-science-ml-syllabi/`); this script is the only
thing that turns it into the PDF served from /public/downloads.

Every page carries:
  - a header with the Archer Infotech wordmark and the course name
  - a diagonal "ARCHER INFOTECH PUNE" watermark behind the text
  - a footer with the Kothrud address, phone, email and page number

The Markdown is expected to be the shape those syllabi already use:

    # Course Title
    ## 1. Module Name
    ### 1.1 Sub-section
    - topic
    - topic

Usage
-----
    python3 scripts/build-syllabus-pdf.py \
        --md  ~/Documents/archer-obsidian/.../data-analytics-syllabus.md \
        --out public/downloads/data-analytics-syllabus-v1.pdf \
        --title "Data Analytics Course Syllabus"
"""

import argparse
import re
from datetime import date

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    KeepTogether,
    ListFlowable,
    ListItem,
    PageTemplate,
    Paragraph,
    Spacer,
)

# Brand colours sampled from the site's design tokens (globals.css).
NAVY = colors.HexColor("#1E3A5F")
GOLD = colors.HexColor("#C8891F")
INK = colors.HexColor("#1F2937")
MUTED = colors.HexColor("#6B7280")
RULE = colors.HexColor("#D8DEE6")

ORG = "Archer Infotech"
TAGLINE = "IT Training Institute, Kothrud, Pune — since 2009"
ADDRESS = (
    "Flat No. 12, Divyadarshan Housing Society, behind Kothrud Bus Stand Road, "
    "Kothrud, Pune 411038"
)
PHONE = "+91 9850 678451"
EMAIL = "info@archerinfotech.in"
SITE = "archerinfotech.in"

PAGE_W, PAGE_H = A4
MARGIN = 18 * mm
HEADER_H = 20 * mm
FOOTER_H = 18 * mm


def draw_furniture(canvas, doc, course_title):
    """Header, watermark and footer — painted on every page."""
    canvas.saveState()

    # ---- watermark, first so everything else sits on top of it ----
    canvas.saveState()
    canvas.translate(PAGE_W / 2, PAGE_H / 2)
    canvas.rotate(45)
    canvas.setFont("Helvetica-Bold", 46)
    canvas.setFillColor(colors.Color(0.45, 0.52, 0.62, alpha=0.07))
    canvas.drawCentredString(0, 0, "ARCHER INFOTECH PUNE")
    canvas.setFont("Helvetica", 15)
    canvas.drawCentredString(0, -30, "archerinfotech.in")
    canvas.restoreState()

    # ---- header ----
    top = PAGE_H - MARGIN
    canvas.setFillColor(NAVY)
    canvas.setFont("Helvetica-Bold", 13)
    canvas.drawString(MARGIN, top - 4, ORG)
    canvas.setFillColor(MUTED)
    canvas.setFont("Helvetica", 7.5)
    canvas.drawString(MARGIN, top - 14, TAGLINE)

    canvas.setFillColor(NAVY)
    canvas.setFont("Helvetica-Bold", 8.5)
    canvas.drawRightString(PAGE_W - MARGIN, top - 4, course_title)
    canvas.setFillColor(MUTED)
    canvas.setFont("Helvetica", 7.5)
    canvas.drawRightString(PAGE_W - MARGIN, top - 14, f"{SITE}  |  {PHONE}")

    canvas.setStrokeColor(GOLD)
    canvas.setLineWidth(1.1)
    canvas.line(MARGIN, top - 20, PAGE_W - MARGIN, top - 20)

    # ---- footer ----
    base = MARGIN + FOOTER_H - 6 * mm
    canvas.setStrokeColor(RULE)
    canvas.setLineWidth(0.6)
    canvas.line(MARGIN, base + 12, PAGE_W - MARGIN, base + 12)

    canvas.setFillColor(MUTED)
    canvas.setFont("Helvetica", 6.8)
    canvas.drawString(MARGIN, base + 3, ADDRESS)
    canvas.drawString(MARGIN, base - 5, f"Phone {PHONE}   |   Email {EMAIL}   |   {SITE}")
    canvas.setFont("Helvetica-Bold", 7.5)
    canvas.setFillColor(NAVY)
    canvas.drawRightString(PAGE_W - MARGIN, base - 1, f"Page {canvas.getPageNumber()}")

    canvas.restoreState()


def styles():
    ss = getSampleStyleSheet()
    return {
        "h1": ParagraphStyle(
            "h1", parent=ss["Title"], fontName="Helvetica-Bold", fontSize=21,
            leading=26, textColor=NAVY, spaceAfter=2, alignment=TA_CENTER,
        ),
        "sub": ParagraphStyle(
            "sub", parent=ss["Normal"], fontName="Helvetica", fontSize=9.5,
            leading=13, textColor=MUTED, alignment=TA_CENTER, spaceAfter=14,
        ),
        "part": ParagraphStyle(
            "part", parent=ss["Heading1"], fontName="Helvetica-Bold", fontSize=14,
            leading=17, textColor=GOLD, spaceBefore=16, spaceAfter=6,
        ),
        "h2": ParagraphStyle(
            "h2", parent=ss["Heading2"], fontName="Helvetica-Bold", fontSize=12,
            leading=15, textColor=NAVY, spaceBefore=11, spaceAfter=4,
        ),
        "h3": ParagraphStyle(
            "h3", parent=ss["Heading3"], fontName="Helvetica-Bold", fontSize=9.6,
            leading=12.5, textColor=GOLD, spaceBefore=6, spaceAfter=2,
        ),
        "li": ParagraphStyle(
            "li", parent=ss["Normal"], fontName="Helvetica", fontSize=8.6,
            leading=11.6, textColor=INK,
        ),
        "p": ParagraphStyle(
            "p", parent=ss["Normal"], fontName="Helvetica", fontSize=8.8,
            leading=12, textColor=INK, spaceAfter=5,
        ),
    }


def esc(text):
    out = text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
    # Markdown emphasis, after escaping so the tags we add survive.
    out = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", out)
    out = re.sub(r"`(.+?)`", r"<font face='Courier'>\1</font>", out)
    return out


def classify(text, level=1):
    """Which paragraph style a heading takes, in the numbered convention.

    Two conventions live in the vault. The AI syllabi nest cleanly — one `#`
    title, `##` modules, `###` sub-sections — and are read by depth.

    The full-stack syllabi are numbered instead: `# Part IV — JavaScript`
    dividers, then numbered sections that appear at BOTH `#` and `##` depending
    on where in the file you are, then unnumbered `##` sub-headings under them.
    Reading those by depth produces nonsense — "Strings" outranking "Python
    Data Structures" — so this classifies by the heading text instead, which is
    what actually carries the hierarchy in those documents.
    """
    if re.match(r"^(Part\b|Appendix\b)", text):
        return "part"
    # Numbered sections appear as "33. ASP.NET Core" in the full-stack syllabi
    # and as "Module 33: Collections" in the programming ones.
    if re.match(r"^(\d+\.\s|Module\s+\d+\b)", text):
        return "h2"
    # A top-level heading is a section even when it carries no number —
    # "Course Objectives", "Learning Outcomes", "Prerequisites".
    if level == 1:
        return "h2"
    return "h3"


def build(md_path, out_path, course_title, style="nested"):
    raw = open(md_path, encoding="utf-8").read()
    st = styles()

    doc = BaseDocTemplate(
        out_path, pagesize=A4,
        leftMargin=MARGIN, rightMargin=MARGIN,
        topMargin=MARGIN + HEADER_H, bottomMargin=MARGIN + FOOTER_H,
        title=f"{course_title} — {ORG}, Pune",
        author=ORG, subject=f"{course_title} syllabus",
        keywords=f"{course_title}, Archer Infotech, Pune, IT training",
    )
    frame = Frame(
        doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="body"
    )
    doc.addPageTemplates([
        PageTemplate(
            id="all", frames=[frame],
            onPage=lambda c, d: draw_furniture(c, d, course_title),
        )
    ])

    story = [
        Paragraph(esc(course_title), st["h1"]),
        Paragraph(
            f"{ORG}, Kothrud Pune &nbsp;|&nbsp; Classroom &amp; live-online batches "
            f"&nbsp;|&nbsp; Updated {date.today():%B %Y}",
            st["sub"],
        ),
    ]

    bullets = []
    seen_title = [False]

    def flush():
        """Emit the pending bullet run as one list."""
        nonlocal bullets
        if not bullets:
            return
        story.append(ListFlowable(
            [ListItem(Paragraph(esc(b), st["li"]), leftIndent=10) for b in bullets],
            bulletType="bullet", bulletFontSize=7, bulletColor=GOLD,
            bulletFontName="Helvetica",
            leftIndent=12, spaceAfter=3,
        ))
        bullets = []

    # The Obsidian syllabi carry YAML frontmatter and the Agentic AI one has a
    # Markdown table. Neither is content the PDF should print verbatim.
    if raw.startswith("---"):
        end = raw.find("\n---", 3)
        if end != -1:
            raw = raw[raw.find("\n", end + 1) + 1:]

    for line in raw.split("\n"):
        s = line.strip()
        if not s:
            continue
        if style == "numbered" and not seen_title[0] and not s.startswith("#"):
            # These documents open with a sentence of editorial framing above
            # the title ("Below is a job-oriented syllabus suitable for a
            # training institute…"). It is a note to the author, not syllabus
            # content, and must not reach a document a student downloads.
            continue
        if set(s) == {"-"} and len(s) >= 3:
            continue  # horizontal rule
        if s.startswith("#"):
            level = len(s) - len(s.lstrip("#"))
            text = s[level:].strip()
            if style == "numbered":
                if not seen_title[0] and level == 1:
                    seen_title[0] = True  # first h1 is the document title
                    continue
                flush()
                story.append(Paragraph(esc(text), st[classify(text, level)]))
                continue
            if level == 1:
                continue  # the document title is already rendered above
        if s.startswith("|"):
            # Table row. The separator row is noise; every other row becomes a
            # bullet of its non-empty cells, which is how these tables read
            # anyway (assignment / skills pairs).
            cells = [c.strip() for c in s.strip("|").split("|")]
            if all(re.fullmatch(r":?-{2,}:?", c) for c in cells if c):
                continue
            cells = [c for c in cells if c and not c.isdigit()]
            if cells:
                bullets.append(" — ".join(cells))
            continue
        if re.match(r"^\d+\.\s", s):
            # The syllabi number their topics. They are an unordered set of
            # topics, not a sequence with meaning, so they join the bullet run
            # rather than starting a separate numbered list.
            bullets.append(re.sub(r"^\d+\.\s+", "", s))
            continue
        if s.startswith("## "):
            flush()
            # Keep a module heading with its first sub-heading so a module
            # never begins on the last line of a page.
            story.append(Paragraph(esc(s[3:]), st["h2"]))
        elif s.startswith("### "):
            flush()
            story.append(Paragraph(esc(s[4:]), st["h3"]))
        elif s.startswith(("- ", "* ")):
            bullets.append(s[2:])
        else:
            flush()
            story.append(Paragraph(esc(s), st["p"]))
    flush()

    story.append(Spacer(1, 10))
    story.append(Paragraph(
        f"<b>Enquire or book a free demo session.</b> {ORG}, {ADDRESS}. "
        f"Phone {PHONE}. Email {EMAIL}. Web {SITE}.",
        st["p"],
    ))

    doc.build(story)
    return out_path


if __name__ == "__main__":
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--md", required=True)
    ap.add_argument("--out", required=True)
    ap.add_argument("--title", required=True)
    ap.add_argument(
        "--style", choices=("nested", "numbered"), default="nested",
        help="nested: '##' modules under one '#' title (the AI syllabi). "
             "numbered: '# Part N' dividers with numbered sections (the "
             "full-stack syllabi).",
    )
    a = ap.parse_args()
    print("written:", build(a.md, a.out, a.title, a.style))
