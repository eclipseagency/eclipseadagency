export default function PortfolioLoading() {
  return (
    <>
      {/* Hero skeleton */}
      <section className="relative px-5 pt-32 pb-16 md:px-8 md:pt-40">
        <div className="mx-auto max-w-6xl text-center">
          <div className="mx-auto mb-4 h-7 w-24 animate-pulse rounded-full bg-white/5" />
          <div className="mx-auto mb-4 h-10 w-64 animate-pulse rounded-lg bg-white/5" />
          <div className="mx-auto h-5 w-96 max-w-full animate-pulse rounded-lg bg-white/5" />
        </div>
      </section>

      {/* Portfolio grid skeleton */}
      <section className="px-5 pb-20 md:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02]"
              >
                <div className="aspect-[4/3] animate-pulse bg-white/5" />
                <div className="p-5">
                  <div className="mb-2 h-5 w-2/3 animate-pulse rounded bg-white/5" />
                  <div className="h-4 w-full animate-pulse rounded bg-white/5" />
                  <div className="mt-1 h-4 w-1/2 animate-pulse rounded bg-white/5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
