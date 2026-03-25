import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { servicesOverview, siteConfig } from "@/data/site";
import { SolutionDetailContent } from "./SolutionDetailContent";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return servicesOverview.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesOverview.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: `${service.title} Services - Eclipse Agency Riyadh`,
    description: `${service.description} Get a free quote from Eclipse Agency, Riyadh's leading creative agency.`,
    alternates: { canonical: `/solutions/${slug}` },
    openGraph: {
      title: `${service.title} Services - Eclipse Agency Riyadh`,
      description: service.description,
      url: `https://www.eclipseagency.net/solutions/${slug}`,
      siteName: "Eclipse Agency",
      type: "website",
      images: [{ url: service.image, width: 1200, height: 630, alt: `${service.title} - Eclipse Agency` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} Services | Eclipse Agency`,
      description: service.description,
      images: [service.image],
    },
  };
}

export default async function SolutionPage({ params }: Props) {
  const { slug } = await params;
  const service = servicesOverview.find((s) => s.slug === slug);

  if (!service) notFound();

  // Get related services (exclude current)
  const related = servicesOverview
    .filter((s) => s.slug !== slug)
    .slice(0, 3)
    .map((s) => ({ slug: s.slug, image: s.image }));

  return (
    <SolutionDetailContent
      service={{
        slug: service.slug,
        image: service.image,
        featureCount: service.features.length,
        whatsapp: siteConfig.whatsapp,
      }}
      related={related}
    />
  );
}
