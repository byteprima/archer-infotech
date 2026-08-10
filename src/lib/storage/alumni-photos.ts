import "server-only";

import {
  saveMedia,
  readMedia,
  deleteMedia,
  mediaUrl,
  type SaveResult as MediaSaveResult,
} from "@/lib/storage/media";

/**
 * Alumni photo storage — now a thin adapter over lib/storage/media.ts.
 *
 * The volume-not-public reasoning this module established was correct and is
 * unchanged; it simply applies to every collection, so the implementation
 * moved to the shared module and this file keeps the alumni-specific API its
 * callers already use (the public /alumni form and the admin review actions).
 *
 * Storage location, URL shape and filenames are all identical to before, so
 * photos uploaded under the previous implementation continue to resolve.
 */

export type SaveResult =
  | { ok: true; filename: string }
  | { ok: false; error: string };

export async function saveAlumniPhoto(file: File): Promise<SaveResult> {
  const result: MediaSaveResult = await saveMedia(file, "alumni");
  return result.ok
    ? { ok: true, filename: result.filename }
    : { ok: false, error: result.error };
}

export async function readAlumniPhoto(
  rawName: string,
): Promise<{ data: Buffer; contentType: string } | null> {
  return readMedia("alumni", rawName);
}

export async function deleteAlumniPhoto(rawName: string): Promise<void> {
  return deleteMedia("alumni", rawName);
}

export function alumniPhotoUrl(filename: string): string {
  return mediaUrl("alumni", filename);
}
