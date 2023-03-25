import { NextSeo } from 'next-seo'
import { settings } from '../../data/settings'
import { ads } from '../../data/ads'
import Link from 'next/link'
import Statistics from '../../components/Statistics'
import Alert from '../../components/Alert'
import axios from 'axios'
import useSWR from 'swr'
import useTranslation from 'next-translate/useTranslation'

const fetcher = (url) => axios.get(url).then((res) => res.data)

const StatisticsPage = () => {
  const { t } = useTranslation('statistics')

  const { data, error } = useSWR(
    settings.api.statistics.all(),
    fetcher,
    settings.swr.statistics
  )

  return (
    <>
      <NextSeo
        title={t('title', { siteTitle: t('all:site-title') })}
        canonical={`${settings.main.URL}/statistics`}
        openGraph={{
          url: `${settings.main.URL}/statistics`,
          title: t('og-title', { siteTitle: t('all:site-title') }),
          description: t('all:og-description'),
          site_name: t('all:site-title')
        }}
        noindex={settings.noindex.statistics.index}
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
        {!error ? (
          !data?.error ? (
            <Statistics
              title={{ urls: t('urls'), visits: t('visits') }}
              data={data ? data : false}
              loading={data ? false : 'all'}
            />
          ) : (
            <Alert
              title={t('error')}
              text={t(`api:error.${data.error.key.replaceAll('_', '-')}`)}
              className="alert-danger"
            />
          )
        ) : (
          <Alert
            title={t('error')}
            text={t('unknown-error')}
            className="alert-danger"
          />
        )}
      </div>
    </>
  )
}

export default StatisticsPage
