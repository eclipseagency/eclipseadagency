import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/sections/PageHero";
import { aboutContent } from "@/data/site";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { ImageCarousel } from "@/components/ui/ImageCarousel";
import { PortfolioGrid } from "@/components/ui/PortfolioGrid";
import type { PortfolioProject } from "@/components/ui/PortfolioGrid";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Eclipse Agency — our mission, vision, values, and the team behind the creative work.",
};

const profileImages = [
  {
    src: "https://eclipseadagency.com/wp-content/uploads/2024/11/22167859-a1d9-4963-b7d0-efb4cbb352fe-1536x1025.jpeg",
    alt: "Eclipse Agency team at work",
  },
  {
    src: "https://eclipseadagency.com/wp-content/uploads/2024/11/DSC_7529-1536x1025.jpg",
    alt: "Eclipse Agency office",
  },
];

const projectImages = [
  "https://eclipseadagency.com/wp-content/uploads/2023/03/WhatsApp-Image-2023-03-19-at-2.15.58-PM.jpeg",
  "https://eclipseadagency.com/wp-content/uploads/2023/03/WhatsApp-Image-2023-03-19-at-2.16.25-PM.jpeg",
  "https://eclipseadagency.com/wp-content/uploads/2023/03/WhatsApp-Image-2023-03-19-at-2.16.16-PM.jpeg",
  "https://eclipseadagency.com/wp-content/uploads/2023/03/WhatsApp-Image-2023-03-19-at-2.16.15-PM.jpeg",
  "https://eclipseadagency.com/wp-content/uploads/2023/03/WhatsApp-Image-2023-03-19-at-2.16.22-PM-1.jpeg",
  "https://eclipseadagency.com/wp-content/uploads/2023/03/WhatsApp-Image-2023-03-19-at-2.16.18-PM.jpeg",
  "https://eclipseadagency.com/wp-content/uploads/2023/03/WhatsApp-Image-2023-03-19-at-2.16.18-PM-1.jpeg",
  "https://eclipseadagency.com/wp-content/uploads/2023/03/WhatsApp-Image-2023-03-19-at-2.16.25-PM-1.jpeg",
  "https://eclipseadagency.com/wp-content/uploads/2023/03/WhatsApp-Image-2023-03-19-at-2.16.19-PM.jpeg",
  "https://eclipseadagency.com/wp-content/uploads/2023/03/WhatsApp-Image-2023-03-19-at-2.16.23-PM.jpeg",
  "https://eclipseadagency.com/wp-content/uploads/2023/03/WhatsApp-Image-2023-03-19-at-2.16.22-PM.jpeg",
  "https://eclipseadagency.com/wp-content/uploads/2023/03/WhatsApp-Image-2023-03-19-at-2.16.17-PM.jpeg",
  "https://eclipseadagency.com/wp-content/uploads/2023/03/WhatsApp-Image-2023-03-19-at-2.16.00-PM.jpeg",
];

