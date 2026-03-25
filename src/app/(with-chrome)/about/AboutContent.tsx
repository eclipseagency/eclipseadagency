"use client";

import Image from "next/image";
import { useLocale } from "@/i18n/LocaleContext";
import { PageHero } from "@/components/sections/PageHero";
import { aboutContent } from "@/data/site";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { MissionVision } from "@/components/sections/MissionVision";
import { ImageCarousel } from "@/components/ui/ImageCarousel";
import { PortfolioGrid } from "@/components/ui/PortfolioGrid";
import type { PortfolioProject } from "@/components/ui/PortfolioGrid";
import { ShowreelPlayer } from "@/components/ui/ShowreelPlayer";
import { ValuesGrid } from "./ValuesGrid";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

const profileImages = [
  {
    src: "/images/about/story-illustration.svg",
    alt: "Eclipse Agency story - from bold idea to creative powerhouse",
  },
  {
    src: "/images/about/office.webp",
    alt: "Eclipse Agency office",
  },
];

const projectImages = [
  "/images/about/gallery/01.webp",
  "/images/about/gallery/02.webp",
  "/images/about/gallery/03.webp",
  "/images/about/gallery/04.webp",
  "/images/about/gallery/05.webp",
  "/images/about/gallery/06.webp",
  "/images/about/gallery/07.webp",
  "/images/about/gallery/08.webp",
  "/images/about/gallery/09.webp",
  "/images/about/gallery/10.webp",
  "/images/about/gallery/11.webp",
  "/images/about/gallery/12.webp",
  "/images/about/gallery/13.webp",
];

const portfolioProjects: PortfolioProject[] = [
  {
    title: "Noon Studio",
    description:
      "The branding for Noon Studio reflects a modern and vibrant identity, featuring bold patterns, dynamic shapes, and a harmonious color palette that embodies creativity and innovation.",
    image:
      "/images/about/cover-4.webp",
    href: "/noon-studio",
  },
  {
    title: "Sparkle",
    description:
      'Crafted a bold, modern identity for Sparkle, featuring vibrant patterns and immersive design elements that bring their tagline, "Where Magic Happens," to life.',
    image:
      "/images/about/cover-5.webp",
    href: "/sparkle",
  },
  {
    title: "Volume",
    description:
      "The branding for Volume merges sophistication and style, showcasing elegant typography and luxurious design elements that perfectly complement the product's refined essence.",
    image:
      "/images/about/cover-6.webp",
    href: "/volume/",
    target: "_blank",
  },
  {
    title: "Sunny Beans",
    description:
      "The branding for Sunny Beans radiates warmth and joy, featuring earthy tones, playful patterns, and a sun-inspired logo that captures the spirit of community and a love for coffee.",
    image:
      "/images/about/cover-7.webp",
    href: "/sunny-beans/",
    target: "_blank",
  },
  {
    title: "Grano de Cafe",
    description:
      "The branding for Grano de Cafe captures the authentic essence of Colombian coffee with a rich, earthy color palette and traditional design elements, emphasizing quality and heritage.",
    image:
      "/images/about/granodecafe-cover.webp",
    href: "/grano-de-cafe/",
    target: "_blank",
  },
  {
    title: "For Cup",
    description:
      "The branding for For Cup blends modern minimalism with a playful edge, featuring clean typography and bold iconography that reflects a fresh and contemporary take on coffee culture.",
    image:
      "/images/about/cover-1.webp",
    href: "/forcup/",
    target: "_blank",
  },
  {
    title: "Qatf",
    description:
      "A fresh, modern brand identity emphasizing premium agricultural products with clean visuals and an organic aesthetic.",
    image:
      "/images/about/cover-2.webp",
    href: "/qatf/",
    target: "_blank",
  },
  {
    title: "Waf",
    description:
      "A bold, professional brand design showcasing innovation and excellence in business services with sleek, vibrant visuals.",
    image:
      "/images/about/cover-3.webp",
    href: "/waf/",
    target: "_blank",
  },
];

export function AboutContent() {
  const { t } = useLocale();

  return (
    <>
      <PageHero
        badge={t("about.page.badge")}
        title={t("about.page.title")}
        subtitle={t("about.page.subtitle")}
        illustration="/images/hero-pages/about-hero.svg"
      />

      {/* -- Story -- */}
      <SectionWrapper dark>
        <Breadcrumbs
          items={[
            { label: t("breadcrumb.home"), href: "/" },
            { label: t("nav.about") },
          ]}
        />
        <SectionHeader
          badge={t("about.page.storyBadge")}
          title={t("about.page.storyTitle")}
        />
        <div className="grid items-stretch gap-10 md:grid-cols-2">
          <div className="relative min-h-[300px] overflow-hidden rounded-2xl border border-border">
            <Image
              src={profileImages[0].src}
              alt={profileImages[0].alt}
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-6">
            {aboutContent.story.map((paragraph, i) => (
              <p
                key={i}
                className="text-base leading-relaxed text-text-secondary md:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* -- Showreel 2024 -- */}
      <SectionWrapper>
        <SectionHeader badge={t("about.page.showreelBadge")} title={t("about.page.showreelTitle")} />
        <div className="mx-auto max-w-4xl">
          <ShowreelPlayer
            videoUrl="/videos/showreel.mp4"
            thumbnailUrl="/images/about/cover-4.webp"
            title="Eclipse Agency - Showreel 2024"
          />
        </div>
      </SectionWrapper>

      {/* -- Mission & Vision -- */}
      <SectionWrapper dark>
        <MissionVision
          mission={aboutContent.mission}
          vision={aboutContent.vision}
        />
      </SectionWrapper>

      {/* -- Motion Reel -- */}
      <SectionWrapper>
        <SectionHeader badge={t("about.page.motionBadge")} title={t("about.page.motionTitle")} />
        <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-border">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
          >
            <source
              src="/videos/motion-reel.mp4"
              type="video/mp4"
            />
          </video>
        </div>
      </SectionWrapper>

      {/* -- Portfolio -- */}
      <SectionWrapper dark>
        <SectionHeader badge={t("about.page.portfolioBadge")} title={t("about.page.portfolioTitle")} />
        <PortfolioGrid projects={portfolioProjects} />
      </SectionWrapper>

      {/* -- Values -- */}
      <SectionWrapper>
        <SectionHeader
          badge={t("about.page.valuesBadge")}
          title={t("about.page.valuesTitle")}
          subtitle={t("about.page.valuesSubtitle")}
        />
        <ValuesGrid values={aboutContent.values} />
      </SectionWrapper>

      {/* -- Project Gallery -- */}
      <SectionWrapper dark>
        <SectionHeader badge={t("about.page.galleryBadge")} title={t("about.page.galleryTitle")} />
        <ImageCarousel
          images={projectImages.map((src, i) => ({
            src,
            alt: `Eclipse Agency project ${i + 1}`,
          }))}
        />
      </SectionWrapper>

      <CtaBanner />
    </>
  );
}
