import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ServicesDetailSection } from "./ServicesDetailSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { CtaBanner } from "@/components/sections/CtaBanner";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Full-service creative solutions including branding, digital marketing, web development, production, 3D design, and animation.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        badge="Solutions"
        title="Creative Services That Deliver Results"
        subtitle="From brand strategy to digital execution, we offer a comprehensive suite of services designed to elevate your business at every touchpoint."
        image="https://eclipseadagency.com/wp-content/uploads/2024/11/DSC_7529-1536x1025.jpg"
      />
      <ServicesDetailSection />
      <ProcessSection />
      <CtaBanner />
    </>
  );
}
