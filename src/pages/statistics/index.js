import { NextSeo } from 'next-seo'
import { settings } from '../../data/settings'
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
      />
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
