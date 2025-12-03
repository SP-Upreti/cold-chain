import { Skeleton } from "@/components/ui/skeleton";

export default function ProductDetailsSkeleton() {
  return (
    <section className="max-w-7xl mx-auto mb-16 min-h-screen">
      <div className="space-y-">
        <div className="mx-auto">
          <div className=" pb-8 items-start grid-cols-1 lg:grid-cols-5 gap-12 mt-6 rounded-sm">

            <div className='py-4'>

              <div className="parent h-[70vh] overflow-hidden bg-background">
                {[...Array(4)].map((slide, index) => (
                  <Skeleton key={index} className={`div${index + 1} bg-muted w-full relative`}>

                  </Skeleton>
                ))}

              </div>

            </div>


            {/* Product Info Skeleton */}
            <div className="col-span-2 space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Skeleton className="h-8 lg:h-10 w-full" />
                <Skeleton className="h-8 lg:h-10 w-3/4" />
              </div>

              {/* Short Description */}
              <div className="space-y-2">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-2/3" />
              </div>

              {/* Buttons */}
              <div className="flex gap-4 max-w-md">
                <Skeleton className="h-12 w-[200px] rounded-full" />
                <Skeleton className="h-12 flex-1 rounded-full" />
              </div>
            </div>
          </div>

          {/* Specifications Section Skeleton */}
          <div className="mt-8 space-y-4">
            <Skeleton className="h-8 w-48" />
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          </div>

          {/* Summary Section Skeleton */}
          <div className="mt-8 space-y-4">
            <Skeleton className="h-8 w-32" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </div>

          {/* Videos Section Skeleton */}
          <div className="mt-8 space-y-4">
            <Skeleton className="h-8 w-40" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.from({ length: 2 }).map((_, i) => (
                <Skeleton key={i} className="aspect-video rounded-lg" />
              ))}
            </div>
          </div>
        </div>

        {/* Related Products Section Skeleton */}
        <div className="mt-12 space-y-4">
          <Skeleton className="h-8 w-56" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="aspect-square rounded-lg" />
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
