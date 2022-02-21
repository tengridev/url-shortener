import { useState } from 'react'
import { regex } from '../lib/regex'
import { redirects } from '../data/redirects'
import { services } from '../data/services'
import axios from 'axios'
import useTranslation from 'next-translate/useTranslation'
import getConfig from 'next/config'
import Features from '../components/Features'
import Alert from '../components/Alert'

const { publicRuntimeConfig } = getConfig()

const Home = () => {
  const { t } = useTranslation('all')
  const [shortAlert, setShortAlert] = useState(false)

  const shortenURL = (event) => {
    event.preventDefault()
    setShortAlert(false)

    const { url, service, redirect, slug } = event.target

    if (url.value) {
      if (regex.url.test(url.value)) {
        let parseURL = new URL(url.value)
        parseURL = parseURL.hostname
          .toLocaleLowerCase('en-US')
          .replaceAll('www.', '')

        if (!services.banned.includes(parseURL)) {
          if (service.value) {
            if (services.default.includes(service.value)) {
              const data = {
                address: url.value,
                service: service.value
              }
              if (redirect.value) {
                data.redirect = redirect.value
              }
              if (slug.value) {
                data.slug = slug.value
              }

              axios
                .post(`${publicRuntimeConfig.API_URL}/urls`, null, {
                  params: data
                })
                .then((res) => {
                  console.log(res.data)
                })
                .catch((err) => {
                  setShortAlert({
                    title: t('error'),
                    text: t('unknown-error'),
                    className: 'alert-danger'
                  })
                })
            } else {
              setShortAlert({
                title: t('error'),
                text: t('invalid-service'),
                className: 'alert-danger'
              })
            }
          } else {
            setShortAlert({
              title: t('error'),
              text: t('empty-service'),
              className: 'alert-danger'
            })
          }
        } else {
          setShortAlert({
            title: t('error'),
            text: t('banned-domain'),
            className: 'alert-danger'
          })
        }
      } else {
        setShortAlert({
          title: t('error'),
          text: t('invalid-url'),
          className: 'alert-danger'
        })
      }
    } else {
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
            {redirects.default.map((item, index) => (
              <option value={item} key={index}>
                {t(item)}
              </option>
            ))}
          </select>

          <select name="service" className="shortener-service" required>
            {services.default.map((item, index) => (
              <option value={item} key={index}>
                {t(item)}
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

      <Features />
    </div>
  )
}

export default Home
