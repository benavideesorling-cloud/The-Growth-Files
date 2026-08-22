import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * Approved: OG Direction A ("ledger card"), with a final hierarchy pass —
 * the wordmark is now the dominant element (96px, up from the first
 * draft's 68px) so brand identity reads immediately even at small social
 * preview sizes, and the ledger card is deliberately smaller/quieter
 * (2 rows instead of 3, tighter padding, smaller type) so it stays a
 * clearly secondary supporting element rather than competing with it.
 *
 * Everything else is unchanged from the approved direction:
 *  - Wordmark: "The Growth Files", Inter 800, white, -0.02em tracking —
 *    matches Header.dc.html's actual title-case treatment (not the
 *    all-caps version originally suggested — that's not the approved
 *    wordmark).
 *  - Eyebrow: "PERFORMANCE MARKETING + AI SEARCH", copied verbatim from
 *    Home's hero eyebrow (app/page.tsx), styled exactly like the Eyebrow
 *    component (IBM Plex Mono 700, uppercase, 0.08em tracking, green).
 *  - Name line: "Orling Benavides", explicitly requested; doesn't appear
 *    as visible copy on the site itself otherwise.
 *  - Ledger card: reuses the homepage's actual ManifestCard row content
 *    verbatim (app/page.tsx's ledgerRows) on a navy-panel-alt panel,
 *    matching that component's real border/color treatment — the site's
 *    most distinctive visual signature, not generic text-on-navy.
 *  - No new colors, gradients, illustrations, or copy anywhere here.
 */
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "The Growth Files — Performance Marketing + AI Search, Orling Benavides";

const NAVY = "#0d1826";
const NAVY_PANEL_ALT = "#15263d";
const GREEN = "#22c55e";
const MUTED = "#b6c0cc";
const BORDER = "#28374c";

const rows = [
  { label: '"visibility"', value: "AI Search + SEO" },
  { label: '"acquisition"', value: "SEA + paid media" },
];

export default async function OpengraphImage() {
  const [interExtraBold, interMedium, plexMonoBold] = await Promise.all([
    readFile(join(process.cwd(), "assets/fonts/Inter-ExtraBold.woff")),
    readFile(join(process.cwd(), "assets/fonts/Inter-Medium.woff")),
    readFile(join(process.cwd(), "assets/fonts/IBMPlexMono-Bold.woff")),
  ]);

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", background: NAVY, padding: "0 68px" }}>
        <div style={{ display: "flex", flexDirection: "column", width: 730 }}>
          <div
            style={{
              fontFamily: "IBM Plex Mono",
              fontWeight: 700,
              fontSize: 20,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: GREEN,
              marginBottom: 22,
              display: "flex",
            }}
          >
            Performance Marketing + AI Search
          </div>
          <div
            style={{
              fontFamily: "Inter",
              fontWeight: 800,
              fontSize: 84,
              letterSpacing: "-0.025em",
              lineHeight: 1.03,
              whiteSpace: "nowrap",
              color: "#ffffff",
              marginBottom: 30,
              display: "flex",
            }}
          >
            The Growth Files
          </div>
          <div style={{ fontFamily: "Inter", fontWeight: 500, fontSize: 26, color: MUTED, display: "flex" }}>
            Orling Benavides
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            background: NAVY_PANEL_ALT,
            border: `1px solid ${BORDER}`,
            borderRadius: 12,
            padding: "22px 26px",
            width: 300,
          }}
        >
          {rows.map((row, i) => (
            <div
              key={row.label}
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "11px 0",
                borderTop: i === 0 ? "none" : `1px solid ${BORDER}`,
              }}
            >
              <div style={{ fontFamily: "IBM Plex Mono", fontSize: 15, color: GREEN, marginBottom: 4, display: "flex" }}>
                {row.label}
              </div>
              <div style={{ fontFamily: "IBM Plex Mono", fontSize: 15, color: "#ffffff", display: "flex" }}>{row.value}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Inter", data: interExtraBold, weight: 800, style: "normal" },
        { name: "Inter", data: interMedium, weight: 500, style: "normal" },
        { name: "IBM Plex Mono", data: plexMonoBold, weight: 700, style: "normal" },
      ],
    },
  );
}
