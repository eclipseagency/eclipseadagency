import type { Metadata } from "next";
import { AboutContent } from "./AboutContent";

export const metadata: Metadata = {
  title: "About Us - Creative Agency in Riyadh, Saudi Arabia",
  description:
    "Meet Eclipse Agency - a full-service creative team in Riyadh with 8+ years of experience, 200+ projects delivered, and 50+ happy clients across Saudi Arabia & the Middle East.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Eclipse Agency - Creative Team in Riyadh",
    description: "Full-service creative agency in Riyadh with 8+ years of experience. 200+ projects delivered, 50+ happy clients across Saudi Arabia & the Middle East.",
    url: "https://www.eclipseagency.net/about",
    siteName: "Eclipse Agency",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Eclipse Agency - Creative Team in Riyadh",
    description: "Full-service creative agency in Riyadh. 200+ projects, 50+ clients, 8+ years of experience.",
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
