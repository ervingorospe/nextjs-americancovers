/** @type {import('next-sitemap').IConfig} */

const config = {
  siteUrl: 'https://www.southerncrosslabradoodles.com/',
  generateRobotsTxt: true, // (optional)
  changefreq: 'daily',
  generateIndexSitemap: false,
  exclude: ['/home', '/puppies', '/resources', '/our-dogs', '/favicon.ico']
  // ...other options
}

module.exports = config