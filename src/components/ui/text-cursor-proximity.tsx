"use client"

import React, { CSSProperties, forwardRef, useRef } from "react"
import { useAnimationFrame } from "framer-motion"
import { useMousePositionRef } from "@/hooks/use-mouse-position"

// Helper type that makes all properties of CSSProperties accept number | string
type CSSPropertiesWithValues = {
  [K in keyof CSSProperties]: string | number
}

interface StyleValue<T extends keyof CSSPropertiesWithValues> {
  from: CSSPropertiesWithValues[T]
  to: CSSPropertiesWithValues[T]
}

interface TextProps extends React.HTMLAttributes<HTMLSpanElement> {
  label: string
  styles: Partial<{
    [K in keyof CSSPropertiesWithValues]: StyleValue<K>
  }>
  containerRef: React.RefObject<HTMLDivElement>
  radius?: number
  falloff?: "linear" | "exponential" | "gaussian"
}

// Helper component for individual letters - simplified to avoid Rules of Hooks violation
interface LetterProps {
  letter: string
  proximityValue: number
  styles: Partial<{
    [K in keyof CSSPropertiesWithValues]: StyleValue<K>
  }>
  letterRef: (el: HTMLSpanElement | null) => void
  index: number
}

const AnimatedLetter = React.memo(({ letter, proximityValue, styles, letterRef, index }: LetterProps) => {
  // Calculate interpolated styles based on proximity value
  const interpolatedStyles = React.useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: Record<string, any> = {}
    
    Object.entries(styles).forEach(([key, value]) => {
      if (value && typeof value.from === 'number' && typeof value.to === 'number') {
        // Linear interpolation for numbers
        result[key] = value.from + (value.to - value.from) * proximityValue
      } else {
        // For non-numeric values, just use from/to based on threshold
        result[key] = proximityValue > 0.5 ? value.to : value.from
      }
    })
    
    return result
  }, [proximityValue, styles])

  return (
    <span
      key={index}
      ref={letterRef}
      className="inline-block transition-all duration-150"
      aria-hidden="true"
      style={interpolatedStyles}
    >
      {letter}
    </span>
  )
})

AnimatedLetter.displayName = "AnimatedLetter"

const TextCursorProximity = forwardRef<HTMLSpanElement, TextProps>(
  (
    {
      label,
      styles,
      containerRef,
      radius = 50,
      falloff = "linear",
      className,
      onClick,
      ...props
    },
    ref
  ) => {
    const letterRefs = useRef<(HTMLSpanElement | null)[]>([])
    const mousePositionRef = useMousePositionRef(containerRef)
    const letterCount = label.replace(/\s/g, "").length
    
    // Create a motion value for each letter's proximity - initialized once
    if (letterRefs.current.length !== letterCount) {
      letterRefs.current = Array(letterCount).fill(null)
    }

    // Track proximity values as simple numbers for rendering
    const [proximityValues, setProximityValues] = React.useState<number[]>(
      Array(letterCount).fill(0)
    )
    
    // Update array size if letter count changes
    React.useEffect(() => {
      setProximityValues(Array(letterCount).fill(0))
    }, [letterCount])

    const calculateDistance = (
      x1: number,
      y1: number,
      x2: number,
      y2: number
    ): number => {
      return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
    }

    const calculateFalloff = (distance: number): number => {
      const normalizedDistance = Math.min(Math.max(1 - distance / radius, 0), 1)

      switch (falloff) {
        case "exponential":
          return Math.pow(normalizedDistance, 2)
        case "gaussian":
          return Math.exp(-Math.pow(distance / (radius / 2), 2) / 2)
        case "linear":
        default:
          return normalizedDistance
      }
    }

    useAnimationFrame(() => {
      if (!containerRef.current) return
      const containerRect = containerRef.current.getBoundingClientRect()

      const newProximities: number[] = []
      let hasChanged = false

      letterRefs.current.forEach((letterRef, index) => {
        if (!letterRef) {
          newProximities.push(0)
          return
        }

        const rect = letterRef.getBoundingClientRect()
        const letterCenterX = rect.left + rect.width / 2 - containerRect.left
        const letterCenterY = rect.top + rect.height / 2 - containerRect.top

        const distance = calculateDistance(
          mousePositionRef.current.x,
          mousePositionRef.current.y,
          letterCenterX,
          letterCenterY
        )

        const proximity = calculateFalloff(distance)
        newProximities.push(proximity)
        
        if (Math.abs(proximity - (proximityValues[index] || 0)) > 0.001) {
          hasChanged = true
        }
      })

      if (hasChanged) {
        setProximityValues(newProximities)
      }
    })

    const words = label.split(" ")
    let letterIndex = 0

    return (
      <span
        ref={ref}
        className={`${className} inline`}
        onClick={onClick}
        {...props}
      >
        {words.map((word, wordIndex) => (
          <span key={wordIndex} className="inline-block whitespace-nowrap">
            {word.split("").map((letter) => {
              const currentLetterIndex = letterIndex++
              return (
                <AnimatedLetter
                  key={currentLetterIndex}
                  letter={letter}
                  proximityValue={proximityValues[currentLetterIndex] || 0}
                  styles={styles}
                  letterRef={(el: HTMLSpanElement | null) => {
                    letterRefs.current[currentLetterIndex] = el
                  }}
                  index={currentLetterIndex}
                />
              )
            })}
            {wordIndex < words.length - 1 && (
              <span className="inline-block">&nbsp;</span>
            )}
          </span>
        ))}
        <span className="sr-only">{label}</span>
      </span>
    )
  }
)

TextCursorProximity.displayName = "TextCursorProximity"
export default TextCursorProximity
