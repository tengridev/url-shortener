module.exports = {
  locales: ['tr'],
  defaultLocale: 'tr',
  pages: {
    '*': ['all', 'errors', 'links', 'ads', 'api'],
    '/': ['home', 'features'],
    '/delete': ['delete'],
    '/delete/[hash]': ['delete'],
    '/statistics': ['statistics'],
    '/statistics/[slug]': ['statistics']
  },
  loadLocaleFrom: (lang, ns) =>
    import(`./src/locales/${lang}/${ns}.json`).then((m) => m.default)
}
