import type { Metadata } from "next";
import Image from "next/image";
import { CtaBanner } from "@/components/sections/CtaBanner";

export const metadata: Metadata = {
  title: "Grano de Café - Brand Identity | Eclipse Agency",
  description:
    "Grano de Café: Authentic Branding for Colombian Coffee Heritage. A rich, earthy identity celebrating the story of Colombian coffee.",
  alternates: {
    canonical: "https://www.eclipseagency.net/grano-de-cafe",
  },
  openGraph: {
    title: "Grano de Café - Brand Identity | Eclipse Agency",
    description:
      "Grano de Café: Authentic Branding for Colombian Coffee Heritage. A rich, earthy identity celebrating the story of Colombian coffee.",
    url: "https://www.eclipseagency.net/grano-de-cafe",
    type: "article",
    images: [
      {
        url: "https://www.eclipseagency.net/images/portfolio/granodecafe.webp",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Grano de Café - Brand Identity | Eclipse Agency",
    description:
      "Grano de Café: Authentic Branding for Colombian Coffee Heritage. A rich, earthy identity celebrating the story of Colombian coffee.",
    images: ["https://www.eclipseagency.net/images/portfolio/granodecafe.webp"],
  },
};

export default function GranoDeCafePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: "Grano de Cafe - Brand Identity",
            description:
              "Grano de Cafe: Authentic Branding for Colombian Coffee Heritage. A rich, earthy identity celebrating the story of Colombian coffee.",
            image:
              "https://www.eclipseagency.net/images/portfolio/granodecafe.webp",
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
          Grano de Café: Authentic Branding for Colombian Coffee Heritage
        </h1>

        <div className="mt-6 space-y-6 text-lg leading-relaxed text-text-secondary md:text-xl">
          <p>
            The branding for Grano de Café captures the authentic essence of
            Colombian coffee, blending tradition with modern design. A rich,
            earthy color palette reflects the warmth and depth of coffee culture,
            while traditional design elements pay homage to the heritage and
            craftsmanship behind every bean.
          </p>

          <p>
            Each aspect of the branding emphasizes quality and authenticity,
            celebrating the story of Colombian coffee through a cohesive visual
            identity. From packaging to promotional materials, the designs create
            an inviting and memorable experience, evoking the richness of flavor
            and the connection to coffee&apos;s origins that Grano de Café
            represents.
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-2xl border border-border">
          <Image
            src="/images/portfolio/granodecafe.webp"
            alt="Grano de Café branding presentation showcase"
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
              <span className="text-text-secondary">Grano de Caf&eacute;</span>
            </div>
            <div>
              <span className="block font-semibold text-text-primary">Industry</span>
              <span className="text-text-secondary">Specialty Coffee</span>
            </div>
            <div>
              <span className="block font-semibold text-text-primary">Services</span>
              <span className="text-text-secondary">Branding, Packaging, Strategy</span>
            </div>
            <div>
              <span className="block font-semibold text-text-primary">Timeline</span>
              <span className="text-text-secondary">12 Weeks</span>
            </div>
          </div>
          <p className="leading-relaxed text-text-secondary mb-4">
            Grano de Caf&eacute; is a specialty coffee brand rooted in Colombian coffee heritage, expanding from its home market into premium retail channels across the Middle East. Eclipse Agency was engaged to reimagine their brand identity and packaging to resonate with a new international audience while honoring the rich tradition behind every bean.
          </p>
        </div>
      </section>

      <section className="px-5 pb-16 md:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl font-bold mb-6">The Challenge</h2>
          <p className="leading-relaxed text-text-secondary mb-4">
            Grano de Caf&eacute; had a loyal following in its home market, built on the strength of exceptional single-origin beans and a deep connection to Colombian farming communities. However, their existing branding was heavily localized, using Spanish-language copy, region-specific cultural references, and packaging designed for local grocery shelves. None of it translated well to the international specialty coffee market.
          </p>
          <p className="leading-relaxed text-text-secondary mb-4">
            The brand needed to expand into Gulf markets, where consumers are sophisticated coffee drinkers willing to pay a premium for quality and provenance. The challenge was to modernize the brand for an international audience without stripping away the authenticity and heritage story that made Grano de Caf&eacute; special in the first place. Too modern, and it would feel generic; too traditional, and it would feel out of place on a premium shelf in Riyadh or Dubai.
          </p>
          <p className="leading-relaxed text-text-secondary mb-4">
            Packaging complexity added another layer. The product line included whole-bean bags, ground coffee pouches, single-serve capsules, and a cold-brew ready-to-drink bottle. Each format had different structural constraints and retail environments, yet all needed to feel unmistakably part of the same family.
          </p>
        </div>
      </section>

      <section className="px-5 pb-16 md:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl font-bold mb-6">Our Approach</h2>
          <p className="leading-relaxed text-text-secondary mb-4">
            We developed a brand positioning around the concept of &ldquo;Heritage Refined&rdquo; &mdash; celebrating the raw, honest story of Colombian coffee farming through a lens of modern design sophistication. This allowed us to keep the narrative of origin, craftsmanship, and community at the core while wrapping it in a visual language that speaks to international premium consumers.
          </p>
          <p className="leading-relaxed text-text-secondary mb-4">
            The color palette draws directly from the Colombian coffee landscape: deep soil browns, ripe cherry reds, lush canopy greens, and warm parchment tones. We paired these earthy tones with contemporary typography and clean layout principles to create a look that is warm and authentic but never rustic. The logo features a stylized coffee cherry branch rendered in a single continuous line, symbolizing the unbroken connection between farm and cup.
          </p>
          <p className="leading-relaxed text-text-secondary mb-4">
            For packaging, we created a flexible system where each product format shares core brand elements (logo placement, color coding by roast level, origin story panel) but adapts its layout to the specific format. The whole-bean bags use kraft paper with a generous window to showcase the beans, while the capsule boxes feature bold color blocking for easy shelf navigation. Every package includes a QR code linking to the specific farm and harvest story behind that batch.
          </p>
        </div>
      </section>

      <section className="px-5 pb-16 md:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl font-bold mb-6">Results &amp; Deliverables</h2>
          <ul className="list-disc space-y-2 pl-6 text-text-secondary mb-6">
            <li>Refreshed logo with stylized coffee cherry branch mark</li>
            <li>Origin-inspired color palette with roast-level color coding system</li>
            <li>Typography pairing blending heritage serif with modern sans-serif</li>
            <li>Packaging design for 4 product formats (bags, pouches, capsules, bottles)</li>
            <li>Structural packaging specifications and material recommendations</li>
            <li>QR-code-linked digital origin story pages for each product</li>
            <li>Bilingual packaging templates (English and Arabic)</li>
            <li>Trade show booth design for specialty coffee exhibitions</li>
            <li>Social media content strategy and visual template suite</li>
            <li>Brand guidelines covering international market applications</li>
            <li>Photography art direction guide for product and lifestyle shoots</li>
          </ul>
        </div>
      </section>

      <section className="px-5 pb-20 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-2xl font-bold mb-4">Have a Similar Project?</h2>
          <p className="leading-relaxed text-text-secondary mb-8">
            Taking a heritage brand to new markets? We know how to honor your story while making it resonate with a global audience.
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
