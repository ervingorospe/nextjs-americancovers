'use client'

import React from 'react'
import clsx from 'clsx'
// component
import * as TitleComponent from '@/components/shared/title-tags'
// function
import { formatComponentName } from '@/function/formatting'

const titleAlign = {
  'default': '',
  'text-left': 'text-left',
  'text-center': 'text-center',
  'text-right': 'text-right',
  'text-justify': 'text-justify'
}

const titleSizes = {
  'default': 'text-3xl md:text-4xl',
  'default-subtitle': 'text-xl md:text-2xl',
  'default-inverted': 'text-3xl md:text-6xl',
  'default-subtitle-inverted': 'text-xl md:text-2xl',
  'hero-title': 'text-4xl md:text-4xl md:text-5xl xl:text-6xl',
  'hero-subtitle': 'text-xl xl:text-2xl',
  'call-to-action': 'text-4xl md:text-6xl',
  'call-to-action-subtitle': 'text-xl md:text-2xl',
  'text-xs': 'text-xs',
  'text-sm': 'text-sm',
  'text-base': 'text-base md:text-lg',
  'text-lg': 'text-lg',
  'text-xl': 'text-xl md:text-2xl',
  'text-2xl': 'text-2xl',
  'text-3xl': 'text-3xl',
  'text-4xl': 'text-4xl',
  'text-5xl': 'text-5xl',
  'text-6xl': 'text-6xl',
  'text-7xl': 'text-7xl',
  'text-8xl': 'text-8xl',
  'text-9xl': 'text-9xl',
  'feed-inverted': 'text-3xl md:text-4xl'
}

const titleStyle = {
  'default': 'font-heading font-extrabold text-secondary-950',
  'default-subtitle': 'font-heading font-black text-primary-700',
  'default-inverted': 'font-heading font-bold text-white',
  'default-subtitle-inverted': 'font-heading font-black text-gray-300',
  'hero-title': 'font-heading font-extrabold text-white',
  'hero-subtitle': 'font-heading font-black text-white',
  'call-to-action-subtitle': 'font-normal uppercase tracking-wide text-primary-300',
  'call-to-action': 'capitalize max-w-5xl font-heading text-white',
  'seo-headline': 'font-heading font-bold text-white',
  'subtitle-seo-headline': 'leading-8 text-white',
  'custom-subtitle': 'font-semibold uppercase tracking-wide text-secondary-700',
  'custom-subtitle-inverted': 'font-heading font-black text-primary-600',
  'light-subtitle': 'font-heading font-black text-primary-400',
  'subtitle-black': 'font-heading font-bold'
}

export function Title({ title, tag = "default", align = "default", style = "default", size = "default", className }) {
  if (title) {
    const TitleType = TitleComponent[formatComponentName(tag)];

    return (
      <div>
        <TitleType title={title} styles={clsx(titleStyle[style], titleSizes[size], titleAlign[align], className)}/>
      </div>
    )
  }
}
