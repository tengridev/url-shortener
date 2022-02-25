module.exports = {
  locales: ['tr'],
  defaultLocale: 'tr',
  pages: {
    '*': ['all', 'links', 'ads', 'api'],
    '/': ['home', 'features'],
    '/delete': ['delete'],
    '/delete/[hash]': ['delete']
  },
  loadLocaleFrom: (lang, ns) =>
    import(`./src/locales/${lang}/${ns}.json`).then((m) => m.default)
}
