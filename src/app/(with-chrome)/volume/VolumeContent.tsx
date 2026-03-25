"use client";

import Image from "next/image";
import { useLocale } from "@/i18n/LocaleContext";
import { CtaBanner } from "@/components/sections/CtaBanner";

export function VolumeContent() {
  const { t } = useLocale();

  return (
    <main className="px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-4xl">
        <h1 className="font-heading text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
          {t("case.volume.title")}
        </h1>

        <div className="mt-6 space-y-6 text-lg leading-relaxed text-text-secondary md:text-xl">
          <p>{t("case.volume.intro1")}</p>
          <p>{t("case.volume.intro2")}</p>
          <p>{t("case.volume.intro3")}</p>
        </div>

        <div className="mt-12 overflow-hidden rounded-2xl border border-border">
          <Image
            src="/images/portfolio/volume.webp"
            alt="Volume branding presentation showcase"
            width={1200}
            height={3000}
            className="h-auto w-full"
          />
        </div>
      </div>

      <section className="px-5 pb-16 md:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl font-bold mb-6">{t("case.volume.overviewTitle")}</h2>
          <div className="mb-6 grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
            <div>
              <span className="block font-semibold text-text-primary">{t("case.common.client")}</span>
              <span className="text-text-secondary">Volume</span>
            </div>
            <div>
              <span className="block font-semibold text-text-primary">{t("case.common.industry")}</span>
              <span className="text-text-secondary">{t("case.volume.industry")}</span>
            </div>
            <div>
              <span className="block font-semibold text-text-primary">{t("case.common.services")}</span>
              <span className="text-text-secondary">{t("case.volume.services")}</span>
            </div>
            <div>
              <span className="block font-semibold text-text-primary">{t("case.common.timeline")}</span>
              <span className="text-text-secondary">{t("case.volume.timeline")}</span>
            </div>
          </div>
          <p className="leading-relaxed text-text-secondary mb-4">
            {t("case.volume.overviewDesc")}
          </p>
        </div>
      </section>

      <section className="px-5 pb-16 md:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl font-bold mb-6">{t("case.common.challengeTitle")}</h2>
          <p className="leading-relaxed text-text-secondary mb-4">{t("case.volume.challenge1")}</p>
          <p className="leading-relaxed text-text-secondary mb-4">{t("case.volume.challenge2")}</p>
          <p className="leading-relaxed text-text-secondary mb-4">{t("case.volume.challenge3")}</p>
        </div>
      </section>

      <section className="px-5 pb-16 md:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl font-bold mb-6">{t("case.common.approachTitle")}</h2>
          <p className="leading-relaxed text-text-secondary mb-4">{t("case.volume.approach1")}</p>
          <p className="leading-relaxed text-text-secondary mb-4">{t("case.volume.approach2")}</p>
          <p className="leading-relaxed text-text-secondary mb-4">{t("case.volume.approach3")}</p>
        </div>
      </section>

      <section className="px-5 pb-16 md:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl font-bold mb-6">{t("case.common.resultsTitle")}</h2>
          <ul className="list-disc space-y-2 pl-6 text-text-secondary mb-6">
            <li>{t("case.volume.result1")}</li>
            <li>{t("case.volume.result2")}</li>
            <li>{t("case.volume.result3")}</li>
            <li>{t("case.volume.result4")}</li>
            <li>{t("case.volume.result5")}</li>
            <li>{t("case.volume.result6")}</li>
            <li>{t("case.volume.result7")}</li>
            <li>{t("case.volume.result8")}</li>
            <li>{t("case.volume.result9")}</li>
            <li>{t("case.volume.result10")}</li>
          </ul>
        </div>
      </section>

      <section className="px-5 pb-20 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-2xl font-bold mb-4">{t("case.common.ctaTitle")}</h2>
          <p className="leading-relaxed text-text-secondary mb-8">{t("case.volume.ctaDesc")}</p>
          <a
            href="/contact"
            className="inline-block rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-8 py-3 font-semibold text-white transition hover:opacity-90"
          >
            {t("case.common.ctaButton")}
          </a>
        </div>
      </section>

      <CtaBanner />
    </main>
  );
}
