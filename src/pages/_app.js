import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { ThemeProvider } from 'next-themes'
import { NextSeo } from 'next-seo'
import Script from 'next/script'
import useTranslation from 'next-translate/useTranslation'
import getConfig from 'next/config'
import '../styles/globals.css'

const { publicRuntimeConfig } = getConfig()

function App({ Component, pageProps }) {
  const [baseURL, setBaseURL] = useState('')
  useEffect(() => {
    setBaseURL(window.location.origin)
  }, [])

  const { asPath, locales } = useRouter()
  const { t } = useTranslation('all')
  const languages = locales.map((locale) => {
    if (locale === 'tr') {
      return {
        key: locale,
        rel: 'alternate',
        hrefLang: 'x-default',
        href: `${baseURL}`
      }
    } else {
      return {
        key: locale,
        rel: 'alternate',
        hrefLang: locale,
        href: `${baseURL}/${locale}${asPath}`
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
