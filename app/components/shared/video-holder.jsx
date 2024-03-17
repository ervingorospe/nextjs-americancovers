'use client'

import React from 'react'

export function VideoHolder({ video, className, videoUrl }) {
  return (
    <figure className={className.figure}>
      {
        videoUrl ?
          <iframe allowFullScreen className={className.video} src={video}/>
        :
          <div className={className.video}>
            <video playsInline autoPlay muted loop>
              <source src={video} type="video/mp4"/>
            </video>
          </div>
      }
    </figure>
  )
}