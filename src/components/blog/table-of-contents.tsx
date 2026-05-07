import type { TocItem } from "@/lib/blog/toc";

interface TableOfContentsProps {
  items: TocItem[];
  /**
   * Optional H2 label override. Default: "Table of Contents".
   */
  heading?: string;
}

/**
 * Server-rendered table of contents for long-form blog posts. Renders as
 * a semantic `<aside aria-label="Table of contents">` containing an
 * ordered list of anchor links into the post body. Pillar 5 P5-10.
 *
 * Why this matters:
 *   - Time-on-page increases when readers can jump to relevant sections.
 *   - Google occasionally pulls the TOC anchor list into the SERP as
 *     sitelinks.
 *   - The H2/H3 anchor IDs themselves are individually rankable.
 *
 * Visual treatment is intentionally compact — fits inline above the post
 * body without dominating the layout. H3s are nested under their parent
 * H2 with a half-step indent.
 */
export function TableOfContents({
  items,
  heading = "Table of Contents",
}: TableOfContentsProps) {
  if (items.length === 0) return null;

  return (
    <aside
      className="my-8 rounded-xl border border-border bg-muted/40 p-5 md:p-6"
      aria-label="Table of contents"
    >
      <h2 className="mb-3 text-base font-semibold text-foreground md:text-lg">
        {heading}
      </h2>
      <ol className="list-none space-y-1.5 p-0 text-sm">
        {items.map((item) => (
          <li
            key={item.id}
            className={item.level === 3 ? "ml-5" : undefined}
          >
            <a
              href={`#${item.id}`}
              className="text-muted-foreground hover:text-primary hover:underline"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </aside>
  );
}
