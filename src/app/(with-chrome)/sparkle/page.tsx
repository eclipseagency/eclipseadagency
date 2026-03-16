import type { Metadata } from "next";
import Image from "next/image";
import { CtaBanner } from "@/components/sections/CtaBanner";

export const metadata: Metadata = {
  title: "Sparkle - Brand Identity | Eclipse Agency",
  description:
    "Sparkle Branding Project - Where Magic Happens. A captivating visual identity reflecting innovation, energy, and magic.",
  alternates: {
    canonical: "https://www.eclipseagency.net/sparkle",
  },
  openGraph: {
    title: "Sparkle - Brand Identity | Eclipse Agency",
    description:
      "Sparkle Branding Project - Where Magic Happens. A captivating visual identity reflecting innovation, energy, and magic.",
    url: "https://www.eclipseagency.net/sparkle",
    type: "article",
    images: [
      {
        url: "https://www.eclipseagency.net/images/portfolio/sparkle.webp",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sparkle - Brand Identity | Eclipse Agency",
    description:
      "Sparkle Branding Project - Where Magic Happens. A captivating visual identity reflecting innovation, energy, and magic.",
    images: ["https://www.eclipseagency.net/images/portfolio/sparkle.webp"],
  },
};

export default function SparklePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: "Sparkle - Brand Identity",
            description:
              "Sparkle Branding Project - Where Magic Happens. A captivating visual identity reflecting innovation, energy, and magic.",
            image:
              "https://www.eclipseagency.net/images/portfolio/sparkle.webp",
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
          Sparkle Branding Project – Where Magic Happens.
        </h1>

        <p className="mt-6 text-lg leading-relaxed text-text-secondary md:text-xl">
          Eclipse Advertising Agency proudly partnered with Sparkle to bring
          their brand vision to life through dynamic and visually striking
          branding solutions. The project focused on creating a captivating
          visual identity that reflects the essence of Sparkle: innovation,
          energy, and magic.
        </p>

        <h2 className="mt-10 font-heading text-2xl font-bold md:text-3xl">
          Key Highlights:
        </h2>

        <div className="mt-6 space-y-6 text-base leading-relaxed text-text-secondary md:text-lg">
          <p>
            <strong className="text-text-primary">
              Immersive Space Design:
            </strong>{" "}
            From custom wall graphics to a tailored reception area, the branding
            elements ensure a cohesive and immersive experience that enhances
            Sparkle&apos;s presence.
          </p>

          <p>
            <strong className="text-text-primary">Modern Aesthetic:</strong> The
            branding features bold geometric patterns and a vibrant color
            palette, creating a contemporary and engaging visual language.
          </p>

          <p>
            <strong className="text-text-primary">Tagline Integration:</strong>{" "}
            The tagline, &ldquo;Where Magic Happens,&rdquo; is seamlessly
            incorporated into the design, reinforcing Sparkle&apos;s commitment
            to delivering extraordinary experiences.
          </p>
        </div>

        <p className="mt-8 text-lg leading-relaxed text-text-secondary md:text-xl">
          This project showcases our expertise in translating brand values into
          visually impactful environments that leave a lasting impression.
        </p>

        <div className="mt-12 overflow-hidden rounded-2xl border border-border">
          <Image
            src="/images/portfolio/sparkle.webp"
            alt="Sparkle brand presentation showcase"
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
              <span className="text-text-secondary">Sparkle</span>
            </div>
            <div>
              <span className="block font-semibold text-text-primary">Industry</span>
              <span className="text-text-secondary">Entertainment &amp; Events</span>
            </div>
            <div>
              <span className="block font-semibold text-text-primary">Services</span>
              <span className="text-text-secondary">Branding, Space Design</span>
            </div>
            <div>
              <span className="block font-semibold text-text-primary">Timeline</span>
              <span className="text-text-secondary">8 Weeks</span>
            </div>
          </div>
          <p className="leading-relaxed text-text-secondary mb-4">
            Sparkle is an entertainment and events company that creates immersive experiences for families and young audiences across the Gulf region. Eclipse Agency was tasked with developing a comprehensive brand identity and environmental design system that would bring the magic of Sparkle to life across physical venues and digital channels.
          </p>
        </div>
      </section>

      <section className="px-5 pb-16 md:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl font-bold mb-6">The Challenge</h2>
          <p className="leading-relaxed text-text-secondary mb-4">
            Sparkle had an ambitious vision: to become the go-to entertainment brand for families in the region. However, their existing branding was inconsistent and fragmented. Different venues used different color schemes, signage styles, and messaging, creating a disjointed experience that confused visitors and diluted the brand&apos;s impact.
          </p>
          <p className="leading-relaxed text-text-secondary mb-4">
            The company was preparing to open two new locations and needed a unified visual system that could scale across multiple venues while still allowing each location to feel unique. The branding also had to resonate with both children (the primary audience) and their parents (the decision-makers), striking a balance between playful excitement and premium quality.
          </p>
          <p className="leading-relaxed text-text-secondary mb-4">
            Beyond the visual identity, Sparkle needed their physical spaces to feel truly immersive. They wanted guests to feel transported the moment they walked through the door, with every surface, texture, and detail reinforcing the brand&apos;s promise of magical experiences.
          </p>
        </div>
      </section>

      <section className="px-5 pb-16 md:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl font-bold mb-6">Our Approach</h2>
          <p className="leading-relaxed text-text-secondary mb-4">
            We approached the Sparkle project as a world-building exercise rather than a traditional branding assignment. Our team started by mapping the complete guest journey, from first seeing an ad online to walking through the entrance, experiencing the entertainment zones, and sharing photos afterward. This journey-mapping revealed critical touchpoints where the branding could create moments of delight.
          </p>
          <p className="leading-relaxed text-text-secondary mb-4">
            The visual identity we created centers on bold geometric patterns in a vibrant palette of electric purple, magenta, and gold. These patterns are modular and can be combined in different configurations for different zones within each venue, giving locations their own personality while maintaining brand cohesion. The tagline &ldquo;Where Magic Happens&rdquo; is woven throughout the experience, appearing not just on walls but integrated into floor graphics, ceiling installations, and interactive elements.
          </p>
          <p className="leading-relaxed text-text-secondary mb-4">
            For the environmental design, we created detailed specifications for wall graphics, reception areas, wayfinding signage, and photo opportunity zones. Each element was designed to be Instagram-worthy, understanding that social sharing is a core driver of awareness for entertainment brands. We also developed a comprehensive digital toolkit so that Sparkle&apos;s marketing team could produce on-brand content at speed.
          </p>
        </div>
      </section>

      <section className="px-5 pb-16 md:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl font-bold mb-6">Results &amp; Deliverables</h2>
          <ul className="list-disc space-y-2 pl-6 text-text-secondary mb-6">
            <li>Complete logo system with primary mark, icon, and lockup variations</li>
            <li>Modular geometric pattern library for environmental applications</li>
            <li>Full color palette with zone-specific accent schemes</li>
            <li>Custom wall graphics and murals for two venue locations</li>
            <li>Reception area design with branded fixtures and lighting specs</li>
            <li>Wayfinding and signage system for indoor entertainment venues</li>
            <li>Photo opportunity zone designs optimized for social sharing</li>
            <li>Social media template suite (Instagram Stories, Reels covers, posts)</li>
            <li>Brand guidelines document covering print, digital, and environmental use</li>
            <li>Merchandise designs including branded apparel and giveaway items</li>
          </ul>
        </div>
      </section>

      <section className="px-5 pb-20 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-2xl font-bold mb-4">Have a Similar Project?</h2>
          <p className="leading-relaxed text-text-secondary mb-8">
            If you are building an entertainment brand or need immersive environmental design, let us bring your vision to life.
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
