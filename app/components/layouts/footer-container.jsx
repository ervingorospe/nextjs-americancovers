import React from 'react'
import _ from 'lodash'
import { getNavigation } from '@/function/navigation'
// component
import { CallToAction, Footer } from '@/components/layouts'
// contants
import { navigationType, fluxIds } from '@/lib/constants'
// api
import { generalInfo, getCollectionItems, getItem, getCollection } from '@/api/collection'

export async function FooterContainer() {
  const navigation = await getNavigation(navigationType.INFO)
  const general = await generalInfo()
  const collection = await getCollectionItems(fluxIds.CALL_TO_ACTION_SECTIONS)
  const socialMedia = await getCollectionItems(fluxIds.SOCIAL_MEDIA)
  const settings = _.first(await getItem(fluxIds.SETTINGS))
  const location = await getCollection(fluxIds.LOCATION)
  const locationInfo = await getCollectionItems(fluxIds.FOOTER_LOCATION_INFO)
  const footerLogos = await getCollection(fluxIds.FOOTER_LOGOS)

  return (
    <section className="overflow-hidden relative">
      <CallToAction collection={collection} navigation={navigation} settings={settings}/>
      <Footer 
        navigation={navigation} 
        socialMedia={_.filter(socialMedia, res => res.fields.active)} 
        location={_.filter(location[0].items, res => res.fields.active)}
        locationInfo={_.filter(locationInfo, res => res.fields.active)}
        general={general}
        logos={_.filter(footerLogos[0].items, res => res.fields.active)}
      />
    </section>
  )
}
