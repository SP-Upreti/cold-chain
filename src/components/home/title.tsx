"use client"

import { useRef } from "react"
import { useTheme } from "next-themes"
import TextCursorProximity from "@/components/ui/text-cursor-proximity"
import { ClassNameValue } from "tailwind-merge"


export default function Title({ title, className, wrapperClassName }: { title: string, className?: ClassNameValue, wrapperClassName?: ClassNameValue }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  return (
    <>

      <div
        className={`max-w-4xl  block mx-auto text-left  ${wrapperClassName}`}
        ref={containerRef}
      >
        <h2
          className={`text-2xl lg:text-4xl font-bold ${className}`}
        >
          {title || "title"}
        </h2>
      </div>

    </>
  )
}

