"use client";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Icon } from "@iconify/react";
import { IBrand } from "@/types/IBrand";
import { useRouter, useSearchParams } from "next/navigation";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  brands: IBrand[];
  search?: string;
}

export default function FilterModal({ isOpen, onClose, brands, search }: FilterModalProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const [openBrands, setOpenBrands] = useState<{ [key: string]: boolean }>({});
  const [openCategories, setOpenCategories] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const toggleBrand = (brandName: string) => {
    setOpenBrands(prev => ({
      ...prev,
      [brandName]: !prev[brandName]
    }));
  };

  const toggleCategory = (categoryKey: string) => {
    setOpenCategories(prev => ({
      ...prev,
      [categoryKey]: !prev[categoryKey]
    }));
  };

  const handleSubcategoryClick = (subcategoryId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('subcategory', subcategoryId);
    if (search) {
      params.set('search', search);
    }
    router.push(`/products?${params.toString()}`);
    onClose();
  };

  if (!mounted || !isOpen) return null;

  const modalContent = (
    <div className="fixed inset-0 z-[150] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[85vh] m-4 flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 bg-gradient-to-r from-primary/5 to-transparent">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Icon icon="lets-icons:filter" className="text-primary" width="24" height="24" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-zinc-900">Filter Products</h2>
              <p className="text-sm text-zinc-500">Browse by brands and categories</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-zinc-100 rounded-lg transition-colors group"
            aria-label="Close modal"
          >
            <Icon 
              icon="mingcute:close-line" 
              width="24" 
              height="24" 
              className="text-zinc-600 group-hover:text-zinc-900 transition-colors"
            />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {brands.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Icon icon="tabler:filter-off" width="48" height="48" className="text-zinc-300 mb-3" />
              <p className="text-zinc-500">No filters available</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {brands.map((brand) => (
                <li key={brand.id} className="space-y-2">
                  {/* Brand Button */}
                  <button
                    onClick={() => toggleBrand(brand.name)}
                    className={`flex items-center w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                      openBrands[brand.name]
                        ? 'bg-primary/10 text-primary shadow-sm'
                        : 'bg-zinc-50 text-zinc-700 hover:bg-zinc-100'
                    }`}
                  >
                    <Icon
                      icon="mingcute:right-line"
                      width="20"
                      height="20"
                      className={`transition-transform duration-300 mr-3 ${
                        openBrands[brand.name] ? 'rotate-90' : ''
                      }`}
                    />
                    <span className="font-semibold text-base flex-1">{brand.name}</span>
                    <span className="text-xs bg-white px-2 py-1 rounded-full">
                      {brand.categories?.length || 0}
                    </span>
                  </button>

                  {/* Categories */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openBrands[brand.name] ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <ul className="space-y-2 pl-4 mt-2 border-l-2 border-primary/20 ml-6">
                      {brand?.categories?.map((category) => (
                        <li key={category.id} className="space-y-2">
                          {/* Category Button */}
                          <button
                            onClick={() => toggleCategory(`${brand.name}-${category.id}`)}
                            className={`flex items-center w-full text-left px-3 py-2 rounded-md transition-all duration-200 ${
                              openCategories[`${brand.name}-${category.id}`]
                                ? 'bg-primary/5 text-primary'
                                : 'text-zinc-600 hover:bg-zinc-50'
                            }`}
                          >
                            <Icon
                              icon="mingcute:right-line"
                              width="18"
                              height="18"
                              className={`transition-transform duration-300 mr-2 ${
                                openCategories[`${brand.name}-${category.id}`] ? 'rotate-90' : ''
                              }`}
                            />
                            <span className="font-medium text-sm flex-1">{category.title}</span>
                            <span className="text-xs text-zinc-400">
                              {category.subCategories?.length || 0}
                            </span>
                          </button>

                          {/* Subcategories */}
                          <div
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${
                              openCategories[`${brand.name}-${category.id}`]
                                ? 'max-h-[800px] opacity-100'
                                : 'max-h-0 opacity-0'
                            }`}
                          >
                            <ul className="space-y-1 pl-4 mt-1">
                              {category?.subCategories?.map((subcategory) => (
                                <li key={subcategory.id}>
                                  <button
                                    onClick={() => handleSubcategoryClick(subcategory.slug)}
                                    className="flex items-center w-full text-left px-3 py-2 rounded-md text-zinc-600 hover:text-primary hover:bg-primary/5 transition-all duration-200 group"
                                  >
                                    <Icon
                                      icon="ph:dot-outline-fill"
                                      width="18"
                                      height="18"
                                      className="mr-2 text-zinc-400 group-hover:text-primary transition-colors"
                                    />
                                    <span className="text-sm">{subcategory.title}</span>
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-zinc-200 bg-zinc-50/50">
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 bg-white border border-zinc-300 text-zinc-700 rounded-lg hover:bg-zinc-50 transition-colors font-medium"
            >
              Close
            </button>
            <button
              onClick={() => {
                router.push('/products');
                onClose();
              }}
              className="flex-1 px-4 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
