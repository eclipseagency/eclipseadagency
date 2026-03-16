import type { Metadata } from "next";
import Image from "next/image";
import { CtaBanner } from "@/components/sections/CtaBanner";

export const metadata: Metadata = {
  title: "Noon Studio - Brand Identity | Eclipse Agency",
  description:
    "Noon Studio's brand identity reflects a modern, energetic character, combining bold patterns, dynamic shapes, and a harmonious color palette that embodies creativity and innovation.",
  alternates: {
    canonical: "https://www.eclipseagency.net/noon-studio",
  },
  openGraph: {
    title: "Noon Studio - Brand Identity | Eclipse Agency",
    description:
      "Noon Studio's brand identity reflects a modern, energetic character, combining bold patterns, dynamic shapes, and a harmonious color palette that embodies creativity and innovation.",
    url: "https://www.eclipseagency.net/noon-studio",
    type: "article",
    images: [
      {
        url: "https://www.eclipseagency.net/images/portfolio/noon-studio.webp",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Noon Studio - Brand Identity | Eclipse Agency",
    description:
      "Noon Studio's brand identity reflects a modern, energetic character, combining bold patterns, dynamic shapes, and a harmonious color palette that embodies creativity and innovation.",
    images: ["https://www.eclipseagency.net/images/portfolio/noon-studio.webp"],
  },
};

export default function NoonStudioPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: "Noon Studio - Brand Identity",
            description:
              "Noon Studio's brand identity reflects a modern, energetic character, combining bold patterns, dynamic shapes, and a harmonious color palette that embodies creativity and innovation.",
            image:
              "https://www.eclipseagency.net/images/portfolio/noon-studio.webp",
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
          Noon Studio: A Bold Brand Identity for a Vibrant Creative Vision
        </h1>

        <p className="mt-6 text-lg leading-relaxed text-text-secondary md:text-xl">
          Noon Studio&apos;s brand identity reflects a modern, energetic
          character, combining bold patterns, dynamic shapes, and a harmonious
          color palette that embodies creativity and innovation. Every element
          has been carefully designed to express the studio&apos;s
          forward-thinking approach and its commitment to artistic expression.
        </p>

        <div className="mt-12 overflow-hidden rounded-2xl border border-border">
          <Image
            src="/images/portfolio/noon-studio.webp"
            alt="Noon Studio brand identity showcase"
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
              <span className="text-text-secondary">Noon Studio</span>
            </div>
            <div>
              <span className="block font-semibold text-text-primary">Industry</span>
              <span className="text-text-secondary">Creative Services</span>
            </div>
            <div>
              <span className="block font-semibold text-text-primary">Services</span>
              <span className="text-text-secondary">Brand Identity, Visual System</span>
            </div>
            <div>
              <span className="block font-semibold text-text-primary">Timeline</span>
              <span className="text-text-secondary">6 Weeks</span>
            </div>
          </div>
          <p className="leading-relaxed text-text-secondary mb-4">
            Noon Studio is a multidisciplinary creative studio based in the Middle East, offering photography, videography, and post-production services to brands across the region. Eclipse Agency was brought on to develop a complete brand identity system that would position Noon Studio as a forward-thinking creative powerhouse capable of competing on an international stage.
          </p>
        </div>
      </section>

      <section className="px-5 pb-16 md:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl font-bold mb-6">The Challenge</h2>
          <p className="leading-relaxed text-text-secondary mb-4">
            Noon Studio had grown rapidly from a small freelance operation into a fully equipped production house, but their visual identity had not kept pace. Their existing logo was a simple wordmark created in the early days, and they lacked any cohesive brand guidelines. As they began pitching to larger clients in fashion, hospitality, and real estate, they found themselves losing out to competitors with more polished presentations.
          </p>
          <p className="leading-relaxed text-text-secondary mb-4">
            The team needed an identity that communicated energy, precision, and creative ambition without leaning on cliches commonly found in the production industry. They wanted something that felt alive and dynamic, mirroring the movement and rhythm inherent in their video and photography work.
          </p>
          <p className="leading-relaxed text-text-secondary mb-4">
            Additionally, the brand needed to work seamlessly across a wide range of touchpoints, from studio signage and crew apparel to digital portfolios and social media templates. Consistency was paramount, but the system also had to be flexible enough to evolve as the studio expanded its services.
          </p>
        </div>
      </section>

      <section className="px-5 pb-16 md:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl font-bold mb-6">Our Approach</h2>
          <p className="leading-relaxed text-text-secondary mb-4">
            We began with an immersive discovery phase, spending time inside the studio observing their creative process, interviewing the founders, and auditing their competitors. This gave us a deep understanding of what makes Noon Studio unique: their ability to blend cinematic storytelling with commercial efficiency. We distilled this into a brand strategy centered on the concept of &ldquo;Creative Momentum&rdquo; &mdash; the idea that great work is always in motion.
          </p>
          <p className="leading-relaxed text-text-secondary mb-4">
            The visual identity we developed features bold geometric patterns inspired by light and shadow play, a hallmark of their studio work. The primary logo is a modular mark that can be deconstructed into pattern elements, giving the brand a built-in design system. The color palette pairs deep charcoal with vibrant accent tones of electric coral and warm amber, striking the balance between professional and energetic.
          </p>
          <p className="leading-relaxed text-text-secondary mb-4">
            We extended the identity into a comprehensive brand toolkit, including presentation templates, social media kits, and environmental graphics for their studio space. Every deliverable was designed to be easy for their internal team to use, ensuring brand consistency would be maintained long after our engagement ended.
          </p>
        </div>
      </section>

      <section className="px-5 pb-16 md:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl font-bold mb-6">Results &amp; Deliverables</h2>
          <ul className="list-disc space-y-2 pl-6 text-text-secondary mb-6">
            <li>Primary and secondary logo variations with full usage guidelines</li>
            <li>Modular pattern system derived from the logo mark</li>
            <li>Brand color palette with primary, secondary, and accent tones</li>
            <li>Typography system featuring custom heading and body pairings</li>
            <li>60-page brand guidelines document</li>
            <li>Business card, letterhead, and envelope designs</li>
            <li>Social media templates for Instagram, LinkedIn, and Behance</li>
            <li>Presentation deck template for client pitches</li>
            <li>Studio signage and environmental graphics</li>
            <li>Crew apparel designs (t-shirts, caps, lanyards)</li>
          </ul>
        </div>
      </section>

      <section className="px-5 pb-20 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-2xl font-bold mb-4">Have a Similar Project?</h2>
          <p className="leading-relaxed text-text-secondary mb-8">
            Whether you are launching a new creative venture or repositioning an established brand, we would love to hear about your vision.
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
