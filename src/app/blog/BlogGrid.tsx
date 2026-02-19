"use client";

import Image from "next/image";
import Link from "next/link";
import { MobileCarousel } from "@/components/ui/MobileCarousel";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { formatDate } from "@/lib/utils";

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  readTime: string;
}

function BlogCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group rounded-2xl border border-border bg-bg-card overflow-hidden transition-all duration-300 hover:border-border-hover block h-full"
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
  );
}

export function BlogGrid({ posts }: { posts: Post[] }) {
  return (
    <MobileCarousel desktopGrid="sm:grid-cols-2 lg:grid-cols-3" gap="gap-8">
      {posts.map((post) => (
        <BlogCard key={post.slug} post={post} />
      ))}
    </MobileCarousel>
  );
}
