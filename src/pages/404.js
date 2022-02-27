import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { settings } from '../data/settings'
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
