import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Approved: Favicon Direction B, scaled up for the iOS home-screen size.
// Same mark as app/icon.tsx — see that file for the design rationale.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
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
        <div style={{ color: "#ffffff", fontSize: 107, fontFamily: "Inter", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1, display: "flex" }}>
          G
        </div>
        <div style={{ width: 79, height: 17, background: "#22c55e", marginTop: 22, display: "flex" }} />
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Inter", data: interExtraBold, weight: 800, style: "normal" }],
    },
  );
}
