/** @type {import('next').NextConfig} */
const { parsed: localEnv } = require('dotenv').config()
const nextTranslate = require('next-translate')

const nextConfig = {
  serverRuntimeConfig: {
    SERVICES: localEnv && localEnv.SERVICES,
    REDIRECT: localEnv && localEnv.REDIRECT,
    SIGNATURE_KEY: localEnv && localEnv.SIGNATURE_KEY
  },
  publicRuntimeConfig: {
    SITE_URL: localEnv && localEnv.SITE_URL,
    GOOGLE_ADSENSE_ID: localEnv && localEnv.GOOGLE_ADSENSE_ID,
    GOOGLE_ANALYTICS_ID: localEnv && localEnv.GOOGLE_ANALYTICS_ID
  },
  ...nextTranslate()
}

module.exports = nextConfig
