import ContactModal from '@/components/dialog/contact-modal'
import { Product } from '@/types/IProductBySlug'
import { Icon } from '@iconify/react'
import Link from 'next/link'
import React from 'react'

export default function ShortDescription({ product }: { product: Product | undefined }) {
    return (
        <section className=''>
            <div className="col-span-2">
                <h1 className="text-xl lg:text-3xl max-w-4xl font-montserrat font-semibold text-zinc-900  dark:text-zinc-100">
                    {product?.name}
                </h1>
                <b>{product?.model}</b>
                <div dangerouslySetInnerHTML={{ __html: product?.shortDescription || "" }} className="text-sm lg:text-xl text-zinc-700 dark:text-zinc-100 mt-4 font-poppins"></div>
                <div className="flex gap-4 mt-8 max-w-md">
                    <ContactModal productData={product} btnClassName="rounded-full py-2 !text-base w-[200px] flex justify-center items-center" />
                </div>
            </div>
        </section>
    )
}
