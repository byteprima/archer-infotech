#!/usr/bin/env python3
"""
Render the hero diagram for each course-category landing page.

Three categories (Full Stack Development, Data & AI, AI & GenAI) carry
supplied infographics. The remaining nine had no illustration at all, and a
category landing page whose job is "help me choose" is exactly the place a
diagram earns its space. These are generated rather than commissioned, in the
same dark-navy / neon-outline family as the per-course workflow diagrams
(build-course-flow-diagram.py) so the site reads as one set.

Two layouts, chosen per category by what the page is actually explaining:

  flow    A vertical pipeline. For categories that describe a process with an
          order — a CI/CD pipeline, a release path, a testing progression.

  tracks  Side-by-side columns. For categories where the reader's real
          question is "which of these do I pick", so the diagram has to show
          alternatives rather than a sequence.

Every word in a diagram is invisible to a crawler and to an AI engine, so
nothing here may be the only place a fact appears — each diagram summarises
section copy that already says the same thing in text.

Usage
-----
    python3 scripts/build-category-diagram.py            # all
    python3 scripts/build-category-diagram.py programming cloud-devops
"""

import sys

from PIL import Image, ImageDraw, ImageFont

W = 1500
BG_TOP = (13, 26, 43)
BG_BOT = (8, 17, 31)
INK = (238, 244, 252)
MUTED = (150, 170, 196)
FAINT = (108, 130, 158)

BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
REG = "/System/Library/Fonts/Supplemental/Arial.ttf"

# Accent palette, reused across both layouts so the family stays coherent.
SKY = (56, 189, 248)
INDIGO = (129, 140, 248)
VIOLET = (168, 85, 247)
TEAL = (45, 212, 191)
GREEN = (52, 211, 153)
AMBER = (250, 204, 21)
ROSE = (248, 113, 113)
ORANGE = (251, 146, 60)

TOP_BLOCK = 168
FOOT_BLOCK = 96


def fonts():
    return {
        "title": ImageFont.truetype(BOLD, 36),
        "sub": ImageFont.truetype(REG, 17),
        "stage": ImageFont.truetype(BOLD, 21),
        "col": ImageFont.truetype(BOLD, 20),
        "colsub": ImageFont.truetype(REG, 13),
        "desc": ImageFont.truetype(REG, 14),
        "item": ImageFont.truetype(REG, 14),
        "brand": ImageFont.truetype(BOLD, 15),
        "small": ImageFont.truetype(REG, 12),
    }


def ground(H):
    """Vertical gradient plus a faint dot grid, as an RGBA canvas."""
    img = Image.new("RGBA", (W, H), BG_TOP + (255,))
    d = ImageDraw.Draw(img)
    for y in range(H):
        t = y / (H - 1)
        c = tuple(round(BG_TOP[i] + (BG_BOT[i] - BG_TOP[i]) * t) for i in range(3))
        d.line([(0, y), (W, y)], fill=c + (255,))
    for x in range(0, W, 34):
        for y in range(0, H, 34):
            d.point((x, y), fill=(70, 96, 130, 255))
    return img


def glow(base, box, radius, colour):
    """Cheap outer glow: successively fainter rounded strokes."""
    layer = Image.new("RGBA", base.size, (0, 0, 0, 0))
    gd = ImageDraw.Draw(layer)
    for i, alpha in ((6, 26), (4, 40), (2, 70)):
        gd.rounded_rectangle(
            [box[0] - i, box[1] - i, box[2] + i, box[3] + i],
            radius=radius + i, outline=colour + (alpha,), width=2,
        )
    base.alpha_composite(layer)


def panel_fill(colour, strength=0.10):
    """Mix the accent into the ground by hand.

    ImageDraw writes RGBA values straight into the buffer instead of
    alpha-blending them, so a translucent fill fights whatever is drawn on top
    of it — that is what made stage names render as faint outlines in the
    first version of the course-workflow diagrams. Pre-mixing on RGB avoids
    the whole problem.
    """
    return tuple(round(BG_TOP[k] + (colour[k] - BG_TOP[k]) * strength) for k in range(3))


def furniture(d, f, spec, H):
    d.text((60, 48), spec["title"], font=f["title"], fill=INK)
    d.text((60, 96), spec["sub"], font=f["sub"], fill=MUTED)
    d.text((60, H - 52), "ARCHER INFOTECH", font=f["brand"], fill=INK)
    d.text((60, H - 31), "Kothrud, Pune  |  archerinfotech.in", font=f["small"], fill=MUTED)
    tail = spec.get("tail", "LEARN TODAY  |  BUILD TOMORROW")
    d.text((W - 60 - d.textlength(tail, font=f["small"]), H - 31), tail,
           font=f["small"], fill=MUTED)


