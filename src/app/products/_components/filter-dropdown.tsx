"use client";
import React, { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";
import { IBrand } from "@/types/IBrand";
import { useRouter, useSearchParams } from "next/navigation";

interface FilterDropdownProps {
  brands: IBrand[];
  search?: string;
}

export default function FilterDropdown({ brands, search }: FilterDropdownProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [openBrands, setOpenBrands] = useState<{ [key: string]: boolean }>({});
  const [openCategories, setOpenCategories] = useState<{ [key: string]: boolean }>({});
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
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
    setIsOpen(false);
  };

  const handleClearFilters = () => {
    router.push('/products');
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-lg border-zinc-200 hover:text-primary transition-all duration-200 group shrink-0"
        aria-label="Open filters"
      >
        <Icon
          icon="lets-icons:filter"
          width="20"
          height="20"
          className="text-zinc-600 group-hover:text-primary group-hover:scale-110 transition-all"
        />
        <span className="font-medium text-zinc-700 group-hover:text-primary hidden sm:inline">Filters</span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-md shadow-2xl border border-zinc-200 z-50 animate-in fade-in sm:slide-in-from-top-2 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200 to-transparent">
            <div className="flex items-center gap-2">
              <div className="">
                <Icon icon="lets-icons:filter" className="text-primary size-6" width="18" height="18"  />
              </div>
              <div>
                <h3 className=" text-zinc-900">Filter Products</h3>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="max-h-[60vh] overflow-y-auto px-4 py-3">
            {brands.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Icon icon="tabler:filter-off" width="40" height="40" className="text-zinc-300 mb-2" />
                <p className="text-sm text-zinc-500">No filters available</p>
              </div>
            ) : (
              <ul className="space-y-2">
                {brands.map((brand) => (
                  <li key={brand.id} className="space-y-1">
                    {/* Brand Button */}
                    <button
                      onClick={() => toggleBrand(brand.name)}
                      className={`flex items-center w-full text-left px-3 py-2  transition-all duration-200 ${
                        openBrands[brand.name]
                          ? 'text-primary'
                          : ''
                      }`}
                    >
                      <Icon
                        icon="mingcute:right-line"
                        width="16"
                        height="16"
                        className={`transition-transform duration-300 mr-2 ${
                          openBrands[brand.name] ? 'rotate-90' : ''
                        }`}
                      />
                      <span className="font-semibold text-sm flex-1">{brand.name}</span>
                      <span className="text-xs ">
                        {brand.categories?.length || 0} items
                      </span>
                    </button>

                    {/* Categories */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        openBrands[brand.name] ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <ul className="space-y-1 pl-3 mt-1 border-l-2 border-primary/20 ml-4">
                        {brand?.categories?.map((category) => (
                          <li key={category.id} className="space-y-1">
                            {/* Category Button */}
                            <button
                              onClick={() => toggleCategory(`${brand.name}-${category.id}`)}
                              className={`flex items-center  w-full text-left px-2 py-1.5 rounded-md transition-all duration-200 ${
                                openCategories[`${brand.name}-${category.id}`]
                                  ? ' text-primary'
                                  : 'text-zinc-600 hover:bg-zinc-50'
                              }`}
                            >
                              <Icon
                                icon="mingcute:right-line"
                                width="14"
                                height="14"
                                className={`transition-transform duration-300 mr-1.5 ${
                                  openCategories[`${brand.name}-${category.id}`] ? 'rotate-90' : ''
                                }`}
                              />
                              <span className="font-medium text-xs flex-1 line-clamp-1">{category.title}</span>
                              <span className="text-xs pl-4  text-zinc-400">
                                {category.subCategories?.length || 0} items
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
                              <ul className="space-y-0.5 pl-3 mt-0.5">
                                {category?.subCategories?.map((subcategory) => (
                                  <li key={subcategory.id}>
                                    <button
                                      onClick={() => handleSubcategoryClick(subcategory.slug)}
                                      className="flex items-center w-full text-left px-2 py-1.5 rounded-xs text-zinc-600 hover:text-primary hover:bg-primary/5 transition-all duration-200 group"
                                    >
                                      <Icon
                                        icon="lets-icons:box-alt-light"
                                        width="14"
                                        height="14"
                                        className="mr-1.5 text-zinc-400 group-hover:text-primary transition-colors"
                                      />
                                      <span className="text-xs">{subcategory.title}</span>
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
          <div className="px-4 py-3 flex justify-end items-center border-t border-zinc-200 bg-zinc-50/50">
            <button
              onClick={handleClearFilters}
              className=" px-3 py-2   rounded-lg hover:text-primary transition-colors font-medium text-sm"
            >
              Clear Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
