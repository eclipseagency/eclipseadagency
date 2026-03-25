"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/i18n/LocaleContext";
import { PageHero } from "@/components/sections/PageHero";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { ShowreelPlayer } from "@/components/ui/ShowreelPlayer";
import { siteConfig, aboutContent, portfolioItems } from "@/data/site";
import { VideoGrid } from "./VideoGrid";

const services = [
  { titleKey: "services.branding.title", descKey: "services.branding.desc", icon: "palette" },
  { titleKey: "services.marketing.title", descKey: "services.marketing.desc", icon: "trending" },
  { titleKey: "services.web.title", descKey: "services.web.desc", icon: "code" },
  { titleKey: "services.animation.title", descKey: "services.animation.desc", icon: "film" },
  { titleKey: "services.production.title", descKey: "services.production.desc", icon: "share" },
  { titleKey: "services.3d.title", descKey: "services.3d.desc", icon: "cube" },
];

const clientLogos = [
  { src: "/images/profile/clients/iq.png", alt: "IQ" },
  { src: "/images/profile/clients/dual-sports.png", alt: "Dual Sports" },
  { src: "/images/profile/clients/room.png", alt: "@Room" },
  { src: "/images/profile/clients/velan.png", alt: "Velan" },
  { src: "/images/profile/clients/dr-mohammed.png", alt: "Dr. Mohammed" },
  { src: "/images/profile/clients/owl.png", alt: "OWL Bowling" },
  { src: "/images/profile/clients/faris.png", alt: "Faris Group" },
  { src: "/images/profile/clients/enter10.png", alt: "Enter10" },
  { src: "/images/profile/clients/alphagraphics.png", alt: "AlphaGraphics" },
  { src: "/images/profile/clients/aramco.png", alt: "Aramco" },
  { src: "/images/profile/clients/unik.png", alt: "UNIK" },
  { src: "/images/profile/clients/hni.webp", alt: "HNI" },
  { src: "/images/profile/clients/rqeem.webp", alt: "Rqeem" },
  { src: "/images/profile/clients/tips.webp", alt: "Tips on Pips" },
  { src: "/images/profile/clients/koryo.webp", alt: "Koryo" },
  { src: "/images/profile/clients/fares.webp", alt: "Fares" },
  { src: "/images/profile/clients/notary.webp", alt: "Notary" },
  { src: "/images/profile/clients/moein.webp", alt: "Moein" },
  { src: "/images/profile/clients/alkhamees.webp", alt: "Al-Khamees" },
];

const officeImages = [
  "/images/team-office/DSC_7529-1536x1025.jpg",
  "/images/team-office/DSC_7621-1536x1025.jpg",
  "/images/team-office/WhatsApp Image 2026-03-08 at 2.20.25 AM (1).jpeg",
  "/images/team-office/2024-05-08.webp",
  "/images/team-office/2024-05-08 (1).webp",
  "/images/team-office/910d3c1a-642b-4b33-bcb3-d6590d5ee527.jpeg",
];

const socialMediaProjects = [
  { name: "Dima Dental Centers", image: "/images/profile/social/dima.jpeg" },
  { name: "UTD PADEL", image: "/images/profile/social/utd-padel.jpeg" },
  { name: "FilmBox", image: "/images/profile/social/filmbox.jpeg" },
  { name: "Dual Sport", image: "/images/profile/social/thumb-1.jpg" },
  { name: "@Room", image: "/images/profile/social/thumb-2.jpg" },
  { name: "SaudiKenz", image: "/images/profile/social/thumb-4.jpg" },
  { name: "Owl Bowling", image: "/images/profile/social/thumb-11.jpg" },
  { name: "Faris Group", image: "/images/profile/social/thumb-0.jpg" },
  { name: "Enter10", image: "/images/profile/social/thumb2-1.jpg" },
  { name: "Eclipse Agency", image: "/images/profile/social/sm-1.jpg" },
  { name: "Nick Saudi", image: "/images/profile/social/sm-2.jpg" },
  { name: "Al-Khamees", image: "/images/profile/social/sm-3.jpg" },
];

const whatsappLink =
  "https://wa.me/201129560357?text=" +
  encodeURIComponent("Hi, I'd like to learn more about Eclipse Agency.");

