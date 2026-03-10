import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { TeamBuilder } from "./TeamBuilder";

export const metadata: Metadata = {
  title:
    "Build Your Team in Egypt — Managed Creative & Tech Teams | Eclipse Agency",
  description:
    "Get a fully managed, on-site creative and tech team in Egypt at 70% less cost. Branding, marketing, web development, and content production — all under one roof with direct oversight.",
  alternates: { canonical: "/team" },
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const challenges = [
  {
    icon: (
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
    ),
    title: "Capital Intensive",
    desc: "Setting up an in-house team demands significant upfront investment — office space, equipment, recruitment fees, and months of ramp-up before seeing results.",
  },
  {
    icon: (
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
    ),
    title: "Talent Scarcity",
    desc: "Finding experienced creative and tech professionals in Saudi Arabia is highly competitive. Turnover is high, and specialized roles are hard to fill quickly.",
  },
  {
    icon: (
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
    ),
    title: "Operational Drag",
    desc: "HR, payroll, compliance, and day-to-day management consume bandwidth your leadership should spend on growth and strategy.",
  },
];

const capabilities = [
  {
    title: "Branding & Identity",
    items: [
      "Brand Strategy & Positioning",
      "Visual Identity & Logo Systems",
      "Brand Guidelines & Collateral",
      "Packaging & Print Design",
    ],
  },
  {
    title: "Digital Marketing",
    items: [
      "Social Media Management",
      "SEO & Content Marketing",
      "Paid Ads (Google, Meta, TikTok)",
      "Email & Marketing Automation",
    ],
  },
  {
    title: "Content Production",
    items: [
      "Video Production & Editing",
      "Motion Graphics & Animation",
      "Photography & Retouch",
      "Podcast & Audio Production",
    ],
  },
  {
    title: "Web & Technology",
    items: [
      "Web Design & Development",
      "Mobile App Development",
      "E-Commerce Solutions",
      "SaaS & Custom Software",
    ],
  },
];

const steps = [
  {
    num: "01",
    title: "Discovery",
    desc: "We discuss your goals, team structure, and required skill sets to define the exact roles you need.",
  },
  {
    num: "02",
    title: "Talent Sourcing",
    desc: "We recruit, vet, and interview candidates. You approve the final selections before onboarding.",
  },
  {
    num: "03",
    title: "Setup & Compliance",
    desc: "We handle legal employment contracts, office setup, equipment, and all compliance requirements.",
  },
  {
    num: "04",
    title: "Launch & Integration",
    desc: "Your team is operational within weeks — integrated into your workflows with daily reporting and direct communication.",
  },
];

const comparisons = [
  {
    option: "Local Hiring",
    cost: "Very High",
    speed: "Slow (3-6 months)",
    quality: "Variable",
    management: "You manage",
    risk: "High",
  },
  {
    option: "Freelancers",
    cost: "Medium",
    speed: "Fast",
    quality: "Inconsistent",
    management: "You manage",
    risk: "High",
  },
  {
    option: "Remote Teams",
    cost: "Medium",
    speed: "Medium",
    quality: "Variable",
    management: "You manage",
    risk: "Medium",
  },
  {
    option: "Eclipse Team",
    cost: "Low (70% less)",
    speed: "Fast (2-4 weeks)",
    quality: "Proven & Vetted",
    management: "We manage",
    risk: "Low",
    highlight: true,
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function TeamPage() {
  return (
    <>
      {/* ── Hero ── */}
      <PageHero
        badge="Your Team, Our Office"
        title="Your On-Site Creative & Tech Team in Egypt"
        subtitle="A fully managed, dedicated team working from our office — under your direction, at a fraction of the cost. No freelancers. No remote unknowns. Real people, real office, real results."
        image="/images/team-office/910d3c1a-642b-4b33-bcb3-d6590d5ee527.jpeg"
      />

      {/* ── The Challenge ── */}
      <SectionWrapper>
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.15em] text-primary">
            The Challenge
          </span>
          <h2 className="font-heading text-3xl font-bold md:text-4xl">
            Why Building an In-House Team is{" "}
            <span className="gradient-text">Harder Than It Should Be</span>
          </h2>
          <p className="mt-4 text-text-secondary md:text-lg">
            Whether you&apos;re scaling a startup or running a group of
            companies, building creative and tech capacity in-house comes with
            real friction.
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
              The Solution
            </span>
            <h2 className="font-heading text-3xl font-bold md:text-4xl">
              A Fully Managed Team,{" "}
              <span className="gradient-text">Working From Our Office</span>
            </h2>
            <p className="mt-5 leading-relaxed text-text-secondary md:text-lg">
              We provide you with a dedicated team of creative and tech
              professionals — hired, trained, and managed by us — working
              full-time from our physical office in Egypt. You get direct access
              and oversight without any of the operational burden.
            </p>
            <div className="mt-8 space-y-4">
              {[
                {
                  t: "Physical Presence",
                  d: "Your team works from our equipped office with daily check-ins, attendance tracking, and on-site management.",
                },
                {
                  t: "Direct Oversight",
                  d: "Daily standups, real-time communication, shared project tools — you're always in the loop.",
                },
                {
                  t: "Proven System",
                  d: "We've built Eclipse itself using this exact model. 200+ projects delivered, 50+ clients served.",
                },
              ].map((item) => (
                <div key={item.t} className="flex gap-4">
                  <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
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
            Why It Works
          </span>
          <h2 className="font-heading text-3xl font-bold md:text-4xl">
            The Strategic Advantage
          </h2>
        </div>
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {[
            {
              stat: "70%",
              label: "Cost Savings",
              desc: "Compared to hiring locally in Saudi Arabia or the UAE. Same quality output, dramatically lower overhead.",
            },
            {
              stat: "95%",
              label: "Retention Rate",
              desc: "Our team members stay because we invest in their growth, workspace, and career development.",
            },
            {
              stat: "2-4",
              label: "Weeks to Launch",
              desc: "From agreement to a fully operational team — including recruitment, onboarding, and integration.",
            },
          ].map((s) => (
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
            Capabilities
          </span>
          <h2 className="font-heading text-3xl font-bold md:text-4xl">
            Full-Stack Creative & Tech Coverage
          </h2>
          <p className="mt-4 max-w-2xl text-text-secondary md:text-lg">
            Your team can cover any combination of roles across four core
            disciplines — all managed from a single office.
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
              The Multiplier Effect
            </span>
            <h2 className="font-heading text-3xl font-bold md:text-4xl">
              Access Our Full{" "}
              <span className="gradient-text">Creative Studio</span>
            </h2>
            <p className="mt-5 leading-relaxed text-text-secondary md:text-lg">
              Your dedicated team doesn&apos;t work in isolation. They sit
              alongside our full creative studio — giving you on-demand access
              to specialized expertise without adding headcount.
            </p>
            <div className="mt-6 space-y-3">
              {[
                "On-demand expertise from 30+ studio professionals",
                "Unified brand voice across all deliverables",
                "Faster turnaround with built-in collaboration",
                "Quality control and creative direction included",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
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
            Pricing
          </span>
          <h2 className="font-heading text-3xl font-bold md:text-4xl">
            Build Your Team &{" "}
            <span className="gradient-text">See the Cost Instantly</span>
          </h2>
          <p className="mt-4 text-text-secondary md:text-lg">
            Choose the ready-made Smart Team or build your own — pick roles,
            seniority levels, and office setup. Real-time pricing in SAR, USD &
            AED.
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
            How It Works
          </span>
          <h2 className="font-heading text-3xl font-bold md:text-4xl">
            From Inquiry to Operational in{" "}
            <span className="gradient-text">4 Steps</span>
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
              Proof of Concept
            </span>
            <h2 className="font-heading text-3xl font-bold md:text-4xl">
              We Built Eclipse Using{" "}
              <span className="gradient-text">This Exact Model</span>
            </h2>
            <p className="mt-5 leading-relaxed text-text-secondary md:text-lg">
              Eclipse Agency itself is the best proof that this model works. Our
              entire team of 30+ professionals operates from a single managed
              office — serving clients across Saudi Arabia, UAE, and the Middle
              East.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-4">
              {[
                { num: "200+", label: "Projects Delivered" },
                { num: "50+", label: "Happy Clients" },
                { num: "8+", label: "Years Experience" },
              ].map((s) => (
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
            Comparison
          </span>
          <h2 className="font-heading text-3xl font-bold md:text-4xl">
            Eclipse vs. The Alternatives
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="px-4 py-3 font-bold">Option</th>
                <th className="px-4 py-3 font-bold">Cost</th>
                <th className="px-4 py-3 font-bold">Speed</th>
                <th className="px-4 py-3 font-bold">Quality</th>
                <th className="px-4 py-3 font-bold">Management</th>
                <th className="px-4 py-3 font-bold">Risk</th>
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
            Let&apos;s Talk
          </span>
          <h2 className="font-heading text-3xl font-bold md:text-4xl lg:text-5xl">
            Ready to Build{" "}
            <span className="gradient-text">Your Team?</span>
          </h2>
          <p className="mt-5 text-text-secondary md:text-lg">
            Let&apos;s discuss your needs and put together a team structure
            tailored to your business. No commitment — just a conversation.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://wa.me/201129560357?text=Hi%20Mustafa%2C%20I%27m%20interested%20in%20building%20a%20team%20with%20Eclipse."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full bg-[#25D366] px-8 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:bg-[#20bd5a] hover:shadow-[0_0_30px_rgba(37,211,102,0.3)]"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat on WhatsApp
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-border px-8 py-3.5 text-sm font-bold transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:text-primary"
            >
              Send a Message
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
              Mustafa Halawa
            </p>
            <p className="text-sm text-text-secondary">Founder & CEO</p>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
