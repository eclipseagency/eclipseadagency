import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Sunny Beans — Brand Identity | Eclipse Agency",
  description:
    "Sunny Beans: Brewing Warmth, Joy, and Community. A brand identity radiating warmth with earthy tones and a sun-inspired logo.",
};

export default function SunnyBeansPage() {
  return (
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
            Sunny Beans isn&apos;t just a coffee brand—it&apos;s a celebration of
            community, good vibes, and shared moments over a delicious brew.
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-2xl border border-border">
          <Image
            src="https://eclipseadagency.com/wp-content/uploads/2024/12/sunny-beans-branding.png"
            alt="Sunny Beans branding presentation showcase"
            width={1200}
            height={3000}
            unoptimized
            className="h-auto w-full"
          />
        </div>
      </div>
    </main>
  );
}
