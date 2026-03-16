import type { Metadata } from "next";
import Image from "next/image";
import { CtaBanner } from "@/components/sections/CtaBanner";

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

      <section className="px-5 pb-16 md:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl font-bold mb-6">Project Overview</h2>
          <div className="mb-6 grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
            <div>
              <span className="block font-semibold text-text-primary">Client</span>
              <span className="text-text-secondary">Sunny Beans</span>
            </div>
            <div>
              <span className="block font-semibold text-text-primary">Industry</span>
              <span className="text-text-secondary">Coffee &amp; Hospitality</span>
            </div>
            <div>
              <span className="block font-semibold text-text-primary">Services</span>
              <span className="text-text-secondary">Full Brand Identity</span>
            </div>
            <div>
              <span className="block font-semibold text-text-primary">Timeline</span>
              <span className="text-text-secondary">8 Weeks</span>
            </div>
          </div>
          <p className="leading-relaxed text-text-secondary mb-4">
            Sunny Beans is a growing coffee shop chain focused on building a warm, community-centered brand experience. Eclipse Agency was hired to develop a full brand identity system that would translate the founders&apos; passion for connection and great coffee into a cohesive visual language scalable across multiple locations.
          </p>
        </div>
      </section>

      <section className="px-5 pb-16 md:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl font-bold mb-6">The Challenge</h2>
          <p className="leading-relaxed text-text-secondary mb-4">
            The specialty coffee market has exploded in recent years, and with it, an overwhelming number of coffee brands competing for attention. Sunny Beans needed to stand apart from the sea of minimalist, industrial-chic coffee shops that dominate the market. Their differentiator was clear: they were not just selling coffee, they were building a gathering place where neighbors become friends.
          </p>
          <p className="leading-relaxed text-text-secondary mb-4">
            The founders wanted the brand to feel sunny, approachable, and genuinely warm without coming across as childish or unserious about the craft. They had seen too many community-focused brands default to overly cute illustrations or generic coffee iconography. Sunny Beans needed personality and warmth, but it also needed to signal quality and expertise.
          </p>
          <p className="leading-relaxed text-text-secondary mb-4">
            With plans to open three new locations in the following year, the brand system also had to be practical: easy for store managers to implement, clear enough for print vendors to execute correctly, and flexible enough to work on everything from a tiny cup stamp to a large storefront sign.
          </p>
        </div>
      </section>

      <section className="px-5 pb-16 md:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl font-bold mb-6">Our Approach</h2>
          <p className="leading-relaxed text-text-secondary mb-4">
            We built the brand around the concept of &ldquo;Golden Hour&rdquo; &mdash; that warm, inviting moment when sunlight pours through a cafe window and everything feels just right. This concept informed every design decision, from the color palette (warm ambers, soft terracotta, creamy off-white) to the illustration style (hand-drawn, organic, imperfect in a charming way).
          </p>
          <p className="leading-relaxed text-text-secondary mb-4">
            The logo features a sun-inspired emblem that doubles as a coffee bean, creating an iconic mark that is instantly recognizable at any scale. We paired it with a rounded, friendly typeface for the wordmark that feels approachable without sacrificing legibility. The supporting pattern system uses playful bean and sunray motifs that can tile across surfaces, creating visual interest on cups, bags, and interior walls.
          </p>
          <p className="leading-relaxed text-text-secondary mb-4">
            For the physical experience, we developed a complete interior mood guide with material recommendations, signage specifications, and menu board templates. We also created a social media strategy kit so that each location&apos;s baristas could create on-brand content featuring their community, daily specials, and behind-the-scenes moments, all without needing a designer on staff.
          </p>
        </div>
      </section>

      <section className="px-5 pb-16 md:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl font-bold mb-6">Results &amp; Deliverables</h2>
          <ul className="list-disc space-y-2 pl-6 text-text-secondary mb-6">
            <li>Sun-and-bean logo mark with full wordmark and icon variations</li>
            <li>Warm earthy color palette with primary and seasonal accent palettes</li>
            <li>Custom hand-drawn illustration library (beans, sunrays, plants, cups)</li>
            <li>Tileable pattern system for packaging and interior surfaces</li>
            <li>Cup designs (hot and cold, three sizes each)</li>
            <li>Retail packaging for whole-bean and ground coffee bags</li>
            <li>Menu board templates (in-store and digital)</li>
            <li>Interior design mood guide with material and fixture recommendations</li>
            <li>Storefront signage specifications for multi-location rollout</li>
            <li>Social media template kit with Canva-editable files for staff use</li>
            <li>Brand guidelines document covering all applications</li>
          </ul>
        </div>
      </section>

      <section className="px-5 pb-20 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-2xl font-bold mb-4">Have a Similar Project?</h2>
          <p className="leading-relaxed text-text-secondary mb-8">
            Building a hospitality brand that needs to scale without losing its soul? We specialize in creating identities that grow with you.
          </p>
          <a
            href="/contact"
            className="inline-block rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-8 py-3 font-semibold text-white transition hover:opacity-90"
          >
            Start a Conversation
          </a>
        </div>
      </section>

      <CtaBanner />
      </main>
    </>
  );
}