const serviceIcons: Record<string, React.ReactNode> = {
  palette: (
    <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-1 0-.83.67-1.5 1.5-1.5H16c3.31 0 6-2.69 6-6 0-4.96-4.49-9-10-9z" />
      <circle cx="6.5" cy="11.5" r="1.5" fill="currentColor" /><circle cx="9.5" cy="7.5" r="1.5" fill="currentColor" />
      <circle cx="14.5" cy="7.5" r="1.5" fill="currentColor" /><circle cx="17.5" cy="11.5" r="1.5" fill="currentColor" />
    </svg>
  ),
  trending: (
    <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" />
    </svg>
  ),
  code: (
    <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  film: (
    <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="2" width="20" height="20" rx="2.18" /><line x1="7" y1="2" x2="7" y2="22" />
      <line x1="17" y1="2" x2="17" y2="22" /><line x1="2" y1="12" x2="22" y2="12" />
      <line x1="2" y1="7" x2="7" y2="7" /><line x1="2" y1="17" x2="7" y2="17" />
      <line x1="17" y1="7" x2="22" y2="7" /><line x1="17" y1="17" x2="22" y2="17" />
    </svg>
  ),
  share: (
    <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  ),
  cube: (
    <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  ),
};

const profileJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Eclipse Agency",
  url: "https://www.eclipseagency.net",
  logo: "https://www.eclipseagency.net/images/logo.svg",
  description:
    "Full-service creative agency in Riyadh, Saudi Arabia specializing in branding, digital marketing, web development, and production.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Riyadh",
    addressCountry: "SA",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+201129560357",
    contactType: "sales",
    availableLanguage: ["English", "Arabic"],
  },
  sameAs: [
    siteConfig.social.linkedin,
    siteConfig.social.instagram,
    siteConfig.social.tiktok,
    siteConfig.social.facebook,
    siteConfig.social.behance,
  ],
};

