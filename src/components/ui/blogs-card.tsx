import { IBlog } from '@/types/IBlog'
import Image from 'next/image'
import { ClassNameValue } from 'tailwind-merge'
import { memo } from 'react'

const BlogCard = memo(function BlogCard({ data, className }: { data: IBlog, className?: ClassNameValue }) {
  return (
    <article className={`space-y-3 relative bg-white rounded-xl cursor-pointer group ${className}`}>
      <div className="w-full aspect-video rounded-sm relative overflow-hidden">
        <Image 
          src={data.coverImage || ''} 
          alt={data.title} 
          fill
          quality={50}
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover rounded-sm" 
        />
      </div>
      <div className="">
        <p className='md:text-lg line-clamp-2 text-zinc-800 group-hover:text-primary font-semibold lg:font-medium group-hover:underline transition-colors'>{data.title}</p>
        <p className='text-zinc-500 md:mt-2 text-sm md:text-base !line-clamp-2 hidden md:block'>{data.excerpt}</p>
        <button className='mt-1 md:mt-4 group-hover:text-primary font-medium text-lg flex gap-2 items-center text-primary lg:text-zinc-800 transition-colors'>
          Read <span className="inline-block group-hover:rotate-45 transition-transform duration-300">↗</span>
        </button>
      </div>
    </article>
  )
})

export default BlogCard

