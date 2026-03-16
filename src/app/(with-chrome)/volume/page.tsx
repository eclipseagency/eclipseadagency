import type { Metadata } from "next";
import Image from "next/image";
import { CtaBanner } from "@/components/sections/CtaBanner";

export const metadata: Metadata = {
  title: "Volume - Brand Identity | Eclipse Agency",
  description:
    "Volume: Where Sophistication Meets Style. A brand identity that exudes luxury and modern sophistication for a refined haircare brand.",
  alternates: {
    canonical: "https://www.eclipseagency.net/volume",
  },
  openGraph: {
    title: "Volume - Brand Identity | Eclipse Agency",
    description:
      "Volume: Where Sophistication Meets Style. A brand identity that exudes luxury and modern sophistication for a refined haircare brand.",
    url: "https://www.eclipseagency.net/volume",
    type: "article",
    images: [
      {
        url: "https://www.eclipseagency.net/images/portfolio/volume.webp",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Volume - Brand Identity | Eclipse Agency",
    description:
      "Volume: Where Sophistication Meets Style. A brand identity that exudes luxury and modern sophistication for a refined haircare brand.",
    images: ["https://www.eclipseagency.net/images/portfolio/volume.webp"],
  },
};

export default function VolumePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: "Volume - Brand Identity",
            description:
              "Volume: Where Sophistication Meets Style. A brand identity that exudes luxury and modern sophistication for a refined haircare brand.",
            image:
              "https://www.eclipseagency.net/images/portfolio/volume.webp",
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
          Volume: Where Sophistication Meets Style
        </h1>

        <div className="mt-6 space-y-6 text-lg leading-relaxed text-text-secondary md:text-xl">
          <p>
            This project highlights our expertise in capturing the essence of a
            brand and transforming it into an elegant and visually engaging
            narrative. For Volume, a brand synonymous with refinement and style
            in haircare, we crafted a brand identity that exudes luxury and
            modern sophistication.
          </p>

          <p>
            From the choice of warm, earthy tones to the interplay of natural
            textures, every element was meticulously designed to resonate with
            the brand&apos;s promise of elegance and care. The sleek wooden comb
            paired with luminous capsules emphasizes both the organic and
            innovative aspects of the brand, ensuring it stands out while
            remaining authentic.
          </p>

          <p>
            Our goal was to create a visual identity that not only speaks to the
            target audience but also elevates their perception of Volume as a
            leader in its industry. This showcase demonstrates how we translate
            brand values into compelling aesthetics, leaving a lasting impression
            on consumers.
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-2xl border border-border">
          <Image
            src="/images/portfolio/volume.webp"
            alt="Volume branding presentation showcase"
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
              <span className="text-text-secondary">Volume</span>
            </div>
            <div>
              <span className="block font-semibold text-text-primary">Industry</span>
              <span className="text-text-secondary">Premium Haircare</span>
            </div>
            <div>
              <span className="block font-semibold text-text-primary">Services</span>
              <span className="text-text-secondary">Brand Identity, Packaging</span>
            </div>
            <div>
              <span className="block font-semibold text-text-primary">Timeline</span>
              <span className="text-text-secondary">10 Weeks</span>
            </div>
          </div>
          <p className="leading-relaxed text-text-secondary mb-4">
            Volume is a premium haircare brand entering the luxury beauty market with a line of salon-quality products for discerning consumers. Eclipse Agency was engaged to craft a brand identity and packaging system that would position Volume alongside established luxury beauty names from day one.
          </p>
        </div>
      </section>

      <section className="px-5 pb-16 md:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl font-bold mb-6">The Challenge</h2>
          <p className="leading-relaxed text-text-secondary mb-4">
            The luxury haircare market is crowded and fiercely competitive. Established players have decades of brand equity, and consumers in this segment are highly discerning about aesthetics, ingredient quality, and brand story. Volume needed to enter this space with an identity that immediately communicated premium quality without appearing derivative of existing brands.
          </p>
          <p className="leading-relaxed text-text-secondary mb-4">
            The founders had a clear vision: they wanted the brand to feel organic and sophisticated, drawing on nature-inspired aesthetics while maintaining a modern, editorial edge. The challenge was avoiding the common trap of luxury beauty branding that leans too heavily on gold foils and ornate details, which can feel dated. Volume needed to feel timeless yet contemporary.
          </p>
          <p className="leading-relaxed text-text-secondary mb-4">
            Packaging was particularly critical. The products would launch in boutique salons and high-end retail, where shelf presence is everything. Each bottle, tube, and box needed to tell the brand story at a glance and justify a premium price point through perceived quality alone.
          </p>
        </div>
      </section>

      <section className="px-5 pb-16 md:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl font-bold mb-6">Our Approach</h2>
          <p className="leading-relaxed text-text-secondary mb-4">
            Our strategy centered on what we called &ldquo;Organic Luxury&rdquo; &mdash; the intersection of natural warmth and refined sophistication. We developed a visual language built around warm, earthy tones (deep amber, soft sand, matte cocoa) that evoke the natural ingredients at the heart of Volume&apos;s formulations. These were balanced with cool neutrals and a matte-finish material palette that keeps the brand feeling modern.
          </p>
          <p className="leading-relaxed text-text-secondary mb-4">
            The logo combines elegant serif typography with a subtle leaf motif, nodding to the brand&apos;s commitment to natural ingredients without being overly literal. We designed the wordmark to feel equally at home on a salon shelf in Dubai as in a lifestyle magazine editorial spread. The supporting visual system uses photography art direction featuring natural textures, soft studio lighting, and carefully composed still-life arrangements.
          </p>
          <p className="leading-relaxed text-text-secondary mb-4">
            For packaging, we worked closely with production partners to select materials that reinforced the premium positioning: soft-touch matte bottles, debossed labels, and weighted closures that create a tactile experience of quality. Every detail, from the label stock to the ink finish, was chosen to communicate care and craftsmanship.
          </p>
        </div>
      </section>

      <section className="px-5 pb-16 md:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl font-bold mb-6">Results &amp; Deliverables</h2>
          <ul className="list-disc space-y-2 pl-6 text-text-secondary mb-6">
            <li>Primary logo with serif wordmark and leaf motif icon</li>
            <li>Warm earthy color palette with matte and metallic accent tones</li>
            <li>Typography system pairing modern serif with clean sans-serif</li>
            <li>Packaging design for 8 SKUs (shampoo, conditioner, treatments, oils)</li>
            <li>Structural packaging specs including bottle shapes and closure types</li>
            <li>Photography art direction guide with mood boards and shot lists</li>
            <li>Brand guidelines document (print, digital, packaging)</li>
            <li>Social media visual templates for Instagram and Pinterest</li>
            <li>Salon point-of-sale display design</li>
            <li>E-commerce product page layout and asset specifications</li>
          </ul>
        </div>
      </section>

      <section className="px-5 pb-20 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-2xl font-bold mb-4">Have a Similar Project?</h2>
          <p className="leading-relaxed text-text-secondary mb-8">
            Launching a beauty or luxury product brand? Let us help you create an identity and packaging system that commands attention and justifies premium positioning.
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
