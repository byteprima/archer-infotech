import { marked } from "marked";
import { createHighlighter } from "shiki";
import { injectTocAnchors } from "@/lib/blog/toc";
import { addImageDimensions } from "@/lib/blog/image-dimensions";

interface BlogPostContentProps {
  content: string;
}

// Posts written in the admin TipTap editor are stored as HTML; posts inserted
// via the DB helpers are stored as markdown. Detect the former narrowly: it
// either opens with an HTML block element or closes one somewhere.
//
// The previous heuristic (/<[a-z][\s\S]*>/i) matched any `<` followed by a
// lowercase letter, so a single generic type in a code sample — `List<string>`,
// `Task<int>`, `VectorStoreCollection<string, SupportDoc>` — classified a whole
// markdown post as HTML and skipped `marked.parse()` entirely, emitting the raw
// markdown source. Caught on the .NET post, whose C# sample uses generics.
const HTML_BLOCK_TAGS = "p|div|h[1-6]|ul|ol|table|section|article|figure|blockquote|pre";

function isHtml(str: string): boolean {
  return (
    new RegExp(`^\\s*<(?:${HTML_BLOCK_TAGS}|img|hr|br)\\b`, "i").test(str) ||
    new RegExp(`</(?:${HTML_BLOCK_TAGS}|li)>`, "i").test(str)
  );
}

function decodeHtmlEntities(str: string): string {
  return str
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

// Cache the highlighter instance
let highlighterPromise: ReturnType<typeof createHighlighter> | null = null;

function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ["github-light"],
      langs: [
        "javascript",
        "typescript",
        "tsx",
        "jsx",
        "python",
        "java",
        "csharp",
        "sql",
        "bash",
        "dockerfile",
        "html",
        "css",
        "json",
        "yaml",
        "go",
        "rust",
        "c",
        "cpp",
      ],
    });
  }
  return highlighterPromise;
}

async function highlightCodeBlocks(html: string): Promise<string> {
  const highlighter = await getHighlighter();

  // Match <pre><code class="language-xxx">...</code></pre> or <pre><code>...</code></pre>
  const codeBlockRegex = /<pre><code(?:\s+class="language-(\w+)")?>([\s\S]*?)<\/code><\/pre>/g;

  const matches: {
    full: string;
    lang: string | undefined;
    code: string;
  }[] = [];

  let match;
  while ((match = codeBlockRegex.exec(html)) !== null) {
    matches.push({
      full: match[0],
      lang: match[1],
      code: decodeHtmlEntities(match[2]),
    });
  }

  let result = html;
  for (const m of matches) {
    const lang = m.lang || detectLanguage(m.code);
    try {
      const highlighted = highlighter.codeToHtml(m.code, {
        lang,
        theme: "github-light",
      });
      // Margin moved off the inner <pre> onto the wrapper container so the
      // Copy button doesn't overlap surrounding text when blocks stack.
      const styled = highlighted.replace(
        /style="([^"]*)"/,
        'style="$1;border-radius:0.5rem;padding:1.25rem;margin:0;overflow-x:auto;font-size:0.875rem;line-height:1.7;border:1px solid #d1d9e0"',
      );
      result = result.replace(m.full, wrapWithCopyButton(styled, m.code, lang));
    } catch {
      // Fallback: plain styled code block (still wrapped with Copy button)
      const fallbackStyle =
        "background-color:#f6f8fa;color:#24292f;border:1px solid #d1d9e0;border-radius:0.5rem;padding:1.25rem;margin:0;overflow-x:auto;font-size:0.875rem;line-height:1.7";
      const fallbackPre = `<pre style="${fallbackStyle}"><code>${m.code.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code></pre>`;
      result = result.replace(m.full, wrapWithCopyButton(fallbackPre, m.code, lang));
    }
  }

  return result;
}

/**
 * Wrap a Shiki-highlighted (or fallback) <pre> block in a positioned container
 * with a Copy button. The raw code is base64-encoded into a data attribute so
 * the client-side `code-copy-init` script can decode and write it to the
 * clipboard without HTML-escape ambiguity (handles backticks, quotes, angle
 * brackets in the code itself). Pillar 5 P5-11.
 */
function wrapWithCopyButton(preHtml: string, rawCode: string, lang: string): string {
  // This runs server-side during SSR, so Buffer is available; fall back to
  // btoa for any odd runtime that doesn't expose it.
  const encoded =
    typeof Buffer !== "undefined"
      ? Buffer.from(rawCode, "utf-8").toString("base64")
      : // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (globalThis as any).btoa(unescape(encodeURIComponent(rawCode)));

  return `<div class="archer-code-block" style="position:relative;margin:1.5rem 0">
  <button
    type="button"
    class="archer-code-copy"
    data-copy-code="${encoded}"
    data-lang="${lang}"
    aria-label="Copy code to clipboard"
    style="position:absolute;top:0.5rem;right:0.5rem;background:rgba(255,255,255,0.85);border:1px solid #d1d9e0;border-radius:0.375rem;padding:0.25rem 0.625rem;font-size:0.75rem;font-weight:500;color:#24292f;cursor:pointer;backdrop-filter:blur(4px);transition:all 0.15s ease;z-index:1"
  >Copy</button>
  ${preHtml}
</div>`;
}

