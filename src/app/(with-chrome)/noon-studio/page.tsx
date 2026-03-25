import type { Metadata } from "next";
import { NoonStudioContent } from "./NoonStudioContent";

export const metadata: Metadata = {
  title: "Noon Studio - Brand Identity | Eclipse Agency",
  description:
    "Noon Studio's brand identity reflects a modern, energetic character, combining bold patterns, dynamic shapes, and a harmonious color palette that embodies creativity and innovation.",
  alternates: {
    canonical: "https://www.eclipseagency.net/noon-studio",
  },
  openGraph: {
    title: "Noon Studio - Brand Identity | Eclipse Agency",
    description:
      "Noon Studio's brand identity reflects a modern, energetic character, combining bold patterns, dynamic shapes, and a harmonious color palette that embodies creativity and innovation.",
    url: "https://www.eclipseagency.net/noon-studio",
    type: "article",
    images: [
      {
        url: "https://www.eclipseagency.net/images/portfolio/noon-studio.webp",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Noon Studio - Brand Identity | Eclipse Agency",
    description:
      "Noon Studio's brand identity reflects a modern, energetic character, combining bold patterns, dynamic shapes, and a harmonious color palette that embodies creativity and innovation.",
    images: ["https://www.eclipseagency.net/images/portfolio/noon-studio.webp"],
  },
};

export default function NoonStudioPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: "Noon Studio - Brand Identity",
            description:
              "Noon Studio's brand identity reflects a modern, energetic character, combining bold patterns, dynamic shapes, and a harmonious color palette that embodies creativity and innovation.",
            image:
              "https://www.eclipseagency.net/images/portfolio/noon-studio.webp",
            creator: {
              "@type": "Organization",
              name: "Eclipse Agency",
              url: "https://www.eclipseagency.net",
            },
          }),
        }}
      />
      <NoonStudioContent />
    </>
  );
}
