import { Skeleton } from "./skeleton";

export default function ProductCardSkeleton() {
  return (
    <div className="relative border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden flex flex-col">
      <div className="p-2">
        {/* Image skeleton */}
        <Skeleton className="w-full h-35 sm:h-45 rounded-2xl" />

        {/* Content skeleton */}
        <div className="mt-1 md:mt-4 space-y-2">
          {/* Title skeleton */}
          <Skeleton className="h-5 w-3/4" />
          
          {/* Brand/Model skeleton */}
          <div className="flex gap-2 items-center">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      </div>
    </div>
  );
}
