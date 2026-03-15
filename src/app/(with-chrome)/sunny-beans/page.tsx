import type { Metadata } from "next";
import Image from "next/image";

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
      <main className="px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-4xl">
        <h1 className="font-heading text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
          Sunny Beans: Brewing Warmth, Joy, and Community
        </h1>

        <div className="mt-6 space-y-6 text-lg leading-relaxed text-text-secondary md:text-xl">
          <p>
            The branding for Sunny Beans is designed to radiate warmth, joy, and
            a sense of connection, perfectly encapsulating the spirit of the
            coffee-loving community it serves. The visual identity revolves
            around earthy tones that evoke a feeling of groundedness and comfort,
            paired with playful patterns that reflect the lively and welcoming
            atmosphere Sunny Beans offers.
          </p>

          <p>
            At the heart of the brand is a sun-inspired logo, symbolizing
            optimism, energy, and the bright start that a perfect cup of coffee
            brings to every day. Every design element has been carefully curated
            to emphasize a love for coffee, a sense of togetherness, and an
            inviting charm that resonates with customers.
          </p>

          <p>
            The branding extends to packaging, social media, in-store visuals,
            and merchandise, each piece carrying the same warmth and vibrancy.
            Sunny Beans isn&apos;t just a coffee brand - it&apos;s a celebration of
            community, good vibes, and shared moments over a delicious brew.
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-2xl border border-border">
          <Image
            src="/images/portfolio/sunny-beans.webp"
            alt="Sunny Beans branding presentation showcase"
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
