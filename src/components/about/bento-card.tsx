"use client"
import React from "react"
import { cn } from "@/lib/utils"
import Title from "../home/title"
import { Lightbulb, Users, Package, Handshake, Award, Headphones } from "lucide-react"

const cardContents = [
  {
    title: "Innovation at Our Core",
    description:
      "We don't just follow tech trends – we set them! With a finger on the pulse of the latest innovations, we bring you solutions that are ahead of the curve and built for tomorrow.",
    icon: Lightbulb,
  },
  {
    title: "Customer-First Mindset",
    description:
      "Your success is our success! We listen, understand, and deliver exactly what you need. From first contact to after-sales support, we're with you every step of the way.",
    icon: Users,
  },
  {
    title: "End-to-End Solutions",
    description:
      "Why settle for pieces when you can have the whole puzzle? From security cameras and networking gear to complete IT infrastructure, we're your one-stop destination for all things tech. Whether you're securing your premises with state-of-the-art CCTV systems, upgrading your network infrastructure, or transforming your entire IT ecosystem, we've got the expertise, the products, and the passion to make it happen seamlessly.",
    icon: Package,
  },  
  {
    title: "Trusted Partnerships",
    description:
      "We collaborate with industry leaders like UNV, UNIARCH, ZIASYS, FORWARD, and DELI to bring you only the best, most reliable technology solutions.",
    icon: Handshake,
  },
  {
    title: "Quality You Can Count On",
    description:
      "No compromises. No shortcuts. Just top-tier products and services that deliver real value and stand the test of time. That's the Plaza Sales promise!",
    icon: Award,
  },
  {
  title: "Support That Never Sleeps",
  description:
    "From setup to troubleshooting, our team stands by you with reliable, round-the-clock assistance. No delays, no confusion—just clear, dedicated support whenever you need it.",
  icon: Headphones, // or choose: LifeBuoy, ShieldCheck, PhoneCall
}

]


export const PlusCard: React.FC<{
  className?: string
  title: string
  description: string
  icon: React.ElementType
}> = ({
  className = "",
  title,
  description,
  icon: Icon,
}) => {
  return (
    <div
      className={cn(
        "relative border border-dashed border-primary dark:border-zinc-700  p-6 bg-white dark:bg-zinc-950 min-h-[200px]",
        "flex flex-col justify-between",
        className
      )}
    >
      <CornerPlusIcons />
      <div className="relative z-10 space-y-4">
        <div className="w-12 h-12 rounded-full flex items-center justify-center">
          <Icon className="size-8 md:size-10 text-primary" />
        </div>
        <h3 className="md:text-xl font-bold text-primary dark:text-gray-100">
          {title}
        </h3>
        <p className="text-gray-700 dark:text-gray-300 md:text-base text-sm">{description}</p>
      </div>
    </div>
  )
}

export const CornerPlusIcons = () => (
  <>
    <PlusIcon className="absolute text-primary z-30 -top-3 -left-3" />
    <PlusIcon className="absolute text-primary z-30 -top-3 -right-3" />
    <PlusIcon className="absolute text-primary z-30 -bottom-3 -left-3" />
    <PlusIcon className="absolute text-primary z-30 -bottom-3 -right-3" />
  </>
)

const PlusIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    strokeWidth="1"
    stroke="currentColor"
    className={`dark:text-white text-black size-6 ${className}`}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
  </svg>
)

export default function BentoCards() {
  return (
    <section className="bg-white max-w-7xl mx-auto py-12 md:py-20 dark:bg-black dark:border-gray-800">

      <div className="max-w-5xl md:text-center mx-auto px-4 ">
          <h2 className="  text-black dark:text-white mb-4">
          <Title wrapperClassName="!mb-1 !mx-0 text-center w-full" className=" text-black dark:text-white !pb-0" title="Your Growth Partner" />
          </h2>
        <p className="text-gray-600 text-sm md:text-xl dark:text-gray-400 ">
            We&apos;re not just a tech company – we&apos;re your growth partners - With a focus on innovation 
          </p>
        </div>

      <div className="mx-auto mt-6  md:mt-12 container  border-gray-200 dark:border-gray-800 md:py-12 border-t-0 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 auto-rows-auto gap-4">
          <PlusCard {...cardContents[0]} className="lg:col-span-3 lg:row-span-2" />
          <PlusCard {...cardContents[1]} className="lg:col-span-2 lg:row-span-2" />
          <PlusCard {...cardContents[2]} className="lg:col-span-4 lg:row-span-1" />
          <PlusCard {...cardContents[3]} className="lg:col-span-2 lg:row-span-1" />
          <PlusCard {...cardContents[4]} className="lg:col-span-3 lg:row-span-1" />
          <PlusCard {...cardContents[5]} className="lg:col-span-3 lg:row-span-1" />
        </div>

        
      </div>
    </section>
  )
}
