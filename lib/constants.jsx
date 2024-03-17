const navigationType = {
  ROUTES: 'STATIC ROUTES',
  INFO: 'NAVIGATION INFO'
}

const fluxIds = {
  CALL_TO_ACTION_SECTIONS: '28318',
  FOOTER_LOCATION_INFO: '28291',
  SOCIAL_MEDIA: '28293',
  LOCATION: '28290',
  SETTINGS: '162220',
  FOOTER_LOGOS: '28292',
  BLOG_AUTHORS: '',
  NAVIGATION: '28319',
  ACTION_BUTTONS: '28295',
  FREE_STANDING_PAGES: '28321',
  BLOGS: '',
  LEGAL_NAVIGATION: '28320',
  HOMEPAGE: '162219'
}

const defaultImageAlt = "American Covers Inc."
const defaultLocationName = "American Covers Inc."

const defaultMetadata = {
  title: 'American Covers - Fabric Shelters Rental and Shipping Container Covers',
  description: 'American Covers, Inc. provides quality Industrial Construction Fabric Shelters. Purchase and rentals available.'
}

const headerLogos = {
  LIGHT: "https://fluxconsole.com/files/item/1294/162249/logo-white.svg",
  DARK: "https://fluxconsole.com/files/item/1294/162250/logo.svg",
  FOOTER: "https://fluxconsole.com/files/item/1294/162248/footer-logo.svg"
}

const defaultSectionStyles = {
  textAlign: 'text-left',
  width: 'max-w-screen-xl',
  bgColor: 'transparent',
  title: {
    size: 'default',
    style: 'default'
  },
  subtitle: {
    size: 'default-subtitle',
    style: 'default-subtitle'
  },
  bodySize: 'default',
  extraBodySize: 'default',
  buttonStyle: 'button-primary',
  buttonStyle2: 'button-secondary',
  image: {
    figure: 'overflow-hidden ',
    image: 'h-full w-full object-cover object-center',
    rounded: '',
    shadow: '',
    container: ""
  },
  margin: {
    title: "",
    subtitle: "mt-4",
    body: "mt-6",
    extraBody: "mt-4"
  },
  buttonContainer: "mt-6 grid space-y-2 sm:space-y-0 space-x-0 sm:flex sm:space-x-4"
}

const defaultHeroStyles = {
  textAlign: 'text-left',
  width: 'max-w-screen-2xl',
  bgColor: 'secondary-700',
  title: {
    size: 'hero-title',
    style: 'hero-title'
  },
  subtitle: {
    size: 'hero-subtitle',
    style: 'hero-subtitle'
  },
  bodySize: 'hero',
  extraBodySize: 'hero',
  buttonStyle: 'hero',
  buttonStyle2: 'hero-secondary-button',
  image: {
    figure: 'overflow-hidden aspect-w-16 aspect-h-9',
    image: 'h-full w-full object-cover object-center',
    rounded: 'rounded-2xl',
    shadow: '',
    container: ""
  },
  margin: {
    title: "",
    subtitle: "mt-4",
    body: "mt-6",
    extraBody: "mt-1"
  },
  buttonContainer: "mt-8 grid space-y-2 sm:space-y-0 space-x-0 sm:flex sm:space-x-4"
}

const defaultCallToActionStyles = {
  textAlign: 'text-center',
  width: 'max-w-screen-md',
  bgColor: 'transparent',
  title: {
    size: 'default',
    style: 'default'
  },
  subtitle: {
    size: 'default',
    style: 'default'
  },
  bodySize: 'prose prose-lg prose-primary-invert md:prose-xl',
  extraBodySize: 'prose prose-lg prose-primary-invert',
  buttonStyle: 'button-primary',
  buttonStyle2: 'button-primary',
}

export {
  fluxIds,
  navigationType,
  defaultImageAlt,
  headerLogos,
  defaultSectionStyles,
  defaultHeroStyles,
  defaultCallToActionStyles,
  defaultLocationName,
  defaultMetadata
}