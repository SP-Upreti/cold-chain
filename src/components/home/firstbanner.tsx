import React from 'react'
import { Icon } from '@iconify/react'

export default function Banners() {
  return (
    <section className='h-[70dvh]  my-12 items-center grid grid-cols-2'>
      <div className="">
      </div>
      <div className="space-y-4 pr-14">
        <h2 className='text-5xl xl:text-6xl max-w-lg font-semibold'>Dissolve in sound of studio</h2>
        <p className='text-xl'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores architecto facere quos cum debitis distinctio mollitia odit nemo esse deserunt.</p>
        <div className="flex gap-4 items-center mt-6">
          <button className='bg-primary  text-white px-8 rounded-full text-xl lg:text-2xl py-2'>Explore Product</button>
          <button className='border px-8 py-2 rounded-full text-2xl border-primary text-primary'>
            <Icon icon={"solar:heart-linear"} className="size-8" />
          </button>
        </div>

      </div>

    </section>
  )
}
