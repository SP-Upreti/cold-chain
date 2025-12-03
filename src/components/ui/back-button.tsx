"use client"
import { Icon } from "@iconify/react";
import { Button } from "./button";
import { useRouter } from "next/navigation";

export default function BackButton({ text }: { text?: string }) {
    const router = useRouter();
    return (
        <div className="flex max-w-7xl mx-auto px-4 xl:px-0 ">
            <Button variant={"ghost"} className='flex gap-2 px-0! mx-0! items-center text-xl hover:text-primary' onClick={() => router.back()}><Icon icon="proicons:chevron-left" className="size-6" /> {text || "Back"}</Button>
        </div>
    )
}