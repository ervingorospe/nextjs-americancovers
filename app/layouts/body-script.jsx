import React from 'react'
import _ from 'lodash'
import Script from 'next/script'
// contants
import { fluxIds } from '@/lib/constants'
// api
import { getItem } from '@/api/collection'

export async function BodyScript() {
  const settings = _.first(await getItem(fluxIds.SETTINGS))

  if (_.get(settings, 'fields.bodyScripts')) {
    const scriptEmbedCode = _.get(settings, 'fields.bodyScripts')
    const srcRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gm;
    const matches  = [...scriptEmbedCode.matchAll(srcRegex)];
    let bodyScript;

    matches.forEach((match, index) => {
      const scriptContent = match[1].trim();
      bodyScript = scriptContent
    });

    return (
      <Script
        id="body-script"
        dangerouslySetInnerHTML={{
          __html: `${bodyScript}`,
        }}
      />
    )
  }
}
