import type { Metadata } from "next";
import { ForcupContent } from "./ForcupContent";

export const metadata: Metadata = {
  title: "Forcup - Brand Identity | Eclipse Agency",
  description:
    "Forcup: Sophisticated Branding for a Premium Coffee Experience. Modern minimalism with a playful edge for a fresh take on coffee culture.",
  alternates: {
    canonical: "https://www.eclipseagency.net/forcup",
  },
  openGraph: {
    title: "Forcup - Brand Identity | Eclipse Agency",
    description:
      "Forcup: Sophisticated Branding for a Premium Coffee Experience. Modern minimalism with a playful edge for a fresh take on coffee culture.",
    url: "https://www.eclipseagency.net/forcup",
    type: "article",
    images: [
      {
        url: "https://www.eclipseagency.net/images/portfolio/forcup.webp",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Forcup - Brand Identity | Eclipse Agency",
    description:
      "Forcup: Sophisticated Branding for a Premium Coffee Experience. Modern minimalism with a playful edge for a fresh take on coffee culture.",
    images: ["https://www.eclipseagency.net/images/portfolio/forcup.webp"],
  },
};

export default function ForcupPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: "Forcup - Brand Identity",
            description:
              "Forcup: Sophisticated Branding for a Premium Coffee Experience. Modern minimalism with a playful edge for a fresh take on coffee culture.",
            image:
              "https://www.eclipseagency.net/images/portfolio/forcup.webp",
            creator: {
              "@type": "Organization",
              name: "Eclipse Agency",
              url: "https://www.eclipseagency.net",
            },
          }),
        }}
      />
      <ForcupContent />
    </>
  );
}
