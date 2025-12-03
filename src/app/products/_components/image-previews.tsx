import { IGalleryItem } from '@/types/IProductBySlug'
import React from 'react'
import Image from 'next/image'

export default function ImagesPreview({ slides, defaultImage }: { slides: IGalleryItem[], defaultImage: string | null }) {

  if (slides?.length === 0) return (
    <div className="h-64 sm:h-80 md:h-96 bg-muted/80 px-4 relative overflow-hidden border rounded-sm">
      <Image src={defaultImage || ""} fill alt='gallery' className='object-contain' />
    </div>
  )

  const itemCount = Math.min(slides.length, 4);

  // Get grid layout classes based on item count
  const getGridClasses = () => {
    switch (itemCount) {
      case 1:
        return 'grid grid-cols-1';
      case 2:
        return 'grid grid-cols-1 sm:grid-cols-2 gap-2';
      case 3:
        return 'grid grid-cols-1 sm:grid-cols-2 gap-2';
      case 4:
        return 'grid grid-cols-1 sm:grid-cols-2 gap-2';
      default:
        return 'grid grid-cols-1 sm:grid-cols-2 gap-2';
    }
  };

  // Get item-specific classes for special layouts
  const getItemClasses = (index: number) => {
    const baseClasses = 'bg-muted relative overflow-hidden rounded-sm';

    if (itemCount === 1) {
      return `${baseClasses} h-64 sm:h-80 md:h-96`;
    }

    if (itemCount === 2) {
      return `${baseClasses} h-48 sm:h-64 md:h-80`;
    }

    if (itemCount === 3) {
      // First item spans 2 columns on larger screens
      if (index === 0) {
        return `${baseClasses} h-48 sm:h-64 md:h-80 sm:col-span-2`;
      }
      return `${baseClasses} h-48 sm:h-64`;
    }

    // 4 items - 2x2 grid
    return `${baseClasses} h-40 sm:h-48 md:h-64`;
  };

  return (
    <div className=''>
      <div className={`${getGridClasses()} bg-background`}>
        {slides.slice(0, 4).map((slide, index) => (
          <div key={index} className={getItemClasses(index)}>
            {slide?.mediaAsset[0]?.type === "IMAGE" ? (
              <Image
                src={slide.mediaAsset[0].fileUrl}
                alt={`Product Image ${index + 1}`}
                fill
                className="object-contain "
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                priority={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
              />
            ) : (
              <video
                src={slide.mediaAsset[0].fileUrl}
                className="w-full h-full object-cover p-2"
                controls
                preload="metadata"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
