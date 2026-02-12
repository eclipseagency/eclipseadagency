import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts } from "@/data/site";
import { formatDate } from "@/lib/utils";
import { ArrowRightIcon } from "@/components/ui/Icons";

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
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) notFound();

  return (
    <>
      <section className="relative px-5 pt-32 pb-16 md:px-8 md:pt-40">
        <div className="mx-auto max-w-3xl">
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
          <div className="relative mb-12 aspect-[16/9] overflow-hidden rounded-2xl border border-border">
            <Image
              src={post.image}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
              priority
            />
          </div>

          {/* Placeholder article content */}
          <article className="prose prose-invert mx-auto max-w-none space-y-6 text-text-secondary">
            <p className="text-lg leading-relaxed">
              This is a placeholder for the full article content. In a production environment,
              this would be populated with rich content from a CMS or markdown files.
            </p>
            <p className="leading-relaxed">
              The article would explore the topic of &ldquo;{post.title}&rdquo; in detail,
              providing actionable insights, data-backed recommendations, and practical
              strategies for marketing professionals and business leaders.
            </p>
            <h2 className="font-heading text-2xl font-bold text-text">Key Takeaways</h2>
            <ul className="list-disc space-y-2 pl-6">
              <li>Strategic insight related to {post.category}</li>
              <li>Practical implementation steps for teams</li>
              <li>Industry benchmarks and best practices</li>
              <li>Case study examples and real-world results</li>
            </ul>
            <p className="leading-relaxed">
              Ready to apply these insights to your brand? Our team at Eclipse Agency can help
              you turn strategy into results. Get in touch to start the conversation.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
