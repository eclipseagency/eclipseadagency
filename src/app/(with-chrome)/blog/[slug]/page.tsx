import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPosts } from "@/data/site";
import ReadingProgress from "./ReadingProgress";
import { BlogArticleContent } from "./BlogArticleContent";

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
      <BlogArticleContent slug={slug} />
    </>
  );
}
