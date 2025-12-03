"use client"
import { Icon } from "@iconify/react"
import { Button } from "../ui/button"
import Title from "./title"
import { TransitionLink } from "../shared"

const PROJECTS = [
    {
        title: "Cold Storage Installations",
        imageUrl: "/home/coldstore.jpg",
        link: "/projects/cold-storage"
    },
    {
        title: "HVAC Projects",
        imageUrl: "/home/hvac.jpg",
        link: "/projects/hvac"
    },
    {
        title: "Solar C&I Projects",
        imageUrl: "/home/solar.jpg",
        link: "/projects/solar"
    },

]

export default function ProjectPortfolio() {
    return (
        <section className="max-w-7xl mx-auto px-4 xl:px-0 py-10 lg:py-20 space-y-8">
            <div className="flex justify-between items-center h-fit">
                <div className="w-full max-w-[75%] shrink-0">
                    <Title title="Our Project Portfolio" wrapperClassName="!mx-0 !justify-start" />
                    <p className="text-sm md:text-xl mt-1 w-full lg:mt-3 text-left">
                        Explore our featured completed projects across various industries.
                    </p>
                </div>

                <div className="w-[25%] shrink-0 flex gap-4 justify-end items-center">
                    <Button variant={"ghost"} size={"lg"} className="text-lg font-semibold gap-4">
                        View All Projects
                        <span className="size-8 border rounded-full border-1.8 border-[#1A4D2E] flex justify-center items-center">
                            <Icon icon={"lsicon:arrow-right-outline"} className="size-5" />
                        </span>
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {PROJECTS.map((project, idx) => (
                    <TransitionLink
                        key={idx}
                        href={project.link}
                        className="group relative overflow-hidden rounded-2xl h-[60vh]  w-full"
                    >
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 z-10" />
                        <img
                            src={project.imageUrl}
                            alt={project.title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute bottom-0 left-0 w-full p-6 z-20 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                            <h3 className="text-white text-xl font-bold leading-tight">
                                {project.title}
                            </h3>
                        </div>
                    </TransitionLink>
                ))}
            </div>
        </section>
    )
}
