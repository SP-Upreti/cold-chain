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
import { NextButton, PrevButton, usePrevNextButtons } from "@/components/home/embla-carousel/embla-buttons";

const TWEEN_FACTOR_BASE = 0.2;

type PropType = {
  slides: string[];
  options?: EmblaOptionsType;
};

const BrandSlider: React.FC<PropType> = ({ slides, options }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({
      delay: 3000,
    }),
  ]);
  const tweenFactor = useRef(0);
  const tweenNodes = useRef<HTMLElement[]>([]);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

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
    <div className="embla h-30 sm:h-[40vh] lg:h-[50vh] xl:h-[70dvh] overflow-hidden mx-auto">
      {/* Viewport */}
      <div className="overflow-hidden  relative" ref={emblaRef}>
        <div className="flex relative touch-pan-y  w-full ">
          {slides.map((index) => (
            <div
              key={index}
              className="flex-[0_0_100%] w-full  min-w-0 transform-gpu"
            >
              <div className=" pb-4  overflow-hidden">
                <div className="embla__parallax__layer  relative  flex justify-center">
                  <Image
                    src={index}
                    alt="Slide image"
                    height={1000}
                    width={1500}
                    className=" flex-[0_0_calc(115%+2rem)] object-cover "
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute inset-0 pointer-events-none h-27 lg:h-[70dvh] flex justify-between items-center">
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
        <div className="absolute inset-0 flex justify-center items-end pb-4 h-27 lg:h-[70dvh]  pointer-events-none">
          <div className="grid grid-cols-[auto_1fr] justify-between gap-5 mt-6">
            {/* Dots */}
            <div className="flex flex-wrap pointer-events-auto justify-end items-center mr-[-0.6rem]">
              {scrollSnaps.map((_, index) => (
                <DotButton
                  key={index}
                  onClick={() => onDotButtonClick(index)}
                  className={`!size-2 sm:size-4 border-0 outline-0 flex items-center justify-center rounded-full after:content-[''] after:w-[0.9rem] after:h-[0.9rem]  ${
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

export default BrandSlider;
