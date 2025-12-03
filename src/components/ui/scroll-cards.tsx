"use client";
import { FC } from "react";

import Image from "next/image";
import { IBrandCategory } from "@/types/IBrand";
import { Button } from "./button";

// Types
interface iCardItem {
    title: string;
    description: string;
    tag: string;
    src: string;
    link: string;
    // color: string;
    // textColor: string;
}

interface iCardProps extends Omit<iCardItem, "src" | "link" | "tag"> {
    i: number;
    src: string;
}

// Constants
const TOP_VALUES: Record<number, string> = {
    1: "1/2",
    2: "1/2",
    3: "1/2",
    4: "1/2",
};

// Components
const Card: FC<iCardProps> = ({
    title,
    description,
    i,
    src,
}) => {
    return (
        <div className="h-screen flex items-center justify-center sticky top-0 md:p-0 px-4">
            <div key={i} className={`h-[95dvh] w-full relative   ${i % 2 == 0 ? "bg-white" : "bg-primary text-white"}`}>
                <Image src={src || '/banners/banner4.png'} fill alt={title} className='object-contain object-bottom ' />
                <div className="absolute inset-0 z-10 flex flex-col p-18 items-center">
                    <h2 className='text-4xl font-bold max-w-3xl mx-auto text-center'>{title}</h2>
                    {/* <p className='text-2xl max-w-4xl line-clamp-2 text-center'>{data?.description}</p> */}
                    <div className="flex gap-5 mt-8 items-center">
                        <Button className={`rounded-full text-xl font-medium px-6 py-6 border ${i % 2 === 0 ? "" : " border-white"}`}>Learn More</Button>
                        <Button variant='outline' className={`rounded-full text-xl font-medium px-6 py-6 bg-transparent border-primary text-primary ${i % 2 == 0 ? "" : "bg-white"}`}>Contact Us</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

/**
 * CardSlide component displays a series of cards in a vertical scroll layout
 * Each card contains a title, description, and decorative elements
 */
interface iCardSlideProps {
    items: IBrandCategory[];
}

const CardsParallax: FC<iCardSlideProps> = ({ items }) => {
    return (
        <div className="min-h-screen">
            {items?.map((project, i) => {
                return <Card  src={project.coverImage as string} description="lorem" title={project.title as string} key={`p_${i}`} i={i} />;
            })}
        </div>
    );
};

export { CardsParallax, type iCardItem };
