/** @type {import('next').NextConfig} */
const { parsed: localEnv } = require('dotenv').config()
const nextTranslate = require('next-translate')
const withPWA = require('next-pwa')

const nextConfig = {
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true
  },
  publicRuntimeConfig: {
    SITE_URL: localEnv && localEnv.SITE_URL,
    API_URL: localEnv && localEnv.API_URL,
    TWITTER: localEnv && localEnv.TWITTER,
    GOOGLE_ADSENSE_ID: localEnv && localEnv.GOOGLE_ADSENSE_ID,
    GOOGLE_ANALYTICS_ID: localEnv && localEnv.GOOGLE_ANALYTICS_ID
  },
  ...nextTranslate()
}

module.exports = withPWA(nextConfig)
