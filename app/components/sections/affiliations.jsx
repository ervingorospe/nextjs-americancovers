import React from 'react'
import _ from 'lodash'
import Link from 'next/link'
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
  textAlign: 'text-center',
  subtitle: {
    size: 'default-subtitle',
    style: 'light-subtitle'
  },
  margin: {
    title: "",
    subtitle: "",
    body: "mt-6",
    extraBody: "mt-4"
  },
}

export async function Affiliations({ data, sectionCount }) {
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

          {
            subCollection && (<IconList items={subCollection}/>)
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

const IconList = ({ items }) =>  (
  <div className="grid grid-cols-2 max-auto md:flex flex-wrap justify-center -m-1 md:-m-2 space-y-14">
    {
      items?.map(item => {
        if (_.get(item, 'fields.button')) {
          return (
            <MotionVariant variants={fadeInFromBottom} className="mx-auto items-end justify-center flex flex-wrap w-1/3" key={item.id}>
              <Link href={_.get(item, 'fields.button.url')} target={_.get(item, 'fields.button.target')} className="mx-auto" >
                <div className="max-h-24 w-24">
                  <Image
                    src={`${_.get(item, 'fields.image.imageUrl')}?progressive=1`}
                    alt={_.get(item, 'fields.image.altText')}
                    height={100}
                    width={100}
                    priority={true}
                    className="max-h-24 w-24"
                  />
                </div>
              </Link>
            </MotionVariant>
          )
        }

        return (
          <MotionVariant variants={fadeInFromBottom} className="mx-auto items-end justify-center flex flex-wrap w-1/3" key={item.id}>
            <div className="max-h-24 w-24">
              <Image
                src={`${_.get(item, 'fields.image.imageUrl')}?progressive=1`}
                alt={_.get(item, 'fields.image.altText')}
                height={100}
                width={100}
                priority={true}
                className=""
              />
            </div>
          </MotionVariant>
        )
      })
    }
  </div>
)
