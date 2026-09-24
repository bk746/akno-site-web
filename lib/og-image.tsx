import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { SITE_NAME, SITE_TAGLINE } from "@/lib/site-config";

export const ogImageSize = {
  width: 1200,
  height: 630,
};

export const ogImageContentType = "image/png";

export async function renderOgImage() {
  const logoPath = join(process.cwd(), "src/images/logo-akno-plus.png");
  const logoBuffer = await readFile(logoPath);
  const logoSrc = `data:image/png;base64,${logoBuffer.toString("base64")}`;

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
          background: "#050505",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -80,
            width: 420,
            height: 420,
            borderRadius: "50%",
            background: "rgba(107, 124, 255, 0.35)",
            filter: "blur(80px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -100,
            left: -60,
            width: 360,
            height: 360,
            borderRadius: "50%",
            background: "rgba(255, 122, 162, 0.28)",
            filter: "blur(70px)",
          }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element -- requis par ImageResponse (OG) */}
        <img
          src={logoSrc}
          alt=""
          width={200}
          height={52}
          style={{ marginBottom: 36 }}
        />
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "-0.03em",
            textAlign: "center",
            lineHeight: 1.15,
            maxWidth: 900,
            padding: "0 48px",
          }}
        >
          {SITE_TAGLINE}
        </div>
        <div
          style={{
            marginTop: 20,
            fontSize: 22,
            fontWeight: 500,
            color: "rgba(255,255,255,0.62)",
            letterSpacing: "-0.01em",
          }}
        >
          {SITE_NAME}
        </div>
      </div>
    ),
    {
      ...ogImageSize,
    },
  );
}
