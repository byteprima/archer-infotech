/**
 * Resolve a profile photo from a candidate's public profile links.
 *
 * PRIORITY IS LINKEDIN, THEN GITHUB — encoded here so the order is a fact
 * about the code and not a comment. `resolveProfileAvatar` tries LinkedIn
 * first and only falls through to GitHub when LinkedIn yields nothing.
 *
 * TODAY LINKEDIN ALWAYS YIELDS NOTHING, and that is not a bug to fix in this
 * file. LinkedIn publishes no URL from which a profile photo can be fetched:
 *
 *   - Profile photos sit behind authentication. There is no public pattern
 *     equivalent to github.com/<user>.png.
 *   - The only sanctioned route is LinkedIn Sign-In (OAuth 2.0) with the
 *     `profile` scope, which returns a `picture` claim. That requires a
 *     LinkedIn app, product approval, a redirect flow, and the candidate
 *     signing in — a different feature, not a fetch.
 *   - Scraping the public profile page is prohibited by LinkedIn's terms and
 *     is actively blocked (login walls, challenge pages, IP blocking). Code
 *     that did it would fail in production and expose the business to a
 *     terms complaint.
 *
 * So `fetchLinkedInAvatar` is a real function that honestly reports
 * unavailability, rather than a stub that pretends. When LinkedIn Sign-In is
 * built, it becomes the implementation of this function and the priority
 * order below starts working as written, with no other change.
 */
import { fetchGithubAvatar } from "@/lib/storage/github-avatar";
import { parseGithubUsername } from "@/lib/github-username";
import { isLinkedInProfileUrl } from "@/lib/linkedin-url";

export { isLinkedInProfileUrl };

export type AvatarSource = "linkedin" | "github";

export type ProfileAvatarResult =
  | { ok: true; filename: string; source: AvatarSource; label: string }
  | { ok: false; error: string };

/**
 * Always returns unavailable. See the module header — this is a documented
 * limitation of LinkedIn, not an unimplemented branch.
 */
async function fetchLinkedInAvatar(): Promise<ProfileAvatarResult> {
  return {
    ok: false,
    error:
      "LinkedIn doesn't allow photos to be fetched from a profile URL. Use your GitHub photo, or upload one.",
  };
}

/**
 * Try LinkedIn, then GitHub. Returns the first source that produces a stored
 * image, or an explanation of why neither did.
 */
export async function resolveProfileAvatar({
  linkedinUrl,
  githubUrl,
  collection = "alumni",
}: {
  linkedinUrl?: string | null;
  githubUrl?: string | null;
  /** Media collection the stored photo belongs to. */
  collection?: "alumni" | "placements";
}): Promise<ProfileAvatarResult> {
  if (isLinkedInProfileUrl(linkedinUrl)) {
    const viaLinkedIn = await fetchLinkedInAvatar();
    if (viaLinkedIn.ok) return viaLinkedIn;
    // Fall through to GitHub rather than failing outright — the candidate
    // gave us two links precisely so one can cover for the other.
  }

  if (parseGithubUsername(githubUrl)) {
    const viaGithub = await fetchGithubAvatar(githubUrl, collection);
    if (viaGithub.ok) {
      return {
        ok: true,
        filename: viaGithub.filename,
        source: "github",
        label: `github.com/${viaGithub.username}`,
      };
    }
    return viaGithub;
  }

  return {
    ok: false,
    error: isLinkedInProfileUrl(linkedinUrl)
      ? "LinkedIn doesn't allow photos to be fetched from a profile URL. Add your GitHub URL, or upload a photo."
      : "Add a GitHub profile URL to use your profile photo, or upload one.",
  };
}
