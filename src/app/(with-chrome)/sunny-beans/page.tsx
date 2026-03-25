import type { Metadata } from "next";
import { SunnyBeansContent } from "./SunnyBeansContent";

export const metadata: Metadata = {
  title: "Sunny Beans - Brand Identity | Eclipse Agency",
  description:
    "Sunny Beans: Brewing Warmth, Joy, and Community. A brand identity radiating warmth with earthy tones and a sun-inspired logo.",
  alternates: {
    canonical: "https://www.eclipseagency.net/sunny-beans",
  },
  openGraph: {
    title: "Sunny Beans - Brand Identity | Eclipse Agency",
    description:
      "Sunny Beans: Brewing Warmth, Joy, and Community. A brand identity radiating warmth with earthy tones and a sun-inspired logo.",
    url: "https://www.eclipseagency.net/sunny-beans",
    type: "article",
    images: [
      {
        url: "https://www.eclipseagency.net/images/portfolio/sunny-beans.webp",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sunny Beans - Brand Identity | Eclipse Agency",
    description:
      "Sunny Beans: Brewing Warmth, Joy, and Community. A brand identity radiating warmth with earthy tones and a sun-inspired logo.",
    images: ["https://www.eclipseagency.net/images/portfolio/sunny-beans.webp"],
  },
};

export default function SunnyBeansPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: "Sunny Beans - Brand Identity",
            description:
              "Sunny Beans: Brewing Warmth, Joy, and Community. A brand identity radiating warmth with earthy tones and a sun-inspired logo.",
            image:
              "https://www.eclipseagency.net/images/portfolio/sunny-beans.webp",
            creator: {
              "@type": "Organization",
              name: "Eclipse Agency",
              url: "https://www.eclipseagency.net",
            },
          }),
        }}
      />
      <SunnyBeansContent />
    </>
  );
}
