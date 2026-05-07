/**
 * Table-of-contents extraction for long-form blog posts. P5-10.
 *
 * Two responsibilities:
 *   1. extractToc(content)  — produce a [{ id, text, level }] list of H2/H3
 *      headings the page can render as anchor links.
 *   2. injectTocAnchors(html) — inject matching `id="<slug>"` attributes
 *      onto every H2/H3 in the rendered HTML so the anchor links resolve.
 *
 * Both functions accept either raw markdown (the common case for the
 * placeholder/CMS-stored content) or pre-rendered HTML. The slug logic is
 * shared between them so the IDs always line up.
 *
 * Word-count helper feeds the "should this post show a TOC" gate — pillar
 * 5 recommends a TOC only on posts of 1,500+ words; below that the TOC
 * adds visual noise without UX upside.
 */

export interface TocItem {
  /** DOM id used both as anchor target and as href in the TOC list. */
  id: string;
  /** Visible heading text, with markdown stripped. */
  text: string;
  /** 2 for H2, 3 for H3. We only surface these two levels. */
  level: 2 | 3;
}

/**
 * Slugify a heading text. Lowercase, trim, collapse non-alphanumerics to
 * single hyphens, deduplicate adjacent hyphens. Matches the algorithm
 * GitHub uses for markdown anchors so any third-party tooling pointing
 * at the same headings will continue to work.
 */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/**
 * Strip basic markdown formatting (bold, italic, inline code, links) so
 * the heading text in the TOC reads cleanly. Doesn't try to be a full
 * markdown parser — only handles what realistically appears in a post
 * heading.
 */
function stripInlineMarkdown(text: string): string {
  return text
    .replace(/`([^`]+)`/g, "$1") // inline code
    .replace(/\*\*([^*]+)\*\*/g, "$1") // bold
    .replace(/__([^_]+)__/g, "$1") // bold (alt)
    .replace(/\*([^*]+)\*/g, "$1") // italic
    .replace(/_([^_]+)_/g, "$1") // italic (alt)
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // links
    .replace(/<[^>]+>/g, "") // any stray inline HTML
    .trim();
}

function isHtml(content: string): boolean {
  return /<[a-z][\s\S]*>/i.test(content);
}

/**
 * Build a [{ id, text, level }] list from post content. Accepts either
 * markdown or HTML — markdown headings (`## ...`, `### ...`) are matched
 * line-by-line; HTML headings (<h2>, <h3>) are matched via tag pattern.
 *
 * Duplicate slugs are auto-suffixed with `-2`, `-3`, etc. so two
 * identically-named headings don't collide on the same anchor.
 */
export function extractToc(content: string): TocItem[] {
  const items: { text: string; level: 2 | 3 }[] = [];

  if (isHtml(content)) {
    const re = /<h([23])(?:\s[^>]*)?>([\s\S]*?)<\/h\1>/gi;
    let m: RegExpExecArray | null;
    while ((m = re.exec(content)) !== null) {
      const level = Number(m[1]) as 2 | 3;
      items.push({ text: stripInlineMarkdown(m[2]), level });
    }
  } else {
    for (const line of content.split("\n")) {
      const md = /^(#{2,3})\s+(.+?)\s*#*\s*$/.exec(line);
      if (md) {
        const level = md[1].length as 2 | 3;
        items.push({ text: stripInlineMarkdown(md[2]), level });
      }
    }
  }

  const seen = new Map<string, number>();
  return items.map(({ text, level }) => {
    const base = slugify(text);
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    const id = count === 0 ? base : `${base}-${count + 1}`;
    return { id, text, level };
  });
}

/**
 * Inject `id="<slug>"` attributes into every H2/H3 in a rendered HTML
 * string so the TOC anchor links resolve. Idempotent — headings that
 * already carry an `id` attribute are left untouched.
 *
 * Uses the same slug + dedup logic as extractToc() so the IDs match
 * one-to-one with the rendered TOC.
 */
export function injectTocAnchors(html: string): string {
  const seen = new Map<string, number>();
  return html.replace(
    /<(h[23])((?:\s[^>]*)?)>([\s\S]*?)<\/\1>/gi,
    (full, tag: string, attrs: string, inner: string) => {
      // Already has an id — leave as-is so user-set anchors still win.
      if (/\sid\s*=/i.test(attrs)) return full;

      const text = stripInlineMarkdown(inner);
      if (!text) return full;

      const base = slugify(text);
      const count = seen.get(base) ?? 0;
      seen.set(base, count + 1);
      const id = count === 0 ? base : `${base}-${count + 1}`;

      // Insert id as the first attribute, preserving any existing attrs
      // (class, role, etc.).
      return `<${tag} id="${id}"${attrs}>${inner}</${tag}>`;
    },
  );
}

/**
 * Approximate word count of a markdown / HTML content blob. Used to
 * decide whether a post is long enough to warrant a TOC (pillar 5
 * threshold: 1,500 words).
 */
export function approximateWordCount(content: string): number {
  const stripped = content
    .replace(/<[^>]+>/g, " ") // HTML tags
    .replace(/```[\s\S]*?```/g, " ") // fenced code blocks
    .replace(/`[^`]+`/g, " "); // inline code
  return stripped.split(/\s+/).filter(Boolean).length;
}
