export const manifest = {
  tr: {
    name: 'TO.TV.TR',
    short_name: 'TO.TV.TR',
    description:
      'TO.TV.TR, sahip olduğunuz uzun bağlantıları ücretsiz bir şekilde daha kısa ve akılda kalıcı bağlantılar haline getirmenizi sağlar, detaylı ve anlık istatistikler sunar.',
    scope: '/',
    start_url: '/?utm_source=PWA&utm_medium=APP&utm_campaign=PWA',
    display: 'standalone',
    orientation: 'portrait',
    theme_color: '#18181b',
    background_color: '#18181b',
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
