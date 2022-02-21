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
  serverRuntimeConfig: {
    BANNED_SERVICES: localEnv && localEnv.BANNED_SERVICES,
    SIGNATURE_KEY: localEnv && localEnv.SIGNATURE_KEY
  },
  publicRuntimeConfig: {
    SITE_URL: localEnv && localEnv.SITE_URL,
    SERVICES: localEnv && localEnv.SERVICES,
    REDIRECT: localEnv && localEnv.REDIRECT,
    TWITTER: localEnv && localEnv.TWITTER,
    GOOGLE_ADSENSE_ID: localEnv && localEnv.GOOGLE_ADSENSE_ID,
    GOOGLE_ANALYTICS_ID: localEnv && localEnv.GOOGLE_ANALYTICS_ID
  },
  ...nextTranslate()
}

module.exports = withPWA(nextConfig)
