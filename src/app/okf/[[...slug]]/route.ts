/**
 * Serves the Archer Infotech OKF (Open Knowledge Format) bundle as a
 * directory of Markdown files, generated on the fly from the canonical data
 * (src/lib/okf/bundle.ts). This is the published, portable OKF artifact:
 *
 *   GET /okf            → index.md (table of contents)
 *   GET /okf/index.md   → index.md
 *   GET /okf/<id>.md    → that concept (e.g. /okf/courses/<slug>.md)
 *
 * The same bundle grounds the website chatbot (/api/chat), so external agents
 * and the bot read one source of truth. OKF v0.1 spec:
 *   https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md
 */

import { buildOkfDocs, renderOkfDoc, renderIndex } from "@/lib/okf/bundle";

export const dynamic = "force-static";

// Stable build-time stamp keeps the served bundle deterministic (cache-friendly).
const BUNDLE_TS = process.env.OKF_TIMESTAMP || "2026-06-16T00:00:00.000Z";

function markdown(body: string, status = 200): Response {
  return new Response(body, {
    status,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}

export async function GET(_req: Request, ctx: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await ctx.params;
  const docs = buildOkfDocs(BUNDLE_TS);

  const path = (slug ?? []).join("/");
  if (path === "" || path === "index.md") {
    return markdown(renderIndex(docs, BUNDLE_TS));
  }

  const id = path.replace(/\.md$/, "");
  const doc = docs.find((d) => d.id === id);
  if (!doc) {
    return markdown(`# Not found\n\nNo OKF concept at \`${id}\`. See /okf/index.md.\n`, 404);
  }
  return markdown(renderOkfDoc(doc));
}
