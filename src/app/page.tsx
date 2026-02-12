import { Hero } from "@/components/sections/Hero";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { PortfolioGrid } from "@/components/sections/PortfolioGrid";
import { Testimonials } from "@/components/sections/Testimonials";
import { CtaBanner } from "@/components/sections/CtaBanner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <PortfolioGrid limit={4} />
      <ProcessSection />
      <Testimonials />
      <CtaBanner />
    </>
  );
}
