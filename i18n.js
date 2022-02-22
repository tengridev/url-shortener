module.exports = {
  locales: ['tr'],
  defaultLocale: 'tr',
  pages: {
    '*': ['all', 'links', 'features', 'ads', 'api']
  },
  loadLocaleFrom: (lang, ns) =>
    import(`./src/locales/${lang}/${ns}.json`).then((m) => m.default)
}
