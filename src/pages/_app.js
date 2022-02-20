import { useRouter } from 'next/router'
import { ThemeProvider } from 'next-themes'
import Head from 'next/head'
import Script from 'next/script'
import useTranslation from 'next-translate/useTranslation'
import getConfig from 'next/config'
import '../styles/globals.css'

const { publicRuntimeConfig } = getConfig()

function App({ Component, pageProps }) {
  const { asPath, locales } = useRouter()
  const { t } = useTranslation('all')

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        />
        <title>{t('site-title')}</title>
        <meta name="description" content={t('site-description')} />

        {locales.map((locale) =>
          locale === 'tr' ? (
            <link
              key={locale}
              rel="alternate"
              hrefLang="x-default"
              href={`/`}
            />
          ) : (
            <link
              key={locale}
              rel="alternate"
              hrefLang={locale}
              href={`/${locale}${asPath}`}
            />
          )
        )}
      </Head>
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
