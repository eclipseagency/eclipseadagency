import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Noon Studio — Brand Identity | Eclipse Agency",
  description:
    "Noon Studio's brand identity reflects a modern, energetic character, combining bold patterns, dynamic shapes, and a harmonious color palette that embodies creativity and innovation.",
};

export default function NoonStudioPage() {
  return (
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
            src="https://eclipseadagency.com/wp-content/uploads/2024/12/noon-studio-branding.png"
            alt="Noon Studio brand identity showcase"
            width={1200}
            height={3000}
            className="h-auto w-full"
          />
        </div>
      </div>
    </main>
  );
}
