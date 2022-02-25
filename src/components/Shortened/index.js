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

const Shortened = ({ title, data, advertising }) => {
  const { t } = useTranslation('ads')
  const [copied, setCopied] = useState(false)

  const AdsComponent = (order) => {
    if (ads.shortened.length > 0) {
      const find = ads.shortened.find((item) => item.order === order.order)

      if (find) {
        return (
          <div className="shortened-item">
            <div className="shortened-ads">{t('shortened-ads')}</div>
            <div className="shortened-urls">
              <p className="shortened-short">
                <a
                  href={find.short.href}
                  title={find.short.title}
                  rel={find.short.rel}
                >
                  {find.short.text}
                </a>
              </p>
              <p className="shortened-long">
                <a
                  href={find.long.href}
                  title={find.long.title}
                  rel={find.long.rel}
                >
                  {find.long.text}
                </a>
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
                  <a href={item.url_short}>{item.url_short}</a>
                </p>
                <p className="shortened-long">
                  <a href={item.url_long} rel="nofollow">
                    {item.url_long}
                  </a>
                </p>
              </div>
              <div className="shortened-button-group">
                <a
                  href={`${settings.main.URL}/delete/${item.url_delete}`}
                  className="shortened-button"
                >
                  <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
                </a>
                <a
                  href={`${settings.main.URL}/statistics/${item.url_slug}`}
                  className="shortened-button"
                >
                  <FontAwesomeIcon icon={faChartPie} className="w-4 h-4" />
                </a>
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
