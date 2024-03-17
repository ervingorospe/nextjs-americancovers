import _ from 'lodash'

const formatRouteName = (name) => {
  const routeName = name.replaceAll('/', '').toLowerCase();

  return routeName.trim().replaceAll(' ', '-').toLowerCase();;
}

const sectionsComponent = (item) => {
  if (!_.get(item, 'fields.active')) {
    return null
  }

  if (!_.get(item, 'fields.customType') && !_.get(item, 'fields.type')) {
    return 'default'
  }

  if (_.get(item, 'fields.customType')) {
    return _.get(item, 'fields.customType').toLowerCase()
  }

  return _.get(item, 'fields.type').toLowerCase()
}

const formatComponentName = (name) => {
  const splitName = name.split(/\W+/);

  splitName.map((arr, index) => {
    return splitName[index] = arr.charAt(0).toUpperCase() + arr.slice(1)
  })

  return `${splitName.join("").replaceAll("[^A-Za-z0-9]","")}`
}

const capitalizeFirstLetter = (name) => {
  if (typeof name === 'string')
    return name.charAt(0).toUpperCase() + name.slice(1)
}

const lowerCaseFirstLetter = (name) => {
  if (typeof name === 'string')
    return name.charAt(0).toLowerCase() + name.slice(1)
}

const formatPhone = (number) => {
  return number.replace(/[^A-Z0-9]/gi, '')
}

export {
  formatRouteName,
  sectionsComponent,
  formatComponentName,
  capitalizeFirstLetter,
  lowerCaseFirstLetter,
  formatPhone
}
