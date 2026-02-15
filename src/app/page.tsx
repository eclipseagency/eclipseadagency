import { Hero } from "@/components/sections/Hero";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { PortfolioGrid } from "@/components/sections/PortfolioGrid";
import { TestimonialsWall } from "@/components/sections/TestimonialsWall";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { AstroFloat } from "@/components/ui/AstroFloat";

export default function HomePage() {
  return (
    <>
      <AstroFloat />
      <Hero />
      <ServicesGrid />
      <PortfolioGrid limit={4} />
      <ProcessSection />
      <TestimonialsWall />
      <CtaBanner />
    </>
  );
}
