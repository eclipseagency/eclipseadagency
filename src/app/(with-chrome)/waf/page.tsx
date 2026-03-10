import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Waf — Brand Identity | Eclipse Agency",
  description:
    "Waf: Sleek and Professional Branding for Business Excellence. A bold identity showcasing innovation with sleek, vibrant visuals.",
};

export default function WafPage() {
  return (
    <main className="px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-4xl">
        <h1 className="font-heading text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
          Waf: Sleek and Professional Branding for Business Excellence
        </h1>

        <div className="mt-6 space-y-6 text-lg leading-relaxed text-text-secondary md:text-xl">
          <p>
            The branding for Waf reflects a bold and professional identity,
            designed to showcase innovation and excellence in business services.
            The sleek, vibrant visuals incorporate modern typography and dynamic
            layouts that emphasize forward-thinking solutions and reliability.
          </p>

          <p>
            By blending contemporary design elements with a vibrant color
            palette, the branding conveys a sense of energy and progressiveness,
            aligning perfectly with Waf&apos;s mission to lead in delivering
            exceptional business services. Every touchpoint, from digital assets
            to physical materials, reinforces Waf&apos;s reputation as a modern
            and trustworthy partner in the business world.
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-2xl border border-border">
          <Image
            src="https://eclipseadagency.com/wp-content/uploads/2024/12/waf-branding-presentation.png"
            alt="Waf branding presentation showcase"
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
