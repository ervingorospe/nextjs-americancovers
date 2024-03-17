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
  textAlign: 'text-center'
}

export async function DefaultCentered({ data, sectionCount }) {
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
      <Container width={width} margin="section" className="relative z-1">
        <Motion>
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
              className={`${defaults.margin.body} ${_.get(fields, 'bodyClass') ?? _.get(fields, 'bodyClass')} max-w-full`}
            />
          </MotionVariant>

          {/* extra body */}
          <MotionVariant variants={fadeInFromBottom}>
            <Body
              body={_.get(fields, 'extraBody')}
              size={extraBodySize}
              className={`${defaults.margin.extraBody} ${_.get(fields, 'extraBodyClass') ?? _.get(fields, 'extraBodyClass')} max-w-full`}
            />
          </MotionVariant>

          <SectionButtons
            fields={fields}
            defaults={defaults}
          />

          <FormWufoo data={data} 
            className={{ 
              container: "mt-8 grid justify-items-center",
              div: "relative w-full bg-gray-50 max-w-[800px]",
              form: "px-6 pt-6"
            }} 
            titleText=""
          />
        </Motion>
      </Container>
    </Section>
  )
}
