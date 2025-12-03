import React from "react";
import SectionHeader from "../ui/section-header";
import { BRANDS } from "@/data/static-data";
import Image from "next/image";
import Link from "next/link";
import { TransitionLink } from "../shared";

export default function OurAssociates() {
  return (
    <section>
      <SectionHeader
        title="Our Associate Brands"
        desc="We are proud to be associated with the following esteemed organizations."
      />

      <TransitionLink href={'/'} className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
        {BRANDS.map((brand) => (
          <div
            className="border border-zinc-200 rounded-lg flex items-center justify-center aspect-video bg-white dark:bg-zinc-900 dark:border-zinc-800 hover:bg-white cursor-pointer"
            key={brand.name}
          >
            <Image
              src={brand.image}
              alt={brand.name}
              width={150}
              height={75}
              className="object-contain p-4  transition-opacity duration-300"
            />
          </div>
        ))}
      </TransitionLink>
    </section>
  );
}