# ----------------------------------------------------------------- layouts


def build_flow(spec):
    stages = spec["stages"]
    n = len(stages)
    BOX_H, GAP = 66, 22
    H = TOP_BLOCK + n * BOX_H + (n - 1) * GAP + FOOT_BLOCK

    img = ground(H)
    left, right = 60, W - 60
    for i, (_, _, colour) in enumerate(stages):
        y0 = TOP_BLOCK + i * (BOX_H + GAP)
        glow(img, (left, y0, right, y0 + BOX_H), 14, colour)

    img = img.convert("RGB")
    d = ImageDraw.Draw(img)
    f = fonts()
    furniture(d, f, spec, H)

    for i, (name, desc, colour) in enumerate(stages):
        y0 = TOP_BLOCK + i * (BOX_H + GAP)
        d.rounded_rectangle((left, y0, right, y0 + BOX_H), radius=14,
                            fill=panel_fill(colour), outline=colour, width=3)
        d.text((left + 26, y0 + 14), name, font=f["stage"], fill=INK)
        d.text((left + 26, y0 + 42), desc, font=f["desc"], fill=MUTED)
        d.text((right - 56, y0 + 20), f"{i + 1:02d}", font=f["stage"], fill=colour)
        if i < n - 1:
            cx = left + 46
            ay0, ay1 = y0 + BOX_H + 3, y0 + BOX_H + GAP - 3
            d.line([(cx, ay0), (cx, ay1)], fill=colour, width=2)
            d.polygon([(cx - 5, ay1 - 5), (cx + 5, ay1 - 5), (cx, ay1 + 2)], fill=colour)
    return img


def build_tracks(spec):
    cols = spec["columns"]
    n = len(cols)
    GUTTER = 22
    left, right = 60, W - 60
    col_w = (right - left - GUTTER * (n - 1)) // n
    head_h = 76
    row_h = 30
    rows = max(len(c["items"]) for c in cols)
    body_h = head_h + rows * row_h + 22
    H = TOP_BLOCK + body_h + FOOT_BLOCK
    if spec.get("footnote"):
        H += 44

    img = ground(H)
    for i in range(n):
        x0 = left + i * (col_w + GUTTER)
        glow(img, (x0, TOP_BLOCK, x0 + col_w, TOP_BLOCK + body_h), 16, cols[i]["colour"])

    img = img.convert("RGB")
    d = ImageDraw.Draw(img)
    f = fonts()
    furniture(d, f, spec, H)

    for i, c in enumerate(cols):
        colour = c["colour"]
        x0 = left + i * (col_w + GUTTER)
        x1 = x0 + col_w
        d.rounded_rectangle((x0, TOP_BLOCK, x1, TOP_BLOCK + body_h), radius=16,
                            fill=panel_fill(colour, 0.09), outline=colour, width=3)
        # Heading band, tinted a little harder than the column body.
        d.rounded_rectangle((x0, TOP_BLOCK, x1, TOP_BLOCK + head_h), radius=16,
                            fill=panel_fill(colour, 0.22))
        d.rectangle((x0, TOP_BLOCK + head_h - 16, x1, TOP_BLOCK + head_h),
                    fill=panel_fill(colour, 0.22))
        d.line((x0 + 1, TOP_BLOCK + head_h, x1 - 1, TOP_BLOCK + head_h), fill=colour, width=2)
        d.text((x0 + 20, TOP_BLOCK + 16), c["heading"], font=f["col"], fill=INK)
        d.text((x0 + 20, TOP_BLOCK + 45), c["sub"], font=f["colsub"], fill=MUTED)

        for j, item in enumerate(c["items"]):
            y = TOP_BLOCK + head_h + 14 + j * row_h
            d.ellipse((x0 + 22, y + 6, x0 + 30, y + 14), fill=colour)
            d.text((x0 + 42, y), item, font=f["item"], fill=INK if j == 0 else MUTED)

    if spec.get("footnote"):
        d.text((left, TOP_BLOCK + body_h + 18), spec["footnote"], font=f["desc"], fill=FAINT)
    return img


# ------------------------------------------------------------------ specs

