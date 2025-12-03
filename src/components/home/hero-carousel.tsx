import React from "react";
import EmblaCarousel from "./embla-carousel/carousel";

const SlideData = [
  {
    title: "Highly comfortable and durable office Earbuds",
    description: "Discover cutting-edge technology designed to streamline your business operations and enhance productivity.",
    url: "/banners/home1.png",
  },
  {
    title: "Modern Wireless Keyboard for Ultimate Sound Experience",
    description: "Experience the perfect blend of style and functionality with our latest wireless keyboard.",
    url: "/banners/home2.png",
  },
]

export default function HeroCarousel() {
  return (
    <section>
      <EmblaCarousel options={{ loop: true }} slides={SlideData} />
    </section>
  );
}
