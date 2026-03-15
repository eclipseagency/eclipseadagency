import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Grano de Café - Brand Identity | Eclipse Agency",
  description:
    "Grano de Café: Authentic Branding for Colombian Coffee Heritage. A rich, earthy identity celebrating the story of Colombian coffee.",
  alternates: {
    canonical: "https://www.eclipseagency.net/grano-de-cafe",
  },
  openGraph: {
    title: "Grano de Café - Brand Identity | Eclipse Agency",
    description:
      "Grano de Café: Authentic Branding for Colombian Coffee Heritage. A rich, earthy identity celebrating the story of Colombian coffee.",
    url: "https://www.eclipseagency.net/grano-de-cafe",
    type: "article",
    images: [
      {
        url: "https://www.eclipseagency.net/images/portfolio/granodecafe.webp",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Grano de Café - Brand Identity | Eclipse Agency",
    description:
      "Grano de Café: Authentic Branding for Colombian Coffee Heritage. A rich, earthy identity celebrating the story of Colombian coffee.",
    images: ["https://www.eclipseagency.net/images/portfolio/granodecafe.webp"],
  },
};

export default function GranoDeCafePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: "Grano de Cafe - Brand Identity",
            description:
              "Grano de Cafe: Authentic Branding for Colombian Coffee Heritage. A rich, earthy identity celebrating the story of Colombian coffee.",
            image:
              "https://www.eclipseagency.net/images/portfolio/granodecafe.webp",
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
          Grano de Café: Authentic Branding for Colombian Coffee Heritage
        </h1>

        <div className="mt-6 space-y-6 text-lg leading-relaxed text-text-secondary md:text-xl">
          <p>
            The branding for Grano de Café captures the authentic essence of
            Colombian coffee, blending tradition with modern design. A rich,
            earthy color palette reflects the warmth and depth of coffee culture,
            while traditional design elements pay homage to the heritage and
            craftsmanship behind every bean.
          </p>

          <p>
            Each aspect of the branding emphasizes quality and authenticity,
            celebrating the story of Colombian coffee through a cohesive visual
            identity. From packaging to promotional materials, the designs create
            an inviting and memorable experience, evoking the richness of flavor
            and the connection to coffee&apos;s origins that Grano de Café
            represents.
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-2xl border border-border">
          <Image
            src="/images/portfolio/granodecafe.webp"
            alt="Grano de Café branding presentation showcase"
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
