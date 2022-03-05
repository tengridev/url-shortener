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
    whitelist: []
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
    default: ['localhost', 'urlshortener.app', 'tr.radio.fm', 'biolink.im'],
    banned: ['localhost', 'urlshortener.app', 'tr.radio.fm', 'biolink.im']
  },
  slugs: {
    length: 4,
    banned: ['api', 'static', 'sitemap', 'delete', 'statistics']
  },
  latestShortened: {
    active: true,
    limit: 50
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
      refreshInterval: 1000 * 15
    }
  },
  keys: {
    signature: 'c439a6d5249da1838bc326434ff2d0f6'
  }
}
