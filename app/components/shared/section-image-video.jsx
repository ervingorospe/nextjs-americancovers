import React from 'react'
import _ from 'lodash'
// motion
import { fadeInFromBottom } from '@/function/framer-animation'
// layouts
import { Motion, MotionVariant } from '@/app/layouts'
// components
import { VideoHolder, ImageHolder } from '@/components/shared'

export async function SectionImageVideo({ fields, defaults }) {
  return (
    <>
      {
        ((_.get(fields, 'video') || _.get(fields, 'videoUrl')) || _.get(fields, 'image')) && (
          <>
            {
              (_.get(fields, 'video') || _.get(fields, 'videoUrl')) && (
                <MotionVariant variants={fadeInFromBottom}>
                  <VideoHolder 
                    videoUrl={_.get(fields, 'videoUrl') ? true : false}
                    video={_.get(fields, 'video.videoUrl') ? _.get(fields, 'video.videoUrl') : _.get(fields, 'videoUrl')} 
                    className={{
                      figure: `${defaults.image.figure} ${defaults.image.rounded} ${defaults.image.shadow}`,
                      video: `${defaults.image.image}`
                    }}
                  />
                </MotionVariant>
              )
            }

            {
              (!_.get(fields, 'video') && !_.get(fields, 'videoUrl')) && _.get(fields, 'image') && (
                <MotionVariant variants={fadeInFromBottom}>
                  <ImageHolder 
                    image={fields.image} 
                    className={{
                      figure: `${defaults.image.figure} ${defaults.image.rounded} ${defaults.image.shadow}`,
                      image: `${defaults.image.image}`
                    }}
                  />
                </MotionVariant>
              )
            }
          </>
        )
      }
    </>
  )
}
