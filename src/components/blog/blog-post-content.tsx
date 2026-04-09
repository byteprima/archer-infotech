import { marked } from "marked";
import { createHighlighter } from "shiki";

interface BlogPostContentProps {
  content: string;
}

function isHtml(str: string): boolean {
  return /<[a-z][\s\S]*>/i.test(str);
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
      // Merge custom styles into Shiki's existing style attribute
      const styled = highlighted.replace(
        /style="([^"]*)"/,
        'style="$1;border-radius:0.5rem;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;font-size:0.875rem;line-height:1.7;border:1px solid #d1d9e0"'
      );
      result = result.replace(m.full, styled);
    } catch {
      // Fallback: plain styled code block
      const fallbackStyle =
        "background-color:#f6f8fa;color:#24292f;border:1px solid #d1d9e0;border-radius:0.5rem;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;font-size:0.875rem;line-height:1.7";
      result = result.replace(
        m.full,
        `<pre style="${fallbackStyle}"><code>${m.code.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code></pre>`
      );
    }
  }

  return result;
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
    .replace(/\n<\/code>/g, "</code>");
}

export async function BlogPostContent({ content }: BlogPostContentProps) {
  const rawHtml = isHtml(content)
    ? content
    : (marked.parse(content, { async: false }) as string);

  const cleaned = cleanHtml(rawHtml);
  const htmlContent = await highlightCodeBlocks(cleaned);

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
