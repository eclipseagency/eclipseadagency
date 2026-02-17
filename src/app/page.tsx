import { Hero } from "@/components/sections/Hero";
import { AboutUsHome } from "@/components/sections/AboutUsHome";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { PortfolioGrid } from "@/components/sections/PortfolioGrid";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutUsHome />
      <ServicesGrid />
      <PortfolioGrid limit={4} />
      <ProcessSection />
    </>
  );
}
