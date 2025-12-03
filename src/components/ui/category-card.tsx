"use client";

import React from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { TransitionLink } from '../shared';

interface CategoryCardProps {
  data: {
    title: string;
    slug: string;
    coverImage: string;
    brand?: {
      name: string;
      logoUrl: string;
    };
  };
}

export default function CategoryCard({ data }: CategoryCardProps) {
  return (
    <TransitionLink href={`/products?category=${encodeURIComponent(data.slug)}`} className="group block">
      <article className="relative h-[250px] sm:h-[300px] border border-zinc-100 rounded-md md:rounded-2xl lg:rounded-3xl overflow-hidden  transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-lg">
        {/* Background Gradient */}
        {/* <div className="absolute inset-0 bg-gradient-to-br from-white to-white opacity-60" /> */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 md:from-black/60 md:via-black/20 to-transparent z-20" />
        
        {/* Image Container */}
        <div className="absolute inset-0 flex items-center justify-center ">
          <div className="relative w-full bg-muted/80 h-full transition-transform duration-700 ease-out group-hover:scale-105">
            <img 
              src={data.coverImage}
              alt={data.title} 
              loading="lazy" 
              className="w-full h-full object-cover "
            />
          </div>
        </div>

        {/* Content Overlay */}
        <div className="absolute z-40 inset-x-0 bottom-0 p-2 sm:px-6 ">
          <div className="transform transition-transform duration-500 ease-out group-hover:translate-y-[-8px]">
            <h3 className="md:text-xl lg:text-xl font-semibold text-white mb- tracking-tight">
              {data.title}
            </h3>
            {data.brand && (
              <p className="text-white/90 text-xs sm:text-base mb-2 flex gap-2 items-center flex-wrap  md:mb-4 font-light">
                <Icon icon={"proicons:tag-multiple"} />
                {data.brand.name}
              </p>
            )}
            {/* <div className="flex items-center gap-2 text-white font-medium">
              <span className="text-sm">Learn more</span>
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </div> */}
          </div>
        </div>

        {/* Shine Effect on Hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
        </div>
      </article>
    </TransitionLink>
  );
}
