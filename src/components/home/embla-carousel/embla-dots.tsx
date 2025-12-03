'use client'
import React, {
    ComponentPropsWithRef,
    useCallback,
    useEffect,
    useState
} from 'react'
import { EmblaCarouselType } from 'embla-carousel'

type UseDotButtonType = {
    selectedIndex: number
    scrollSnaps: number[]
    onDotButtonClick: (index: number) => void
}

export const useDotButton = (
    emblaApi: EmblaCarouselType | undefined,
    onButtonClick?: (emblaApi: EmblaCarouselType) => void
): UseDotButtonType => {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

    const onDotButtonClick = useCallback(
        (index: number) => {
            if (!emblaApi) return
            emblaApi.scrollTo(index)
            if (onButtonClick) onButtonClick(emblaApi)
        },
        [emblaApi, onButtonClick]
    )

    const onInit = useCallback((emblaApi: EmblaCarouselType) => {
        setScrollSnaps(emblaApi.scrollSnapList())
    }, [])

    const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
        setSelectedIndex(emblaApi.selectedScrollSnap())
    }, [])

    useEffect(() => {
        if (!emblaApi) return
        onInit(emblaApi)
        onSelect(emblaApi)
        emblaApi.on('reInit', onInit).on('reInit', onSelect).on('select', onSelect)
    }, [emblaApi, onInit, onSelect])

    return {
        selectedIndex,
        scrollSnaps,
        onDotButtonClick
    }
}

type PropType = ComponentPropsWithRef<'button'>

/**
 * Tailwind version of DotButton
 */
export const DotButton: React.FC<PropType> = ({ className = '', ...rest }) => {
    return (
        <button
            type="button"
            className={`relative mx-1 size-3 flex items-center justify-center rounded-full
        transition-all duration-300 
        hover:scale-110 focus:outline-none
        ${className}`}
            {...rest}
        >
            <span
                className="absolute inset-0 rounded-full "
                aria-hidden="true"
            />
            <span
                className="absolute w-2 h-2  rounded-full opacity-0 transition-opacity duration-300
        group-[.embla__dot--selected]:opacity-100 group-[.embla__dot--selected]:bg-primary"
            />
        </button>
    )
}
