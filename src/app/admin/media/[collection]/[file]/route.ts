import { NextRequest } from "next/server";

import { requireAdminPage } from "@/lib/admin";
import { readMedia } from "@/lib/storage/media";

/**
 * Admin-authenticated media route. The only way to read a private
 * collection — currently `offer-letters`, the evidence attached to a public
 * placement submission.
 *
 * The public /media route refuses private collections outright, so this is
 * not a second door onto the same thing: it is the only door. Filenames are
 * random UUIDs, but an unguessable URL is obscurity, not access control, and
 * these documents carry an employer, a salary and a person's name.
 *
 * No caching. A private document should not sit in a shared cache, and
 * Cloudflare must not hold a copy it could serve to an unauthenticated
 * request.
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ collection: string; file: string }> },
) {
  await requireAdminPage();

  const { collection, file } = await params;
  const media = await readMedia(collection, file);

  if (!media) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(new Uint8Array(media.data), {
    status: 200,
    headers: {
      "Content-Type": media.contentType,
      "Cache-Control": "private, no-store",
      // Render in the browser rather than forcing a download, so a reviewer
      // can glance at the letter without saving it to disk.
      "Content-Disposition": `inline; filename="${file.replace(/[^\w.-]/g, "")}"`,
    },
  });
}
