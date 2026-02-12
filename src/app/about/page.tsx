import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/sections/PageHero";
import { aboutContent } from "@/data/site";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ClientLogos } from "@/components/sections/ClientLogos";
import { CtaBanner } from "@/components/sections/CtaBanner";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Eclipse Agency — our mission, vision, values, and the team behind the creative work.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        badge="Profile"
        title="The Creative Force Behind the Work"
        subtitle="We are a team of strategists, designers, developers, and storytellers united by a passion for building brands that matter."
      />

      {/* Mission & Vision */}
      <SectionWrapper>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-bg-card p-8 md:p-10">
            <span className="mb-4 inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Our Mission
            </span>
            <p className="text-lg leading-relaxed text-text-secondary">{aboutContent.mission}</p>
          </div>
          <div className="rounded-2xl border border-border bg-bg-card p-8 md:p-10">
            <span className="mb-4 inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Our Vision
            </span>
            <p className="text-lg leading-relaxed text-text-secondary">{aboutContent.vision}</p>
          </div>
        </div>
      </SectionWrapper>

      {/* Story */}
      <SectionWrapper dark>
        <SectionHeader
          badge="Our Story"
          title="From Bold Idea to Creative Powerhouse"
        />
        <div className="mx-auto max-w-3xl space-y-6">
          {aboutContent.story.map((paragraph, i) => (
            <p key={i} className="text-base leading-relaxed text-text-secondary md:text-lg">
              {paragraph}
            </p>
          ))}
        </div>
      </SectionWrapper>

      {/* Values */}
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
              <h3 className="mb-3 font-heading text-xl font-bold">{value.title}</h3>
              <p className="text-sm leading-relaxed text-text-secondary">{value.description}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Team */}
      <SectionWrapper dark>
        <SectionHeader
          badge="Our Team"
          title="Meet the Minds Behind Eclipse"
          subtitle="A diverse team of creative professionals bringing expertise across design, strategy, development, and production."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {aboutContent.team.map((member) => (
            <div
              key={member.name}
              className="group rounded-2xl border border-border bg-bg-card overflow-hidden"
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5 text-center">
                <h3 className="font-heading text-base font-bold">{member.name}</h3>
                <p className="mt-1 text-xs text-text-muted">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <ClientLogos />
      <CtaBanner />
    </>
  );
}
