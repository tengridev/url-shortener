export const settings = {
  redirects: {
    default: ['direct', 'timer']
  },
  services: {
    default: ['urlshortener.app'],
    banned: ['urlshortener.app']
  },
  slugs: {
    banned: ['delete', 'statistics']
  },
  latestShortened: {
    active: true,
    length: 25
  },
  keys: {
    signature: 'c439a6d5249da1838bc326434ff2d0f6'
  },
  localStorage: {
    encrypt: false,
    secret: 48,
    ttl: 31536000
  },
  google: {
    adsense: false,
    analytics: false
  }
}
