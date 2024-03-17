// const url = process.env.REACT_APP_NEXT_API
const url = process.env.REACT_APP_FLUX_API

const getCollection = async (ids) => {
  try {
    const { collections } = await (await fetch(`${url}?collection=${ids}&fields=collections{items{name,id,parentId,sectionCollection,fields,file}}`)).json()

    return collections
  } catch (error) {

    return error;
  }
}

const getCollectionItems = async (ids) => {
  try {
    const { collections } = await (await fetch(`${url}?collection=${ids}&fields=collections{items{name,id,parentId,sectionCollection,fields,file}}`)).json()

    return collections[0].items
  } catch (error) {

    return error;
  }
}

const generalInfo = async () => {
  try {
    return await (await fetch(`${url}?fields=id,disabled,name,url,cleanUrl,devUrl,organizationName,organizationLegal,analyticsId,facebookId,defaultMetaTitle,cssUrls,siteColors,typekitId`)).json()
  } catch (error) {

    return error;
  }
}

const getItem = async (ids) => {
  try {
    const { items } = await (await fetch(`${url}?item=${ids}&fields=items{id,parentId,name,fields,file,sectionItems}}`)).json()

    return items
  } catch (error) {

    return error;
  }
}

export {
  getCollection,
  getCollectionItems,
  generalInfo,
  getItem
}