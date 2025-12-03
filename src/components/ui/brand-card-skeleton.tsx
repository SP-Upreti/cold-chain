export default function BrandCardSkeleton() {
  return (
    <div className="relative bg-white dark:bg-zinc-900 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 animate-pulse">
      <div className="w-full aspect-video bg-zinc-200 dark:bg-zinc-800" />
      <div className="p-5 space-y-3">
        <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded w-3/4" />
        <div className="space-y-2">
          <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-full" />
          <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-5/6" />
        </div>
        <div className="flex items-center justify-between pt-2">
          <div className="h-5 bg-zinc-200 dark:bg-zinc-800 rounded w-24" />
          <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded-full w-20" />
        </div>
      </div>
    </div>
  )
}
