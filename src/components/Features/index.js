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
            <h5>{t('features-title-selectable')}</h5>
          </div>
          <div className="features-text">{t('features-text-selectable')}</div>
        </div>

        <div className="features-item">
          <div className="features-icon">
            <FontAwesomeIcon icon={faLink} className="w-20 h-20" />
          </div>
          <div className="features-title">
            <h5>{t('features-title-custom')}</h5>
          </div>
          <div className="features-text">{t('features-text-custom')}</div>
        </div>

        <div className="features-item">
          <div className="features-icon">
            <FontAwesomeIcon icon={faChartPie} className="w-20 h-20" />
          </div>
          <div className="features-title">
            <h5>{t('features-title-statistics')}</h5>
          </div>
          <div className="features-text">{t('features-text-statistics')}</div>
        </div>

        <div className="features-item">
          <div className="features-icon">
            <FontAwesomeIcon icon={faTurkishLiraSign} className="w-20 h-20" />
          </div>
          <div className="features-title">
            <h5>{t('features-title-free')}</h5>
          </div>
          <div className="features-text">{t('features-text-free')}</div>
        </div>
      </div>
    </div>
  )
}

export default Features
