import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <section
      className="flex min-h-screen items-center justify-center px-5"
      style={{ backgroundColor: "#0a0a0a" }}
    >
      <div className="text-center">
        <p
          className="font-heading text-[10rem] font-bold leading-none"
          style={{
            background: "linear-gradient(135deg, #ff6b35, #f7931e)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          404
        </p>

        <h1 className="mt-6 font-heading text-3xl font-bold text-white">
          Page Not Found
        </h1>

        <p className="mt-3 text-white/40">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="mt-10 flex items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full px-8 py-3 font-medium text-white transition-opacity hover:opacity-90"
            style={{
              background: "linear-gradient(135deg, #ff6b35, #f7931e)",
            }}
          >
            Go Home
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full border border-white/20 px-8 py-3 font-medium text-white transition-colors hover:border-white/40"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
