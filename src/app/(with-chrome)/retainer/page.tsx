import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { ShowreelPlayer } from "@/components/ui/ShowreelPlayer";
import { portfolioItems } from "@/data/site";

export const metadata: Metadata = {
  title:
    "Your Dedicated Creative & Marketing Team | Eclipse Agency",
  description:
    "A full creative, marketing, and development team working from our office — dedicated to your business. Unlimited work, one fixed monthly price. Serving Saudi Arabia & the Gulf.",
  alternates: { canonical: "/retainer" },
  keywords: [
    "dedicated marketing team",
    "creative team retainer",
    "managed creative team Egypt",
    "marketing team Saudi Arabia",
    "outsource design team Gulf",
    "unlimited design service",
    "dedicated development team",
    "فريق تسويق مخصص",
    "فريق تصميم كامل",
    "فريق عمل متكامل",
  ],
  openGraph: {
    title: "Your Dedicated Creative & Marketing Team | Eclipse Agency",
    description:
      "A full team of designers, marketers, content writers, and developers — working from our office, dedicated to your business. Unlimited work, fixed monthly price.",
    url: "https://www.eclipseagency.net/retainer",
    siteName: "Eclipse Agency",
    type: "website",
    images: [
      {
        url: "/images/team-office/WhatsApp Image 2026-03-08 at 2.20.25 AM (1).jpeg",
        width: 1200,
        height: 630,
        alt: "Eclipse Agency dedicated team office",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Dedicated Creative & Marketing Team | Eclipse Agency",
    description:
      "Designers, marketers, developers — one dedicated team, unlimited work, fixed monthly price.",
    images: [
      "/images/team-office/WhatsApp Image 2026-03-08 at 2.20.25 AM (1).jpeg",
    ],
  },
};

const retainerJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Eclipse Retainer — Dedicated Creative & Tech Team",
  description:
    "A dedicated creative and technology team including graphic design, motion design, content writing, digital marketing, and web development — working from our office under your direction with unlimited monthly output.",
  provider: {
    "@type": "Organization",
    name: "Eclipse Agency",
    url: "https://www.eclipseagency.net",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Riyadh",
      addressCountry: "SA",
    },
  },
  areaServed: [
    { "@type": "Country", name: "Saudi Arabia" },
    { "@type": "Country", name: "United Arab Emirates" },
    { "@type": "Country", name: "Qatar" },
    { "@type": "Country", name: "Kuwait" },
    { "@type": "Country", name: "Bahrain" },
    { "@type": "Country", name: "Oman" },
  ],
  offers: {
    "@type": "Offer",
    name: "Monthly Retainer",
    price: "1000",
    priceCurrency: "USD",
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: "1000",
      priceCurrency: "USD",
      billingDuration: "P1M",
    },
  },
};

const teamRoles = [
  {
    title: "Graphic Designer",
    description:
      "Social media posts, brand identity, packaging, print materials, presentations",
    icon: "🎨",
  },
  {
    title: "Motion Designer",
    description:
      "Reels, stories, animated ads, logo animations, promotional videos",
    icon: "🎬",
  },
  {
    title: "Content Writer",
    description:
      "Captions, blog articles, ad copy, email campaigns, brand voice",
    icon: "✍️",
  },
  {
    title: "Digital Marketer",
    description:
      "Social media management, ad campaigns, analytics, strategy, SEO",
    icon: "📈",
  },
  {
    title: "Web Developer",
    description:
      "Websites, landing pages, e-commerce, web apps, maintenance & updates",
    icon: "💻",
  },
];

// Uses portfolioItems from site.ts

const comparisonRows = [
  {
    label: "Monthly Cost",
    local: "$5,000 – $15,000+",
    freelancer: "$2,000 – $5,000",
    eclipse: "Starting at $1,000",
  },
  {
    label: "Work Limit",
    local: "Fixed hours",
    freelancer: "Per project",
    eclipse: "Unlimited",
  },
  {
    label: "Extra Fees",
    local: "Visas, insurance, equipment",
    freelancer: "Revisions, rush fees",
    eclipse: "None",
  },
  {
    label: "Team Size",
    local: "1-2 people",
    freelancer: "1 person",
    eclipse: "5+ specialists",
  },
  {
    label: "Consistency",
    local: "High turnover",
    freelancer: "Different every time",
    eclipse: "Same dedicated team",
  },
  {
    label: "Management",
    local: "You manage everything",
    freelancer: "You manage everything",
    eclipse: "We handle it",
  },
];

const whatsappLink =
  "https://wa.me/201129560357?text=" +
  encodeURIComponent("Hi Mustafa, I'd like to learn more about the retainer team.");

