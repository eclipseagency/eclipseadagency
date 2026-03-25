"use client";

import { useLocale } from "@/i18n/LocaleContext";
import { PageHero } from "@/components/sections/PageHero";
import { LocalizedHead } from "@/components/ui/LocalizedHead";

export function TermsHero() {
  const { t } = useLocale();
  return (
    <>
      <LocalizedHead
        titleEn="Terms of Service - Eclipse Agency"
        titleAr="شروط الخدمة - Eclipse Agency"
        descriptionEn="Terms of Service for Eclipse Agency. Read the terms and conditions that govern your use of our website and services."
        descriptionAr="شروط الخدمة لوكالة Eclipse. اقرأ الشروط والأحكام التي تحكم استخدامك لموقعنا وخدماتنا."
      />
      <PageHero
        badge={t("terms.badge")}
        title={t("terms.title")}
        subtitle={t("terms.subtitle")}
      />
    </>
  );
}
