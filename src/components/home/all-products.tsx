import React from "react";
import SectionHeader from "../ui/section-header";

export default function AllProducts() {
  return (
    <section className="">
      <div className="flex justify-between items-center gap-6 flex-wrap">
        <SectionHeader
          title="Our Popular Products"
          desc="We are proud to be associated with the following esteemed organizations."
        />
      </div>

      <div className="grid grid-cols-2 mt-4 md:grid-cols-4 gap-4">
        {/* {PRODUCTS.map((product) => (
          <ProductCard key={product.id} data={product} />
        ))} */}
      </div>
    </section>
  );
}
