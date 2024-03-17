'use client'

import React, { useState, useEffect, useCallback } from 'react'
import _ from 'lodash'
import Image from 'next/image'
import { motion } from "framer-motion";

export function ImageZoom({ images, className }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const infinitLoop =  useCallback(() => {
    setCurrentIndex((currentIndex + 1) % images.length)
  },[currentIndex, images.length])

  useEffect(() => {
    const timeoutFunction = setInterval(() => infinitLoop(), 6000)
    return () => clearInterval(timeoutFunction);
  }, [infinitLoop])

  return (
    <motion.div 
      className={className.container}
      animate={{ scale: 1.07 }}
      transition={{ ease: "linear", duration: 6, repeat: Infinity }}
    >
      <Image
        src={images[currentIndex].src}
        alt={images[currentIndex].alt}
        height={1000}
        width={1000}
        priority={true}
        className={className.image}
      />
    </motion.div>
  )
}
