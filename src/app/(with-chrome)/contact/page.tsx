import type { Metadata } from "next";
import { ContactContent } from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact Us - Get a Free Quote | Eclipse Agency Riyadh",
  description:
    "Contact Eclipse Agency for branding, digital marketing, web development, and video production in Riyadh. Free consultation available. Serving Saudi Arabia, UAE & the Middle East.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Eclipse Agency - Free Consultation in Riyadh",
    description: "Get a free quote for branding, marketing, web development, and video production. Serving Saudi Arabia, UAE & the Middle East.",
    url: "https://www.eclipseagency.net/contact",
    siteName: "Eclipse Agency",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Contact Eclipse Agency - Free Quote",
    description: "Get a free consultation for branding, marketing, web development, and video production in Riyadh.",
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
