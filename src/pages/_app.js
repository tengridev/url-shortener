import { useRouter } from 'next/router'
import { ThemeProvider } from 'next-themes'
import { NextSeo } from 'next-seo'
import { config } from '@fortawesome/fontawesome-svg-core'
import Script from 'next/script'
import useTranslation from 'next-translate/useTranslation'
import getConfig from 'next/config'
import Layout from '../components/Layout'
import '@fortawesome/fontawesome-svg-core/styles.css'
import '../styles/globals.css'
config.autoAddCss = false

const { publicRuntimeConfig } = getConfig()

function App({ Component, pageProps }) {
  const { asPath, locales } = useRouter()
  const { t } = useTranslation('all')
  const languages = locales.map((locale) => {
    if (locale === 'tr') {
      return {
        key: locale,
        rel: 'alternate',
        hrefLang: 'x-default',
        href: publicRuntimeConfig.SITE_URL
      }
    } else {
      return {
        key: locale,
        rel: 'alternate',
        hrefLang: locale,
        href: `${publicRuntimeConfig.SITE_URL}/${locale}${asPath}`
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
          }
        ]}
        additionalLinkTags={[
          {
            rel: 'shortcut icon',
            href: `${publicRuntimeConfig.SITE_URL}/static/img/favicon.png`
          },
          {
            rel: 'icon',
            href: `${publicRuntimeConfig.SITE_URL}/static/img/favicon-192-192.png`
          },
          {
            rel: 'icon',
            type: 'image/png',
            sizes: '16x16',
            href: `${publicRuntimeConfig.SITE_URL}/static/img/favicon-16-16.png`
          },
          {
            rel: 'icon',
            type: 'image/png',
            sizes: '32x32',
            href: `${publicRuntimeConfig.SITE_URL}/static/img/favicon-32-32.png`
          },
          {
            rel: 'apple-touch-icon',
            href: `${publicRuntimeConfig.SITE_URL}/static/img/favicon.png`
          },
          {
            rel: 'apple-touch-icon',
            sizes: '152x152',
            href: `${publicRuntimeConfig.SITE_URL}/static/img/favicon-152-152.png`
          },
          {
            rel: 'apple-touch-icon',
            sizes: '167x167',
            href: `${publicRuntimeConfig.SITE_URL}/static/img/favicon-167-167.png`
          },
          {
            rel: 'apple-touch-icon',
            sizes: '180x180',
            href: `${publicRuntimeConfig.SITE_URL}/static/img/favicon-180-180.png`
          },
          {
            rel: 'manifest',
            href: `${publicRuntimeConfig.SITE_URL}/manifest.json`
          }
        ]}
        languageAlternates={languages}
        canonical={publicRuntimeConfig.SITE_URL}
        openGraph={{
          type: 'website',
          url: publicRuntimeConfig.SITE_URL,
          title: t('og-title'),
          description: t('og-description'),
          images: [
            {
              url: `${publicRuntimeConfig.SITE_URL}/static/img/open-graph-1200-630.jpg`,
              width: 1200,
              height: 630,
              alt: t('og-description'),
              type: 'image/jpeg'
            }
          ],
          site_name: t('site-title')
        }}
        twitter={{
          handle: `@${publicRuntimeConfig.TWITTER}`,
          site: `@${publicRuntimeConfig.TWITTER}`,
          cardType: 'summary_large_image'
        }}
      />
      {publicRuntimeConfig.GOOGLE_ANALYTICS_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${publicRuntimeConfig.GOOGLE_ANALYTICS_ID}`}
            strategy="lazyOnload"
            async
          />
          <Script id="google-analytics" strategy="lazyOnload">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', '${publicRuntimeConfig.GOOGLE_ANALYTICS_ID}', {
                page_path: window.location.pathname,
              });
            `}
          </Script>
        </>
      )}
      {publicRuntimeConfig.GOOGLE_ADSENSE_ID && (
        <Script
          id="google-adsense"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publicRuntimeConfig.GOOGLE_ADSENSE_ID}`}
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
