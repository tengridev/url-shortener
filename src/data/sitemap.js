export const sitemap = {
  active: {
    page: true,
    short: true,
    statistics: true
  },
  limit: 2,
  additionals: {
    index: [
      {
        loc: 'http://localhost:3000/sitemap/page-sitemap/1',
        lastmod: '28.02.2022 17:52:00'
      }
    ],
    page: [
      {
        loc: 'https://localhost:3000/'
      },
      {
        loc: 'https://localhost:3000/1',
        lastmod: '01.02.2022 21:38:00'
      },
      {
        loc: 'https://localhost:3000/2',
        lastmod: '02.02.2022 21:38:00'
      }
    ]
  }
}
