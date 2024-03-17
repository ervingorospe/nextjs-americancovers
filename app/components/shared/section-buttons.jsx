import React from 'react'
import _ from 'lodash'

// motion
import { fadeInFromBottom } from '@/function/framer-animation'
// layouts
import { Motion, MotionVariant } from '@/app/layouts'
// components
import { Button } from '@/components/shared'

export async function SectionButtons({ fields, defaults }) {
  return (
    (_.get(fields, 'button') || _.get(fields, 'button-2')) && (
      <Motion className={defaults.buttonContainer}>
        {
          _.get(fields, 'button') && (
            <MotionVariant variants={fadeInFromBottom}>
              <Button
                data={{
                  button: {
                    ..._.get(fields, 'button'),
                  },
                  buttonPageLink: _.get(fields, 'buttonPageLink')
                }}
                styles={defaults.buttonStyle}
                className="mx-auto"
              />
            </MotionVariant>
          )
        }

        {
          _.get(fields, 'button-2') && (
            <MotionVariant variants={fadeInFromBottom}>
              <Button
                data={{
                  button: {
                    ..._.get(fields, 'button-2'),
                  },
                  buttonPageLink: _.get(fields, 'buttonPageLink-2')
                }}
                styles={defaults.buttonStyle2}
                className=""
              />
            </MotionVariant>
          )
        }
      </Motion>
    )
  )
}
