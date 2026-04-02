import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default async function AppleIcon() {
  // Read SVG file which contains embedded PNG
  const svgPath = join(process.cwd(), "public", "images", "logo.svg");
  const svgContent = await readFile(svgPath, "utf-8");

  // Extract base64 PNG data from SVG
  const base64Match = svgContent.match(/data:image\/png;base64,([^"]+)/);
  const logoBase64 = base64Match
    ? `data:image/png;base64,${base64Match[1]}`
    : "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
        }}
      >
        <img
          src={logoBase64}
          width={180}
          height={180}
          style={{ objectFit: "contain" }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
