"use client";

import React, { useEffect, useState } from "react";
import CategoryCard from "../ui/category-card";
import Title from "./title";
import { getAllCategories } from "@/services/categoryService";
import { ICategory } from "@/types/ICategory";

export default function ProductCategory() {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await getAllCategories({ page: 1, limit: 10 });
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section className="relative py-8 md:py-12 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-left md:text-center mb-6 md:mb-16">
          <Title title="Explore Categories" />
          <p className='text-sm md:text-lg mt-1 lg:mt-3'>Discover innovative technology designed for your lifestyle</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {[...Array(4)].map((_, idx) => (
              <div key={idx} className="h-[250px] sm:h-[300px] md:h-[400px] rounded-md md:rounded-2xl lg:rounded-3xl bg-gray-200 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {categories.slice(0, 4).map((item) => (
              <CategoryCard key={item.id} data={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}