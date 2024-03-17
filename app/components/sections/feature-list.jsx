import React from 'react'
import _ from 'lodash'
import Image from 'next/image'
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
  ...defaultSectionStyles,
  subtitle: {
    size: 'default-subtitle',
    style: 'subtitle-black'
  },
  margin: {
    title: "",
    subtitle: "pb-6",
    body: "",
    extraBody: "mt-4"
  },
}

export async function FeatureList({ data, sectionCount }) {
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

          {
            subCollection && (
              <Certified items={subCollection}/>
            )
          }

          {
            _.get(fields, 'body') && (
              <div className="relative mt-6 border bg-gray-50 p-4 shadow-inner md:p-8">
                <div className="pattern-gray-light absolute inset-0"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-50 via-gray-50 opacity-80"></div>
                <div className="relative justify-center grid">
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
                      className={`${defaults.margin.body} ${_.get(fields, 'bodyClass') ?? _.get(fields, 'bodyClass')} text-gray-600 md:text-lg max-w-full`}
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
                </div>
              </div>
            )
          }

          <SectionButtons
            fields={fields}
            defaults={defaults}
          />
        </Motion>
      </Container>
    </Section>
  )
}

const Certified = ({ items }) => (
  <div className="mt-8 px-4 grid gap-y-4 gap-x-24 lg:grid-cols-2">
    {
      items?.map(item => (
        <MotionVariant variants={fadeInFromBottom} className="relative flex items-center" key={item.id}>
          <span className="flex-none h-7 w-7">
            <Image
              src={_.get(item, 'fields.image.imageUrl')}
              alt="Features"
              height={1000}
              width={1000}
              priority={true}
              className="h-full w-full"
            />
          </span>
          <p className="ml-4 text-lg font-semibold text-gray-600">{_.get(item, 'fields.subtitle')}</p>
        </MotionVariant>
      ))
    }
  </div>
)
