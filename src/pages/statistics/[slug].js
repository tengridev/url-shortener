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
    serverSide.error || serverSide.data?.error
      ? null
      : `${settings.main.API}/statistics/visits/${serverSide.data.url_id}`,
    fetcher,
    settings.swr.statistics
  )

  if (serverSide.error) {
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
        />
        <div className="main">
          <Alert
            title={t('error')}
            text={t(serverSide.error)}
            className="alert-danger"
          />
        </div>
      </>
    )
  } else if (serverSide.data?.error) {
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
        />
        <div className="main">
          <Alert
            title={t('error')}
            text={t(
              `api:error.${serverSide.data.error.key.replace(/_/g, '-')}`
            )}
            className="alert-danger"
          />
        </div>
      </>
    )
  } else {
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
        />
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
    )
  }
}

export async function getServerSideProps(context) {
  const slug = context.params.slug.replace(regex.replace.slug, '')
  let result = false

  if (slug.length > 0) {
    const hash = md5(
      `${settings.keys.signature}:${settings.main.parse.hostname}:${slug}`
    ).toString()

    await axios
      .get(`${settings.main.API}/statistics/urls/${hash}`)
      .then((res) => {
        result = {
          props: {
            serverSide: {
              slug,
              data: res.data,
              error: false
            }
          }
        }
      })
      .catch(() => {
        result = {
          props: {
            serverSide: {
              slug,
              data: false,
              error: 'unknown-error'
            }
          }
        }
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
