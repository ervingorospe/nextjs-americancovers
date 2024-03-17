import React from 'react'
import _ from 'lodash'
// motion
import { fadeInFromBottom, fadeInFromTop } from '@/function/framer-animation'
// layouts
import { Section, Container, Motion, MotionVariant } from '@/app/layouts'
// components
import { Title, Body, SectionButtons, FormWufoo } from '@/components/shared'
// constants
import { defaultSectionStyles } from '@/lib/constants'

const defaults = {
  ...defaultSectionStyles,
  title: {
    size: 'default',
    style: 'default-inverted'
  },
  subtitle: {
    size: 'default-subtitle',
    style: 'default-subtitle-inverted'
  },
}

export async function FormRight({ data, sectionCount }) {
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
    <Section className="relative" bg="secondary-700">
      <svg className="relative z-10 fill-current text-white rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 1679 77.74">
        <g id="Layer_2" data-name="Layer 2">
          <g id="Layer_1-2" data-name="Layer 1">
            <path d="M0,0C254.81,25,535.7,41,839,41c303.69,0,584.91-16,840-41V77.74H0Z"/>
          </g>
        </g>
      </svg>

      <div className="absolute bg-fixed pattern-secondary absolute inset-0"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-secondary-950"></div>

      <div className="md:h-22 h-20 lg:h-24 xl:h-28"></div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute left-0 right-0 bottom-0 w-full h-3/4 fill-current text-secondary-500" viewBox="0 0 1000 400" preserveAspectRatio="none">
          <path d="M 1000 0 L 1000 400 L 400 400 Z" fillOpacity="0.75" />
          <path d="M 1000 0 L 1000 400 L 200 400 Z" fillOpacity="0.5" />
          <path d="M 1000 0 L 1000 400 L 0 400 Z" fillOpacity="0.25" />
        </svg>
      </div>
      
      <Container width={width} margin="section" className="relative z-1">
        <Motion className="items-top grid gap-10 lg:grid-cols-2">
          <FormWufoo 
            data={data} 
            className={{
              container: "grid justify-items-center lg:justify-items-end",
              div: "relative w-full bg-white shadow-lg",
              form: "px-6 pt-6"
            }}
            titleText=""
          />

          <div className="lg:mt-16 row-start-1">
            {/* title */}
            <MotionVariant variants={fadeInFromTop}>
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
            <MotionVariant variants={fadeInFromTop}>
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
                className={`${defaults.margin.body} ${_.get(fields, 'bodyClass') ?? _.get(fields, 'bodyClass')} max-w-full text-gray-200`}
              />
            </MotionVariant>

            {/* extra body */}
            <MotionVariant variants={fadeInFromBottom}>
              <Body
                body={_.get(fields, 'extraBody')}
                size={extraBodySize}
                className={`${defaults.margin.extraBody} ${_.get(fields, 'extraBodyClass') ?? _.get(fields, 'extraBodyClass')} max-w-full text-gray-200`}
              />
            </MotionVariant>

            <SectionButtons
              fields={fields}
              defaults={defaults}
            />
          </div>
        </Motion>
      </Container>

      <div className="relative z-1">
        <svg className="w-full fill-current text-white" viewBox="0 0 1000 100">
          <path d="M 0 0 Q 500 150 1000 0 L 1000 150 L 1000 150 L 0 150 Z" />

          <path d="M 0 10 Q 500 150 1000 10 L 1000 20 Q 500 160 0 20 Z" className="text-primary-600" />
        </svg>
      </div>
    </Section>
  )
}
