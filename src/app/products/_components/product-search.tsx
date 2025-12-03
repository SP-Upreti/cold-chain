"use client"

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Icon } from "@iconify/react";
import { useRouter } from 'next/navigation';
import { searchProductsServer, IAllProduct } from "@/services/productService";
import Image from 'next/image';
import Link from 'next/link';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TransitionLink } from '@/components/shared';

interface ProductSearchProps {
  initialSearch?: string;
}

export default function ProductSearch({ initialSearch = '' }: ProductSearchProps) {
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [searchResults, setSearchResults] = useState<IAllProduct[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const performSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    setIsSearching(true);
    setShowResults(true);
    try {
      const response = await searchProductsServer({
        page: 1,
        limit: 8,
        search: query.trim(),
      });

      setSearchResults(response.data?.products || []);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (value.trim()) {
      setShowResults(true);
      searchTimeoutRef.current = setTimeout(() => {
        performSearch(value);
      }, 300);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowResults(false);
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleViewAll = () => {
    if (searchQuery.trim()) {
      setShowResults(false);
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setShowResults(false);
    router.push('/products');
  };

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div ref={searchContainerRef} className="relative w-full max-w-2xl">
      {/* Search Input */}
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center">
          <Icon
            icon="teenyicons:search-outline"
            className="absolute left-3 size-5 text-zinc-400 pointer-events-none"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            onFocus={() => searchQuery.trim() && setShowResults(true)}
            placeholder="Search products..."
            className="w-full pl-10 pr-20 py-2.5 text-sm border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white"
            autoComplete="off"
          />
          <div className="absolute right-2 flex items-center gap-1">
            {searchQuery && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="p-1.5 hover:bg-zinc-100 rounded-md transition-colors"
                title="Clear search"
              >
                <Icon icon="heroicons:x-mark-solid" className="size-4 text-zinc-500" />
              </button>
            )}
            <button
              type="submit"
              className="p-1.5 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
              title="Search"
            >
              <Icon icon="tabler:arrow-right" className="size-4" />
            </button>
          </div>
        </div>
      </form>

      {/* Search Results Dropdown */}
      {showResults && searchQuery.trim() && (
        <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-2xl border border-zinc-200 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          {isSearching ? (
            <div className="flex items-center justify-center gap-2 py-8 text-sm text-zinc-500">
              <Icon icon="line-md:loading-twotone-loop" className="size-5" />
              <span>Searching...</span>
            </div>
          ) : searchResults.length > 0 ? (
            <ScrollArea className="max-h-[400px]">
              <div className="divide-y divide-zinc-100">
                {searchResults.map((product) => (
                  <TransitionLink
                    key={product.id}
                    href={`/products/${product.slug}`}
                    onClick={() => setShowResults(false)}
                    className="flex items-center gap-3 p-3 hover:bg-zinc-50 transition-colors group"
                  >
                    {product.coverimage ? (
                      <Image
                        src={product.coverimage}
                        alt={product.title || "Product"}
                        width={60}
                        height={60}
                        className="w-14 h-14 object-cover rounded-md flex-shrink-0"
                      />
                    ) : (
                      <div className="w-14 h-14 bg-zinc-200 rounded-md flex items-center justify-center flex-shrink-0">
                        <Icon icon="mdi:package-variant" className="size-6 text-zinc-400" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                        {product.title}
                      </h4>
                      <p className="text-xs text-zinc-500 truncate mt-0.5">
                        {product?.brandName || product?.model}
                      </p>
                    </div>
                    <Icon icon="tabler:arrow-up-right" className="size-4 text-zinc-400 group-hover:text-primary transition-colors flex-shrink-0" />
                  </TransitionLink>
                ))}
              </div>

              {/* View All Results Button */}
              {searchResults.length > 0 && (
                <div className="p-3 border-t border-zinc-100 bg-zinc-50/50">
                  <button
                    onClick={handleViewAll}
                    className="w-full py-2 text-center text-sm border border-primary text-primary rounded-md hover:bg-primary hover:text-white font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    View All Results
                    <Icon icon="tabler:arrow-right" className="size-4" />
                  </button>
                </div>
              )}
            </ScrollArea>
          ) : (
            <div className="p-8 text-center">
              <Icon icon="mdi:magnify-close" className="size-12 mx-auto mb-3 text-zinc-300" />
              <p className="text-sm text-zinc-500">No products found</p>
              <p className="text-xs text-zinc-400 mt-1">Try different keywords</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
