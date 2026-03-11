export default function BlogPostLoading() {
  return (
    <>
      {/* Header skeleton */}
      <section className="relative px-5 pt-32 pb-16 md:px-8 md:pt-40">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 h-4 w-28 animate-pulse rounded bg-white/5" />

          <div className="mb-4 flex items-center gap-3">
            <div className="h-5 w-16 animate-pulse rounded-full bg-white/5" />
            <div className="h-4 w-20 animate-pulse rounded bg-white/5" />
            <div className="h-4 w-14 animate-pulse rounded bg-white/5" />
          </div>

          <div className="mb-3 h-10 w-full animate-pulse rounded-lg bg-white/5" />
          <div className="mb-3 h-10 w-3/4 animate-pulse rounded-lg bg-white/5" />
          <div className="mt-5 h-5 w-full animate-pulse rounded bg-white/5" />
          <div className="mt-2 h-5 w-2/3 animate-pulse rounded bg-white/5" />
        </div>
      </section>

      {/* Content skeleton */}
      <section className="px-5 pb-20 md:px-8">
        <div className="mx-auto max-w-3xl">
          {/* Image placeholder */}
          <div className="mb-12 aspect-[16/9] animate-pulse rounded-2xl border border-white/5 bg-white/5" />

          {/* Text lines */}
          <div className="space-y-4">
            <div className="h-5 w-full animate-pulse rounded bg-white/5" />
            <div className="h-5 w-full animate-pulse rounded bg-white/5" />
            <div className="h-5 w-5/6 animate-pulse rounded bg-white/5" />
            <div className="h-5 w-full animate-pulse rounded bg-white/5" />
            <div className="h-5 w-3/4 animate-pulse rounded bg-white/5" />
            <div className="mt-8 h-8 w-48 animate-pulse rounded-lg bg-white/5" />
            <div className="mt-4 h-5 w-full animate-pulse rounded bg-white/5" />
            <div className="h-5 w-full animate-pulse rounded bg-white/5" />
            <div className="h-5 w-2/3 animate-pulse rounded bg-white/5" />
          </div>
        </div>
      </section>
    </>
  );
}
