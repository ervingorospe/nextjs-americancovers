import React from 'react'
import _ from 'lodash'
// motion
import { fadeInFromBottom, fadeInFromTop } from '@/function/framer-animation'
// layouts
import { Section, Container, Motion, MotionVariant } from '@/app/layouts'
// components
import { Title, Body, SectionButtons, GetAQuoteForm } from '@/components/shared'
// constants
import { defaultSectionStyles, fluxIds } from '@/lib/constants'
// api
import { getItem } from '@/api/collection'

const defaults = {
  ...defaultSectionStyles
}

export async function DefaultLeftGetAQuoteForm({ data, sectionCount }) {
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

  const settings = _.first(await getItem(fluxIds.SETTINGS))

  return (
    <Section className="relative" bg={bg}>
      <Container width={width} margin="section" className="relative z-1">
        <Motion className="pt-14 grid lg:grid-cols-12 gap-8">
          <div className="mt-8 text-left lg:col-span-7">
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
          </div>
          
          <GetAQuoteForm settings={settings} className="border-[6px] border-secondary-600 lg:col-span-5 pb-24 relative w-full lg:max-w-2xl bg-[#F8F4F6] grid justify-items-center lg:justify-items-center max-h-[600px] overflow-hidden hover:max-h-full ease-in-out duration-1000"/>
        </Motion>
      </Container>
    </Section>
  )
}
