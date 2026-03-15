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
        url: "https://www.eclipseagency.net/images/portfolio/noon-studio.png",
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
    images: ["https://www.eclipseagency.net/images/portfolio/noon-studio.png"],
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
              "https://www.eclipseagency.net/images/portfolio/noon-studio.png",
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
            src="/images/portfolio/noon-studio.png"
            alt="Noon Studio brand identity showcase"
            width={1200}
            height={3000}
            className="h-auto w-full"
          />
        </div>
      </div>

      <CtaBanner />
      </main>
    </>
  );
}
