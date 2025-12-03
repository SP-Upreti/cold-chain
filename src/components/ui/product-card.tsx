import { Icon } from "@iconify/react";
import Image from "next/image";
import React from "react";
import ContactModal from "../dialog/contact-modal";
import { TransitionLink } from "../shared";
import { IAllProduct } from "@/services/productService";


export default function ProductCard({
  data,
}: {
  data: IAllProduct
}) {
  return (
    <div className="relative bg-white dark:bg-zinc-900 dark:border-zinc-800 flex flex-col border border-zinc-200 rounded-lg h-[50vh] group overflow-hidden">
      {data?.ispopular && (
        <div className="absolute top-2 left-2 bg-primary/20 text-primary  text-xs px-2 py-1 rounded-md z-10 ">
          Popular
        </div>
      )}
      <div className="flex-1 relative overflow-hidden">
        <Image
          src={data.coverImage || '/placeholder-image.png'}
          alt={data.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="relative w-full">
        <div className="backdrop-blur-sm p-2">
          <div className="w-full flex justify-between items-end">
            <div>
              <h2 className="text-xl  line-clamp-1 font-semibold">{data.title}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">{data.brandName}</p>

            </div>
          </div>
        </div>

        <div className="p-2 flex justify-between items-center transition-all duration-500 ">
          <TransitionLink
            href={`/products/${data.slug}`}
            className="border bg-white text-sm dark:bg-zinc-900 dark:border-white dark:text-white dark:hover:bg-primary  border-primary text-primary cursor-pointer px-4 py-1.5 hover:bg-primary hover:text-white rounded-md transition-colors duration-200 text-center flex items-center gap-2"
          >
            View Details
            <Icon icon="duo-icons:info" width="24" height="24" />
          </TransitionLink>

          <ContactModal btnClassName="" productData={data} />
        </div>
      </div>
    </div>
  );
}
