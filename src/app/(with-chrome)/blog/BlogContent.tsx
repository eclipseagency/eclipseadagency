"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/i18n/LocaleContext";
import { PageHero } from "@/components/sections/PageHero";
import { blogPosts } from "@/data/site";
import { blogPostsAr } from "@/data/blogPostsAr";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { formatDate } from "@/lib/utils";

export function BlogContent() {
  const { t, locale } = useLocale();
  const isAr = locale === "ar";

  return (
    <>
      <PageHero
        badge={t("blog.page.badge")}
        title={t("blog.page.title")}
        subtitle={t("blog.page.subtitle")}
        illustration="/images/hero-pages/blog-hero.svg"
      />

      <SectionWrapper>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => {
            const ar = blogPostsAr[post.slug];
            const title = isAr && ar ? ar.title : post.title;
            const excerpt = isAr && ar ? ar.excerpt : post.excerpt;
            const category = isAr && ar ? ar.category : post.category;
            const readTime = isAr && ar ? ar.readTime : post.readTime;

            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group rounded-2xl border border-border bg-bg-card overflow-hidden transition-all duration-300 hover:border-border-hover"
              >
                <div className="aspect-[16/9] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={title}
                    width={800}
                    height={450}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="mb-3 flex items-center gap-3 text-xs text-text-secondary">
                    <span className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 font-bold uppercase tracking-wider text-primary">
                      {category}
                    </span>
                    <span>{formatDate(post.date)}</span>
                    <span>{readTime}</span>
                  </div>
                  <h3 className="mb-2 font-heading text-lg font-bold leading-snug transition-colors group-hover:text-primary">
                    {title}
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-text-secondary line-clamp-2">
                    {excerpt}
                  </p>
                  <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-primary">
                    {t("blog.readMore")} <ArrowRightIcon size={12} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </SectionWrapper>
    </>
  );
}
