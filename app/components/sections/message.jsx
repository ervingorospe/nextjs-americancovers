import React from 'react'
import _ from 'lodash'
// motion
import { fadeInFromBottom, fadeInFromTop } from '@/function/framer-animation'
// layouts
import { Section, Container, Motion, MotionVariant } from '@/app/layouts'
// components
import { Title, Body, SectionButtons } from '@/components/shared'
// constants
import { defaultSectionStyles } from '@/lib/constants'

const defaults = {
  ...defaultSectionStyles,
  margin: {
    title: "",
    subtitle: "mt-4",
    body: "mt-6",
    extraBody: "mt-6"
  },
}

export async function Message({ data, sectionCount }) {
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
      <Container width={width} margin="section" className="relative z-1 lg:mt-14 ">
        <Motion className="relative lg:flex lg:items-center">
          <div className="relative lg:ml-10">
            <svg
              className="absolute top-12 left-0 h-36 w-36 -translate-x-8 -translate-y-24 transform text-gray-200"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 144 144"
              aria-hidden="true"
            >
              <path
                strokeWidth={2}
                d="M41.485 15C17.753 31.753 1 59.208 1 89.455c0 24.664 14.891 39.09 32.109 39.09 16.287 0 28.386-13.03 28.386-28.387 0-15.356-10.703-26.524-24.663-26.524-2.792 0-6.515.465-7.446.93 2.327-15.821 17.218-34.435 32.11-43.742L41.485 15zm80.04 0c-23.268 16.753-40.02 44.208-40.02 74.455 0 24.664 14.891 39.09 32.109 39.09 15.822 0 28.386-13.03 28.386-28.387 0-15.356-11.168-26.524-25.129-26.524-2.792 0-6.049.465-6.98.93 2.327-15.821 16.753-34.435 31.644-43.742L121.525 15z"
              />
            </svg>
            <blockquote className="relative">
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
                  className={`${defaults.margin.body} ${_.get(fields, 'bodyClass') ?? _.get(fields, 'bodyClass')} lg:ml-4 text-gray-500 italic max-prose xl:prose-lg max-w-full`}
                />
              </MotionVariant>

              <footer>
                {/* extra body */}
                <MotionVariant variants={fadeInFromBottom} className="flex">
                  <Body
                    body={_.get(fields, 'extraBody')}
                    size={extraBodySize}
                    className={`${defaults.margin.extraBody} ${_.get(fields, 'extraBodyClass') ?? _.get(fields, 'extraBodyClass')} font-bold text-left text-gray-900 prose xl:prose-lg`}
                  />
                </MotionVariant>
              </footer>
            </blockquote>
          </div>
        </Motion>
      </Container>
    </Section>
  )
}
