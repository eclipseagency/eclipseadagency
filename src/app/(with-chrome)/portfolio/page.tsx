import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { PortfolioGrid } from "@/components/sections/PortfolioGrid";
import { CtaBanner } from "@/components/sections/CtaBanner";

export const metadata: Metadata = {
  title: "Portfolio - Our Creative Work & Case Studies | Eclipse Agency",
  description:
    "See Eclipse Agency's portfolio of branding, web development, digital marketing, video production, and 3D design projects delivered for clients across Saudi Arabia & the Middle East.",
  alternates: { canonical: "/portfolio" },
  openGraph: {
    title: "Portfolio - Creative Work & Case Studies",
    description: "Explore our portfolio of branding, web development, marketing, and production projects for clients across Saudi Arabia & the Middle East.",
    url: "https://www.eclipseagency.net/portfolio",
    siteName: "Eclipse Agency",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eclipse Agency Portfolio - Creative Work & Case Studies",
    description: "Branding, web development, marketing, and production projects for clients in Saudi Arabia & the Middle East.",
  },
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
