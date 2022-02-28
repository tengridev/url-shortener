/** @type {import('next').NextConfig} */
const { parsed: localEnv } = require('dotenv').config()
const nextTranslate = require('next-translate')
const withPWA = require('next-pwa')

const nextConfig = {
  async redirects() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/sitemap/sitemap_index.xml',
        permanent: true
      }
    ]
  },
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    register: true,
    sw: 'service-worker.js'
  },
  publicRuntimeConfig: {
    SITE_URL: process.env.SITE_URL
      ? process.env.SITE_URL
      : localEnv && localEnv.SITE_URL,
    API_URL: process.env.API_URL
      ? process.env.API_URL
      : localEnv && localEnv.API_URL
  },
  ...nextTranslate()
}

module.exports = withPWA(nextConfig)
