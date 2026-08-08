import { readFileSync } from "fs";
import path from "path";

/**
 * Add intrinsic width/height to inline <img> tags in blog HTML.
 *
 * Blog bodies are authored as markdown/HTML in the database and injected with
 * dangerouslySetInnerHTML, so images inside a post never go through
 * next/image and ship with no dimensions. The browser then cannot reserve
 * space before the file downloads, which is a Cumulative Layout Shift on
 * every post carrying a diagram.
 *
 * Dimensions are read straight from the file header — no dependency, and
 * only for site-local paths under /public. Anything remote, already
 * dimensioned, or unreadable is left exactly as it was.
 *
 * Results are memoised per path: this runs inside a server component, and a
 * post's images do not change between renders.
 */

const cache = new Map<string, { width: number; height: number } | null>();

/** Minimal header parsers for the formats actually used on the site. */
function readDimensions(abs: string): { width: number; height: number } | null {
  const buf = readFileSync(abs);

  // PNG — IHDR is always the first chunk: 8-byte signature, 4 length,
  // 4 "IHDR", then width and height as big-endian uint32.
  if (buf.length > 24 && buf.toString("ascii", 12, 16) === "IHDR") {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  }

  // GIF — little-endian uint16 pair at byte 6.
  if (buf.length > 10 && buf.toString("ascii", 0, 3) === "GIF") {
    return { width: buf.readUInt16LE(6), height: buf.readUInt16LE(8) };
  }

  // JPEG — walk the segment chain to the SOFn frame header.
  if (buf.length > 4 && buf[0] === 0xff && buf[1] === 0xd8) {
    let off = 2;
    while (off + 9 < buf.length) {
      if (buf[off] !== 0xff) {
        off += 1;
        continue;
      }
      const marker = buf[off + 1];
      // SOF0-SOF15, excluding the non-frame markers DHT/JPG/DAC.
      if (marker >= 0xc0 && marker <= 0xcf &&
          marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
        return { width: buf.readUInt16BE(off + 7), height: buf.readUInt16BE(off + 5) };
      }
      off += 2 + buf.readUInt16BE(off + 2);
    }
  }

  return null;
}

function lookup(src: string): { width: number; height: number } | null {
  if (cache.has(src)) return cache.get(src)!;
  let result: { width: number; height: number } | null = null;
  try {
    // Only site-local paths, and never escape /public.
    const clean = src.split("?")[0].split("#")[0];
    const abs = path.join(process.cwd(), "public", clean);
    if (abs.startsWith(path.join(process.cwd(), "public"))) {
      result = readDimensions(abs);
    }
  } catch {
    result = null; // missing or unreadable file — leave the tag untouched
  }
  cache.set(src, result);
  return result;
}

export function addImageDimensions(html: string): string {
  return html.replace(/<img\b[^>]*>/gi, (tag) => {
    if (/\bwidth\s*=/i.test(tag) && /\bheight\s*=/i.test(tag)) return tag;
    const m = /\bsrc\s*=\s*["']([^"']+)["']/i.exec(tag);
    if (!m || !m[1].startsWith("/")) return tag;
    const dims = lookup(m[1]);
    if (!dims) return tag;
    const extras =
      ` width="${dims.width}" height="${dims.height}"` +
      (/\bloading\s*=/i.test(tag) ? "" : ' loading="lazy"') +
      (/\bdecoding\s*=/i.test(tag) ? "" : ' decoding="async"');
    return tag.replace(/\s*\/?>$/, `${extras}>`);
  });
}
