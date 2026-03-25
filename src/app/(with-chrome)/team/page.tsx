import type { Metadata } from "next";
import { TeamContent } from "./TeamContent";

export const metadata: Metadata = {
  title: "Build Your Team in Egypt -Managed Creative & Tech Teams | Eclipse Agency",
  description:
    "Get a fully managed, on-site creative and tech team in Egypt at 70% less cost. Designers, developers, marketers & video editors -working from our office under your direction. Starting from $3,000/month.",
  alternates: { canonical: "/team" },
  keywords: [
    "outsource creative team Egypt",
    "managed team Egypt",
    "hire designers Egypt",
    "hire developers Egypt",
    "offshore creative team",
    "build team in Egypt",
    "dedicated marketing team",
    "remote team Egypt Saudi Arabia",
    "outsource digital marketing team",
    "creative agency staffing",
    "فريق عمل مصر",
    "توظيف فريق إبداعي",
  ],
  openGraph: {
    title: "Build Your Managed Team in Egypt -70% Less Cost | Eclipse Agency",
    description:
      "Fully managed creative & tech teams working on-site in Egypt. Branding, marketing, web dev, video production -starting from $3,000/month. No freelancers, no remote unknowns.",
    url: "https://www.eclipseagency.net/team",
    siteName: "Eclipse Agency",
    type: "website",
    images: [
      {
        url: "/images/team-office/WhatsApp Image 2026-03-08 at 2.20.25 AM (1).jpeg",
        width: 1200,
        height: 630,
        alt: "Eclipse Agency team at office in Egypt",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Build Your Team in Egypt -From $3,000/month | Eclipse Agency",
    description:
      "Fully managed creative & tech teams. Designers, developers, marketers -working from our office. 70% less than hiring locally in Saudi Arabia.",
    images: ["/images/team-office/WhatsApp Image 2026-03-08 at 2.20.25 AM (1).jpeg"],
  },
};

const teamPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Managed Creative & Tech Teams in Egypt",
  description:
    "Eclipse Agency provides fully managed, on-site creative and technology teams in Egypt for businesses in Saudi Arabia and the UAE. Services include graphic design, social media management, video editing, web development, motion design, and media buying.",
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
    { "@type": "Country", name: "Egypt" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Team Packages",
    itemListElement: [
      {
        "@type": "Offer",
        name: "Smart Digital Marketing Team",
        description: "9-person team: 2x Graphic Designers, 2x Social Media Specialists, Content Creator, Video Editor, Account Manager, Motion Designer, SEO Specialist. Includes Marketing Director, HR, Accountant & CRM.",
        price: "3000",
        priceCurrency: "USD",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "3000",
          priceCurrency: "USD",
          billingDuration: "P1M",
        },
      },
      {
        "@type": "Offer",
        name: "Build Your Own Team",
        description: "Custom team with roles starting from $200/month per person. Choose from Graphic Designers, Social Media Specialists, Account Moderators, Motion Designers, Video Editors, Web Developers, and Media Buyers.",
        price: "200",
        priceCurrency: "USD",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "200",
          priceCurrency: "USD",
          billingDuration: "P1M",
          referenceQuantity: { "@type": "QuantitativeValue", value: "1", unitText: "person" },
        },
      },
    ],
  },
  offers: {
    "@type": "AggregateOffer",
    lowPrice: "200",
    highPrice: "3000",
    priceCurrency: "USD",
    offerCount: "2",
  },
};

export default function TeamPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(teamPageJsonLd) }}
      />
      <TeamContent />
    </>
  );
}
