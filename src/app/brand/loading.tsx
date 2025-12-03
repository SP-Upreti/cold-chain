import BrandCardSkeleton from "@/components/ui/brand-card-skeleton";

export default function Loading() {
  return (
    <main className="min-h-screen py-16 md:py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-left md:text-center mb-12">
          <div className="h-10 bg-zinc-200 dark:bg-zinc-800 rounded w-48 mx-auto md:mx-auto mb-4 animate-pulse" />
          <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded w-96 max-w-full mx-auto md:mx-auto animate-pulse" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <BrandCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </main>
  );
}
