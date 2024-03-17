import React from 'react'
import _ from 'lodash'
import { CheckIcon } from '@heroicons/react/24/outline'
// motion
import { fadeInFromBottom, fadeInFromTop } from '@/function/framer-animation'
// layouts
import { Section, Container, Motion, MotionVariant } from '@/app/layouts'
// components
import { Title, Body, SectionButtons } from '@/components/shared'
// constants
import { defaultSectionStyles } from '@/lib/constants'
// api
import { getCollection } from '@/api/collection'

const defaults = {
  ...defaultSectionStyles
}

export async function Applications({ data, sectionCount }) {
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

  let subCollection = [];

  if (_.get(fields, 'contentCollection')) {
    const collections = await getCollection(_.get(fields, 'contentCollection'))
    subCollection = _.filter(collections[0].items, data => data.fields.active)
  }

  return (
    <Section className="relative" bg={bg}>
      <Container width={width} margin="section" className="relative z-1 pb-24">
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

          {
            subCollection && (
              <ApplicationList items={subCollection}/>
            )
          }
        </Motion>
      </Container>
    </Section>
  )
}

const ApplicationList = ({ items }) => (
  <div className="lg:col-span-2 mt-8">
    <div className="grid grid-cols-1 gap-12 sm:grid-flow-col sm:grid-cols-2 sm:grid-rows-4">
      {
        items?.map(item => (
          <MotionVariant className="relative" variants={fadeInFromBottom} key={item.id}>
            <dt>
              <CheckIcon className="absolute mt-1 h-6 w-6 text-secondary-950" aria-hidden="true" />
              <p className="ml-10 text-lg font-semibold leading-8 text-gray-900">{item.name}</p>
            </dt>
          </MotionVariant>
        ))
      }
    </div>
  </div>
)
