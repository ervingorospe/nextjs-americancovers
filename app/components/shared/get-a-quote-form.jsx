'use client'

import React, { useState, useEffect } from "react"
import Script from 'next/script'
// function
import { splitWuffooForm } from '@/function/embed-codes'

export function GetAQuoteForm({ settings, className }) {
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
      <div className="pt-6 px-4">
        <div id="nutshell-form-VdclKw"></div>
        {
          _.get(settings, 'fields.sourceScript') && (
            <Script async src={`${_.get(settings, 'fields.sourceScript')}?v=${Date.now()}`}/>
          )
        }
      </div>
      <p className="absolute bottom-0 inset-x-0 mt-4 text-xs text-center bg-gray-100 border p-0 py-7 m-0">
        We care about protecting your data. Read our <strong><a href="/privacy-policy" target="_blank">Privacy Policy.</a></strong>
      </p>
    </div>
  )
}