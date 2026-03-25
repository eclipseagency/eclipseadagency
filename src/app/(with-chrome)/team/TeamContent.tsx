"use client";

import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { TeamBuilder } from "./TeamBuilder";
import { useLocale } from "@/i18n/LocaleContext";

/* ------------------------------------------------------------------ */
/*  Icons (static, no translation needed)                              */
/* ------------------------------------------------------------------ */

const iconDollar = (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const iconPeople = (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const iconClock = (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const checkIcon = (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const checkIconSmall = (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const whatsappIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function TeamContent() {
  const { t } = useLocale();

  /* ── Data arrays (using t() for all text) ── */

  const challenges = [
    {
      icon: iconDollar,
      title: t("team.challenge1.title"),
      desc: t("team.challenge1.desc"),
    },
    {
      icon: iconPeople,
      title: t("team.challenge2.title"),
      desc: t("team.challenge2.desc"),
    },
    {
      icon: iconClock,
      title: t("team.challenge3.title"),
      desc: t("team.challenge3.desc"),
    },
  ];

  const solutionPoints = [
    {
      t: t("team.solution.point1.title"),
      d: t("team.solution.point1.desc"),
    },
    {
      t: t("team.solution.point2.title"),
      d: t("team.solution.point2.desc"),
    },
    {
      t: t("team.solution.point3.title"),
      d: t("team.solution.point3.desc"),
    },
  ];

  const advantages = [
    {
      stat: "70%",
      label: t("team.advantage1.label"),
      desc: t("team.advantage1.desc"),
    },
    {
      stat: "95%",
      label: t("team.advantage2.label"),
      desc: t("team.advantage2.desc"),
    },
    {
      stat: "2-4",
      label: t("team.advantage3.label"),
      desc: t("team.advantage3.desc"),
    },
  ];

  const capabilities = [
    {
      title: t("services.branding.title"),
      items: [
        t("team.cap.branding.item1"),
        t("team.cap.branding.item2"),
        t("team.cap.branding.item3"),
        t("team.cap.branding.item4"),
      ],
    },
    {
      title: t("services.marketing.title"),
      items: [
        t("team.cap.marketing.item1"),
        t("team.cap.marketing.item2"),
        t("team.cap.marketing.item3"),
        t("team.cap.marketing.item4"),
      ],
    },
    {
      title: t("team.cap.content.title"),
      items: [
        t("team.cap.content.item1"),
        t("team.cap.content.item2"),
        t("team.cap.content.item3"),
        t("team.cap.content.item4"),
      ],
    },
    {
      title: t("team.cap.webtech.title"),
      items: [
        t("team.cap.webtech.item1"),
        t("team.cap.webtech.item2"),
        t("team.cap.webtech.item3"),
        t("team.cap.webtech.item4"),
      ],
    },
  ];

  const multiplierBullets = [
    t("team.multiplier.bullet1"),
    t("team.multiplier.bullet2"),
    t("team.multiplier.bullet3"),
    t("team.multiplier.bullet4"),
  ];

  const steps = [
    {
      num: "01",
      title: t("process.step1.title"),
      desc: t("team.step1.desc"),
    },
    {
      num: "02",
      title: t("team.step2.title"),
      desc: t("team.step2.desc"),
    },
    {
      num: "03",
      title: t("team.step3.title"),
      desc: t("team.step3.desc"),
    },
    {
      num: "04",
      title: t("team.step4.title"),
      desc: t("team.step4.desc"),
    },
  ];

  const proofStats = [
    { num: "200+", label: t("about.stat.projects") },
    { num: "50+", label: t("about.stat.clients") },
    { num: "8+", label: t("about.stat.years") },
  ];

  const comparisons = [
    {
      option: t("team.compare.localHiring"),
      cost: t("team.compare.local.cost"),
      speed: t("team.compare.local.speed"),
      quality: t("team.compare.local.quality"),
      management: t("team.compare.local.management"),
      risk: t("team.compare.local.risk"),
    },
    {
      option: t("team.compare.freelancers"),
      cost: t("team.compare.freelancers.cost"),
      speed: t("team.compare.freelancers.speed"),
      quality: t("team.compare.freelancers.quality"),
      management: t("team.compare.freelancers.management"),
      risk: t("team.compare.freelancers.risk"),
    },
    {
      option: t("team.compare.remoteTeams"),
      cost: t("team.compare.remote.cost"),
      speed: t("team.compare.remote.speed"),
      quality: t("team.compare.remote.quality"),
      management: t("team.compare.remote.management"),
      risk: t("team.compare.remote.risk"),
    },
    {
      option: t("team.compare.eclipseTeam"),
      cost: t("team.compare.eclipse.cost"),
      speed: t("team.compare.eclipse.speed"),
      quality: t("team.compare.eclipse.quality"),
      management: t("team.compare.eclipse.management"),
      risk: t("team.compare.eclipse.risk"),
      highlight: true,
    },
  ];

  return (
    <>
      {/* ── Hero ── */}
      <PageHero
        badge={t("team.hero.badge")}
        title={t("team.hero.title")}
        subtitle={t("team.hero.subtitle")}
        image="/images/team-office/910d3c1a-642b-4b33-bcb3-d6590d5ee527.jpeg"
      />

      {/* ── The Challenge ── */}
      <SectionWrapper>
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.15em] text-primary">
            {t("team.challenge.badge")}
          </span>
          <h2 className="font-heading text-3xl font-bold md:text-4xl">
            {t("team.challenge.titleStart")}{" "}
            <span className="gradient-text">
              {t("team.challenge.titleHighlight")}
            </span>
          </h2>
          <p className="mt-4 text-text-secondary md:text-lg">
            {t("team.challenge.subtitle")}
          </p>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {challenges.map((c) => (
            <div
              key={c.title}
              className="rounded-2xl border border-border bg-bg-card p-7 transition-colors hover:border-border-hover"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                {c.icon}
              </div>
              <h3 className="mb-2 font-heading text-lg font-bold">{c.title}</h3>
              <p className="text-sm leading-relaxed text-text-secondary">
                {c.desc}
              </p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* ── The Solution ── */}
      <SectionWrapper dark>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.15em] text-primary">
              {t("team.solution.badge")}
            </span>
            <h2 className="font-heading text-3xl font-bold md:text-4xl">
              {t("team.solution.titleStart")}{" "}
              <span className="gradient-text">
                {t("team.solution.titleHighlight")}
              </span>
            </h2>
            <p className="mt-5 leading-relaxed text-text-secondary md:text-lg">
              {t("team.solution.desc")}
            </p>
            <div className="mt-8 space-y-4">
              {solutionPoints.map((item) => (
                <div key={item.t} className="flex gap-4">
                  <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                    {checkIcon}
                  </div>
                  <div>
                    <p className="font-bold">{item.t}</p>
                    <p className="mt-1 text-sm text-text-secondary">
                      {item.d}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border">
            <Image
              src="/images/team-office/WhatsApp Image 2026-03-08 at 2.20.25 AM (1).jpeg"
              alt="Eclipse Agency team in black polos at modern office"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </SectionWrapper>

      {/* ── Why It Works ── */}
      <SectionWrapper>
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.15em] text-primary">
            {t("team.advantage.badge")}
          </span>
          <h2 className="font-heading text-3xl font-bold md:text-4xl">
            {t("team.advantage.title")}
          </h2>
        </div>
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {advantages.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-heading text-5xl font-bold text-primary md:text-6xl">
                {s.stat}
              </div>
              <p className="mt-2 text-lg font-bold">{s.label}</p>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* ── Capabilities ── */}
      <SectionWrapper dark>
        <div className="mb-14">
          <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.15em] text-primary">
            {t("team.capabilities.badge")}
          </span>
          <h2 className="font-heading text-3xl font-bold md:text-4xl">
            {t("team.capabilities.title")}
          </h2>
          <p className="mt-4 max-w-2xl text-text-secondary md:text-lg">
            {t("team.capabilities.subtitle")}
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((cap) => (
            <div
              key={cap.title}
              className="rounded-2xl border border-border bg-bg-card p-6 transition-colors hover:border-border-hover"
            >
              <h3 className="mb-4 font-heading text-lg font-bold text-primary">
                {cap.title}
              </h3>
              <ul className="space-y-2.5">
                {cap.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-text-secondary"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 grid items-center gap-8 lg:grid-cols-2">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-border">
            <Image
              src="/images/team-office/DSC_7529-1536x1025.jpg"
              alt="Designer working on storyboard with drawing tablet"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-border">
            <Image
              src="/images/team-office/22167859-a1d9-4963-b7d0-efb4cbb352fe-1536x1025.jpeg"
              alt="After Effects editing at Eclipse studio"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </SectionWrapper>

      {/* ── Creative Studio Access (Multiplier Effect) ── */}
      <SectionWrapper>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border">
            <Image
              src="/images/team-office/2025-08-17.webp"
              alt="Designer working in Photoshop on Saudi client project"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div>
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.15em] text-primary">
              {t("team.multiplier.badge")}
            </span>
            <h2 className="font-heading text-3xl font-bold md:text-4xl">
              {t("team.multiplier.titleStart")}{" "}
              <span className="gradient-text">
                {t("team.multiplier.titleHighlight")}
              </span>
            </h2>
            <p className="mt-5 leading-relaxed text-text-secondary md:text-lg">
              {t("team.multiplier.desc")}
            </p>
            <div className="mt-6 space-y-3">
              {multiplierBullets.map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                    {checkIconSmall}
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* ── Interactive Team Builder ── */}
      <SectionWrapper dark>
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.15em] text-primary">
            {t("team.pricing.badge")}
          </span>
          <h2 className="font-heading text-3xl font-bold md:text-4xl">
            {t("team.pricing.titleStart")}{" "}
            <span className="gradient-text">
              {t("team.pricing.titleHighlight")}
            </span>
          </h2>
          <p className="mt-4 text-text-secondary md:text-lg">
            {t("team.pricing.subtitle")}
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-3xl">
          <TeamBuilder />
        </div>
      </SectionWrapper>

      {/* ── How It Works ── */}
      <SectionWrapper>
        <div className="mb-14 text-center">
          <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.15em] text-primary">
            {t("process.badge")}
          </span>
          <h2 className="font-heading text-3xl font-bold md:text-4xl">
            {t("team.howItWorks.titleStart")}{" "}
            <span className="gradient-text">
              {t("team.howItWorks.titleHighlight")}
            </span>
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div
              key={step.num}
              className="relative rounded-2xl border border-border bg-bg-card p-7 transition-colors hover:border-border-hover"
            >
              <span className="font-heading text-4xl font-bold text-primary/20">
                {step.num}
              </span>
              <h3 className="mt-2 font-heading text-lg font-bold">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-2xl border border-border">
          <div className="relative aspect-[16/7]">
            <Image
              src="/images/team-office/2024-05-08.webp"
              alt="Developer coding at Eclipse Agency office"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 768px"
            />
          </div>
        </div>
      </SectionWrapper>

      {/* ── Proof of Concept ── */}
      <SectionWrapper dark>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.15em] text-primary">
              {t("team.proof.badge")}
            </span>
            <h2 className="font-heading text-3xl font-bold md:text-4xl">
              {t("team.proof.titleStart")}{" "}
              <span className="gradient-text">
                {t("team.proof.titleHighlight")}
              </span>
            </h2>
            <p className="mt-5 leading-relaxed text-text-secondary md:text-lg">
              {t("team.proof.desc")}
            </p>
            <div className="mt-6 grid grid-cols-3 gap-4">
              {proofStats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-border bg-bg-card p-4 text-center"
                >
                  <div className="font-heading text-2xl font-bold text-primary">
                    {s.num}
                  </div>
                  <p className="mt-1 text-xs text-text-secondary">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border">
            <Image
              src="/images/team-office/DSC_7621-1536x1025.jpg"
              alt="Eclipse Agency full team group photo"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </SectionWrapper>

      {/* ── Competitive Comparison ── */}
      <SectionWrapper>
        <div className="mb-14 text-center">
          <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.15em] text-primary">
            {t("team.compare.badge")}
          </span>
          <h2 className="font-heading text-3xl font-bold md:text-4xl">
            {t("team.compare.title")}
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="px-4 py-3 font-bold">{t("team.compare.thOption")}</th>
                <th className="px-4 py-3 font-bold">{t("team.compare.thCost")}</th>
                <th className="px-4 py-3 font-bold">{t("team.compare.thSpeed")}</th>
                <th className="px-4 py-3 font-bold">{t("team.compare.thQuality")}</th>
                <th className="px-4 py-3 font-bold">{t("team.compare.thManagement")}</th>
                <th className="px-4 py-3 font-bold">{t("team.compare.thRisk")}</th>
              </tr>
            </thead>
            <tbody>
              {comparisons.map((row) => (
                <tr
                  key={row.option}
                  className={`border-b border-border transition-colors ${
                    row.highlight
                      ? "bg-primary/5 font-medium"
                      : "hover:bg-bg-elevated/50"
                  }`}
                >
                  <td className="px-4 py-3">
                    {row.highlight ? (
                      <span className="font-bold text-primary">
                        {row.option}
                      </span>
                    ) : (
                      row.option
                    )}
                  </td>
                  <td className="px-4 py-3">{row.cost}</td>
                  <td className="px-4 py-3">{row.speed}</td>
                  <td className="px-4 py-3">{row.quality}</td>
                  <td className="px-4 py-3">{row.management}</td>
                  <td className="px-4 py-3">{row.risk}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionWrapper>

      {/* ── CTA / Contact ── */}
      <SectionWrapper dark>
        <div className="mx-auto max-w-2xl text-center">
          <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.15em] text-primary">
            {t("team.cta.badge")}
          </span>
          <h2 className="font-heading text-3xl font-bold md:text-4xl lg:text-5xl">
            {t("team.cta.titleStart")}{" "}
            <span className="gradient-text">
              {t("team.cta.titleHighlight")}
            </span>
          </h2>
          <p className="mt-5 text-text-secondary md:text-lg">
            {t("team.cta.subtitle")}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://wa.me/201129560357?text=Hi%20Mustafa%2C%20I%27m%20interested%20in%20building%20a%20team%20with%20Eclipse."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full bg-[#25D366] px-8 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:bg-[#20bd5a] hover:shadow-[0_0_30px_rgba(37,211,102,0.3)]"
            >
              {whatsappIcon}
              {t("common.chatOnWhatsApp")}
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-border px-8 py-3.5 text-sm font-bold transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:text-primary"
            >
              {t("common.sendMessage")}
            </Link>
          </div>

          <div className="mt-12 flex flex-col items-center">
            <div className="h-16 w-16 overflow-hidden rounded-full border-2 border-primary/30 bg-bg-card">
              <Image
                src="/images/team-office/mustafa.jpeg"
                alt="Mustafa Halawa"
                width={64}
                height={64}
                className="h-full w-full object-cover"
              />
            </div>
            <p className="mt-3 font-heading text-lg font-bold">
              {t("team.cta.founderName")}
            </p>
            <p className="text-sm text-text-secondary">
              {t("team.cta.founderRole")}
            </p>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
