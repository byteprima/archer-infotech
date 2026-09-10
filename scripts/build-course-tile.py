#!/usr/bin/env python3
"""
Render the tile artwork that fronts each course card in the /courses grid.

Every course in the grid carries its own tile. `<CourseImagePlaceholder>`
falls back to a generated gradient when `tileImage` is missing, and that
fallback is deliberate — but it looks visibly unfinished sitting next to
real artwork, so a category with some tiles and some placeholders reads as
half-built rather than as a design choice.

The original set (commit 255b6f2, "Create tile artwork for all 49 courses")
was produced by a generator that was never committed, so the next person to
add a course had no way to match it. This script is that generator rebuilt
from the rendered tiles: geometry measured off selenium-v1 and
software-testing-v1, which are the calibration targets in TILES below.

Design, fixed by the existing set:
  - 880x478 (the narrowest tile aspect, so nothing crops at either width),
    rendered at 2x and downsampled.
  - Pale diagonal gradient with a 44px grid, both at very low contrast.
  - One short glyph word in the technology's accent colour, optically
    centred, scaled to fit a fixed measure and capped so two-letter marks
    like "QA" do not become billboards.
  - The category name beneath in letterspaced caps.
  - The Archer lockup bottom left, mark plus wordmark.

Accent colours use the technology's own identity colour, darkened where the
published brand colour fails contrast on a light ground.

Usage
-----
    python3 scripts/build-course-tile.py                 # every tile in TILES
    python3 scripts/build-course-tile.py llm-rag-testing # one, by key
"""

import base64
import io
import re
import sys

from PIL import Image, ImageDraw, ImageFont

W, H = 880, 478
SCALE = 2

GRID = 44
BG_TL = (249, 251, 252)
BG_BR = (222, 228, 234)
GRID_INK = (30, 58, 95)
GRID_ALPHA = 20

# A soft bloom of the course's own accent behind the glyph. Barely visible in
# isolation and quite visible in a grid — it is what stops eight tiles in a
# row reading as the same grey card with different words on it. Centre,
# radius and peak are measured off the shipped tiles; the tint is the accent
# lifted most of the way to white, because the accent at full strength turns
# the ground into a coloured panel rather than a haze.
BLOOM_CX, BLOOM_CY = 0.50, 0.30
BLOOM_R = 0.75
BLOOM_PEAK = 0.20

# The glyph is fitted to an ink box, then placed by its CAP box — words with
# an ascender ("Selenium") or a descender ("Agents") must still sit at the
# same optical height as a word with neither ("QA"), which is how the
# existing tiles read.
GLYPH_CENTRE_Y = 233
GLYPH_MAX_W = 422
GLYPH_MAX_H = 162

LABEL_CENTRE_Y = 370
LABEL_SIZE = 18
LABEL_TRACKING = 5.8
LABEL_INK = (130, 143, 152)

LOCKUP_X = 44
MARK_H = 23
MARK_BASE_Y = 397
WORDMARK_X = 73
WORDMARK_SIZE = 12
WORDMARK_TRACKING = 1.8
WORDMARK_INK = (104, 112, 124)
WORDMARK_CENTRE_Y = 408

# Helvetica Bold, not Arial Bold: the two share advance widths but Helvetica
# reproduces the original set's glyph proportions to within 2px on both
# calibration tiles, and Arial does not.
BOLD = "/System/Library/Fonts/Helvetica.ttc"
BOLD_INDEX = 1


def bold(size):
    return ImageFont.truetype(BOLD, size, index=BOLD_INDEX)

# Accent palette. Named rather than inlined so two courses in the same family
# cannot drift apart by a shade nobody notices until they sit side by side.
GREEN = (47, 120, 66)        # Selenium
OCHRE = (166, 108, 20)       # manual QA
PY_BLUE = (48, 105, 152)     # Python
TS_BLUE = (43, 116, 191)     # TypeScript / Playwright
TEAL = (13, 132, 130)        # API / service layer
VIOLET = (98, 54, 160)       # agents
INDIGO = (79, 70, 190)       # LLM / evaluation
AMBER = (176, 98, 16)        # AI-assisted
ROSE = (183, 58, 92)         # vibe coding

# key -> (glyph, category label, accent). One line per glyph: the existing
# set has a few two-line marks ("Java / Full Stack") but the Testing & QA
# tiles these sit beside are all single-line, and that is what has to match.
TILES = {
    "selenium-python": ("Selenium Py", "Testing & QA", PY_BLUE),
    "playwright": ("Playwright", "Testing & QA", TS_BLUE),
    "api-testing": ("API", "Testing & QA", TEAL),
    "ai-assisted-testing": ("AI for QA", "Testing & QA", AMBER),
    "llm-rag-testing": ("LLM + RAG", "Testing & QA", INDIGO),
    "agentic-ai-testing": ("Agent QA", "Testing & QA", VIOLET),
    "vibe-coding": ("Vibe Coding", "AI & GenAI", ROSE),
}

# Already rendered by the original generator and shipped. Kept here because
# they are what this script was calibrated against — regenerate them only to
# check a change still round-trips, never as part of a normal run, since
# rewriting a shipped tile churns an immutable asset for no visible gain.
CALIBRATION = {
    "selenium": ("Selenium", "Testing & QA", GREEN),
    "software-testing": ("QA", "Testing & QA", OCHRE),
}


