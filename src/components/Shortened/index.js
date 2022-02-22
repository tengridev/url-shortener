import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faChartPie, faCopy } from '@fortawesome/free-solid-svg-icons'
import { ads } from '../../data/ads'
import useTranslation from 'next-translate/useTranslation'
import getConfig from 'next/config'
import React from 'react'

const { publicRuntimeConfig } = getConfig()

const Shortened = ({ title, data, advertising }) => {
  const { t } = useTranslation('ads')

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
                <FontAwesomeIcon icon={faTrash} className="w-5 h-5" />
              </button>
              <button type="button" className="shortened-button">
                <FontAwesomeIcon icon={faChartPie} className="w-5 h-5" />
              </button>
              <button type="button" className="shortened-button">
                <FontAwesomeIcon icon={faCopy} className="w-5 h-5" />
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
                  href={`${publicRuntimeConfig.SITE_URL}/delete/${item.url_delete}`}
                  className="shortened-button"
                >
                  <FontAwesomeIcon icon={faTrash} className="w-5 h-5" />
                </a>
                <a
                  href={`${publicRuntimeConfig.SITE_URL}/statistics/${item.url_slug}`}
                  className="shortened-button"
                >
                  <FontAwesomeIcon icon={faChartPie} className="w-5 h-5" />
                </a>
                <button
                  type="button"
                  className="shortened-button"
                  onClick={() => navigator.clipboard.writeText(item.url_short)}
                >
                  <FontAwesomeIcon icon={faCopy} className="w-5 h-5" />
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
