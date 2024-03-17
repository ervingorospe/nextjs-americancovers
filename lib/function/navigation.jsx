import { cache } from 'react';
import _ from 'lodash'
// function
import { formatRouteName } from './formatting'
// api
import { getCollectionItems, getItem } from '@/api/collection'
// contants
import { fluxIds, navigationType } from '@/lib/constants'

const getButtonDetails = ({ data, navigation }) => {
  let buttonDetails = {
    ..._.get(data, 'button'),
    url: _.get(data, 'button.url') ?  `${_.get(data, 'button.url').includes("https://") ? '' : '/'}${_.get(data, 'button.url')}` : '/'
  }

  if (data.buttonPageLink) {
    const url = _.find(navigation, path => path.id === data.buttonPageLink)

    buttonDetails = {
      ..._.get(data, 'button'),
      url: _.get(url, 'slug') ? `/${_.get(url, 'slug')}` : '/'
    }
  }

  return buttonDetails
}

const getSlug = (data) => {
  return _.get(data, 'fields.slug') ? _.get(data, 'fields.slug') : formatRouteName(data.name)
}

const getNavigation = cache(async (type) => {
  const navigations = await getCollectionItems(fluxIds.NAVIGATION)
  const standingPages = await getCollectionItems(fluxIds.FREE_STANDING_PAGES)
  const legalNavigationPages = await getCollectionItems(fluxIds.LEGAL_NAVIGATION)

  // standing pages loop
  const standingPagesPaths = standingPages?.map(data => {
    const slug = getSlug(data)

    if (type === navigationType.ROUTES) {
      return {
        slug: [`${slug}`]
      }
    }
    
    return {
      ...data,
      type: 'standing page',
      slug
    }
  })

  // legal navigation pages loop
  const legalNavigationPaths = legalNavigationPages?.map(data => {
    const slug = getSlug(data)

    if (type === navigationType.ROUTES) {
      return {
        slug: [`${slug}`]
      }
    }

    return {
      ...data,
      type: 'legal navigation page',
      slug
    }
  })

  // navigations
  const paths = await Promise.all(navigations?.map(async data => {
    const parentSlug = getSlug(data)

    if (data.parentId !== 0) {
      const items = await getItem(data.parentId)
      const parentRoute = formatRouteName(_.get(items[0], 'fields.slug') ? _.get(items[0], 'fields.slug') : _.get(items[0], 'name'))

      if (_.get(items[0], 'parentId') !== 0) {
        const mainParent = await getItem(_.get(items[0], 'parentId'))
        const mainParentRoute = formatRouteName(_.get(mainParent[0], 'fields.slug') ? _.get(mainParent[0], 'fields.slug') : _.get(mainParent[0], 'name'))

        if (type === navigationType.ROUTES) {
          return {
            slug: [`${mainParentRoute}`,`${parentRoute}`,`${parentSlug}`]
          }
        }

        return {
          ...data,
          type: 'navigation page',
          slug: `${mainParentRoute}/${parentRoute}/${parentSlug}`,
        }
      }

      if (type === navigationType.ROUTES) {
        return {
          slug: [`${parentRoute}`,`${parentSlug}`]
        }
      }

      return {
        ...data,
        slug: `${parentRoute}/${parentSlug}`,
      }
    }
    
    if (type === navigationType.ROUTES) {
      return {
        slug: [`${parentSlug}`]
      }
    }

    return {
      ...data,
      slug: parentSlug
    }
  }))

  return [...paths, ...standingPagesPaths, ...legalNavigationPaths]
})

const checkRoute = cache(async (routeName) => {
  if (routeName === '/') {
    routeName = 'home'
  }

  const paths = await getNavigation(navigationType.INFO)
  return _.find(paths, data => data.slug == routeName)
})

// for blogs
const getBlogs = cache(async(type) => {
  const temp = await getCollectionItems(fluxIds.BLOGS)
  const blogs = _.filter(temp, data => data.fields.active)

  const paths = blogs?.map(blog => {
    const removeChar = blog.name.replace(/[^a-zA-Z0-9 ]/g, ' ')
    const slug = formatRouteName(removeChar.replace(/  +/g, ' '))

    if (type === navigationType.ROUTES) {
      return {
        slug
      }
    }
    
    return {
      slug,
      ...blog
    }
  })
  
  return paths
})

const checkBlog = cache(async (routeName) => {
  if (routeName === '/') {
    return
  }
  
  const paths = await getBlogs(navigationType.INFO)

  return _.find(paths, data => data.slug == routeName)
})

const nextAndPrevBlog = cache(async (routeName) => {
  const paths = await getBlogs(navigationType.INFO)

  return {
    prevIndex: paths[_.findIndex(paths, { 'slug': routeName }) - 1] ? paths[_.findIndex(paths, { 'slug': routeName }) - 1].slug : '',
    nextIndex: paths[_.findIndex(paths, { 'slug': routeName }) + 1] ? paths[_.findIndex(paths, { 'slug': routeName }) + 1].slug : ''
  }
})

const checkProfile = cache(async (routeName) => {
  if (routeName === '/') {
    return
  }

  const paths = await getProfileDetails()
  return _.find(paths, data => data.slug == routeName)
})


// for puppies, for southern cross
const getPuppies = cache(async(type) => {
  const temp = await getCollectionItems(fluxIds.PUPPIES)
  const puppies = _.filter(temp, data => data.fields.active)

  const paths = puppies?.map(puppy => {
    const removeChar = puppy.name.replace(/[^a-zA-Z0-9 ]/g, ' ')
    const slug = formatRouteName(removeChar.replace(/  +/g, ' '))

    if (type === navigationType.ROUTES) {
      return {
        slug
      }
    }
    
    return {
      ...puppy,
      slug: `/${formatRouteName(puppy.name)}`,
      metaData: {
        metaDescription: 'An Australian Labradoodle breeder with puppies for sale and puppy adoption to families in Louisiana, Mississippi, and Texas.',
        ogImage: {
          imageUrl: 'https://fluxconsole.com/files/image/232853'
        }
      }
    }
  })

  return paths
})

const checkPuppy = cache(async (routeName) => {
  if (routeName === '/') {
    return
  }
  
  const paths = await getPuppies(navigationType.INFO)

  return _.find(paths, data => data.slug == routeName)
})


export {
  checkRoute,
  getNavigation,
  getBlogs,
  checkBlog,
  nextAndPrevBlog,
  checkProfile,
  getPuppies,
  checkPuppy,
  getButtonDetails
}