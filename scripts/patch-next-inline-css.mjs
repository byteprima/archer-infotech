#!/usr/bin/env node
/**
 * Stops Next 16 (Turbopack) from serialising the whole stylesheet a second
 * time into every page's RSC payload. Runs on `postinstall`.
 *
 * With experimental.inlineCss each HTML document carried the global CSS
 * three times: the SSR <style>, the root layout's copy in the flight data,
 * and a third copy as the styles of the built-in global-error boundary.
 * Turbopack's client manifest lists CSS cumulatively along the layout
 * chain, so the built-in global-error "inherits" the root layout's
 * stylesheet even though it imports none. On the homepage that third copy
 * was ~220KB of raw HTML.
 *
 * This applies the one-line fix from vercel/next.js#98243 ("Skip styles for
 * the built-in global-error") to the compiled production runtimes. Remove
 * this script once a Next release ships that fix — the script reports when
 * it no longer finds its target, which is the cue to check.
 *
 * Idempotent: re-running on already-patched files is a no-op.
 */
import fs from "node:fs";
import path from "node:path";

const dir = path.join(
  process.cwd(),
  "node_modules/next/dist/compiled/next-server",
);
const runtimes = [
  "app-page-turbo.runtime.prod.js",
  "app-page-turbo-experimental.runtime.prod.js",
  "app-page.runtime.prod.js",
  "app-page-experimental.runtime.prod.js",
];

// In getGlobalErrorStyles the minified code destructures the loader-tree
// entry as `r` (r[1] is its file path) and the styles as `i`.
const target = "return{GlobalError:a,styles:i}";
const builtinPath =
  "/^(.*[\\\\/])?next[\\\\/]dist[\\\\/]client[\\\\/]components[\\\\/]builtin[\\\\/]/";
const replacement = `return{GlobalError:a,styles:${builtinPath}.test(r[1])?void 0:i}`;

let patched = 0;
let already = 0;
const missing = [];

for (const name of runtimes) {
  const file = path.join(dir, name);
  if (!fs.existsSync(file)) {
    missing.push(name);
    continue;
  }
  const src = fs.readFileSync(file, "utf8");
  if (src.includes(replacement)) {
    already++;
    continue;
  }
  const count = src.split(target).length - 1;
  if (count !== 1) {
    missing.push(`${name} (found ${count} matches)`);
    continue;
  }
  fs.writeFileSync(file, src.replace(target, replacement));
  patched++;
}

console.log(
  `[patch-next-inline-css] patched ${patched}, already patched ${already}`,
);
if (missing.length) {
  console.warn(
    `[patch-next-inline-css] WARNING: target not found in: ${missing.join(", ")}.\n` +
      "  Next.js has probably changed. If this release includes vercel/next.js#98243,\n" +
      "  delete this script and its postinstall entry; otherwise update the target.",
  );
}
