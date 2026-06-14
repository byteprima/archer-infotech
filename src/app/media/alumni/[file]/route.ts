import { NextRequest } from "next/server";
import { readAlumniPhoto } from "@/lib/storage/alumni-photos";

/**
 * Serves alumni photos stored on the persistent volume (outside /public).
 * Path: /media/alumni/<filename>. Long cache + immutable since filenames
 * are content-unique UUIDs; Cloudflare edge-caches the response.
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ file: string }> }
) {
  const { file } = await params;
  const photo = await readAlumniPhoto(file);

  if (!photo) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(new Uint8Array(photo.data), {
    status: 200,
    headers: {
      "Content-Type": photo.contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
