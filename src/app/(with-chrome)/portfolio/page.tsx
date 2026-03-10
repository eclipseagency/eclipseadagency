import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { PortfolioGrid } from "@/components/sections/PortfolioGrid";
import { CtaBanner } from "@/components/sections/CtaBanner";

export const metadata: Metadata = {
  title: "Portfolio — Our Creative Work & Case Studies",
  description:
    "See Eclipse Agency's portfolio of branding, web development, digital marketing, video production, and 3D design projects delivered for clients across Saudi Arabia & the Middle East.",
  alternates: { canonical: "/portfolio" },
};

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        badge="Portfolio"
        title="Our Creative Work"
        subtitle="A curated selection of projects that showcase our creative range and the results we deliver for our clients."
        illustration="/images/hero-pages/portfolio-hero.svg"
      />
      <PortfolioGrid showCta={false} />
      <CtaBanner />
    </>
  );
}
