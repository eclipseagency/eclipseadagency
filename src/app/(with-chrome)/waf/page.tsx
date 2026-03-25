import type { Metadata } from "next";
import { WafContent } from "./WafContent";

export const metadata: Metadata = {
  title: "Waf - Brand Identity | Eclipse Agency",
  description:
    "Waf: Sleek and Professional Branding for Business Excellence. A bold identity showcasing innovation with sleek, vibrant visuals.",
  alternates: {
    canonical: "https://www.eclipseagency.net/waf",
  },
  openGraph: {
    title: "Waf - Brand Identity | Eclipse Agency",
    description:
      "Waf: Sleek and Professional Branding for Business Excellence. A bold identity showcasing innovation with sleek, vibrant visuals.",
    url: "https://www.eclipseagency.net/waf",
    type: "article",
    images: [
      {
        url: "https://www.eclipseagency.net/images/portfolio/waf.webp",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Waf - Brand Identity | Eclipse Agency",
    description:
      "Waf: Sleek and Professional Branding for Business Excellence. A bold identity showcasing innovation with sleek, vibrant visuals.",
    images: ["https://www.eclipseagency.net/images/portfolio/waf.webp"],
  },
};

export default function WafPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: "Waf - Brand Identity",
            description:
              "Waf: Sleek and Professional Branding for Business Excellence. A bold identity showcasing innovation with sleek, vibrant visuals.",
            image:
              "https://www.eclipseagency.net/images/portfolio/waf.webp",
            creator: {
              "@type": "Organization",
              name: "Eclipse Agency",
              url: "https://www.eclipseagency.net",
            },
          }),
        }}
      />
      <WafContent />
    </>
  );
}