export default function ProfileContent() {
  const { t } = useLocale();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profileJsonLd) }}
      />

      {/* ── Hero ── */}
      <PageHero
        badge={t("profile.badge")}
        title={t("profile.title")}
        subtitle={t("profile.subtitle")}
        image="/images/hero-pages/profile-hero.webp"
      />

      {/* ── Mission & Vision ── */}
      <SectionWrapper>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-bg-card p-8 md:p-10">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <svg className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h2 className="font-heading text-2xl font-bold">{t("profile.missionTitle")}</h2>
            <p className="mt-3 text-text-secondary leading-relaxed">
              {aboutContent.mission}
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-bg-card p-8 md:p-10">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <svg className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
              </svg>
            </div>
            <h2 className="font-heading text-2xl font-bold">{t("profile.visionTitle")}</h2>
            <p className="mt-3 text-text-secondary leading-relaxed">
              {aboutContent.vision}
            </p>
          </div>
        </div>
      </SectionWrapper>

      {/* ── Stats Bar ── */}
      <SectionWrapper dark className="!py-12 md:!py-16">
        <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
          {[
            { value: "200+", label: t("profile.statProjects") },
            { value: "50+", label: t("profile.statClients") },
            { value: "8+", label: t("profile.statYears") },
            { value: "30+", label: t("profile.statTeam") },
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

      {/* ── Services ── */}
      <SectionWrapper>
        <SectionHeader
          badge={t("profile.servicesBadge")}
          title={t("profile.servicesTitle")}
          subtitle={t("profile.servicesSubtitle")}
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.titleKey}
              className="rounded-2xl border border-border bg-bg-card p-6 md:p-8 transition-colors hover:border-primary/30"
            >
              <div className="mb-4 text-primary">
                {serviceIcons[service.icon]}
              </div>
              <h3 className="font-heading text-xl font-bold">{t(service.titleKey)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                {t(service.descKey)}
              </p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* ── Showreel ── */}
      <SectionWrapper dark>
        <SectionHeader
          badge={t("profile.showreelBadge")}
          title={t("profile.showreelTitle")}
          subtitle={t("profile.showreelSubtitle")}
        />
        <div className="mx-auto max-w-4xl">
          <ShowreelPlayer
            videoUrl="/videos/showreel.mp4"
            thumbnailUrl="/images/about/cover-4.webp"
            title="Eclipse Agency — Showreel 2024"
          />
        </div>
      </SectionWrapper>

      {/* ── Portfolio Videos ── */}
      <SectionWrapper>
        <SectionHeader
          badge={t("profile.videoBadge")}
          title={t("profile.videoTitle")}
          subtitle={t("profile.videoSubtitle")}
        />
        <VideoGrid />
      </SectionWrapper>

      {/* ── Branding Portfolio ── */}
      <SectionWrapper dark>
        <SectionHeader
          badge={t("profile.brandingBadge")}
          title={t("profile.brandingTitle")}
          subtitle={t("profile.brandingSubtitle")}
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
                <p className="mt-1 line-clamp-2 text-xs text-white/70">
                  {project.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button href="/portfolio" variant="outline" size="md">
            {t("profile.viewPortfolio")}
          </Button>
        </div>
      </SectionWrapper>

      {/* ── Social Media Clients ── */}
      <SectionWrapper>
        <SectionHeader
          badge={t("profile.socialBadge")}
          title={t("profile.socialTitle")}
          subtitle={t("profile.socialSubtitle")}
        />
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
          {socialMediaProjects.map((project) => (
            <div
              key={project.name}
              className="group relative aspect-square overflow-hidden rounded-xl border border-border"
            >
              <Image
                src={project.image}
                alt={project.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                <p className="text-xs font-bold text-white">{project.name}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* ── Web Development ── */}
      <SectionWrapper dark>
        <SectionHeader
          badge={t("profile.webdevBadge")}
          title={t("profile.webdevTitle")}
          subtitle={t("profile.webdevSubtitle")}
        />
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[
            { name: "Eclipse Cloud ERP", url: "eclipsecloud.io", image: "/images/profile/webdev/web-01.jpeg" },
            { name: "Jobly Philippines", url: "jobly.ph", image: "/images/profile/webdev/web-02.jpeg" },
            { name: "Eclipse Agency", url: "eclipseagency.net", image: "/images/profile/webdev/web-03.jpeg" },
            { name: "SaudiKenz", url: "saudikenz.com", image: "/images/profile/webdev/web-04.jpeg" },
            { name: "Faris Group", url: "farisgroup.net", image: "/images/profile/webdev/web-05.jpeg" },
            { name: "MDD", url: "mdd.sa", image: "/images/profile/webdev/web-06.jpeg" },
            { name: "OWL Bowling", url: "owlbowling.com", image: "/images/profile/webdev/web-07.jpeg" },
            { name: "Granite & More", url: "graniteandmore.co.uk", image: "/images/profile/webdev/web-08.jpeg" },
          ].map((site) => (
            <a
              key={site.url}
              href={`https://${site.url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-xl border border-border"
            >
              <Image
                src={site.image}
                alt={site.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <p className="font-heading text-sm font-bold text-white">
                  {site.name}
                </p>
                <p className="text-[11px] text-white/60">{site.url}</p>
              </div>
            </a>
          ))}
        </div>
      </SectionWrapper>

      {/* ── Clients ── */}
      <SectionWrapper>
        <SectionHeader
          badge={t("profile.clientsBadge")}
          title={t("profile.clientsTitle")}
        />
        <div className="grid grid-cols-3 gap-6 md:grid-cols-4 lg:grid-cols-6">
          {clientLogos.map((logo, i) => (
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

      {/* ── Our Office ── */}
      <SectionWrapper dark>
        <SectionHeader
          badge={t("profile.officeBadge")}
          title={t("profile.officeTitle")}
          subtitle={t("profile.officeSubtitle")}
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {officeImages.map((src, i) => (
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
      </SectionWrapper>

      {/* ── About the Founder ── */}
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
                {t("profile.founderBadge")}
              </span>
              <h2 className="font-heading text-2xl font-bold">
                {t("profile.founderName")}
              </h2>
              <p className="mt-3 text-text-secondary leading-relaxed">
                {t("profile.founderBio")}
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-border bg-bg-card px-4 py-2 text-xs font-medium text-text-secondary hover:text-primary transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-border bg-bg-card px-4 py-2 text-xs font-medium text-text-secondary hover:text-primary transition-colors"
                >
                  Instagram
                </a>
                <a
                  href={siteConfig.social.behance}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-border bg-bg-card px-4 py-2 text-xs font-medium text-text-secondary hover:text-primary transition-colors"
                >
                  Behance
                </a>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* ── Contact CTA ── */}
      <SectionWrapper className="text-center">
        <h2 className="font-heading text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
          {t("profile.ctaTitle")}{" "}
          <span className="gradient-text">{t("profile.ctaHighlight")}</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-text-secondary md:text-lg">
          {t("profile.ctaSubtitle")}
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
            <span className="relative z-10">{t("profile.ctaWhatsapp")}</span>
            <span className="btn-hud-chevron btn-hud-chevron-r" aria-hidden>
              &#x203A;&#x203A;
            </span>
          </Link>
          <Button href="/contact" variant="outline" size="lg">
            {t("profile.ctaContact")}
          </Button>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-text-muted">
          <a href={`mailto:${siteConfig.email}`} className="hover:text-primary transition-colors">
            {siteConfig.email}
          </a>
          <span className="hidden md:inline">|</span>
          <span>{siteConfig.address}</span>
        </div>
      </SectionWrapper>
    </>
  );
}
