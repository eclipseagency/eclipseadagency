import type { Metadata } from "next";
import Image from "next/image";
import { CtaBanner } from "@/components/sections/CtaBanner";

export const metadata: Metadata = {
  title: "Waf - Brand Identity | Eclipse Agency",
  description:
    "Waf: Sleek and Professional Branding for Business Excellence. A bold identity showcasing innovation with sleek, vibrant visuals.",
  alternates: {
    canonical: "https://www.eclipseagency.net/waf",
  },
  openGraph: {
    title: "Waf - Brand Identity | Eclipse Agency",
    description:
      "Waf: Sleek and Professional Branding for Business Excellence. A bold identity showcasing innovation with sleek, vibrant visuals.",
    url: "https://www.eclipseagency.net/waf",
    type: "article",
    images: [
      {
        url: "https://www.eclipseagency.net/images/portfolio/waf.webp",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Waf - Brand Identity | Eclipse Agency",
    description:
      "Waf: Sleek and Professional Branding for Business Excellence. A bold identity showcasing innovation with sleek, vibrant visuals.",
    images: ["https://www.eclipseagency.net/images/portfolio/waf.webp"],
  },
};

export default function WafPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: "Waf - Brand Identity",
            description:
              "Waf: Sleek and Professional Branding for Business Excellence. A bold identity showcasing innovation with sleek, vibrant visuals.",
            image:
              "https://www.eclipseagency.net/images/portfolio/waf.webp",
            creator: {
              "@type": "Organization",
              name: "Eclipse Agency",
              url: "https://www.eclipseagency.net",
            },
          }),
        }}
      />
      <main className="px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-4xl">
        <h1 className="font-heading text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
          Waf: Sleek and Professional Branding for Business Excellence
        </h1>

        <div className="mt-6 space-y-6 text-lg leading-relaxed text-text-secondary md:text-xl">
          <p>
            The branding for Waf reflects a bold and professional identity,
            designed to showcase innovation and excellence in business services.
            The sleek, vibrant visuals incorporate modern typography and dynamic
            layouts that emphasize forward-thinking solutions and reliability.
          </p>

          <p>
            By blending contemporary design elements with a vibrant color
            palette, the branding conveys a sense of energy and progressiveness,
            aligning perfectly with Waf&apos;s mission to lead in delivering
            exceptional business services. Every touchpoint, from digital assets
            to physical materials, reinforces Waf&apos;s reputation as a modern
            and trustworthy partner in the business world.
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-2xl border border-border">
          <Image
            src="/images/portfolio/waf.webp"
            alt="Waf branding presentation showcase"
            width={1200}
            height={3000}
            className="h-auto w-full"
          />
        </div>
      </div>

      <section className="px-5 pb-16 md:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl font-bold mb-6">Project Overview</h2>
          <div className="mb-6 grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
            <div>
              <span className="block font-semibold text-text-primary">Client</span>
              <span className="text-text-secondary">Waf</span>
            </div>
            <div>
              <span className="block font-semibold text-text-primary">Industry</span>
              <span className="text-text-secondary">Business Services</span>
            </div>
            <div>
              <span className="block font-semibold text-text-primary">Services</span>
              <span className="text-text-secondary">Rebrand, Digital, Print</span>
            </div>
            <div>
              <span className="block font-semibold text-text-primary">Timeline</span>
              <span className="text-text-secondary">9 Weeks</span>
            </div>
          </div>
          <p className="leading-relaxed text-text-secondary mb-4">
            Waf is a business services firm specializing in consulting, corporate training, and operational excellence for mid-market companies across the GCC. Eclipse Agency was engaged to lead a comprehensive rebrand that would modernize their image, differentiate them from traditional consulting firms, and better reflect their innovative, results-driven approach.
          </p>
        </div>
      </section>

      <section className="px-5 pb-16 md:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl font-bold mb-6">The Challenge</h2>
          <p className="leading-relaxed text-text-secondary mb-4">
            Waf had spent a decade building a strong reputation through word-of-mouth referrals, but their visual identity had not evolved since the company&apos;s founding. The logo looked dated, the website was a basic template, and their presentation materials were inconsistent. When competing for larger contracts against international consulting firms, Waf&apos;s outdated branding was undermining the credibility of their proposals before the content was even read.
          </p>
          <p className="leading-relaxed text-text-secondary mb-4">
            The business services sector in the Gulf region is undergoing a transformation. Clients increasingly expect their partners to look and feel as innovative as the solutions they promise. Waf&apos;s competitors had modernized their brands with sleek, tech-forward identities, and Waf risked being perceived as behind the curve despite having deeper expertise and better client outcomes.
          </p>
          <p className="leading-relaxed text-text-secondary mb-4">
            Beyond aesthetics, there was a strategic challenge. Waf offered services across three distinct divisions (consulting, training, and operations), and the existing brand did nothing to communicate this breadth or help potential clients understand which division was relevant to them. The rebrand needed to unify these divisions under one strong identity while making it easy to navigate the different service offerings.
          </p>
        </div>
      </section>

      <section className="px-5 pb-16 md:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl font-bold mb-6">Our Approach</h2>
          <p className="leading-relaxed text-text-secondary mb-4">
            We positioned the rebrand around the concept of &ldquo;Precision in Motion&rdquo; &mdash; the idea that Waf delivers meticulously planned strategies that create tangible forward momentum for their clients. This concept drove a visual language built on dynamic angles, clean lines, and a sense of purposeful movement. The identity feels energetic and forward-looking without sacrificing the professionalism and trustworthiness that B2B clients expect.
          </p>
          <p className="leading-relaxed text-text-secondary mb-4">
            The new logo is a geometric &ldquo;W&rdquo; constructed from interlocking angular shapes that suggest both stability and progress. The color palette moves away from the generic navy-and-grey of traditional consulting firms, instead using a deep midnight blue as the anchor paired with vibrant teal and electric amber accents. These accent colors are also used to differentiate the three service divisions, creating a subtle sub-brand system within the master brand.
          </p>
          <p className="leading-relaxed text-text-secondary mb-4">
            We overhauled every client-facing touchpoint. Proposal templates were redesigned with data visualization components built in, making it easy for the team to present complex strategies in a visually compelling way. Business cards use a soft-touch finish with spot UV on the logo. The website was completely rebuilt with a focus on case studies and measurable outcomes, moving away from generic service descriptions toward proof of impact.
          </p>
        </div>
      </section>

      <section className="px-5 pb-16 md:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl font-bold mb-6">Results &amp; Deliverables</h2>
          <ul className="list-disc space-y-2 pl-6 text-text-secondary mb-6">
            <li>Geometric &ldquo;W&rdquo; logo mark with interlocking angular forms</li>
            <li>Primary color palette with division-specific accent coding</li>
            <li>Modern typography system pairing geometric sans-serif with a data-friendly monospace</li>
            <li>Proposal and presentation template suite with built-in data visualization</li>
            <li>Business card, letterhead, and corporate stationery set</li>
            <li>Website redesign with case study framework and outcome metrics</li>
            <li>LinkedIn company page design and content templates</li>
            <li>Corporate training material templates (workbooks, certificates, slides)</li>
            <li>Trade show booth and rollup banner designs</li>
            <li>Vehicle branding for company fleet</li>
            <li>Comprehensive brand guidelines covering print, digital, and environmental</li>
          </ul>
        </div>
      </section>

      <section className="px-5 pb-20 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-2xl font-bold mb-4">Have a Similar Project?</h2>
          <p className="leading-relaxed text-text-secondary mb-8">
            Ready to modernize your business brand and start winning bigger contracts? Let us build an identity that matches the quality of your work.
          </p>
          <a
            href="/contact"
            className="inline-block rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-8 py-3 font-semibold text-white transition hover:opacity-90"
          >
            Start a Conversation
          </a>
        </div>
      </section>

      <CtaBanner />
      </main>
    </>
  );
}
