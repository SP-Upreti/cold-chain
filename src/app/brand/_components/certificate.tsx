import React from "react";
import Image from "next/image";
import { IBrand } from "@/types/IProduct";
import Title from "@/components/home/title";

export default function Certificate({ url }: { url: string }) {
  if (!url) return null;
  return (
    <div className="flex flex-col bg-muted/60 overflow-hidden  py-8 md:py-12 lg:py-20">
      <div className="container mx-auto px-4 max-w-7xl">
        
        <Title title="Authorized Certificate" />
        <p className="text-muted-foreground mb-4 md:mb-12  lg:text-center text-sm mt-1 sm:text-lg max-w-3xl lg:mx-auto">
          Certificate of Authorized brand distributor for genuine products
        </p>

        <div className="  mb-10 ">
          <Image
            src={url}
          alt="Certificate of Authorization"
          height={1500}
          width={1500}
          className="mx-auto rounded-2xl border  "
          draggable={false}
        />
        </div>
      </div>
    </div>
  );
}
