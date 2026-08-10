import "server-only";

import { mkdir, readFile, writeFile, unlink } from "fs/promises";
import { existsSync } from "fs";
import { dirname, join, basename, extname } from "path";
import { randomUUID } from "crypto";

/**
 * General media storage on the persistent volume.
 *
 * Generalised from lib/storage/alumni-photos.ts, which already solved this
 * correctly for one collection. The reasoning it established holds for every
 * collection, so it is restated here rather than left in one file:
 *
 *   `public/` is baked into the Docker image at build time and wiped on every
 *   deploy. Anything uploaded there disappears. Worse, adding an image would
 *   mean a git commit and a full rebuild — around 55 minutes on this project.
 *   Putting images on 300+ pages that way is not a workflow anyone will follow.
 *
 * So files live beside the SQLite database on the mounted volume, survive
 * redeploys exactly as the database does, and are served back through
 * /media/<collection>/<filename> — same origin, so no extra DNS or TLS
 * handshake in the critical path, and Cloudflare edge-caches it for free.
 *
 * Filenames are random UUIDs, so the served response is safely immutable and
 * cacheable for a year.
 */

/**
 * Collections are a fixed allow-list, not free-form strings.
 *
 * The collection segment becomes a directory name and arrives from a route
 * parameter on read. Constraining it to known values means a crafted request
 * cannot walk the filesystem even if the basename guard below were bypassed.
 */
export const MEDIA_COLLECTIONS = [
  "alumni",
  "placements",
  "courses",
  "trainers",
  "blog",
  "testimonials",
  "general",
] as const;

export type MediaCollection = (typeof MEDIA_COLLECTIONS)[number];

export function isMediaCollection(value: string): value is MediaCollection {
  return (MEDIA_COLLECTIONS as readonly string[]).includes(value);
}

/** Accepted upload types + size cap, enforced server-side. */
export const MEDIA_MAX_BYTES = 5 * 1024 * 1024; // 5 MB
export const MEDIA_ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
};

const EXT_CONTENT_TYPE: Record<string, string> = {
  jpg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  avif: "image/avif",
};

/** <volume>/uploads/<collection> — sibling of the SQLite file. */
function uploadsDir(collection: MediaCollection): string {
  const dbPath = process.env.DATABASE_URL || "./sqlite.db";
  const dataDir = dirname(dbPath);
  return join(dataDir, "uploads", collection);
}

export type SaveResult =
  | { ok: true; filename: string; url: string }
  | { ok: false; error: string };

/**
 * Validate and persist an uploaded image. Returns the stored filename and the
 * public URL to record on the row, or a message safe to show the uploader.
 */
export async function saveMedia(
  file: File,
  collection: MediaCollection,
): Promise<SaveResult> {
  const ext = MEDIA_ALLOWED_TYPES[file.type];
  if (!ext) {
    return { ok: false, error: "Image must be a JPG, PNG, WebP or AVIF file." };
  }
  if (file.size > MEDIA_MAX_BYTES) {
    return { ok: false, error: "Image must be 5 MB or smaller." };
  }
  if (file.size === 0) {
    return { ok: false, error: "That file is empty." };
  }

  const dir = uploadsDir(collection);
  if (!existsSync(dir)) {
    await mkdir(dir, { recursive: true });
  }

  const filename = `${randomUUID()}.${ext}`;
  try {
    await writeFile(join(dir, filename), Buffer.from(await file.arrayBuffer()));
  } catch {
    // Disk was 87% full when this was written. A failed write must surface as
    // a handled error the admin can act on, not an unhandled server exception.
    return { ok: false, error: "Could not save the image. Please try again." };
  }
  return { ok: true, filename, url: mediaUrl(collection, filename) };
}

/**
 * Read a stored file for serving. Guards path traversal two ways: the
 * collection is checked against the allow-list, and the filename is reduced to
 * its basename with an expected extension.
 */
export async function readMedia(
  collection: string,
  rawName: string,
): Promise<{ data: Buffer; contentType: string } | null> {
  if (!isMediaCollection(collection)) return null;

  const filename = basename(rawName);
  const ext = extname(filename).slice(1).toLowerCase();
  const contentType = EXT_CONTENT_TYPE[ext];
  if (!contentType) return null;

  const filePath = join(uploadsDir(collection), filename);
  if (!existsSync(filePath)) return null;

  try {
    return { data: await readFile(filePath), contentType };
  } catch {
    return null;
  }
}

/** Best-effort delete, e.g. when a row is removed or its image replaced. */
export async function deleteMedia(
  collection: MediaCollection,
  rawName: string,
): Promise<void> {
  try {
    const filePath = join(uploadsDir(collection), basename(rawName));
    if (existsSync(filePath)) await unlink(filePath);
  } catch {
    /* non-fatal — an orphaned file is not worth failing a delete over */
  }
}

/** Public URL for a stored file. */
export function mediaUrl(collection: MediaCollection, filename: string): string {
  return `/media/${collection}/${filename}`;
}

/**
 * True when a stored value is one of our media URLs rather than an external
 * one. Existing rows hold absolute URLs and `/images/...` paths from the
 * build-time public directory, and both must keep working — so callers use
 * this to decide whether deleteMedia applies, instead of assuming.
 */
export function isManagedMediaUrl(value: string | null | undefined): boolean {
  return typeof value === "string" && value.startsWith("/media/");
}
