import "server-only";

import { mkdir, readFile, writeFile, unlink } from "fs/promises";
import { existsSync } from "fs";
import { dirname, join, basename, extname } from "path";
import { randomUUID } from "crypto";
import {
  ALUMNI_PHOTO_ALLOWED_TYPES,
  ALUMNI_PHOTO_MAX_BYTES,
} from "@/lib/alumni/constants";

/**
 * Alumni photo storage on the same persistent volume as the SQLite DB.
 *
 * `DATABASE_URL` points at <volume>/data/sqlite.db (or "./sqlite.db" in
 * local dev). We store uploads in a sibling `uploads/alumni/` directory so
 * they survive Coolify redeploys exactly like the database does. Files are
 * served back through the route handler at `/media/alumni/<filename>`,
 * which Cloudflare can edge-cache.
 *
 * Photos are deliberately NOT written under `public/` — that directory is
 * baked into the image at build time and is wiped on every deploy.
 */
function uploadsDir(): string {
  const dbPath = process.env.DATABASE_URL || "./sqlite.db";
  const dataDir = dirname(dbPath); // e.g. /data/.../data  (or ".")
  return join(dataDir, "uploads", "alumni");
}

const EXT_CONTENT_TYPE: Record<string, string> = {
  jpg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
};

export type SaveResult =
  | { ok: true; filename: string }
  | { ok: false; error: string };

/**
 * Validate and persist an uploaded photo. Returns the opaque stored
 * filename (e.g. "9f3c…-…webp") to record on the alumni row, or an error
 * message safe to show the submitter.
 */
export async function saveAlumniPhoto(file: File): Promise<SaveResult> {
  const ext = ALUMNI_PHOTO_ALLOWED_TYPES[file.type];
  if (!ext) {
    return { ok: false, error: "Photo must be a JPG, PNG, or WebP image." };
  }
  if (file.size > ALUMNI_PHOTO_MAX_BYTES) {
    return { ok: false, error: "Photo must be 5 MB or smaller." };
  }

  const dir = uploadsDir();
  if (!existsSync(dir)) {
    await mkdir(dir, { recursive: true });
  }

  const filename = `${randomUUID()}.${ext}`;
  const bytes = Buffer.from(await file.arrayBuffer());
  await writeFile(join(dir, filename), bytes);
  return { ok: true, filename };
}

/**
 * Read a stored photo for serving. Guards against path traversal by
 * stripping to the basename and refusing unexpected extensions.
 */
export async function readAlumniPhoto(
  rawName: string
): Promise<{ data: Buffer; contentType: string } | null> {
  const filename = basename(rawName);
  const ext = extname(filename).slice(1).toLowerCase();
  const contentType = EXT_CONTENT_TYPE[ext];
  if (!contentType) return null;

  const filePath = join(uploadsDir(), filename);
  if (!existsSync(filePath)) return null;

  try {
    const data = await readFile(filePath);
    return { data, contentType };
  } catch {
    return null;
  }
}

/** Best-effort delete (e.g. when a submission is rejected/removed). */
export async function deleteAlumniPhoto(rawName: string): Promise<void> {
  try {
    const filePath = join(uploadsDir(), basename(rawName));
    if (existsSync(filePath)) await unlink(filePath);
  } catch {
    /* non-fatal */
  }
}

/** Public URL path for a stored photo filename. */
export function alumniPhotoUrl(filename: string): string {
  return `/media/alumni/${filename}`;
}
