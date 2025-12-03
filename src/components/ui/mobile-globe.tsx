"use client"

import createGlobe, { COBEOptions } from "cobe"
import { useCallback, useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"

// Detect if device is mobile for performance optimization
const isMobile = () => {
  if (typeof window === "undefined") return false
  return window.innerWidth < 768
}

const GLOBE_CONFIG: COBEOptions = {
  width: 500,
  height: 500,
  onRender: () => {},
  devicePixelRatio: 1,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 3000,
  mapBrightness: 1.2,
  mapBaseBrightness: 0.05,
  baseColor: [1, 1, 1],
  markerColor: [218 / 255, 43 / 255, 52 / 255],
  glowColor: [1, 1, 1],
  markers: [
    // Nepal border outline with multiple markers
    { location: [30.4, 80.2], size: 0.03, color: [218 / 255, 43 / 255, 52 / 255] },
    { location: [29.8, 80.3], size: 0.03, color: [218 / 255, 43 / 255, 52 / 255] },
    { location: [29.2, 80.5], size: 0.03, color: [218 / 255, 43 / 255, 52 / 255] },
    { location: [28.6, 80.6], size: 0.03, color: [218 / 255, 43 / 255, 52 / 255] },
    { location: [28.0, 80.8], size: 0.03, color: [218 / 255, 43 / 255, 52 / 255] },
    { location: [27.4, 81.0], size: 0.03, color: [218 / 255, 43 / 255, 52 / 255] },
    { location: [26.8, 81.2], size: 0.03, color: [218 / 255, 43 / 255, 52 / 255] },
    { location: [26.4, 81.5], size: 0.03, color: [218 / 255, 43 / 255, 52 / 255] },
    { location: [26.4, 82.0], size: 0.03, color: [218 / 255, 43 / 255, 52 / 255] },
    { location: [26.4, 82.5], size: 0.03, color: [218 / 255, 43 / 255, 52 / 255] },
    { location: [26.5, 83.0], size: 0.03, color: [218 / 255, 43 / 255, 52 / 255] },
    { location: [26.6, 83.5], size: 0.03, color: [218 / 255, 43 / 255, 52 / 255] },
    { location: [26.7, 84.0], size: 0.03, color: [218 / 255, 43 / 255, 52 / 255] },
    { location: [26.8, 84.5], size: 0.03, color: [218 / 255, 43 / 255, 52 / 255] },
    { location: [26.9, 85.0], size: 0.03, color: [218 / 255, 43 / 255, 52 / 255] },
    { location: [27.0, 85.5], size: 0.03, color: [218 / 255, 43 / 255, 52 / 255] },
    { location: [27.1, 86.0], size: 0.03, color: [218 / 255, 43 / 255, 52 / 255] },
    { location: [27.2, 86.5], size: 0.03, color: [218 / 255, 43 / 255, 52 / 255] },
    { location: [27.0, 87.0], size: 0.03, color: [218 / 255, 43 / 255, 52 / 255] },
    { location: [26.8, 87.5], size: 0.03, color: [218 / 255, 43 / 255, 52 / 255] },
    { location: [26.6, 88.0], size: 0.03, color: [218 / 255, 43 / 255, 52 / 255] },
    { location: [27.0, 88.1], size: 0.03, color: [218 / 255, 43 / 255, 52 / 255] },
    { location: [27.4, 88.1], size: 0.03, color: [218 / 255, 43 / 255, 52 / 255] },
    { location: [27.8, 88.0], size: 0.03, color: [218 / 255, 43 / 255, 52 / 255] },
    { location: [28.2, 87.8], size: 0.03, color: [218 / 255, 43 / 255, 52 / 255] },
    { location: [28.6, 87.5], size: 0.03, color: [218 / 255, 43 / 255, 52 / 255] },
    { location: [29.0, 87.0], size: 0.03, color: [218 / 255, 43 / 255, 52 / 255] },
    { location: [29.5, 86.5], size: 0.03, color: [218 / 255, 43 / 255, 52 / 255] },
    { location: [30.0, 86.0], size: 0.03, color: [218 / 255, 43 / 255, 52 / 255] },
    { location: [30.2, 85.5], size: 0.03, color: [218 / 255, 43 / 255, 52 / 255] },
    { location: [30.4, 85.0], size: 0.03, color: [218 / 255, 43 / 255, 52 / 255] },
    { location: [30.4, 84.5], size: 0.03, color: [218 / 255, 43 / 255, 52 / 255] },
    { location: [30.3, 84.0], size: 0.03, color: [218 / 255, 43 / 255, 52 / 255] },
    { location: [30.2, 83.5], size: 0.03, color: [218 / 255, 43 / 255, 52 / 255] },
    { location: [30.1, 83.0], size: 0.03, color: [218 / 255, 43 / 255, 52 / 255] },
    { location: [30.2, 82.5], size: 0.03, color: [218 / 255, 43 / 255, 52 / 255] },
    { location: [30.3, 82.0], size: 0.03, color: [218 / 255, 43 / 255, 52 / 255] },
    { location: [30.4, 81.5], size: 0.03, color: [218 / 255, 43 / 255, 52 / 255] },
    { location: [30.4, 81.0], size: 0.03, color: [218 / 255, 43 / 255, 52 / 255] },
    { location: [30.4, 80.7], size: 0.03, color: [218 / 255, 43 / 255, 52 / 255] },
    { location: [28.5, 84.0], size: 0.02, color: [218 / 255, 43 / 255, 52 / 255] },
    { location: [28.0, 84.5], size: 0.02, color: [218 / 255, 43 / 255, 52 / 255] },
    { location: [27.7, 85.3], size: 0.02, color: [218 / 255, 43 / 255, 52 / 255] },
    { location: [29.0, 83.5], size: 0.02, color: [218 / 255, 43 / 255, 52 / 255] },
    { location: [28.5, 82.5], size: 0.02, color: [218 / 255, 43 / 255, 52 / 255] },
    { location: [27.5, 83.5], size: 0.02, color: [218 / 255, 43 / 255, 52 / 255] },
    { location: [28.0, 86.0], size: 0.02, color: [218 / 255, 43 / 255, 52 / 255] },
    { location: [29.5, 84.5], size: 0.02, color: [218 / 255, 43 / 255, 52 / 255] },
  ],
  offset: [0, 0],
}

export function MobileGlobe({
  className,
  config = GLOBE_CONFIG,
}: {
  className?: string
  config?: COBEOptions
}) {
  const phiRef = useRef(0)
  const widthRef = useRef(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerInteracting = useRef<number | null>(null)
  const pointerInteractionMovement = useRef(0)
  const [r, setR] = useState(0)
  const [isMobileDevice, setIsMobileDevice] = useState(false)

  useEffect(() => {
    setIsMobileDevice(isMobile())
  }, [])



  const onRender = useCallback(
    (state: Record<string, number>) => {
      if (!pointerInteracting.current) phiRef.current += 0.002
      state.phi = phiRef.current + r
      state.width = widthRef.current * 2
      state.height = widthRef.current * 2
    },
    [r],
  )

  const onResize = useCallback(() => {
    if (canvasRef.current) {
      widthRef.current = canvasRef.current.offsetWidth
    }
  }, [])

  useEffect(() => {
    window.addEventListener("resize", onResize)
    onResize()

    if (!canvasRef.current || widthRef.current === 0) return

    // Mobile-optimized config
    const mobileConfig = isMobileDevice
      ? {
          ...config,
        devicePixelRatio: 1.9, // Reduced for better performance
        mapSamples: 2000, // Optimized samples for visible rendering
        }
      : config

    const globe = createGlobe(canvasRef.current!, {
      ...mobileConfig,
      width: widthRef.current * 1,
      height: widthRef.current * 1,
      onRender,
    })

    setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.style.opacity = "1"
      }
    }, 100)

    return () => {
      window.removeEventListener("resize", onResize)
      globe.destroy()
    }
  }, [config, onResize, onRender, isMobileDevice])

  return (
    <div
      className={cn(
        "w-full aspect-square max-w-[100vw]  flex justify-center items-center mx-auto  ",
        className,
      )}
    >
      <canvas
        className={cn(
          "size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size] touch-none",
        )}
        ref={canvasRef}
      />
    </div>
  )
}