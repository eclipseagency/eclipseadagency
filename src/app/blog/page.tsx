import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { blogPosts } from "@/data/site";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { formatDate } from "@/lib/utils";

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
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group rounded-2xl border border-border bg-bg-card overflow-hidden transition-all duration-300 hover:border-border-hover"
            >
              <div className="aspect-[16/9] overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={800}
                  height={450}
                  unoptimized
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="mb-3 flex items-center gap-3 text-xs text-text-muted">
                  <span className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 font-bold uppercase tracking-wider text-primary">
                    {post.category}
                  </span>
                  <span>{formatDate(post.date)}</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="mb-2 font-heading text-lg font-bold leading-snug transition-colors group-hover:text-primary">
                  {post.title}
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-text-secondary line-clamp-2">
                  {post.excerpt}
                </p>
                <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-primary">
                  Read More <ArrowRightIcon size={12} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </SectionWrapper>
    </>
  );
}
