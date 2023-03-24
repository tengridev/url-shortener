import getConfig from 'next/config'

const { publicRuntimeConfig, serverRuntimeConfig } = getConfig()

export const settings = {
  main: {
    API: publicRuntimeConfig.API_URL,
    URL: publicRuntimeConfig.SITE_URL,
    parse: new URL(publicRuntimeConfig.SITE_URL)
  },
  api: {
    urls: {
      add: () => {
        return `${publicRuntimeConfig.API_URL}/urls`
      },
      get: (data) => {
        /* Data: {hash: value} */
        return `${publicRuntimeConfig.API_URL}/urls/${data.hash}`
      },
      delete: (data) => {
        /* Data: {hash: value} */
        return `${publicRuntimeConfig.API_URL}/urls/${data.hash}`
      }
    },
    statistics: {
      all: () => {
        return `${publicRuntimeConfig.API_URL}/statistics`
      },
      urls: (data) => {
        /* Data: {hash: value} */
        return `${publicRuntimeConfig.API_URL}/statistics/urls/${data.hash}`
      },
      visits: (data) => {
        /* Data: {id: value} */
        return `${publicRuntimeConfig.API_URL}/statistics/visits/${data.id}`
      }
    },
    sitemap: {
      pagination: (data) => {
        /* Data: {service: value, page: value} */
        return `${publicRuntimeConfig.API_URL}/sitemap/${data.service}/${data.page}`
      }
    }
  },
  autoBan: {
    active: true,
    limit: {
      url: 30,
      visit: 45
    },
    whitelist: ['::1', '127.0.0.1', '167.235.31.55']
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
  noindex: {
    home: {
      index: false,
      slug: false
    },
    statistics: {
      index: false,
      slug: true
    },
    delete: {
      index: false,
      hash: true
    }
  },
  redirects: {
    default: ['direct', 'timer'],
    timer: {
      countdown: 5,
      redirectButton: true
    }
  },
  services: {
    default: ['to.tv.tr'],
    disallow: ['to.tv.tr']
  },
  slugs: {
    length: 3,
    disallow: [
      '404',
      '500',
      'api',
      'static',
      'sitemap',
      'delete',
      'statistics',
      'login',
      'register',
      'admin',
      'administrator',
      'moderator',
      'giris',
      'kayit',
      'cikis',
      'logout',
      'public',
      'index',
      'error'
    ]
  },
  latestShortened: {
    active: true,
    limit: 25
  },
  localStorage: {
    encrypt: true,
    secret: serverRuntimeConfig.SECRET_KEY,
    ttl: 60 * 60 * 24 * 365
  },
  swr: {
    statistics: {
      revalidateIfStale: false,
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      refreshInterval: 1000 * 15
    }
  },
  qrCode: {
    size: 100,
    renderAs: 'svg',
    bgColor: 'transparent',
    level: 'H'
  },
  keys: {
    signature: serverRuntimeConfig.SECRET_KEY
  }
}
