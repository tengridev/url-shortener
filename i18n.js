module.exports = {
  locales: ['tr'],
  defaultLocale: 'tr',
  pages: {
    '*': ['all', 'links']
  },
  loadLocaleFrom: (lang, ns) =>
    import(`./src/locales/${lang}/${ns}.json`).then((m) => m.default)
}
