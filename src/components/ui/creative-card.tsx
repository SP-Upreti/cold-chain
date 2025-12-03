import { Icon } from '@iconify/react'
import React from 'react'

export default function CreativeCard() {
  return (
    <div className='shadow cursor-pointer hover:shadow-md overflow-hidden relative bg-white pb-10 p-5 aspect-video space-y-2 rounded-2xl'>
        <h2 className='text-xl font-semibold'>Technology</h2>
        <p className='pr-10 max-w- '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam, expedita?</p>
        <button className='flex gap-3 hover:border-zinc-500 border-b pb-1 border-dashed  items-center font-semibold mt-5'>Explore Category <Icon icon="mdi:arrow-right" /></button>
        <div className="flex absolute pointer-events-none inset-0  justify-end items-end">
            <img src="/cctv/cam1.png" alt="camera" className='w-52 2xl:w-64' />
        </div>
    </div>
  )
}
