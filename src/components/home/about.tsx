import React from 'react'
import { TransitionLink } from '../shared'
import Image from 'next/image'

export default function About() {
  return (
    <div className="bg-muted/80 py-12 lg:py-20">
      <div className="max-w-7xl mx-auto">
        <p className='text-lg font-semibold'>Sustainable Science Now</p>
        <h2 className='text-2xl lg:text-4xl font-semibold'>Make sustainability the global standard</h2>
        <p className='text-lg lg:text-xl mt-6 max-w-[75%]'>Through education, community engagement, and market leading certification programs, we’re building a global culture of sustainability in science and setting the benchmark for lab sustainability.</p>
      </div>
    </div>
  )
}
