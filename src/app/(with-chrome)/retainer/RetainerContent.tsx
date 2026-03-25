"use client";

import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { ShowreelPlayer } from "@/components/ui/ShowreelPlayer";
import { portfolioItems } from "@/data/site";
import { useLocale } from "@/i18n/LocaleContext";

const whatsappLink =
  "https://wa.me/201129560357?text=" +
  encodeURIComponent("Hi Mustafa, I'd like to learn more about the retainer team.");

export default function RetainerContent() {
  const { t } = useLocale();

  const teamRoles = [
    { title: t("retainer.role1"), description: t("retainer.role1Desc"), icon: "\u{1F3A8}" },
    { title: t("retainer.role2"), description: t("retainer.role2Desc"), icon: "\u{1F3AC}" },
    { title: t("retainer.role3"), description: t("retainer.role3Desc"), icon: "\u270D\uFE0F" },
    { title: t("retainer.role4"), description: t("retainer.role4Desc"), icon: "\u{1F4C8}" },
    { title: t("retainer.role5"), description: t("retainer.role5Desc"), icon: "\u{1F4BB}" },
  ];

  const comparisonRows = [
    {
      label: t("retainer.compareCost"),
      local: "$5,000 \u2013 $15,000+",
      freelancer: "$2,000 \u2013 $5,000",
      eclipse: "Starting at $1,000",
    },
    {
      label: t("retainer.compareLimit"),
      local: "Fixed hours",
      freelancer: "Per project",
      eclipse: "Unlimited",
    },
    {
      label: t("retainer.compareFees"),
      local: "Visas, insurance, equipment",
      freelancer: "Revisions, rush fees",
      eclipse: "None",
    },
    {
      label: t("retainer.compareSize"),
      local: "1-2 people",
      freelancer: "1 person",
      eclipse: "5+ specialists",
    },
    {
      label: t("retainer.compareConsistency"),
      local: "High turnover",
      freelancer: "Different every time",
      eclipse: "Same dedicated team",
    },
    {
      label: t("retainer.compareManagement"),
      local: "You manage everything",
      freelancer: "You manage everything",
      eclipse: "We handle it",
    },
  ];

  return (
    <>
      {/* Hero */}
      <PageHero
        badge={t("retainer.badge")}
        title={t("retainer.title")}
        subtitle={t("retainer.subtitle")}
        image="/images/team-office/WhatsApp Image 2026-03-08 at 2.20.25 AM (1).jpeg"
      />

      {/* The Problem */}
      <SectionWrapper>
        <SectionHeader
          badge={t("retainer.problemBadge")}
          title={t("retainer.problemTitle")}
          subtitle={t("retainer.problemSubtitle")}
        />
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { title: t("retainer.problem1Title"), desc: t("retainer.problem1Desc"), icon: "\u{1F4B8}" },
            { title: t("retainer.problem2Title"), desc: t("retainer.problem2Desc"), icon: "\u{1F3B2}" },
            { title: t("retainer.problem3Title"), desc: t("retainer.problem3Desc"), icon: "\u{1F47B}" },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-border bg-bg-card p-6 md:p-8"
            >
              <span className="text-4xl">{item.icon}</span>
              <h3 className="mt-4 font-heading text-xl font-bold">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* The Solution */}
      <SectionWrapper dark>
        <SectionHeader
          badge={t("retainer.solutionBadge")}
          title={t("retainer.solutionTitle")}
          subtitle={t("retainer.solutionSubtitle")}
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {teamRoles.map((role) => (
            <div
              key={role.title}
              className="rounded-2xl border border-border bg-bg-card p-6 md:p-8 transition-colors hover:border-primary/30"
            >
              <span className="text-4xl">{role.icon}</span>
              <h3 className="mt-4 font-heading text-xl font-bold">
                {role.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                {role.description}
              </p>
            </div>
          ))}
          {/* Bonus card */}
          <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6 md:p-8">
            <span className="text-4xl">+</span>
            <h3 className="mt-4 font-heading text-xl font-bold text-primary">
              {t("retainer.alsoIncluded")}
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-text-secondary">
              <li>{t("retainer.included1")}</li>
              <li>{t("retainer.included2")}</li>
              <li>{t("retainer.included3")}</li>
              <li>{t("retainer.included4")}</li>
            </ul>
          </div>
        </div>
      </SectionWrapper>

      {/* What They Deliver */}
      <SectionWrapper>
        <SectionHeader
          badge={t("retainer.coverageBadge")}
          title={t("retainer.coverageTitle")}
          subtitle={t("retainer.coverageSubtitle")}
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              category: "Branding & Design",
              items: [
                "Logo & brand identity",
                "Social media designs",
                "Packaging design",
                "Presentations & pitch decks",
                "Print materials",
                "UI/UX design",
              ],
            },
            {
              category: "Video & Motion",
              items: [
                "Reels & stories",
                "Promotional videos",
                "Logo animations",
                "Motion graphics",
                "Video editing",
                "Animated ads",
              ],
            },
            {
              category: "Marketing & Content",
              items: [
                "Social media management",
                "Content writing & captions",
                "Ad campaigns (Meta, Google)",
                "SEO & analytics",
                "Email marketing",
                "Strategy & planning",
              ],
            },
            {
              category: "Web & Development",
              items: [
                "Website design & development",
                "Landing pages",
                "E-commerce stores",
                "Web app development",
                "Maintenance & updates",
                "Hosting & deployment",
              ],
            },
          ].map((group) => (
            <div
              key={group.category}
              className="rounded-2xl border border-border bg-bg-card p-6"
            >
              <h3 className="font-heading text-lg font-bold text-primary">
                {group.category}
              </h3>
              <ul className="mt-4 space-y-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-text-secondary"
                  >
                    <span className="mt-0.5 text-primary">&#x2713;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* The Real Office */}
      <SectionWrapper dark>
        <SectionHeader
          badge={t("retainer.officeBadge")}
          title={t("retainer.officeTitle")}
          subtitle={t("retainer.officeSubtitle")}
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            "/images/team-office/DSC_7529-1536x1025.jpg",
            "/images/team-office/DSC_7621-1536x1025.jpg",
            "/images/team-office/WhatsApp Image 2026-03-08 at 2.20.25 AM (1).jpeg",
            "/images/team-office/2024-05-08.webp",
            "/images/team-office/2024-05-08 (1).webp",
            "/images/team-office/910d3c1a-642b-4b33-bcb3-d6590d5ee527.jpeg",
          ].map((src, i) => (
            <div
              key={i}
              className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border"
            >
              <Image
                src={src}
                alt={`Eclipse Agency office ${i + 1}`}
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
        <div className="mt-10 grid gap-6 text-center md:grid-cols-3">
          {[
            { value: "30+", label: t("retainer.officeStatTeam") },
            { value: "200+", label: t("retainer.officeStatProjects") },
            { value: "8+", label: t("retainer.officeStatYears") },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="font-heading text-4xl font-bold text-primary md:text-5xl">
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-text-secondary">{stat.label}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Portfolio */}
      <SectionWrapper>
        <SectionHeader
          badge={t("retainer.portfolioBadge")}
          title={t("retainer.portfolioTitle")}
          subtitle={t("retainer.portfolioSubtitle")}
        />
        <div className="grid gap-5 grid-cols-2 md:grid-cols-4">
          {portfolioItems.map((project) => (
            <Link
              key={project.id}
              href={project.href || "#"}
              target={project.target}
              className="group relative aspect-square overflow-hidden rounded-xl border border-border"
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 flex flex-col items-start justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="mb-1 text-[10px] font-bold uppercase tracking-widest text-primary">
                  {project.category}
                </span>
                <p className="font-heading text-sm font-bold text-white">
                  {project.title}
                </p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button href="/portfolio" variant="outline" size="md">
            View Full Portfolio
          </Button>
        </div>
      </SectionWrapper>

      {/* Showreel */}
      <SectionWrapper dark>
        <SectionHeader
          badge={t("retainer.showreelBadge")}
          title={t("retainer.showreelTitle")}
        />
        <div className="mx-auto max-w-4xl">
          <ShowreelPlayer
            videoUrl="/videos/showreel.mp4"
            thumbnailUrl="/images/about/cover-4.webp"
            title="Eclipse Agency — Showreel 2024"
          />
        </div>
      </SectionWrapper>

      {/* Clients */}
      <SectionWrapper>
        <SectionHeader
          badge={t("retainer.clientsBadge")}
          title={t("retainer.clientsTitle")}
        />
        <div className="grid grid-cols-3 gap-6 md:grid-cols-4 lg:grid-cols-6">
          {[
            { src: "/images/profile/clients/iq.png", alt: "IQ" },
            { src: "/images/profile/clients/aramco.png", alt: "Aramco" },
            { src: "/images/profile/clients/faris.png", alt: "Faris Group" },
            { src: "/images/profile/clients/enter10.png", alt: "Enter10" },
            { src: "/images/profile/clients/owl.png", alt: "OWL Bowling" },
            { src: "/images/profile/clients/dual-sports.png", alt: "Dual Sports" },
            { src: "/images/profile/clients/alphagraphics.png", alt: "AlphaGraphics" },
            { src: "/images/profile/clients/unik.png", alt: "UNIK" },
            { src: "/images/profile/clients/hni.webp", alt: "HNI" },
            { src: "/images/profile/clients/rqeem.webp", alt: "Rqeem" },
            { src: "/images/profile/clients/tips.webp", alt: "Tips on Pips" },
            { src: "/images/profile/clients/koryo.webp", alt: "Koryo" },
          ].map((logo, i) => (
            <div
              key={i}
              className="flex items-center justify-center rounded-xl border border-border bg-bg-card p-5"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={100}
                height={60}
                className="h-10 w-auto object-contain opacity-60 transition-opacity hover:opacity-100"
              />
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* About Eclipse */}
      <SectionWrapper dark>
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
            <div className="relative h-28 w-28 flex-shrink-0 overflow-hidden rounded-2xl border border-border">
              <Image
                src="/images/team-office/mustafa.jpeg"
                alt="Mustafa Halawa — Founder of Eclipse Agency"
                fill
                className="object-cover"
                sizes="112px"
              />
            </div>
            <div>
              <span className="mb-2 inline-block rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-primary">
                {t("retainer.founderBadge")}
              </span>
              <h2 className="font-heading text-2xl font-bold">
                {t("retainer.founderName")}
              </h2>
              <p className="mt-3 text-text-secondary leading-relaxed">
                {t("retainer.founderBio")}
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                {[
                  "Riyadh, Saudi Arabia",
                  "8+ Years",
                  "50+ Clients",
                  "200+ Projects",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border bg-bg-card px-4 py-2 text-xs font-medium text-text-secondary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Comparison Table */}
      <SectionWrapper>
        <SectionHeader
          badge={t("retainer.compareBadge")}
          title={t("retainer.compareTitle")}
          subtitle={t("retainer.compareSubtitle")}
        />
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse">
            <thead>
              <tr>
                <th className="border-b border-border px-4 py-4 text-left text-sm font-medium text-text-muted">
                  &nbsp;
                </th>
                <th className="border-b border-border px-4 py-4 text-center text-sm font-medium text-text-muted">
                  {t("retainer.compareLocal")}
                </th>
                <th className="border-b border-border px-4 py-4 text-center text-sm font-medium text-text-muted">
                  {t("retainer.compareFreelancers")}
                </th>
                <th className="border-b border-primary/30 bg-primary/5 px-4 py-4 text-center text-sm font-bold text-primary rounded-t-lg">
                  {t("retainer.compareEclipse")}
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr key={row.label}>
                  <td className="border-b border-border px-4 py-4 text-sm font-medium text-text">
                    {row.label}
                  </td>
                  <td className="border-b border-border px-4 py-4 text-center text-sm text-text-secondary">
                    {row.local}
                  </td>
                  <td className="border-b border-border px-4 py-4 text-center text-sm text-text-secondary">
                    {row.freelancer}
                  </td>
                  <td className="border-b border-primary/10 bg-primary/5 px-4 py-4 text-center text-sm font-semibold text-primary">
                    {row.eclipse}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionWrapper>

      {/* Pricing */}
      <SectionWrapper dark>
        <div className="text-center">
          <span className="mb-4 inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-primary">
            {t("retainer.pricingBadge")}
          </span>
          <h2 className="font-heading text-3xl font-bold leading-tight md:text-4xl lg:text-[42px]">
            {t("retainer.pricingTitle")}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-text-secondary md:text-lg">
            {t("retainer.pricingSubtitle")}
          </p>
          <div className="mx-auto mt-10 max-w-lg">
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-8 md:p-12">
              <div className="flex items-baseline justify-center gap-2">
                <span className="font-heading text-6xl font-bold text-primary md:text-7xl lg:text-8xl">
                  $1,000
                </span>
                <span className="text-text-secondary text-lg">{t("retainer.pricingMonth")}</span>
              </div>
              <p className="mt-2 text-2xl font-semibold text-text md:text-3xl">
                3,800 SAR
              </p>
              <div className="mx-auto mt-8 flex max-w-md flex-wrap items-center justify-center gap-3">
                {[
                  t("retainer.unlimitedWork"),
                  t("retainer.noExtraFees"),
                  t("retainer.dedicatedTeam"),
                  t("retainer.cancelAnytime"),
                ].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border bg-bg-card px-4 py-2 text-sm font-medium text-text"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-8">
                <Link
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-hud btn-hud-primary inline-flex items-center justify-center px-10 py-3.5 text-[13px] font-bold uppercase tracking-[0.15em] transition-all duration-300"
                >
                  <span className="btn-hud-chevron btn-hud-chevron-l" aria-hidden>
                    &#x2039;&#x2039;
                  </span>
                  <span className="relative z-10">{t("retainer.pricingCta")}</span>
                  <span className="btn-hud-chevron btn-hud-chevron-r" aria-hidden>
                    &#x203A;&#x203A;
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <p className="mx-auto mt-6 max-w-xl text-text-muted text-sm">
            {t("retainer.pricingNote")}{" "}
            <Link href="/team" className="text-primary hover:underline">
              {t("retainer.pricingCustom")}
            </Link>
            .
          </p>
        </div>
      </SectionWrapper>

      {/* How It Works */}
      <SectionWrapper>
        <SectionHeader
          badge={t("retainer.howBadge")}
          title={t("retainer.howTitle")}
          subtitle={t("retainer.howSubtitle")}
        />
        <div className="grid gap-6 md:grid-cols-4">
          {[
            { step: "01", title: t("retainer.step1"), desc: t("retainer.step1Desc") },
            { step: "02", title: t("retainer.step2"), desc: t("retainer.step2Desc") },
            { step: "03", title: t("retainer.step3"), desc: t("retainer.step3Desc") },
            { step: "04", title: t("retainer.step4"), desc: t("retainer.step4Desc") },
          ].map((item) => (
            <div
              key={item.step}
              className="relative rounded-2xl border border-border bg-bg-card p-6 md:p-8"
            >
              <span className="font-heading text-5xl font-bold text-primary/20">
                {item.step}
              </span>
              <h3 className="mt-3 font-heading text-lg font-bold">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* FAQ */}
      <SectionWrapper dark>
        <SectionHeader
          badge={t("retainer.faqBadge")}
          title={t("retainer.faqTitle")}
        />
        <div className="mx-auto max-w-3xl space-y-6">
          {[
            { q: t("retainer.faq1Q"), a: t("retainer.faq1A") },
            { q: t("retainer.faq2Q"), a: t("retainer.faq2A") },
            { q: t("retainer.faq3Q"), a: t("retainer.faq3A") },
            { q: t("retainer.faq4Q"), a: t("retainer.faq4A") },
            { q: t("retainer.faq5Q"), a: t("retainer.faq5A") },
            { q: t("retainer.faq6Q"), a: t("retainer.faq6A") },
            { q: t("retainer.faq7Q"), a: t("retainer.faq7A") },
          ].map((faq) => (
            <div
              key={faq.q}
              className="rounded-2xl border border-border bg-bg-card p-6"
            >
              <h3 className="font-heading text-base font-bold">{faq.q}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Final CTA */}
      <SectionWrapper className="text-center">
        <h2 className="font-heading text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
          {t("retainer.ctaTitle")}{" "}
          <span className="gradient-text">{t("retainer.ctaHighlight")}</span>?
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-text-secondary md:text-lg">
          {t("retainer.ctaSubtitle")}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-hud btn-hud-primary inline-flex items-center justify-center px-10 py-3.5 text-[13px] font-bold uppercase tracking-[0.15em] transition-all duration-300"
          >
            <span className="btn-hud-chevron btn-hud-chevron-l" aria-hidden>
              &#x2039;&#x2039;
            </span>
            <span className="relative z-10">{t("retainer.ctaWhatsapp")}</span>
            <span className="btn-hud-chevron btn-hud-chevron-r" aria-hidden>
              &#x203A;&#x203A;
            </span>
          </Link>
          <Button href="/team" variant="outline" size="lg">
            {t("retainer.ctaCustom")}
          </Button>
        </div>
        <p className="mt-6 text-xs text-text-muted">
          Or email us at{" "}
          <a
            href="mailto:marketing@eclipseadagency.com"
            className="text-primary hover:underline"
          >
            marketing@eclipseadagency.com
          </a>
        </p>
      </SectionWrapper>
    </>
  );
}
