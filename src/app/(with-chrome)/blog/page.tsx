import type { Metadata } from "next";
import { BlogContent } from "./BlogContent";

export const metadata: Metadata = {
  title: "Blog - Branding, Marketing & Design Insights | Eclipse Agency",
  description:
    "Expert articles on branding, digital marketing, SEO, web development, video production, and creative strategy from Eclipse Agency's team in Riyadh.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog - Branding, Marketing & Design Insights",
    description: "Expert articles on branding, digital marketing, SEO, web development, and creative strategy from Eclipse Agency in Riyadh.",
    url: "https://www.eclipseagency.net/blog",
    siteName: "Eclipse Agency",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eclipse Agency Blog - Marketing & Design Insights",
    description: "Expert articles on branding, marketing, SEO, and creative strategy.",
  },
};

export default function BlogPage() {
  return <BlogContent />;
}