def logo_mark():
    """The Archer 'A' from public/images/logo.svg, white keyed to alpha."""
    src = open("public/images/logo.svg", encoding="utf-8").read()
    data = re.search(r"base64,([A-Za-z0-9+/=]+)", src).group(1)
    im = Image.open(io.BytesIO(base64.b64decode(data))).convert("RGBA")
    px = im.load()
    for y in range(im.height):
        for x in range(im.width):
            r, g, b, a = px[x, y]
            # The source is a flattened PNG on white; recover an alpha channel
            # from luminance so the mark sits on the tile's grey ground rather
            # than inside a white rectangle.
            if a == 0:
                continue
            lo = min(r, g, b)
            px[x, y] = (r, g, b, 255 - lo) if lo > 200 else (r, g, b, 255)
    bbox = im.getbbox()
    return im.crop(bbox)


def background(w, h, grid, accent):
    im = Image.new("RGB", (w, h))
    px = im.load()
    for y in range(h):
        for x in range(w):
            # Diagonal ramp, weighted toward the horizontal because that is
            # how the existing tiles read.
            t = (0.68 * x / w) + (0.32 * y / h)
            px[x, y] = tuple(
                round(BG_TL[i] + (BG_BR[i] - BG_TL[i]) * t) for i in range(3)
            )
    tint = tuple(round(c * 0.62 + 97) for c in accent)
    cx, cy, rr = BLOOM_CX * w, BLOOM_CY * h, BLOOM_R * w
    for y in range(h):
        dy = (y - cy) / rr
        for x in range(w):
            dx = (x - cx) / rr
            t = 1.0 - (dx * dx + dy * dy) ** 0.5
            if t <= 0:
                continue
            a = BLOOM_PEAK * t * t
            base = px[x, y]
            px[x, y] = tuple(
                round(base[i] + (tint[i] - base[i]) * a) for i in range(3)
            )

    lines = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(lines)
    ink = GRID_INK + (GRID_ALPHA,)
    step = grid
    for x in range(0, w + 1, step):
        d.line([(x, 0), (x, h)], fill=ink, width=max(1, SCALE // 2))
    for y in range(0, h + 1, step):
        d.line([(0, y), (w, y)], fill=ink, width=max(1, SCALE // 2))
    return Image.alpha_composite(im.convert("RGBA"), lines)


def tracked(draw, text, font, tracking, cap_centre_y, fill, centre_x=None, left_x=None):
    """Draw letterspaced text, centred on its cap-height box vertically.

    Horizontally either centred on `centre_x` or set from `left_x` — the
    category label is centred and the lockup wordmark is left-aligned to the
    mark, so both cases are needed.
    """
    widths = [draw.textlength(ch, font=font) for ch in text]
    total = sum(widths) + tracking * (len(text) - 1)
    cap = font.getbbox("H")
    y = cap_centre_y - (cap[1] + cap[3]) / 2
    x = left_x if left_x is not None else centre_x - total / 2
    for ch, wch in zip(text, widths):
        draw.text((x, y), ch, font=font, fill=fill)
        x += wch + tracking
    return total


def render(glyph, label, accent, mark):
    w, h = W * SCALE, H * SCALE
    im = background(w, h, GRID * SCALE, accent)
    d = ImageDraw.Draw(im)

    # Glyph: grow until the ink box hits either the measure or the height,
    # whichever binds first. "Selenium" is width-bound and "QA" is
    # height-bound, which is why both limits are needed.
    size = 8
    for probe in range(8, 320 * SCALE):
        box = bold(probe).getbbox(glyph)
        if box[2] - box[0] > GLYPH_MAX_W * SCALE or box[3] - box[1] > GLYPH_MAX_H * SCALE:
            break
        size = probe
    font = bold(size)
    box = font.getbbox(glyph)
    cap = font.getbbox("H")
    d.text(
        (w / 2 - (box[0] + box[2]) / 2,
         GLYPH_CENTRE_Y * SCALE - (cap[1] + cap[3]) / 2),
        glyph,
        font=font,
        fill=accent,
    )

    tracked(
        d,
        label.upper(),
        bold(LABEL_SIZE * SCALE),
        LABEL_TRACKING * SCALE,
        LABEL_CENTRE_Y * SCALE,
        LABEL_INK,
        centre_x=w / 2,
    )

    mh = MARK_H * SCALE
    mw = round(mark.width * mh / mark.height)
    im.alpha_composite(
        mark.resize((mw, mh), Image.LANCZOS), (LOCKUP_X * SCALE, MARK_BASE_Y * SCALE)
    )
    tracked(
        d,
        "ARCHER INFOTECH",
        bold(WORDMARK_SIZE * SCALE),
        WORDMARK_TRACKING * SCALE,
        WORDMARK_CENTRE_Y * SCALE,
        WORDMARK_INK,
        left_x=WORDMARK_X * SCALE,
    )
    return im.convert("RGB")


def main():
    wanted = sys.argv[1:] or list(TILES)
    catalogue = {**TILES, **CALIBRATION}
    mark = logo_mark()
    for key in wanted:
        glyph, label, accent = catalogue[key]
        im = render(glyph, label, accent, mark)
        out = im.resize((W, H), Image.LANCZOS)
        webp = f"public/images/courses/{key}-v1.webp"
        out.save(webp, "WEBP", quality=86, method=6)
        out.save(webp.replace(".webp", ".avif"), "AVIF", quality=62)
        print(f"  {key}-v1  {W}x{H}")


if __name__ == "__main__":
    main()
