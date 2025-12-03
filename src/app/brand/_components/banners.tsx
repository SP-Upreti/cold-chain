import { Button } from '@/components/ui/button'
import { IBrandCategory } from '@/types/IBrand'
import Image from 'next/image'
import React from 'react'

export interface ICategories {
    id: string
    createdAt: string
    updatedAt: string
    sortOrder: number
    isDeleted: number
    title: string
    slug: string
    coverImage: string
    description: string
}

export default function Banners({ categories }: {
    categories: IBrandCategory[]
}) {
    return (
        <section className=' pb-4'>
            {categories?.slice(0, 2)?.map((data, i)=>(
                 <div key={i} className={`h-[75dvh] w-full relative    ${i % 2 == 0 ? "bg-white " : "bg-zinc-100 text-zinc-900"}`}>
                                <Image src={data.coverImage || '/banners/banner4.png'} fill alt={data?.title} className='object-contain object-bottom ' />
                                <div className="absolute inset-0 z-10 flex flex-col p-18 items-center">
                                    <h2 className='text-4xl font-bold max-w-3xl mx-auto text-center'>{data?.title}</h2>
                                    {/* <p className='text-2xl max-w-4xl line-clamp-2 text-center'>{data?.description}</p> */}
                                    <div className="flex gap-5 mt-8 items-center">
                                        <Button className={`rounded-full text-xl font-medium px-6 py-6 border ${i % 2 === 0 ? "" : " border-white  font-medium"}`}>Learn More</Button>
                                        <Button variant='outline' className={`rounded-full text-xl font-medium px-6 py-6 bg-transparent border-primary text-primary ${i % 2 == 0 ? "" : "bg-white text-black border-black"}`}>Contact Us</Button>
                                    </div>
                                </div>
                            </div>
            ))}
        </section>
    )
}
