import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Qatf - Brand Identity | Eclipse Agency",
  description:
    "Qatf: Fresh Branding for Premium Agricultural Products. A modern identity emphasizing sustainability and natural excellence.",
  alternates: {
    canonical: "https://www.eclipseagency.net/qatf",
  },
  openGraph: {
    title: "Qatf - Brand Identity | Eclipse Agency",
    description:
      "Qatf: Fresh Branding for Premium Agricultural Products. A modern identity emphasizing sustainability and natural excellence.",
    url: "https://www.eclipseagency.net/qatf",
    type: "article",
    images: [
      {
        url: "https://www.eclipseagency.net/images/portfolio/qatf.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Qatf - Brand Identity | Eclipse Agency",
    description:
      "Qatf: Fresh Branding for Premium Agricultural Products. A modern identity emphasizing sustainability and natural excellence.",
    images: ["https://www.eclipseagency.net/images/portfolio/qatf.png"],
  },
};

export default function QatfPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: "Qatf - Brand Identity",
            description:
              "Qatf: Fresh Branding for Premium Agricultural Products. A modern identity emphasizing sustainability and natural excellence.",
            image:
              "https://www.eclipseagency.net/images/portfolio/qatf.png",
            creator: {
              "@type": "Organization",
              name: "Eclipse Agency",
              url: "https://www.eclipseagency.net",
            },
          }),
        }}
      />
      <main className="px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-4xl">
        <h1 className="font-heading text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
          Qatf: Fresh Branding for Premium Agricultural Products
        </h1>

        <div className="mt-6 space-y-6 text-lg leading-relaxed text-text-secondary md:text-xl">
          <p>
            The branding for Qatf embodies a fresh and modern identity,
            highlighting the premium quality of its agricultural products. With
            clean visuals and an organic aesthetic, the design emphasizes the
            brand&apos;s commitment to sustainability and natural excellence.
          </p>

          <p>
            The logo and color palette reflect the essence of fresh produce,
            while the minimalistic layouts create a sense of elegance and
            trustworthiness. Qatf&apos;s branding is tailored to appeal to
            consumers who value quality, health, and eco-friendly practices,
            ensuring a strong and lasting connection with its audience.
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-2xl border border-border">
          <Image
            src="/images/portfolio/qatf.png"
            alt="Qatf branding presentation showcase"
            width={1200}
            height={3000}
            className="h-auto w-full"
          />
        </div>
      </div>
      </main>
    </>
  );
}
