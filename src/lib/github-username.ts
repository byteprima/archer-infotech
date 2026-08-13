/**
 * GitHub username parsing — pure, no server dependencies.
 *
 * Lives in its own module because both the server (which fetches the avatar)
 * and the alumni form (which enables its checkbox and previews the avatar as
 * you type) need it. Importing it from lib/storage/github-avatar.ts would
 * pull saveMedia — and therefore node:fs — into a client component.
 */
/**
 * GitHub's own username rule: alphanumerics and single hyphens, 1-39 chars,
 * no leading/trailing hyphen. Applied strictly because this value is
 * interpolated into a URL we then fetch server-side — a loose parse here is
 * an SSRF hole, not a cosmetic bug.
 */
const GITHUB_USERNAME = /^[A-Za-z0-9](?:[A-Za-z0-9]|-(?=[A-Za-z0-9])){0,38}$/;

/** Paths that look like usernames but are GitHub's own routes. */
const RESERVED = new Set([
  "about", "features", "pricing", "enterprise", "login", "join", "settings",
  "explore", "marketplace", "sponsors", "orgs", "topics", "collections",
  "events", "security", "team", "customer-stories", "readme", "search",
]);

/**
 * Extract the username from any reasonable GitHub profile URL, or null when
 * the input isn't one. Accepts bare usernames too, since people paste those.
 */
export function parseGithubUsername(input: string | null | undefined): string | null {
  if (!input) return null;
  const raw = input.trim();
  if (!raw) return null;

  let candidate = raw;
  if (/^https?:\/\//i.test(raw) || raw.startsWith("github.com")) {
    let url: URL;
    try {
      url = new URL(raw.startsWith("http") ? raw : `https://${raw}`);
    } catch {
      return null;
    }
    // Only github.com — never a look-alike host, since we fetch this.
    const host = url.hostname.toLowerCase().replace(/^www\./, "");
    if (host !== "github.com") return null;

    // Reject dot-segments in what the person actually typed. `new URL()`
    // resolves them away — "github.com/../../etc" normalises to
    // "github.com/etc" — so without this check the parser silently returns a
    // username nobody entered. Not a security hole (the fetch is pinned to
    // github.com either way), but reinterpreting input is worse than
    // refusing it.
    if (/(^|\/)\.\.?(\/|$)/.test(raw.replace(/^https?:\/\/[^/]+/i, ""))) {
      return null;
    }

    candidate = url.pathname.split("/").filter(Boolean)[0] ?? "";
  }

  candidate = candidate.replace(/^@/, "");
  if (!GITHUB_USERNAME.test(candidate)) return null;
  if (RESERVED.has(candidate.toLowerCase())) return null;
  return candidate;
}
