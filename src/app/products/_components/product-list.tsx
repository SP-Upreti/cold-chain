"use client"

import React, { useEffect } from 'react';
import { IBrand } from "@/types/IBrand";
import { Icon } from "@iconify/react";
import { useBrandStore } from "@/store/useBrandStore";
import ProductCardV2 from '@/components/ui/product-card-v2';
import ProductCardSkeleton from '@/components/ui/product-card-skeleton';
import { IAllProduct } from '@/services/productService';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useLoading } from './loading-context';
import AdBanner from '@/components/shared/ad-banner';
import { IAd } from '@/types/IAd';

export type IGetAllProduct = {
  brandName: string;
  id: string;
  isPopular: string;
  coverImage: string;
  title: string;
  price: string;
  sortorder: number;
  galleryCoverImage: string
  slug: string
}

interface ProductListProps {
  search: string;
  page: number;
  limit: number;
  brand?: string;
  brands?: string;
  category?: string;
  categories?: string;
  subcategory?: string;
  subcategories?: string;
  technology?: string;
  initialProducts: IAllProduct[];
  initialBrands: IBrand[];
  totalPages: number;
  totalProducts: number;
  ads?: IAd[];
}

export default function ProductList({
  search,
  initialProducts,
  initialBrands,
  page,
  totalPages,
  totalProducts,
  brand,
  brands: brandsParam,
  category,
  categories: categoriesParam,
  subcategory,
  subcategories: subcategoriesParam,
  technology,
  ads = []
}: ProductListProps) {
  const { brands, setBrands } = useBrandStore();
  const { isLoading, setLoading } = useLoading();

  useEffect(() => {
    if (initialBrands.length > 0 && brands.length === 0) {
      setBrands(initialBrands);
    }
  }, [initialBrands, brands.length, setBrands]);

  useEffect(() => {
    setLoading(false);
  }, [initialProducts, setLoading]);

  const buildUrlParams = (pageNum: number) => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    // Use brand or brands param (prefer brand)
    if (brand) params.set('brand', brand);
    else if (brandsParam) params.set('brand', brandsParam);
    if (category) params.set('category', category);
    if (categoriesParam) params.set('categories', categoriesParam);
    if (subcategory) params.set('subcategory', subcategory);
    if (subcategoriesParam) params.set('subcategories', subcategoriesParam);
    if (technology) params.set('technology', technology);
    params.set('page', String(pageNum));

    return params.toString();
  };



  return (
    <>
      <AdBanner ads={ads} />

      <div className="pb-6 max-w-7xl mx-auto px-4 xl:px-0 relative">


        <div className={`grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 transition-opacity duration-200 `}>
          {isLoading ? (
            // Show skeleton loaders
            Array.from({ length: 16 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))
          ) : initialProducts.length > 0 ? (
            initialProducts.map((product) => (
              <ProductCardV2
                key={product.id}
                data={product}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <Icon icon="tabler:package-off" width="64" height="64" className="mx-auto text-zinc-300 mb-4" />
              <p className="text-muted-foreground text-lg">
                {search ? `No products found for "${search}"` : 'No products available'}
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t pt-6">
            <div className="text-sm text-muted-foreground">
              Showing {((page - 1) * 16) + 1} to {Math.min(page * 16, totalProducts)} of {totalProducts} products
            </div>
            <div className="flex items-center gap-2">
              <Link
                href={`/products?${buildUrlParams(page - 1)}`}
                className={page <= 1 ? 'pointer-events-none' : ''}
                onClick={() => setLoading(true)}
              >
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page <= 1}
                  className="gap-1"
                >
                  <Icon icon="tabler:chevron-left" width="16" height="16" />
                  <span className='hidden md:block'>Previous</span>
                </Button>
              </Link>

              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (page <= 3) {
                    pageNum = i + 1;
                  } else if (page >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = page - 2 + i;
                  }

                  return (
                    <Link
                      key={pageNum}
                      href={`/products?${buildUrlParams(pageNum)}`}
                      onClick={() => setLoading(true)}
                    >
                      <Button
                        variant={page === pageNum ? "default" : "outline"}
                        size="sm"
                        className="min-w-[40px]"
                      >
                        {pageNum}
                      </Button>
                    </Link>
                  );
                })}
              </div>

              <Link
                href={`/products?${buildUrlParams(page + 1)}`}
                className={page >= totalPages ? 'pointer-events-none' : ''}
                onClick={() => setLoading(true)}
              >
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page >= totalPages}
                  className="gap-1"
                >
                  <span className="hidden md:block">Next</span>

                  <Icon icon="tabler:chevron-right" width="16" height="16" />
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
