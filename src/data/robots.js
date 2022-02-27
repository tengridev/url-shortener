export const robots = {
  policies: [
    {
      userAgent: '*',
      allow: '/'
    },
    {
      userAgent: 'test-bot',
      allow: ['/path', '/path-2'],
      disallow: ['/sub-path-1', '/path-2']
    },
    {
      userAgent: 'black-listed-bot',
      disallow: ['/sub-path-1', '/path-2']
    }
  ],
  sitemaps: [
    'https://example.com/my-custom-sitemap-1.xml',
    'https://example.com/my-custom-sitemap-2.xml',
    'https://example.com/my-custom-sitemap-3.xml'
  ]
}
