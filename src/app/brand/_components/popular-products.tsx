"use client";

import ProductCardV2 from "@/components/ui/product-card-v2";
import { IAllProduct } from "@/services/productService";

interface PopularProductsProps {
  products: IAllProduct[];
}

export default function PopularProducts({ products }: PopularProductsProps) {
  

  return (
    <div className="grid grid-cols-2 gap-2  lg:gap-3 lg:grid-cols-3 xl:grid-cols-4">
      {products.slice(0, 8).map((product) => (
        <ProductCardV2 key={product.id} data={product} />
      ))}
    </div>
  );
}
