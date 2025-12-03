"use client"

import { IGalleryItem } from "@/types/IProductBySlug"
import Image from "next/image"

type ThumbProps = {
  index: IGalleryItem
  selected: boolean
  onClick: () => void
}

export const Thumb: React.FC<ThumbProps> = ({ index, selected, onClick }) => (
  <button
    onClick={onClick}
    className={`flex-[0_0_22%] sm:flex-[0_0_15%] min-w-0 pl-2 sm:pl-3`}
  >
    <div className={`rounded-sm border-[2px] bg-white h-20 flex items-center justify-center text-2xl font-semibold  transition-colors duration-200 ${selected ? "border-primary  text-white" : ""}`}>
      { index?.mediaAsset[0]?.type === "IMAGE" ? (
          <Image src={index.mediaAsset[0].fileUrl} alt={`Thumbnail Image ${index.id}`} width={100} height={80} className="object-contain h-full w-full rounded-sm" />
        ) : (
          <video
            src={index.mediaAsset[0].fileUrl}
            className="object-contain h-full w-full rounded-sm"
          />
        )
      }
    </div>
  </button>
)