function detectLanguage(code: string): string {
  const trimmed = code.trim();
  if (trimmed.startsWith("//") && /import|export|const|let|var|function|=>/.test(trimmed))
    return "typescript";
  if (trimmed.startsWith("#") && /FROM|RUN|COPY|CMD|WORKDIR|EXPOSE/.test(trimmed))
    return "dockerfile";
  if (/^(SELECT|INSERT|UPDATE|DELETE|CREATE|ALTER|DROP)\b/i.test(trimmed) || trimmed.startsWith("--"))
    return "sql";
  if (/^(def |class |import |from |print\(|if .*:$)/m.test(trimmed)) return "python";
  if (/^(public |private |class |System\.|import java)/m.test(trimmed)) return "java";
  if (/^(package |func |import \(|fmt\.)/m.test(trimmed)) return "go";
  if (/<[A-Z]\w+|className=|useState|useEffect|<\//.test(trimmed)) return "tsx";
  if (/require\(|module\.exports|console\.log/.test(trimmed)) return "javascript";
  return "typescript";
}

function cleanHtml(html: string): string {
  return html
    .replace(/<p>\s*<\/p>/g, "")
    .replace(/<code([^>]*)>\n/g, "<code$1>")
    .replace(/\n<\/code>/g, "</code>")
    // P3-22 — silently demote in-body H1 to H2. The blog page template
    // already renders the post title as the page-level H1; an `<h1>` in
    // marked-rendered body content yields multiple-H1 pages (caught by
    // the P3-22 SEO audit on /blog/getting-started-full-stack-development-2025).
    // Demoting at the renderer prevents recurrence on any future post
    // that accidentally uses a top-level `# heading` in its markdown.
    .replace(/<h1(\s[^>]*)?>([\s\S]*?)<\/h1>/g, "<h2$1>$2</h2>")
    // Give wide tables their own horizontal scroll instead of letting them
    // push the whole page sideways. `prose` sets `table { width: 100% }` but
    // never caps min-content width, so a comparison table with 5+ columns
    // overflows the article on a 375px phone and the *body* scrolls — the
    // page header and every paragraph drift with it. 17 posts already ship
    // markdown tables, so this is fixed at the renderer rather than per post.
    //
    // The wrapper carries no `not-prose`: the table must stay inside the prose
    // tree so the `prose-th:`/`prose-td:` border and padding variants keep
    // applying. `prose-table:w-full` still lets narrow tables fill the column —
    // CSS table layout treats a specified width below min-content as a floor,
    // so a wide table grows past the wrapper and scrolls inside it instead.
    .replace(
      /<table>([\s\S]*?)<\/table>/g,
      '<div class="overflow-x-auto"><table>$1</table></div>',
    );
}

export async function BlogPostContent({ content }: BlogPostContentProps) {
  const rawHtml = isHtml(content)
    ? content
    : (marked.parse(content, { async: false }) as string);

  const cleaned = cleanHtml(rawHtml);
  // Inject id="<slug>" onto every H2/H3 so the table-of-contents anchor
  // links resolve. Slug logic is shared with extractToc() in
  // src/lib/blog/toc.ts so the IDs match one-to-one. P5-10.
  const withAnchors = injectTocAnchors(cleaned);
  // Inline <img> tags come straight from the stored post body, so they
  // carry no dimensions and shift the layout as each diagram loads.
  const htmlContent = addImageDimensions(await highlightCodeBlocks(withAnchors));

  return (
    <div
      className="prose prose-lg max-w-none
        prose-headings:font-bold prose-headings:text-foreground
        prose-h1:text-3xl prose-h1:mt-8 prose-h1:mb-4
        prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
        prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
        prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:my-4
        prose-a:text-primary prose-a:no-underline hover:prose-a:underline
        prose-strong:text-foreground prose-strong:font-semibold
        prose-ul:text-muted-foreground prose-ul:my-4
        prose-ol:text-muted-foreground prose-ol:my-4
        prose-li:my-1
        prose-blockquote:border-l-primary prose-blockquote:bg-muted/50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg
        prose-img:rounded-lg prose-img:shadow-md
        prose-hr:border-border prose-hr:my-8
        prose-table:border-collapse prose-table:w-full prose-table:my-6
        prose-th:border prose-th:border-border prose-th:bg-muted prose-th:px-4 prose-th:py-2 prose-th:text-left prose-th:font-semibold prose-th:text-foreground
        prose-td:border prose-td:border-border prose-td:px-4 prose-td:py-2 prose-td:text-muted-foreground"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}
