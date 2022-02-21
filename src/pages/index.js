import useTranslation from 'next-translate/useTranslation'
import getConfig from 'next/config'
import Features from '../components/Features'

const { publicRuntimeConfig, serverRuntimeConfig } = getConfig()

const Home = () => {
  const { t } = useTranslation('all')

  const redirect = publicRuntimeConfig.REDIRECT.split(',')
  const services = publicRuntimeConfig.SERVICES.split(',')

  return (
    <div className="main">
      <div className="shortener">
        <form>
          <input
            type="url"
            name="shortener-url"
            placeholder={t('long-url')}
            className="shortener-url"
          />

          <select name="shortener-redirect" className="shortener-redirect">
            {redirect.map((item, index) => (
              <option value={item} key={index}>
                {t(item)}
              </option>
            ))}
          </select>

          <select name="shortener-service" className="shortener-service">
            {services.map((item, index) => (
              <option value={item} key={index}>
                {t(item)}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="shortener-slug"
            placeholder={t('short-address')}
            className="shortener-slug"
          />

          <button type="submit" className="shortener-submit">
            {t('shorten-button')}
          </button>
        </form>
      </div>

      <Features />
    </div>
  )
}

export default Home
