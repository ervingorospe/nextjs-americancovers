import React from 'react'
import _ from 'lodash'
// motion
import { fadeInFromBottom, fadeInFromLeft } from '@/function/framer-animation'
// layouts
import { Section, Container, Motion, MotionVariant } from '@/app/layouts'
// components
import { Title, Body, SectionButtons, SectionImageVideo } from '@/components/shared'
// constants
import { defaultSectionStyles } from '@/lib/constants'

const defaults = {
  ...defaultSectionStyles
}

export async function ImageRightWithSvg({ data, sectionCount }) {
  const { fields } = data
  const bg = _.get(fields, 'backgroundColorClass') === 'default' || !_.get(fields, 'backgroundColorClass') ? defaults.bgColor : _.get(fields, 'backgroundColorClass')
  const width = _.get(fields, 'containerWidth') === 'default' || !_.get(fields, 'containerWidth') ? defaults.width : _.get(fields, 'containerWidth')
  const titleAlign = _.get(fields, 'textAlign') === 'default' || !_.get(fields, 'textAlign') ? defaults.textAlign : _.get(fields, 'textAlign')
  const titleTag = _.get(fields, 'titleTag') !== 'default' ? _.get(fields, 'titleTag') : sectionCount === 1 ? 'h1' : 'h2'
  const subtitleTag = _.get(fields, 'subtitleTag') !== 'default' ? _.get(fields, 'subtitleTag') : sectionCount === 1 ? 'h2' : 'h3'
  const bodySize = _.get(fields, 'bodySize') === 'default' ? defaults.bodySize : _.get(fields, 'bodySize') 
  const extraBodySize = _.get(fields, 'extraBodySize') === 'default' ? defaults.extraBodySize : _.get(fields, 'extraBodySize') 

  let title = defaults.title
  let subtitle = defaults.subtitle

  if (_.get(fields, 'titlesInverted') === 'inverted') {
    title = defaults.subtitle
    subtitle = defaults.title
  }

  return (
    <Section className="relative" bg={bg}>
      <svg className="relative z-10 fill-current text-gray-100" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 1679 77.74">
        <g id="Layer_2" data-name="Layer 2">
          <g id="Layer_1-2" data-name="Layer 1">
            <path d="M0,0C254.81,25,535.7,41,839,41c303.69,0,584.91-16,840-41V77.74H0Z"/>
          </g>
        </g>
      </svg>

      <div className="w-full bg-gray-100">
        <Container width={width} margin="section" className="relative z-1">
          <Motion className="items-center grid gap-10 lg:grid-cols-2">
            <div>
              <SectionImageVideo
                fields={fields}
                defaults={defaults}
              />
            </div>

            <div className="max-w-full lg:row-start-1">
              {/* title */}
              <MotionVariant variants={fadeInFromLeft}>
                <Title
                  title={_.get(fields, 'title')}
                  tag={titleTag}
                  align={titleAlign}
                  style={title.style}
                  size={title.size}
                  className={`${defaults.margin.title} ${_.get(fields, 'titleClass') ?? _.get(fields, 'titleClass')}`}
                />
              </MotionVariant>

              {/* subtitle */}
              <MotionVariant variants={fadeInFromLeft}>
                <Title
                  title={_.get(fields, 'subtitle')}
                  tag={subtitleTag}
                  align={titleAlign}
                  style={subtitle.style}
                  size={subtitle.size}
                  className={`${defaults.margin.subtitle} ${_.get(fields, 'subtitleClass') ?? _.get(fields, 'subtitleClass')}`}
                />
              </MotionVariant>

              {/* body */}
              <MotionVariant variants={fadeInFromBottom}>
                <Body
                  body={_.get(fields, 'body')}
                  size={bodySize}
                  className={`${defaults.margin.body} ${_.get(fields, 'bodyClass') ?? _.get(fields, 'bodyClass')}`}
                />
              </MotionVariant>

              {/* extra body */}
              <MotionVariant variants={fadeInFromBottom}>
                <Body
                  body={_.get(fields, 'extraBody')}
                  size={extraBodySize}
                  className={`${defaults.margin.extraBody} ${_.get(fields, 'extraBodyClass') ?? _.get(fields, 'extraBodyClass')}`}
                />
              </MotionVariant>

              <SectionButtons
                fields={fields}
                defaults={defaults}
              />
            </div>
            
          </Motion>
        </Container>
      </div>

      <svg className="relative rotate-180 z-10 fill-current text-gray-100" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 1679 77.74">
        <g id="Layer_2" data-name="Layer 2">
          <g id="Layer_1-2" data-name="Layer 1">
            <path d="M0,0C254.81,25,535.7,41,839,41c303.69,0,584.91-16,840-41V77.74H0Z"/>
          </g>
        </g>
      </svg>
    </Section>
  )
}
