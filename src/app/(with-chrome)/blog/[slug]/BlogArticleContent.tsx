"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/i18n/LocaleContext";
import { blogPosts } from "@/data/site";
import { blogPostsAr } from "@/data/blogPostsAr";
import { blogArticles } from "@/data/blogContent";
import { blogArticles2 } from "@/data/blogContent2";
import { blogArticlesAr } from "@/data/blogContentAr";
import { blogArticlesAr2 } from "@/data/blogContentAr2";
import { formatDate } from "@/lib/utils";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import ShareButtons from "./ShareButtons";

interface BlogArticleContentProps {
  slug: string;
}

export function BlogArticleContent({ slug }: BlogArticleContentProps) {
  const { locale, t } = useLocale();
  const isAr = locale === "ar";

  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return null;

  const ar = blogPostsAr[slug];
  const title = isAr && ar ? ar.title : post.title;
  const excerpt = isAr && ar ? ar.excerpt : post.excerpt;
  const category = isAr && ar ? ar.category : post.category;
  const readTime = isAr && ar ? ar.readTime : post.readTime;

  const articleContent = isAr
    ? blogArticlesAr[slug] || blogArticlesAr2[slug] || blogArticles[slug] || blogArticles2[slug]
    : blogArticles[slug] || blogArticles2[slug];

  const canonicalUrl = `https://www.eclipseagency.net/blog/${slug}`;

  return (
    <>
      <section className="relative px-5 pt-32 pb-16 md:px-8 md:pt-40">
        <div className="mx-auto max-w-3xl">
          <Breadcrumbs
            items={[
              { label: t("breadcrumb.home"), href: "/" },
              { label: t("nav.blog"), href: "/blog" },
              { label: title },
            ]}
          />
          <Link
            href="/blog"
            className="mb-6 inline-flex items-center gap-2 text-sm text-text-muted transition-colors hover:text-primary"
          >
            <ArrowRightIcon size={14} className="rotate-180" /> {t("blog.backToBlog")}
          </Link>

          <div className="mb-4 flex items-center gap-3 text-xs text-text-muted">
            <span className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 font-bold uppercase tracking-wider text-primary">
              {category}
            </span>
            <span>{formatDate(post.date)}</span>
            <span>{readTime}</span>
          </div>

          <h1 className="font-heading text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
            {title}
          </h1>
          <p className="mt-5 text-lg text-text-secondary">{excerpt}</p>
        </div>
      </section>

      <section className="px-5 pb-20 md:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 aspect-[16/9] overflow-hidden rounded-2xl border border-border">
            <Image
              src={post.image}
              alt={title}
              width={800}
              height={450}
              className="h-full w-full object-cover"
              priority
            />
          </div>

          <article className="prose prose-invert mx-auto max-w-none space-y-6 text-text-secondary">
            {articleContent}
          </article>

          {/* Social sharing */}
          <div className="mt-12 border-t border-border pt-8">
            <ShareButtons url={canonicalUrl} title={title} />
          </div>
        </div>
      </section>
    </>
  );
}
