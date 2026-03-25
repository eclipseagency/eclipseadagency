import type { Metadata } from "next";
import { GranoDeCafeContent } from "./GranoDeCafeContent";

export const metadata: Metadata = {
  title: "Grano de Caf\u00e9 - Brand Identity | Eclipse Agency",
  description:
    "Grano de Caf\u00e9: Authentic Branding for Colombian Coffee Heritage. A rich, earthy identity celebrating the story of Colombian coffee.",
  alternates: {
    canonical: "https://www.eclipseagency.net/grano-de-cafe",
  },
  openGraph: {
    title: "Grano de Caf\u00e9 - Brand Identity | Eclipse Agency",
    description:
      "Grano de Caf\u00e9: Authentic Branding for Colombian Coffee Heritage. A rich, earthy identity celebrating the story of Colombian coffee.",
    url: "https://www.eclipseagency.net/grano-de-cafe",
    type: "article",
    images: [
      {
        url: "https://www.eclipseagency.net/images/portfolio/granodecafe.webp",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Grano de Caf\u00e9 - Brand Identity | Eclipse Agency",
    description:
      "Grano de Caf\u00e9: Authentic Branding for Colombian Coffee Heritage. A rich, earthy identity celebrating the story of Colombian coffee.",
    images: ["https://www.eclipseagency.net/images/portfolio/granodecafe.webp"],
  },
};

export default function GranoDeCafePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: "Grano de Cafe - Brand Identity",
            description:
              "Grano de Cafe: Authentic Branding for Colombian Coffee Heritage. A rich, earthy identity celebrating the story of Colombian coffee.",
            image:
              "https://www.eclipseagency.net/images/portfolio/granodecafe.webp",
            creator: {
              "@type": "Organization",
              name: "Eclipse Agency",
              url: "https://www.eclipseagency.net",
            },
          }),
        }}
      />
      <GranoDeCafeContent />
    </>
  );
}
