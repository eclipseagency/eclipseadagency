import type { Metadata } from "next";
import { SparkleContent } from "./SparkleContent";

export const metadata: Metadata = {
  title: "Sparkle - Brand Identity | Eclipse Agency",
  description:
    "Sparkle Branding Project - Where Magic Happens. A captivating visual identity reflecting innovation, energy, and magic.",
  alternates: {
    canonical: "https://www.eclipseagency.net/sparkle",
  },
  openGraph: {
    title: "Sparkle - Brand Identity | Eclipse Agency",
    description:
      "Sparkle Branding Project - Where Magic Happens. A captivating visual identity reflecting innovation, energy, and magic.",
    url: "https://www.eclipseagency.net/sparkle",
    type: "article",
    images: [
      {
        url: "https://www.eclipseagency.net/images/portfolio/sparkle.webp",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sparkle - Brand Identity | Eclipse Agency",
    description:
      "Sparkle Branding Project - Where Magic Happens. A captivating visual identity reflecting innovation, energy, and magic.",
    images: ["https://www.eclipseagency.net/images/portfolio/sparkle.webp"],
  },
};

export default function SparklePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: "Sparkle - Brand Identity",
            description:
              "Sparkle Branding Project - Where Magic Happens. A captivating visual identity reflecting innovation, energy, and magic.",
            image:
              "https://www.eclipseagency.net/images/portfolio/sparkle.webp",
            creator: {
              "@type": "Organization",
              name: "Eclipse Agency",
              url: "https://www.eclipseagency.net",
            },
          }),
        }}
      />
      <SparkleContent />
    </>
  );
}
