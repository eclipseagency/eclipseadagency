import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { FaqAccordion } from "./FaqAccordion";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "FAQ - Frequently Asked Questions | Eclipse Agency Riyadh",
  description:
    "Find answers to common questions about Eclipse Agency's services, pricing, timelines, and process. Creative agency in Riyadh serving Saudi Arabia, UAE & Egypt.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "FAQ - Eclipse Agency | Creative Agency in Riyadh",
    description:
      "Answers to common questions about our branding, marketing, web development, and video production services.",
    url: "https://www.eclipseagency.net/faq",
    siteName: "Eclipse Agency",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "FAQ - Eclipse Agency Riyadh",
    description:
      "Common questions about Eclipse Agency's services, pricing, and process.",
  },
};

const faqItems = [
  {
    question: "What services does Eclipse Agency offer?",
    answer:
      "Eclipse Agency offers branding & identity design, digital marketing (SEO, social media, content strategy), web & app development, motion graphics & animation, video production, and 3D design & visualization.",
  },
  {
    question: "Where is Eclipse Agency located?",
    answer:
      "Eclipse Agency is based in Riyadh, Saudi Arabia. We serve clients across Saudi Arabia, the UAE, and Egypt.",
  },
  {
    question: "How much does it cost to work with Eclipse Agency?",
    answer:
      "Project costs vary based on scope and requirements. We offer custom proposals for each project. Contact us at marketing@eclipseadagency.com for a free consultation and quote.",
  },
  {
    question: "How long does a branding project take?",
    answer:
      "A typical branding project takes 4\u20138 weeks depending on complexity. This includes discovery, strategy, design, and refinement phases. Larger brand systems may take longer.",
  },
  {
    question: "Do you work with international clients?",
    answer:
      "Absolutely. While we\u2019re headquartered in Riyadh, we regularly work with clients across the Middle East, Europe, and North America. Our team communicates fluently in both English and Arabic, and we\u2019re set up for remote collaboration across time zones.",
  },
  {
    question: "What\u2019s included in a branding package?",
    answer:
      "Our branding packages typically include brand strategy & positioning, logo design with full variations, a comprehensive brand guidelines document, color palette & typography system, business card and stationery design, and social media brand templates. Every package is tailored to your specific needs.",
  },
  {
    question: "Can you manage our social media?",
    answer:
      "Yes. We offer full social media management including content strategy, copywriting, graphic design, scheduling & publishing, community management, and monthly performance reporting. We handle platforms like Instagram, TikTok, X (Twitter), LinkedIn, and Snapchat.",
  },
  {
    question: "How do we get started?",
    answer:
      "Getting started is simple. Reach out through our contact page or email us at marketing@eclipseadagency.com. We\u2019ll schedule a free discovery call to understand your goals, then put together a custom proposal with scope, timeline, and pricing. Once approved, we kick off with a strategy session.",
  },
];

export default function FaqPage() {
  return (
    <>
      <PageHero
        badge="FAQ"
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about working with Eclipse Agency. Can't find your answer? Reach out to us directly."
      />

      <SectionWrapper>
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "FAQ" },
          ]}
        />
        <FaqAccordion items={faqItems} />
      </SectionWrapper>
    </>
  );
}
