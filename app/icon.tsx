import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * Approved: Favicon Direction B. "G" (Inter ExtraBold, matching the
 * wordmark's own weight) with a green accent underline — the same
 * accent-bar/underline treatment used for active nav state and hover
 * accents elsewhere on the site — rather than a flat, undifferentiated
 * letter. No monogram/icon mark exists anywhere in the approved design
 * (Header.dc.html uses only the plain text wordmark), so this is derived
 * directly from it. Flat navy square, no corner rounding — browsers/OS
 * apply their own masking on top of favicon/app-icon images.
 */
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
  const interExtraBold = await readFile(join(process.cwd(), "assets/fonts/Inter-ExtraBold.woff"));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0d1826",
        }}
      >
        <div style={{ color: "#ffffff", fontSize: 19, fontFamily: "Inter", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1, display: "flex" }}>
          G
        </div>
        <div style={{ width: 14, height: 3, background: "#22c55e", marginTop: 4, display: "flex" }} />
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Inter", data: interExtraBold, weight: 800, style: "normal" }],
    },
  );
}
