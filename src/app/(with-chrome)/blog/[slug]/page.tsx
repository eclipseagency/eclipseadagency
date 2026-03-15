import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts } from "@/data/site";
import { blogArticles } from "@/data/blogContent";
import { blogArticles2 } from "@/data/blogContent2";
import { formatDate } from "@/lib/utils";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import ReadingProgress from "./ReadingProgress";
import ShareButtons from "./ShareButtons";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} - Blog | Eclipse Agency`,
    description: post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://www.eclipseagency.net/blog/${slug}`,
      siteName: "Eclipse Agency",
      type: "article",
      publishedTime: post.date,
      images: [{ url: post.image, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) notFound();

  const canonicalUrl = `https://www.eclipseagency.net/blog/${slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    image: post.image,
    author: {
      "@type": "Organization",
      name: "Eclipse Agency",
      url: "https://www.eclipseagency.net",
    },
    publisher: {
      "@type": "Organization",
      name: "Eclipse Agency",
      url: "https://www.eclipseagency.net",
      logo: {
        "@type": "ImageObject",
        url: "https://www.eclipseagency.net/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    articleSection: post.category,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ReadingProgress />

      <section className="relative px-5 pt-32 pb-16 md:px-8 md:pt-40">
        <div className="mx-auto max-w-3xl">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Blog", href: "/blog" },
              { label: post.title },
            ]}
          />
          <Link
            href="/blog"
            className="mb-6 inline-flex items-center gap-2 text-sm text-text-muted transition-colors hover:text-primary"
          >
            <ArrowRightIcon size={14} className="rotate-180" /> Back to Blog
          </Link>

          <div className="mb-4 flex items-center gap-3 text-xs text-text-muted">
            <span className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 font-bold uppercase tracking-wider text-primary">
              {post.category}
            </span>
            <span>{formatDate(post.date)}</span>
            <span>{post.readTime}</span>
          </div>

          <h1 className="font-heading text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
            {post.title}
          </h1>
          <p className="mt-5 text-lg text-text-secondary">{post.excerpt}</p>
        </div>
      </section>

      <section className="px-5 pb-20 md:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 aspect-[16/9] overflow-hidden rounded-2xl border border-border">
            <Image
              src={post.image}
              alt={post.title}
              width={800}
              height={450}
              className="h-full w-full object-cover"
              priority
            />
          </div>

          <article className="prose prose-invert mx-auto max-w-none space-y-6 text-text-secondary">
            {blogArticles[slug] || blogArticles2[slug]}
          </article>

          {/* Social sharing */}
          <div className="mt-12 border-t border-border pt-8">
            <ShareButtons url={canonicalUrl} title={post.title} />
          </div>
        </div>
      </section>
    </>
  );
}
