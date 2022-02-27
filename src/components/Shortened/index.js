import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTrash,
  faChartPie,
  faCopy,
  faCheck
} from '@fortawesome/free-solid-svg-icons'
import { settings } from '../../data/settings'
import { ads } from '../../data/ads'
import useTranslation from 'next-translate/useTranslation'
import React, { useState } from 'react'
import Link from 'next/link'

const Shortened = ({ title, data, advertising }) => {
  const { t } = useTranslation('ads')
  const [copied, setCopied] = useState(false)

  const AdsComponent = (order) => {
    if (ads.shortened?.length > 0) {
      const find = ads.shortened.find((item) => item.order === order.order)

      if (find) {
        return (
          <div className="shortened-item">
            <div className="shortened-ads">{t('shortened-ads')}</div>
            <div className="shortened-urls">
              <p className="shortened-short">
                <Link href={find.short.href}>
                  <a title={find.short.title} rel={find.short.rel}>
                    {find.short.text}
                  </a>
                </Link>
              </p>

              <p className="shortened-long">
                <Link href={find.long.href}>
                  <a title={find.long.title} rel={find.long.rel}>
                    {find.long.text}
                  </a>
                </Link>
              </p>
            </div>
            <div className="shortened-button-group">
              <button type="button" className="shortened-button">
                <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
              </button>

              <button type="button" className="shortened-button">
                <FontAwesomeIcon icon={faChartPie} className="w-4 h-4" />
              </button>

              <button type="button" className="shortened-button">
                <FontAwesomeIcon icon={faCopy} className="w-4 h-4" />
              </button>
            </div>
          </div>
        )
      }
    }

    return false
  }

  return (
    <div className="shortened">
      {title && <h5 className="shortened-title">{title}</h5>}
      <div className="shortened-card">
        {data.map((item, index) => (
          <React.Fragment key={index}>
            {advertising && <AdsComponent order={index} />}

            <div className="shortened-item">
              <div className="shortened-urls">
                <p className="shortened-short">
                  <Link
                    href={
                      item.url_service === settings.main.parse.hostname
                        ? {
                            pathname: '/[slug]',
                            query: { slug: item.url_slug }
                          }
                        : item.url_short
                    }
                  >
                    <a>{item.url_short}</a>
                  </Link>
                </p>

                <p className="shortened-long">
                  <Link href={item.url_long}>
                    <a rel="nofollow">{item.url_long}</a>
                  </Link>
                </p>
              </div>
              <div className="shortened-button-group">
                <Link
                  href={
                    item.url_service === settings.main.parse.hostname
                      ? {
                          pathname: '/delete/[delete]',
                          query: { delete: item.url_delete }
                        }
                      : `https://${item.url_service}/delete/${item.url_delete}`
                  }
                >
                  <a className="shortened-button">
                    <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
                  </a>
                </Link>

                <Link
                  href={
                    item.url_service === settings.main.parse.hostname
                      ? {
                          pathname: '/statistics/[slug]',
                          query: { slug: item.url_slug }
                        }
                      : `https://${item.url_service}/statistics/${item.url_slug}`
                  }
                >
                  <a className="shortened-button">
                    <FontAwesomeIcon icon={faChartPie} className="w-4 h-4" />
                  </a>
                </Link>

                <button
                  type="button"
                  className="shortened-button"
                  onClick={() => {
                    navigator.clipboard.writeText(item.url_short)
                    setCopied(item.url_slug)

                    setTimeout(() => {
                      setCopied(false)
                    }, 1000)
                  }}
                >
                  <FontAwesomeIcon
                    icon={copied && copied === item.url_slug ? faCheck : faCopy}
                    className={`w-4 h-4 ${
                      copied && copied === item.url_slug ? 'animate-pulse' : ''
                    }`}
                  />
                </button>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default Shortened
