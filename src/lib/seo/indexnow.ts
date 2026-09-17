import { siteConfig } from "@/data/site-config";

/**
 * IndexNow submission.
 *
 * The key file has been live at public/<key>.txt since June 2026 and an
 * external Python helper could submit URLs by hand — but nothing in the
 * application itself ever called IndexNow. Three months of publishes went
 * unsubmitted because the only trigger was somebody remembering to run a
 * script. This is that trigger, moved into the publish path.
 *
 * Deliberately fire-and-forget: a search-engine ping must never fail, slow or
 * roll back the publish that caused it. Every error is swallowed and logged.
 */

/** Matches the filename in public/ — the file's contents are the key itself. */
const INDEXNOW_KEY = "9ee650e7a2b95153cbdd1299263a559f9def610c";

const ENDPOINT = "https://api.indexnow.org/IndexNow";

function host(): string {
  return new URL(siteConfig.url).host;
}

/**
 * Tell IndexNow that these URLs changed.
 *
 * Accepts paths ("/blog/x") or absolute URLs. Bing, Yandex, Seznam and Naver
 * share the protocol, so one call reaches all of them; Google does not
 * participate and still needs its own Indexing API.
 *
 * Skipped outside production: submitting localhost URLs to a live endpoint
 * would be noise at best and a wrong-host rejection at worst.
 */
export async function submitToIndexNow(urls: string[]): Promise<void> {
  if (process.env.NODE_ENV !== "production") return;
  if (urls.length === 0) return;

  const urlList = urls
    .map((u) => (u.startsWith("http") ? u : `${siteConfig.url}${u}`))
    .filter((u) => u.startsWith(siteConfig.url))
    .slice(0, 10_000); // protocol cap per submission

  if (urlList.length === 0) return;

  try {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: host(),
        key: INDEXNOW_KEY,
        keyLocation: `${siteConfig.url}/${INDEXNOW_KEY}.txt`,
        urlList,
      }),
      // A publish must not wait on a search engine.
      signal: AbortSignal.timeout(5_000),
    });
    if (!response.ok) {
      console.error(`IndexNow returned ${response.status} for ${urlList.length} URL(s)`);
    }
  } catch (error) {
    console.error("IndexNow submission failed:", error);
  }
}
