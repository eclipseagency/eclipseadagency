import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { servicesOverview } from "@/data/site";
import { PageHero } from "@/components/sections/PageHero";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { ArrowRightIcon } from "@/components/ui/Icons";

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
    title: service.title,
    description: service.description,
  };
}

export default async function SolutionPage({ params }: Props) {
  const { slug } = await params;
  const service = servicesOverview.find((s) => s.slug === slug);

  if (!service) notFound();

  // Get related services (exclude current)
  const related = servicesOverview.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <>
      <PageHero
        badge="Solutions"
        title={service.title}
        subtitle={service.description}
      />

      {/* Features section */}
      <SectionWrapper>
        <div className="mx-auto max-w-3xl">
          <span className="mb-3 block text-xs font-bold uppercase tracking-[0.15em] text-primary">
            What We Offer
          </span>
          <h2 className="mb-6 font-heading text-3xl font-bold md:text-4xl">
            Our {service.title} Services
          </h2>
          <p className="mb-8 text-text-secondary leading-relaxed">
            {service.description}
          </p>
          <ul className="space-y-4">
            {service.features.map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-3 rounded-xl border border-border bg-bg-card px-5 py-4 text-sm"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <span className="font-medium">{feature}</span>
              </li>
            ))}
          </ul>

          <Link
            href="/contact"
            className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-bold text-white transition-all duration-300 hover:bg-primary/90 hover:shadow-[0_0_30px_rgba(194,138,20,0.3)]"
          >
            Start a Project <ArrowRightIcon size={16} />
          </Link>
        </div>
      </SectionWrapper>

      {/* Related services */}
      <SectionWrapper dark>
        <div className="mb-10">
          <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.15em] text-primary">
            Explore More
          </span>
          <h2 className="font-heading text-3xl font-bold md:text-4xl">
            Other Solutions
          </h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((s) => (
            <Link
              key={s.slug}
              href={`/solutions/${s.slug}`}
              className="group overflow-hidden rounded-2xl border border-border bg-bg-card transition-all duration-300 hover:border-border-hover"
            >
              <div className="p-5">
                <h3 className="font-heading text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-sm text-text-secondary line-clamp-2">
                  {s.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </SectionWrapper>

      <CtaBanner />
    </>
  );
}
