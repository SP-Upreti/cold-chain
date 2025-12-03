import { Icon } from '@iconify/react'
import Link from 'next/link'
import React, { useEffect } from 'react'
import Image from 'next/image';
import { useState } from 'react';
import { useBrandStore } from '@/store/useBrandStore';
import TransitionLink from './transition-link';


export default function NavbarDropdown({ drapdownState, setDrapdownState, modalRef }: {
  drapdownState: { isActive: boolean; idx: number | null };
  setDrapdownState: React.Dispatch<React.SetStateAction<{ isActive: boolean; idx: number | null }>>;
  modalRef: React.RefObject<HTMLDivElement | null>;
}) {
  const [activeCategory, setActiveCategory] = useState<number>(0);
  const { brands, isLoading, fetchBrands } = useBrandStore();

  useEffect(() => {
    if (brands.length === 0 && !isLoading) {
      fetchBrands();
    }
  }, [brands.length, isLoading, fetchBrands]);

  return (
    <>
      {/* Dropdown modal area */}
      <div className={`fixed hidden md:block inset-0 ${drapdownState.isActive ? "backdrop-blur-[8px] " : ""} pointer-events-none z-[210]`}>
        <div
          ref={modalRef}
          className={`min-h-[50dvh] w-[65dvw] mx-auto py-4    dark:bg-zinc-900 pointer-events-auto rounded-b-md   transition-all duration-500 ${drapdownState.isActive ? "translate-y-0" : "-translate-y-[120%] "
            }`}
        >
          <div className="grid p-5 bg-background mt-[4rem] rounded-2xl border border-primary/20 md:grid-cols-2 lg:grid-cols-11 gap-8">


            <div className="px-4 col-span-3 space-y-3 ">
              <h2 className="text-xl font-semibold">Our Brands</h2>
              <ul className=" space-y-1 ">
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, idx) => (
                    <li key={idx} className="py-1 border border-zinc-200 rounded-full animate-pulse">
                      <div className="p-0.5 px-3 flex items-center justify-between">
                        <div className="h-[25px] w-24 bg-zinc-200 rounded"></div>
                        <div className="h-3 w-8 bg-zinc-200 rounded"></div>
                      </div>
                    </li>
                  ))
                ) : (
                  brands.map((brand, idx) => (
                    <li
                      className={`font-medium py-1 group border  hover:border-primary rounded-full ${activeCategory === idx ? " bg-white border-primary  text-primary " : "border-zinc-200 text-zinc-200"
                        } cursor-pointer`}
                      onMouseOver={() => setActiveCategory(idx)}
                      onClick={() => setDrapdownState({ isActive: false, idx: null })}
                      key={brand.id}
                    >
                      <TransitionLink href={`/brand/${brand.slug}`} className="!w-full p-0.5 px-3 justify-between items-center  flex">
                        <Image
                          src={brand.logoUrl}
                          alt={brand?.name || "Product"}
                          height={20}
                          width={100}

                          className="object-contain h-[25px] w-fit p-1"
                        />
                        <span className='text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                          style={{
                            opacity: activeCategory === idx ? 1 : 0
                          }}
                        >view</span>
                      </TransitionLink>
                    </li>
                  ))
                )}
              </ul>
            </div>

            <div className="col-span-8 space-y-3">
              <h2 className="text-xl font-semibold flex gap-6 items-center justify-between pr-4">Featured Products <TransitionLink href={`/products?brand=${brands[activeCategory]?.slug}`}><span className="flex gap-3 hover:text-primary items-center text-base font-normal">See All <Icon icon="mingcute:arrow-right-line" className="w-4 h-4" /></span></TransitionLink></h2>
              <ul className=" space-y-3  pr-4  grid grid-cols-3 gap-3">
                {isLoading ? (
                  // Skeleton loader for products
                  Array.from({ length: 3 }).map((_, idx) => (
                    <li key={idx} className="border bg-white h-full rounded-xl p-2 border-zinc-300 animate-pulse">
                      <div className="bg-zinc-200 rounded-lg w-full aspect-[1/0.7]"></div>
                      <div className="mt-2 space-y-2">
                        <div className="h-4 bg-zinc-200 rounded w-3/4"></div>
                        <div className="h-4 bg-zinc-200 rounded w-1/2"></div>
                      </div>
                    </li>
                  ))
                ) : (
                  brands[activeCategory]?.popularProducts
                    .slice(0, 3)
                    .map((product) => (
                      <TransitionLink href={`/products/${product?.category?.title || product?.category?.slug}/${product?.subcategory?.title || product?.subcategory?.slug}/${product.slug}`} key={product.id} className=" bg-white h-full rounded-xl ">
                        <li className=" bg-white h-full group cursor-pointer rounded-xl  border-zinc-300 hover:border-primary">
                          <div className="relative bg-primary/10 rounded-lg   w-full  flex justify-center items-center   aspect-[1/0.7] overflow-hidden">
                            <Image
                              src={product.coverImage as string}
                              alt={product.title || "product"}
                              layout="fill"
                              className="object-cover"
                            />
                          </div>
                          <h3 className="mt-2 group-hover:underline group-hover:text-primary font-medium  line-clamp-2">{product?.name}</h3>
                        </li>
                      </TransitionLink>
                    ))
                )}
              </ul>
            </div>


          </div>
        </div>
      </div>
    </>
  )
}
