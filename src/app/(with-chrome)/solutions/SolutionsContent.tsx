"use client";

import { useLocale } from "@/i18n/LocaleContext";
import { PageHero } from "@/components/sections/PageHero";
import { ServicesDetailSection } from "./ServicesDetailSection";
import { CtaBanner } from "@/components/sections/CtaBanner";

export function SolutionsContent() {
  const { t } = useLocale();

  return (
    <>
      <PageHero
        badge={t("solutions.page.badge")}
        title={t("solutions.page.title")}
        subtitle={t("solutions.page.subtitle")}
        illustration="/images/hero-pages/solutions-hero.svg"
      />
      <ServicesDetailSection />
      <CtaBanner />
    </>
  );
}
