import Image from "next/image";
import { Button } from "../ui/button";

export default function CallToAction() {
    return (
        <div className="max-w-7xl mx-auto items-center px-4 xl:px-0 py-10 lg:py-20 mb-20! grid min-h-[60vh]! lg:grid-cols-2">

            <div className="space-y-3 ">
                <p className="text-lg font-semibold">Lead the Way</p>
                <h1 className="text-xl lg:text-3xl font-bold">Join us in our journey to a greener future</h1>
                <p className="text-sm md:text-xl mt-1 lg:mt-6 text-left ">Join thousands of labs worldwide reducing energy, water, and waste through My Green Lab Certification — the world’s most trusted green lab certification.</p>
                <Button className="rounded-full mt-2 lg:mt-6" size={"lg"}>View Careers</Button>
            </div>

            <p className='h-full w-full flex  px-16 relative  items-center h-[50vh]! '>
                <div className="size-70 rounded-full bg-[#1A4D2E] relative overflow-hidden">
                    <Image src="/home/cta.jpg" alt="" width={1000} height={1000} className="w-full h-full object-cover" />
                </div>
                <div className="size-50 absolute  right-[22%] -top-[15%]  -translate-y-5 rounded-full bg-[#1A4D2E]">
                    <div className="h-full w-full relative overflow-hidden rounded-full">
                        <Image src="/home/cta2.jpg" alt="" width={1000} height={1000} className="w-full h-full object-cover  opacity-60" />
                    </div>

                </div>
                <div className="size-50 absolute -bottom-[15%] right-[22%] translate-y-5 rounded-full bg-[#1A4D2E]">
                    <div className="h-full w-full relative overflow-hidden rounded-full">
                        <Image src="/home/cta3.jpg" alt="" width={1000} height={1000} className="w-full h-full object-cover  opacity-60" />
                    </div>
                </div>
            </p>
        </div>
    )
}   