import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ServicesDetailSection } from "./ServicesDetailSection";

import { CtaBanner } from "@/components/sections/CtaBanner";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Full-service creative solutions including branding, digital marketing, web development, production, 3D design, and animation.",
};

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        badge="Solutions"
        title="Creative Services That Deliver Results"
        subtitle="From brand strategy to digital execution, we offer a comprehensive suite of services designed to elevate your business at every touchpoint."
        illustration="/images/hero-pages/solutions-hero.svg"
      />
      <ServicesDetailSection />
      <CtaBanner />
    </>
  );
}
