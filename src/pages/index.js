import { useEffect, useState } from 'react'
import { NextSeo } from 'next-seo'
import { regex } from '../utils/regex'
import { storage } from '../utils/storage'
import { settings } from '../data/settings'
import { ads } from '../data/ads'
import Link from 'next/link'
import axios from 'axios'
import useTranslation from 'next-translate/useTranslation'
import Features from '../components/Features'
import Shortened from '../components/Shortened'
import Alert from '../components/Alert'

const HomePage = () => {
  const { t } = useTranslation('home')

  const [loading, setLoading] = useState(false)
  const [shortAlert, setShortAlert] = useState(false)
  const [shortenedData, setShortenedData] = useState(false)
  const [lsShortenedData, setLsShortenedData] = useState(false)
  const [selectedService, setSelectedService] = useState(
    settings.main.parse.hostname
  )

  useEffect(() => {
    if (storage.get('shortened')?.length > 0)
      setLsShortenedData(storage.get('shortened').reverse())
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

        if (!settings.services.disallow.includes(parseURL)) {
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
                  !settings.slugs.disallow.includes(
                    slug.value.toLocaleLowerCase('en-US')
                  )
                ) {
                  data.slug = slug.value
                } else {
                  isContinue = false

                  setLoading(false)
                  setShortAlert({
                    title: t('error'),
                    text: t('disallow-slug'),
                    className: 'alert-danger'
                  })
                }
              }

              if (isContinue) {
                axios
                  .post(settings.api.urls.add(), null, {
                    params: data
                  })
                  .then((res) => {
                    if (!res.data.error) {
                      setLoading(false)
                      setShortenedData([res.data])

                      const lsShortened = storage.get('shortened')
                      if (lsShortened) {
                        if (
                          lsShortened.length === settings.latestShortened.limit
                        ) {
                          lsShortened.splice(0, 1)
                        }

                        storage.set('shortened', [...lsShortened, res.data])
                      } else {
                        storage.set('shortened', [res.data])
                      }
                      setLsShortenedData(storage.get('shortened').reverse())
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
            text: t('disallow-domain'),
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
    <>
      <NextSeo noindex={settings.noindex.home.index} />
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

            <select
              name="service"
              className="shortener-service"
              value={selectedService}
              onChange={(e) => {
                setSelectedService(e.target.value)
              }}
              required
            >
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

            <button
              type="submit"
              className={`shortener-submit ${loading ? 'animate-pulse' : ''}`}
            >
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

        {ads.layout.active &&
          (ads.layout.data.header.desktop.src ||
            ads.layout.data.header.mobile.src) && (
            <div className="mt-20 col-start-2 col-span-10 flex justify-center items-center">
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
    </>
  )
}

export default HomePage
