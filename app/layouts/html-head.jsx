/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-sync-scripts */
import React from 'react'
import _ from 'lodash'
// contants
import { fluxIds } from '@/lib/constants'
// api
import { generalInfo, getItem } from '@/api/collection'

export async function HtmlHead() {
  const settings = _.first(await getItem(fluxIds.SETTINGS))
  const general = await generalInfo()

  return (
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      <meta name="msapplication-TileColor" content="#ffffff"/>
      <meta name="theme-color" content="#ffffff"></meta>
      <meta name="google-site-verification" content="8dKP2h4UHoDKuGEiZ9Y93sKwhp5huTiQb0eYK9i9gFs" />
      <meta property="og:type" content="website"/>
      <meta property="og:locale" content="en_US"/>

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
      <link href="https://fonts.googleapis.com/css2?family=Roboto+Serif:ital,opsz,wght@0,8..144,300;0,8..144,400;0,8..144,500;0,8..144,600;0,8..144,700;0,8..144,800;1,8..144,300;1,8..144,400;1,8..144,500;1,8..144,600;1,8..144,700;1,8..144,800&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap" rel="stylesheet" />

      <link rel="manifest" href="/manifest.json" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
      <link rel="manifest" href="/site.webmanifest"/>
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5"/>
      <script src="https://kit.fontawesome.com/39c0b847b1.js" crossOrigin="anonymous" async></script>
      <script src="https://cdn.jsdelivr.net/gh/modiphy/disabled@latest/dist/index.js"></script>
      <script type="text/javascript" src={`https://www.googletagmanager.com/gtag/js?id=${_.get(general, 'analyticsId')}`} async/>
      
      
      <script
        id="gtag-init"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${_.get(general, 'analyticsId')}', {
              page_path: window.location.pathname,
            });
            gtag('config', '${_.get(settings, 'fields.analyticsId')}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />

      <script
        dangerouslySetInnerHTML={{
          __html: `${_.get(settings, 'fields.headScripts')}`,
        }}
      />

      <noscript>
        <img height="1" width="1" className="hidden" src="https://www.facebook.com/tr?id=859107788521280&ev=PageView&noscript=1"/>
      </noscript>
    </head>
  )
}
