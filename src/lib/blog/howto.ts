/**
 * HowTo-schema detection and step extraction for tutorial blog posts.
 * Pillar 8 P8-13.
 *
 * AI engines (and Google's Featured Snippet pipeline) heavily favour
 * `HowTo` JSON-LD because the structured steps are trivially
 * extractable into a numbered list response. The pillar 8 spec calls
 * out: "AI engines absolutely love HowTo schema. Featured Snippets
 * pull from it directly."
 *
 * Strategy: don't require the post author to opt in manually. Detect
 * tutorial / roadmap-style posts automatically by title + tag pattern,
 * and reuse the H2 anchors (already injected for the P5-10 table of
 * contents) as the HowTo step list. Posts that match get the schema for
 * free; posts that don't are unaffected.
 */
import { extractToc } from "@/lib/blog/toc";

/**
 * One step in a HowTo schema, anchored to the matching H2 in the post.
 * `url` is a hash anchor (e.g. `https://archerinfotech.in/blog/post-slug#step-1`)
 * that AI engines and Google can deep-link directly to.
 */
export interface HowToStep {
  position: number;
  name: string;
  /** Plain-text description (~1 sentence). Optional; defaults to step heading. */
  text?: string;
  /** Hash-anchor URL pointing at the matching H2 in the post body. */
  url: string;
}

/**
 * Decide whether a post should emit HowTo JSON-LD. Conservative — only
 * yes-pattern matches qualify so we don't accidentally tag opinion or
 * career-guide content as a step-by-step tutorial.
 *
 * Match rules (any one is enough):
 *   1. Title starts with "How to ..." (the canonical HowTo pattern).
 *   2. Title contains "guide" / "roadmap" / "step-by-step" / "tutorial".
 *   3. Tags include any of: "tutorial", "roadmap", "guide", "how to".
 */
export function shouldEmitHowTo(
  title: string | null | undefined,
  tags: string | null | undefined,
): boolean {
  if (!title) return false;
  const t = title.toLowerCase().trim();

  // Strongest signal — the literal "How to" prefix.
  if (/^how\s+to\b/.test(t)) return true;

  // Secondary title patterns that consistently map to step-by-step content.
  const titlePatterns = [
    /\b(road\s*map|roadmap)\b/,
    /\bstep[-\s]by[-\s]step\b/,
    /\btutorial\b/,
  ];
  if (titlePatterns.some((re) => re.test(t))) return true;

  // Tag-based match (covers cases where the title doesn't carry the cue
  // but the editor explicitly tagged the post as tutorial-format).
  if (tags) {
    const tagSet = new Set(
      tags.split(",").map((s) => s.trim().toLowerCase()),
    );
    if (
      tagSet.has("tutorial") ||
      tagSet.has("roadmap") ||
      tagSet.has("guide") ||
      tagSet.has("how to") ||
      tagSet.has("how-to")
    ) {
      return true;
    }
  }

  return false;
}

/**
 * Extract a HowTo step list from the post content. Reuses the same
 * H2/H3 walker that drives the P5-10 table of contents — H2s become
 * top-level steps; H3s are dropped (HowTo schema works best with a
 * flat numbered list, and Google's rich-result validator complains
 * about deeply nested steps).
 *
 * Returns an empty array when the post has fewer than 3 H2s — below
 * that there's not really a "step list" to mark up, and HowTo schema
 * requires meaningful structure to earn the rich result.
 */
export function extractHowToSteps(
  content: string,
  postUrl: string,
  /** Optional cap so monstrous posts don't pollute the schema. */
  maxSteps: number = 12,
): HowToStep[] {
  const toc = extractToc(content);
  const h2s = toc.filter((item) => item.level === 2);

  if (h2s.length < 3) return [];

  return h2s.slice(0, maxSteps).map((item, idx) => ({
    position: idx + 1,
    name: item.text,
    text: item.text,
    url: `${postUrl}#${item.id}`,
  }));
}

/**
 * Estimate a `totalTime` ISO 8601 duration from the post word count.
 * Reads at ~200 wpm (matches the P5-14 reading-time estimate so the
 * schema agrees with what humans see).
 */
export function estimateTotalTime(wordCount: number): string {
  const minutes = Math.max(1, Math.ceil(wordCount / 200));
  return `PT${minutes}M`;
}
