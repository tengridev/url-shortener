import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { settings } from '../data/settings'
import { ads } from '../data/ads'
import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'
import Alert from '../components/Alert'

const Error404 = () => {
  const { t } = useTranslation('errors')

  const router = useRouter()

  return (
    <>
      <NextSeo
        title={t('error-404.title', { siteTitle: t('all:site-title') })}
        canonical={`${settings.main.URL}${router.asPath}`}
        openGraph={{
          url: `${settings.main.URL}${router.asPath}`,
          title: t('error-404.og-title', { siteTitle: t('all:site-title') }),
          description: t('all:og-description'),
          site_name: t('all:site-title')
        }}
      />

      {ads.layout.active &&
        (ads.layout.data.header.desktop.src ||
          ads.layout.data.header.mobile.src) && (
          <div className="mt-20 grid grid-cols-12">
            <div className="col-start-2 col-span-10 flex justify-center items-center">
              {ads.layout.data.header.desktop.src && (
                <Link href={ads.layout.data.header.desktop.href}>
                  <a
                    title={ads.layout.data.header.desktop.title}
                    rel={ads.layout.data.header.desktop.rel}
                    className="hidden sm:block"
                  >
                    <img
                      src={ads.layout.data.header.desktop.src}
                      alt={ads.layout.data.header.desktop.title}
                      width="100%"
                      height="100%"
                    />
                  </a>
                </Link>
              )}

              {ads.layout.data.header.mobile.src && (
                <Link href={ads.layout.data.header.mobile.href}>
                  <a
                    title={ads.layout.data.header.mobile.title}
                    rel={ads.layout.data.header.mobile.rel}
                    className="block sm:hidden"
                  >
                    <img
                      src={ads.layout.data.header.mobile.src}
                      alt={ads.layout.data.header.mobile.title}
                      width="100%"
                      height="100%"
                    />
                  </a>
                </Link>
              )}
            </div>
          </div>
        )}

      <div className="main">
        <Alert
          title={t('error-404.alert-title')}
          text={t('error-404.alert-text')}
          className={'alert-danger'}
        />
      </div>
    </>
  )
}

export default Error404
