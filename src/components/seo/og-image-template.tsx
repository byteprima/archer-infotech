/**
 * Shared OG-image template helper. Returns the JSX for `ImageResponse`
 * (next/og) — page-type-specific opengraph-image.tsx files import this
 * and pass page-specific copy.
 *
 * Hard constraints:
 * - Edge runtime: no full CSS, no Tailwind classes, only inline styles.
 * - Limited HTML — div / span / p / h1-h6 only.
 * - No external font fetch (would add latency to every social-share preview);
 *   relies on the runtime's default sans-serif which renders well at 1200×630.
 *
 * Brand colours (OKLCH→hex approximations from src/app/globals.css):
 *   primary  oklch(0.33 0.08 250)  ≈  #1e3a5f  (deep navy)
 *   secondary oklch(0.67 0.17 70)  ≈  #e8a83a  (warm gold)
 */

interface OgTemplateProps {
  /** Page type label, shown bottom-left (e.g. "COURSE", "BOOTCAMP"). */
  kind: string;
  /** Main title, shown centred and large. ~80 chars max for two-line wrap. */
  title: string;
  /** Optional subtitle line below the title (e.g. category, role). */
  subtitle?: string;
  /** Optional small detail line (e.g. "Trainer · 12 years experience"). */
  detail?: string;
}

export const OG_IMAGE_SIZE = { width: 1200, height: 630 } as const;
export const OG_IMAGE_CONTENT_TYPE = "image/png" as const;

export function ogImageTemplate({ kind, title, subtitle, detail }: OgTemplateProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(135deg, #1e3a5f 0%, #142745 100%)",
        padding: "60px 70px",
        color: "white",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Top row: brand wordmark + accent bar */}
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            width: 8,
            height: 44,
            background: "#e8a83a",
            borderRadius: 4,
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: "0.02em",
              lineHeight: 1,
            }}
          >
            ARCHER INFOTECH
          </div>
          <div
            style={{
              fontSize: 16,
              color: "rgba(255,255,255,0.6)",
              letterSpacing: "0.08em",
              marginTop: 4,
            }}
          >
            IT TRAINING · KOTHRUD, PUNE · SINCE 2009
          </div>
        </div>
      </div>

      {/* Spacer */}
      <div style={{ flex: 1, display: "flex" }} />

      {/* Title block */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            fontSize: 18,
            fontWeight: 600,
            color: "#e8a83a",
            letterSpacing: "0.16em",
            marginBottom: 18,
          }}
        >
          {kind.toUpperCase()}
        </div>
        <div
          style={{
            fontSize: title.length > 60 ? 56 : title.length > 40 ? 64 : 72,
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "white",
          }}
        >
          {title}
        </div>
        {subtitle && (
          <div
            style={{
              fontSize: 28,
              fontWeight: 500,
              color: "rgba(255,255,255,0.78)",
              marginTop: 18,
              lineHeight: 1.3,
            }}
          >
            {subtitle}
          </div>
        )}
      </div>

      {/* Spacer */}
      <div style={{ flex: 1, display: "flex" }} />

      {/* Bottom row: detail + URL */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: 22,
          color: "rgba(255,255,255,0.7)",
          paddingTop: 24,
          borderTop: "2px solid rgba(255,255,255,0.12)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {detail || "100% Placement Assistance · 100+ Hiring Partners"}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            color: "white",
            fontWeight: 600,
          }}
        >
          archerinfotech.in
        </div>
      </div>
    </div>
  );
}
