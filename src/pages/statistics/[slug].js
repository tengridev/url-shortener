import { NextSeo } from 'next-seo'
import { regex } from '../../utils/regex'
import { settings } from '../../data/settings'
import Subheader from '../../components/Subheader'
import Statistics from '../../components/Statistics'
import Alert from '../../components/Alert'
import md5 from 'crypto-js/md5'
import axios from 'axios'
import useSWR from 'swr'
import useTranslation from 'next-translate/useTranslation'

const fetcher = (url) => axios.get(url).then((res) => res.data)

const StatisticsPage = ({ serverSide }) => {
  const { t } = useTranslation('statistics')

  const { data, error } = useSWR(
    serverSide.data
      ? settings.api.statistics.visits({ id: serverSide.data.id })
      : null,
    fetcher,
    settings.swr.statistics
  )

  return (
    <>
      <NextSeo
        title={t('title-slug', {
          siteTitle: t('all:site-title'),
          slug: serverSide.slug
        })}
        canonical={`${settings.main.URL}/statistics/${serverSide.slug}`}
        openGraph={{
          url: `${settings.main.URL}/statistics/${serverSide.slug}`,
          title: t('og-title-slug', {
            siteTitle: t('all:site-title'),
            slug: serverSide.slug
          }),
          description: t('all:og-description'),
          site_name: t('all:site-title')
        }}
        noindex={settings.noindex.statisticsSlug}
      />

      {!serverSide.error ? (
        <>
          <Subheader data={serverSide.data} />

          <div className="main">
            {!error ? (
              !data?.error ? (
                <Statistics
                  title={{ urls: false, visits: t('visits') }}
                  data={data ? data : false}
                  loading={data ? false : 'visits'}
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
      ) : (
        <div className="main">
          <Alert
            title={t('error')}
            text={t(serverSide.error)}
            className="alert-danger"
          />
        </div>
      )}
    </>
  )
}

export async function getServerSideProps(context) {
  const slug = context.params.slug.replace(regex.replace.slug, '')
  let result = false

  if (slug.length > 0) {
    result = {
      props: {
        serverSide: {
          slug,
          data: false,
          error: false
        }
      }
    }
    const hash = md5(
      `${settings.keys.signature}:${settings.main.parse.hostname}:${slug}`
    ).toString()

    await axios
      .get(settings.api.statistics.urls({ hash: hash }))
      .then((res) => {
        if (!res.data.error) {
          result.props.serverSide.data = res.data
        } else {
          result.props.serverSide.error = `api:error.${res.data.error.key.replace(
            /_/g,
            '-'
          )}`
        }
      })
      .catch(() => {
        result.props.serverSide.error = 'unknown-error'
      })
  } else {
    result = {
      redirect: {
        permanent: false,
        destination: '/statistics'
      }
    }
  }

  return result
}

export default StatisticsPage
