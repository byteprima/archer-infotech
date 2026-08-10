import { NextRequest } from "next/server";
import { readMedia } from "@/lib/storage/media";

/**
 * Serves uploaded media from the persistent volume (outside /public).
 * Path: /media/<collection>/<filename>.
 *
 * Replaces the collection-specific /media/alumni route so there is one code
 * path rather than one per collection. `readMedia` validates the collection
 * against an allow-list and reduces the filename to its basename, so neither
 * segment can be used to walk the filesystem.
 *
 * Filenames are random UUIDs, so a stored file never changes and the response
 * is safely immutable for a year. Cloudflare edge-caches it.
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ collection: string; file: string }> },
) {
  const { collection, file } = await params;
  const media = await readMedia(collection, file);

  if (!media) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(new Uint8Array(media.data), {
    status: 200,
    headers: {
      "Content-Type": media.contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
