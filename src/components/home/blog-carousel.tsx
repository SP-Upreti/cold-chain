"use client";
import React from "react";
import {
    EmblaOptionsType,
} from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { NextButton, PrevButton, usePrevNextButtons } from "./embla-carousel/embla-buttons";
import { DotButton, useDotButton } from "./embla-carousel/embla-dots";
import Image from "next/image";
import { IBlog } from "@/types/IBlog";
import { TransitionLink } from "../shared";

type PropType = {
    slides: IBlog[];
    options?: EmblaOptionsType;
};

const BlogsCarousel: React.FC<PropType> = ({ slides, options }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel(options, [
        Autoplay({
            delay: 3000,
        }),
    ]);

    const { selectedIndex, scrollSnaps, onDotButtonClick } =
        useDotButton(emblaApi);
    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick,
    } = usePrevNextButtons(emblaApi);

    return (
        <div className="embla  overflow-hidden mx-auto ">
            {/* Viewport */}
            <div className="overflow-hidden  relative" ref={emblaRef}>
                <div className="flex relative touch-pan-y  w-full ">
                    {slides.map((data, index) => (
                        <div
                            key={index}
                            className="flex-[0_0_90%]  w-full pl-2 -translate-x-1.5 min-w-0 transform-gpu"
                        >
                            <div className=" pb-4   overflow-hidden">

                               <TransitionLink href={`/blogs/${data.slug}`}>
                                <div className="flex flex-col ">
                                    <div className="h-[30dvh] rounded-md overflow-hidden bg-black relative">
                                        <Image
                                            src={data?.coverImage || '/placeholder-image.png'}
                                            alt="Slide image"
                                            fill
                                            className="  object-cover "
                                        />
                                    </div>
                                    <div className=" py-2">
                                            <h2 className="font-semibold md:text-lg line-clamp-2">{data.title}</h2>
                                        <TransitionLink href={`/blogs/${data.slug}`}>
                                            <button className='mt-1 md:mt-4 group-hover:text-primary font-medium text-lg flex gap-2 items-center text-primary lg:text-zinc-800 transition-colors'>
                                            Read <span className="inline-block group-hover:rotate-45 transition-transform duration-300">↗</span>
                                        </button>
                                        </TransitionLink>
                                    </div>
                                </div>
                                 </TransitionLink>
                            </div>
                        </div>
                    ))}
                </div>
                <div className=" pointer-events-none  flex justify-end mt-2 gap-3 items-center">
                    <div className="pointer-events-auto">
                        <PrevButton
                            onClick={onPrevButtonClick}
                            disabled={prevBtnDisabled}
                        />
                    </div>
                    <div className="pointer-events-auto">
                        <NextButton
                            onClick={onNextButtonClick}
                            disabled={nextBtnDisabled}
                        />
                    </div>
                </div>

            </div>

            {/* Controls */}
        </div>
    );
};

export default BlogsCarousel;
