/**
 * LinkedIn profile URL recognition — pure, no server dependencies.
 *
 * In its own module for the same reason as github-username.ts: the client
 * form needs it to decide what to show, and importing it from
 * lib/storage/profile-avatar.ts would pull that module's transitive
 * dependency on saveMedia — and therefore node:fs — into a client bundle.
 * That exact mistake broke the build once; hence the separation.
 */

/** True when the URL is a plausible LinkedIn member profile. */
export function isLinkedInProfileUrl(input: string | null | undefined): boolean {
  if (!input) return false;
  const raw = input.trim();
  if (!raw) return false;
  try {
    const url = new URL(raw.startsWith("http") ? raw : `https://${raw}`);
    const host = url.hostname.toLowerCase().replace(/^www\./, "");
    return (
      (host === "linkedin.com" || host.endsWith(".linkedin.com")) &&
      /\/(in|pub)\/[^/]+/.test(url.pathname)
    );
  } catch {
    return false;
  }
}
