import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/sections/PageHero";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

export const metadata: Metadata = {
  title: "Noon Studio — Brand Identity | Eclipse Agency",
  description:
    "Noon Studio's brand identity reflects a modern, energetic character, combining bold patterns, dynamic shapes, and a harmonious color palette that embodies creativity and innovation.",
};

export default function NoonStudioPage() {
  return (
    <>
      <PageHero
        badge="Branding"
        title="Noon Studio"
        subtitle="A Bold Brand Identity for a Vibrant Creative Vision"
        image="https://eclipseadagency.com/wp-content/uploads/2024/12/cover-4.png"
      />

      <SectionWrapper>
        <p className="mx-auto max-w-3xl text-center text-lg leading-relaxed text-text-secondary md:text-xl">
          Noon Studio&apos;s brand identity reflects a modern, energetic
          character, combining bold patterns, dynamic shapes, and a harmonious
          color palette that embodies creativity and innovation. Every element
          has been carefully designed to express the studio&apos;s
          forward-thinking approach and its commitment to artistic expression.
        </p>
      </SectionWrapper>

      <SectionWrapper dark>
        <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-border">
          <Image
            src="https://eclipseadagency.com/wp-content/uploads/2024/12/noon-studio-branding.png"
            alt="Noon Studio brand identity showcase"
            width={1200}
            height={3000}
            className="h-auto w-full"
          />
        </div>
      </SectionWrapper>
    </>
  );
}
