/* eslint-disable @next/next/no-img-element */
import React from 'react'
import _ from 'lodash'
// motion
import { fadeInFromBottom } from '@/function/framer-animation'
// layouts
import { Section, Container, Motion, MotionVariant } from '@/app/layouts'
// components
import { Title, SectionButtons } from '@/components/shared'
// constants
import { defaultSectionStyles } from '@/lib/constants'
// api
import { getCollection } from '@/api/collection'

const defaults = {
  ...defaultSectionStyles,
  textAlign: 'text-center',
  title: {
    size: 'default',
    style: 'default-inverted'
  },
  subtitle: {
    size: 'default-subtitle',
    style: 'custom-subtitle-inverted'
  },
  buttonContainer: `${defaultSectionStyles.buttonContainer} grid justify-center`,
  margin: {
    title: "",
    subtitle: "",
    body: "mt-6",
    extraBody: "mt-4"
  },
}

export async function WhyChooseUs({ data, sectionCount }) {
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
      <svg className="relative z-10 fill-current text-secondary-950" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 1679 77.74">
        <g id="Layer_2" data-name="Layer 2">
          <g id="Layer_1-2" data-name="Layer 1">
            <path d="M0,0C254.81,25,535.7,41,839,41c303.69,0,584.91-16,840-41V77.74H0Z"/>
          </g>
        </g>
      </svg>

      <div className="w-full bg-secondary-950">
        <Container width={width} margin="section" className="relative z-1">
          <Motion className="container">
            {/* title */}
            <MotionVariant variants={fadeInFromBottom}>
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
            <MotionVariant variants={fadeInFromBottom}>
              <Title
                title={_.get(fields, 'subtitle')}
                tag={subtitleTag}
                align={titleAlign}
                style={subtitle.style}
                size={subtitle.size}
                className={`${defaults.margin.subtitle} ${_.get(fields, 'subtitleClass') ?? _.get(fields, 'subtitleClass')}`}
              />
            </MotionVariant>

            {
              subCollection && (
                <IconList items={subCollection}/>
              )
            }

            <SectionButtons
              fields={fields}
              defaults={defaults}
            />
          </Motion>
        </Container>
      </div>

      <svg className="relative -mt-1 rotate-180 z-10 fill-current text-secondary-950" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 1679 77.74">
        <g id="Layer_2" data-name="Layer 2">
          <g id="Layer_1-2" data-name="Layer 1">
            <path d="M0,0C254.81,25,535.7,41,839,41c303.69,0,584.91-16,840-41V77.74H0Z"/>
          </g>
        </g>
      </svg>
    </Section>
  )
}

const IconList = ({ items }) => (
  <div className="my-14 grid lg:flex lg:flex-row justify-center">
    {
      items?.map(item => (
        <MotionVariant variants={fadeInFromBottom} className="grid basis-1/3" key={item.id}>
          <div className="h-24 mx-auto">
            <img
              src={_.get(item, 'fields.image.imageUrl')}
              alt={_.get(item, 'fields.image.altText')}
              className="h-24 text-secondary-200"
            />
          </div>
          <div className="mt-6 h-14 text-center">
            <p className="max-w-[80%] mx-auto text-xl text-secondary-200">{_.get(item, 'fields.subtitle')}</p>
          </div>
        </MotionVariant>
      ))
    }
  </div>
)
