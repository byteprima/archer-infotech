/**
 * Fetch an alumnus's GitHub avatar and store it as a managed upload.
 *
 * WHY GITHUB AND NOT LINKEDIN: GitHub publishes avatars at a stable,
 * unauthenticated URL (`github.com/<user>.png`), so this needs no API key,
 * no OAuth and no scraping. LinkedIn has no equivalent — profile photos are
 * behind authentication, there is no public URL pattern, and fetching them
 * programmatically means either scraping (which their terms prohibit and
 * which they actively block) or a full LinkedIn Sign-In OAuth integration
 * with an approved app. The form therefore offers the checkbox for GitHub
 * only; the LinkedIn field stays a plain URL for verification by a human.
 *
 * The avatar is COPIED onto our own volume rather than hot-linked. Storing
 * `github.com/<user>.png` as the photo URL would mean the image breaks if
 * the alumnus renames or deletes their account, changes silently if they
 * swap their avatar, and leaks a request to GitHub from every visitor who
 * loads a testimonial. A copy is a copy.
 */
import { saveMedia, type SaveResult } from "@/lib/storage/media";
import { parseGithubUsername } from "@/lib/github-username";

export type GithubAvatarResult =
  | { ok: true; filename: string; username: string }
  | { ok: false; error: string };

/** Cap independent of MEDIA_MAX_BYTES — avatars are small; anything larger is suspect. */
const AVATAR_MAX_BYTES = 2 * 1024 * 1024;

/**
 * Fetch the avatar for a GitHub profile URL and store it in the `alumni`
 * collection. Returns a user-facing message on every failure path so the
 * form can explain what went wrong rather than silently dropping the photo.
 */
export async function fetchGithubAvatar(
  profileUrl: string | null | undefined,
): Promise<GithubAvatarResult> {
  const username = parseGithubUsername(profileUrl);
  if (!username) {
    return { ok: false, error: "That doesn't look like a GitHub profile URL." };
  }

  // ?size=400 keeps the payload small; the avatar is only ever rendered as a
  // thumbnail. GitHub serves this unauthenticated and redirects to its CDN.
  const url = `https://github.com/${username}.png?size=400`;

  let resp: Response;
  try {
    resp = await fetch(url, {
      redirect: "follow",
      signal: AbortSignal.timeout(10_000),
      headers: { "User-Agent": "archerinfotech.in alumni form" },
    });
  } catch {
    return { ok: false, error: "Couldn't reach GitHub just now. Upload a photo instead." };
  }

  if (resp.status === 404) {
    return { ok: false, error: `No public GitHub profile found for "${username}".` };
  }
  if (!resp.ok) {
    return { ok: false, error: "GitHub didn't return an image. Upload a photo instead." };
  }

  const type = (resp.headers.get("content-type") ?? "").split(";")[0].trim().toLowerCase();
  if (!type.startsWith("image/")) {
    return { ok: false, error: "GitHub didn't return an image. Upload a photo instead." };
  }

  const buf = await resp.arrayBuffer();
  if (buf.byteLength === 0) {
    return { ok: false, error: "GitHub returned an empty image. Upload a photo instead." };
  }
  if (buf.byteLength > AVATAR_MAX_BYTES) {
    return { ok: false, error: "That GitHub avatar is unusually large. Upload a photo instead." };
  }

  // Hand off to the same validation and storage path a manual upload takes,
  // so there is one place that decides what is an acceptable image and where
  // it lives. `type` is normalised to a bare MIME so saveMedia's allow-list
  // matches (GitHub can return e.g. "image/jpeg; charset=utf-8").
  const file = new File([buf], `${username}.${type === "image/png" ? "png" : "jpg"}`, {
    type: type === "image/png" ? "image/png" : "image/jpeg",
  });
  const saved: SaveResult = await saveMedia(file, "alumni");
  if (!saved.ok) return { ok: false, error: saved.error };

  return { ok: true, filename: saved.filename, username };
}
