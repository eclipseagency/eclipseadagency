import type { Metadata } from "next";
import { VolumeContent } from "./VolumeContent";

export const metadata: Metadata = {
  title: "Volume - Brand Identity | Eclipse Agency",
  description:
    "Volume: Where Sophistication Meets Style. A brand identity that exudes luxury and modern sophistication for a refined haircare brand.",
  alternates: {
    canonical: "https://www.eclipseagency.net/volume",
  },
  openGraph: {
    title: "Volume - Brand Identity | Eclipse Agency",
    description:
      "Volume: Where Sophistication Meets Style. A brand identity that exudes luxury and modern sophistication for a refined haircare brand.",
    url: "https://www.eclipseagency.net/volume",
    type: "article",
    images: [
      {
        url: "https://www.eclipseagency.net/images/portfolio/volume.webp",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Volume - Brand Identity | Eclipse Agency",
    description:
      "Volume: Where Sophistication Meets Style. A brand identity that exudes luxury and modern sophistication for a refined haircare brand.",
    images: ["https://www.eclipseagency.net/images/portfolio/volume.webp"],
  },
};

export default function VolumePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: "Volume - Brand Identity",
            description:
              "Volume: Where Sophistication Meets Style. A brand identity that exudes luxury and modern sophistication for a refined haircare brand.",
            image:
              "https://www.eclipseagency.net/images/portfolio/volume.webp",
            creator: {
              "@type": "Organization",
              name: "Eclipse Agency",
              url: "https://www.eclipseagency.net",
            },
          }),
        }}
      />
      <VolumeContent />
    </>
  );
}
