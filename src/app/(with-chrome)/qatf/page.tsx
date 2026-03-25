import type { Metadata } from "next";
import { QatfContent } from "./QatfContent";

export const metadata: Metadata = {
  title: "Qatf - Brand Identity | Eclipse Agency",
  description:
    "Qatf: Fresh Branding for Premium Agricultural Products. A modern identity emphasizing sustainability and natural excellence.",
  alternates: {
    canonical: "https://www.eclipseagency.net/qatf",
  },
  openGraph: {
    title: "Qatf - Brand Identity | Eclipse Agency",
    description:
      "Qatf: Fresh Branding for Premium Agricultural Products. A modern identity emphasizing sustainability and natural excellence.",
    url: "https://www.eclipseagency.net/qatf",
    type: "article",
    images: [
      {
        url: "https://www.eclipseagency.net/images/portfolio/qatf.webp",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Qatf - Brand Identity | Eclipse Agency",
    description:
      "Qatf: Fresh Branding for Premium Agricultural Products. A modern identity emphasizing sustainability and natural excellence.",
    images: ["https://www.eclipseagency.net/images/portfolio/qatf.webp"],
  },
};

export default function QatfPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: "Qatf - Brand Identity",
            description:
              "Qatf: Fresh Branding for Premium Agricultural Products. A modern identity emphasizing sustainability and natural excellence.",
            image:
              "https://www.eclipseagency.net/images/portfolio/qatf.webp",
            creator: {
              "@type": "Organization",
              name: "Eclipse Agency",
              url: "https://www.eclipseagency.net",
            },
          }),
        }}
      />
      <QatfContent />
    </>
  );
}
