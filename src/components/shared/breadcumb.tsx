"use client"
import Link from "next/link"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Icon } from "@iconify/react"
import { usePathname } from "next/navigation"
import TransitionLink from "./transition-link"


export function BreadcrumbTab() {
    const pathname = usePathname();
    const pathSegments = pathname.split('/').filter(segment => segment);
  return (
    <div className="w-full  py-1 px-4">
        <Breadcrumb>
      <BreadcrumbList>
      <BreadcrumbPage >
      <TransitionLink href={"/"} className="capitalize text-gray-500 hover:text-primary flex items-center gap-1">Home</TransitionLink>
        </BreadcrumbPage>
        <BreadcrumbSeparator />
        {pathSegments.map((segment, index) => {
          const isLast = index === pathSegments.length - 1;
          const href = '/' + pathSegments.slice(0, index + 1).join('/');
          return (
            <BreadcrumbItem key={index}>
              {isLast ? (
                <BreadcrumbPage className="capitalize ">
                    {segment.replace(/%20/g, ' ')}
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <TransitionLink href={href} className="capitalize hover:text-primary flex items-center gap-1">
                    <Icon icon="solar:chevron-right-bold" className="size-4" />
                    {segment.replace(/%20/g, ' ')}
                    </TransitionLink>
                </BreadcrumbLink>
                )}
                <BreadcrumbSeparator />
            </BreadcrumbItem>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
    </div>
  )
}
