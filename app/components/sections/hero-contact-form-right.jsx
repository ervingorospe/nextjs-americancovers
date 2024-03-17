/* eslint-disable @next/next/no-img-element */
import React from 'react'
import _ from 'lodash'
import Image from 'next/image'
// motion
import { fadeInFromBottom } from '@/function/framer-animation'
// layouts
import { Section, Container, Motion, MotionVariant } from '@/app/layouts'
// components
import { Title, Body, SectionButtons, FormWufoo } from '@/components/shared'
import * as FooterSection from '@/components/layouts/location-info'
// function
import { sectionsComponent, formatComponentName } from '@/function/formatting'
// constants
import { defaultHeroStyles, fluxIds, defaultLocationName } from '@/lib/constants'
// api
import { getCollectionItems, getCollection } from '@/api/collection'

const defaults = {
  ...defaultHeroStyles,
  width: 'max-w-screen-xl',
  textAlign: 'text-center lg:text-left'
}

export async function HeroContactFormRight({ data, sectionCount }) {
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

  const locationInfo = await getCollectionItems(fluxIds.FOOTER_LOCATION_INFO)
  const tempLocations = await getCollection(fluxIds.LOCATION)
  const filterLocations = _.filter(tempLocations[0].items, res => res.fields.active)
  const locations = _.find(filterLocations, data => data.name === defaultLocationName)

  return (
    <Section className="relative overflow-hidden" bg={bg}>
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
      <div className={`absolute inset-0 bg-${_.get(fields, 'backgroundColorClass')} opacity-40`}></div>
      <div className="md:h-22 h-20 lg:h-24 xl:h-28"></div>

      <Container className="relative z-10 pb-12 lg:pb-20" width={width} margin="hero">        
        <Motion className="pt-14 grid justify-center gap-8 lg:grid-cols-2">
          <div className="text-center lg:text-left">
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

            <div className="mt-8 space-y-8 text-center lg:text-left">
              {
                locationInfo?.map((item, i) => {
                  const componentName = sectionsComponent(item)
                  const ComponentType = FooterSection[formatComponentName(componentName)]

                  if (ComponentType && _.get(item, 'fields.active')) {
                    return <ComponentType 
                      data={item} 
                      location={locations} 
                      key={i}
                      styles={{
                        title: 'text-lg font-medium uppercase tracking-wide text-white',
                        contentText: 'mt-3 text-gray-200',
                        link: 'hover:underline',
                        buttonStyle: 'inline-flex mt-3 button bg-white text-gray-900 hover:bg-gray-200 button-sm'
                      }}
                    />
                  }
                })
              }
            </div>

            <SectionButtons
              fields={fields}
              defaults={defaults}
            />
          </div>
          
          <FormWufoo data={data} 
            className={{ 
              container: "grid justify-items-center lg:justify-items-end",
              div: "relative w-full bg-gray-50 lg:max-w-lg max-w-[600px] min-h-[420px]",
              form: "px-6 pt-6"
            }} 
            titleText="CONTACT US"
          />
        </Motion>
      </Container>
    </Section>
  )
}
