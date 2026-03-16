import type { Metadata } from "next";
import Image from "next/image";
import { CtaBanner } from "@/components/sections/CtaBanner";

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
      <main className="px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-4xl">
        <h1 className="font-heading text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
          Qatf: Fresh Branding for Premium Agricultural Products
        </h1>

        <div className="mt-6 space-y-6 text-lg leading-relaxed text-text-secondary md:text-xl">
          <p>
            The branding for Qatf embodies a fresh and modern identity,
            highlighting the premium quality of its agricultural products. With
            clean visuals and an organic aesthetic, the design emphasizes the
            brand&apos;s commitment to sustainability and natural excellence.
          </p>

          <p>
            The logo and color palette reflect the essence of fresh produce,
            while the minimalistic layouts create a sense of elegance and
            trustworthiness. Qatf&apos;s branding is tailored to appeal to
            consumers who value quality, health, and eco-friendly practices,
            ensuring a strong and lasting connection with its audience.
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-2xl border border-border">
          <Image
            src="/images/portfolio/qatf.webp"
            alt="Qatf branding presentation showcase"
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
              <span className="text-text-secondary">Qatf</span>
            </div>
            <div>
              <span className="block font-semibold text-text-primary">Industry</span>
              <span className="text-text-secondary">Agriculture &amp; Food</span>
            </div>
            <div>
              <span className="block font-semibold text-text-primary">Services</span>
              <span className="text-text-secondary">Branding, Packaging, Strategy</span>
            </div>
            <div>
              <span className="block font-semibold text-text-primary">Timeline</span>
              <span className="text-text-secondary">10 Weeks</span>
            </div>
          </div>
          <p className="leading-relaxed text-text-secondary mb-4">
            Qatf (Arabic for &ldquo;harvest&rdquo;) is an agricultural products company transitioning from a wholesale supplier into a premium consumer-facing brand. Eclipse Agency was brought in to develop a sophisticated brand identity and packaging system that would elevate their products from commodity goods to premium shelf staples in upscale grocery and specialty food retail.
          </p>
        </div>
      </section>

      <section className="px-5 pb-16 md:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl font-bold mb-6">The Challenge</h2>
          <p className="leading-relaxed text-text-secondary mb-4">
            For years, Qatf had operated behind the scenes, supplying dates, honey, olive oil, and dried herbs to distributors and food manufacturers. Their products were exceptional, sourced from carefully selected farms across Saudi Arabia and the Levant, but they had zero consumer brand recognition. Their packaging was purely functional: plain labels with regulatory information and nothing more.
          </p>
          <p className="leading-relaxed text-text-secondary mb-4">
            The shift to direct-to-consumer retail meant competing against established premium food brands with significant marketing budgets and strong shelf presence. Qatf needed a brand that could instantly communicate quality, provenance, and the natural purity of their products. The branding had to work across a diverse product line, from golden Sukkari dates to mountain-sourced wild honey, each with its own story and character.
          </p>
          <p className="leading-relaxed text-text-secondary mb-4">
            There was also a cultural dimension. Qatf wanted to celebrate the agricultural heritage of the region, positioning Saudi and Levantine farming traditions as worthy of the same premium treatment that European products like Italian olive oil or French honey receive. The brand needed to convey pride in regional origins without feeling parochial.
          </p>
        </div>
      </section>

      <section className="px-5 pb-16 md:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl font-bold mb-6">Our Approach</h2>
          <p className="leading-relaxed text-text-secondary mb-4">
            We anchored the brand strategy in the concept of &ldquo;Nature, Elevated&rdquo; &mdash; taking the raw beauty of the land and presenting it with the refinement it deserves. The visual identity draws heavily on organic forms: leaf silhouettes, grain textures, and topographic contour lines that reference the diverse landscapes where Qatf sources its products. These elements are rendered in a clean, contemporary style that feels premium rather than rustic.
          </p>
          <p className="leading-relaxed text-text-secondary mb-4">
            The color palette is structured around a system where each product category has its own earthy tone (warm amber for honey, deep olive for oil, rich burgundy for dates) unified by a shared cream background and dark forest-green typography. This creates a cohesive family look on shelf while allowing each product to maintain its own identity. The logo features the Arabic word &ldquo;Qatf&rdquo; in a custom calligraphic style with a stylized leaf emerging from the final letter.
          </p>
          <p className="leading-relaxed text-text-secondary mb-4">
            Packaging was designed to feel like a gift, even in everyday purchases. Glass jars replaced plastic containers, labels feature subtle embossing, and each product includes a folded origin card telling the story of the specific farm and region. For the premium gift line, we designed wooden crate sets with a magnetic closure and custom tissue paper, targeting the Saudi gifting market during Ramadan and national holidays.
          </p>
        </div>
      </section>

      <section className="px-5 pb-16 md:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl font-bold mb-6">Results &amp; Deliverables</h2>
          <ul className="list-disc space-y-2 pl-6 text-text-secondary mb-6">
            <li>Custom Arabic calligraphic logo with leaf motif</li>
            <li>Product-category color coding system across 5 product lines</li>
            <li>Glass jar and bottle packaging for honey, olive oil, and preserves</li>
            <li>Pouch packaging for dates, dried herbs, and specialty grains</li>
            <li>Premium wooden gift crate set for holiday and corporate gifting</li>
            <li>Origin story cards with farm and region information for each product</li>
            <li>Bilingual labeling system (Arabic and English)</li>
            <li>Point-of-sale display stand for retail environments</li>
            <li>E-commerce photography art direction and product page templates</li>
            <li>Social media content strategy targeting food enthusiasts</li>
            <li>Comprehensive brand guidelines covering all packaging and marketing</li>
          </ul>
        </div>
      </section>

      <section className="px-5 pb-20 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-2xl font-bold mb-4">Have a Similar Project?</h2>
          <p className="leading-relaxed text-text-secondary mb-8">
            Transitioning from B2B to a premium consumer brand? We can help you build an identity that earns its place on the shelf.
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