const portfolioProjects: PortfolioProject[] = [
  {
    title: "Noon Studio",
    description:
      "The branding for Noon Studio reflects a modern and vibrant identity, featuring bold patterns, dynamic shapes, and a harmonious color palette that embodies creativity and innovation.",
    image:
      "https://eclipseadagency.com/wp-content/uploads/2024/12/cover-4.png",
    href: "https://eclipseadagency.com/branding/noon-studio/",
  },
  {
    title: "Sparkle",
    description:
      'Crafted a bold, modern identity for Sparkle, featuring vibrant patterns and immersive design elements that bring their tagline, "Where Magic Happens," to life.',
    image:
      "https://eclipseadagency.com/wp-content/uploads/2024/12/cover-5.png",
    href: "https://eclipseadagency.com/branding/sparkle/",
  },
  {
    title: "Volume",
    description:
      "The branding for Volume merges sophistication and style, showcasing elegant typography and luxurious design elements that perfectly complement the product's refined essence.",
    image:
      "https://eclipseadagency.com/wp-content/uploads/2024/12/cover-6.png",
    href: "https://eclipseadagency.com/branding/volume/",
  },
  {
    title: "Sunny Beans",
    description:
      "The branding for Sunny Beans radiates warmth and joy, featuring earthy tones, playful patterns, and a sun-inspired logo that captures the spirit of community and a love for coffee.",
    image:
      "https://eclipseadagency.com/wp-content/uploads/2024/12/cover-7.png",
    href: "https://eclipseadagency.com/branding/sunny-beans/",
  },
  {
    title: "Grano de Café",
    description:
      "The branding for Grano de Café captures the authentic essence of Colombian coffee with a rich, earthy color palette and traditional design elements, emphasizing quality and heritage.",
    image:
      "https://eclipseadagency.com/wp-content/uploads/2024/12/Grano-de-cafe-cover-12.png",
    href: "https://eclipseadagency.com/branding/grano-de-cafe/",
  },
  {
    title: "For Cup",
    description:
      "The branding for For Cup blends modern minimalism with a playful edge, featuring clean typography and bold iconography that reflects a fresh and contemporary take on coffee culture.",
    image:
      "https://eclipseadagency.com/wp-content/uploads/2024/12/cover-1.png",
    href: "https://eclipseadagency.com/branding/forcup/",
  },
  {
    title: "Qatf",
    description:
      "A fresh, modern brand identity emphasizing premium agricultural products with clean visuals and an organic aesthetic.",
    image:
      "https://eclipseadagency.com/wp-content/uploads/2024/12/cover-2.png",
    href: "https://eclipseadagency.com/branding/qatf/",
  },
  {
    title: "Waf",
    description:
      "A bold, professional brand design showcasing innovation and excellence in business services with sleek, vibrant visuals.",
    image:
      "https://eclipseadagency.com/wp-content/uploads/2024/12/cover-3.png",
    href: "https://eclipseadagency.com/branding/waf/",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        badge="Profile"
        title="The Creative Force Behind the Work"
        subtitle="We are a team of strategists, designers, developers, and storytellers united by a passion for building brands that matter."
      />

      {/* ── Team / Office Photos ── */}
      <SectionWrapper>
        <div className="grid gap-6 md:grid-cols-2">
          {profileImages.map((img) => (
            <div
              key={img.src}
              className="overflow-hidden rounded-2xl border border-border"
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={1536}
                height={1025}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* ── Showreel 2024 ── */}
      <SectionWrapper dark>
        <SectionHeader badge="Showreel" title="Showreel 2024" />
        <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-border">
          <div className="relative" style={{ paddingTop: "56.25%" }}>
            <iframe
              src="https://player.vimeo.com/video/1051203598?h=a43672f073&badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&background=1"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
              className="absolute inset-0 h-full w-full"
              title="Eclipse Agency — Showreel 2024"
            />
          </div>
        </div>
      </SectionWrapper>

      {/* ── Mission & Vision ── */}
      <SectionWrapper>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-bg-card p-8 md:p-10">
            <span className="mb-4 inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Our Mission
            </span>
            <p className="text-lg leading-relaxed text-text-secondary">
              {aboutContent.mission}
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-bg-card p-8 md:p-10">
            <span className="mb-4 inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Our Vision
            </span>
            <p className="text-lg leading-relaxed text-text-secondary">
              {aboutContent.vision}
            </p>
          </div>
        </div>
      </SectionWrapper>

      {/* ── Story ── */}
      <SectionWrapper dark>
        <SectionHeader
          badge="Our Story"
          title="From Bold Idea to Creative Powerhouse"
        />
        <div className="mx-auto max-w-3xl space-y-6">
          {aboutContent.story.map((paragraph, i) => (
            <p
              key={i}
              className="text-base leading-relaxed text-text-secondary md:text-lg"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </SectionWrapper>

      {/* ── Motion Reel ── */}
      <SectionWrapper>
        <SectionHeader badge="Motion" title="Motion & Animation" />
        <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-border">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
          >
            <source
              src="https://eclipseadagency.com/wp-content/uploads/2024/08/WEBSITE-VIDEO-MOTION.mp4"
              type="video/mp4"
            />
          </video>
        </div>
      </SectionWrapper>

      {/* ── Portfolio ── */}
      <SectionWrapper dark>
        <SectionHeader badge="Portfolio" title="Our Branding Work" />
        <PortfolioGrid projects={portfolioProjects} />
      </SectionWrapper>

      {/* ── Values ── */}
      <SectionWrapper>
        <SectionHeader
          badge="Values"
          title="What Guides Us"
          subtitle="These principles shape every decision, every design, and every relationship we build."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {aboutContent.values.map((value) => (
            <div
              key={value.title}
              className="rounded-2xl border border-border bg-bg-card p-7 text-center"
            >
              <h3 className="mb-3 font-heading text-xl font-bold">
                {value.title}
              </h3>
              <p className="text-sm leading-relaxed text-text-secondary">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* ── Project Gallery ── */}
      <SectionWrapper dark>
        <SectionHeader badge="Our Work" title="Projects Gallery" />
        <ImageCarousel
          images={projectImages.map((src, i) => ({
            src,
            alt: `Eclipse Agency project ${i + 1}`,
          }))}
        />
      </SectionWrapper>

      {/* ── Team ── */}
      <SectionWrapper>
        <SectionHeader
          badge="Our Team"
          title="Meet the Minds Behind Eclipse"
          subtitle="A diverse team of creative professionals bringing expertise across design, strategy, development, and production."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {aboutContent.team.map((member) => (
            <div
              key={member.name}
              className="group overflow-hidden rounded-2xl border border-border bg-bg-card"
            >
              <div className="aspect-square overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={400}
                  height={400}
                  unoptimized
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5 text-center">
                <h3 className="font-heading text-base font-bold">
                  {member.name}
                </h3>
                <p className="mt-1 text-xs text-text-muted">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <CtaBanner />
    </>
  );
}
