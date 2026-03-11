import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Eclipse Agency - Creative Agency in Riyadh, Saudi Arabia";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
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
          backgroundColor: "#0a0a0a",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle grid pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,107,53,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,107,53,0.03) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Eclipse circle - outer glow */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 320,
            height: 320,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, transparent 45%, rgba(255,107,53,0.15) 55%, rgba(255,107,53,0.4) 65%, rgba(255,107,53,0.15) 75%, transparent 85%)",
          }}
        />

        {/* Eclipse circle - dark center */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 180,
            height: 180,
            borderRadius: "50%",
            backgroundColor: "#0a0a0a",
            border: "3px solid rgba(255,107,53,0.6)",
            boxShadow:
              "0 0 60px rgba(255,107,53,0.3), 0 0 120px rgba(255,107,53,0.15), inset 0 0 30px rgba(255,107,53,0.1)",
          }}
        />

        {/* Content layer */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            zIndex: 10,
            marginTop: 200,
          }}
        >
          {/* Agency name */}
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-2px",
              lineHeight: 1,
            }}
          >
            Eclipse Agency
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: 28,
              fontWeight: 600,
              color: "#ff6b35",
              marginTop: 16,
              letterSpacing: "1px",
            }}
          >
            From Shadow to Spotlight
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: 20,
              color: "rgba(255,255,255,0.5)",
              marginTop: 16,
              letterSpacing: "0.5px",
            }}
          >
            Creative Agency in Riyadh, Saudi Arabia
          </div>
        </div>

        {/* Bottom accent line */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 4,
            background:
              "linear-gradient(90deg, transparent, #ff6b35, transparent)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
