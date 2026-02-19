import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Sparkle — Brand Identity | Eclipse Agency",
  description:
    "Sparkle Branding Project — Where Magic Happens. A captivating visual identity reflecting innovation, energy, and magic.",
};

export default function SparklePage() {
  return (
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
            src="https://eclipseadagency.com/wp-content/uploads/2024/12/sparkle-brand-presentation.png"
            alt="Sparkle brand presentation showcase"
            width={1200}
            height={3000}
            className="h-auto w-full"
          />
        </div>
      </div>
    </main>
  );
}
