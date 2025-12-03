"use client";

import React from "react";
import Title from "./title";
import { Icon } from "@iconify/react";
import { TransitionLink } from "../shared";

const products = [
    {
        id: 1,
        title: "Kingspan Jindal Panels",
        category: "Building Solutions",
        description: "High-performance insulated panels for cold storage and industrial applications.",
        icon: "mdi:wall",
        color: "bg-blue-50 dark:bg-blue-900/20",
        textColor: "text-blue-600 dark:text-blue-400",
        href: "/products?category=building-solutions", // Assuming slug
    },
    {
        id: 2,
        title: "Bitzer Compressors",
        category: "HVAC Solutions",
        description: "Efficient and reliable compressors for refrigeration and air conditioning systems.",
        icon: "mdi:air-conditioner",
        color: "bg-green-50 dark:bg-green-900/20",
        textColor: "text-green-600 dark:text-green-400",
        href: "/products?category=hvac-solutions",
    },
    {
        id: 3,
        title: "Solar Solutions",
        category: "Energy Sector",
        description: "Comprehensive on-grid and off-grid solar systems for commercial and industrial use.",
        icon: "mdi:solar-power",
        color: "bg-yellow-50 dark:bg-yellow-900/20",
        textColor: "text-yellow-600 dark:text-yellow-400",
        href: "/products?category=energy-sector",
    },
];

export default function LatestProducts() {
    return (
        <section className="">

            <div className="grid grid-cols-1 text-[#1A4D2E] md:grid-cols-3 gap-6 lg:gap-8">
                {products.map((product) => (
                    <TransitionLink
                        key={product.id}
                        href={product.href}
                        className="group relative bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                    >
                        <div className={`absolute top-0 transition-all duration-300 right-0 w-32 h-32 bg-[#9FE574] rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-1200`} />

                        <div className="relative z-10">
                            <div className={`w-12 h-12 rounded-sm bg-primary/10 group-hover:bg-white flex items-center justify-center mb-6  group-hover:scale-110 transition-transform duration-300`}>
                                <Icon icon={product.icon} width="24" height="24" />
                            </div>

                            <div className="mb-4">
                                <span className={`text-xs font-semibold  tracking-wider uppercase  mb-2 block`}>
                                    {product.category}
                                </span>
                                <h3 className="text-xl font-bold   transition-colors">
                                    {product.title}
                                </h3>
                            </div>

                            <p className="  text-sm leading-relaxed mb-6">
                                {product.description}
                            </p>

                            <div className="flex items-center text-sm font-medium group-hover:translate-x-2  transition-transform duration-300">
                                View Details
                                <Icon icon="heroicons:arrow-right" className="ml-2 w-4 h-4" />
                            </div>
                        </div>
                    </TransitionLink>
                ))}
            </div>
        </section>
    );
}
