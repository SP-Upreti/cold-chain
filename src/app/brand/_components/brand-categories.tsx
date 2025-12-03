"use client";

import CategoryCard from "@/components/ui/category-card";
import React from "react";
import { IBrandCategory } from "@/types/IBrand";
import Title from "@/components/home/title";

interface BrandCategoryProps {
  categories: IBrandCategory[];
}

export default function BrandCategory({ categories }: BrandCategoryProps) {
  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col justify-center max-w-[90%] items-center h-full px-4 text-center gap-8 mx-auto py-28 space-y-10">
      
      <Title title="Our Popular Subcategories" />

      <div className="grid grid-cols-2 w-full gap-4 text-left">
        {categories.slice(0, 4).map((category) => (
          <CategoryCard
            key={category.id}
            data={{
              title: category.title,
              slug: category.slug,
              coverImage: category.coverImage || "/products/default.jpg"
            }}
          />
        ))}
      </div>
    </div>
  );
}