CATEGORIES = {
    # ---- choose-a-path categories -------------------------------------
    "programming-languages-map": {
        "layout": "tracks",
        "title": "Which Programming Language Should You Learn?",
        "sub": "The foundation languages taught at Archer Infotech, Pune — and where each one leads",
        "columns": [
            {"heading": "Java", "sub": "Highest fresher hiring volume in Pune",
             "colour": ORANGE,
             "items": ["Enterprise backend", "Spring Boot & microservices",
                       "Android (legacy)", "Services majors & GCC captives",
                       "→ Java Full Stack"]},
            {"heading": "Python", "sub": "Broadest range of destinations",
             "colour": SKY,
             "items": ["Backend & APIs", "Automation & scripting",
                       "Data, ML and AI", "Product companies & startups",
                       "→ Data & AI, GenAI"]},
            {"heading": "JavaScript", "sub": "The only language the browser runs",
             "colour": AMBER,
             "items": ["Frontend, everywhere", "Node.js backend",
                       "React & Angular", "Startups & SaaS",
                       "→ MERN, MEAN, Modern Web"]},
            {"heading": "C / C++", "sub": "Closest to the machine",
             "colour": VIOLET,
             "items": ["Systems & embedded", "Performance-critical code",
                       "Competitive programming", "Product & finance engineering",
                       "→ strongest fundamentals"]},
            {"heading": "C# / .NET", "sub": "The Microsoft ecosystem",
             "colour": GREEN,
             "items": ["ASP.NET Core backend", "Enterprise applications",
                       "Azure-oriented work", "GCC captives",
                       "→ .NET Full Stack"]},
        ],
        "footnote": "Learn one language properly before adding a second. Every specialisation above assumes fluency in the language beneath it.",
        "tail": "ONE LANGUAGE  |  THEN THE STACK",
    },
    "database-landscape": {
        "layout": "tracks",
        "title": "Relational, Document or Cloud — Which Database?",
        "sub": "How the database courses at Archer Infotech, Pune map to real application needs",
        "columns": [
            {"heading": "Relational (SQL)", "sub": "Structured data, strong guarantees",
             "colour": SKY,
             "items": ["MySQL — the web default", "PostgreSQL — the modern default",
                       "Oracle — large enterprise", "Schemas, joins, normalisation",
                       "ACID transactions", "Indexes and query plans"]},
            {"heading": "Document (NoSQL)", "sub": "Flexible shape, horizontal scale",
             "colour": GREEN,
             "items": ["MongoDB — documents & collections", "Schema-on-read",
                       "Embedding vs referencing", "Aggregation pipeline",
                       "Replica sets and sharding", "MERN and MEAN backbone"]},
            {"heading": "Backend-as-a-Service", "sub": "Managed, real-time, app-first",
             "colour": AMBER,
             "items": ["Firebase — Firestore & Realtime DB", "Authentication built in",
                       "Real-time sync to clients", "Cloud Functions",
                       "Mobile and rapid prototypes", "No server to operate"]},
        ],
        "footnote": "SQL is the skill that transfers everywhere — learn it first, then add whichever engine your target stack uses.",
        "tail": "STORE  |  QUERY  |  SCALE",
    },
    "cloud-certification-ladder": {
        "layout": "tracks",
        "title": "The Cloud Certification Ladder",
        "sub": "Where the AWS, Azure and Google Cloud certifications taught in Pune actually sit",
        "columns": [
            {"heading": "AWS", "sub": "Largest market share, widest hiring",
             "colour": AMBER,
             "items": ["Cloud Practitioner (entry)", "Solutions Architect – Associate",
                       "Developer / SysOps – Associate", "Architect – Professional",
                       "Specialty tracks", "Taught here: Solutions Architect"]},
            {"heading": "Microsoft Azure", "sub": "Dominant in enterprise and GCC captives",
             "colour": SKY,
             "items": ["AZ-900 Fundamentals", "AZ-104 Administrator",
                       "AZ-204 Developer", "AZ-305 Solutions Architect",
                       "Security and data specialties", "Taught here: AZ-104 Administrator"]},
            {"heading": "Google Cloud", "sub": "Strong in data, analytics and AI",
             "colour": GREEN,
             "items": ["Cloud Digital Leader", "Associate Cloud Engineer",
                       "Professional Cloud Architect", "Data Engineer",
                       "Machine Learning Engineer", "Taught here: Associate Cloud Engineer"]},
        ],
        "footnote": "A certification proves familiarity, not capability. Pair it with a deployed project — hiring panels ask about the project.",
        "tail": "CERTIFY  |  THEN PROVE IT",
    },
    "mobile-development-paths": {
        "layout": "tracks",
        "title": "Native or Cross-Platform? The Two Routes to a Mobile App",
        "sub": "How the mobile courses at Archer Infotech, Pune differ — and what each one gives you",
        "columns": [
            {"heading": "Android (native)", "sub": "Kotlin, Jetpack Compose",
             "colour": GREEN,
             "items": ["One platform, full access", "Kotlin and the Android SDK",
                       "Jetpack Compose UI", "Play Store release",
                       "Deepest platform knowledge"]},
            {"heading": "iOS (native)", "sub": "Swift, SwiftUI",
             "colour": SKY,
             "items": ["One platform, full access", "Swift and SwiftUI",
                       "Xcode and the Apple toolchain", "App Store release",
                       "Requires a Mac to build"]},
            {"heading": "Flutter", "sub": "Dart, one codebase",
             "colour": TEAL,
             "items": ["Android + iOS together", "Dart and the widget tree",
                       "Own rendering engine", "Consistent UI across platforms",
                       "Fastest route to both stores"]},
            {"heading": "React Native", "sub": "JavaScript, one codebase",
             "colour": VIOLET,
             "items": ["Android + iOS together", "JavaScript and React",
                       "Native components under the hood", "Reuses React knowledge",
                       "Common at product startups"]},
        ],
        "footnote": "Cross-platform ships to both stores faster; native gives deeper platform control. Neither is a substitute for understanding how mobile apps are actually built.",
        "tail": "BUILD  |  TEST  |  RELEASE",
    },
    # ---- pipeline / sequence categories --------------------------------
    "devops-pipeline": {
        "layout": "flow",
        "title": "How Code Reaches Production",
        "sub": "The DevOps pipeline taught across the Cloud & DevOps courses at Archer Infotech, Pune",
        "stages": [
            ("Code", "Git, branching, pull requests, code review", SKY),
            ("Build", "Compile, package, dependency and artefact management", INDIGO),
            ("Test", "Unit, integration and automated quality gates", VIOLET),
            ("Containerise", "Docker images, registries, reproducible environments", TEAL),
            ("Release", "CI/CD pipelines — Jenkins, GitHub Actions, GitLab CI", GREEN),
            ("Deploy", "Kubernetes, cloud services on AWS, Azure or GCP", AMBER),
            ("Operate", "Monitoring, logging, alerting, scaling, incident response", ROSE),
        ],
        "tail": "AUTOMATE  |  DEPLOY  |  OBSERVE",
    },
    "modern-web-architecture": {
        "layout": "flow",
        "title": "How a Modern Web Application Is Put Together",
        "sub": "The frontend and Node.js stack taught in the Modern Web courses at Archer Infotech, Pune",
        "stages": [
            ("TypeScript", "Types over JavaScript — the shared foundation", SKY),
            ("Component UI", "React or Angular — state, props, composition", INDIGO),
            ("Routing & Rendering", "Next.js — SSR, SSG, streaming, the app router", VIOLET),
            ("API Layer", "REST and JSON contracts between client and server", TEAL),
            ("Node.js Backend", "Express, middleware, authentication, business logic", GREEN),
            ("Data", "SQL or MongoDB, queries and schema design", AMBER),
            ("Build & Deploy", "Bundling, environments, hosting, monitoring", ROSE),
        ],
        "tail": "TYPED  |  COMPOSED  |  SHIPPED",
    },
    "testing-career-tracks": {
        "layout": "tracks",
        "title": "Which Testing & QA Track Should You Take?",
        "sub": "The three tracks in the Testing & QA catalogue at Archer Infotech, Pune",
        "columns": [
            {"heading": "Foundation", "sub": "No programming assumed",
             "colour": SKY,
             "items": ["Software Testing & QA", "SDLC, STLC, test design",
                       "Defect management & Jira", "API testing with Postman",
                       "→ freshers and career switchers"]},
            {"heading": "Automation", "sub": "Pick one language, then modernise",
             "colour": GREEN,
             "items": ["Selenium with Java", "or Selenium with Python",
                       "Playwright with TypeScript", "API Testing & Automation",
                       "→ manual testers and SDET aspirants"]},
            {"heading": "AI Testing", "sub": "Where the supply is thinnest",
             "colour": VIOLET,
             "items": ["AI-Assisted Software Testing", "LLM & RAG Testing",
                       "Agentic AI Testing", "Evaluation, safety, release gates",
                       "→ experienced testers and SDETs"]},
        ],
        "footnote": "Selenium with Java and Selenium with Python are alternative language tracks — take one, not both. Python is the better choice if you intend to continue into the AI testing track.",
        "tail": "TEST IT  |  AUTOMATE IT  |  EVALUATE IT",
    },
    "testing-progression": {
        "layout": "flow",
        "title": "From Manual Tester to Automation Engineer",
        "sub": "The progression taught in the Testing & QA courses at Archer Infotech, Pune",
        "stages": [
            ("Testing Fundamentals", "SDLC, STLC, test case design, defect lifecycle", SKY),
            ("Manual Testing", "Functional, regression, exploratory, UAT", INDIGO),
            ("SQL & Test Data", "Querying, verifying results, preparing data", VIOLET),
            ("Programming for Testers", "Java fundamentals — the automation prerequisite", TEAL),
            ("Selenium WebDriver", "Locators, waits, the Page Object Model", GREEN),
            ("Frameworks", "TestNG, Maven, data-driven and hybrid frameworks", AMBER),
            ("API & CI", "REST Assured, Postman, running suites in Jenkins", ROSE),
        ],
        "tail": "FIND IT  |  PROVE IT  |  AUTOMATE IT",
    },
    "salesforce-platform": {
        "layout": "flow",
        "title": "Salesforce — From Administrator to Developer",
        "sub": "The two halves of the Salesforce course at Archer Infotech, Pune",
        "stages": [
            ("Platform Basics", "CRM concepts, objects, records, the data model", SKY),
            ("Administration", "Users, profiles, permissions, security model", INDIGO),
            ("Declarative Build", "Fields, page layouts, validation, reports, dashboards", VIOLET),
            ("Automation", "Flow Builder, approval processes, no-code logic", TEAL),
            ("Apex", "Classes, triggers, SOQL, governor limits, test classes", GREEN),
            ("Lightning Web Components", "Custom UI, JavaScript on the platform", AMBER),
            ("Integration & Deploy", "REST APIs, sandboxes, change sets, release", ROSE),
        ],
        "tail": "CONFIGURE  |  AUTOMATE  |  EXTEND",
    },
    "bootcamp-compare": {
        "layout": "tracks",
        "title": "Which Archer Infotech Bootcamp Is For You?",
        "sub": "Three programmes for three career stages — Kothrud, Pune",
        "columns": [
            {"heading": "CodeLeap", "sub": "Just finished 12th",
             "colour": SKY,
             "items": ["2 months, 8 weeks", "No coding background needed",
                       "Python, web, AI, GitHub", "Before college starts",
                       "\u2192 A deployed site and GitHub profile"]},
            {"heading": "CareerCode", "sub": "Currently in engineering or BCA",
             "colour": VIOLET,
             "items": ["Semester by semester", "Runs alongside your degree",
                       "6 specialisation tracks", "1-2 technologies a semester",
                       "\u2192 Internship-ready by final year"]},
            {"heading": "TechReady", "sub": "Graduated, targeting a job",
             "colour": GREEN,
             "items": ["6 to 8 months, full time", "6 hours a day, classroom",
                       "10 specialised programmes", "Placement-assisted",
                       "\u2192 Portfolio, mocks and referrals"]},
        ],
        "tail": "START  |  BUILD  |  GET HIRED",
    },
    "bootcamp-journey": {
        "layout": "flow",
        "title": "How an Archer Infotech Bootcamp Works",
        "sub": "The shared journey behind CodeLeap, CareerCode and TechReady, Kothrud Pune",
        "stages": [
            ("Where You Start", "School leaver, engineering student, or graduate", SKY),
            ("Foundations", "Programming logic, one language, problem solving", INDIGO),
            ("Core Skills", "Web fundamentals, databases, version control", VIOLET),
            ("Specialisation", "Full stack, testing, data or cloud — chosen with a trainer", TEAL),
            ("Projects", "Assignments, mini projects, a reviewed capstone", GREEN),
            ("Portfolio", "GitHub, README discipline, a project you can explain", AMBER),
            ("Placement", "Resume, mock interviews, referrals to hiring partners", ROSE),
        ],
        "tail": "START  |  BUILD  |  GET HIRED",
    },
}


def build(stem, spec):
    img = build_flow(spec) if spec["layout"] == "flow" else build_tracks(spec)
    out = f"public/images/courses/{stem}-v1"
    img.save(out + ".webp", "WEBP", quality=88, method=6)
    img.save(out + ".avif", "AVIF", quality=68)
    return img.size


if __name__ == "__main__":
    wanted = sys.argv[1:] or list(CATEGORIES)
    for stem in wanted:
        if stem not in CATEGORIES:
            sys.exit(f"unknown diagram: {stem}")
        w, h = build(stem, CATEGORIES[stem])
        print(f"  {stem}-v1  {w}x{h}")
