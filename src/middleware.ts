import { NextRequest, NextResponse } from "next/server";

// Legacy WordPress query keys. Any URL bearing one of these is a WP-era artifact:
// - p / page_id  → permalink shortcuts
// - cat / tag / author / m → archive views
// - s            → WP search
// All redirect to the clean path with WP keys stripped.
const WP_QUERY_KEYS = ["p", "page_id", "cat", "tag", "author", "m", "s"];

// /?feed=* served the WP RSS feed. We have no RSS, so return 410 Gone to deindex.
const WP_FEED_KEY = "feed";

// WordPress placeholder pages that were never real content. Return 410 Gone so
// Google permanently deindexes them, rather than 404 (which keeps them in the
// crawl queue).
const WP_GONE_PATHS = new Set<string>(["/sample-page", "/sample-page/"]);

export function middleware(request: NextRequest) {
  const { searchParams, pathname, origin } = request.nextUrl;

  if (WP_GONE_PATHS.has(pathname)) {
    return new NextResponse(null, { status: 410 });
  }

  // /courses?category=X → /courses/X (legacy indexed URLs only — in-page filter
  // navigation is client-side and does not hit middleware, so the filter UX is
  // preserved).
  if (pathname === "/courses" && searchParams.has("category")) {
    const category = searchParams.get("category");
    if (category) {
      const target = new URL(`/courses/${category}`, origin);
      return NextResponse.redirect(target, 301);
    }
  }

  if (searchParams.has(WP_FEED_KEY)) {
    return new NextResponse(null, { status: 410 });
  }

  const hasWpKey = WP_QUERY_KEYS.some((key) => searchParams.has(key));
  if (hasWpKey) {
    const cleanUrl = new URL(pathname, origin);
    searchParams.forEach((value, key) => {
      if (!WP_QUERY_KEYS.includes(key)) {
        cleanUrl.searchParams.set(key, value);
      }
    });
    return NextResponse.redirect(cleanUrl, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|api|favicon.ico|images|.*\\.[a-zA-Z0-9]+$).*)"],
};
