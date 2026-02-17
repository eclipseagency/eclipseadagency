import { Hero } from "@/components/sections/Hero";
import { AboutUsHome } from "@/components/sections/AboutUsHome";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { ProcessSection } from "@/components/sections/ProcessSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutUsHome />
      <ServicesGrid />
      <ProcessSection />
    </>
  );
}
