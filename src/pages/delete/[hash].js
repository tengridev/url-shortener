import { NextSeo } from 'next-seo'
import { useState } from 'react'
import { regex } from '../../utils/regex'
import { storage } from '../../utils/storage'
import { settings } from '../../data/settings'
import Alert from '../../components/Alert'
import axios from 'axios'
import useTranslation from 'next-translate/useTranslation'

const DeletePage = ({ data }) => {
  const { t } = useTranslation('delete')

  const [loading, setLoading] = useState(false)
  const [deleteAlert, setDeleteAlert] = useState(false)

  const deleteURL = (event) => {
    event.preventDefault()
    setLoading(true)
    setDeleteAlert(false)

    const { hash } = event.target

    if (hash.value) {
      if (regex.md5.test(hash.value)) {
        axios
          .delete(settings.api.urls.delete({ hash: hash.value }))
          .then((res) => {
            if (res.data.success) {
              setLoading(false)
              setDeleteAlert({
                title: t('success'),
                text: t(
                  `api:success.${res.data.success.key.replaceAll('_', '-')}`
                ),
                className: 'alert-success'
              })

              const lsShortened = storage
                .get('shortened')
                .filter((item) => item.delete !== hash.value)

              if (lsShortened.length > 0) {
                storage.set('shortened', lsShortened)
              } else {
                storage.remove('shortened')
              }
            } else {
              setLoading(false)
              setDeleteAlert({
                title: t('error'),
                text: t(`api:error.${res.data.error.key.replaceAll('_', '-')}`),
                className: 'alert-danger'
              })
            }
          })
          .catch(() => {
            setLoading(false)
            setDeleteAlert({
              title: t('error'),
              text: t('unknown-error'),
              className: 'alert-danger'
            })
          })
      } else {
        setLoading(false)
        setDeleteAlert({
          title: t('error'),
          text: t('invalid-hash'),
          className: 'alert-danger'
        })
      }
    } else {
      setLoading(false)
      setDeleteAlert({
        title: t('error'),
        text: t('empty-hash'),
        className: 'alert-danger'
      })
    }
  }

  return (
    <>
      <NextSeo
        title={t('title', { siteTitle: t('all:site-title'), hash: data.hash })}
        canonical={`${settings.main.URL}/delete/${data.hash}`}
        openGraph={{
          url: `${settings.main.URL}/delete/${data.hash}`,
          title: t('og-title', {
            siteTitle: t('all:site-title'),
            hash: data.hash
          }),
          description: t('all:og-description'),
          site_name: t('all:site-title')
        }}
        noindex={settings.noindex.delete.hash}
      />
      <div className="main">
        <div className="delete">
          <form onSubmit={deleteURL}>
            <input
              type="text"
              name="hash"
              placeholder={t('hash', {
                hash: data.hash
              })}
              defaultValue={data.hash}
              className="delete-hash"
              required
            />

            <button
              type="submit"
              className={`delete-submit ${loading ? 'animate-pulse' : ''}`}
            >
              {t('delete-button')}
            </button>
          </form>
        </div>

        {deleteAlert ? (
          <Alert
            title={deleteAlert.title}
            text={deleteAlert.text}
            className={`mt-20 ${deleteAlert.className}`}
          />
        ) : (
          <Alert title={t('info')} text={t('hash-info')} className={`mt-20`} />
        )}
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const hash = context.params.hash.replace(regex.replace.md5, '')

  return {
    redirect:
      hash.length > 0
        ? false
        : {
            permanent: false,
            destination: '/delete'
          },
    props: {
      data: {
        hash
      }
    }
  }
}

export default DeletePage
