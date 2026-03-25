import type { Metadata } from "next";
import ProfileContent from "./ProfileContent";

export const metadata: Metadata = {
  title: "Company Profile — Eclipse Agency | Creative Agency in Riyadh",
  description:
    "Eclipse Agency is a full-service creative agency in Riyadh, Saudi Arabia. Branding, digital marketing, web development, motion & production — 200+ projects delivered, 50+ clients, 8+ years of experience.",
  alternates: { canonical: "/profile" },
  keywords: [
    "eclipse agency",
    "creative agency Riyadh",
    "branding agency Saudi Arabia",
    "digital marketing agency Riyadh",
    "web development agency Saudi",
    "وكالة إبداعية الرياض",
    "وكالة تسويق السعودية",
    "إكليبس للإعلان",
  ],
  openGraph: {
    title: "Company Profile — Eclipse Agency",
    description:
      "Full-service creative agency in Riyadh. Branding, marketing, web dev, production — 200+ projects, 50+ clients.",
    url: "https://www.eclipseagency.net/profile",
    siteName: "Eclipse Agency",
    type: "website",
    images: [
      {
        url: "/images/team-office/WhatsApp Image 2026-03-08 at 2.20.25 AM (1).jpeg",
        width: 1200,
        height: 630,
        alt: "Eclipse Agency team",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Company Profile — Eclipse Agency",
    description:
      "Full-service creative agency in Riyadh. 200+ projects, 50+ clients, 8+ years.",
  },
};

export default function ProfilePage() {
  return <ProfileContent />;
}
