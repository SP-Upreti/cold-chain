"use client"

import { Button } from "@/components/ui/button";
import { IBrand } from "@/types/IBrand";
import Image from "next/image";
import { Icon } from "@iconify/react";
import Title from "@/components/home/title";


export default function BrandAbout({ brand }: { brand: IBrand }) {

  if (!brand) return null

  return (
    <div className="grid  py-10 md:py-12 lg:py-20 min-h-[60vh]  max-w-7xl lg:grid-cols-2 items-center  mx-auto">


      <div className="space-y-2 sm:space-y-3">
        <div className="space-y-2">
          <div className="mt-4">
            <Title wrapperClassName={"!mx-0 !mb-0 text-left"} title={"Our Identity as " + brand?.name} />
          </div>
        </div>

        <div
          dangerouslySetInnerHTML={{ __html: brand?.description?.trim() || "" }}
          className="text-sm sm:text-lg  text-muted-foreground leading-relaxed"
        />

        <div className="flex gap-5  items-center flex-wrap">
          <Button className="px-4 sm:px-8  sm:py-6 sm:text-lg rounded-full group relative overflow-hidden">
            <span className="relative z-10 flex items-center gap-2">
              Products
              <Icon icon="tabler:arrow-right" className="size-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Button>
        </div>
      </div>


      <div className="w-full h-full max-h-[50vh] relative group">
        <Image
          src={brand.indoorImage || brand.outdoorImage || ""}
          width={1200}
          height={1200}
          className="w-full h-full object-cover  max-w-sm mx-auto"
          alt="plaza sales"
        />
      </div>
    </div>
  )
}