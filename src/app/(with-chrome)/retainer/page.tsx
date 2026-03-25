import type { Metadata } from "next";
import RetainerContent from "./RetainerContent";

export const metadata: Metadata = {
  title:
    "Your Dedicated Creative & Marketing Team | Eclipse Agency",
  description:
    "A full creative, marketing, and development team working from our office — dedicated to your business. Unlimited work, one fixed monthly price. Serving Saudi Arabia & the Gulf.",
  alternates: { canonical: "/retainer" },
  keywords: [
    "dedicated marketing team",
    "creative team retainer",
    "managed creative team Egypt",
    "marketing team Saudi Arabia",
    "outsource design team Gulf",
    "unlimited design service",
    "dedicated development team",
    "فريق تسويق مخصص",
    "فريق تصميم كامل",
    "فريق عمل متكامل",
  ],
  openGraph: {
    title: "Your Dedicated Creative & Marketing Team | Eclipse Agency",
    description:
      "A full team of designers, marketers, content writers, and developers — working from our office, dedicated to your business. Unlimited work, fixed monthly price.",
    url: "https://www.eclipseagency.net/retainer",
    siteName: "Eclipse Agency",
    type: "website",
    images: [
      {
        url: "/images/team-office/WhatsApp Image 2026-03-08 at 2.20.25 AM (1).jpeg",
        width: 1200,
        height: 630,
        alt: "Eclipse Agency dedicated team office",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Dedicated Creative & Marketing Team | Eclipse Agency",
    description:
      "Designers, marketers, developers — one dedicated team, unlimited work, fixed monthly price.",
    images: [
      "/images/team-office/WhatsApp Image 2026-03-08 at 2.20.25 AM (1).jpeg",
    ],
  },
};

const retainerJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Eclipse Retainer — Dedicated Creative & Tech Team",
  description:
    "A dedicated creative and technology team including graphic design, motion design, content writing, digital marketing, and web development — working from our office under your direction with unlimited monthly output.",
  provider: {
    "@type": "Organization",
    name: "Eclipse Agency",
    url: "https://www.eclipseagency.net",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Riyadh",
      addressCountry: "SA",
    },
  },
  areaServed: [
    { "@type": "Country", name: "Saudi Arabia" },
    { "@type": "Country", name: "United Arab Emirates" },
    { "@type": "Country", name: "Qatar" },
    { "@type": "Country", name: "Kuwait" },
    { "@type": "Country", name: "Bahrain" },
    { "@type": "Country", name: "Oman" },
  ],
  offers: {
    "@type": "Offer",
    name: "Monthly Retainer",
    price: "1000",
    priceCurrency: "USD",
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: "1000",
      priceCurrency: "USD",
      billingDuration: "P1M",
    },
  },
};

export default function RetainerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(retainerJsonLd) }}
      />
      <RetainerContent />
    </>
  );
}
