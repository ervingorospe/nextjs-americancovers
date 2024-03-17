'use client'

import React from 'react'
import Image from 'next/image'
// contants
import { defaultImageAlt } from '@/lib/constants'

export function ImageHolder({ image, className }) {
  if (image) {
    return (
      <div className="cursor-pointer">
        <figure className={className.figure}>
          <div>
            <Image
              src={image.imageUrl}
              alt={image.altText ? image.altText : defaultImageAlt}
              priority={true}
              height={500}
              width={500}
              className={className.image}
            />
          </div>
        </figure>
        
        {
          image.caption && (
            <figcaption className="mt-2 block text-gray-400 italic">{image.caption}</figcaption>
          )
        }
      </div>
    )
  }
}