'use client'

import Cookies from 'js-cookie'
import React, { useState, useEffect } from 'react'

export function ShowCookie() {
  const [showCookie, setShowCookie] = useState(false)

  useEffect(() => {
    setShowCookie(Cookies.get('wpcc') !== 'dismissed')
  }, [])

  const hideCookie = () => {
    Cookies.set('wpcc', 'dismissed', { expires: 0.3 })
    setShowCookie(false)
  }

  if (showCookie) {
    return (
      <div className="bg-white border font-medium fixed z-100 bottom-0 sm:left-5 sm:bottom-5 p-7">
        <div className="max-w-[280px]">
          <span className="">This website uses cookies to ensure you get the best experience on our website. </span>
          <a className="underline text-sm md:text-base inline-flex items-center justify-center group text-red-700 hover:text-red-800" href="/cookie-policy" rel="noreferrer" target="_blank"> View Cookie Policy</a>
          <button onClick={() => hideCookie()} className="mt-4 button inline-flex w-full bg-primary-700 hover:bg-primary-800 text-white hover:text-gray-200">
            Got it!
          </button>
        </div>
      </div>
    )
  }
}