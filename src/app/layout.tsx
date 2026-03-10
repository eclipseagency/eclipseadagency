import type { Metadata, Viewport } from "next";
import { siteConfig } from "@/data/site";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0a0a0a",
};

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.name }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
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
        <script src="https://player.vimeo.com/api/player.js" async />
      </head>
      <body className="min-h-screen bg-bg font-body text-text antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: siteConfig.name,
              url: siteConfig.url,
              logo: `${siteConfig.url}/images/logo.png`,
              description: siteConfig.description,
              address: {
                "@type": "PostalAddress",
                streetAddress: "28 Sayed Afifi St., Al Golf, Heliopolis",
                addressLocality: "Cairo",
                addressCountry: "EG",
                postalCode: "11586",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: `+${siteConfig.whatsapp}`,
                contactType: "sales",
                availableLanguage: ["English", "Arabic"],
              },
              sameAs: Object.values(siteConfig.social),
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Creative Services",
                itemListElement: [
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Branding & Identity" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Digital Marketing" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Web & App Development" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Animation" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Production" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "3D Creations" } },
                ],
              },
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
