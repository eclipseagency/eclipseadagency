import type { Metadata } from "next";
import Image from "next/image";
import { CtaBanner } from "@/components/sections/CtaBanner";

export const metadata: Metadata = {
  title: "Sparkle — Brand Identity | Eclipse Agency",
  description:
    "Sparkle Branding Project — Where Magic Happens. A captivating visual identity reflecting innovation, energy, and magic through immersive space design and bold geometric patterns.",
};

export default function SparklePage() {
  return (
    <main className="px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-4xl">
        <h1 className="font-heading text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
          Sparkle Branding Project –{" "}
          <span className="gradient-text">Where Magic Happens</span>
        </h1>

        <p className="mt-6 text-lg leading-relaxed text-text-secondary md:text-xl">
          Eclipse Advertising Agency proudly partnered with Sparkle to bring
          their brand vision to life through dynamic and visually striking
          branding solutions. The project was focused on creating a captivating
          visual identity that reflects the essence of Sparkle: innovation,
          energy, and magic.
        </p>

        <div className="mt-12 space-y-8">
          <h2 className="font-heading text-2xl font-bold md:text-3xl">
            Key Highlights
          </h2>

          <div className="space-y-6">
            <div className="rounded-2xl border border-border bg-bg-elevated/30 p-6 md:p-8">
              <h3 className="font-heading text-lg font-semibold md:text-xl">
                Modern Aesthetic
              </h3>
              <p className="mt-3 leading-relaxed text-text-secondary">
                The branding features bold geometric patterns and a vibrant
                color palette, creating a contemporary and engaging visual
                language.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-bg-elevated/30 p-6 md:p-8">
              <h3 className="font-heading text-lg font-semibold md:text-xl">
                Immersive Space Design
              </h3>
              <p className="mt-3 leading-relaxed text-text-secondary">
                From custom wall graphics to a tailored reception area, the
                branding elements ensure a cohesive and immersive experience
                that enhances Sparkle&apos;s presence.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-bg-elevated/30 p-6 md:p-8">
              <h3 className="font-heading text-lg font-semibold md:text-xl">
                Tagline Integration
              </h3>
              <p className="mt-3 leading-relaxed text-text-secondary">
                The tagline, &ldquo;Where Magic Happens,&rdquo; is seamlessly
                incorporated into the design, reinforcing Sparkle&apos;s
                commitment to delivering extraordinary experiences.
              </p>
            </div>
          </div>

          <p className="text-lg leading-relaxed text-text-secondary">
            This project showcases our expertise in translating brand values
            into visually impactful environments that leave a lasting
            impression.
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-2xl border border-border">
          <Image
            src="https://eclipseadagency.com/wp-content/uploads/2024/12/sparkle-brand-presentation.png"
            alt="Sparkle brand presentation showcase"
            width={1200}
            height={3000}
            className="h-auto w-full"
          />
        </div>
      </div>

      <CtaBanner />
    </main>
  );
}
