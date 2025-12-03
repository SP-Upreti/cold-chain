"use client";
import React from "react";
import { Icon } from "@iconify/react";
import CustomBreadcumb from "@/components/ui/custom-breadcum";
import { useBrandStore } from "@/store/useBrandStore";
import { useRouter, useSearchParams } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { useLoading } from "./loading-context";

interface SidebarProps {
  children: React.ReactNode;
  search?: string;
  brand?: string;
  brands?: string;
  category?: string;
  categories?: string;
  subcategory?: string;
  subcategories?: string;
  technology?: string;
}

export default function Sidebar({
  children,
  search,
  brand,
  brands: brandsParam,
  category,
  categories: categoriesParam,
  subcategory,
  subcategories: subcategoriesParam,
  technology
}: SidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setLoading } = useLoading();
  const [isBrandsOpen, setIsBrandsOpen] = React.useState(true);
  const [isCategoriesOpen, setIsCategoriesOpen] = React.useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  // Initialize from URL params - single brand selection
  const [selectedBrand, setSelectedBrand] = React.useState<string>(() => {
    return brand || brandsParam || '';
  });
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>(() => {
    if (category) return [category];
    if (categoriesParam) return categoriesParam.split(',');
    return [];
  });
  const [selectedSubcategory, setSelectedSubcategory] = React.useState<string>(() => {
    return subcategory || subcategoriesParam || '';
  });

  const { brands } = useBrandStore();



  // Get categories based on selected brand
  const displayCategories = React.useMemo(() => {
    if (!selectedBrand) {
      // Show all categories when no brand is selected
      const categoryMap = new Map<string, { id: string; title: string; slug: string }>();
      brands.forEach(brand => {
        brand.categories?.forEach(cat => {
          if (!categoryMap.has(cat.id)) {
            categoryMap.set(cat.id, { id: cat.id, title: cat.title, slug: cat.slug });
          }
        });
      });
      return Array.from(categoryMap.values());
    }

    // Show only selected brand's categories
    const selectedBrandData = brands.find(b => b.slug === selectedBrand);
    return selectedBrandData?.categories?.map(cat => ({
      id: cat.id,
      title: cat.title,
      slug: cat.slug
    })) || [];
  }, [brands, selectedBrand]);

  // Get subcategories based on selected brand and category
  const displaySubcategories = React.useMemo(() => {
    if (selectedCategories.length === 0) {
      // Show all subcategories when no category is selected
      const subcategoryMap = new Map<string, { id: string; title: string; slug: string; categorySlug: string }>();

      if (selectedBrand) {
        // If brand is selected, show only that brand's subcategories
        const selectedBrandData = brands.find(b => b.slug === selectedBrand);
        selectedBrandData?.categories?.forEach(cat => {
          cat.subCategories?.forEach(sub => {
            if (!subcategoryMap.has(sub.id)) {
              subcategoryMap.set(sub.id, {
                id: sub.id,
                title: sub.title,
                slug: sub.slug,
                categorySlug: cat.slug
              });
            }
          });
        });
      } else {
        // Show all subcategories from all brands
        brands.forEach(brand => {
          brand.categories?.forEach(cat => {
            cat.subCategories?.forEach(sub => {
              if (!subcategoryMap.has(sub.id)) {
                subcategoryMap.set(sub.id, {
                  id: sub.id,
                  title: sub.title,
                  slug: sub.slug,
                  categorySlug: cat.slug
                });
              }
            });
          });
        });
      }

      return Array.from(subcategoryMap.values());
    }

    // Show subcategories for selected categories
    const subcategoryMap = new Map<string, { id: string; title: string; slug: string; categorySlug: string }>();

    if (selectedBrand) {
      // Filter by selected brand
      const selectedBrandData = brands.find(b => b.slug === selectedBrand);
      selectedBrandData?.categories
        ?.filter(cat => selectedCategories.includes(cat.slug))
        .forEach(cat => {
          cat.subCategories?.forEach(sub => {
            if (!subcategoryMap.has(sub.id)) {
              subcategoryMap.set(sub.id, {
                id: sub.id,
                title: sub.title,
                slug: sub.slug,
                categorySlug: cat.slug
              });
            }
          });
        });
    } else {
      // Show from all brands
      brands.forEach(brand => {
        brand.categories
          ?.filter(cat => selectedCategories.includes(cat.slug))
          .forEach(cat => {
            cat.subCategories?.forEach(sub => {
              if (!subcategoryMap.has(sub.id)) {
                subcategoryMap.set(sub.id, {
                  id: sub.id,
                  title: sub.title,
                  slug: sub.slug,
                  categorySlug: cat.slug
                });
              }
            });
          });
      });
    }

    return Array.from(subcategoryMap.values());
  }, [brands, selectedBrand, selectedCategories]);

  const handleBrandToggle = React.useCallback((brandSlug: string) => {
    // Only allow one brand at a time
    setSelectedBrand(prev => {
      const newSelection = prev === brandSlug ? '' : brandSlug;
      // Clear categories and subcategories when brand changes
      setSelectedCategories([]);
      setSelectedSubcategory('');
      // Use setTimeout to avoid blocking the UI
      setTimeout(() => {
        updateFilters({ brand: newSelection, categories: [], subcategory: '' });
      }, 0);
      return newSelection;
    });
  }, []);

  const handleCategoryToggle = React.useCallback((categorySlug: string) => {
    setSelectedCategories(prev => {
      // Only allow one category at a time
      const newSelection = prev.includes(categorySlug) ? [] : [categorySlug];
      // Clear subcategories when category changes
      setSelectedSubcategory('');
      // Use setTimeout to avoid blocking the UI
      setTimeout(() => {
        updateFilters({ categories: newSelection, subcategory: '' });
      }, 0);
      return newSelection;
    });
  }, []);

  const handleSubcategoryToggle = React.useCallback((subcategorySlug: string) => {
    setSelectedSubcategory(prev => {
      // Only allow one subcategory at a time
      const newSelection = prev === subcategorySlug ? '' : subcategorySlug;
      // Use setTimeout to avoid blocking the UI
      setTimeout(() => {
        updateFilters({ subcategory: newSelection });
      }, 0);
      return newSelection;
    });
  }, []);

  const updateFilters = React.useCallback((updates: {
    brand?: string;
    categories?: string[];
    subcategory?: string;
  }) => {
    const params = new URLSearchParams(searchParams.toString());

    // Update brand (single selection)
    if (updates.brand !== undefined) {
      if (updates.brand) {
        params.set('brand', updates.brand);
      } else {
        params.delete('brand');
      }
    }

    // Update categories
    if (updates.categories !== undefined) {
      if (updates.categories.length > 0) {
        params.set('categories', updates.categories.join(','));
      } else {
        params.delete('categories');
      }
    }

    // Update subcategory (single selection)
    if (updates.subcategory !== undefined) {
      if (updates.subcategory) {
        params.set('subcategory', updates.subcategory);
      } else {
        params.delete('subcategory');
      }
    }

    // Keep search parameter
    if (search) {
      params.set('search', search);
    }

    // Keep technology parameter
    if (technology) {
      params.set('technology', technology);
    }

    // Reset to page 1 when filters change
    params.set('page', '1');

    // Trigger loading state
    setLoading(true);
    router.push(`/products?${params.toString()}`);
  }, [router, searchParams, search, technology, setLoading]);

  const clearAllFilters = () => {
    setSelectedBrand('');
    setSelectedCategories([]);
    setSelectedSubcategory('');
    const params = new URLSearchParams();
    if (search) {
      params.set('search', search);
    }
    setLoading(true);
    router.push(`/products?${params.toString()}`);
  };

  const hasActiveFilters = selectedBrand || selectedCategories.length > 0 || selectedSubcategory;

  const breadcrumbPaths = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    search && { name: `Search: ${search}`, href: `/products?search=${encodeURIComponent(search)}` }
  ].filter((path): path is { name: string; href: string } => Boolean(path));

  return (
    <div className="">
      <CustomBreadcumb onClick={() => setIsSidebarOpen(!isSidebarOpen)} paths={breadcrumbPaths} className="flex-1 min-w-0 py-2 px-4 xl:px-0" />

      <div className="flex relative max-w-7xl mx-auto">


        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-[190] transition-opacity"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <div className={`
        w-full max-w-[220px] border-r border-zinc-200 bg-white lg:bg-gradient-to-b from-white to-gray-50/50 shrink-0
        fixed lg:sticky top-0 left-0 h-screen z-[190] transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden absolute top-4 right-4 z-50 text-zinc-600 hover:text-zinc-900"
          >
            <Icon icon="mingcute:close-line" className="size-6" />
          </button>

          {/* Header with Clear Filters */}
          <div className="flex px-4 xl:pr-4 xl:px-0 items-center justify-between bg-white/80 backdrop-blur-sm border-b border-zinc-200 py-3">
            <h3 className=" font-semibold text-sm flex gap-2 items-center">
              <Icon icon="lets-icons:filter" className="size-4" />
              Filters
            </h3>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="hidden lg:block text-xs text-zinc-600 hover:text-primary transition-colors"
              >
                Clear All
              </button>
            )}
          </div>

          {/* Filters Content - Scrollable */}
          <div className="overflow-y-auto h-[calc(100vh-73px)] lg:h-[calc(100vh-73px)] px-4 xl:px-0 py-4 pb-20 lg:pb-4 relative">

            {/* Brands Filter */}
            <div className="mb-2 pr-4">
              <button
                onClick={() => setIsBrandsOpen(!isBrandsOpen)}
                className="flex items-center justify-between w-full text-left mb-3 group"
              >
                <h4 className="text-sm font-semibold text-zinc-900 flex items-center gap-2">
                  Brands
                </h4>
                <Icon
                  icon="mingcute:right-line"
                  className={`size-4 transition-transform duration-300 ${isBrandsOpen ? 'rotate-90' : ''}`}
                />
              </button>

              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isBrandsOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="space-y-2">
                  {brands?.map((brandItem) => {
                    const isSelected = selectedBrand === brandItem.slug;
                    return (
                      <label
                        key={brandItem.id}
                        className="flex items-center gap-2 cursor-pointer rounded-md transition-colors group"
                      >
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => handleBrandToggle(brandItem.slug)}
                          className="size-5 rounded-full"
                        />
                        <span className="text-sm text-zinc-700 group-hover:text-zinc-900">
                          {brandItem.name}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Categories Filter */}
            <div className="mb-3 mt-4 pr-4">
              <button
                onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                className="flex items-center justify-between w-full text-left mb-3 group"
              >
                <h4 className="text-sm font-semibold text-zinc-900 flex items-center gap-2">
                  Product Type

                </h4>
                <Icon
                  icon="mingcute:right-line"
                  className={`size-4 transition-transform duration-300 ${isCategoriesOpen ? 'rotate-90' : ''}`}
                />
              </button>

              <div className={`overflow-hidden  transition-all duration-300 ease-in-out ${isCategoriesOpen ? 'max-h-full opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="space-y-2">
                  {displayCategories.map((category) => {
                    const isSelected = selectedCategories.includes(category.slug);
                    return (
                      <label
                        key={category.id}
                        className="flex items-center gap-2 cursor-pointer rounded-md transition-colors group"
                      >
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => handleCategoryToggle(category.slug)}
                          className="size-5 rounded-full"
                        />
                        <span className="text-sm text-zinc-700 group-hover:text-zinc-900">
                          {category.title}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>

            {displaySubcategories.length > 0 && (
              <div className="mb-6 pr-4">
                <h4 className="text-sm font-semibold text-zinc-900 flex items-center gap-2 mb-3">
                  Product Category
                </h4>

                <div className="space-y-2">
                  {displaySubcategories.map((subcategory) => {
                    const isSelected = selectedSubcategory === subcategory.slug;
                    return (
                      <label
                        key={subcategory.id}
                        className="flex items-center gap-2 cursor-pointer rounded-md transition-colors group"
                      >
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => handleSubcategoryToggle(subcategory.slug)}
                          className="size-5 rounded-full"
                        />
                        <span className="text-sm text-zinc-700 group-hover:text-zinc-900">
                          {subcategory.title}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Mobile Clear All Button - Fixed at bottom right */}
            {hasActiveFilters && (
              <div className="lg:hidden fixed border-t p-3 bottom-0 w-full flex h-fit bg-white justify-end right-0 z-50">
                <button
                  onClick={clearAllFilters}
                  className="text-primary  hover:bg-primary/90 transition-colors text-sm font-medium"
                >
                  Clear All
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 w-full lg:w-[calc(100%-280px)]">
          <div className="py-0.5 px-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
