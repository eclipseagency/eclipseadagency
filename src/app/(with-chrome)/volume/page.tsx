import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Volume — Brand Identity | Eclipse Agency",
  description:
    "Volume: Where Sophistication Meets Style. A brand identity that exudes luxury and modern sophistication for a refined haircare brand.",
};

export default function VolumePage() {
  return (
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
            src="https://eclipseadagency.com/wp-content/uploads/2024/12/volume-branding-presentation_11zon-1.png"
            alt="Volume branding presentation showcase"
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
