"use client";

import { useEffect } from "react";
import { useLocale } from "@/i18n/LocaleContext";

interface LocalizedHeadProps {
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
}

export function LocalizedHead({
  titleEn,
  titleAr,
  descriptionEn,
  descriptionAr,
}: LocalizedHeadProps) {
  const { locale } = useLocale();

  useEffect(() => {
    const title = locale === "ar" ? titleAr : titleEn;
    const description = locale === "ar" ? descriptionAr : descriptionEn;

    document.title = title;

    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", description);
    }

    // Update OG tags
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", title);

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", description);

    // Update Twitter tags
    let twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.setAttribute("content", title);

    let twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) twDesc.setAttribute("content", description);
  }, [locale, titleEn, titleAr, descriptionEn, descriptionAr]);

  return null;
}
