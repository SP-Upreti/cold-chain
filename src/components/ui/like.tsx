"use client"
import { Icon } from '@iconify/react'
import React from 'react'

export default function Like() {
    const [liked, setLiked] = React.useState(false);
    return (
        <button
            type="button"
            className="absolute top-4 right-4 fill-primary text-primary cursor-pointer"
            onClick={() => setLiked(!liked)}
        >
            {
                liked ? (
                    <Icon
                        icon={"solar:heart-bold"}
                        className="fill-primary size-8"
                    />
                ) : (
                    <Icon
                        icon={"solar:heart-outline"}
                        className="fill-primary size-8"
                    />
                )
            }
        </button>
    )
}
