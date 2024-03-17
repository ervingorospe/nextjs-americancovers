/* eslint-disable @next/next/no-img-element */
'use client'

import React, { useState, useEffect, Fragment} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import _ from 'lodash'
// tailwind
import { Popover, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
// constants
import { headerLogos } from '@/lib/constants'
import { Container } from '@/app/layouts'
// functions
import { NavLinks, NavButtons, HeaderAlert } from '@/components/layouts'

export function Header({ navigation, general, actionButtons, settings }) {
  const [headerClass, setHeaderClass] = useState('light-theme')

  useEffect(() => {
    window.onscroll = async () => {
      if(window.pageYOffset === 0) {
        setHeaderClass('light-theme')
      }

      if(window.pageYOffset > 0) {
        setHeaderClass('light-theme')
      }
    }
  }, [])

  return (
    <header className={`z-100 w-full fixed top-0 bg-header-color ${headerClass} transition ease-in-out duration-300 bg-white shadow-md`}>
      {
        _.get(settings, 'fields.showAlertBanner') && <HeaderAlert className={headerClass.alert} settings={settings}/>
      }
      <Popover>
        {({ open }) => (
          <>
            {/* start of desktop */}
            <Container className="container flex max-w-screen-2xl justify-between py-4">
              <Link href="/">
                <Image 
                  className="h-12 w-auto md:h-12 xl:h-20" 
                  src={headerClass === "dark-theme" ? headerLogos.LIGHT : headerLogos.DARK }
                  alt={_.get(general, 'organizationName')}
                  height={1000}
                  width={1000}
                  priority={true}
                />
              </Link>

              <div className="flex items-center justify-end xl:flex-col xl:items-end xl:justify-center">
                <div className="hidden sm:flex items-center justify-end space-x-4 py-2">
                  <NavButtons 
                    actionButtons={actionButtons} 
                    navigation={navigation}
                  />
                </div>

                <NavLinks
                  navigation={navigation}
                  className={{
                    navContainer: "hidden space-x-8 xl:flex items-center justify-end mt-2",
                    buttonLink: "flex items-center text-lg font-semibold uppercase tracking-wide text-link hover:text-link-hover",
                    icon: {
                      link: "ml-2 h-5 w-5 fill-link group-hover:fill-link-hover",
                      hover: "fill-link-hover"
                    },
                    subNav: {
                      popoverPanel: "absolute top-full z-10 flex w-screen max-w-xs flex-col pt-3 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2",
                      container: "relative overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-gray-900 ring-opacity-15 overflow-y-auto max-h-[80vh]",
                      subContainer: "relative grid",
                      subLinkContainer: "group/child-nav flex items-center border-b border-gray-200 border-opacity-50 px-5 pt-6 pb-4 hover:bg-secondary-700",
                      subLink: "group-hover/child-nav:text-white font-heading text-sm font-semibold tracking-wide 2xl:text-base"
                    }
                  }}
                  close={() => {}}
                  mobile={false}
                />

                <div className="-my-2 -mr-2 ml-6 xl:hidden">
                  <Popover.Button className="text-link inline-flex items-center justify-center rounded-md p-2 text-breadcrumps hover:link-hover focus:outline-none focus:ring-2 focus:ring-inset focus:ring-secondary-600">
                    <span className="sr-only">Open main menu</span>
                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
            </Container>
            {/* end of desktop */}

            {/* start of mobile */}
            <Transition
              as={Fragment}
              enter="duration-150 ease-out"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="duration-100 ease-in"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Popover.Panel
                focus
                className="absolute inset-x-0 top-0 z-10 origin-top-right transform p-2 transition xl:hidden"
              >
                {({ close }) => (
                  <div className="overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5">
                    <div className="flex items-center justify-between px-5 pt-4">
                      <Link href="/">
                        <Image
                          src={headerLogos.DARK}
                          alt={_.get(general, 'organizationName')}
                          height={1000}
                          width={1000}
                          className="h-14 w-auto"
                        />
                      </Link>
                      <div className="-mr-2">
                        <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                          <span className="sr-only">Close main menu</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </Popover.Button>
                      </div>
                    </div>
                    <div className="py-4 space-y-1 px-2 pt-2 pb-3 max-h-[70vh] overflow-y-scroll">
                      <NavLinks 
                        navigation={navigation}
                        className={{
                          navContainer: "space-y-1 px-2 pt-2 pb-3",
                          buttonLink: "flex items-center rounded-md px-3 py-3 text-base font-medium text-gray-900 hover:text-secondary-400",
                          icon: {
                            link: "ml-2 h-5 w-5 text-secondary-900 group-hover:text-secondary-700",
                            hover: "text-secondary-700"
                          },
                          subNav: {
                            popoverPanel: "w-screen max-w-xs flex-col",
                            container: "relative overflow-y-auto",
                            subContainer: "ml-2 relative grid",
                            subLinkContainer: "grid w-full text-left",
                            subLink: "group/child-nav block text-sm font-medium text-gray-700 p-4 hover:text-secondary-400 border-b border-gray-200 border-opacity-50"
                          }
                        }}
                        close={() => close()}
                        mobile={true}
                      />
                    </div>
                    <div className="grid w-full border">
                      <NavButtons 
                        close={() => close()} 
                        actionButtons={_.filter(actionButtons, data => _.get(data, 'fields.isMobileFooterButton'))} 
                        navigation={navigation} 
                        mobile={true}
                      />
                    </div>
                  </div>
                )}
              </Popover.Panel>
            </Transition>
            {/* end of mobile */}
          </>
        )}
      </Popover>
    </header>
  )
}