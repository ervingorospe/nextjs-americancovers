import React from 'react'
import _ from 'lodash'
// contants
import { navigationType, fluxIds } from '@/lib/constants'
// components
import { Header } from '@/components/layouts'
// function
import { getNavigation } from '@/function/navigation'
// api
import { generalInfo, getCollectionItems, getItem } from '@/api/collection'

export async function HeaderContainer() {
  const navigation = await getNavigation(navigationType.INFO)
  const general = await generalInfo()
  const actionButtons = await getCollectionItems(fluxIds.ACTION_BUTTONS)
  const settings = _.first(await getItem(fluxIds.SETTINGS))

  return (
    <>
      <Header 
        navigation={navigation} 
        general={general}
        actionButtons={_.filter(actionButtons, data => _.get(data, 'fields.active'))}
        settings={settings}
      />
    </>
  )
}
