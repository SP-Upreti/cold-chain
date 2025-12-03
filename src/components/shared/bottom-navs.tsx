"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import TransitionLink from "./transition-link";

export default function ButtonNavs() {
    const pathname = usePathname();

    const navItems = [
        {
            href: "/",
            title: "Home",
            ariaLabel: "Go to Home page",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} className="size-6" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}><path d="m12.892 2.81l8.596 6.785A1.347 1.347 0 0 1 20.653 12H20v3.5c0 2.828 0 4.243-.879 5.121c-.878.879-2.293.879-5.121.879h-4c-2.828 0-4.243 0-5.121-.879C4 19.743 4 18.328 4 15.5V12h-.653a1.347 1.347 0 0 1-.835-2.405l8.596-6.785a1.44 1.44 0 0 1 1.784 0"></path><path d="M14.5 21.5V17c0-.935 0-1.402-.201-1.75a1.5 1.5 0 0 0-.549-.549c-.348-.201-.815-.201-1.75-.201s-1.402 0-1.75.201a1.5 1.5 0 0 0-.549.549c-.201.348-.201.815-.201 1.75v4.5"></path></g></svg>
            )
        },
        {
            href: "/brand",
            title: "Brands",
            ariaLabel: "Go to Brands page",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} className="size-6" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2}><path d="M11.5 21H8.574a3 3 0 0 1-2.965-2.544l-1.255-8.152A2 2 0 0 1 6.331 8H17.67a2 2 0 0 1 1.977 2.304l-.117.761"></path><path d="M9 11V6a3 3 0 0 1 6 0v5m0 7a3 3 0 1 0 6 0a3 3 0 1 0-6 0m5.2 2.2L22 22"></path></g></svg>
            )
        },
        {
            href: "/products",
            title: "Products",
            ariaLabel: "Go to Products page",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} className="size-6" viewBox="0 0 24 24"><g fill="none"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m18.828 9.629l-5.48-5.492a3.02 3.02 0 0 0-2.196-.886l-4.324.086a2.52 2.52 0 0 0-2.467 2.472l-.086 4.334a3.03 3.03 0 0 0 .884 2.2l5.48 5.493a3.016 3.016 0 0 0 4.273 0l3.916-3.925a3.03 3.03 0 0 0 0-4.282"></path><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m4.25 15.714l4.254 4.262a6.03 6.03 0 0 0 8.544 0l3.202-3.209"></path><path fill="currentColor" d="M7.967 5.798a1.15 1.15 0 1 1 .002 2.298a1.15 1.15 0 0 1-.002-2.298"></path></g></svg>
            )
        },
        {
            href: "/contact",
            title: "Contact",
            ariaLabel: "Go to Contact page",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width={256} height={256} className="size-6" viewBox="0 0 256 256"><path fill="currentColor" d="M225.88 30.12a13.83 13.83 0 0 0-13.7-3.58h-.11L20.14 84.77A14 14 0 0 0 18 110.85l85.56 41.64L145.12 238a13.87 13.87 0 0 0 12.61 8c.4 0 .81 0 1.21-.05a13.9 13.9 0 0 0 12.29-10.09l58.2-191.93v-.11a13.83 13.83 0 0 0-3.55-13.7m-8 10.4l-58.15 191.91v.11a2 2 0 0 1-3.76.26l-40.68-83.58l49-49a6 6 0 1 0-8.49-8.49l-49 49L23.15 100a2 2 0 0 1 .31-3.74h.11l191.91-58.18a1.94 1.94 0 0 1 1.92.52a2 2 0 0 1 .52 1.92Z" strokeWidth={2}></path></svg>
            )
        }
    ];

    return (
        <div className="lg:hidden bottom-0 shadow-2xl z-50 fixed w-full -translate-x-1/2 bg-neutral-primary-soft bg-background border-t border-default left-1/2">
            <div className="grid h-full max-w-7xl grid-cols-4 mx-auto">
                {navItems.map((item) => {
                    const isActive = item.title.toLowerCase() === "home" ? pathname === "/" : pathname.startsWith(item.href);
                    return (
                        <TransitionLink
                            key={item.href}
                            href={item.href}
                            title={item.title}
                            aria-label={item.ariaLabel}
                            className={cn(
                                "inline-flex items-center  justify-center whitespace-nowrap  text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-11 px-4 py-4",
                                isActive && "bg-primary/5 text-primary border-t-2 border-primary",
                            )}
                        >
                            {item.icon}
                        </TransitionLink>
                    );
                })}
            </div>
        </div>
    );
}