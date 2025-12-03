"use client"

import React, { useEffect, useState } from 'react';
import ProductCard from "@/components/ui/product-card";
import { getAllProducts, IAllProduct } from "@/services/productService";

interface ProductListProps {
  search: string;
  page: number;
  limit: number;
}

export default function SuggestedProducts({ search, page, limit }: ProductListProps) {
  const [products, setProducts] = useState<IAllProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {

      setLoading(true);
      setError(null);

      try {
        const { data } = await getAllProducts({ page, limit, search });
        setProducts(data?.products || []);
      } catch (err) {
        console.error('ProductList: Error fetching products:', err);
        setError('Failed to load products. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [ page, limit, search]);

  if (loading) {
    return (
      <div className="grid sm:grid-cols-2 gap-2 lg:gap-3 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: limit }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-64"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="col-span-full text-center py-12">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 gap-2 lg:gap-3 lg:grid-cols-3 xl:grid-cols-4">
      {products.length > 0 ? (
        products.map((product) => (
          <ProductCard
            key={product.id}
            data={product }
          />
        ))
      ) : (
        <div className="col-span-full text-center py-12">
          <p className="text-muted-foreground text-lg">
            {search ? `No products found for "${search}"` : 'No products available'}
          </p>
        </div>
      )}
    </div>
  );
}
