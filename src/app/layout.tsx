import type { Metadata, Viewport } from "next";

import { siteConfig } from "@/data/site";
import { CookieConsent } from "@/components/CookieConsent";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0a0a0a",
};

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} - Creative Agency in Riyadh | Branding, Marketing & Web Development`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "Eclipse Agency is a full-service creative agency in Riyadh, Saudi Arabia. We specialize in branding, digital marketing, web development, video production, 3D design, and animation. 200+ projects delivered for 50+ clients.",
  keywords: [
    "creative agency Riyadh",
    "branding agency Saudi Arabia",
    "digital marketing agency Riyadh",
    "web development Riyadh",
    "video production Saudi Arabia",
    "3D design agency Riyadh",
    "animation studio Saudi Arabia",
    "social media marketing Riyadh",
    "logo design Riyadh",
    "brand identity agency Saudi Arabia",
    "Eclipse Agency",
    "advertising agency Riyadh",
    "وكالة إعلانات الرياض",
    "تسويق رقمي السعودية",
  ],
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: `${siteConfig.name} - Creative Agency in Riyadh | Branding, Marketing & Web Development`,
    description:
      "Full-service creative agency in Riyadh specializing in branding, digital marketing, web development, production, 3D design, and animation. 200+ projects delivered.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} - Creative Agency in Riyadh`,
    description:
      "Full-service creative agency specializing in branding, digital marketing, web development, production, 3D design, and animation.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "U7POCbOxNxUeVPtMOEHWInMeB_JSarotTCgv_SBtaR0",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500&display=swap"
          rel="stylesheet"
        />
        <link rel="alternate" type="application/rss+xml" title="Eclipse Agency Blog" href="https://www.eclipseagency.net/feed.xml" />
        <script src="https://player.vimeo.com/api/player.js" async />
      </head>
      <body className="min-h-screen bg-bg font-body text-text antialiased">
        {/* Skip to content — accessibility for keyboard users */}
        <a
          href="#main-content"
          className="fixed left-2 top-2 z-[200] -translate-y-20 rounded-lg bg-[#ff6b35] px-4 py-2 text-sm font-semibold text-white transition-transform focus:translate-y-0"
        >
          Skip to main content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": ["Organization", "LocalBusiness"],
                "@id": `${siteConfig.url}/#organization`,
                name: siteConfig.name,
                alternateName: "Eclipse Ad Agency",
                url: siteConfig.url,
                logo: {
                  "@type": "ImageObject",
                  url: "https://eclipseadagency.com/wp-content/uploads/2025/12/eclipse-logo-source-1.png",
                  width: 512,
                  height: 512,
                },
                image: "https://eclipseadagency.com/wp-content/uploads/2025/12/eclipse-logo-source-1.png",
                description: siteConfig.description,
                foundingDate: "2017",
                numberOfEmployees: { "@type": "QuantitativeValue", minValue: 10, maxValue: 20 },
                priceRange: "$$",
                currenciesAccepted: "SAR, USD",
                paymentAccepted: "Cash, Bank Transfer, PayPal",
                areaServed: [
                  { "@type": "Country", name: "Saudi Arabia" },
                  { "@type": "City", name: "Riyadh" },
                  { "@type": "City", name: "Jeddah" },
                  { "@type": "City", name: "Dammam" },
                  { "@type": "Country", name: "United Arab Emirates" },
                  { "@type": "Country", name: "Egypt" },
                ],
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Riyadh",
                  addressRegion: "Riyadh Region",
                  addressCountry: "SA",
                },
                geo: {
                  "@type": "GeoCoordinates",
                  latitude: 24.7136,
                  longitude: 46.6753,
                },
                contactPoint: [
                  {
                    "@type": "ContactPoint",
                    telephone: `+${siteConfig.whatsapp}`,
                    contactType: "sales",
                    availableLanguage: ["English", "Arabic"],
                    areaServed: ["SA", "AE", "EG"],
                  },
                  {
                    "@type": "ContactPoint",
                    email: siteConfig.email,
                    contactType: "customer service",
                  },
                ],
                sameAs: Object.values(siteConfig.social),
                hasOfferCatalog: {
                  "@type": "OfferCatalog",
                  name: "Creative Services",
                  itemListElement: [
                    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Branding & Identity", description: "Logo design, brand guidelines, visual identity systems, and brand strategy." } },
                    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Digital Marketing", description: "Social media management, SEO, SEM, content strategy, and analytics." } },
                    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Web & App Development", description: "Custom websites, e-commerce, mobile apps, and UI/UX design." } },
                    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Motion & Animation", description: "Motion graphics, explainer videos, character animation, and logo animation." } },
                    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Video Production", description: "Commercial production, corporate videos, product photography, and aerial filming." } },
                    { "@type": "Offer", itemOffered: { "@type": "Service", name: "3D Creations", description: "3D modeling, product visualization, architectural renders, and AR experiences." } },
                  ],
                },
                aggregateRating: {
                  "@type": "AggregateRating",
                  ratingValue: "4.9",
                  reviewCount: "50",
                  bestRating: "5",
                },
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "@id": `${siteConfig.url}/#website`,
                url: siteConfig.url,
                name: siteConfig.name,
                publisher: { "@id": `${siteConfig.url}/#organization` },
              },
              {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "What services does Eclipse Agency offer?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Eclipse Agency offers branding & identity design, digital marketing (SEO, social media, content strategy), web & app development, motion graphics & animation, video production, and 3D design & visualization.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Where is Eclipse Agency located?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Eclipse Agency is based in Riyadh, Saudi Arabia. We serve clients across Saudi Arabia, the UAE, and Egypt.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "How much does it cost to work with Eclipse Agency?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Project costs vary based on scope and requirements. We offer custom proposals for each project. Contact us at marketing@eclipseadagency.com for a free consultation and quote.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "How long does a branding project take?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "A typical branding project takes 4-8 weeks depending on complexity. This includes discovery, strategy, design, and refinement phases. Larger brand systems may take longer.",
                    },
                  },
                ],
              },
            ]),
          }}
        />
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
        <CookieConsent />
        {/* Statcounter */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              var sc_project=13210168;
              var sc_invisible=1;
              var sc_security="ecb1f29a";
            `,
          }}
        />
        <script src="https://www.statcounter.com/counter/counter.js" async />
        <noscript>
          <div className="statcounter">
            <a title="Web Analytics Made Easy - Statcounter" href="https://statcounter.com/" target="_blank" rel="noreferrer">
              <img
                className="statcounter"
                src="https://c.statcounter.com/13210168/0/ecb1f29a/1/"
                alt="Web Analytics Made Easy - Statcounter"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </a>
          </div>
        </noscript>
      </body>
    </html>
  );
}
