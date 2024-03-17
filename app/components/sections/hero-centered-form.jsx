/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Image from 'next/image'
import _ from 'lodash'
// motion
import { fadeInFromBottom } from '@/function/framer-animation'
// layouts
import { Section, Container, Motion, MotionVariant } from '@/app/layouts'
// components
import { Title, Body, SectionButtons, GetAQuoteFormPage } from '@/components/shared'
// constants
import { defaultHeroStyles, fluxIds } from '@/lib/constants'
// api
import { getItem } from '@/api/collection'

const defaults = {
  ...defaultHeroStyles,
  textAlign: 'text-center'
}

export async function HeroCenteredForm({ data, sectionCount }) {
  const { fields } = data
  const bg = _.get(fields, 'backgroundColorClass') === 'default' || !_.get(fields, 'backgroundColorClass') ? defaults.bgColor : _.get(fields, 'backgroundColorClass')
  const width = _.get(fields, 'containerWidth') === 'default' || !_.get(fields, 'containerWidth') ? defaults.width : _.get(fields, 'containerWidth')
  const titleAlign = _.get(fields, 'textAlign') === 'default' || !_.get(fields, 'textAlign') ? defaults.textAlign : _.get(fields, 'textAlign')
  const titleTag = _.get(fields, 'titleTag') !== 'default' ? _.get(fields, 'titleTag') : sectionCount === 1 ? 'h1' : 'h2'
  const subtitleTag = _.get(fields, 'subtitleTag') !== 'default' ? _.get(fields, 'subtitleTag') : sectionCount === 1 ? 'h2' : 'h3'
  const bodySize = _.get(fields, 'bodySize') === 'default' ? defaults.bodySize : _.get(fields, 'bodySize') 
  const extraBodySize = _.get(fields, 'extraBodySize') === 'default' ? defaults.extraBodySize : _.get(fields, 'extraBodySize') 

  let title = {...defaults.title}
  let subtitle ={...defaults.subtitle}

  if (_.get(fields, 'titlesInverted') === 'inverted') {
    title = {...defaults.subtitle}
    subtitle = {...defaults.title}
  }

  const settings = _.first(await getItem(fluxIds.SETTINGS))

  return (
    <Section className="relative overflow-hidden opacity-90" bg={bg}>
      {
        _.get(fields, 'backgroundImage.imageUrl') && (
          <div className="absolute absolute inset-0 aspect-w-1">
            <Image
              src={_.get(fields, 'backgroundImage.imageUrl')}
              alt="Safety"
              height={1000}
              width={1000}
              priority={true}
              className="object-cover"
            />
          </div>
        )
      }

      <div className={`absolute inset-0 bg-${_.get(fields, 'backgroundColorClass')} opacity-80`}></div>
      <div className="md:h-22 h-20 lg:h-24 xl:h-28"></div>

      <Container className="relative z-10 pb-4 lg:pb-0" width={width} margin="hero">        
        <Motion className="grid items-center gap-2 text-center">
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

          <GetAQuoteFormPage 
            settings={settings} 
            className="grid justify-items-center lg:justify-items-center"
          />
        </Motion>
      </Container>

      <div className="relative z-1">
        <svg className="w-full fill-current text-white" viewBox="0 0 1000 100">
          <path className="text-secondary-100" d="M 0 0 Q 500 150 1000 0 L 1000 150 L 1000 150 L 0 150 Z" />
        </svg>
      </div>
    </Section>
  )
}
