"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/i18n/LocaleContext";
import { PageHero } from "@/components/sections/PageHero";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

interface ServiceData {
  slug: string;
  image: string;
  featureCount: number;
  whatsapp: string;
}

interface RelatedService {
  slug: string;
  image: string;
}

interface Props {
  service: ServiceData;
  related: RelatedService[];
}

export function SolutionDetailContent({ service, related }: Props) {
  const { t } = useLocale();

  const slug = service.slug;
  const keyPrefix = `solutions.${slug}.page`;

  const title = t(`${keyPrefix}.title`);
  const description = t(`${keyPrefix}.description`);

  // Build features array from translation keys
  const features: string[] = [];
  for (let i = 1; i <= service.featureCount; i++) {
    features.push(t(`${keyPrefix}.feature${i}`));
  }

  return (
    <>
      <PageHero
        badge={t("solutions.detail.badge")}
        title={title}
        subtitle={description}
        image={service.image}
      />

      {/* Features section */}
      <SectionWrapper>
        <Breadcrumbs
          items={[
            { label: t("breadcrumb.home"), href: "/" },
            { label: t("solutions.page.badge"), href: "/solutions" },
            { label: title },
          ]}
        />
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Service image */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border">
            <Image
              src={service.image}
              alt={title}
              width={800}
              height={600}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Features list */}
          <div className="flex flex-col justify-center">
            <span className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-primary">
              {t("solutions.detail.whatWeOffer")}
            </span>
            <h2 className="mb-6 font-heading text-3xl font-bold md:text-4xl">
              {t("solutions.detail.ourServices").replace("{service}", title)}
            </h2>
            <p className="mb-8 text-text-secondary leading-relaxed">
              {description}
            </p>
            <ul className="space-y-4">
              {features.map((feature) => (
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

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex w-fit items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-bold text-white transition-all duration-300 hover:bg-primary/90 hover:shadow-[0_0_30px_rgba(194,138,20,0.3)]"
              >
                {t("solutions.detail.startProject")} <ArrowRightIcon size={16} />
              </Link>
              <a
                href={`https://wa.me/${service.whatsapp}?text=${encodeURIComponent(t("solutions.detail.whatsappMessage").replace("{service}", title))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-2 rounded-full border border-[#25D366]/20 bg-[#25D366]/10 px-7 py-3 text-sm font-bold text-[#25D366] transition-all duration-300 hover:border-[#25D366]/40 hover:bg-[#25D366]/20"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                {t("solutions.detail.whatsappUs")}
              </a>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Related services */}
      <SectionWrapper dark>
        <div className="mb-10">
          <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.15em] text-primary">
            {t("solutions.detail.exploreMore")}
          </span>
          <h2 className="font-heading text-3xl font-bold md:text-4xl">
            {t("solutions.detail.otherSolutions")}
          </h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((s) => {
            const relatedTitle = t(`solutions.${s.slug}.page.title`);
            const relatedDesc = t(`solutions.${s.slug}.page.description`);
            return (
              <Link
                key={s.slug}
                href={`/solutions/${s.slug}`}
                className="group overflow-hidden rounded-2xl border border-border bg-bg-card transition-all duration-300 hover:border-border-hover"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={s.image}
                    alt={relatedTitle}
                    width={600}
                    height={340}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                </div>
                <div className="p-5">
                  <h3 className="font-heading text-lg font-bold">{relatedTitle}</h3>
                  <p className="mt-2 text-sm text-text-secondary line-clamp-2">
                    {relatedDesc}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </SectionWrapper>

      <CtaBanner />
    </>
  );
}
