'use client'

import React, { useState, useEffect } from "react"
import Script from 'next/script'
// function
import { splitWuffooForm } from '@/function/embed-codes'

export function GetAQuoteFormPage({ settings, className }) {
  useEffect(() => {
    const addScript = () => {
      const fluxScript = splitWuffooForm(settings.fields.embedScript, '<script>')
      const script = document.createElement('script');
      script.innerHTML = `${fluxScript.scriptCode}`;
      
      document.getElementById('get-a-quote-form').appendChild(script);
    }
    
    addScript()
  }, [settings.fields.embedScript])

  return (
    <div id="get-a-quote-form" className={className}>
      <div className="relative w-full bg-[#F8F4F6] lg:max-w-2xl">
        <div className="pt-6">
          <div id="nutshell-form-VdclKw"></div>
          {
            _.get(settings, 'fields.sourceScript') && (
              <Script async src={`${_.get(settings, 'fields.sourceScript')}?v=${Date.now()}`}/>
            )
          }
        </div>
        <p className="mt-4 abosulute text-xs text-center bg-gray-100 border p-0 py-7 m-0">
          We care about protecting your data. Read our <strong><a href="/privacy-policy" target="_blank">Privacy Policy.</a></strong>
        </p>
      </div>
    </div>
  )
}