export default function RetainerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(retainerJsonLd) }}
      />

      {/* ── Hero — Lead with the problem ── */}
      <PageHero
        badge="Dedicated Teams"
        title="Your Full Creative Team — Without the Full Cost"
        subtitle="Hiring locally is expensive. Freelancers are unreliable. We give you a dedicated team of specialists working from our office — assigned to your business, delivering unlimited work."
        image="/images/team-office/WhatsApp Image 2026-03-08 at 2.20.25 AM (1).jpeg"
      />

      {/* ── The Problem ── */}
      <SectionWrapper>
        <SectionHeader
          badge="The Problem"
          title="Building a Team Shouldn&apos;t Break the Bank"
          subtitle="If you're running a business in Saudi Arabia or the Gulf, you already know this."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Local Hiring Is Expensive",
              desc: "Salaries, visas, insurance, office space, equipment — one designer alone can cost you 5,000+ SAR/month before they produce a single design.",
              icon: "💸",
            },
            {
              title: "Freelancers Are Unreliable",
              desc: "Different person every time, per-project pricing, revision fees, missed deadlines. No ownership over your brand or long-term vision.",
              icon: "🎲",
            },
            {
              title: "Remote Teams Lack Accountability",
              desc: "No office, no oversight, no attendance tracking. You're paying for hours you can't verify and managing people across time zones.",
              icon: "👻",
            },
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

      {/* ── The Solution — Your Team ── */}
      <SectionWrapper dark>
        <SectionHeader
          badge="The Solution"
          title="A Dedicated Team That Works From Our Office"
          subtitle="5 specialists assigned to your business — working full-time from our office in Egypt. Not freelancers. Not remote. A real team with real accountability."
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
              Also Included
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-text-secondary">
              <li>Marketing Director oversight</li>
              <li>Dedicated Account Manager</li>
              <li>Project management & reporting</li>
              <li>CRM system access</li>
            </ul>
          </div>
        </div>
      </SectionWrapper>

      {/* ── What They Deliver ── */}
      <SectionWrapper>
        <SectionHeader
          badge="Full Coverage"
          title="Everything Your Business Needs — Covered"
          subtitle="Your team handles all of this. No per-project charges, no revision fees, no limits."
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

      {/* ── The Real Office ── */}
      <SectionWrapper dark>
        <SectionHeader
          badge="The Office"
          title="See Where Your Team Works"
          subtitle="A real office with real people — attendance tracking, daily standups, and direct communication with you."
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
            { value: "30+", label: "Team Members In-Office" },
            { value: "200+", label: "Projects Delivered" },
            { value: "8+", label: "Years of Experience" },
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

      {/* ── Portfolio ── */}
      <SectionWrapper>
        <SectionHeader
          badge="Portfolio"
          title="Brands Eclipse Has Built"
          subtitle="A selection of branding and creative projects delivered by the team."
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

      {/* ── Showreel ── */}
      <SectionWrapper dark>
        <SectionHeader
          badge="Showreel"
          title="See the Work in Action"
        />
        <div className="mx-auto max-w-4xl">
          <ShowreelPlayer
            videoUrl="/videos/showreel.mp4"
            thumbnailUrl="/images/about/cover-4.webp"
            title="Eclipse Agency — Showreel 2024"
          />
        </div>
      </SectionWrapper>

      {/* ── Clients ── */}
      <SectionWrapper>
        <SectionHeader
          badge="Trusted By"
          title="Clients & Partners"
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

      {/* ── About Eclipse ── */}
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
                Founder
              </span>
              <h2 className="font-heading text-2xl font-bold">
                Mustafa Halawa
              </h2>
              <p className="mt-3 text-text-secondary leading-relaxed">
                Eclipse Agency was founded in Riyadh, Saudi Arabia. The entire
                company runs on the same model — a dedicated team in Egypt
                delivering world-class creative and tech work. 200+ projects
                delivered, 50+ clients across Saudi Arabia, UAE, and the Gulf.
                This isn&apos;t theory — it&apos;s a proven system.
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

      {/* ── Comparison Table ── */}
      <SectionWrapper>
        <SectionHeader
          badge="Compare"
          title="How We Stack Up"
          subtitle="See how a dedicated Eclipse team compares to hiring locally, using freelancers, or managing remote workers."
        />
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse">
            <thead>
              <tr>
                <th className="border-b border-border px-4 py-4 text-left text-sm font-medium text-text-muted">
                  &nbsp;
                </th>
                <th className="border-b border-border px-4 py-4 text-center text-sm font-medium text-text-muted">
                  Local Hiring
                </th>
                <th className="border-b border-border px-4 py-4 text-center text-sm font-medium text-text-muted">
                  Freelancers
                </th>
                <th className="border-b border-primary/30 bg-primary/5 px-4 py-4 text-center text-sm font-bold text-primary rounded-t-lg">
                  Eclipse Team
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

      {/* ── Pricing — revealed AFTER value is built ── */}
      <SectionWrapper dark>
        <div className="text-center">
          <span className="mb-4 inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-primary">
            Pricing
          </span>
          <h2 className="font-heading text-3xl font-bold leading-tight md:text-4xl lg:text-[42px]">
            All of This — For Less Than You&apos;d Pay One Local Hire
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-text-secondary md:text-lg">
            A full team of 5 specialists, a marketing director, an account
            manager, unlimited work, and zero extra fees.
          </p>
          <div className="mx-auto mt-10 max-w-lg">
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-8 md:p-12">
              <div className="flex items-baseline justify-center gap-2">
                <span className="font-heading text-6xl font-bold text-primary md:text-7xl lg:text-8xl">
                  $1,000
                </span>
                <span className="text-text-secondary text-lg">/month</span>
              </div>
              <p className="mt-2 text-2xl font-semibold text-text md:text-3xl">
                3,800 SAR
              </p>
              <div className="mx-auto mt-8 flex max-w-md flex-wrap items-center justify-center gap-3">
                {[
                  "Unlimited Work",
                  "No Extra Fees",
                  "Dedicated Team",
                  "Cancel Anytime",
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
                  <span className="relative z-10">Get Started on WhatsApp</span>
                  <span className="btn-hud-chevron btn-hud-chevron-r" aria-hidden>
                    &#x203A;&#x203A;
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <p className="mx-auto mt-6 max-w-xl text-text-muted text-sm">
            Need a larger team? We scale with you.{" "}
            <Link href="/team" className="text-primary hover:underline">
              Build a custom team here
            </Link>
            .
          </p>
        </div>
      </SectionWrapper>

      {/* ── How It Works ── */}
      <SectionWrapper>
        <SectionHeader
          badge="Getting Started"
          title="How It Works"
          subtitle="From first message to your team delivering work — in less than a week."
        />
        <div className="grid gap-6 md:grid-cols-4">
          {[
            {
              step: "01",
              title: "Message Us",
              desc: "Tell us about your business, goals, and what you need on WhatsApp.",
            },
            {
              step: "02",
              title: "We Plan",
              desc: "We assign your dedicated team and create a workflow tailored to you.",
            },
            {
              step: "03",
              title: "Work Starts",
              desc: "Your team begins delivering — designs, content, marketing, dev — unlimited.",
            },
            {
              step: "04",
              title: "You Grow",
              desc: "Focus on your business while we handle the execution. Scale up anytime.",
            },
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

      {/* ── FAQ ── */}
      <SectionWrapper dark>
        <SectionHeader
          badge="FAQ"
          title="Common Questions"
        />
        <div className="mx-auto max-w-3xl space-y-6">
          {[
            {
              q: "Is it really unlimited work?",
              a: "Yes. You can send as many requests as you want. Your team works on them in priority order, delivering continuously throughout the month.",
            },
            {
              q: "Are there any hidden fees?",
              a: "No. The monthly price covers everything — team, management, tools, and office costs. The only extras would be ad spend budgets (which go directly to platforms like Meta or Google).",
            },
            {
              q: "How do we communicate?",
              a: "Through WhatsApp, Slack, or any tool you prefer. You'll have a dedicated account manager and direct access to your team.",
            },
            {
              q: "Can I cancel anytime?",
              a: "Yes. There's no long-term contract. Pay monthly, cancel whenever you want.",
            },
            {
              q: "How fast is the turnaround?",
              a: "Most design requests are delivered within 24-48 hours. Larger projects (websites, campaigns) follow a timeline we agree on together.",
            },
            {
              q: "Is this freelancers working remotely?",
              a: "No. Your team works from our physical office in Egypt — with attendance tracking, daily standups, and management oversight. You can see the office photos above.",
            },
            {
              q: "What if I need more capacity?",
              a: "You can scale up anytime. Need a bigger team? We'll add more specialists at a transparent per-role cost.",
            },
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

      {/* ── Final CTA ── */}
      <SectionWrapper className="text-center">
        <h2 className="font-heading text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
          Ready to Meet{" "}
          <span className="gradient-text">Your Team</span>?
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-text-secondary md:text-lg">
          Message Mustafa on WhatsApp. Tell him about your business, and
          he&apos;ll show you exactly how your dedicated team will work.
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
          <Button href="/team" variant="outline" size="lg">
            Build a Custom Team
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
