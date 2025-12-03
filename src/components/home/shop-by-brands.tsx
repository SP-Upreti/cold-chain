import { BRANDS } from "@/data/static-data";
import React from "react";
import SectionHeader from "../ui/section-header";

export default function AllProducts() {
  return (
    <section className="">
      <div className="flex justify-between font-poppins items-center gap-6 flex-wrap">
        <SectionHeader title="Shop By Brands" desc="Search by our famous brands"/>
        <div className="flex items-center w-fit bg-white border dark:bg-zinc-800 p-2 rounded-full">
          {BRANDS.map((brand, idx) => (
            <button
              key={brand.name}
              className={`flex-shrink-0 py-2 ${
                idx === 0 ? "bg-black dark:bg-zinc-300 dark:text-primary text-white" : "dark:text-zinc-300"
                }  px-4 rounded-full text-sm font-medium text-muted-foreground `}
            >
              {brand.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 mt-4 md:grid-cols-4 gap-4">
        {/* {PRODUCTS.map((product) => (
          <ProductCard key={product.id} data={product} />
        ))} */}
      </div>
    </section>
  );
}
