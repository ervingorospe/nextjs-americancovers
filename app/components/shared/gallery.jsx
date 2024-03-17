'use client'

import React, { useState } from 'react'
import _ from 'lodash'
import Image from 'next/image'
// motion
import { fadeInFromBottom } from '@/function/framer-animation'
import { Motion, MotionVariant } from '@/app/layouts'
// components
import { ModalCarousel } from '@/components/shared'

export function Gallery({ photos }) {
  const [curr, setCurr] = useState(0)
  const [open, setOpen] = useState(false)

  const openModal = (i) => {
    setCurr(i)
    setOpen(true)
  }

  if (photos.length) {
    return (
      <>
        <Motion className="mt-8">
          <div className="grid grid-cols-2 max-auto md:flex flex-wrap justify-center -m-1 md:-m-2">
            {
              photos?.map((item, i) => (
                <MotionVariant variants={fadeInFromBottom} className="w-full md:flex md:flex-wrap md:w-1/3 cursor-pointer" key={item.id} onClick={() => openModal(i)}>
                  <div className="w-full p-1 md:p-2">
                    <figure className="aspect-w-16 aspect-h-9 overflow-hidden shadow-md">
                      <Image
                        src={_.get(item, 'file.imageUrl')}
                        alt={_.get(item, 'fields.altText')}
                        height={1000}
                        width={1000}
                        priority={true}
                        className="block object-cover object-center w-full h-full"
                      />
                    </figure>
                    <p className="mt-1 prose font-medium">{_.get(item, 'fields.caption')}</p>
                  </div>
                </MotionVariant>
              ))
            }
          </div>
        </Motion>

        <ModalCarousel images={photos} current={curr} open={open} onClose={() => setOpen(false)}/>
      </>
    )
  }
}
