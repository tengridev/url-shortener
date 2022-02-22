import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowPointer,
  faLink,
  faChartPie,
  faTurkishLiraSign
} from '@fortawesome/free-solid-svg-icons'
import useTranslation from 'next-translate/useTranslation'

const Features = () => {
  const { t } = useTranslation('features')

  return (
    <div className="features">
      <div className="features-card">
        <div className="features-item">
          <div className="features-icon">
            <FontAwesomeIcon icon={faArrowPointer} className="w-20 h-20" />
          </div>
          <div className="features-title">
            <h5>{t('selectable.title')}</h5>
          </div>
          <div className="features-text">{t('selectable.text')}</div>
        </div>

        <div className="features-item">
          <div className="features-icon">
            <FontAwesomeIcon icon={faLink} className="w-20 h-20" />
          </div>
          <div className="features-title">
            <h5>{t('custom.title')}</h5>
          </div>
          <div className="features-text">{t('custom.text')}</div>
        </div>

        <div className="features-item">
          <div className="features-icon">
            <FontAwesomeIcon icon={faChartPie} className="w-20 h-20" />
          </div>
          <div className="features-title">
            <h5>{t('statistics.title')}</h5>
          </div>
          <div className="features-text">{t('statistics.text')}</div>
        </div>

        <div className="features-item">
          <div className="features-icon">
            <FontAwesomeIcon icon={faTurkishLiraSign} className="w-20 h-20" />
          </div>
          <div className="features-title">
            <h5>{t('free.title')}</h5>
          </div>
          <div className="features-text">{t('free.text')}</div>
        </div>
      </div>
    </div>
  )
}

export default Features
