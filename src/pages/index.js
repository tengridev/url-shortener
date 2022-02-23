import { useEffect, useState } from 'react'
import { regex } from '../lib/regex'
import { settings } from '../data/settings'
import ls from 'localstorage-slim'
import axios from 'axios'
import useTranslation from 'next-translate/useTranslation'
import getConfig from 'next/config'
import Features from '../components/Features'
import Shortened from '../components/Shortened'
import Alert from '../components/Alert'

ls.config.encrypt = settings.localStorage.encrypt
ls.config.ttl = settings.localStorage.ttl
if (settings.localStorage.encrypt)
  ls.config.secret = settings.localStorage.secret

const { publicRuntimeConfig } = getConfig()

const Home = () => {
  const { t } = useTranslation('all')
  const [loading, setLoading] = useState(false)
  const [shortAlert, setShortAlert] = useState(false)
  const [shortenedData, setShortenedData] = useState(false)
  const [lsShortenedData, setLsShortenedData] = useState(false)

  useEffect(() => {
    if (ls.get('shortened')) {
      setLsShortenedData(ls.get('shortened').reverse())
    }
  }, [])

  const shortenURL = (event) => {
    event.preventDefault()
    setLoading(true)
    setShortAlert(false)
    setShortenedData(false)

    const { url, service, redirect, slug } = event.target

    if (url.value) {
      if (regex.url.test(url.value)) {
        let parseURL = new URL(url.value)
        parseURL = parseURL.hostname
          .toLocaleLowerCase('en-US')
          .replaceAll('www.', '')

        if (!settings.services.banned.includes(parseURL)) {
          if (service.value) {
            if (settings.services.default.includes(service.value)) {
              let isContinue = true
              const data = {
                address: url.value,
                service: service.value
              }
              if (redirect.value) {
                data.redirect = redirect.value
              }
              if (slug.value) {
                if (
                  !settings.slugs.banned.includes(
                    slug.value.toLocaleLowerCase('en-US')
                  )
                ) {
                  data.slug = slug.value
                } else {
                  isContinue = false

                  setLoading(false)
                  setShortAlert({
                    title: t('error'),
                    text: t('banned-slug'),
                    className: 'alert-danger'
                  })
                }
              }

              if (isContinue) {
                axios
                  .post(`${publicRuntimeConfig.API_URL}/urls`, null, {
                    params: data
                  })
                  .then((res) => {
                    if (!res.data.error) {
                      setLoading(false)
                      setShortenedData([res.data])

                      const lsShortened = ls.get('shortened')
                      if (lsShortened) {
                        if (
                          lsShortened.length === settings.latestShortened.length
                        ) {
                          lsShortened.splice(0, 1)
                        }

                        ls.set('shortened', [...lsShortened, res.data])
                      } else {
                        ls.set('shortened', [res.data])
                      }
                      setLsShortenedData(ls.get('shortened').reverse())
                    } else {
                      setLoading(false)
                      setShortAlert({
                        title: t('error'),
                        text: t(
                          `api:error.${res.data.error.key.replaceAll('_', '-')}`
                        ),
                        className: 'alert-danger'
                      })
                    }
                  })
                  .catch(() => {
                    setLoading(false)
                    setShortAlert({
                      title: t('error'),
                      text: t('unknown-error'),
                      className: 'alert-danger'
                    })
                  })
              }
            } else {
              setLoading(false)
              setShortAlert({
                title: t('error'),
                text: t('invalid-service'),
                className: 'alert-danger'
              })
            }
          } else {
            setLoading(false)
            setShortAlert({
              title: t('error'),
              text: t('empty-service'),
              className: 'alert-danger'
            })
          }
        } else {
          setLoading(false)
          setShortAlert({
            title: t('error'),
            text: t('banned-domain'),
            className: 'alert-danger'
          })
        }
      } else {
        setLoading(false)
        setShortAlert({
          title: t('error'),
          text: t('invalid-url'),
          className: 'alert-danger'
        })
      }
    } else {
      setLoading(false)
      setShortAlert({
        title: t('error'),
        text: t('empty-url'),
        className: 'alert-danger'
      })
    }
  }

  return (
    <div className="main">
      <div className="shortener">
        <form onSubmit={shortenURL}>
          <input
            type="url"
            name="url"
            placeholder={t('long-url')}
            className="shortener-url"
            required
          />

          <select name="redirect" className="shortener-redirect">
            {settings.redirects.default.map((item, index) => (
              <option value={item} key={index}>
                {t(item)}
              </option>
            ))}
          </select>

          <select name="service" className="shortener-service" required>
            {settings.services.default.map((item, index) => (
              <option value={item} key={index}>
                {item}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="slug"
            placeholder={t('short-address')}
            className="shortener-slug"
          />

          <button type="submit" className="shortener-submit">
            {t('shorten-button')}
          </button>
        </form>
      </div>

      {shortAlert && (
        <Alert
          title={shortAlert.title}
          text={shortAlert.text}
          className={`mt-20 ${shortAlert.className}`}
        />
      )}

      {shortenedData && (
        <Shortened
          title={t('shortened-result')}
          data={shortenedData}
          advertising={false}
        />
      )}

      {settings.latestShortened.active && lsShortenedData && (
        <Shortened
          title={t('shortened-latest')}
          data={lsShortenedData}
          advertising={true}
        />
      )}

      <Features />
    </div>
  )
}

export default Home
