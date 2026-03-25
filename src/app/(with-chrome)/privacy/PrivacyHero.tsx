"use client";

import { useLocale } from "@/i18n/LocaleContext";
import { PageHero } from "@/components/sections/PageHero";
import { LocalizedHead } from "@/components/ui/LocalizedHead";

export function PrivacyHero() {
  const { t } = useLocale();
  return (
    <>
      <LocalizedHead
        titleEn="Privacy Policy - Eclipse Agency"
        titleAr="سياسة الخصوصية - Eclipse Agency"
        descriptionEn="Privacy Policy for Eclipse Agency. Learn how we collect, use, and protect your personal information."
        descriptionAr="سياسة الخصوصية لوكالة Eclipse. تعرّف على كيفية جمع واستخدام وحماية معلوماتك الشخصية."
      />
      <PageHero
        badge={t("privacy.badge")}
        title={t("privacy.title")}
        subtitle={t("privacy.subtitle")}
      />
    </>
  );
}
