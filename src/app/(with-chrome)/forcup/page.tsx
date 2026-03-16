import type { Metadata } from "next";
import Image from "next/image";
import { CtaBanner } from "@/components/sections/CtaBanner";

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
            src="/images/portfolio/forcup.webp"
            alt="Forcup branding presentation showcase"
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
              <span className="text-text-secondary">For Cup</span>
            </div>
            <div>
              <span className="block font-semibold text-text-primary">Industry</span>
              <span className="text-text-secondary">Coffee &amp; Lifestyle</span>
            </div>
            <div>
              <span className="block font-semibold text-text-primary">Services</span>
              <span className="text-text-secondary">Brand Identity, Packaging</span>
            </div>
            <div>
              <span className="block font-semibold text-text-primary">Timeline</span>
              <span className="text-text-secondary">7 Weeks</span>
            </div>
          </div>
          <p className="leading-relaxed text-text-secondary mb-4">
            For Cup is a modern coffee brand targeting a younger, design-conscious audience that sees coffee as part of their lifestyle identity. Eclipse Agency developed a brand system that blends minimalist aesthetics with bold, playful energy to capture a generation that values authenticity and visual appeal in equal measure.
          </p>
        </div>
      </section>

      <section className="px-5 pb-16 md:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl font-bold mb-6">The Challenge</h2>
          <p className="leading-relaxed text-text-secondary mb-4">
            For Cup was founded by a group of young entrepreneurs who noticed a gap in the market: most specialty coffee brands either leaned heavily into third-wave seriousness (with dense tasting notes and barista jargon) or went full mainstream and sacrificed quality perception. They wanted a brand that was genuinely accessible and fun while still being respected by coffee enthusiasts.
          </p>
          <p className="leading-relaxed text-text-secondary mb-4">
            The target audience, primarily 18-to-30-year-olds, makes purchasing decisions based on aesthetics and shareability as much as taste. The brand needed to look incredible on Instagram, feel cool to carry around, and work seamlessly in a delivery-first model where the unboxing experience matters as much as the in-store one. At the same time, it could not feel like it was trying too hard, since this demographic has a finely tuned radar for inauthenticity.
          </p>
          <p className="leading-relaxed text-text-secondary mb-4">
            The founders also wanted the brand to scale into merchandise and lifestyle products eventually (tote bags, reusable cups, apparel), so the identity needed to be strong enough to stand on its own as a design element, separate from the product itself.
          </p>
        </div>
      </section>

      <section className="px-5 pb-16 md:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl font-bold mb-6">Our Approach</h2>
          <p className="leading-relaxed text-text-secondary mb-4">
            We developed a brand identity rooted in what we called &ldquo;Clean Boldness&rdquo; &mdash; stripped-back layouts with unexpected pops of personality. The visual system uses a monochromatic base (black, white, and warm grey) punctuated by a single signature accent color, a vibrant coral-orange, that appears selectively across packaging, signage, and digital touchpoints. This restraint makes the brand instantly recognizable while keeping it feeling fresh and uncluttered.
          </p>
          <p className="leading-relaxed text-text-secondary mb-4">
            The logo is a bold, geometric wordmark where the &ldquo;O&rdquo; in &ldquo;For&rdquo; is replaced by a minimal cup icon, creating a clever visual shorthand that works at any scale from a favicon to a storefront. The supporting iconography follows the same geometric language: clean lines, rounded corners, and consistent stroke widths that feel both modern and approachable.
          </p>
          <p className="leading-relaxed text-text-secondary mb-4">
            Packaging was designed with shareability as a primary objective. Cup designs feature witty micro-copy and rotating sleeve designs that encourage collecting and photographing. The takeaway bags use a simple fold-and-stamp system that is cost-effective for the brand but feels intentional and craft-oriented to the customer. We also designed a merchandise line including tote bags, enamel pins, and a reusable ceramic cup that became an instant bestseller.
          </p>
        </div>
      </section>

      <section className="px-5 pb-16 md:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl font-bold mb-6">Results &amp; Deliverables</h2>
          <ul className="list-disc space-y-2 pl-6 text-text-secondary mb-6">
            <li>Geometric wordmark logo with integrated cup icon</li>
            <li>Monochromatic palette with signature coral-orange accent</li>
            <li>Custom icon set for menu categories and wayfinding</li>
            <li>Cup designs (hot and cold) with rotating sleeve artwork</li>
            <li>Takeaway bag and pastry box packaging</li>
            <li>Retail coffee bag designs for three roast levels</li>
            <li>Merchandise line: tote bags, enamel pins, reusable ceramic cup</li>
            <li>Instagram content templates with micro-copy guidelines</li>
            <li>App UI design kit for mobile ordering</li>
            <li>Brand guidelines covering all physical and digital applications</li>
          </ul>
        </div>
      </section>

      <section className="px-5 pb-20 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-2xl font-bold mb-4">Have a Similar Project?</h2>
          <p className="leading-relaxed text-text-secondary mb-8">
            Building a brand for a younger, design-savvy audience? Let us help you create something they will want to share.
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
