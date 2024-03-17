'use client'

import { Fragment} from 'react'
import Link from 'next/link'
// tailwind
import { Popover, Transition } from '@headlessui/react'
// function
import { getButtonDetails } from '@/function/navigation'

const ButtonLink = ({ data, className, navigation, close }) => {
  const buttonDetails = getButtonDetails({ data, navigation })
  
  return (
    <span onClick={() => close()}>
      <Link href={buttonDetails.url} className={className} target={buttonDetails.target}>
        {buttonDetails.text}
      </Link>
    </span>
  )
}

const NavButtons = ({ actionButtons, navigation, close, mobile = false }) => {
  return (
    actionButtons?.map((item, i) => {
      if (_.get(item, 'fields.buttonType') === 'phone-text') {
        const formatPhone = _.get(item, 'fields.button.text').replace(/[^A-Z0-9]/gi, '')

        return (
          <Link href={`tel:${formatPhone}`} className={`group text-link flex items-center space-x-2 justify-end ${_.get(item, 'fields.buttonType')}`} key={item.name}>
            <div><i className="h-4 w-4 lg:h-6 lg:w-6 fa-sharp fa-regular fa-phone ml-2"></i></div> 
            <p className="group-hover:text-link-hover">{_.get(item, 'fields.button.text')}</p>
          </Link>
        )
      }

      return (
        <ButtonLink
          className={`${mobile ? 'nav-mobile-button' : _.get(item, 'fields.buttonType')}`}
          navigation={navigation}
          close={close}
          data={{
            button: {
              ..._.get(item, 'fields.button'),
              text: _.get(item, 'fields.button') ? _.get(item, 'fields.button.text') : _.get(item, 'name'),
            },
            buttonPageLink: _.get(item, 'fields.buttonPageLink'),
          }}
          key={item.name}
        />
      )
    })
  )
}

const NavLinks = ({ className, navigation, close, mobile }) => {
  const filteredNav = _.filter(navigation, data => _.get(data, 'fields.showInNavigation'))
  const parentLink = _.filter(filteredNav, data => data.parentId === 0)

  return (
    <nav className={className.navContainer}>
      {
        parentLink?.map(item => {
          const subNav = _.filter(filteredNav, data => data.parentId === item.id);
          
          if (subNav.length === 0) {
            return (
              <ButtonLink
                close={close}
                className={className.buttonLink}
                navigation={navigation}
                data={{
                  button: {
                    url: _.get(item, 'fields.nav.url') ? _.get(item, 'fields.nav.url') : item.slug,
                    text: item.name,
                    target: _.get(item, 'fields.nav.target'),
                  },
                  buttonPageLink: _.get(item, 'fields.pageLink'),
                }}
                key={item.name}
              />
            )
          }

          return (
            <SubNav
              closeMenu={close}
              navigation={navigation}
              item={item}
              subNav={_.filter(subNav, data => data.fields.showInNavigation)}
              className={className}
              key={item.name}
              mobile={mobile}
            />
          )
        })
      }
    </nav>
  )
}

const SubNav = ({ navigation, className, item, subNav, mobile, closeMenu }) => (
  <Popover
      className="group relative"
    >
    {({ open }) => (
      <>
        <Popover.Button styles={{ border: 'none !important;' }} className="cursor-pointer">
          <div className={className.buttonLink}>
            <span>{item.name}</span>
            <svg
              className={`${className.icon.link} transition-transform ${open ? `rotate-180 ${className.icon.hover}` : ''}`}
              x-description="Heroicon name: solid/chevron-down"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
        </Popover.Button>

        <Transition
          as={Fragment}
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Popover.Panel
            className={className.subNav.popoverPanel}
            static
          >
            {({ close }) => (
              <div className={className.subNav.container}>
                <div className={className.subNav.subContainer}>
                  {
                    subNav?.map((subItem, i) => {
                      return (
                        <div key={subItem.id} onClick={ !mobile ? () => close() : () => closeMenu() }>
                          <SubLink 
                            mobile={mobile}
                            data={{
                              icon: _.get(subItem, 'fields.svgIcon'),
                              button: {
                                url: _.get(subItem, 'fields.nav.url') ? _.get(subItem, 'fields.nav.url') : subItem.slug,
                                text: subItem.name,
                                target: _.get(subItem, 'fields.nav.target'),
                              },
                              buttonPageLink: _.get(subItem, 'fields.pageLink'),
                            }}
                            className={{
                              container: className.subNav.subLinkContainer,
                              text: className.subNav.subLink
                            }}
                            navigation={navigation}
                          />
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            )}
          </Popover.Panel>
        </Transition>
      </>
    )}
  </Popover>
)

// custom
const SubLink = ({ data, navigation, className, mobile }) => {
  const buttonDetails = getButtonDetails({ data, navigation })

  return (
    <Link href={buttonDetails.url} className={className.container} target={buttonDetails.target}>
      {
        !mobile ? (
          <div className="ml-3 flex items-center gap-3 transition-all">
            <p className={className.text}>
              {buttonDetails.text}
            </p>
            <svg
              className="fill-gray-400 transition-transform group-hover/child-nav:translate-x-2 group-hover/child-nav:fill-white"
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="long-arrow-right"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              data-fa-i2svg=""
              height="12"
            >
              <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z"></path>
            </svg>
          </div>
        ) :
        (
          <div className={className.text}>
            {buttonDetails.text}
          </div>
        )
      }
    </Link>
  )
}

export {
  NavButtons,
  NavLinks,
  ButtonLink
}