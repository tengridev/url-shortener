/** @type {import('next').NextConfig} */
const { parsed: localEnv } = require('dotenv').config()
const nextTranslate = require('next-translate')
const withPWA = require('next-pwa')

const nextConfig = {
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    register: true,
    sw: 'service-worker.js'
  },
  publicRuntimeConfig: {
    SITE_URL: localEnv && localEnv.SITE_URL,
    API_URL: localEnv && localEnv.API_URL
  },
  ...nextTranslate()
}

module.exports = withPWA(nextConfig)
