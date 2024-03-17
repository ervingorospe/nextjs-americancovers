/* eslint-disable react/no-unescaped-entities */
import _ from 'lodash'
import Link from 'next/link'
// function
import { getNavigation, checkRoute } from '@/function/navigation'
// components
import { DefaultHero } from '@/components/sections'
// api
import { generalInfo } from '@/api/collection'

// contants
const navigationType = {
  ROUTES: 'STATIC ROUTES',
  INFO: 'NAVIGATION INFO'
}

export async function generateMetadata({ params }) {
  const general = await generalInfo()
  const path = await checkRoute(`/`)
  const { fields } = path

  const metaTitle = _.get(fields, 'metaTitle') ? _.get(fields, 'metaTitle') : _.get(general, 'defaultMetaTitle')

  return {
    title: `404 - Page Not Found - ${metaTitle}`,
    description: metaTitle,
    openGraph: {
      title: `404 - Page Not Found - ${metaTitle}`,
      description: metaTitle,
      images: [],
      url: `${_.get(general, 'url')}404`,
      site_name: _.get(general, 'organizationName')
    },
    alternates: {
      canonical: `${_.get(general, 'url')}404`,
    },
  };
}

export default async function NotFound({ params }) {
  const message = "We're sorry, this page does not exist but you can"

  return (
    <>
      <div className="w-full h-full overflow-hidden relative">
        <div className="pb-12 pt-56 md:pt-64 lg:pt-56 xl:pt-56 container relative z-1 mt-3">
          <div className="mx-auto max-w-prose xl:text-lg text-center">
            <h1 className="mt-0 text-secondary-700 text-5xl md:text-6xl font-heading font-bold">404 - Page Not Found</h1>
            <h2 className="mt-0 text-4xl md:text-5xl font-heading font-bold">Wait a second...</h2>
            <div className="mt-6 text-base text-primary-700 lg:text-lg">
              {message} <Link href="/" className="font-bold text-primary-700 hover:underline">explore the rest of our site.</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export async function generateStaticParams() {
  return await getNavigation(navigationType.ROUTES)
}
