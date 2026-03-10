import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ServicesDetailSection } from "./ServicesDetailSection";

import { CtaBanner } from "@/components/sections/CtaBanner";

export const metadata: Metadata = {
  title: "Our Services — Branding, Marketing, Web Dev & Production",
  description:
    "Explore Eclipse Agency's full-service creative solutions: branding & identity, digital marketing & SEO, web & app development, video production, 3D design, and animation in Riyadh, Saudi Arabia.",
  alternates: { canonical: "/solutions" },
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
