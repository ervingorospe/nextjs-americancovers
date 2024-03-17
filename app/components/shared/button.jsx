import React from 'react'
import Link from 'next/link'
import _ from 'lodash'
import clsx from 'clsx'
// function
import { getNavigation, getButtonDetails } from '@/function/navigation'
// contants
import { navigationType } from '@/lib/constants'


const buttonStyles = {
  'hero': 'button inline-flex w-full bg-primary-600 text-white hover:bg-primary-700 hover:text-white focus:ring-primary-700 sm:w-auto',
  'hero-secondary-button': 'button inline-flex w-full border-white text-white hover:bg-white hover:text-secondary-900 focus:ring-primary-700 sm:w-auto',
  'text-button' : 'flex items-center text-header-button hover:text-link-hover text-sm md:text-lg',
  'footer-button': 'button flex w-full border-white text-white hover:bg-white hover:text-secondary-900 focus:ring-white md:w-auto',
  'button-primary' : 'button inline-flex bg-primary-600 text-white hover:bg-primary-700 hover:text-white focus:ring-primary-700 sm:w-auto',
  'button-secondary': 'button inline-flex bg-secondary-900 text-white hover:bg-secondary-700 hover:text-white focus:ring-secondary-700 sm:w-auto',
  'button-gray' : 'button bg-primary-500 text-white hover:bg-primary-600 hover:text-white focus:ring-primary-700 max-w-lg',
  'button-gray-light-outlined' : 'button bg-primary-500 text-white hover:bg-primary-600 hover:text-white focus:ring-primary-700 max-w-lg',
  'button-gray-outlined' : 'button bg-primary-500 text-white hover:bg-primary-600 hover:text-white focus:ring-primary-700 max-w-lg',
  'button-outlined' : 'button bg-primary-500 text-white hover:bg-primary-600 hover:text-white focus:ring-primary-700 max-w-lg',
  'button-primary-outlined' : 'button button-xl inline-flex border-white text-white hover:bg-white hover:text-primary-900 focus:ring-primary-700',
  'call-to-action': 'button border-primary-300 text-white hover:border-white',
  'default-inverted': 'button text-lg tracking-wide font-medium border-2 border-white hover:bg-white text-white hover:text-primary-700',
  'text-button-underline': 'underline text-sm md:text-base inline-flex items-center justify-center group text-red-700 hover:text-red-800'
}

const buttonSizes = {
  'default' : 'text-base',
  'text-xs' : 'text-xs',
  'text-sm' : 'text-sm',
  'text-base' : 'text-base',
  'text-lg' : 'text-lg',
  'text-xl' : 'text-xl',
  'text-2xl' : 'text-2xl'
}

export async function Button({ data, className, size = "default", styles }) {
  if (data.button) {
    const navigation = await getNavigation(navigationType.INFO)
    const buttonDetails = getButtonDetails({ data, navigation })

    if (buttonDetails.url && buttonDetails.url.charAt(1) === "#") {
      const url = buttonDetails.url.replace('/', '');

      return (
        <a className={clsx(buttonStyles[styles], buttonSizes[size], className)} href={url} target={buttonDetails.target}>
          {buttonDetails.text}
        </a>
      )
    }

    return (
      <Link className={clsx(buttonStyles[styles], buttonSizes[size], className)} href={buttonDetails.url} target={buttonDetails.target}>{buttonDetails.text}</Link>
    )
  }
}
