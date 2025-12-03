"use client"
import { HoverSlider, HoverSliderImage, HoverSliderImageWrap, TextStaggerHover } from "./animated-slideshow"
import Title from "./title"
import { TransitionLink } from "../shared"
import { useBrandStore } from "@/store/useBrandStore"
import { useEffect } from "react"
import { Button } from "../ui/button"
import { Icon } from "@iconify/react"
import LatestProducts from "./latest-products"


const SLIDES = [
    {
        id: "slide-1",
        title: "Deli",
        slug: "deli",
        imageUrl:
            "https://images.unsplash.com/photo-1654618977232-a6c6dea9d1e8?q=80&w=2486&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: "slide-2",
        title: "UNV",
        slug: "unv",
        imageUrl:
            "https://images.unsplash.com/photo-1624996752380-8ec242e0f85d?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: "slide-6",
        title: "Uniarch",
        slug: "uniarch",
        imageUrl:
            "https://images.unsplash.com/photo-1688733720228-4f7a18681c4f?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: "slide-3",
        title: "Ziasys",
        slug: "ziasys",
        imageUrl:
            "https://images.unsplash.com/photo-1574717025058-2f8737d2e2b7?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: "slide-4",
        title: "Forward",
        slug: "forward",
        imageUrl:
            "https://images.unsplash.com/photo-1726066012698-bb7a3abce786?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
]

export default function HoverSliderDemo() {

    const { isLoading, brands, fetchBrands } = useBrandStore();

    useEffect(() => {
        if (brands.length === 0) {
            fetchBrands();
        }
    }, [brands.length, fetchBrands]);

    return (
        <div className="max-w-7xl mx-auto px-4 xl:px-0 py-10 lg:py-20 space-y-8 grid min-h-[60vh]!">
            <div className="flex justify-between items-center h-fit">
                <div className="w-full max-w-[75%] shrink-0">
                    <h2 className="text-2xl lg:text-4xl font-bold flex gap-2">The latest from Cold Chains <Icon icon={"bi:r-circle"} className="size-6" /></h2>
                    <p className="text-sm md:text-xl mt-1 w-full  lg:mt-3 text-left ">Keep up with insights, program updates, event announcements, and news from the global sustainable science movement.</p>
                </div>

                <div className="w-[25%] shrink-0 flex gap-4 justify-end items-center">
                    <Button variant={"ghost"} size={"lg"} className="text-lg font-semibold gap-4">View All  <span className="size-8 border rounded-full border-1.8 border-[#1A4D2E] flex justify-center items-center"><Icon icon={"lsicon:arrow-right-outline"} className="size-5" /></span></Button>
                </div>
            </div>
            <LatestProducts />
        </div>
    )
}