"use client";

import { useLocale } from "@/i18n/LocaleContext";
import { PageHero } from "@/components/sections/PageHero";
import { PortfolioGrid } from "@/components/sections/PortfolioGrid";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export function PortfolioContent() {
  const { t } = useLocale();

  return (
    <>
      <PageHero
        badge={t("portfolio.page.badge")}
        title={t("portfolio.page.title")}
        subtitle={t("portfolio.page.subtitle")}
        illustration="/images/hero-pages/portfolio-hero.svg"
      />
      <div className="mx-auto max-w-7xl px-5 pt-10 md:px-8">
        <Breadcrumbs
          items={[
            { label: t("breadcrumb.home"), href: "/" },
            { label: t("portfolio.page.badge") },
          ]}
        />
      </div>
      <PortfolioGrid showCta={false} />
      <CtaBanner />
    </>
  );
}
