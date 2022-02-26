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
    default: ['urlshortener.app', 'tr.radio.fm', 'biolink.im'],
    banned: ['urlshortener.app', 'tr.radio.fm', 'biolink.im']
  },
  slugs: {
    banned: [
      'anasayfa',
      'sayfa',
      'yonetim',
      'yonetici',
      'posta',
      'eposta',
      'giris',
      'girisyap',
      'kayit',
      'kayitol',
      'index',
      'home',
      'default',
      'page',
      'admin',
      'administrator',
      'mod',
      'moderator',
      'pma',
      'phpmyadmin',
      'webmail',
      'mail',
      'email',
      'cpanel',
      'panel',
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
    encrypt: true,
    secret: 'c439a6d5249da1838bc326434ff2d0f6',
    ttl: 60 * 60 * 24 * 365
  },
  swr: {
    statistics: {
      revalidateIfStale: false,
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      refreshInterval: 15000
    }
  },
  keys: {
    signature: 'c439a6d5249da1838bc326434ff2d0f6'
  }
}
