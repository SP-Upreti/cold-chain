import React from 'react'

export default function Images({detailImage}: {detailImage: string}) {
  return (
    <div>
       <img src={detailImage} alt="detail Image" />
    </div>
  )
}
