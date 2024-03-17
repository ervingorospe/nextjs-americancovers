import _ from 'lodash'
import { cache } from 'react';
// api
import { getCollectionItems, getItem } from '@/api/collection'
import { getFacebookFeed } from '@/api/social-media'
// contants
import { fluxIds } from '@/lib/constants'

const getBlogAuthors = cache(async () => {
  return await getCollectionItems(`${fluxIds.BLOG_AUTHORS}`)
})

const facebookFeed = cache(async (id, limit, token) => {
  return await getFacebookFeed(id, limit, token)
})

const pageDetails = cache(async (id) => {
  const collection = await getItem(id)

  const { sectionItems } = _.first(collection)
  const activeSections = _.filter(sectionItems, data => _.get(data, 'fields.active') === '1')

  return {
    activeSections
  }
})


export {
  pageDetails,
  facebookFeed,
  getBlogAuthors
}