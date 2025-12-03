"use client"
import { TransitionLink } from "@/components/shared";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
    const router = useRouter();
    const handleBack = () => {
        router.back();
    }
    return (
        <main>
            <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-start h-[90dvh] md:px-8">
                <div className="max-w-xl mx-auto space-y-3 text-center">
                    <h3 className="text-primary font-semibold">
                        404 Error
                    </h3>
                    <p className="text-gray-800 uppercase text-4xl font-semibold sm:text-5xl">
                        Page not found
                    </p>
                    <p className="text-gray-600">
                        Sorry, the page you are looking for could not be found or has been removed.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3">
                        <TransitionLink onClick={handleBack} href="#" className="block py-2 px-6 bg-primary/80 hover:bg-primary text-white rounded-sm">
                            Go back
                        </TransitionLink>
                        <TransitionLink href="/contact" className="block py-2 px-6 border border-primary text-primary hover:bg-primary hover:text-white rounded-sm">
                            Need Help
                        </TransitionLink>
                    </div>
                </div>
            </div>
        </main>
    )
}