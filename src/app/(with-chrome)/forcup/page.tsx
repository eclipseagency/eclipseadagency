import type { Metadata } from "next";
import Image from "next/image";

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
        url: "https://www.eclipseagency.net/images/portfolio/forcup.png",
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
    images: ["https://www.eclipseagency.net/images/portfolio/forcup.png"],
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
              "https://www.eclipseagency.net/images/portfolio/forcup.png",
            creator: {
              "@type": "Organization",
              name: "Eclipse Agency",
              url: "https://www.eclipseagency.net",
            },
          }),
        }}
      />
      <main className="px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-4xl">
        <h1 className="font-heading text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
          Forcup: Sophisticated Branding for a Premium Coffee Experience
        </h1>

        <div className="mt-6 space-y-6 text-lg leading-relaxed text-text-secondary md:text-xl">
          <p>
            The branding for For Cup blends modern minimalism with a playful
            edge, featuring clean typography and bold iconography that reflects a
            fresh and contemporary take on coffee culture. The design emphasizes
            simplicity and sophistication while maintaining a welcoming and
            vibrant personality, creating a unique identity that resonates with
            coffee enthusiasts and modern lifestyles alike.
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-2xl border border-border">
          <Image
            src="/images/portfolio/forcup.png"
            alt="Forcup branding presentation showcase"
            width={1200}
            height={3000}
            className="h-auto w-full"
          />
        </div>
      </div>
      </main>
    </>
  );
}
