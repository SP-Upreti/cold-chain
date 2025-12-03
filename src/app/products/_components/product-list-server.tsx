import React from 'react';
import ProductCard from "@/components/ui/product-card";
import { getAllProductsServer } from "@/services/productService";

interface ProductListServerProps {
  search: string;
  page: number;
  limit: number;
}

// ✅ Server Component - No reCAPTCHA needed, faster, better SEO
export default async function ProductListServer({ search, page, limit }: ProductListServerProps) {
  try {
    // Fetch products directly on the server - NO reCAPTCHA needed
    const { data } = await getAllProductsServer({ page, limit, search });
    const products = data.products || [];

    if (products.length === 0) {
      return (
        <div className="col-span-full text-center py-12">
          <p className="text-muted-foreground text-lg">
            {search ? `No products found for "${search}"` : 'No products available'}
          </p>
        </div>
      );
    }

    return (
      <div className="grid sm:grid-cols-2 gap-2 lg:gap-3 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            data={product}
          />
        ))}
      </div>
    );
  } catch (error) {
    console.error('Error fetching products:', error);
    return (
      <div className="col-span-full text-center py-12">
        <p className="text-red-500 text-lg">
          Failed to load products. Please try again later.
        </p>
      </div>
    );
  }
}
