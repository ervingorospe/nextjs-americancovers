import React from 'react'
import _ from 'lodash'
import Link from 'next/link'
// motion
import { fadeInFromBottom, fadeInFromTop } from '@/function/framer-animation'
// layouts
import { Section, Container, Motion, MotionVariant } from '@/app/layouts'
// components
import { Title, Body, SectionButtons, ImageHolder } from '@/components/shared'
// constants
import { defaultSectionStyles, navigationType } from '@/lib/constants'
// function
import { getNavigation } from '@/function/navigation'
// api
import { getCollection } from '@/api/collection'

const defaults = {
  ...defaultSectionStyles
}

export async function FeaturedProducts({ data, sectionCount }) {
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
              <Products items={subCollection}/>
            )
          }
        </Motion>
      </Container>
    </Section>
  )
}

const Products = ({ items }) => (
  <Motion className="grid lg:grid-cols-3 gap-4 mt-6">
    {
      items?.map(item => (
        <MotionVariant variants={fadeInFromBottom} className="group basis-1/4 cursor-pointer border border-gray-200 hover:border-secondary-950 ease-in-out duration-200" key={item.id}>
          <Card item={item}/>
        </MotionVariant>
      ))
    }
  </Motion>
)

const Card = async ({ item }) => {
  const navigation = await getNavigation(navigationType.INFO)
  const { slug } = _.find(navigation, data => _.get(item, 'fields.buttonPageLink') === data.id)

  return (
    <Link href={`/${slug}`}>
      <div className="relative">
        <div className="absolute inset-0 z-1 overflow-hidden"></div>
        <ImageHolder
          image={_.get(item, 'fields.image')} 
          className={{
            figure: "aspect-w-16 aspect-h-9 overflow-hidden",
            image: "h-full w-full object-fit object-center"
          }}
        />
      </div>

      <div className="p-4">
        <h3 className="text-xl font-bold font-heading text-secondary-950">{item.name}</h3>

        {/* body */}
        <p className="mt-2 prose text-gray-500 line-clamp-3">
          {_.get(item,'fields.body')}
        </p>
      </div>
    </Link>
  )
}