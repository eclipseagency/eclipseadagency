"use client";

import Image from "next/image";
import { useLocale } from "@/i18n/LocaleContext";
import { CtaBanner } from "@/components/sections/CtaBanner";

export function SparkleContent() {
  const { t } = useLocale();

  return (
    <main className="px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-4xl">
        <h1 className="font-heading text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
          {t("case.sparkle.title")}
        </h1>

        <p className="mt-6 text-lg leading-relaxed text-text-secondary md:text-xl">
          {t("case.sparkle.subtitle")}
        </p>

        <h2 className="mt-10 font-heading text-2xl font-bold md:text-3xl">
          {t("case.sparkle.highlightsTitle")}
        </h2>

        <div className="mt-6 space-y-6 text-base leading-relaxed text-text-secondary md:text-lg">
          <p>
            <strong className="text-text-primary">
              {t("case.sparkle.highlight1Label")}
            </strong>{" "}
            {t("case.sparkle.highlight1Desc")}
          </p>

          <p>
            <strong className="text-text-primary">{t("case.sparkle.highlight2Label")}</strong>{" "}
            {t("case.sparkle.highlight2Desc")}
          </p>

          <p>
            <strong className="text-text-primary">{t("case.sparkle.highlight3Label")}</strong>{" "}
            {t("case.sparkle.highlight3Desc")}
          </p>
        </div>

        <p className="mt-8 text-lg leading-relaxed text-text-secondary md:text-xl">
          {t("case.sparkle.conclusion")}
        </p>

        <div className="mt-12 overflow-hidden rounded-2xl border border-border">
          <Image
            src="/images/portfolio/sparkle.webp"
            alt="Sparkle brand presentation showcase"
            width={1200}
            height={3000}
            className="h-auto w-full"
          />
        </div>
      </div>

      <section className="px-5 pb-16 md:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl font-bold mb-6">{t("case.sparkle.overviewTitle")}</h2>
          <div className="mb-6 grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
            <div>
              <span className="block font-semibold text-text-primary">{t("case.common.client")}</span>
              <span className="text-text-secondary">Sparkle</span>
            </div>
            <div>
              <span className="block font-semibold text-text-primary">{t("case.common.industry")}</span>
              <span className="text-text-secondary">{t("case.sparkle.industry")}</span>
            </div>
            <div>
              <span className="block font-semibold text-text-primary">{t("case.common.services")}</span>
              <span className="text-text-secondary">{t("case.sparkle.services")}</span>
            </div>
            <div>
              <span className="block font-semibold text-text-primary">{t("case.common.timeline")}</span>
              <span className="text-text-secondary">{t("case.sparkle.timeline")}</span>
            </div>
          </div>
          <p className="leading-relaxed text-text-secondary mb-4">
            {t("case.sparkle.overviewDesc")}
          </p>
        </div>
      </section>

      <section className="px-5 pb-16 md:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl font-bold mb-6">{t("case.common.challengeTitle")}</h2>
          <p className="leading-relaxed text-text-secondary mb-4">
            {t("case.sparkle.challenge1")}
          </p>
          <p className="leading-relaxed text-text-secondary mb-4">
            {t("case.sparkle.challenge2")}
          </p>
          <p className="leading-relaxed text-text-secondary mb-4">
            {t("case.sparkle.challenge3")}
          </p>
        </div>
      </section>

      <section className="px-5 pb-16 md:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl font-bold mb-6">{t("case.common.approachTitle")}</h2>
          <p className="leading-relaxed text-text-secondary mb-4">
            {t("case.sparkle.approach1")}
          </p>
          <p className="leading-relaxed text-text-secondary mb-4">
            {t("case.sparkle.approach2")}
          </p>
          <p className="leading-relaxed text-text-secondary mb-4">
            {t("case.sparkle.approach3")}
          </p>
        </div>
      </section>

      <section className="px-5 pb-16 md:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl font-bold mb-6">{t("case.common.resultsTitle")}</h2>
          <ul className="list-disc space-y-2 pl-6 text-text-secondary mb-6">
            <li>{t("case.sparkle.result1")}</li>
            <li>{t("case.sparkle.result2")}</li>
            <li>{t("case.sparkle.result3")}</li>
            <li>{t("case.sparkle.result4")}</li>
            <li>{t("case.sparkle.result5")}</li>
            <li>{t("case.sparkle.result6")}</li>
            <li>{t("case.sparkle.result7")}</li>
            <li>{t("case.sparkle.result8")}</li>
            <li>{t("case.sparkle.result9")}</li>
            <li>{t("case.sparkle.result10")}</li>
          </ul>
        </div>
      </section>

      <section className="px-5 pb-20 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-2xl font-bold mb-4">{t("case.common.ctaTitle")}</h2>
          <p className="leading-relaxed text-text-secondary mb-8">
            {t("case.sparkle.ctaDesc")}
          </p>
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
