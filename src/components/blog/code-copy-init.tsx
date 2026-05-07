"use client";

import { useEffect } from "react";

/**
 * Wires up the Copy buttons that `BlogPostContent`'s server-side Shiki
 * highlighter injected into each `<pre>` code block. Uses event delegation
 * on document.body so it works for the blog post body's
 * `dangerouslySetInnerHTML`-rendered nodes without needing per-button refs.
 *
 * Mechanism:
 * 1. Click on `[data-copy-code]` button.
 * 2. Decode the base64 `data-copy-code` attribute → raw code.
 * 3. Write to clipboard via Clipboard API (with execCommand fallback for
 *    pre-2018 browsers).
 * 4. Flash the button label "Copy" → "Copied!" → "Copy" over 1.5s.
 *
 * Render this once near the article body; one listener per page. Unmount
 * cleanup removes the listener.
 *
 * Pillar 5 P5-11.
 */
export function CodeCopyInit() {
  useEffect(() => {
    function decode(b64: string): string {
      try {
        // atob → percent-decode handles UTF-8 safely
        return decodeURIComponent(escape(window.atob(b64)));
      } catch {
        return b64;
      }
    }

    async function copyToClipboard(text: string): Promise<boolean> {
      if (navigator.clipboard?.writeText) {
        try {
          await navigator.clipboard.writeText(text);
          return true;
        } catch {
          /* fallthrough */
        }
      }
      // Fallback via hidden textarea + execCommand (deprecated but widely supported)
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "absolute";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      try {
        const ok = document.execCommand("copy");
        return ok;
      } catch {
        return false;
      } finally {
        document.body.removeChild(ta);
      }
    }

    function flashButton(btn: HTMLButtonElement, ok: boolean) {
      const original = btn.textContent || "Copy";
      btn.textContent = ok ? "Copied!" : "Failed";
      btn.style.color = ok ? "#1a7f37" : "#cf222e";
      btn.style.borderColor = ok ? "#1a7f37" : "#cf222e";
      window.setTimeout(() => {
        btn.textContent = original;
        btn.style.color = "";
        btn.style.borderColor = "";
      }, 1500);
    }

    async function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const btn = target.closest<HTMLButtonElement>("button[data-copy-code]");
      if (!btn) return;
      const encoded = btn.getAttribute("data-copy-code");
      if (!encoded) return;
      const code = decode(encoded);
      const ok = await copyToClipboard(code);
      flashButton(btn, ok);
    }

    document.body.addEventListener("click", handleClick);
    return () => document.body.removeEventListener("click", handleClick);
  }, []);

  return null;
}
