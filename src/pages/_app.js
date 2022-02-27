import { useRouter } from 'next/router'
import { ThemeProvider } from 'next-themes'
import { NextSeo } from 'next-seo'
import { config } from '@fortawesome/fontawesome-svg-core'
import { settings } from '../data/settings'
import Script from 'next/script'
import useTranslation from 'next-translate/useTranslation'
import Layout from '../components/Layout'
import '@fortawesome/fontawesome-svg-core/styles.css'
import '../styles/globals.css'
config.autoAddCss = false

function App({ Component, pageProps }) {
  const { asPath, locales } = useRouter()
  const { t } = useTranslation('all')

  const verifications = []
  settings.searchEngines.google.verification &&
    verifications.push({
      name: 'google-site-verification',
      content: settings.searchEngines.google.verification
    })
  settings.searchEngines.yandex.verification &&
    verifications.push({
      name: 'yandex-verification',
      content: settings.searchEngines.yandex.verification
    })
  settings.searchEngines.bing.verification &&
    verifications.push({
      name: 'msvalidate.01',
      content: settings.searchEngines.bing.verification
    })
  const languages = locales.map((locale) => {
    if (locale === 'tr') {
      return {
        key: locale,
        rel: 'alternate',
        hrefLang: 'x-default',
        href: settings.main.URL
      }
    } else {
      return {
        key: locale,
        rel: 'alternate',
        hrefLang: locale,
        href: `${settings.main.URL}/${locale}${asPath}`
      }
    }
  })

  return (
    <>
      <NextSeo
        title={t('site-title')}
        description={t('site-description')}
        additionalMetaTags={[
          {
            charSet: 'UTF-8'
          },
          {
            httpEquiv: 'X-UA-Compatible',
            content: 'IE=edge; chrome=1'
          },
          {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1.0, viewport-fit=cover'
          },
          {
            name: 'application-name',
            content: t('application-name')
          },
          {
            name: 'apple-mobile-web-app-title',
            content: t('application-name')
          },
          ...verifications
        ]}
        additionalLinkTags={[
          {
            rel: 'shortcut icon',
            href: `${settings.main.URL}/static/img/favicon.png`
          },
          {
            rel: 'icon',
            href: `${settings.main.URL}/static/img/favicon-192-192.png`
          },
          {
            rel: 'icon',
            type: 'image/png',
            sizes: '16x16',
            href: `${settings.main.URL}/static/img/favicon-16-16.png`
          },
          {
            rel: 'icon',
            type: 'image/png',
            sizes: '32x32',
            href: `${settings.main.URL}/static/img/favicon-32-32.png`
          },
          {
            rel: 'apple-touch-icon',
            href: `${settings.main.URL}/static/img/favicon.png`
          },
          {
            rel: 'apple-touch-icon',
            sizes: '152x152',
            href: `${settings.main.URL}/static/img/favicon-152-152.png`
          },
          {
            rel: 'apple-touch-icon',
            sizes: '167x167',
            href: `${settings.main.URL}/static/img/favicon-167-167.png`
          },
          {
            rel: 'apple-touch-icon',
            sizes: '180x180',
            href: `${settings.main.URL}/static/img/favicon-180-180.png`
          },
          {
            rel: 'manifest',
            href: `${settings.main.URL}/manifest.json`
          }
        ]}
        languageAlternates={languages}
        canonical={settings.main.URL}
        openGraph={{
          type: 'website',
          url: settings.main.URL,
          title: t('og-title'),
          description: t('og-description'),
          images: [
            {
              url: `${settings.main.URL}/static/img/open-graph-1200-630.jpg`,
              width: 1200,
              height: 630,
              alt: t('og-description'),
              type: 'image/jpeg'
            }
          ],
          site_name: t('site-title')
        }}
      />
      {settings.searchEngines.google.analytics && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${settings.searchEngines.google.analytics}`}
            strategy="lazyOnload"
            async
          />
          <Script id="google-analytics" strategy="lazyOnload">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', '${settings.searchEngines.google.analytics}', {
                page_path: window.location.pathname,
              });
            `}
          </Script>
        </>
      )}
      {settings.searchEngines.google.adsense && (
        <Script
          id="google-adsense"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${settings.searchEngines.google.adsense}`}
          crossorigin="anonymous"
          strategy="lazyOnload"
          async
        />
      )}
      <ThemeProvider attribute="class">
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  )
}

export default App
