"use client";
import React, { useCallback, useEffect, useRef } from "react";
import {
  EmblaCarouselType,
  EmblaEventType,
  EmblaOptionsType,
} from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { DotButton, useDotButton } from "@/components/home/embla-carousel/embla-dots";

const TWEEN_FACTOR_BASE = 0.2;

type PropType = {
  slides: { id: number; title: string; image: string, description: string, content: string }[];
  options?: EmblaOptionsType;
};

const BlogsSliders: React.FC<PropType> = ({ slides, options }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({
      delay: 3000,
    }),
  ]);
  const tweenFactor = useRef(0);
  const tweenNodes = useRef<HTMLElement[]>([]);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const setTweenNodes = useCallback((emblaApi: EmblaCarouselType): void => {
    tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
      return slideNode.querySelector(".embla__parallax__layer") as HTMLElement;
    });
  }, []);

  const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
  }, []);

  const tweenParallax = useCallback(
    (emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
      const engine = emblaApi.internalEngine();
      const scrollProgress = emblaApi.scrollProgress();
      const slidesInView = emblaApi.slidesInView();
      const isScrollEvent = eventName === "scroll";

      emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
        let diffToTarget = scrollSnap - scrollProgress;
        const slidesInSnap = engine.slideRegistry[snapIndex];

        slidesInSnap.forEach((slideIndex) => {
          if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

          if (engine.options.loop) {
            engine.slideLooper.loopPoints.forEach((loopItem) => {
              const target = loopItem.target();
              if (slideIndex === loopItem.index && target !== 0) {
                const sign = Math.sign(target);
                if (sign === -1)
                  diffToTarget = scrollSnap - (1 + scrollProgress);
                if (sign === 1)
                  diffToTarget = scrollSnap + (1 - scrollProgress);
              }
            });
          }

          const translate = diffToTarget * (-1 * tweenFactor.current) * 100;
          const tweenNode = tweenNodes.current[slideIndex];
          tweenNode.style.transform = `translateX(${translate}%)`;
        });
      });
    },
    []
  );

  useEffect(() => {
    if (!emblaApi) return;
    setTweenNodes(emblaApi);
    setTweenFactor(emblaApi);
    tweenParallax(emblaApi);

    emblaApi
      .on("reInit", setTweenNodes)
      .on("reInit", setTweenFactor)
      .on("reInit", tweenParallax)
      .on("scroll", tweenParallax)
      .on("slideFocus", tweenParallax);
  }, [emblaApi, tweenParallax]);

  return (
    <div className="embla h-[65dvh] overflow-hidden mx-auto mt-2 rounded-2xl">
      {/* Viewport */}
      <div className="overflow-hidden  relative" ref={emblaRef}>
        <div className="flex relative touch-pan-y  w-full ">
          {slides.map((index, idx) => (
            <div
              key={idx}
              className="flex-[0_0_100%] w-full  min-w-0 transform-gpu"
            >
              <div className=" pb-4  overflow-hidden">
                <div className="embla__parallax__layer  relative h-[65dvh]  flex justify-center">
                    <div className="absolute inset-0 flex items-end p-6 ">
                      <div className="flex justify-between w-full">
                       <div className="max-w-xl">
                         <h2 className="text-white text-3xl font-semibold">{index.title}</h2>
                         <p className="text-white line-clamp-2 mt-4">{index.content}</p>
                       </div>
                       <div className="max-w-xl">
                        <div className="flex gap-3 items-center">
                            <div className="size-10 relative rounded-full overflow-hidden">
                                <Image src={index.image} alt={index.title} layout="fill" className="object-cover rounded-sm" />
                            </div>
                            <h2 className="text-white text-xl font-medium">Plaza Sales</h2>
                        </div>
                            <p className="text-white mt-2 font-bold">Jan 12, 2024 ● 10 min read</p>
                       </div>
                      </div>
                    </div>
                  <Image
                    src={index.image}
                    alt="Slide image"
                    height={1000}
                    width={1500}
                    className=" flex-[0_0_calc(115%+2rem)] object-cover rounded-md"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="absolute inset-0 flex justify-center items-end pb-4 h-[65dvh]  pointer-events-none">
          <div className="grid grid-cols-[auto_1fr] justify-between gap-5 mt-6">
            {/* Dots */}
            <div className="flex flex-wrap pointer-events-auto justify-end items-center mr-[-0.6rem]">
              {scrollSnaps.map((_, index) => (
                <DotButton
                  key={index}
                  onClick={() => onDotButtonClick(index)}
                  className={`size-4 border-0 outline-0 flex items-center justify-center rounded-full after:content-[''] after:w-[0.9rem] after:h-[0.9rem]  ${
                    index === selectedIndex ? "bg-red-500 " : "bg-white"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
    </div>
  );
};

export default BlogsSliders;
