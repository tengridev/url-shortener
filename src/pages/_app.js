import { useRouter } from 'next/router'
import { ThemeProvider } from 'next-themes'
import { NextSeo } from 'next-seo'
import Script from 'next/script'
import useTranslation from 'next-translate/useTranslation'
import getConfig from 'next/config'
import '../styles/globals.css'

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
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

export default App
