import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { blogPosts } from "@/data/site";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { BlogGrid } from "./BlogGrid";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights, trends, and practical guides on branding, digital marketing, web development, and creative strategy.",
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        badge="Blog"
        title="Insights & Ideas"
        subtitle="Expert perspectives on branding, marketing, design, and technology — written by our team for yours."
        image="/images/hero-pages/lunar-eclipse.webp"
      />

      <SectionWrapper>
        <BlogGrid posts={blogPosts} />
      </SectionWrapper>
    </>
  );
}
