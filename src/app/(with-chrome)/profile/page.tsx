import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { ShowreelPlayer } from "@/components/ui/ShowreelPlayer";
import { siteConfig, aboutContent, portfolioItems } from "@/data/site";
import { VideoGrid } from "./VideoGrid";

export const metadata: Metadata = {
  title: "Company Profile — Eclipse Agency | Creative Agency in Riyadh",
  description:
    "Eclipse Agency is a full-service creative agency in Riyadh, Saudi Arabia. Branding, digital marketing, web development, motion & production — 200+ projects delivered, 50+ clients, 8+ years of experience.",
  alternates: { canonical: "/profile" },
  keywords: [
    "eclipse agency",
    "creative agency Riyadh",
    "branding agency Saudi Arabia",
    "digital marketing agency Riyadh",
    "web development agency Saudi",
    "وكالة إبداعية الرياض",
    "وكالة تسويق السعودية",
    "إكليبس للإعلان",
  ],
  openGraph: {
    title: "Company Profile — Eclipse Agency",
    description:
      "Full-service creative agency in Riyadh. Branding, marketing, web dev, production — 200+ projects, 50+ clients.",
    url: "https://www.eclipseagency.net/profile",
    siteName: "Eclipse Agency",
    type: "website",
    images: [
      {
        url: "/images/team-office/WhatsApp Image 2026-03-08 at 2.20.25 AM (1).jpeg",
        width: 1200,
        height: 630,
        alt: "Eclipse Agency team",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Company Profile — Eclipse Agency",
    description:
      "Full-service creative agency in Riyadh. 200+ projects, 50+ clients, 8+ years.",
  },
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

const services = [
  {
    title: "Branding & Identity",
    desc: "Logo design, brand guidelines, visual identity systems, packaging, and brand strategy that builds recognition and trust.",
    icon: "palette",
  },
  {
    title: "Digital Marketing",
    desc: "Social media management, Google & Meta ads, SEO, email marketing, content strategy, and performance analytics.",
    icon: "trending",
  },
  {
    title: "Web & App Development",
    desc: "Custom websites, e-commerce, web applications, SaaS platforms, UI/UX design, and ongoing maintenance.",
    icon: "code",
  },
  {
    title: "Motion & Production",
    desc: "Video production, motion graphics, reels, animated ads, logo animations, and full video editing.",
    icon: "film",
  },
  {
    title: "Social Media",
    desc: "Content creation, scheduling, community management, influencer campaigns, and growth strategy across all platforms.",
    icon: "share",
  },
  {
    title: "3D & Animation",
    desc: "3D product renders, architectural visualization, character animation, and immersive visual experiences.",
    icon: "cube",
  },
];

const clientLogos = [
  { src: "/images/clients/client-01.svg", alt: "Client" },
  { src: "/images/clients/client-02.svg", alt: "Client" },
  { src: "/images/clients/client-03.svg", alt: "Client" },
  { src: "/images/clients/client-04.svg", alt: "Client" },
  { src: "/images/clients/client-05.svg", alt: "Client" },
  { src: "/images/clients/client-06.svg", alt: "Client" },
  { src: "/images/clients/client-07.svg", alt: "Client" },
  { src: "/images/clients/client-08.svg", alt: "Client" },
  { src: "/images/clients/partner-01.png", alt: "Client" },
  { src: "/images/clients/partner-02.png", alt: "Client" },
  { src: "/images/clients/partner-03.png", alt: "Client" },
  { src: "/images/clients/partner-04.png", alt: "Client" },
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
  "Dima Dental Centers",
  "UTD PADEL",
  "FilmBox",
  "Dual Sport",
  "@Room",
  "SaudiKenz",
  "Owl Bowling",
  "Faris Group",
  "Enter10 Jeddah",
  "Eclipse Agency",
  "Nick Saudi",
  "Al-Khamees Jewellery",
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

export default function ProfilePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profileJsonLd) }}
      />

      {/* ── Hero ── */}
      <PageHero
        badge="Company Profile"
        title="From Shadow to Spotlight"
        subtitle="We are Eclipse — a full-service creative agency helping businesses grow with innovative branding, digital marketing, web development, and production."
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
            <h2 className="font-heading text-2xl font-bold">Our Mission</h2>
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
            <h2 className="font-heading text-2xl font-bold">Our Vision</h2>
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
            { value: "200+", label: "Projects Delivered" },
            { value: "50+", label: "Happy Clients" },
            { value: "8+", label: "Years of Experience" },
            { value: "30+", label: "Team Members" },
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
          badge="What We Do"
          title="Our Services"
          subtitle="End-to-end creative and digital solutions for businesses across Saudi Arabia and the Gulf."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-2xl border border-border bg-bg-card p-6 md:p-8 transition-colors hover:border-primary/30"
            >
              <div className="mb-4 text-primary">
                {serviceIcons[service.icon]}
              </div>
              <h3 className="font-heading text-xl font-bold">{service.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* ── Showreel ── */}
      <SectionWrapper dark>
        <SectionHeader
          badge="Showreel 2024"
          title="Experience Our Work"
          subtitle="A highlight of our best projects from the past year."
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
          badge="Portfolio"
          title="Branding, Web & Motion"
          subtitle="Selected work across our core disciplines."
        />
        <VideoGrid />
      </SectionWrapper>

      {/* ── Branding Portfolio ── */}
      <SectionWrapper dark>
        <SectionHeader
          badge="Branding & Visual Identity"
          title="Brands We&apos;ve Built"
          subtitle="A selection of complete brand identities designed and developed by our team."
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
            View Full Portfolio
          </Button>
        </div>
      </SectionWrapper>

      {/* ── Social Media Clients ── */}
      <SectionWrapper>
        <SectionHeader
          badge="Social Media Management"
          title="Brands We Manage"
          subtitle="Active social media accounts we create content for and manage daily."
        />
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {socialMediaProjects.map((name) => (
            <div
              key={name}
              className="flex items-center justify-center rounded-xl border border-border bg-bg-card p-4 text-center transition-colors hover:border-primary/30"
            >
              <p className="text-sm font-medium text-text">{name}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* ── Web Development ── */}
      <SectionWrapper dark>
        <SectionHeader
          badge="Web Development"
          title="Websites & Platforms We&apos;ve Built"
          subtitle="Custom-built websites, web applications, and SaaS platforms."
        />
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[
            { name: "Eclipse Cloud ERP", url: "eclipsecloud.io" },
            { name: "Jobly Philippines", url: "jobly.ph" },
            { name: "Eclipse Agency", url: "eclipseagency.net" },
            { name: "SaudiKenz", url: "saudikenz.com" },
            { name: "Faris Group", url: "farisgroup.net" },
            { name: "MDD", url: "mdd.sa" },
            { name: "OWL Bowling", url: "owlbowling.com" },
            { name: "Granite & More", url: "graniteandmore.co.uk" },
          ].map((site) => (
            <a
              key={site.url}
              href={`https://${site.url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-xl border border-border bg-bg-card p-5 transition-colors hover:border-primary/30"
            >
              <p className="font-heading text-base font-bold group-hover:text-primary transition-colors">
                {site.name}
              </p>
              <p className="mt-1 text-xs text-text-muted">{site.url}</p>
            </a>
          ))}
        </div>
      </SectionWrapper>

      {/* ── Clients ── */}
      <SectionWrapper>
        <SectionHeader
          badge="Trusted By"
          title="Our Clients & Partners"
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
          badge="Our Office"
          title="Where the Magic Happens"
          subtitle="30+ creative professionals working from our dedicated office — with daily standups, attendance tracking, and real accountability."
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

      {/* ── Motion Reel ── */}
      <SectionWrapper>
        <SectionHeader
          badge="Motion & Animation"
          title="Our Motion Reel"
          subtitle="Logo animations, motion graphics, reels, and promotional videos."
        />
        <div className="mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-2xl border border-border">
            <div className="relative" style={{ paddingTop: "56.25%" }}>
              <video
                src="/videos/motion-reel.mp4"
                className="absolute inset-0 h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              />
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* ── About the Founder ── */}
      <SectionWrapper dark>
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <span className="mb-4 inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-primary">
              The Founder
            </span>
            <h2 className="font-heading text-3xl font-bold leading-tight md:text-4xl">
              Mustafa Halawa
            </h2>
            <p className="mt-5 text-text-secondary leading-relaxed">
              Eclipse Agency was founded by Mustafa Halawa in Riyadh, Saudi
              Arabia. With over 8 years of experience in creative and digital
              marketing, Mustafa built Eclipse from the ground up — assembling a
              team of 30+ specialists who deliver world-class work from a
              dedicated office.
            </p>
            <p className="mt-4 text-text-secondary leading-relaxed">
              His vision: make premium creative services accessible to businesses
              across the Gulf, without the premium price tag. Today, Eclipse
              serves 50+ clients across Saudi Arabia, UAE, and beyond.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
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
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border">
            <Image
              src="/images/team-office/mustafa.jpeg"
              alt="Mustafa Halawa — Founder of Eclipse Agency"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </SectionWrapper>

      {/* ── Contact CTA ── */}
      <SectionWrapper className="text-center">
        <h2 className="font-heading text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
          Let&apos;s Build Something{" "}
          <span className="gradient-text">Extraordinary</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-text-secondary md:text-lg">
          Whether you need a brand, a website, a marketing campaign, or a full
          team — we&apos;re ready.
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
            <span className="relative z-10">Chat on WhatsApp</span>
            <span className="btn-hud-chevron btn-hud-chevron-r" aria-hidden>
              &#x203A;&#x203A;
            </span>
          </Link>
          <Button href="/contact" variant="outline" size="lg">
            Contact Us
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
