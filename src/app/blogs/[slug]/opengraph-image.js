import { ImageResponse } from "next/og";
import { getPublicationBySlug } from "@/sanity/lib/publications";

export const alt = "Neuaurelius publication";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }) {
  const { slug } = await params;
  const publication = await getPublicationBySlug(slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "58px 64px",
          background: "#ffffff",
          color: "#000000",
          fontFamily: "Arial",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "2px solid #000",
              borderRadius: 999,
              fontSize: 24,
              fontWeight: 900,
            }}
          >
            N
          </div>
          <div
            style={{
              fontSize: 17,
              fontWeight: 800,
              letterSpacing: 4,
            }}
          >
            NEUAURELIUS
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 16,
              fontWeight: 800,
              letterSpacing: 4,
            }}
          >
            {(publication?.category || "RESEARCH").toUpperCase()}
          </div>

          <div
            style={{
              maxWidth: 1060,
              fontSize: 64,
              fontWeight: 900,
              lineHeight: 0.93,
              letterSpacing: -2,
              textTransform: "uppercase",
            }}
          >
            {publication?.title || "NEUAURELIUS PUBLICATION"}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 14,
            fontWeight: 800,
            letterSpacing: 2,
          }}
        >
          <span>{publication?.author || "NEUAURELIUS"}</span>
          <span>GENERALIZED EMBODIED INTELLIGENCE</span>
        </div>
      </div>
    ),
    size
  );
}
