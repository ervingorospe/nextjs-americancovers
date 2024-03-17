'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import _ from 'lodash'

export function HeaderAlert({ className, settings }) {
  const [show, setShow] = useState(true)

  return (
    <div className={`${!show ? 'hidden' : 'block'} border-b border-primary-200 bg-white lg:bg-gray-100 p-2 relative`}>
      <div className="container max-w-screen-2xl lg:rounded lg:border lg:bg-white p-4">
        <div className="grid space-y-4 lg:flex justify-between items-center">
          <div className="flex space-x-4 justify-left item-center">
            <Link href="https://www.sunbeltrentals.com/" target="_blank">
              <Image
                src="https://fluxconsole.com/files/item/1294/176435/IT-6186-SBR%20logo%202048x2048-Image-0323.jpg"
                alt="Sunbelt Rentals"
                width={500}
                height={500}
                className="h-12 w-auto xl:h-20"
              />
            </Link>
            
            <Link href="https://www.sunbeltrentals.com/" target="_blank">
              <Image
                src="https://fluxconsole.com/files/item/1294/176436/SBR%20Temporary%20Structures%20Black%20Yellow%20Vertical_CMYK.png"
                alt="Sunbelt Rentals"
                width={500}
                height={500}
                className="block lg:hidden h-12 w-auto xl:h-20"
              />
            </Link>
          </div>
          
          <div>
            <p className="font-bold font-heading text-sm xl:text-base">{_.get(settings, 'fields.alertBannerTitle')}</p>
            <p className="text-sm text-gray-600 xl:text-base">{_.get(settings, 'fields.alertBannerSubtitle')}</p>
            <button onClick={() => setShow(false)} className="button button-xs mt-3 inline-flex border-gray-200 text-gray-700 hover:bg-gray-100 hover:text-gray-900"> Dismiss </button>
          </div>

          <Link href="https://www.sunbeltrentals.com/" target="_blank">
            <Image
              src="https://fluxconsole.com/files/item/1294/176436/SBR%20Temporary%20Structures%20Black%20Yellow%20Vertical_CMYK.png"
              alt="Sunbelt Rentals"
              width={500}
              height={500}
              className="hidden lg:block h-12 w-auto xl:h-20"
            />
          </Link>
        </div>
      </div>
    </div>
  )
}
