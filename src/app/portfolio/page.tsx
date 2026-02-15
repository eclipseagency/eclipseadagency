import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { PortfolioGrid } from "@/components/sections/PortfolioGrid";
import { CtaBanner } from "@/components/sections/CtaBanner";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Explore our portfolio of branding, web, digital marketing, production, and creative projects delivered for leading brands.",
};

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        badge="Portfolio"
        title="Our Creative Work"
        subtitle="A curated selection of projects that showcase our creative range and the results we deliver for our clients."
        image="https://eclipseadagency.com/wp-content/uploads/2023/03/WhatsApp-Image-2023-03-19-at-2.16.25-PM.jpeg"
      />
      <PortfolioGrid showCta={false} />
      <CtaBanner />
    </>
  );
}
