import { ImageResponse } from "next/og";

export function GET(request: Request) {
  const url = new URL(request.url);
  const title = url.searchParams.get("title") || "0xharryriddle";

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000",
        backgroundImage:
          "radial-gradient(ellipse at 20% 50%, rgba(120, 119, 198, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(255, 119, 115, 0.12) 0%, transparent 50%)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "80px",
          maxWidth: "900px",
        }}
      >
        {/* Traffic lights */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              width: "18px",
              height: "18px",
              borderRadius: "50%",
              backgroundColor: "#ff5f57",
            }}
          />
          <div
            style={{
              width: "18px",
              height: "18px",
              borderRadius: "50%",
              backgroundColor: "#febc2e",
            }}
          />
          <div
            style={{
              width: "18px",
              height: "18px",
              borderRadius: "50%",
              backgroundColor: "#28c840",
            }}
          />
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: "64px",
            fontWeight: 700,
            color: "#fff",
            lineHeight: 1.2,
            margin: 0,
            textWrap: "balance",
          }}
        >
          {title}
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: "28px",
            color: "#86868b",
            marginTop: "24px",
            fontFamily: "monospace",
          }}
        >
          0xharryriddle
        </p>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    },
  );
}
