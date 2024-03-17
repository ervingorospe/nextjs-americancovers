'use client'

import React, { useState, useEffect } from 'react'
import Script from 'next/script'
// functions
import { splitWuffooForm } from '@/function/embed-codes'

export function FormWufoo({ data, className, titleText }) {
  const { fields } = data

  const [wufooForm, setWufooForm] = useState({})

  useEffect(() => {
    if (fields.embed)
      setWufooForm(splitWuffooForm(fields.embed))
  }, [fields.embed])

  return (
    <div className={className.container}>
      {
        fields.embed && (
          <>
            <div className={className.div}>
              <div className={className.form}>
                {
                  titleText && (
                    <p className="text-center font-bold text-4xl p-4 text-gray-600">{titleText}</p>
                  )
                }
                
                <div className="w-full">
                  <div dangerouslySetInnerHTML={{__html: wufooForm.divElement}}/>
                  <Script
                    id="form-script"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                      __html: eval(`${wufooForm.scriptCode}`),
                    }}
                  />
                </div>
              </div>
              
              <p className="abosulute text-xs text-center bg-gray-100 border p-0 py-7 m-0">
                We care about protecting your data. Read our <strong><a href="/privacy-policy" target="_blank">Privacy Policy.</a></strong>
              </p>
            </div>
          </>
        )
      }
    </div>
  )
}
