import { IBrand } from '@/types/IBrand'
import Image from 'next/image'
import { memo } from 'react'

const BrandCard = memo(function BrandCard({ data }: { data: IBrand }) {
  return (
    <article className="relative bg-white dark:bg-zinc-900 rounded-sm md:rounded-xl overflow-hidden cursor-pointer group hover:shadow-lg transition-all duration-300 border border-zinc-200 dark:border-zinc-800">

      {/* Fixed Height Wrapper */}
      <div className="w-full h-[120px] md:h-[150px] flex items-center justify-center bg-white dark:bg-zinc-800 overflow-hidden">
        <div className="relative h-1/2 aspect-video">
          <Image
            src={data.logoUrl || '/placeholder-brand.png'}
            alt={data.name}
            fill
            quality={80}
            loading="lazy"
            className="object-contain aspect-[16/9] transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </div>

    </article>
  )
})

export default BrandCard
