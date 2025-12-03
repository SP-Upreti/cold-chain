import ProductCardV2 from "@/components/ui/product-card-v2";
import SectionHeader from "@/components/ui/section-header";
import { IAllProduct } from "@/services/productService";
import React from "react";


export default function RelatedProducts({ similarProduct }: { similarProduct: IAllProduct[] }) {
  if (!similarProduct || similarProduct.length === 0) {
    return null;
  }
  return (
    <section className="">
      <div className="flex justify-between items-center gap-6 flex-wrap">
        <SectionHeader
          title="Products You May Like"
          titleClassName=""
        />
      </div>

      <div className="grid grid-cols-2 mt-4 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {similarProduct?.slice(0, 6).map((product) => (
          <ProductCardV2 key={product.id} data={product} />
        ))}
      </div>
    </section>
  );
}
