/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  env: {
    REACT_APP_FLUX_API: process.env.REACT_APP_FLUX_API
  }
}

module.exports = nextConfig
