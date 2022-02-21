import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faChartPie, faCopy } from '@fortawesome/free-solid-svg-icons'
import { ads } from '../../data/ads'
import useTranslation from 'next-translate/useTranslation'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

const Shortened = ({ title, data, advertising }) => {
  const { t } = useTranslation('ads')

  const AdsComponent = (order) => {
    if (ads.shortened.length > 0) {
      const find = ads.shortened.find((item) => item.order === order)

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
                <FontAwesomeIcon icon={faTrash} className="w-6 h-6" />
              </button>
              <button type="button" className="shortened-button">
                <FontAwesomeIcon icon={faChartPie} className="w-6 h-6" />
              </button>
              <button type="button" className="shortened-button">
                <FontAwesomeIcon icon={faCopy} className="w-6 h-6" />
              </button>
            </div>
          </div>
        )
      }
    }
  }

  return (
    <div className="shortened">
      {title && <h5 className="shortened-title">{title}</h5>}
      <div className="shortened-card">
        {data.map((item, index) => (
          <>
            {advertising && <AdsComponent order={index} />}

            <div className="shortened-item" key={index}>
              <div className="shortened-urls">
                <p className="shortened-short">
                  <a href={item.url_slug}>{item.url_slug}</a>
                </p>
                <p className="shortened-long">
                  <a href={item.url_address} rel="nofollow">
                    {item.url_address}
                  </a>
                </p>
              </div>
              <div className="shortened-button">
                <a
                  href={`${publicRuntimeConfig.SITE_URL}/delete/${item.url_delete}`}
                  className="shortened-button-delete"
                >
                  <FontAwesomeIcon icon={faTrash} className="w-6 h-6" />
                </a>
                <a
                  href={`${publicRuntimeConfig.SITE_URL}/statistics/${item.url_slug}`}
                  className="shortened-button-statistics"
                >
                  <FontAwesomeIcon icon={faChartPie} className="w-6 h-6" />
                </a>
                <button type="button" className="shortened-button-copy">
                  <FontAwesomeIcon icon={faCopy} className="w-6 h-6" />
                </button>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  )
}

export default Shortened
