import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

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
      url: 45,
      visit: 60
    },
    whitelist: ['::1', '127.0.0.1']
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
    default: ['direct', 'timer'],
    timer: {
      countdown: 15
    }
  },
  services: {
    default: ['urlshortener.app'],
    banned: ['urlshortener.app']
  },
  slugs: {
    length: 4,
    banned: ['api', 'static', 'sitemap', 'delete', 'statistics']
  },
  latestShortened: {
    active: true,
    limit: 25
  },
  localStorage: {
    encrypt: true,
    secret: '4825c24387d1b9a891401a6c93e4b4e8',
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
    signature: '4825c24387d1b9a891401a6c93e4b4e8'
  }
}
