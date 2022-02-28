export const manifest = {
  tr: {
    name: 'URL Kısaltıcı',
    short_name: 'URL Kısaltıcı',
    description:
      'URL kısaltıcı, sahip olduğunuz uzun linkleri ücretsiz bir şekilde daha kısa ve akılda kalıcı linkler haline getirmenizi sağlar. Link kısaltma sonrası istatistikleri görüntüleyebilirsiniz.',
    scope: '/',
    start_url: '/?utm_source=PWA',
    display: 'standalone',
    orientation: 'portrait',
    theme_color: '#f5f5f5',
    background_color: '#f5f5f5',
    icons: [
      {
        src: '/static/img/pwa-192-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any maskable'
      },
      {
        src: '/static/img/pwa-384-384.png',
        sizes: '384x384',
        type: 'image/png'
      },
      {
        src: '/static/img/pwa-512-512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  }
}