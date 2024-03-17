const getTiktokSrc = (embedCode) => {
  const splitEmbedCode = embedCode.split('"')
  return {
    scriptCode: splitEmbedCode[1],
    divCode: splitEmbedCode[3]
  }
}

const splitWuffooForm = (embedCode, splitBy = '<script type="text/javascript">') => {
  const splitEmbedCode = embedCode.split(splitBy)
  const splitScriptCode = splitEmbedCode[1].split('</script>')

  return {
    divElement: splitEmbedCode[0],
    scriptCode: splitScriptCode[0]
  }
}

const getScriptUrl = (scriptEmbedCode) => {
  scriptEmbedCode = scriptEmbedCode ? scriptEmbedCode : ''
  const srcRegex = /src=["'](.*?)["']/

  const match = scriptEmbedCode.match(srcRegex)
  const srcUrl = match ? match[1] : ''

  return srcUrl
}

const getFbScript = (scriptEmbedCode) => {
  scriptEmbedCode = scriptEmbedCode ? scriptEmbedCode : ''
  const metaNameRegex = /name=["'](.*?)["']/
  const matchMetaName = scriptEmbedCode.match(metaNameRegex)
  const metaName = matchMetaName ? matchMetaName[1] : ''

  const metaContentRegex = /content=["'](.*?)["']/
  const matchMetaContent = scriptEmbedCode.match(metaContentRegex)
  const metaContent = matchMetaContent ? matchMetaContent[1] : ''

  const fbNoScriptRegex = /noscript\b[^>]*>([\s\S]*?)<\/noscript>/gm;
  const fbNoScriptMatches  = [...scriptEmbedCode.matchAll(fbNoScriptRegex)];
  let fbNoScript;

  fbNoScriptMatches.forEach((match, index) => {
    const scriptContent = match[1].trim();
    fbNoScript = scriptContent
  });

  const fbImgSrcRegex = /src=["'](.*?)["']/
  const fbImgSrcMatch = fbNoScript.match(fbImgSrcRegex)
  const fbImgSrc = fbImgSrcMatch ? fbImgSrcMatch[1] : ''
  
  return {
    metaName,
    metaContent,
    fbImgSrc
  }
}

const rocketScript = (scriptEmbedCode) => {
  scriptEmbedCode = scriptEmbedCode ? scriptEmbedCode : ''
  const srcRegex = /rocketlazyloadscript=["'](.*?)["']/

  const match = scriptEmbedCode.match(srcRegex)
  const srcUrl = match ? match[1] : ''

  return srcUrl
}


export {
  getTiktokSrc,
  splitWuffooForm,
  getScriptUrl,
  getFbScript,
  rocketScript
}