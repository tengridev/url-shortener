import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

export const settings = {
  main: {
    API: publicRuntimeConfig.API_URL,
    URL: publicRuntimeConfig.SITE_URL,
    parse: new URL(publicRuntimeConfig.SITE_URL)
  },
  searchEngines: {
    google: {
      verification: false,
      analytics: false,
      adsense: false
    },
    yandex: {
      verification: false
    },
    bing: {
      verification: false
    }
  },
  redirects: {
    default: ['direct', 'timer']
  },
  services: {
    default: ['urlshortener.app'],
    banned: ['urlshortener.app']
  },
  slugs: {
    banned: [
      'index',
      'home',
      'default',
      'admin',
      'phpmyadmin',
      'webmail',
      'signin',
      'signup',
      'signout',
      'register',
      'login',
      'logout',
      'delete',
      'statistics'
    ]
  },
  latestShortened: {
    active: true,
    length: 25
  },
  localStorage: {
    encrypt: false,
    secret: 48,
    ttl: 31536000
  },
  keys: {
    signature: 'c439a6d5249da1838bc326434ff2d0f6'
  }
}
